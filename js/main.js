(function () {
  "use strict";

  function renderCreatorsCarousel() {
    const track = document.querySelector(".creators-carousel-track");
    if (!track || typeof CREATORS === "undefined") return;

    const card = (c) => `
      <article class="creators-card">
        <img class="creators-card__photo" src="${escapeAttr(c.image)}" alt="${escapeAttr(c.name)}" loading="eager" width="320" height="320">
        <div class="creators-card__body">
          <span class="creators-card__name">${escapeHtml(c.name)}</span>
          <span class="creators-card__subs">${escapeHtml(c.subs)}</span>
        </div>
      </article>`;

    track.innerHTML = CREATORS.map(card).join("");
  }

  function initCreatorsCarousel() {
    const viewport = document.querySelector(".creators-carousel-viewport");
    const track = document.querySelector(".creators-carousel-track");
    if (!viewport || !track) return;

    if (!track.innerHTML.trim()) {
      renderCreatorsCarousel();
    }

    if (viewport.dataset.marqueeReady === "true") return;
    viewport.dataset.marqueeReady = "true";

    initSeamlessMarquee(
      null,
      viewport,
      track,
      "creators-carousel-track creators-carousel-track--measure"
    );
  }

  function initSeamlessMarquee(section, viewport, track, measureClass) {
    const cardsHTML = track.innerHTML.trim();
    if (!cardsHTML) return;

    const buildHalves = () => {
      let half = cardsHTML;
      const measure = document.createElement("div");
      measure.className = measureClass;
      measure.style.cssText = "position:absolute;visibility:hidden;pointer-events:none;";
      measure.innerHTML = half;
      track.parentElement?.appendChild(measure);

      while (measure.scrollWidth < window.innerWidth * 1.05 && half.length < cardsHTML.length * 8) {
        half += cardsHTML;
      }

      measure.remove();
      track.innerHTML = half + half;
    };

    buildHalves();

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let direction = 1;

    const play = () => {
      track.style.animationDirection = direction === 1 ? "normal" : "reverse";
      track.classList.add("is-animating");
    };

    const pause = () => {
      track.classList.remove("is-animating");
    };

    play();

    if (section) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) play();
            else pause();
          });
        },
        { threshold: 0.15, rootMargin: "0px 0px -5% 0px" }
      );
      observer.observe(section);
    }

    let lastY = window.scrollY;
    window.addEventListener(
      "scroll",
      () => {
        const y = window.scrollY;
        if (Math.abs(y - lastY) < 2) return;
        direction = y < lastY ? -1 : 1;
        if (track.classList.contains("is-animating")) {
          track.style.animationDirection = direction === 1 ? "normal" : "reverse";
        }
        lastY = y;
      },
      { passive: true }
    );

    viewport.addEventListener("mouseenter", () => track.classList.add("is-paused"));
    viewport.addEventListener("mouseleave", () => track.classList.remove("is-paused"));
    viewport.addEventListener("focusin", () => track.classList.add("is-paused"));
    viewport.addEventListener("focusout", () => track.classList.remove("is-paused"));

    let resizeTimer;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        track.classList.remove("is-animating", "is-paused");
        buildHalves();
        play();
      }, 150);
    });
  }

  function renderStats() {
    const row = document.querySelector(".stats-row");
    if (!row || typeof STATS === "undefined") return;

    const orbLayout = [
      { top: "10%", left: "4%", delay: "0s", color: "#7C3AED" },
      { top: "55%", left: "18%", delay: "-3s", color: "#952bff" },
      { top: "20%", left: "42%", delay: "-6s", color: "#70b5ff" },
      { top: "62%", left: "58%", delay: "-9s", color: "#79d45e" },
      { top: "8%", left: "72%", delay: "-2s", color: "#ba81ee" },
      { top: "48%", left: "86%", delay: "-5s", color: "#f4889a" },
    ];

    const statParts = STATS.map(
      (s, i) => `
      ${i > 0 ? '<span class="stats-dot" aria-hidden="true">·</span>' : ""}
      <span class="stat-number" data-count="${escapeAttr(s.value)}" data-suffix="${escapeAttr(s.suffix)}">0</span>
      <span class="stat-bento-label">${escapeHtml(s.label)}</span>`
    ).join("");

    row.innerHTML = `
      <div class="stats-strip">
        <div class="stat-bento-bg" aria-hidden="true">
          ${orbLayout
            .map(
              (orb) => `
            <svg
              class="stat-bento-orb"
              style="top:${orb.top};left:${orb.left};--orb-delay:${orb.delay};--orb-color:${orb.color};"
              viewBox="0 0 100 100"
              aria-hidden="true"
            >
              <circle cx="50" cy="50" r="50" fill="currentColor" />
            </svg>`
            )
            .join("")}
        </div>
        <p class="stats-inline">${statParts}</p>
      </div>`;
  }

  function getInitials(name) {
    return name
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part[0] || "")
      .join("")
      .toUpperCase();
  }

  function renderInfluencerMarketing() {
    const cardsWrap = document.querySelector(".im-pitch-cards");
    const processList = document.querySelector("#im-process .pipeline-list");
    const statsSplit = document.querySelector(".im-stats-split");

    if (cardsWrap && typeof INFLUENCER_PITCH_CARDS !== "undefined") {
      cardsWrap.innerHTML = INFLUENCER_PITCH_CARDS.map(
        (card) => `
        <article class="im-pitch-card" tabindex="0">
          <span class="im-pitch-card__label">${escapeHtml(card.label)}</span>
          <p class="im-pitch-card__desc">${escapeHtml(card.desc)}</p>
        </article>`
      ).join("");
    }

    if (processList && typeof INFLUENCER_STEPS !== "undefined") {
      processList.innerHTML = INFLUENCER_STEPS.map(
        (step, i) => `
        <li class="pipeline-node" data-index="${i}">
          <div class="pipeline-node__marker" aria-hidden="true">
            <span class="pipeline-node__dot"></span>
          </div>
          <div class="pipeline-node__body">
            <h3 class="pipeline-node__title">${escapeHtml(step.title)}</h3>
            <p class="pipeline-node__desc">${escapeHtml(step.desc)}</p>
          </div>
        </li>`
      ).join("");
    }

    if (statsSplit && typeof INFLUENCER_CAMPAIGN_STATS !== "undefined") {
      const stats = INFLUENCER_CAMPAIGN_STATS.map(
        (stat) => `
        <div class="im-stats-split__stat">
          <div class="im-stats-split__value">${escapeHtml(stat.value)}</div>
          <p class="im-stats-split__label">${escapeHtml(stat.label)}</p>
        </div>`
      ).join("");

      const copy =
        typeof INFLUENCER_CAMPAIGN_COPY !== "undefined"
          ? `<div class="im-stats-split__copy"><p>${escapeHtml(INFLUENCER_CAMPAIGN_COPY)}</p></div>`
          : "";

      statsSplit.innerHTML = `<div class="im-stats-split__grid">${stats}${copy}</div>`;
    }
  }

  function initScrollReveal() {
    const items = [...document.querySelectorAll(".reveal")];
    if (!items.length) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      items.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    items.forEach((el) => observer.observe(el));
  }

  function initImNetworkGallery() {
    if (typeof initNetworkGallery === "function") {
      initNetworkGallery();
    }
  }

  function initBrandsMarquee() {
    const brands = typeof INFLUENCER_BRANDS !== "undefined" ? INFLUENCER_BRANDS : [];
    const viewport = document.querySelector(".im-brands-marquee__viewport");
    const track = document.querySelector(".im-brands-track");
    const section = document.querySelector(".im-brands");

    if (!viewport || !track || !brands.length) return;
    if (track.dataset.marqueeReady === "true") return;

    track.dataset.marqueeReady = "true";

    const onLogoError = (event) => {
      const img = event.currentTarget;
      if (img.dataset.fallbackApplied === "true") return;
      img.dataset.fallbackApplied = "true";
      img.remove();
    };

    const logo = (brand) => `
      <figure class="im-brands-item">
        <div class="im-brands-logo-wrap">
          <img
            class="im-brands-logo"
            src="${escapeAttr(brand.src)}"
            alt=""
            loading="lazy"
            decoding="async"
          >
        </div>
        <figcaption class="im-brands-name">${escapeHtml(brand.name)}</figcaption>
      </figure>`;

    const oneSet = brands.map(logo).join("");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    track.innerHTML = reduced ? oneSet : oneSet + oneSet + oneSet;
    track.querySelectorAll(".im-brands-logo").forEach((img) => {
      img.addEventListener("error", onLogoError);
    });

    if (reduced) {
      section?.classList.add("im-brands--static");
      return;
    }

    track.classList.add("is-animating");

    viewport.addEventListener("mouseenter", () => track.classList.add("is-paused"));
    viewport.addEventListener("mouseleave", () => track.classList.remove("is-paused"));
    viewport.addEventListener("focusin", () => track.classList.add("is-paused"));
    viewport.addEventListener("focusout", () => track.classList.remove("is-paused"));
  }

  function renderTeam() {
    const grid = document.querySelector(".team-grid");
    const heading = document.querySelector("#team-title");

    if (heading && typeof TEAM_SECTION !== "undefined" && TEAM_SECTION.title) {
      heading.textContent = TEAM_SECTION.title;
    }

    if (!grid || typeof TEAM === "undefined") return;

    grid.innerHTML = TEAM.map(
      (member, index) => `
      <article class="team-card" data-tone="${index % 3}" style="--team-delay: ${index * 50}ms">
        <div class="team-card__wave" aria-hidden="true"></div>
        <div class="team-card__avatar">
          <img src="${escapeAttr(member.image)}" alt="${escapeAttr(member.name)}" loading="lazy" decoding="async">
        </div>
        <h3 class="team-card__name">${escapeHtml(member.name)}</h3>
        <p class="team-card__role">${escapeHtml(member.role)}</p>
        <div class="team-card__social${member.linkedin ? "" : " team-card__social--pending"}">
          ${
            member.linkedin
              ? `<a href="${escapeAttr(member.linkedin)}" target="_blank" rel="noopener noreferrer" aria-label="${escapeAttr(member.name)} on LinkedIn">
                  <svg class="team-card__linkedin-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                    <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A2.12 2.12 0 0013 14.19a1.7 1.7 0 00-.06.6V19h-3v-9h3v1.76h.04a3.31 3.31 0 012.93-1.61c2.23 0 3.57 1.36 3.57 3.88z"/>
                  </svg>
                  LinkedIn
                </a>`
              : `<span class="team-card__social-placeholder" aria-hidden="true">LinkedIn</span>`
          }
        </div>
      </article>`
    ).join("");
  }

  const FOOTER_ICONS = {
    share2:
      '<path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" x2="12" y1="2" y2="15"/>',
    "message-circle": '<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>',
    link: '<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>',
    globe: '<circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>',
    send: '<path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"/><path d="m21.854 2.147-10.94 10.939"/>',
    feather:
      '<path d="M12.67 19a2 2 0 0 0 1.416-.588l6.154-6.172a1 1 0 0 0 0-1.414l-7.007-7.007A1 1 0 0 0 11.586 4H4a2 2 0 0 0-2 2v7.586a2 2 0 0 0 .586 1.414l6.172 6.154A2 2 0 0 0 12.67 19z"/><path d="m15 5 6 6"/>',
  };

  function footerIconSVG(name) {
    const paths = FOOTER_ICONS[name] || FOOTER_ICONS.link;
    return `<svg class="site-footer__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths}</svg>`;
  }

  function renderContact() {
    const root = document.querySelector(".contact-section__container");
    if (!root || typeof CONTACT_SECTION === "undefined") return;

    const servicesHTML = (CONTACT_SECTION.services || [])
      .map(
        (service) => `
          <button type="button" class="contact-select__option" role="option" data-value="${escapeAttr(service)}" aria-selected="false">
            ${escapeHtml(service)}
          </button>`
      )
      .join("");

    root.innerHTML = `
      <div class="contact2">
        <div class="contact2__aside">
          <div class="contact2__intro">
            <h2 class="contact2__title">${escapeHtml(CONTACT_SECTION.title)}</h2>
            <p class="contact2__description">${escapeHtml(CONTACT_SECTION.description)}</p>
          </div>
        </div>
        <div class="contact2__form-box">
          <form class="contact-form" action="#" method="post" novalidate>
            <input type="text" name="_honey" class="contact-form__honeypot" tabindex="-1" autocomplete="off" aria-hidden="true">
            <div class="form-group">
              <label for="contact-name">Your name</label>
              <input type="text" id="contact-name" name="name" placeholder="Enter your name" required>
            </div>
            <div class="form-group">
              <label for="contact-email">Your email</label>
              <input type="email" id="contact-email" name="email" placeholder="Enter your email" required>
            </div>
            <div class="form-group">
              <label id="contact-services-label">What services you want</label>
              <div class="contact-select" data-contact-select>
                <button
                  type="button"
                  class="contact-select__trigger"
                  aria-haspopup="listbox"
                  aria-expanded="false"
                  aria-labelledby="contact-services-label"
                >
                  <span class="contact-select__value is-placeholder">Select services</span>
                  <svg class="contact-select__chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                    <path d="m6 9 6 6 6-6"/>
                  </svg>
                </button>
                <div class="contact-select__menu" role="listbox" aria-multiselectable="true" hidden>
                  ${servicesHTML}
                </div>
                <div class="contact-select__hidden"></div>
              </div>
            </div>
            <div class="form-group">
              <label for="contact-channel">Channel link</label>
              <input type="url" id="contact-channel" name="channel" placeholder="Enter your channel link">
            </div>
            <div class="form-group">
              <label for="contact-message">Message</label>
              <textarea id="contact-message" name="message" placeholder="Tell us about your project"></textarea>
            </div>
            <p class="contact-form__status" role="status" hidden></p>
            <button type="submit" class="btn btn-primary contact-form__submit">${escapeHtml(CONTACT_SECTION.submitLabel)}</button>
          </form>
        </div>
      </div>`;
  }

  function renderFooter() {
    const root = document.querySelector(".site-footer__inner");
    if (!root || typeof FOOTER === "undefined") return;

    const logo = typeof SITE !== "undefined" && SITE.logo ? SITE.logo : "assets/logo.png";
    const year = new Date().getFullYear();
    const external = (href) => href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:");

    const linksHTML = FOOTER.links
      .map(
        (link) =>
          `<a href="${escapeAttr(link.href)}" class="site-footer__link">${escapeHtml(link.title)}</a>`
      )
      .join("");

    const socialHTML = FOOTER.social
      .map((item) => {
        const attrs = external(item.href)
          ? ` href="${escapeAttr(item.href)}" target="_blank" rel="noopener noreferrer"`
          : ` href="${escapeAttr(item.href)}"`;
        return `<a${attrs} class="site-footer__social-link" aria-label="${escapeAttr(item.label)}">${footerIconSVG(item.icon)}</a>`;
      })
      .join("");

    root.innerHTML = `
      <div class="site-footer__left">
        <a href="#home" class="site-footer__logo" aria-label="go home">
          <img src="${escapeAttr(logo)}" alt="CreatorTube" width="140" height="32" loading="lazy" decoding="async">
        </a>
      </div>
      <div class="site-footer__center">
        <div class="site-footer__social">${socialHTML}</div>
      </div>
      <div class="site-footer__right">
        <nav class="site-footer__nav" aria-label="Footer navigation">${linksHTML}</nav>
        <span class="site-footer__copy">&copy; ${year} ${escapeHtml(FOOTER.copyright)}</span>
      </div>`;
  }

  function faqCardHTML(item) {
    return `
      <article class="faq-card">
        <h3 class="faq-card__question">${escapeHtml(item.question)}</h3>
        <p class="faq-card__answer">${escapeHtml(item.answer)}</p>
      </article>`;
  }

  function renderFaq() {
    const rowsRoot = document.querySelector(".faq-scroller-rows");
    const title = document.querySelector("#faq-title");

    if (typeof FAQ_SECTION !== "undefined") {
      if (title && FAQ_SECTION.mainTitle) title.textContent = FAQ_SECTION.mainTitle;
    }

    if (!rowsRoot || typeof FAQ_ITEMS === "undefined" || typeof FAQ_SECTION === "undefined") return;

    rowsRoot.innerHTML = FAQ_SECTION.rows
      .map((row) => {
        const items = FAQ_ITEMS.slice(row.startIndex, row.startIndex + row.count);
        const cards = items.map((item) => faqCardHTML(item)).join("");

        return `
          <div class="faq-scroller" data-direction="${row.direction}" data-speed="${row.speed}">
            <div class="faq-scroller__viewport">
              <div class="faq-scroller__track">${cards}</div>
            </div>
          </div>`;
      })
      .join("");
  }

  function initFaqScrollers() {
    document.querySelectorAll(".faq-scroller").forEach((scroller) => {
      const viewport = scroller.querySelector(".faq-scroller__viewport");
      const track = scroller.querySelector(".faq-scroller__track");
      if (!viewport || !track || viewport.dataset.marqueeReady === "true") return;

      viewport.dataset.marqueeReady = "true";

      const speed = scroller.dataset.speed || "60";
      track.style.setProperty("--scroll-duration", `${speed}s`);

      const cardsHTML = track.innerHTML.trim();
      if (!cardsHTML) return;

      const buildHalves = () => {
        let half = cardsHTML;
        const measure = document.createElement("div");
        measure.className = "faq-scroller__track faq-scroller__track--measure";
        measure.style.cssText = "position:absolute;visibility:hidden;pointer-events:none;";
        measure.innerHTML = half;
        track.parentElement?.appendChild(measure);

        while (measure.scrollWidth < window.innerWidth * 1.05 && half.length < cardsHTML.length * 8) {
          half += cardsHTML;
        }

        measure.remove();
        track.innerHTML = half + half;
      };

      buildHalves();

      if (scroller.dataset.direction === "right") {
        track.style.animationDirection = "reverse";
      }

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      track.classList.add("is-animating");
    });
  }

  // Header: subtle bar fill on scroll (full-bleed, non-floating)
  function initHeaderScroll() {
    const header = document.querySelector(".site-header");
    if (!header) return;

    const onScroll = () => {
      header.classList.toggle("scrolled", window.scrollY > 10);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  // FOLLOW.ART-style hero entrance hook (corners/text already placed)
  function revealHeroEntrance() {
    const hero = document.querySelector(".hero");
    if (hero) hero.classList.add("hero--show");
  }

  // Landing intro: full purple screen that auto-plays a two-stage reveal on load
  function initIntroReveal(onDone) {
    const cover = document.getElementById("intro-cover");
    const header = document.querySelector(".site-header");
    if (!cover) {
      revealHeroEntrance();
      if (onDone) onDone();
      return;
    }

    const HOLD = 600;
    const RISE_MS = 900;
    const PAUSE_MS = 650;
    let finished = false;

    document.body.style.overflow = "hidden";
    if (header) header.classList.add("intro-hidden");

    const finish = () => {
      if (finished) return;
      finished = true;
      cover.classList.add("done");
      document.body.style.overflow = "";
      if (header) header.classList.remove("intro-hidden");
      if (onDone) onDone();
    };

    window.setTimeout(() => {
      cover.classList.add("rise");

      window.setTimeout(() => {
        cover.classList.add("open");
        revealHeroEntrance();
        if (header) header.classList.remove("intro-hidden");
        cover.addEventListener("transitionend", finish, { once: true });
        window.setTimeout(finish, 1600);
      }, RISE_MS + PAUSE_MS);
    }, HOLD);
  }

  // Mobile menu toggle
  function initNav() {
    const header = document.querySelector(".site-header");
  const navToggle = document.querySelector(".nav-toggle");
    if (!header || !navToggle) return;

    function setOpen(open) {
      header.classList.toggle("menu-open", open);
      navToggle.classList.toggle("open", open);
      navToggle.setAttribute("aria-expanded", String(open));
      document.body.style.overflow = open ? "hidden" : "";
    }

    navToggle.addEventListener("click", () => {
      setOpen(!header.classList.contains("menu-open"));
    });

    header.querySelectorAll(".mobile-menu a, .header-nav-link").forEach((link) => {
      link.addEventListener("click", () => {
        setOpen(false);
        header.querySelectorAll(".header-nav-link").forEach((l) => l.classList.remove("is-active"));
        if (link.classList.contains("header-nav-link")) link.classList.add("is-active");
      });
    });
  }

  // Animated stat counters
  function initCounters() {
    const statsSection = document.querySelector(".stats-section");
    if (!statsSection) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          document.querySelectorAll("[data-count]").forEach((el) => {
            const target = parseFloat(el.dataset.count);
            const suffix = el.dataset.suffix || "";
    const duration = 2000;
    const start = performance.now();

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
              el.textContent = Math.round(target * eased) + suffix;
              if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
          });

            observer.disconnect();
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(statsSection);
  }

  // Monk-e style: bottom-right corner stays fixed; width grows left + up
  function initHeroVideoScroll() {
    const track = document.querySelector(".hero-track");
    const pin = document.querySelector(".hero-pin");
    const frame = document.querySelector(".hero-video-frame");
    const content = document.querySelector(".hero-content");
    if (!track || !pin || !frame) return;
    if (!window.gsap || !window.ScrollTrigger) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);

    // Start bottom-right; end centered in the band below the header
    const metrics = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const header = document.querySelector(".site-header");
      const headerH = header
        ? Math.ceil(header.getBoundingClientRect().height)
        : 72;
      const padX = Math.max(20, Math.min(96, vw * 0.065));
      const vertPad = Math.max(28, Math.min(72, vh * 0.06));
      const bandTop = headerH + vertPad;
      const bandBottom = vh - vertPad;
      const availW = vw - padX * 2;
      const availH = bandBottom - bandTop;
      const startW = availW * (vw < 768 ? 0.42 : 0.25);
      let endW = availW;
      if (endW * (9 / 16) > availH) {
        endW = availH * (16 / 9);
      }
      const startH = startW * (9 / 16);
      const endH = endW * (9 / 16);
      return {
        startLeft: vw - padX - startW,
        startTop: vh - vertPad - startH,
        startW,
        endLeft: (vw - endW) / 2,
        endTop: bandTop + (availH - endH) / 2,
        endW,
      };
    };

    const applyStart = () => {
      const m = metrics();
      gsap.set(frame, {
        right: "auto",
        bottom: "auto",
        left: m.startLeft,
        top: m.startTop,
        width: m.startW,
        height: "auto",
        borderRadius: 6,
      });
    };

    applyStart();

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: pin,
        start: "top top",
        // Shorter pin — video opens quickly, next sections arrive sooner
        end: "+=110%",
        scrub: 0.55,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onRefreshInit: applyStart,
      },
    });

    if (content) {
      tl.to(
        content,
        { opacity: 0, ease: "none", duration: 0.28 },
        0
      );
    }

    tl.fromTo(
      frame,
      {
        left: () => metrics().startLeft,
        top: () => metrics().startTop,
        width: () => metrics().startW,
        borderRadius: 6,
      },
      {
        left: () => metrics().endLeft,
        top: () => metrics().endTop,
        width: () => metrics().endW,
        borderRadius: 12,
        ease: "none",
        duration: 0.78,
      },
      0
    );

    // Keep fullscreen parked briefly before unpin (monk-e hold)
    tl.to({}, { duration: 0.18 }, 0.82);
  }
  // Letter hover: even resting type; proximity scaleY stretch on hover only
  function initHeroLetterHover() {
    const mega = document.querySelector(".hero-mega");
    if (!mega) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lines = mega.querySelectorAll(".hero-mega-line");

    lines.forEach((line) => {
      const text = line.getAttribute("data-text") || "";
      line.textContent = "";
      [...text].forEach((ch) => {
        if (/[.,!?;:]/.test(ch)) {
          const last = line.lastElementChild;
          if (last?.classList.contains("hero-mega-char") && !last.classList.contains("is-space")) {
            last.textContent += ch;
          }
          return;
        }
        const span = document.createElement("span");
        const isSpace = ch === " ";
        span.className = "hero-mega-char" + (isSpace ? " is-space" : "");
        span.textContent = isSpace ? "\u00A0" : ch;
        line.appendChild(span);
      });
    });

    if (reduceMotion) return;

    const chars = [...mega.querySelectorAll(".hero-mega-char:not(.is-space)")];
    if (!chars.length) return;

    const RADIUS = 220;
    const MAX_STRETCH = 1.28;
    let mouseX = null;
    let raf = 0;
    let active = false;

    const tick = () => {
      raf = 0;
      chars.forEach((char) => {
        if (mouseX == null) {
          char.style.transform = "scaleY(1)";
          return;
        }
        const r = char.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const dist = Math.abs(mouseX - cx);
        const t = Math.max(0, 1 - dist / RADIUS);
        const sy = 1 + (MAX_STRETCH - 1) * (t * t);
        char.style.transform = `scaleY(${sy.toFixed(3)})`;
      });
    };

    const requestTick = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };

    mega.addEventListener("pointerenter", () => {
      active = true;
    });

    mega.addEventListener("pointermove", (e) => {
      if (!active) return;
      mouseX = e.clientX;
      requestTick();
    });

    mega.addEventListener("pointerleave", () => {
      active = false;
      mouseX = null;
      requestTick();
    });
  }

  // Hover brand logos — vanilla port of hover-brand-logo.tsx
  function initHoverBrandLogo() {
    const grid = document.querySelector(".brand-logo-grid");
    const slot = document.querySelector(".brand-logo-title-slot");
    if (!grid || !slot || typeof BRANDS === "undefined") return;

    const defaultLabel = "leading companies";
    let hoveredId = null;
    let labelTimer = 0;
    let currentLabel = defaultLabel;

    slot.innerHTML = `<p class="brand-logo-title">${defaultLabel}</p>`;
    const titleEl = slot.querySelector(".brand-logo-title");

    grid.innerHTML = BRANDS.map(
      (brand) => `
      <button
        type="button"
        class="brand-logo-btn"
        data-brand-id="${escapeAttr(brand.id)}"
        aria-label="${escapeAttr(brand.name)}"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">${brand.icon}</svg>
      </button>`
    ).join("");

    const buttons = [...grid.querySelectorAll(".brand-logo-btn")];

    const updateButtons = () => {
      buttons.forEach((btn) => {
        const isActive = btn.dataset.brandId === hoveredId;
        const isDimmed = hoveredId !== null && !isActive;
        btn.classList.toggle("is-active", isActive);
        btn.classList.toggle("is-dimmed", isDimmed);
      });
    };

    const setLabel = (name) => {
      if (!titleEl || name === currentLabel) return;

      clearTimeout(labelTimer);
      currentLabel = name;

      titleEl.classList.remove("is-entering");
      titleEl.classList.add("is-exiting");

      labelTimer = window.setTimeout(() => {
        titleEl.textContent = name;
        titleEl.classList.remove("is-exiting");
        titleEl.classList.add("is-entering");
        requestAnimationFrame(() => {
          titleEl.classList.remove("is-entering");
        });
      }, 160);
    };

    const setHovered = (id) => {
      if (hoveredId === id) return;
      hoveredId = id;
      updateButtons();
      const brand = BRANDS.find((b) => b.id === id);
      setLabel(brand ? brand.name : defaultLabel);
    };

    grid.addEventListener("mouseover", (e) => {
      const btn = e.target.closest(".brand-logo-btn");
      if (btn) setHovered(btn.dataset.brandId);
    });

    grid.addEventListener("mouseleave", () => {
      setHovered(null);
    });

    grid.addEventListener("focusin", (e) => {
      const btn = e.target.closest(".brand-logo-btn");
      if (btn) setHovered(btn.dataset.brandId);
    });

    grid.addEventListener("focusout", (e) => {
      if (!grid.contains(e.relatedTarget)) setHovered(null);
    });
  }

  // Production pipeline timeline — scroll line-draw + node reveal
  function renderPipeline() {
    const list = document.querySelector("#how-we-work .pipeline-list");
    if (!list || typeof PIPELINE_STAGES === "undefined") return;

    list.innerHTML = PIPELINE_STAGES.map(
      (stage, i) => `
      <li class="pipeline-node${stage.isResult ? " pipeline-node--result" : ""}" data-index="${i}">
        <div class="pipeline-node__marker" aria-hidden="true">
          <span class="pipeline-node__dot"></span>
        </div>
        <div class="pipeline-node__body">
          <h3 class="pipeline-node__title">${escapeHtml(stage.title)}</h3>
          <p class="pipeline-node__desc">${escapeHtml(stage.desc)}</p>
        </div>
      </li>`
    ).join("");
  }

  function initTimelineSection(section) {
    const fill = section.querySelector(".pipeline-line-fill");
    const nodes = [...section.querySelectorAll(".pipeline-node")];
    if (!fill || !nodes.length) return;
    if (!window.gsap || !window.ScrollTrigger) return;

    gsap.registerPlugin(ScrollTrigger);

    let playTl = null;
    let pinSt = null;
    let isPlaying = false;
    let hasFinished = false;

    const headerOffset =
      parseInt(
        getComputedStyle(document.documentElement).getPropertyValue("--header-height"),
        10
      ) || 72;

    const triggerEl =
      section.querySelector(".pipeline-intro") ||
      section.querySelector(".im-process-eyebrow") ||
      section;

    const setActive = (index) => {
      nodes.forEach((node, i) => {
        node.classList.toggle("is-active", i === index);
        node.classList.toggle("is-revealed", i <= index);
      });
    };

    const applyStatic = () => {
      section.classList.add("pipeline-section--static");
      fill.style.width = "100%";
      fill.style.height = "100%";
      nodes.forEach((node) => node.classList.add("is-revealed"));
      setActive(nodes.length - 1);
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      applyStatic();
      return;
    }

    const clearAnimation = (resetVisual = false) => {
      playTl?.kill();
      playTl = null;

      if (pinSt) {
        pinSt.kill(false, true);
        pinSt = null;
      }

      isPlaying = false;
      section.classList.remove("is-playing");

      if (resetVisual) {
        hasFinished = false;
      }
    };

    const resetVisual = (horizontal) => {
      gsap.set(fill, horizontal ? { width: "0%", height: "100%" } : { width: "100%", height: "0%" });
      gsap.set(nodes, { opacity: 0, y: horizontal ? 24 : 28 });
      nodes.forEach((node) => node.classList.remove("is-active", "is-revealed"));
    };

    const runAutoplay = (horizontal) => {
      if (isPlaying || hasFinished) return;

      isPlaying = true;
      section.classList.add("is-playing");
      resetVisual(horizontal);

      pinSt = ScrollTrigger.create({
        trigger: section,
        start: `top top+=${headerOffset}`,
        pin: section,
        pinSpacing: true,
        end: "+=1",
        invalidateOnRefresh: true,
      });

      const lineDuration = 3.4;
      const stepGap = 0.52;

      playTl = gsap.timeline({
        onComplete: () => {
          hasFinished = true;
          isPlaying = false;
          setActive(nodes.length - 1);
          nodes.forEach((node) => node.classList.add("is-revealed"));
          section.classList.remove("is-playing");

          gsap.delayedCall(0.45, () => {
            if (pinSt) {
              pinSt.kill(false, true);
              pinSt = null;
            }
            ScrollTrigger.refresh();
          });
        },
      });

      if (horizontal) {
        playTl.to(fill, { width: "100%", duration: lineDuration, ease: "power2.inOut" }, 0);
      } else {
        playTl.to(fill, { height: "100%", duration: lineDuration, ease: "power2.inOut" }, 0);
      }

      nodes.forEach((node, i) => {
        const at = 0.12 + i * stepGap;
        playTl.to(node, { opacity: 1, y: 0, duration: 0.52, ease: "power2.out" }, at);
        playTl.call(() => setActive(i), null, at + 0.06);
      });
    };

    const initHorizontal = () => {
      clearAnimation(true);
      resetVisual(true);

      ScrollTrigger.create({
        trigger: triggerEl,
        start: "top 82%",
        onEnter: () => runAutoplay(true),
        onEnterBack: () => {
          clearAnimation(true);
          resetVisual(true);
          runAutoplay(true);
        },
        onLeaveBack: () => {
          clearAnimation(true);
          resetVisual(true);
        },
      });
    };

    const initVertical = () => {
      clearAnimation(true);
      resetVisual(false);

      ScrollTrigger.create({
        trigger: triggerEl,
        start: "top 85%",
        onEnter: () => runAutoplay(false),
        onEnterBack: () => {
          clearAnimation(true);
          resetVisual(false);
          runAutoplay(false);
        },
        onLeaveBack: () => {
          clearAnimation(true);
          resetVisual(false);
        },
      });
    };

    ScrollTrigger.matchMedia({
      "(min-width: 768px)": initHorizontal,
      "(max-width: 767px)": initVertical,
    });
  }

  function initPipelineTimeline() {
    document.querySelectorAll(".pipeline-section").forEach(initTimelineSection);
  }

  function initContactServiceSelect() {
    const select = document.querySelector("[data-contact-select]");
    if (!select) return;

    const trigger = select.querySelector(".contact-select__trigger");
    const menu = select.querySelector(".contact-select__menu");
    const valueEl = select.querySelector(".contact-select__value");
    const hiddenContainer = select.querySelector(".contact-select__hidden");
    const options = select.querySelectorAll(".contact-select__option");
    const selected = new Set();

    const closeMenu = () => {
      select.classList.remove("is-open");
      trigger.setAttribute("aria-expanded", "false");
      menu.hidden = true;
    };

    const openMenu = () => {
      select.classList.add("is-open");
      trigger.setAttribute("aria-expanded", "true");
      menu.hidden = false;
    };

    const updateDisplay = () => {
      if (selected.size === 0) {
        valueEl.textContent = "Select services";
        valueEl.classList.add("is-placeholder");
      } else {
        valueEl.textContent = [...selected].join(", ");
        valueEl.classList.remove("is-placeholder");
      }

      hiddenContainer.innerHTML = [...selected]
        .map((service) => `<input type="hidden" name="services" value="${escapeAttr(service)}">`)
        .join("");

      options.forEach((option) => {
        const isSelected = selected.has(option.dataset.value);
        option.classList.toggle("is-selected", isSelected);
        option.setAttribute("aria-selected", String(isSelected));
      });
    };

    trigger.addEventListener("click", () => {
      if (select.classList.contains("is-open")) closeMenu();
      else openMenu();
    });

    options.forEach((option) => {
      option.addEventListener("click", (event) => {
        event.stopPropagation();
        const value = option.dataset.value;
        if (!value) return;
        if (selected.has(value)) selected.delete(value);
        else selected.add(value);
        updateDisplay();
      });
    });

    document.addEventListener("click", (event) => {
      if (!select.contains(event.target)) closeMenu();
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMenu();
    });

    select.resetServices = () => {
      selected.clear();
      updateDisplay();
      closeMenu();
    };
  }

  function initForm() {
  const contactForm = document.querySelector(".contact-form");
    if (!contactForm) return;

    const submitBtn = contactForm.querySelector(".contact-form__submit");
    const statusEl = contactForm.querySelector(".contact-form__status");
    const defaultLabel =
      (typeof CONTACT_SECTION !== "undefined" && CONTACT_SECTION.submitLabel) || "Send message";
    const recipient =
      (typeof CONTACT_SECTION !== "undefined" && CONTACT_SECTION.formEmail) ||
      (typeof SITE !== "undefined" && SITE.email) ||
      "sales@creatortube.co";

    contactForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      const honeypot = contactForm.querySelector('[name="_honey"]');
      if (honeypot?.value) return;

      if (!contactForm.reportValidity()) return;

      const formData = new FormData(contactForm);
      const services = formData.getAll("services");
      const name = String(formData.get("name") || "").trim();

      const payload = {
        name,
        email: formData.get("email"),
        channel: formData.get("channel") || "Not provided",
        services: services.length ? services.join(", ") : "Not specified",
        message: formData.get("message") || "",
        _subject: `New CreatorTube inquiry from ${name || "website visitor"}`,
        _template: "table",
        _captcha: "false",
      };

      submitBtn.disabled = true;
      submitBtn.textContent = "Sending...";
      if (statusEl) {
        statusEl.hidden = true;
        statusEl.textContent = "";
        statusEl.className = "contact-form__status";
      }

      try {
        const response = await fetch(
          `https://formsubmit.co/ajax/${encodeURIComponent(recipient)}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify(payload),
          }
        );

        const result = await response.json().catch(() => ({}));
        if (!response.ok || result.success === false) {
          throw new Error(result.message || "Send failed");
        }

        if (statusEl) {
          statusEl.textContent = "Message sent! We'll get back to you soon.";
          statusEl.classList.add("contact-form__status--success");
          statusEl.hidden = false;
        }

      contactForm.reset();
        document.querySelector("[data-contact-select]")?.resetServices?.();
      } catch {
        if (statusEl) {
          statusEl.textContent = `Something went wrong. Please email us directly at ${recipient}.`;
          statusEl.classList.add("contact-form__status--error");
          statusEl.hidden = false;
        }
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = defaultLabel;
      }
    });
  }

  // Render dynamic sections, then bind interactions
  renderCreatorsCarousel();
  initHoverBrandLogo();
  renderPipeline();
  renderStats();
  renderInfluencerMarketing();
  renderTeam();
  renderFaq();
  renderContact();
  renderFooter();

  initHeaderScroll();
  initHeroLetterHover();
  initNav();
  initCounters();
  initForm();
  initContactServiceSelect();
  initScrollReveal();
  initBrandsMarquee();
  initImNetworkGallery();
  initFaqScrollers();
  // Create ScrollTrigger only after intro unlocks scroll (avoids broken pin refresh)
  initIntroReveal(() => {
    initHeroVideoScroll();
    initPipelineTimeline();
    initCreatorsCarousel();
  });
})();
