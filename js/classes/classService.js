angular.module('classes').service('classService', [
  '$firebase',
  function($firebase) {
    var ref = new Firebase('crackling-inferno-9653.firebaseIO.com'),
        table = ref.child('classes');

    this.addMember = function(className, user) {
      if( !user.name || !user.email) {
        throw "You must provide a username or email"
      }

      return $firebase(table.child(className)).$set(user.name, {
        email: user.email
      })
    }
  }
])
