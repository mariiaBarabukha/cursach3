import { analizePseudoMT } from "../DataAnalizers/PseudoMultiThreadingAnalizer.js";
import { analizeWorker } from "../DataAnalizers/WebWorkerAnalizer.js";
var time_pmt = 0;
var time_ww = 0;
let size = "0 KB";
var status = document.getElementById("status");
document.getElementById("loadFileForm").onsubmit = (e) => {
    e.preventDefault();
    requestAnimationFrame(reset);
    const input = csvFile.files[0];
    size = (input.size / 1024).toFixed(2) + " KB";
    requestAnimationFrame(() => {
        document.getElementById("size").innerHTML = size;
        status.innerHTML = "Analizing..."
        status.classList = "d-block";
    });
    const reader = new FileReader();
    
    reader.onload = (e) =>{
        const text = e.target.result;
        requestAnimationFrame(() => document.getElementById("loadingBlock").classList = "d-flex");
        time_pmt = 0;
        time_ww = 0;
        analizeWorker(text, handleEndOfWW);
        // analizePseudoMT(text,handleEndOfPMT); 

        // function handleEndOfPMT(time){
        //     time_pmt = time;
        //     analizeWorker(text, handleEndOfWW);
        // }

        function handleEndOfWW(time){
            time_ww = time;
            // requestAnimationFrame(addResultRow);
        }
        
    }
    reader.readAsText(input);

}

function addResultRow(){
    document.getElementById("results").innerHTML += `<tr><td>${size}</td><td>${time_pmt}</td><td>${time_ww}</td></tr>`;
}



// function setTimePMT(time){
//    time_pmt = time;
// }

// function setTimeWW(time){
//     time_ww = time;
//  }

function reset(){
    document.getElementById("progress_bar_pmt").style.width = '0%';
    document.getElementById("progress_bar_ww").style.width = '0%';
    document.getElementById("handled_pmt").innerHTML = '';
    document.getElementById("total_pmt").innerHTML = '';
    document.getElementById("handled_ww").innerHTML = '';
    document.getElementById("total_ww").innerHTML = '';
}