export default class Task{
    constructor(title,detail,duedate,priority){
        this.title=title;
        this.detail=detail;
        this.duedate=duedate;
        this.priority=false;
        
        this.isComplete=false;
        
    }
}