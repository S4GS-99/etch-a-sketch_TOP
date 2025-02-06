const BODY = document.querySelector('body');
const CONTAINER = document.querySelector('#container');
const grid = generateGrid(16);

function generateGrid(size) {
  for (let column = 1; column < size; column++) {
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

console.log(document.querySelectorAll('.column'));
console.log(document.querySelectorAll('.cell'));
