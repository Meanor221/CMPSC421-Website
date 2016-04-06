
var crudUrl = '/';

function actionComplete() {
  window.location.reload();
}

var $creater = $('#sudent-creater');
$creator.hide();

$(document).on('click', '.x-show-creator', function(e) {
  $creator.show();
});

$(document).on('click', '.x-hide-creator', function(e) {
  $creator.hide();
});

$creator.on('submit', 'form', function(e) {
  e.preventDefault();
  var data = $(this).serialize();
  $.ajax({
    method: 'post'.toUpperCase(),
    url: crudUrl,
    data: data,
    complete: actionComplete,
  });
});

var $editor = $('#student-editor');
$editor.hide();

$(document).on('click', '.x-show-editor', function(e) {
  var studentRow = $(this).parents('tr');
  var props = ['studentId', 'firstName', 'lastName', 'teamId'];
  studentRow.find('td').map(function(index, elem) {
    $('input.'+props[index] ,$editor).val($(elem).text());
  });
  $editor.show();
});

$(document).on('click', '.x-hide-editor', function(e) {
  $editor.hide();
});

$editor.on('submit', 'form', function(e) {
  e.preventDefault();
  var data = $(this).serialize();
  $.ajax({
    method: 'put'.toUpperCase(),
    url: crudUrl,
    data: data,
    complete: actionComplete,
  });
});

$(document).on('click', '.x-delete-team', function(e) {
  var teamId = $(this).attr('data-team-id');
  if(!teamId) {
    throw new Error('data-team-id not provided on action link');
  }
  $.ajax({
    method: 'delete'.toUpperCase(),
    url: crudUrl,
    data: {teamId: teamId},
    complete: actionComplete,
  });
});

$(document).on('click', '.x-delete-student', function(e) {
  var studentId = $(this).attr('data-student-id');
  if(!studentId) {
    throw new Error('data-student-id not provided on action link');
  }
  $.ajax({
    method: 'delete'.toUpperCase(),
    url: crudUrl,
    data: {studentId: studentId},
    complete: actionComplete,
  });
});

