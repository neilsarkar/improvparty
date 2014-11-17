angular.module('classes').controller('ShowClassController', [
  '$scope', '$routeParams', 'classService', '$location', 'Choice',
  function($scope, $routeParams, classService, $location, Choice) {
    $scope.$root.bodyClass = 'classes-show'
    $scope.participants = []
    $scope.class = {
      name: $routeParams.className
    }

    classService.find($scope.class.name).$loaded(function yes(members){
      members.forEach(function(member) {
        var hash = classService.hashMember(member)
        if( hash == $routeParams.hash ) {
          $scope.currentUser = _.extend(member, {hash: hash})
        }
        window.localStorage.setItem('currentUser', JSON.stringify($scope.currentUser))
        classService.save($scope.class.name)
      })
      if( !$scope.currentUser ) {
        $scope.authenticationFailed = true
      } else {
        members = _.reject(members, function(member) {
          return member.slug == $scope.currentUser.slug
        })
        $scope.class.members = members
      }
    }, function no() {
      window.alert("Nope.")
    })

    Choice.forClass($routeParams.className).$watch(function(event) {
      if( event.event == 'child_added' ) {
        $scope.participants.push(classService.slugToName(event.key))
        $scope.abstainers = $scope.class.members.filter(function(member) {
          return $scope.participants.indexOf(member.slug) < 0;
        })
      } else {
        console.debug(event)
      }
    })

    // TODO: clear choices before setting them here
    $scope.save = function() {
      _.each($scope.class.members, function(member) {
        if( member.chosen ) {
          Choice.add($scope.class.name, $scope.currentUser.slug, member)
        }
      })

      $location.path('classes/'+$scope.class.name+'/'+$routeParams.hash+'/results')
    }
  }
])
