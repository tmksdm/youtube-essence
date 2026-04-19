// content.js — скрипт, который работает прямо на странице YouTube
// Создаёт встроенный сайдбар рядом с видео

function createPanel() {
  // Проверяем, не создана ли панель уже
  if (document.getElementById('yt-essence-panel')) {
    return;
  }

  // Создаём контейнер панели
  const panel = document.createElement('div');
  panel.id = 'yt-essence-panel';
  // Панель создаётся скрытой — покажется только по команде
  panel.classList.add('yt-essence-hidden');

  // Наполняем панель содержимым
  panel.innerHTML = `
    <div class="yt-essence-header">
      <span class="yt-essence-title">YouTube Essence</span>
      <button class="yt-essence-close" id="yt-essence-close">✕</button>
    </div>
    <div class="yt-essence-body">
      <p>Расширение загружено и работает!</p>
      <p class="yt-essence-hint">Скоро здесь появится кнопка для извлечения сути из видео.</p>
    </div>
  `;

  // Добавляем панель на страницу
  document.body.appendChild(panel);

  // Кнопка закрытия панели
  document.getElementById('yt-essence-close').addEventListener('click', () => {
    hidePanel();
  });
}

// Показать панель
function showPanel() {
  const panel = document.getElementById('yt-essence-panel');
  if (!panel) {
    createPanel();
    // После создания панели — показываем её
    const newPanel = document.getElementById('yt-essence-panel');
    newPanel.classList.remove('yt-essence-hidden');
  } else {
    panel.classList.remove('yt-essence-hidden');
  }
  document.documentElement.classList.add('yt-essence-active');
  // Говорим YouTube пересчитать размеры элементов
  setTimeout(() => {
    window.dispatchEvent(new Event('resize'));
  }, 350);
}

// Скрыть панель
function hidePanel() {
  const panel = document.getElementById('yt-essence-panel');
  if (panel) {
    panel.classList.add('yt-essence-hidden');
  }
  document.documentElement.classList.remove('yt-essence-active');
  // Говорим YouTube пересчитать размеры элементов
  setTimeout(() => {
    window.dispatchEvent(new Event('resize'));
  }, 350);
}

// Переключить панель (показать/скрыть)
function togglePanel() {
  const panel = document.getElementById('yt-essence-panel');
  if (!panel) {
    createPanel();
    showPanel();
    return;
  }
  if (panel.classList.contains('yt-essence-hidden')) {
    showPanel();
  } else {
    hidePanel();
  }
}

// Слушаем сообщения от background.js (клик по иконке расширения)
chrome.runtime.onMessage.addListener((message) => {
  if (message.action === 'toggle-panel') {
    togglePanel();
  }
});

// Создаём панель заранее (но скрытую) — чтобы она была готова к показу
createPanel();
