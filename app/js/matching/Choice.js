angular.module('matching').service('Choice', [
  '$firebase', '$q',
  function($firebase, $q) {
    var ref = new Firebase('crackling-inferno-9653.firebaseIO.com'),
        table = ref.child('choices');

    this.forClass = function(className) {
      return $firebase(table.child(className)).$asArray()
    }
    this.forUser = function(className, username) {
      return $firebase(table.child(className).child(username)).$asArray()
    }
    this.add = function(className, username, member) {
      return $firebase(table.child(className).child(username)).$set(member.slug, true)
    }
    this.matrix = function(className) {
      var deferred = $q.defer()
      table.child(className).on('value', function(snapshot) {
        var list = snapshot.val()
        _.each(list, function(picks, user) {
          list[user] = _.keys(picks)
        })
        deferred.resolve(list)
      })
      return deferred.promise
    }
  }
])
