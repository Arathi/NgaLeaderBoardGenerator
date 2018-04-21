function createLeaderBoard(data) {
  $("table#leaderboard").empty();
  
  var titleHtml = "<tr><td colspan='2' class='title'>" + data.title + "</td></tr>";
  $("table#leaderboard").append(titleHtml);
  
  for (rindex=0; rindex<data.ranks.length; rindex++) {
    var rank = data.ranks[rindex];
    var rankHtml = "<tr><td colspan='2' class='rank'>" + rank.name + "</td></tr>";
    $("table#leaderboard").append(rankHtml);
    
    for (gindex=0; gindex<rank.groups.length; gindex++) {
      var group = rank.groups[gindex];
      var scid = "sc-" + group.score.replace('.', '_').replace('+', 'p');
      var groupHtml = "<tr style='background-color: " + group.color + ";'>" + 
        "<td class='score'>" + group.score + "</td>" + 
        "<td class='servant-container' id='" + scid + "'></td>" + 
        "</tr>";
      $("table#leaderboard").append(groupHtml);
      
      for (sindex=0; sindex<group.servants.length; sindex++) {
        var servant = group.servants[sindex];
        var imgHtml = "<img class='avatar' src='" + servant.avatarUrl + "' />";
        var fgowikiUrl = "https://fgowiki.com/guide/petdetail/" + servant.id;
        var linkHtml = "<a href='" + fgowikiUrl + "' class='servant' alt='" + servant.name + "'>" + imgHtml + "</a>";
        $("td#" + scid).append(linkHtml);
      }
    }
  }
}

function reloadLeaderBoard() {
  var rare = $("select#ddl-rare").val();
  var url = "leaderboard_" + rare + ".json?t=1524313206";
  $.ajax({
    "url": url,
    "dataType": "json",
    "success": createLeaderBoard,
    "error": function(data) {
      console.log("error");
    }
  });
}

$(document).ready(function() {
  reloadLeaderBoard();
});

$("#btn-generate").click(function() {
  reloadLeaderBoard();
});
