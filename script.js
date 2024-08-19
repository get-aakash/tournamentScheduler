
const generateScheduleEl = document.getElementById("generateSchedule")
let teamInputEl = document.getElementById("teamInput")
const tableDivEl = document.getElementById("tableDiv")

generateScheduleEl.addEventListener("click", function(){
    const teams = teamInputEl.value.trim().split('\n')
    roundRobin(teams)   
    teamInputEl.value = ""
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
   
    generateTable(tournament)

  

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

const generateTable = (tournament) => {
    const tbl = document.createElement("table");
    const tblBody = document.createElement("tbody");

    for (let i = 0; i < tournament.length; i++) {
        const roundRow = document.createElement("tr");
        const roundHeaderCell = document.createElement("td");
        roundHeaderCell.colSpan = tournament[i].length;
        roundHeaderCell.style.fontWeight = "bold";
        roundHeaderCell.style.textAlign = "center";
        roundHeaderCell.appendChild(document.createTextNode("Round " + (i+1)));
        roundRow.appendChild(roundHeaderCell);
        tblBody.appendChild(roundRow);

        for (let j = 0; j < tournament[i].length; j++) {
            const row = document.createElement("tr");
            const cell = document.createElement("td");
            const cellText = document.createTextNode(`${tournament[i][j][0]} vs ${tournament[i][j][1]}`);
            cell.appendChild(cellText);
            row.appendChild(cell);
            tblBody.appendChild(row);
        }
    }

    tbl.appendChild(tblBody);
    tableDivEl.appendChild(tbl);
};