// Обработчик форм
class FormHandler {
    constructor() {
        this.forms = document.querySelectorAll('form');
        this.init();
    }

    init() {
        this.forms.forEach(form => {
            form.addEventListener('submit', (e) => this.handleSubmit(e));
        });
    }

    async handleSubmit(e) {
        e.preventDefault();
        const form = e.target;
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;

        // Показываем загрузку
        submitBtn.innerHTML = '<span class="btn-loading">Отправка...</span>';
        submitBtn.disabled = true;

        try {
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);

            // Добавляем выбранный цвет
            if (window.pontonApp && window.pontonApp.selectedColor) {
                data.color = window.pontonApp.selectedColor.name;
            }

            // Отправляем на сервер
            const response = await this.sendToServer(data);

            if (response.success) {
                this.showSuccess(form);
            } else {
                throw new Error('Ошибка сервера');
            }
        } catch (error) {
            this.showError('Ошибка отправки формы. Попробуйте еще раз.');
        } finally {
            // Восстанавливаем кнопку
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    }

    async sendToServer(data) {
        // В реальном проекте здесь будет fetch на ваш сервер
        // Для демонстрации имитируем успешную отправку
        
        console.log('Данные формы:', data);
        
        // Имитация задержки сети
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // В реальном проекте:
        // const response = await fetch('/api/contact.php', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(data)
        // });
        // return await response.json();
        
        return { success: true, message: 'Форма отправлена' };
    }

    showSuccess(form) {
        alert('Спасибо! Мы свяжемся с вами в ближайшее время.');
        form.reset();
        
        // Сбрасываем выбранный цвет
        if (window.pontonApp) {
            window.pontonApp.selectedColor = '';
            document.querySelectorAll('.color-option.selected, .full-color-option.selected').forEach(el => {
                el.classList.remove('selected');
            });
        }
    }

    showError(message) {
        alert(message);
    }
}

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
    new FormHandler();
});
