// Основная логика приложения
class PontonApp {
    constructor() {
        this.selectedColor = '';
        this.init();
    }

    init() {
        this.setupMobileMenu();
        this.initializeColorPalettes();
        this.setupSmoothScrolling();
        this.setupFormHandling();
    }

    setupMobileMenu() {
        const menuBtn = document.querySelector('.mobile-menu-btn');
        const navMenu = document.querySelector('.nav-menu');

        menuBtn.addEventListener('click', () => {
            menuBtn.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Закрытие меню при клике на ссылку
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                menuBtn.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    initializeColorPalettes() {
        const mainColors = [
            { code: "RAL 1003", name: "Сигнальный желтый", color: "#E5BE01" },
            { code: "RAL 2004", name: "Чисто-оранжевый", color: "#F44611" },
            { code: "RAL 3020", name: "Транспортный красный", color: "#CC0605" },
            { code: "RAL 5015", name: "Небесно-синий", color: "#2271B3" },
            { code: "RAL 6018", name: "Желто-зеленый", color: "#57A639" },
            { code: "RAL 7004", name: "Сигнальный серый", color: "#969992" },
            { code: "RAL 8004", name: "Медно-коричневый", color: "#8F4E35" },
            { code: "RAL 9003", name: "Сигнальный белый", color: "#F4F4F4" },
            { code: "RAL 9005", name: "Черный янтарь", color: "#0A0A0A" },
            { code: "RAL 5020", name: "Океанско-синий", color: "#1D334A" }
        ];

        const mainGrid = document.getElementById('mainColorGrid');
        const fullGrid = document.getElementById('fullColorGrid');

        // Основная сетка
        mainColors.forEach(color => {
            const colorEl = this.createColorElement(color, false);
            mainGrid.appendChild(colorEl);
        });

        // Полная сетка (больше цветов)
        const allColors = [...mainColors,
            { code: "RAL 1015", name: "Светлая слоновая кость", color: "#E6D690" },
            { code: "RAL 2011", name: "Насыщенный оранжевый", color: "#EC7C26" },
            { code: "RAL 3015", name: "Светло-розовый", color: "#EA899A" },
            { code: "RAL 4008", name: "Сигнальный фиолетовый", color: "#924E7D" },
            { code: "RAL 5002", name: "Ультрамариново-синий", color: "#20214F" },
            { code: "RAL 6002", name: "Лиственно-зеленый", color: "#2D572C" },
            { code: "RAL 7001", name: "Серо-серебристый", color: "#8A9597" },
            { code: "RAL 8007", name: "Оленье-коричневый", color: "#6F4A2F" },
            { code: "RAL 9001", name: "Кремово-белый", color: "#FDF4E3" }
        ];

        allColors.forEach(color => {
            const colorEl = this.createColorElement(color, true);
            fullGrid.appendChild(colorEl);
        });
    }

    createColorElement(colorData, isFull) {
        const colorEl = document.createElement('div');
        colorEl.className = isFull ? 'full-color-option' : 'color-option';
        colorEl.style.backgroundColor = colorData.color;
        colorEl.setAttribute('data-color', colorData.code);
        colorEl.setAttribute('title', `${colorData.code} - ${colorData.name}`);

        colorEl.addEventListener('click', () => {
            this.selectColor(colorData, isFull);
        });

        return colorEl;
    }

    selectColor(colorData, isFull) {
        this.selectedColor = colorData;

        // Снимаем выделение со всех
        document.querySelectorAll('.color-option, .full-color-option').forEach(el => {
            el.classList.remove('selected');
        });

        // Выделяем выбранный
        const selectedEls = document.querySelectorAll(`[data-color="${colorData.code}"]`);
        selectedEls.forEach(el => el.classList.add('selected'));

        if (!isFull) {
            this.showNotification(`Выбран цвет: ${colorData.name}`, 'success');
        }
    }

    setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    setupFormHandling() {
        // Маска телефона
        const phoneInput = document.getElementById('phone');
        if (phoneInput) {
            phoneInput.addEventListener('input', function(e) {
                let x = e.target.value.replace(/\D/g, '').match(/(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);
                e.target.value = '+7' + (x[2] ? ' (' + x[2] : '') + (x[3] ? ') ' + x[3] : '') + (x[4] ? '-' + x[4] : '') + (x[5] ? '-' + x[5] : '');
            });
        }
    }

    showNotification(message, type = 'info') {
        // Простая реализация уведомлений
        alert(message); // В реальном проекте заменить на красивые уведомления
    }
}

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', () => {
    window.pontonApp = new PontonApp();
});

// Глобальные функции
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
        
        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
}

function openFullPalette() {
    document.getElementById('fullPaletteModal').style.display = 'block';
}

function closeFullPalette() {
    document.getElementById('fullPaletteModal').style.display = 'none';
}

function confirmColorSelection() {
    if (window.pontonApp.selectedColor) {
        window.pontonApp.showNotification(`Цвет ${window.pontonApp.selectedColor.name} выбран!`, 'success');
        closeFullPalette();
    } else {
        window.pontonApp.showNotification('Пожалуйста, выберите цвет', 'error');
    }
}

function openCoatingInfo(type) {
    const info = {
        'wood': 'Термомодифицированная доска или ДПК - долговечные и красивые решения под дерево',
        'paving': 'Наливное покрытие или брусчатка - прочные и надежные каменные поверхности'
    };
    
    alert(info[type] || 'Информация о покрытии');
}
