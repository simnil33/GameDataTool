// loads the map tool when button is clicked
function loadItemTool(){
	intro.innerHTML = '<h1>Item Tool</h1><p>This is the item tool!</p>';

	toolBox.innerHTML = '<p>This item tool page just has a paragraph right now, no tool.</p>';

	secondaryMenu.style.display = 'inline-block';
	secondaryMenu.innerHTML = '<button class="menuItem" id="buildGrid" onclick="buildGrid()">Random Button</button><button class="menuItem" id="clearGrid" onclick="clearGrid()"> Random Button</button><button class="menuItem" id="randomGrid" onclick="randomGrid()">Random Button</button>';
}