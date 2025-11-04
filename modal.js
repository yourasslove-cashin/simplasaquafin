// Управление модальными окнами
class ModalManager {
    constructor() {
        this.modals = {};
        this.init();
    }

    init() {
        this.setupImageModal();
        this.setupColorModal();
        this.setupEscapeHandler();
    }

    setupImageModal() {
        const modal = document.getElementById('imageModal');
        const modalImg = document.getElementById('modalImage');

        // Сохраняем ссылку на модальное окно
        this.modals.image = modal;

        // Закрытие по клику на overlay
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.closeImageModal();
            }
        });
    }

    setupColorModal() {
        const modal = document.getElementById('fullPaletteModal');
        this.modals.color = modal;

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.closeFullPalette();
            }
        });
    }

    setupEscapeHandler() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeAllModals();
            }
        });
    }

    openImageModal(src) {
        const modal = this.modals.image;
        const modalImg = document.getElementById('modalImage');
        
        modalImg.src = src;
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    closeImageModal() {
        const modal = this.modals.image;
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    closeFullPalette() {
        const modal = this.modals.color;
        modal.style.display = 'none';
    }

    closeAllModals() {
        Object.values(this.modals).forEach(modal => {
            if (modal) modal.style.display = 'none';
        });
        document.body.style.overflow = 'auto';
    }
}

// Глобальные функции для вызова из HTML
function openImageModal(src) {
    if (window.modalManager) {
        window.modalManager.openImageModal(src);
    }
}

function closeImageModal() {
    if (window.modalManager) {
        window.modalManager.closeImageModal();
    }
}

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
    window.modalManager = new ModalManager();
});
