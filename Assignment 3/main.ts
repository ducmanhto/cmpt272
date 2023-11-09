import { PigController } from "./pig-control";
import { Grey, Chesnut, White, Black, Pig } from "./pig-models";

var pc = new PigController()

const dataTable = document.getElementById('data-table') as HTMLTableElement
const category = document.getElementById("category") as HTMLSelectElement
const ability = document.getElementById('ability') as HTMLLabelElement
const abilityInput = document.getElementById('ability-input') as HTMLInputElement

category.addEventListener('change', function () {

    // Get the selected value of the drop down menu
    var selected = category.options[category.selectedIndex].value

    abilityInput.setAttribute("type", "number")
    if (selected == 'grey') {
        ability.innerHTML = 'Swimming'
        abilityInput.setAttribute("type", "number")
    } else if (selected == 'chestnut') {
        ability.innerHTML = 'Language'
        abilityInput.setAttribute("type", "text")
    } else if (selected == 'white') {
        ability.innerHTML = 'Running'
        abilityInput.setAttribute("type", "number")
    } else if (selected == 'black') {
        ability.innerHTML = 'Strength'
        abilityInput.setAttribute("type", "number")
    }
})

document.getElementById('add-pig')?.addEventListener('click', function () {
    const createContainer = document.querySelector('.create-container');
    createContainer?.classList.toggle('hide');
})

document.getElementById('create')!.addEventListener('click', function () {
    const createContainer = document.querySelector('.create-container');
    createContainer?.classList.toggle('hide');

    var name = (document.getElementById('name')! as HTMLInputElement).value
    var breed = (document.getElementById('breed')! as HTMLInputElement).value
    var height = (document.getElementById('height')! as HTMLInputElement).valueAsNumber
    var weight = (document.getElementById('weight')! as HTMLInputElement).valueAsNumber
    var personality = (document.getElementById('personality')! as HTMLInputElement).value
    var selected = category.options[category.selectedIndex].value

    let newPig
    if (selected == 'grey') {
        var swimming = abilityInput.valueAsNumber
        if (swimming <= 100 && swimming >= 0) {
            newPig = new Grey(selected, name, breed, height, weight, personality, swimming)
            pc.add(newPig)
        }
        else {
            alert("Invalid input for Swimming! Try 0 to 100")
            return;
        }
    } else if (selected == 'chestnut') {
        newPig = new Chesnut(selected, name, breed, height, weight, personality, abilityInput.value)
        pc.add(newPig)
    } else if (selected == 'white') {
        var running = abilityInput.valueAsNumber
        if (running <= 100 && running >= 0) {
            newPig = new White(selected, name, breed, height, weight, personality, running)
            pc.add(newPig)
        }
        else {
            alert("Invalid input for Running! Try 0 to 100")
            return;
        }
    } else {
        var strength = abilityInput.valueAsNumber
        if (strength >= 1 && strength <= 10) {
            newPig = new Black(selected, name, breed, height, weight, personality, strength)
            pc.add(newPig)
        }
        else {
            alert("Invalid input for Strength! Try 0 to 10")
            return;
        }
    }
    render()
})

const nameInfo = document.getElementById('name-info') as HTMLTableCellElement
const breedInfo = document.getElementById('breed-info') as HTMLTableCellElement
const heightInfo = document.getElementById('height-info') as HTMLTableCellElement
const weightInfo = document.getElementById('weight-info') as HTMLTableCellElement
const personalityInfo = document.getElementById('personality-info') as HTMLTableCellElement
const abilityInfo = document.getElementById('ability-info') as HTMLTableCellElement
const abilityValue = document.getElementById('ability-value') as HTMLTableCellElement

function render() {
    var pigs = pc.getAll();
    
    // Group pigs by category
    const groupedPigs = pigs.reduce((acc, pig) => {
        const category = pig.category;
        (acc[category] = acc[category] || []).push(pig);
        return acc;
    }, {} as Record<string, Pig[]>);

    var data = `<tr>
                    <th>Name</th>
                    <th>Category</th>
                    <td></td>
                    <td></td>
                </tr>`;

    // Sort pigs within each category by name
    Object.keys(groupedPigs).forEach((category) => {
        const categoryPigs = groupedPigs[category].sort((a, b) => a.name.localeCompare(b.name));

        categoryPigs.forEach((pig) => {
            data +=
                `<tr>
                    <td>${pig.name}</td>
                    <td>${pig.category}</td>
                    <td><button class="more-info-btn">More Info</button></td>
                    <td><button class="delete-btn">Delete</button></td>
                </tr>`;
        });
    });

    dataTable!.innerHTML = data;
    
    // More Info
    var more_btns = document.querySelectorAll('.more-info-btn')
    for (let i = 0; i < more_btns.length; i++) {
        more_btns[i]?.addEventListener('click', function () {
            var pig = pc.getAll()[i]
            var pigCategory = pig.category

            nameInfo!.innerHTML = pig.name
            breedInfo!.innerHTML = pig.breed
            heightInfo!.innerHTML = pig.height.toString()
            weightInfo!.innerHTML = pig.weight.toString()
            personalityInfo!.innerHTML = pig.personality

            if (pigCategory == 'grey') {
                abilityInfo!.innerHTML = "Swimming"
                abilityValue!.innerHTML = pig.ability
            } else if (pigCategory == 'chestnut') {
                abilityInfo!.innerHTML = "Language"
                abilityValue!.innerHTML = pig.ability
            } else if (pigCategory == 'white') {
                abilityInfo!.innerHTML = "Running"
                abilityValue!.innerHTML = pig.ability
            } else {
                abilityInfo!.innerHTML = "Strength"
                abilityValue!.innerHTML = pig.ability
            }
        })
    }

    // Delete 
    var delete_btns = document.querySelectorAll('.delete-btn')
    for (let i = 0; i < delete_btns.length; i++) {
        delete_btns[i]?.addEventListener('click', function () {
            var pig = pc.getAll()[i]

            // Display a confirmation alert
            var isConfirmed = window.confirm(`Are you sure you want to delete ${pig.name}?`);

            if (isConfirmed) {
                pc.delete(pig);
                render();
            }
        })
    }
}
render()








