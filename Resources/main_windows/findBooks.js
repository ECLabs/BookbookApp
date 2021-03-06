var win = Ti.UI.currentWindow;  
win.layout = 'vertical'

var REQUEST_TIMEOUT = Ti.App.REQUEST_TIMEOUT;

var count = 0;
var tab;

var tabGroup = Ti.UI.createTabGroup();

var searchBar = Titanium.UI.createSearchBar({
	top:56,
	height: 'auto',
	autocorrect: false,
	hintText: 'Enter a title to find the book'
})


//Create the scroll area, all our content goes in here  
var scrollArea = Titanium.UI.createScrollView({    
    contentHeight: (count * 70),
    height: 'auto',
    showVerticalScrollIndicator: true,
    backgroundColor: '#fff'
}); 

var tableView = Titanium.UI.createTableView({width: 'auto'});
tableView.addEventListener('click', function(e)
{
	Ti.API.debug('click row: ' + e.row.className)
});
scrollArea.add(tableView);


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

// add a done button to the right nav bar
var done = Titanium.UI.createButton({
	systemButton:Titanium.UI.iPhone.SystemButton.DONE
});
done.addEventListener('click', function()
{
	win.close();
});
/**
 * This doesn't work on Android'
 */
//win.setRightNavButton(done);

function refreshSearch()
{
	searchBar.fireEvent('return');
}

searchBar.addEventListener('return', function(e) {
	
	count = 0;
	scrollArea.scrollTo(0,0)

	Titanium.API.info("You clicked the button");
	var jsonTextToDisplay = '';
	var url = Ti.App.SERVICE_BASE_URL + 'book?title=' + searchBar.value + '&page=0';
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
			
			//rowData[0] = row.add(bookRowView.add(searchBar));
			
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
	    	var bookId = v.bookId
	    	count++
	    	
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
			
			var c = (count-1).toString();
			
			var bookRowView = Titanium.UI.createView({ 
				height:70, 
				layout:'vertical', 
				top:5, 
				right:5, 
				bottom:5, 
				left:5,
				id:""+c
			}); 
			bookRowView.add(coverImage);
			bookRowView.add(titleLabel);
			bookRowView.add(authorLabel);
			
			bookRowView.addEventListener('click', function(e)
			{	
				book_detail = Titanium.UI.createWindow({
					url:'../child_windows/book_detail.js',  
				    title:'',
				    barColor: '#777',
				    fullscreen:false,
				    navBarHidden:false,
				    tabBarHidden:true,
				    backButtonTitle:'Back'
				});
				
				var jsonBookObject;
				
				//check to see if child was clicked
				if(this.id == null)
				{
					jsonBookObject = jsonObject[this.parent.id];
				}  //child clicked
							
				else
				{
					jsonBookObject = jsonObject[this.id];
				}  //row background clicked
				
				book_detail.bookObject = jsonBookObject;
				
				
				//Add book to the database
				var jsonObjectNewBook;
				var url = Ti.App.SERVICE_BASE_URL + 'book';
				var xhr = Titanium.Network.createHTTPClient();
				xhr.setTimeout(REQUEST_TIMEOUT); // 10 second timeout
				xhr.onerror = function(e) {
					Ti.API.info("Book has already been added");
					
					
					Titanium.UI.currentTab.open(book_detail,{animated:true});
				}
				xhr.onload = function() {
				    var resp = this.responseText;  
				    Ti.API.info(resp);
				    
				    var responseObject = eval('('+resp+')');
				    if(responseObject.error) { // backend error message
				    	showValidationErrorDialog(responseObject.error);
				    }
				    else { // successful
				    	
				    	jsonObjectNewBook = JSON.parse(resp);
				    	book_detail.bookObject = jsonObjectNewBook;
				    	refreshSearch();
				    	
				    	Titanium.UI.currentTab.open(book_detail,{animated:true});
				    }
				};
				
				// Add a check to the row on the list screen in case the user navigates back.
				// TODO: this should probably not be set really until we get a success back from the
				// web service that the book was successfully added.
				e.row.hasCheck = true;
			
			
				Ti.API.debug(url);
				xhr.open('POST', url);
				xhr.send({'jsondata':{
					"description":jsonBookObject.description,
					"author":jsonBookObject.author,
					"title":jsonBookObject.title,
					"isbn10":jsonBookObject.isbn10,
					"smallThumbnailUrl":jsonBookObject.smallThumbnailUrl,
					"thumbnailUrl":jsonBookObject.thumbnailUrl,
					"source":"googlebooks",
					"pubType":"book"
				}}); 

					
			});
			
			Ti.API.debug('building for  #' + i)
			var row;
			if(bookId != null)
			{
				row = Titanium.UI.createTableViewRow({height:'auto', className:isbn, hasCheck:true});
			}
			else
			{
				row = Titanium.UI.createTableViewRow({height:'auto', className:isbn});
			}
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

