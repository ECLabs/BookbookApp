var win = Ti.UI.currentWindow;  
  
//Create the scroll area, all our content goes in here  
var scrollArea3 = Titanium.UI.createScrollView({  
    top: 55,  
    width: Ti.Platform.displayCaps.platformWidth,  
    height: (Ti.Platform.displayCaps.platformHeight - 111),  
    contentHeight: 'auto',
    showVerticalScrollIndicator: true,
    backgroundColor: '#fff'
}); 
win.add(scrollArea3);

var REQUEST_TIMEOUT = Ti.App.REQUEST_TIMEOUT;
		   
var statsTable = Titanium.UI.createTableView();

scrollArea3.add(statsTable);

var rowData = []

var friendCountLabel = Titanium.UI.createLabel({
	text:'32 Friends',
	height: 'auto',
	width: 280,
	color: 'blue',
	font:{fontSize:12,fontFamily:'Helvetica Neue'}
})
var checkinCountLabel = Titanium.UI.createLabel({
	text:'32 Checkins',
	height: 'auto',
	width: 280,
	color: 'blue',
	font:{fontSize:12,fontFamily:'Helvetica Neue'}
})

		
var statView1 = Titanium.UI.createView({ 
			height:'auto', 
			layout:'vertical',
			backgroundColor: '#fff', 
			top:5, right:5, bottom:5, left:5 }); 

var statView2 = Titanium.UI.createView({ 
			height:'auto', 
			layout:'vertical',
			backgroundColor: '#aaa', 
			top:5, right:5, bottom:5, left:5 });
statView2.add(friendCountLabel) 
			
var statView3 = Titanium.UI.createView({ 
			height:'auto', 
			layout:'vertical',
			backgroundColor: '#aaa', 
			top:5, right:5, bottom:5, left:5 }); 
statView3.add(checkinCountLabel)

var profilePic = Titanium.UI.createImageView({
	image:'http://www.appcelerator.com/wp-content/uploads/2009/06/titanium_desk.png',
	height:'30%',
	width: '35%',
	top:'-7%',
	left:'5%',
});

var username = Titanium.App.Properties.getString("username");
var userData;
var resp;

var url = Ti.App.SERVICE_BASE_URL + 'user/'+username;
var xhr = Titanium.Network.createHTTPClient();
xhr.onload = function() {
		    resp = this.responseText;
		    Ti.API.info(resp);
		    
		    userData = JSON.parse(resp);

			profileName.text = userData.fullName;
			bioLabel.text = userData.aboutMe;
			locationLabel.text = userData.location;
			if(userData.photoUrl != ''){profilePic.image = userData.photoUrl;}
		   }
		  
xhr.open('GET', url);
xhr.send();

var profileName = Titanium.UI.createLabel({
	id:'curReadLabel',
	text:'',
	top:'-20%',
	height:'10%',
	left:'45%',
	font:{fontSize:18, fontStyle:'bold'},
	width: '50%'
});

var editProfileButton = Titanium.UI.createButton({
	title:'Edit',
	height:25,
	width:'21%',
	top:0,
	right:'5%',
	borderWidth:4,
	color: '#000000'
});

editProfileButton.addEventListener('click', function(e)
{
	var editProfileWin = Titanium.UI.createWindow({
		url:'../child_windows/manage_profile.js',
    	title: 'Book Detail',
	});
	
	Titanium.UI.currentTab.open(editProfileWin,{animated:true});	
});

var locationLabel = Titanium.UI.createLabel({
	id:'locationLabel',
	text:'Location',
	top:'-5%',
	height:'5%',
	font:{fontSize:11},
	left:'45%',
	width: '45%'
});

var bioLabel = Titanium.UI.createLabel({
	id:'bioLabel',
	text:'',
	height:'5%',
	font:{fontSize:11},
	left:'5%',
	width: '90%'
});

// create table view data object
var data = [
	{title:'Currently Reading', hasChild:true, height:35, selectedColor:'#fff'},
	{title:'Want to Read', hasChild:true, height: 35, selectedColor:'#fff'},
	{title:'Recently Read', hasChild:true, height: 35, selectedColor:'#fff'},
];

// create table view
var tableview = Titanium.UI.createTableView({
	data:data,
	font:{fontSize:11},
	top:'2%',
	width: '90%',
	height: 105,
	borderWidth:1,
	borderColor: '#888'
});

statView1.add(editProfileButton);
statView1.add(profilePic);
statView1.add(profileName);
statView1.add(locationLabel);
statView1.add(bioLabel);
statView1.add(tableview);
		
var totalFriendsRow = Titanium.UI.createTableViewRow({height:'auto', backgroundColor:'#f00'});
totalFriendsRow.add(statView1);
rowData[0] = totalFriendsRow;

var totalCheckinsRow = Titanium.UI.createTableViewRow({height:'auto', backgroundColor:'#f00'});
totalCheckinsRow.add(statView2);
rowData[1] = totalCheckinsRow;

var totalCheckinsRow = Titanium.UI.createTableViewRow({height:'auto', backgroundColor:'#f00'});
totalCheckinsRow.add(statView3);
rowData[2] = totalCheckinsRow;

statsTable.data = rowData;

// FB login button, appears only if user logged in with FB.
var fbButton = Ti.Facebook.createLoginButton({
    style : Ti.Facebook.BUTTON_STYLE_WIDE
})
statView1.add(fbButton);

// This is the non-facebook logout button... only appears if the user
// did not login with FB
var logoutButton = Titanium.UI.createButton({
	title:'Logout',
	color:'#000',
	font:{fontSize:12,fontFamily:'Helvetica Neue', fontWeight:'bold'},
	borderRadius: 5,
	borderColor: '#000',
	height: 35,
	width: 120,
	backgroundColor: '#feba86'
});
statView1.add(logoutButton);

logoutButton.addEventListener('click', function(e) {
	Ti.API.debug("logging out of Bookup");
    closeThisWindow();
});


Ti.Facebook.addEventListener('logout', function(e) {
    Ti.API.debug("logging out of FB/Bookup");
    closeThisWindow();
});

win.addEventListener('focus', function(e) {
	if(Ti.Facebook.loggedIn) {
		Ti.API.debug("showing FB logout");
		fbButton.show();
		logoutButton.hide();
	} else {
		Ti.API.debug("hiding FB logout");
		fbButton.hide();
		logoutButton.show();
	}
});

function closeThisWindow() {
	/*
	 * This event is caught by login.js and results in closing the tabGroup that contains
	 * this window.
	 */
	Ti.App.fireEvent('closeMainTabGroup');
}

Ti.App.addEventListener('saveProfileEvent', function() {
	var username = Titanium.App.Properties.getString("username");
	var userData2;
	var resp2;
	
	var url2 = Ti.App.SERVICE_BASE_URL + 'user/'+username;
	var xhr2 = Titanium.Network.createHTTPClient();
	xhr2.onload = function() {
			    resp2 = this.responseText;
			    Ti.API.info(resp2);

			    userData2 = JSON.parse(resp2);
			    
				profileName.text = userData2.fullName;
				bioLabel.text = userData2.aboutMe;
				locationLabel.text = userData2.location;
				profilePic.image = userData2.photoUrl;
			   }
			  
	xhr2.open('GET', url);
	xhr2.send();
});

