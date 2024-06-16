document.addEventListener('DOMContentLoaded', function() {
    fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false')
        .then(response => response.json())
        .then(data => {
            const symbolSelect = document.getElementById('symbol');
            data.forEach(crypto => {
                const option = document.createElement('option');
                option.value = crypto.symbol;
                option.text = crypto.symbol.toUpperCase() + ' - ' + crypto.name;
                symbolSelect.appendChild(option);
            });
        })
        .catch(error => console.error('Error fetching crypto symbols:', error));
});
