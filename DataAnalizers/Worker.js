self.onmessage = (event) => {
  const text = event.data;
  // const result = fibonacci(num);
//   console.log(text);
  analize(text);
  self.postMessage("Done");
  self.close();
};

const analize = (text) => {
  let lines = text.split("\n");
  let keys = lines[0].split(",");
  for (let i = 1; i < lines.length; i++) {
    let obj = {};
    let props = lines[i].split(",");
    for (let j = 0; j < keys.length; j++) {
      obj[keys[j]] = props[j];
    }
    // console.log(i, lines.length)
    self.postMessage({index: i, totalLength: lines.length});
  }
};
