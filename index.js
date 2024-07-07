document.addEventListener('DOMContentLoaded', () => {
    const itemInput = document.getElementById('itemInput');
    const addButton = document.getElementById('addButton');
    const clearButton = document.getElementById('clearButton');
    const shoppingList = document.getElementById('shoppingList');
    let items = JSON.parse(localStorage.getItem('shoppingListItems')) || [];

    const updateLocalStorage = () => {
        localStorage.setItem('shoppingListItems', JSON.stringify(items));
    };

    const renderList = () => {
        shoppingList.innerHTML = '';
        items.forEach((item, index) => {
            const listItem = document.createElement('li');
            const textNode = document.createElement('span');
            textNode.textContent = item.name;
            listItem.appendChild(textNode);

            listItem.classList.toggle('purchased', item.purchased);

            const editButton = document.createElement('button');
            editButton.textContent = 'Edit';
            editButton.addEventListener('click', (e) => {
                e.stopPropagation();
                const newName = prompt('Edit item name:', item.name);
                if (newName) {
                    items[index].name = newName;
                    updateLocalStorage();
                    renderList();
                }
            });

            const markButton = document.createElement('button');
            markButton.textContent = 'Mark';
            markButton.addEventListener('click', (e) => {
                e.stopPropagation();
                items[index].purchased = !items[index].purchased;
                updateLocalStorage();
                renderList();
            });

            const clearItemButton = document.createElement('button');
            clearItemButton.textContent = 'Clear';
            clearItemButton.addEventListener('click', (e) => {
                e.stopPropagation();
                items.splice(index, 1);
                updateLocalStorage();
                renderList();
            });

            listItem.appendChild(editButton);
            listItem.appendChild(markButton);
            listItem.appendChild(clearItemButton);
            shoppingList.appendChild(listItem);
        });
    };

    addButton.addEventListener('click', () => {
        const newItem = itemInput.value.trim();
        if (newItem) {
            items.push({ name: newItem, purchased: false });
            itemInput.value = '';
            updateLocalStorage();
            renderList();
        }
    });

    clearButton.addEventListener('click', () => {
        items = [];
        updateLocalStorage();
        renderList();
    });

    renderList();
});