"use strict";

/* SOME CONSTANTS */
var endpoint01 = "http://ec2-3-15-38-21.us-east-2.compute.amazonaws.com";
localStorage.usertoken = 0;
localStorage.lastnavlink = '';

/* SUPPORTING FUNCTIONS */

var navigationControl = function(the_link){

	/* manage the content that is displayed */
	var idToShow = $(the_link).attr("href");
	localStorage.lastnavlink = idToShow;

	console.log(idToShow);

	if (idToShow == '#div-login' ){
		/* what happens if the login/logout link is clicked? */
		localStorage.usertoken = 0;
		$(".secured").addClass("locked");
		$(".secured").removeClass("unlocked");
	}

	$(".content-wrapper").hide(); 	/* hide all content-wrappers */
	$(idToShow).show(); /* show the chosen content wrapper */
	$("html, body").animate({ scrollTop: "0px" }); /* scroll to top of page */
	$(".navbar-collapse").collapse('hide'); /* explicitly collapse the navigation menu */

} /* end navigation control */

var loginController = function(){
	//go get the data off the login form
	var the_serialized_data = $('#form-login').serialize();
	var url = endpoint01 + '/auth/';
	$.getJSON(url,the_serialized_data,function(data){
		//console.log(data);
		if (typeof data === 'string'){
			localStorage.usertoken = 0; // login failed.  Set usertoken to it's initial value.
			$('#login_message').html(data);
			$('#login_message').show();
		} else {
			$('#login_message').html('');
			$('#login_message').hide();
			localStorage.usertoken = data['user_id']; //login succeeded.  Set usertoken.
			$('.secured').removeClass('locked');
			$('.secured').addClass('unlocked');
			$('#div-login').hide();
			$('#div-ABC').show();
		}
	});
	//scroll to top of page
	$("html, body").animate({ scrollTop: "0px" });
};


//document ready section
$(document).ready(function (){

    /* ------------------  basic navigation ----------------*/

	/* lock all secured content */
	$('.secured').removeClass('unlocked');
	$('.secured').addClass('locked');


    /* this reveals the default page */
    $("#div-home").show();

    /* this controls navigation - show / hide pages as needed */

	/* what to do when a navigation link is clicked */
	$(".nav-link").click(function(){
		navigationControl(this);
	});
	/* what happens if the Homepage Sign Up button is clicked? */
	$('#btnSignUpHome').click(function(){
		//Hide all the content wrapper
		$(".content-wrapper").hide()
		// show the next div
		$("#div-rentersignup").show()

	});
	/* what happens if user log in ? */
	$('#btnLogin').click(function(){
		//Hide all the content wrapper
		$(".content-wrapper").hide()
		// show the next div
		$("#div-dashboard").show()

	});
	/* what happens if the Sign Up button in Sign Up page is clicked? */
	$('#btnSignUp').click(function(){
		//Hide all the content wrapper
		$(".content-wrapper").hide()
		// show the next div
		$("#div-signupconfirm").show()

	});
	/* what happens if the login button in home page is clicked? */
	$('#btnSigninHome').click(function(){
		//Hide all the content wrapper
		$(".content-wrapper").hide()
		// show the next div
		$("#div-login").show()	
	});
	/* what happens if the login button is clicked on account created page? */
	$('#btnSignin').click(function(){
		//Hide all the content wrapper
		$(".content-wrapper").hide()
		// show the next div
		$("#div-login").show()	
	});
		
}); /* end the document ready event*/
