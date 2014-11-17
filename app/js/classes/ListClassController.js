angular.module('classes').controller('ListClassController', [
  '$scope', '$routeParams', 'Class',
  function($scope, $routeParams, Class) {
    $scope.class = {
      name: $routeParams.className
    }

    Class.find($scope.class.name).$loaded(function yes(members){
      members.forEach(function(member) {
        member.hash = Class.hashMember(member)
      })
      $scope.class.members = members
    }, function no() {
      window.alert("Nope.")
    })
  }
])
