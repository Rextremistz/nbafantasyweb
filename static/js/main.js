$(document).ready(function () {
  $('#example').DataTable({
    "ajax" : {
      "url" : "./static/data/fantasy.json",
      "dataSrc" : "players"
    },

    'columns' : [
      {'data':'name'},
      {'data':'y1_points'},
      {'data':'y2_points'},
      {'data':'y3_points'},
      {'data':'y1_average'},
      {'data':'y2_average'},
      {'data':'y3_average'},
      {'data':'y1_games'},
      {'data':'y2_games'},
      {'data':'y3_games'},
      {'data':'y1_price'},
      {'data':'y2_price'},
      {'data':'y3_price'},
    ]


  });
} );