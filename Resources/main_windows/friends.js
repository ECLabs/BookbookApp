var win = Ti.UI.currentWindow;  
  
var friendsTableView = Titanium.UI.createTableView();


	
//Create the scroll area, all our content goes in here  
var scrollArea2 = Titanium.UI.createScrollView({  
    top: 0,   
    contentHeight: 'auto',
    showVerticalScrollIndicator: true,
    backgroundColor: '#fff'
}); 

scrollArea2.add(friendsTableView);

var simpleView = Titanium.UI.createView({
	top:0
})

win.add(scrollArea2);


friendsTableView.addEventListener('click', function(e)
{
	Ti.API.debug('click row: ' + e.row.className)
})

Titanium.API.info("Loading friends...");
var jsonTextToDisplay = '';
var host = 'labs.evanschambers.com'; // 'localhost';
var url = 'http://'+host+':8080/Bookbook/api/user/rjevans/following';
var xhr = Titanium.Network.createHTTPClient();
xhr.onload = function() {
	Titanium.API.info(' Text: ' + this.responseText);
    var jsonObject = JSON.parse(this.responseText);
    jsonTextToDisplay = this.responseText;
    Titanium.API.info(jsonTextToDisplay);

    // display loading message
    Ti.API.debug('loading data: ' + jsonTextToDisplay)
    Ti.API.debug('length: ' + jsonObject.length)
    
    var rowData = []
    
    if(jsonObject.length <= 0)
    {
    	var noResultsLabel = Titanium.UI.createLabel({
			text:'No results',
			height: 'auto',
			width: 250,
			left: 0,
			top: 0,
			textAlign:'left',
			font:{fontSize:14,fontFamily:'Helvetica Neue',fontWeight:'bold'}
		})
		
		var friendRowView = Titanium.UI.createView({ 
			height:'auto', 
			layout:'vertical',
			backgroundColor: '#aaa', 
			top:5, right:5, bottom:5, left:5 }); 
		friendRowView.add(noResultsLabel); 
		
		var row = Titanium.UI.createTableViewRow({height:'auto', backgroundColor:'#f00'});
		row.add(friendRowView);
		rowData[i] = row;
    }
    
    for(i =0; i < jsonObject.length; i++)
    {
    	Ti.API.debug('beginning index: ' + i)
    	var v = jsonObject[i]
    	var firstName = v.firstName
    	var lastName = v.lastName
    	var userName = v.userName
    	var userId = v.userId
    	var photoUrl = v.photoUrl
    	
    	Ti.API.debug(firstName);
    	Ti.API.debug(lastName);
    	Ti.API.debug(userName);
    	Ti.API.debug(userId);
    	Ti.API.debug(photoUrl);
 
    	
    	var avatar = Titanium.UI.createImageView({  
		    image:photoUrl, // the image for the image view  
		    top:0,  
		    left:0,  
		    height:48,  
		    width:48,
		    borderColor: '#aaa',
		    borderWidth: 3
		})
		
		var nameLabel = Titanium.UI.createLabel({
			text:firstName + ' ' + lastName,
			height: 'auto',
			width: 190,
			left: 55,
			top: -48,
			bottom: 2,
			textAlign:'left',
			font:{fontSize:14,fontFamily:'Helvetica Neue',fontWeight:'bold'}
		})
		
		var userIdLabel = Titanium.UI.createLabel({
			text:'Id: ' + userId,
			width: 250,
			left:55,
			top:0,
			height:'auto',
			font:{fontSize:12,fontFamily:'Helvetica Neue'}
		})
		
		
		var viewLabel = Titanium.UI.createLabel({
			text:'View',
			top:-48,
			left:280,
			height: 'auto',
			width: 50,
			color: 'blue',
			font:{fontSize:12,fontFamily:'Helvetica Neue'}
		})
		var friendRowView = Titanium.UI.createView({ height:50, layout:'vertical', top:5, right:5, bottom:5, left:5 }); 
		friendRowView.add(avatar);
		friendRowView.add(nameLabel);
		friendRowView.add(userIdLabel);

		//bookRowView.add(viewLabel);
		
		Ti.API.debug('building for  #' + i)
		var row = Titanium.UI.createTableViewRow({height:'auto', className:userId});
		row.add(friendRowView);
		rowData[i] = row;
		Ti.API.debug('completed for  #' + i)
	}
	Ti.API.debug('finished loading rows');
	// Create the table view and set its data source to "rowData" array  
	friendsTableView.data = rowData;
	scrollArea2.scrollTo(0,0)		

};
xhr.open('GET', url);
xhr.send(null);
