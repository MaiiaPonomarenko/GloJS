// пятое задание
'use strict';

let money,
  income = '6780',
  mission = 6700000,
  period = 8,
  //addExpenses = prompt("Перечислите возможные расходы за рассчитываемый период через запятую"),
  deposit =confirm("Есть ли у вас депозит в банке?");

let start = function () {
  do {
    money = prompt("Ваш месячный доход?", 65000);
  } while(isNaN(money) || money === '' || money === null)
};

start();

/*********  showTypeOf - вывод типа переменных **********/
let showTypeOf = function (data) {
  console.log(data, typeof (data));
};

showTypeOf(income);
showTypeOf(deposit);
/*********  // *********/

let spending1,
  spending2;

/*********  getExpensesMonth - все расходы за месяц **********/
let getExpensesMonth = function () {
  let sum = 0;
  let answer;
  for (let i = 0; i < 2; i++){
    if (i === 0){
      spending1 = prompt("Какие обязательные ежемесячные расходы у вас есть?", "Ипотека");}
    if (i === 1){
      spending2 = prompt("Какие обязательные ежемесячные расходы у вас есть?", "Частный садик");}
    
    do {
      answer = prompt("Во сколько это обойдется?", 15500);
    } while (isNaN(answer) || answer === '' || answer === null);
    sum += +answer;
  }
  return sum;
};

let expensesMonth = getExpensesMonth();
console.log("Расходы за месяц: " + expensesMonth);
/*********  // *********/


/*********  getAccumulatedMonth - накопления за месяц  **********/
let getAccumulatedMonth = function () {
  return money - expensesMonth;
};

let accumulatedMonth = getAccumulatedMonth();
console.log('Накопления за месяц ' + accumulatedMonth);
console.log ("Накопления за период " + period + " мес " + period * accumulatedMonth);
/*********  // *********/


/*********  getTargetMonth - расчет периода достижения цели  **********/
let  getTargetMonth = function () {
  return Math.ceil(mission / accumulatedMonth);
};
if (getTargetMonth() > 0){
  console.log("За " + getTargetMonth() + " месяцев будет достигнута цель: " + mission);
} else {
  console.log('Цель не будет достигнута');
}

/*********  // *********/

/*********  getStatusIncome - вывод статуса дохода  **********/
let budgetDay = Math.floor(accumulatedMonth / 30);

let getStatusIncome = function (budgetDay) {
  switch (true){
    case (budgetDay === 800):
      return (document.write("Вау!<br>"));
    case (budgetDay > 800):
      return (document.write("Высокий уровень дохода"));
      break;
    case (budgetDay === 300):
      return (document.write("Стремись к большему<br>"));
    case (budgetDay > 300 && budgetDay < 800):
      return (document.write("Средний уровень дохода"));
      break;
    case (budgetDay > 0 && budgetDay < 300):
      return (document.write("Низкий уровень дохода"));
      break;
    case (budgetDay === 0):
      return (document.write("Кушать что будешь?"));
      break;
  }
};

if (budgetDay > 0){
  getStatusIncome(budgetDay);
} else {
  document.write('Что-то пошло не так...');
}

/*********  // *********/