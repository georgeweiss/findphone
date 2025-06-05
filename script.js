document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('phoneForm');
    const inputs = document.querySelectorAll('input, textarea');
    const successMessage = document.querySelector('.success-message');
    const errorMessage = document.querySelector('.error-message');
    const submitBtn = document.querySelector('.submit-btn');
    
    // Adiciona classe aos inputs que já têm valor
    inputs.forEach(input => {
        if (input.value.trim() !== '') {
            input.classList.add('has-value');
        }
        
        input.addEventListener('input', function() {
            if (this.value.trim() !== '') {
                this.classList.add('has-value');
            } else {
                this.classList.remove('has-value');
            }
        });
    });
    
    // Validação do formulário
    function validateForm() {
        let isValid = true;
        
        inputs.forEach(input => {
            const errorSpan = input.nextElementSibling.nextElementSibling;
            
            if (input.hasAttribute('required') && input.value.trim() === '') {
                errorSpan.textContent = 'Este campo é obrigatório';
                errorSpan.style.display = 'block';
                input.classList.add('error');
                isValid = false;
            } else if (input.id === 'phone' && !validatePhone(input.value)) {
                errorSpan.textContent = 'Formato de telefone inválido';
                errorSpan.style.display = 'block';
                input.classList.add('error');
                isValid = false;
            } else {
                errorSpan.style.display = 'none';
                input.classList.remove('error');
            }
        });
        
        return isValid;
    }
    
    function validatePhone(phone) {
        // Validação básica de telefone
        return phone.trim().length >= 8;
    }
    
    // Limpa mensagens de erro ao digitar
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            const errorSpan = this.nextElementSibling.nextElementSibling;
            errorSpan.style.display = 'none';
            this.classList.remove('error');
        });
    });
    
    // Envio do formulário
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }
        
        // Mostra spinner de carregamento
        submitBtn.classList.add('loading');
        
        // Coleta dados do formulário
        const formData = new FormData(form);
        const data = {
            name: formData.get('name'),
            phone: formData.get('phone'),
            address: formData.get('address'),
            message: formData.get('message'),
            to_email: 'georgeweiss88@gmail.com' // Email do destinatário
        };
        
        // Envia dados para o serviço de email usando EmailJS
        emailjs.send('service_id', 'template_id', data)
            .then(function(response) {
                submitBtn.classList.remove('loading');
                successMessage.style.display = 'flex';
                errorMessage.style.display = 'none';
                form.reset();
                
                // Esconde mensagem de sucesso após 5 segundos
                setTimeout(() => {
                    successMessage.style.display = 'none';
                }, 5000);
            })
            .catch(function(error) {
                submitBtn.classList.remove('loading');
                errorMessage.style.display = 'flex';
                successMessage.style.display = 'none';
                console.error('Erro ao enviar email:', error);
                
                // Esconde mensagem de erro após 5 segundos
                setTimeout(() => {
                    errorMessage.style.display = 'none';
                }, 5000);
            });
    });
});
