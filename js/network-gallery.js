/**
 * Creator Network — horizontal sticky scroll gallery (Fiasco-style).
 * CSS sticky pin only — no GSAP ScrollTrigger pin.
 * Fixed centered text; cards scroll over with slight edge overlap.
 */
(function (global) {
  "use strict";

  // ── 14 creators (names from roster) ────────────────────────────────
  const NETWORK_GALLERY_CREATORS = [
    "Prayush Rai",
    "Iitian Guidance",
    "Prashant IITB",
    "Arvind Kalia",
    "Iqlipse Nova",
    "Nishant Chahar",
    "Lucky Jethani",
    "Prem Kr Sharma",
    "Love Babbar",
    "Vikash IITB",
    "The Social Brains",
    "Dhruv thakkar",
    "Kartik",
    "Theory of Physics",
  ];

  // High-res portrait sources (900px YouTube avatars — not 160px Framer thumbs)
  const NETWORK_GALLERY_IMAGES = {
    "Prayush Rai": "assets/creators/prayush-rai.jpg",
    "Iitian Guidance": "assets/creators/iitian-guidance.png",
    "Prashant IITB": "assets/creators/prashant-iitb.png",
    "Arvind Kalia": "assets/creators/arvind-kalia.png",
    "Iqlipse Nova": "https://yt3.googleusercontent.com/JRkVslJWAz4hJ_IjUa5--uaYjFpfEu-N3fSJWHR_siNjpC0TkCt-Sn91DZg9yWUIk8HDLg1P=s900-c-k-c0x00ffffff-no-rj",
    "Nishant Chahar": "https://yt3.googleusercontent.com/ytc/AIdro_k2O-2O1fL6S58poofnawszoBfzsl1YBpciM9BDhupgLToC=s900-c-k-c0x00ffffff-no-rj",
    "Lucky Jethani": "assets/creators/lucky-jethani.jpg",
    "Prem Kr Sharma": "assets/creators/prem-kr-sharma.png",
    "Love Babbar": "assets/creators/love-babbar.png",
    "Vikash IITB": "https://yt3.googleusercontent.com/IVTYHYi_jm4x9g9KAzUvFupmfAegmDKtrff-Tcrm1QXzNroYQ55f4mmvT1asZjzErHU-ywff=s900-c-k-c0x00ffffff-no-rj",
    "The Social Brains": "https://yt3.googleusercontent.com/0n3ep9LvnLzZ1SoeONGXesXpn0GSLGlk-5hPmNlKdrY6EbmOCgYswTJXbawKPxymnSwRym2qIA=s900-c-k-c0x00ffffff-no-rj",
    "Dhruv thakkar": "https://yt3.googleusercontent.com/ytc/AIdro_nLZX3IF-3okn6_2A1ynqhjnLkH7MPwHyushN7huAEXioHd=s900-c-k-c0x00ffffff-no-rj",
    "Kartik": "assets/creators/kartik.png",
    "Theory of Physics": "https://yt3.googleusercontent.com/ytc/AIdro_nx8c7Jb0sMw6ZStsZpUJ5Dy3MnYIzX_xUUxojKiQOYGENs9Hpuyzos6JpVufDaxlWPYQ=s900-c-k-c0x00ffffff-no-rj",
  };

  // ── Card layout config (easy to tune) ──────────────────────────────
  const CARD_SIZE = { width: 320, height: 400 };
  const CARD_JOIN_OVERLAP = 0.005;

  const NETWORK_GALLERY_CARD_LAYOUT = [
    { ...CARD_SIZE, gapBefore: 0, translateY: -72, rotate: -6 },
    { ...CARD_SIZE, gapBefore: -2, translateY: 58, rotate: 4.5 },
    { ...CARD_SIZE, gapBefore: -2, translateY: -94, rotate: 7 },
    { ...CARD_SIZE, gapBefore: -1, translateY: 82, rotate: -3 },
    { ...CARD_SIZE, gapBefore: -2, translateY: -48, rotate: 5 },
    { ...CARD_SIZE, gapBefore: -2, translateY: 96, rotate: -7.5 },
    { ...CARD_SIZE, gapBefore: -1, translateY: -88, rotate: 2 },
    { ...CARD_SIZE, gapBefore: -2, translateY: 40, rotate: -8 },
    { ...CARD_SIZE, gapBefore: -2, translateY: -64, rotate: 5.5 },
    { ...CARD_SIZE, gapBefore: -1, translateY: 72, rotate: -4 },
    { ...CARD_SIZE, gapBefore: -2, translateY: -52, rotate: 6 },
    { ...CARD_SIZE, gapBefore: -2, translateY: 88, rotate: -2.5 },
    { ...CARD_SIZE, gapBefore: -1, translateY: -36, rotate: 3.5 },
    { ...CARD_SIZE, gapBefore: -2, translateY: 56, rotate: -6.5 },
  ];

  const TRACK_LEAD_RATIO = 0.55;
  const TRACK_TRAIL_RATIO = 0.55;
  const GALLERY_BASE_VW = 1280;

  const CROSSFADE_START = 0.46;
  const CROSSFADE_END = 0.56;
  const SCALE_MIN = 0.97;
  const SCALE_RANGE = 0.03;
  const SCALE_FALLOFF = 0.35;
  const MEASURE_DELAY_MS = 60;
  const HOVER_ELEVATE_MS = 800;

  function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
  }

  function overlapGap(multiplier) {
    return -Math.max(1, Math.round(CARD_SIZE.width * CARD_JOIN_OVERLAP * multiplier));
  }

  function resolveCreatorImage(name) {
    return NETWORK_GALLERY_IMAGES[name] || null;
  }

  function getCardSources() {
    return NETWORK_GALLERY_CREATORS.map((name, i) => {
      const layout = NETWORK_GALLERY_CARD_LAYOUT[i] || {
        ...CARD_SIZE,
        gapBefore: overlapGap(1),
        translateY: 0,
        rotate: 0,
      };

      return {
        ...layout,
        name,
        src: resolveCreatorImage(name),
        alt: name,
      };
    });
  }

  function cardStyleAttr(card, i) {
    return [
      `--card-w:${card.width}px`,
      `--card-h:${card.height}px`,
      `--card-gap:${card.gapBefore}px`,
      `--card-y:${card.translateY}px`,
      `--card-rot:${card.rotate}deg`,
      `--card-z:${i + 1}`,
      `--card-scale:1`,
    ].join(";");
  }

  function buildCardFigure(card, i) {
    const safeName = escapeHtml(card.name);
    const safeAttrName = escapeAttr(card.name);
    const placeholderClass = card.src ? "" : " im-network-gallery__card--placeholder";
    const media = card.src
      ? `<img src="${escapeAttr(card.src)}" alt="${safeAttrName}" width="${CARD_SIZE.width}" height="${CARD_SIZE.height}" loading="${i < 2 ? "eager" : "lazy"}" decoding="async" draggable="false" data-fallback-name="${safeAttrName}">`
      : `<div class="im-network-gallery__placeholder" aria-hidden="true"></div>`;

    return `
      <figure class="im-network-gallery__card${placeholderClass}" style="${cardStyleAttr(card, i)}" data-index="${i}" data-creator-name="${safeAttrName}" role="button" tabindex="0" aria-label="View ${safeName} details">
        ${media}
        <span class="im-network-gallery__hint" aria-hidden="true">Click for info</span>
        <figcaption class="im-network-gallery__caption">${safeName}</figcaption>
      </figure>`;
  }

  function swapToPlaceholder(img) {
    const name = img.getAttribute("data-fallback-name") || img.alt || "Creator";
    const figure = img.closest(".im-network-gallery__card");
    if (!figure) return;

    figure.classList.add("im-network-gallery__card--placeholder");
    img.replaceWith(
      Object.assign(document.createElement("div"), {
        className: "im-network-gallery__placeholder",
        ariaHidden: "true",
      })
    );
    figure.closest("[data-network-gallery]")?.dispatchEvent(new CustomEvent("network-gallery:remeasure"));
  }

  function getCreatorDetails(name) {
    if (typeof NETWORK_CREATOR_DETAILS !== "undefined" && NETWORK_CREATOR_DETAILS[name]) {
      return NETWORK_CREATOR_DETAILS[name];
    }
    return {
      niche: "Creator",
      summary: "Full production pipeline — research, scripts, editing, thumbnails, and publishing.",
      stats: [
        { value: "1M+", label: "Views delivered" },
        { value: "50+", label: "Videos produced" },
        { value: "2×", label: "Growth support" },
      ],
      services: ["Content research", "Scriptwriting", "Video editing", "Thumbnail & publishing"],
      videos: typeof PORTFOLIO_VIDEOS !== "undefined" ? PORTFOLIO_VIDEOS.slice(0, 3) : [],
    };
  }

  class CreatorDetailModal {
    constructor(root, getImage) {
      this.root = root;
      this.getImage = getImage;
      this.el = root.querySelector("[data-network-creator-modal]");
      if (!this.el) return;

      this.backdrop = this.el.querySelector("[data-network-modal-backdrop]");
      this.panel = this.el.querySelector(".network-creator-modal__panel");
      this.closeBtn = this.el.querySelector("[data-network-modal-close]");
      this.avatar = this.el.querySelector("[data-network-modal-avatar]");
      this.nameEl = this.el.querySelector("[data-network-modal-name]");
      this.nicheEl = this.el.querySelector("[data-network-modal-niche]");
      this.summaryEl = this.el.querySelector("[data-network-modal-summary]");
      this.statsEl = this.el.querySelector("[data-network-modal-stats]");
      this.servicesEl = this.el.querySelector("[data-network-modal-services]");
      this.videosEl = this.el.querySelector("[data-network-modal-videos]");
      this.activeName = null;
      this.previousFocus = null;
      this.listeners = [];
      this.bind();
    }

    bind() {
      this.on(this.closeBtn, "click", () => this.close());
      this.on(this.backdrop, "click", () => this.close());
      this.on(this.el, "click", (e) => {
        if (e.target === this.el) this.close();
      });
      this.on(document, "keydown", (e) => {
        if (e.key === "Escape" && this.isOpen()) this.close();
      });
    }

    on(target, type, handler) {
      if (!target) return;
      target.addEventListener(type, handler);
      this.listeners.push({ target, type, handler });
    }

    isOpen() {
      return this.el && !this.el.hidden;
    }

    open(name) {
      if (!this.el || !name) return;

      const details = getCreatorDetails(name);
      const image = this.getImage(name);

      this.activeName = name;
      if (this.avatar) {
        this.avatar.src = image || "";
        this.avatar.alt = name;
        this.avatar.hidden = !image;
      }
      if (this.nameEl) this.nameEl.textContent = name;
      if (this.nicheEl) this.nicheEl.textContent = details.niche || "";
      if (this.summaryEl) this.summaryEl.textContent = details.summary || "";

      if (this.statsEl) {
        this.statsEl.innerHTML = (details.stats || [])
          .map(
            (stat) => `
          <div class="network-creator-modal__stat">
            <span class="network-creator-modal__stat-value">${escapeHtml(stat.value)}</span>
            <span class="network-creator-modal__stat-label">${escapeHtml(stat.label)}</span>
          </div>`
          )
          .join("");
      }

      if (this.servicesEl) {
        this.servicesEl.innerHTML = (details.services || [])
          .map((item) => `<li>${escapeHtml(item)}</li>`)
          .join("");
      }

      if (this.videosEl) {
        this.videosEl.innerHTML = (details.videos || [])
          .slice(0, 3)
          .map((id) => {
            const videoId = sanitizeYoutubeId(id);
            if (!videoId) return "";
            return `
          <div class="network-creator-modal__video">
            <iframe
              src="https://www.youtube.com/embed/${videoId}"
              title="${escapeHtml(name)} featured video"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen></iframe>
          </div>`;
          })
          .filter(Boolean)
          .join("");
      }

      this.previousFocus = document.activeElement;
      this.el.hidden = false;
      this.el.setAttribute("aria-hidden", "false");
      document.body.classList.add("network-creator-modal-open");
      requestAnimationFrame(() => {
        this.el.classList.add("is-visible");
        this.panel?.focus();
      });
    }

    close() {
      if (!this.el || this.el.hidden) return;

      this.el.classList.remove("is-visible");
      this.el.setAttribute("aria-hidden", "true");
      document.body.classList.remove("network-creator-modal-open");

      window.setTimeout(() => {
        if (this.el.classList.contains("is-visible")) return;
        this.el.hidden = true;
        if (this.videosEl) this.videosEl.innerHTML = "";
        this.activeName = null;
        if (this.previousFocus && typeof this.previousFocus.focus === "function") {
          this.previousFocus.focus();
        }
        this.previousFocus = null;
      }, 300);
    }

    destroy() {
      this.close();
      this.listeners.forEach(({ target, type, handler }) => {
        target.removeEventListener(type, handler);
      });
      this.listeners = [];
    }
  }

  class NetworkGallery {
    constructor(root) {
      this.root = root;
      this.scrollEl = root.querySelector("[data-network-scroll]");
      this.startLabel = root.querySelector("[data-network-label-start]");
      this.endLabel = root.querySelector("[data-network-label-end]");
      this.viewportEl = root.querySelector("[data-network-viewport]");
      this.trackEl = root.querySelector("[data-network-track]");
      this.mobileRail = root.querySelector("[data-network-mobile-rail]");

      this.rafId = null;
      this.measureTimer = null;
      this.listeners = [];
      this.mode = "desktop";
      this.cardEls = [];
      this.hoverTimers = new Map();

      if (!this.scrollEl || !this.trackEl) return;

      this.cards = getCardSources();
      this.modal = new CreatorDetailModal(root, resolveCreatorImage);
      this.renderTrack();
      this.detectMode();
      this.bind();
      this.scheduleMeasure();
    }

    renderTrack() {
      this.trackEl.innerHTML = this.cards.map((card, i) => buildCardFigure(card, i)).join("");

      if (this.mobileRail) {
        this.mobileRail.innerHTML = this.cards.map((card, i) => buildCardFigure(card, i)).join("");
      }

      this.cardEls = [...this.trackEl.querySelectorAll(".im-network-gallery__card")];
    }

    detectMode() {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const mobile = window.innerWidth < 768;
      this.mode = reduced || mobile ? "static" : "desktop";
      this.root.classList.toggle("im-network--static", this.mode === "static");
      this.root.classList.toggle("im-network--scroll", this.mode === "desktop");

      if (this.mode === "desktop") {
        this.measureTrack();
        this.update();
      } else {
        this.trackEl.style.transform = "";
        this.resetCardScales();
        this.resetLabels();
      }
    }

    resetLabels() {
      if (this.startLabel) this.startLabel.style.opacity = "";
      if (this.endLabel) this.endLabel.style.opacity = "";
    }

    measureTrack() {
      if (this.mode !== "desktop" || !this.viewportEl || !this.trackEl) return;

      const vw = this.viewportEl.clientWidth;
      const scale = clamp(vw / GALLERY_BASE_VW, 0.82, 1.08);

      this.trackEl.style.setProperty("--gallery-scale", scale.toFixed(3));
      this.trackEl.style.paddingLeft = `${vw * TRACK_LEAD_RATIO}px`;
      this.trackEl.style.paddingRight = `${vw * TRACK_TRAIL_RATIO}px`;
    }

    resetCardScales() {
      this.cardEls.forEach((el) => el.style.removeProperty("--card-scale"));
    }

    updateTextCrossfade(progress) {
      if (!this.startLabel || !this.endLabel) return;
      const t = clamp((progress - CROSSFADE_START) / (CROSSFADE_END - CROSSFADE_START), 0, 1);
      this.startLabel.style.opacity = (1 - t).toFixed(3);
      this.endLabel.style.opacity = t.toFixed(3);
    }

    updateCardScales() {
      if (this.mode !== "desktop" || !this.cardEls.length || !this.viewportEl) return;

      const viewportRect = this.viewportEl.getBoundingClientRect();
      const centerX = viewportRect.left + viewportRect.width / 2;
      const falloff = viewportRect.width * SCALE_FALLOFF;

      this.cardEls.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const cardCenter = rect.left + rect.width / 2;
        const dist = Math.abs(cardCenter - centerX);
        const t = clamp(1 - dist / falloff, 0, 1);
        el.style.setProperty("--card-scale", (SCALE_MIN + SCALE_RANGE * t).toFixed(3));
      });
    }

    update() {
      this.rafId = null;
      if (this.mode !== "desktop") return;

      const rect = this.scrollEl.getBoundingClientRect();
      const vh = window.innerHeight;
      const range = rect.height - vh;
      const progress = range > 0 ? clamp(-rect.top / range, 0, 1) : 0;

      const vw = this.viewportEl.clientWidth;
      const trackWidth = this.trackEl.scrollWidth;
      const x = vw + progress * (-trackWidth - vw);

      this.trackEl.style.transform = `translate3d(${x}px, 0, 0)`;
      this.updateTextCrossfade(progress);
      this.updateCardScales();
    }

    onScroll() {
      if (this.rafId) return;
      this.rafId = requestAnimationFrame(() => this.update());
    }

    onResize() {
      this.detectMode();
      this.measureTrack();
      this.update();
    }

    scheduleMeasure() {
      clearTimeout(this.measureTimer);
      this.measureTimer = setTimeout(() => {
        this.measureTrack();
        this.update();
      }, MEASURE_DELAY_MS);
    }

    bind() {
      const scrollOpts = { passive: true };
      this.add(window, "scroll", () => this.onScroll(), scrollOpts);
      this.add(window, "resize", () => this.onResize(), scrollOpts);

      const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      this.add(motionQuery, "change", () => {
        this.detectMode();
        this.measureTrack();
        this.update();
      });

      this.root.querySelectorAll("img").forEach((img) => {
        this.add(img, "error", () => swapToPlaceholder(img), { once: true });
        if (img.complete) return;
        this.add(img, "load", () => this.scheduleMeasure(), { once: true });
      });

      this.add(this.root, "network-gallery:remeasure", () => this.scheduleMeasure());
      this.bindCardClicks();
      this.bindCardHover();
    }

    clearCardHoverTimer(card) {
      const id = this.hoverTimers.get(card);
      if (!id) return;
      clearTimeout(id);
      this.hoverTimers.delete(card);
    }

    bindCardHover() {
      if (!window.matchMedia("(hover: hover)").matches) return;

      const cards = this.root.querySelectorAll(".im-network-gallery__card[data-creator-name]");
      cards.forEach((card) => {
        const onEnter = () => {
          this.clearCardHoverTimer(card);
          const timerId = window.setTimeout(() => {
            card.classList.add("im-network-gallery__card--elevated");
            this.hoverTimers.delete(card);
          }, HOVER_ELEVATE_MS);
          this.hoverTimers.set(card, timerId);
        };
        const onLeave = () => {
          this.clearCardHoverTimer(card);
          card.classList.remove("im-network-gallery__card--elevated");
        };
        this.add(card, "mouseenter", onEnter);
        this.add(card, "mouseleave", onLeave);
      });
    }

    bindCardClicks() {
      const cards = this.root.querySelectorAll(".im-network-gallery__card[data-creator-name]");
      cards.forEach((card) => {
        this.add(card, "pointerdown", (e) => {
          card._pointerStart = { x: e.clientX, y: e.clientY };
        });
        this.add(card, "click", (e) => {
          const start = card._pointerStart;
          if (start) {
            const dx = Math.abs(e.clientX - start.x);
            const dy = Math.abs(e.clientY - start.y);
            if (dx > 8 || dy > 8) return;
          }
          const name = card.getAttribute("data-creator-name");
          if (name) this.modal?.open(name);
        });
        this.add(card, "keydown", (e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            const name = card.getAttribute("data-creator-name");
            if (name) this.modal?.open(name);
          }
        });
      });
    }

    add(target, type, handler, options) {
      target.addEventListener(type, handler, options);
      this.listeners.push({ target, type, handler, options });
    }

    destroy() {
      clearTimeout(this.measureTimer);
      if (this.rafId) cancelAnimationFrame(this.rafId);
      this.hoverTimers.forEach((id) => clearTimeout(id));
      this.hoverTimers.clear();
      this.root.querySelectorAll(".im-network-gallery__card--elevated").forEach((card) => {
        card.classList.remove("im-network-gallery__card--elevated");
      });
      this.listeners.forEach(({ target, type, handler, options }) => {
        target.removeEventListener(type, handler, options);
      });
      this.listeners = [];
      if (this.trackEl) this.trackEl.style.transform = "";
      this.resetCardScales();
      this.resetLabels();
      this.modal?.destroy();
    }
  }

  let instance = null;

  function initNetworkGallery() {
    const root = document.querySelector("[data-network-gallery]");
    if (!root) return;
    instance?.destroy();
    instance = new NetworkGallery(root);
  }

  global.initNetworkGallery = initNetworkGallery;
  global.NETWORK_GALLERY_CREATORS = NETWORK_GALLERY_CREATORS;
  global.NETWORK_GALLERY_CARD_LAYOUT = NETWORK_GALLERY_CARD_LAYOUT;
})(window);
