
const db = firebase.database();

firebase.auth().onAuthStateChanged(function(user) {

  if (user) {
    // User is signed in.
    document.getElementById("user_div").style.display = "block";
    document.getElementById("login_div").style.display = "none";

    var user = firebase.auth().currentUser;

    if(user != null){
    	var email_id = user.email;
    	var email_verified = user.emailVerified;
    	document.getElementById("user_para").innerHTML = "Welcome : " + email_id;
    	
    	if(email_verified)
    	{
    		document.getElementById("disappear_1").style.display = "none";
    		document.getElementById("disappear_2").style.display = "none";
	    }	
	    	var userName = document.getElementById("demo-name").value;
	    	var userAddress = document.getElementById("demo-address").value;

	    	var Uid = user.uid;
			var canteenAdminData = db.ref("canteenAdminData");

			canteenAdminData.child(Uid).set({
				'Name' : userName,
				'Address' : userAddress}).then(function(){
					window.alert("Registered successfully...");
				})
    }


  } else {
    // No user is signed in.
    document.getElementById("user_div").style.display = "none";
    document.getElementById("login_div").style.display = "block";

  }
});



function createAccount() {


	var userEmail = document.getElementById("demo-email").value;
	var userPassword = document.getElementById("demo-password").value;

	firebase.auth().createUserWithEmailAndPassword(userEmail, userPassword).catch(function(error) {
	  // Handle Errors here.
	  var errorCode = error.code;
	  var errorMessage = error.message;
	  // ...

	  window.alert("Error : " + errorMessage);
	});

}


/*function writeAdminDataToDatabase() {

	var user = firebase.auth().currentUser;
	var userName = document.getElementById("demo-name").value;
	var userAddress = document.getElementById("demo-password").value;

	if(user!=null)
	{
		var Uid = user.uid;
		var canteenAdminData = db.ref("canteenAdminData");

		canteenAdminData.child(Uid).set({
			'userName' : userName,
			'userAddress' : userAddress}).then(function(){
				window.alert("Registered successfully...");
			})
	}

}*/


function logout() {

	firebase.auth().signOut();

}


function sendVerification() {
	var user = firebase.auth().currentUser;

	user.sendEmailVerification().then(function() {
	  // Email sent.
	  window.alert("Verification sent");
	}).catch(function(error) {
	  // An error happened.
	  window.alert("Error : " + error.message);
	});
}