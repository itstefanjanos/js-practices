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