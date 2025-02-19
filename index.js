const BODY = document.querySelector('body');
const CONTAINER = document.querySelector('#container');
const grid = generateGrid(16);
addHoverEffect();

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

function addHoverEffect() {
  const cells = document.querySelectorAll('.cell');

  // Adds the event listener on every cell
  // the event is a mouseenter
  cells.forEach(cell => {
    // The event adds a class and paints the cell
    cell.addEventListener('mouseenter', () => cell.classList.add('painted'));
  });
}
