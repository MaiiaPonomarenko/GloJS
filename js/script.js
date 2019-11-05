// 9-e
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
  periodAmount = document.querySelector('.period-amount')


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
    this.budget = +salaryAmount.value;
    this.getExpenses();
    this.getIncome();
    this.getExpensesMonth();
    this.getAddExpenses();
    this.getAddIncome();
    this.getBudget();
    this.showResult();
  },
  
  showResult: function () {
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = Math.ceil(this.budgetDay);
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncomeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = this.getTargetMonth();
    
    /********   накопления за период   *********/
    periodSelect.addEventListener('change', incomePeriodValueResult);
    function incomePeriodValueResult (event) {
      if (event.target.value !== periodSelect.value){
        appData.calcPeriod();
      }
      return incomePeriodValue.value = appData.calcPeriod();
    }
    incomePeriodValue.value = this.calcPeriod();
  },
  
  /********   обязательные расходы   *********/
  addExpensesBlock: function () {
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
    expensesItems = document.querySelectorAll('.expenses-items');
    inputBan();
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
  
  /********   дополнительные доходы   *********/
  addIncomeBlock: function () {
    let cloneIncomeItem = incomeItems[0].cloneNode(true);
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
    incomeItems = document.querySelectorAll('.income-items');
    inputBan();
    if(incomeItems.length ===3){
      incomePlus.style.display = 'none';
    }
  },
  getIncome: function () {
    incomeItems.forEach(function(item){
      let itemIncome = item.querySelector('.income-title').value;
      let cashIncome = item.querySelector('.income-amount').value;
      if(itemIncome !== '' && cashIncome !== ''){
        appData.income[itemIncome] = cashIncome;
      }
    });
  },
  
  /********   возможные расходы   *********/
  getAddExpenses: function () {
    let addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach(function (item) {
      item = item.trim();
      if (item !== ''){
        appData.addExpenses.push(item);
      }
    })
  },
  
  /********   возможный доход   *********/
  getAddIncome: function(){
    additionalIncomeItem.forEach(function(item){
      let itemValue = item.value.trim();
      if(itemValue !== ''){
        appData.addIncome.push(itemValue);
      }
    })
  },
  
  /********  все расходы за месяц   *********/
  getExpensesMonth: function () {
    for(let key in this.expenses){
      appData.expensesMonth += +(this.expenses[key]);
    }
  },
  
  /********  накопления за месяц   *********/
  getBudget: function () {
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
    this.budgetDay = Math.floor(this.budgetMonth / 30);
  },
  
  /********  достижение цели   *********/
  getTargetMonth: function () {
    return Math.ceil(targetAmount.value / this.budgetMonth);
  },
  
  getInfoDeposit: function () {
    if (this.deposit){
      this.percentDeposit = validationNumber('Какой годовой процент?');
      this.moneyDeposit = validationNumber('Какая сумма заложена?');
    }
  },
  
  getPeriodTarget: function (event) {
    periodAmount.textContent = event.target.value;
  },
  
  calcPeriod: function () {
    return this.budgetMonth * periodSelect.value;
  },
  
  /********  статус дохода   *********/
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

/* события */

/********** запрет нажания на кнопку рассчитать
 при пустом значении поля "Месячный доход"  ************/
startBtn.setAttribute("disabled", "disabled");

let checkBtn = function(){
  if(salaryAmount.value.length > 1){
    startBtn.removeAttribute('disabled');
  }
};
salaryAmount.addEventListener('keyup', checkBtn);
/********** // ************/


/********** блокировка полей input  ************/
let input = document.querySelectorAll('input[type=text]');
for (let i = 0; i < input.length; i++) {
  if (input[i].placeholder === 'Сумма' || input[i].placeholder === 'Наименование' || input[i].placeholder === 'название') {
    input[i].classList.add('blocked');
  }
}

function clicked () {
  let blocked = document.querySelectorAll('.blocked');
    for (let i = 0; i < blocked.length; i++) {
      blocked[i].setAttribute("disabled", "disabled");
    //start.removeEventListener('click', clicked);
    start.style.display = 'none';
    cancel.style.display = 'block';
  }
}

/********** метод reset  ************/
function Reset() {
  start.style.display = 'block';
  cancel.style.display = 'none';
  
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
}
/********** // ************/

start.addEventListener('click', appData.start.bind(appData));
start.addEventListener('click', clicked);
cancel.addEventListener('click', Reset);
expensesPlus.addEventListener('click', appData.addExpensesBlock);
expensesPlus.addEventListener('click', disableValueExpenses);
incomePlus.addEventListener('click', appData.addIncomeBlock);
incomePlus.addEventListener('click', disableValueIncome);
periodSelect.addEventListener('change', appData.getPeriodTarget);


/********  disable value input  *********/
function disableValueIncome() {
  let incomeTitleItem = document.querySelectorAll('.income-title');
  let incomeAmountItem = document.querySelectorAll('.income-amount');
  if(incomeTitleItem.length === 3){
    incomeTitleItem[2].value = '';
    incomeAmountItem[1].value = '';
  } else if(incomeTitleItem.length === 4){
    incomeTitleItem[3].value = '';
    incomeAmountItem[2].value = '';
  }
}
function disableValueExpenses() {
  let expensesTitleItem = document.querySelectorAll('.expenses-title');
  let expensesAmountItem = document.querySelectorAll('.expenses-amount');
  if(expensesTitleItem.length === 3){
    expensesTitleItem[2].value = '';
    expensesAmountItem[1].value = '';
  } else if(expensesTitleItem.length === 4){
    expensesTitleItem[3].value = '';
    expensesAmountItem[2].value = '';
  }
}
/********  //  *********/

/********** запрет на ввод символов в input  ************/
function isNumber(num) {
  if((num >= '0' && num <= '9') || num === 'Backspace' || num === 'Delete' || num === 'ArrowLeft' || num === 'ArrowRight'){
    return true
  } else return false
}

function isSimbols(simb) {
  if(/[а-яА-я\.\,\!\?\;:]/.test(simb) || simb === 'Backspace' || simb === 'Delete' || simb === 'ArrowLeft' || simb === 'ArrowRight'){
    return true
  } else return false
}

function inputBan() {
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
}

inputBan();
/********** //  ************/


appData.addExpenses = appData.addExpenses.map(function (item) {
  return item[0].toUpperCase() + item.slice(1).toLowerCase();
});

console.log(appData.addExpenses.join(', '));


if (appData.budgetDay > 0){
  appData.getStatusIncome(appData.budgetDay);
} else {
  document.write('Что-то пошло не так...');
}