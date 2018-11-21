const clone = function (sourceObj) {
  let obj: any;
  // console.log()
  for (let attr in sourceObj) {
    // if(sourceObj instanceof Array){

    // }
    if (typeof (sourceObj) == "object") {
      obj[attr] = clone(sourceObj[attr])
    } else {
      obj[attr] = sourceObj[attr]
    }
  }
  return obj;
}
export { clone }