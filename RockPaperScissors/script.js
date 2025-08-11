let humanScore =0;
let computerScore=0;

function getComputerChoice(){
    let x=Math.floor(Math.random() *3)
      if (x===0){
        return "ROCK";
    }
    else if(x===1){
        return "SCISSORS"
    }
    else{
        return "PAPER"
    }

}

function getHumanChoice(){
    
    while(true){
        let choice=prompt("Enter your choice to play the game: ");
        choice = choice.toUpperCase()
    if(!choice) {
        continue;
    }
        
    
    else if(choice==="ROCK" || choice==="SCISSORS" || choice==="PAPER" ){
        return choice ;
    }
    else{
        return "Invalid Choice ! "
    }
}
}

 
function playRound(humanChoice,computerChoice){
    if (humanChoice==="ROCK" && computerChoice ==="SCISSORS"){
        humanScore=humanScore+1;
        return "You Win! Rock beats Scissors";
        
    }
    else if (humanChoice==="PAPER" && computerChoice ==="ROCK"){
         humanScore=humanScore+1;
        return "You Win! Paper beats Rock";
       
    }
    else if (humanChoice==="SCISSORS" && computerChoice ==="PAPER"){
         humanScore=humanScore+1;;
        return "You Win! Scissors beats Paper";
        
    }
    else if (humanChoice===computerChoice){
          humanScore=humanScore+0;
        return "Tie! Continue to play game..."
      
    }
    else{
        computerScore=computerScore+1;
        return "You Lose! Better Luck Next Time :) "
        
    }
    
}





function playGame(){
    
    for (let i=1;i<=5;i++){
        const humanChoice=getHumanChoice();
        const computerChoice=getComputerChoice();
         console.log(`Round ${i}:`);
        console.log(playRound(humanChoice, computerChoice));
        console.log(`Score -> You: ${humanScore}, Computer: ${computerScore}`);
    }
    if(humanScore > computerScore){
        console.log( "You Win !");
    }
    else if(humanScore< computerScore){
        console.log("You lose! Better Luck Next Time ")
    }
    else{
        console.log("Tie ! Play again :)")
    }
}

playGame()