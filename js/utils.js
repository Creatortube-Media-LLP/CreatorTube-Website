"use strict";

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function escapeAttr(value) {
  return escapeHtml(value).replace(/`/g, "&#96;");
}

function sanitizeYoutubeId(id) {
  const candidate = String(id || "").trim();
  return /^[a-zA-Z0-9_-]{11}$/.test(candidate) ? candidate : null;
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { escapeHtml, escapeAttr, sanitizeYoutubeId };
} else {
  const globalScope = typeof window !== "undefined" ? window : globalThis;
  globalScope.escapeHtml = escapeHtml;
  globalScope.escapeAttr = escapeAttr;
  globalScope.sanitizeYoutubeId = sanitizeYoutubeId;
}
