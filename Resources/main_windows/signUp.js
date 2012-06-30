// Page constants
var FIELD_WIDTH = 185;
var FIELD_LEFT_POS = 100;
var HOST_PROD = 'labs.evanschambers.com';
var HOST_DEV = 'localhost';
var g_photoData = null;

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

// create table view event listener
// opens photo gallery to allow user to select avatar photo.
row.addEventListener('click', function(e)
{
	Titanium.Media.openPhotoGallery({
		success:function(event) {
			var image = event.media;
		    Ti.API.info(image.height +' x '+ image.width);
        	imageView.setImage(image);
        	image = imageView.toImage();
        	Ti.API.info(image.height + " x " + image.width);
        	
        	var f = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory,'bookupprofilephoto.png');
        	f.write(image);
        	g_photoData = f.read();

        
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



// add a done button to the right nav bar
var done = Titanium.UI.createButton({
	systemButton:Titanium.UI.iPhone.SystemButton.DONE
});
done.addEventListener('click',function(e) { 
	Titanium.API.info("You clicked the button"); 
	
	// validate email format
	var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;   
	
	if(!emailField.value || reg.test(emailField.value) == false) {
		alert("ERROR - Please enter a valid email address");
		return;
	}  
	if(!usernameField.value) {
		alert("ERROR - Please enter a username");
		return;
	}
	if(!passwordField.value) {
		alert("ERROR - Please enter a password");
		return;
	}
	
	var jsonTextToDisplay = '';
	
	Ti.API.debug("about to send.  usernane field value -> " + usernameField.value)
	var url = 'http://'+HOST_DEV+':8080/Bookbook/api/user';
	var xhr = Titanium.Network.createHTTPClient();
	xhr.onload = function() {
	    var resp = this.responseText;  
	    Ti.API.info(resp);
	    
	    if(resp == 'user could not be added') {
	    	alert(resp);	
	    }
	    else { // successful
	    	var newUserObj = eval('('+resp+')');
	    	if(!g_photoData) {
	    		alert("Your account has been created without a profile photo.  Please sign in.");
	    		closeThis();
	    	}
	    	var urlPhoto = 'http://'+HOST_DEV+':8080/Bookbook/api/user/'+newUserObj.userName+'/photo';
        	Ti.API.info(urlPhoto);
        	var data_to_send = { 
	            "photo": g_photoData 
        	};
        	
			Ti.API.info("after creating data_to_send");
        	var xhr2 = Titanium.Network.createHTTPClient();
        	xhr2.setRequestHeader("enctype", "multipart/form-data");
       		xhr2.setRequestHeader("Content-Type", "multipart/form-data");
       		xhr2.set
       		
			xhr2.open('POST', urlPhoto);
        	xhr2.onload = function() {
			    var resp = this.responseText;  
			    Ti.API.info(resp);
			    if(!resp) {
			    	alert("Your account has been created with profile photo.  Please sign in.");
	    	
			    	closeThis();
			    }
			}
			xhr2.send(data_to_send); 
        	
	    	
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
		"userTypeCode":"user"
	}}); 
	
	//xhr.send({'jsondata':{"class":"bookbook.domain.User","id":null,"aboutMe":"","activationMethod":"native","createDate":"Sat Nov 12 01:39:32 EST 2011","email":"","endDate":null,"firstName":"Barack","lastLoginDate":null,"lastName":"Obama","middleName":"","password":"","photoUrl":"http://localhost:8080/Bookbook/images/maxavatar.jpg","updateDate":null,"userId":179,"userName":"yeswecan","userTypeCode":"user"}});
});




win.setRightNavButton(done);

// add the back button (need to change this to the automatic back button)
var backButton = Titanium.UI.createButton({
    title:L('Back'),
    style:Titanium.UI.iPhone.SystemButtonStyle.PLAIN
});
backButton.addEventListener('click',function()
{
	Titanium.API.info("You clicked the button");
	/*
	 * This event is caught by login.js and results in closing the tabGroup that contains
	 * this window.
	 */
	Ti.App.fireEvent('closeSignUpTabGroup'); 
});
win.setLeftNavButton(backButton);

function closeThis() {
	/*
	 * This event is caught by login.js and results in closing the tabGroup that contains
	 * this window.
	 */
	Ti.App.fireEvent('closeSignUpTabGroup');
}
