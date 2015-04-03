
var year =[];
var states = [];
var stateData = [];
var q ="";
var currentState ="";
var parent ="";
var states2 = [];
var stateData2 = []; 
var q2 =""; 
var currentState2 ="";
var states3 = [];
var stateData3 = [];
var q3 ="";
var currentState3 ="";
 
$(document).ready(function(){
    
    $.ajax({
		type: "GET",
		url: "data/trendbyyear.xml",
		dataType: "xml",
		success: function(data){
  
        $(data).find('Year').each(function(){
                console.log("once for every year");
            $year = $(this);
            parent = $(this);
            year.push($year.attr("year"));
            for (var i=0; i < 53; i++){
            states.push($(data).children().children().children()[i].nodeName);
	    states2.push($(data).children().children().children()[i].nodeName);
	    states3.push($(data).children().children().children()[i].nodeName);
             }
        });
            generateDropdown();
            generateData();
            run();
          
	  $( "#selectbox" ).change(function() {
		$(data).find('Year').each(function(){
                //console.log("all over again");
		    $date = $(this)
		    if (states[q]) {
			stateData.push(parseFloat($date.find(states[q]).text()));
		    }
		    if (stateData.length>7) {
			stateData.splice(0, 7);
		    }
	    //console.log(q);
           //console.log(states[q]);
           //console.log(stateData);
           
                });
		buildChart();
	    });
	  
	   $( "#selectbox2" ).change(function() {
	      //console.log("dropdown changed");
 
		$(data).find('Year').each(function(){
                //console.log("all over again");
		    $date = $(this)
		    if (states2[q2]) {
			stateData2.push(parseFloat($date.find(states2[q2]).text()));
		    }
		    if (stateData2.length>7) {
			stateData2.splice(0, 7);
		    }
	    //console.log(q2);
           //console.log(states2[q2]);
           //console.log(stateData2);
           
		});
		buildChart();
	     });
	   
	    $( "#selectbox3" ).change(function() {
	     //console.log("dropdown changed");
 
		$(data).find('Year').each(function(){
                 //console.log("all over again");
		    $date = $(this)
		    if (states3[q3]) {
			stateData3.push(parseFloat($date.find(states3[q3]).text()));
		    }
		    if (stateData3.length>7) {
			stateData3.splice(0, 7);
		    }
			//console.log(q3);
			//console.log(states3[q3]);
			//console.log(stateData3);
           
                });
		buildChart();
	    });
	    
                }
    });            
});

function generateDropdown(){
    for (var i in states){
        $("#selectbox").append('<option value="'+states[i]+' selected="selected"">'+states[i]+'</option>');

        $("#selectbox2").append('<option value="'+states[i]+' selected="selected"">'+states[i]+'</option>');

        $("#selectbox3").append('<option value="'+states[i]+' selected="selected"">'+states[i]+'</option>')
    }	
};

function generateData(){
    var e = document.getElementById("selectbox");
    var active = e.options[e.selectedIndex].text;
    
    var e2 = document.getElementById("selectbox2");
    var active2 = e2.options[e.selectedIndex].text;
    
    var e3 = document.getElementById("selectbox3");
    var active3 = e3.options[e.selectedIndex].text;

    //console.log(active);
};



function run() {
    var dropdown = document.getElementById("selectbox");
    q = dropdown.options[dropdown.selectedIndex].index;
   
    var dropdown2 = document.getElementById("selectbox2");
    q2 = dropdown2.options[dropdown2.selectedIndex].index;
   
    var dropdown3 = document.getElementById("selectbox3");
    q3 = dropdown3.options[dropdown3.selectedIndex].index;
   //console.log(q);
    
    if (states[q]) {
    currentState = (states[q]);
    }
    
     if (states2[q2]) {
    currentState2 = (states2[q2]);
    }
    
     if (states3[q3]) {
    currentState3 = (states[q3]);
    }
   
    //console.log(currentState);
    buildChart();
};

function buildChart(){

    $('#chart1').highcharts({
        chart: {
            type: 'line'
        },
    

        title: {
            text: '',
            x: -20 //center
        },
        subtitle: {
            text: '',
            x: -20
        },
        xAxis: {
            categories: [year[0], year[1], year[2], year [3], year[4], year[5], year[6], year[7]
                ]
        },
        yAxis: {
            title: {
                text: 'Percent of women age 15-44 (%)'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        tooltip: {
	    pointFormat: '{series.name}: {point.y}',
            valueSuffix: '%'
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
        },
 
       
       series: [{
            name: currentState,
            data: stateData,
            },
	    {
            name: currentState2,
            data: stateData2,
            },
	    {
            name: currentState3,
            data: stateData3,
            },
	    ]

    });
};

    

$(document).ready(function() {
    $('#table').dataTable( {
        "ajax": 'data/table.json',
	"scrollY": 365,
        "scrollX": true
    } );
} );
