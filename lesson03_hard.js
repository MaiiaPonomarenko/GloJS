/**
 * Created by User on 21.10.2019.
 */

// -----1 задание------
let lang = prompt("Введите желаемый язык: ru | en");
let week;
 
 // решение if
 if (lang === 'ru'){
 week = ['понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота', 'воскресенье'];
 document.write("Решение if: " + week.join(", ") + '<br><br>');
 } else if (lang === 'en') {
 week = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
 document.write("Решение if: " + week.join(", ") + '<br><br>');
 } else
 document.write('Решение if: вы ввели неверное значение<br><br>');
 
 // решение switch
 switch(lang){
 case 'ru':
 week = ['понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота', 'воскресенье'];
 document.write("Решение switch: " + week.join(", ") + '<br><br>');
 break;
 case 'en':
 week = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
 document.write("Решение switch: " + week.join(", ") + '<br><br>');
 break;
 default:
 document.write('Решение switch: вы ввели неверное значение');
 }
 
 // решение многомерный массив
 let langArray = new Map([
 ['ru', 'понедельник, вторник, среда, четверг, пятница, суббота, воскресенье'],
 ['en', 'monday, tuesday, wednesday, thursday, friday, saturday, sunday']
 ]);
 document.write("Решение массив: " + langArray.get(lang) + '<br><br>');

// -----2 задание------
let namePerson = prompt("Введите имя");
let nameUpper = namePerson.toLowerCase();
let reg = new RegExp("[\.\^\$\(\)\<\>&%#№@!~\[=\*:\{}\+`\?-]");
console.log(reg.test(nameUpper));
nameUpper === 'артем' ? document.write('Директор') : (nameUpper === 'максим') ? document.write('Преподаватель') : ( (/[\d]/.test(nameUpper)) || reg.test(nameUpper)) ? document.write('Вы ввели некорректные символы') : document.write('Студент');
