// Selecciones
const graf = d3.select("#graf")
const metrica = d3.select("#metrica")

// Dimensiones
const anchoTotal = +graf.style("width").slice(0, -2)
const altoTotal = (anchoTotal * 9) / 16

const margins = {
  top: 60,
  right: 20,
  bottom: 75,
  left: 100,
}
const ancho = anchoTotal - margins.left - margins.right
const alto = altoTotal - margins.top - margins.bottom

// Elementos gráficos (layers)
const svg = graf
  .append("svg")
  .attr("width", anchoTotal)
  .attr("height", altoTotal)
  .attr("class", "graf")

const layer = svg
  .append("g")
  .attr("transform", `translate(${margins.left}, ${margins.top})`)

layer
  .append("rect")
  .attr("height", alto)
  .attr("width", ancho)
  .attr("fill", "white")

const g = svg
  .append("g")
  .attr("transform", `translate(${margins.left}, ${margins.top})`)

//!!-----------------------------------------------------

const draw = async (variable = "clientes") => {
  // Carga de Datos
  data = await d3.csv("barras.csv", d3.autoType)

  // console.log(data)
  // console.log(Object.keys(data[0]).slice(1))
  metrica
    .selectAll("option")
    .data(Object.keys(data[0]).slice(1))
    .enter()
    .append("option")
    .attr("value", (d) => d)
    .text((d) => d)

  // Accessor
  const xAccessor = (d) => d.tienda

  // Escaladores
  const y = d3.scaleLinear().range([alto, 0])
  const color = d3
    .scaleOrdinal()
    .domain(Object.keys(data[0]).slice(1))
    .range(d3.schemeTableau10)

  // console.log(data)
  // console.log(d3.map(data, xAccessor))

  const x = d3.scaleBand().range([0, ancho]).paddingOuter(0.2).paddingInner(0.1)

  const titulo = g
    .append("text")
    .attr("x", ancho / 2)
    .attr("y", -15)
    .classed("titulo", true)

  const etiquetas = g.append("g")

  const xAxisGroup = g
    .append("g")
    .attr("transform", `translate(0, ${alto})`)
    .classed("axis", true)
  const yAxisGroup = g.append("g").classed("axis", true)

  const render = (variable) => {
    // Accesores
    const yAccessor = (d) => d[variable]
    data.sort((a, b) => yAccessor(b) - yAccessor(a))

    // Escaladores
    y.domain([0, d3.max(data, yAccessor)])
    x.domain(d3.map(data, xAccessor))

    // Rectángulos (Elementos)
    const rect = g.selectAll("rect").data(data, xAccessor)
    rect
      .enter()
      .append("rect")
      .attr("x", (d) => x(xAccessor(d)))
      .attr("y", (d) => y(0))
      .attr("width", x.bandwidth())
      .attr("height", 0)
      .attr("fill", "green")
      .merge(rect)
      .transition()
      .duration(2500)
      // .ease(d3.easeBounce)
      .attr("x", (d) => x(xAccessor(d)))
      .attr("y", (d) => y(yAccessor(d)))
      .attr("width", x.bandwidth())
      .attr("height", (d) => alto - y(yAccessor(d)))
      .attr("fill", (d) =>
        xAccessor(d) == "Satélite" ? "#f00" : color(variable)
      )

    const et = etiquetas.selectAll("text").data(data)
    et.enter()
      .append("text")
      .attr("x", (d) => x(xAccessor(d)) + x.bandwidth() / 2)
      .attr("y", (d) => y(0))
      .merge(et)
      .transition()
      .duration(2500)
      .attr("x", (d) => x(xAccessor(d)) + x.bandwidth() / 2)
      .attr("y", (d) => y(yAccessor(d)))
      .text(yAccessor)

    // Títulos
    titulo.text(`${variable} de las Tiendas`)

    // Ejes
    const xAxis = d3.axisBottom(x)
    const yAxis = d3.axisLeft(y).ticks(8)
    xAxisGroup.transition().duration(2500).call(xAxis)
    yAxisGroup.transition().duration(2500).call(yAxis)
  }

  // Eventos
  metrica.on("change", (e) => {
    e.preventDefault()
    // console.log(e.target.value, metrica.node().value)
    render(e.target.value)
  })
  render(variable)
}

draw()
