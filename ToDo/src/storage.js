import Project from "./project";
import Task from "./todo";



export const saveToLocal=(allProjects)=>{
    localStorage.setItem('todolistData',JSON.stringify(allProjects)); // todolistData is the key and value is my string
};
export const getFromLocal =()=>{
    const data= localStorage.getItem('todolistData');
   if(!data) return null;
   // only drawwing and not actual methods of obj
   const parsedData= JSON.parse(data);
   // now drawing is converted into actual object 
   return parsedData.map(projObj=>{
    const project = new Project(projObj.name);
     projObj.tasks.forEach(t=>{
        const task = new Task(t.title,t.detail,t.duedate);
    task.priority=t.priority;
    task.isComplete= t.isComplete;
    project.addTask(task);
     });
     return project;});
    };


    
   
  

