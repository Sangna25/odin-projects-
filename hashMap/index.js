// hashmap -> fasteraccess, converts str to no(hashcode), str -> hashcode -> bucket, nd buckets are fixed hashcode is index for bucket, -> inside buckt linked list resizing avail.-> compare input with key -> correct node -> get the value
class Node {
    constructor(key, value, next){
        this.key=key;
        this.value=value;
        this.next = next || null;
    }
}


export class HashMap{
    constructor(loadFactor = 0.75,capacity=16){
        this.loadFactor=loadFactor
        this.capacity=capacity
        this.size =0;
        this.buckets = new Array(capacity).fill(null);
    }
   // create hashcode for key, str -> number
    hash(key){
        let hashCode=0;
        const primeNumber = 31;
        for(let i=0; i<key.length;i++){
            hashCode = (primeNumber*hashCode + key.charCodeAt(i)) % this.capacity;
        }
        return hashCode;
    };
    //adds key value pair or updates key's value
    set(key,value){
          const index= this.hash(key);
          let current = this.buckets[index];
          // updating the existing node 
          while (current!== null){
            if(current.key === key){
                current.value = value;
                return;
            }
            current = current.next;
          }
          // add
          const newNode = new Node(key, value, this.buckets[index]);
          this.buckets[index]= newNode;
          this.size++;
        
    }
    get(key){
        const index = this.hash(key);
        let current = this.buckets[index];
        if(current === null){
            return null;
        } else{
            while( current !== null){
                if(current.key === key){
                    return current.value
                }
                current = current.next;
            }
        }
    }
 // checks if present
    has(key){
      return this.get(key) !==null;
    }
// remove value of that key 
    remove(key){
        const index=this.hash(key);
        let current = this.buckets[index];
        let prev =null
        // iterate thro bucket 
        while(current!==null){
            // found the key
            if(current.key === key){
                // either key is head
                if(prev === null){
                    this.buckets[index] = current.next // new head
                } else {
                    // or key is in middle or last
                    prev.next = current.next ;
                }
                this.size--;
                return true;
            }
            prev = current;
            current = current.next;
            
        }
        return false;
    }
    length(){
        return this.size;
    }
    clear(){
        for(let i =0 ; i<this.capacity;i++){
            this.buckets[i] = null;
        }
        this.size=0;
    }
    entries(){
        let result = [];
       for(let i =0 ;i<this.capacity;i++){
        // for every bucket 
        let current = this.buckets[i]; 
        // for every list
        while(current !== null){
            // push each node
            result.push([current.key, current.value]);
            current = current.next;
        }
       }
       return result;
    }
    keys(){
        return this.entries().map(entry => entry[0]);
    }
    values(){
        return this.entries().map(entry => entry[1]);
    }
}