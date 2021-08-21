$(document).ready(function () {
  var table = $('#mtable').DataTable({
    "ajax": {
      "url": "./static/data/fantasy.json",
      "dataSrc": "players"
    },

    "lengthMenu": [[20, 50, 100, -1], [20, 50, 100, "All"]],

    'columns': [
      { 'data': 'name' },
      { 'data': 'y1_points' },
      { 'data': 'y2_points' },
      { 'data': 'y3_points' },
      { 'data': 'y1_average' },
      { 'data': 'y2_average' },
      { 'data': 'y3_average' },
      { 'data': 'y1_games' },
      { 'data': 'y2_games' },
      { 'data': 'y3_games' },
      { 'data': 'y1_price' },
      { 'data': 'y2_price' },
      { 'data': 'y3_price' },
    ],

    stateSave: true
  });

  initComplete: (function () {
    var r = $('#mtable tfoot tr');
    r.find('th').each(function () {
      $(this).css('padding', 8);
    });
    $('#mtable thead').append(r);
    $(this).css('text-align', 'center');
  });

  $('#mtable thead th').each(function () {
    var title = $(this).text();
    $(this).html('<input type="text"/>'); //placeholder = "Search ' + title + '"
  });

  table.columns().every(function () {
    var that = this;
    $('input', this.header()).on('keyup change', function () {
      if (that.search() !== this.value) {
        that
          .search(this.value)
          .draw();
      }


    });

    $('input', this.header()).on('click', function (e) { //stop sorting order
      e.stopPropagation();
    });
  });




});