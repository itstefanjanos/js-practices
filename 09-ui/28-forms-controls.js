// https://javascript.info/form-elements

// 1

document.getElementById('genres').value;
document.getElementById('genres').options.find(option => option.selected).innerText;

document.getElementById('genres').insertAdjacentHTML('beforeend', '<option value="classic">Classic</option>');

document.getElementById('genres').lastElementChild.selected = true;

// https://javascript.info/focus-blur

// 1

const view = document.getElementById('view');
const viewTempContainer = document.createElement('div');
view.addEventListener('click', event => {
  const textArea = document.createElement('textarea');
  const blurEventHandler = event => {
          view.innerHTML = event.target.value;
          event.target.insertAdjacentElement('afterend', view);
          event.target.remove();
        };
  textArea.value = view.innerHTML;

  textArea.classList.add('edit');

  view.insertAdjacentElement('afterend', textArea);
  viewTempContainer.append(view);
  textArea.focus();
  textArea.addEventListener('blur', blurEventHandler);
});

// 2

// 28-focus-blur-2-index.html
// 28-focus-blur-2-bagua.css

// my code
// 28-focus-blur-2-my.css
// 28-focus-blur-2-script.js

// 3

const mouse = document.getElementById('mouse');
    mouse.tabIndex = 1;
    mouse.style.position = 'fixed';
    mouse.addEventListener('click', () => {
      mouse.focus();
    });
    mouse.addEventListener('keydown', event => {
      Object.assign(event.target.style, 
        ((style) => ({top: `${style.top}px`, left: `${style.left}px`}))(
          ((eventCode, target) => 
            ({ 
              ArrowLeft: {
                top: target.offsetTop, 
                left: target.offsetLeft - target.offsetWidth
              },
              ArrowRight: {
                top: target.offsetTop, 
                left: target.offsetLeft + target.offsetWidth
              },
              ArrowUp: {
                top: target.offsetTop - target.offsetHeight, 
                left: target.offsetLeft
              },
              ArrowDown: {
                top: target.offsetTop + target.offsetHeight, 
                left: target.offsetLeft
              }}
            )[eventCode]
          )(event.code, event.target)
        )
      );
    });

// https://javascript.info/events-change-input

// 1

  const form = document.forms.calculator;
  const moneyBefore = document.getElementById('money-before');
  const moneyAfter = document.getElementById('money-after');
  const heightAfter = document.getElementById('height-after');
  const refreshCalculator = () => {
    if (!form.money.value || !form.interest.value || !form.months.value) {
      return;
    }
    const result = Math.round(form.money.value * (1 + form.interest.value / 100) ** (form.months.value / 12));
    moneyBefore.innerText = form.money.value;
    moneyAfter.innerText = result;
    heightAfter.style.height = `${Math.round(result / form.money.value * 100)}px`;
  };

  form.addEventListener('input', event => {
    refreshCalculator();
  });
  refreshCalculator();

// https://javascript.info/forms-submit

const promptFormContainer = document.getElementById('prompt-form-container');
const showButton = document.getElementById('show-button');
const resetPrompt = (clickEvent, selectEvent) => {
  promptFormContainer.hidden = true;
  document.body.style.overflow = '';
  promptFormContainer.removeEventListener('click', clickEvent);
  promptFormContainer.removeEventListener('selectstart', selectEvent);
};
const showPrompt = (messageHTML, callback) => {
  const promptMessage = document.getElementById('prompt-message');
  const clickEvent = event => {
    event.preventDefault();
    if (event.target.tagName === 'INPUT' && event.target.type === 'submit' && document.forms[0].text.value) {
        callback(document.forms[0].text.value);
        resetPrompt(clickEvent, selectEvent);
    } else if (event.target.tagName === 'INPUT' &&event.target.value === 'Cancel') {
        callback(null);
        resetPrompt(clickEvent, selectEvent);
    }
  };
  const selectEvent = event => {
    if (event.target.nodeType === 1 && !event.target.closest('#prompt-form')) {
      event.preventDefault(clickEvent, selectEvent);
    }
  };

  document.forms[0].text.focus();
  promptFormContainer.hidden = false;

  document.body.style.overflow = 'hidden';
  promptMessage.innerHTML = messageHTML;
  promptFormContainer.addEventListener('click', clickEvent);
  promptFormContainer.addEventListener('selectstart', selectEvent);
};
promptFormContainer.hidden = true;
promptFormContainer.style.backgroundColor = '#aaa7';

showButton.addEventListener('click' , () => {
  showPrompt("Enter something<br>...smart :)", function(value) {
    alert(value);
  });
});