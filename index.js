const BODY = document.querySelector('body');
const CONTAINER = document.querySelector('#container');
const grid = generateContainers(16);

function generateContainers(numOfContainers) {
  for (let i = 0; i < numOfContainers; i++) {
    const cell = document.createElement('div');
    cell.classList.add(`cell`);
    cell.setAttribute('cell-number', `${i + 1}`);
    CONTAINER.appendChild(cell);
  }

  return;
}

function listOfContainers(element, attribute) {
  return;
}
