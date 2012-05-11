var win = Ti.UI.currentWindow;  
  
//Create the scroll area, all our content goes in here  
var scrollArea3 = Titanium.UI.createScrollView({  
    top: 0,  
    width: 320,  
    height: 375,  
    contentHeight: 'auto',
    showVerticalScrollIndicator: true,
    backgroundColor: '#fff'
}); 
win.add(scrollArea3);




var statsTable = Titanium.UI.createTableView();

scrollArea3.add(statsTable);

var rowData = []

var friendCountLabel = Titanium.UI.createLabel({
	text:'32 Friends',
	height: 'auto',
	width: 280,
	color: 'blue',
	font:{fontSize:12,fontFamily:'Helvetica Neue'}
})
var checkinCountLabel = Titanium.UI.createLabel({
	text:'32 Checkins',
	height: 'auto',
	width: 280,
	color: 'blue',
	font:{fontSize:12,fontFamily:'Helvetica Neue'}
})

		
var statView1 = Titanium.UI.createView({ 
			height:'auto', 
			layout:'vertical',
			backgroundColor: '#aaa', 
			top:5, right:5, bottom:5, left:5 }); 
statView1.add(friendCountLabel)

var statView2 = Titanium.UI.createView({ 
			height:'auto', 
			layout:'vertical',
			backgroundColor: '#aaa', 
			top:5, right:5, bottom:5, left:5 }); 
			
statView2.add(checkinCountLabel)

		
var totalFriendsRow = Titanium.UI.createTableViewRow({height:'auto', backgroundColor:'#f00'});
totalFriendsRow.add(statView1);
rowData[0] = totalFriendsRow;

var totalCheckinsRow = Titanium.UI.createTableViewRow({height:'auto', backgroundColor:'#f00'});
totalCheckinsRow.add(statView2);
rowData[1] = totalCheckinsRow;

statsTable.data = rowData;
