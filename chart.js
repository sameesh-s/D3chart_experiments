async function drawLineChart(){
    //code will be here soon
    const dataset = await d3.json("my_weather_data.json");
    console.log(JSON.stringify(dataset, null, 4));
}

drawLineChart()