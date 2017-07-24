const listData = [
  {name: "apples", checked: false},
  {name: "oranges", checked: false},
  {name: "milk", checked: true},
  {name: "bread", checked: false}
];

// ? Why do this instead of $('.js-shopping-list');
// ? Why do all of these this way instead of using the selector so it's just the variable name
const SHOPPING_LIST_ELEMENT_CLASS = ".js-shopping-list";

const NEW_ITEM_FORM_INPUT_CLASS = ".js-shopping-list-entry";
const ITEM_CHECKED_TARGET_IDENTIFIER = "js-shopping-item";
const ITEM_CHECKED_CLASS_NAME = "shopping-item__checked";
const ITEM_INDEX_ATTRIBUTE = "data-item-index";
const ITEM_INDEX_ELEMENT_IDENTIFIER = "js-item-index-element";
const ITEM_CHECKED_BUTTON_IDENTIFIER = "js-item-toggle";

const NEW_ITEM_FORM_IDENTIFIER = '#js-shopping-list-form';

function generateItemElement(item, itemIndex, template) {
  return `
    <li class="${ITEM_INDEX_ELEMENT_IDENTIFIER}" ${ITEM_INDEX_ATTRIBUTE}="${itemIndex}">
      <span class="shopping-item ${ITEM_CHECKED_TARGET_IDENTIFIER} ${item.checked ? ITEM_CHECKED_CLASS_NAME : ''}">${item.name}</span>
      <div class="shopping-item-controls">
        <button class="shopping-item-toggle ${ITEM_CHECKED_BUTTON_IDENTIFIER}">
            <span class="button-label">check</span>
        </button>
        <button class="shopping-item-delete js-item-delete">
            <span class="button-label">delete</span>
        </button>
      </div>
    </li>`;
}

// ? Why generate as a string rather than just append to the div
function generateShoppingItemsString(shoppingList) {
  console.log("Generating shopping list element");

  const items = shoppingList.map((item, index) => generateItemElement(item, index));

  return items.join("");
}

function renderShoppingList() {
  console.log('renderShoppingList ran');

  const shoppingListItemsString = generateShoppingItemsString(listData);
  $(SHOPPING_LIST_ELEMENT_CLASS).html(shoppingListItemsString);
}

function addItemToShoppingList(itemName) {
  console.log(`Adding "${itemName}" to shopping list`);
  listData.push({name: itemName, checked: false});
}

function handleNewItemSubmit() {

  $(NEW_ITEM_FORM_IDENTIFIER).submit(function(event){
    event.preventDefault();

    const newItemElement = $(NEW_ITEM_FORM_INPUT_CLASS);
    const newItemName = newItemElement.val();
    console.log(newItemName);
    newItemElement.val('');
    addItemToShoppingList(newItemName);
    renderShoppingList();
  });
  console.log('handleNewItemSubmit ran');
}

function getItemIndexFromElement(item) {
  const itemIndexString = $(item).closest(`.${ITEM_INDEX_ELEMENT_IDENTIFIER}`).attr(ITEM_INDEX_ATTRIBUTE);
  return parseInt(itemIndexString, 10);
}

function toggleCheckedForListItem(itemIndex) {
  console.log("toggling checked property");
  listData[itemIndex].checked = !listData[itemIndex].checked;
}

function handleItemCheckClicked() {
  $(SHOPPING_LIST_ELEMENT_CLASS).on('click', `.${ITEM_CHECKED_BUTTON_IDENTIFIER}`, function(event) {
    const itemIndex = getItemIndexFromElement(event.currentTarget);
    console.log(itemIndex);
    console.log('`handleItemCheckClicked` ran');
    toggleCheckedForListItem(itemIndex);

    // ? Necessary to re-render the list after every item added? Why not just append?
    renderShoppingList();
  });
}

function handleDeleteItemClicked() {
  console.log('handleDeleteItemClicked ran');
}

function handleShoppingList() {
  renderShoppingList();
  handleNewItemSubmit();
  handleItemCheckClicked();
  handleDeleteItemClicked();
}

$(handleShoppingList);