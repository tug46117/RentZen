"use strict";

/* SOME CONSTANTS */
var endpoint01 = "http://52.14.130.229:8222";
 // should be possible to condtionally drop the user into the homepage without having to login in everytime.
localStorage.renterid = 0;




localStorage.lastnavlink = '';

/* SUPPORTING FUNCTIONS */

var navigationControl = function(the_link){

	/* manage the content that is displayed */
	var idToShow = $(the_link).attr("href");
	localStorage.lastnavlink = idToShow;

	console.log(idToShow);

	if (idToShow == '#div-login' ){
		/* what happens if the login/logout link is clicked? */
		localStorage.renterid = 0;
		$(".secured").addClass("locked");
		$(".secured").removeClass("unlocked");
	}

	$(".content-wrapper").hide(); 	/* hide all content-wrappers */
	$(idToShow).show(); /* show the chosen content wrapper */
	$("html, body").animate({ scrollTop: "0px" }); /* scroll to top of page */
	$(".navbar-collapse").collapse('hide'); /* explicitly collapse the navigation menu */

} /* end navigation control */
var UpdateLocalStorage = function(result){
	localStorage.clear();
	localStorage.creditrating = result.creditrating;
	localStorage.firstname = result.firstname;
	localStorage.income = result.income;
	localStorage.lastname = result.lastname;
	localStorage.password = result.password;
	localStorage.phone = result.phone;
	localStorage.renterid = result.renterid;
	localStorage.username = result.username;

};
var autoPopulateForm =function(){
	$("#Signuprenterid").val(localStorage.renterid);
	$("#UpdateUsername").val(localStorage.username);
	$("#UpdatePassword").val(localStorage.password);
	$("#SignupFirstName").val(localStorage.firstname);
	$("#SignupLastName").val(localStorage.lastname);
	$("#SignupPhone").val(localStorage.phone);
	$("#SignupCreditRating").val(localStorage.creditrating);
	$("#SignupIncome").val(localStorage.income);

}

var showProperty = function (result) {
	console.log(result);

}

// Populate list of properties in CITY

var autoPopulateProperty =function(result){
	console.log(result);
	for(var i=0;i<result.length;i++){
		console.log(result[i]['street']);
		$("#divrow").append("<div class= 'col-md-6'> <div class='img-thumnail'> <a href='#' onclick = showProperty("+ result[i]["propertyid"] +")>" + "<html>"+result[i]["street"]+"</html>" + "<img class='img-fluid rounded' style ='width: 100%' src ='images/no_image.png'> </a> </div> </div>"
			)

	};
}; 

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
			UpdateLocalStorage(result); //login succeeded.  Set usertoken.
			$('#renterid').val(localStorage.renterid);
			$('.secured').removeClass('locked');
			$('.secured').addClass('unlocked');
			$('#div-login').hide();
			$('#div-dashboard').show();
		} ,
		error:function(result){
			console.log(result);
			localStorage.renterid = 0; // login failed.  Set usertoken to it's initial value.
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
var SignUp = function(){
	
	var the_serialized_data = $('#form-signup').serialize();
	var urltext = endpoint01 + '/renter';
		$.ajax({
			url: urltext,
			type: 'POST',
			data: the_serialized_data,
			success: function(result){
				console.log(the_serialized_data);
				console.log(result);
				$(".content-wrapper").hide()
				$("#div-signupconfirm").show()
			},
			error: function(result){
				console.log(result);
				$('#signup_message').html(result.responseJSON);
				$('#signup_message').show();
			}
		});
	} //end startTheGame

	// Update profile
	var updateProfile = function(){
		
		var the_serialized_data = $('#form-profile').serialize();
		var urltext = endpoint01 + '/renter?';
			$.ajax({
				url: urltext,
				type: 'PUT',
				data: the_serialized_data,
				success: function(result){
					console.log(the_serialized_data);
					console.log(result);
					//$(".content-wrapper").hide()
					$("#profile_message").html("Update success");
					$("#profile_message").show();
					$("#profile_message").removeClass();
					$("#profile_message").addClass("alert alert-success text-center");
				},
				error: function(result){
					console.log(result);
					$('#profile_message').html("Cannot update");
					$('#profile_message').show();
					$("#profile_message").removeClass();
					$("#profile_message").addClass("alert alert-danger text-center");
				}
			});
		}

	// Get list of properties in CITY

	var GetProperty = function(){
	//go get the data off the login form
	var the_serialized_data = $('#form-city').serialize();
	var urltext = endpoint01 + '/rentalproperties';

	$.ajax({
		url: urltext ,
		data: the_serialized_data,
		type:'GET',
		success: function(result){
			//GetProperty(result); //login succeeded.  Set usertoken.
			$(".content-wrapper").hide();
			$("#div-propertylist").show();
			autoPopulateProperty(result);
		} ,
		error:function(result){
			console.log(result);
			$('#city_message').html(result.responseJSON);
			$('#city_message').show();

		}, 
	});
	
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
		SignUp();

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
	
	
	/* what happens if the dashboard Search for Properties is clicked ? */
	$('#dashboard-searchCity').click(function(){
		//Hide all the content wrapper
		$(".content-wrapper").hide()
		// show the next div
		$("#div-city").show()	
	});


	$('#btnCity').click(function(){
		//Hide all the content wrapper
		
		// show the next div
		GetProperty();
	});


	/* what happens if the dashboard Update Profile button is clicked ? */
	$('#dashboardUpdateProfile').click(function(){
		//Hide all the content wrapper
		$(".content-wrapper").hide();
		// show the next div
		$("#div-updateprofile").show();	
		autoPopulateForm();
	});

	$('#navbar-updateprofile').click(function(){
		//Hide all the content wrapper
		$(".content-wrapper").hide();
		// show the next div
		$("#div-updateprofile").show();	
		autoPopulateForm();
	});

	$('#btnUpdateProfile').click(function(){
		updateProfile();

	});

	}); /* end the document ready event*/
