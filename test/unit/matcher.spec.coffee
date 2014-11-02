describe "Matcher", ->
  tt = [
    {
      description: "returns your original choices if no one adds to the pool"
      input: {
        neil: ['marina', 'wave', 'brian'],
        marina: [],
        wave: ['neil'],
        brian: ['neil']
      },
      output: {
        neil: ['marina', 'wave', 'brian'],
        marina: ['neil', 'wave', 'brian'],
        wave: ['neil', 'marina', 'brian'],
        brian: ['neil', 'marina', 'wave']
      }
    }
  ]

  tt.forEach (test) ->
    it test.description, ->
      m = new Matcher(test.input)
      m.teams().should == test.output
