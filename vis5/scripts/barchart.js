function initBarChart(data) {
    const svg = d3.select("#bar-chart svg");
    const margin = { top: 20, right: 40, bottom: 50, left: 100 };
    const width = +svg.attr("width") - margin.left - margin.right;
    const height = +svg.attr("height") - margin.top - margin.bottom;
  
    const chart = svg.append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);
  
    // Scales
    const x = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.pm25)])
      .range([0, width]);
  
    const y = d3.scaleBand()
      .domain(data.map(d => d.city))
      .range([0, height])
      .padding(0.2);
  
    // Axes
    chart.append("g")
      .call(d3.axisLeft(y));
  
    chart.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x));
  
    // Bars
    chart.selectAll(".bar")
      .data(data)
      .enter().append("rect")
      .attr("class", "bar")
      .attr("x", 0)
      .attr("y", d => y(d.city))
      .attr("width", d => x(d.pm25))
      .attr("height", y.bandwidth())
      .attr("fill", "#3498db")
      .on("mouseover", (event, d) => {
        d3.select("#tooltip")
          .style("opacity", 1)
          .style("left", (event.pageX + 10) + "px")
          .style("top", (event.pageY - 20) + "px")
          .html(`<strong>${d.city}</strong><br>PM2.5: ${d.pm25} µg/m³`);
      })
      .on("mouseout", () => {
        d3.select("#tooltip").style("opacity", 0);
      });
  }
  