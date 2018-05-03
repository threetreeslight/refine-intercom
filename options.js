function constructOptions() {
  var button = document.getElementById("save_options");
  var essential_tag_form = document.getElementById("essential_tags");

  // load essential tag settings
  chrome.storage.sync.get('essential_tags', function(data) {
    essential_tag_form.value = data.essential_tags;
  });

  button.addEventListener('click', function() {
    var tags = essential_tag_form.value.split(',');

    chrome.storage.sync.set({essential_tags: tags}, function() {
      console.log('essential_tags: ' + tags);
    })
  });
}

document.onload(constructOptions());
