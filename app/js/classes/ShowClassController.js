angular.module('classes').controller('ShowClassController', [
  '$scope', '$routeParams', 'Class', '$location', 'Choice',
  function($scope, $routeParams, Class, $location, Choice) {
    $scope.$root.bodyClass = 'classes-show'
    $scope.participants = []
    $scope.class = {
      name: $routeParams.className
    }

    Class.find($scope.class.name).$loaded(function yes(members){
      members.forEach(function(member) {
        var hash = Class.hashMember(member)
        if( hash == $routeParams.hash ) {
          $scope.currentUser = _.extend(member, {hash: hash})
          window.localStorage.setItem('currentUser', JSON.stringify($scope.currentUser))
          Class.save($scope.class.name)
        }
      })
      if( !$scope.currentUser ) {
        $scope.authenticationFailed = true
      } else {
        members = _.reject(members, function(member) {
          return member.slug == $scope.currentUser.slug
        })
        $scope.class.members = members
        Choice.forUser($routeParams.className, $scope.currentUser.slug).$loaded(function yes(choices) {
          choices.forEach(function(choice) {
            _($scope.class.members).findWhere({slug: choice.$id}).chosen = true
          })
        })
      }
    }, function no() {
      window.alert("Nope.")
    })

    Choice.forClass($routeParams.className).$watch(function(event) {
      if( event.event == 'child_added' ) {
        $scope.participants.push(event.key)
        $scope.abstainers = $scope.class.members && $scope.class.members.filter(function(member) {
          return $scope.participants.indexOf(member.slug) < 0;
        })
        if( $scope.participants.length >= 12 ) {
          $location.path('/classes/' + $routeParams.className + '/' + $routeParams.hash + '/results')
        }
      } else {
        console.debug(event)
      }
    })

    // TODO: clear choices before setting them here
    $scope.save = function() {
      Choice.deleteForUser($scope.class.name, $scope.currentUser.slug).then(function yes() {
        _.each($scope.class.members, function(member) {
          if( member.chosen ) {
            Choice.add($scope.class.name, $scope.currentUser.slug, member)
          }
        })
      }, function no() {
        window.alert("Couldn't set your picks.")
      })

      $location.path('classes/'+$scope.class.name+'/'+$routeParams.hash+'/results')
    }
  }
])
