const trash = "https://image.flaticon.com/icons/svg/1214/1214428.svg"
    // const url = "https://todo-board-deploy.herokuapp.com/post/"
const url = "http://localhost:3000/post/"
document.getElementById('add-task').addEventListener('click', function() {
    let taskValue = document.getElementById('task-value').value;
    if (taskValue) addTask(taskValue);
    document.getElementById('task-value').value = '';
});

function success() {
    if (document.getElementById("task-value").value === "") {
        document.getElementById('add-task').disabled = true;
    } else {
        document.getElementById('add-task').disabled = false;
    }
}
const addTask = (taskValue) => {
    let task = document.createElement('li');
    task.classList.add('task');
    task.classList.add('fill');
    task.setAttribute("draggable", "true");
    task.addEventListener('dragstart', dragStart);
    task.addEventListener('dragend', dragEnd);


    let taskContent = document.createElement('div');
    taskContent.classList.add('task-content');
    taskContent.innerText = taskValue;

    let trash = document.createElement('div');
    trash.classList.add('trash');
    trash.innerText = "X";
    trash.addEventListener('click', removeTask);

    task.appendChild(taskContent);
    task.appendChild(trash);

    let tasks = document.getElementById('tasks-added');
    tasks.insertBefore(task, tasks.childNodes[0]);
}

const removeTask = async(event) => {

    let tasks = event.target.parentNode.parentNode.parentNode;
    let task = event.target.parentNode.parentNode;
    let taskId = event.target.parentNode.parentNode.getAttribute("name");
    console.log(taskId);
    // document.getElementById("DeleteMessage").innerHTML= "jjj"
    const rawResponse = await fetch(url + taskId, {
            method: 'DELETE',
        })
        .then(res => res.json()) // or res.json()
        .then(res => console.log(res));

    tasks.removeChild(task);
}


// DRAG & DROP

let task

const dragStart = (event) => {
    // console.log(event.target);
    event.target.className += ' hold';
    task = event.target;
    setTimeout(() => (event.target.className = 'invisible'), 0);
}

const dragEnd = (event) => {
    // console.log(event.target);
    event.target.className = 'task fill';
}

const dropzones = document.querySelectorAll('.dropzone');

const dragEnter = (event) => {
    // console.log("ENTER");
    event.preventDefault();
    if (event.target.className === "column dropzone") {
        event.target.className += ' hovered';
    }
}

const dragOver = (event) => {
    // console.log("OVER");
    event.preventDefault();
}

const dragLeave = (event) => {
    // console.log("LEAVE");
    if (event.target.className === "column dropzone hovered") {
        event.target.className = "column dropzone"
    }
}

const dragDrop = (event) => {
    // console.log("DROP");
    if (event.target.className === "column dropzone hovered") {
        event.target.className = "column dropzone"
    }
    event.target.append(task);
}

for (const dropzone of dropzones) {
    dropzone.addEventListener('dragenter', dragEnter);
    dropzone.addEventListener('dragover', dragOver);
    dropzone.addEventListener('dragleave', dragLeave);
    dropzone.addEventListener('drop', dragDrop);
}


document.getElementById('add-task-button').addEventListener('click', async function(event) {
    let taskTitle = document.getElementById('task-title').value;
    let taskAsignee = document.getElementById('asignee').value;
    let taskAssignedOn = document.getElementById('AssignedOn').value;
    let taskDueDate = document.getElementById('DueDate').value;
    let taskDescription = document.getElementById('task-description').value;

    if (taskDueDate < taskAssignedOn) {
        alert("Add Due date greater then assigned date")
        return 0;
    }

    var payload = JSON.stringify({
        "title": taskTitle,
        "asignee": taskAsignee,
        "asignedOn": taskAssignedOn,
        "dueDate": taskDueDate,
        "description": taskDescription,
        "status": "1"
    });


    const rawResponse = await fetch(url, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: payload
    });
    // const content = await rawResponse.json();
    // console.log(content);

    addTaskDescription(taskTitle, taskAsignee, taskAssignedOn, taskDueDate, taskDescription, content._id);

    document.getElementById('task-title').value = '';
    document.getElementById('asignee').value = '';
    document.getElementById('AssignedOn').value = '';
    document.getElementById('DueDate').value = '';
    document.getElementById('task-description').value = '';

});
var taskObject = {};
const addTaskDescription = async(taskTitle, taskAsignee, taskAssignedOn, taskDueDate, taskDescription, _id) => {
    let formattedAssignedDate = new Date(taskAssignedOn).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    }).replace(/ /g, '-');
    let formattedDueDate = new Date(taskDueDate).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    }).replace(/ /g, '-');
    taskObject[_id] = {
        title: taskTitle,
        asignee: taskAsignee,
        AssignedOn: taskAssignedOn,
        DueDate: taskDueDate,
        description: taskDescription
    };
    let task = document.createElement('li');
    task.classList.add('task');
    task.classList.add('fill');
    task.setAttribute("draggable", "true");
    task.setAttribute("data-toggle", "tooltip");
    task.setAttribute("data-placement", "top")

    task.setAttribute("title", "Due date: " + formattedDueDate + "\nAssigned on : " + formattedAssignedDate + "\nAssigneed By : " + taskAsignee)
    task.addEventListener('dragstart', dragStart);
    task.addEventListener('dragend', dragEnd);
    task.setAttribute('name', _id);
    //data-toggle="tooltip" data-placement="top" title="Hooray!"

    let Title = document.createElement('div');
    Title.classList.add('task-title');
    Title.innerText = taskTitle;


    // let row = document.createElement('div');
    // row.classList.add('row');
    // row.classList.add('username-row');

    let AssignedOn = document.createElement('div');
    // AssignedOn.classList.add('col-md-6');
    AssignedOn.classList.add('task-dates');
    AssignedOn.innerText = formattedAssignedDate;

    // let user = document.createElement('div');
    // user.classList.add('col-md-6');
    // user.classList.add('task-dates');


    let usericon = document.createElement('i');
    usericon.classList.add('fa');
    usericon.classList.add('fa-user');
    // usericon.classList.add("fa-lg");
    usericon.classList.add("user-icon");
    usericon.setAttribute("aria-hidden", "true");

    let username = document.createElement('div');
    username.classList.add("user-name");
    username.innerText = taskAsignee;

    // user.appendChild(usericon);
    // user.appendChild(username);

    // row.appendChild(AssignedOn);
    // row.appendChild(user);
    let taskContent = document.createElement('div');
    taskContent.classList.add('task-content');
    taskContent.innerText = taskDescription;

    // let assignedDate = document.cre


    let trash = document.createElement('div');
    trash.classList.add('trash');
    trash.setAttribute("data-toggle", "modal");
    trash.setAttribute("data-target", "#myModal2")
    trash.addEventListener('click', fixId);

    let trashicon = document.createElement('i');
    trashicon.classList.add('fa');
    trashicon.classList.add('fa-trash')
    trashicon.classList.add("fa-lg")
    trashicon.setAttribute("aria-hidden", "true");

    trash.appendChild(trashicon);

    let edit = document.createElement('div');
    edit.classList.add('edit');
    edit.setAttribute("data-toggle", "modal");
    edit.setAttribute("data-target", "#myModal3")
    edit.addEventListener('click', fixTask);

    let editicon = document.createElement('i');
    editicon.classList.add('fa');
    editicon.classList.add('fa-pencil-square-o')
    editicon.classList.add("fa-lg")
    editicon.setAttribute("aria-hidden", "true");

    edit.appendChild(editicon);

    task.appendChild(Title);
    task.appendChild(AssignedOn);
    task.appendChild(usericon);
    task.appendChild(username);
    task.appendChild(taskContent);
    task.appendChild(trash);
    task.appendChild(edit);

    let tasks = document.getElementById('tasks-added');
    tasks.insertBefore(task, tasks.childNodes[0]);



}
var deleteTaskId = null;
var deleteTasksevent = null;
var deleteTaskevent = null;
const fixId = (event) => {

    deleteTaskId = event.target.parentNode.parentNode.getAttribute("name");
    deleteTasksevent = event.target.parentNode.parentNode.parentNode;
    deleteTaskevent = event.target.parentNode.parentNode;
}

var editTaskId = null
var editTasksevent = null;
var editTaskevent = null;
const fixTask = async(event) => {

    editTaskId = event.target.parentNode.parentNode.getAttribute("name");
    console.log(taskObject[editTaskId]);

    editTasksevent = event.target.parentNode.parentNode.parentNode;
    console.log(editTasksevent);
    editTaskevent = event.target.parentNode.parentNode;
    console.log(editTaskevent);
}

async function deleteTask(event) {
    const rawResponse = await fetch(url + deleteTaskId, {
            method: 'DELETE',
        })
        .then(res => res.json()) // or res.json()
        .then(res => console.log(res));

    deleteTasksevent.removeChild(deleteTaskevent);
}

function updateduedate() {
    let AssignedDate = document.getElementById("AssignedOn").value
    console.log(AssignedDate)
    let DueDate = document.getElementById("DueDate")
    DueDate.setAttribute("min", AssignedDate)

}

async function getTask() {

    const response = await fetch(url);
    const taskList = await response.json();
    for (let i in taskList) {
        let task = taskList[i];
        console.log(task);
        addTaskDescription(task.title, task.asignee, task.asignedOn, task.dueDate, task.description, task._id);
    }
    // addTaskDescription()
}
$(document).ready(function() {
    $('#AssignedOn').datepicker();
    $('#AssignedOn').datepicker('setDate', 'today');
});

$('#myModal3').on('show.bs.modal', function(e) {
    console.log(taskObject[editTaskId]["description"]);
    document.getElementById("task-title-form-edit").value = (taskObject[editTaskId]["title"]);
    document.getElementById("asignee-form-edit").value = (taskObject[editTaskId]["asignee"]);
    document.getElementById("task-description-edit-form").innerText = (taskObject[editTaskId]["description"]);

    // document.getElementById("AssignedOn").placeholder=new Date(taskObject[editTaskId]["AssignedOn"]).toLocaleDateString('en-CA');
    // $( "#AssignedOn" ).datepicker( "setDate", new Date(taskObject[editTaskId]["AssignedOn"]).toLocaleDateString('en-CA'));
});
// fetch(url)
// .then(results=>{
//     return results.json();
// })
// .then(data=>{
//     console.log(data);
// })

// const axios = require('axios').default;


//add todos document structure in basecamp
//add multiple assignee in task
// add due date alert for the task
//on hovering show due date 
//expand textarea with in bounds

//iterating an array


//

// for (var i = 0; i < 10; i++) {
//     setTimeout(function () {
//         console.log(i)
//     });
// }

// let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
// arr.forEach(i => {
//     setTimeout(function () {
//         console.log(i)
//     });
// });
//see search line ; icon search , type here to search any todo, border rounded
// fixed navbar
// logo in todo board
// add task quickly , change
//rounded border , 
//when add text enable to rapid task
//delete bin addition and edit pencil
//add tick to navigate to next paletes/dropzone

//delete on close , "do you want to delete the task , are u sure" , dleete button color


//on drag drop add + sign
//date top right small size dull color
//shift assing