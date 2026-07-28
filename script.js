let semesterCount = 0;

function addSemester() {
    semesterCount++;

    const container = document.getElementById("semesters");

    const div = document.createElement("div");
    div.className = "semester";
    div.id = "semester_" + semesterCount;

    div.innerHTML = `
        <h3>Semester ${semesterCount}</h3>

        <table>
            <tr>
                <th>Subject</th>
                <th>Credits</th>
                <th>Marks</th>
                <th>Grade</th>
                <th>Grade Point</th>
            </tr>
        </table>

        <button onclick="addSubject(${semesterCount})">Add Subject</button>
        <button onclick="calculateSGPA(${semesterCount})">Calculate SGPA</button>

        <h4 id="sgpa_${semesterCount}"></h4>
    `;

    container.appendChild(div);
}

function addSubject(sem) {
    const table = document
        .getElementById("semester_" + sem)
        .getElementsByTagName("table")[0];

    const row = table.insertRow();

    row.innerHTML = `
        <td><input type="text"></td>
        <td><input type="number" class="credits"></td>
        <td><input type="number" oninput="assignGrade(this)"></td>
        <td class="grade"></td>
        <td class="gp"></td>
    `;
}

function assignGrade(input) {
    let marks = input.value;
    let gradeCell = input.parentElement.nextElementSibling;
    let gpCell = gradeCell.nextElementSibling;

    let grade = "F", gp = 0;

    if (marks >= 90) { grade = "O"; gp = 10; }
    else if (marks >= 80) { grade = "A+"; gp = 9; }
    else if (marks >= 70) { grade = "A"; gp = 8; }
    else if (marks >= 60) { grade = "B+"; gp = 7; }
    else if (marks >= 55) { grade = "B"; gp = 6; }
    else if (marks >= 50) { grade = "C"; gp = 5; }
    else if (marks >= 40) { grade = "P"; gp = 4; }

    gradeCell.innerText = grade;
    gpCell.innerText = gp;
}

function calculateSGPA(sem) {
    const semesterDiv = document.getElementById("semester_" + sem);
    const credits = semesterDiv.getElementsByClassName("credits");
    const gps = semesterDiv.getElementsByClassName("gp");

    let totalCredits = 0;
    let totalPoints = 0;

    for (let i = 0; i < credits.length; i++) {
        let c = Number(credits[i].value);
        let g = Number(gps[i].innerText);

        totalCredits += c;
        totalPoints += c * g;
    }

    let sgpa = totalPoints / totalCredits;
    document.getElementById("sgpa_" + sem).innerText =
        "SGPA = " + sgpa.toFixed(2);

    calculateCGPA();
}

function calculateCGPA() {
    let allCredits = document.getElementsByClassName("credits");
    let allGPs = document.getElementsByClassName("gp");

    let totalCredits = 0;
    let totalPoints = 0;

    for (let i = 0; i < allCredits.length; i++) {
        let c = Number(allCredits[i].value);
        let g = Number(allGPs[i].innerText);

        totalCredits += c;
        totalPoints += c * g;
    }

    let cgpa = totalPoints / totalCredits;
    document.getElementById("cgpaResult").innerText =
        "Final CGPA = " + cgpa.toFixed(2);
}
