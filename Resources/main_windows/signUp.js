// Page constants
var FIELD_WIDTH = 185;
var FIELD_LEFT_POS = 100;
var REQUEST_TIMEOUT = Ti.App.REQUEST_TIMEOUT;
var g_profileImage = null;

// TODO: incorporate a check for internet connectivity before trying to submit.  if (Titanium.Network.online == true)
// TODO: add a loading symbol to replace the 'done' button.
// TODO: set focus to the correct field upon validation error.

var g_validateDialog = Ti.UI.createAlertDialog({
	buttonNames: ['OK, I\'ll fix it!'],
	cancel:0,
	title: 'Error',
	message: 'There\'s an error in one of the form fields'
});
var g_doneDialog = Ti.UI.createAlertDialog({
	buttonNames: ['Sign-in'],
	cancel:0,
	title: 'Success',
	message: 'Your account has been created, please sign-in.'
});
g_doneDialog.addEventListener('click', function(e) {
	closeThisWindow();
});

var win = Ti.UI.currentWindow; 

// construct array of table rows
var data = [];

//email
var row = Titanium.UI.createTableViewRow();
var emailLabel = Titanium.UI.createLabel({
	text:'Email',
	font:{fontWeight:'bold',fontSize:'14px'},
	left: 10
});
row.add(emailLabel);
var emailField = Titanium.UI.createTextField({ 
	width: FIELD_WIDTH,
	font:{fontSize:'14px'},
	hintText: "example@example.com",
	keyboardType: Titanium.UI.KEYBOARD_EMAIL,
	autocorrect:false,
	color:'blue',
	
	left:FIELD_LEFT_POS
});
row.add(emailField);
data.push(row);

var row = Titanium.UI.createTableViewRow();
var usernameLabel = Titanium.UI.createLabel({
	text:'Username',
	font:{fontWeight:'bold',fontSize:'14px'},
	left: 10
});
row.add(usernameLabel);
var usernameField = Titanium.UI.createTextField({ 
	color:'blue',  
	font:{fontSize:'14px'},
	width: FIELD_WIDTH,
	keyboardType: Titanium.UI.KEYBOARD_EMAIL,
	autocapitalization:false,
	autocorrect:false,
	left:FIELD_LEFT_POS
});
row.add(usernameField);
data.push(row);

// password
var row = Titanium.UI.createTableViewRow();
var passwordLabel = Titanium.UI.createLabel({
	text:'Password',
	font:{fontWeight:'bold',fontSize:'14px'},
	left: 10
});
row.add(passwordLabel);
var passwordField = Titanium.UI.createTextField({ 
	color:'blue', 
	width: FIELD_WIDTH,
	font:{fontSize:'14px'},
	keyboardToolbarColor: '#999', 
	keyboardToolbarHeight: 40,
	keyboardType: Titanium.UI.KEYBOARD_EMAIL,
	passwordMask:true,
	left: FIELD_LEFT_POS
});
row.add(passwordField);
data.push(row);

// Photo
var row = Titanium.UI.createTableViewRow({className:'photo', title:'', hasChild:true, height:50, font:{fontWeight:'bold',fontSize:'14px'}});
var photoLabel = Titanium.UI.createLabel({
	text:'Photo',
	font:{fontWeight:'bold',fontSize:'14px'},
	left: 10
});
var imageView = Titanium.UI.createImageView({
    width:35,
    height:35,
    left: FIELD_LEFT_POS,
    url:'../images/blank_avatar.gif'
});

g_profileImage = Ti.Utils.base64encode(imageView.toBlob()).toString();

// create table view event listener
// opens photo gallery to allow user to select avatar photo.
row.addEventListener('click', function(e)
{
	Titanium.Media.openPhotoGallery({
		success:function(event) {
			var image = event.media;
		    Ti.API.info(image.height +' x '+ image.width);
        	imageView.setImage(image);
        	Ti.API.info(image.height + " x " + image.width);        	
        	//g_profileImage = image;   
        	g_profileImage = Ti.Utils.base64encode(imageView.toBlob()).toString()
		}
	});
});
row.add(photoLabel);
row.add(imageView);
data.push(row);

var scrollView = Ti.UI.createScrollView({
	top:0,
	backgroundColor: 'black',
	showVerticalScrollIndicator:false,
	showHorizontalScrollIndicator:false
})

var tableView = Titanium.UI.createTableView({
	data:data,
	style:Titanium.UI.iPhone.TableViewStyle.GROUPED,
	rowHeight:40,
	top:0
});
scrollView.add(tableView);
win.add(scrollView);

var footerView = Ti.UI.createView({
    height: '120',
});
 
tableView.footerView = footerView;

var nextstepsLabel = Titanium.UI.createLabel({
	text:'Just a few quick steps to get you started.  After signing up, you can find friends on BookUp, discover new books, and see what readers around the world are experiencing at any moment.',
	font:{fontWeight:'normal',fontSize:'14px'},
	textAlign:'center',
	left: 20,
	width:282,
	color: '#333',
	top:0
});
footerView.add(nextstepsLabel);

var spinnerButton = Titanium.UI.createButton({
	systemButton:Titanium.UI.iPhone.SystemButton.SPINNER
});

// add a done button to the right nav bar
var done = Titanium.UI.createButton({
	systemButton:Titanium.UI.iPhone.SystemButton.DONE
});
done.addEventListener('click',function(e) { 
	Titanium.API.info("Done button clicked"); 
	
	// change the right nav button to a spinner
	win.setRightNavButton(spinnerButton);

	var regexValidateEmail = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/; 
	var validationErrMsg = "";  
	
	if(!emailField.value || regexValidateEmail.test(emailField.value) == false) {
		validationErrMsg = "Please enter a valid email address";
	}  
	else if(!usernameField.value) {
		validationErrMsg = "Please enter a username";
	}
	else if(!passwordField.value) {
		validationErrMsg = "Please enter a password";
	}
	
	if(validationErrMsg != "") {
		showValidationErrorDialog(validationErrMsg);
		win.setRightNavButton(done);
		return;
	}
	
	var jsonTextToDisplay = '';
	
	Ti.API.info("about to send.  usernane field value -> " + usernameField.value)
	var url = Ti.App.SERVICE_BASE_URL + 'user';
	var xhr = Titanium.Network.createHTTPClient();
	xhr.setTimeout(REQUEST_TIMEOUT); // 10 second timeout
	xhr.onerror = function(e) {
		Ti.API.info(e);
		win.setRightNavButton(done);
		showValidationErrorDialog("Unable to sign you up.  BookUp Web Services are currently unavailable.  Please try again soon.");
	}
	xhr.onload = function() {
		// set the right nav button back to done
		win.setRightNavButton(done);
		
	    var resp = this.responseText;  
	    Ti.API.info(resp);
	    
	    var responseObject = eval('('+resp+')');
	    if(responseObject.error) { // backend error message
	    	showValidationErrorDialog(responseObject.error);
	    }
	    else { // successful
	    	// if the profile image has not be selected by the user, just complete the process
	    	//if(g_profileImage == null) {
	    		g_doneDialog.show();
	    		return;
	    	//}
	    	/*
	    	var urlPhoto = Ti.App.SERVICE_BASE_URL + 'user/'+responseObject.userName+'/photo';
        	Ti.API.info('Preparing to send data to: ' + urlPhoto);
        	win.setRightNavButton(spinnerButton);
          	
        	var xhr2 = Titanium.Network.createHTTPClient();
        	
        	xhr2.open("POST",urlPhoto);  
        	xhr2.setTimeout(REQUEST_TIMEOUT); // 10 second timeout
       		xhr2.send({myFile:g_profileImage});
			xhr2.onerror = function()  {
				win.setRightNavButton(done);
				showValidationErrorDialog("Your account was created, but we had problems uploading your profile image.  Please log in and set your profile image from the settings screen.");
			}
			
        	xhr2.onload = function() {
        		win.setRightNavButton(done);
			    var resp = this.responseText;  
			    Ti.API.info(resp);
			    if(!resp) { // no data returned means it was a success
			    	g_doneDialog.show();
			    	return;
			    }
			    else { // otherwise, there was an error
			    	showValidationErrorDialog(resp);
				}   	
        	}
        	*/
	    }
	};


	Ti.API.debug(url);
	xhr.open('POST', url);
	xhr.send({'jsondata':{
		"id":0,
		"aboutMe":"",
		"activationMethod":"native",
		"email":emailField.value,
		"firstName":"null",
		"lastName":"null",
		"middleName":"null",
		"password":passwordField.value,
		"userName":usernameField.value,
		"userTypeCode":"user",
		"picture":g_profileImage
	}}); 
	
	//xhr.send({'jsondata':{"class":"bookbook.domain.User","id":null,"aboutMe":"","activationMethod":"native","createDate":"Sat Nov 12 01:39:32 EST 2011","email":"","endDate":null,"firstName":"Barack","lastLoginDate":null,"lastName":"Obama","middleName":"","password":"","photoUrl":"http://localhost:8080/Bookbook/images/maxavatar.jpg","updateDate":null,"userId":179,"userName":"yeswecan","userTypeCode":"user"}});
});

win.setRightNavButton(done);

// add the back button (need to change this to the automatic back button)
var backButton = Titanium.UI.createButton({
    title:'Back',
    style:Titanium.UI.iPhone.SystemButtonStyle.PLAIN
});
backButton.addEventListener('click',function()
{
	Titanium.API.debug("You clicked the button back button");
	closeThisWindow();
});
win.setLeftNavButton(backButton);

function closeThisWindow() {
	/*
	 * This event is caught by login.js and results in closing the tabGroup that contains
	 * this window.
	 */
	Ti.App.fireEvent('closeSignUpTabGroup');
}

function showValidationErrorDialog(message) {
	g_validateDialog.setMessage(message);
	g_validateDialog.show();
	
}
