"use strict";

/* SOME CONSTANTS */
var endpoint01 = "http://misdemo.temple.edu/rentzen";
 // should be possible to condtionally drop the user into the homepage without having to login in everytime.
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

// email : jm@email.com
//	password:jm123 
var loginController = function(){
	//go get the data off the login form
	var the_serialized_data = $('#form-login').serialize();
	var urltext = endpoint01 + '/renter';

	$.ajax({
		url: urltext ,
		data: the_serialized_data,
		type:'GET',
		success: function(result){
			console.log(result);
			$('#login_message').html('');
			$('#login_message').hide();
			localStorage.usertoken = result.renterid; //login succeeded.  Set usertoken.
			$('#renterid').val(localStorage.usertoken);
			$('.secured').removeClass('locked');
			$('.secured').addClass('unlocked');
			$('#div-login').hide();
			$('#div-dashboard').show();
		} ,
		error:function(result){
			console.log(result);
			localStorage.usertoken = 0; // login failed.  Set usertoken to it's initial value.
			$('#login_message').html(result.responseJSON);
			$('#login_message').show();
		}, 
	});

	//scroll to top of page
	$("html, body").animate({ scrollTop: "0px" });
};
var logoutController = function(){
	//go get the data off the login form
	$('.secured').addClass('locked');
	$('.secured').removeClass('unlocked');
	$(".content-wrapper").hide()
	// show the next div
	$("#div-home").show()	

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
		// show the next div
		loginController();
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

	/* what happens if the dashboard logout and navigation logout button is clicked ? */
	$('#dashboardLogOut').click(function(){
		logoutController();
	});
	$('#navLogout').click(function(){
		logoutController();
	});
	
		
}); /* end the document ready event*/
