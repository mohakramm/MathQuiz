const startBtn = document.getElementById("startBtn");
const submitBtn = document.getElementById("submitBtn");
const questionText = document.getElementById("questionText");
const answerInput = document.getElementById("answerInput");
const timerDisplay = document.getElementById("timer");
const scoreDisplay = document.getElementById("score");
const resultDisplay = document.getElementById("result");

let currentQuestion = 0;
let correctAnswers = 0;
let totalQuestions = 5;
let startTime;
let interval;

// Utility function to pick a random integer
function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Generate a random function
function generateFunction() {
    const types = ["poly", "sin", "cos", "exp", "ln"];
    const choice = types[randInt(0, types.length - 1)];
    switch(choice) {
        case "poly":
            const n = randInt(1,5);
            return {func: `x^${n}`, type: "poly", n: n};
        case "sin":
            return {func: "sin(x)", type: "sin"};
        case "cos":
            return {func: "cos(x)", type: "cos"};
        case "exp":
            return {func: "e^x", type: "exp"};
        case "ln":
            return {func: "ln(x)", type: "ln"};
    }
}

// Generate derivative or integral question
function generateQuestion() {
    const f = generateFunction();
    const operation = Math.random() < 0.5 ? "derivative" : "integral";
    let answer = "";
    if(operation === "derivative") {
        switch(f.type){
            case "poly": answer = `${f.n}*x^${f.n-1}`; break;
            case "sin": answer = "cos(x)"; break;
            case "cos": answer = "-sin(x)"; break;
            case "exp": answer = "e^x"; break;
            case "ln": answer = "1/x"; break;
        }
    } else {
        switch(f.type){
            case "poly": answer = `x^${f.n+1}/${f.n+1}`; break;
            case "sin": answer = "-cos(x)"; break;
            case "cos": answer = "sin(x)"; break;
            case "exp": answer = "e^x"; break;
            case "ln": answer = "x*ln(x)-x"; break;
        }
    }
    return {question: `${operation} of ${f.func}`, answer};
}

// Start game
function startGame() {
    currentQuestion = 0;
    correctAnswers = 0;
    startTime = new Date();
    interval = setInterval(updateTimer, 1000);
    scoreDisplay.textContent = `Score: 0/${totalQuestions}`;
    resultDisplay.textContent = "";
    nextQuestion();
}

// Update timer
function updateTimer() {
    const now = new Date();
    const seconds = Math.floor((now - startTime)/1000);
    timerDisplay.textContent = `Time: ${seconds}s`;
}

// Show next question
let currentQObj;
function nextQuestion() {
    if(currentQuestion >= totalQuestions){
        endGame();
        return;
    }
    currentQObj = generateQuestion();
    questionText.textContent = `Question ${currentQuestion+1}: ${currentQObj.question}`;
    answerInput.value = "";
    currentQuestion++;
}

// Submit answer
submitBtn.addEventListener("click", () => {
    const userAnswer = answerInput.value.trim();
    if(userAnswer === currentQObj.answer){
        correctAnswers++;
    }
    scoreDisplay.textContent = `Score: ${correctAnswers}/${totalQuestions}`;
    nextQuestion();
});

// End game
function endGame(){
    clearInterval(interval);
    const timeTaken = Math.floor((new Date() - startTime)/1000);
    resultDisplay.textContent = `Game Over! Final Score: ${correctAnswers}/${totalQuestions} in ${timeTaken}s`;
}

startBtn.addEventListener("click", startGame);
