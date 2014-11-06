describe "Matcher", ->
  # Always pick the first in the array when we get to random tiebreak
  beforeEach ->
    sinon.stub _, "sample", (array) ->
      array[0]

  afterEach ->
    _.sample.restore()

  tt = [
    {
      description: "returns nobody for one person",
      input: {
        neil: []
      },
      output: {
        neil: []
      }
    },
    {
      description: "for two people choosing each other, returns choices",
      input: {
        neil: ['marina'],
        marina: ['neil']
      },
      output: {
        neil: ['marina'],
        marina: ['neil']
      }
    },
    {
      description: "leaves out a third wheel",
      input: {
        david: ['hannah'],
        hannah: ['david'],
        neil: [],
      },
      output: {
        david: ['hannah'],
        hannah: ['david'],
        neil: []
      }
    },
    {
      description: "tiebreaks with general compatibility",
      input: {
        neil: ['eleanor', 'koral', 'jillian', 'stephanie'],
        eleanor: ['koral'],
        jillian: ['neil', 'stephanie'],
        stephanie: ['jillian', 'koral', 'eleanor'],
        koral: ['eleanor']
      },
      output: {
        neil: ['jillian', 'stephanie', 'eleanor', 'koral'],
        eleanor: ['koral'],
        jillian: ['neil', 'stephanie', 'eleanor', 'koral'],
        stephanie: ['jillian', 'neil', 'eleanor', 'koral'],
        koral: ['eleanor']
      }
    },
    {
      description: "prefers people who want to play with the existing group",
      input: {
        clare: ['annika', 'john', 'stephanie'],
        annika: ['clare', 'john'],
        stephanie: ['annika', 'clare'],
        john: ['stephanie'],
        neil: []
      },
      output: {
        clare: ['annika', 'stephanie', 'john'],
        annika: ['clare', 'stephanie', 'john'],
        stephanie: ['clare', 'annika', 'john'],
        john: ['stephanie', 'clare', 'annika'],
        neil: []
      }
    },
    {
      # randomness stubbed above to be the order the keys are provided here
      description: "matches randomly on ties",
      input: {
        jillian: ['eleanor', 'wave', 'brian'],
        eleanor: ['jillian', 'brian', 'wave'],
        wave: ['brian', 'jillian', 'eleanor'],
        brian: ['eleanor', 'jillian', 'wave']
      },
      output: {
        jillian: ['eleanor', 'wave', 'brian'],
        eleanor: ['jillian', 'wave', 'brian'],
        wave: ['jillian', 'eleanor', 'brian'],
        brian: ['jillian', 'eleanor', 'wave']
      }
    },
    {
      description: "adds someone to the team even if they haven't filled it out",
      input: {
        jillian: ['eleanor', 'wave', 'brian'],
        eleanor: ['david', 'jillian'],
        wave: ['david'],
        brian: ['david'],
        david: []
      },
      output: {
        jillian: ['eleanor', 'david', 'wave', 'brian'],
        eleanor: ['jillian', 'david', 'wave', 'brian'],
        wave: ['david'],
        brian: ['david'],
        david: []
      }
    }
  ]

  tt.forEach (test) ->
    it test.description, ->
      m = new Matcher(test.input)
      teams = m.teams()
      _.each test.output, (team, player) ->
        teams[player].should.deep.equal(team, "Matches for "+player)
