//to do - a way to select which item to edit, something easier than typing in ID.

// ** LAUNCH TOOL ** //
// When the page is loaded - generate a grid, then log and display it
window.onload = initItemTool;

function initItemTool() {
  loadFromStorage();
}

// Elements
let outputAll = document.getElementById('output-item-all');
let outputSingle = document.getElementById('output-item-single');
let outputAllJson = document.getElementById('output-json-all');
let outputSingleJson = document.getElementById('output-json-single');
let editor = document.getElementById('editor');
let creator = document.getElementById('creator');

// ** ITEM FUNCTIONALITY ** //

// Prepare empty item arrays
let items = [];
let item = {};

// Check if there are any items in local storage and update display
function loadFromStorage() {
    if(localStorage.getItem('itemJson')) {
      item = JSON.parse(localStorage.getItem('itemJson'));
    }
    if(localStorage.getItem('itemsJson')) {
      items = JSON.parse(localStorage.getItem('itemsJson'));
    }
    updateDisplay(item, items)
  }

// save to local storage and reload the data
  function saveToStorage(_item, _items) {
    localStorage.setItem('itemJson', JSON.stringify(_item));
    localStorage.setItem('itemsJson', JSON.stringify(_items));
    loadFromStorage()
  }

// create a new item and save it
function createItem(_item, _items){
    _item['id'] = _items.length;
    _items.push(_item);
    saveToStorage(_item, _items);
  }

// update an item by pushing it to items
function updateItems(_item, _items){
  // check if an item with same id exist in items array
  if (_items.find( ({ id }) => id === _item.id )){
    // if yes, replace that object with updated item object
    let oldItem = _items.find( ({ id }) => id === _item.id );
    _items[oldItem.id] = _item;
    saveToStorage(_item, _items);
  } else {
    // if no, we want to create the item instead
    createItem(_item, _items);
  }
}

/*

Not used right now, might be connected to a button or "remove this item"-button later.

// Remove an item from local storage and reload
function clearItem(){
    // remove data from local storage
    localStorage.removeItem('itemJson');
    // set the items array to empty again
    item = {};
    // get the new situation from storage
    loadFromStorage();
};

// Remove all items from local storage and reload
function clearItems(){
    // remove data from local storage
    localStorage.removeItem('itemsJson');
    // set the items array to empty again
    items = [];
    // get the new situation from storage
    loadFromStorage();
};

*/

// ** VISUALS ** //

// Shows items on page in various forms
function updateDisplay(_item, _items){
  displaySingle(_item);
  displayAll(_items);
  showCreator(_item, _items);
  showEditor(_item, _items);
}

// Output an item as HTML inside the given element
function displaySingle(_item) {
    
  // Clear any existing html content
  outputSingle.innerHTML = '';

  // Check the item data and create new elements for it
  let itemDiv = document.createElement('div');
  itemDiv.id = item.id;
  let p = document.createElement('p');
  let text = document.createTextNode(`ID: ${item.id} \n`);
  p.append(text);
  itemDiv.append(p);
  outputSingle.append(itemDiv);

  // Clear any existing json content
  outputSingleJson.innerHTML = '';

  // Create a new text node of the current items as JSON
  let jsonSingleStr = document.createTextNode(JSON.stringify(_item, true, 3));

  // Append the text node to the given element
  outputSingleJson.append(jsonSingleStr);

}

// Output the items as HTML inside the given element
function displayAll(_items) {

  // Clear any existing html content
  outputAll.innerHTML = '';

  // Loop trough the items of the _items and create a new div-element for each of them
  _items.forEach(item => {
      let itemDiv = document.createElement('div');
      itemDiv.id = item.id;
      let p = document.createElement('p');
      let text = document.createTextNode(`ID: ${item.id} \n`);
      p.append(text);
      itemDiv.append(p);
      outputAll.append(itemDiv);
  });

  // Clear any existing json content
  outputAllJson.innerHTML = '';

  // Create a new text node of the current items as JSON
  let jsonAllStr = document.createTextNode(JSON.stringify(_items, true, 3));

  // Append the text node to the given element
  outputAllJson.append(jsonAllStr);

}


// ** USER INPUT ** //

// ** Item creator form ** //

function showCreator(_item, _items){
    // clear the creator of previous data
    creator.innerHTML = '';

    // prepare html elements around the creator
    let title = document.createElement('h2');
    let creatorForm = document.createElement('form');
    let titleText = document.createTextNode('Create Item');
    let creatorSubmit = document.createElement('input');
  
    // default fields for new objects
    let defaultItem = {
      name: 'small red box',
      size: 1,
      colour: 'red'
    }
    
    // create form elements for each kv pair in object
    Object.entries(defaultItem).forEach(entry => {
      const [key, value] = entry;
      let theInput = document.createElement('input');
      theInput.name = key;
      theInput.value = value;
      if (typeof value === 'string'|| value instanceof String){
        theInput.type = 'text';
      } else if (typeof value === 'number') {
        theInput.type = 'number';
      } else if (typeof value === 'boolean'){
        theInput.type = 'checkbox';
      }
      creatorForm.append(theInput);
    });

    // append html elements around the creator
    creatorForm.append(creatorSubmit);
    title.append(titleText);
    creator.append(title);
    creator.append(creatorForm);

    // submit button will always be this
    creatorSubmit.type = 'submit';
    creatorSubmit.value = 'Create Item';
  
    // listen for form submit event
    creatorForm.addEventListener('submit', (e) => {
      // dont post
      e.preventDefault();
      // build an object from the form fields
      for(input of e.target.children) {
        if(input.name !== '') {
          _item[input.name] = Number.isInteger(+input.value) ? +input.value : input.value;
        }
      };
    // create new item with object 
    createItem(_item, _items);
    });
  };


// ** Item editor form ** //

// show editor for user input
  function showEditor(_item, _items){
    // clear the editor of previous data
    editor.innerHTML = '';

    // prepare html elements around the editor
    let title = document.createElement('h2');
    let editorForm = document.createElement('form');
    let titleText = document.createTextNode('Edit Item');
    let editorSubmit = document.createElement('input');
  
    // create form elements for each kv pair in object
    Object.entries(_item).forEach(entry => {
      const [key, value] = entry;
      let theInput = document.createElement('input');
      theInput.name = key;
      theInput.value = value;
      if (typeof value === 'string'|| value instanceof String){
        theInput.type = 'text';
      } else if (typeof value === 'number') {
        theInput.type = 'number';
      } else if (typeof value === 'boolean'){
        theInput.type = 'checkbox';
      }
      editorForm.append(theInput);
    });

    // append html elements around the editor
    editorForm.append(editorSubmit);
    title.append(titleText);
    editor.append(title);
    editor.append(editorForm);

    // submit button will always be this
    editorSubmit.type = 'submit';
    editorSubmit.value = 'Update Item';
  
    // listen for form submit event
    editorForm.addEventListener('submit', (e) => {
      // dont post
      e.preventDefault();
      // build an object from the form fields
      for(input of e.target.children) {
        if(input.name !== '') {
          _item[input.name] = Number.isInteger(+input.value) ? +input.value : input.value;
        }
      };
    // update items array with new object 
    updateItems(_item, _items)
    });
  };