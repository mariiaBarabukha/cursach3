import { ProgressBar } from "../ProgressBar.js";

export function analizeWorker(text) {
  let worker = new Worker("./DataAnalizers/Worker.js");
  var progressBar = ProgressBar.getProgressBar().createProgressBar();
  var pr = document.getElementById("progressNumber");
  if (pr == undefined) {
    pr = document.createElement("div");
    pr.id = "progressNumber";
    document.body.appendChild(pr);
    pr.innerHTML = "0";
  }
  worker.postMessage(text);

  worker.onmessage = (event) => {
    let data = event.data;
    if (data.index != undefined && data.totalLength != undefined) {
      pr.innerHTML = `${data.index}/${data.totalLength - 1}`;
      progressBar.style = `width:${Math.round(
        (data.index * 100) / (data.totalLength - 1)
      )}%`;
    }
  };
}
