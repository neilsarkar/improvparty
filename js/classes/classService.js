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
        name: user.name,
        email: user.email
      })
    }

    this.find = function(className) {
      return $firebase(table.child(className)).$asArray().$loaded()
    }

    // TODO: move this to its own service
    this.choices = function(className, username) {
      return $firebase(ref.child('choices').child(className)).$asArray().$loaded()
    }
    this.addChoice = function(className, username, member) {
      console.log(arguments)
      return $firebase(ref.child('choices').child(className).child(username)).$set(member.name, true)
    }
    this.removeChoice = function(className, username, member) {
      return $firebase(ref.child('choices').child(className).child(username)).$remove(name)
    }
  }
])
