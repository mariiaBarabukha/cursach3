import {scheduleStatusRefresh} from "../common/updateDisplay.js"

export function analizeWorker(text, handleEnd) {
  var start = new Date().getTime();
  let worker = new Worker("./DataAnalizers/Worker.js");

  let lines = text.split("\n");
  let keys = lines[0].split(",");
  let time = new Date().getTime();
  worker.postMessage({ lines, keys, time });
  requestAnimationFrame(() => document.getElementById("total_ww").innerHTML = lines.length - 1);
  
  let progressBar = document.getElementById("progress_bar_ww");
  let handled = document.getElementById("handled_ww");
  
  

  worker.onmessage = (event) => {
    
    let data = event.data;    
    let progressWidth = `${Math.round(
      (data.index * 100) / (data.totalLength - 1)
    )}%`;
    
    if (data.isDone) {
      // var end = new Date().getTime();
      // console.log(`Execution took ${end - start} ms`);
      handleEnd(new Date().getTime() - start);
      // console.log(data.index, data.totalLength)
    }
    scheduleStatusRefresh(data.index, progressWidth, progressBar, handled);
  };

  // function updateDisplay(){
  //   handled.innerHTML = data.index;
  //   progressBar.style = `width:${Math.round(
  //     (data.index * 100) / (data.totalLength - 1)
  //   )}%`;
  // }

}
