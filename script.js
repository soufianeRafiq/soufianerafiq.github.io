/* =====================================================================
   script.js — interactions (bonus du sujet)
   1) Menu burger (mobile)
   2) Thème clair / sombre
   3) Lien de nav actif selon la section visible
   4) Barre de progression de lecture
   5) Révélation des sections au défilement
   ===================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* ---------- 1) MENU BURGER ---------- */
    const burger = document.getElementById('burger');
    const menu = document.getElementById('menu');

    burger.addEventListener('click', () => {
        const open = menu.classList.toggle('is-open');
        burger.classList.toggle('is-open', open);
        burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    // refermer le menu après un clic sur un lien (confort mobile)
    menu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.remove('is-open');
            burger.classList.remove('is-open');
            burger.setAttribute('aria-expanded', 'false');
        });
    });

    /* ---------- 2) THÈME CLAIR / SOMBRE ---------- */
    const root = document.documentElement;          // <html>
    const themeBtn = document.getElementById('themeToggle');

    themeBtn.addEventListener('click', () => {
        const isLight = root.getAttribute('data-theme') === 'light';
        root.setAttribute('data-theme', isLight ? 'dark' : 'light');
    });

    /* ---------- 3) LIEN ACTIF AU DÉFILEMENT ---------- */
    const sections = document.querySelectorAll('main section[id], aside[id]');
    const navLinks = document.querySelectorAll('.nav__menu a');

    if ('IntersectionObserver' in window) {
        const spy = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    navLinks.forEach(link =>
                        link.classList.toggle('is-active', link.getAttribute('href') === '#' + id)
                    );
                }
            });
        }, { rootMargin: '-45% 0px -45% 0px' });

        sections.forEach(s => spy.observe(s));
    }

    /* ---------- 4) BARRE DE PROGRESSION ---------- */
    const progress = document.getElementById('progress');

    const updateProgress = () => {
        const h = document.documentElement;
        const max = h.scrollHeight - h.clientHeight;
        const pct = max > 0 ? (h.scrollTop / max) * 100 : 0;
        progress.style.width = pct + '%';
    };
    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();

    /* ---------- 5) RÉVÉLATION AU DÉFILEMENT ---------- */
    const revealEls = document.querySelectorAll('.reveal');

    if ('IntersectionObserver' in window) {
        const revealObs = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    obs.unobserve(entry.target);   // une seule fois
                }
            });
        }, { threshold: 0.12 });

        revealEls.forEach(el => revealObs.observe(el));

        // filet de sécurité : tout révéler après 2 s quoi qu'il arrive
        setTimeout(() => revealEls.forEach(el => el.classList.add('in-view')), 2000);
    } else {
        // pas d'IntersectionObserver : on affiche tout immédiatement
        revealEls.forEach(el => el.classList.add('in-view'));
    }
});
