let statusRefreshScheduled = false;
let handledLines = 0;
let progressWidth = "0%";

let progressBar;
let handled;

var _drawingCallback = null;
//schedule redrawing
export function scheduleStatusRefresh(hl, pw, pb, h) {
  console.log(pw, 'scheduleStatusRefresh');
  handledLines = hl;
  progressWidth = pw;
  progressBar = pb;
  handled = h;
  if (!statusRefreshScheduled) {
    _requestAnimationFrame(updateDisplay);
    statusRefreshScheduled = true;
  } else {
    _drawingCallback = null;
  }

  //   _requestAnimationFrame(updateDisplay);
}

// redrawing
function updateDisplay() {
  console.log(progressWidth, 'updateDisplay');
  handled.innerHTML = handledLines;
  progressBar.style.width = progressWidth; 
   
  statusRefreshScheduled = false;
}

function _requestAnimationFrame(callback) {
  if (_drawingCallback) {
    _cancelAnimationFrame(_drawingCallback);
  }

  var handlerIdx = window.requestAnimationFrame(callback);
  _drawingCallback = handlerIdx;
}

function _cancelAnimationFrame(handlerIdx) {
  if (handlerIdx <= 0) return;
  window.cancelAnimationFrame(handlerIdx);
}
