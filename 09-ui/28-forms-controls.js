// https://javascript.info/form-elements

// 1

document.getElementById('genres').value;
document.getElementById('genres').options.find(option => option.selected).innerText;

document.getElementById('genres').insertAdjacentHTML('beforeend', '<option value="classic">Classic</option>');

document.getElementById('genres').lastElementChild.selected = true;

// https://javascript.info/focus-blur

// 1

const view = document.getElementById('view'),
          viewTempContainer = document.createElement('div');
    view.addEventListener('click', event => {
      const textArea = document.createElement('textarea'),
            blurEventHandler = event => {
              view.innerHTML = event.target.value;
              event.target.insertAdjacentElement('afterend', view);
              event.target.remove();
            }
      textArea.value = view.innerHTML;

      textArea.classList.add('edit');

      view.insertAdjacentElement('afterend', textArea);
      viewTempContainer.append(view);
      textArea.focus();
      textArea.addEventListener('blur', blurEventHandler);
    });

// 2

//my.css

/*.edit-area {
    border: 0;
    margin: 0;
    padding: 0;
    display: block;
    resize: none;
    outline: none;
    overflow: auto;
}
.edit-td {
  position: relative;
  padding: 0;
  margin: 0;
}
.edit-controls {
  position: absolute;
}*/

let table = document.getElementById('bagua-table');

const clickEvent = event => {
  if (event.target.tagName === 'TD') {
    const textArea = document.createElement('textarea'),
          clickTarget = event.target,
          content = clickTarget.innerHTML,
          editControls = document.createElement('div'),
          okButton = document.createElement('button'),
          cancelButton = document.createElement('button');
    textArea.value = content;
    
    clickTarget.classList.add('edit-td');
    textArea.classList.add('edit-area');
    
    textArea.style.height = `${clickTarget.offsetHeight}px`;
    textArea.style.width = `${clickTarget.offsetWidth}px`;
    textArea.value = content;
    clickTarget.innerHTML = '';
    clickTarget.append(textArea);
    editControls.classList.add('edit-controls');
    okButton.classList.add('edit-ok');
    okButton.innerText = 'OK';
    cancelButton.classList.add('edit-cancel');
    cancelButton.innerText = 'CANCEL';
    editControls.append(okButton);
    editControls.append(cancelButton);
    table.removeEventListener('click', clickEvent);
    const okEvent = () => {
      resetElement(textArea.value);
    }, cancelEvent = () => {
      resetElement(content);
    }, resetEvents = () => {
      table.addEventListener('click', clickEvent);
      okButton.removeEventListener('click', okEvent);
      cancelButton.removeEventListener('click', cancelEvent);
    }, resetElement = (innerHTML) => {
      clickTarget.classList.remove('edit-td');
      clickTarget.innerHTML = innerHTML;
      resetEvents();
    };
    okButton.addEventListener('click', okEvent);
    cancelButton.addEventListener('click', cancelEvent);
    event.target.append(editControls);

  }
};

table.addEventListener('click', clickEvent);

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

const form = document.forms.calculator,
          moneyBefore = document.getElementById('money-before'),
          moneyAfter = document.getElementById('money-after'),
          heightAfter = document.getElementById('height-after'),
          refreshCalculator = () => {
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

//https://javascript.info/forms-submit

const promptFormContainer = document.getElementById('prompt-form-container'),
          showButton = document.getElementById('show-button'),
          resetPrompt = (clickEvent, selectEvent) => {
            promptFormContainer.hidden = true;
            document.body.style.overflow = '';
            promptFormContainer.removeEventListener('click', clickEvent);
            promptFormContainer.removeEventListener('selectstart', selectEvent);
          },
          showPrompt = (messageHTML, callback) => {
            const promptMessage = document.getElementById('prompt-message'),
                  clickEvent = event => {
                    event.preventDefault();
                    if (event.target.tagName === 'INPUT' && event.target.type === 'submit' && document.forms[0].text.value) {
                        callback(document.forms[0].text.value);
                        resetPrompt(clickEvent, selectEvent);
                    } else if (event.target.tagName === 'INPUT' &&event.target.value === 'Cancel') {
                        callback(null);
                        resetPrompt(clickEvent, selectEvent);
                    }
                  }, selectEvent = event => {
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