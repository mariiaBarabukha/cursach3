let statusRefreshScheduled = false;
let handledLines = 0;
let progressWidth = "0%";

let progressBar;
let handled;
//schedule redrawing
export function scheduleStatusRefresh(hl, pw, pb, h) {
  handledLines = hl;
  progressWidth = pw;
  progressBar = pb;
  handled = h;
  if (!statusRefreshScheduled) {
    _requestAnimationFrame(updateDisplay);
    statusRefreshScheduled = true;
  }
}

// redrawing
function updateDisplay() {
  progressBar.style.width = progressWidth;
  handled.innerHTML = handledLines;
  statusRefreshScheduled = false;
}

var _drawingCallback = null;

function _requestAnimationFrame(callback) {
  if (_drawingCallback) _cancelAnimationFrame(_drawingCallback);

  var handlerIdx = window.requestAnimationFrame(callback);
  _drawingCallback = handlerIdx;
}

function _cancelAnimationFrame(handlerIdx) {
  if (handlerIdx <= 0) return;
  window.cancelAnimationFrame(handlerIdx);
}
