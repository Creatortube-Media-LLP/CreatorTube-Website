"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const { escapeHtml, escapeAttr, sanitizeYoutubeId } = require("../js/utils.js");

test("escapeHtml encodes HTML special characters", () => {
  assert.equal(escapeHtml(`<script>"x"&</script>`), "&lt;script&gt;&quot;x&quot;&amp;&lt;/script&gt;");
});

test("escapeAttr encodes attribute-breaking characters", () => {
  assert.equal(escapeAttr(`" onclick=alert(1) `), "&quot; onclick=alert(1) ");
  assert.equal(escapeAttr("a`b"), "a&#96;b");
});

test("sanitizeYoutubeId accepts valid ids only", () => {
  assert.equal(sanitizeYoutubeId("dQw4w9WgXcQ"), "dQw4w9WgXcQ");
  assert.equal(sanitizeYoutubeId("  dQw4w9WgXcQ  "), "dQw4w9WgXcQ");
  assert.equal(sanitizeYoutubeId("javascript:alert(1)"), null);
  assert.equal(sanitizeYoutubeId("short"), null);
  assert.equal(sanitizeYoutubeId(""), null);
});
