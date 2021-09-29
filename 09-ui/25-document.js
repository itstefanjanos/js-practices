// https://javascript.info/dom-navigation

// 1

document.body.firstElementChild;

document.body.lastElementChild;

document.body.lastElementChild.lastElementChild;

// 2

//Is it true that elem.lastChild.nextSibling is always null? -> True, because lastChild and nextSibling returns DOM Node
//Is it true that elem.children[0].previousSibling is always null ? False, because children is an HTMLCollection (element collection). If the elem contains non-element nodes The elem.children[0].previousSibling won't be null.

// 3

Array.from(document.body.firstElementChild.rows).forEach((row, index) => row.children[index].style.background = 'red');

// https://javascript.info/searching-elements-dom

// 1

document.getElementById('age-table');

// 2

document.querySelectorAll('#age-table label');

// 3

document.querySelector('#age-table td:first-of-type');

// 4

document.querySelector('form[name=search]');

// 5

document.querySelector('form[name=search] input');

// 6
const inputs = document.querySelectorAll('form[name=search] input');
inputs[inputs.length - 1];

// https://javascript.info/basic-dom-node-properties

// 1

const outputElement = document.createElement('p');
outputElement.innerText = Array.from(
    document.getElementsByTagName('li'),
    node => `${node.firstChild.data.trim()}:  ${node.getElementsByTagName('li').length}`
).join('\n');
document.body.append(outputElement);

// 2

// script element nodeType is 1

// 3

// BODY

// 4

// HTMLDocument

// EventTarget -> Node -> Document -> HTMLDocument

// Inherits from Node

// https://javascript.info/dom-attributes-and-properties

// 1

console.log(document.querySelector('[data-widget-name]').dataset.widgetName)

// 2

document.querySelectorAll('a[href*="://"]:not(a[href^="http://internal.com"])').forEach(element => element.style.color = 'orange');

// https://javascript.info/modifying-document

// 1

// 1, 3

// 2

function clear(elem) {
    elem.innerHTML = '';
}

// 3

// Don't allow nested text element inside of table element and the browser is moved to it before table element.

// 4

const list = document.createElement('ul');
document.body.append(list);

for (let listItem; listItem = prompt('content');) {
    const listElement = document.createElement('li');
    listElement.innerText = listItem;
    list.append(listElement);
}


// 5

function createTree(container, data) {
    const rootElement = document.createElement('ul');
    container.append(rootElement);
    for(let [key, value] of Object.entries(data)) { 
        const keyElement = document.createElement('li');
        keyElement.innerText = key;
        rootElement.append(keyElement);
        if (Object.keys(value).length > 0) {
            createTree(keyElement, value);
        }
    }
}

// 6

Array.from(document.getElementsByTagName('li')).forEach(node => {
    const descendantsCount = node.getElementsByTagName('li').length;
    node.firstChild.data = `${node.firstChild.data.trim()} ${descendantsCount?`[${descendantsCount}]`:''}`;
    });

// 7

function createCalendar(elem, year, month) {
    const daysInMounth = new Date(year,month, 0).getDate();
    const days = ['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU'];
    const dayOfFirstDay = (new Date(year, month - 1, 1).getDay() + 6) % 7;
    const numberOfWeeks = Math.ceil((dayOfFirstDay + daysInMounth) / 7);
    const numberOfCells = (numberOfWeeks + 1) * 7;
    const table = document.createElement('table');
    elem.append(table);
    for(let day = 0, rowElement, dayElement; day < numberOfCells; day++) {
      if ((day % 7) === 0) {
        rowElement = document.createElement('tr');
        table.append(rowElement);
      }
      if (day < 7) {
        dayElement = document.createElement('th');
        dayElement.innerText = days[day];
        rowElement.append(dayElement);
      } else {
        dayElement = document.createElement('td');
        dayElement.innerText = (day - dayOfFirstDay - 7) < 0
            ? '' 
            : (day - dayOfFirstDay - 6) > daysInMounth 
                ? '' 
                : (day - dayOfFirstDay - 6);
        rowElement.append(dayElement);
      }
    }
  }

// 8

// 25-modifying-document-8.html


// 9

document.getElementById('one').insertAdjacentHTML('afterend', '<li>2</li><li>3</li>');

// 10

  const tbody = document.getElementsByTagName('tbody')[0];
  const sortedRows = [...tbody.children].sort((firstRow, secondRow) => {
      const firstName = firstRow.cells[0].innerText,
            secondName = secondRow.cells[0].innerText;
      if (firstName < secondName) {
          return -1;
      }
      if (firstName > secondName) {
          return 1;
      }
      return 0;
  });
  tbody.innerText = '';
  sortedRows.forEach(row => tbody.append(row));

// https://javascript.info/styles-and-classes

function showNotification({top = 0, right = 0, className, html}) {
    const notification = document.createElement('div');
    
    notification.classList.add('notification');
    if (className) {
      notification.classList.add(className);
    }
    
    notification.style.top = `${top}px`;
    notification.style.right = `${right}px`;
    notification.innerHTML = html;
    document.body.prepend(notification);
    setTimeout(() => {
      notification.remove();
    }, 1500);
}

// https://javascript.info/size-and-scroll

// 1

const scrollBottol = elem => elem.scrollHeight - elem.scrollTop - elem.clientHeight;

// 2

const div = document.createElement('div');

div.style.width = '50px';
div.style.height = '50px';
div.style.overflowY = 'scroll';

document.body.append(div);

console.log(div.offsetWidth - div.clientWidth);

div.remove();

// 3

const field = document.getElementById('field'),
          ball = document.getElementById('ball');
    
    ball.style.top = `${(field.clientHeight - ball.height) / 2}px`;
    ball.style.left = `${(field.clientWidth - ball.width) / 2}px`;

// https://javascript.info/coordinates

// 1

const field = document.getElementById('field');
const coordinates = field.getBoundingClientRect();
console.log(coordinates.left, coordinates.top);
console.log(coordinates.right, coordinates.bottom);

console.log(coordinates.left + field.clientLeft, coordinates.top + field.clientTop);
console.log(coordinates.left + field.clientLeft + field.clientWidth, coordinates.top + field.clientTop + field.clientHeight);

// 2, 3

function positionAt(anchor, position, elem) {
  const coordinates = anchor.getBoundingClientRect();
  elem.style.left = 
    `${(position === 'top' || position === 'bottom')?coordinates.x:coordinates.x + anchor.offsetWidth}px`;
  elem.style.top = 
    `${(position === 'top')?coordinates.y - elem.offsetHeight:
    (position === 'bottom')?coordinates.bottom:coordinates.y}px`;
}

// 4

function positionAt(anchor, positions, elem) {
  const [position,inOrOut] = positions.split('-');
  const coordinates = anchor.getBoundingClientRect();
  elem.style.left = 
    `${(position === 'top' || position === 'bottom')?coordinates.x:coordinates.x + anchor.offsetWidth - ((inOrOut === 'in') * elem.offsetWidth)}px`;
  elem.style.top = 
    `${(position === 'top')?coordinates.y - ((inOrOut === 'out') * elem.offsetHeight):
    (position === 'bottom')?coordinates.bottom - ((inOrOut === 'in') * elem.offsetHeight):coordinates.y}px`;
}

