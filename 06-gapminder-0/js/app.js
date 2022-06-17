const draw = async (el = "#graf") => {
  // Selección de gráfica
  const graf = d3.select("#graf")

  // Carga del dataset
  const dataset = await d3.csv("gapminder.csv", d3.autoType)
  console.log(dataset)

  // Dimensiones
  const anchoTotal = +graf.style("width").slice(0, -2)
  const altoTotal = anchoTotal * 0.5

  const margins = { top: 20, right: 20, bottom: 75, left: 100 }

  const alto = altoTotal - margins.top - margins.bottom
  const ancho = anchoTotal - margins.left - margins.right

  // Accessors
  const xAccessor = (d) => d.income
  const yAccessor = (d) => d.life_exp
  const rAccessor = (d) => d.population

  // Escaladores
  const x = d3
    .scaleLinear()
    .domain(d3.extent(dataset, xAccessor))
    .range([0, ancho])
  const y = d3
    .scaleLinear()
    .domain(d3.extent(dataset, yAccessor))
    .range([alto, 0])
    .nice()
  const r = d3
    .scaleLinear()
    .domain(d3.extent(dataset, rAccessor))
    .range([2, 150])
    .nice()

  // Espacio de gráfica
  const svg = graf
    .append("svg")
    .classed("graf", true)
    .attr("width", anchoTotal)
    .attr("height", altoTotal)

  svg
    .append("g")
    .append("rect")
    .attr("transform", `translate(${margins.left}, ${margins.top})`)
    .attr("width", ancho)
    .attr("height", alto)
    .attr("class", "backdrop")

  const chart = svg
    .append("g")
    .attr("transform", `translate(${margins.left}, ${margins.top})`)

  // Dibujar los puntos
  const circles = chart
    .selectAll("circle")
    .data(dataset)
    .join("circle")
    .attr("cx", (d) => x(xAccessor(d)))
    .attr("cy", (d) => y(yAccessor(d)))
    .attr("r", (d) => r(rAccessor(d)))

  // Ejes
  const xAxis = d3
    .axisBottom(x)
    .ticks(5)
    .tickFormat((d) => d.toLocaleString())
  const yAxis = d3.axisLeft(y)

  const xAxisGroup = chart
    .append("g")
    .attr("transform", `translate(0, ${alto})`)
    .call(xAxis)
    .classed("axis", true)
  const yAxisGroup = chart.append("g").call(yAxis).classed("axis", true)

  xAxisGroup
    .append("text")
    .attr("x", ancho / 2)
    .attr("y", margins.bottom - 10)
    .attr("fill", "black")
    .text("Ingreso Per Cápita")
  yAxisGroup
    .append("text")
    .attr("x", -alto / 2)
    .attr("y", -margins.left + 30)
    .attr("fill", "black")
    .style("text-anchor", "middle")
    .style("transform", "rotate(270deg)")
    .text("Expectativa de Vida")
}

draw()
