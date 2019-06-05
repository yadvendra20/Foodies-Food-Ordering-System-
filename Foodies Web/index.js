
var newOrd = false;
var pendOrd = true;

changeOrders();

firebase.auth().onAuthStateChanged(function(user) {

  if (user) {
    // User is signed in.
    document.getElementById("user_div").style.display = "block";
    document.getElementById("login_div").style.display = "none";

    var user = firebase.auth().currentUser;

    if(user != null){
			var Uid = user.uid;
			
    	var canteenAdmin = firebase.database().ref("canteenAdminData/" + Uid);

		canteenAdmin.on("value", function(data) {
		   var canteenAdminMember = data.val();
		   var name = canteenAdminMember.Name;
           var add = canteenAdminMember.Address;
		   document.getElementById("user_name").innerHTML = "Name : " + name;
           document.getElementById("user_add").innerHTML = "Address : " + add;
		});
    }

    var requests = firebase.database().ref("Requests/");
    var cnt=0;
    //var order = document.getElementById("order");

    requests.on("child_added",function(data){
				var request = data.val();

				var table = document.createElement('table');
				table.setAttribute("id","foodTable")


				var arrHead = new Array();
				arrHead = ['Food Item', 'Quantity'];

				var foodItems = new Array();

				for(var i=0;i<request.foods.length;i++){
					foodItems.push([request.foods[i].productName,request.foods[i].quantity]);
				}

				var tr = table.insertRow(-1);

				for (var h = 0; h < arrHead.length; h++) {
					var th = document.createElement('th');
					th.setAttribute("class", "foodHeader");              // TABLE HEADER.
					th.innerHTML = arrHead[h];
					tr.appendChild(th);
				}

				for (var c = 0; c <= foodItems.length - 1; c++) {
					tr = table.insertRow(-1);

					for (var j = 0; j < arrHead.length; j++) {
							var td = document.createElement('td');          // TABLE DEFINITION.
							td = tr.insertCell(-1);
							td.innerHTML = foodItems[c][j];                  // ADD VALUES TO EACH CELL.
						}
				}

				$('#dynamic-orders').append('<li id="li' + cnt + '" style="border:3px solid #6cc091;" class="p-0 mb-3"><div class="card mt-0"><div class="card-body" style="text-align:left;">' +'Name : ' + request.name + ', Total Price : ' + request.total + '<br>Suggestion : ' + request.suggestion + '<br>Customer phone : '+ request.phone + '<br><button id="b' + cnt + '" onclick="addToAppend(this.id)" class="btn btn-info text-white" style="height : 40px; float:right;">Accept</button></div></div></li>');

				document.getElementById("dynamic-orders").lastChild.appendChild(table);
                cnt++;
    });

   // var currFoodItems = firebase.database().ref("Requests/" + );


  } else {
    // No user is signed in.
    document.getElementById("user_div").style.display = "none";
    document.getElementById("login_div").style.display = "block";
  }
});

function addToAppend(bId){
    var liId = "li" + bId.slice(1);
    var card = document.getElementById(liId);
    $('#pending-orders').append(card);
    var button = document.getElementById(bId);
    button.innerHTML = "Ready";
    button.classList.remove("btn-info");
    button.classList.add("btn-success");
    //console.log(card.outerHTML);
}

function changeOrders(){
    if(newOrd == true && pendOrd == false)
    {
        document.getElementById("newOrders-div").style.display = "none";
        document.getElementById("pendingOrders-div").style.display = "block";
        newOrd = false;
        pendOrd = true;
    }
    else {
        document.getElementById("newOrders-div").style.display = "block";
        document.getElementById("pendingOrders-div").style.display = "none";
        newOrd = true;
        pendOrd = false;
    }
}

function goToManageFood(){
    window.location = "manageFoodItems.html";
}

function login(){

	var userEmail = document.getElementById("demo-email").value;
	var userPassword = document.getElementById("demo-password").value;

	//window.alert("hi...!");

	firebase.auth().signInWithEmailAndPassword(userEmail, userPassword).catch(function(error) {
	  // Handle Errors here.
	  var errorCode = error.code;
	  var errorMessage = error.message;
	  // ...

	  window.alert("Error : " + errorMessage);
	});

}

function logout() {
	firebase.auth().signOut();
}
