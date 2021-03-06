import { analizeDefault } from "./DataAnalizers/DefaultAnalizer.js";
import { analizePseudoMT } from "./DataAnalizers/PseudoMultiThreadingAnalizer.js";
import { analizeWorker } from "./DataAnalizers/WebWorkerAnalizer.js";
import { ProgressBar } from "./ProgressBar.js";
const myForm = document.getElementById("myForm");
const csvFile = document.getElementById("csvFile");

myForm.addEventListener("submit", function (e) {
  e.preventDefault();

  // let progress_bar = ProgressBar.getProgressBar().createProgressBar();

  const input = csvFile.files[0];
  const reader = new FileReader();
  let select = e.target.wayOfProcessing;
  const wayOfProcessing = select[select.selectedIndex].value;

  reader.onload = function (e) {
    const text = e.target.result;
    // console.log(text);
    let res;
    document.getElementById("progress").style.visibility = "visible";

    switch (wayOfProcessing) {
      case "pseudoMultiThreading":
        res = analizePseudoMT(text);
        break;
      case "webWorkers":
        res = analizeWorker(text);
        break;
      default:
        res = analizeDefault(text);
        break;
    }
  };

  reader.readAsText(input);
});
