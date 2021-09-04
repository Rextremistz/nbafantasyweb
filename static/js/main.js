$(document).ready(function () {
  var m_table = $('#mtable').DataTable({
    "ajax": {
      "url": "./static/data/fantasy.json",
      "dataSrc": "players"
    },

    "dom": "<'row'<'col-sm-12 col-md-6'f><'col-sm-12 col-md-6 your_team'>>" +
      "<'row'<'col-sm-12 col-md-2'l>>" +
      "<'row'<'col-sm-12 col-md-2'i>>" +
      "<'row'<'col-sm-12'tr>>" +
      "<'row'<'col-sm-12 col-md-7'p>>",

    "lengthMenu": [[20, 50, 100, -1], [20, 50, 100, "All"]],

    "language": {
      "info": "Showing _START_ to _END_ of _TOTAL_ players",
      "lengthMenu": "Show _MENU_ players",
      "search": '<i class="fa fa-search"></i>',
      "searchPlaceholder": "Search",
    },

    order: [[4, 'desc']],
    pagingType: 'full_numbers',

    'columns': [
      {
        'data': 'id', 'className': 'id_col', 'render': function (player_id) {
          return '<img src= "https://cdn.nba.com/headshots/nba/latest/260x190/' + player_id + '.png" height = "31.6" width = "43.3"/>';
        },
      },
      { 'data': 'name', 'className': 'name_col' },
      { 'data': 'team', 'className': 'team_col' },
      { 'data': 'position', 'className': 'position_col' },
      { 'data': 'y1_points', 'className': 'y1_points_col' },
      { 'data': 'y1_rank', 'className': 'y1_rank_col' },
      { 'data': 'y2_points', 'className': 'y2_points_col' },
      { 'data': 'y2_rank', 'className': 'y2_rank_col' },
      { 'data': 'y3_points', 'className': 'y3_points_col' },
      { 'data': 'y3_rank', 'className': 'y3_rank_col' },
      { 'data': 'y1_average', 'className': 'y1_average_col' },
      { 'data': 'y2_average', 'className': 'y2_average_col' },
      { 'data': 'y3_average', 'className': 'y3_average_col' },
      { 'data': 'y1_games', 'className': 'y1_games_col' },
      { 'data': 'y2_games', 'className': 'y2_games_col' },
      { 'data': 'y3_games', 'className': 'y3_games_col' },
      { 'data': 'y1_price', 'className': 'y1_price_col' },
      { 'data': 'y2_price', 'className': 'y2_price_col' },
      { 'data': 'y3_price', 'className': 'y3_price_col' },
    ],

    "columnDefs": [{
      "orderable": false,
      "targets": [0, 2, 3]
    }],

    // "createdRow": function ( row, data, index ) {//add id to each row element
    //   $('td', row).eq(4,5,6,7,8,9).attr('id', 'points_col');
    // },

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
      })
    }

  });

  // $('.dataTable').on('click', 'tbody td', function () {

  //   //get textContent of the TD
  //   console.log('TD cell textContent : ', this.textContent)

  //   //get the value of the TD using the API
  //   console.log('value by API : ', m_table.cell({ row: this.parentNode.rowIndex, column: this.cellIndex }).data());
  // });

  //append data to selected table
  $('#mtable tbody').on('click', 'tr', function () {
    $(this).toggleClass('active');

    var rowFromTable1 = $(this);
    // .. Take a clone/copy of it ..
    var clonedRowFromTable1 = rowFromTable1.clone();
    var id = $(this).find("td.id_col")[0];
    var name = $(this).find("td.name_col")[0];
    var team = $(this).find("td.team_col")[0];
    var position = $(this).find("td.position_col")[0];
    var y1_points = $(this).find("td.y1_points_col")[0];
    var y1_rank = $(this).find("td.y1_rank_col")[0];
    var y1_average = $(this).find("td.y1_average_col")[0];
    var y1_games = $(this).find("td.y1_games_col")[0];
    var y1_price = $(this).find("td.y1_price_col")[0];

    $('tbody', '#stable').append($('<tr>').addClass('selected')
      .append($(id).addClass('s_img'))
      .append($(name).addClass('s_data'))
      .append($(team).addClass('s_data'))
      .append($(position).addClass('s_data'))
      .append($(y1_points).addClass('s_data'))
      .append($(y1_rank).addClass('s_data'))
      .append($(y1_average).addClass('s_data'))
      .append($(y1_games).addClass('s_data'))
      .append($(y1_price).addClass('s_data')));

    m_table.row($(this)).remove().draw();


  });

  $('#stable tbody').on('click', 'tr', function () {
    $(this).remove();
  })


  // calculate selected team
  $('#stable thead th').each(function(i)
  {
      calculateColumn(i);
  });


});

function calculateColumn(index)
{
    var total = 0;
    $('#stable tbody tr').each(function()
    {
        var value = parseInt($('td', this).eq(index).text());
        console.log(value)
        if (!isNaN(value))
        {
            total += value;
        }
    });

    $('#stable tfoot td').eq(index).text('Total: ' + total);
}​