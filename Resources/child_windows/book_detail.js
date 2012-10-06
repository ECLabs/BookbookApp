var win = Ti.UI.currentWindow;  
win.layout = 'vertical'

var tab;

var REQUEST_TIMEOUT = Ti.App.REQUEST_TIMEOUT;

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

win.setRightNavButton(checkinButton);

var statView = Titanium.UI.createView({ 
			height:'auto', 
			layout:'vertical',
			backgroundColor: '#fff', 
			top:0, right:0, bottom:0, left:0 }); 

var title = Titanium.UI.createLabel({
	text:"  "+bookObject.title,
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

var bookListInfo;
var haveRead = "Add to Have Read";
var like = "Add to Like";
var wantToRead = "Add to Want to Read";

getLists();

function getLists()
{
	var url = Ti.App.SERVICE_BASE_URL + 'book/'+bookObject.bookId+'?userId='+Ti.App.CurrentUser.userId;
	var xhr = Titanium.Network.createHTTPClient();
	xhr.setTimeout(REQUEST_TIMEOUT); // 10 second timeout
				
	xhr.onerror = function() {
		Ti.API.info(url);
	}
	xhr.onload = function() {
		var resp = JSON.parse(this.responseText);
		Ti.API.info(resp);
		var i;
		bookListInfo = resp.listsForUser;
		for(i=0; i<bookListInfo.length; i++)
		{
			if(bookListInfo[i].type == "HAVE_READ")
			{
				haveRead = "Remove from Have Read";
			}
			else if(bookListInfo[i].type == "LIKE")
			{
				like = "Remove from Like";
			}
			else if(bookListInfo[i].type == "WANT_TO_READ")
			{
				wantToRead = "Remove from Want to Read";
			}
		}
		g_doneDialog.show();
	}
						
	Ti.API.debug(url);
	xhr.open('GET', url);
	xhr.send(); 
}

var optionsDialogOpts = {
	options:[haveRead, like, wantToRead, 'Tweet', 'Cancel'],
	//destructive:2,
	cancel:4,
	title:'More Actions'
};

var dialog = Titanium.UI.createOptionDialog(optionsDialogOpts);

moreButton.addEventListener('click', function()
{
	optionsDialogOpts.options = [haveRead, like, wantToRead, 'Tweet', 'Cancel'];
	dialog = Titanium.UI.createOptionDialog(optionsDialogOpts);
	dialog.show();

	// add event listener
	dialog.addEventListener('click',function(e)
	{
		if(e.index == 0)
		{
			if(haveRead == "Add to Have Read")
			{
				var url = Ti.App.SERVICE_BASE_URL + 'list/userId-'+Ti.App.CurrentUser.userId;
				var xhr = Titanium.Network.createHTTPClient();
				xhr.setTimeout(REQUEST_TIMEOUT); // 10 second timeout
			
				xhr.onerror = function() {
					Ti.API.info("This book is already added to this users list");
				}
				xhr.onload = function() {
				    var resp = this.responseText;  
				    Ti.API.info(resp);
				    
					alert("''"+bookObject.title+"'' has been added to your ''Have Read'' list.");
					haveRead = "Remove from Have Read";
					getLists();
				    g_doneDialog.show();
				}
					
				Ti.API.debug(url);
				xhr.open('POST', url);
				xhr.send({'jsondata':{
					"bookId":bookObject.bookId,
					"title":bookObject.title,
					"listType":"HAVE_READ"
				}}); 
			}
			else
			{
				for(i=0; i<bookListInfo.length; i++)
				{
					if(bookListInfo[i].type == "HAVE_READ")
					{
						var url = Ti.App.SERVICE_BASE_URL + 'list/delete/bookListId-'+bookListInfo[i].bookListId;
						var xhr = Titanium.Network.createHTTPClient();
						xhr.setTimeout(REQUEST_TIMEOUT); // 10 second timeout
		
						xhr.onerror = function() {
							alert("BookUp Web Services are currently unavailable.  Please try again soon.");
							Ti.API.info(url);
						}
						xhr.onload = function() {
						    var resp = this.responseText;  
						    Ti.API.info(resp);
						    
						    alert("''"+bookObject.title+"'' has been removed from your ''Have Read'' list.");
						    haveRead = "Add to Have Read";
						    getLists();
						}
					
						Ti.API.debug(url);
						xhr.open('GET', url);
						xhr.send(); 

					}
				}
			}
		}
		else if(e.index == 1)
		{
			if(like == "Add to Like")
			{
				var url = Ti.App.SERVICE_BASE_URL + 'list/userId-'+Ti.App.CurrentUser.userId;
				var xhr = Titanium.Network.createHTTPClient();
				xhr.setTimeout(REQUEST_TIMEOUT); // 10 second timeout
		
				xhr.onerror = function() {
					showMessageDialog("BookUp Web Services are currently unavailable.  Please try again soon.");
					
				}
				xhr.onload = function() {
				    var resp = this.responseText;  
				    Ti.API.info(resp);
				    
					alert("''"+bookObject.title+"'' has been added to your ''Like'' list.");
					like = "Remove from Like";
					getLists();
				    g_doneDialog.show();
				}
					
				Ti.API.debug(url);
				xhr.open('POST', url);
				xhr.send({'jsondata':{
					"bookId":bookObject.bookId,
					"title":bookObject.title,
					"listType":"LIKE"
				}}); 
			}
			else
			{
				for(i=0; i<bookListInfo.length; i++)
				{
					if(bookListInfo[i].type == "LIKE")
					{
						var url = Ti.App.SERVICE_BASE_URL + 'list/delete/bookListId-'+bookListInfo[i].bookListId;
						var xhr = Titanium.Network.createHTTPClient();
						xhr.setTimeout(REQUEST_TIMEOUT); // 10 second timeout
		
						xhr.onerror = function() {
							alert("BookUp Web Services are currently unavailable.  Please try again soon.");
							Ti.API.info(url);
						}
						xhr.onload = function() {
						    var resp = this.responseText;  
						    Ti.API.info(resp);
						    
						    alert("''"+bookObject.title+"'' has been removed from your ''Like'' list.");
						    like = "Add to like";
						    getLists();
						}
					
						Ti.API.debug(url);
						xhr.open('GET', url);
						xhr.send(); 

					}
				}
			}
		}
		else if(e.index == 2)
		{
			if(wantToRead == "Add to Want to Read")
			{
				var url = Ti.App.SERVICE_BASE_URL + 'list/userId-'+Ti.App.CurrentUser.userId;
				var xhr = Titanium.Network.createHTTPClient();
				xhr.setTimeout(REQUEST_TIMEOUT); // 10 second timeout
		
				xhr.onerror = function() {
					showMessageDialog("BookUp Web Services are currently unavailable.  Please try again soon.");
					
				}
				xhr.onload = function() {
				    var resp = this.responseText;  
				    Ti.API.info(resp);
				    
					alert("''"+bookObject.title+"'' has been added to your ''Want to Read'' list.");
					wantToRead = "Remove from Want to Read";
					getLists();
				    g_doneDialog.show();
				}
					
				Ti.API.debug(url);
				xhr.open('POST', url);
				xhr.send({'jsondata':{
					"bookId":bookObject.bookId,
					"title":bookObject.title,
					"listType":"WANT_TO_READ"
				}}); 	
			}
			else
			{
				for(i=0; i<bookListInfo.length; i++)
				{
					if(bookListInfo[i].type == "WANT_TO_READ")
					{
						var url = Ti.App.SERVICE_BASE_URL + 'list/delete/bookListId-'+bookListInfo[i].bookListId;
						var xhr = Titanium.Network.createHTTPClient();
						xhr.setTimeout(REQUEST_TIMEOUT); // 10 second timeout
		
						xhr.onerror = function() {
							alert("BookUp Web Services are currently unavailable.  Please try again soon.");
							Ti.API.info(url);
						}
						xhr.onload = function() {
						    var resp = this.responseText;  
						    Ti.API.info(resp);
						    
						    alert("''"+bookObject.title+"'' has been removed from your ''Want to Read'' list.");
						    wantToRead = "Add to Want to Read";
						    getLists();
						}
					
						Ti.API.debug(url);
						xhr.open('GET', url);
						xhr.send(); 

					}
				}
			}
		}
	});
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
