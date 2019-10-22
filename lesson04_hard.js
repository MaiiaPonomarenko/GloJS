const ellipsis = document.querySelector('.ellipsis'),
      hidden = document.querySelector('.hidden'),
      text = document.querySelector('.text');

ellipsis.addEventListener('click', clickMouseShow);
hidden.addEventListener('click', clickMouseHide);

function clickMouseShow (){
  ellipsis.classList.add('hide');
  hidden.classList.remove('hide');
}
function clickMouseHide (){
  ellipsis.classList.remove('hide');
  hidden.classList.add('hide');
}

let argum = prompt("Введите строку для обработки");
let oneArgument = str => {
  if(typeof(str) !== 'string'){
    alert ("Введено неверное значение");
  } else {
    console.log(str.replace(/(^\s*)|(\s*)$/g, ''));
    console.log(str.length);
  }
  if (str.length > 30){
    let argumHidden = str.substring(30, str.length);
    document.getElementById('text').innerHTML = str.slice(0, 29);
    document.getElementById('hide').innerHTML = argumHidden + " ←";
  }
};

oneArgument(argum);
