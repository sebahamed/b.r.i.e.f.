function generateTable() {
    const tableLayout = document.querySelector('#questions tbody');
    const dropdown = document.getElementById('sharedDropdown');

    for(let i = 1; i <= 73; i++) {
        const row = document.createElement("tr");

        const cell1 = document.createElement("td");
        cell1.id = 'question' + i;
        
        const cell2 = document.createElement("td");
        cell2.textContent = i;

        const clone = dropdown.cloneNode(true);
        clone.id = "dropdown" + i;
        clone.dataset.qnum = i;
        cell1.appendChild(clone);

        row.appendChild(cell1);
        row.appendChild(cell2);

        tableLayout.appendChild(row);    
    }

    dropdown.style.display = "none";
}

generateTable();

function calculateScores() {
    const form = document.getElementById('parentTeacherSel').value;

    let categories = {};
    if(form == 'parent') {
        categories = {
            inhibition: [38, 41, 43, 44, 49, 54, 55, 56, 59, 65],
            transitions: [5, 6, 8, 12, 13, 23, 30, 39],
            emotionalControl: [1, 7, 20, 25, 26, 45, 50, 62, 64, 70],
            initiative: [3, 10, 16, 47, 48, 61, 66, 71],
            workingMemory: [2, 9, 17, 19, 24, 27, 32, 33, 37, 57],
            planning: [11, 15, 18, 22, 28, 35, 36, 40, 46, 51, 53, 58],
            enviromentalOrganization: [4, 29, 67, 68, 69, 72],
            monitoring: [14, 21, 31, 34, 42, 52, 60, 63]
        };
    } else if(form == 'teacher') {
        categories = {
            inhibition: [9, 38, 42, 43, 45, 47, 57, 58, 59, 69],
            transitions: [4, 5, 6, 13, 14, 24, 30, 40, 53, 62],
            emotionalControl: [1, 7, 26, 27, 48, 51, 64, 66, 72],
            initiative: [3, 10, 19, 34, 50, 63, 70],
            workingMemory: [2, 8, 18, 21, 25, 28, 31, 32, 39, 60],
            planning: [12, 17, 23, 29, 35, 37, 41, 49, 52, 56],
            enviromentalOrganization: [11, 16, 20, 67, 68, 71, 73],
            monitoring: [15, 22, 33, 36, 44, 46, 54, 55, 61, 65]
        };
    } else {
        document.getElementById('form-error').style.display = "block";
        return;
    }

    document.getElementById('form-error').style.display = "none";

    let error = false;
    for(let i = 1; i <= 72; i++) {
        const dropdownList = document.getElementById("dropdown" + i);
        const selectedOption = dropdownList.options[dropdownList.selectedIndex];

        if(selectedOption.value == '') {
            document.getElementById("question" + i).classList.add("error");
            error = true;
        } else document.getElementById("question" + i).classList.remove("error");
    }

    if(form == 'teacher') {
        const dropdownList = document.getElementById("dropdown73");
        const selectedOption = dropdownList.options[dropdownList.selectedIndex];

        if(selectedOption.value == '') {
            document.getElementById("question73").classList.add("error");
            error = true;
        } else document.getElementById("question73").classList.remove("error");
    }

    if(error) {
        document.getElementById('field-error').style.display = "block";
        return;
    }

    document.getElementById('field-error').style.display = "none";

    const scores = {};
    for(let cat in categories)
        scores[cat] = 0;

    document.querySelectorAll("#questions select").forEach(sel => {
        const qnum = parseInt(sel.dataset.qnum, 10);
        const points = parseInt(sel.value) || 0;

        for (let cat in categories) {
            if (categories[cat].includes(qnum)) {
                scores[cat] += points;
            }
        }
    });

    const inhibition = document.getElementById('inhibition');
    inhibition.textContent = scores.inhibition;

    const transitions = document.getElementById('transitions');
    transitions.textContent = scores.transitions;

    const emotionalControl = document.getElementById('emotional-control');
    emotionalControl.textContent = scores.emotionalControl;

    const initiative = document.getElementById('initiative');
    initiative.textContent = scores.initiative;

    const workingMemory = document.getElementById('working-memory');
    workingMemory.textContent = scores.workingMemory;

    const planning = document.getElementById('planning');
    planning.textContent = scores.planning;

    const enviromentalOrganization = document.getElementById('enviromental-organization');
    enviromentalOrganization.textContent = scores.enviromentalOrganization;

    const monitoring = document.getElementById('monitoring');
    monitoring.textContent = scores.monitoring;

    const BRIscore = scores.inhibition + scores.transitions + scores.emotionalControl;
    const MIscore = scores.initiative + scores.workingMemory + scores.planning + scores.enviromentalOrganization + scores.monitoring;

    const BRI = document.getElementById('BRI');
    BRI.textContent = BRIscore;

    const MI = document.getElementById('MI');
    MI.textContent = MIscore;

    const GEC = document.getElementById('GEC');
    GEC.textContent = BRIscore + MIscore;

    console.log("Final scores:", scores);
}

function refresh() {
    window.location.reload();
}

function menu() {

}

function copyTable() {
    // Get the table element by its ID
    const table = document.getElementById('results');

    // Use fixed values
    table.querySelectorAll('td, th').forEach(cell => {
        cell.style.width = "3cm";
        cell.style.height = "0.5cm";
        cell.style.fontSize = "12pt";
        cell.style.color = "black";
    });
    table.style.tableLayout = "fixed";
    table.style.borderCollapse = "collapse";

    // Create a range to select the table contents
    const range = document.createRange();
    range.selectNode(table);

    // Select the table contents
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);

    // Copy the selected content to the clipboard
    document.execCommand('copy');

    // Clean up the selection
    selection.removeAllRanges();
}