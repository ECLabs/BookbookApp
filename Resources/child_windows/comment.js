var win = Ti.UI.currentWindow;  
win.layout = 'vertical';
win.height = "40%";
win.top = 0;
var firstTime = true;

function reload()
{
	
		commentContents.data = [];
		loadComments();
	
}
	
var bookObject = Titanium.UI.currentWindow.bookObject;

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
	value:'',
	height:0,
	width:0,
	top:10,
	returnKeyType:Titanium.UI.RETURNKEY_SEND,
	borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
	keyboardToolbar:[tf],
	keyboardToolbarColor: '#999',	
	keyboardToolbarHeight: 40
});

tf.addEventListener('return', function()
{
	var url = Ti.App.SERVICE_BASE_URL + 'book/'+bookObject.bookId+'/opinion';
	var xhr = Titanium.Network.createHTTPClient();
	xhr.setTimeout(1000); // 10 second timeout
	xhr.onerror = function(e) {
		Ti.API.info("An error has occurred: " + e);
	}
	xhr.onload = function() {
	    var resp = this.responseText;  
	    Ti.API.info(resp);
	    
	    var responseObject = eval('('+resp+')');
	    if(responseObject.error) { // backend error message
	    	showValidationErrorDialog(responseObject.error);
	    }
	    else { // successful
	    		openKeyboard();
	    		reload();
	    		alert("Success!");
	    		return;
	    }
	};


	Ti.API.debug(url);
	xhr.open('POST', url);
	xhr.send({'jsondata':{
		"text": tf.value,
  		"bookId": bookObject.bookId,
  		"userId": Ti.App.CurrentUser.userId
	}}); 
});

var statView = Titanium.UI.createView({ 
	height:'auto', 
	layout:'vertical',
	backgroundColor: '#bbb', 
	top:0, 
	right:0, 
	bottom:0, 
	left:0
}); 

var title = Titanium.UI.createLabel({
	text:"  "+bookObject.title,
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

Titanium.UI.currentWindow.addEventListener('focus', loadComments);

function loadComments()
{
	var url = Ti.App.SERVICE_BASE_URL + 'book/'+bookObject.bookId+'/opinion';
	var xhr = Titanium.Network.createHTTPClient();
	xhr.setTimeout(1000); // 10 second timeout
	xhr.onerror = function(e) {
		Ti.API.info("An error has occurred: " + e);
	}
	xhr.onload = function() {
	    var resp = this.responseText;  
	    Ti.API.info(resp);
	    
	    var responseObject = eval('('+resp+')');
	    if(responseObject.error) { // backend error message
	    	showValidationErrorDialog(responseObject.error);
	    }
	    else { // successful
	    		var tableRow = [];
	    		
	    		var offset = 0;
	    		var i=0;
	    		for(i=responseObject.length-1; i>=0; i--)
	    		{
	    			var commentView = Titanium.UI.createView({ 
	    				layout:'verticle',
	    				backgroundColor: '#CCC',
	    				width:'100%',
	    				height:Ti.UI.SIZE
	    			});
	    			
	    			var userImage = Titanium.UI.createImageView({
	    				height:40,
	    				width:30,
	    				left:4,
	    				top:1,
	    				image:responseObject[i].user.photoUrl
	    			});
	    			
	    			var userNameText = Titanium.UI.createLabel({
	    				text:responseObject[i].user.userName+" ",
	    				color:'blue',
	    				top:0,
	    				left: 38,
	    				font:{fontSize:12, fontStyle:'bold'}
	    			});
	    			
	    			var x;
	    			var spaces = '';
	    			for(x=0; x<responseObject[i].user.userName.length; x++)
	    			{
	    				spaces += '  ';
	    			}
	    			
	    			var commentText = Titanium.UI.createLabel({
	    				text:spaces+''+responseObject[i].text+'\n\n\n',
	    				font:{fontSize:12},
	    				top:1,
	    				left: 38
	    			});
	    			
	    			var createDate = Titanium.UI.createLabel({
	    				text:responseObject[i].createDate,
	    				font:{fontSize:12},
	    				left:38,
	    				height:22,
	    				bottom: 0
	    			});
	    			
	    			commentView.add(userImage);
	    			commentView.add(userNameText);
	    			commentView.add(commentText);
	    			commentView.add(createDate);
	    			
	    			var row = Titanium.UI.createTableViewRow({});
	    			row.add(commentView);
	    			tableRow[offset++] = row;
	    		}
	    		
	    		commentContents.data = tableRow;
	    		
	    		if(firstTime)
	    		{
					scrollView.add(commentContents);
					
					statView.add(title);
					statView.add(scrollView);
					statView.add(textfield);
		    		win.add(statView);
	    		}
	    		firstTime = false;
	    		openKeyboard();
	    		
	    		return;
	    }
	};


	Ti.API.debug(url);
	xhr.open('GET', url);
	xhr.send(); 
}

function openKeyboard()
{
	tf.value = '';
	textfield.focus();
	tf.focus();
}

