
var topic =[];
var stateNames = [];
var stateInfo = [];
var k ="";
var activeState ="";
var parentNode ="";
var stateNames2 = [];
var stateInfo2 = []; 
var k2 =""; 
var activeState2 ="";
var stateNames3 = [];
var stateInfo3 = [];
var k3 ="";
var activeState3 ="";
 
$(document).ready(function(){
    
    $.ajax({
		type: "GET",
		url: "data/publicfunding.xml",
		dataType: "xml",
		success: function(data){
  
        $(data).find('Topic').each(function(){
                console.log("once for every year");
            $topic = $(this);
            parentNode = $(this);
            topic.push($topic.attr("name"));
            for (var i=0; i < 53; i++){
            stateNames.push($(data).children().children().children()[i].nodeName);
	    stateNames2.push($(data).children().children().children()[i].nodeName);
	    stateNames3.push($(data).children().children().children()[i].nodeName);
             }
        });
            generateSelect();
            createData();
            process();
          
	  $( "#selectcontainer" ).change(function() {
		$(data).find('Topic').each(function(){
                //console.log("all over again");
		    $topic = $(this)
		    if (stateNames[k]) {
			stateInfo.push(parseFloat($topic.find(stateNames[k]).text()));
		    }
		    if (stateInfo.length>4) {
			stateInfo.splice(0, 4);
		    }
	    //console.log(k);
           //console.log(stateNames[k]);
           //console.log(stateInfo);
           
                });
		makeChart();
	    });
	  
	   $( "#selectcontainer2" ).change(function() {
	      //console.log("dropdown changed");
 
		$(data).find('Topic').each(function(){
                //console.log("all over again");
		    $topic = $(this)
		    if (stateNames2[k2]) {
			stateInfo2.push(parseFloat($topic.find(stateNames2[k2]).text()));
		    }
		    if (stateInfo2.length>4) {
			stateInfo2.splice(0, 4);
		    }
	    //console.log(k2);
           //console.log(stateNames2[k2]);
           //console.log(stateInfo2);
           
		});
		makeChart();
	     });
	   
	    $( "#selectcontainer3" ).change(function() {
	     //console.log("dropdown changed");
 
		$(data).find('Topic').each(function(){
                 //console.log("all over again");
		    $topic = $(this)
		    if (stateNames3[k3]) {
			stateInfo3.push(parseFloat($topic.find(stateNames3[k3]).text()));
		    }
		    if (stateInfo3.length>4) {
			stateInfo3.splice(0, 4);
		    }
			//console.log(k3);
			//console.log(stateNames3[k3]);
			//console.log(stateInfo3);
           
                });
		makeChart();
	    });
	    
                }
    });            
});

function generateSelect(){
    for (var i in stateNames){
        $("#selectcontainer").append('<option value="'+stateNames[i]+' selected="selected"">'+stateNames[i]+'</option>');

        $("#selectcontainer2").append('<option value="'+stateNames[i]+' selected="selected"">'+stateNames[i]+'</option>');

        $("#selectcontainer3").append('<option value="'+stateNames[i]+' selected="selected"">'+stateNames[i]+'</option>')
    }	
};

function createData(){
    var e = document.getElementById("selectcontainer");
    var active = e.options[e.selectedIndex].text;
    
    var e2 = document.getElementById("selectcontainer2");
    var active2 = e2.options[e.selectedIndex].text;
    
    var e3 = document.getElementById("selectcontainer3");
    var active3 = e3.options[e.selectedIndex].text;

    //console.log(active);
};



function process() {
    var dropdown = document.getElementById("selectcontainer");
    k= dropdown.options[dropdown.selectedIndex].index;
   
    var dropdown2 = document.getElementById("selectcontainer2");
    k2 = dropdown2.options[dropdown2.selectedIndex].index;
   
    var dropdown3 = document.getElementById("selectcontainer3");
    k3 = dropdown3.options[dropdown3.selectedIndex].index;
   //console.log(k);
    
    if (stateNames[k]) {
    activeState = (stateNames[k]);
    }
    
     if (stateNames2[k2]) {
    activeState2 = (stateNames2[k2]);
    }
    
     if (stateNames3[k3]) {
    activeState3 = (stateNames[k3]);
    }
   
    //console.log(activeState);
    makeChart();
};


function makeChart() {
console.log("State1:" + stateInfo);
console.log("State1:"+activeState);
console.log("State2:" + stateInfo2);
console.log("State2:"+activeState2);
console.log("State3:" + stateInfo3);
console.log("State3:"+activeState3);
    $('#chart2').highcharts({

        chart: {
            
            type: 'line',
            polar: true
        },

        title: {
            text: '',
            x: -80
        },
	subtitle: {
            text: '',
            x: -20
        },

        pane: {
            size: '80%'
        },

        xAxis: {
            categories: ['For family planning client services (in 10s of dollars)', 'For publicly funded pregnancies' , 'For sterilization services', 'For abortions'],
            tickmarkPlacement: 'on',
            lineWidth: 0
        },

        yAxis: {
            gridLineInterpolation: 'polygon',
            lineWidth: 0,
            min: 0
        },

        tooltip: {
            shared: true,
            pointFormat: '<span style="color:{series.color}">{series.name}: <b>${point.y:,.0f}</b><br/>'
        },

        legend: {
            align: 'left',
            verticalAlign: 'bottom',
            y: -50,
            layout: 'vertical'
        },

        series: [{
            name: activeState,
            data: stateInfo,
            pointPlacement: 'on'
        }, {
            name: activeState2,
            data: stateInfo2,
            pointPlacement: 'on'
        },
        {
            name: activeState3,
            data: stateInfo3,
            pointPlacement: 'on'
        }]

    });
}