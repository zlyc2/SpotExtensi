(function() {
    
    /* =========================================================
       1. FITUR CUSTOM WALLPAPER
       ========================================================= */
    const wpBtn = document.createElement('button');
    wpBtn.id = 'custom-bg-btn';
    wpBtn.innerHTML = '📷 WALLPAPER';

    const resetBtn = document.createElement('button');
    resetBtn.id = 'custom-bg-reset';
    resetBtn.innerHTML = '✖';
    resetBtn.title = 'Hapus Wallpaper';

    const inputFile = document.createElement('input');
    inputFile.type = 'file';
    inputFile.accept = 'image/*';
    inputFile.style.display = 'none';

    document.body.appendChild(wpBtn);
    document.body.appendChild(resetBtn);
    document.body.appendChild(inputFile);

    function applyBackground(base64Image) {
        document.documentElement.style.setProperty('--custom-bg', `url(${base64Image})`);
        document.body.classList.add('has-custom-bg');
        resetBtn.style.display = 'block';
    }

    const savedBg = localStorage.getItem('spot_custom_bg');
    if (savedBg) applyBackground(savedBg);

    wpBtn.addEventListener('click', () => inputFile.click());

    inputFile.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const base64Image = event.target.result;
                localStorage.setItem('spot_custom_bg', base64Image);
                applyBackground(base64Image);
            };
            reader.readAsDataURL(file);
        }
    });

    resetBtn.addEventListener('click', () => {
        localStorage.removeItem('spot_custom_bg');
        document.body.classList.remove('has-custom-bg');
        resetBtn.style.display = 'none';
        inputFile.value = '';
    });


    /* =========================================================
       2. FITUR CUSTOM THEME (UI MODERN + CYBERPUNK)
       ========================================================= */
    const themeBtn = document.createElement('button');
    themeBtn.id = 'custom-theme-btn';
    themeBtn.innerHTML = '🎨 TEMA';
    document.body.appendChild(themeBtn);

    const modalHTML = `
        <div id="theme-modal-overlay">
            <div id="theme-modal-modern">
                <div class="tm-header">
                    <h2>Pilih Tema</h2>
                    <p>Sesuaikan tampilan aplikasi sesuai dengan kenyamanan aktivitas Anda sehari-hari.</p>
                </div>
                <div class="tm-grid">
                    <div class="tm-card tm-light" data-theme="theme-terang">
                        <div class="tm-radio"></div>
                        <div class="tm-card-content">
                            <div class="tm-icon">☀️</div>
                            <div class="tm-text"><h4>Tema Terang</h4><span>(Light Mode)</span></div>
                        </div>
                        <div class="tm-preview"><div class="tm-p-side"></div><div class="tm-p-main"><div class="tm-p-top"></div><div class="tm-p-bot"><div class="tm-p-b1"></div><div class="tm-p-b2"></div></div></div></div>
                    </div>
                    <div class="tm-card tm-dark" data-theme="theme-gelap">
                        <div class="tm-radio"></div>
                        <div class="tm-card-content">
                            <div class="tm-icon">🌙</div>
                            <div class="tm-text"><h4>Tema Gelap</h4><span>(Dark Mode)</span></div>
                        </div>
                        <div class="tm-preview"><div class="tm-p-side"></div><div class="tm-p-main"><div class="tm-p-top"></div><div class="tm-p-bot"><div class="tm-p-b1"></div><div class="tm-p-b2"></div></div></div></div>
                    </div>
                    <div class="tm-card tm-warm" data-theme="theme-hangat">
                        <div class="tm-radio"></div>
                        <div class="tm-card-content">
                            <div class="tm-icon">☕</div>
                            <div class="tm-text"><h4>Tema Hangat</h4><span>(Warm Earth)</span></div>
                        </div>
                        <div class="tm-preview"><div class="tm-p-side"></div><div class="tm-p-main"><div class="tm-p-top"></div><div class="tm-p-bot"><div class="tm-p-b1"></div><div class="tm-p-b2"></div></div></div></div>
                    </div>
                    <div class="tm-card tm-classic" data-theme="theme-klasik">
                        <div class="tm-radio"></div>
                        <div class="tm-card-content">
                            <div class="tm-icon">🖌️</div>
                            <div class="tm-text"><h4>Tema Klasik</h4><span>(Classic Slate)</span></div>
                        </div>
                        <div class="tm-preview"><div class="tm-p-side"></div><div class="tm-p-main"><div class="tm-p-top"></div><div class="tm-p-bot"><div class="tm-p-b1"></div><div class="tm-p-b2"></div></div></div></div>
                    </div>
                    <!-- KARTU TEMA CYBERPUNK TAMBAHAN -->
                    <div class="tm-card tm-cyberpunk" data-theme="theme-cyberpunk">
                        <div class="tm-radio"></div>
                        <div class="tm-card-content">
                            <div class="tm-icon">🤖</div>
                            <div class="tm-text"><h4>Tema Cyberpunk</h4><span>(Neon Red & Blue)</span></div>
                        </div>
                        <div class="tm-preview"><div class="tm-p-side"></div><div class="tm-p-main"><div class="tm-p-top"></div><div class="tm-p-bot"><div class="tm-p-b1"></div><div class="tm-p-b2"></div></div></div></div>
                    </div>
                </div>
                <div class="tm-footer">
                    <button id="btn-ok-theme">Terapkan Tema</button>
                    <button id="btn-cancel-theme">Batal</button>
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    const modalOverlay = document.getElementById('theme-modal-overlay');
    const btnCancelTheme = document.getElementById('btn-cancel-theme');
    const btnOkTheme = document.getElementById('btn-ok-theme');
    const themeOptions = document.querySelectorAll('.tm-card');

    // Ditambahkan 'theme-cyberpunk' ke dalam array agar tidak error
    const validThemes = ['theme-terang', 'theme-gelap', 'theme-hangat', 'theme-klasik', 'theme-cyberpunk'];
    let currentSelectedTheme = localStorage.getItem('spot_theme');
    
    // Default kita atur ke Cyberpunk
    if (!currentSelectedTheme || !validThemes.includes(currentSelectedTheme)) {
        currentSelectedTheme = 'theme-cyberpunk';
        localStorage.setItem('spot_theme', currentSelectedTheme);
    }
    
    let tempSelectedTheme = currentSelectedTheme;

    function applyThemeToBody(themeClass) {
        document.body.classList.remove('theme-terang', 'theme-gelap', 'theme-hangat', 'theme-klasik', 'theme-cyberpunk');
        document.body.classList.add(themeClass);
    }
    
    applyThemeToBody(currentSelectedTheme);

    themeBtn.addEventListener('click', () => {
        tempSelectedTheme = currentSelectedTheme; 
        updateModalSelection(tempSelectedTheme);
        modalOverlay.style.display = 'flex'; 
    });

    themeOptions.forEach(option => {
        option.addEventListener('click', function() {
            tempSelectedTheme = this.getAttribute('data-theme');
            updateModalSelection(tempSelectedTheme);
        });
    });

    function updateModalSelection(themeClass) {
        themeOptions.forEach(opt => opt.classList.remove('selected'));
        const targetElement = document.querySelector(`.tm-card[data-theme="${themeClass}"]`);
        if (targetElement) {
            targetElement.classList.add('selected');
        }
    }

    btnCancelTheme.addEventListener('click', () => { 
        modalOverlay.style.display = 'none'; 
    });

    btnOkTheme.addEventListener('click', () => {
        currentSelectedTheme = tempSelectedTheme;
        localStorage.setItem('spot_theme', currentSelectedTheme); 
        applyThemeToBody(currentSelectedTheme); 
        modalOverlay.style.display = 'none'; 
    });


    /* =========================================================
       3. REDESAIN HALAMAN DETAIL MATA KULIAH (TAGGING ELEMEN)
       Mendeteksi bar/banner biru-cyan bawaan SPOT lewat warna & ukuran,
       lalu memberi class agar bisa di-style sesuai tema di style.css
       ========================================================= */
    const SKIP = '.sidebar, .left-aside, header, .navbar, .topbar, #theme-modal-overlay, table';

    function isBlueish(cssColor) {
        const m = cssColor.match(/rgba?\(([^)]+)\)/);
        if (!m) return false;
        const p = m[1].split(',').map(parseFloat);
        if (p.length === 4 && p[3] < 0.9) return false;
        const r = p[0] / 255, g = p[1] / 255, b = p[2] / 255;
        const max = Math.max(r, g, b), min = Math.min(r, g, b);
        const l = (max + min) / 2;
        if (max === min) return false;
        const d = max - min;
        const s = d / (1 - Math.abs(2 * l - 1));
        let h;
        if (max === r) h = ((g - b) / d) % 6;
        else if (max === g) h = (b - r) / d + 2;
        else h = (r - g) / d + 4;
        h = (h * 60 + 360) % 360;
        return h >= 180 && h <= 215 && s > 0.7 && l >= 0.3 && l <= 0.55;
    }

    function addClass(el, cls) {
        if (!el.classList.contains(cls)) el.classList.add(cls);
    }

    function isOpaque(cssColor) {
        const m = cssColor.match(/rgba?\(([^)]+)\)/);
        if (!m) return false;
        const p = m[1].split(',').map(parseFloat);
        return !(p.length === 4 && p[3] < 0.9);
    }

    const TAGGED = ['spot-hero', 'spot-bar', 'spot-chip', 'spot-panel', 'spot-meta'];
    const NO_PANEL_TAGS = ['SELECT', 'INPUT', 'TEXTAREA', 'BUTTON', 'A', 'OPTION', 'TABLE', 'TR', 'TD', 'TH',
                           'THEAD', 'TBODY', 'FOOTER', 'LI', 'UL', 'IMG', 'BLOCKQUOTE'];
    const NO_PANEL_SEL = '.alert, .well, .callout, .nav-tabs, .nav-tabs *, .select2-container, .select2-container *, ' +
                         '.select2-dropdown, .select2-dropdown *, .modal-backdrop, [class*="btn"]';

    function tagDetailPage() {
        const root = document.querySelector('#page-wrapper') || document.body;
        const pageBg = getComputedStyle(root).backgroundColor;

        // 1) Chip "Waktu Akses" (dulu, supaya tidak ikut jadi panel)
        root.querySelectorAll('span, div, small, label, p, .label, .badge').forEach(el => {
            if (el.children.length > 0 || el.closest(SKIP)) return;
            const txt = el.textContent.trim();
            if (!/^Waktu Akses/i.test(txt)) return;
            let node = el;
            for (let i = 0; i < 3 && node && node !== root; i++) {
                addClass(node, 'spot-meta');
                const par = node.parentElement;
                if (!par || par.textContent.trim() !== txt) break;
                node = par;
            }
        });

        // 2) Banner / bar / chip biru-cyan, dan panel berlatar solid lainnya
        root.querySelectorAll('*').forEach(el => {
            if (el.closest(SKIP)) return;
            if (TAGGED.some(c => el.classList.contains(c))) return;
            if (el.parentElement && el.parentElement.closest('.spot-hero, .spot-bar, .spot-panel')) return;
            const rect = el.getBoundingClientRect();
            if (rect.width === 0 || rect.height === 0) return;
            const bg = getComputedStyle(el).backgroundColor;

            if (isBlueish(bg)) {
                if (rect.width >= 300 && rect.height >= 100) addClass(el, 'spot-hero');
                else if (rect.width >= 300) addClass(el, 'spot-bar');
                else addClass(el, 'spot-chip');
                return;
            }

            if (!isOpaque(bg) || bg === pageBg) return;
            if (rect.width < 200 || rect.height < 40) return;
            if (NO_PANEL_TAGS.includes(el.tagName)) return;
            if (el.matches(NO_PANEL_SEL)) return;
            addClass(el, 'spot-panel');
        });

        // 3) Selang-seling warna untuk tema Cyberpunk (merah / cyan)
        document.querySelectorAll('.spot-bar').forEach((el, i) => {
            const want = i % 2 === 0 ? 'spot-bar-odd' : 'spot-bar-even';
            const other = i % 2 === 0 ? 'spot-bar-even' : 'spot-bar-odd';
            if (el.classList.contains(other)) el.classList.remove(other);
            addClass(el, want);
        });
    }

    let tagTimer = null;
    function scheduleTag() {
        clearTimeout(tagTimer);
        tagTimer = setTimeout(tagDetailPage, 150);
    }
    tagDetailPage();
    new MutationObserver(scheduleTag).observe(document.body, {
        childList: true, subtree: true, attributes: true, attributeFilter: ['class', 'style']
    });


})();