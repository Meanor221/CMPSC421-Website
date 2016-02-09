
window.addEventListener('load', tableOfContents, false);

function tableOfContents() {

  function $(selector, context) {
    context = context || document;
    return Array.prototype.slice.call(context.querySelectorAll(selector), 0);
  }

  var toc = [];
  var h1Count = 0;
  var h2Count = 0;

  // add section numbers
  $('h1, h2').map(function(hx, index, array) {
    if(hx.tagName === 'H1') {
      var h1 = hx;
      ++h1Count;
      var anchor = h1Count + "-section";
      h1.innerText = h1Count + " " + h1.innerText;
      var link = '#' + anchor;
      h1.id = anchor;
      toc.push({text: h1.innerText, link: link});
    } else if(hx.tagName === 'H2') {
      var h2 = hx;
      ++h2Count;
      var anchor = h1Count + "-" + h2Count + "-section";
      h2.innerText = h1Count + "." + h2Count + " " + h2.innerText;
      var link = '#' + anchor;
      h2.id = anchor;
      toc.push({text: h2.innerText, link: link}); 
    }
  });

  // display toc
  $('#table-of-contents')[0].innerHTML = toc
    .map(function(section) {
      return "<a href='" + section.link + "'>"+section.text+"</a>"
    })
    .join('<br/>');

}

