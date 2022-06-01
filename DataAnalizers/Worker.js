self.onmessage = (event) => {
  // console.log(new Date().getTime() - event.data.time);
  const data = event.data;
  analize(data.lines, data.keys);
  self.close();
};

const analize = (lines, keys) => {
  var start = new Date().getTime();
  
  
  for (let i = 1; i < lines.length; i++) {
    
    let obj = {};
    let props = lines[i].split(",");
    for (let j = 0; j < keys.length; j++) {
      obj[keys[j]] = props[j];
    }
    // self.postMessage({index: i, totalLength: lines.length, isDone: i == lines.length-1});
    let now = new Date().getTime();	
    // console.log(diff);
    if(now - start > 17 || i == lines.length - 1) {
      self.postMessage({index: i, totalLength: lines.length, isDone: i == lines.length-1});
      start = new Date().getTime();
      
    }
    // self.postMessage({index: i, totalLength: lines.length, isDone: i == lines.length-1});

    
  }
};
