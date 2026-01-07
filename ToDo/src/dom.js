import { deleteTasks } from './index';
import addIcon from './assets/icons8-add-30.png';
import starfilledIcon from './assets/icons8-star-filled-30.png';
import starIcon from './assets/icons8-star-32.png';
import deleteIcon from './assets/icons8-delete-30.png';
import checkBox from './assets/icons8-checkbox-20.png';
import filledCheckBox from './assets/icons8-checkbox-30.png';
import { saveToLocal } from './storage';
import{allProjects} from "./index";

export function toggleSideBar(){
    const menuBar = document.querySelector('#sidebar-toggle');
    const container = document.querySelector('#container');
 menuBar.addEventListener('click',()=>{
    container.classList.toggle('sidebar-active');
 })
}



// render project -> proj container - add projectbtn - with project name & index for all projects 
export function renderProjects(projects){
    const container=document.querySelector('#project-container');
    container.innerHTML="";
    projects.forEach((project,index) => {
        const btn=document.createElement('button');
        btn.innerText=project.name;
        btn.classList.add('project-btn');
        btn.dataset.index=index;
        container.append(btn)
    });
}

// renderTasks -> project name -> for each task: task card-> assign their title,desc,duedate
// renderTasks -> project name -> for each task: task card-> assign their title,desc,duedate
export function renderTasks(title, tasks){
    

    const taskContainer = document.querySelector('#task-container')
    taskContainer.innerHTML="";
    const projectName = document.createElement('h2');
    projectName.innerText= title;
    taskContainer.append(projectName);
     // add task btn inside render task asnot same for all project,
       const addTaskBtn=document.createElement('button')
        addTaskBtn.innerHTML=`
        <img src="${addIcon}" width="20">
        Add Task `;
        addTaskBtn.id="addTaskBtn";
        addTaskBtn.addEventListener('click',()=>{
            const dialog= document.querySelector('#task-dialog');
            dialog.showModal();
        });
        taskContainer.append(addTaskBtn);


    if (tasks.length === 0) {
    const message = document.createElement('p');
    message.classList.add('container-message');
    message.innerText = "No tasks yet!";
    taskContainer.appendChild(message);
    return;
}
// div to hold task-cards
const taskWrapper = document.createElement('div');
 taskWrapper.classList.add('task-wrapper');
 taskContainer.appendChild(taskWrapper);


    tasks.forEach((task)=>{
        const div = document.createElement('div');
       
        const priorityBtn = document.createElement('button');
        if(task.priority){
            priorityBtn.innerHTML=`<img class="icons" src="${starfilledIcon}" width='15'>`
        }
        else {
            priorityBtn.innerHTML=`<img class="icons"  src="${starIcon}" width ="15">`
        }
        priorityBtn.classList.add("priority-btn");
        priorityBtn.addEventListener('click',()=>{
            task.priority = !task.priority;
            // save
            saveToLocal(allProjects);
            renderTasks(title,tasks);

        })
        const deleteBtn = document.createElement('button');
        deleteBtn.innerHTML=`<img class="icons" src="${deleteIcon}" width="15">`;
        deleteBtn.classList.add('delBtn');
        deleteBtn.addEventListener('click',()=>{
            deleteTasks(task);
        });

        const completeBtn = document.createElement('button');
        if(task.isComplete){
            completeBtn.innerHTML=`<img class="icons" src="${filledCheckBox}" width="15">`;
        }
        else{
            completeBtn.innerHTML=`<img class="icons" src="${checkBox}" width="15">`;
        }
        completeBtn.classList.add("complete-btn");
        completeBtn.addEventListener('click',()=>{
            task.isComplete=!task.isComplete;
            // save
            saveToLocal(allProjects);
            renderTasks(title,tasks);
        })



        div.classList.add('task-card');
        div.innerHTML=`
        <span>Title : ${task.title}</span>
        <span>Description :${task.detail}</span>
        <span>Due Date: ${task.duedate}</span> `;
        const btnGroup = document.createElement('div');
        btnGroup.classList.add('task-btn-grp');
        btnGroup.append(priorityBtn,deleteBtn,completeBtn)
        div.appendChild(btnGroup);
        taskWrapper.appendChild(div);
       
    })
   
}