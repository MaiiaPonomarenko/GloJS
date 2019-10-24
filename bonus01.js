let check = function () {
  let str = +prompt("Введите число");
  
  while (isNaN(str) || str === ''){
    str = prompt("Вы ввели неверное значение. Попробуйте еще раз");
  } return str;
};

let a = check();
let b = check();

a > b ? alert(a + " > " + b) : a < b ? alert(b + " > " + a) : alert(a + " = " + b);