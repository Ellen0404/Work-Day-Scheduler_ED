
var calendarData = [];
$("#currentDay").text(moment().format('LL'));

var arrTime =["9-AM","10-AM","11-AM","12-PM","1-PM","2-PM","3-PM","4-PM","5-PM","6-PM"];
var arrMilTime =[9,10,11,12,13,14,15,16,17,18];
var currentHour = moment().format('LT');

for (i=0;i<arrTime.length;i++){

    var tableRow =$("<tr>");
 
    //time data Time
  
    var tableDataTime = $("<td>");
    tableDataTime.addClass("hour");
    tableDataTime.text(arrTime[i]);

    // event data event
    var tableDataEvent =$("<td>");
    var dataInput = $("<textarea>");
    dataInput.attr("data-event",arrMilTime[i]);
    dataInput.attr("id", arrTime[i]);
    dataInput.addClass("description");

    tableDataEvent.append(dataInput);
   
    // check current hour function
    var currentDayTime =parseInt(moment().format("HH") );
    if (currentDayTime === arrMilTime[i] ){
      dataInput.addClass("present");
    } else if (currentDayTime > arrMilTime[i]){
      dataInput.addClass("past");
     } else {
     dataInput.addClass("future");
     }

    // button data button
    var tableDataBtn =$("<td>");
    var saveBtn = $("<button>");
    var btnImage = $("<img>");
    btnImage.attr("src", "./assets/50-512.png");
    btnImage.attr("height","60px");
    saveBtn.append(btnImage);
    saveBtn.attr("data-eventID",arrTime[i]);
    saveBtn.addClass("saveBtn time-block");
    tableDataBtn.append(saveBtn);

   // append dinamic elements to the html
   tableRow.append(tableDataTime,tableDataEvent,tableDataBtn);
    $("#tableRows").append(tableRow);
}

// save to local storage 

$('.saveBtn').on("click", function(){

console.log($(this).data('eventid'));
 var valueID = $(this).data('eventid');
 var scheduledEvent =$("#"+valueID).val();
 console.log(calendarData,valueID,scheduledEvent);
 calendarData.push({valueID,scheduledEvent});
localStorage.setItem("calendarData", JSON.stringify(calendarData));
});

function renderEvent (value){
   if( value){
    // console.log(value.valueID);
    // console.log(value.scheduledEvent);
    $("#"+value.valueID).text(value.scheduledEvent);
   }
}

$(document).ready(function(){
    calendarData  =  JSON.parse(localStorage.getItem("calendarData")) ;
    if (calendarData === null){
        calendarData = [];
    }
    // calendarData.forEach(renderEvent);
    for (x=0; x<calendarData.length; x++){
        renderEvent(calendarData[x]);
    }
     
  });