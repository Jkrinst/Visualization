function initGeoChart(geoData) {
    const svg = d3.select("#geo-chart svg");
    const width = +svg.attr("width");
    const height = +svg.attr("height");
  
    const projection = d3.geoMercator()
      .fitSize([width, height], geoData);
  
    const path = d3.geoPath().projection(projection);
  
    // Color scale based on PM2.5
    const color = d3.scaleSequential()
      .domain(d3.extent(geoData.features, d => d.properties.pm25))
      .interpolator(d3.interpolateReds);
  
    const chart = svg.append("g");
  
    chart.selectAll("path")
      .data(geoData.features)
      .enter()
      .append("path")
      .attr("class", "district")
      .attr("d", path)
      .attr("fill", d => color(d.properties.pm25))
      .on("mouseover", (event, d) => {
        d3.select("#tooltip")
          .style("opacity", 1)
          .style("left", (event.pageX + 10) + "px")
          .style("top", (event.pageY - 20) + "px")
          .html(`<strong>${d.properties.name}</strong><br>PM2.5: ${d.properties.pm25} µg/m³`);
      })
      .on("mouseout", () => {
        d3.select("#tooltip").style("opacity", 0);
      });
  
    // Optional: Add labels
    chart.selectAll(".district-label")
      .data(geoData.features)
      .enter()
      .append("text")
      .attr("class", "district-label")
      .attr("transform", d => {
        const centroid = path.centroid(d);
        return `translate(${centroid[0]}, ${centroid[1]})`;
      })
      .text(d => d.properties.name);
  }
  