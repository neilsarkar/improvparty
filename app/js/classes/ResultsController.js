angular.module('classes').controller('ResultsController', [
  '$scope', '$routeParams', 'classService', 'Choice', '$timeout',
  function($scope, $routeParams, classService, Choice, $timeout) {
    var choices = [];

    $scope.class = {name: $routeParams.className}
    $scope.threshold = 12

    classService.find($routeParams.className).$loaded(function yes(members){
      $scope.class.members = members;
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
      if( choices.length < $scope.threshold ) {
        $scope.incomplete = true
        $scope.participants = choices.map(function(slug) {
          return classService.slugToName(slug)
        })

        $scope.abstainers = $scope.class.members.filter(function(member) {
          return choices.indexOf(member.slug) < 0;
        })
      } else {
        $scope.incomplete = null
        $scope.matches = [classService.slugToName($scope.currentUser.slug)]
        Choice.matrix($routeParams.className).then(function yes(matrix) {
          var matcher = new Matcher(matrix),
              team = [$scope.currentUser.slug];

          nextStep()

          function nextStep() {
            var step = matcher.step(team)
            if( !step ) return $scope.pool = [];
            $scope.pool = step.pool.map(function(candidate) {
              return {
                name: classService.slugToName(candidate.player),
                score: parseInt(candidate.score / 100)
              }
            })
            $timeout(function() {
              team = step.team
              $scope.matches = team.map(function(member) {
                return classService.slugToName(member)
              })
              nextStep()
            }, 1000)
          }
        }, function no() {
          console.error("Couldn't load class matrix")
        })
      }
    }
  }
])
