
var $search = $('#search');
var $results = $('#results');

$search.on('submit', function(e) {
  e.preventDefault();
  $.get({
    url: '/AmazonBook/search',
    data: $(this).serialize(),
    success: function(data) {
      renderResults(data);
    },
    error: function(data) {
      var error = data.responseJSON;
      $('#error').text(error.message);
    }
  });
});

function renderResults(books) {
  var li = $('#template').html();
  $results.html('');
  books.forEach(function(book) {
    var item = $(li);
    item.find('.book-title')
      .attr('href', book.url)
      .text(book.title);
    $results.append(item);
  });
}

