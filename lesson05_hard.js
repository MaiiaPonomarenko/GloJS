/**
 * Created by User on 24.10.2019.
 */


let arr = ['3423424', '2445646', '6432343', '543', '4900', '53', '45678'];
for (let i = 0; i < arr.length; i++ ){
  let str = arr[i];
  if (str[0]=== '2' || str[0]=== '4'){
    console.log(arr[i]);
  }
}

let number = 2;
while(number <= 100) {
  if(isNat(number)) {
    console.log(number + " делители этого числа 1 и " + number);
  }
  number++;
}

function isNat(number) {
  for (let i = 2; i < number; i++) {
    if (number % i === 0) {
      return false;
    }
  }
  return true;
}