
'use strict';

let money,
  start = function () {
    do {
      money = prompt("Ваш месячный доход?", 65000);
    } while(isNaN(money) || money === '' || money === null)
  };

start();

/*************  validation  *************************/
let validationNumber = function (item = 'Проверка числа') {
  let validation;
  do {
    validation = +prompt(item);
  } while (isNaN(validation) || validation === '' || validation === null);
  return validation;
};

let validationString = function (item = 'Проверка строки') {
  let validation;
  do {
    validation = prompt(item);
  } while (!isNaN(validation) || validation === '' || validation === null);
  return validation;
};
/*************  //validation  *************************/

let appData = {
  budget: 0,
  income: {},
  addIncome: [], //доп доходы
  expenses: {}, //доп расходы
  addExpenses: [], //возможные расходы
  deposit: false,
  percentDeposit: 0,
  moneyDeposit: 0,
  mission: 4500000,
  period: 8,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  
  asking: function () {
    
    if(confirm('Есть ли у вас дополнительный источник заработка?')){
      let itemIncome = validationString('Какой у вас есть дополнительный заработок?'),
          cashIncome = validationNumber('Сколько в месяц вы на этом зарабатываете?');
      appData.income[itemIncome] = cashIncome;
    }
    
    for (let i = 0; i < 2; i++){
      let exp = function () {
        let exp1 = validationString ('Какие обязательные ежемесячные расходы у вас есть?'),
        expValue = validationNumber('Во сколько это обойдется?');
        return [exp1, expValue];
      };
      
      let expFunc1 = exp();
      appData.expenses[expFunc1[0]] = expFunc1[1];
    }
  
    let addExpenses = prompt("Перечислите возможные расходы за рассчитываемый период через запятую");
    appData.addExpenses = addExpenses.toLowerCase().split(',');
    appData.deposit =confirm("Есть ли у вас депозит в банке?");
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
  
  getInfoDeposit: function () {
    if (appData.deposit){
        appData.percentDeposit = validationNumber('Какой годовой процент?');
        appData.moneyDeposit = validationNumber('Какая сумма заложена?');
    }
  },
  
  calcSavedMoney: function () {
    return appData.budgetMonth * appData.period;
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

for (let i = 0; i < appData.addExpenses.length; i++){
  appData.addExpenses[i] = appData.addExpenses[i][0].toUpperCase() + appData.addExpenses[i].slice(1).toLowerCase();
}

console.log(String(appData.addExpenses));

if (appData.budgetDay > 0){
  appData.getStatusIncome(appData.budgetDay);
} else {
  document.write('Что-то пошло не так...');
}







