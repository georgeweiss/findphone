/* ── PARTICLES ── */
const canvas = document.getElementById(‘bg-canvas’);
const ctx = canvas.getContext(‘2d’);
let W, H, particles = [];

function resize() {
W = canvas.width = window.innerWidth;
H = canvas.height = window.innerHeight;
}

class Particle {
constructor() { this.reset(true); }
reset(init) {
this.x = Math.random() * W;
this.y = init ? Math.random() * H : H + 10;
this.size = Math.random() * 1.5 + 0.3;
this.speedY = -(Math.random() * 0.4 + 0.1);
this.speedX = (Math.random() - 0.5) * 0.2;
this.opacity = Math.random() * 0.5 + 0.1;
this.color = Math.random() > 0.6 ? ‘0,245,255’ : ‘0,102,255’;
}
update() {
this.y += this.speedY;
this.x += this.speedX;
if (this.y < -10) this.reset(false);
}
draw() {
ctx.beginPath();
ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
ctx.fillStyle = `rgba(${this.color},${this.opacity})`;
ctx.fill();
}
}

function initParticles() {
particles = [];
for (let i = 0; i < 90; i++) particles.push(new Particle());
}

function animate() {
ctx.clearRect(0, 0, W, H);
// gradient background
const grad = ctx.createRadialGradient(W/2, H/2, 0, W/2, H/2, Math.max(W,H)*0.7);
grad.addColorStop(0, ‘rgba(0,30,60,0.6)’);
grad.addColorStop(1, ‘rgba(2,11,24,0)’);
ctx.fillStyle = grad;
ctx.fillRect(0, 0, W, H);

```
// glow center
const cx = ctx.createRadialGradient(W/2, H*0.45, 0, W/2, H*0.45, 300);
cx.addColorStop(0, 'rgba(0,102,255,0.08)');
cx.addColorStop(1, 'rgba(0,102,255,0)');
ctx.fillStyle = cx;
ctx.fillRect(0, 0, W, H);

particles.forEach(p => { p.update(); p.draw(); });
requestAnimationFrame(animate);
```

}

resize();
initParticles();
animate();
window.addEventListener(‘resize’, () => { resize(); initParticles(); });

/* ── I18N ── */
const translations = {
pt: {
title: ‘Você Encontrou<br>Meu Telefone!’,
sub: ‘Obrigado por tentar me ajudar.’,
instructions: ‘Por favor, preencha as informações abaixo e entrarei em contato o mais breve possível:’,
labelName: ‘Nome’,
labelPhone: ‘Telefone’,
labelLocation: ‘Local para buscar’,
labelMsg: ‘Mensagem’,
placeholderName: ‘Seu nome’,
placeholderPhone: ‘Seu telefone’,
placeholderLocation: ‘Onde posso buscar?’,
placeholderMsg: ‘Mensagem adicional…’,
btn: ‘⟶ ENVIAR’,
or: ‘— ou —’,
waText: ‘Contato via WhatsApp’,
success: ‘Mensagem enviada com sucesso!’,
error: ‘Ocorreu um erro. Tente novamente.’,
},
es: {
title: ‘¡Encontraste<br>Mi Teléfono!’,
sub: ‘Gracias por intentar ayudarme.’,
instructions: ‘Por favor, completa la información a continuación y me pondré en contacto contigo a la brevedad:’,
labelName: ‘Nombre’,
labelPhone: ‘Teléfono’,
labelLocation: ‘Dónde recoger’,
labelMsg: ‘Mensaje’,
placeholderName: ‘Tu nombre’,
placeholderPhone: ‘Tu teléfono’,
placeholderLocation: ‘¿Dónde puedo recogerte?’,
placeholderMsg: ‘Mensaje adicional…’,
btn: ‘⟶ ENVIAR’,
or: ‘— o —’,
waText: ‘Contactar por WhatsApp’,
success: ‘¡Mensaje enviado con éxito!’,
error: ‘Ocurrió un error. Inténtalo de nuevo.’,
},
en: {
title: ‘You Found<br>My Phone!’,
sub: ‘Thank you for trying to help me.’,
instructions: ‘Please fill in the information below and I will get back to you as soon as possible:’,
labelName: ‘Name’,
labelPhone: ‘Phone’,
labelLocation: ‘Pickup location’,
labelMsg: ‘Message’,
placeholderName: ‘Your name’,
placeholderPhone: ‘Your phone number’,
placeholderLocation: ‘Where can I pick it up?’,
placeholderMsg: ‘Additional message…’,
btn: ‘⟶ SEND’,
or: ‘— or —’,
waText: ‘Contact via WhatsApp’,
success: ‘Message sent successfully!’,
error: ‘An error occurred. Please try again.’,
}
};

function setLang(lang) {
const t = translations[lang];
document.getElementById(‘t-title’).innerHTML = t.title;
document.getElementById(‘t-sub’).textContent = t.sub;
document.getElementById(‘t-instructions’).textContent = t.instructions;
document.getElementById(‘t-label-name’).textContent = t.labelName;
document.getElementById(‘t-label-phone’).textContent = t.labelPhone;
document.getElementById(‘t-label-location’).textContent = t.labelLocation;
document.getElementById(‘t-label-msg’).textContent = t.labelMsg;
document.getElementById(‘field-name’).placeholder = t.placeholderName;
document.getElementById(‘field-phone’).placeholder = t.placeholderPhone;
document.getElementById(‘field-location’).placeholder = t.placeholderLocation;
document.getElementById(‘field-msg’).placeholder = t.placeholderMsg;
document.getElementById(‘t-btn’).textContent = t.btn;
document.getElementById(‘t-or’).textContent = t.or;
document.getElementById(‘t-wa-text’).textContent = t.waText;
document.getElementById(‘t-success’).textContent = t.success;
document.getElementById(‘t-error’).textContent = t.error;

```
document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
document.getElementById('btn-' + lang).classList.add('active');

document.documentElement.lang = lang;
```

}

/* ── FORM SUBMIT ── */
async function handleSubmit(e) {
e.preventDefault();
const btn = document.getElementById(‘t-btn’);
btn.disabled = true;
btn.style.opacity = ‘0.6’;

```
const now = new Date();
const data = {
  name:    document.getElementById('field-name').value,
  phone:   document.getElementById('field-phone').value,
  address: document.getElementById('field-location').value,
  message: document.getElementById('field-msg').value,
  email:   '',
  title:   'FindPhone',
  time:    now.toLocaleString('pt-BR'),
};

try {
  await emailjs.send('service_063i92j', 'template_vdnum6q', data);
  document.getElementById('alert-success').style.display = 'block';
  document.getElementById('alert-error').style.display = 'none';
  document.getElementById('contact-form').reset();
} catch {
  document.getElementById('alert-error').style.display = 'block';
  document.getElementById('alert-success').style.display = 'none';
}

btn.disabled = false;
btn.style.opacity = '1';
```

}

// Set default language
setLang(‘pt’);
