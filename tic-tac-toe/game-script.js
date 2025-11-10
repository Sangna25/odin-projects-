
// board module 
const gameBoard = (function(){
    let boardCells=["","","","","","","","",""]; // is an private array consisiting of marker i.e ['X','O'....] 

    return {
        getBoard :function(){
            return [...boardCells];
        },
        placeMarker: function(index, marker){
            if(boardCells[index]===''){
            boardCells[index]=marker;
            return true;
        }
        return false ;
    },
    reset: function(){
        boardCells=["","","","","","","","",""];
        displayController.setMessage('Start Game!');
    }
        

    }
})();

// factory function 
const createPlayer= function(name,marker){
    return {
    name :name,
    marker:marker
}};


// boss module 
const gameController = (function(){
    const playerOne =createPlayer('Player-One','X');
    const playerTwo = createPlayer('Player-Two','O');
    let activePlayer =playerOne;
    const checkWinner = function(){
        const board = gameBoard.getBoard();
        if(board[0]==board[1] && board[1]==board[2] && board[0]!==""){
            return board[0];
        }
        else if(board[3]==board[4] && board[4]==board[5] && board[3]!==""){
            return board[3];
        }
        else if(board[6]==board[7] && board[7]==board[8] && board[6]!==""){
            return board[6];
        }
        else if(board[0]==board[4] && board[4]==board[8] && board[0]!==""){
            return board[0];
        }
        else if(board[2]==board[4] && board[4]==board[6] && board[2]!==""){
            return board[2];
        }
        else if(board[0]==board[3] && board[3]==board[6] && board[0]!==""){
            return board[0];
        }
        else if(board[1]==board[4] && board[4]==board[7] && board[1]!==""){
            return board[1];
        }
        else if (board[2]==board[5] && board[5]==board[8] && board[2]!==""){
            return board[2];
        }
        else{
            if(!board.includes('')){
                return "Tie!";
            }
            return ""; // if move is made but not all the cells are filled 
        }
    }
    
    return {
         getActivePlayer: function(){
            return activePlayer;
         },
         playRound : function(index){
           const moveSuccessful=  gameBoard.placeMarker(index,activePlayer.marker); 
           if (moveSuccessful){
          const winner = checkWinner();
           if(winner !==''){
            if(winner == "Tie!"){
                displayController.setMessage("Tie Between both players!");
            }
            else{
            displayController.setMessage(`${winner} wins!`);
           }
        } 
           else{
            
             if  (activePlayer===playerOne) {
                activePlayer=playerTwo;
            }
            else {
                activePlayer=playerOne
            }
           displayController.setMessage(`${activePlayer.name}'s Turn!`);
         }
        
        }
        
        
        
    },
    restartPlayer : function(){
        activePlayer=playerOne;
    }

}})();

//safebox module : html coordinator 
const displayController= function(){
    const messageDisplay = document.querySelector('#message-display');
    const restartBtn = document.querySelector('#restartBtn')
    const cellElements = document.querySelectorAll('.boardCells');
     const _render =function(){
            const board = gameBoard.getBoard();
            board.forEach(function(marker,index){
                cellElements[index].textContent=marker ;
            }) 
        }

   cellElements.forEach(function(cell,index){
    cell.addEventListener('click',function(){
        gameController.playRound(index);
        _render();

    })
   })
   //restart btn 
   restartBtn.addEventListener('click',function(){
    gameBoard.reset();
    gameController.restartPlayer();
    _render();

   })
  

    return {
       render:_render,
       setMessage : function(message){
        messageDisplay.textContent=message;

       }

    }
}();