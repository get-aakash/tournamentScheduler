let teams = ["team1", "team2", "team3", "team4"]

function roundRobin(teams){
    const tournament = []

    let half = Math.ceil(teams.length/2)
    let groupA = teams.slice(0,half)
    let groupB = teams.slice(half,teams.length)
    groupB.reverse()
    console.log(groupA)
    tournament.push(getRound(groupA, groupB))

    for(let i=1; i<teams.length-1; i++){
        groupA.splice(1,0,groupB.shift())
        groupB.push(groupA.pop())
        tournament.push(getRound(groupA, groupB))
    }
    console.log(tournament)
}

const getRound = (groupA, groupB) => {
    const total = [];
    groupA.forEach((p, i) => {
      total.push([groupA[i], groupB[i]]);
    });
    return total;
  }

roundRobin(teams)