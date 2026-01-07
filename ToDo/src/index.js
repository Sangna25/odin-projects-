import Project from "./project";
import { renderProjects } from "./dom";
import { renderTasks } from "./dom";
import Task from "./todo";
import {isToday, parseISO,isThisWeek} from 'date-fns';
import './styles.css';
import { toggleSideBar } from "./dom";
import { saveToLocal,getFromLocal } from "./storage";

toggleSideBar();

export const allProjects=[];
const savedData=getFromLocal();
if(savedData && savedData.length>0){
    allProjects.push(...savedData);
}
else{
const defaultProject=new Project("Default");
const t1=new Task("Buy somethinf","Or not who cares","2025-12-27");
defaultProject.addTask(t1);
allProjects.push(defaultProject);
}

let activeProject = allProjects[0];


renderProjects(allProjects);
renderTasks(activeProject.name, activeProject.tasks);
//project query
const projectDialog= document.querySelector('#project-dialog');
const projForm = document.querySelector('#project-form');
const projCancelBtn = document.querySelector('#cancel-proj-btn');
const addBtn =document.querySelector('#add-project-Btn');

addBtn.addEventListener('click',()=>{
    projectDialog.showModal();
});
projCancelBtn.addEventListener('click',()=>{
    projectDialog.close();
});

// fyi : renderproject = display project literally 
projForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const projName = document.querySelector('#projectName').value;
    if(projName){
        const newProj= new Project(projName);
        allProjects.push(newProj);
        saveToLocal(allProjects);
        renderProjects(allProjects);

        projectDialog.close();
        projForm.reset();
    }
})

// task ui 
const cancelBtn = document.querySelector('#cancelBtn');
const dialog= document.querySelector('#task-dialog');
const form =document.querySelector('#task-form');

cancelBtn.addEventListener('click',()=>{
    dialog.close();
})

// task form submission
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const taskTitle= document.querySelector('#task-title').value;
    const taskDesc = document.querySelector('#task-desc').value;
    const taskDate = document.querySelector('#task-date').value;
    const newTask = new Task(taskTitle,taskDesc,taskDate);
    activeProject.addTask(newTask);
    saveToLocal(allProjects);

    renderTasks(activeProject.name, activeProject.tasks);
    dialog.close();
    form.reset(); //resetting form to make it clear 

})
// project switching 
const container=document.querySelector('#project-container');
container.addEventListener('click',(e)=>{
    if(e.target.classList.contains('project-btn')){
        const index= e.target.dataset.index;
        activeProject= allProjects[index];
        renderTasks(activeProject.name, activeProject.tasks);
    }
})

// home functionalities 
const allBtn = document.querySelector('#btn-all');

allBtn.addEventListener('click',()=>{
    const allTasks=[];
    
    allProjects.forEach((project)=>{
        allTasks.push(...project.tasks); // use spread function "flat array"
    })
    renderTasks("All Tasks", allTasks);

})

const todayBtn = document.querySelector('#btn-today');
todayBtn.addEventListener('click',()=>{
    const allTasks=[];
    console.log("TodayBTn pressed")
    allProjects.forEach((project)=>{
        allTasks.push(...project.tasks);
          });

        const todayTasks = allTasks.filter(task=>{
            // convert date string into actual date obj for date-fns
            const dateObject = parseISO(task.duedate);
            //check returns boolean 
            return isToday(dateObject);
        });
  
    
renderTasks("Today",todayTasks);
})

const weekBtn = document.querySelector('#btn-week');
weekBtn.addEventListener('click',()=>{
    console.log("Btn is clicked");
    const allTasks = [];
    allProjects.forEach((project)=>{
        allTasks.push(...project.tasks);
    });
    const weekTasks = allTasks.filter(task=>{
        const dateObject = parseISO(task.duedate);
        return isThisWeek(dateObject,{weekStartsOn:1}); // week starts from monday rather than sunday
    }) ;
    renderTasks("This Week Tasks", weekTasks);
})

// important btn

const impBtn = document.querySelector('#btn-important');
impBtn.addEventListener('click',()=>{
    const allTasks =[];
    allProjects.forEach((project)=>{
        allTasks.push(...project.tasks);
    });
    const importantTasks = allTasks.filter(tasks=>{
        return tasks.priority;
    }
    );
    renderTasks("Important Tasks",importantTasks);
})

// completed Tasks 
const completedBtn = document.querySelector('#btn-completed');
completedBtn.addEventListener('click',()=>{
    const allTasks=[];
    allProjects.forEach((project)=>{
        allTasks.push(...project.tasks);
    });
    const completedTasks= allTasks.filter(task=>{
        return task.isComplete;
    })
    renderTasks("Completed Tasks",completedTasks);
        
    
})

//deleteTasks
export function deleteTasks(task){
    allProjects.forEach(project=>{
        const delIndex= project.tasks.indexOf(task);
        if(delIndex>-1){
            project.tasks.splice(delIndex,1);
            //save
            saveToLocal(allProjects);
            renderTasks(project.title,project.tasks);
        }
    })

}