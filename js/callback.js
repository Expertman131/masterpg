export async function handleCallbackForm(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitButton = form.querySelector('button[type="submit"]');
    
    submitButton.disabled = true;
    submitButton.textContent = 'Отправка...';
    
    try {
        // Вместо отправки в Supabase, используем стандартный fetch для отправки на сервер
        const formData = new FormData(form);
        
        const response = await fetch('server.php', {
            method: 'POST',
            body: formData
        });
        
        if (!response.ok) {
            throw new Error('Ошибка при отправке данных');
        }
        
        // Показываем сообщение об успешной отправке
        await Swal.fire({
            title: 'Успешно!',
            text: 'Ваша заявка принята. Мы свяжемся с вами в ближайшее время.',
            icon: 'success',
            confirmButtonText: 'Понятно',
            confirmButtonColor: '#9747FF'
        });
        
        // Очищаем форму и закрываем модальное окно
        form.reset();
        const modal = document.getElementById('callback-modal');
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    } catch (error) {
        console.error('Ошибка отправки:', error);
        
        // Показываем сообщение об ошибке
        await Swal.fire({
            title: 'Ошибка!',
            text: 'Произошла ошибка при отправке. Пожалуйста, попробуйте позже.',
            icon: 'error',
            confirmButtonText: 'Закрыть',
            confirmButtonColor: '#9747FF'
        });
    } finally {
        // Возвращаем кнопке нормальное состояние
        submitButton.disabled = false;
        submitButton.textContent = 'Отправить заявку';
    }
} 