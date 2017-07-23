// Add items to list
  // Type in text box
  // Add that item to template code
  // Append template code to container div

// Check
  // Get title for item
  // Change styling on item
    // Strikethrough

// Delete item from list
  // Get the parent node for the current item
  // Remove node

$(function(){

// Add

const shoppingForm = $('#js-shopping-list-form');
const shoppingFormInput = shoppingForm.find('.js-shopping-list-entry');
const shoppingListContainer = $('.shopping-list');

function getInputValue() {
  console.log(shoppingFormInput.val());
  return shoppingFormInput.val();
}

function clearInputValue() {
  shoppingFormInput.val("");
}

function addToShoppingList(inputValue) {

  shoppingListContainer.append(
    `<li>
        <span class="shopping-item">${inputValue}</span>
        <div class="shopping-item-controls">
          <button class="shopping-item-toggle">
            <span class="button-label">check</span>
          </button>
          <button class="shopping-item-delete">
            <span class="button-label">delete</span>
          </button>
        </div>
      </li>`
    );
}

shoppingForm.submit(function() {
  event.preventDefault();

  getInputValue();

  addToShoppingList(getInputValue());

  clearInputValue();
});

// Check
shoppingListContainer.on('click', 'li .shopping-item-toggle', function() {
  $(this).closest('li').find('.shopping-item').toggleClass('shopping-item__checked');
});

// Delete
shoppingListContainer.on('click', 'li .shopping-item-delete', function() {
  $(this).closest('li').remove();
});


});