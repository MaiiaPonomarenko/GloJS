//основное задание
let money = 48500,
    income = '6780',
    addExpenses = '2110, 450, 3600',
    deposit = false,
    mission = 6700000,
    period = 8,
    budgetDay = money / 30;

console.log(typeof money, typeof income, typeof deposit);
console.log (income.length);
console.log ('Период ' + period + ' месяцев');
console.log('Цель заработать ' + mission + ' рублей');

console.log(addExpenses.toLowerCase().split(','));
console.log(Math.ceil(budgetDay), money % 30);