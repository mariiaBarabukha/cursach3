import {scheduleStatusRefresh} from "../common/updateDisplay.js"

export function analizeWorker(text, handleEnd) {
  var start = new Date().getTime();
  let worker = new Worker("./DataAnalizers/Worker.js");

  let lines = text.split("\n");
  let keys = lines[0].split(",");
  let progressBar = document.getElementById("progress_bar_ww");
  let handled = document.getElementById("handled_ww");
  requestAnimationFrame(() => document.getElementById("total_ww").innerHTML = lines.length - 1);
  worker.postMessage({ lines, keys });

  worker.onmessage = (event) => {
    
    let data = event.data;
    // if (data.index != undefined && data.totalLength != undefined) {      
      
    // }
    // let now = new Date().getTime();
    // if (now - lastMessage > 17 || data.isDone) {
    //   handled.innerHTML = data.index;
    //   progressBar.style = `width:${Math.round(
    //     (data.index * 100) / (data.totalLength - 1)
    //   )}%`;
    //   lastMessage = now;
    // }
    let progressWidth = `${Math.round(
      (data.index * 100) / (data.totalLength - 1)
    )}%`;
    scheduleStatusRefresh(data.index, progressWidth, progressBar, handled);
    if (data.isDone) {
      var end = new Date().getTime();
      console.log(`Execution took ${end - start} ms`);
      handleEnd(end - start);
      // window.postMessage({ script: "ww", time: end - start });
    }
  };

  // function updateDisplay(){
  //   handled.innerHTML = data.index;
  //   progressBar.style = `width:${Math.round(
  //     (data.index * 100) / (data.totalLength - 1)
  //   )}%`;
  // }
}
