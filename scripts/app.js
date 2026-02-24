document.addEventListener('DOMContentLoaded', () => {
    // Tab Navigation Logic
    const tabItems = document.querySelectorAll('.tab-item');
    const views = document.querySelectorAll('.view');
    const headerTitle = document.getElementById('header-title');

    // Make sure data is ready
    const data = window.appData;

    tabItems.forEach(tab => {
        tab.addEventListener('click', () => {
            tabItems.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            views.forEach(v => v.classList.remove('active'));

            const targetId = tab.getAttribute('data-target');
            const targetView = document.getElementById(targetId);
            if (targetView) targetView.classList.add('active');

            const title = tab.getAttribute('data-title');
            if (headerTitle) headerTitle.textContent = title;
        });
    });

    const setSafeAreas = () => {
        const sab = getComputedStyle(document.documentElement).getPropertyValue('env(safe-area-inset-bottom)');
        const sat = getComputedStyle(document.documentElement).getPropertyValue('env(safe-area-inset-top)');
        if (!sab || sab === '0px') document.documentElement.style.setProperty('--sab', '0px');
        if (!sat || sat === '0px') document.documentElement.style.setProperty('--sat', '0px');
    };
    setSafeAreas();

    // ==========================================
    // RENDER FUNCTIONS
    // ==========================================

    function renderHome() {
        const homeView = document.getElementById('view-home').querySelector('.container');

        let html = `
            <div class="welcome-header">
                <h2>Welcome back, <br><span>${data.user.name}!</span></h2>
            </div>
            
            <div class="search-bar">
                <ion-icon name="search-outline"></ion-icon>
                <input type="text" placeholder="Search programs, universities, skills...">
            </div>

            <h3 class="section-title">Recommended Programs <span class="see-all">See All</span></h3>
            <div class="h-scroll">
                ${data.programs.map(p => `
                    <div class="card">
                        <div class="card-title">${p.title}</div>
                        <div class="card-subtitle">${p.duration} • ${p.level}</div>
                        <div class="card-tags">
                            <span class="tag">${p.exams[0]}</span>
                        </div>
                    </div>
                `).join('')}
            </div>

            <h3 class="section-title">Top Universities <span class="see-all">See All</span></h3>
            <div class="university-list">
                ${data.universities.slice(0, 2).map(u => `
                    <div class="card">
                        <img src="${u.image}" alt="${u.name}" class="card-img">
                        <div class="card-title">${u.shortName}</div>
                        <div class="card-subtitle">${u.location} • ${u.type}</div>
                    </div>
                `).join('')}
            </div>
        `;
        homeView.innerHTML = html;
    }

    function renderPrograms() {
        const programsView = document.getElementById('view-programs').querySelector('.container');

        let html = `
            <div class="search-bar">
                <ion-icon name="search-outline"></ion-icon>
                <input type="text" placeholder="Search Degrees (e.g. B.Tech)">
            </div>
            
            <div class="programs-list">
                ${data.programs.map(p => `
                    <div class="card">
                        <div class="card-title">${p.title}</div>
                        <div class="card-subtitle">${p.level} • ${p.duration}</div>
                        <div style="font-size:14px; margin-bottom:8px; line-height:1.4;">
                            <strong>Eligibility:</strong> ${p.eligibility}<br>
                            <strong>Top Exams:</strong> ${p.exams.join(', ')}
                        </div>
                        <div class="card-tags">
                            ${p.careerOpts.slice(0, 2).map(c => `<span class="tag">${c}</span>`).join('')}
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
        programsView.innerHTML = html;
    }

    function renderUniversities() {
        const uniView = document.getElementById('view-universities').querySelector('.container');

        let html = `
            <div class="search-bar">
                <ion-icon name="search-outline"></ion-icon>
                <input type="text" placeholder="Search Universities">
            </div>
            
            <div class="uni-list">
                ${data.universities.map(u => `
                    <div class="card">
                        <img src="${u.image}" alt="${u.name}" class="card-img">
                        <div class="card-title">${u.name}</div>
                        <div class="card-subtitle">${u.location} • ${u.ranking}</div>
                        <p style="font-size:14px; color:var(--text-secondary); margin-bottom:12px;">
                            ${u.overview.substring(0, 80)}...
                        </p>
                        <div class="card-tags">
                            <span class="tag">${u.type}</span>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
        uniView.innerHTML = html;
    }

    function renderSkills() {
        const skillsView = document.getElementById('view-skills').querySelector('.container');

        let html = `
            <div class="search-bar">
                <ion-icon name="search-outline"></ion-icon>
                <input type="text" placeholder="Search Skills">
            </div>
            
            <div class="skills-list">
                ${data.skills.items.map(s => `
                    <div class="skill-card">
                        <div class="skill-icon" style="background:${s.color}">
                            <ion-icon name="${s.icon}"></ion-icon>
                        </div>
                        <div class="skill-info">
                            <div class="skill-name">${s.name}</div>
                            <div class="skill-meta">${s.category} • ${s.levels.length} Levels</div>
                        </div>
                        <ion-icon name="chevron-forward-outline" style="color:var(--text-tertiary);"></ion-icon>
                    </div>
                `).join('')}
            </div>
        `;
        skillsView.innerHTML = html;
    }

    function renderProfile() {
        const profileView = document.getElementById('view-profile').querySelector('.container');

        // Render simple user profile UI
        let progressHtml = Object.keys(data.user.skillProgress).map(skill => `
            <div style="margin-bottom: 12px;">
                <div style="display:flex; justify-content:space-between; font-size:14px; margin-bottom:4px;">
                    <span>${skill}</span>
                    <span style="color:var(--text-secondary)">${data.user.skillProgress[skill]}%</span>
                </div>
                <div style="height:6px; background:var(--border-color); border-radius:3px; overflow:hidden;">
                    <div style="height:100%; width:${data.user.skillProgress[skill]}%; background:var(--accent-blue);"></div>
                </div>
            </div>
        `).join('');

        let html = `
            <div style="text-align:center; padding: 24px 0;">
                <div style="width:80px; height:80px; border-radius:40px; background:var(--accent-blue); color:white; display:flex; align-items:center; justify-content:center; font-size:32px; font-weight:700; margin:0 auto 16px auto;">
                    ${data.user.name.charAt(0)}
                </div>
                <div style="font-size:24px; font-weight:700;">${data.user.name}</div>
                <div style="color:var(--text-secondary); font-size:15px; margin-top:4px;">
                    ${data.user.level} • ${data.user.targetDegree} Aspirant
                </div>
            </div>

            <h3 class="section-title">Skill Progress</h3>
            <div class="card" style="margin-bottom:24px;">
                ${progressHtml}
            </div>

            <h3 class="section-title">Account Settings</h3>
            <div class="card">
                <div style="padding:12px 0; border-bottom:0.5px solid var(--border-color); display:flex; justify-content:space-between; align-items:center;">
                    <span>Saved Universities</span>
                    <ion-icon name="chevron-forward-outline" style="color:var(--text-tertiary);"></ion-icon>
                </div>
                <div style="padding:12px 0; border-bottom:0.5px solid var(--border-color); display:flex; justify-content:space-between; align-items:center;">
                    <span>Saved Programs</span>
                    <ion-icon name="chevron-forward-outline" style="color:var(--text-tertiary);"></ion-icon>
                </div>
                <div style="padding:12px 0; display:flex; justify-content:space-between; align-items:center;">
                    <span>Edit Interests</span>
                    <ion-icon name="chevron-forward-outline" style="color:var(--text-tertiary);"></ion-icon>
                </div>
            </div>
        `;
        profileView.innerHTML = html;
    }

    // Initial render
    renderHome();
    renderPrograms();
    renderUniversities();
    renderSkills();
    renderProfile();
});
