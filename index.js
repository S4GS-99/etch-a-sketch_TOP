const BODY = document.querySelector('body');
const MAIN = document.querySelector('main');
const GRID_PARENT = document.querySelector('#grid-parent');
const GRID_CONTAINER = document.querySelector('#grid');

const gridButtons = generateSection('grid-buttons');
const grid = generateGrid();
const paintButtons = generateSection('paint-buttons');
const gridButton = generateButton(gridButtons, 'Grid Size', 'size-setter');
const clearButton = generateButton(gridButtons, 'Clear Grid', 'clear');
const randomButton = generateButton(paintButtons, 'Random Colors', 'random');
const shadeButton = generateButton(paintButtons, 'Shade', 'shade');

let isMouseDown = false;

// Toggling paint buttons class
onPaintButtonClick(randomButton);
onPaintButtonClick(shadeButton);

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
// Prevents text selection while drawing
MAIN.addEventListener('mousedown', e => {
  e.preventDefault();
});

// This allows to paint by holding a mouse button and not just hovering over the cells
document.addEventListener('pointerdown', () => (isMouseDown = true));
document.addEventListener('pointerup', () => (isMouseDown = false));

/**
 * Generates a grid of cells with the specified size
 * @param {number} [size=16] - The size of the grid (size x size)
 * @returns {number} The size of the generated grid.
 */
function generateGrid(size = 16) {
  // Generate the columns
  for (let column = 1; column <= size; column++) {
    const colElement = document.createElement('div');
    colElement.setAttribute('col-number', `${column}`);
    colElement.classList.add(`column`);
    // Generate the cells for every column
    for (let cell = 1; cell <= size; cell++) {
      const cellElement = document.createElement('div');
      cellElement.setAttribute('cel-number', `${cell}`);
      cellElement.setAttribute('paint-type', 'none');
      cellElement.setAttribute('data-darkness', 0);
      cellElement.classList.add('cell');

      colElement.appendChild(cellElement);
    }

    GRID_CONTAINER.appendChild(colElement);
  }

  addDefaultPaint();
  return size;
}

/**
 * Generates a section element with the specified ID and appends it to the DOM.
 * The section element will have the classes 'buttons' and 'container'.
 *
 * @param {string} sectionID - The ID to be assigned to the generated section element.
 * @returns {HTMLElement} The newly created section element.
 */
function generateSection(sectionID) {
  const sectionElement = document.createElement('div');
  sectionElement.setAttribute('id', `${sectionID}`);
  sectionElement.classList.add('buttons', 'container');

  if (sectionID === 'grid-buttons') {
    MAIN.insertBefore(sectionElement, GRID_PARENT);
  } else if (sectionID === 'paint-buttons') {
    MAIN.appendChild(sectionElement);
  }

  return document.querySelector(`#${sectionID}`);
}

/**
 * Creates and appends a new button element to the buttons container
 * @param {string} label - The text to display on the button
 * @param {string} buttonID - The ID to assign to the button
 * @param {string} buttonClass - The classes to assign to the button
 * @returns {node} DOM element created
 */
function generateButton(section, label, buttonID, buttonClass) {
  const buttonElement = document.createElement('button');
  const buttonText = document.createTextNode(`${label}`);

  buttonElement.setAttribute('type', 'button');
  buttonElement.setAttribute('id', `${buttonID}`);
  buttonElement.appendChild(buttonText);

  section.appendChild(buttonElement);

  return document.querySelector(`#${buttonID}`);
}

function addPointerDownListener(cell, callback) {
  cell.addEventListener('pointerdown', e => {
    e.preventDefault(); // Prevents dragging behaviour
    isMouseDown = true;

    // Check if it's shade paint to handle progressive darkening
    if (
      callback === shadePaint &&
      e.target.getAttribute('paint-type') === 'shade'
    ) {
      const currentDarkness =
        parseInt(e.target.getAttribute('data-darkness')) || 0;
      if (currentDarkness < 10) {
        callback.call(e.target);
      }
    } else {
      callback.call(e.target);
    }
  });
}

/**
 * Adds an event listener to selected elements that modifies their classes
 * @returns {void}
 */
function addDefaultPaint() {
  // Get a node list of the target elements
  const cells = document.querySelectorAll('.cell');

  cells.forEach(cell => {
    cell.addEventListener('mouseenter', classicPaint);
    addPointerDownListener(cell, classicPaint);
  });
}

/**
 * Attaches a click event listener to the specified paint button.
 * When the button is clicked, it toggles the button state and updates the painting mode.
 *
 * @param {HTMLElement} typeOfPaint - The paint button element to attach the click event listener to.
 */
function onPaintButtonClick(typeOfPaint) {
  typeOfPaint.addEventListener('click', () => {
    toggleButtons(typeOfPaint);
    updatePaintingMode();
  });
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
    cell.setAttribute('paint-type', 'none');
    cell.setAttribute('data-darkness', 0);
    cell.style.backgroundColor = '';
  });
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

/**
 * Updates the painting mode for all cells based on the state of the random button.
 * Removes existing event listeners for 'mouseenter' events and adds the appropriate
 * event listener (classicPaint or randomPaint) depending on whether the random button
 * is active.
 * @returns {void}
 */
function updatePaintingMode() {
  const cells = document.querySelectorAll('.cell');
  const isRandom = randomButton.classList.contains('painting');
  const isShade = shadeButton.classList.contains('painting');

  cells.forEach(cell => {
    // Remove all existing event listeners by cloning the cell
    const newCell = cell.cloneNode(true);
    cell.parentNode.replaceChild(newCell, cell);

    // Add new listeners based on paint mode
    if (isRandom) {
      newCell.addEventListener('mouseenter', randomPaint);
      addPointerDownListener(newCell, randomPaint);
    } else if (isShade) {
      newCell.addEventListener('mouseenter', shadePaint);
      addPointerDownListener(newCell, shadePaint);
    } else {
      newCell.addEventListener('mouseenter', classicPaint);
      addPointerDownListener(newCell, classicPaint);
    }
  });
}

/**
 * Paints the cell with a fixed color
 * @returns {void}
 */
function classicPaint() {
  if (!isMouseDown) return;

  this.setAttribute('paint-type', 'classic');
  this.setAttribute('data-darkness', 10);
  this.style.backgroundColor = 'rgba(0, 0, 0, 1)';

  return this.style;
}

// function classicPaint() {
//   if (!isMouseDown) return;

//   const darknessLevel = this.getAttribute('data-darkness');

//   if (darknessLevel === 0) {
//     this.setAttribute('paint-type', 'classic');
//     this.style.backgroundColor = 'rgba(0, 0, 0, 1)';
//     this.setAttribute('data-darkness', 10);
//   } else {
//     this.setAttribute('paint-type', 'classic');
//     this.style.backgroundColor = 'rgba(0, 0, 0, 1)';
//   }

//   return this.style;
// }

/**
 * Paints the cell with a random color
 * @returns {void}
 */
function randomPaint() {
  if (!isMouseDown) return;

  this.setAttribute('paint-type', 'random');
  this.style.backgroundColor = getRandomColor();

  return this.style;
}

/**
 * Paints the cell with a progressively darker shade
 * @returns {void}
 */
function shadePaint() {
  if (!isMouseDown) return;

  this.setAttribute('paint-type', 'shade');
  let darkness = parseInt(this.getAttribute('data-darkness')) || 0;

  if (darkness < 10) {
    darkness++;
    const opacity = darkness * 0.1; // Increases opacity by 0.1 each time
    this.setAttribute('data-darkness', darkness);
    this.style.backgroundColor = `rgba(0, 0, 0, ${opacity})`;
  }

  return this.style;
}

/**
 * Toggles the 'painting' class on the clicked button and removes it from all other buttons.
 *
 * @param {HTMLElement} clicked - The button element that was clicked.
 */
function toggleButtons(clicked) {
  paintButtons.childNodes.forEach(button => {
    if (clicked === button) {
      button.classList.toggle('painting');
    } else {
      button.classList.remove('painting');
    }
  });
}
