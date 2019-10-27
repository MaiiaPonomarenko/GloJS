/**
 * Created by User on 27.10.2019.
 */
'use strict';

let arrWeek = ['понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота', 'воскресенье'];

let Xmas95 = new Date;
let weekday = Xmas95.getDay();

console.log(weekday);
for (let i = 0; i < arrWeek.length; i++){
  let li = document.createElement('li');
  li.innerHTML = arrWeek[i];
  
  if(i > 4)
    li.classList.add('ital');
  
  if((weekday === 0 && i === 6) || (weekday > 0 && i === weekday+1))
    li.classList.add('weight');
  
  ul.append(li);
}

