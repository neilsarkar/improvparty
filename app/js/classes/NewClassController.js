angular.module('classes').controller('NewClassController', [
  '$scope', 'Class', '$location',
  function($scope, Class, $location) {
    $scope.$root.bodyClass = 'classes-new'

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
        Class.addMember($scope.class.name, member)
      })

      alert('Class Created. FIXME: send email')
    }
  }
])
