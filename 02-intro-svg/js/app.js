const graf = d3.select("#graf")

const anchoTotal = +graf.style("width").slice(0, -2)
const altoTotal = (anchoTotal * 9) / 16

const svg = graf
  .append("svg")
  .attr("width", anchoTotal)
  .attr("height", altoTotal)
  .attr("class", "graf")

let cx = anchoTotal / 2
let cy = altoTotal / 2
let r = 75

const c = svg.append("circle").attr("cx", cx).attr("cy", cy).attr("r", r)

const modi = (dx, dy) => {
  cx += dx
  cy += dy
  c.transition().duration(1500).attr("cx", cx).attr("cy", cy)
}
