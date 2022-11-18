let chart;
const ctx = document.getElementById("myChart");

function formatMoney(value) {
  console.log(value);
  document.getElementById("valor-do-imovel-text").value = parseFloat(
    value
  ).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

function main() {
  const initialValue = parseFloat(
    document.getElementById("valor-do-imovel").value
  );
  const { labels, data, cdi } = getData(initialValue);
  chart = plotChart({ labels, data, cdi });
}

async function setValues() {
  await chart.destroy();
  const initialValue = parseFloat(
    document.getElementById("valor-do-imovel").value
  );
  const { labels, data, cdi } = getData(initialValue);
  chart = plotChart({ labels, data, cdi });
}

main();

function getData(initialValue = 0) {
  const labels = bcData.map((data) => `${data.Mes}/${data.Ano}`).reverse();

  const data = bcData
    .map((data) => (data["Balneário Camboriú"] * initialValue) / 100)
    .reverse();

  const cdi = cdiData.reduce((acc, curr, idx) => {
    if (acc.length > 0) {
      return [...acc, curr * initialValue + acc[idx - 1]];
    } else return [initialValue];
  }, []);

  return {
    labels,
    data,
    cdi,
  };
}

function plotChart({ labels, data, cdi }) {
  return new Chart(ctx, {
    type: "line",
    data: {
      labels,
      datasets: [
        {
          label: "Valor do Imóvel",
          data,
          borderWidth: 3,
        },
        {
          label: "CDI",
          data: cdi,
          borderWidth: 2,
        },
      ],
    },
    options: {
      responsive: true,
      stacked: false,
      interaction: {
        intersect: false,
        mode: "index",
      },
      scales: {
        x: {
          grid: {
            display: false,
          },
          ticks: {
            callback: function (value, index) {
              const label = this.getLabelForValue(value);
              const splitDate = label.split("/");
              const formattedDate = `${parseInt(splitDate[0]) < 10 ? "0" : ""}${
                splitDate[0]
              }/${splitDate[1]}`;
              return formattedDate;
            },
          },
        },
        y: {
          ticks: {
            callback: function (value) {
              return value.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              });
            },
          },
        },
      },
      elements: {
        point: {
          radius: 0,
        },
      },
    },
  });
}
