// Load data asynchronously
Promise.all([
    d3.json("data/cities.json"),
    d3.json("data/trends.json"),
    d3.json("data/districts.json")
  ]).then(function(data) {
    const [cities, trends, districts] = data;
    initBarChart(cities);
    initLineChart(trends);
    initGeoChart(districts);
  }).catch(function(error) {
    console.error("Error loading data:", error);
  });
  