
async function updateBalance() {
  const res = await fetch('/balance');
  const data = await res.json();
  document.getElementById('balance-display').textContent = `Saldo: R$ ${data.balance.toFixed(2)}`;
}

document.getElementById('play-btn').addEventListener('click', async () => {
  const game = document.getElementById('game-select').value;
  const bet = parseFloat(document.getElementById('bet-input').value);

  const res = await fetch('/play', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ game, bet })
  });

  const resultArea = document.getElementById('result-area');

  if (!res.ok) {
    const err = await res.json();
    resultArea.textContent = err.error;
    return;
  }

  const data = await res.json();
  resultArea.textContent = `Resultado: x${data.multiplier} | Ganhos: R$ ${data.winnings.toFixed(2)}`;
  updateBalance();
});

updateBalance();
