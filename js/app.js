const trash = "https://image.flaticon.com/icons/svg/1214/1214428.svg"

document.getElementById('add-task').addEventListener('click', function() {
    let taskValue = document.getElementById('task-value').value;
    if (taskValue) addTask(taskValue);
    document.getElementById('task-value').value = '';
});

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

const removeTask = (event) => {
    let tasks = event.target.parentNode.parentNode;
    let task = event.target.parentNode;
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
    if(event.target.className === "column dropzone") {
        event.target.className += ' hovered';   
    }
}

const dragOver = (event) => {
    // console.log("OVER");
    event.preventDefault();
}

const dragLeave = (event) => {
    // console.log("LEAVE");
    if(event.target.className === "column dropzone hovered") {
        event.target.className = "column dropzone"
    }
}

const dragDrop = (event) => {
    // console.log("DROP");
    if(event.target.className === "column dropzone hovered") {
        event.target.className = "column dropzone"
    }
    event.target.append(task);
}

for(const dropzone of dropzones) {
    dropzone.addEventListener('dragenter', dragEnter);
    dropzone.addEventListener('dragover', dragOver);
    dropzone.addEventListener('dragleave', dragLeave);
    dropzone.addEventListener('drop', dragDrop);
}


document.getElementById('add-task-button').addEventListener('click', function(event) {
    event.preventDefault();
    let taskValue = document.getElementById('task-value-form').value;
    console.log(taskValue);
    // taskValue.
    let taskTitle = document.getElementById('task-title').value;
    console.log(taskTitle)
    let taskAsignee = document.getElementById('asignee').value;
    console.log(taskAsignee)
    let taskAssignedOn = document.getElementById('AssignedOn').value;
    console.log(taskAssignedOn)
    let taskDueDate = document.getElementById('DueDate').value;
    console.log(typeof taskDueDate)
    let taskDescription = document.getElementById('task-description').value;
    console.log(taskDescription)

    if (taskDueDate<taskAssignedOn)
    {    alert("Add Due date greater then assigned date")
        return 0;
    }

    addTaskDescription(taskTitle,taskAsignee,taskAssignedOn,taskDueDate,taskDescription);
    document.getElementById('task-value-form').value = '';
});

const addTaskDescription = (taskTitle,taskAsignee,taskAssignedOn,taskDueDate,taskDescription) => {
    let task = document.createElement('li');
    task.classList.add('task');
    task.classList.add('fill');
    task.setAttribute("draggable", "true");
    task.setAttribute("data-toggle","tooltip");
    task.setAttribute("data-placement","top")
    task.setAttribute("title","Due date is : "+taskDueDate+"\nTask was assigned on: "+taskAssignedOn)
    task.addEventListener('dragstart', dragStart);
    task.addEventListener('dragend', dragEnd);
    //data-toggle="tooltip" data-placement="top" title="Hooray!"

    let Title = document.createElement('div');
    Title.classList.add('task-title');
    Title.innerText = taskTitle;

    let taskContent = document.createElement('div');
    taskContent.classList.add('task-content');
    taskContent.innerText = taskDescription;


    
    let trash = document.createElement('div');
    trash.classList.add('trash');
    trash.setAttribute("data-toggle","modal");
    trash.setAttribute("data-target","#myModal2")
    trash.innerText = "X";
    trash.addEventListener('click', removeTask);

    let edit = document.createElement('div');
    edit.classList.add('edit');
    
    let editicon = document.createElement('i');
    editicon.classList.add('fa');
    editicon.classList.add('fa-pencil-square-o')
    editicon.setAttribute("aria-hidden","true");

    edit.appendChild(editicon);

    task.appendChild(Title);
    task.appendChild(taskContent);
    task.appendChild(trash);
    task.appendChild(edit)

    let tasks = document.getElementById('tasks-added');
    tasks.insertBefore(task, tasks.childNodes[0]);
    console.log("llll")

}



let AssignedDate = document.getElementById("AssignedOn")
AssignedDate.setAttribute("useCurrent","true")

//add todos document structure in basecamp
//add multiple assignee in task
// add due date alert for the task
//on hovering show due date 
//expand textarea with in bounds

//iterating an array