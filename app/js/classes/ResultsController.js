angular.module('classes').controller('ResultsController', [
  '$scope', '$routeParams', 'classService',
  function($scope, $routeParams, classService) {
    classService.find($routeParams.className).then(function yes(members){
      members.forEach(function(member) {
        if( CryptoJS.SHA1(member.slug).toString() == $routeParams.hash ) {
          $scope.currentUser = member
        }
      })

      classService.choices($routeParams.className).then(function yes(choices) {
        if( choices.length < 8 ) {
          $scope.incomplete = choices.length
        } else {
          var picks = {}
          _.each(members, function(member) {
            // FIXME: set up picks
          })
          var matcher = new Matcher(picks)
          $scope.matches = matcher.teams($scope.currentUser.slug)
        }
      }, function no() {
        window.alert("Sorry, something went wrong.")
      })
    }, function no() {
      window.alert("Sorry, something went wrong.")
    })
  }
])
