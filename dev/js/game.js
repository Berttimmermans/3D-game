(function() {
	
	function Game(){
		
	};

	Game.prototype.init = (function() {
			
	});	

	// Direction buttons
	Game.prototype.dPad = (function(direction){ return this.controlDispatcher("dPad", direction); });
		
	// A button
	Game.prototype.aButton = (function(){ return this.controlDispatcher("aButton"); });
	Game.prototype.aButtonDown = (function(){ return this.controlDispatcher("aButtonDown"); });
	Game.prototype.aButtonUp = (function(){ return this.controlDispatcher("aButtonUP"); });
		
	// B button
	Game.prototype.bButton = (function(){ return this.controlDispatcher("bButton"); });	
	Game.prototype.bButtonDown = (function(){ return this.controlDispatcher("bButtonDown"); });
	Game.prototype.bButtonUp = (function(){ return this.controlDispatcher("bButtonUp"); });
	
	// Start + Select
	Game.prototype.startButton = (function(){ return this.controlDispatcher("startButton"); });	
	Game.prototype.selectButton = (function(){ return this.controlDispatcher("selectButton"); });
	
	// L + R
	Game.prototype.lButton = (function(){ return this.controlDispatcher("lButton"); });	
	Game.prototype.rButton = (function(){ return this.controlDispatcher("rButton"); });	
	
	// Control Dispatcher
	Game.prototype.controlDispatcher = (function(event, direction){
		/*
		var destiny = null;
		switch(this.data.mode){
			case "moving": destiny = this.map.moving; break;
			default: return false;
		}
		return destiny.controlReceiver(event, direction);
		*/
	});
	
	window.Game = Game;
	
})()

