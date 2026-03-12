const form = document.getElementById('item-form');
const input = document.getElementById('item-input');
const list = document.getElementById('item-list');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const itemText = input.value.trim();
    if(itemText) addItem(itemText);
    input.value = '';
});

function addItem(text) {
    const li = document.createElement('li');
    li.textContent = text;

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.onclick = () => {
        const newText = prompt("Edit item:", li.firstChild.textContent);
        if(newText) li.firstChild.textContent = newText;
    };

    const delBtn = document.createElement('button');
    delBtn.textContent = 'Delete';
    delBtn.onclick = () => li.remove();

    li.appendChild(editBtn);
    li.appendChild(delBtn);
    list.appendChild(li);
}