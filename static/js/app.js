/// Bar Chart build
function barChart(subjectID) {

    d3.json("./data/samples.json").then(function(data) {
        var samples= data.samples;

        var filteredData = samples.filter(sample => sample.id == subjectID);
        // filtereData is an array of dictionaries
        // we must return only one dictionary using bracket
        filteredData = filteredData[0]
        var otu_ids = filteredData.otu_ids;
        var otu_labels = filteredData.otu_labels;
        var sample_values =filteredData.sample_values;

        var otu_ids10 = otu_ids.slice(0,10).reverse();
        var otu_labels10 = otu_labels.slice(0,10).reverse();
        var sample_values10 = sample_values.slice(0,10).reverse();

        var trace = {
            y: otu_ids10.map(otuID => `OTU ${otuID}`),
            x: sample_values10,
            text: otu_labels10,
            type: "bar",
            orientation: 'h'
        };
        
    Plotly.newPlot("bar",[trace])
    
    }); 
};

/// Bubble chart build
function bubbleChart(subjectID) {
    d3.json("./data/samples.json").then(function(data) {
        var samples= data.samples;

        var filteredData = samples.filter(sample => sample.id == subjectID);
        // filtereData is an array of dictionaries
        // we must return only one dictionary using bracket
        filteredData = filteredData[0]
        var otu_ids = filteredData.otu_ids;
        var otu_labels = filteredData.otu_labels;
        var sample_values =filteredData.sample_values;

        var trace2 = {
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: 'markers',
            marker: {
                color: otu_ids,
                size: sample_values
            }
        };
        
        var layout ={
            xaxis: {title: "OTU ID"}
        }

    Plotly.newPlot("bubble", [trace2], layout)

    });
};

/// Demographic box for selected ID
function demographics(subjectID) {
    var demoBox = d3.select("#sample-metadata");
    demoBox.html("")
    d3.json("./data/samples.json").then(data=> { 

        var metadata = data.metadata;
        var filterMetadata = metadata.filter(a => a.id ==subjectID)[0];
        Object.entries(filterMetadata).forEach(([key, value]) => {
            demoBox.append("p").text(`${key}: ${value}`);
        })
        
    })
}

//HTML option change
function optionChanged(subjectID) {
    demographics(subjectID);
    barChart(subjectID);
    bubbleChart(subjectID);
}

//Changes with selection of new subject ID
function selection() {
    var dropdown = d3.select("#selDataset");
    d3.json("./data/samples.json").then(data => {
        var subjectID = data.names;
        subjectID.forEach(subjectID => {
            dropdown.append("option").text(subjectID).property("value", subjectID)
        });
    demographics(subjectID[0]);
    barChart(subjectID[0]);
    bubbleChart(subjectID[0]);
    });
};

selection();