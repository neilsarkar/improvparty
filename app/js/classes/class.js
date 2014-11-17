angular.module('classes').service('Class', [
  '$firebase', 'FIREBASE',
  function($firebase, FIREBASE) {
    var table = FIREBASE.child('classes');

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

    this.save = function(className) {
      var classes = this.all();

      if( classes.indexOf(className) < 0 ) {
        classes.push(className)
        window.localStorage.setItem('classes', JSON.stringify(classes))
      }
    }

    this.all = function() {
      return JSON.parse(window.localStorage.getItem('classes')) || []
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
