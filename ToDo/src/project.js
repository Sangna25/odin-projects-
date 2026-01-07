export default class Project{
    constructor(name,tasks){
        this.name=name;
        this.tasks=[];
        
    }
   addTask(task){
    this.tasks.push(task);
   } 
   removeTask(index){
    this.tasks.splice(index,1);
   }
   getTasks(){
    return this.tasks;
   }
}