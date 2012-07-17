var win = Ti.UI.currentWindow;  
win.layout = 'vertical'

var tf = Titanium.UI.createTextField({
	height:32,
	backgroundImage:'../images/inputfield.png',
	width:Ti.Platform.displayCaps.platformWidth - 25,
	font:{fontSize:13},
	color:'#777',
	paddingLeft:10,
	returnKeyType:Titanium.UI.RETURNKEY_SEND,
	borderStyle:Titanium.UI.INPUT_BORDERSTYLE_NONE
});

var textfield = Titanium.UI.createTextField({  //This text field is never shown, it is hidden, but brings up the keyboard.
	color:'#336699',
	value:'Focus to see keyboard w/ toolbar',
	height:0,
	width:0,
	top:10,
	returnKeyType:Titanium.UI.RETURNKEY_SEND,
	borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
	keyboardToolbar:[tf],
	keyboardToolbarColor: '#999',	
	keyboardToolbarHeight: 40
});

var theTitle = Titanium.UI.currentWindow.bookTitle;

var backButton = Titanium.UI.createButton({
    title:'Back',
    style:Titanium.UI.iPhone.SystemButtonStyle.PLAIN
});
backButton.addEventListener('click',function()
{
	Titanium.API.debug("You clicked the button back button");
	closeThisWindow();
});
win.setLeftNavButton(backButton);

function closeThisWindow() {
	/*
	 * This event is caught by findBooks.js and results in closing the tabGroup that contains
	 * this window.
	 */
	Ti.App.fireEvent('closeCommentTabGroup');
}

var statView = Titanium.UI.createView({ 
			height:'auto', 
			layout:'vertical',
			backgroundColor: '#bbb', 
			top:0, right:0, bottom:0, left:0 }); 

var title = Titanium.UI.createLabel({
	text:"  "+theTitle,
	top:0,
	height:30,
	left:0,
	width:'100%',
	textAlign: 'left',
	backgroundColor: '#fff',
	font:{fontSize:18, fontStyle:'bold'}
});

var borderBottom = Ti.UI.createView({
    backgroundColor: '#000',
    width: '100%',
    height: 1,
    bottom: 0
});

//This is essentially a hack to create only the bottom and top borders
//Appcelerator does not support the selection of top, bottom, left, and right borders
title.add(borderBottom);

var scrollView = Ti.UI.createScrollView({
});

var commentContents = Ti.UI.createTableView({
	backgroundColor: '#CCC'
});

scrollView.add(commentContents);

statView.add(title);
statView.add(scrollView);
statView.add(textfield);
win.add(statView);

textfield.focus();
tf.focus();
