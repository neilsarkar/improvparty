angular.module('classes').controller('ListClassController', [
  '$scope', '$routeParams', 'classService',
  function($scope, $routeParams, classService) {
    $scope.class = {
      name: $routeParams.className
    }

    classService.find($scope.class.name).then(function yes(members){
      members.forEach(function(member) {
        member.hash = classService.hash(member)
      })
      $scope.class.members = members
    }, function no() {
      window.alert("Nope.")
    })
  }
])
