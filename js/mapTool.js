/* 
  Att göra
   1. Uppdatera och spara map när användaren redigerar den
   2. Sätt för användaren att lägga till egna attribut i map
*/

// ** LAUNCH TOOL ** //

// When the page is loaded - generate a grid, then log and display it
window.onload = initMapTool;

function initMapTool() {
  loadMap();
}

// Elements
let outputVisual = document.getElementById('output-map');
let outputJson = document.getElementById('output-json');
let editor = document.getElementById('editor');

// ** MAP FUNCTIONALITY ** //

// Prepare an empty map object
let map = {
  name: '',
  size: 0,
  tiles: []
};

// Check if there's a stored map
function loadMap() {
  if(localStorage.getItem('mapJson')) {
    console.log('Map found!');
    map = JSON.parse(localStorage.getItem('mapJson'));
    showMap(map);
    showEditor(true);
  } else {
    console.log('No map found');
    showEditor(false);
  }
}

function saveMap() {
  localStorage.setItem('mapJson', JSON.stringify(map));
  showMap(map);
}

// Create a new map with given name and size
function createMap(_mapName, _mapSize) {
  map.name = _mapName;
  map.size = _mapSize;
  map.tiles = generateGrid(_mapSize);
  showEditor(true);
  saveMap(map);
}

// Remove the map
function removeMap(){
  // remove data from local storage
  localStorage.removeItem('mapJson');
  // set the map array to empty again
  map = {
    name: '',
    size: 0,
    tiles: []
  };
  // remove html showing map/edit if it exists
  outputVisual.innerHTML = '';
  outputJson.innerHTML = '';
  showEditor(false);
};

// Generate a tile grid of a given size
function generateGrid(_mapSize) {

  let tiles = [];
  let tileID = 0;

  for (let row = 0; row < _mapSize; row++) {
    for (let col = 0; col < _mapSize; col++ ) {    
      let tile = {
        id: tileID,
        pos: { row: row, col: col },
        paths: { n: false, e: false, s: false, w: false },
        edges: { 
          n: row == 0 ? true : false, 
          e: col == _mapSize-1 ? true : false,
          s: row == _mapSize-1 ? true : false,
          w: col == 0 ? true : false
        }
      };
      tiles.push(tile);
      tileID++;
    };
  };

  return tiles
};

// Generate a random grid and add it to map
function generateRandomGrid(_max){
  let size = Math.floor(Math.random() * _max) + 1;
  generateGrid(size)
};

// ** VISUALS ** //

// Show the current map on page in various forms
function showMap(_map){
  displayMap(outputVisual, _map);
  displayJson(outputJson, _map);
}

// Output the map as HTML inside the given element
function displayMap(_element, _map) {
  // Clear any existing content
  _element.innerHTML = '';

  // Loop trough the tiles of the _map and create a new div-element for each of them
  _map.tiles.forEach(tile => {
      let tileDiv = document.createElement('div');
      tileDiv.id = tile.id;
      let p = document.createElement('p');
      let text = document.createTextNode(`ID: ${tile.id} \n Row: ${tile.pos.row} \n Col: ${tile.pos.col}`);
      p.append(text);
      tileDiv.append(p);
      _element.append(tileDiv);
  });
}

// Output the Map object as JSON in the given element
function displayJson(_element, _map) {
  // Clear any existing content
  _element.innerHTML = '';

  // Create a new text node of the current map as JSON
  let jsonStr = document.createTextNode(JSON.stringify(_map, true, 3));

  // Append the text node to the given element
  _element.append(jsonStr);
}

function showEditor(_mapExists){
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

  if (_mapExists){
    // A map exists and is loaded, fields for editing
    titleText = document.createTextNode('Edit Map');
    nameInput.value = map.name;
    sizeInput.value = map.size;
    editorSubmit.value = 'Update Map';
    
  } else {
    // A map does not exist and needs to be generated
    titleText = document.createTextNode('Create a New Map');
    nameInput.placeholder = 'The name of your map';
    editorSubmit.value = 'Create Map';
  }

  form.append(nameInput);
  form.append(sizeInput);
  form.append(editorSubmit);

  title.append(titleText);
  editor.append(title);

  editor.append(form);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    for(input of e.target.children) {

      if(input.name !== '') {
        map[input.name] = Number.isInteger(+input.value) ? +input.value : input.value;
      }
    };
    
  saveMap();

  })
};

// 





// ** USER INPUT ** //

// CREATE NEW MAP

// EDIT EXISTING MAPs

/*
user adding custom attribues in editor
formAttributes{
  nameInput{
    fieldType: text
    placeholder: kagjhsvd
    valueType: bool/int/str 
  }

  editorSubmit:
}

forEach attribute in formAttribues{
  jhbasdjhbasd
}

//---

data {
  name: newname;
}

function updateMap(_data){
  // matcha och ersätt data från _data till fält i map
  finns name i map? ja/nej
  om ja, ersätt värdet med newname
  om nej, appenda name: newname till map 
  // 
}

*/