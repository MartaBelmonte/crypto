document.addEventListener('DOMContentLoaded', function() {
    let cryptoChart = null;
    const ctx = document.getElementById('cryptoChart').getContext('2d');

    function fetchAndRenderChart() {
        fetch('/cryptos')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error fetching cryptos. Status: ' + response.status);
                }
                return response.json();
            })
            .then(data => {
                const labels = data.map(crypto => crypto.name);
                const prices = data.map(crypto => parseFloat(crypto.price));

                if (cryptoChart === null) {
                    // Si cryptoChart no está inicializado, crear una nueva instancia
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
                } else {
                    // Si cryptoChart ya está inicializado, actualizar los datos existentes
                    cryptoChart.data.labels = labels;
                    cryptoChart.data.datasets[0].data = prices;
                    cryptoChart.update(); // Actualizar el gráfico con los nuevos datos
                }
            })
            .catch(error => console.error('Error fetching cryptos:', error));
    }

    // Llamar a fetchAndRenderChart al cargar la página
    fetchAndRenderChart();

    // Agregar event listener al botón de actualizar
    document.getElementById('refreshButton').addEventListener('click', fetchAndRenderChart);
});
