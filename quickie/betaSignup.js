$(document).ready(function(){
	if(getCookie("BetaSignup") == "true")
	{
		$("#BetaSignup").html("We’ll send you an invitation as soon as we can!");
	}
	
	$("#BetaSignupForm").submit(function(event) {
		var $form = $(this);
		// let's select and cache all the fields
		var	$inputs = $form.find("input, select, button, textarea");
		// serialize the data in the form
		var	serializedData = $form.serialize();
		var invalidEmailError = "* Invailid email address";
	
		// let's disable the inputs for the duration of the ajax request
		$inputs.attr("disabled", "disabled");
		
		$.ajax({
		  type: "POST",
		  url: "emailSignup.php",
		  data: serializedData,
		  beforeSend: function(jqXHR, settings){
		    //lightweight email validation
			var x = $("#EmailText").val();
			var aPos = x.indexOf("@");
			var dPos = x.lastIndexOf(".");
			if ((aPos < 1) || (dPos < aPos + 2) || (dPos + 2 >= x.length))
			{
				console.log(invalidEmailError);
				$("#InvalidEmailError").html(invalidEmailError);
				$inputs.removeAttr("disabled");
				$("input#EmailText").focus();
				return false;
			}
		  },
		  // callback handler that will be called on success
		  success: function(response, textStatus, jqXHR){
			// log a message to the console
			console.log("Email signed up for beta");
			setCookie("BetaSignup", "true");
			shiftBars();
			$("#BetaSignup").html("Ampulet has recorded your request. We’ll send you an invitation as soon as we can!");
		  },
		  // callback handler that will be called on error
		  error: function(jqXHR, textStatus, errorThrown){
			// log the error to the console
			console.log(
				"The following error occured: " +
				textStatus, errorThrown
			);
			$("#InvalidEmailError").html("* " + errorThrown);
			$inputs.removeAttr("disabled");
			$("input#EmailText").focus();
		  }
		 });
		
		// prevent default posting of form
		return false;
	});
});
function shiftBars()
{
	var up = "+=335px";
	var down = "-=335px";
	
	if ($(".BgBarOdd").attr("top") == '435px')
	{
		$('.BgBarOdd').animate({top: up}, 1000);
		$('.BgBarEven').animate({top: down}, 1000);
	}
	else
	{
		$('.BgBarOdd').animate({top: down}, 1000);
		$('.BgBarEven').animate({top: up}, 1000);
	}
}
function getCookie(c_name)
{
	var i;
	var x;
	var y;
	var cookies = document.cookie.split(";");
	
	for (i = 0; i < cookies.length; i++)
	{
	  x = cookies[i].substr(0,cookies[i].indexOf("="));
	  y = cookies[i].substr(cookies[i].indexOf("=")+1);
	  x = x.replace(/^\s+|\s+$/g,"");
	  if (x == c_name)
	  {
		  return unescape(y);
	  }
	}
}
function setCookie(c_name, value)
{
	var expDate = new Date();
	expDate.setDate(expDate.getDate() + 365);
	var c_value = escape(value) + "; expires=" + expDate.toUTCString();
	document.cookie = c_name + "=" + c_value;
}