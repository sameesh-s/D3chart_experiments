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
        .attr("height", dimensions.boundedHeight - freezingTemperaturePlacement)
        .attr("fill", "#e0f3f3");

    const xScale = d3.scaleTime()
        .domain(d3.extent(dataset, xAccessor))
        .range([0, dimensions.boundedWidth]);

    //Line drawing 
    //M move x, y axis to that point.
    //L drow line till that x, y axis
    //z redrow to line to the starting point
    //bounds.append("path").attr("d", "M 0 0 L 100 0 L 100 100 L 0 50 Z");
    //d3.line() will generate the d string using the data points provided.
    //inputs: how to find x axis value
    //how to find y axis value
    //give accessor functions with scale function 
    const lineGenerator = d3.line()
        .x(d => xScale(xAccessor(d)))
        .y(d => yScale(yAccessor(d)));

    const line = bounds.append("path")
        .attr("d", lineGenerator(dataset))
        .attr("fill", "none")
        .attr("stroke", "#af9358")
        .attr("stroke-width", 2);
    
    const yAxisGenerator = d3.axisLeft()
        .scale(yScale)

    const yAxis = bounds.append("g")
        .call(yAxisGenerator);

    const xAxisGenerator = d3.axisBottom()
        .scale(xScale);
    const xAxis = bounds.append("g")
        .call(xAxisGenerator)
        .style("transform", `translateY(${
            dimensions.boundedHeight
            }px)`);

}

drawLineChart()