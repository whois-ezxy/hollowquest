document.addEventListener('DOMContentLoaded', () => {
    const urlInput = document.getElementById('urlInput');
    const goBtn = document.getElementById('goBtn');
    const proxyFrame = document.getElementById('proxyFrame');
    const newTabBtn = document.querySelector('.new-tab');
    
    // Go button click
    goBtn.addEventListener('click', navigate);
    urlInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') navigate();
    });
    
    // New tab button
    newTabBtn.addEventListener('click', createNewTab);
    
    function navigate() {
        let url = urlInput.value.trim();
        if (!url) return;
        
        // Add protocol if missing
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            url = 'https://' + url;
        }
        
        proxyFrame.src = url;
        urlInput.value = url;
    }
    
    function createNewTab() {
        const tabContainer = document.querySelector('.tabs');
        const tabs = tabContainer.querySelectorAll('.tab');
        const newTabIndex = tabs.length;
        
        const newTab = document.createElement('div');
        newTab.className = 'tab active';
        newTab.textContent = 'New Tab';
        newTab.dataset.tab = newTabIndex;
        tabContainer.insertBefore(newTab, newTabBtn);
        
        // Remove active from others
        tabs.forEach(tab => tab.classList.remove('active'));
        
        // Switch to new tab (placeholder)
        urlInput.value = '';
        proxyFrame.src = 'about:blank';
    }
});