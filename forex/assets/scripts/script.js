function Submit() {
    "use strict";

    var form = $("#myform");
    
    form.validate();
    
    if (form.valid()) {
        
        var BaseCurrency = document.getElementById("BaseCurrency").value;
        var ConvertCurrency = document.getElementById("ConvertCurrency").value;
        var apiKey = "xQ30YaaNshOmVQ5Yr3g0B8GV3LXNnfAs"
        var FromDate = document.getElementById("FromDate").value;
        var ToDate = document.getElementById("ToDate").value;

        var myURL = "https://api.polygon.io/v2/aggs/ticker/C:" + BaseCurrency + ConvertCurrency + "/range/1/day/" + FromDate + "/" + ToDate +"?unadjusted=true&sort=asc&limit=120&apiKey=" + apiKey;

        var myMethod = "GET";
        
        $(document).ready(function() {
            
            $.ajax({
                method: myMethod,
                url: myURL
            })
            
            .done(function( msg ) {
               
                var date = [];
                var value = [];
                var numdays = msg.queryCount;  
                if (numdays > 0) {
                    for (var i = 0; i < numdays; i++) {
                        value[i] = msg.results[i].c;
                        var tempdate = new Date(msg.results[i].t);
                        date[i] = tempdate.toLocaleDateString();
                    }
                }
                
                var valuetable = "";
                if (numdays > 0) {
                    valuetable = valuetable + "<table><caption>Currency Value</caption><tr><th>Date</th><th>Price</th></tr>";
                    for (var i = 0; i < numdays; i++) {
                        valuetable = valuetable + "<tr><td>" + date[i] + "</td><td>" + value[i] + "</td></tr>";
                    }
                    valuetable = valuetable + "</table>"
                    document.getElementById("ValueTable").innerHTML = valuetable;
                }
                var ctx0 = document.getElementById("chartjs-0");
                var myChart = new Chart(ctx0, {
                    "type":"line",
                    "data": {
                        "labels": date,
                        "datasets":[{"label":"Value Close",
                        "data": value,
                        "fill":false,
                        "borderColor":"rgb(75, 192, 192)",
                        "lineTension":0.1}]},
                        "options":{ 
                            responsive: false,
                            maintainAspectRatio: true,
                        }
                    }
                );
            })
        })

    }
}

function ClearForm() {
    document.getElementById("BaseCurrency").value = "";
    document.getElementById("ConvertCurrency").value = "";
    document.getElementById("FromDate").value = "";
    document.getElementById("ToDate").value = "";
    document.getElementById("ValueTable").innerHTML = "";
    
    var canvas0 = document.getElementById("chartjs-0");
    var context0 = canvas0.getContext('2d');    
    context0.clearRect(0, 0, canvas0.width, canvas0.height);
    var canvas1 = document.getElementById("chartjs-1");
    var context1 = canvas1.getContext('2d');    
    context1.clearRect(0, 0, canvas1.width, canvas1.height);
}