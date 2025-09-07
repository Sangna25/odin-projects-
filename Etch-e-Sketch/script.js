const container =document.querySelector('#container');

function makeGrid(size){

    container.innerHTML= '';
    const containerWidth= 960;
    const squareSize = containerWidth / size;
    
     
    for(let i=0;i<size * size;i++){
    const div= document.createElement('div');
    div.style.height=`${squareSize}px`;
    div.style.width=`${squareSize}px`;
    div.style.boxSizing='border-box';
    div.addEventListener('mouseenter',()=>{
    let r=Math.floor(Math.random()*256);
    let g=Math.floor(Math.random()*256);
    let b =Math.floor(Math.random()*256);
    div.style.backgroundColor = `rgb(${r},${g},${b})`;
     });
     container.appendChild(div);
   }
}

 let size= prompt("Enter the size of grid?");
 if(!size || size<1) size=16;
 if (size > 100) size = 100;
 makeGrid(size);


const btn = document.querySelector('#new-grid-btn');
btn.addEventListener(('click'),()=>{
    let newSize= prompt("Enter size for your new grid");
    if(newSize >100 ) newSize =100;
    makeGrid(newSize);
})
