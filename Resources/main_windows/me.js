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

var oneSelected = false;
var twoSelected = false;
var threeSelected = false;

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

var userData;
var resp;

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
	{title:'Have Read', hasChild:true, height:35, selectedColor:'#fff'},
	{title:'Like', hasChild:true, height: 35, selectedColor:'#fff'},
	{title:'Want to Read', hasChild:true, height: 35, selectedColor:'#fff'},
];

// create table view
var tableview = Titanium.UI.createTableView({
	data:data,
	font:{fontSize:11},
	style: Titanium.UI.iPhone.TableViewStyle.GROUPED,
	backgroundColor:'transparent',
	top:'2%',
	width: '90%'
});
tableview.addEventListener('click', function(e) {
	var selectIndex = e.index;
	var i;
	var newData = [];
	var needData = true;
	
	if((e.rowData.title == 'Have Read') && (oneSelected == false))
	{
	    newData.push({title:'Have Read', hasChild:true, height:35, selectedColor:'#fff'});
	    oneSelected = true;
	    twoSelected = false;
	    threeSelected = false;
	}
	else if((e.rowData.title == 'Like') && (twoSelected == false))
	{
	    newData.push({title:'Have Read', hasChild:true, height:35, selectedColor:'#fff'});
	    newData.push({title:'Like', hasChild:true, height:35, selectedColor:'#fff'});
	    oneSelected = false;
	    twoSelected = true;
	    threeSelected = false;
	}
	else if((e.rowData.title == 'Want to Read') && (threeSelected == false))
	{
		newData.push({title:'Have Read', hasChild:true, height:35, selectedColor:'#fff'});
	    newData.push({title:'Like', hasChild:true, height:35, selectedColor:'#fff'});
	    newData.push({title:'Want to Read', hasChild:true, height:35, selectedColor:'#fff'});
	    oneSelected = false;
	    twoSelected = false;
	    threeSelected = true;
	}
	else
	{
	    needData = false;
	}
	
	if(needData)
	{
		var url = Ti.App.SERVICE_BASE_URL + 'list/userId-'+Ti.App.CurrentUser.userId;
		var xhr = Titanium.Network.createHTTPClient();
		xhr.setTimeout(REQUEST_TIMEOUT); // 10 second timeout
		xhr.onerror = function(e) {
			Ti.API.info(e);
		}
		xhr.onload = function() {
		    var resp = JSON.parse(this.responseText);  
		    var length = Object.keys(resp).length;
		    Ti.API.info(resp);
		   
		    if(resp == '') { 
		    	//No data do nothing
		    }
		    else { // successful
		    	for(i=0; i<length; i++)
		    	{
		    		Ti.API.info("i = "+i+"  // "+resp[i].type);
		    		if((resp[i].type == 'HAVE_READ') && (e.rowData.title == 'Have Read'))
		    		{
		    			newData.push({title:""+resp[i].book.title, height:35, selectedColor:'#fff'});
		    		}
		    		else if((resp[i].type == 'LIKE') && (e.rowData.title == 'Like'))
		    		{
		    			newData.push({title:""+resp[i].book.title, height:35, selectedColor:'#fff'});
		    		}
		    		else if((resp[i].type == 'WANT_TO_READ') && (e.rowData.title == 'Want to Read'))
		    		{
		    			newData.push({title:""+resp[i].book.title, height:35, selectedColor:'#fff'});
		    		}
		    	}
		    	
		    	if((e.rowData.title == 'Have Read') && (oneSelected == true))
				{
				    newData.push({title:'Like', hasChild:true, height:35, selectedColor:'#fff'});
					newData.push({title:'Want to Read', hasChild:true, height:35, selectedColor:'#fff'});
				}
				else if((e.rowData.title == 'Like') && (twoSelected == true))
				{
				    newData.push({title:'Want to Read', hasChild:true, height:35, selectedColor:'#fff'});
				}

				tableview.data = newData;
		    	
		    		g_doneDialog.show();
		    		return;
		    }
		};
	
	
		Ti.API.debug(url);
		xhr.open('GET', url);
		xhr.send();
	}
	
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
statView2.add(fbButton);

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
statView2.add(logoutButton);

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

profileName.text = Ti.App.CurrentUser.name;
bioLabel.text = Ti.App.CurrentUser.aboutMe;
locationLabel.text = Ti.App.CurrentUser.location;
if(Ti.App.CurrentUser.photoUrl != ''){profilePic.image = Ti.App.CurrentUser.photoUrl;}

Ti.App.addEventListener('saveProfileEvent', function() {
	Ti.API.info("in eventListener for 'saveProfileEvent'");
	var currUser = Ti.App.CurrentUser;    
	profileName.text = currUser.fullName;
	bioLabel.text = currUser.aboutMe;
	locationLabel.text = currUser.location;
	profilePic.image = currUser.photoUrl;
});
