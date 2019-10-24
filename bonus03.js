/**
 * Created by User on 24.10.2019.
 */

let number,
    sum = 0;

let start = function () {
  do {
    number = prompt ("Введите число");
    if (!isNaN(number)){
      sum += +number;
    }
  } while (number !== null);
  console.log(sum);
};

start();