document.addEventListener("DOMContentLoaded", ()=> {
    const diceImages = [
        "images/dice1.png", 
        "images/dice2.png", 
        "images/dice3.png", 
        "images/dice4.png", 
        "images/dice5.png", 
        "images/dice6.png", 
    ];

    const popup = document.getElementById("popup");
    const closePopupButton = document.getElementById("close-popup");

    let playerTotalScore = 0;
    let computerTotalScore = 0;
    let rollCount = 0;

    function rollDice() {
        return Math.floor(Math.random() * 6) + 1;
    }

    function calculateScore(dice1, dice2) {
        if(dice1 === 1 || dice2 === 1) {
            return 0;
        } else if(dice1 === dice2) {
            return (dice1 + dice2) * 2;
        } else {
            return dice1 + dice2;
        }
    }

    function updateScores(playerRoundScore, computerRoundScore, playerTotalScore, computerTotalScore) {
        document.getElementById("player-round-score").innerText = playerRoundScore;
        document.getElementById("computer-round-score").innerText = computerRoundScore;
        document.getElementById("player-total-score").innerText = playerTotalScore;
        document.getElementById("computer-total-score").innerText = computerTotalScore;
    }

    function resetGame() {
        playerTotalScore = 0;
        computerTotalScore = 0;
        rollCount = 0;
        updateScores(0,0,0,0);
        document.getElementById("result").textContent = "";
    }

    const contentContainer = document.getElementsByClassName("collapsible");
    for (let i = 0; i < contentContainer.length; i++) {
        contentContainer[i].addEventListener("click", function() {  
        this.classList.toggle("active");
        const currentTitle = contentContainer[i].innerText.substring(2);

        const content = this.nextElementSibling;
       
        if (content.style.display === "block"){ 
            contentContainer[i].innerText = "► " + currentTitle;  
            content.style.display = "none";
        } else { 
            content.style.display = "block";
            contentContainer[i].innerText = "▼ " + currentTitle;  
        }
      });
    }

    document.getElementById("roll-dice").addEventListener("click", ()=> {
        if(rollCount < 3) {
            const playerDice = [rollDice(), rollDice()];
            const computerDice = [rollDice(), rollDice()];

            document.getElementById("player-dice-1").src = `images/dice${playerDice[0]}.png`;
            document.getElementById("player-dice-2").src = `images/dice${playerDice[1]}.png`;
            document.getElementById("computer-dice-1").src = `images/dice${computerDice[0]}.png`;
            document.getElementById("computer-dice-2").src = `images/dice${computerDice[1]}.png`;

            const playerRoundScore = calculateScore(playerDice[0], playerDice[1]);
            const computerRoundScore = calculateScore(computerDice[0], computerDice[1]);

            playerTotalScore += playerRoundScore;
            computerTotalScore += computerRoundScore;

            updateScores(playerRoundScore, computerRoundScore, playerTotalScore, computerTotalScore);

            rollCount++;
            if(rollCount === 3) {
                let result = "It's a tie!";
                if(playerTotalScore > computerTotalScore) {
                    result = "Congratulations! You win!";
                } else if(computerTotalScore > playerTotalScore) {
                    result = "Game over! You lost!";
                }
                document.getElementById("result").textContent = result;
                popup.classList.add("show");
            
                closePopupButton.addEventListener("click", () => {
                    popup.classList.remove("show");
                });
            }

        } 
    });
    document.getElementById("reset-game").addEventListener("click", resetGame);    
      
});