// ** LAUNCH TOOL ** //
// When the page is loaded - generate a grid, then log and display it
window.onload = initItemTool;

function initItemTool() {
  loadItem();
  loadItems();
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

// temp data for item creation
let boxArgs = {
  name: 'box',
  size: 3,
  colour: 'red',
  weight: 5
}

let treeArgs = {
  name: 'tree',
  size: 'big',
  species: 'oak',
  weight: 500
}

// call for new item to be created
createItem(boxArgs, items);
createItem(treeArgs, items);

// Check if there is a stored item
function loadItem() {
    if(localStorage.getItem('itemJson')) {
      console.log('Item found!');
      item = JSON.parse(localStorage.getItem('itemJson'));
      showItem(item);
    } else {
      console.log('No items found');
    }
  }

// create a new item and save it
function createItem(_args, _target){
  _args['id'] = _target.length;
  _target.push(_args);
  saveItem(_args);
  saveItems(_target);
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
      console.log('Items found!');
      items = JSON.parse(localStorage.getItem('itemsJson'));
      showItems(items);
    } else {
      console.log('No items found');
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

/*

function showCreator(){
  editor.innerHTML = '';

  let title = document.createElement('h2');
  let titleText;
  let form = document.createElement('form');
  let nameInput = document.createElement('input');
  nameInput.name = 'name';
  let sizeInput = document.createElement('input');
  sizeInput.name = 'size';
  let editorSubmit = document.createElement('input');
  nameInput.type = 'text';
  sizeInput.type = 'number';
  editorSubmit.type = 'submit';

  titleText = document.createTextNode('Create a New Item');
  nameInput.placeholder = 'The name of your item';
  editorSubmit.value = 'Create Item';

  form.append(nameInput);
  form.append(sizeInput);
  form.append(editorSubmit);

  title.append(titleText);
  editor.append(title);

  editor.append(form);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    //build item from form fields
    for(input of e.target.children) {

      if(input.name !== '') {
        item[input.name] = Number.isInteger(+input.value) ? +input.value : input.value;
      }
    };
  saveItem(item);
  })
};

*/

// ** Item editor form ** //

// show editor for user input
  function showEditor(_item){
    // clear the editor of previous data
    editor.innerHTML = '';

    // prepare html elements around the editor
    let title = document.createElement('h2');
    let form = document.createElement('form');
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
      form.append(theInput);
    });

    // append html elements around the editor
    form.append(editorSubmit);
    title.append(titleText);
    editor.append(title);
    editor.append(form);

    // submit button will always be this
    editorSubmit.type = 'submit';
    editorSubmit.value = 'Update Item';
  
    // listen for form submit event
    form.addEventListener('submit', (e) => {
      // dont post
      e.preventDefault();
      // build an object from the form fields
      for(input of e.target.children) {
        if(input.name !== '') {
          item[input.name] = Number.isInteger(+input.value) ? +input.value : input.value;
        }
      };
    // save new object as single item, update items array with new object 
    saveItem(item)
    updateItems(item)
    })
  };

