// пятое задание
'use strict';

let money,
  start = function () {
    do {
      money = prompt("Ваш месячный доход?", 65000);
    } while(isNaN(money) || money === '' || money === null)
  };

start();

let appData = {
  income: {},
  addIncome: [], //доп доходы
  expenses: {}, //доп расходы
  addExpenses: [], //возможные расходы
  deposit: false,
  mission: 4500000,
  period: 8,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  
  asking: function () {
    let addExpenses = prompt("Перечислите возможные расходы за рассчитываемый период через запятую");
        appData.addExpenses = addExpenses.toLowerCase().split(',');
        appData.deposit =confirm("Есть ли у вас депозит в банке?");
  },
  
  // все расходы за месяц
  getExpensesMonth: function () {
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
  },
  
  // накопления за месяц
  getAccumulatedMonth: function () {
    return appData.budget - expensesMonth;
  },
  
  // достижение цели
  getTargetMonth: function () {
    return Math.ceil(appData.mission / accumulatedMonth);
  },
  
  // статус дохода
  getStatusIncome: function (budgetDay) {
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
  }
};

appData.budget = money;


/*********  showTypeOf - вывод типа переменных **********/
let showTypeOf = function (data) {
  console.log(data, typeof (data));
};

showTypeOf(money);
showTypeOf(appData.income);
showTypeOf(appData.deposit);
/*********  // *********/

let spending1,
  spending2;

let expensesMonth = appData.getExpensesMonth();
console.log("Расходы за месяц: " + expensesMonth);

let accumulatedMonth = appData.getAccumulatedMonth();
console.log('Накопления за месяц ' + accumulatedMonth);
console.log ("Накопления за период " + appData.period + " мес " +appData.period * accumulatedMonth);

if (appData.getTargetMonth() > 0){
  console.log("За " + appData.getTargetMonth() + " месяцев будет достигнута цель: " + appData.mission);
} else {
  console.log('Цель не будет достигнута');
}

appData.budgetDay = Math.floor(accumulatedMonth / 30);

if (appData.budgetDay > 0){
  appData.getStatusIncome(appData.budgetDay);
} else {
  document.write('Что-то пошло не так...');
}
