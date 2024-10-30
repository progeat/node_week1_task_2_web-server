document.addEventListener('click', ({ target }) => {
  if (target.dataset.type === 'remove') {
    const id = target.dataset.id;

    remove(id).then(() => {
      target.closest('li').remove();
    });
  }

  if (target.dataset.type === 'edit') {
    const id = target.dataset.id;
    const itemEdit = target.closest('.list-group-item');
    const elementText = itemEdit.querySelector('.item-text');
    const currentText = elementText.textContent;
    const editedText = prompt('Введите новое значение...', currentText).trim();

    if (editedText) {
      updated(id, editedText).then(() => {
        elementText.textContent = editedText;
      });
    }
  }
});

async function updated(id, title) {
  await fetch(`/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify({ title }),
  });
}

async function remove(id) {
  await fetch(`/${id}`, { method: 'DELETE' });
}
