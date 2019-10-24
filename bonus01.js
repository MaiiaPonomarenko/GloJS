let check = function () {
  let str = +prompt("Введите число");
  let reg = new RegExp("[\p{Alpha}\p{M}\p{Pc}\p{Join_C}]");
  
  while (reg.test(str) || str === ''){
    str = prompt("Вы ввели неверное значение. Попробуйте еще раз");
  } return str;
};

let a = check();
let b = check();

a > b ? alert(a + " > " + b) : a < b ? alert(b + " > " + a) : alert(a + " = " + b);