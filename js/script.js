'use strict';

let   start = document.getElementById('start'),
  btnPlus = document.getElementsByTagName('button'),
  incomePlus = btnPlus[0],
  expensesPlus = btnPlus[1],
  additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
  depositCheck = document.querySelector('#deposit-check'),
  
  budgetMonthValue = document.getElementsByClassName('budget_month-value'),
  budgetDayValue = document.getElementsByClassName('budget_day-value'),
  expensesMonthValue = document.getElementsByClassName('expenses_month-value'),
  additionalIncomeValue = document.getElementsByClassName('additional_income-value'),
  additionalExpensesValue = document.getElementsByClassName('additional_expenses-value'),
  incomePeriodValue = document.getElementsByClassName('income_period-value'),
  targetMonthValue = document.getElementsByClassName('target_month-value'),
  
  salaryAmount = document.querySelector('.salary-amount'),
  incomeTit = document.querySelectorAll('.income-title'),
  incomeTitle = incomeTit[1],
  incomeAmount = document.querySelector('.income-amount'),
  additionalIncomeIitem = document.querySelector('.additional_income-item'),
  
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
  addIncome: [], //доп доходы
  expenses: {}, //доп расходы
  addExpenses: [], //возможные расходы
  deposit: false,
  percentDeposit: 0,
  moneyDeposit: 0,
  mission: 4500000,
  period: 8,
  start: function () {
    if(salaryAmount.value === ''){
      alert('Ошибка, поле "Месячный доход" не может быть пустым');
      return;
    }
    appData.budget = salaryAmount.value;
    console.log(salaryAmount.value);
    appData.getExpenses();
    
    //appData.asking();
    //appData.getExpensesMonth();
    //appData.getBudget();
  },
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  addExpensesBlock: function () {
    console.log(expensesItems.parentNode);
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
    
    expensesItems = document.querySelectorAll('.expenses-items');
    if(expensesItems.length ===3){
      expensesPlus.style.display = 'none';
    }
  },
  getExpenses: function (){
    expensesItems.forEach(function(item){
      let itemExpenses = item.querySelectorAll('.expenses-title').value;
      let cashExpenses = item.querySelectorAll('.expenses-amount').value;
      if(itemExpenses !== '' && cashExpenses !== ''){
        appData.expenses[itemExpenses] = cashExpenses;
      }
    })
  },
  asking: function () {
    
    if(confirm('Есть ли у вас дополнительный источник заработка?')){
      let itemIncome = validationString('Какой у вас есть дополнительный заработок?'),
        cashIncome = validationNumber('Сколько в месяц вы на этом зарабатываете?');
      appData.income[itemIncome] = cashIncome;
    }
    
    let addExpenses = prompt("Перечислите возможные расходы за рассчитываемый период через запятую");
    appData.addExpenses = addExpenses.split(',');
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

/* start - работа на нажатие кнопки "рассчитать" */
start.addEventListener('click', appData.start);

expensesPlus.addEventListener('click', appData.addExpensesBlock);
appData.addExpenses = appData.addExpenses.map(function (item) {
  return item[0].toUpperCase() + item.slice(1).toLowerCase();
});

console.log(appData.addExpenses.join(', '));


if (appData.budgetDay > 0){
  appData.getStatusIncome(appData.budgetDay);
} else {
  document.write('Что-то пошло не так...');
}