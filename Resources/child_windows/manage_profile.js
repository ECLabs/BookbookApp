
	var scrollWin = Titanium.UI.createScrollView({
		width: '100%',
		height: '100%'
	});
	
	var REQUEST_TIMEOUT = Ti.App.REQUEST_TIMEOUT;
	
	var saveProfileButton = Titanium.UI.createButton({
	title:'Save',
	height:25,
	width:'21%',
	top:0,
	right:'5%',
	borderWidth:4,
	color: '#000000'
	});
	
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

var url = Ti.App.SERVICE_BASE_URL + 'user/'+username;
var xhr = Titanium.Network.createHTTPClient();
xhr.onload = function() {
		    resp = this.responseText;
		    Ti.API.info(resp);
		    
		    userData = JSON.parse(resp);

			nameText.value = userData.fullName;
			bioArea.value = userData.aboutMe;
			userId.value = userData.userId;
			locationText.value = userData.location;
			if(userData.photoUrl != ''){profilePicManage.image = userData.photoUrl;}
		  }
		  
xhr.open('GET', url);
xhr.send();
	
	var profilePicManage = Titanium.UI.createImageView({
	image:'http://www.appcelerator.com/wp-content/uploads/2009/06/titanium_desk.png',
	height:'30%',
	width:'35%',
	top:0,
	left:'5%',
});

profilePicManage.addEventListener('click', function(e)
{
Titanium.Media.openPhotoGallery({
		success:function(event) {
			var image = event.media;
		    Ti.API.info(image.height +' x '+ image.width);
        	profilePicManage.image = image;
        	Ti.API.info(image.height + " x " + image.width);        	   
  
        	profilePicManage.image = image;
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
	{title:'Currently Reading', hasChild:true, height:35, selectedColor:'#fff'},
	{title:'Want to Read', hasChild:true, height: 35, selectedColor:'#fff'},
	{title:'Recently Read', hasChild:true, height: 35, selectedColor:'#fff'},
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
	winview.add(saveProfileButton);
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
	
	var navActInd = Titanium.UI.createActivityIndicator();
	
saveProfileButton.addEventListener('click', function(e)
	{
		
		var url = Ti.App.SERVICE_BASE_URL + 'user/update/userId-'+userId.value;
		var xhr = Titanium.Network.createHTTPClient();
		xhr.setTimeout(REQUEST_TIMEOUT); // 10 second timeout
		xhr.onerror = function() {
			showValidationErrorDialog("BookUp Web Services are currently unavailable.  Please try again soon.");
		}
		xhr.onload = function() {
		    var resp = this.responseText;  
		    Ti.API.info(resp);
		}
		
		xhr.open('POST', url);
		xhr.send({'jsondata':{
			"class":"bookbook.domain.User",
			"id":null,
			"aboutMe":bioArea.value,
			"activationMethod":"native",
			//"createDate":"",
			//"email":"",
			//"endDate":"",
			//"firstName":"",
			"fullName":nameText.value,
			//"lastLoginDate":"",
			//"lastName":"",
			"location":locationText.value,
			//"middleName":"null",
			"password":password,
			//"photoUrl":"",
			//"updateDate":null,
			"userId":userId.value,
			"userName":username,
			//"userTypeCode":"user"
		}}); 
		
		var urlPhoto = Ti.App.SERVICE_BASE_URL + 'user/'+username+'/photo';
        	Ti.API.info('Preparing to send data to: ' + urlPhoto);
		
		var xhr3 = Titanium.Network.createHTTPClient();
        	xhr3.open("POST",urlPhoto);  
        	xhr3.setTimeout(REQUEST_TIMEOUT); // 10 second timeout
       		xhr3.send({myFile:profilePicManage.image});
			xhr3.onerror = function()  {
				win.setRightNavButton(done);
				showValidationErrorDialog("Sorry, we could not upload this image.");
			}
			
        	xhr3.onload = function() {
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
		
		Ti.UI.currentWindow.setRightNavButton(navActInd);
		navActInd.show();
		setTimeout(function()
		{
			navActInd.hide();
			Ti.UI.currentWindow.setRightNavButton(null);
			Ti.App.fireEvent('saveProfileEvent');
			Ti.UI.currentWindow.close();
		},3000);
	});
