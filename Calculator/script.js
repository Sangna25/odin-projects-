function add(a,b){
    return a+b;
}
function subtract(a,b){
    return a-b;
}
function multiply(a,b){
    return a*b;
}
function divide(a,b){
    if(b==0) return undefined;
    return a/b;
}

function operate(op,a,b){
 switch(op){
    case "+":
        return add(a,b);
        
     case "-":
        return subtract(a,b);
        
     case "x":
       return  multiply(a,b);
        
     case "/":
        return divide(a,b);
        
 }

}
let firstOperand;
let operator;
 let secondOperand;
 let isOperator=false;
const display=document.querySelector('#display');
const num=document.querySelectorAll(".num-btn");
num.forEach(num=>{
    num.addEventListener('click',()=>{
        if(isOperator){
            display.textContent="";
            isOperator=false;
        }
        display.textContent+=num.textContent;
    })
})
const restartBtn=document.querySelectorAll('.restartBtn');
restartBtn.forEach(btn=>{
    btn.addEventListener('click',()=>{
    display.textContent=''
})
})

const operatorBtn=document.querySelectorAll('.operatorBtn');

operatorBtn.forEach(op=>{
    op.addEventListener('click',()=>{
    
        firstOperand=display.textContent;
        operator=op.textContent;
        isOperator=true;
        display.textContent=`${firstOperand} ${operator}`;
        
       
})
})
const equal=document.querySelector('.equal')
equal.addEventListener(('click'),()=>{
     secondOperand=display.textContent;
     const result=operate(operator,parseFloat(firstOperand),parseFloat(secondOperand));
     display.textContent=result;

})
const decimal=document.querySelector('#decimal');
decimal.addEventListener('click',()=>{
    if(!display.textContent.includes(".")){
        display.textContent+='.'
    }
});