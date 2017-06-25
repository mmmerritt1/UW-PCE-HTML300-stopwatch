// button controls
const start = document.querySelector('button.start')
const stop = document.querySelector('button.stop')
const reset = document.querySelector('button.reset')
const lap = document.querySelector('button.lap')

// DOM elements that I need to update
const lapList = document.querySelector('#lapList')
const stopwatchTime = document.querySelector('#stopwatchTime')

// constants that shouldn't ever change
const laps = []
const intervalRate = 10 // update the stopwatch every 10 milliseconds

// values that will change pretty often
let intervalId = null
let rawTime = 0
let lapcount = 0

var runningstate = 0; // 1 means the timecounter is running 0 means counter stopped

// turns the time into a human readable format
function formatTime (raw) {
  let seconds = Math.floor(raw / 1000)
  let fractionalSeconds = (raw % 1000) / 1000
  let minutes = Math.floor(seconds / 60)
  seconds = seconds - (60 * minutes) + fractionalSeconds

  return `${zeroPad(minutes)}:${zeroPad(seconds.toFixed(2))}`
}

// start the stopwatch by creating a new interval
// we'll store the interval id so we can manipulate the interval later
function stopwatchStart (event) {
  event.preventDefault()
  console.log('started!')

  // every 10 milliseconds, update the stopwatch
  intervalId = setInterval(stopwatchUpdate, intervalRate)
}

// adds the interval to the stopwatch time since the last "tick"
// then update the DOM with the new stopwatch time
function stopwatchUpdate () {
  rawTime += intervalRate
  stopwatchTime.innerHTML = formatTime(rawTime)
}

// stops the stopwatch by clearing the interval
function stopwatchStop (event) {
  event.preventDefault()
  console.log('stopped!')

  clearInterval(intervalId)
}

// Resets stop watch back to zero
function stopwatchReset (raw) {
  event.preventDefault()
  console.log('reset!')

  rawTime = 0

  stopwatchTime.innerHTML = formatTime(rawTime)
  }

// Captures time of each lap and records in DOM
function stopwatchLap () {
  stopwatchTime.innerHTML = formatTime(rawTime)
  event.preventDefault()
  console.log(stopwatchTime.innerHTML)

  lapcount = lapcount + 1;
}

// adds a leading zero because humans like them
function zeroPad (value) {
  let pad = value < 10 ? '0' : ''
  return `${pad}${value}`
}

document.addEventListener("DOMContentLoaded", function () {
  console.log('ready!')

  start.addEventListener("click", stopwatchStart)
  stop.addEventListener("click", stopwatchStop)
  reset.addEventListener("click", stopwatchReset)
  lap.addEventListener("click", stopwatchLap)
})
