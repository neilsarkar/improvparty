angular.module('classes').controller('NewClassController', [
  '$scope', 'classService',
  function($scope, classService) {
    $scope.$root.bodyClass = 'new-class'

    $scope.class = {
      members: []
    }

    $scope.newMember = function() {
      $scope.class.members.push({})
    }

    $scope.removeMember = function(member) {
      $scope.class.members = _.reject($scope.class.members, function(mbr) {
        return member.name == mbr.name
      })
    }

    $scope.create = function() {
      _.each($scope.class.members, function(member) {
        classService.addMember($scope.class.name, member)
      })
    }
  }
])
