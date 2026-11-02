/**
 * main.js — Logic: render konten, navigasi, animasi, form
 */

/* ============================================================
   THEME TOGGLE
   ============================================================ */
const getStoredTheme = () => localStorage.getItem('theme') || 'light';
const setTheme = (theme) => {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  updateThemeIcon(theme);
};

const updateThemeIcon = (theme) => {
  const icons = document.querySelectorAll('.theme-icon');
  icons.forEach(icon => {
    icon.innerHTML = theme === 'dark'
      ? `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>`
      : `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>`;
  });
};

document.addEventListener('DOMContentLoaded', () => {
  setTheme(getStoredTheme());

  document.querySelectorAll('.btn-theme').forEach(btn => {
    btn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') || 'light';
      setTheme(current === 'dark' ? 'light' : 'dark');
    });
  });

  /* ============================================================
     RENDER CONTENT
     ============================================================ */
  renderAll();

  /* ============================================================
     NAVBAR SCROLL
     ============================================================ */
  const navbar = document.getElementById('navbar');
  const onScroll = () => {
    if (window.scrollY > 20) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
    updateActiveLink();
    updateScrollProgress();
  };
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ============================================================
     SCROLL PROGRESS BAR
     ============================================================ */
  const scrollBar = document.getElementById('scroll-progress-bar');
  const updateScrollProgress = () => {
    if (!scrollBar) return;
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    scrollBar.style.width = pct + '%';
  };

  /* ============================================================
     ACTIVE NAV LINK
     ============================================================ */
  const sections = document.querySelectorAll('section[id]');
  const updateActiveLink = () => {
    let current = '';
    sections.forEach(sec => {
      const top = sec.getBoundingClientRect().top;
      if (top <= 100) current = sec.id;
    });
    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
  };

  /* ============================================================
     HAMBURGER MOBILE MENU
     ============================================================ */
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
    });
    mobileMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => mobileMenu.classList.remove('open'));
    });
  }

  /* ============================================================
     INTERSECTION OBSERVER — SCROLL ANIMATIONS
     ============================================================ */
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!reducedMotion) {
    /* -- fade-up / fade-left / fade-right / fade-zoom observer -- */
    const fadeObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          fadeObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.fade-up, .fade-left, .fade-right, .fade-zoom').forEach(el => fadeObserver.observe(el));

    /* -- timeline line draw -- */
    const timelineObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          timelineObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.05 });

    document.querySelectorAll('.timeline, .timeline-item').forEach(el => timelineObserver.observe(el));

    /* -- stat card number pop -- */
    const statObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          statObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    document.querySelectorAll('.stat-card').forEach(el => statObserver.observe(el));

    /* -- section label entrance -- */
    const labelObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          labelObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    document.querySelectorAll('section').forEach(sec => labelObserver.observe(sec));

  } else {
    /* respect reduced motion — instantly show everything */
    document.querySelectorAll('.fade-up, .fade-left, .fade-right, .fade-zoom').forEach(el => el.classList.add('visible'));
    document.querySelectorAll('.timeline, .timeline-item').forEach(el => el.classList.add('visible'));
    document.querySelectorAll('.stat-card').forEach(el => el.classList.add('visible'));
    document.querySelectorAll('section').forEach(sec => sec.classList.add('in-view'));
  }

  /* ============================================================
     3D CARD TILT EFFECT (project & achievement cards)
     ============================================================ */
  if (!reducedMotion) {
    const tiltCards = document.querySelectorAll('.project-card, .achievement-card');
    tiltCards.forEach(card => {
      card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width  - 0.5;
        const y = (e.clientY - rect.top)  / rect.height - 0.5;
        card.style.transform = `translateY(-8px) scale(1.01) rotateY(${x * 6}deg) rotateX(${-y * 5}deg)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

  /* ============================================================
     SMOOTH STAT COUNTER ANIMATION
     ============================================================ */
  if (!reducedMotion) {
    const animateCounter = (el, target, suffix) => {
      const isDecimal = target.includes('.');
      const numTarget = parseFloat(target);
      const duration = 1200;
      const start = performance.now();
      const update = (now) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = eased * numTarget;
        el.textContent = isDecimal ? current.toFixed(2) : Math.floor(current).toString();
        if (progress < 1) requestAnimationFrame(update);
        else el.textContent = target;
      };
      requestAnimationFrame(update);
    };

    const statObserverCounter = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const numEl = entry.target.querySelector('.stat-number');
        if (!numEl) return;
        const spanEl = numEl.querySelector('span');
        const suffix = spanEl ? spanEl.textContent : '';
        const rawText = numEl.textContent.replace(suffix, '').trim();
        const cleanNum = rawText.replace('+', '');
        if (isNaN(parseFloat(cleanNum))) return;
        animateCounter(numEl, cleanNum, suffix);
        if (spanEl) {
          const newSpan = document.createElement('span');
          newSpan.textContent = suffix;
          numEl.appendChild(newSpan);
        }
        statObserverCounter.unobserve(entry.target);
      });
    }, { threshold: 0.5 });

    document.querySelectorAll('.stat-card').forEach(el => statObserverCounter.observe(el));
  }

  /* ============================================================
     CONTACT FORM
     ============================================================ */
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('.form-submit');
      const nama = form.querySelector('#form-nama').value.trim();
      const email = form.querySelector('#form-email').value.trim();
      const pesan = form.querySelector('#form-pesan').value.trim();
      const subject = encodeURIComponent(`[Portofolio] Pesan dari ${nama}`);
      const body = encodeURIComponent(`Nama: ${nama}\nEmail: ${email}\n\nPesan:\n${pesan}`);
      const mailto = `mailto:${PORTFOLIO.profile.email}?subject=${subject}&body=${body}`;
      window.location.href = mailto;
    });
  }
});

/* ============================================================
   RENDER ALL
   ============================================================ */
function renderAll() {
  renderMeta();
  renderNavbar();
  renderHero();
  renderAbout();
  renderSkills();
  renderExperience();
  renderEducation();
  renderProjects();
  renderCertificates();
  renderTraining();
  initCertModal();
  renderContact();
  renderFooter();
}

/* ── META ─────────────────────────────────────────────────── */
function renderMeta() {
  const p = PORTFOLIO.profile;
  document.title = `${p.nama} — Portofolio`;
  document.querySelector('meta[name="description"]')?.setAttribute('content',
    `Portofolio ${p.nama}. ${p.tagline}`);
}

/* ── NAVBAR ─────────────────────────────────────────────────── */
function renderNavbar() {
  const p = PORTFOLIO.profile;
  const parts = p.nama.split(' ');
  const initials = parts.slice(0, 2).map(w => w[0]).join('');
  const logoEl = document.getElementById('nav-logo');
  if (logoEl) logoEl.innerHTML = `${initials}<span>.</span>`;
  const navCv = document.getElementById('nav-cv-link');
  if (navCv) {
    navCv.href = encodeURI(p.cvPath);
    navCv.setAttribute('download', 'CV_Iqbal_Mahdi_Bisyafaa.pdf');
    navCv.setAttribute('target', '_blank');
  }
  const navCvMob = document.getElementById('nav-cv-link-mobile');
  if (navCvMob) {
    navCvMob.href = encodeURI(p.cvPath);
    navCvMob.setAttribute('download', 'CV_Iqbal_Mahdi_Bisyafaa.pdf');
    navCvMob.setAttribute('target', '_blank');
  }
}

/* ── HERO ─────────────────────────────────────────────────── */
function renderHero() {
  const p = PORTFOLIO.profile;

  // Badge
  document.getElementById('hero-badge').innerHTML =
    `<span class="dot"></span> ${p.status}`;

  // Title
  const namaWords = p.nama.split(' ');
  const first = namaWords[0];
  const rest = namaWords.slice(1).join(' ');
  document.getElementById('hero-title').innerHTML =
    `${first} <span class="highlight">${rest}</span>`;

  // Desc
  document.getElementById('hero-jabatan').textContent = p.jabatan;
  document.getElementById('hero-tagline').textContent = p.tagline;

  // Actions
  const actionsEl = document.getElementById('hero-actions');
  actionsEl.innerHTML = `
    <a href="${encodeURI(p.cvPath)}" id="btn-cv" class="btn-primary" download="CV_Iqbal_Mahdi_Bisyafaa.pdf" target="_blank">
      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
      Unduh CV
    </a>
    <a href="#contact" class="btn-outline">
      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
      Hubungi Saya
    </a>
  `;

  // Format Instagram URL
  const igUrl = p.instagram
    ? (p.instagram.startsWith('http') ? p.instagram : `https://instagram.com/${p.instagram.replace(/^@/, '')}`)
    : '';

  // Socials (GitHub, LinkedIn, Instagram, Email)
  const socialsEl = document.getElementById('hero-socials');
  const socials = [
    { id: 'hero-social-github', url: p.github, icon: iconGithub(), label: 'GitHub Profile', isMail: false },
    { id: 'hero-social-linkedin', url: p.linkedin, icon: iconLinkedin(), label: 'LinkedIn Profile', isMail: false },
    { id: 'hero-social-instagram', url: igUrl, icon: iconInstagram(), label: 'Instagram Profile', isMail: false },
    { id: 'hero-social-email', url: `mailto:${p.email}`, icon: iconEmail(), label: `Email: ${p.email}`, isMail: true },
  ].filter(s => s.url);

  socialsEl.innerHTML = socials.map(s => `
    <a href="${s.url}" 
       class="social-link" 
       id="${s.id}" 
       title="${s.label}" 
       aria-label="${s.label}"
       ${s.isMail ? '' : 'target="_blank" rel="noopener noreferrer"'}>
      ${s.icon}
    </a>
  `).join('');

  // Email click enhancement: copies email & opens mail client without empty tab
  const heroEmailBtn = document.getElementById('hero-social-email');
  if (heroEmailBtn) {
    heroEmailBtn.addEventListener('click', (e) => {
      if (navigator.clipboard && p.email) {
        navigator.clipboard.writeText(p.email).then(() => {
          showToast(`Email ${p.email} disalin ke clipboard!`);
        }).catch(() => { });
      }
    });
  }

  // ── Circular Photo with Dynamic Animations ──────────────────
  const photoEl = document.getElementById('hero-photo-circle');
  if (photoEl) {
    photoEl.innerHTML = `
      <div class="photo-glow-aura"></div>
      <div class="photo-pulse-ring ring-1"></div>
      <div class="photo-pulse-ring ring-2"></div>
      <div class="photo-border-ring"></div>
      <div class="photo-inner-circle">
        ${p.fotoProfil
        ? `<img src="${p.fotoProfil}" alt="${p.nama}" />`
        : `<span class="hero-photo-fallback">${p.nama[0]}</span>`
      }
        <div class="photo-glass-glare"></div>
      </div>
    `;
    initPhotoInteractive(photoEl);
  }
}

/* ── Interactive 3D Tilt for Profile Photo ──────────────────── */
function initPhotoInteractive(container) {
  if (!container) return;
  const inner = container.querySelector('.photo-inner-circle');
  if (!inner) return;

  let bounds = null;

  function updateBounds() {
    bounds = container.getBoundingClientRect();
  }

  container.addEventListener('mouseenter', updateBounds);
  window.addEventListener('resize', updateBounds);

  container.addEventListener('mousemove', (e) => {
    if (!bounds) updateBounds();
    const x = e.clientX - bounds.left - bounds.width / 2;
    const y = e.clientY - bounds.top - bounds.height / 2;

    // Subtle 3D tilt (-7deg to +7deg)
    const rotateX = -(y / (bounds.height / 2)) * 7;
    const rotateY = (x / (bounds.width / 2)) * 7;

    inner.style.transform = `perspective(800px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale(1.03)`;
  });

  container.addEventListener('mouseleave', () => {
    inner.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)';
  });
}
/* ── ABOUT ─────────────────────────────────────────────────── */
function renderAbout() {
  const a = PORTFOLIO.about;
  const p = PORTFOLIO.profile;

  // Paragraphs
  document.getElementById('about-paragraphs').innerHTML =
    a.paragraf.map(t => `<p>${t}</p>`).join('');

  // Stats
  document.getElementById('about-stats').innerHTML = a.stats.map((s, i) => `
    <div class="stat-card fade-up fade-up-delay-${i + 1}">
      <div class="stat-number">${s.angka}<span>${s.satuan}</span></div>
      <div class="stat-label">${s.label}</div>
    </div>
  `).join('');

  // Info list
  document.getElementById('about-info').innerHTML = a.info.map(item => `
    <div class="info-item">
      <div class="info-icon">${svgIcon(item.icon, 16)}</div>
      <span><span class="info-label">${item.label}:</span><span class="info-value"> ${item.value}</span></span>
    </div>
  `).join('');

  // About CV button
  const aboutCv = document.getElementById('about-cv-link');
  if (aboutCv) {
    aboutCv.href = encodeURI(p.cvPath);
    aboutCv.setAttribute('download', 'CV_Iqbal_Mahdi_Bisyafaa.pdf');
    aboutCv.setAttribute('target', '_blank');
  }
}

/* ── SKILLS ─────────────────────────────────────────────────── */
function renderSkills() {
  document.getElementById('skills-grid').innerHTML = PORTFOLIO.skills.map((g, i) => `
    <div class="skill-group fade-up fade-up-delay-${(i % 3) + 1}">
      <div class="skill-group-header">
        <div class="skill-group-icon">${svgIcon(g.icon, 18)}</div>
        <div class="skill-group-name">${g.kategori}</div>
      </div>
      <div class="skill-tags">
        ${g.tags.map(t => `<span class="skill-tag">${t}</span>`).join('')}
      </div>
    </div>
  `).join('');
}

/* ── EXPERIENCE ─────────────────────────────────────────────── */
function renderExperience() {
  document.getElementById('timeline').innerHTML = PORTFOLIO.experience.map(exp => {
    let descHtml = '';
    if (Array.isArray(exp.deskripsi)) {
      descHtml = `
        <ul class="timeline-list">
          ${exp.deskripsi.map(item => `<li>${item}</li>`).join('')}
        </ul>
      `;
    } else if (exp.deskripsi) {
      descHtml = `<p class="timeline-desc">${exp.deskripsi}</p>`;
    }

    return `
      <div class="timeline-item fade-up">
        <div class="timeline-dot"></div>
        <div class="timeline-card">
          <div class="timeline-header">
            <div>
              <div class="timeline-role">${exp.role}</div>
              <div class="timeline-company">${exp.company}</div>
            </div>
            <span class="timeline-period">
              <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
              ${exp.period}
            </span>
          </div>
          ${descHtml}
          ${exp.tags && exp.tags.length ? `
            <div class="timeline-tags">
              ${exp.tags.map(t => `<span class="timeline-tag">${t}</span>`).join('')}
            </div>
          ` : ''}
        </div>
      </div>
    `;
  }).join('');
}

/* ── EDUCATION ─────────────────────────────────────────────── */
function renderEducation() {
  document.getElementById('education-grid').innerHTML = PORTFOLIO.education.map((edu, i) => `
    <div class="edu-card fade-up fade-up-delay-${(i % 4) + 1}">
      <div class="edu-degree">${edu.degree}</div>
      <div class="edu-institution">${edu.institution}</div>
      <div class="edu-period">${edu.period}</div>
      ${edu.detail ? `<div class="edu-detail">${edu.detail}</div>` : ''}
      ${edu.ipk ? `<div class="edu-gpa">${svgIcon('star', 13)} IPK ${edu.ipk}</div>` : ''}
    </div>
  `).join('');
}

/* ── PROJECTS & ACHIEVEMENTS ─────────────────────────────────── */
function renderProjects() {
  const grid = document.getElementById('projects-grid');
  if (!grid) return;

  const projectCards = (PORTFOLIO.projects || []).map((proj, i) => `
    <div class="project-card fade-up fade-up-delay-${(i % 2) + 1}">
      <div class="project-img ${proj.gambar ? 'has-image' : ''}" ${proj.gambar ? `onclick="window.open('${proj.gambar}', '_blank')"` : ''} style="${proj.gambar ? 'cursor: pointer;' : ''}" title="${proj.gambar ? 'Klik untuk melihat tangkapan layar penuh' : ''}">
        ${proj.gambar
      ? `<img src="${proj.gambar}" alt="${proj.nama}" loading="lazy" />
             <div class="project-img-zoom" title="Perbesar Tangkapan Layar">
               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
             </div>`
      : `<div class="project-img-placeholder">${proj.emoji}</div>`
    }
      </div>
      <div class="project-body">
        <div class="project-type">${proj.tipe}</div>
        <div class="project-title">${proj.nama}</div>
        <div class="project-desc">${proj.deskripsi}</div>
        <div class="project-stack">
          ${proj.stack.map(s => `<span class="stack-tag">${s}</span>`).join('')}
        </div>
      </div>
    </div>
  `).join('');

  const achievementCards = (PORTFOLIO.achievements || []).map((ach, i) => {
    const idx = (PORTFOLIO.projects ? PORTFOLIO.projects.length : 0) + i;
    return `
    <div class="project-card achievement-card fade-up fade-up-delay-${(idx % 2) + 1}">
      <div class="project-img has-image" ${ach.gambar ? `onclick="window.open('${ach.gambar}', '_blank')"` : ''} style="${ach.gambar ? 'cursor: pointer;' : ''}" title="${ach.gambar ? 'Klik untuk melihat dokumen pencapaian' : ''}">
        ${ach.gambar
        ? `<img src="${ach.gambar}" alt="${ach.nama}" loading="lazy" style="object-position: center 30%;" />
             <div class="project-img-zoom" title="Lihat Dokumen Pencapaian">
               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
             </div>`
        : `<div class="project-img-placeholder">🏆</div>`
      }
      </div>
      <div class="project-body">
        <div class="project-type" style="color: var(--accent); font-weight: 700; letter-spacing: 0.08em; display: inline-flex; align-items: center; gap: 5px;">
          ${svgIcon('award', 13)} Pencapaian · ${ach.periode}
        </div>
        <div class="project-title">${ach.nama}</div>
        <div class="project-desc">${ach.deskripsi}</div>
        <div class="project-stack">
          <span class="stack-tag" style="background: var(--accent-light); color: var(--accent); border-color: var(--accent-muted);">${ach.penyelenggara}</span>
        </div>
        ${ach.gambar ? `
          <div style="margin-top: auto; padding-top: 10px;">
            <a href="${ach.gambar}" class="achievement-doc-btn" target="_blank" rel="noopener noreferrer">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
              Dokumen Pencapaian
            </a>
          </div>
        ` : ''}
      </div>
    </div>
  `;
  }).join('');

  grid.innerHTML = projectCards + achievementCards;
}

function formatPdfUrl(url) {
  if (!url) return '';
  // 1. Decode first so that any existing %20, %23, etc. are reverted to real characters (prevents %2520 double-encoding)
  let clean = url;
  try {
    clean = decodeURIComponent(url);
  } catch (e) {
    try { clean = decodeURI(url); } catch (e2) { }
  }
  // 2. Encode with encodeURI, and explicitly encode '#' to '%23' so browsers don't treat it as a URL anchor
  return encodeURI(clean).replace(/#/g, '%23');
}

/* ── CERTIFICATES ─────────────────────────────────────────────── */
function renderCertificates() {
  const grid = document.getElementById('cert-grid');
  if (!grid || !PORTFOLIO.certificates || !PORTFOLIO.certificates.length) return;

  grid.innerHTML = PORTFOLIO.certificates.map((cert, i) => {
    const hasFile = Boolean(cert.file);
    const fileUrl = hasFile ? formatPdfUrl(cert.file) : '';
    const safeTitle = encodeURIComponent(cert.nama || '');
    const safeIssuer = encodeURIComponent(cert.penerbit || '');

    return `
    <div class="cert-card fade-up fade-up-delay-${(i % 2) + 1}">
      <div class="cert-icon">${svgIcon(cert.icon || 'award', 20)}</div>
      <div class="cert-body">
        <div class="cert-name">
          ${cert.nama}
          ${cert.score ? `<span class="cert-badge">${cert.score}</span>` : ''}
        </div>
        <div class="cert-issuer">${cert.penerbit}</div>
        ${cert.detail ? `<div class="cert-detail">${cert.detail}</div>` : ''}
        <div class="cert-year">${cert.tahun}</div>
        ${hasFile ? `
          <div class="card-cert-actions">
            <button type="button" class="btn-view-cert" data-cert-file="${cert.file}" data-cert-title="${safeTitle}" data-cert-issuer="${safeIssuer}">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
              Lihat Sertifikat
            </button>
            <a href="${fileUrl}" target="_blank" rel="noopener noreferrer" class="btn-icon-cert" title="Unduh Sertifikat PDF" download>
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            </a>
          </div>
        ` : ''}
      </div>
    </div>
  `;
  }).join('');
}

/* ── TRAINING & BOOTCAMPS ─────────────────────────────────────── */
function renderTraining() {
  const grid = document.getElementById('training-grid');
  if (!grid || !PORTFOLIO.training) return;

  grid.innerHTML = PORTFOLIO.training.map((t, i) => {
    const hasFile = Boolean(t.file);
    const fileUrl = hasFile ? formatPdfUrl(t.file) : '';
    const safeTitle = encodeURIComponent(t.nama || '');
    const safeIssuer = encodeURIComponent(t.penyelenggara || '');

    return `
    <div class="training-card fade-up fade-up-delay-${(i % 3) + 1}">
      <div class="training-header">
        <div class="training-icon">${svgIcon(t.icon || 'award', 20)}</div>
        <div class="training-title-wrap">
          <div class="training-title">${t.nama}</div>
          <div class="training-organizer">${t.penyelenggara}</div>
        </div>
      </div>
      <div class="training-meta">
        ${t.predikat ? `<span class="training-badge ${t.predikat.toLowerCase() === 'expert' ? 'expert' : ''}">${t.predikat}</span>` : ''}
        ${t.durasi ? `<span class="training-badge">${t.durasi}</span>` : ''}
        ${t.periode ? `<span class="training-date">${t.periode}</span>` : ''}
      </div>
      <p class="training-desc">${t.deskripsi}</p>
      ${t.tags && t.tags.length ? `
        <div class="training-tags">
          ${t.tags.map(tag => `<span class="training-tag">${tag}</span>`).join('')}
        </div>
      ` : ''}
      ${hasFile ? `
        <div class="card-cert-actions">
          <button type="button" class="btn-view-cert" data-cert-file="${t.file}" data-cert-title="${safeTitle}" data-cert-issuer="${safeIssuer}">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
            Lihat Sertifikat
          </button>
          <a href="${fileUrl}" target="_blank" rel="noopener noreferrer" class="btn-icon-cert" title="Unduh Sertifikat PDF" download>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          </a>
        </div>
      ` : ''}
    </div>
  `;
  }).join('');
}

/* ── CERTIFICATE MODAL PREVIEW ───────────────────────────────── */
let certModalInitialized = false;

function openCertModal(fileUrl, title, issuer) {
  const modal = document.getElementById('cert-modal');
  const iframe = document.getElementById('cert-modal-iframe');
  const titleEl = document.getElementById('cert-modal-title');
  const subtitleEl = document.getElementById('cert-modal-subtitle');
  const newTabBtn = document.getElementById('cert-modal-newtab');
  const downloadBtn = document.getElementById('cert-modal-download');
  const loadingEl = document.getElementById('cert-modal-loading');

  if (!modal || !iframe) return;

  if (titleEl) titleEl.textContent = title || 'Dokumen Sertifikat';
  if (subtitleEl) subtitleEl.textContent = issuer || 'Iqbal Mahdi Bisyafaa';

  if (loadingEl) {
    loadingEl.style.display = 'flex';
  }

  // formatPdfUrl guarantees single encoding with no %2520 double-encoding
  const encodedUrl = formatPdfUrl(fileUrl);
  iframe.src = encodedUrl;

  iframe.onload = () => {
    if (loadingEl) loadingEl.style.display = 'none';
  };
  // Fallback timer in case browser PDF plugin doesn't fire iframe onload
  setTimeout(() => {
    if (loadingEl) loadingEl.style.display = 'none';
  }, 900);

  if (newTabBtn) {
    newTabBtn.href = encodedUrl;
  }
  if (downloadBtn) {
    downloadBtn.href = encodedUrl;
    let rawFileName = 'Sertifikat.pdf';
    try {
      rawFileName = decodeURIComponent(fileUrl.split('/').pop() || 'Sertifikat.pdf');
    } catch (e) {
      rawFileName = fileUrl.split('/').pop() || 'Sertifikat.pdf';
    }
    downloadBtn.setAttribute('download', rawFileName);
  }

  modal.classList.add('active');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeCertModal() {
  const modal = document.getElementById('cert-modal');
  const iframe = document.getElementById('cert-modal-iframe');
  if (!modal) return;

  modal.classList.remove('active');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';

  setTimeout(() => {
    if (!modal.classList.contains('active') && iframe) {
      iframe.src = '';
    }
  }, 250);
}

function initCertModal() {
  if (certModalInitialized) return;
  certModalInitialized = true;

  const closeBtn = document.getElementById('cert-modal-close');
  const backdrop = document.getElementById('cert-modal-backdrop');

  if (closeBtn) closeBtn.addEventListener('click', closeCertModal);
  if (backdrop) backdrop.addEventListener('click', closeCertModal);

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const modal = document.getElementById('cert-modal');
      if (modal && modal.classList.contains('active')) {
        closeCertModal();
      }
    }
  });

  // Delegated click handler for "Lihat Sertifikat" buttons
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.btn-view-cert');
    if (btn) {
      const file = btn.getAttribute('data-cert-file');
      const title = decodeURIComponent(btn.getAttribute('data-cert-title') || '');
      const issuer = decodeURIComponent(btn.getAttribute('data-cert-issuer') || '');
      if (file) {
        openCertModal(file, title, issuer);
      }
    }
  });
}

window.openCertModal = openCertModal;
window.closeCertModal = closeCertModal;


/* ── CONTACT ─────────────────────────────────────────────────── */
function renderContact() {
  const p = PORTFOLIO.profile;

  document.getElementById('contact-email').textContent = p.email;
  document.getElementById('contact-email').href = `mailto:${p.email}`;
  document.getElementById('contact-phone').textContent = p.telepon;
  document.getElementById('contact-phone').href = `tel:${p.telepon.replace(/\D/g, '')}`;
  document.getElementById('contact-location').textContent = p.lokasi;
}

/* ── FOOTER ─────────────────────────────────────────────────── */
function renderFooter() {
  const p = PORTFOLIO.profile;
  const year = new Date().getFullYear();
  document.getElementById('footer-copy').innerHTML =
    `© ${year} <strong>${p.nama}</strong>. `;

  const igUrl = p.instagram
    ? (p.instagram.startsWith('http') ? p.instagram : `https://instagram.com/${p.instagram.replace(/^@/, '')}`)
    : '';

  const socials = [
    { url: p.github, label: 'GitHub', icon: iconGithub() },
    { url: p.linkedin, label: 'LinkedIn', icon: iconLinkedin() },
    { url: igUrl, label: 'Instagram', icon: iconInstagram() },
    { url: `mailto:${p.email}`, label: 'Email', icon: iconEmail() },
  ].filter(s => s.url);

  const footerSocialsEl = document.getElementById('footer-socials');
  if (footerSocialsEl) {
    footerSocialsEl.innerHTML = socials.map(s => {
      const isMail = s.url.startsWith('mailto:');
      return `<a href="${s.url}" class="footer-link social-link" title="${s.label}" ${isMail ? '' : 'target="_blank" rel="noopener noreferrer"'}>${s.icon}</a>`;
    }).join('');
  }
}

/* ============================================================
   SVG ICON HELPERS
   ============================================================ */
function svgIcon(name, size = 18) {
  const s = size;
  const icons = {
    'monitor': `<svg xmlns="http://www.w3.org/2000/svg" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>`,
    'server': `<svg xmlns="http://www.w3.org/2000/svg" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/><circle cx="6" cy="6" r="1"/><circle cx="6" cy="18" r="1"/></svg>`,
    'database': `<svg xmlns="http://www.w3.org/2000/svg" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5"/><path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3"/></svg>`,
    'wrench': `<svg xmlns="http://www.w3.org/2000/svg" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>`,
    'chart-bar': `<svg xmlns="http://www.w3.org/2000/svg" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/></svg>`,
    'users': `<svg xmlns="http://www.w3.org/2000/svg" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
    'graduation-cap': `<svg xmlns="http://www.w3.org/2000/svg" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>`,
    'map-pin': `<svg xmlns="http://www.w3.org/2000/svg" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>`,
    'languages': `<svg xmlns="http://www.w3.org/2000/svg" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m5 8 6 6"/><path d="m4 14 6-6 2-3"/><path d="M2 5h12"/><path d="M7 2h1"/><path d="m22 22-5-10-5 10"/><path d="M14 18h6"/></svg>`,
    'briefcase': `<svg xmlns="http://www.w3.org/2000/svg" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>`,
    'award': `<svg xmlns="http://www.w3.org/2000/svg" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>`,
    'star': `<svg xmlns="http://www.w3.org/2000/svg" width="${s}" height="${s}" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
    'external-link': `<svg xmlns="http://www.w3.org/2000/svg" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>`,
    'mail': `<svg xmlns="http://www.w3.org/2000/svg" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>`,
    'phone': `<svg xmlns="http://www.w3.org/2000/svg" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.59 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.06 6.06l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`,
    'send': `<svg xmlns="http://www.w3.org/2000/svg" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>`,
    'download': `<svg xmlns="http://www.w3.org/2000/svg" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>`,
    'menu': `<svg xmlns="http://www.w3.org/2000/svg" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="18" x2="20" y2="18"/></svg>`,
  };
  return icons[name] || `<span>${name}</span>`;
}

function iconGithub(size = 18) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>`;
}

function iconLinkedin(size = 18) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>`;
}

function iconInstagram(size = 18) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>`;
}

function iconEmail(size = 18) {
  return svgIcon('mail', size);
}

/* ── TOAST NOTIFICATION HELPER ────────────────────────────────── */
function showToast(message) {
  let toast = document.getElementById('portfolio-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'portfolio-toast';
    toast.className = 'portfolio-toast';
    document.body.appendChild(toast);
  }
  toast.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
    <span>${message}</span>
  `;
  toast.classList.add('show');

  clearTimeout(toast._timeout);
  toast._timeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}
