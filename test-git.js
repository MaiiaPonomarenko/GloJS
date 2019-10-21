let income = '6780',
    mission = 6700000; //цель

let money = +prompt("Ваш месячный доход?");

let addExpenses = prompt("Перечислите возможные расходы за рассчитываемый период через запятую");
console.log(addExpenses.split());

let deposit =confirm("Есть ли у вас депозит в банке?");

console.log(typeof money, typeof income, typeof deposit);

let spending1 = prompt("Какие обязательные ежемесячные расходы у вас есть?");
let price1 = +prompt("Во сколько это обойдется?");

let spending2 = prompt("Какие обязательные ежемесячные расходы у вас есть?");
let price2 = +prompt("Во сколько это обойдется?");

let budgetMonth = money - price1 - price2;
console.log ("Месячный доход = " + budgetMonth);

let period = Math.ceil(mission / budgetMonth);
let budgetDay = Math.floor(budgetMonth / 30);
console.log("Дневной доход = " + budgetDay);

  switch (true){
    case (budgetDay === 800):
      document.write("Вау!<br>");
    case (budgetDay > 800):
      document.write("Высокий уровень дохода");
      break;
    case (budgetDay === 300):
      document.write("Стремись к большему<br>");
    case (budgetDay > 300 && budgetDay < 800):
      document.write("Средний уровень дохода");
      break;
    case (budgetDay > 0 && budgetDay < 300):
      document.write("Низкий уровень дохода");
      break;
    case (budgetDay === 0):
      document.write("Кушать что будешь?");
      break;
    default:
      document.write("Что-то пошло не так...");
  }