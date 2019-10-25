/**
 * Created by User on 25.10.2019.
 */
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function Game() {
  let randomNumber = getRandomInt(100);
  let userNumber = prompt("Угадай число");
  	while (isNaN(userNumber)){
	  userNumber = prompt("Вы ввели не число");
	}
	
  console.log(randomNumber);

  while(userNumber !== randomNumber){
      if (userNumber < randomNumber){
      alert ("Больше!");
      userNumber = prompt("Угадай снова");
        while (isNaN(userNumber)){
		  userNumber = prompt("Вы ввели не число");
		}
		if(userNumber === null){
			break;
		}
    } else if (userNumber > randomNumber){
      alert ("Меньше!");
      userNumber = prompt("Угадай снова");
      	while (isNaN(userNumber)){
		  userNumber = prompt("Вы ввели не число");
		}
		if(userNumber === null){
			break;
		}
    } else {
      alert("Поздравляю, ты угадал!");
      let nextGame = confirm("Хочешь сыграть еще?");
      if (nextGame){
        Game();
      } else break;
    }
  }
}

Game();
