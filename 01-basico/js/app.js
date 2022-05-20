const registros = d3.select("#registros")

const load = async () => {
  const data = await d3.json("https://randomuser.me/api?results=10")
  // console.log(data.results)

  // data.results.forEach((r) => {
  //   console.log(r.name.title, r.name.first, r.name.last)
  // })

  const rows = registros.selectAll("tr").data(data.results)
  rows
    .enter()
    .append("tr")
    .html(
      (r) => `
  <td>
    <img
      src="${r.picture.medium}"
      class="rounded-circle shadow"
    />
  </td>
  <td>
    <h3>${r.name.title} ${r.name.first} ${r.name.last}</h3>
    <p>
      3993 Rue de L'Abbé-Groult, Toulouse<br />
      France
    </p>
  </td>`
    )
}

load()
