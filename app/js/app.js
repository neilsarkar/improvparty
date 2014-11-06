var module = angular.module('improvparty', ['ngRoute', 'classes'])

module.config([
  '$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true)

    $routeProvider.
      when('/classes/new', {
        templateUrl: 'templates/classes/new.html',
        controller: 'NewClassController'
      }).
      when('/classes/:className/:hash', {
        templateUrl: 'templates/classes/show.html',
        controller: 'ShowClassController'
      }).
      when('/classes/:className/:hash/results', {
        templateUrl: 'templates/classes/results.html',
        controller: 'ResultsController'
      }).
      otherwise({
        redirectTo: '/classes/new'
      })
  }
])
