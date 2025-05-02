function initLineChart(data) {
    const svg = d3.select("#line-chart svg");
    const margin = { top: 20, right: 30, bottom: 50, left: 60 };
    const width = +svg.attr("width") - margin.left - margin.right;
    const height = +svg.attr("height") - margin.top - margin.bottom;
  
    const chart = svg.append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);
  
    // Define month order
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    data.sort((a, b) => months.indexOf(a.month) - months.indexOf(b.month));
  
    const x = d3.scalePoint()
      .domain(data.map(d => d.month))
      .range([0, width])
      .padding(0.5);
  
    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.value)])
      .nice()
      .range([height, 0]);
  
    // Axes
    chart.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x));
  
    chart.append("g")
      .call(d3.axisLeft(y));
  
    // Line generator
    const line = d3.line()
      .x(d => x(d.month))
      .y(d => y(d.value));
  
    // Draw line
    chart.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#e74c3c")
      .attr("class", "line")
      .attr("d", line);
  
    // Draw dots
    chart.selectAll(".dot")
      .data(data)
      .enter().append("circle")
      .attr("class", "dot")
      .attr("cx", d => x(d.month))
      .attr("cy", d => y(d.value))
      .attr("r", 5)
      .attr("fill", "#e74c3c")
      .on("mouseover", (event, d) => {
        d3.select("#tooltip")
          .style("opacity", 1)
          .style("left", (event.pageX + 10) + "px")
          .style("top", (event.pageY - 20) + "px")
          .html(`<strong>${d.month}</strong><br>PM2.5: ${d.value} µg/m³`);
      })
      .on("mouseout", () => {
        d3.select("#tooltip").style("opacity", 0);
      });
  }
  