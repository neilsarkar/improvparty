angular.module('classes').controller('ClassesController', [
  '$scope', 'classService',
  function($scope, classService) {
    $scope.classes = classService.all()
    $scope.currentUser = JSON.parse(window.localStorage.getItem('currentUser'))
  }
])
