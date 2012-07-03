// Globals
Ti.App.SERVICE_BASE_URL='http://labs.evanschambers.com:8080/Bookbook/api/';


// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');

var checkinWin = Ti.UI.createWindow({  
    url:'main_windows/findBooks.js',  
    height:Ti.Platform.displayCaps.platformHeight,  
    width:Ti.Platform.displayCaps.platformWidth,  
    //fullscreen:false,  
    navBarHidden:false,
    title:'Look Up!'
     
});

var followingWin = Titanium.UI.createWindow({
	url:'main_windows/friends.js',  
    height:Ti.Platform.displayCaps.platformHeight,  
    width:Ti.Platform.displayCaps.platformWidth,    
    title:'Following',
    backgroundColor:'#000'
});

var meWin = Titanium.UI.createWindow({
	url:'main_windows/me.js',  
    height:Ti.Platform.displayCaps.platformHeight,  
    width:Ti.Platform.displayCaps.platformWidth,    
    title:'Me',
    backgroundColor:'#000'
});

// create tab group
var tabGroup = Titanium.UI.createTabGroup();


//
// create base UI tab and root window
//

var tab1 = Titanium.UI.createTab({  
    icon:'KS_nav_views.png',
    title:'Following',
    window:followingWin
});

var tab2 = Titanium.UI.createTab({  
    icon:'KS_nav_ui.png',
    title:'Me',
    window:meWin
});

var tab3 = Titanium.UI.createTab({  
	icon:'KS_nav_ui.png',
    title:'Book It!',
    window:checkinWin
});


//
//  add tabs
//
tabGroup.addTab(tab3);
tabGroup.addTab(tab1);  
tabGroup.addTab(tab2);

/**
 * 	This login window runs first.  The tab group opens when login window closes
 */
var loginWin = Ti.UI.createWindow({
	url:'main_windows/login.js',
	height:Ti.Platform.displayCaps.platformHeight,  
    width:Ti.Platform.displayCaps.platformWidth,  
    fullscreen:false,  
    navBarHidden:true,
    tabBarHidden:true,
    title:'Login'
});
/*
var tabGroupHidden = Ti.UI.createTabGroup();

var tab = Ti.UI.createTab({
    title:"Doesn't matter",
    window: loginWin
});
 
tabGroupHidden.addTab(tab);
tabGroupHidden.open();
*/

loginWin.addEventListener('close', function() {
	// open tab group
	//Ti.API.debug('g_username -->' + g_username);
	//tab2.title = g_username;
	tabGroup.open();
	
});
loginWin.open();
