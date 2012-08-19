var win = Ti.UI.currentWindow;  
win.layout = 'vertical'

var tab;

var tabGroup = Ti.UI.createTabGroup();

var bookObject = Titanium.UI.currentWindow.bookObject;

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
				
	checkInWin.bookObject = bookObject;
	
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
	text:"  "+bookObject.title+"  "+bookObject.bookId,
	top:0,
	height:30,
	left:0,
	width:'75%',
	textAlign: 'left',
	backgroundColor: '#fff',
	font:{fontSize:16, fontStyle:'bold'}
});

var image = Titanium.UI.createImageView({
	image: bookObject.smallThumbnailUrl,
	top: -20,
	right: 20
});

var bookInfo = Titanium.UI.createLabel({
	text:"By: "+bookObject.author+"\n"+bookObject.description,
	left: 10,
	top: -55,
	width: '72%',
	height: 70,
	font:{fontSize:14}
});

var readingButton = Titanium.UI.createButton({
	title:"Reading",
	height: 15,
	left: 10,
	top:10,
	font:{fontSize:10}
});

var commentsButton = Titanium.UI.createButton({
	title:"Comments",
	height: 15,
	left: 120,
	top: -15,
	font:{fontSize:10}
});

var readingItButton = Titanium.UI.createButton({
	title:"Reading It",
	height: 15,
	right: 10,
	top: -15,
	font:{fontSize:10}
});

var recentActivity = Titanium.UI.createLabel({
	text:"  Recent Activity",
	top:10,
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

commentButton.addEventListener('click',function()
{
	commentWin = Titanium.UI.createWindow({
					url:'../child_windows/comment.js',  
				    title:'Add Comment',
				    barColor: '#777',
				    fullscreen:false,
				    navBarHidden:false,
				    tabBarHidden:true,
				    backButtonTitle:'test'
				});
				
	commentWin.bookObject = bookObject;
	
					tab = Ti.UI.createTab({
					    title:"Doesn't matter",
					    window: commentWin
					});
					
				tabGroup.addTab(tab);	
				tabGroup.open();

				commentWin.open(); 
});

var moreButton = Titanium.UI.createButton({
	title: "More",
	top: -25,
	right: 10,
	height: 25,
	color: '#777'
});

var optionsDialogOpts = {
	options:['Buy this book', 'Add to book list', 'Tweet', 'Cancel'],
	//destructive:2,
	cancel:3,
	title:'More Actions'
};

var dialog = Titanium.UI.createOptionDialog(optionsDialogOpts);

// add event listener
dialog.addEventListener('click',function(e)
{
	//label.text = 'You selected ' + e.index;
	
	//if (isAndroid) {
		//if (e.button) {
		//	label.text += ' button';
		//}  else {
		//	label.text += ' option';
		//}
	//}
});

moreButton.addEventListener('click', function()
{
	dialog.show();
});

var today = Titanium.UI.createLabel({
	text:"  Today",
	top:2,
	height:26,
	left:0,
	width:'100%',
	textAlign: 'left',
	backgroundColor: '#fff',
	color: '#777',
	font:{fontSize:14, fontStyle:'bold'}
});

var borderBottom = Ti.UI.createView({
    backgroundColor: '#777',
    width: '100%',
    height: 1,
    bottom: 0
});

today.add(borderBottom);

statView.add(title);
statView.add(image);
statView.add(bookInfo);
statView.add(readingButton);
statView.add(commentsButton);
statView.add(readingItButton);
statView.add(recentActivity);
statView.add(commentButton);
statView.add(moreButton);
statView.add(today);
win.add(statView);

Ti.App.addEventListener('closeCheckInTabGroup', function() {
	tabGroup.removeTab(tab); //This deletes and creates a new tab for each selection
	tabGroup.close();
});

Ti.App.addEventListener('closeCommentTabGroup', function() {
	tabGroup.removeTab(tab); //This deletes and creates a new tab for each selection
	tabGroup.close();
});
