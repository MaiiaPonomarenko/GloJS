/**
 * Created by User on 29.10.2019.
 */
const buttonCalc = document.querySelector('#start'),
      income = document.querySelector('.income'),
      expenses = document.querySelector('.expenses'),
      
      depositCheck = document.querySelector('#deposit-check'),
      additionalIncome = document.querySelectorAll('.additional_income-item');

const buttonIncome = income.getElementsByTagName('button'),
      buttonExpenses = expenses.getElementsByTagName('button');

const budgetMonthValue = document.getElementsByClassName('budget_month-value'),
      budgetDayValue = document.getElementsByClassName('budget_day-value'),
      expensesMonthValue = document.getElementsByClassName('expenses_month-value'),
      additionalIncomeValue = document.getElementsByClassName('additional_income-value'),
      additionalExpensesValue = document.getElementsByClassName('additional_expenses-value'),
      incomePeriodValue = document.getElementsByClassName('income_period-value'),
      targetMonthValue = document.getElementsByClassName('target_month-value');

const salaryAmount = document.querySelector('.salary-amount'),
      incomeTitle = document.querySelector('.income-title'),
      incomeAmount = document.querySelector('.income-amount'),
      additionalIncomeIitem = document.querySelector('.additional_income-item'),
      
      expensesTitle = document.querySelector('.expenses-title'),
      expensesAmount = document.querySelector('.expenses-amount'),
      additionalExpensesItem = document.querySelector('.additional_expenses-item'),
      
      targetAmount = document.querySelector('.target-amount'),
      periodSelect = document.querySelector('.period-select');

console.log(additionalIncomeValue);
console.log(incomeAmount);