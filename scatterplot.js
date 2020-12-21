async function scatterPlotChart(){
    console.log("the scatter plot graph is loaded");
    //const dataset = await d3.json("my_weather_data.json");
    //const dataset = await d3.csv("HDFCBANK.BO.csv");
    //Date,Open,High,Low,Close,Adj Close,Volume
    const dataset = await d3.csv("HDFCBANK.BO.csv",function(d) {
        return {
          Date: d.Date,
          open: +d.Open,
          high: +d.High,
          low: +d.Low, // lowercase
          close: +d.Close,
          volume: +d.Volume // lowercase
        };
      });
    //HDFCBANK.BO.csv
    console.table(dataset[0]);
    
    const xAccessor = d => d.open;
    const yAccessor = d => d.close;

    //create chart dimensions 
    //scatter plot graphs are mainly squre so to make squer to not 
    //overflow we take the minimum of hieght or width
    const width = d3.min([
        window.innerWidth * 0.9,
        window.innerHeight * 0.9,
        ]);
    let dimensions = {
        width: width,
        height: width,
        margin: {
            top: 10,
            right: 10,
            bottom: 50,
            left: 50
        }
    };

    dimensions.boundedWidth = dimensions.width - dimensions.margin.left - dimensions.margin.right;
    dimensions.boundedHeight = dimensions.height - dimensions.margin.top - dimensions.margin.bottom;


    const wrapper = d3.select("#wrapper")
        .append("svg")
            .attr("width", dimensions.width)
            .attr("height", dimensions.height);

    //move the top left of svg to make space  top left margins
    const bounds = wrapper.append("g")
        .style("trasform", `translate(${dimensions.margin.left}px , ${dimensions.margin.top}px)`);

    const xScale = d3.scaleLinear()
        .domain(d3.extent(dataset, xAccessor))
        .range([0, dimensions.boundedWidth])
        .nice();
    const yScale = d3.scaleLinear()
        .domain(d3.extent(dataset, xAccessor))
        .range([dimensions.boundedHeight, 0])
        .nice();
    dataset.forEach(d => {
        //console.log(JSON.stringify(d, null, 4));
        xVal = xScale(xAccessor(d));
        yVal = yScale(yAccessor(d));

        if(!isNaN(xVal) && !isNaN(yVal) ){
        bounds
            .append("circle")
            .attr("cx", xScale(xAccessor(d)))
            .attr("cy", yScale(yAccessor(d)))
            .attr("r", 5)
        }
    });
}

scatterPlotChart();