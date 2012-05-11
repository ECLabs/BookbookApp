
var win = Ti.UI.currentWindow; 
//win.layout = 'vertical';

var view = Titanium.UI.createView({
	height:70
});
//view.layout = 'vertical';
var logo = Titanium.UI.createImageView({  
    image:'../images/login_logo_trans.png', // the image for the image view  
    height:30
});
//view.add(logo);

// create table view data object
var data = [];
var row = Titanium.UI.createTableViewRow();
var usernameField = Titanium.UI.createTextField({ 
	color:'#000', 
	height:30, 
	width: Ti.Platform.displayCaps.platformWidth - 30,
	hintText: "Required",
	font:{fontSize:'14px:'},
	keyboardType: Titanium.UI.KEYBOARD_EMAIL,
	autocorrect:false,
	paddingLeft:90,
	opacity:1
});
row.add(usernameField);
data.push(row);


var usernameLabel = Titanium.UI.createLabel({
	color:'#ba4f00',
	text:'Username',
	font:{fontWeight:'bold', fontSize:'10px'},
	textAlign:'right',
	left: 5,
	width:'75px',
	opacity:1
});
usernameField.add(usernameLabel);

// password
var rowPassword = Titanium.UI.createTableViewRow();
var passwordField = Titanium.UI.createTextField({ 
	color:'#000', 
	height:30, 
	width: Ti.Platform.displayCaps.platformWidth - 30,
	//borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
	font:{fontSize:'14px:'}, 
	hintText: "Required",
	keyboardToolbarColor: '#999', 
	keyboardToolbarHeight: 40,
	keyboardType: Titanium.UI.KEYBOARD_EMAIL,
	paddingLeft:90,
	opacity:1,
	passwordMask:true,
});
rowPassword.add(passwordField);

var passwordLabel = Titanium.UI.createLabel({
	color:'#ba4f00',
	text:'Password',
	font:{fontWeight:'bold', fontSize:'10px'},
	textAlign:'right',
	left: 5,
	width:'75px',
	opacity:1
}); 
passwordField.add(passwordLabel);
data.push(rowPassword);

// firstname
var rowFirstname = Titanium.UI.createTableViewRow();
var firstnameField = Titanium.UI.createTextField({ 
	color:'#000', 
	height:30, 
	width: Ti.Platform.displayCaps.platformWidth - 30,
	//borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED, 
	font:{fontSize:'14px:'},
	hintText: "Required",
	keyboardToolbarColor: '#999', 
	keyboardToolbarHeight: 40,
	keyboardType: Titanium.UI.KEYBOARD_EMAIL,
	paddingLeft:90,
	opacity:1
});
rowFirstname.add(firstnameField);
data.push(rowFirstname);

var firstnameLabel = Titanium.UI.createLabel({
	color:'#ba4f00',
	text:'First Name',
	font:{fontWeight:'bold', fontSize:'10px'},
	textAlign:'right',
	left: 5,
	width:'75px',
	opacity:1
}); 
firstnameField.add(firstnameLabel);

// lastname
var rowLastname = Titanium.UI.createTableViewRow();
var lastnameField = Titanium.UI.createTextField({ 
	color:'#000', 
	height:30, 
	width: Ti.Platform.displayCaps.platformWidth - 30,
	//borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
	font:{fontSize:'14px:'},
	hintText: "Required", 
	keyboardToolbarColor: '#999', 
	keyboardToolbarHeight: 40,
	keyboardType: Titanium.UI.KEYBOARD_EMAIL,
	paddingLeft:90,
	opacity:1
});
rowLastname.add(lastnameField);
data.push(rowLastname);

var lastnameLabel = Titanium.UI.createLabel({
	color:'#ba4f00',
	text:'Last Name',
	font:{fontWeight:'bold', fontSize:'10px'},
	textAlign:'right',
	left: 5,
	width:'75px',
	opacity:1
}); 
lastnameField.add(lastnameLabel);

var signUpBtn = Titanium.UI.createButton({
	title:'Sign Up',
	color:'#000',
	//style: Titanium.UI.iPhone.SystemButtonStyle.BORDERED,
	font:{fontSize:16,fontFamily:'Helvetica Neue', fontWeight:'bold'},
	borderRadius: 10,
	borderColor: '#fff',
	backgroundImage:'../images/BUTT_grn_off.png',
	height: 30,
	width: Ti.Platform.displayCaps.platformWidth - 30,
	backgroundImage: 'none',
	backgroundColor: '#feba86',
	opacity:1,
	top:0
});
//win.add(signUpBtn);
view.add(signUpBtn);

var tableView = Titanium.UI.createTableView({
	data:data,
	style:Titanium.UI.iPhone.TableViewStyle.GROUPED,
	//headerTitle:'Sign-up',
	footerView:view,
	backgroundImage:'../images/login_backgroundonly.png'
});

win.add(tableView);

signUpBtn.addEventListener('click',function(e) { 
	Titanium.API.info("You clicked the button"); 
	
	signUpBtn.title = 'Signing you up...';
	
	var jsonTextToDisplay = '';
	var host = 'labs.evanschambers.com'; // 'localhost';
	Ti.API.debug("about to send.  usernane field value -> " + usernameField.value)
	var url = 'http://'+host+':8080/Bookbook/user';
	var xhr = Titanium.Network.createHTTPClient();
	xhr.onload = function() {
		//Titanium.API.info(' Text: ' + this.responseText);
	    //var jsonObject = JSON.parse(this.responseText);
	    // searchBar.blur();
	    var resp = this.responseText;
	    
	    Ti.API.debug(resp);
	    if(resp == 'user could not be added') {
	    	alert(resp);
	    	//win.close();	
	    }
	    else {	
	    	alert("User added!");
	    	win.close();
	    }
	};

	Ti.API.debug(url);
	xhr.open('POST', url);
	xhr.send({'jsondata':{
		"id":0,
		"aboutMe":"",
		"activationMethod":"native",
		"email":"null",
		"firstName":firstnameField.value,
		"lastName":lastnameField.value,
		"middleName":"null",
		"password":passwordField.value,
		"photoUrl":"null",
		"userName":usernameField.value,
		"userTypeCode":"user"
	}}); 
	
	//xhr.send({'jsondata':{"class":"bookbook.domain.User","id":null,"aboutMe":"","activationMethod":"native","createDate":"Sat Nov 12 01:39:32 EST 2011","email":"","endDate":null,"firstName":"Barack","lastLoginDate":null,"lastName":"Obama","middleName":"","password":"","photoUrl":"http://localhost:8080/Bookbook/images/maxavatar.jpg","updateDate":null,"userId":179,"userName":"yeswecan","userTypeCode":"user"}});
});

var closeBtn = Titanium.UI.createButton({
	title:'Close Window',
	color:'#000',
	//style: Titanium.UI.iPhone.SystemButtonStyle.BORDERED,
	font:{fontSize:16,fontFamily:'Helvetica Neue', fontWeight:'bold'},
	borderRadius: 10,
	borderColor: '#fff',
	height: 30,
	width: Ti.Platform.displayCaps.platformWidth - 30,
	backgroundImage: 'none',
	backgroundColor: '#feba86',
	top:35,
	opacity:1
});
view.add(closeBtn);

closeBtn.addEventListener('click',function(e) { 
	Titanium.API.info("You clicked the button");
	win.close();
});

var save = Titanium.UI.createButton({
	systemButton:Titanium.UI.iPhone.SystemButton.SAVE
});

Titanium.UI.currentWindow.setRightNavButton(save);

save.addEventListener('click',function(e) { 
	Titanium.API.info("You clicked the button"); 
	
	signUpBtn.title = 'Signing you up...';
	
	var jsonTextToDisplay = '';
	var host = 'labs.evanschambers.com'; // 'localhost';
	Ti.API.debug("about to send.  usernane field value -> " + usernameField.value)
	var url = 'http://'+host+':8080/Bookbook/user';
	var xhr = Titanium.Network.createHTTPClient();
	xhr.onload = function() {
		//Titanium.API.info(' Text: ' + this.responseText);
	    //var jsonObject = JSON.parse(this.responseText);
	    // searchBar.blur();
	    var resp = this.responseText;
	    
	    Ti.API.debug(resp);
	    if(resp == 'user could not be added') {
	    	alert(resp);
	    	//win.close();	
	    }
	    else {	
	    	alert("User added!");
	    	win.close();
	    }
	};

	Ti.API.debug(url);
	xhr.open('POST', url);
	xhr.send({'jsondata':{
		"id":0,
		"aboutMe":"",
		"activationMethod":"native",
		"email":"null",
		"firstName":firstnameField.value,
		"lastName":lastnameField.value,
		"middleName":"null",
		"password":passwordField.value,
		"photoUrl":"null",
		"userName":usernameField.value,
		"userTypeCode":"user"
	}}); 
	
	//xhr.send({'jsondata':{"class":"bookbook.domain.User","id":null,"aboutMe":"","activationMethod":"native","createDate":"Sat Nov 12 01:39:32 EST 2011","email":"","endDate":null,"firstName":"Barack","lastLoginDate":null,"lastName":"Obama","middleName":"","password":"","photoUrl":"http://localhost:8080/Bookbook/images/maxavatar.jpg","updateDate":null,"userId":179,"userName":"yeswecan","userTypeCode":"user"}});
});


//win.add(view);
