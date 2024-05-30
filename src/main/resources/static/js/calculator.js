// Function to calculate weighted average
function calculateWeightedAverage() {
    const table = document.getElementById("table");
    let totalWeightedGrade = 0;
    let totalWeight = 0;
  
    for (let i = 1; i < table.rows.length; i++) { 
      const weight = parseFloat(table.rows[i].cells[2].querySelector("input").value) || 0;
      const grade = parseFloat(table.rows[i].cells[3].querySelector("input[name='grade']").value) || 0;
      const maxGrade = parseFloat(table.rows[i].cells[3].querySelector("input[name='maxgrade']").value) || 0;
  
      if (maxGrade !== 0) {
        const percentage = (grade / maxGrade) * 100;
        totalWeightedGrade += weight * percentage;
        totalWeight += weight;
      }
    }
    const resultsParagraph = document.querySelector('.results');
    resultsParagraph.textContent = totalWeight !== 0 ? "Total weighted grade: " + (totalWeightedGrade / totalWeight).toFixed(2) + "%" : "N/A";
  }
  
  // Function to calculate mean average
  function calculateMeanAverage() {
    const table = document.getElementById("table");
    let totalPercentage = 0;
    let validGrades = 0;
  
    for (let i = 1; i < table.rows.length; i++) {
      const grade = parseFloat(table.rows[i].cells[3].querySelector("input[name='grade']").value) || 0;
      const maxGrade = parseFloat(table.rows[i].cells[3].querySelector("input[name='maxgrade']").value) || 0;
  
      if (maxGrade !== 0) {
        const percentage = (grade / maxGrade) * 100;
        totalPercentage += percentage;
        validGrades++;
      }
    }
  
    const resultsParagraph = document.querySelector('.results');
    resultsParagraph.textContent = validGrades > 0 ? "Total mean grade: " + (totalPercentage / validGrades).toFixed(2) + "%" : "N/A";
  }
  
  // Event listener for "Add Row" button
  document.querySelector('.brow').addEventListener('click', function() {
    const table = document.getElementById('table');
    const rowCount = table.rows.length;
    const row = table.insertRow(rowCount);

    [
        'Activity ' + rowCount,
        'A' + rowCount,
        '<input type="number" name="weight" value="">',
        '<input type="number" name="grade" value="">/<input type="number" name="maxgrade" value="">',
    ].forEach(content => row.insertCell().innerHTML = content);

    // Create and add the percent cell with initial content
    const percentCell = row.insertCell();
    percentCell.className = "percent";
    percentCell.textContent = ""; // Set initial content to empty string
});
  
  // Event delegation for input events on the entire table
  document.getElementById('table').addEventListener('input', function(e) {
    if (e.target.name === 'grade' || e.target.name === 'maxgrade') {
      const row = e.target.closest('tr');
      const gradeInput = row.querySelector('input[name="grade"]');
      const maxGradeInput = row.querySelector('input[name="maxgrade"]');
      const percentCell = row.querySelector('.percent');
  
      if (gradeInput.value && maxGradeInput.value && maxGradeInput.value != 0) {
        const percent = (gradeInput.value / maxGradeInput.value) * 100;
        percentCell.textContent = percent.toFixed(2) + '%';
      } else {
        percentCell.textContent = "";
      }
    }
  });
  
  // Event listeners for Weighted and Mean buttons
  document.querySelector(".weighted").addEventListener("click", () => {
    calculateWeightedAverage();
  });
  
  document.querySelector(".mean").addEventListener("click", () => {
    calculateMeanAverage();
  });