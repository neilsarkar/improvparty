angular.module('classes').service('classService', [
  '$firebase',
  function($firebase) {
    var ref = new Firebase('crackling-inferno-9653.firebaseIO.com'),
        table = ref.child('classes');

    this.addMember = function(className, user) {
      if( !user.name || !user.email) {
        return console.error("You must provide a username and an email", user)
      }

      return $firebase(table.child(className)).$set(user.name, {
        name: user.name,
        email: user.email,
        slug: slug(user.name)
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
      return $firebase(ref.child('choices').child(className).child(username)).$set(member.name, true)
    }
    this.removeChoice = function(className, username, member) {
      return $firebase(ref.child('choices').child(className).child(username)).$remove(name)
    }

    function slug(name) {
      return name.replace(/[^A-z]/g, '-').toLowerCase()
    }
  }
])
