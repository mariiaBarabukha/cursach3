export class ProgressBar {
    _progress_bar;
    static getProgressBar() {
        if(this._progress_bar == undefined){
            this._progress_bar = new ProgressBar();
        }
        return this._progress_bar;
    }

  
    createProgressBar() {
        if (document.getElementById("progress_bar") != undefined) {
            return this._progress_bar;
        }
        let progress_bar_wrapper = document.createElement("div");
        let progress_bar = document.createElement("div");
        progress_bar_wrapper.className = "progress";
        progress_bar_wrapper.style = "width:50%";
        progress_bar_wrapper.appendChild(progress_bar);
        progress_bar.classList =
        "progress-bar progress-bar-striped progress-bar-animated bg-success";
        progress_bar.id = "progress_bar";
        progress_bar.role = "progressbar";
        progress_bar.style = "width:0%";
        document.body.appendChild(progress_bar_wrapper);
        this._progress_bar = progress_bar;
        return progress_bar;
    }
}
