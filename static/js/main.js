$(document).ready(function () {
  var table = $('#mtable').DataTable({
    "ajax": {
      "url": "./static/data/fantasy.json",
      "dataSrc": "players"
    },

    "dom" : "<'row'<'col-sm-12 col-md-6'f>>" +
    "<'row'<'col-sm-12 col-md-3'l>>" +
    "<'row'<'col-sm-12'tr>>" +
    "<'row'<'col-sm-12 col-md-7'p>>",

    "lengthMenu": [[20, 50, 100, -1], [20, 50, 100, "All"]],

    order: [[4, 'desc']],
    pagingType: 'full_numbers',

    'columns': [
      {
        'data': 'id', 'render': function (player_id) {
          return '<img src= "https://cdn.nba.com/headshots/nba/latest/260x190/' + player_id + '.png" height = "31.6" width = "43.3"/>';
        },
      },
      { 'data': 'name', 'className': 'player_col' },
      { 'data': 'team', 'className': 'team_col' },
      { 'data': 'position', 'className': 'position_col' },
      { 'data': 'y1_points', 'className': 'dt-body-left' },
      { 'data': 'y1_rank', 'className': 'dt-body-left' },
      { 'data': 'y2_points', 'className': 'dt-body-left' },
      { 'data': 'y2_rank', 'className': 'dt-body-left' },
      { 'data': 'y3_points', 'className': 'dt-body-left' },
      { 'data': 'y3_rank', 'className': 'dt-body-left' },
      { 'data': 'y1_average', 'className': 'dt-body-left' },
      { 'data': 'y2_average', 'className': 'dt-body-left' },
      { 'data': 'y3_average', 'className': 'dt-body-left' },
      { 'data': 'y1_games', 'className': 'dt-body-left' },
      { 'data': 'y2_games', 'className': 'dt-body-left' },
      { 'data': 'y3_games', 'className': 'dt-body-left' },
      { 'data': 'y1_price', 'className': 'dt-body-left' },
      { 'data': 'y2_price', 'className': 'dt-body-left' },
      { 'data': 'y3_price', 'className': 'dt-body-left' },
    ],

    "columnDefs": [{
      "orderable": false,
      "targets": [0,2,3]
    }],

    "initComplete": function () {
      this.api().columns([2, 3]).every(function (d) { //add selector to teams and position
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


  $('.dataTable').on('click', 'tbody td', function() {

    //get textContent of the TD
    console.log('TD cell textContent : ', this.textContent)

    //get the value of the TD using the API
    console.log('value by API : ', table.cell({ row: this.parentNode.rowIndex, column : this.cellIndex }).data());
  })




});