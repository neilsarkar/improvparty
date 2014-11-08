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
    this.choices = function(className) {
      return $firebase(ref.child('choices').child(className)).$asArray().$loaded()
    }
    this.addChoice = function(className, username, member) {
      return $firebase(ref.child('choices').child(className).child(username)).$set(member.slug, true)
    }
    this.removeChoice = function(className, username, member) {
      return $firebase(ref.child('choices').child(className).child(username)).$remove(name)
    }

    // hashMember returns authentication hash for a user
    // member = {slug: "neil"} || "neil"
    this.hashMember = function(member) {
      return CryptoJS.SHA1(member.slug || member).toString()
    }

    function slug(name) {
      return name.replace(/[^A-z]/g, '-').toLowerCase()
    }
  }
])
