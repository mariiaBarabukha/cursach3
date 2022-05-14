export function analizeWorker(text) {
  let worker = new Worker("./DataAnalizers/Worker.js");
  let progressBar = document.getElementById("progress_bar");
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
