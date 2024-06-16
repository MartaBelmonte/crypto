document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('cryptoForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = {
            name: formData.get('name'),
            symbol: formData.get('symbol'),
            price: parseFloat(formData.get('price'))
        };

        fetch('/cryptos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                return response.json().then(errorData => { throw new Error(errorData.error); });
            }
        })
        .then(() => {
            event.target.reset();
            fetchAndRenderChart();
            alert('Criptomoneda agregada con éxito.');
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error al agregar criptomoneda: ' + error.message);
        });
    });

    function fetchAndRenderChart() {
        fetch('/cryptos')
            .then(response => response.json())
            .then(data => {
                const labels = data.map(crypto => crypto.name);
                const prices = data.map(crypto => parseFloat(crypto.price));

                const ctx = document.getElementById('cryptoChart').getContext('2d');
                if (window.cryptoChart) {
                    window.cryptoChart.destroy();
                }
                window.cryptoChart = new Chart(ctx, {
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

    fetchAndRenderChart();
});
