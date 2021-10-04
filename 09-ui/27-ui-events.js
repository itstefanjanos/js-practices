// https://javascript.info/mouse-events-basics

// 1
  const ul = document.getElementById('ul');
  let lastTarget = null;
  const selectListItem = (ul, target) => {
    [...ul.children].forEach(element => {
      if (element !== target) {
        element.classList.remove('selected');
      } else {
        element.classList.add('selected');
      }
    });
  };
  const selectListItems = (ul, target, lastTarget) => {
    const targetIndex = [...ul.children].findIndex(element => element === target);
    const lastTargetIndex = Math.max(0, [...ul.children].findIndex(element => element === lastTarget));
    [...ul.children].forEach((element, index) => {
      if ((targetIndex >= index && lastTargetIndex <=  
          index && targetIndex >= lastTargetIndex) || (targetIndex <= index && lastTargetIndex >=  
          index && targetIndex <= lastTargetIndex)) {
        element.classList.add('selected');
      } else {
        element.classList.remove('selected');
      }
    });
  };
  ul.addEventListener('mousedown', event => {
    event.preventDefault();
  });
  ul.addEventListener('click', event => {
    if (event.target.tagName === 'LI') {
      if((event.ctrlKey || event.metaKey) && !event.shiftKey // Ctrl || meta
          && !event.altKey) {
        event.target.classList.toggle('selected');
      } else if(!event.ctrlKey && !event.metaKey && // without modifiers
          !event.shiftKey && !event.altKey) {
        selectListItem(ul, event.target);
      } else if (!event.ctrlKey && !event.metaKey && //shift
          event.shiftKey && !event.altKey) {
        selectListItems(ul, event.target, lastTarget);
      }
      lastTarget = event.target;
    }
  })

// https://javascript.info/mousemove-mouseover-mouseout-mouseenter-mouseleave

// 1

document.addEventListener('mouseover', event => {
    const tooltipTarget = event.target.closest('[data-tooltip]');
    if (tooltipTarget !== null) {
      const tooltip = document.createElement('div');
      tooltip.innerHTML = tooltipTarget.dataset.tooltip;
      tooltip.classList.add('tooltip');
      tooltipTarget.insertAdjacentElement('beforebegin', tooltip);
      const top = Math.max(0, tooltipTarget.offsetTop - tooltip.offsetHeight - 5);
      const left = Math.max(0, tooltipTarget.offsetLeft + tooltipTarget.offsetWidth / 2 - tooltip.offsetWidth / 2);
      tooltip.style.top = `${top}px`;
      tooltip.style.left = `${left}px`;
    }
  });
  document.addEventListener('mouseout', event => {
    const tooltipTarget = event.target.closest('[data-tooltip]');
    if (tooltipTarget.dataset.tooltip !== undefined) {
      tooltipTarget.previousSibling.remove();
    }
  });

// https://javascript.info/mouse-drag-and-drop

// 1

    const slider = document.getElementById('slider');
    const thumb = document.getElementsByClassName('thumb')[0];
    thumb.addEventListener('mousedown', (event) => {
      const shiftX = event.clientX - thumb.offsetLeft;
      const mouseMove = event => {
        thumb.style.left = `${Math.max(0, Math.min(slider.offsetWidth - thumb.offsetWidth, event.clientX - shiftX - slider.offsetLeft))}px`;
      }, mouseUp = event => {
        document.removeEventListener('mousemove', mouseMove);
        document.removeEventListener('mouseup', mouseUp);
      };
      document.addEventListener('mousemove', mouseMove);
      document.addEventListener('mouseup', mouseUp); 
    });

    thumb.ondragstart = function() {
      return false;
    };


// https://javascript.info/keyboard-events

// 1

function runOnKeys(callback, ...codes) {
    const pressedKeys = {};
    document.addEventListener('keydown', event => {
        pressedKeys[event.code] = true;
        if (codes.every(code => pressedKeys[code]) &&
            Object.keys(pressedKeys).every(code => codes.includes(code) === pressedKeys[code])) {
                Object.keys(pressedKeys).forEach(code => pressedKeys[code] = false);
                callback();
        }
    });
    document.addEventListener('keyup', event => {
        pressedKeys[event.code] = false;
    });
}

runOnKeys(
    () => alert("Hello!"),
    "KeyQ",
    "KeyW"
);