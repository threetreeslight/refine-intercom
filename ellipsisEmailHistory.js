const kMailStartPhrases = ["-----Original Message-----", "&gt; &gt;", "<b>From:</b>"]

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
    var idx = kMailStartPhrases.reduce(function (acc, val, _, _) {
        return acc == -1 ? replaced_html.indexOf(val) : acc
      },
      -1
    )

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
