/**
 * Created by User on 10.11.2019.
 */
const DomElement = function (selector, height, width, bg, fontSize, text) {
  this.selector = selector;
  this.height = height;
  this.width = width;
  this.bg = bg;
  this.fontSize = fontSize;
  this.text = text;
};

DomElement.prototype.createElement = function () {
  let style = 'height:' + this.height + '; width:'+ this.width + '; background-color:' + this.bg + '; font-size:' + this.fontSize + ';';
  if (this.selector[0] === '.'){
    let div = document.createElement('div');
    div.style.cssText = style;
    div.className = this.selector.slice(1);
    div.textContent = this.text;
    document.body.appendChild(div);
  }
  else if (this.selector[0] === '#'){
    let p = document.createElement('p');
    p.setAttribute( 'id', this.selector.slice(1));
    p.style.cssText = style;
    p.textContent = this.text;
    document.body.appendChild(p);
  }
};


const elemP = new DomElement ('#idName', '10%', '10%', 'grey', '1.2em', 'This is text for p element'),
      elemDiv = new DomElement ('.className', '300px', '300px', 'coral', '1.2em', 'This is text for div element');
elemP.createElement();
elemDiv.createElement();

const elemSquare = new DomElement('.square', '100px', '100px', 'green');
elemSquare.createElement();
const square = document.querySelector(elemSquare.selector);
square.style.position = 'absolute';

let x = 0,
    y = 0;

function www () {
  square.style.left = x + 'px';
  square.style.top = y + 'px';
}

document.addEventListener("keydown", move);
document.addEventListener("keydown", www);

function move(event) {
  if(event.keyCode === 37){
    x -= 10;
  }
  if (event.keyCode === 39){
    x += 10;
  }
  if (event.keyCode === 38){
    y -= 10;
  }
  if (event.keyCode === 40){
    y += 10;
  }
}

