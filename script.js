// =========================================================
// データと基本機能
// =========================================================

// ⬇️ 最新のお知らせのデータ配列 (newsData) は削除しました

// ⬇️ お知らせ表示関数 (displayNews) は削除しました

function setupCopyButton() {
    const copyButton = document.getElementById('copy-button');
    const serverIP = document.getElementById('server-ip').textContent;
    const copyMessage = document.getElementById('copy-message');

    copyButton.addEventListener('click', () => {
        navigator.clipboard.writeText(serverIP).then(() => {
            copyMessage.textContent = '✅ IPアドレスをコピーしました！';
            setTimeout(() => {
                copyMessage.textContent = '';
            }, 3000);
        }).catch(err => {
             copyMessage.textContent = 'コピーに失敗しました。';
        });
    });
}

// =========================================================
// テーマ切り替え機能 (メインロジック)
// =========================================================

const body = document.body;
const toggleInput = document.getElementById('theme-toggle-input');
const localStorageKey = 'mumeiTheme';

/**
 * テーマを設定し、HTMLクラス、Local Storage、チェックボックスの状態を更新する
 * @param {string} theme - 'light' または 'dark'
 */
function setTheme(theme) {
    const isDark = (theme === 'dark');
    
    // 1. HTMLクラスの更新
    if (isDark) {
        body.classList.add('dark-mode');
    } else {
        body.classList.remove('dark-mode');
    }
    
    // 2. チェックボックスの状態を反映
    toggleInput.checked = isDark; 
    
    // 3. Local Storageに保存
    localStorage.setItem(localStorageKey, theme);
}

/**
 * ページロード時にテーマを初期化する
 * 優先順位: Local Storage > OS設定 > デフォルト(light)
 */
function initializeTheme() {
    const savedTheme = localStorage.getItem(localStorageKey);
    
    if (savedTheme) {
        // 1. Local Storageに保存されたテーマがあれば適用
        setTheme(savedTheme);
        return;
    }

    // 2. Local Storageになければ、OSの設定を確認
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        setTheme('dark');
    } else {
        // 3. どちらでもなければライトテーマを適用
        setTheme('light');
    }
}

// イベントリスナー: チェックボックスの状態変更イベントでテーマを切り替える
toggleInput.addEventListener('change', () => {
    // チェックボックスがチェックされていたら 'dark'、そうでなければ 'light' に設定
    const newTheme = toggleInput.checked ? 'dark' : 'light';
    setTheme(newTheme);
});


// ページ読み込み完了時にすべての機能を実行
document.addEventListener('DOMContentLoaded', () => {
    initializeTheme(); // テーマ初期化を最初に行う
    // ⬇️ displayNews() の呼び出しを削除
    setupCopyButton(); 
});