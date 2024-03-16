const mainMenu = document.querySelector(".main-menu");
const clickableArea = document.querySelector(".clickable-area");
const message = document.querySelector(".clickable-area .message");
const endScreen = document.querySelector(".end-screen");
const reactionTimeText = document.querySelector(".end-screen .reaction-time-text");
const playAgainBtn = document.querySelector(".end-screen .play-again-btn");

let timer;
let greenDisplayed;
let timeNow;
let waitingForStart;
let waitingForGreen;
let scores;

const init = () => {
    greenDisplayed = false;
    waitingForStart = false;
    waitingForGreen = false;
    scores = [];
};

init();

const setGreenColor = () => {
    clickableArea.style.backgroundImage = "url('./img/click.png')";
    clickableArea.style.backgroundColor = "#fff"
    message.innerHTML = "Click now!";
    greenDisplayed = true;
    timeNow = Date.now();
}

const setMidImage = () => {
    clickableArea.style.backgroundImage = "url('./img/mid.png')";
    clickableArea.style.backgroundColor = "#fff"
    message.innerHTML = "Wait for green";
}

const startGame = () => {
    clickableArea.style.backgroundImage = "url('./img/start.png')";
    clickableArea.style.backgroundColor = "#fff"
    message.innerHTML = "Wait for green";

    let randomMidTime = Math.floor(Math.random() * (8-5) + 5) * 1000;
    let randomGreenTime =  Math.floor(Math.random() * (16-14) + 14) * 1000;
    console.log("random mid time: ", randomMidTime);
    console.log("random green time: ", randomGreenTime);
    timer = setTimeout(setMidImage, randomMidTime);
    timer = setTimeout(setGreenColor, randomGreenTime);
    console.log("timer: ", timer);
    waitingForStart = false;
    waitingForGreen = true;
}

mainMenu.addEventListener("click", () => {
    mainMenu.classList.remove("active");
    startGame();
});

const endGame = () => {
    endScreen.classList.add("active");
    clearTimeout(timer);

    let total = 0;

    scores.forEach((s) => {
        total += s;
    })

    let averageScore = Math.round(total/scores.length);

    reactionTimeText.innerHTML = `${averageScore} ms`;
}

const displayReactionTime = (rt) => {
    message.innerHTML = `<div class='reaction-time-text'>${rt} ms</div>Click to continue.`;
    greenDisplayed = false;
    waitingForStart = true;
    scores.push(rt);

    if(scores.length >= 3){
        endGame();
    }
};

const displayTooSoon = () => {
    message.innerHTML = "Too Soon. Click to continue";
    message.style.color = "#111";
    waitingForStart = true;
    clearTimeout(timer);
}

clickableArea.addEventListener("click", () => {
    if(greenDisplayed){
        let clickTime = Date.now();
        let reactionTime = clickTime - timeNow;
        displayReactionTime(reactionTime);
        return;
    }

    if(waitingForStart){
        startGame();
        return;
    }

    if(waitingForGreen){
        displayTooSoon();
    }
});

playAgainBtn.addEventListener("click", () =>{
    endScreen.classList.remove("active");
    init();
    startGame();
});