angular.module('classes').controller('NewClassController', [
  '$scope', 'classService', '$location',
  function($scope, classService, $location) {
    $scope.$root.bodyClass = 'new-class'

    $scope.class = {
      members: []
    }

    $scope.addMember = function() {
      $scope.class.members.push({
        name: $scope.newMemberName,
        email: $scope.newMemberEmail
      })
      $scope.newMemberName = null
      $scope.newMemberEmail = null
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

      $location.path('classes/'+$scope.class.name)
    }
  }
])
