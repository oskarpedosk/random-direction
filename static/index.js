let eightArrows = ['up', 'right', 'down', 'left', 'up-right', 'up-left', 'down-right', 'down-left']
let directions = 4
let userSeconds = 1
let seconds = 1
let tens = 0
let prevRandom = 0
let interval

const arrow = document.getElementById("arrow")
const arrowSelect = document.getElementById("arrowCount")
const intervalSelect = document.getElementById('interval')
const buttonStart = document.getElementById("start")
const buttonStop = document.getElementById('stop')
const appendSeconds = document.getElementById("seconds")
const appendTens = document.getElementById("tens")
const progress = document.getElementById("progressBar")

arrowSelect.addEventListener('change', (event) => {
    directions = arrowSelect.value
})

intervalSelect.addEventListener('change', (event) => {
    userSeconds = intervalSelect.value
    seconds = userSeconds
    if (userSeconds < 10) {
        appendSeconds.innerHTML = "0" + userSeconds
        appendTens.innerHTML = "00"
    } else {
        appendSeconds.innerHTML = userSeconds
        appendTens.innerHTML = "00"
    }
    tens = 0
})

buttonStart.onclick = function() {
    clearInterval(interval)
    interval = setInterval(startTimer, 10)
}

buttonStop.onclick = function() {
    clearInterval(interval)
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function displayArrow() {
    let random = getRandomInt(directions)
    while (random === prevRandom) {
        random = getRandomInt(directions)
    }
    prevRandom = random
    arrow.src = './static/arrows/' + eightArrows[random] + '.png'

    if (random >= 4) {
        progress.classList.add('bg-danger')
    } else {
        progress.classList.remove('bg-danger')
    }
}

function updateProgressBar() {
    progress.style.width = ((tens + (seconds * 100)) / (userSeconds)) + '%'
}   

function startTimer () {
    tens--
    updateProgressBar()
    if(tens <= 9) {
        appendTens.innerHTML = "0" + tens
    }
    
    if (tens > 9) {
        appendTens.innerHTML = tens
    } 
    
    if (tens < 0) {
    seconds--
    if (seconds < 0) {
        seconds = userSeconds - 1
        displayArrow()
    } 
    appendSeconds.innerHTML = "0" + seconds
    tens = 100
    appendTens.innerHTML = "0" + 0
    }
    
    if (seconds > 9){
        appendSeconds.innerHTML = seconds
    }
}