const cityArr = {
  rus: ['Москва', 'Санк-Петербург', 'Новосибирск', 'Екатеринбург', 'Нижний Новгород', 'Казань', 'Челябинск'],
  uk: ['Киев', 'Харьков', 'Одесса', 'Днепр', 'Донецк', 'Запорожье', 'Львов'],
  bel: ['Минск', 'Гомель', 'Могилёв', 'Витебск', 'Гродно', 'Брест'],
  jap: ['Токио', 'Киото', 'Осака', 'Иокогама']
};

const country = document.querySelector('#country'),
      city = document.querySelector('#city'),
      result = document.querySelector('.result');

/****  начальное значение ****/
sessionStorage.country = 'Россия';
  for(let i = 0; i < cityArr['rus'].length; i++){
    let option = new Option(cityArr['rus'][i]);
    city.append(option);
}
/****  // ****/


/****  getCity ****/
let getCity = function (value) {
  for(let key in cityArr){
    if(key === value){
      for(let i = 0; i < cityArr[key].length; i++){
        let option = new Option(cityArr[key][i]);
        city.append(option);
      }
    }
  }
};
/****  // ****/

let getDelete = function () {
  let optionsItem = city.querySelectorAll('option');
  for (let i = 0; i < optionsItem.length; i++){
    optionsItem[i].remove();
  }
};

country.addEventListener('change', function () {
    switch (country.value){
      case 'rus': getDelete();
                  getCity('rus');
                  sessionStorage.city = 'Москва';
                  break;
      case 'uk':  getDelete();
                  getCity('uk');
                  sessionStorage.city = 'Киев';
                  break;
      case 'bel': getDelete();
                  getCity('bel');
                  sessionStorage.city = 'Минск';
                  break;
      case 'jap': getDelete();
                  getCity('jap');
                  sessionStorage.city = 'Токио';
                  break;
    }
});

const showResult = function () {
  result.textContent = sessionStorage.country + ' ' + sessionStorage.city;
};

country.addEventListener('change', function () {
  sessionStorage.country = country.options[country.selectedIndex].text;
  showResult();
});

city.addEventListener('change', function () {
  sessionStorage.city = city.options[city.selectedIndex].text;
  showResult();
});
