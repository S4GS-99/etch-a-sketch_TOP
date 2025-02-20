const BODY = document.querySelector('body');
const BUTTONS = document.querySelector('#buttons');
const GRID_CONTAINER = document.querySelector('#grid');

const DefaultGrid = generateGrid();
const gridButton = generateButton('Grid Size', 'size-setter');
const clearButton = generateButton('Clear Grid', 'clear');
const randomButton = generateButton('Random Colors', 'random');

gridButton.addEventListener('click', () => {
  let size = Number(
    window.prompt('What Size would you like for you grid?', 16)
  );

  if (size < 16 || size > 100) {
    return;
  } else {
    // Start with an empty grid
    emptyGrid();
    generateGrid(size);
  }
});

clearButton.addEventListener('click', clearGrid);

randomButton.addEventListener('click', () => {
  randomButton.classList.toggle('active');
  updatePaintingMode();
});

/**
 * Generates a grid of cells with the specified size
 * @param {number} [size=16] - The size of the grid (size x size)
 * @returns {void}
 */
function generateGrid(size = 16) {
  // Generate the columns
  for (let column = 1; column <= size; column++) {
    const colElement = document.createElement('div');
    colElement.classList.add(`column`);
    colElement.setAttribute('col-number', `${column}`);
    // Generate the cells for every column
    for (let cell = 1; cell <= size; cell++) {
      const cellElement = document.createElement('div');
      cellElement.classList.add('cell');
      cellElement.setAttribute('cel-number', `${cell}`);
      colElement.appendChild(cellElement);
    }

    GRID_CONTAINER.appendChild(colElement);
  }

  addEventEffect('.cell', 'mouseenter', 'painted');
  return;
}

/**
 * Removes all child elements from the grid container
 * @returns {void}
 */
function emptyGrid() {
  while (GRID_CONTAINER.firstChild) {
    GRID_CONTAINER.removeChild(GRID_CONTAINER.firstChild);
  }
}

/**
 * Clear the painted cells on the grid
 * @returns {void}
 */
function clearGrid() {
  const cells = document.querySelectorAll('.cell');

  cells.forEach(cell => {
    cell.classList.remove('painted');
    cell.style.backgroundColor = '';
  });
}

/**
 * Creates and appends a new button element to the buttons container
 * @param {string} label - The text to display on the button
 * @param {string} buttonID - The ID to assign to the button
 * @returns {node} DOM element created
 */
function generateButton(label, buttonID) {
  const buttonElement = document.createElement('button');
  const buttonText = document.createTextNode(`${label}`);

  buttonElement.setAttribute('type', 'button');
  buttonElement.setAttribute('id', `${buttonID}`);
  buttonElement.appendChild(buttonText);

  BUTTONS.appendChild(buttonElement);

  return document.querySelector(`#${buttonID}`);
}

/**
 * Adds an event listener to selected elements that modifies their classes
 * @param {string} targetElement - CSS selector for the target elements
 * @param {string} eventName - Name of the event to listen
 * @returns {void}
 */
function addEventEffect(targetElement, eventName) {
  // Get a node list of the target elements
  const elements = document.querySelectorAll(targetElement);

  elements.forEach(element => {
    element.addEventListener(eventName, classicPaint);
  });
}

/**
 * Updates the painting mode for all cells based on the state of the random button.
 * Removes existing event listeners for 'mouseenter' events and adds the appropriate
 * event listener (classicPaint or randomPaint) depending on whether the random button
 * is active.
 */
function updatePaintingMode() {
  const cells = document.querySelectorAll('.cell');
  const isRandom = randomButton.classList.contains('active');

  cells.forEach(cell => {
    cell.removeEventListener('mouseenter', classicPaint);
    cell.removeEventListener('mouseenter', randomPaint);

    if (isRandom) {
      cell.addEventListener('mouseenter', randomPaint);
    } else {
      cell.addEventListener('mouseenter', classicPaint);
    }
  });
}

/**
 * Paints the cell with a fixed color
 */
function classicPaint() {
  this.classList.add('painted');
}

/**
 * Paints the cell with a random color
 */
function randomPaint() {
  this.classList.add('painted');
  this.style.backgroundColor = getRandomColor();
}

/**
 * Generates a random RGB color string
 * @returns {string} RGB color in format 'rgb(r, g, b)'
 */
function getRandomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}
