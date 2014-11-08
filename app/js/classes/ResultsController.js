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
      if( choices.length < 2 ) {
        $scope.incomplete = choices.length
      } else {
        $scope.incomplete = null
        Choice.matrix($routeParams.className).then(function yes(matrix) {
          console.log(matrix)
          var matcher = new Matcher(matrix)
          $scope.matches = matcher.teams()[$scope.currentUser.slug]
        }, function no() {
          console.error("Couldn't load class matrix")
        })

      }
    }
  }
])
