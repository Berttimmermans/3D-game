(function() {

	function Touch(game){
		
		this.game = game;
		this.dPad = "none";
		this.aButton = 0;
		this.bButton = 0;
		this.start = false;
		this.select = false;
		this.L = 0;
		this.R = 0;
		this.iPad = navigator.userAgent.match(/iPad/i) != null;
		this.iPhone = navigator.userAgent.match(/iPhone/i) != null;
		this.iPod = navigator.userAgent.match(/iPod/i) != null;
		this.android = navigator.userAgent.match(/Android/i) != null;
		
	};
	
	Touch.prototype = (function() {
		
		function init(){
		
			if(this.iPad == true || this.iPhone == true || this.iPod == true || this.android == true){
				this.build();
				return this.check();
			}
			return;
			
		};
		
		function build(){
			
			var self = this;
			
			$('body').append('<div class="controls"></div>');
			$('.controls').append('<div id="up"></div>');
			$('.controls').append('<div id="right"></div>');
			$('.controls').append('<div id="down"></div>');
			$('.controls').append('<div id="left"></div>');
			$('.controls').append('<div id="aButton">A</div>');
			$('.controls').append('<div id="bButton">B</div>');
			$('.controls').append('<div id="start">Start</div>');
			$('.controls').append('<div id="select">Select</div>');
			$('.controls').append('<div id="L">L</div>');
			$('.controls').append('<div id="R">R</div>');
			
			$("body").bind("touchstart", function(event) { 
				 return event.preventDefault(); 
			});
			
			$("#up").bind("touchstart", function(){ 
				self.dPad = "up"; 
				$(this).addClass('active');
			}).bind("touchend", function() { 
				self.dPad = "none"; 
				$('.controls .active').removeClass('active');
			});
			
			$("#right").bind("touchstart", function(){ 
				self.dPad = "right"; 
				$(this).addClass('active'); 
				return;
			}).bind("touchend", function() { 
				self.dPad = "none"; 
				$('.controls .active').removeClass('active');
				return;
			});
			
			$("#down").bind("touchstart", function(){ 
				self.dPad = "down"; 
				$(this).addClass('active'); 
				return;
			}).bind("touchend", function() { 
				self.dPad = "none";  
				$('.controls .active').removeClass('active');
				return;
			});
			
			$("#left").bind("touchstart", function(){ 
				self.dPad = "left"; 
				$(this).addClass('active'); 
				return;
			}).bind("touchend", function() { 
				self.dPad = "none"; 
				$('.controls .active').removeClass('active'); 
				return;
			});
			
			$("#aButton").bind("touchstart", function(){ 
				$(this).addClass('active');
				self.aButton = 1;
				return;
			}).bind("touchend", function() { 
				if(self.aButton<8) self.game.aButton(); 
				self.game.aButtonUp(); 
				self.aButton = 0;
				$('.controls .active').removeClass('active'); 
				return;
			});
			
			$("#bButton").bind("touchstart", function(){ 
				$(this).addClass('active');
				self.bButton = 1;
				return;
			}).bind("touchend", function() { 
				if(self.bButton<8) self.game.bButton();
				self.game.bButtonUp(); 
				self.bButton = 0; 
				$('.controls .active').removeClass('active'); 
				return;
			});
			
			$("#start").bind("touchstart", function(){ 
				self.start = true; 
				$(this).addClass('active'); 
				return;
			}).bind("touchend", function() { 
				self.start = false; 
				$('.controls .active').removeClass('active'); 
				self.game.startButton(); 
				return;
			});
			
			$("#select").bind("touchstart", function(){ 
				self.select = true; 
				$(this).addClass('active'); 
				return;
			}).bind("touchend", function() { 
				self.select = false; 
				$('.controls .active').removeClass('active');
				self.game.selectButton();x
				return;
			});
			
			$("#L").bind("touchstart", function(){ 
				self.L = true; 
				$(this).addClass('active'); 
				return;
			}).bind("touchend", function() { 
				self.L = false; 
				$('.controls .active').removeClass('active');
				self.game.lButton(); 
				return;
			});
			
			$("#R").bind("touchstart", function(){ 
				self.R = true; 
				$(this).addClass('active'); 
				return;
			}).bind("touchend", function() { 
				self.R = false; 
				$('.controls .active').removeClass('active');
				self.game.rButton(); 
				return;
			});
			
			return;
			
		};
		
		function check(){
		
			if(this.aButton > 0) {
				this.game.aButtonDown();
				this.aButton = (this.aButton<8)? this.aButton+1 : 8;
			}
			if(this.bButton > 0) {
				this.game.bButtonDown();
				this.bButton = (this.bButton<8)? this.bButton+1 : 8;
			}
			switch(this.dPad){
				case "up" :
					this.game.dPad("up");
					break;
				case "right" :
					this.game.dPad("right");
					break;
				case "down" :
					this.game.dPad("down");
					break;
				case "left" :
					this.game.dPad("left");
					break;
			}
			var self = this;
			return setTimeout(function(){
				return self.check();
			}, 60);
			
		};

		return {
		
			constructor: Touch,
			init: function() { return this._(init)() },
			build: function() { return this._(build)() },
			check: function() { return this._(check)() },
			_: function(callback){
				var self = this;
				return function(){ return callback.apply(self, arguments); };
			}
			
		};
		
	})();

	window.Touch = Touch;
	
})();