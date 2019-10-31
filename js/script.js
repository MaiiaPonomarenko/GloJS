'use strict';

let   start = document.getElementById('start'),
  btnPlus = document.getElementsByTagName('button'),
  incomePlus = btnPlus[0],
  expensesPlus = btnPlus[1],
  additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
  depositCheck = document.querySelector('#deposit-check'),
  
  budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],
  budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
  expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
  additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],
  additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
  incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
  targetMonthValue = document.getElementsByClassName('target_month-value')[0],
  
  salaryAmount = document.querySelector('.salary-amount'),
  incomeTit = document.querySelectorAll('.income-title'),
  incomeTitle = incomeTit[1],
  incomeItems = document.querySelectorAll('.income-items'),
  
  expensesTit = document.querySelectorAll('.expenses-title'),
  expensesTitle = expensesTit[1],
  expensesItems = document.querySelectorAll('.expenses-items'),
  additionalExpensesItem = document.querySelector('.additional_expenses-item'),
  
  targetAmount = document.querySelector('.target-amount'),
  periodSelect = document.querySelector('.period-select');


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
  incomeMonth: 0,
  addIncome: [], //доп доходы
  expenses: {}, //доп расходы
  addExpenses: [], //возможные расходы
  deposit: false,
  percentDeposit: 0,
  moneyDeposit: 0,
  mission: 4500000,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  
  start: function () {
    if(salaryAmount.value === ''){
      alert('Ошибка, поле "Месячный доход" не может быть пустым');
      return;
    }
    appData.budget = +salaryAmount.value;
    
    
    appData.getExpenses();
    appData.getIncome();
    appData.getExpensesMonth();
    appData.getAddExpenses();
    appData.getAddIncome();
    appData.getBudget();
    
    appData.showResult();

  },
  
  showResult: function () {
    budgetMonthValue.value = appData.budgetMonth;
    budgetDayValue.value = Math.ceil(appData.budgetDay);
    expensesMonthValue.value = appData.expensesMonth;
    additionalExpensesValue.value = appData.addExpenses.join(', ');
    additionalIncomeValue.value = appData.addIncome.join(', ');
    targetMonthValue.value = appData.getTargetMonth();
    incomePeriodValue.value = appData.calcPeriod();
  },
  
  addExpensesBlock: function () {
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
    
    expensesItems = document.querySelectorAll('.expenses-items');
    if(expensesItems.length ===3){
      expensesPlus.style.display = 'none';
    }
  },
  getExpenses: function (){
    expensesItems.forEach(function(item){
      let itemExpenses = item.querySelector('.expenses-title').value;
      let cashExpenses = item.querySelector('.expenses-amount').value;
      if(itemExpenses !== '' && cashExpenses !== ''){
        appData.expenses[itemExpenses] = cashExpenses;
      }

    })
  },
  
  addIncomeBlock: function () {
    let cloneIncomeItem = incomeItems[0].cloneNode(true);
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
  
    incomeItems = document.querySelectorAll('.income-items');
    if(incomeItems.length ===3){
      incomePlus.style.display = 'none';
    }
  },
  /*todo сделать функцию*/
  getIncome: function () {
    incomeItems.forEach(function(item){
      let itemIncome = item.querySelector('.income-title').value;
      let cashIncome = item.querySelector('.income-amount').value;
      if(itemIncome !== '' && cashIncome !== ''){
        appData.income[itemIncome] = cashIncome;
      }
    });
    
    
    /*for(let key in appData.income){
      appData.incomeMonth += +appData.income[key];
    }*/
  },
  
  getAddExpenses: function () {
     let addExpenses = additionalExpensesItem.value.split(',');
     addExpenses.forEach(function (item) {
       item = item.trim();
       if (item !== ''){
         appData.addExpenses.push(item);
       }
     })
  },
  getAddIncome: function(){
    additionalIncomeItem.forEach(function(item){
      let itemValue = item.value.trim();
      if(itemValue !== ''){
        appData.addIncome.push(itemValue);
      }
    })
  },
  
  // все расходы за месяц
  getExpensesMonth: function () {
    for(let key in appData.expenses){
      appData.expensesMonth += +(appData.expenses[key]);
    }
  },
  
  // накопления за месяц
  getBudget: function () {
    appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
    appData.budgetDay = Math.floor(appData.budgetMonth / 30);
  },
  
  // достижение цели
  getTargetMonth: function () {
    return Math.ceil(targetAmount.value / appData.budgetMonth);
  },
  
  getInfoDeposit: function () {
    if (appData.deposit){
      appData.percentDeposit = validationNumber('Какой годовой процент?');
      appData.moneyDeposit = validationNumber('Какая сумма заложена?');
    }
  },
  
  calcPeriod: function () {
    return appData.budgetMonth * periodSelect.value;
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

/* start - работа на нажатие кнопки "рассчитать" */
start.addEventListener('click', appData.start);

expensesPlus.addEventListener('click', appData.addExpensesBlock);
incomePlus.addEventListener('click', appData.addIncomeBlock);

appData.addExpenses = appData.addExpenses.map(function (item) {
  return item[0].toUpperCase() + item.slice(1).toLowerCase();
});

console.log(appData.addExpenses.join(', '));


if (appData.budgetDay > 0){
  appData.getStatusIncome(appData.budgetDay);
} else {
  document.write('Что-то пошло не так...');
}