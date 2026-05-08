document.addEventListener('DOMContentLoaded', () => {
    const urlInput = document.getElementById('urlInput');
    const goBtn = document.getElementById('goBtn');
    const proxyFrame = document.getElementById('proxyFrame');
    
    // Initialize Scramjet
    if (window.ScramjetController) {
        const controller = new ScramjetController();
        controller.setFrame(proxyFrame);
        
        goBtn.addEventListener('click', () => navigate(controller));
        urlInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') navigate(controller);
        });
    } else {
        console.warn('Scramjet not loaded - using iframe fallback');
        goBtn.addEventListener('click', navigateFallback);
        urlInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') navigateFallback();
        });
    }
    
    function navigate(controller) {
        let url = urlInput.value.trim();
        if (!url) return;
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            url = 'https://' + url;
        }
        controller.loadURL(url);
        urlInput.value = url;
    }
    
    function navigateFallback() {
        let url = urlInput.value.trim();
        if (!url) return;
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            url = 'https://' + url;
        }
        proxyFrame.src = url;
        urlInput.value = url;
    }
});