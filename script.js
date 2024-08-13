let teams = ["team1", "team2", "team3", "team4"]

function roundRobin(teams){

    //creating two halfs of the toal number of teams
    const half = Math.ceil(teams.length/2)
    const groupA = teams.slice(0,half)
    console.log(groupA)
    const groupB = teams.slice(half,teams.length)
    groupB.reverse()
    console.log(groupB)


    //swapping the teams

    for(let i = 1; i<teams.length-1; i++){
        groupA.splice(1,0, groupB.shift())
        
        groupB.push(groupA.pop())
       
    }
    console.log(groupA)
    console.log(groupB)



}

roundRobin(teams)