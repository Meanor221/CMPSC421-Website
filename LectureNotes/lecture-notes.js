
var db = (function store() {
  var dbName = 'LectureNotes';
  var initialized = false; // initialize before get/set allowed

  function initialize(callback) {
    // open DB
    initialized = true;
    callback();
  }

  function getNotes() {
    // return array of all notes
  }

  function setNotes(notes) {
    // store array of all notes
  }

  return {
    initialize: initialize,
    getNotes: getNotes,
    setNotes: setNotes,
  };
})();

var notes = [];
var mockNotes = [
  {id: 1, lecture: 3, slide: 2, text: 'Poop'},
  {id: 2, lecture: 4, slide: 3, text: 'Pee'},
  {id: 3, lecture: 7, slide: 2, text: 'Double poop'},
  {id: 4, lecture: 4, slide: 3, text: 'Microsoft Office'},
]; // used to test UI

var $noteList = $('.x-note-list');

function renderNotes(notes) {
  $noteList.html(notes.map(function(note) {
    return [
      '<li class="note x-note" id="'+note.id+'">',
        '<p>'+note.text+'</p>',
        '<span>Lecture: '+note.lecture+', Slide: '+note.slide+'</span>',
        '<span class="x-note-delete">Delete note</span>',
      '</li>'
    ].join('');
  }).join(''));
}

$noteList.on('click', '.x-note-delete', function(e) {
  var noteId = $(this).parent('.x-note').attr('id');
  // remove note from list and save to db
});

var $noteCreate = $('.x-note-create');
$noteCreate.on('submit', function(e) {
  e.preventDefault();
  var data = $noteCreate.serialize();
  data.id = null; // create a unique id somehow
  // add note to note list and save to db
});

var mock = true; // toggle for DB use
db.initialize(function() {
  if(!mock) {
    notes = db.getNotes();
  } else {
    notes = mockNotes;
  }
  renderNotes(notes);
});

