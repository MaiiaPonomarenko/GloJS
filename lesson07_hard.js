/**
 * Created by User on 29.10.2019.
 */
let d = new Date ();
let   dString;

dString = ('0' + d.getHours()).slice(-2) + ":" +  ('0' + d.getMinutes()).slice(-2) + ":" + ('0' + d.getSeconds()).slice(-2) + " " + ('0' + d.getDate()).slice(-2) + '.' + ('0' + (d.getMonth()+1)).slice(-2) + '.' + d.getFullYear();

document.write(dString);
