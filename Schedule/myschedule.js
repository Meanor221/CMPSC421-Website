
var $schedule = $('#schedule');
var scheduleJson = null;

$.get('schedule.json', function(data) {
  scheduleJson = data;
  $schedule.html(scheduleHtml(scheduleJson));
  var pipeline = [
    markLabDays,
    markQuizDays,
    markSpecialQuirks,
    makeTagRowSpans,
  ].forEach(function(f) {
    f($schedule);
  });
});

function scheduleHtml(json) {
  var classes = json;
  var headers = ['Class #', 'Date', 'Tag', 'Topic', 'Project', 'Notes'];
  return [
    "<table>",
      "<thead>",
        headers.map(function(x) {return '<th>'+x+'</th>'}).join(''),
      "</thead><tbody>",
        classes.map(function(classRow) {
          var row = classRow.map(function(col) {
            return '<td>'+col+'</td>';
          }).join('');
          return '<tr class="class-row">'+row+'</tr>';
        }).join(''),
        "<tr class='class-row class-row--masthead'><td colspan='6'>",
          "Final Project Due: Wednesday, May 4, 2016",
        "</td></tr>",
      "</tbody>",
    "</table>"
  ].join('');
}

function makeTagRowSpans($schedule) {
  var sections = [];
  for(var i = 0; i < 16; i++) {
    var b = (i % 2) === 0;
    sections.push(b);
    sections.push(b);
    if(i !== 1) sections.push(b);
  }

  var runningTag = null;
  var runningStreak = 0;
  $schedule.find('tbody tr').each(function(index) {
    var tagCell = $(this).find('td:nth-child(3)').get(0);
    if(!tagCell) {
      runningTag.rowSpan = runningStreak;
      return false;
    }
    if(!runningTag) {
      runningTag = tagCell;
      runningTag.classList.add('class-cell--tag');
      runningStreak++;
    } else if(sections[index-1] === sections[index]) {
      $(tagCell).remove();
      runningStreak++;
    } else {
      runningTag.rowSpan = runningStreak;
      runningTag = tagCell;
      runningTag.classList.add('class-cell--tag');
      runningStreak = 1;
    }
    var mod = sections[index] ? 'on' : 'off';
    $(this).addClass('class-row--stripe-'+mod);
  });
}

function markLabDays($schedule) {
  $schedule.find('tbody tr').each(function(index) {
    var topic = $('td:nth-child(4)', this);
    if(topic.text().indexOf('Lab') === 0) {
      this.classList.add('class-row--lab'); 
      topic.addClass('class-cell--lab');
    }
  });
}

function markQuizDays($schedule) {
  $schedule.find('tbody tr').each(function(index) {
    var notes = $('td:last-child', this);
    if(notes.text().indexOf('Quiz') === 0) {
      this.classList.add('class-row--quiz');
    }
  });
}

function markSpecialQuirks($schedule) {
  $schedule.find('tr td:nth-child(4)').each(function(index) {
    if(this.innerText.toLowerCase() === 'work on project') {
      this.classList.add('class-cell--work-day');
    }
  });
  $schedule.find('tr td:nth-child(5)').each(function(index) {
    if(this.innerText.toLowerCase() === 'teamwork calendar') {
      this.classList.add('class-cell--team-cal');
    }
  });
  $schedule.find('tr').get()
    .slice(-4).slice(0, 3)
    .forEach(function(tr) {
      tr.classList.add('class-row--final');
    });
}

