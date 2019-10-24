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

for (let number = 2; number <= 100; number++){
  for (let j = 2; j < number; j++){
    if (number % j === 0 || number % (j+1) === 0){
     break;
    } else
    
      console.log(number);
    
  }
}