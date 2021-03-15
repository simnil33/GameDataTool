//to do - a way to select which item to edit, something easier than typing in ID.

// ** LAUNCH TOOL ** //
// When the page is loaded - generate a grid, then log and display it
window.onload = initItemTool;

function initItemTool() {
  loadItem();
  loadItems();
  showCreator();
}

// Elements
let outputAll = document.getElementById('output-item-all');
let outputSingle = document.getElementById('output-item-single');
let outputAllJson = document.getElementById('output-json-all');
let outputSingleJson = document.getElementById('output-json-single');
let editor = document.getElementById('editor');

// ** ITEM FUNCTIONALITY ** //

// Prepare empty item arrays
let items = [];
let item = {};

// ** Singular item **//

// Check if there is a stored item
function loadItem() {
    if(localStorage.getItem('itemJson')) {
      item = JSON.parse(localStorage.getItem('itemJson'));
      showItem(item);
    }
  }

// create a new item and save it
function createItem(_args, _target){
  //item = {};
  _args['id'] = _target.length;
  _target.push(_args);
  saveItem(_args);
  saveItems(_target);
  loadItem();
}

// save an item to local storage
  function saveItem(_item) {
    localStorage.setItem('itemJson', JSON.stringify(_item));
    showItem(_item);
  }

// Remove an item from local storage
function removeItem(){
    // remove data from local storage
    localStorage.removeItem('itemJson');
    // set the items array to empty again
    item = {};
    // remove html showing items/editor if it exists
    outputSingle.innerHTML = '';
    outputSingleJson.innerHTML = '';
  };

// update an item by pushing it to items
function updateItems(_item){
    // check if an item with same id exist in items
  if (items.find( ({ id }) => id === _item.id )){
    // if yes, replace that id with updated item
    let oldItem = items.find( ({ id }) => id === _item.id );
    let newItem = _item;
    items[oldItem.id] = newItem;
    saveItem(newItem);
    saveItems(items);
  } else {
    // if no, create a new item and add it to items
    createItem(_item, items);
  }
}

// ** All items **//

// Check if there are stored items
function loadItems() {
    if(localStorage.getItem('itemsJson')) {
      items = JSON.parse(localStorage.getItem('itemsJson'));
      showItems(items);
    }
  }

// save items to local storage and update page
function saveItems(_items) {
    localStorage.setItem('itemsJson', JSON.stringify(_items));
    showItems(_items);
  }

// Remove items from local storage and update page
function removeItems(){
    // remove data from local storage
    localStorage.removeItem('itemsJson');
    // set the items array to empty again
    items = [];
    // remove html showing items/editor if it exists
    outputAll.innerHTML = '';
    outputAllJson.innerHTML = '';
  };

// ** VISUALS ** //

// ** Singular item **//

// Show an item on page in various forms

function showItem(_item){
    displaySingle(outputSingle, _item);
    displaySingleJson(outputSingleJson, _item);
    showEditor(_item);
  }

// Output an item as HTML inside the given element
function displaySingle(_element, _item) {
    // Clear any existing content
    _element.innerHTML = '';
  
    // Check the item data and create new elements for it
    let itemDiv = document.createElement('div');
    itemDiv.id = item.id;
    let p = document.createElement('p');
    let text = document.createTextNode(`ID: ${item.id} \n`);
    p.append(text);
    itemDiv.append(p);
    _element.append(itemDiv);
  }

// Output the Item objects as JSON in the given element
function displaySingleJson(_element, _item) {
    // Clear any existing content
    _element.innerHTML = '';
  
    // Create a new text node of the current items as JSON
    let jsonSingleStr = document.createTextNode(JSON.stringify(_item, true, 3));
  
    // Append the text node to the given element
    _element.append(jsonSingleStr);
  }

// ** All items **//

// Show all items on page in various forms
function showItems(_items){
    displayAll(outputAll, _items);
    displayAllJson(outputAllJson, _items);
  }

// Output the items as HTML inside the given element
function displayAll(_element, _items) {
    // Clear any existing content
    _element.innerHTML = '';
  
    // Loop trough the items of the _items and create a new div-element for each of them
    _items.forEach(item => {
        let itemDiv = document.createElement('div');
        itemDiv.id = item.id;
        let p = document.createElement('p');
        let text = document.createTextNode(`ID: ${item.id} \n`);
        p.append(text);
        itemDiv.append(p);
        _element.append(itemDiv);
    });
  }

// Output the Item objects as JSON in the given element
function displayAllJson(_element, _items) {
    // Clear any existing content
    _element.innerHTML = '';
  
    // Create a new text node of the current items as JSON
    let jsonAllStr = document.createTextNode(JSON.stringify(_items, true, 3));
  
    // Append the text node to the given element
    _element.append(jsonAllStr);
  }


// ** USER INPUT ** //

// ** Item creator form ** //

function showCreator(){
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
          item[input.name] = Number.isInteger(+input.value) ? +input.value : input.value;
        }
      };
    // create new item with object 
    createItem(item, items);
    });
  };


// ** Item editor form ** //

// show editor for user input
  function showEditor(_item){
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
          item[input.name] = Number.isInteger(+input.value) ? +input.value : input.value;
        }
      };
    // update items array with new object 
    updateItems(item)
    });
  };

