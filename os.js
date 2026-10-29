/* EJ OS — behavior. Progressive enhancement: without JS every window renders as a normal stacked card. */
(() => {
    'use strict';

    const $ = (selector, scope = document) => scope.querySelector(selector);
    const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];
    const root = document.documentElement;
    root.classList.add('js');

    const desktopMQ = window.matchMedia('(min-width: 1024px)');
    const smallMQ = window.matchMedia('(max-width: 599.98px)');
    const reduceMQ = window.matchMedia('(prefers-reduced-motion: reduce)');
    const isDesktop = () => desktopMQ.matches;
    const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

    const APPS = {
        welcome: { label: 'Welcome', icon: 'i-smile' },
        projects: { label: 'Projects', icon: 'i-folder' },
        about: { label: 'About Me', icon: 'i-smile' },
        stack: { label: 'My Stack', icon: 'i-stack' },
        resume: { label: 'Résumé', icon: 'i-doc' },
        contact: { label: 'Contact', icon: 'i-mail' },
        opensource: { label: 'Open Source', icon: 'i-star' },
        writeups: { label: 'Writeups', icon: 'i-lock' },
        certificates: { label: 'Certificates', icon: 'i-badge' },
        github: { label: 'GitHub', icon: 'i-git' },
        credits: { label: 'Credits', icon: 'i-spark' }
    };
    const SHORTCUT_ORDER = ['projects', 'about', 'stack', 'resume', 'contact', 'opensource', 'writeups', 'certificates', 'github', 'credits'];

    const OPEN_TOASTS = {
        projects: ['projects.exe', 'Five builds loaded. Pick a card for the details.'],
        about: ['about_me.txt', 'Nice to meet you!'],
        stack: ['my_stack.dll', 'Tools loaded. Tap a group to expand it.'],
        resume: ['resume.pdf', 'Use the toolbar to download a copy.'],
        contact: ['contact.exe', 'Every link is one click away.'],
        opensource: ['opensource.exe', 'Three pull requests, each with a write-up.'],
        writeups: ['writeups.exe', 'Three lab walkthroughs loaded.'],
        certificates: ['certificates.exe', 'Each certificate links to its proof.'],
        github: ['github.exe', 'Profile, stats and featured projects loaded.'],
        credits: ['credits.exe', 'Press play for music and narration.']
    };

    const PROJECTS = {
        'port-intel': {
            name: 'Port Intel', kind: 'Recon', thumb: 'dash', tech: ['React', 'Node.js', 'Express', 'PostgreSQL'],
            blurb: 'Cloud-first reconnaissance dashboard that turns port scan data into actionable insights for security teams.',
            problem: 'Raw port-scan output is hard to read at a glance.',
            built: 'A cloud-first reconnaissance dashboard that turns port scan data into insights for security teams.',
            live: 'https://portintel.tech/'
        },
        'royal-score': {
            name: 'Royal Score', kind: 'Web app', thumb: 'cards', tech: ['Node.js', 'Vanilla JS', 'HTML', 'CSS'],
            blurb: 'Multiplayer card game with socket-backed matchmaking and a UI built for quick turns on mobile and desktop.',
            problem: 'Quick, turn-based card games need fast matchmaking and an interface that works on small screens.',
            built: 'A multiplayer card game with socket-backed matchmaking and a UI built for quick turns on mobile and desktop.',
            repo: 'https://github.com/EJ-Edwards/Royal-Score'
        },
        'remote-admin-tool': {
            name: 'Remote Admin Tool', kind: 'Admin tool', thumb: 'dash', tech: ['Python', 'Flask', 'WebSockets'],
            blurb: 'Secure remote management tool with telemetry, RBAC, and command execution built on a lightweight web dashboard.',
            problem: 'Managing machines remotely needs safe access control and good visibility.',
            built: 'A remote management tool with telemetry, role-based access control and command execution, driven from a lightweight web dashboard.',
            repo: 'https://github.com/EJ-Edwards/Remote-Admin-Tool'
        },
        'ej-student-system': {
            name: 'EJ Student System', kind: 'Java', thumb: 'code', code: 'class Student {\n  id; name;\n}', tech: ['Java'],
            blurb: 'A Java API for managing student information and academic records.',
            problem: 'Student and academic records need consistent, structured management.',
            built: 'A Java API for managing student information and academic records.',
            repo: 'https://github.com/EJ-Edwards/EJ-Student-System'
        },
        'portfolio-website': {
            name: 'Portfolio-Website', kind: 'Web', thumb: 'site', tech: ['HTML', 'CSS', 'JavaScript'],
            blurb: 'A personal portfolio website showcasing projects, skills, and experience in software and cybersecurity.',
            problem: 'One place to present projects, write-ups and ways to get in touch.',
            built: 'This site: a personal portfolio styled as a tiny desktop operating system.',
            repo: 'https://github.com/EJ-Edwards/Portfolio-Website'
        }
    };

    const MASCOT_LINES = [
        'Beep boop! I am Chip, your pixel guide.',
        'Press ? to see the keyboard shortcuts.',
        'Psst… try the Konami code.',
        'Tip: Esc closes the top window.',
        'You found me! Have a sparkle.'
    ];

    const wins = {};
    $$('.window[data-app]').forEach((win) => {
        wins[win.dataset.app] = win;
        win.setAttribute('role', 'dialog');
    });
    const stage = $('#stage');
    const tasksEl = $('#tasks');
    const startBtn = $('#startBtn');
    const startMenu = $('#startMenu');
    const toasts = $('#toasts');
    const clock = $('#clock');
    let projectList = null;
    let projectDetail = null;
    const detailOpen = () => Boolean(projectDetail) && !projectDetail.hidden;

    /* Sub-views: list windows (Open Source, Writeups) open a page partial inside the same window */
    const subCache = new Map();
    const subView = (app) => (wins[app] ? wins[app].querySelector('.sub-view') : null);
    const subList = (app) => (wins[app] ? wins[app].querySelector('.sub-list') : null);
    const subOpen = (app) => { const view = subView(app); return Boolean(view) && !view.hidden; };
    const hashFor = (app) => {
        if (app === 'projects' && detailOpen()) return `projects/${projectDetail.dataset.id}`;
        if (subOpen(app)) return `${app}/${subView(app).dataset.path.split('/').pop()}`;
        return app;
    };

    const state = { open: [], minimized: new Set(), focus: null, z: 100, openers: {}, announced: new Set() };

    const el = (tag, attrs = {}, children = []) => {
        const node = document.createElement(tag);
        Object.entries(attrs).forEach(([key, value]) => {
            if (value === false || value == null) return;
            if (key === 'class') node.className = value;
            else if (key === 'text') node.textContent = value;
            else node.setAttribute(key, value === true ? '' : value);
        });
        [].concat(children).forEach((child) => node.append(child));
        return node;
    };
    const icon = (id) => {
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('aria-hidden', 'true');
        const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
        use.setAttribute('href', `#${id}`);
        svg.append(use);
        return svg;
    };

    /* ---------- Hash helpers ---------- */
    const setHash = (value) => {
        const url = value ? `#${value}` : `${location.pathname}${location.search}`;
        history.replaceState(null, '', url);
    };

    /* ---------- Credits audio ---------- */
    const credits = { music: null, voice: null, ctx: null, playing: false };
    const creditsUI = () => {
        const host = wins.credits;
        return host ? { roll: $('[data-credits-roll]', host), button: $('[data-act="credits-play"]', host), label: $('[data-credits-label]', host), status: $('[data-credits-status]', host) } : {};
    };
    const stopCredits = () => {
        credits.playing = false;
        [credits.music, credits.voice].forEach((audio) => { if (audio) { audio.pause(); audio.currentTime = 0; } });
        const { roll, button, label, status } = creditsUI();
        if (!button) return;
        roll.classList.remove('is-rolling');
        button.setAttribute('aria-pressed', 'false');
        label.textContent = 'Play credits';
        status.textContent = '';
    };
    const playCredits = async () => {
        const { roll, button, label, status } = creditsUI();
        if (!button) return;
        if (!credits.music) {
            credits.music = new Audio('assets/audio/credits-music.mp3');
            credits.music.addEventListener('ended', stopCredits);
            credits.voice = new Audio('assets/audio/credits-announcer.mp3');
            // iOS ignores audio.volume, so route the music through a gain node to keep it under the voice.
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            if (AudioCtx) {
                credits.ctx = new AudioCtx();
                const gain = credits.ctx.createGain();
                gain.gain.value = 0.35;
                credits.ctx.createMediaElementSource(credits.music).connect(gain);
                gain.connect(credits.ctx.destination);
            } else {
                credits.music.volume = 0.35;
            }
        }
        try {
            await Promise.all([credits.ctx ? credits.ctx.resume() : null, credits.music.play(), credits.voice.play()]);
        } catch (error) {
            stopCredits();
            status.textContent = 'Audio could not be played.';
            return;
        }
        credits.playing = true;
        const duration = Math.max(credits.music.duration || 0, credits.voice.duration || 0);
        roll.style.setProperty('--roll-time', `${duration > 0 ? duration : 18}s`);
        roll.style.setProperty('--roll-h', `${roll.clientHeight}px`);
        roll.scrollTop = 0;
        roll.classList.remove('is-rolling');
        void roll.offsetWidth;
        roll.classList.add('is-rolling');
        button.setAttribute('aria-pressed', 'true');
        label.textContent = 'Stop credits';
        status.textContent = 'Credits playing.';
    };
    document.addEventListener('visibilitychange', () => { if (document.hidden && credits.playing) stopCredits(); });

    /* ---------- Window management ---------- */
    const hideWindow = (id) => {
        const win = wins[id];
        if (!win) return;
        win.classList.remove('is-open', 'is-focused', 'is-min', 'is-loading');
        if (id === 'welcome') win.classList.add('is-closed');
        state.open = state.open.filter((app) => app !== id);
        state.minimized.delete(id);
        if (id === 'projects') showList(false);
        if (id === 'credits') stopCredits();
        closeSub(id, { focus: false, hash: false });
    };

    const topWindow = () => [...state.open].reverse().find((app) => !state.minimized.has(app)) || null;

    const focusApp = (id) => {
        state.focus = id;
        Object.entries(wins).forEach(([app, win]) => {
            win.classList.toggle('is-focused', app === id);
            if (app === id) win.style.zIndex = isDesktop() ? String(++state.z) : '';
        });
        render();
    };

    const render = () => {
        tasksEl.replaceChildren(...state.open.map((id) => {
            const pressed = state.focus === id && !state.minimized.has(id);
            return el('button', { class: 'task', type: 'button', 'data-task': id, 'aria-pressed': String(pressed), title: APPS[id].label }, [icon(APPS[id].icon), el('span', { text: APPS[id].label })]);
        }));
        const activeApp = state.open.find((id) => id !== 'welcome');
        $$('.app[data-open]').forEach((link) => link.classList.toggle('is-open', state.open.includes(link.dataset.open)));
        $$('.dock [data-open], .dock [data-home]').forEach((button) => {
            const current = button.hasAttribute('data-home') ? !activeApp : button.dataset.open === activeApp;
            button.setAttribute('aria-current', String(current));
        });
        $$('.window .ctl.max').forEach((button) => {
            const maxed = button.closest('.window').classList.contains('is-max');
            button.setAttribute('aria-pressed', String(maxed));
            button.setAttribute('aria-label', `${maxed ? 'Restore' : 'Maximize'} ${APPS[button.closest('.window').dataset.app].label}`);
        });
        $$('.window .back').forEach((button) => {
            const app = button.closest('.window').dataset.app;
            const inDetail = (app === 'projects' && detailOpen()) || subOpen(app);
            button.setAttribute('aria-label', inDetail ? 'Back to the list' : 'Back to home');
        });
    };

    const openApp = (id, { opener = null, silent = false } = {}) => {
        const win = wins[id];
        if (!win) return;
        closeStart();
        if (!isDesktop() && id !== 'welcome') {
            state.open.filter((app) => app !== 'welcome' && app !== id).forEach(hideWindow);
        }
        const wasOpen = state.open.includes(id);
        if (!wasOpen) state.open.push(id);
        state.minimized.delete(id);
        if (opener) state.openers[id] = opener;
        win.classList.remove('is-min', 'is-closed');
        win.classList.add('is-open');
        focusApp(id);
        if (silent) return;
        if (!wasOpen) {
            win.classList.add('is-loading');
            window.setTimeout(() => win.classList.remove('is-loading'), reduceMQ.matches ? 0 : 700);
            if (OPEN_TOASTS[id] && !smallMQ.matches && !state.announced.has(id)) {
                state.announced.add(id);
                notify(...OPEN_TOASTS[id], 3600);
            }
        }
        win.focus({ preventScroll: true });
        if (id !== 'welcome') setHash(hashFor(id));
    };

    const closeApp = (id) => {
        if (!wins[id]) return;
        const wasFocused = state.focus === id;
        hideWindow(id);
        wins[id].classList.remove('is-max');
        if (id === 'projects') showList(false);
        closeSub(id, { focus: false, hash: false });
        state.focus = wasFocused ? (isDesktop() ? topWindow() : null) : state.focus;
        Object.entries(wins).forEach(([app, win]) => win.classList.toggle('is-focused', app === state.focus));
        render();
        const opener = state.openers[id];
        const target = opener && document.contains(opener) && opener.getClientRects().length ? opener : $(`.launcher [data-open="${id}"]`);
        if (target) target.focus({ preventScroll: true });
        if (id !== 'welcome') setHash('');
    };

    const minimizeApp = (id) => {
        if (!isDesktop() || !wins[id]) return;
        state.minimized.add(id);
        wins[id].classList.add('is-min');
        wins[id].classList.remove('is-focused');
        state.focus = topWindow();
        if (state.focus) wins[state.focus].classList.add('is-focused');
        render();
    };

    const restoreApp = (id) => {
        state.minimized.delete(id);
        wins[id].classList.remove('is-min');
        focusApp(id);
    };

    const toggleMax = (id) => {
        if (!isDesktop()) return;
        wins[id].classList.toggle('is-max');
        render();
    };

    const goHome = () => {
        state.open.filter((app) => app !== 'welcome').forEach((app) => { closeSub(app, { focus: false, hash: false }); hideWindow(app); wins[app].classList.remove('is-max'); });
        showList(false);
        state.focus = state.open.includes('welcome') ? 'welcome' : null;
        render();
        setHash('');
        window.scrollTo({ top: 0, behavior: reduceMQ.matches ? 'auto' : 'smooth' });
    };

    const showDesktop = () => {
        if (isDesktop()) state.open.forEach((id) => minimizeApp(id));
        else goHome();
        closeStart();
    };

    /* ---------- Projects ---------- */
    const buildThumb = (project) => {
        const thumb = el('div', { class: `thumb thumb-${project.thumb}`, 'aria-hidden': 'true' });
        if (project.thumb === 'term') thumb.append(el('span', { text: project.term }));
        else if (project.thumb === 'code') thumb.append(el('span', { text: project.code }));
        else {
            const count = { dash: 5, chat: 3, cards: 3, site: 3 }[project.thumb] || 3;
            for (let i = 0; i < count; i += 1) thumb.append(el('i'));
        }
        return thumb;
    };

    function showProject(id, opener) {
        const project = PROJECTS[id];
        if (!project || !projectDetail) return;
        const links = [];
        if (project.live) links.push(el('a', { class: 'btn lime', href: project.live, target: '_blank', rel: 'noopener noreferrer' }, ['Live demo', icon('i-ext'), el('span', { class: 'sr-only', text: ' (opens in a new tab)' })]));
        if (project.repo) links.push(el('a', { class: 'btn chrome', href: project.repo, target: '_blank', rel: 'noopener noreferrer' }, ['Source code', icon('i-ext'), el('span', { class: 'sr-only', text: ' (opens in a new tab)' })]));
        const section = (title, content) => [el('dt', { text: title }), el('dd', {}, content)];
        projectDetail.replaceChildren(
            el('div', { class: 'crumbs' }, [el('button', { class: 'btn chrome', type: 'button', 'data-act': 'close-detail' }, [icon('i-back'), 'All projects'])]),
            buildThumb(project),
            el('p', { class: 'mono-label', text: ($(`[data-project="${id}"]`)?.closest('.proj-card')?.querySelector('.mono-label')?.textContent) || project.kind }),
            el('h2', { id: 'detail-title', tabindex: '-1', text: project.name }),
            el('div', { class: 'badge-list' }, project.tech.map((tech) => el('span', { class: 'badge', text: tech }))),
            el('div', { class: 'btn-row' }, links),
            el('dl', {}, [
                ...section('Overview', el('p', { text: project.blurb })),
                ...section('Problem', el('p', { text: project.problem })),
                ...section('Architecture', el('p', { text: `Built with ${project.tech.join(', ')}.` })),
                ...section('Implementation', el('p', { text: project.built })),
                ...section('Lessons learned', el('p', { class: 'placeholder', text: 'Write-up coming soon.' }))
            ])
        );
        projectDetail.dataset.id = id;
        projectDetail.hidden = false;
        projectList.hidden = true;
        wins.projects.querySelector('.window-body').scrollTop = 0;
        if (!state.open.includes('projects')) openApp('projects', { opener });
        else setHash(`projects/${id}`);
        $('#detail-title').focus({ preventScroll: true });
        render();
    }

    function showList(focusCard = true) {
        if (!projectDetail) return;
        const wasId = projectDetail.dataset.id;
        projectDetail.hidden = true;
        projectDetail.replaceChildren();
        projectList.hidden = false;
        if (state.open.includes('projects')) setHash('projects');
        render();
        if (focusCard && wasId) {
            const card = $(`[data-project="${wasId}"]`);
            if (card) card.focus({ preventScroll: true });
        }
    }

    async function openSub(app, path, opener) {
        const view = subView(app);
        const list = subList(app);
        if (!view || !list) return;
        let html = subCache.get(path);
        if (html === undefined) {
            try {
                const response = await fetch(`windows/${path}.html`);
                if (!response.ok) throw new Error(String(response.status));
                html = await response.text();
                subCache.set(path, html);
            } catch (error) {
                html = null;
            }
        }
        if (html === null) {
            notify('Could not load', 'That page failed to load. Check your connection and try again.');
            return;
        }
        view.innerHTML = html;
        view.dataset.path = path;
        view.hidden = false;
        list.hidden = true;
        wins[app].querySelector('.window-body').scrollTop = 0;
        if (!state.open.includes(app)) openApp(app, { opener });
        else setHash(hashFor(app));
        const heading = view.querySelector('h2');
        if (heading) { heading.setAttribute('tabindex', '-1'); heading.focus({ preventScroll: true }); }
        render();
    }

    function closeSub(app, { focus = true, hash = true } = {}) {
        const view = subView(app);
        const list = subList(app);
        if (!view || view.hidden) return;
        const path = view.dataset.path;
        view.hidden = true;
        view.replaceChildren();
        delete view.dataset.path;
        list.hidden = false;
        if (hash && state.open.includes(app)) setHash(app);
        render();
        if (focus && path) {
            const card = wins[app].querySelector(`[data-sub="${path}"]`);
            if (card) card.focus({ preventScroll: true });
        }
    }

    const backAction = (id) => {
        if (id === 'projects' && detailOpen()) showList();
        else if (subOpen(id)) closeSub(id);
        else goHome();
    };

    /* ---------- Start menu ---------- */
    function closeStart() {
        if (startMenu.hidden) return;
        startMenu.hidden = true;
        startBtn.setAttribute('aria-expanded', 'false');
    }
    const toggleStart = () => {
        const opening = startMenu.hidden;
        startMenu.hidden = !opening;
        startBtn.setAttribute('aria-expanded', String(opening));
        if (opening) $('.sm-item', startMenu).focus();
    };

    /* ---------- Notifications + easter eggs ---------- */
    function notify(title, message, duration = 4200) {
        const dismiss = el('button', { type: 'button', 'aria-label': 'Dismiss notification' }, [icon('i-close')]);
        const toast = el('div', { class: 'toast' }, [el('strong', { text: title }), dismiss, el('p', { text: message })]);
        const remove = () => { toast.classList.add('out'); window.setTimeout(() => toast.remove(), reduceMQ.matches ? 0 : 260); };
        dismiss.addEventListener('click', remove);
        toasts.append(toast);
        while (toasts.children.length > 3) toasts.firstElementChild.remove();
        window.setTimeout(remove, duration);
    }

    const sparkleBurst = () => {
        if (reduceMQ.matches) return;
        const layer = el('div', { class: 'sparkle-burst', 'aria-hidden': 'true' });
        for (let i = 0; i < 22; i += 1) {
            const star = el('span');
            star.style.left = `${Math.random() * 100}%`;
            star.style.top = `${40 + Math.random() * 55}%`;
            star.style.animationDelay = `${Math.random() * 0.5}s`;
            layer.append(star);
        }
        document.body.append(layer);
        window.setTimeout(() => layer.remove(), 2600);
    };

    const readTheme = () => { try { return localStorage.getItem('ej-theme'); } catch (error) { return null; } };
    const applyTheme = (theme, persist = true) => {
        root.dataset.theme = theme;
        $$('[data-act="theme"]').forEach((button) => button.setAttribute('aria-pressed', String(theme === 'dusk')));
        if (persist) { try { localStorage.setItem('ej-theme', theme); } catch (error) { /* storage unavailable */ } }
    };
    const toggleTheme = () => applyTheme(root.dataset.theme === 'dusk' ? 'day' : 'dusk');

    const showShortcuts = () => notify('Keyboard shortcuts', 'Alt+1–9 open Projects, About, Stack, Résumé, Contact, Open Source, Writeups, Certificates, GitHub. Alt+0 opens Welcome. Esc closes the top window. Double-click a title bar to maximize.', 9000);

    /* ---------- Events ---------- */
    document.addEventListener('click', (event) => {
        const target = event.target;
        if (!startMenu.hidden && !startMenu.contains(target) && !startBtn.contains(target)) closeStart();

        const task = target.closest('[data-task]');
        if (task) {
            const id = task.dataset.task;
            if (state.minimized.has(id)) restoreApp(id);
            else if (state.focus === id) minimizeApp(id);
            else focusApp(id);
            return;
        }
        const control = target.closest('.ctl');
        if (control) {
            const id = control.closest('.window').dataset.app;
            if (control.classList.contains('close')) closeApp(id);
            else if (control.classList.contains('min')) minimizeApp(id);
            else toggleMax(id);
            return;
        }
        const back = target.closest('.back');
        if (back) { backAction(back.closest('.window').dataset.app); return; }

        const project = target.closest('[data-project]');
        if (project) { event.preventDefault(); showProject(project.dataset.project, project); return; }

        const sub = target.closest('[data-sub]');
        if (sub) { event.preventDefault(); openSub(sub.closest('.window').dataset.app, sub.dataset.sub, sub); return; }

        const opener = target.closest('[data-open]');
        if (opener) { event.preventDefault(); openApp(opener.dataset.open, { opener }); return; }

        const action = target.closest('[data-act]');
        if (!action) return;
        const type = action.dataset.act;
        if (type === 'close-detail') showList();
        else if (type === 'close-sub') closeSub(action.closest('.window').dataset.app);
        else if (type === 'show-desktop') showDesktop();
        else if (type === 'theme') toggleTheme();
        else if (type === 'credits-play') { if (credits.playing) stopCredits(); else playCredits(); }
        else if (type === 'shortcuts') { closeStart(); showShortcuts(); }
        else if (type === 'home') goHome();
        else if (type === 'mascot') {
            action.classList.remove('is-bounce');
            void action.offsetWidth;
            action.classList.add('is-bounce');
            notify('Chip says', MASCOT_LINES[Math.floor(Math.random() * MASCOT_LINES.length)], 4200);
        }
    });

    startBtn.addEventListener('click', toggleStart);

    document.addEventListener('pointerdown', (event) => {
        if (!isDesktop()) return;
        const win = event.target.closest('.window');
        if (win && win.dataset.app !== state.focus) focusApp(win.dataset.app);
    });

    $$('.titlebar').forEach((bar) => {
        bar.addEventListener('dblclick', (event) => {
            if (!isDesktop() || event.target.closest('button')) return;
            const id = bar.closest('.window').dataset.app;
            if (id !== 'welcome') toggleMax(id);
        });
        bar.addEventListener('pointerdown', (event) => {
            if (!isDesktop() || event.button !== 0 || event.target.closest('button')) return;
            const win = bar.closest('.window');
            if (win.classList.contains('is-max')) return;
            const area = stage.getBoundingClientRect();
            const box = win.getBoundingClientRect();
            const offsetX = event.clientX - box.left;
            const offsetY = event.clientY - box.top;
            bar.setPointerCapture(event.pointerId);
            bar.classList.add('is-dragging');
            const move = (moveEvent) => {
                win.style.setProperty('--x', `${clamp(moveEvent.clientX - offsetX - area.left, 120 - box.width, area.width - 120)}px`);
                win.style.setProperty('--y', `${clamp(moveEvent.clientY - offsetY - area.top, 0, area.height - 60)}px`);
            };
            const stop = () => {
                bar.classList.remove('is-dragging');
                bar.removeEventListener('pointermove', move);
                bar.removeEventListener('pointerup', stop);
                bar.removeEventListener('pointercancel', stop);
            };
            bar.addEventListener('pointermove', move);
            bar.addEventListener('pointerup', stop);
            bar.addEventListener('pointercancel', stop);
        });
    });

    const konami = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;
    document.addEventListener('keydown', (event) => {
        const typing = event.target.closest && event.target.closest('input, textarea, select, [contenteditable]');
        if (event.key === 'Escape') {
            if (!startMenu.hidden) { closeStart(); startBtn.focus(); return; }
            const id = state.focus;
            if (id && (isDesktop() || id !== 'welcome')) closeApp(id);
            return;
        }
        if (typing) return;
        if (event.altKey && !event.ctrlKey && !event.metaKey) {
            const digit = /^Digit([0-9])$/.exec(event.code);
            if (digit) {
                event.preventDefault();
                const id = digit[1] === '0' ? 'welcome' : SHORTCUT_ORDER[Number(digit[1]) - 1];
                openApp(id);
                return;
            }
        }
        if (event.key === '?') { showShortcuts(); return; }
        const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;
        konamiIndex = key === konami[konamiIndex] ? konamiIndex + 1 : (key === konami[0] ? 1 : 0);
        if (konamiIndex === konami.length) {
            konamiIndex = 0;
            sparkleBurst();
            toggleTheme();
            notify('Secret unlocked!', 'You found the Konami code. The sky just changed — press it again to switch back.', 6000);
        }
    });

    window.addEventListener('hashchange', () => applyHash());

    desktopMQ.addEventListener('change', () => {
        Object.values(wins).forEach((win) => { win.style.zIndex = ''; win.classList.remove('is-max', 'is-min'); });
        state.minimized.clear();
        if (!isDesktop()) {
            const keep = [...state.open].reverse().find((app) => app !== 'welcome');
            state.open.filter((app) => app !== 'welcome' && app !== keep).forEach(hideWindow);
        }
        const open = state.open.filter((app) => wins[app].classList.contains('is-open') || app === 'welcome');
        state.open = open;
        state.focus = topWindow();
        Object.entries(wins).forEach(([app, win]) => win.classList.toggle('is-focused', app === state.focus));
        render();
    });

    /* ---------- Clock ---------- */
    const tick = () => {
        const now = new Date();
        clock.textContent = now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
        clock.setAttribute('datetime', now.toISOString());
    };
    tick();
    window.setInterval(tick, 20000);

    /* ---------- Deep links ---------- */
    function applyHash() {
        const [app, sub] = location.hash.replace('#', '').split('/');
        if (!wins[app] || app === 'welcome') return;
        if (app === 'projects' && sub && PROJECTS[sub]) { showProject(sub); return; }
        const card = sub ? wins[app].querySelector(`[data-sub$="/${sub}"]`) : null;
        if (card) openSub(app, card.dataset.sub, card);
        else openApp(app);
    }

    /* ---------- Modular content: each window body is its own HTML file ---------- */
    const loadPartials = async () => {
        await Promise.all($$('[data-src]').map(async (host) => {
            try {
                const response = await fetch(host.dataset.src);
                if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
                host.innerHTML = await response.text();
                host.dataset.loaded = 'true';
            } catch (error) {
                host.dataset.loaded = 'error';
            }
        }));
        projectList = $('#projectList');
        projectDetail = $('#projectDetail');
    };

    /* ---------- Init ---------- */
    applyTheme(readTheme() || 'day', false);
    openApp('welcome', { silent: true });
    render();
    loadPartials().then(() => {
        applyHash();
        render();
    });
})();
