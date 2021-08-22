$(document).ready(function () {
  var table = $('#mtable').DataTable({
    "ajax": {
      "url": "./static/data/fantasy.json",
      "dataSrc": "players"
    },

    "lengthMenu": [[20, 50, 100, -1], [20, 50, 100, "All"]],

    order : [[4,'desc']],
    pagingType : 'full_numbers',

    'columns': [
      { 'data': 'id', 'render':function(data){
        return '<img src= "https://cdn.nba.com/headshots/nba/latest/260x190/' + data + '.png" height = "47.5" width = "65"/>';
      }},
      { 'data': 'name' },
      { 'data': 'team' },
      { 'data': 'position' },
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
    // "initComplete" : function () {
    //   var r = $('#mtable tfoot tr');
    //   r.find('th').each(function () {
    //     $(this).css('padding', 8);
    //   });
    //   $('#mtable tfoot').append(r);

    //   $(this).css('text-align', 'center');
    // },
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

  //   $('input', this.header()).on('click', function (e) { //stop sorting order
  //     e.stopPropagation();
  //   });
  // });




});