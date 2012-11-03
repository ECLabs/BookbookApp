var win = Ti.UI.currentWindow;  
Titanium.UI.currentWindow.addEventListener('focus', loadWindow);

function loadWindow() //Encompasses everything
{
var logoutButton = Titanium.UI.createButton({
    title:'Logout',
    style:Titanium.UI.iPhone.SystemButtonStyle.PLAIN,
    backgroundColor: '#eeee00',
});

logoutButton.addEventListener('click', function(e) {
	Ti.API.debug("logging out of Bookup");
	if(Ti.Facebook.loggedIn) {
		closeThisWindow();
		Ti.Facebook.logout();
	} else {
    	closeThisWindow();
   }
});

win.setRightNavButton(logoutButton);
win.title = Ti.App.CurrentUser.userName;

//Create the scroll area, all our content goes in here  
var scrollArea3 = Titanium.UI.createScrollView({   
    width: Ti.Platform.displayCaps.platformWidth + 10,  
    height: (Ti.Platform.displayCaps.platformHeight - 108),  
    contentHeight: 'auto',
    showVerticalScrollIndicator: false,
    backgroundColor: '#fff',
    left: -5
}); 
win.add(scrollArea3);

var REQUEST_TIMEOUT = Ti.App.REQUEST_TIMEOUT;

var oneSelected = false;
var twoSelected = false;
var threeSelected = false;
		
var statView1 = Titanium.UI.createView({ 
			height:'auto', 
			layout:'vertical',
			backgroundColor: '#fff', 
			top:5, right:5, bottom:5, left:5 }); 
			
var profileLabel = Titanium.UI.createLabel({
	text:"  PROFILE",
	top:0,
	height:22,
	left:0,
	width: '100%',
	textAlign: 'left',
	backgroundColor: '#ff9900',
	color: '#fff',
	font:{fontSize:16, fontStyle:'bold'}
});

var profileHorzView = Titanium.UI.createScrollView({
	width: 'auto',  
    height: 60,  
    showVerticalScrollIndicator: false,
    layout: 'horizontal',
    backgroundColor: '#fff',
    top: 0
});

var profilePic = Titanium.UI.createImageView({
	image:'http://www.appcelerator.com/wp-content/uploads/2009/06/titanium_desk.png',
	height:'60',
	width: '60',
	top:0,
	left:0,
});




var userData;
var resp;

var profileName = Titanium.UI.createLabel({
	id:'curReadLabel',
	text:'',
	top: 0,
	left: 6,
	font:{fontSize:15, fontStyle:'bold'}
});

var editProfileButton = Titanium.UI.createButton({
	title:'->',
	height:30,
	width:'15%',
	top:15,
	left: 10,
	borderRadius: 10,
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
	text:'',
	top:15,
	left:6,
	color: '#777',
	font:{fontSize:14}
});

var bioLabel = Titanium.UI.createLabel({
	id:'bioLabel',
	text:'',
	height:30,
	top: 30,
	left: 6,
	font:{fontSize:10},
	width: '100%'
});

var profileVertView = Titanium.UI.createView({
	top: 0,
	width: '60%',
	layout: 'verticle'
});

profileVertView.add(profileName);
profileVertView.add(locationLabel);
profileVertView.add(bioLabel);

var likeHorzView = Titanium.UI.createScrollView({
	width: 'auto',  
    height: 160,  
    showVerticalScrollIndicator: false,
    layout: 'horizontal',
    backgroundColor: '#fff',
    top: 0
});
	
var wantToReadHorzView = Titanium.UI.createScrollView({
	width: 'auto',  
    height: 160,  
    showVerticalScrollIndicator: false,
    layout: 'horizontal',
    backgroundColor: '#fff',
    top: 0
});

var skimmedHorzView = Titanium.UI.createScrollView({
	width: 'auto',  
    height: 160,  
	showVerticalScrollIndicator: false,
	layout: 'horizontal',
	backgroundColor: '#fff',
	top: 0
});

var haveReadHorzView = Titanium.UI.createScrollView({
	width: 'auto',  
    height: 160,  
    showVerticalScrollIndicator: false,
    layout: 'horizontal',
    backgroundColor: '#fff',
    top: 0
});

var numLike = 0;
var numWantToRead = 0;
var numHaveRead = 0;
var numSkimmed = 0;

loadData();

function loadData() 
{
	var i;
	numLike = 0;
	numWantToRead = 0;
	numHaveRead = 0;
	numSkimmed = 0;

	var url = Ti.App.SERVICE_BASE_URL + 'list/userId-'+Ti.App.CurrentUser.userId;
	var xhr = Titanium.Network.createHTTPClient();
	xhr.setTimeout(REQUEST_TIMEOUT); // 10 second timeout
	xhr.onerror = function(e) {
		Ti.API.info(e);
		Ti.API.info("ERROR");
	}
	xhr.onload = function() {
	    var resp = JSON.parse(this.responseText);  
	    var length = Object.keys(resp).length;
	    Ti.API.info(resp);

	    if(resp == '') { 
	    	updateView();
	    }
	    else { // successful
	    	for(i=0; i<length; i++)
	    	{
	    		if(resp[i].type == 'HAVE_READ')
		    	{
		    		var bookView = Ti.UI.createImageView({
		   				image: resp[i].book.thumbnailUrl,
		   				top:0,
		   				height:130,
		   				width:80,
		   				left:20,
		   				id:resp[i].book
		   			});
		   			
		   			var titleView = Ti.UI.createLabel({
		   				text:resp[i].book.title,
		   				font:{fontSize:11},
		   				bottom:12,
		   				left:-80,
		   				width:80,
		   				height:12,
		   				textAlign: 'center'
		   			});
		   			
		   			var authorView = Ti.UI.createLabel({
		   				text:resp[i].book.author,
		   				font:{fontSize:11},
		   				bottom:0,
		   				left:-80,
		   				width:80,
		   				height:12,
		   				textAlign: 'center'
		   			});
		   			
		   			haveReadHorzView.add(bookView);
		   			haveReadHorzView.add(titleView);
		   			haveReadHorzView.add(authorView);
		   			numHaveRead++;
		   			
		   			bookView.addEventListener('click', function(e)
					{
						var jsonObjectNewBook = this.id;

					  	var book_detail = Titanium.UI.createWindow({
							url:'../child_windows/book_detail.js',  
						    title:'',
						    barColor: '#777',
						    fullscreen:false,
						    navBarHidden:false,
						    tabBarHidden:true,
						    backButtonTitle:'Back'
						});
								
						book_detail.bookObject = jsonObjectNewBook;
				
						Titanium.UI.currentTab.open(book_detail,{animated:true});	
					});
		   		}
		   		else if(resp[i].type == 'LIKE')
		   		{
		   			var bookView = Ti.UI.createImageView({
		   				image: resp[i].book.thumbnailUrl,
		   				top:0,
		   				height:130,
		   				width:80,
		   				left:20,
		   				id:resp[i].book
		   			});
		   			
		   			var titleView = Ti.UI.createLabel({
		   				text:resp[i].book.title,
		   				font:{fontSize:11},
		   				bottom:12,
		   				left:-80,
		   				width:80,
		   				height:12,
		   				textAlign: 'center'
		   			});
		   			
		   			var authorView = Ti.UI.createLabel({
		   				text:resp[i].book.author,
		   				font:{fontSize:11},
		   				bottom:0,
		   				left:-80,
		   				width:80,
		   				height:12,
		   				textAlign: 'center'
		   			});
		   			
		   			likeHorzView.add(bookView);
		   			likeHorzView.add(titleView);
		   			likeHorzView.add(authorView);
		   			numLike++;
		   			
		   			bookView.addEventListener('click', function(e)
					{
						var jsonObjectNewBook = this.id;

					  	var book_detail = Titanium.UI.createWindow({
							url:'../child_windows/book_detail.js',  
						    title:'',
						    barColor: '#777',
						    fullscreen:false,
						    navBarHidden:false,
						    tabBarHidden:true,
						    backButtonTitle:'Back'
						});
								
						book_detail.bookObject = jsonObjectNewBook;
				
						Titanium.UI.currentTab.open(book_detail,{animated:true});	
					});
		   		}
		   		else if(resp[i].type == 'WANT_TO_READ') 
		   		{
		   			var bookView = Ti.UI.createImageView({
		   				image: resp[i].book.thumbnailUrl,
		   				top:0,
		   				height:130,
		   				width:80,
		   				left:20,
		   				id:resp[i].book
		   			});
		   			
		   			var titleView = Ti.UI.createLabel({
		   				text:resp[i].book.title,
		   				font:{fontSize:11},
		   				bottom:12,
		   				left:-80,
		   				width:80,
		   				height:12,
		   				textAlign: 'center'
		   			});
		   			
		   			var authorView = Ti.UI.createLabel({
		   				text:resp[i].book.author,
		   				font:{fontSize:11},
		   				bottom:0,
		   				left:-80,
		   				width:80,
		   				height:12,
		   				textAlign: 'center'
		   			});
		   			
		   			wantToReadHorzView.add(bookView);
		   			wantToReadHorzView.add(titleView);
		   			wantToReadHorzView.add(authorView);
		   			numWantToRead++;
		   			
		   			bookView.addEventListener('click', function(e)
					{
						var jsonObjectNewBook = this.id;

					  	var book_detail = Titanium.UI.createWindow({
							url:'../child_windows/book_detail.js',  
						    title:'',
						    barColor: '#777',
						    fullscreen:false,
						    navBarHidden:false,
						    tabBarHidden:true,
						    backButtonTitle:'Back'
						});
								
						book_detail.bookObject = jsonObjectNewBook;
				
						Titanium.UI.currentTab.open(book_detail,{animated:true});	
					});
		   		}
		   		else if(resp[i].type == 'HAVE_SKIMMED') 
		   		{
		   			var bookView = Ti.UI.createImageView({
		   				image: resp[i].book.thumbnailUrl,
		   				top:0,
		   				height:130,
		   				width:80,
		   				left:20,
		   				id:resp[i].book
		   			});
		   			
		   			var titleView = Ti.UI.createLabel({
		   				text:resp[i].book.title,
		   				font:{fontSize:11},
		   				bottom:12,
		   				left:-80,
		   				width:80,
		   				height:12,
		   				textAlign: 'center'
		   			});
		   			
		   			var authorView = Ti.UI.createLabel({
		   				text:resp[i].book.author,
		   				font:{fontSize:11},
		   				bottom:0,
		   				left:-80,
		   				width:80,
		   				height:12,
		   				textAlign: 'center'
		   			});
		   			
		   			skimmedHorzView.add(bookView);
		   			skimmedHorzView.add(titleView);
		   			skimmedHorzView.add(authorView);
		   			numSkimmed++;
		   			
		   			bookView.addEventListener('click', function(e)
					{
						var jsonObjectNewBook = this.id;

					  	var book_detail = Titanium.UI.createWindow({
							url:'../child_windows/book_detail.js',  
						    title:'',
						    barColor: '#777',
						    fullscreen:false,
						    navBarHidden:false,
						    tabBarHidden:true,
						    backButtonTitle:'Back'
						});
								
						book_detail.bookObject = jsonObjectNewBook;
				
						Titanium.UI.currentTab.open(book_detail,{animated:true});	
					});
		   		}
		   	}
			
			updateView();
		   	return;
	 	}
	};
	
	
	Ti.API.debug(url);
	xhr.open('GET', url);
	xhr.send();
}


function updateView()
{
	var likeLabel = Titanium.UI.createLabel({
		text:"  BOOKS I LIKE ("+numLike+")",
		top:0,
		height:22,
		left:0,
		width: '100%',
		textAlign: 'left',
		backgroundColor: '#00CCFF',
		color: '#fff',
		font:{fontSize:16, fontStyle:'bold'}
	});
	
	var wantToReadLabel = Titanium.UI.createLabel({
		text:"  BOOKS I WANT TO READ ("+numWantToRead+")",
		top:0,
		height:22,
		left:0,
		width: '100%',
		textAlign: 'left',
		backgroundColor: '#00cc33',
		color: '#fff',
		font:{fontSize:16, fontStyle:'bold'}
	});
	
	var skimmedLabel = Titanium.UI.createLabel({
		text:"  BOOKS I HAVE SKIMMED ("+numSkimmed+")",
		top:0,
		height:22,
		left:0,
		width: '100%',
		textAlign: 'left',
		backgroundColor: '#e9e900',
		color: '#fff',
		font:{fontSize:16, fontStyle:'bold'}
	});
	
	var haveReadLabel = Titanium.UI.createLabel({
		text:"  BOOKS I HAVE READ ("+numHaveRead+")",
		top:0,
		height:22,
		left:0,
		width: '100%',
		textAlign: 'left',
		backgroundColor: '#cc0000',
		color: '#fff',
		font:{fontSize:16, fontStyle:'bold'}
	});
	
profileHorzView.add(profilePic);
profileHorzView.add(profileVertView);
profileHorzView.add(editProfileButton);

statView1.add(profileLabel);
statView1.add(profileHorzView);

if(numLike==0){likeHorzView.height = 5;}
if(numWantToRead==0){wantToReadHorzView.height = 5;}
if(numHaveRead==0){haveReadHorzView.height = 5;}
if(numSkimmed==0){skimmedHorzView.height = 5;}

statView1.add(likeLabel);
statView1.add(likeHorzView);
statView1.add(wantToReadLabel);
statView1.add(wantToReadHorzView);
statView1.add(skimmedLabel);
statView1.add(skimmedHorzView);
statView1.add(haveReadLabel);
statView1.add(haveReadHorzView);

scrollArea3.add(statView1);
}



function closeThisWindow() {
	/*
	 * This event is caught by login.js and results in closing the tabGroup that contains
	 * this window.
	 */
	Ti.App.fireEvent('closeMainTabGroup');
}

profileName.text = Ti.App.CurrentUser.fullName;
bioLabel.text = Ti.App.CurrentUser.aboutMe;
locationLabel.text = Ti.App.CurrentUser.location;
if((Ti.App.CurrentUser.photoUrl != '') && (Ti.App.CurrentUser.photoUrl != '<null>')){profilePic.image = Ti.App.CurrentUser.photoUrl;}

Ti.App.addEventListener('saveProfileEvent', function() {
	Ti.API.info("in eventListener for 'saveProfileEvent'");
	var currUser = Ti.App.CurrentUser;    
	profileName.text = currUser.fullName;
	bioLabel.text = currUser.aboutMe;
	locationLabel.text = currUser.location;
	profilePic.image = currUser.photoUrl;
});
}
