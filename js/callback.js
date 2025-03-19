import { supabase } from './supabase.js';

export async function handleCallbackForm(event) {
    event.preventDefault();
    
    const form = event.target;
    const name = form.querySelector('input[name="name"]').value;
    const phone = form.querySelector('input[name="phone"]').value;
    
    try {
        const { data, error } = await supabase
            .from('callbacks')
            .insert([
                { 
                    name,
                    phone,
                    created_at: new Date().toISOString()
                }
            ]);
            
        if (error) throw error;
        
        // Показываем уведомление об успехе
        Swal.fire({
            title: 'Спасибо!',
            text: 'Мы свяжемся с вами в ближайшее время',
            icon: 'success',
            confirmButtonText: 'OK'
        });
        
        // Очищаем форму
        form.reset();
        
    } catch (error) {
        console.error('Error:', error.message);
        
        // Показываем уведомление об ошибке
        Swal.fire({
            title: 'Ошибка!',
            text: 'Произошла ошибка при отправке формы. Пожалуйста, попробуйте позже.',
            icon: 'error',
            confirmButtonText: 'OK'
        });
    }
} 