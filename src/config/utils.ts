const clone = function (obj) {
  if(typeof obj != 'object'){
    return obj;
}
var newobj = {};
for ( var attr in obj) {
    newobj[attr] = clone(obj[attr]);
}
return newobj;
}
export { clone }