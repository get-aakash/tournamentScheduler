
const generateScheduleEl = document.getElementById("generateSchedule")
let teamInputEl = document.getElementById("teamInput")

generateScheduleEl.addEventListener("click", function(){
    const teams = teamInputEl.value.trim().split('\n')
    roundRobin(teams)   
})
const roundRobin = (teams)=>{
    const tournament = []

    const half = Math.ceil(teams.length/2)
    const groupA = teams.slice(0, half)
    const groupB = teams.slice(half, teams.length)
    groupB.reverse()

    tournament.push(getRound(groupA, groupB))

    for(let i=1; i<teams.length-1; i++){
        groupA.splice(1,0, groupB.shift())
        groupB.push(groupA.pop())
        tournament.push(getRound(groupA, groupB))
    }
    console.log(tournament)
    console.log(tournament.length)

    for(let i =0; i<tournament.length;i++){
        for(let j=0; j<tournament[i].length; j++){
            console.log(tournament[i][j])
        }
    }

}

const getRound = (groupA, groupB)=>{
    const total = []
    groupA.forEach((element, i) => {
        if (!groupB[i]) {
            total.push([groupA[i], "bye"]);
        } else {
            total.push([groupA[i], groupB[i]]);
        }
    });
    return total
}

