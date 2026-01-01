/**
 * テーマ管理
 */
const body = document.body;
const toggleInput = document.getElementById('theme-toggle-input');
const storageKey = 'mumeiTheme';

function applyTheme(theme) {
    const isDark = theme === 'dark';
    body.classList.toggle('dark-mode', isDark);
    toggleInput.checked = isDark;
    localStorage.setItem(storageKey, theme);
}

const savedTheme = localStorage.getItem(storageKey) || 
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
applyTheme(savedTheme);

toggleInput.addEventListener('change', () => {
    applyTheme(toggleInput.checked ? 'dark' : 'light');
});

/**
 * Minecraftサーバーのステータスと人数を取得
 */
async function updateServerStatus() {
    const ip = "play.mumei.online";
    const statusContainer = document.getElementById('status-container');
    const statusText = document.getElementById('status-text');
    
    try {
        const response = await fetch(`https://api.mcstatus.io/v2/status/java/${ip}`);
        const data = await response.json();
        
        statusContainer.classList.remove('loading', 'online', 'offline');
        
        if (data.online) {
            statusContainer.classList.add('online');
            statusText.textContent = `オンライン：現在 ${data.players.online} 人が冒険中！`;
        } else {
            statusContainer.classList.add('offline');
            statusText.textContent = "現在オフラインです";
        }
    } catch (error) {
        statusText.textContent = "ステータス取得エラー";
    }
}

/**
 * コピー機能
 */
function initCopyFeature(triggerId, textId, msgId) {
    const trigger = document.getElementById(triggerId);
    const textTarget = document.getElementById(textId);
    const message = document.getElementById(msgId);

    if (!trigger || !textTarget || !message) return;

    trigger.addEventListener('click', () => {
        navigator.clipboard.writeText(textTarget.innerText).then(() => {
            message.textContent = '✅ コピーしました！';
            setTimeout(() => { message.textContent = ''; }, 3000);
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    updateServerStatus();
    setInterval(updateServerStatus, 60000); // 1分おきに更新
    initCopyFeature('copy-ip-trigger', 'server-ip', 'copy-message-ip');
    initCopyFeature('copy-tag-trigger', 'gamertag-value', 'copy-message-tag');
});
