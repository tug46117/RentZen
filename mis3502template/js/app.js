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

};


var UpdateLocalProperty = function(result){
	localStorage.propertyid = result.propertyid;
	localStorage.street = result.street;
	localStorage.description = result.description;
	localStorage.city = result.city;
	localStorage.beds = result.beds;
	localStorage.baths = result.baths;
	localStorage.sqft = result.sqft;
	localStorage.rental_fee = result.rental_fee;
	localStorage.picture_url = result.picture_url;
	localStorage.landlordfirstname = result.landlordfirstname;
	localStorage.landlordlastname = result.landlordlastname;
	localStorage.landlordusername = result.landlordusername;

	
};

var autoPopulateLocalProperty =function(){
	
	$("#propertyheader").html("<div class='polaroid'><div class='container'><p>Property: </p>"+ localStorage.street+"</div>"+"<img style ='width: 100%' src='images/no_image.png'></div></div>");
	$("#property_description").html("<b> Description: </b> <br> " + localStorage.description);
	$("#property_city").html("<b> City: </b> <br> " + localStorage.city);
	$("#property_bed").html("<b> Beds: </b> <br> " + localStorage.beds);
	$("#property_bath").html("<b> Baths: </b> <br> " + localStorage.baths);
	$("#property_feet").html("<b> Square Feet: </b> <br> " + localStorage.sqft);
	$("#property_rent").html("<b> Monthly Rent: </b> <br> " + localStorage.rental_fee);
	
};
var autoPopulateApplicationForm =function(){
	$("#applicationpropertyheader").html("<div class='polaroid'><div class='container'><p>Property: </p>"+ localStorage.street+"</div>"+"<img style ='width: 100%' src='images/no_image.png'></div></div>");
	$("#landlordname").val(localStorage.landlordfirstname+" "+ localStorage.landlordlastname);
	$("#landlordemail").val(localStorage.landlordusername);
	$("#ApplicationName").val(localStorage.firstname +" "+localStorage.lastname);
	$("#ApplicationIncome").val(localStorage.income);
	$("#ApplicationEmail").val(localStorage.username);
	$("#ApplicationPhone").val(localStorage.phone);
	$("#ApplicationCreditRating").val(localStorage.creditrating);
	$("#application_renterid").val(localStorage.renterid);

};

// Populate list of properties in CITY

var autoPopulateProperties =function(result){

	console.log(result);
	for(var i=0;i<result.length;i++){
		console.log(result[i]['picture_url']);
		console.log(result[i]['street']);
		if(result[i]['picture_url']===""){
			$("#divrow").append("<div class= 'col-md-6'> <div class='polaroidList'> <a href='#' onclick = showProperty("+ 
		result[i]["propertyid"] +")>" + "<img style ='width: 100%' src ='images/no_image.png'><div class='container'><html>"+result[i]["street"]+"</html></div>" 
		+ " </a> </div> </div>"
			);
		}
		else {
			$("#divrow").append("<div class= 'col-md-6'> <div class='polaroidList'> <a href='#' onclick = showProperty("+ 
		result[i]["propertyid"] +")>" + "<img style ='width: 100%' <img style ='width: 100%' src ="+"'"+result[i]['picture_url']+"'"+ "'><div class='container'><html>"+result[i]["street"]+"</html></div>" 
		+ " </a> </div> </div>");
	}
		

	};
}; 

var showProperty = function (result) {
	console.log(result);
	
	var urltext = endpoint01 + '/rentalproperty?propertyid=';

	$.ajax({
		url: urltext + result,
		type:'GET',
		success: function(result){
			//GetProperty(result); //login succeeded.  Set usertoken.
			console.log(result);
			UpdateLocalProperty(result);
			$(".content-wrapper").hide();
			$("#div-property").show();
			autoPopulateLocalProperty(); 

		} ,
		error:function(result){
			console.log(result);
			
		}, 
	});
};

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

var GetUserProfile = function(){
		//go get the data off the login form
		var the_serialized_data = $('#form-login').serialize();
		var urltext = endpoint01 + '/renter';
		$.ajax({
			url: urltext ,
			data: the_serialized_data,
			type:'GET',
			success: function(result){
				UpdateLocalStorage(result);
				autoPopulateForm(); 
			}
		});
		
	};
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
	};

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
			$("#googlestreet").html("");
			$("#googlemap").html("");
			autoPopulateProperties(result);
		} ,
		error:function(result){
			console.log(result);
			$('#city_message').html(result.responseJSON);
			$('#city_message').show();

		}, 
	});
	};
// Get Google Map
var GetMap = function(){

$("#googlemap").html("<div class='polaroid'><img style ='width: 100%' src ="+"'"+"http://maps.googleapis.com/maps/api/staticmap?center="+localStorage.street+","+localStorage.city+"&zoom=16&size=500x500&markers="+localStorage.street+","+localStorage.city+"&key=AIzaSyBkYy3QdqyYgHr8_jUiX8WEePPE5DGIQy8"+"'"+ "/></div>")

	};


var GetStreetView = function(){

var urltext = endpoint01 + '/picture_url?';

var url = "http://maps.googleapis.com/maps/api/streetview?location="+localStorage.street.replace(/ /g,'')+","+localStorage.city+"&size=500x500&key=AIzaSyBkYy3QdqyYgHr8_jUiX8WEePPE5DGIQy8"
$("#propertyid").val(localStorage.propertyid);
$("#picture_url").val(url);
var the_serialized_data = $('#form-url').serialize();
$("#propertyheader").html("<div class='polaroid'><div class='container'><p>Property: </p>"+ localStorage.street+"</div>"+"<img style ='width: 100%' src ="+"'"+url+"'"+ "'></div></div>")
$.ajax({
	url: urltext,
	type: 'PUT',
	data: the_serialized_data,
	success: function(result){

		console.log(result);
	},
	error: function(result){
		console.log(the_serialized_data);
		console.log(result);
	
	}
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
		$("#divrow").html("");
		$("#div-city").show()	
	});


	$('#btnCity').click(function(){
		// show the next div
		GetProperty();
	});


	/* what happens if the dashboard Update Profile button is clicked ? */
	$('#dashboardUpdateProfile').click(function(){
		//Hide all the content wrapper
		$(".content-wrapper").hide();
		// show the next div
		$("#div-updateprofile").show();	
		$("#profile_message").hide();
		GetUserProfile();
	});

	$('#navbar-updateprofile').click(function(){
		//Hide all the content wrapper
		$(".content-wrapper").hide();
		// show the next div
		$("#div-updateprofile").show();	
		$("#profile_message").hide();
		GetUserProfile();
	});
	$('#UpdateProfileApplication').click(function(){
		// show the next div
		$("#div-applicationform").hide();
		$("#div-updateprofile").show();	
		$("#profile_message").hide();
		GetUserProfile();
	});

	$('#btnUpdateProfile').click(function(){
		updateProfile();

	});
	$('#btnApply').click(function(){
		//Hide all the content wrapper
		$(".content-wrapper").hide();
		// show the next div
		$("#div-applicationform").show();	
		autoPopulateApplicationForm();
	});
	$('#btnMap').click(function(){
		// show the next div
		GetMap();
	});
	$('#btnStreetView').click(function(){
		// show the next div
		GetStreetView();
	});
	
	}); /* end the document ready event*/
