angular.module('classes').controller('ClassesController', [
  '$scope', 'Class',
  function($scope, Class) {
    $scope.classes = Class.all()
    $scope.currentUser = JSON.parse(window.localStorage.getItem('currentUser'))
  }
])
