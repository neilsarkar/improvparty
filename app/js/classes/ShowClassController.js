angular.module('classes').controller('ShowClassController', [
  '$scope', '$routeParams', 'classService',
  function($scope, $routeParams, classService) {
    $scope.class = {
      name: $routeParams.className
    }

    classService.find($scope.class.name).then(function yes(members){
      $scope.class.members = members
    }, function no() {
      window.alert("Nope.")
    })

    $scope.setSelf = function(member) {
      $scope.currentUser = member
    }

    // TODO: clear choices before setting them here
    $scope.save = function() {
      _.each($scope.class.members, function(member) {
        if( member.chosen ) {
          classService.addChoice($scope.class.name, $scope.currentUser.name, member)
        }
      })
    }
  }
])
