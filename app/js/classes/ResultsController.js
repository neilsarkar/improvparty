angular.module('classes').controller('ResultsController', [
  '$scope', '$routeParams', 'classService', 'Choice',
  function($scope, $routeParams, classService, Choice) {
    var choices = [];

    classService.find($routeParams.className).$loaded(function yes(members){
      members.forEach(function(member) {
        if( classService.hashMember(member) == $routeParams.hash ) {
          $scope.currentUser = member
        }
      })

      Choice.forClass($routeParams.className).$watch(function(event) {
        if( event.event == 'child_added' ) {
          choices.push(event.key)
          checkChoices()
        } else {
          console.debug(event)
        }
      })
    }, function no() {
      window.alert("Sorry, something went wrong.")
    })

    function checkChoices() {
      if( choices.length < 8 ) {
        console.log(choices)
        $scope.incomplete = choices.length
      } else {
        var picks = {}
        choices.forEach(function(member) {
          // FIXME: set up picks
        })
        var matcher = new Matcher(picks)
        $scope.matches = matcher.teams($scope.currentUser.slug)
      }
    }
  }
])
