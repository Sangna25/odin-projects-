class Node{
    constructor(data){
        this.data=data;
        this.left=null;
        this.right = null
    }
}
class Tree{
    constructor(array){
     const removeDuplicates = array.filter((value,index) => array.indexOf(value)=== index);
     const cleanArray = removeDuplicates.sort((a,b) => a-b);
    this.root= this.buildTree(cleanArray)
    }
    buildTree(array,start =0, end=array.length-1){
        if (start > end) return null;
        let middle = Math.floor((start+end) / 2);
        let rootNode = new Node(array[middle]);
        rootNode.left = this.buildTree(array,start,middle-1);
        rootNode.right = this.buildTree(array, middle+1, end);
        return rootNode;
    }
    // insert at root if empty , else at apt node 
    insert(root,value){
        if(root === null) return new Node(value);

        if(value < root.data){
            root.left = this.insert(root.left,value);
        } else {
            root.right = this.insert(root.right,value)
        }
  return root;
    }


    deleteItem (value){
        this.root = this._deleteNode(this.root,value);
    }
    _deleteNode(root,value){
        if (root === null ) return null;
        if (value < root.data){
            root.left = this._deleteNode(root.left,value);
        } else if (value > root.data){
            root.right = this._deleteNode(root.right,value);
        } else{
            if(root.left === null && root.right=== null){
                return null;
            } else if(root.left === null){
                    return root.right;
             } else if(root.right ===  null){
                    return root.left;
                } else {
                    // traversing right subtree
                    let temp = root.right ;
                    // traversing left of right subtree
                    while(temp.left){
                        temp = temp.left;
                    }
                    // replace root with smallest right subtree value i.e just greater than root 
                    root.data = temp.data;
                    // del the duplicate node in right subtree
                    root.right = this._deleteNode(root.right,temp.data);
                    return root; 
                }
            }
        return root;
        }
        find(value){
         return this._findNode(this.root, value)
        } 
        _findNode(root,value){
            if(root === null) return null;
            if (root.data=== value) return root;
            else if(value < root.data ){
                return this._findNode(root.left , value);
            } else {
                return this._findNode(root.right, value)
            }
        }
        // Level order traversal, BFS, callback : a function as an arg into another function

        levelOrderTraversal(callback){
            if(typeof callback !=='function'){
                throw new Error("A callback function is required!");
            }
            // base case
            if(this.root === null) return 
            // queue
            const queue = [this.root];
            // traverse queue
            while(queue.length > 0){
                const currentNode = queue.shift(); // remove current front node i.e remove oldest added node

                // action 
                callback(currentNode);

                //enque level wise i.e left then right
               if(currentNode.left) queue.push(currentNode.left);
               if(currentNode.right) queue.push(currentNode.right); 

            }
        }
        // in order :Left Root Right
        inOrderForEach(callback, node= this.root){
            if(typeof callback !== 'function'){
                throw new Error("A callback function is required");
            }
           if (!node) return ;
           this.inOrderForEach(callback,node.left); // go left
           callback(node) // action 
           this.inOrderForEach(callback, node.right) // go right

        }
// pre : Root Left Right
        preOrderForEach(callback, node=this.root){
            if(typeof callback !== 'function'){
                throw new Error("A callback should be a function");
            }
            if(!node) return ;
            callback(node);
            this.preOrderForEach(callback,node.left);
            this.preOrderForEach(callback,node.right);
        }
// postOrder : left right root

        postOrderForEach(callback, node=this.root){
            if(typeof callback !=='function'){
                throw new Error("A callback should be a function!")
            };
            if(!node) return ;
            this.postOrderForEach(callback,node.left);
            this.postOrderForEach(callback,node.right);
            callback(node);
        }

// height of tree : no. of edges in longest path from node to leaf
//The height of the current node is 1 + max(height of left subtree, height of right subtree)

    height(value){
        const targetNode= this.find(value);
        if(!targetNode) return null;
         return _findHeight(targetNode); 
             
        }
    _findHeight(node){
        if(!node) return -1 ;
        let leftHeight = this._findHeight(node.left)
        let rightHeight = this._findHeight(node.right);
        return 1+ Math.max(leftHeight,rightHeight);
    }

    depth(value){
        return _findDepth(this.root,value)
    }
    _findDepth(node, value){
        if(!node) return null;
        if(node.data === value) return 0;
        let dir = (value < node.data) 
                  ? this._findDepth(node.left, value)
                  : this._findDepth(node.right, value);
        return (dir=== null) ? null : 1 +dir
    }
// the height difference between its left and right subtrees is no more than 1
    isBalanced(){
        return this._isBalancedtree(this.root);
    }
    _isBalancedtree(node){
        if(!node) return true; // empty tree is also a balanced tree
        // height of left nd right subtree : leftHeight - rightHeight <=1
        let leftH = this._findHeight(node.left);
        let rightH = this._findHeight(node.right);
        let isCurrentNodeBalanced = Math.abs(leftH-rightH) <=1; // returns boolean
        return isCurrentNodeBalanced && this._isBalancedtree(node.left) && this._isBalancedtree(node.right); // everytime check the leftand right subtree too
 
    }
    rebalance(){
        const sortedArray = [];
        // inorder so, sorted 
        this.inOrderForEach((node) => {
            sortedArray.push(node.data)
        });
        this.root = this._rebalanceTree(sortedArray);
    }
    _rebalanceTree(array){
        if (array.length === 0) return null;
        const mid = Math.floor(array.length/2);
        const node = new Node(array[mid]);
        // use buildTree 
        node.left = this.buildTree(array.slice(0, mid));
        node.right = this.buildTree(array.slice(mid+1));
        return node

    }
}
const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
};


const data = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const tree = new Tree(data);
const data1 = [];
const tree1 = new Tree(data1) ;

// console.log(prettyPrint( tree1.insert(tree1.root,10)))
// console.log(prettyPrint( tree1.insert(tree1.root,-5)))
tree.deleteItem(5);
prettyPrint(tree.root)

console.log(tree.isBalanced());
tree.levelOrderTraversal(node=>console.log(node.data));
tree.preOrderForEach(node=>console.log(node.data))

const tree2 = new Tree([]);
[101,200,300,400,500].forEach(v => {
    tree2.root = tree2.insert(tree2.root, v);
})
// inserte wont rearrange or sort
console.log(tree2.isBalanced());
tree2.rebalance();
prettyPrint(tree2.root);
console.log(tree2.isBalanced())