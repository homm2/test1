document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('video-categories-container');
    if (!container || typeof videoData === 'undefined') return;

    Object.keys(videoData).forEach(category => {
        const videos = videoData[category];
        if (videos.length === 0) return;

        const section = document.createElement('div');
        section.style.marginBottom = '3rem';
        
        const heading = document.createElement('h3');
        heading.textContent = category;
        heading.style.textTransform = 'capitalize';
        heading.style.borderBottom = '2px solid var(--primary)';
        heading.style.paddingBottom = '0.5rem';
        heading.style.color = 'var(--primary)';
        section.appendChild(heading);

        const grid = document.createElement('div');
        grid.style.display = 'grid';
        grid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(300px, 1fr))';
        grid.style.gap = '2rem';
        grid.style.marginTop = '1.5rem';

        // Setup state for batch loading
        let currentDisplayCount = 0;
        const batchSize = 12;

        const warning = document.createElement('p');
        warning.style.marginTop = '1rem';
        warning.style.color = 'var(--text-alpha-80)';
        warning.style.fontStyle = 'italic';
        
        const btnContainer = document.createElement('div');
        btnContainer.style.textAlign = 'center';
        btnContainer.style.marginTop = '2rem';
        
        const loadMoreBtn = document.createElement('button');
        loadMoreBtn.textContent = 'Load More Videos';
        loadMoreBtn.className = 'load-more-btn';
        loadMoreBtn.style.padding = '0.8rem 2rem';
        loadMoreBtn.style.background = 'linear-gradient(135deg, var(--primary), var(--secondary))';
        loadMoreBtn.style.color = 'white';
        loadMoreBtn.style.border = 'none';
        loadMoreBtn.style.borderRadius = '99px';
        loadMoreBtn.style.fontWeight = '700';
        loadMoreBtn.style.fontSize = '1rem';
        loadMoreBtn.style.cursor = 'pointer';
        loadMoreBtn.style.transition = 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        loadMoreBtn.style.boxShadow = 'var(--shadow-sm)';
        loadMoreBtn.style.display = 'none';

        loadMoreBtn.addEventListener('mouseover', () => {
            loadMoreBtn.style.transform = 'translateY(-2px) scale(1.05)';
            loadMoreBtn.style.boxShadow = 'var(--glow)';
        });
        loadMoreBtn.addEventListener('mouseout', () => {
            loadMoreBtn.style.transform = 'translateY(0) scale(1)';
            loadMoreBtn.style.boxShadow = 'var(--shadow-sm)';
        });

        btnContainer.appendChild(loadMoreBtn);

        const renderBatch = () => {
            const nextLimit = Math.min(videos.length, currentDisplayCount + batchSize);
            for (let i = currentDisplayCount; i < nextLimit; i++) {
                const card = document.createElement('div');
                card.className = 'video-card glass-panel';
                card.style.background = 'var(--card-bg)';
                card.style.borderRadius = '12px';
                card.style.padding = '1rem';
                card.style.boxShadow = 'var(--shadow-md)';
                card.style.border = '1px solid var(--glass-border)';

                const videoEl = document.createElement('video');
                // Use #t=0.001 to tell the browser to pre-fetch the first frame for the poster
                videoEl.src = videos[i] + '#t=0.001';
                videoEl.controls = true;
                videoEl.preload = 'metadata'; // Use metadata to load the preview frame
                videoEl.style.width = '100%';
                videoEl.style.aspectRatio = '16 / 9';
                videoEl.style.borderRadius = '8px';
                videoEl.style.backgroundColor = '#000';

                const p = document.createElement('p');
                p.textContent = `${category} Clip ${i + 1}`;
                p.style.marginTop = '1rem';
                p.style.fontWeight = '600';
                p.style.color = 'var(--text-color)';
                p.style.textAlign = 'center';

                card.appendChild(videoEl);
                card.appendChild(p);
                grid.appendChild(card);
            }
            
            currentDisplayCount = nextLimit;
            
            if (currentDisplayCount >= videos.length) {
                btnContainer.style.display = 'none';
                warning.style.display = 'none';
            } else {
                btnContainer.style.display = 'block';
                loadMoreBtn.style.display = 'inline-block';
                warning.textContent = `Showing ${currentDisplayCount} of ${videos.length} videos.`;
                warning.style.display = 'block';
            }
        };

        // Initial load
        renderBatch();
        
        loadMoreBtn.addEventListener('click', renderBatch);

        section.appendChild(grid);
        section.appendChild(warning);
        section.appendChild(btnContainer);

        container.appendChild(section);
    });
});
