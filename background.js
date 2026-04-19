// background.js — фоновый скрипт расширения YouTube Essence
// Обрабатывает клик по иконке расширения

chrome.runtime.onInstalled.addListener(() => {
  console.log('YouTube Essence установлен');
});

// Когда пользователь кликает на иконку расширения —
// отправляем сообщение content script-у, но только если мы на YouTube-видео
chrome.action.onClicked.addListener((tab) => {
  if (tab.url && tab.url.includes('youtube.com/watch')) {
    chrome.tabs.sendMessage(tab.id, { action: 'toggle-panel' });
  }
});
