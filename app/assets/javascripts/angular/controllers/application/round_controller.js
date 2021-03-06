App.controller('RoundController', ['$scope', '$http', '$location', '$routeParams', function($scope, $http, $location, $routeParams){
  $scope.round = $routeParams.id || 4;

  $scope.showRound = function(){
    $scope.matches = [];
    var id = $scope.round;
    $http.get('/api/round/' + id).success(function(data){
      angular.forEach(data, function(m, index){
        m.match.pair = index%2 === 0 ? 'gray' : 'white';
        m.match.empty = m.match.teams.length === 0 ? true : false;
        m.match.winner = m.match.champion === null ? false : true;
        $scope.matches.push(m.match);
      });
    });
  };

  $scope.showRound();

  $scope.deleteTeam = function(team_id, match_id){
    $http.post('api/match/'+match_id+'/clear_space');
    $http.delete('api/teams/'+team_id).success(function(){
      $scope.showRound();
    });
  };

  $scope.updateScore = function(set){
    $http.post('api/scores/update', { set: set });
  };

  $scope.renderWinner = function(){
    winner = [];
    angular.forEach($scope.matches[0].match_sets, function(set){
      if(set.scores[0].total != null || set.scores[1].total != null){
        winner.push(true);
      } else {
        winner.push(false);
      }
    });

    if(winner[0] === true && winner[1] === true && winner[2] === true){
      $scope.showRound();
    }
  };

  $scope.showTeam = function(id){
    $location.path('team/'+id);
  };

  $scope.nextMatch = function(id){
    var next_id = parseInt(id) + 1;
    if(next_id < 4){
      $location.path('round/'+next_id);
    } else {
      $location.path('round/final_match');
    }
  };

  $scope.previousMatch = function(id){
    var next_id = parseInt(id) - 1;
    if(next_id > 0){
      $location.path('round/'+next_id);
    }
  };

  $scope.fillModal = function(team, players){
    $team   = $("#teamModal .teamName");
    $img    = $("#teamModal .teamImage");
    $player = $("#teamModal .player");
    $team.text(team.name);
    $img.attr('src', team.picture_url);
    $player.each(function(){
      player = players[$(this).index()];
      $(this).find(".user_account").text(player.user_account);
      if (player.type_account == 'twitter') {
        $(this).find(".user_account").attr('href', "https://www.twitter.com/"+player.user_account);
      }else {
        $(this).find(".user_account").attr('href', "https://www.github.com/"+player.user_account);
      }
      $(this).find(".email").text(player.email);
      $(this).find('.image').attr('src', player.picture_url);
    });
  };
}]);

App.directive('scoreinput', function(){
  return function(scope, element, attr){
    element.bind('click', function(){
      element.siblings().children('span').attr('style', 'display: block; margin-top: 20px;');
      element.siblings().children().children('input').attr('style', 'display: none;');
      element.attr('style', 'display: none;');
    });
  }
});
