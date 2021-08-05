var regional = JSON.parse(response.content).data.regional;
var state = context.getVariable("stateQueryParam");
var bedType = context.getVariable("bedType");
var finalResponse;
var indiaBeds;
for (var i = 0; i <  regional.length; i++) {
  if(regional[i].state.equalsIgnoreCase(state)) {
  	finalResponse =  {
  	    stateName : regional[i].state,
  	    bedCount : bedType === null ? regional[i].totalBeds : 
  	    (bedType.equalsIgnoreCase("urban") ? regional[i].urbanBeds :
  	     regional[i].ruralBeds),
  	    date : regional[i].asOn
  	}
  	break;
  }
  if(regional[i].state.equalsIgnoreCase("INDIA")) {
  	indiaBeds =  {
  	    stateName : regional[i].state,
  	    bedCount : bedType === null ? regional[i].totalBeds : 
  	    (bedType.equalsIgnoreCase("urban") ? regional[i].urbanBeds :
  	     regional[i].ruralBeds),
  	    date : regional[i].asOn
  	}
  }
}
if(finalResponse === undefined) {
    finalResponse = indiaBeds
}
context.setVariable("response.content", JSON.stringify(finalResponse));