document.addEventListener('click', ({ target }) => {
  const item = target.closest('.list-group-item');

  if (item) {
    const id = item.getAttribute('id');

    if (target.dataset.type === 'remove') {
      remove(id).then(() => {
        target.closest('li').remove();
      });
    }

    if (target.dataset.type === 'edit') {
      getItemInnerForEdit(item);
    }

    if (target.dataset.type === 'edit-save') {
      const editedText = item.querySelector('.item-input').value.trim();

      if (editedText) {
        updated(id, editedText).then(() => {
          item.innerHTML = getItemInnerForDefault(editedText);
        });
      }
    }
  }
});

function getItemInnerForEdit(item) {
  const elementText = item.querySelector('.item-text');
  const currentText = elementText.textContent;
  const currentItemInner = item.innerHTML;

  item.innerHTML = `
    <input class="item-input" value="${currentText}"/>
    <div class="btn-wrapp">
      <button class="btn btn-success" data-type="edit-save">Сохранить</button>
      <button class="btn btn-danger btn-cancel">Отменить</button>
    </div>
  `;

  const buttonCancel = item.querySelector('.btn-cancel');

  buttonCancel.addEventListener('click', () => {
    item.innerHTML = currentItemInner;
  });
}

function getItemInnerForDefault(text) {
  return `
      <span class="item-text">${text}</span>
      <div class="btn-wrapp">
        <button class="btn btn-primary" data-type="edit">Обновить</button>
        <button class="btn btn-danger" data-type="remove">×</button>
      </div>
    `;
}

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
