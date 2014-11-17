angular.module('matching').service('Choice', [
  '$firebase', '$q', 'FIREBASE',
  function($firebase, $q, FIREBASE) {
    var table = FIREBASE.child('choices');

    this.forClass = function(className) {
      return $firebase(table.child(className)).$asArray()
    }
    this.forUser = function(className, username) {
      return $firebase(table.child(className).child(username)).$asArray()
    }
    this.add = function(className, username, member) {
      return $firebase(table.child(className).child(username)).$set(member.slug, true)
    }
    this.deleteForUser = function(className, username) {
      return $firebase(table.child(className).child(username)).$remove()
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
