$(document).ready(function(){
    
  var game = new Game();
	game.init();

	// Touch controls
	var keyboard = new Keyboard(game);
	keyboard.init();

	// Touch controls
	var touch = new Touch(game);
	touch.init();
    
});