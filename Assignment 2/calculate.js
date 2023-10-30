var file = document.getElementById("fileInput");
var bounds = document.querySelectorAll("input[type=number]");

// File content handler
file.addEventListener("change", function (event) {
  const reader = new FileReader();
  reader.onload = handleFileLoad;
  reader.readAsText(event.target.files[0]);
});

function handleFileLoad(event) {
    // Read the content of the CSV file
    let fileContent = event.target.result;

    // Declare array of Grades
    let grades = parseGrades(fileContent);


    let CSVtoARR = fileContent.split("\r\n");

    histogram(grades);
    handleBoundChanges(grades);
    stats(grades, CSVtoARR);
}

// Helper functions
function histogram(grades) {
    validateBound();
    for (let i = 0; i < grades.length; i++) {
        for (let j = 1; j < bounds.length; j++) {
            let bound = parseFloat(document.getElementById(bounds[j].id).value);
            if (grades[i] >= bound) {
                //document.getElementById(j).innerHTML += "O";
                document.getElementById(j).innerHTML += '<div class="square"></div>';
                break;
            }
        }
    }
}

function stats(grades, data) {
    // Highest grade
    var highest = Math.max(...grades);
    var indexOfHighest = grades.indexOf(highest);

    document.getElementById("highest").innerHTML =
    data[indexOfHighest + 1].split(",")[0].trim() + " (" + highest + "%)";

    // Lowest value 
    var lowest = Math.min(...grades);
    var indexOfLowest = grades.indexOf(lowest);

    document.getElementById("lowest").innerHTML =
    data[indexOfLowest + 1].split(",")[0].trim() + " (" + lowest + "%)";

    // Mean
    document.getElementById("mean").innerHTML = mean(grades) + "%";

    // Median
    document.getElementById("median").innerHTML = median(grades) + "%";
}

function handleBoundChanges (grades) {
    for (let i = 1; i < bounds.length; i++) {
        document.getElementById(bounds[i].id).addEventListener("change", function () {
            var upperBound = document.getElementById(bounds[i - 1].id).value;
            var lowerBound = document.getElementById(bounds[i + 1].id).value;

            if (this.value - upperBound <= 0 && this.value - lowerBound >= 0) {
                for (let j = 1; j < bounds.length; j++) {
                    document.getElementById(j).innerHTML = ""; // Delete original
                }
                histogram(grades);
            }
        });
    }
}

// Utility functions
function parseGrades(data) {
    return (gradesInFloat = data.match(/[+-]?\d+(\.\d+)?/g).map((grade) => {
      return parseFloat(grade);
    }));
  }

function validateBound() {
    for (let i = 1; i < bounds.length; i++) {
      bounds[i].addEventListener("change", function () {
        var upperBound = document.getElementById(bounds[i - 1].id).value;
        var lowerBound = document.getElementById(bounds[i + 1].id).value;
        if (this.value.length == 0 || this.value - upperBound >= 0 || this.value - lowerBound <= 0) {
          alert("Invalid Bounds");
        }
      });
    }
}

function mean(arr) {
    return (arr.reduce((a, b) => a + b, 0) / arr.length).toPrecision(4);
}

function median(arr) {
    //Sort the array
    arr.sort(function (a,b) {
        return a - b;
    });

    let len = arr.length;

    if (len % 2 != 0) {
        return arr[Math.floor(len /2)];
    } else {
        return (arr[Math.floor((len-1) /2)] + arr[len / 2]) / 2;
    }
}
