angular.module('classes').controller('ShowClassController', [
  '$scope', '$routeParams', 'classService', '$location',
  function($scope, $routeParams, classService, $location) {
    $scope.class = {
      name: $routeParams.className
    }

    classService.find($scope.class.name).then(function yes(members){
      members.forEach(function(member) {
        if( CryptoJS.SHA1(member.slug).toString() == $routeParams.hash ) {
          $scope.currentUser = member
        }
        member.hash = CryptoJS.SHA1(member.slug).toString()
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
          classService.addChoice($scope.class.name, $scope.currentUser.name, member)
        }
      })

      $location.path('classes/'+$scope.class.name+'/'+$routeParams.hash+'/results')
    }
  }
])
