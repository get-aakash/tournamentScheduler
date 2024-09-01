
const generateScheduleEl = document.getElementById("generateSchedule")
let teamInputEl = document.getElementById("teamInput")
const tableContainerEl = document.getElementById("tableContainer")

const tableDivEl = document.createElement("div")
tableDivEl.setAttribute("id","tableDiv")

generateScheduleEl.addEventListener("click", function(){
    const input = teamInputEl.value.trim()
    if(input === ""){
        alert("please eneter atleast one team")
        return
    }
    let teams = input.split('\n')
    tableDivEl.innerHTML = ""
    roundRobin(teams)   
    teamInputEl.value = ""
    
})
const roundRobin = (teams)=>{
    const tournament = []
    if(teams.length%2 !== 0){
        teams.push("bye")
    }
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
    for (let i = 0; i < groupA.length; i++) {
        total.push([groupA[i], groupB[i]]);
    }
    return total
}

const generateTable = (tournament) => {
    const h3El = document.createElement('h3')

    const hrEl = document.createElement("hr")
    h3El.innerHTML = "Schedule" 

    const exportButton = document.createElement('button')
    exportButton.innerHTML = "Export to PDF"
    exportButton.setAttribute("id","exportBtn")

    const tbl = document.createElement("table");
    tbl.setAttribute("id","table")
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

            //Match Cell
            const cell = document.createElement("td");
            const cellText = document.createTextNode(`${tournament[i][j][0]} vs ${tournament[i][j][1]}`);
            cell.appendChild(cellText);
            row.appendChild(cell);

            //Button cell
            const buttonsCell = document.createElement("td")
            buttonsCell.setAttribute("id", "buttonDiv")

            const deleteButton = document.createElement("button")
            deleteButton.setAttribute("id","deleteBtn")
            deleteButton.innerHTML = "Delete"
            deleteButton.addEventListener("click",()=>{
               if(window.confirm("Do you really want to delete this match?")){
                tblBody.removeChild(row)
               }
            
                
            })

            buttonsCell.appendChild(deleteButton)
            row.appendChild(buttonsCell)
            
           

            tblBody.appendChild(row);
        }
    
    tbl.appendChild(tblBody);
    tableDivEl.appendChild(h3El)
    tableDivEl.appendChild(exportButton)
    tableDivEl.appendChild(hrEl)
    tableDivEl.appendChild(tbl);
    tableContainerEl.appendChild(tableDivEl)

}

exportToPdf()



}

const exportToPdf =()=>{
    document.getElementById("exportBtn").addEventListener("click", function() {
        console.log("Button clicked")
        const { jsPDF } = window.jspdf; 
        const doc = new jsPDF()
    
       
        const table = document.getElementById("table");
    
        
        const rows = table.querySelectorAll("tbody tr");
        const data = [];
    
        rows.forEach(row => {
            const rowData = [];
            const cells = row.querySelectorAll("td");
    
            
            cells.forEach(cell => {
                rowData.push(cell.innerText);
            });
    
            data.push(rowData);
        });
    
        
        doc.autoTable({
            head: [['Match', 'Actions']],
            body: data,
            startY: 20, 
            theme: 'grid', 
        });
    
        
        doc.save("schedule.pdf");
    });

}