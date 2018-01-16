$(document).ready(function(){

	var canvas = $("#canvas")[0];
	var context = canvas.getContext("2d");
	var w = $("#canvas").width();
	var h = $("#canvas").height();
	var cw = 10;
	var snake_direction;
	var food;
	var score;
	var snake_array; 
	
	function start()
	{
		snake_direction = "right"; 
		create_snake();
		create_food();
		score = 0;
		if(typeof game_loop != "undefined") clearInterval(game_loop);
		game_loop = setInterval(paint, 60);
	}
	
	function create_snake()
	{
		var length = 5; 
		snake_array = [];
		for(var i = length-1; i>=0; i--)
		{
			snake_array.push({x: i, y:0});
		}
	}
	
	function create_food()
	{
		food = {
			x: Math.round(Math.random()*(w-cw)/cw), 
			y: Math.round(Math.random()*(h-cw)/cw), 
		};
	}
	
	function paint()
	{
		context.fillStyle = "white";
		context.fillRect(0, 0, w, h);
		context.strokeStyle = "black";
		context.strokeRect(0, 0, w, h);
	
		var nx = snake_array[0].x;
		var ny = snake_array[0].y;
	
		if(snake_direction == "right") nx++;
		else if(snake_direction == "left") nx--;
		else if(snake_direction == "up") ny--;
		else if(snake_direction == "down") ny++;
		
		if(nx == -1 || nx == w/cw || ny == -1 || ny == h/cw || check_collision(nx, ny, snake_array))
		{
			start();
			return;
        }
        
		if(nx == food.x && ny == food.y)
		{
			var tail = {x: nx, y: ny};
			score++;
			create_food();
		}
		else
		{
			var tail = snake_array.pop();
			tail.x = nx; tail.y = ny;
		}
		
		snake_array.unshift(tail);
		
		for(var i = 0; i < snake_array.length; i++)
		{
			var c = snake_array[i];
			paint_cell(c.x, c.y);
		}
		
		paint_cell(food.x, food.y);
		var score_text = "Score: " + score;
		context.fillText(score_text, 5, h-5);
    }
    
	function paint_cell(x, y)
	{
		context.fillStyle = "blue";
		context.fillRect(x*cw, y*cw, cw, cw);
		context.strokeStyle = "white";
		context.strokeRect(x*cw, y*cw, cw, cw);
	}
	
	function check_collision(x, y, array)
	{
		for(var i = 0; i < array.length; i++)
		{
			if(array[i].x == x && array[i].y == y)
			 return true;
		}
		return false;
    }
    
	$(document).keydown(function(e){
		var key = e.which;
		if(key == "37" && snake_direction != "right") snake_direction = "left";
		else if(key == "38" && snake_direction != "down") snake_direction = "up";
		else if(key == "39" && snake_direction != "left") snake_direction = "right";
		else if(key == "40" && snake_direction != "up") snake_direction = "down";
    })	
    
	start();
})