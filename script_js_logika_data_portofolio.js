// Data Proyek Portofolio
const projectsData = [
    {
        id: 1,
        title: 'AeroTrack ID — Sistem Informasi Penerbangan (FIDS)',
        category: 'SYSTEM',
        categoryLabel: 'Sistem Informasi',
        image: 'https://placehold.co/600x360/0284c7/ffffff?text=AeroTrack+ID+FIDS',
        shortDesc: 'Aplikasi pemantauan jadwal Arrival & Departure real-time, deteksi bentrok gate, serta cuaca METAR/TAF.',
        fullDesc: 'Sistem manajemen operasional bandara dan layar informasi penerbangan (FIDS) lengkap dengan kalkulator crosswind runway, pengumuman suara TTS otomatis, serta ekspor data laporan CSV/JSON.',
        tags: ['HTML5', 'Tailwind CSS', 'JavaScript', 'Web Speech API']
    },
    {
        id: 2,
        title: 'NusaPay — Dashboard Keuangan & Analitik UMKM',
        category: 'WEB',
        categoryLabel: 'Web App',
        image: 'https://placehold.co/600x360/4f46e5/ffffff?text=NusaPay+Dashboard',
        shortDesc: 'Platform pencatatan arus kas, faktur otomatis, dan visualisasi laporan penjualan harian.',
        fullDesc: 'Aplikasi web SaaS yang membantu pelaku UMKM memantau pemasukan, pengeluaran, stok barang, serta mencetak laporan laba rugi secara instan.',
        tags: ['React.js', 'Tailwind CSS', 'Node.js', 'PostgreSQL']
    },
    {
        id: 3,
        title: 'KlinikSehat — Desain UI/UX Aplikasi Telemedisin',
        category: 'UIUX',
        categoryLabel: 'UI/UX Design',
        image: 'https://placehold.co/600x360/059669/ffffff?text=KlinikSehat+UI%2FUX',
        shortDesc: 'Perancangan antarmuka reservasi dokter, rekam medis digital, dan konsultasi daring.',
        fullDesc: 'Studi kasus desain end-to-end mulai dari riset pengguna, wireframe, design system, hingga prototipe interaktif dengan fokus pada kemudahan navigasi bagi pasien segala usia.',
        tags: ['Figma', 'Design System', 'Prototyping', 'User Research']
    }
];

let currentFilter = 'ALL';

function renderProjects() {
    const grid = document.getElementById('projects-grid');
    if (!grid) return;
    grid.innerHTML = '';

    const filtered = currentFilter === 'ALL'
        ? projectsData
        : projectsData.filter(p => p.category === currentFilter);

    filtered.forEach(proj => {
        const card = document.createElement('div');
        card.className = 'group bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 overflow-hidden hover:shadow-lg hover:border-sky-300 dark:hover:border-sky-700 transition-all flex flex-col justify-between';
        card.innerHTML = `
            <div>
                <div class="relative overflow-hidden h-48">
                    <img src="${proj.image}" alt="${proj.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300">
                    <span class="absolute top-3 left-3 px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold uppercase bg-white/90 dark:bg-slate-900/90 text-sky-700 dark:text-sky-300 backdrop-blur-xs shadow-xs">
                        ${proj.categoryLabel}
                    </span>
                </div>
                <div class="p-5">
                    <h3 class="font-bold text-base text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition">${proj.title}</h3>
                    <p class="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">${proj.shortDesc}</p>
                </div>
            </div>
            <div class="px-5 pb-5 pt-2 flex items-center justify-between border-t border-slate-200/60 dark:border-slate-800">
                <div class="flex flex-wrap gap-1.5">
                    ${proj.tags.slice(0, 2).map(t => `<span class="px-2 py-0.5 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[10px] font-mono text-slate-600 dark:text-slate-300">${t}</span>`).join('')}
                </div>
                <button onclick="openProjectModal(${proj.id})" class="text-xs font-semibold text-sky-600 dark:text-sky-400 hover:underline flex items-center gap-1">
                    <span>Detail</span>
                    <i class="fa-solid fa-arrow-right text-[10px]"></i>
                </button>
            </div>
        `;
        grid.appendChild(card);
    });
}

function filterProjects(category) {
    currentFilter = category;
    document.querySelectorAll('.proj-filter-btn').forEach(btn => {
        btn.classList.remove('bg-white', 'dark:bg-slate-900', 'text-sky-600', 'dark:text-sky-400', 'shadow-xs', 'font-semibold');
        btn.classList.add('text-slate-600', 'dark:text-slate-300', 'font-medium');
    });
    const active = document.getElementById(`filter-${category}`);
    if (active) {
        active.classList.add('bg-white', 'dark:bg-slate-900', 'text-sky-600', 'dark:text-sky-400', 'shadow-xs', 'font-semibold');
        active.classList.remove('text-slate-600', 'dark:text-slate-300', 'font-medium');
    }
    renderProjects();
}

function openProjectModal(id) {
    const proj = projectsData.find(p => p.id === id);
    if (!proj) return;
    document.getElementById('modal-proj-img').src = proj.image;
    document.getElementById('modal-proj-cat').textContent = proj.categoryLabel;
    document.getElementById('modal-proj-title').textContent = proj.title;
    document.getElementById('modal-proj-desc').textContent = proj.fullDesc;
    document.getElementById('modal-proj-tags').innerHTML = proj.tags
        .map(t => `<span class="px-2.5 py-1 rounded-lg bg-sky-50 dark:bg-sky-950 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-800 text-xs font-mono">${t}</span>`)
        .join('');
    document.getElementById('project-modal').classList.remove('hidden');
}

function closeProjectModal() {
    document.getElementById('project-modal').classList.add('hidden');
}

function toggleTheme() {
    const html = document.documentElement;
    const icon = document.getElementById('theme-icon');
    html.classList.toggle('dark');
    icon.className = html.classList.contains('dark') ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
}

function toggleMobileMenu() {
    document.getElementById('mobile-menu').classList.toggle('hidden');
}

function copyEmail() {
    const tempInput = document.createElement('input');
    tempInput.value = 'halo@rizkydev.id';
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    showToast('Alamat email berhasil disalin!');
}

function handleContactSubmit(event) {
    event.preventDefault();
    const name = document.getElementById('contact-name').value;
    event.target.reset();
    showToast(`Terima kasih ${name}! Pesan Anda telah terkirim.`);
}

function showToast(msg) {
    const toast = document.getElementById('toast');
    document.getElementById('toast-msg').textContent = msg;
    toast.classList.remove('translate-y-20', 'opacity-0');
    setTimeout(() => {
        toast.classList.add('translate-y-20', 'opacity-0');
    }, 3200);
}

window.onload = function() {
    renderProjects();
};