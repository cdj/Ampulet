function drawCanvasBk() {
  stage = new Kinetic.Stage({container: "bkContainer", width: window.innerWidth, height: window.innerHeight});
  bkLayer = new Kinetic.Layer();
  
  for(var w = 0; w < stage.getWidth(); w += xSpacing) {
	  for(var h = 0; h < stage.getHeight(); h += ySpacing) {
		  // Determine the x and y increments for animating
		  var xInc = Math.floor(Math.random()*(incTotal*2+1))-incTotal;
		  var yInc = (incTotal - Math.abs(xInc))*(1-(Math.floor(Math.random()*2)*2));
		  // Determine big or small radius
		  var rad = bkCircleRadius + (Math.floor(Math.random()*2) + 1) * bkCircleBigRadBump;
		  var bkCircle = new Kinetic.Circle({
				x: w + Math.random()*rad - rad/2,
				y: h + Math.random()*rad - rad/2,
				radius: rad,
				fill: 'green',
				opacity: 0.2
		  });
		  bkLayer.add(bkCircle);
		  bkCircles.push({ circle: bkCircle, xinc: xInc, yinc: yInc });
	  }
  }

  stage.add(bkLayer);
  
  anim = new Kinetic.Animation(function(frame){
	  updateCanvasBk(frame);
  }, bkLayer);
  
  anim.start();
  console.log(bkCircles.length + " circles generated");
}

function updateCanvasBk(frame) {
  /*var scale = Math.sin(frame.time * 2 * Math.PI / period) * 0.1 + 1;
  for(var n = 0; n < shapes.length; n++) {
	  var shape = shapes[n];
	  shape.setScale(scale);
  }*/
  jQuery.each(bkCircles, function() {
	  this.circle.setX(this.circle.getX() + this.xinc * bkCircleSpeed);
	  this.circle.setY(this.circle.getY() + this.yinc * bkCircleSpeed);
	  
	  // Change directions when they start going off screen
	  if(this.circle.getX() < 0 || this.circle.getX() > stage.getWidth()) {
		  this.xinc *= -1;
	  }
	  if(this.circle.getY() < 0 || this.circle.getY() > stage.getHeight()) {
		  this.yinc *= -1;
	  }
  });
}

function drawSvgBk() {
  for(var w = 0; w < $("#bkContainer").width(); w += xSpacing) {
	  for(var h = 0; h < $("#bkContainer").height(); h += ySpacing) {
		  // Determine the x and y increments for animating
		  var xInc = Math.floor(Math.random()*(incTotal*2+1))-incTotal;
		  var yInc = (incTotal - Math.abs(xInc))*(1-(Math.floor(Math.random()*2)*2));
		  
		  var bkCircle =  document.createElementNS("http://www.w3.org/2000/svg", "circle");
		  // Determine big or small radius
		  var rad = bkCircleRadius;
		  if(Math.floor(Math.random()*2)) {
			  rad += bkCircleBigRadBump;
			  bkCircle.classList.add("bkCircleBig");
		  } else {
			  bkCircle.classList.add("bkCircleSmall");
		  }
		  bkCircle.setAttribute("cx", w + Math.random()*rad - rad/2);
		  bkCircle.setAttribute("cy", h + Math.random()*rad - rad/2);
		  bkCircle.setAttribute("r", rad);
		  bkCircle.setAttribute("fill", "green");
		  bkCircle.setAttribute("fill-opacity", 0.3);
		  bkCircle.classList.add("bkCircle");
		  $("#container").append(bkCircle);
		  bkCircles.push({ circle: bkCircle, xinc: xInc, yinc: yInc });
	  }
  }
  console.log(bkCircles.length + " circles generated");
  timer = setInterval(updateSvgBk, 10);
};

function updateSvgBk() {
  jQuery.each(bkCircles, function() {
	  this.circle.cx.baseVal.value += this.xinc * bkCircleSpeed;
	  this.circle.cy.baseVal.value += this.yinc * bkCircleSpeed;
	  
	  // Change directions when they start going off screen
	  if(this.circle.cx.baseVal.value < 0 || this.circle.cx.baseVal.value > $("#bkContainer").width()) {
		  this.xinc *= -1;
	  }
	  if(this.circle.cy.baseVal.value < 0 || this.circle.cy.baseVal.value > $("#bkContainer").height()) {
		  this.yinc *= -1;
	  }
  });
}

/*function bkMove() {
  if(anim.isRunning()) {
	  anim.stop();
  } else {
	  anim.start();
  }
}

// For resize/rotate
function adjustBk() {
  var oldWidth = stage.getWidth();
  var oldHeight = stage.getHeight();
  stage.setWidth(window.innerWidth);
  stage.setHeight(window.innerHeight);
  
  if(window.innerWidth > stage.getWidth()) {
	  // Add circles to enlarged regions
  }
  else if(window.innerWidth < stage.getWidth()) {
	  // Remove circles from smaller regions
  }
  
  
  if(window.innerHeight > stage.getHeight()) {
	  // Add circles to enlarged regions
  }
  else if(window.innerHeight < stage.getHeight()) {
	  // Remove circles from smaller regions
  }
}*/