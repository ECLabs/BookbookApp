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
	width:'35%',
	top:'-7%',
	left:'5%',
});

var profileName = Titanium.UI.createLabel({
	id:'curReadLabel',
	text:'My Name',
	top:'-20%',
	height:'10%',
	left:'45%',
	font:{fontSize:18, fontStyle:'bold'}
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
		
	});
	
	var saveProfileButton = Titanium.UI.createButton({
	title:'Save',
	height:25,
	width:'21%',
	top:0,
	right:'5%',
	borderWidth:4,
	color: '#000000'
	});
	
	saveProfileButton.addEventListener('click', function(e)
	{
		editProfileWin.close();
	});
	
	var profileManage = Titanium.UI.createLabel({
	text:'Manage Profile',
	top:'12%',
	height:'10%',
	left:'45%',
	font:{fontSize:18, fontStyle:'bold'}
	});
	
	var profilePicManage = Titanium.UI.createImageView({
	image:'http://www.appcelerator.com/wp-content/uploads/2009/06/titanium_desk.png',
	height:'30%',
	width:'35%',
	top:0,
	left:'5%',
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
	{title:'Read a While Ago', hasChild:true, height: 35, selectedColor:'#fff'}
];

// create table view
var tableviewManage = Titanium.UI.createTableView({
	data:data,
	font:{fontSize:11},
	top:'49%',
	width: '90%',
	height: 140,
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
	
	tableviewManage.hide(); //Initial state
	
	editProfileWin.add(winview);
	
	Titanium.UI.currentTab.open(editProfileWin,{animated:true});	
});


var locationLabel = Titanium.UI.createLabel({
	id:'locationLabel',
	text:'Location',
	top:'-5%',
	height:'5%',
	font:{fontSize:11},
	left:'45%'
});

var bioLabel = Titanium.UI.createLabel({
	id:'bioLabel',
	text:'Bio information...',
	height:'5%',
	font:{fontSize:11},
	left:'5%'
});

// create table view data object
var data = [
	{title:'Currently Reading', hasChild:true, height:35, selectedColor:'#fff'},
	{title:'Want to Read', hasChild:true, height: 35, selectedColor:'#fff'},
	{title:'Recently Read', hasChild:true, height: 35, selectedColor:'#fff'},
	{title:'Read a While Ago', hasChild:true, height: 35, selectedColor:'#fff'}
];

// create table view
var tableview = Titanium.UI.createTableView({
	data:data,
	font:{fontSize:11},
	top:'2%',
	width: '90%',
	height: 140,
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

