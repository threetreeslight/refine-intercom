// generate contextToggleButton
let contextToggleButton = document.createElement('button');

contextToggleButton.style.width = '100px';
contextToggleButton.style.fontSize = '10px';
contextToggleButton.innerText = 'hide context';
contextToggleButton.dataset.opened = true;

contextToggleButton.addEventListener('click', function() {
  var right_pain = document.getElementsByClassName('conversation__inbox__current-context')[0];
  var conversation_pain = document.getElementsByClassName('conversation__view__stream-wrapper')[0];

  if(contextToggleButton.dataset.opened == "true") {
    right_pain.style.width = "0%"
    conversation_pain.style.width = "100%"

    contextToggleButton.dataset.opened = false;
    contextToggleButton.innerText = 'show context';

  } else {
    right_pain.style.width = "30%"
    conversation_pain.style.width = "70%"

    contextToggleButton.dataset.opened = true;
    contextToggleButton.innerText = 'hide context';
  }
});

// when apper inbox list, append contextToggleButton to header
var nIntervId = setInterval( function() {
  var inbox_list_header = document.getElementsByClassName('conversation__inbox__list-header')[0];

  if (inbox_list_header) {
    inbox_list_header.appendChild(contextToggleButton);
    clearInterval(nIntervId);
  }
}, 1000 );

