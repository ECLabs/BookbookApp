var win = Ti.UI.currentWindow;
var currUser = Ti.App.CurrentUser;
var REQUEST_TIMEOUT = Ti.App.REQUEST_TIMEOUT;


var g_messageDialog = Ti.UI.createAlertDialog({
	buttonNames: ['Continue'],
	cancel:0,
	title: 'Error',
	message: 'There\'s an error.'
});

function showMessageDialog(message) {
	g_messageDialog.setMessage(message);
	g_messageDialog.show();
	
}

var spinnerButton = Titanium.UI.createButton({
	systemButton:Titanium.UI.iPhone.SystemButton.SPINNER
});



win.addEventListener('open', function(e) {
	Ti.API.info('in OPEN handler on manage_profile.js window');
	currUser = Ti.App.CurrentUser;
	nameText.value = currUser.fullName;
	bioArea.value = currUser.aboutMe;
	userId.value = currUser.userId;
	locationText.value = currUser.location;
});

var g_doneDialog = Ti.UI.createAlertDialog({
	buttonNames: ['Sign-in'],
	cancel:0,
	title: 'Success',
	message: 'Your changes have been changed.'
});
g_doneDialog.addEventListener('click', function(e) {
	win.close();
});
var scrollWin = Titanium.UI.createScrollView({
	width: '100%',
	height: '100%'
});
	

var changepPhoto = false;
	
var profileManage = Titanium.UI.createLabel({
	text:'Manage Profile',
	top:'12%',
	height:'10%',
	left:'45%',
	font:{fontSize:18, fontStyle:'bold'}
});
	
var userId = Titanium.UI.createLabel({  //This is a place holder so that our userId will be in scope
});
	
	
var username = Titanium.App.Properties.getString("username");
var password = Titanium.App.Properties.getString("password");
var userData;
var resp;

var profilePicManage = Titanium.UI.createImageView({
	image:'http://www.appcelerator.com/wp-content/uploads/2009/06/titanium_desk.png',
	height:'30%',
	width:'35%',
	top:0,
	left:'5%'
});


profilePicManage.addEventListener('click', function(e)
{
	// display spinner in the top right navbar
	win.setRightNavButton(spinnerButton);
	
	Titanium.Media.openPhotoGallery({
		success:function(event) {
			var image = event.media;
			
		    Ti.API.info('Image dimensions - ' + image.height +' x '+ image.width);
		    Ti.API.info('Image filesize - ' + image.length);
		    
		    win.setRightNavButton(save);
		    
		    if(image.length > 2097152) { 
		    	showMessageDialog("The image you uploaded is greater than 2MB.  Unable to upload.");
		    	return;
		    }
        	profilePicManage.image = image;
        	changepPhoto = true;
		}
	});
});
	
var aboutMeButton = Titanium.UI.createButton({
	title:'About Me',
	height:40,
	width:'45%',
	top:'32%',
	left:'5%',
	borderWidth:4,
	color: '#000000'
});
	
aboutMeButton.addEventListener('click', function(e)
{
	tableviewManage.hide();
	nameLabel.show();
	nameText.show();
	locationLabel.show();
	locationText.show();
	bioLabel.show();
	bioArea.show();
});
	
var myReadingButton = Titanium.UI.createButton({
	title:'My Reading',
	height:40,
	width:'45%',
	top:'32%',
	right:'5%',
	borderWidth:4,
	color: '#000000'
});
	
myReadingButton.addEventListener('click', function(e)
{
	nameLabel.hide();
	nameText.hide();
	locationLabel.hide();
	locationText.hide();
	bioLabel.hide();
	bioArea.hide();
	tableviewManage.show();
});
	
var nameLabel = Titanium.UI.createLabel({
	text:'Name:',
	top:'44%',
	left:'10%',
	font:{fontSize:16}
});
	
var nameText = Titanium.UI.createTextField({
	editable: true,
	value: '',
	width:'80%',
	left:'10%',
	height: 25,
	top:'49%',
	font:{fontSize:14},
	color:'#000',
	textAlign:'left',
	returnKeyType:Titanium.UI.RETURNKEY_DONE,
	borderWidth:2,
	borderColor:'#000',
	borderRadius:0,
	suppressReturn:false,
	paddingLeft: 5
});
	
var locationLabel = Titanium.UI.createLabel({
	text:'Location:',
	top:'56%',
	left:'10%',
	font:{fontSize:16}
});
	
var locationText = Titanium.UI.createTextField({
	editable: true,
	value: '',
	width:'80%',
	left:'10%',
	top:'61%',
	height: 25,
	font:{fontSize:14},
	color:'#000',
	textAlign:'left',
	returnKeyType:Titanium.UI.RETURNKEY_DONE,
	borderWidth:2,
	borderColor:'#000',
	borderRadius:0,
	suppressReturn:false,
	paddingLeft: 5
});
	
var bioLabel = Titanium.UI.createLabel({
	text:'Biography:',
	top:'68%',
	left:'10%',
	font:{fontSize:16}
});
	
var bioArea = Titanium.UI.createTextArea({
	editable: true,
	value: '',
	height:'25%',
	width:'80%',
	left:'10%',
	top:'73%',
	font:{fontSize:14},
	color:'#000',
	textAlign:'left',
	returnKeyType:Titanium.UI.RETURNKEY_DONE,
	borderWidth:2,
	borderColor:'#000',
	borderRadius:0,
	suppressReturn:false,
	paddingLeft: 5
});

bioArea.addEventListener('return', function()
{
    bioArea.blur();
});

nameText.addEventListener('return', function()
{
    nameText.blur();
});

locationText.addEventListener('return', function()
{
    locationText.blur();
});

// create table view data object
var dataManage = [
	{title:'Have Read', hasChild:true, height:35, selectedColor:'#fff'},
	{title:'Like', hasChild:true, height: 35, selectedColor:'#fff'},
	{title:'Want to Read', hasChild:true, height: 35, selectedColor:'#fff'},
];

// create table view
var tableviewManage = Titanium.UI.createTableView({
	data:dataManage,
	font:{fontSize:11},
	top:'49%',
	width: '90%',
	height: 105,
	borderWidth:1,
	borderColor: '#888'
});


	
var winview = Ti.UI.createView({backgroundColor:'white'});
//winview.add(saveProfileButton);
winview.add(profilePicManage);
winview.add(profileManage);
winview.add(aboutMeButton);
winview.add(myReadingButton);
winview.add(nameLabel);
winview.add(nameText);
winview.add(locationLabel);
winview.add(locationText);
winview.add(bioLabel);
winview.add(bioArea);
winview.add(tableviewManage);
winview.add(userId);
	
tableviewManage.hide(); //Initial state
scrollWin.add(winview);
Ti.UI.currentWindow.add(scrollWin);
		
// add a save button to the right nav bar
var save = Titanium.UI.createButton({
	systemButton:Titanium.UI.iPhone.SystemButton.SAVE
});
win.setRightNavButton(save);	
save.addEventListener('click', function(e)
{
	// display spinner in the top right navbar
	win.setRightNavButton(spinnerButton);
		
	var url = Ti.App.SERVICE_BASE_URL + 'user/update/userId-'+userId.value;
	var xhr = Titanium.Network.createHTTPClient();
	// Have to extend the timeout... pictures are taking a really long time to upload
	xhr.setTimeout(40000); // 40 second timeout
	//xhr.setTimeout(REQUEST_TIMEOUT); // 10 second timeout
	xhr.onerror = function() {
		win.setRightNavButton(save);
		showMessageDialog("BookUp Web Services are currently unavailable.  Please try again soon.");
		
	}
	xhr.onload = function() {
		win.setRightNavButton(save);
	    var resp = this.responseText;  
	    Ti.API.info(resp);
	    
	    var user = JSON.parse(resp);
	    Ti.App.CurrentUser = user;
	    Ti.App.fireEvent('saveProfileEvent');
	    g_doneDialog.show();
	}
		
	xhr.open('POST', url);
	
	currUser.aboutMe = bioArea.value;
	currUser.fullName = nameText.value;
	currUser.location = locationText.value;
		
	if(changepPhoto == true)
	{	
		//var img = profilePicManage.toBlob();
		
		currUser.picture = Ti.Utils.base64encode(profilePicManage.toBlob().imageAsResized(100,100)).toString();
	}
	
	var obj = ({'jsondata':currUser});
	Ti.API.info('JSON data about to be sent for update user -->');
	//Ti.API.info(JSON.stringify(obj)); -- this logging statement takes a long time to display
		
	xhr.send(obj); 

});
	
	
nameText.value = currUser.fullName;
bioArea.value = currUser.aboutMe;
userId.value = currUser.userId;
locationText.value = currUser.location;
if(currUser.photoUrl != ''){profilePicManage.image = currUser.photoUrl;}
