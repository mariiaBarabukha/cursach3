import {scheduleStatusRefresh} from "../common/updateDisplay.js"

window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

var linesAmount = 0;
var handler = null;
let progressBar = document.getElementById("progress_bar_pmt");
var keys = [];

var lines = [];
var allLinesLen = 0;
var handled = document.getElementById("handled_pmt");
var progressWidth = '0%';

var handledLines = -1;
var start;

//main method
export function analizePseudoMT(text, handleEnd) {
  start = new Date().getTime();
  handler = null;
  start = new Date().getTime();

  handledLines = 0;
  lines = text.split("\n");
  keys = lines[0].split(",");
  linesAmount = lines.length - 1;
  allLinesLen = linesAmount;
  let totalLines = document.getElementById("total_pmt");
  requestAnimationFrame(() => totalLines.innerHTML = allLinesLen);

  const _analize = (deadline) => {
    while (
      (deadline.timeRemaining() > 0 || deadline.didTimeout) &&
      handledLines < lines.length
    ) {
      if(handledLines == lines.length-1){
        break;
      }
      let line = lines[handledLines+1];
  
      let obj = {};
      let props = line.split(",");
      for (let j = 0; j < keys.length; j++) {
        obj[keys[j]] = props[j];
      }
      
      handledLines++;
      
    }
  
    progressWidth = `${Math.round(
      (handledLines * 100) / (allLinesLen - 1)
    )}%`;
  
    // console.log(progressWidth,handledLines)
    scheduleStatusRefresh(handledLines, progressWidth,progressBar,handled);
    if (handledLines != lines.length-1) {  
      // var end = new Date().getTime();
      // console.log(`Execution took ${end - start} ms`);
      handler = requestIdleCallback(_analize);
    }else{
      // scheduleStatusRefresh(handledLines, progressWidth, progressBar,handled);
      // var end = new Date().getTime();
      // console.log(`Execution took ${end - start} ms`);
      handleEnd(new Date().getTime() - start);
      // window.postMessage({script: 'pmt', time: end - start});
    }

    
  }

  if (!handler) {
    handler = window.requestIdleCallback(_analize);
  }
  scheduleStatusRefresh(handledLines, progressWidth,progressBar,handled); 
 
}



// processor method

