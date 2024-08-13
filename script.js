let teams = ["team1", "team2", "team3", "team4", "team5"]
let game = []


let n2 = (teams.length-1)/2
console.log(Math.ceil(n2))
function roundRobin(teams){
    let team1 = ""
    let team2 = ""
    for(let i=0; i<n2; i++){
        team1 = teams[Math.ceil(n2-i-1)]
        team2 = teams[Math.ceil(n2+i)]
        console.log(team1,"vs", team2)
        
    }
    
    

    
}


roundRobin(teams)

function demoRobin(teams){
    let half = Math.ceil(teams.length/2)
    let groupA = teams.slice(0, half)
    let groupB = teams.slice(half, teams.length)
    console.log(groupB.reverse())
}

demoRobin(teams)