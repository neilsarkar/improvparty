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
      compatibilityScores = calculateCompatibilityScores();

  // calculate all teams
  self.teams = function() {
    if( teams ) { return teams; }

    teams = {}

    // calculate team for each player
    players.forEach(function(player) {
      // initialize empty matches array
      teams[player] = [player]

      while(teams[player].length < players.length ) {
        var step = self.step(teams[player]);

        if( !step ) break;
        teams[player] = step.team
      }
      teams[player] = _.reject(teams[player], function(p) { return p == player })
    })

    return teams
  }

  // add next best match to a team
  self.step = function(team) {
    // create a pool that's an array of names with scores
    var pool = createPool(team),
        choice = findBestMatch(pool);

    if( !choice ) { return null; }
    team.push(choice.player)

    return {
      player: choice.player,
      pool: pool,
      team: team
    }
  }

  // createPool makes a sorted set of players that are most compatible with the current team.
  // the sorting algorithm is local score tiebroken by general compatibility.
  function createPool(team) {
    var pool = players.map(function(player) {
      // don't include members of the team in the pool
      if( _.include(team, player) ) { return null }

      // score = outbound edges + inbound edges
      var score = 0,
          hasOutboundEdge;

      team.forEach(function(member) {
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
        player: player,
        score: score * 100 + compatibilityScores[player]
      }
    })

    return _.sortBy(_.compact(pool), function(candidate) {
      return candidate.score
    }).reverse()
  }

  function findBestMatch(pool) {
    if( pool.length == 0 ) { return null }
    if( pool.length == 1 ) { return pool[0] }

    // check to see if there's a winner with the highest score
    if( pool[0].score == 0 ) {
      return null
    }
    if( pool[0].score > pool[1].score ) {
      return pool[0]
    }

    // tiebreaker: random
    pool = _.select(pool, function(candidate) {
      return candidate.score == pool[0].score
    })
    return _.sample(pool)
  }

  // compatibility score is total number of outgoing and incoming edges,
  // used in tiebreaker
  function calculateCompatibilityScores() {
    var scores = {}
    players.forEach(function(player) {
      // count total outgoing edges
      var score = picks[player].length

      // count total incoming edges
      players.forEach(function(otherPlayer) {
        if( player == otherPlayer ) { return; }
        if( _.include(picks[otherPlayer], player) ) { score++ }
      })

      scores[player] = score
    })

    return scores
  }
}
