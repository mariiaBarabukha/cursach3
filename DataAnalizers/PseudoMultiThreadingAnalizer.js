import { ProgressBar } from "../ProgressBar.js";
var linesAmount = 0;
var handler = null;
var progressBar = ProgressBar.getProgressBar().createProgressBar();

var pr;
var keys = [];
let statusRefreshScheduled = false;
var lines = [];
var allLinesLen = 0;

var handledLines = -1;

export function analizePseudoMT(text) {
  pr = document.getElementById("progressNumber");
  if (pr == undefined) {
    pr = document.createElement("div");
    pr.id = "progressNumber";
    document.body.appendChild(pr);
    pr.innerHTML = "0";
  }

  lines = text.split("\n");
  keys = lines[0].split(",");
  linesAmount = lines.length - 1;
  allLinesLen = linesAmount;

  if (!handler) {
    handler = window.requestIdleCallback(_analize, { timeout: 1000 });
  }

  scheduleStatusRefresh();
}

function scheduleStatusRefresh() {
  if (!statusRefreshScheduled) {
    requestAnimationFrame(updateDisplay);
    statusRefreshScheduled = true;
  }
}

function updateDisplay() {
  pr.innerHTML = `${handledLines}/${allLinesLen}`;
  progressBar.style.width = `${Math.round(
    (handledLines * 100) / (allLinesLen - 1)
  )}%`;
  statusRefreshScheduled = false;
}

function _analize(deadline) {
  var a = deadline.timeRemaining();
  while (
    (deadline.timeRemaining() > 0 || deadline.didTimeout) &&
    lines.length
  ) {
    let line = lines.shift();
    

    let obj = {};
    let props = line.split(",");
    for (let j = 0; j < keys.length; j++) {
      obj[keys[j]] = props[j];
    }
    scheduleStatusRefresh();
    handledLines++;
  }

  if (lines.length) {
    handler = requestIdleCallback(_analize, { timeout: 1000 });
  }
}
