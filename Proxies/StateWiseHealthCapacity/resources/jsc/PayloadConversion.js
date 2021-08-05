var data = JSON.parse(context.getVariable("response.content"));
var state = context.getVariable("stateQueryParam");
print(data);
print(state);
var finalResponse;
var indiaResponse;
for (var i = 0; i <  data.length; i++) {
  if(data[i].State.equalsIgnoreCase(state)) {
  	finalResponse =  {
  	    TotalHospitalsCount : data[i].TotalHospitalsCount
  	}
  	break;
  }
  if(data[i].State.equalsIgnoreCase("India")) {
    indiaResponse =  {
  	    TotalHospitalsCount : data[i].TotalHospitalsCount
  	}
  }
}

if(finalResponse === undefined) {
    finalResponse = indiaResponse;
}

context.setVariable("response.content", JSON.stringify(finalResponse));