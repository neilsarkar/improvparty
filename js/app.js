var module = angular.module('improvparty', ['ngRoute'])

module.config([
  '$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {
    // TODO: enable wildcard matching of index.html
    // $locationProvider.html5Mode(true)
    $routeProvider.
      when('/teams', {
        templateUrl: 'templates/teams.html'
      }).
      otherwise({
        redirectTo: '/teams'
      })
  }
])
