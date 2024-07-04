document.addEventListener('DOMContentLoaded', function() {
    // Populate Ethiopian month options
    const ethiopianMonths = [
        'Meskerem', 'Tikimt', 'Hidar', 'Tahsas', 'Tir', 'Yekatit',
        'Megabit', 'Miazia', 'Genbot', 'Sene', 'Hamle', 'Nehase', 'Pagume'
    ];
    const ethiopianMonthSelect = document.getElementById('ethiopian-month');
    ethiopianMonths.forEach((month, index) => {
        const option = document.createElement('option');
        option.value = index + 1;
        option.textContent = month;
        ethiopianMonthSelect.appendChild(option);
    });

    // Populate Ethiopian day options
    const ethiopianDaySelect = document.getElementById('ethiopian-day');
    for (let i = 1; i <= 30; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        ethiopianDaySelect.appendChild(option);
    }

    // Convert to Gregorian
    document.getElementById('convert-to-gregorian').addEventListener('click', function() {
        const ethiopianYear = document.getElementById('ethiopian-year').value;
        const ethiopianMonth = document.getElementById('ethiopian-month').value;
        const ethiopianDay = document.getElementById('ethiopian-day').value;

        fetch(`/convert?conversionType=ethiopianToGregorian&ethiopianYear=${ethiopianYear}&ethiopianMonth=${ethiopianMonth}&ethiopianDay=${ethiopianDay}`)
            .then(response => response.text())
            .then(data => {
                document.getElementById('gregorian-result').textContent = data;
            })
            .catch(error => console.error('Error:', error));
    });

    // Convert to Ethiopian
    document.getElementById('convert-to-ethiopian').addEventListener('click', function() {
        const gregorianDate = document.getElementById('gregorian-date').value;

        fetch(`/convert?conversionType=gregorianToEthiopian&gregorianDate=${gregorianDate}`)
            .then(response => response.text())
            .then(data => {
                document.getElementById('ethiopian-result').textContent = data;
            })
            .catch(error => console.error('Error:', error));
    });
});
