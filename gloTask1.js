'use strict';

let income = '6780',
    mission = 6700000,
    money = +prompt("Ваш месячный доход?"),
    //addExpenses = prompt("Перечислите возможные расходы за рассчитываемый период через запятую"),
    deposit =confirm("Есть ли у вас депозит в банке?");


/*********  showTypeOf - вывод типа переменных **********/
let showTypeOf = function (data) {
  console.log(data, typeof (data));
};

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);
/*********  // *********/


let spending1 = prompt("Какие обязательные ежемесячные расходы у вас есть?"),
    price1 = +prompt("Во сколько это обойдется?"),
    spending2 = prompt("Какие обязательные ежемесячные расходы у вас есть?"),
    price2 = +prompt("Во сколько это обойдется?");


/*********  getExpensesMonth - все расходы за месяц **********/
let getExpensesMonth = function (price1, price2) {
  return price1 + price2;
};
console.log("Расходы за месяц: " + getExpensesMonth(price1, price2));
/*********  // *********/


/*********  getAccumulatedMonth - накопления за месяц  **********/
let getAccumulatedMonth = function (money, getExpensesMonth) {
  return money - getExpensesMonth;
};

let accumulatedMonth = getAccumulatedMonth(money, getExpensesMonth(price1, price2));
console.log('Накопления за месяц ' + accumulatedMonth);
/*********  // *********/


/*********  getTargetMonth - расчет периода достижения цели  **********/
let  getTargetMonth = function (mission, accumulatedMonth) {
  return Math.ceil(mission / accumulatedMonth);
};
console.log("За " + getTargetMonth(mission, accumulatedMonth) + " месяцев будет достигнута цель: " + mission);
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
    default:
      return (document.write("Что-то пошло не так..."));
  }
};
getStatusIncome(budgetDay);
/*********  // *********/