function playGame() {
  const playerChoice = document.getElementById("RPS").value;
  const choices = ["rock", "paper", "scissors", "spock"];
  const computerChoice = choices[Math.floor(Math.random() * choices.length)];

  document.getElementById("userChoice").innerText =
    "You Chose: " + playerChoice;
  document.getElementById("computerChoice").innerText =
    "Computer Chose: " + computerChoice;

  if (computerChoice === "spock") {
    alert("You Lose");
    document.body.style.backgroundColor = "red";
  } else if (playerChoice === computerChoice) {
    alert("Tie");
    document.body.style.backgroundColor = "blue";
  } else if (
    (playerChoice === "rock" && computerChoice === "scissors") ||
    (playerChoice === "scissors" && computerChoice === "paper") ||
    (playerChoice === "paper" && computerChoice === "rock")
  ) {
    alert("You Win");
    document.body.style.backgroundColor = "green";
  } else {
    alert("You Lose");
    document.body.style.backgroundColor = "red";
  }
}
