document.querySelector('#chat-form').addEventListener('submit', (event) => {
  event.preventDefault();
  document.querySelector('#status').textContent = 'Interface prête.';
});
