document.addEventListener('DOMContentLoaded', function() {
    let cryptoChart = null;

    function fetchAndRenderChart() {
        fetch('/cryptos')
            .then(response => response.json())
            .then(data => {
                const labels = data.map(crypto => crypto.name);
                const prices = data.map(crypto => parseFloat(crypto.price));

                const ctx = document.getElementById('cryptoChart').getContext('2d');

                // Destruir el gráfico existente si ya existe
                if (cryptoChart) {
                    cryptoChart.destroy();
                }

                // Crear un nuevo gráfico
                cryptoChart = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: labels,
                        datasets: [{
                            label: 'Crypto Prices',
                            data: prices,
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 1,
                            fill: false
                        }]
                    },
                    options: {
                        responsive: true,
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        }
                    }
                });
            })
            .catch(error => console.error('Error fetching cryptos:', error));
    }

    document.getElementById('refreshButton').addEventListener('click', fetchAndRenderChart);

    fetchAndRenderChart();
});
