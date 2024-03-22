document.addEventListener('DOMContentLoaded', function() {
    const balanceDisplay = document.getElementById('balance');
    const startButton = document.getElementById('startButton');
    const betAmountInput = document.getElementById('betAmount');
    const pilotChoiceSelect = document.getElementById('pilotChoice');
    const pilots = document.querySelectorAll('#speedway img');

    let balance = 100;

    balanceDisplay.textContent = `Balance: $${balance.toFixed(2)}`;

    startButton.addEventListener('click', () => {
        if (balance < 5) {
            alert('You do not have enough balance to place a bet.');
            return;
        }

        let betAmount = parseFloat(betAmountInput.value);
        if (isNaN(betAmount) || betAmount < 5 || betAmount > balance) {
            alert('Invalid bet amount. Please enter a valid amount.');
            return;
        }

        let chosenPilot = pilotChoiceSelect.value;
        if (!['white', 'black', 'green', 'yellow', 'red'].includes(chosenPilot)) {
            alert('Invalid pilot choice. Please choose one of the available pilots.');
            return;
        }

        startButton.disabled = true;

        pilots.forEach(pilot => {
            pilot.style.marginLeft = '0%';
        });

        let raceInterval = setInterval(() => {
            pilots.forEach(pilot => {
                pilot.style.marginLeft = `${parseFloat(pilot.style.marginLeft || 0) + Math.random()}%`;

                if (parseFloat(pilot.style.marginLeft || 0) >= 90) {
                    clearInterval(raceInterval);

                    if (pilot.id === chosenPilot) {
                        balance += betAmount * 2;
                        document.getElementById('result').textContent = `Congratulations! Your pilot (${chosenPilot}) won! You won $${(betAmount * 2).toFixed(2)}.`;
                    } else {
                        balance -= betAmount;
                        document.getElementById('result').textContent = `Sorry! Your pilot (${chosenPilot}) lost. You lost $${betAmount.toFixed(2)}.`;
                    }

                    balanceDisplay.textContent = `Balance: $${balance.toFixed(2)}`;
                    startButton.disabled = false;
                }
            });
        }, 50);
    });
});
