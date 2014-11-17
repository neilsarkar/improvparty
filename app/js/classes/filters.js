angular.module('classes').filter('slugToName', [
  function() {
    return function(slug) {
      return slug.replace(/-/g, ' ').split(' ').map(function(token) { return token[0].toUpperCase() + token.slice(1)}).join(' ')
    }
  }
])
