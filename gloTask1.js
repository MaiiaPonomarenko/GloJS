// шестое задание
'use strict';

let money,
  start = function () {
    do {
      money = prompt("Ваш месячный доход?", 65000);
    } while(isNaN(money) || money === '' || money === null)
  };

start();

let appData = {
  budget: 0,
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
/*    let addExpenses = prompt("Перечислите возможные расходы за рассчитываемый период через запятую");
        appData.addExpenses = addExpenses.toLowerCase().split(',');
        appData.deposit =confirm("Есть ли у вас депозит в банке?");*/

    for (let i = 0; i < 2; i++){
      
      let exp = function () {
          let expValue;
          let exp1 = prompt("Какие обязательные ежемесячные расходы у вас есть?", "Ипотека");
          do {
            expValue = prompt("Во сколько это обойдется?", 15500);
          } while (isNaN(expValue) || expValue === '' || expValue === null);
          return [exp1, expValue];
          
        };
      
      let expFunc1 = exp();
      appData.expenses[expFunc1[0]] = expFunc1[1];
    }
  },
  
  // все расходы за месяц
  getExpensesMonth: function () {
    for(let key in appData.expenses){
      appData.expensesMonth += +(appData.expenses[key]);
    }
  },
  
  // накопления за месяц
  getBudget: function () {
    appData.budgetMonth = appData.budget - appData.expensesMonth;
    appData.budgetDay = Math.floor(appData.budgetMonth / 30);
  },
  
  // достижение цели
  getTargetMonth: function () {
    return Math.ceil(appData.mission / appData.budgetMonth);
  },
  
  // статус дохода
  getStatusIncome: function (budgetDay) {
    switch (true){
      case (budgetDay === 800):
        return (console.log("Вау!"));
      case (budgetDay > 800):
        return (console.log("Высокий уровень дохода"));
        break;
      case (budgetDay === 300):
        return (console.log("Стремись к большему"));
      case (budgetDay > 300 && budgetDay < 800):
        return (console.log("Средний уровень дохода"));
        break;
      case (budgetDay > 0 && budgetDay < 300):
        return (console.log("Низкий уровень дохода"));
        break;
      case (budgetDay === 0):
        return (console.log("Кушать что будешь?"));
        break;
    }
  }
};
appData.budget = money;
appData.asking();
appData.getExpensesMonth();
appData.getBudget();

console.log(appData.expenses);
console.log("Расходы за месяц: " + appData.expensesMonth);

if (appData.getTargetMonth() > 0){
  console.log("За " + appData.getTargetMonth() + " месяцев будет достигнута цель: " + appData.mission);
} else {
  console.log('Цель не будет достигнута');
}

if (appData.budgetDay > 0){
  appData.getStatusIncome(appData.budgetDay);
} else {
  document.write('Что-то пошло не так...');
}



/*********  showTypeOf - вывод типа переменных **********/
let showTypeOf = function (data) {
  console.log(data, typeof (data));
};






