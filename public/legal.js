(() => {
  const isSpanish = document.documentElement.lang === 'es';
  const copy = isSpanish ? { toc: 'EN ESTA PÁGINA', top: 'Volver arriba', anchor: 'Enlace a esta sección' } : { toc: 'ON THIS PAGE', top: 'Back to top', anchor: 'Link to this section' };
  const directParagraphs = [...document.body.children].filter((element) => element.tagName === 'P');
  const languageLinks = directParagraphs.find((paragraph) => paragraph.querySelector('a[href^="privacy"]'));
  languageLinks?.classList.add('policy-links');
  const updated = directParagraphs.find((paragraph) => /^(Última actualización|Last updated)/.test(paragraph.textContent.trim()));
  updated?.classList.add('policy-updated');
  const intro = updated?.nextElementSibling;
  if (intro?.tagName === 'P') intro.classList.add('policy-intro');
  const headings = [...document.querySelectorAll('h2')];
  if (headings.length) {
    const usedIds = new Set();
    headings.forEach((heading, index) => {
      const base = heading.textContent.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || `section-${index + 1}`;
      let id = base; let suffix = 2;
      while (usedIds.has(id) || document.getElementById(id)) id = `${base}-${suffix++}`;
      usedIds.add(id); heading.id = id;
      const anchor = document.createElement('a'); anchor.className = 'section-anchor'; anchor.href = `#${id}`; anchor.setAttribute('aria-label', copy.anchor); anchor.textContent = '#'; heading.append(anchor);
    });
    const toc = document.createElement('details'); toc.className = 'policy-toc';
    toc.innerHTML = `<summary>${copy.toc}</summary><ol>${headings.map((heading) => `<li><a href="#${heading.id}">${heading.childNodes[0].textContent.trim()}</a></li>`).join('')}</ol>`;
    const insertionPoint = headings[0]; insertionPoint.parentNode?.insertBefore(toc, insertionPoint);
  }
  const topButton = document.createElement('button'); topButton.className = 'policy-back-top'; topButton.type = 'button'; topButton.setAttribute('aria-label', copy.top); topButton.title = copy.top; topButton.textContent = '↑'; document.body.append(topButton);
  const updateTopButton = () => topButton.classList.toggle('is-visible', window.scrollY > 540);
  window.addEventListener('scroll', updateTopButton, { passive: true }); updateTopButton();
  topButton.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
})();
