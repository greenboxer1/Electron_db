document.getElementById('data-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const data = { name };
  window.electron.sendData(data);
  document.getElementById('name').value = '';
});

document.getElementById('get-data').addEventListener('click', () => {
  window.electron.getData();
});

window.electron.onDataList((dataItems) => {
  const dataItemsContainer = document.getElementById('data-items');
  dataItemsContainer.innerHTML = '';
  if (dataItems.length === 0) {
    const message = document.createElement('p');
    message.textContent = 'Нет данных';
    dataItemsContainer.appendChild(message);
  } else {
    dataItems.forEach(item => {
      const dataText = document.createElement('p');
      dataText.textContent = item.dataValues.name;
      dataItemsContainer.appendChild(dataText);
    });
  }
});
window.electron.onError((errorMessage) => {
  console.error('Ошибка:', errorMessage);
});
