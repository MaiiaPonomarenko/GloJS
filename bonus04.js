/**
 * Created by User on 25.10.2019.
 */
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function Game() {
  
  function question() {
    let aa = prompt('Угадай число');
    while (isNaN(aa)) {
      aa = prompt("Вы ввели не число");
    }
    if (aa === null){
      alert ("Игра завершена");
      throw new Error();

    }
    return aa;
  }
  
  let randomNumber = getRandomInt(100);
  console.log(randomNumber);
  let userNumber = question();
  
  while (userNumber !== randomNumber) {
    
    if (userNumber < randomNumber) {
      alert("Больше!");
      userNumber = question();
    } else if (userNumber > randomNumber) {
      alert("Меньше!");
      userNumber = question();
    } else {
      alert("Поздравляю, ты угадал!");
      let nextGame = confirm("Хочешь сыграть еще?");
      if (nextGame) {
        Game();
      } else break;
    }
  }
}
Game();
