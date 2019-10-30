/**
 * Created by User on 29.10.2019.
 */
// 1. восстановить порядок книг
let books = document.querySelector('.books'),
  book = document.querySelectorAll('.book');
books.insertBefore(book[1], book[0]);
books.insertBefore(book[4], book[2]);
books.insertBefore(book[2], null);

// 2. замена бэкграунда
const body = document.querySelector('body');
body.setAttribute('style', 'background-image: url(./image/back_books.jpg)');

// 3. исправить заголовок в книге 3
let a = document.querySelectorAll('a');
a[2].innerHTML = "Книга 3. this и Прототипы Объектов";

//4. удаление рекламы
const commercial = document.querySelector('.adv');
commercial.classList.remove('adv');

//5. восстановить порядок глав во второй и пятой книге
let ul = document.querySelectorAll('ul'),
  li2 = ul[1].querySelectorAll('li'),
  li5 = ul[4].querySelectorAll('li'),
  li6 = ul[5].querySelectorAll('li');

ul[1].insertBefore(li2[2], li2[10]);
ul[1].insertBefore(li2[6], li2[4]);
ul[1].insertBefore(li2[8], li2[4]);

ul[4].insertBefore(li5[9], li5[2]);
ul[4].insertBefore(li5[5], li5[8]);
ul[4].insertBefore(li5[2], li5[6]);

//6. В шестой книге добавить главу “Глава 8: За пределами ES6” и поставить её в правильное место
let liG6 = document.createElement('li');
liG6.textContent = 'Глава 8: За пределами ES6';
liG6 = ul[5].appendChild(liG6);
ul[5].insertBefore(liG6, li6[9]);
console.log(ul[2]);

// для красоты
const h1 = document.querySelector('h1');
h1.setAttribute('style', 'color: #fff');