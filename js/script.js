//11.1
'use strict';

const button = document.querySelectorAll('button'),
      start = document.getElementById('start'),
      startBtn = button[2],
      cancel = document.getElementById('cancel'),
      btnPlus = document.getElementsByTagName('button'),
      incomePlus = btnPlus[0],
      expensesPlus = btnPlus[1],
      salaryAmount = document.querySelector('.salary-amount'),
      additionalExpensesItem = document.querySelector('.additional_expenses-item'),
      targetAmount = document.querySelector('.target-amount'),
      periodSelect = document.querySelector('.period-select'),
      periodAmount = document.querySelector('.period-amount'),
      additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
      depositCheck = document.querySelector('#deposit-check'),
      depositBank = document.querySelector('.deposit-bank'),
      depositAmount = document.querySelector('.deposit-amount'),
      depositPersent = document.querySelector('.deposit-percent'),
      budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],
      budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
      expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
      additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],
      additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
      incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
      targetMonthValue = document.getElementsByClassName('target_month-value')[0];
let   incomeItems = document.querySelectorAll('.income-items'),
  expensesItems = document.querySelectorAll('.expenses-items');

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
  this.budgetDay = 0;
  this.budgetMonth = 0;
  this.expensesMonth = 0;
};


AppData.prototype.eventListener = function () {
  start.addEventListener('click', appData.start.bind(appData));
  cancel.addEventListener('click', appData.reset.bind(appData));
  salaryAmount.addEventListener('keyup', this.checkBtn);
  expensesPlus.addEventListener('click', function () {
    appData.addBlock(expensesPlus, '.expenses-items', expensesItems);
  });
  incomePlus.addEventListener('click', function () {
    appData.addBlock(incomePlus, '.income-items', incomeItems);
  });
  expensesPlus.addEventListener('click', this.disableValueExpenses);
  incomePlus.addEventListener('click', this.disableValueIncome);
  periodSelect.addEventListener('change', this.getPeriodTarget);
};

AppData.prototype.checkBtn = () =>{
  if(salaryAmount.value.length > 1){
    startBtn.removeAttribute('disabled');
  }
};

AppData.prototype.start = function () {
  
  if (salaryAmount.value < 2){
    startBtn.setAttribute("disabled", "true");
    return;
  }
  
  const input = document.querySelectorAll('input[type=text]');
  for (let i = 0; i < input.length; i++) {
    if (input[i].placeholder === 'Сумма' || input[i].placeholder === 'Наименование' || input[i].placeholder === 'название') {
      input[i].classList.add('blocked');}
  }
  
  const blocked = document.querySelectorAll('.blocked');
  for (let i = 0; i < blocked.length; i++) {
    blocked[i].setAttribute("disabled", "true");
    start.style.display = 'none';
    cancel.style.display = 'block';
  }
  
  this.budget = +salaryAmount.value;
  this.getExpenses();
  this.getIncome();
  this.getExpensesMonth();
  this.getInfoDeposit();
  this.getAdd(additionalExpensesItem, additionalIncomeItem);
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
  const _this = this;
  function incomePeriodValueResult (event) {
    if (event.target.value !== periodSelect.value){
      this.calcPeriod();
    }
    return incomePeriodValue.value = _this.calcPeriod();
  }
  incomePeriodValue.value = this.calcPeriod();
};

/***********  ________LEFT SIDE_________  *******************/

AppData.prototype.addBlock = function (button, selector, items){
  let cloneItem = items[0].cloneNode(true);
  items[0].parentNode.insertBefore(cloneItem, button);
  items = document.querySelectorAll(selector);
  this.inputBan();
  if(items.length === 3){
    button.style.display = 'none';
  }
};

/********   income additional   *********/
AppData.prototype.getIncome = function () {
  incomeItems = document.querySelectorAll('.income-items'),
  incomeItems.forEach((item) => {
    let itemIncome = item.querySelector('.income-title').value,
      cashIncome = item.querySelector('.income-amount').value;
    if(itemIncome !== '' && cashIncome !== ''){
      this.income[itemIncome] = cashIncome;
    }
  });
};
AppData.prototype.disableValueIncome = () => {
  let incomeTitleItem = document.querySelectorAll('.income-title'),
    incomeAmountItem = document.querySelectorAll('.income-amount');
  if(incomeTitleItem.length === 3){
    incomeTitleItem[2].value = '';
    incomeAmountItem[1].value = '';
  } else if(incomeTitleItem.length === 4){
    incomeTitleItem[3].value = '';
    incomeAmountItem[2].value = '';
  }
};

/********   expenses additional   *********/
AppData.prototype.getExpenses = function () {
  expensesItems = document.querySelectorAll('.expenses-items'),
  expensesItems.forEach((item) => {
    let itemExpenses = item.querySelector('.expenses-title').value,
      cashExpenses = item.querySelector('.expenses-amount').value;
    if(itemExpenses !== '' && cashExpenses !== ''){
      this.expenses[itemExpenses] = cashExpenses;
    }
  })
};
AppData.prototype.disableValueExpenses = () => {
  let expensesTitleItem = document.querySelectorAll('.expenses-title'),
    expensesAmountItem = document.querySelectorAll('.expenses-amount');
  if(expensesTitleItem.length === 3){
    expensesTitleItem[2].value = '';
    expensesAmountItem[1].value = '';}
  else if(expensesTitleItem.length === 4){
    expensesTitleItem[3].value = '';
    expensesAmountItem[2].value = '';
  }
};
/********  income, expenses possible    *********/
AppData.prototype.getAdd = function (additionalExpenses, additionalIncome) {
  if (additionalExpenses !== undefined){
    let addExpenses = additionalExpenses.value.split(',');
    addExpenses.forEach((item) => {
      item = item.trim();
      if (item !== ''){
        this.addExpenses.push(item);
      }
    })
  }
  if (additionalIncome !== undefined){
    additionalIncome.forEach((item) => {
      let itemValue = item.value.trim();
      if(itemValue !== ''){
        this.addIncome.push(itemValue);
      }
    })
  }
};
/********   deposit   *********/
AppData.prototype.getInfoDeposit = function () {
  if (this.deposit){
    this.percentDeposit = depositPersent.value;
    this.moneyDeposit = depositAmount.value;
  }
};
/********   calculation period   *********/
AppData.prototype.getPeriodTarget = (event) => {
  periodAmount.textContent = event.target.value;
};

/***********  ________RIGHT SIDE_________  *******************/
/********  income monthly, day  *********/
AppData.prototype.getBudget = function () {
  for(let key in this.income){
    this.incomeMonth += +this.income[key];
  }
  this.budgetMonth = (this.budget + this.incomeMonth) - this.expensesMonth +(this.moneyDeposit * this.percentDeposit) / 12;
  this.budgetDay = Math.floor(this.budgetMonth / 30);
};

/********  expenses monthly   *********/
AppData.prototype.getExpensesMonth = function () {
  for(let key in this.expenses){
    this.expensesMonth += +(this.expenses[key]);
  }
};

/******** accumulation for the period   *********/
AppData.prototype.calcPeriod = function () {
  return this.budgetMonth * periodSelect.value;
};

/********  deadline for achieving the goal   *********/
AppData.prototype.getTargetMonth = function () {
  return Math.ceil(targetAmount.value / this.budgetMonth);
};

/********  reset   *********/
AppData.prototype.reset = function () {
  startBtn.setAttribute("disabled", "disabled");
  
  start.style.display = 'block';
  cancel.style.display = 'none';
  
  this.budget = 0;
  this.income = {};
  this.incomeMonth = 0;
  this.addIncome = []; //доп доходы
  this.expenses = {}; //доп расходы
  this.addExpenses = []; //возможные расходы
  this.deposit = false;
  this.percentDeposit = 0;
  this.moneyDeposit = 0;
  this.budgetDay = 0;
  this.budgetMonth = 0;
  this.expensesMonth = 0;

  incomePeriodValue.value = 1;
  periodSelect.value = 1;
  
  //разблокировка и стирание полей
  const blocked = document.querySelectorAll('.blocked');
  for(let i = 0; i < blocked.length; i++){
    blocked[i].removeAttribute("disabled");
    blocked[i].value = '';
    blocked[i].classList.remove('.blocked');
  }
  const resultTotal = document.querySelectorAll('.result-total');
  for(let i = 0; i < resultTotal.length; i++){
    resultTotal[i].value = '';
  }
  
  //удаление добавленных полей
  incomeItems = document.querySelectorAll('.income-items');
  expensesItems = document.querySelectorAll('.expenses-items');
  console.log(incomeItems.length);
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
  
  depositBank.style.display = 'none';
  depositAmount.style.display = 'none';
  depositAmount.value = '';
  appData.deposit = 'false';
  if (depositCheck.checked){
    depositCheck.checked = false;
  }
  periodAmount.textContent = 1;
  incomePlus.style.display = 'block';
  expensesPlus.style.display = 'block';
};
/********  input ban   *********/
AppData.prototype.inputBan = () => {
  
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
  
  const input = document.querySelectorAll('input');
  for(let i = 0; i < input.length; i++) {
    if (input[i].placeholder === 'Сумма'){
      input[i].classList.add('numbers');}
    else if (input[i].placeholder === 'Наименование'){
      input[i].classList.add('simbols');}
  }
  
  const numbers = document.querySelectorAll('.numbers');
  for(let i = 0; i < numbers.length; i++){
    numbers[i].addEventListener('keydown', function () {
      if(isNumber(event.key) === false){
        event.preventDefault(false);}
    });
  }
  
  const simbols = document.querySelectorAll('.simbols');
  for(let i = 0; i < simbols.length; i++) {
    simbols[i].addEventListener('keydown', function () {
      if (isSimbols(event.key) === false) {
        event.preventDefault(false);}
    });
  }
};

depositCheck.addEventListener('change', function () {
  if (depositCheck.checked){
    depositBank.style.display = 'inline-block';
    depositAmount.style.display = 'inline-block';
    appData.deposit = 'true';
    depositBank.addEventListener('change', function () {
      let selectIndex = this.options[this.selectedIndex].value;
      if(selectIndex === 'other'){
        depositPersent.style.display = 'inline-block';
        depositPersent.value = '';}
      else {
        depositPersent.style.display = 'none';
        depositPersent.value = selectIndex;
      }
    })
  }
  else{
    depositBank.style.display = 'none';
    depositAmount.style.display = 'none';
    depositAmount.value = '';
    appData.deposit = 'false';
  }
});


const appData = new AppData ();
appData.eventListener();
appData.inputBan();

/********** field lock input  ************/
let input = document.querySelectorAll('input[type=text]');
for (let i = 0; i < input.length; i++) {
  if (input[i].placeholder === 'Сумма' || input[i].placeholder === 'Наименование' || input[i].placeholder === 'название') {
    input[i].classList.add('blocked');
  }
}
appData.addExpenses = appData.addExpenses.map(function (item) {
  return item[0].toUpperCase() + item.slice(1).toLowerCase();
});