export default class LinkedList {
    constructor(listHead){
        this.listHead= null;
    }
    // adds node at the end ofthe list
   append(value){
    const newNode = new Node(value);
    if(!this.listHead){
        this.listHead = newNode;
    } else{
        let currentNode = this.listHead;
        while(currentNode.nextNode){
            currentNode = currentNode.nextNode;
        }
        currentNode.nextNode= newNode;
    }
   }

   // adds node at the start of the list 
   prepend(value){
    const newNode = new Node(value);
    if(!this.listHead){
        this.listHead=newNode;
    } else{
        newNode.nextNode = this.listHead;
        this.listHead=newNode
    }
   }
   size(){
    let count = 0;
    let currentNode= this.listHead;
    while(currentNode){
        count ++;
        currentNode= currentNode.nextNode;
    }
    return count
   }
 head(){
   
    if(!this.listHead){
        return undefined;
    } else {
        return this.listHead.value;
    }
 }
 tail(){
    if (!this.listHead){
        return undefined
    } else{
    let currentNode= this.listHead;
    while(currentNode.nextNode !== null){
        currentNode= currentNode.nextNode;
    } 
    return currentNode.value;
 }}
 at(index){
    if(index<0){
        return undefined;
    } else{
        let count =0;
        let currentNode=this.listHead;
        while(currentNode && count<index){
            currentNode=currentNode.nextNode;
            count ++;
        } 
        return currentNode ? currentNode.value : undefined; 
    }
 }
 pop(){
    if(!this.listHead){
        return undefined;
    } else {
        let currentNode= this.listHead;
        this.listHead= this.listHead.nextNode;
        return currentNode.value;
    }
 }
 contains(value){
    let currentNode= this.listHead;
    while(currentNode){
        if(currentNode.value === value){
            return true
        } else {
            currentNode= currentNode.nextNode;
        }
    }
     return false;
 }
 findIndex(value){
    let count = 0;
    let currentNode= this.listHead;
    while(currentNode){
        if(currentNode.value=== value){
            return count;
        } else {
            currentNode = currentNode.nextNode;
            count++;
        }
    }
    return -1;

 }

 toString(){
    if(!this.listHead) return "";
    let currentNode= this.listHead;
    let result = "";
    while(currentNode){
        result =result + `( ${currentNode.value} ) -> `;
        currentNode = currentNode.nextNode;
    }
    result = result + 'null';
    return result

};
insertAt(index, ...values){

    if(index<0 || this.size()<index ){
        throw  new RangeError("Index out of bounds!");
    } else if(index === 0){
        prepend(...values);
    } else{
        let currentNode= this.listHead;
        let count =0;
       while(count < index-1){
        currentNode =currentNode.nextNode;
        count++;
       }
       values.forEach( value =>{
        const newNode = new Node(value);
        newNode.nextNode= currentNode.nextNode;
        currentNode.nextNode= newNode;
        currentNode= newNode;
       })
    }
}
 removeAt(index){
        if(index<0 || index >= this.size()){
            throw new RangeError("Index out of Bounds!");
        } else if(index===0){
            this.pop();
        } else{
            let count =0;
            let currentNode = this.listHead;
            //iterate till u find the node before target node
            while(count < index-1){
                currentNode=currentNode.nextNode;
                count++;
            }
            let nodeToRemove = currentNode.nextNode;
            currentNode.nextNode = nodeToRemove.nextNode;
          
        }
    }

}
   





 class Node{
    constructor (value,nextNode){
        this.value = value;
        this.nextNode = nextNode || null;
    }
    
};
