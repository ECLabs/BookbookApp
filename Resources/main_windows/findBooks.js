var win = Ti.UI.currentWindow;  
  
var tableView = Titanium.UI.createTableView({width: 'auto'});

var searchBar = Titanium.UI.createSearchBar({
	top:0,
	height: 40,
	autocorrect: false,
	hintText: 'Enter a title to find the book'
})

searchBar.addEventListener('return', function(e) {
	
	scrollArea.scrollTo(0,0)
	
	var host = 'labs.evanschambers.com'; // 'localhost';
	
	Titanium.API.info("You clicked the button");
	var jsonTextToDisplay = '';
	var url = 'http://'+host+':8080/Bookbook/book/external?title=' + searchBar.value + '&page=0';
	var xhr = Titanium.Network.createHTTPClient();
	xhr.onload = function() {
		Titanium.API.info(' Text: ' + this.responseText);
	    var jsonObject = JSON.parse(this.responseText);
	    jsonTextToDisplay = this.responseText;
	    Titanium.API.info(jsonTextToDisplay);
	    searchBar.blur();
	    
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
			
			var bookRowView = Titanium.UI.createView({ 
				height:'auto', 
				layout:'vertical',
				backgroundColor: '#aaa', 
				top:5, right:5, bottom:5, left:5 }); 
			bookRowView.add(noResultsLabel); 
			
			var row = Titanium.UI.createTableViewRow({height:'auto', backgroundColor:'#f00'});
			row.add(bookRowView);
			rowData[i] = row;
			
			rowData[0] = row.add(bookRowView.add(searchBar));
			
	    }
	    
	    for(i =0; i < jsonObject.length; i++)
	    {
	    	Ti.API.debug('beginning index: ' + i)
	    	var v = jsonObject[i]
	    	var smallThumbnail = v.smallThumbnailUrl
	    	var thumbnail = v.thumbnailUrl
	    	var title = v.title
	    	var author = v.author
	    	var description = v.description
	    	var isbn = v.isbn10
	    	
	    	Ti.API.debug(smallThumbnail);
	    	Ti.API.debug(thumbnail);
	    	Ti.API.debug(title);
	    	Ti.API.debug(author);
	    	Ti.API.debug(description);
	    	Ti.API.debug('isbn: ' + isbn);
	    	
	    	var coverImage = Titanium.UI.createImageView({  
			    image:smallThumbnail, // the image for the image view  
			    top:0,  
			    left:0,  
			    height:48,  
			    width:48
			    //borderColor: '#aaa',
			    //borderWidth: 3
			});
			
			var titleLabel = Titanium.UI.createLabel({
				text:title,
				height: 'auto',
				width: 190,
				left: 55,
				top: -48,
				bottom: 2,
				textAlign:'left',
				font:{fontSize:14,fontFamily:'Helvetica Neue',fontWeight:'bold'}
			});
			
			var authorLabel = Titanium.UI.createLabel({
				text:author+"\n\n",
				width: 240,
				left:55,
				top:0,
				height:'auto',
				font:{fontSize:12,fontFamily:'Helvetica Neue'}
			});
			
			var isbnLabel = Titanium.UI.createLabel({
				text:'ISBN: ' + isbn,
				width: 240,
				left:55,
				top:0,
				height:'auto',
				font:{fontSize:12,fontFamily:'Helvetica Neue'}
			});
			
			var descriptionLabel = Titanium.UI.createLabel({
				text:'Description: ' + description,
				width: 230,
				left:55,
				top:0,
				height:'auto',
				font:{fontSize:12,fontFamily:'Helvetica Neue'}
			});
			
			var viewLabel = Titanium.UI.createLabel({
				text:'View',
				top:-48,
				left:280,
				height: 'auto',
				width: 50,
				color: 'blue',
				font:{fontSize:12,fontFamily:'Helvetica Neue'}
			});
			
			var bookRowView = Titanium.UI.createView({ 
				height:70, 
				layout:'vertical', 
				top:5, 
				right:5, 
				bottom:5, 
				left:5 
			}); 
			bookRowView.add(coverImage);
			bookRowView.add(titleLabel);
			bookRowView.add(authorLabel);
			// bookRowView.add(isbnLabel);
			// bookRowView.add(descriptionLabel); 
			// bookRowView.add(viewLabel);
			
			Ti.API.debug('building for  #' + i)
			var row = Titanium.UI.createTableViewRow({height:'auto', className:isbn, hasChild:true});
			row.add(bookRowView);
			rowData[i] = row;
			Ti.API.debug('completed for  #' + i)
		}
		Ti.API.debug('finished loading rows');
		// Create the table view and set its data source to "rowData" array  
		tableView.data = rowData;
		scrollArea.scrollTo(0,0)		

	};
	xhr.open('GET', url);
	xhr.send(null);
	
});
//Create the scroll area, all our content goes in here  
var scrollArea = Titanium.UI.createScrollView({  
    top: 40,   
    contentHeight: 'auto',
    showVerticalScrollIndicator: true,
    backgroundColor: '#fff'
}); 

scrollArea.add(tableView);

var simpleView = Titanium.UI.createView({
	top:0
})

win.add(searchBar);
win.add(scrollArea);

win.addEventListener('click', function(e)
{
	searchBar.blur();
})
searchBar.addEventListener('blur', function(e)
{
	//searchBar.properties.showCancel = false;
})	
searchBar.addEventListener('focus', function(e)
{
	//searchBar.properties.showCancel = true;
})	
searchBar.addEventListener('change', function(e)
{
	/*
	if(searchBar.value == '')
	{
		Ti.API.debug(tableView.data.length);
		
		for(i = tableView.data.length - 1; i >= 0; i--)
		{
			tableView.deleteRow(i);
		}	
	}
	
	*/
})

tableView.addEventListener('click', function(e)
{
	Ti.API.debug('click row: ' + e.row.className)
})
