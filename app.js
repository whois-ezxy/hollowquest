async function loadGames() {
    try {
        const thumbsResponse = await fetch('src/thumbs/');
        const thumbsText = await thumbsResponse.text();
        
        const gamesResponse = await fetch('src/games/');
        const gamesText = await gamesResponse.text();
        
        const thumbs = parseDirectory(thumbsText, 'src/thumbs/', '.jpg|.jpeg|.png|.webp');
        const gameFiles = parseDirectory(gamesText, 'src/games/', '.html');
        
        // Perfect 1:1 matching by filename (minus extensions)
        const games = gameFiles.map(filename => {
            const baseName = filename.replace('.html', '');
            const thumb = thumbs.find(t => 
                t.replace(/\.(jpg|jpeg|png|webp)$/i, '') === baseName
            ) || null;
            
            const cleanName = baseName
                .replace(/[_-]/g, ' ')
                .replace(/\b\w/g, l => l.toUpperCase())
                .replace(/\.(Html|HTML)$/i, '');
            
            return {
                name: cleanName,
                url: `src/games/${filename}`,
                thumbnail: thumb ? `src/thumbs/${thumb}` : `https://via.placeholder.com/300x200/4ecdc4/000?text=${encodeURIComponent(cleanName)}`
            };
        }).filter(game => game.name !== 'Index'); // Skip index.html
        
        renderGames(games, 'all');
        window.gameData = games;
        
    } catch (error) {
        console.error('Auto-scan failed:', error);
        renderGames(fallbackGames(), 'all');
    }
}