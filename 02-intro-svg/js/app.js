const graf = d3.select("#graf")
const colorSelect = d3.select("#colorSelect")

const anchoTotal = +graf.style("width").slice(0, -2)
const altoTotal = (anchoTotal * 9) / 16

const svg = graf
  .append("svg")
  .attr("width", anchoTotal)
  .attr("height", altoTotal)
  .attr("class", "graf")

let colores = [
  { nombre: "Rojo", valor: "#f00" },
  { nombre: "Verde", valor: "#0f0" },
  { nombre: "Azul", valor: "#00f" },
  { nombre: "Amarillo", valor: "#ff0" },
]
colorSelect
  .selectAll("option")
  .data(colores)
  .enter()
  .append("option")
  .attr("value", (d) => d.valor)
  .text((d) => d.nombre)

let cx = anchoTotal / 2
let cy = altoTotal / 2
let r = 75
let color = "#f00"

const c = svg
  .append("circle")
  .attr("cx", cx)
  .attr("cy", cy)
  .attr("r", r)
  .attr("fill", color)

const modi = (delta) => {
  // if (delta.x !== undefined) {
  //   cx += delta.x
  // }

  // if (delta.y !== undefined) {
  //   cy += delta.y
  // }

  // Operador ternario
  // cx += delta.x !== undefined ? delta.x : 0
  // cy += delta.y !== undefined ? delta.y : 0

  // Operador de Coalescencia (Coalescence Operator)
  cx += delta.x ?? 0
  cy += delta.y ?? 0

  if (c) {
    color = colorSelect.node().value
  }

  c.transition()
    .duration(1500)
    .attr("cx", cx)
    .attr("cy", cy)
    .attr("fill", color)
}
