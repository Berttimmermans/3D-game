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
    this.charachter = document.getElementById('charachter');
	};

	Game.prototype.init = (function() {
			
	});
	
	Game.prototype.controlReceiver = (function(event, direction) {
			
			if(event == "dPad"){
			//if(direction.x != 0 ||  direction.y != 0 ){
			  $("#dev-data").html("x = " + direction.x + " - y = " + direction.y);
			  
			  this.d.pos.x += direction.x;
			  this.d.pos.y += direction.y; 
			  
        this.charachter.style.webkitTransform = "translate("+this.d.pos.x+"px,"+this.d.pos.y+"px)";
			  
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

