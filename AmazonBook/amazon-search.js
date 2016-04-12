
var $search = $('#search');
var $results = $('#results');

$search.on('submit', function(e) {
  e.preventDefault();
  $.get({
    url: '/AmazonBook/search',
    data: $(this).serialize(),
    success: function(data) {
      var books = extractBooks(data);
      renderBooks(books);
    },
    error: function(data) {
      var error = data.responseJSON;
      $('#error').text(error.message);
    }
  });
});

function extractBooks(data) {
  if(!data.Items) return [];
  if(!data.Items.Item) return [];
  return data.Items.Item.map(function(x) {
    return {
      url: x.DetailPageURL,
      title: x.ItemAttributes.Title,
      author: x.ItemAttributes.Author,
    };
  });
}

function renderBooks(books) {
  var li = $('#template').html();
  $results.html('');
  books.forEach(function(book) {
    var item = $(li);
    item.find('.book-title')
      .attr('href', book.url)
      .text(book.title);
    item.find('.book-author')
      .text(book.author);
    $results.append(item);
  });
}

