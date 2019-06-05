
var foodItems = firebase.database().ref("Food/");

var lastChild;

foodItems.on("value",function(data){

    data.forEach(function(foodItem) {
        lastChild = foodItem.key;
        var childData = foodItem.val();
        
        if(childData.MenuId == "01")
        {
            $('#BreakfastId').append('<li><div class="card mt-4 food-items p-1"><div class="row "><div class="col-md-4"><img src="' + childData.Image + '"class="w-100"></div><div class="col-md-8 px-3"><div class="card-block px-3"><h4 class="card-title">Name : '+ childData.Name +'</h4><h4 class="card-title">Price : ₹'+ childData.Price +'</h4><h4 id="unID" class="card-title">Unique ID : '+ lastChild +'</h4><p class="card-text"></p><p class="card-text"></p><a href="#" id="' + lastChild + '" onclick="modifyContent(this.id)" class="btn btn-primary">Modify Price</a></div><div id="' + lastChild +'_price" style="display : none;"><label for="text-mod">Enter modified price : </label><input id="mod-price_' + lastChild + '" name="text-mod"><div><a class="btn btn-success text-white" id="' + lastChild + '_modify" onclick="modAdd(this.id)">Modify</a></div><div><a class="btn btn-danger text-white" id="' + lastChild + '_cancel" onclick="modCancel(this.id)">Cancel</a></div></div></div></div></div></li>')
        }
        else if(childData.MenuId == "02")
        {
            $('#South_IndianId').append('<li><div class="card mt-4 food-items p-1"><div class="row "><div class="col-md-4"><img src="' + childData.Image + '"class="w-100"></div><div class="col-md-8 px-3"><div class="card-block px-3"><h4 class="card-title">Name : '+ childData.Name +'</h4><h4 class="card-title">Price : ₹'+ childData.Price +'</h4><h4 id="unID" class="card-title">Unique ID : '+ lastChild +'</h4><p class="card-text"></p><p class="card-text"></p><a href="#" id="' + lastChild + '" onclick="modifyContent(this.id)"class="btn btn-primary">Modify Price</a></div><div id="' + lastChild +'_price" style="display : none;"><label for="text-mod">Enter modified price : </label><input id="mod-price_' + lastChild + '" name="text-mod"><div><a class="btn btn-success text-white" id="' + lastChild + '_modify" onclick="modAdd(this.id)">Modify</a></div><div><a class="btn btn-danger text-white" id="' + lastChild + '_cancel" onclick="modCancel(this.id)">Cancel</a></div></div></div></div></div></li>');
        }
        else if(childData.MenuId == "03")
        {
            $('#VadaId').append('<li><div class="card mt-4 food-items p-1"><div class="row "><div class="col-md-4"><img src="' + childData.Image + '"class="w-100"></div><div class="col-md-8 px-3"><div class="card-block px-3"><h4 class="card-title">Name : '+ childData.Name +'</h4><h4 class="card-title">Price : ₹'+ childData.Price +'</h4><h4 id="unID" class="card-title">Unique ID : '+ lastChild +'</h4><p class="card-text"></p><p class="card-text"></p><a href="#" id="' + lastChild + '" onclick="modifyContent(this.id)"class="btn btn-primary">Modify Price</a></div><div id="' + lastChild +'_price" style="display : none;"><label for="text-mod">Enter modified price : </label><input id="mod-price_' + lastChild + '" name="text-mod"><div><a class="btn btn-success text-white" id="' + lastChild + '_modify" onclick="modAdd(this.id)">Modify</a></div><div><a class="btn btn-danger text-white" id="' + lastChild + '_cancel" onclick="modCancel(this.id)">Cancel</a></div></div></div></div></div></li>');
        }
        else{
            $('#BeveragesId').append('<li><div class="card mt-4 food-items p-1"><div class="row "><div class="col-md-4"><img src="' + childData.Image + '"class="w-100"></div><div class="col-md-8 px-3"><div class="card-block px-3"><h4 class="card-title">Name : '+ childData.Name +'</h4><h4 class="card-title">Price : ₹'+ childData.Price +'</h4><h4 id="unID" class="card-title">Unique ID : '+ lastChild +'</h4><p class="card-text"></p><p class="card-text"></p><a href="#" id="' + lastChild + '" onclick="modifyContent(this.id)"class="btn btn-primary">Modify Price</a></div><div id="' + lastChild +'_price" style="display : none;"><label for="text-mod">Enter modified price : </label><input id="mod-price_' + lastChild + '" name="text-mod"><div><a class="btn btn-success text-white" id="' + lastChild + '_modify" onclick="modAdd(this.id)">Modify</a></div><div><a class="btn btn-danger text-white" id="' + lastChild + '_cancel" onclick="modCancel(this.id)">Cancel</a></div></div></div></div></div></li>');
        }
    });

});

function goToGeneric(){
    window.location = "generic.html";
}


//script for dialogue box:

function addFoodItem() {
    var whiteBG = document.getElementById("white-background");
    var dlg = document.getElementById("dlgbox");

    whiteBG.style.display = "block";
    dlg.style.display = "block";

    var winWidth = window.innerWidth;
    var winHeight = window.innerHeight;
    dlg.style.left = (winWidth/2) - 480/2 + "px";
    dlg.style.top = "150px";
}

function addFoodData(){
    var whiteBG = document.getElementById("white-background");
    var dlg = document.getElementById("dlgbox");

    whiteBG.style.display = "none";
    dlg.style.display = "none";

    var foodName = document.getElementById("nameID").value;
    var foodPrice = document.getElementById("priceID").value;
    var foodMenuId = document.getElementById("menuIdID").value;
    var foodImageURL = document.getElementById("imageURLID").value;

    lastChild++;

    var rootRef = firebase.database().ref();
    var foodRef = rootRef.child('Food/' + lastChild);

    var newFoodDataRef = {
            Image : foodImageURL,
            MenuId : foodMenuId,
            Name : foodName,
            Price : foodPrice
    };
    foodRef.update(newFoodDataRef);
}

function cancel() { 
    var whiteBG = document.getElementById("white-background");
    var dlg = document.getElementById("dlgbox");

    whiteBG.style.display = "none";
    dlg.style.display = "none";
}

function modifyContent(lastChild_id){
    document.getElementById(lastChild_id + "_price").style.display = "block";
}

function modAdd(){
    var mod_price = document.getElementById("mod-price_" + lastChild).value;
    var unID = document.getElementById("unID").value;
    var db = firebase.database();
    db.ref("Food/" + unID + "/Price").set(mod_price);
}

function modCancel(cancel_id){
    var str = cancel_id.substring(0,2);
    document.getElementById(str + "_price").style.display = "none";
}