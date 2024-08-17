# Round Robin Tournament Scheduler

This project implements a round-robin tournament scheduler in JavaScript. The scheduler pairs teams in each round so that every team plays against every other team.

## How It Works

The code divides the teams into two groups and rotates the teams in each round to ensure that all possible matches occur. It can handle an even number of teams without needing byes, but is also prepared to handle odd numbers by scheduling "bye" rounds.

### Key Features

- **Team Pairing**: Automatically pairs teams in each round.
- **Rotation**: Rotates the teams each round to generate new matchups.
- **Bye Handling**: If the number of teams is odd, the code assigns "bye" to a team each round.

## Usage

To use the scheduler, you can simply call the `roundRobin` function with an array of team names. 

### Example

```javascript
const teams = ['team1', "team2", "team3", "team4"];
roundRobin(teams);
