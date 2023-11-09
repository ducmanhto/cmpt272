"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var pig_control_1 = require("./pig-control");
var pig_models_1 = require("./pig-models");
var pc = new pig_control_1.PigController();
var dataTable = document.getElementById('data-table');
var category = document.getElementById("category");
var ability = document.getElementById('ability');
var abilityInput = document.getElementById('ability-input');
category.addEventListener('change', function () {
    // Get the selected value of the drop down menu
    var selected = category.options[category.selectedIndex].value;
    abilityInput.setAttribute("type", "number");
    if (selected == 'grey') {
        ability.innerHTML = 'Swimming';
        abilityInput.setAttribute("type", "number");
    }
    else if (selected == 'chestnut') {
        ability.innerHTML = 'Language';
        abilityInput.setAttribute("type", "text");
    }
    else if (selected == 'white') {
        ability.innerHTML = 'Running';
        abilityInput.setAttribute("type", "number");
    }
    else if (selected == 'black') {
        ability.innerHTML = 'Strength';
        abilityInput.setAttribute("type", "number");
    }
});
(_a = document.getElementById('add-pig')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function () {
    var createContainer = document.querySelector('.create-container');
    createContainer === null || createContainer === void 0 ? void 0 : createContainer.classList.toggle('hide');
});
document.getElementById('create').addEventListener('click', function () {
    var createContainer = document.querySelector('.create-container');
    createContainer === null || createContainer === void 0 ? void 0 : createContainer.classList.toggle('hide');
    var name = document.getElementById('name').value;
    var breed = document.getElementById('breed').value;
    var height = document.getElementById('height').valueAsNumber;
    var weight = document.getElementById('weight').valueAsNumber;
    var personality = document.getElementById('personality').value;
    var selected = category.options[category.selectedIndex].value;
    var newPig;
    if (selected == 'grey') {
        var swimming = abilityInput.valueAsNumber;
        if (swimming <= 100 && swimming >= 0) {
            newPig = new pig_models_1.Grey(selected, name, breed, height, weight, personality, swimming);
            pc.add(newPig);
        }
        else {
            alert("Invalid input for Swimming! Try 0 to 100");
            return;
        }
    }
    else if (selected == 'chestnut') {
        newPig = new pig_models_1.Chesnut(selected, name, breed, height, weight, personality, abilityInput.value);
        pc.add(newPig);
    }
    else if (selected == 'white') {
        var running = abilityInput.valueAsNumber;
        if (running <= 100 && running >= 0) {
            newPig = new pig_models_1.White(selected, name, breed, height, weight, personality, running);
            pc.add(newPig);
        }
        else {
            alert("Invalid input for Running! Try 0 to 100");
            return;
        }
    }
    else {
        var strength = abilityInput.valueAsNumber;
        if (strength >= 1 && strength <= 10) {
            newPig = new pig_models_1.Black(selected, name, breed, height, weight, personality, strength);
            pc.add(newPig);
        }
        else {
            alert("Invalid input for Strength! Try 0 to 10");
            return;
        }
    }
    render();
});
var nameInfo = document.getElementById('name-info');
var breedInfo = document.getElementById('breed-info');
var heightInfo = document.getElementById('height-info');
var weightInfo = document.getElementById('weight-info');
var personalityInfo = document.getElementById('personality-info');
var abilityInfo = document.getElementById('ability-info');
var abilityValue = document.getElementById('ability-value');
function render() {
    var _a, _b;
    var pigs = pc.getAll();
    // Group pigs by category
    var groupedPigs = pigs.reduce(function (acc, pig) {
        var category = pig.category;
        (acc[category] = acc[category] || []).push(pig);
        return acc;
    }, {});
    var data = "<tr>\n                    <th>Name</th>\n                    <th>Category</th>\n                    <td></td>\n                    <td></td>\n                </tr>";
    // Sort pigs within each category by name
    Object.keys(groupedPigs).forEach(function (category) {
        var categoryPigs = groupedPigs[category].sort(function (a, b) { return a.name.localeCompare(b.name); });
        categoryPigs.forEach(function (pig) {
            data +=
                "<tr>\n                    <td>".concat(pig.name, "</td>\n                    <td>").concat(pig.category, "</td>\n                    <td><button class=\"more-info-btn\">More Info</button></td>\n                    <td><button class=\"delete-btn\">Delete</button></td>\n                </tr>");
        });
    });
    dataTable.innerHTML = data;
    // More Info
    var more_btns = document.querySelectorAll('.more-info-btn');
    var _loop_1 = function (i) {
        (_a = more_btns[i]) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function () {
            var pig = pc.getAll()[i];
            var pigCategory = pig.category;
            nameInfo.innerHTML = pig.name;
            breedInfo.innerHTML = pig.breed;
            heightInfo.innerHTML = pig.height.toString();
            weightInfo.innerHTML = pig.weight.toString();
            personalityInfo.innerHTML = pig.personality;
            if (pigCategory == 'grey') {
                abilityInfo.innerHTML = "Swimming";
                abilityValue.innerHTML = pig.ability;
            }
            else if (pigCategory == 'chestnut') {
                abilityInfo.innerHTML = "Language";
                abilityValue.innerHTML = pig.ability;
            }
            else if (pigCategory == 'white') {
                abilityInfo.innerHTML = "Running";
                abilityValue.innerHTML = pig.ability;
            }
            else {
                abilityInfo.innerHTML = "Strength";
                abilityValue.innerHTML = pig.ability;
            }
        });
    };
    for (var i = 0; i < more_btns.length; i++) {
        _loop_1(i);
    }
    // Delete 
    var delete_btns = document.querySelectorAll('.delete-btn');
    var _loop_2 = function (i) {
        (_b = delete_btns[i]) === null || _b === void 0 ? void 0 : _b.addEventListener('click', function () {
            var pig = pc.getAll()[i];
            // Display a confirmation alert
            var isConfirmed = window.confirm("Are you sure you want to delete ".concat(pig.name, "?"));
            if (isConfirmed) {
                pc.delete(pig);
                render();
            }
        });
    };
    for (var i = 0; i < delete_btns.length; i++) {
        _loop_2(i);
    }
}
render();
