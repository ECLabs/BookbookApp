var win = Ti.UI.currentWindow;  
win.layout = 'vertical'

var tab;

var tabGroup = Ti.UI.createTabGroup();

var theTitle = Titanium.UI.currentWindow.bookTitle;
var theAuthor = Titanium.UI.currentWindow.bookAuthor;
var theDesc = Titanium.UI.currentWindow.bookDesc;
var theImage = Titanium.UI.currentWindow.bookImage;

var backButton = Titanium.UI.createButton({
    title:'Back',
    style:Titanium.UI.iPhone.SystemButtonStyle.PLAIN
});

var checkinButton = Titanium.UI.createButton({
    title:'Check-In',
    style:Titanium.UI.iPhone.SystemButtonStyle.PLAIN,
    backgroundColor: '#eeee00',
});

checkinButton.addEventListener('click',function()
{
	checkInWin = Titanium.UI.createWindow({
					url:'../child_windows/checkin.js',  
				    title:'Check-In',
				    barColor: '#777',
				    fullscreen:false,
				    navBarHidden:false,
				    tabBarHidden:true,
				    backButtonTitle:'test'
				});
				
	checkInWin.bookTitle = theTitle;
	
					tab = Ti.UI.createTab({
					    title:"Doesn't matter",
					    window: checkInWin
					});
					
				tabGroup.addTab(tab);	
				tabGroup.open();

				checkInWin.open(); 
});

backButton.addEventListener('click',function()
{
	Titanium.API.debug("You clicked the button back button");
	closeThisWindow();
});
win.setLeftNavButton(backButton);
win.setRightNavButton(checkinButton);

function closeThisWindow() {
	/*
	 * This event is caught by findBooks.js and results in closing the tabGroup that contains
	 * this window.
	 */
	Ti.App.fireEvent('closeBook_DetailTabGroup');
}

var statView = Titanium.UI.createView({ 
			height:'auto', 
			layout:'vertical',
			backgroundColor: '#fff', 
			top:0, right:0, bottom:0, left:0 }); 

var title = Titanium.UI.createLabel({
	text:"  "+theTitle,
	top:0,
	height:30,
	left:0,
	width:'75%',
	textAlign: 'left',
	backgroundColor: '#fff',
	font:{fontSize:16, fontStyle:'bold'}
});

var image = Titanium.UI.createImageView({
	image: theImage,
	top: -20,
	right: 20
});

var bookInfo = Titanium.UI.createLabel({
	text:"By: "+theAuthor+"\n"+theDesc,
	left: 10,
	top: -55,
	width: '74%',
	height: 70,
	font:{fontSize:14}
});

var recentActivity = Titanium.UI.createLabel({
	text:"  Recent Activity",
	top:30,
	height:30,
	left:0,
	width:'100%',
	textAlign: 'left',
	backgroundColor: '#777',
	color: '#fff',
	font:{fontSize:14, fontStyle:'bold'}
});

var commentButton = Titanium.UI.createButton({
	title: "Comment",
	top: -28,
	right: 80,
	height: 25,
	color: '#777'
});

var moreButton = Titanium.UI.createButton({
	title: "More",
	top: -25,
	right: 10,
	height: 25,
	color: '#777'
});

var borderBottom = Ti.UI.createView({
    backgroundColor: '#000',
    width: '100%',
    height: 1,
    bottom: 0
});

statView.add(title);
statView.add(image);
statView.add(bookInfo);
statView.add(recentActivity);
statView.add(commentButton);
statView.add(moreButton);
win.add(statView);

Ti.App.addEventListener('closeCheckInTabGroup', function() {
	tabGroup.removeTab(tab); //This deletes and creates a new tab for each selection
	tabGroup.close();
});
