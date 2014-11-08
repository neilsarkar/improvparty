angular.module('classes').controller('ResultsController', [
  '$scope', '$routeParams', 'classService', 'Choice',
  function($scope, $routeParams, classService, Choice) {
    var choices = [];

    $scope.class = {name: $routeParams.className}

    classService.find($routeParams.className).$loaded(function yes(members){
      members.forEach(function(member) {
        if( classService.hashMember(member) == $routeParams.hash ) {
          member.hash = $routeParams.hash
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
      if( choices.length < 4 ) {
        $scope.incomplete = choices.length
      } else {
        $scope.incomplete = null
        Choice.matrix($routeParams.className).then(function yes(matrix) {
          var matcher = new Matcher(matrix)
          $scope.matches = matcher.teams()[$scope.currentUser.slug].map(function(member) {
            return classService.slugToName(member)
          })
        }, function no() {
          console.error("Couldn't load class matrix")
        })

      }
    }
  }
])
