  // array for all the tiles in grid
  var tileList = []; 
  // default grid width, in boxes.
	var gridWidth = 3;

// loads the map tool when button is clicked
function loadMapTool(_tileList, _gridWidth){
	intro.innerHTML = '<h1>Map Tool</h1><p>This is the map tool!</p>';

	toolBox.innerHTML = '<p>This map tool page just has a paragraph right now, use the buttons to make a grid map.</p>';

	secondaryMenu.style.display = 'inline-block';
	secondaryMenu.innerHTML = '<button class="menuItem" id="buildGrid" onclick="buildGrid()">Build Grid</button><button class="menuItem" id="clearGrid" onclick="clearGrid()"> Clear Grid</button><button class="menuItem" id="randomGrid" onclick="randomGrid()">Random Grid</button>';
	
	if (_tileList.length > 1){
		centerRow = Math.floor(_gridWidth / 2);
		centerCol = Math.floor(_gridWidth / 2);
		centerTile = _tileList.find(tile => tile.pos.row == centerRow && tile.pos.col == centerCol );
		// Get the ID of chosen tile
		var centerID = centerTile.id;// 
		console.log('tile list is longer than 1, showing the grid');
		showGrid(_tileList, _gridWidth, centerID);
	}
}

// function that builds a grid inside the "toolBox"
function createGrid(x) {
	
  var tileID = 0;
	
	if (tileList.length > 1){
		tileList = [];
	}

    // build tiles and put in array
    for (var rows = 0; rows < x; rows++) {
        for (var columns = 0; columns < x; columns++ ) {    
          var tile = {
            id: tileID,
            pos: { row: rows, col: columns },
            paths: {}
          };
          tileList.push(tile);
          tileID++;      
        };
      };

    // Find the center row and columns
    var centerRow = Math.floor(x / 2);
    var centerCol = Math.floor(x / 2);
    // Find the center/starting tile
    var centerTile = tileList.find(tile => tile.pos.row == centerRow && tile.pos.col == centerCol );
    // Get the ID of chosen tile
    var centerID = centerTile.id;
    // Give chosen tile Start property
    tileList[centerID].start = true;
	
	console.log('a grid was just created, showing the grid')
	showGrid(tileList, x, centerID)
    //console.log ('Printing Tile Array');
    //console.log (tileList);
    //console.log ('Grid created');
    //console.log ('The tileList array is ' +tileList.length + ' tiles long');
    //console.log ('The center tile has ID ' +centerID+ ' and position ' + tileList[centerID].pos.row +','+tileList[centerID].pos.col+ ' on the grid');
    
};

function showGrid(tileList, x, centerID) {
	toolBox.innerHTML = '<div id="mapDisplay" style="width:960px;display:inline-block;"></div><div id="mapOutput" style="width:320px;display:inline-block;margin-left:50px;"></div>'
	var mapDisplay = document.querySelector('#mapDisplay');
	var mapOutput = document.querySelector('#mapOutput');
	mapDisplay.innerHTML = "";
	mapOutput.innerHTML = "";
  
    // append <div> & <p> for each object in tileList array
    for (var i = 0; i < tileList.length; ++i) {
	  mapDisplay.innerHTML += "<div class='grid' id="+tileList[i].id+"><p>id " +tileList[i].id + "<br>row " + tileList[i].pos.row + "<br>col " + tileList[i].pos.col + "</p></div>";
    // Find and add paths for each object in tileList array
    tileList[i].paths = findPaths(tileList, tileList[i].id);
	  mapOutput.innerHTML = JSON.stringify(tileList);
    }

    

	//style the grid a bit
	var grids = document.querySelectorAll('.grid');
	var width = getComputedStyle(mapDisplay).width;
	var width = width.replace('px', '');
	for (i = 0; i < grids.length; i++) {
	  //set correct widths
	  grids[i].style.width = width/x;
	  grids[i].style.height = width/x;
	  //mark center tile red
	  if (i === centerID){
		grids[i].style.backgroundColor = 'red';
	  }
	}
}

function findPaths(tileList, i){
  // Default is to have everything closed
  var paths = {north: false, east: false, south: false, west: false};

  // insert path logic here
  var paths = {north: true, east: false, south: false, west: false};

  // get info from neighboring tiles, errors when checking nonexistant tiles outside grid
  var north = getNeighbor(tileList, i, 'north');
  var east = getNeighbor(tileList, i, 'east');
  var south = getNeighbor(tileList, i, 'south');
  var west = getNeighbor(tileList, i, 'west');
  //console.log('north is '+ north.pos.row+',' + north.pos.col)
  //console.log('east is '+ east.pos.row+',' + east.pos.col)
  //console.log('south is '+ south.pos.row+',' + south.pos.col)
  //console.log('west is '+ west.pos.row+',' + west.pos.col)
  
  // Starting tile always has all paths open
  if (tileList[i].start === true){
    var paths = {north: true, east: true, south: true, west: true};
  }
  return paths;
}

// function that finds neighbor in a direction from given tileID
function getNeighbor(tileList, tileID, checkDir){
  //the current position on the grid is
  var currentRow = tileList[tileID].pos.row;
  var currentCol = tileList[tileID].pos.col;
  
  if (checkDir === "north"){
    //north is 1 tile above the current positon
    var neighborRow = currentRow -1;
    var neighborCol = currentCol;
  }
  if (checkDir === "east"){
    //east is 1 tile right of the current positon
    var neighborRow = currentRow;
    var neighborCol = currentCol +1;
  }
  if (checkDir === "south"){
    //south is 1 tile below the current positon
    var neighborRow = currentRow +1;
    var neighborCol = currentCol;
  }
  if (checkDir === "west"){
    //west is 1 tile left of the current positon
    var neighborRow = currentRow;
    var neighborCol = currentCol -1;
  }
  //match and return the entire neighbor
  var neighbor = tileList.find(tile => tile.pos.row == neighborRow && tile.pos.col == neighborCol);
  console.log(neighbor);
  return neighbor;
}

// function that clears the grid
function clearGrid(){
   //var mapDisplay = document.querySelector('#mapDisplay');
   toolBox.innerHTML = ''
};

// function that prompts the user to select the number of boxes in a new grid
// the function then also creates that new grid
function buildGrid(){
    gridWidth = prompt("How many boxes per side?");
    clearGrid();
    createGrid(gridWidth);
};

// function that clears the grid and creates a grid with 1-10 width/height
function randomGrid(){
    gridWidth = Math.floor(Math.random() * 10) + 1;;
    clearGrid();
    createGrid(gridWidth);
};