angular.module('matching').service('Choice', [
  '$firebase',
  function($firebase) {
    var ref = new Firebase('crackling-inferno-9653.firebaseIO.com'),
        table = ref.child('choices');

    this.forClass = function(className) {
      return $firebase(table.child(className)).$asArray()
    }
    this.addChoice = function(className, username, member) {
      return $firebase(table.child(className).child(username)).$set(member.slug, true)
    }
    this.removeChoice = function(className, username, member) {
      return $firebase(table.child(className).child(username)).$remove(name)
    }
  }
])
