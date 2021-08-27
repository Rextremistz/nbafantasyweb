$(document).ready(function () {
  var table = $('#mtable').DataTable({
    "ajax": {
      "url": "./static/data/fantasy.json",
      "dataSrc": "players"
    },

    "lengthMenu": [[20, 50, 100, -1], [20, 50, 100, "All"]],

    order: [[4, 'desc']],
    pagingType: 'full_numbers',

    'columns': [
      {
        'data': 'id', 'render': function (player_id) {
          return '<img src= "https://cdn.nba.com/headshots/nba/latest/260x190/' + player_id + '.png" height = "47.5" width = "65"/>';
        },
      },
      { 'data': 'name' },
      { 'data': 'team' },
      { 'data': 'position' },
      { 'data': 'y1_points' },
      { 'data': 'y1_rank' },
      { 'data': 'y2_points' },
      { 'data': 'y2_rank' },
      { 'data': 'y3_points' },
      { 'data': 'y3_rank' },
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

    "columnDefs": [{
      "orderable": false,
      "targets": [0,2,3]
    }],

    "initComplete": function () {
      this.api().columns([2, 3]).every(function (d) { //add
        var theadname = $("#mtable th").eq([d]).text();
        var column = this;
        var select = $('<select class="form-control my-1"><option value="">All '
          + theadname + "s</option></select>")
          .appendTo($(column.header()).empty())
          .on('change', function () {
            var val = $.fn.dataTable.util.escapeRegex(
              $(this).val()
            );
            column
              .search(val ? '^' + val + '$' : '', true, false)
              .draw();
          });


        column.data().unique().sort().each(function (d, j) {
          select.append('<option value="' + d + '">' + d + '</option>')
        });
      });
    }
  });

  // searchbox on top of column
  // $('#mtable tfoot th').each(function () {
  //   var title = $(this).text();
  //   $(this).html('<input type="text"/>'); //placeholder = "Search ' + title + '"
  // });

  // table.columns().every(function () {
  //   var that = this;
  //   $('input', this.footer()).on('keyup change', function () {
  //     if (that.search() !== this.value) {
  //       that
  //         .search(this.value)
  //         .draw();
  //     }
  //   });

  // $('input', this.header()).on('click', function (e) { //stop sorting order
  //   e.stopPropagation();
  // });
  // });




});