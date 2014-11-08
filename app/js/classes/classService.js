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
      return $firebase(table.child(className)).$asArray()
    }

    // hashMember returns authentication hash for a user
    // member = {slug: "neil"} || "neil"
    this.hashMember = function(member) {
      return CryptoJS.SHA1(member.slug || member).toString()
    }

    this.slugToName = function(slug) {
      return slug.replace(/-/g, ' ').split(' ').map(function(token) { return token[0].toUpperCase() + token.slice(1)}).join(' ')
    }

    function slug(name) {
      return name.replace(/[^A-z]/g, '-').toLowerCase()
    }
  }
])
