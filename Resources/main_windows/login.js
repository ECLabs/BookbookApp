var win = Ti.UI.currentWindow; 
var GLOBAL_BUTTON_WIDTH = 290;
Ti.Facebook.appid = '235098559884877';
Ti.Facebook.permissions = ['user_about_me','email','publish_stream','user_location'];
var fbProfilePictureImageView = Titanium.UI.createImageView();

// is the user already logged in to facebook?
if(Ti.Facebook.loggedIn) {
	Ti.API.info("user is already logged in to facebook.  Data:");
    Ti.Facebook.requestWithGraphPath('me', {}, 'GET', function(e) {
        if (e.success) {
			Ti.API.info(e.result);
			
			var fbdata = JSON.parse(e.result);
			//var fb_updated_time = new Date(fbdata.updated_time);
			var bu_response = doFbLogin(fbdata);
			//var bookup_updated_time = new Date(bu_response);
			/*
			if(fb_updated_time.getTime() > bookup_updated_time.getTime())
			{
				fbUpdatePicture(fbdata.username);
			}
			*/
			win.close();
            
        } else if (e.error) {
            alert(e.error);
        } else {
            alert('Unknown response');
        }
    });

}
else {
	var view = Titanium.UI.createView({
		backgroundImage:'../images/login_backgroundonly_bookup.png',
		layout:'vertical'
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
		width: GLOBAL_BUTTON_WIDTH,
		borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED, 
		keyboardType: Titanium.UI.KEYBOARD_EMAIL,
		autocapitalization:false,
		autocorrect:false,
		paddingLeft:0,
		
		opacity:1,
		hintText:'Username'
	});
	view.add(usernameField);
	
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
		top:5,
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
	
	var forgotPWLabel = Titanium.UI.createLabel({
		color:'blue',
		text:'Forgot password?',
		font:{fontSize:12,fontFamily:'Helvetica Neue', fontWeight:'normal'},
		textAlign:'right',
		width:GLOBAL_BUTTON_WIDTH,
		height:'auto',
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
		Titanium.API.info("You clicked the button"); 
		if(!usernameField.value || !passwordField.value) {
			Ti.API.info("missing data in fields");
			var alertDialog = Titanium.UI.createAlertDialog({
			    title: 'Sign-in Error',
			    message: 'Please enter both username and password',
			    buttonNames: ['OK']
			});
			alertDialog.show();
			return;
		}
		
		var jsonTextToDisplay = '';
		Ti.API.info("about to send.  username field value -> " + usernameField.value)
		var url = Ti.App.SERVICE_BASE_URL + 'user/sign-in?username='+usernameField.value+'&password='+ passwordField.value;
		var xhr = Titanium.Network.createHTTPClient();
		xhr.onload = function() {
		    var resp = this.responseText;
		    
		    Ti.API.info(resp);
		    if(resp == 'Login successful!') {
		    	errorLabel.text = '';
		    	g_username = usernameField.value;
		    	win.close();
		    	
		    }
		    else {	
		    	errorLabel.text = resp;
		    	if(resp.indexOf('username') > -1) {
		    		usernameField.setBackgroundColor('red');
		    		usernameField.focus();
		    	}
		    	else if(resp.indexOf('password') > -1) {
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
	
		Ti.API.info(url);
		xhr.open('GET', url);
		xhr.send();
	});
	
	// Don't forget to set your appid and requested permissions, else the login button
	// won't be effective.
	Ti.Facebook.addEventListener('login', function(e) {
	    if (e.success) {
	    	Ti.API.info('Logged In via Facebook. Checking BookUp credentials');
	    	Ti.Facebook.requestWithGraphPath('me', {}, 'GET', function(e) {
		        if (e.success) {
		            Ti.API.info(e.result);
		            var fbdata = JSON.parse(e.result);
		            
		            doFbLogin(fbdata);
		            
		         	win.close();
		            //alert(fbdata.id);
		            // does the user's account already exist?
		            // if so, check the updated_time and update BookUp's data if newer
		            // otherwise, register the user
		            
		        } else if (e.error) {
		            alert(e.error);
		        } else {
		            alert('Unknown response');
		        }
		    });
	        //win.close();
	    }
	});
	Ti.Facebook.addEventListener('logout', function(e) {
	    Ti.API.debug("logging out of FB");
	});
	
	
	
	var fbButton = Ti.Facebook.createLoginButton({
	    top : 10,
	    style : Ti.Facebook.BUTTON_STYLE_WIDE
	})
	    
	// Add the button.  Note that it doesn't need a click event listener.
	view.add(fbButton);
	
	var signUpBtn = Titanium.UI.createButton({
		title:'Sign up for a BookUp account',
		color:'#000',
		top:70,
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
}



function doFbLogin(fbdata) {
	
	Ti.API.info("about to send.  Facebook ID is -> " + fbdata.id)
	var url = Ti.App.SERVICE_BASE_URL + 'user/sign-in-facebook';
	var xhr = Titanium.Network.createHTTPClient();
	xhr.onload = function() {
	    var resp = this.responseText;
	    
	    Ti.API.info(resp);
	    if(resp == -1) { // successful failed
	    	Ti.API.info("error upon fb login.");
	    	errorLabel.text = resp;
	    	return false;
	    }
	    else {
	    	return resp;	    	
	    }
	};
	
	xhr.onerror = function(e) {
		errorLabel.text = 'unable to reach bookup services';
		alert("ERROR " + e.error);
	};

	fbProfilePictureImageView.image = "http://graph.facebook.com/"+fbdata.username+"/picture";

	Ti.API.info(url);
	xhr.open('POST', url);
	xhr.send({'jsondata':{
		//"id":0,
		"facebookId":fbdata.id,
		"aboutMe":fbdata.bio,
		"activationMethod":"facebook",
		"email":fbdata.email,
		"userName":fbdata.username,
		//"firstName":fbdata.first_name,
		//"lastName":fbdata.last_name,
		//"middleName":"null",
		//"password":passwordField.value,
		"fullName":fbdata.name,
		//"userName":usernameField.value,
		"userTypeCode":"user",
		"gender":fbdata.gender,
		"facebookUpdateTime":fbdata.updated_time,
		"location":fbdata.location,
		"picture":Ti.Utils.base64encode(fbProfilePictureImageView.toBlob())
	}});
}

function fbUpdatePicture(fbusername) {
	var urlPhoto = Ti.App.SERVICE_BASE_URL + 'user/'+fbusername+'/photo';
	Ti.Facebook.requestWithGraphPath('me/picture?type=large', {}, 'GET', function(e) {
        if (e.success) {
            var xhr2 = Titanium.Network.createHTTPClient();

			fbProfilePictureImageView.image = "http://graph.facebook.com/"+fbusername+"/picture";
			
        	xhr2.open("POST",urlPhoto);  
        	xhr2.setTimeout(Ti.App.REQUEST_TIMEOUT); // 10 second timeout
       		xhr2.send({myFile:fbProfilePictureImageView.toBlob()});
			xhr2.onerror = function()  {
				Ti.API.info("We had problems uploading your profile image.");
				return false;
			}
			
        	xhr2.onload = function() {
			    var resp = this.responseText;  
			    Ti.API.info(resp);
			    if(!resp) { // no data returned means it was a success
			    	return true;
			    }
			    else { // otherwise, there was an error
			    	Ti.API.info("We had problems uploading your profile image. 2");
			    	return false;
				}   	
        	}
        } else if (e.error) {
            alert(e.error);
        } else {
            alert('Unknown response');
        }
        return false;
    });
}
