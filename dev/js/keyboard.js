(function() {

	function Keyboard(game,settings){
		
		this.game = game;
		this.dPad = "none";
		this.keys = {};
		this.aButton = 0;
		this.bButton = 0;
		
	};
	
	Keyboard.prototype = (function() {
		
		function init(){
			
			var self = this;
			
			$(document).keydown(function (e) {
				self.keys[e.which] = true;
				for (var i in self.keys) {
					if (!self.keys.hasOwnProperty(i)) continue;
					if(i == 65){
						self.game.aButtonDown();
						self.aButton = (self.aButton<8)? self.aButton+1 : 8;
					}
					if(i == 90){
						self.game.bButtonDown();
						self.bButton = (self.bButton<8)? self.bButton+1 : 8;
					}
					if(i == 38) setTimeout(function(){ return self.game.dPad('up'); }, 1);
					if(i == 39) setTimeout(function(){ return self.game.dPad('right'); }, 1);
					if(i == 40) setTimeout(function(){ return self.game.dPad('down'); }, 1);
					if(i == 37) setTimeout(function(){ return self.game.dPad('left'); }, 1);
					if(i == 17) setTimeout(function(){ return self.game.selectButton(); }, 1);
					if(i == 18) setTimeout(function(){ return self.game.startButton(); }, 1);
					if(i == 69) setTimeout(function(){ return self.game.lButton(); }, 1);
					if(i == 82) setTimeout(function(){ return self.game.rButton(); }, 1);
				}
			});

			$(document).keyup(function (e) {
				self.dPad = "none"; 
				for (var i in self.keys) {
					if(i == 65){
						if(self.aButton<8) self.game.aButton(); 
						self.game.aButtonUp(); 
						self.aButton = 0;
					} 
					if(i == 90){
						if(self.bButton<8) self.game.bButton();
						self.game.bButtonUp(); 
						self.bButton = 0;
					}
				}
				delete self.keys[e.which];
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