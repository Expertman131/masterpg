/**
 * Live Reload - модуль для разработки (отключен по умолчанию)
 * В режиме разработки можно включить для автоматического обновления страницы
 */

console.log('Live reload деактивирован');

// Функция для ручной активации автообновления
// Для включения автообновления нужно вызвать в консоли: activateLiveReload()
window.activateLiveReload = function(interval = 5000) {
    console.log('Live reload активирован с интервалом ' + interval + 'мс');
    return setInterval(() => {
        location.reload();
    }, interval);
};

// Инструкция для активации:
// 1. Откройте консоль разработчика (F12 или Ctrl+Shift+I)
// 2. Введите команду: activateLiveReload(5000)
// где 5000 - интервал обновления в миллисекундах (5 секунд)
// 3. Для остановки автообновления используйте: clearInterval(id)
// где id - значение, возвращаемое функцией activateLiveReload 