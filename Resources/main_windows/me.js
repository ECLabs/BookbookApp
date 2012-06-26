var win = Ti.UI.currentWindow;  
  
//Create the scroll area, all our content goes in here  
var scrollArea3 = Titanium.UI.createScrollView({  
    top: 55,  
    width: Ti.Platform.displayCaps.platformWidth,  
    height: (Ti.Platform.displayCaps.platformHeight - 111),  
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
			backgroundColor: '#fff', 
			top:5, right:5, bottom:5, left:5 }); 

var statView2 = Titanium.UI.createView({ 
			height:'auto', 
			layout:'vertical',
			backgroundColor: '#aaa', 
			top:5, right:5, bottom:5, left:5 });
statView2.add(friendCountLabel) 
			
var statView3 = Titanium.UI.createView({ 
			height:'auto', 
			layout:'vertical',
			backgroundColor: '#aaa', 
			top:5, right:5, bottom:5, left:5 }); 
statView3.add(checkinCountLabel)

var editProfileButton = Titanium.UI.createButton({
	title:'Edit',
	height:'7%',
	width:'21%',
	top:0,
	right:'5%',
	borderWidth:4,
	color: '#000000'
});

var profilePic = Titanium.UI.createImageView({
	image:'http://www.appcelerator.com/wp-content/uploads/2009/06/titanium_desk.png',
	height:'30%',
	width:'35%',
	top:'-7%',
	left:'5%',
	borderWidth:1
});

var profileName = Titanium.UI.createLabel({
	id:'curReadLabel',
	text:'My Name',
	top:'-20%',
	height:'10%',
	left:'45%',
	font:{fontSize:18, fontStyle:'bold'}
});

var curReadLabel = Titanium.UI.createLabel({
	id:'curReadLabel',
	text:'Currently Reading',
	top:'5%',
	height:'5%',
	font:{fontSize:12},
	left:'5%'
});

var recReadLabel = Titanium.UI.createLabel({
	id:'recReadLabel',
	text:'Recently Read',
	top:'10%',
	height:'5%',
	font:{fontSize:12},
	left:'5%'
});

var readAWhileLabel = Titanium.UI.createLabel({
	id:'readAWhileLabel',
	text:'Read a while ago',
	top:'12%',
	height:'5%',
	font:{fontSize:12},
	left:'5%'
});

var readWantLabel = Titanium.UI.createLabel({
	id:'readWantLabel',
	text:'Want to Read',
	top:'15%',
	height:'5%',
	font:{fontSize:12},
	left:'5%'
});


statView1.add(editProfileButton);
statView1.add(profilePic);
statView1.add(profileName);
statView1.add(curReadLabel);
statView1.add(recReadLabel);
statView1.add(readAWhileLabel);
statView1.add(readWantLabel);
		
var totalFriendsRow = Titanium.UI.createTableViewRow({height:'auto', backgroundColor:'#f00'});
totalFriendsRow.add(statView1);
rowData[0] = totalFriendsRow;

var totalCheckinsRow = Titanium.UI.createTableViewRow({height:'auto', backgroundColor:'#f00'});
totalCheckinsRow.add(statView2);
rowData[1] = totalCheckinsRow;

var totalCheckinsRow = Titanium.UI.createTableViewRow({height:'auto', backgroundColor:'#f00'});
totalCheckinsRow.add(statView3);
rowData[2] = totalCheckinsRow;

statsTable.data = rowData;
