const kMailHistoryStartPhrases = [
  { type: "string", value: "-----Original Message-----" },
  { type: "string", value: "&gt; &gt;"},
  { type: "string", value: "<b>From:</b>"},
  { type: "regexp", value: /[0-9]+年[0-9]+月[0-9]+日.[0-9]+:[0-9]+.*から/g }
]

var ellipsisEmailHistory = function() {
  var conversations = document.getElementsByClassName('conversation__text');
  for (var conversation of conversations) {
    var replaced_html = conversation.innerHTML;


    // if already details exists, skip loop
    // when history opened, details tag append `open` attribute.
    // So, it checks `<details` prefix.
    if (replaced_html.includes("<details", "")) {
      continue
    }

    // find startline and prepend details tag
    var idx = kMailHistoryStartPhrases.reduce(function (acc, val, _, _) {
      if (acc != -1) {
        return acc
      }

      return (val.type == "regexp") ? replaced_html.search(val.value) : replaced_html.indexOf(val.value)
    }, -1 )

    // it doesn't have email history, skip loop
    if (idx == -1) {
      continue
    }

    // if prepended details tag. append close details tag at least.
    replaced_html = replaced_html.slice(0,idx) + "<details><summary>email history</summary>" + replaced_html.slice(idx, -1) + "</details>";
    // replace p tag to br to work details tag
    replaced_html = replaced_html.replace(new RegExp("<(p|\/p)>", "g"), "<br>");

    conversation.innerHTML = replaced_html;
  }
}

setInterval( ellipsisEmailHistory, 3000 );
