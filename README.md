# Improv Party #

Improv party is a team generator for improv classes.

## Why ##

These are the current options for forming teams from classes:

1. No-one likes each other, no team.
2. A few people like each other and hate everyone else, they form a team.
3. Most people like each other, no-one wants to hurt feelings and a general inclusive email thread turns into an unhelmed and unfocused team.
4. Most people like each other, one person is pragmatic and forms a team making arbitrary cuts, which makes them feel like an asshole.

This web app attempts to provide a better solution for #3 and #4, so you can form small, focused teams from a generally compatible class with minimal social rejection.

## How ##

Each person in the class gets an authenticated link where they can privately make their choices as to whom they want to play with.

Once everyone has submitted their choices, each person is shown their optimal team. The team is calculated like this:

First, the team is seeded with the authenticated user. At each step, we find the most compatible player who is not already on the team and add them to the team.

Compatibility is defined as:

_(how many people on the current team want to play with you)_ * 2 +
_(how many people on the current team you want to play with)_

In the case that multiple players not already on the team are tied, the first tiebreaker is general compatibility:

_(how many people in the class want to play with you)_ +
_(how many people in the class you want to play with)_

If there are still two equal candidates, the final tiebreaker is just randomness.
