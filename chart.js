async function drawLineChart(){
    //code will be here soon
    const dataset = await d3.json("my_weather_data.json");
    const yAccessor = d => d.temperatureMax ;
    const dateParser = d3.timeParse("%Y-%m-%d");
    const xAccessor = d => dateParser(d.date) ;
    val = xAccessor(dataset[0]);
    console.log(val, null, 4);

    //for diemensions for wrapper bounds.  
    let dimensions = {
        width: window.innerWidth * 0.9,
        height: 400,
        margin: {
            top: 15,
            right: 15,
            bottom: 40,
            left: 60,
            },
        }
    //computation for bound sizing from dimension object 
    dimensions.boundedWidth = dimensions.width - dimensions.margin.left - dimensions.margin.right;
    dimensions.boundedHeight = dimensions.height - dimensions.margin.top - dimensions.margin.bottom;

    const wrapper = d3.select("#wrapper")
        .append("svg")
        .attr("width", dimensions.width)
        .attr("height", dimensions.height)
    
    const bounds = wrapper.append("g")
        .style("transform", `translate(${
        dimensions.margin.left
        }px, ${
        dimensions.margin.top
        }px)`);

    //for scaling purpose of axis domain -> Range  
    console.log(d3.extent(dataset, yAccessor));
    const yScale = d3.scaleLinear()
        .domain(d3.extent(dataset, yAccessor))
        .range([dimensions.boundedHeight, 0]);
    console.log(yScale(32));

    const freezingTemperaturePlacement = yScale(32)
    const freezingTemperatures = bounds.append("rect")
        .attr("x", 0)
        .attr("width", dimensions.boundedWidth)
        .attr("y", freezingTemperaturePlacement)
        .attr("height", dimensions.boundedHeight - freezingTemperaturePlacement);
}

drawLineChart()