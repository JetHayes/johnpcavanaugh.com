// Shared site behavior: year, grain overlay, theme toggle, mobile drawer

var yrEl = document.getElementById('yr');
if (yrEl) yrEl.textContent = new Date().getFullYear();

function generateGrain() {
  const canvas = document.getElementById('grain-overlay');
  if (!canvas) return;
  const size = 250;
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  const imageData = ctx.createImageData(size, size);
  for (let i = 0; i < imageData.data.length; i += 4) {
    const val = Math.random() * 255;
    imageData.data[i] = val;
    imageData.data[i + 1] = val;
    imageData.data[i + 2] = val;
    imageData.data[i + 3] = 255;
  }
  ctx.putImageData(imageData, 0, 0);
  const dataURL = canvas.toDataURL('image/png');
  canvas.style.backgroundImage = `url(${dataURL})`;
  canvas.style.backgroundRepeat = 'repeat';
  canvas.style.backgroundSize = `${size}px ${size}px`;
  canvas.style.position = 'fixed';
  canvas.style.inset = '0';
  canvas.style.width = '100vw';
  canvas.style.height = '100vh';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '-1';
  canvas.style.opacity = '0.04';
  canvas.width = 1;
  canvas.height = 1;
}

generateGrain();

function toggleTheme() {
  const html = document.documentElement;
  const isDark = html.getAttribute('data-theme') === 'dark';
  html.setAttribute('data-theme', isDark ? 'light' : 'dark');
  document.getElementById('theme-label').textContent = isDark ? '☾ dark' : '☀ light';
  localStorage.setItem('theme', isDark ? 'light' : 'dark');
}

function toggleDrawer() {
  const drawer = document.getElementById('nav-drawer');
  const btn = document.getElementById('hamburger');
  const isOpen = drawer.classList.toggle('open');
  btn.setAttribute('aria-expanded', isOpen);
  btn.textContent = isOpen ? '✕' : '☰';
}

function closeDrawer() {
  const drawer = document.getElementById('nav-drawer');
  const btn = document.getElementById('hamburger');
  drawer.classList.remove('open');
  btn.setAttribute('aria-expanded', false);
  btn.textContent = '☰';
}

(function() {
  const saved = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = saved || (prefersDark ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', theme);
  const label = document.getElementById('theme-label');
  if (label) label.textContent = theme === 'dark' ? '☀ light' : '☾ dark';
})();
