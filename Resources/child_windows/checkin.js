var win = Ti.UI.currentWindow;  
win.layout = 'vertical'

var REQUEST_TIMEOUT = Ti.App.REQUEST_TIMEOUT;

var bookObject = Titanium.UI.currentWindow.bookObject;

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

var pickerLabel = Ti.UI.createLabel({
	text: 'Select chapter(s) for this checkin',
	left: '5%',
	top: '2%'
});

var picker = Ti.UI.createPicker({
	width: '25%',
	top: '3%',
	left: '5%',
	textAlign: 'center'
});

var data = [];
var i=0;
for(i=0; i<99; i++) 
{
	data[i] = 	{title:''+(i+1),custom_item:'b',fontSize:18};
}

picker.add(data);
// turn on the selection indicator (off by default)
picker.selectionIndicator = true;

var fbButton = Ti.UI.createButton({
	title: 'Post to FaceBook',
	width:'50%',
	height: 50,
	right: '5%',
	top: -142
});

var twitterButton = Ti.UI.createButton({
	title: 'Post to Twitter',
	width:'50%',
	height: 50,
	right: '5%',
	top: -118
});

var pickerValue;

picker.addEventListener('change',function(e) {
    pickerValue = e.row.title;
});

twitterButton.addEventListener('click', function(e){
	var url = Ti.App.SERVICE_BASE_URL + 'book/'+bookObject.bookId+'/checkIn';
	var xhr = Titanium.Network.createHTTPClient();
	xhr.setTimeout(REQUEST_TIMEOUT); // 10 second timeout
	xhr.onerror = function(e) {
		Ti.API.info(e);
	}
	xhr.onload = function() {
	    var resp = this.responseText;  
	    Ti.API.info(resp);
	    
	    var responseObject = eval('('+resp+')');
	    if(responseObject.error) { // backend error message
	    	showValidationErrorDialog(responseObject.error);
	    }
	    else { // successful
	    		g_doneDialog.show();
	    		return;
	    }
	};


	Ti.API.debug(url);
	xhr.open('POST', url);
	xhr.send({'jsondata':{
		"chapterOrSection":5,//pickerValue,
		"latitude":"null",
		"longitude":"null",
		"narritive":"I love this book",//commentArea.value,
		"userId":3,//Ti.App.CurrentUser.userId,
		"venue":"null"
	}}); 
});

fbButton.addEventListener('click', function(e){
	if(Ti.Facebook.loggedIn) {
		var data = {
            name:''+bookObject.title,
            link:"http://mywebsite.com",
            caption:'On Chapter:'+pickerValue,
            description:''+commentArea.value,
        };

	 facebook_dialog = Titanium.Facebook.dialog(
                    "feed", 
                    data, 
                    showRequestResult); 
                    
    function showRequestResult(r)
    {
        //alert(r)
 
        if (r.result)
        {
            facebook_response = Ti.UI.createAlertDialog({
                        title:'Facebook Shared!',
                       message:'Your stream was published'
                       });
        }
        else
        {
            facebook_response = Ti.UI.createAlertDialog({
                           title:'Facebook Stream was cancelled',  
                           message:'Nothing was published.'
                         });
 
        }
        facebook_response.show();
        var fb_resp_timeout = setTimeout(function(){
            facebook_response.hide();
        }, 2000);
    }
	}
	
	else
	{
		
	}
});


statView.add(title);
statView.add(commentArea);
statView.add(pickerLabel);
statView.add(picker);
statView.add(fbButton);
statView.add(twitterButton);
win.add(statView);
