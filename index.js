const BODY = document.querySelector('body');
const BUTTONS = document.querySelector('.options');
const CONTAINER = document.querySelector('.container');

const gridButton = generateButton('Grid Size', 'size-setter');
const grid = generateGrid(16);

addEventEffect('.cell', 'mouseenter', 'painted');

function generateGrid(size) {
  for (let column = 1; column <= size; column++) {
    const colElement = document.createElement('div');
    colElement.classList.add(`column`);
    colElement.setAttribute('col-number', `${column}`);

    for (let cell = 1; cell <= size; cell++) {
      const cellElement = document.createElement('div');
      cellElement.classList.add('cell');
      cellElement.setAttribute('cel-number', `${cell}`);
      colElement.appendChild(cellElement);
    }

    CONTAINER.appendChild(colElement);
  }

  return;
}

function generateButton(label, buttonID) {
  const buttonElement = document.createElement('button');
  const buttonText = document.createTextNode(`${label}`);

  buttonElement.setAttribute('type', 'button');
  buttonElement.setAttribute('id', `${buttonID}`);
  buttonElement.appendChild(buttonText);

  BUTTONS.appendChild(buttonElement);
}

function addEventEffect(targetElement, eventName, className) {
  // Get a node list of the target elements
  const elements = document.querySelectorAll(targetElement);

  // Adds the event listener on every element
  elements.forEach(element => {
    // The event adds a class to  the cell
    element.addEventListener(eventName, () => element.classList.add(className));
  });
}
