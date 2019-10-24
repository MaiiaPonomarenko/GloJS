/**
 * Created by User on 24.10.2019.
 */
let yearOne = prompt("Введите начальный год");
let yearTwo = prompt("Введите последний год");
let start;
let end;

function leapYear(year)
{
  return ((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0);
}

if (yearOne > yearTwo){
  start = yearTwo;
  end = yearOne;
} else {
  start = yearOne;
  end = yearTwo
}

for (let i = start; i <= end; i++){
  if (leapYear(i)){
    console.log(i + ", ");
  }
}
