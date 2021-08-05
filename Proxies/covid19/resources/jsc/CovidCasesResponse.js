var data = JSON.parse(response.content).data;
var regional = data.regional;
var summary = data.summary;
var state = context.getVariable("stateQueryParam");
var caseType1 = context.getVariable("caseType");
var type = context.getVariable("type");
var finalResponse;
for (var i = 0; i <  regional.length; i++) {
  if(regional[i].loc.equalsIgnoreCase(state)) {
  	finalResponse =  {
  	    stateName : regional[i].loc,
  	    caseType : caseType1 === null ? "Total" : caseType1,
  	    type : type === null ? "All" : type,
  	    caseCount : type === null ? (caseType1 === null || caseType1.equalsIgnoreCase("confirmed") ? 
  	    regional[i].totalConfirmed : (caseType1.equalsIgnoreCase("deaths") ? 
  	    regional[i].deaths : regional[i].discharged)) : 
  	    (type.equalsIgnoreCase("Indian") ? (caseType1 === null || caseType1.equalsIgnoreCase("confirmed") ?
  	    regional[i].confirmedCasesIndian : (caseType1.equalsIgnoreCase("deaths") ?
  	    regional[i].deaths : regional[i].discharged)) :
  	    (caseType1 === null || caseType1.equalsIgnoreCase("confirmed") ?
  	     regional[i].confirmedCasesForeign : 0))
  	}
  	break;
  }
}
if(finalResponse === undefined) {
  	finalResponse =  {
  	    stateName : "INDIA",
  	    caseType : caseType1 === null ? "Total" : caseType1,
  	    type : type === null ? "All" : type,
  	    caseCount : type === null ? (caseType1 === null || caseType1.equalsIgnoreCase("confirmed") ? 
  	    summary.totalConfirmed : (caseType1.equalsIgnoreCase("deaths") ? 
  	    summary.deaths : summary.discharged)) : 
  	    (type.equalsIgnoreCase("Indian") ? (caseType1 === null || caseType1.equalsIgnoreCase("confirmed") ?
  	    summary.confirmedCasesIndian : (caseType1.equalsIgnoreCase("deaths") ?
  	    summary.deaths : summary.discharged)) :
  	    (caseType1 === null || caseType1.equalsIgnoreCase("confirmed") ?
  	     summary.confirmedCasesForeign : 0))
  	}
}

context.setVariable("response.content", JSON.stringify(finalResponse));