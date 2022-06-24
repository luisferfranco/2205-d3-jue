const graf = d3.select("#graf")

const anchoTotal = +graf.style("width").slice(0, -2)
const altoTotal = anchoTotal * 0.5

const margen = { arriba: 50, derecha: 10, abajo: 95, izquierda: 90 }

const ancho = anchoTotal - margen.izquierda - margen.derecha
const alto = altoTotal - margen.arriba - margen.abajo

const svg = graf
  .append("svg")
  .attr("class", "graf")
  .attr("width", anchoTotal)
  .attr("height", altoTotal)

const draw = async (el) => {
  const dataset = await d3.csv("data.csv", d3.autoType)

  console.log(dataset)
}

draw("#hm1")
