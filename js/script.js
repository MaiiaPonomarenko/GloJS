//9-е
'use strict';

let button = document.querySelectorAll('button'),
  start = document.getElementById('start'),
  startBtn = button[2],
  cancel = document.getElementById('cancel'),
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
  incomeAmount = document.querySelector('.income-amount'),
  expensesTit = document.querySelectorAll('.expenses-title'),
  expensesTitle = expensesTit[1],
  expensesItems = document.querySelectorAll('.expenses-items'),
  additionalExpensesItem = document.querySelector('.additional_expenses-item'),
  expensesAmount = document.querySelector('.expenses-amount'),
  targetAmount = document.querySelector('.target-amount'),
  periodSelect = document.querySelector('.period-select'),
  periodAmount = document.querySelector('.period-amount');

//startBtn.setAttribute("disabled", "disabled");

const AppData = function () {
  this.budget = 0;
  this.income = {};
  this.incomeMonth = 0;
  this.addIncome = []; //доп доходы
  this.expenses = {}; //доп расходы
  this.addExpenses = []; //возможные расходы
  this.deposit = false;
  this.percentDeposit = 0;
  this.moneyDeposit = 0;
  this.mission = 4500000;
  this.budgetDay = 0;
  this.budgetMonth = 0;
  this.expensesMonth = 0;
};

AppData.prototype.eventListener = function () {
  start.addEventListener('click', appData.start.bind(appData));
  start.addEventListener('click', appData.clicked);
  cancel.addEventListener('click', appData.reset);
  salaryAmount.addEventListener('keyup', appData.checkBtn);
  expensesPlus.addEventListener('click', appData.addExpensesBlock);
  expensesPlus.addEventListener('click', appData.disableValueExpenses);
  incomePlus.addEventListener('click', appData.addIncomeBlock);
  incomePlus.addEventListener('click', appData.disableValueIncome);
  periodSelect.addEventListener('change', appData.getPeriodTarget);
};

AppData.prototype.checkBtn = function(){
  if(salaryAmount.value.length > 1){
    startBtn.removeAttribute('disabled');
  }
};

AppData.prototype.start = function () {
  if (salaryAmount.value < 2){
    startBtn.setAttribute("disabled", "true");
    return;
  }
  
  let input = document.querySelectorAll('input[type=text]');
  for (let i = 0; i < input.length; i++) {
    if (input[i].placeholder === 'Сумма' || input[i].placeholder === 'Наименование' || input[i].placeholder === 'название') {
      input[i].classList.add('blocked');}
  }
  
  let blocked = document.querySelectorAll('.blocked');
  for (let i = 0; i < blocked.length; i++) {
    blocked[i].setAttribute("disabled", "true");
    start.style.display = 'none';
    cancel.style.display = 'block';
  }
  
  this.budget = +salaryAmount.value;
  this.getExpenses();
  this.getIncome();
  this.getExpensesMonth();
  this.getAddExpenses();
  this.getAddIncome();
  this.getBudget();
  this.showResult();
};

AppData.prototype.showResult = function () {
  budgetMonthValue.value = this.budgetMonth;
  budgetDayValue.value = Math.ceil(this.budgetDay);
  expensesMonthValue.value = this.expensesMonth;
  additionalExpensesValue.value = this.addExpenses.join(', ');
  additionalIncomeValue.value = this.addIncome.join(', ');
  targetMonthValue.value = this.getTargetMonth();
  
  /*   период рассчета  */
  periodSelect.addEventListener('change', incomePeriodValueResult);
  function incomePeriodValueResult (event) {
    if (event.target.value !== periodSelect.value){
      this.calcPeriod();
    }
    return incomePeriodValue.value = this.calcPeriod();
  }
  incomePeriodValue.value = this.calcPeriod();
};

/***********  ________LEFT SIDE_________  *******************/
/********   дополнительные доходы   *********/
AppData.prototype.addIncomeBlock = function () {
  let cloneIncomeItem = incomeItems[0].cloneNode(true);
  incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
  incomeItems = document.querySelectorAll('.income-items');
  appData.inputBan();
  if(incomeItems.length === 3){
    incomePlus.style.display = 'none';
  }
};
AppData.prototype.getIncome = function () {
  incomeItems.forEach(function(item){
    let itemIncome = item.querySelector('.income-title').value;
    let cashIncome = item.querySelector('.income-amount').value;
    if(itemIncome !== '' && cashIncome !== ''){
      appData.income[itemIncome] = cashIncome;
    }
  });
};
AppData.prototype.disableValueIncome = function() {
  let incomeTitleItem = document.querySelectorAll('.income-title');
  let incomeAmountItem = document.querySelectorAll('.income-amount');
  if(incomeTitleItem.length === 3){
    incomeTitleItem[2].value = '';
    incomeAmountItem[1].value = '';
  } else if(incomeTitleItem.length === 4){
    incomeTitleItem[3].value = '';
    incomeAmountItem[2].value = '';
  }
};
/********   возможный доход   *********/
AppData.prototype.getAddIncome = function(){
  additionalIncomeItem.forEach(function(item){
    let itemValue = item.value.trim();
    if(itemValue !== ''){
      appData.addIncome.push(itemValue);
    }
  })
};

/********   обязательные расходы   *********/
AppData.prototype.addExpensesBlock = function () {
  let cloneExpensesItem = expensesItems[0].cloneNode(true);
  expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
  expensesItems = document.querySelectorAll('.expenses-items');
  appData.inputBan();
  if(expensesItems.length ===3){
    expensesPlus.style.display = 'none';
  }
};
AppData.prototype.getExpenses = function (){
  expensesItems.forEach(function(item){
    let itemExpenses = item.querySelector('.expenses-title').value;
    let cashExpenses = item.querySelector('.expenses-amount').value;
    if(itemExpenses !== '' && cashExpenses !== ''){
      appData.expenses[itemExpenses] = cashExpenses;
    }
  })
};
AppData.prototype.disableValueExpenses = function () {
  let expensesTitleItem = document.querySelectorAll('.expenses-title');
  let expensesAmountItem = document.querySelectorAll('.expenses-amount');
  if(expensesTitleItem.length === 3){
    expensesTitleItem[2].value = '';
    expensesAmountItem[1].value = '';
  } else if(expensesTitleItem.length === 4){
    expensesTitleItem[3].value = '';
    expensesAmountItem[2].value = '';
  }
};
/********   возможные расходы   *********/
AppData.prototype.getAddExpenses = function () {
  let addExpenses = additionalExpensesItem.value.split(',');
  addExpenses.forEach(function (item) {
    item = item.trim();
    if (item !== ''){
      appData.addExpenses.push(item);
    }
  })
};
/********   период расчета   *********/
AppData.prototype.getPeriodTarget = function (event) {
  periodAmount.textContent = event.target.value;
};

/***********  ________RIGHT SIDE_________  *******************/
/********  доход за месяц, день  *********/
AppData.prototype.getBudget = function () {
  for(let key in this.income){
    this.incomeMonth += +this.income[key];
  }
  this.budgetMonth = (this.budget + this.incomeMonth) - this.expensesMonth;
  this.budgetDay = Math.floor(this.budgetMonth / 30);
};

/********  расходы за месяц   *********/
AppData.prototype.getExpensesMonth = function () {
  for(let key in this.expenses){
    this.expensesMonth += +(this.expenses[key]);
  }
};

/******** накопления за период   *********/
AppData.prototype.calcPeriod = function () {
  return this.budgetMonth * periodSelect.value;
};

/********  срок достижения цели   *********/
AppData.prototype.getTargetMonth = function () {
  return Math.ceil(targetAmount.value / this.budgetMonth);
};

/********  сброс   *********/
AppData.prototype.reset = function () {
  startBtn.setAttribute("disabled", "disabled");
  
  start.style.display = 'block';
  cancel.style.display = 'none';
  
  appData.income = {};
  appData.incomeMonth = 0;
  incomePeriodValue.value = 1;
  periodSelect.value = 1;
  
  //разблокировка и стирание полей
  let blocked = document.querySelectorAll('.blocked');
  for(let i = 0; i < blocked.length; i++){
    blocked[i].removeAttribute("disabled");
    blocked[i].value = '';
    blocked[i].classList.remove('.blocked');
  }
  let resultTotal = document.querySelectorAll('.result-total');
  for(let i = 0; i < resultTotal.length; i++){
    resultTotal[i].value = '';
  }
  
  //удаление добавленных полей
  switch (incomeItems.length){
    case 2: incomeItems[1].remove();
      break;
    case 3: incomeItems[1].remove();
      incomeItems[2].remove();
      break;
  }
  switch (expensesItems.length){
    case 2: expensesItems[1].remove();
      break;
    case 3: expensesItems[1].remove();
      expensesItems[2].remove();
      break;
  }
  
  periodAmount.textContent = 1;
  incomePlus.style.display = 'block';
  expensesPlus.style.display = 'block';
};
/********  input ban   *********/
AppData.prototype.inputBan = function () {
  
  function isNumber(num) {
    if((num >= '0' && num <= '9') || num === 'Backspace' || num === 'Delete' || num === 'ArrowLeft' || num === 'ArrowRight'){
      return true;
    } else return false
  }
  function isSimbols(simb) {
    if(/[а-яА-я\.\,\!\?\;:]/.test(simb) || simb === 'Backspace' || simb === 'Delete' || simb === 'ArrowLeft' || simb === 'ArrowRight'){
      return true
    } else return false
  }
  
  let input = document.querySelectorAll('input');
  for(let i = 0; i < input.length; i++) {
    if (input[i].placeholder === 'Сумма'){
      input[i].classList.add('numbers');
    }
    else if (input[i].placeholder === 'Наименование'){
      input[i].classList.add('simbols');
    }
  }
  
  let numbers = document.querySelectorAll('.numbers');
  for(let i = 0; i < numbers.length; i++){
    numbers[i].addEventListener('keydown', function () {
      if(isNumber(event.key) === false){
        event.preventDefault(false);
      }
    });
  }
  
  let simbols = document.querySelectorAll('.simbols');
  for(let i = 0; i < simbols.length; i++) {
    simbols[i].addEventListener('keydown', function () {
      if (isSimbols(event.key) === false) {
        event.preventDefault(false);
      }
    });
  }
};


const appData = new AppData ();
console.log(appData);

appData.eventListener();

appData.inputBan();
/********** блокировка полей input  ************/
let input = document.querySelectorAll('input[type=text]');
for (let i = 0; i < input.length; i++) {
  if (input[i].placeholder === 'Сумма' || input[i].placeholder === 'Наименование' || input[i].placeholder === 'название') {
    input[i].classList.add('blocked');
  }
}

appData.addExpenses = appData.addExpenses.map(function (item) {
  return item[0].toUpperCase() + item.slice(1).toLowerCase();
});

