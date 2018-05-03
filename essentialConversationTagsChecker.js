// TODO: autoload setted EssentialTags
const kEssentialTags = ["foo", "bar"]

// generate missing tag window
let missing_tag_window = document.createElement('div');

missing_tag_window.style.width = "100%";
missing_tag_window.style.padding = "5px";
missing_tag_window.style.color = "darkolivegreen"
missing_tag_window.style.backgroundColor= "yellowgreen"

var UpdateMissingTagWindowByTags = function(missing_tags) {
    if (missing_tags.length == 0 ) {
      missing_tag_window.style.color = "darkolivegreen"
      missing_tag_window.style.backgroundColor= "yellowgreen"
    } else {
      missing_tag_window.style.color = "indianred"
      missing_tag_window.style.backgroundColor= "orange"
    }

    missing_tag_window.innerText =`Missing Tags: ${String(missing_tags)}`;
}


var extractFirstConversationTags = function() {
  var first_conversation = document.getElementsByClassName('conversation__part-wrapper')[0]

  // tags indede of element that has u__cf class
  var tag_anchors = first_conversation.getElementsByClassName('u__cf')[0].getElementsByTagName("a")

  // extract set tags
  var set_tags = Array.from(tag_anchors).reduce(function (acc, anchor, _, _) {
      if (anchor.href.includes("tag=")) {
          acc.push(anchor.innerText);
      }
      return acc
    },
    []
  );

  return set_tags
}

var missingEssentialTags = function(tags) {
  // cal missing tags
  var missing_tags = kEssentialTags.reduce( function(acc, essential_tag, _, _) {
    var is_exists = tags.some( val => val.match(new RegExp(`^${essential_tag}`, "g")) )

    // whne missing essential tag, append missing_tags
    if (!is_exists) {
      acc.push(essential_tag)
    }

    return acc
  }, []);

  return missing_tags
}

var startConvesationTagsValidationLoop = function() {
  setInterval(function() {
    UpdateMissingTagWindowByTags( missingEssentialTags(extractFirstConversationTags()) );
  }, 1000);
};

// wait to load conversation
var nIntervId = setInterval( function() {
  var first_conversation = document.getElementsByClassName('conversation__part-wrapper')[0]

  if (first_conversation) {
    // locate missing_tag_window
    var controler = document.getElementsByClassName('inbox__conversation-controls__pane-selector')[0]
    controler.parentElement.insertBefore(missing_tag_window, controler)

    clearInterval(nIntervId);
    startConvesationTagsValidationLoop();
  }
}, 1000 );
