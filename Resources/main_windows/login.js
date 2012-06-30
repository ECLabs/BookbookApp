var win = Ti.UI.currentWindow; 
var GLOBAL_BUTTON_WIDTH = 290;

var view = Titanium.UI.createView({
	backgroundImage:'../images/login_backgroundonly_bookup.png'
});

var errorLabel = Titanium.UI.createLabel({
	color:'red',
	text:'',
	font:{fontSize:14,fontFamily:'Helvetica Neue', fontWeight:'normal'},
	textAlign:'center',
	width:Ti.Platform.displayCaps.platformWidth - 30,
	height:16,
	top: Ti.Platform.displayCaps.platformHeight * .27,
	opacity:1
}); 
view.add(errorLabel);


var usernameField = Titanium.UI.createTextField({ 
	color:'#000', 
	top:errorLabel.top + errorLabel.height + 5,
	//height:30, 
	width: GLOBAL_BUTTON_WIDTH,
	borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED, 
	keyboardType: Titanium.UI.KEYBOARD_EMAIL,
	autocorrect:false,
	paddingLeft:0,
	opacity:1,
	hintText:'Username'
});
view.add(usernameField);

/* This code moves the entire screen up (including the fields) so that when the keyboard shows, 
 * you can still see the fields.
 *
usernameField.addEventListener('focus', function() {
	view.animate({top:-10,duration:400});
});

usernameField.addEventListener('blur', function() {
	view.animate({top:0,duration:400});
});
*/

usernameField.addEventListener('return',function(e) { 
	if(usernameField.value != '' && passwordField.value != '') {
		loginBtn.fireEvent('click');
	}
	else if(usernameField.value != '') {
		passwordField.focus();
	}
		
});

var passwordFieldTop = 45;
if (Ti.Platform.osname != 'android') {
	passwordFieldTop = 37
}

var passwordField = Titanium.UI.createTextField({ 
	color:'#000', 
	top:usernameField.top + passwordFieldTop,
	width: GLOBAL_BUTTON_WIDTH,
	borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED, 
	keyboardToolbarColor: '#999', 
	keyboardToolbarHeight: 40,
	keyboardType: Titanium.UI.KEYBOARD_EMAIL,
	paddingLeft:0,
	passwordMask:true,
	opacity:1,
	hintText:'Password'
});
view.add(passwordField);

passwordField.addEventListener('return',function(e) { 
	if(usernameField.value != '' && passwordField.value != '')
		loginBtn.fireEvent('click');
});

/* This code moves the entire screen up (including the fields) so that when the keyboard shows, 
 * you can still see the fields.
 *
passwordField.addEventListener('focus', function() {
	view.animate({top:-10,duration:400});
});

passwordField.addEventListener('blur', function() {
	view.animate({top:0,duration:400});
});
*/

var forgotPWLabel = Titanium.UI.createLabel({
	color:'blue',
	text:'Forgot password?',
	font:{fontSize:12,fontFamily:'Helvetica Neue', fontWeight:'normal'},
	textAlign:'right',
	width:GLOBAL_BUTTON_WIDTH,
	height:30,
	top: passwordField.top + 36,
	opacity:1
}); 
view.add(forgotPWLabel);

forgotPWLabel.addEventListener('click', function() {
	alert('Functionality not yet implemented');
});

var loginBtn = Titanium.UI.createButton({
	title:'Sign In',
	color:'#000',
	top:forgotPWLabel.top + forgotPWLabel.height + 10,
	//style: Titanium.UI.iPhone.SystemButtonStyle.BORDERED,
	font:{fontSize:16,fontFamily:'Helvetica Neue', fontWeight:'bold'},
	borderRadius: 5,
	borderColor: '#fff',
	height: 30,
	width: GLOBAL_BUTTON_WIDTH,
	backgroundImage: 'none',
	backgroundColor: '#feba86',
	opacity:1
});
view.add(loginBtn);


loginBtn.addEventListener('click',function(e) { 
	Titanium.API.debug("You clicked the button"); 
	if(!usernameField.value || !passwordField.value) {
		Ti.API.debug("missing data in fields");
		var alertDialog = Titanium.UI.createAlertDialog({
		    title: 'Sign-in Error',
		    message: 'Please enter both username and password',
		    buttonNames: ['OK']
		});
		alertDialog.show();
		return;
	}
	//loginBtn.title = 'Logging in...';
	
	var jsonTextToDisplay = '';
	var host = 'labs.evanschambers.com'; // 'localhost';
	Ti.API.debug("about to send.  usernane field value -> " + usernameField.value)
	var url = 'http://'+host+':8080/Bookbook/api/user/sign-in?username='+usernameField.value+'&password='+ passwordField.value;
	var xhr = Titanium.Network.createHTTPClient();
	xhr.onload = function() {
		//Titanium.API.info(' Text: ' + this.responseText);
	    //var jsonObject = JSON.parse(this.responseText);
	    // searchBar.blur();
	    var resp = this.responseText;
	    
	    Ti.API.debug(resp);
	    if(resp == 'Login successful!') {
	    	//loginBtn.title = 'Loading app...';
	    	
	    	errorLabel.text = '';
	    	g_username = usernameField.value;
	    	win.close();
	    	
	    }
	    else {	
	    	errorLabel.text = resp;
	    	if(resp.indexOf('username') > -1) {
	    		usernameField.setValue('');
	    		usernameField.setBackgroundColor('red');
	    		usernameField.focus();
	    	}
	    	else if(resp.indexOf('password') > -1) {
	    		passwordField.setValue('');
	    		passwordField.setBackgroundColor('red');
	    		passwordField.focus();
	    	}
	    	else {
	    		
	    	}
	    	
	    }
	};
	
	xhr.onerror = function(e) {
		errorLabel.text = 'unable to reach bookup services';
		alert("ERROR " + e.error);
	};

	Ti.API.debug(url);
	xhr.open('GET', url);
	xhr.send();
});

var loginFBBtn = Titanium.UI.createButton({
	title:'Sign In Using Facebook',
	color:'#000',
	top:loginBtn.top + loginBtn.height + 10,
	//style: Titanium.UI.iPhone.SystemButtonStyle.BORDERED,
	font:{fontSize:16,fontFamily:'Helvetica Neue', fontWeight:'bold'},
	borderRadius: 5,
	borderColor: '#fff',
	height: 30,
	width: GLOBAL_BUTTON_WIDTH,
	backgroundImage: 'none',
	backgroundColor: '#feba86',
	opacity:1
});
view.add(loginFBBtn);

loginFBBtn.addEventListener('click', function() {
	alert('Functionality not yet implemented');
});

var signUpBtn = Titanium.UI.createButton({
	title:'Sign up for a BookUp account',
	color:'#000',
	top:loginFBBtn.top + loginFBBtn.height + 10,
	//style: Titanium.UI.iPhone.SystemButtonStyle.BORDERED,
	font:{fontSize:12,fontFamily:'Helvetica Neue', fontWeight:'bold'},
	borderRadius: 5,
	borderColor: '#fff',
	height: 35,
	width: GLOBAL_BUTTON_WIDTH - 70,
	backgroundImage: 'none',
	backgroundColor: '#feba86',
	opacity:1
});
view.add(signUpBtn);

var tabGroup = Ti.UI.createTabGroup();

signUpBtn.addEventListener('click', function() {
	
	var signUpWin = Titanium.UI.createWindow({
		url:'signUp.js',  
	    //height:Ti.Platform.displayCaps.platformHeight,  
	    //width:Ti.Platform.displayCaps.platformWidth,    
	    title:'SignUp',
	    barColor: '#333',
	    fullscreen:false,
	    navBarHidden:false,
	    tabBarHidden:true,
	    backButtonTitle:'test'
	}); 
	
	signUpWin.addEventListener('open', function(e) {
		Ti.App.fireEvent('setUsernameFocus', {});
	});
	
	var tab = Ti.UI.createTab({
	    title:"Doesn't matter",
	    window: signUpWin
	});
 
	tabGroup.addTab(tab);
	tabGroup.open();
	
	signUpWin.open();
	
	
});

Ti.App.addEventListener('closeSignUpTabGroup', function() {
	tabGroup.close();
});

win.add(view);
