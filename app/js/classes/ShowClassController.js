angular.module('classes').controller('ShowClassController', [
  '$scope', '$routeParams', 'classService', '$location', 'Choice',
  function($scope, $routeParams, classService, $location, Choice) {
    $scope.$root.bodyClass = 'classes-show'
    $scope.class = {
      name: $routeParams.className
    }

    classService.find($scope.class.name).$loaded(function yes(members){
      members.forEach(function(member) {
        if( classService.hashMember(member) == $routeParams.hash ) {
          $scope.currentUser = member
        }
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
