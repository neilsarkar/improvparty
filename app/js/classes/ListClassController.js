angular.module('classes').controller('ListClassController', [
  '$scope', '$routeParams', 'classService',
  function($scope, $routeParams, classService) {
    $scope.class = {
      name: $routeParams.className
    }

    classService.find($scope.class.name).$loaded(function yes(members){
      members.forEach(function(member) {
        member.hash = classService.hashMember(member)
      })
      $scope.class.members = members
    }, function no() {
      window.alert("Nope.")
    })
  }
])
