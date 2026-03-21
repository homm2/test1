
class CatCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        const url = this.getAttribute('img-url') || '';
        const name = this.getAttribute('cat-name') || 'A cute cat';
        
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    border-radius: 20px;
                    overflow: hidden;
                    background: var(--card-bg, rgba(255, 255, 255, 0.1));
                    backdrop-filter: blur(10px);
                    border: 1px solid var(--glass-border, rgba(255, 255, 255, 0.2));
                    box-shadow: var(--shadow-md, 0 10px 20px rgba(0,0,0,0.1));
                    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                }

                .card-image-container {
                    width: 100%;
                    aspect-ratio: 4 / 3;
                    overflow: hidden;
                    position: relative;
                }

                img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: transform 0.6s cubic-bezier(0.2, 0, 0, 1);
                }

                :host(:hover) img {
                    transform: scale(1.1);
                }

                .card-content {
                    padding: 1.5rem;
                }

                h3 {
                    margin: 0;
                    font-size: 1.2rem;
                    font-weight: 700;
                    color: var(--text-color, #333);
                }

                .badge {
                    display: inline-block;
                    padding: 0.25rem 0.75rem;
                    background: var(--primary, #007bff);
                    color: white;
                    font-size: 0.75rem;
                    font-weight: 600;
                    border-radius: 99px;
                    margin-top: 0.5rem;
                }
            </style>
            <div class="card-image-container">
                <img src="${url}" alt="${name}">
            </div>
            <div class="card-content">
                <h3>${name}</h3>
                <span class="badge">Lovely Feline</span>
            </div>
        `;
    }
}

customElements.define('cat-card', CatCard);
