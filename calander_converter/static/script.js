document.addEventListener('DOMContentLoaded', function() {
    // Populate Ethiopian month options
    const ethiopianMonths = [
        'Meskerem (መስከረም)', 'Tikimt (ጥቅምት)', 'Hidar (ኅዳር)', 'Tahsas (ታኅሣሥ)', 
        'Tir (ጥር)', 'Yekatit (የካቲት)', 'Megabit (መጋቢት)', 'Miazia (ሚያዝያ)', 
        'Genbot (ግንቦት)', 'Sene (ሰኔ)', 'Hamle (ሃምሌ)', 'Nehase (ነሐሴ)', 'Pagume (ጳጉሜ)'
    ];
    
    const ethiopianMonthSelect = document.getElementById('ethiopian-month');
    ethiopianMonths.forEach((month, index) => {
        const option = document.createElement('option');
        option.value = index + 1;
        option.textContent = month;
        ethiopianMonthSelect.appendChild(option);
    });

    const ethiopianDaySelect = document.getElementById('ethiopian-day');
    function updateEthiopianDays() {
        const selectedMonth = ethiopianMonthSelect.value;
        const maxDays = selectedMonth == 13 ? 6 : 30; // 6 days for Pagume, 30 for others

        // Clear existing options
        ethiopianDaySelect.innerHTML = '';

        // Add new options
        for (let i = 1; i <= maxDays; i++) {
            const option = document.createElement('option');
            option.value = i;
            option.textContent = i;
            ethiopianDaySelect.appendChild(option);
        }
    }

    // Initial population of Ethiopian days
    updateEthiopianDays();

    // Add event listener to Ethiopian month select
    ethiopianMonthSelect.addEventListener('change', updateEthiopianDays);

    // Convert to Gregorian
    document.getElementById('convert-to-gregorian').addEventListener('click', function() {
        const ethiopianYear = document.getElementById('ethiopian-year').value;
        const ethiopianMonth = document.getElementById('ethiopian-month').value;
        const ethiopianDay = document.getElementById('ethiopian-day').value;

        fetch(`/convert?conversionType=ethiopianToGregorian&ethiopianYear=${ethiopianYear}&ethiopianMonth=${ethiopianMonth}&ethiopianDay=${ethiopianDay}`)
            .then(response => response.text())
            .then(data => {
                document.getElementById('gregorian-result').setAttribute('data-result', data);
            })
            .catch(error => console.error('Error:', error));
    });

    // Convert to Ethiopian
    document.getElementById('convert-to-ethiopian').addEventListener('click', function() {
        const gregorianDate = document.getElementById('gregorian-date').value;

        fetch(`/convert?conversionType=gregorianToEthiopian&gregorianDate=${gregorianDate}`)
            .then(response => response.text())
            .then(data => {
                document.getElementById('ethiopian-result').setAttribute('data-result', data);
            })
            .catch(error => console.error('Error:', error));
    });
});