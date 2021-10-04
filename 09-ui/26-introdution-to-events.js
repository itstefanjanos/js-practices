// 1

document.getElementById('hider').addEventListener('click', () => {
    document.getElementById('text').style.display = 'none';
});

// 2

document.getElementById('hider').addEventListener('click', function (){
    this.style.display = 'none';
});

// 3

// 1, 2

// 4

// 26-introduction-browser-events-4.html

// 5

// 26-introduction-browser-events-5.html

// 6

// 26-introduction-browser-events-6.css
// 26-introduction-browser-events-6.html

// 7

// 26-introduction-browser-events-7.css
// 26-introduction-browser-events-7.html

// https://javascript.info/event-delegation

// 1

document.addEventListener('click', event => {
    if (event.target.tagName === 'BUTTON' && event.target.classList.contains('remove-button')) {
      event.target.parentElement.remove();
    }
});

// 2

// 26-event-delegation-2.html

// 3

const grid = document.getElementById('grid');
grid.addEventListener('click', event => {
    if (event.target.tagName === 'TH') {
        const sortedRows = [...grid.querySelectorAll('tbody tr')].
            sort(
                (firstElement, secondElement) => 
                event.target.dataset.type === 'number'
                    ? parseInt(firstElement.children[event.target.cellIndex].innerText.trim())
                        - parseInt(secondElement.children[event.target.cellIndex].innerText.trim()) 
                    : firstElement.children[event.target.cellIndex].innerText
                        .localeCompare(secondElement.children[event.target.cellIndex].innerText)),
                gridBody = grid.tBodies[0];
        gridBody.append(...sortedRows);
    
    }
});

// 4

document.addEventListener('mouseover', event => {
    if (event.target.dataset.tooltip !== undefined) {
      const tooltip = document.createElement('div');
      tooltip.innerHTML = event.target.dataset.tooltip;
      tooltip.classList.add('tooltip');
      event.target.insertAdjacentElement('beforebegin', tooltip);
      const top = Math.max(0, event.target.offsetTop - tooltip.offsetHeight - 5);
      const left = Math.max(0, event.target.offsetLeft + event.target.offsetWidth / 2 - tooltip.offsetWidth / 2);
      tooltip.style.top = `${top}px`;
      tooltip.style.left = `${left}px`;
    }
  });
  document.addEventListener('mouseout', event => {
    if (event.target.dataset.tooltip !== undefined) {
      event.target.previousSibling.remove();
    }
  });

// https://javascript.info/default-browser-action

// 1

// 26-default-browser-action-1.html

// 2

document.getElementById('contents').addEventListener('click', event => {
    const anchor = event.path.find(element => element.tagName === 'A');

    if (anchor !== undefined && !confirm(`Leave for ${anchor.origin}?`)) {
      event.preventDefault();
    }
    
});

// 3

document.getElementById('thumbs').addEventListener('click', event => {
    const imageAnchor = event.path.find(element => element.tagName === 'A');
    if (imageAnchor !== undefined) {
      event.preventDefault();
      document.getElementById('largeImg').src = imageAnchor.href;
      document.getElementById('largeImg').alt = imageAnchor.title;
    }
});