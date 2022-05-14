// import { ProgressBar } from "../ProgressBar.js";

export function analizeDefault(text) {
  let progressBar = document.getElementById("progress_bar");
  // let progressBar = ProgressBar.getProgressBar().createProgressBar();
  var pr = document.getElementById("progressNumber");
  if (pr == undefined) {
    pr = document.createElement("div");
    pr.id = "progressNumber";
    document.body.appendChild(pr);
    pr.innerHTML = "0";
  }
  document.body.appendChild(pr);
  pr.innerHTML = "0";
  let lines = text.split("\n");
  let keys = lines[0].split(",");
  // let res = [];
  for (let i = 1; i < lines.length; i++) {
    let obj = {};
    let props = lines[i].split(",");
    for (let j = 0; j < keys.length; j++) {
      obj[keys[j]] = props[j];
    }
    pr.innerHTML = `${i}/${lines.length - 1}`;
    progressBar.style = `width:${Math.round((i * 100) / (lines.length - 1))}%`;
  }
  // console.log("done");

  return "Done";
}
