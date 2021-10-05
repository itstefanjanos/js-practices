let table = document.getElementById('bagua-table');

const resetEvents = (table, ok, cancel, clickEvent) => {
  table.addEventListener('click', clickEvent);
  ok.button.removeEventListener('click', ok.event);
  cancel.button.removeEventListener('click', cancel.event);
};

const getEditableTextArea = ({offsetHeight, offsetWidth}, content) => {
  const textArea = document.createElement('textarea');
  textArea.classList.add('edit-area');

  textArea.style.height = `${offsetHeight}px`;
  textArea.style.width = `${offsetWidth}px`;
  textArea.value = content;
  return textArea;
};

const replaceToTextArea = (target, textArea) => {
  target.innerHTML = '';
  target.append(textArea);
};

const resetElement = (target, innerHTML, ok, cancel) => {
  target.classList.remove('edit-td');
  target.innerHTML = innerHTML;
  resetEvents(table, ok, cancel, clickEvent);
};

const getButtonAndEvent = (caption, target, getReturnText, getOkObject, getCancelObject) => {
  const button = document.createElement('button');
  button.classList.add(`edit-${caption}`);
  button.innerText = caption.toUpperCase();
  
  const event = () => {
    resetElement(target, getReturnText(), getOkObject(), getCancelObject());
  };
  
  button.addEventListener('click', event);
  return {button, event};
};

const getEditControls = (target, textArea, content, clickEvent) => {
  const editControls = document.createElement('div');
  editControls.classList.add('edit-controls');
  let ok = null;
  let cancel = null;
  ok = getButtonAndEvent('ok', target, () => textArea.value, () => ok, () => cancel);
  cancel = getButtonAndEvent('cancel', target, () => content, () => ok, () => cancel);
  editControls.append(ok.button);
  editControls.append(cancel.button);
  return editControls;
};

const clickEvent = event => {
  if (event.target.tagName === 'TD') {
    const clickTarget = event.target;
    const content = clickTarget.innerHTML;

    clickTarget.classList.add('edit-td');
    
    const textArea = getEditableTextArea(clickTarget, content);
  
    replaceToTextArea(clickTarget, textArea);

    table.removeEventListener('click', clickEvent);
    
    clickTarget.append(getEditControls(clickTarget, textArea, content, clickEvent));
  }
};

table.addEventListener('click', clickEvent);