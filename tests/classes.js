exports.test = function() {
  describe('creating a new class', function() {
    it('works with seed data', function() {
      browser.get('/')
      element(by.model('class.name')).sendKeys('Suzi Barrett Genre Study')

      var users = [
        { name: "Stephanie Streisand", email: "stephaniestreisand@gmail.com"},
        { name: "Jillian Fratkin", email: "jillianfratkin@gmail.com"},
        { name: "Clare Loughran", email: "clare.loughran@gmail.com"},
        { name: "David Zwick", email: "dgzwick@gmail.com"},
        { name: "John Noreen", email: "noreenjo17@gmail.com"},
        { name: "Hannah Kasulka", email: "hannah.kasulka@gmail.com"},
        { name: "Brian T Arnold", email: "btarnold@gmail.com"},
        { name: "Anikka Sellz", email: "a.sellz@gmail.com"},
        { name: "Wave Segal", email: "wavesegal@gmail.com"},
        { name: "Koral Michaels", email: "koralmichaels@gmail.com"},
        { name: "Michelle Thompson", email: "thompson.michelle@me.com"},
        { name: "Neil Sarkar", email: "neil.r.sarkar@gmail.com"},
        { name: "Noreen O'Neill", email: "noreenvoneill@gmail.com"},
        { name: "Paul Detrick", email: "pauldetrick@gmail.com"},
        { name: "Eleanor Monahan", email: "monahan.eleanor@gmail.com"},
        { name: "Marina Mastros", email: "marina.mastros@gmail.com"}
      ]

      element.all(by.repeater('member in class.members')).then(function(rows) {
        rows.forEach(function(row, i) {
          row.element(by.model('member.name')).sendKeys(users[i].name)
          row.element(by.model('member.email')).sendKeys(users[i].email)
        })
      })

      element(by.partialLinkText('Create')).click()
    })
  })
}
