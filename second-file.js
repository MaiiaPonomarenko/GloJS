let num = '266219';
let i = 0;
let multi = 1;

while (i < num.length){
    multi *= num[i];
    i++;
}
console.log(multi);

let degree = String(multi ** 3);
console.log (degree.slice(0, 2));
