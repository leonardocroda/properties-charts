const ctx = document.getElementById("myChart");

(function main() {
  const initialValue = 100000000;

  const { labels, data, selic } = getData(initialValue / 100);

  plotChart({ labels, data, selic });
})();

function getData(initialValue = 0) {
  console.log(bcData);

  const labels = bcData.map((data) => `${data.Mes}/${data.Ano}`).reverse();

  const data = bcData
    .map((data) => (data["Balneário Camboriú"] * initialValue) / 100)
    .reverse();

  const selic = selicData.map(
    (value) => (value * (initialValue * 100)) / 100 + initialValue
  );

  return {
    labels,
    data,
    selic,
  };
}

function plotChart({ labels, data, selic }) {
  new Chart(ctx, {
    type: "line",
    data: {
      labels,
      datasets: [
        {
          label: "Valor do Imóvel",
          data,
          borderWidth: 1,
        },
        {
          label: "SELIC",
          data: selic,
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          //   beginAtZero: true,
        },
      },
    },
  });
}
