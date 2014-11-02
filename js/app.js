var module = angular.module('improvparty', ['ngRoute', 'classes'])

module.config([
  '$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {
    // TODO: enable wildcard matching of index.html
    // $locationProvider.html5Mode(true)
    $routeProvider.
      when('/teams', {
        templateUrl: 'templates/teams.html'
      }).
      when('/classes/new', {
        templateUrl: 'templates/classes/new.html',
        controller: 'NewClassController'
      }).
      when('/classes/:className', {
        templateUrl: 'templates/classes/show.html',
        controller: 'ShowClassController'
      }).
      otherwise({
        redirectTo: '/classes/new'
      })
  }
])
