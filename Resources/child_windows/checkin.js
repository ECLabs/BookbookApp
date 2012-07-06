var win = Ti.UI.currentWindow;  
win.layout = 'vertical'

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
	commentArea.blur();
	Ti.App.fireEvent('closeCheckInTabGroup');
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

var commentArea = Titanium.UI.createTextArea({
	editable: true,
	value: 'Enter a comment to post about this book here!',
	height:100,
	width:'95%',
	top:10,
	font:{fontSize:16},
	color:'#000',
	textAlign:'left',
	returnKeyType:Titanium.UI.RETURNKEY_DONE,
	borderWidth:1,
	borderColor:'#000',
	borderRadius:9,
	suppressReturn:false
});

commentArea.addEventListener('return', function()
{
    commentArea.blur();
});

commentArea._hintText = commentArea.value;
 
commentArea.addEventListener('focus',function(e){
    if(e.source.value == e.source._hintText){
        e.source.value = "";
    }
});
commentArea.addEventListener('blur',function(e){
    if(e.source.value==""){
        e.source.value = e.source._hintText;
    }
});

statView.add(title);
statView.add(commentArea);
win.add(statView);
