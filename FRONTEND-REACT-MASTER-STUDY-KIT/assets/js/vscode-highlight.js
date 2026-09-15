/* Lightweight VS Code-style syntax highlighter for handbook code blocks.
 * - Colors plain <pre><code> blocks using the shared .code-block token classes
 * - Skips blocks that already contain <span> highlighting (no double-processing)
 * - Works from textContent, so escaped entities (&lt; &gt; &amp;) are safe
 * - No dependencies. Fails silently if anything goes wrong (content stays readable).
 */
(function () {
  'use strict';

  var KEYWORDS = {
    'await': 1, 'async': 1, 'break': 1, 'case': 1, 'catch': 1, 'class': 1,
    'const': 1, 'continue': 1, 'debugger': 1, 'default': 1, 'delete': 1,
    'do': 1, 'else': 1, 'export': 1, 'extends': 1, 'finally': 1, 'for': 1,
    'from': 1, 'function': 1, 'get': 1, 'if': 1, 'import': 1, 'in': 1,
    'instanceof': 1, 'let': 1, 'new': 1, 'of': 1, 'return': 1, 'set': 1,
    'static': 1, 'super': 1, 'switch': 1, 'this': 1, 'throw': 1, 'try': 1,
    'typeof': 1, 'var': 1, 'void': 1, 'while': 1, 'with': 1, 'yield': 1,
    'as': 1, 'implements': 1, 'interface': 1, 'package': 1, 'private': 1,
    'protected': 1, 'public': 1, 'true': 1, 'false': 1
  };
  // Blue literals (VS Code colors these like numbers)
  var BLUE_WORDS = { 'true': 1, 'false': 1, 'null': 1, 'undefined': 1, 'NaN': 1, 'Infinity': 1 };

  function esc(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function isIdentStart(ch) { return /[A-Za-z_$]/.test(ch); }
  function isIdentPart(ch) { return /[\w$]/.test(ch); }

  // Collect identifiers declared via const/let/var, function params, catch params, arrow params.
  function collectVars(src) {
    var vars = {};
    var re, m, i, parts, p;
    re = /\b(?:const|let|var)\s+(\{[^};]*\}|\[[^\];]*\]|[A-Za-z_$][\w$]*)/g;
    while ((m = re.exec(src))) {
      parts = m[1].match(/[A-Za-z_$][\w$]*/g) || [];
      for (i = 0; i < parts.length; i++) { vars[parts[i]] = 1; }
    }
    re = /function\s*[A-Za-z_$][\w$]*\s*\(([^()]*)\)/g;
    while ((m = re.exec(src))) {
      parts = m[1].match(/[A-Za-z_$][\w$]*/g) || [];
      for (i = 0; i < parts.length; i++) { vars[parts[i]] = 1; }
    }
    re = /\bcatch\s*\(([^()]*)\)/g;
    while ((m = re.exec(src))) {
      parts = m[1].match(/[A-Za-z_$][\w$]*/g) || [];
      for (i = 0; i < parts.length; i++) { vars[parts[i]] = 1; }
    }
    // Method shorthand params: deposit(a) { ... } (name after { ; , + optional async/*)
    re = /(^|[{;,])\s*(?:async\s+)?\*?\s*([A-Za-z_$][\w$]*)\s*\(([^()]*)\)/gm;
    while ((m = re.exec(src))) {
      if (KEYWORDS[m[2]]) { continue; }
      parts = m[3].match(/[A-Za-z_$][\w$]*/g) || [];
      for (i = 0; i < parts.length; i++) { vars[parts[i]] = 1; }
    }
    re = /(^|[^\w$])([A-Za-z_$][\w$]*|\([^()]*\))\s*=>/g;
    while ((m = re.exec(src))) {
      parts = m[2].match(/[A-Za-z_$][\w$]*/g) || [];
      for (i = 0; i < parts.length; i++) {
        p = parts[i];
        if (!KEYWORDS[p]) { vars[p] = 1; }
      }
    }
    return vars;
  }

  // Consume a '...' or "..." string starting at i. Returns end index (exclusive).
  function stringEnd(src, i) {
    var q = src[i], n = src.length;
    i++;
    while (i < n) {
      if (src[i] === '\\') { i += 2; continue; }
      if (src[i] === q) { return i + 1; }
      if (src[i] === '\n' && q !== '`') { return i; }
      i++;
    }
    return i;
  }

  // Find index of matching closing brace for '{' at startIdx, skipping strings/comments/templates.
  function matchBrace(src, startIdx) {
    var depth = 0, i = startIdx, n = src.length;
    while (i < n) {
      var c = src[i];
      if (c === '"' || c === "'") { i = stringEnd(src, i); continue; }
      if (c === '`') {
        var t = templateParts(src, i);
        i = t.end;
        continue;
      }
      if (c === '/' && src[i + 1] === '/') {
        while (i < n && src[i] !== '\n') { i++; }
        continue;
      }
      if (c === '/' && src[i + 1] === '*') {
        i += 2;
        while (i < n && !(src[i] === '*' && src[i + 1] === '/')) { i++; }
        i += 2;
        continue;
      }
      if (c === '{') { depth++; }
      if (c === '}') {
        depth--;
        if (depth === 0) { return i; }
      }
      i++;
    }
    return n;
  }

  // Split a template literal starting at i (the backtick) into string/expr parts.
  // Returns { parts: [{t:'s'|'e', v}], end } where end is index after closing backtick.
  function templateParts(src, i) {
    var parts = [], buf = '', n = src.length;
    i++; // skip opening backtick
    while (i < n) {
      var c = src[i];
      if (c === '\\') { buf += src.substr(i, 2); i += 2; continue; }
      if (c === '`') { parts.push({ t: 's', v: buf }); return { parts: parts, end: i + 1, closed: true }; }
      if (c === '$' && src[i + 1] === '{') {
        parts.push({ t: 's', v: buf }); buf = '';
        var close = matchBrace(src, i + 1);
        parts.push({ t: 'e', v: src.substring(i + 2, close) });
        i = close + 1;
        continue;
      }
      buf += c; i++;
    }
    parts.push({ t: 's', v: buf });
    return { parts: parts, end: i, closed: false };
  }

  function span(cls, rawHtml) { return '<span class="' + cls + '">' + rawHtml + '</span>'; }

  function highlightCode(src) {
    var vars = collectVars(src);
    var out = [], i = 0, n = src.length, m, word, j;
    var jsxStack = [], jsxBrace = 0;

    while (i < n) {
      var c = src[i];

      // Whitespace
      if (/\s/.test(c)) {
        j = i;
        while (j < n && /\s/.test(src[j])) { j++; }
        out.push(esc(src.substring(i, j)));
        i = j;
        continue;
      }
      // Line comment
      if (c === '/' && src[i + 1] === '/') {
        j = i;
        while (j < n && src[j] !== '\n') { j++; }
        out.push(span('comment', esc(src.substring(i, j))));
        i = j;
        continue;
      }
      // Block comment
      if (c === '/' && src[i + 1] === '*') {
        j = src.indexOf('*/', i + 2);
        j = (j === -1) ? n : j + 2;
        out.push(span('comment', esc(src.substring(i, j))));
        i = j;
        continue;
      }
      // HTML comment (e.g. inside <script> examples)
      if (src.substr(i, 4) === '<!--') {
        j = src.indexOf('-->', i + 4);
        j = (j === -1) ? n : j + 3;
        out.push(span('comment', esc(src.substring(i, j))));
        i = j;
        continue;
      }
      // Strings
      if (c === '"' || c === "'") {
        j = stringEnd(src, i);
        out.push(span('string', esc(src.substring(i, j))));
        i = j;
        continue;
      }
      // Template literals (with ${} interpolation highlighted as code)
      if (c === '`') {
        var t = templateParts(src, i);
        var html = '`';
        for (var k = 0; k < t.parts.length; k++) {
          var part = t.parts[k];
          if (part.t === 's') { html += esc(part.v); }
          else { html += '${' + highlightCode(part.v) + '}'; }
        }
        if (t.closed) { html += '`'; }
        out.push(span('string', html));
        i = t.end;
        continue;
      }
      // JSX / HTML tags: <div ...>, </div>, <script ...>
      if (c === '<' && (isIdentStart(src[i + 1]) || (src[i + 1] === '/' && isIdentStart(src[i + 2])))) {
        var tag = '<';
        i++;
        var isCloseTag = (src[i] === '/');
        if (isCloseTag) { tag += '/'; i++; }
        j = i;
        while (j < n && isIdentPart(src[j])) { j++; }
        var tagName = src.substring(i, j);
        tag += tagName;
        i = j;
        out.push(esc(isCloseTag ? '</' : '<'));
        out.push(span('tag', esc(tagName)));
        // Attributes until '>' or '/>'
        while (i < n && src[i] !== '>' && !(src[i] === '/' && src[i + 1] === '>')) {
          var d = src[i];
          if (/\s/.test(d)) { out.push(esc(d)); i++; continue; }
          if (d === '"' || d === "'") {
            j = stringEnd(src, i);
            out.push(span('string', esc(src.substring(i, j))));
            i = j;
            continue;
          }
          if (d === '{') {
            var cb = matchBrace(src, i);
            out.push(esc('{') + highlightCode(src.substring(i + 1, cb)) + esc('}'));
            i = cb + 1;
            continue;
          }
          if (isIdentStart(d)) {
            var e2 = i;
            while (e2 < n && /[\w$:-]/.test(src[e2])) { e2++; }
            var aname = src.substring(i, e2);
            var e3 = e2;
            while (e3 < n && /\s/.test(src[e3])) { e3++; }
            if (src[e3] === '=') { out.push(span('attr', esc(aname))); }
            else { out.push(esc(aname)); }
            i = e2;
            continue;
          }
          out.push(esc(d)); i++;
        }
        if (src[i] === '/' && src[i + 1] === '>') { out.push(esc('/>')); i += 2; }
        else if (src[i] === '>') {
          out.push(esc('>')); i++;
          if (isCloseTag) { if (jsxStack.length > 0) { jsxStack.pop(); } }
          else { jsxStack.push(tagName); }
        }
        continue;
      }
      // Private class fields (#x) read as variables
      if (c === '#' && isIdentStart(src[i + 1])) {
        j = i + 1;
        while (j < n && isIdentPart(src[j])) { j++; }
        out.push(span('variable', esc(src.substring(i, j))));
        i = j;
        continue;
      }
      // Numbers (hex/binary/octal/float/int)
      m = /^(?:0[xX][0-9a-fA-F_]+|0[bB][01_]+|0[oO][0-7_]+|\d[\d_]*(?:\.\d+)?(?:[eE][+-]?\d+)?|\.\d+)/.exec(src.substring(i));
      if (m) {
        out.push(span('number', esc(m[0])));
        i += m[0].length;
        continue;
      }
      // Identifiers / keywords
      if (isIdentStart(c)) {
        j = i;
        while (j < n && isIdentPart(src[j])) { j++; }
        word = src.substring(i, j);
        if (KEYWORDS[word]) {
          out.push(span('keyword', esc(word)));
        } else if (BLUE_WORDS[word]) {
          out.push(span('number', esc(word)));
        } else {
          // Function call? identifier followed by optional whitespace + '('
          var q = j;
          while (q < n && /\s/.test(src[q])) { q++; }
          // Inside JSX children text (not inside {...}), keep identifiers plain
          var inJsxText = (jsxStack.length > 0 && jsxBrace === 0);
          if (inJsxText) {
            out.push(esc(word));
          } else if (src[q] === '(') {
            out.push(span('function', esc(word)));
          } else if (/^[A-Z]/.test(word)) {
            out.push(span('type', esc(word)));
          } else if (vars[word]) {
            out.push(span('variable', esc(word)));
          } else {
            out.push(esc(word));
          }
        }
        i = j;
        continue;
      }
      // Track { } only while inside JSX (so {...} expressions still highlight)
      if ((c === '{' || c === '}') && jsxStack.length > 0) {
        if (c === '{') { jsxBrace++; }
        else if (jsxBrace > 0) { jsxBrace--; }
        out.push(esc(c));
        i++;
        continue;
      }
      // Operators worth coloring: => ... ?. ??
      if (src.substr(i, 2) === '=>') { out.push(span('operator', esc('=>'))); i += 2; continue; }
      if (src.substr(i, 3) === '...') { out.push(span('operator', esc('...'))); i += 3; continue; }
      if (src.substr(i, 2) === '?.') { out.push(span('operator', esc('?.'))); i += 2; continue; }
      if (src.substr(i, 2) === '??') { out.push(span('operator', esc('??'))); i += 2; continue; }
      // Everything else plain
      out.push(esc(c));
      i++;
    }
    return out.join('');
  }

  function run() {
    try {
      var blocks = document.querySelectorAll('.code-block pre code');
      for (var b = 0; b < blocks.length; b++) {
        var el = blocks[b];
        if (el.querySelector('span')) { continue; } // already highlighted — don't touch
        el.innerHTML = highlightCode(el.textContent);
      }
    } catch (e) { /* leave content readable */ }
  }

  if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', run);
    } else {
      run();
    }
  }
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { highlightCode: highlightCode };
  }
})();
