const BODY = document.querySelector('body');
const BUTTONS = document.querySelector('#buttons');
const GRID_CONTAINER = document.querySelector('#grid');

const gridButton = generateButton('Grid Size', 'size-setter');
const DefaultGrid = generateGrid();

gridPrompt();

/**
 * Initiates a prompt after clicking the Grid Size button to set a new grid with a given number
 * @returns {void}
 */
function gridPrompt() {
  const btn = document.querySelector('#size-setter');

  btn.addEventListener('click', () => {
    let size = Number(
      window.prompt('What Size would you like for you grid?', 16)
    );

    if (size < 16 || size > 100) {
      return;
    } else {
      // Start with an empty grid
      clearGrid();
      generateGrid(size);
    }
  });

  return;
}

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
function clearGrid() {
  while (GRID_CONTAINER.firstChild) {
    GRID_CONTAINER.removeChild(GRID_CONTAINER.firstChild);
  }
}

/**
 * Creates and appends a new button element to the buttons container
 * @param {string} label - The text to display on the button
 * @param {string} buttonID - The ID to assign to the button
 * @returns {void}
 */
function generateButton(label, buttonID) {
  const buttonElement = document.createElement('button');
  const buttonText = document.createTextNode(`${label}`);

  buttonElement.setAttribute('type', 'button');
  buttonElement.setAttribute('id', `${buttonID}`);
  buttonElement.appendChild(buttonText);

  BUTTONS.appendChild(buttonElement);
}

/**
 * Adds an event listener to selected elements that modifies their classes
 * @param {string} targetElement - CSS selector for the target elements
 * @param {string} eventName - Name of the event to listen for (e.g., 'mouseenter')
 * @param {string} className - Class name to add when the event occurs
 * @returns {void}
 */

function addEventEffect(targetElement, eventName, className) {
  // Get a node list of the target elements
  const elements = document.querySelectorAll(targetElement);

  // Adds the event listener on every element
  elements.forEach(element => {
    // The event adds a class to  the cell
    element.addEventListener(eventName, () => element.classList.add(className));
  });
}
