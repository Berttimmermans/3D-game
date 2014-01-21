(function() {
	
	function defaultData(){
  	return {
  	  pos: {
    	  x: 0,
    	  y: 0
  	  },
    	mode: "moving"
  	}
	}
	
	function Game(){
		this.d = defaultData();
	};

	Game.prototype.init = (function() {
			
	});
	
	Game.prototype.controlReceiver = (function(event, direction) {
			
			if(event == "dPad"){
			//if(direction.x != 0 ||  direction.y != 0 ){
			  $("#dev-data").html("x = " + direction.x + " - y = " + direction.y);
      //}
			}
			
	});	

	// Direction buttons
	Game.prototype.dPad = (function(direction){ return this.controlDispatcher("dPad", direction); });
	
	// Control Dispatcher
	Game.prototype.controlDispatcher = (function(event, direction){
		var destiny = null;
		/*switch(this.d.mode){
			case "moving": destiny = this.wa; break;
			default: return false;
		}*/
		return this.controlReceiver(event, direction);
	});
	
	window.Game = Game;
	
})()

