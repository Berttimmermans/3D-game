(function() {

	function Keyboard(game,settings){
		
		this.game = game;
		this.pos = { x: 0, y: 0 };
		
	};
	
	Keyboard.prototype = (function() {
		
		function init(){
			
			var self = this;
			
			$(document).keydown(function (e) {
			  var key = e.which;
				if (key == 38) self.pos.y = -1;
				if (key == 39) self.pos.x = 1;
				if (key == 40) self.pos.y = 1;
				if (key == 37) self.pos.x = -1;
				return self.game.dPad(self.pos); 
			});

			$(document).keyup(function (e) {
			  var key = e.which;
				if(key == 38 || key == 40) self.pos.y = 0;
				if(key == 39 || key == 37) self.pos.x = 0;
				return self.game.dPad(self.pos); 
			});
			
			return;
			
		}; 
		
		return {
		
			constructor: Keyboard,
			init: function() { return this._(init)() },
			_: function(callback){
				var self = this;
				return function(){ return callback.apply(self, arguments); };
			}
			
		};
		
	})();

	window.Keyboard = Keyboard;
	
})();