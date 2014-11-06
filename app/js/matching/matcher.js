// Matcher takes a bunch of picks that look like this:
// {
//   "neil": ["marina", "brian", "wave"],
//   "marina": ["brian", "annika"]
//   ...
// }
//
// And spits out results like this:
//
// {
//   "neil": ["marina", "brian", "annika"]
//   ...
// }

Matcher = function(picks) {
  var self = this,
      teams,
      players = _.keys(picks),
      globalScores = {};

  self.teams = function() {
    if( !teams ) { calculateTeams(); }
    return teams
  }

  function calculateTeams() {
    teams = {}

    // calculate global scores
    _.each(players, function(player) {
      // count total outgoing edges
      var score = picks[player].length

      // count total incoming edges
      _.each(players, function(otherPlayer) {
        if( player == otherPlayer ) { return; }
        if( _.include(picks[otherPlayer], player) ) { score++ }
      })

      globalScores[player] = score
    })

    // calculate team for each player
    _.each(players, function(player) {
      // initialize empty matches array
      teams[player] = []

      while(teams[player].length < players.length ) {
        // create a pool that's an array of names with scores
        var pool = createPool(teams[player].concat([player])),
            choice = findBestMatch(pool);

        // if nobody wants to play together, don't pad the roster
        if( !choice ) {
          break
        }
        teams[player].push(choice.name)
      }
    })
  }

  function createPool(team) {
    return _.compact(players.map(function(player) {
     // don't include members of the team in the pool
     if( _.include(team, player) ) { return null }

     // score = outbound edges + inbound edges
     var score = 0,
         hasOutboundEdge;

     _.each(team, function(member) {
       // inbound edge -- they want to play with a team member
       if( _.include(picks[player], member) ) {
         score++
       }
       // outbound edge -- a team member wants to play with them
       if( _.include(picks[member], player) ) {
         score += 2
         hasOutboundEdge = true
       }
     })

     if( !hasOutboundEdge || score == 0 ) { return null }
     return {
       name: player,
       score: score,
       globalScore: globalScores[player]
     }
   }))
  }

  function findBestMatch(pool) {
    if( pool.length == 0 ) { return null }
    if( pool.length == 1 ) { return pool[0] }

    // check to see if there's a winner with the highest score
    pool = _.sortBy(pool, function(candidate) {
      return candidate.score
    }).reverse()
    if( pool[0].score == 0 ) {
      return null
    }
    if( pool[0].score > pool[1].score ) {
      return pool[0]
    }

    // tiebreaker: most compatible (highest total score)
    pool = _.select(pool, function(candidate) {
      return candidate.score == pool[0].score
    })
    pool = _.sortBy(pool, function(candidate) {
      return candidate.globalScore
    }).reverse()
    if( pool[0].globalScore > pool[1].globalScore ) {
      return pool[0]
    }

    // tiebreaker: random
    pool = _.select(pool, function(candidate) {
      return candidate.globalScore == pool[0].globalScore
    })
    return _.sample(pool)
  }
}
