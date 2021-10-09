
$(document).ready(function () {
  var m_table = $('#mtable').DataTable({
    "ajax": {
      "url": "./static/data/fantasy.json",
      "dataSrc": "players"
    },

    "dom": "<'row'<'col-sm-12 col-md-6'f><'col-sm-12 col-md-6'<'toolbar'>>>" +
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

    "columnDefs": [
      { "orderable": false, "targets": [0, 2, 3] },
      { "width": "5%", "targets": [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18] }
    ],

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

      $('<button id="refresh">Refresh</button>').appendTo('div.toolbar');

    }
  });

  //toolbar and refresh
  // $("div.toolbar").html('<b>Custom tool bar! Text/images etc.</b>');
  $('div.toolbar').on('click', 'button', function () {
    console.log('pressed');
    m_table.ajax.reload()
  });

  $('.dataTable').on('click', 'tbody td', function () {

    //get textContent of the TD
    console.log('TD cell textContent : ', this.textContent)

    //get id of player
    var rows = m_table.rows(this).indexes();
    var player_id = m_table.cell(rows, 0).data();
    console.log(player_id)

    $.ajax({
      url: 'chart',
      type: 'get',
      data: {
        player_id
      },
      success: function(response) {
        console.log('sucess')
        $('#ajaxSection').html(response);
      },

    })

  });

  //append data to selected table
  //setting team array
  var team_arr = []

  $('#mtable tbody').on('click', 'tr', function () {
    var rowFromTable1 = $(this);
    var clonedRowFromTable1 = rowFromTable1.clone();
    var id = clonedRowFromTable1.find("td.id_col")[0];
    var name = clonedRowFromTable1.find("td.name_col")[0];
    var team = clonedRowFromTable1.find("td.team_col")[0];
    var position = clonedRowFromTable1.find("td.position_col")[0];
    var y1_points = clonedRowFromTable1.find("td.y1_points_col")[0];
    var y1_rank = clonedRowFromTable1.find("td.y1_rank_col")[0];
    var y1_price = clonedRowFromTable1.find("td.y1_price_col")[0];
    //limit to 12 players
    if (team_arr.length < 12) {
      contains(team_arr, $(name)[0].innerText);
      $(this).toggleClass('active')
    }

    //if team array row does not contain player name, append to array and stable
    function contains(a, obj) {
      var i = a.length;
      while (i--) {
        if (a[i] === obj) {
          return true;
        }
      }
      $('tbody', '#stable').append($('<tr>').addClass('selected')//add row with 'selected' class to tbody in #stable
        .append($(id).addClass('s_img'))
        .append($(name).addClass('s_data'))
        .append($(team).addClass('s_data'))
        .append($(position).addClass('s_data'))
        .append($(y1_points).addClass('s_data'))
        .append($(y1_rank).addClass('s_data'))
        .append($(y1_price).addClass('s_data')));

      a.push($(name)[0].innerText);
    }

    // calculate selected points sum
    $('#stable thead th.s_pts').each(function (i) {
      calculateColumn(4);
    });

    // calculate selected price sum
    $('#stable thead th.s_price').each(function (i) {
      calculateColumn(6);
    });

    // calculate selected team length
    $('#stable thead th').each(function (i) {
      calculateLength(1);
    });

    // transfer price to logo_price
    $('#stable thead th').each(function (i) {
      transferCalculation();
    });

  });

  //remove player from #stable
  $('#stable tbody').on('click', 'tr', function () {
    var rowFromTable2 = $(this);
    var clonedRowFromTable2 = rowFromTable2.clone();
    var name = clonedRowFromTable2.find("td.name_col")[0];
    $(this).remove();//remove row in #stable
    for (var i = team_arr.length - 1; i >= 0; i--) {//remove player from team_arr
      if (team_arr[i] === $(name)[0].innerText) {
        team_arr.splice(i, 1);
      }
    }
    calculateColumn(4);
    calculateColumn(6);
    calculateLength(1);
    transferCalculation();
  })
});

//function for calculating column sums
function calculateColumn(index) {
  var total = 0;
  $('#stable tbody tr').each(function () {
    var value = parseFloat($('td', this).eq(index).text());

    if (!isNaN(value)) {
      total += value;
    }
  });

  if (index === 4) {// if calculating points column
    $('#stable tfoot tr td').eq(index).text(total).addClass('total_points');
  }
  else if (index === 6) {// if calculating price column
    $('#stable tfoot tr td').eq(index).text(total).addClass('total_price');
  }
}

//function for calculating row items (# of players)
function calculateLength(index) {
  var rowCount = $('#stable tbody tr').length;
  $('#stable tfoot td').eq(index).text('Selected ' + rowCount + ' players');
}

//function for transfer pts to logo_points
function transferCalculation() {
  // $('.sidebar.open .logo_details .logo_name .logo_points');
  // $('.sidebar.open .logo_details .logo_name .logo_price');
  $('.sidebar .logo_details .logo_name .logo_points').empty().append($('#stable tfoot tr td.total_points')[0].innerHTML).show(400);
  $('.sidebar .logo_details .logo_name .logo_price').empty().append($('#stable tfoot tr td.total_price')[0].innerHTML).show(400);
}