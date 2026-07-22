// Firefly Financial — shared "save your results" history engine
// Stores per-tool snapshots in localStorage (device-only, no account needed).
window.FireflyHistory = (function () {
  var PREFIX = 'firefly_history_';
  var MAX_ENTRIES = 25;

  function storageKey(toolKey) { return PREFIX + toolKey; }

  function getAll(toolKey) {
    try {
      return JSON.parse(localStorage.getItem(storageKey(toolKey)) || '[]');
    } catch (e) { return []; }
  }

  function save(toolKey, entry) {
    var list = getAll(toolKey);
    entry.id = Date.now() + '-' + Math.random().toString(36).slice(2, 7);
    entry.date = new Date().toISOString();
    list.unshift(entry);
    if (list.length > MAX_ENTRIES) list.length = MAX_ENTRIES;
    try { localStorage.setItem(storageKey(toolKey), JSON.stringify(list)); } catch (e) {}
    return list;
  }

  function remove(toolKey, id) {
    var list = getAll(toolKey).filter(function (e) { return e.id !== id; });
    try { localStorage.setItem(storageKey(toolKey), JSON.stringify(list)); } catch (e) {}
    return list;
  }

  function clearAll(toolKey) {
    try { localStorage.removeItem(storageKey(toolKey)); } catch (e) {}
  }

  function fmtDate(iso) {
    var d = new Date(iso);
    return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }) +
      ' · ' + d.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' });
  }

  // ---- Generic capture/restore for elements with stable ids ----
  function captureFields(root, ids) {
    var data = {};
    ids.forEach(function (id) {
      var el = root.querySelector('#' + CSS.escape(id));
      if (!el) return;
      data[id] = (el.type === 'checkbox' || el.type === 'radio') ? el.checked : el.value;
    });
    return data;
  }

  function restoreFields(root, data) {
    Object.keys(data || {}).forEach(function (id) {
      var el = root.querySelector('#' + CSS.escape(id));
      if (!el) return;
      if (el.type === 'checkbox' || el.type === 'radio') el.checked = data[id];
      else el.value = data[id];
    });
  }

  // ---- Generic capture/restore for repeating rows (debts, expenses, cards, goals...) ----
  function captureRows(containerId, rowSelector) {
    var container = document.getElementById(containerId);
    if (!container) return [];
    var rows = [];
    container.querySelectorAll(rowSelector).forEach(function (row) {
      var vals = [];
      row.querySelectorAll('input, select, textarea').forEach(function (el) {
        vals.push(el.type === 'checkbox' ? !!el.checked : el.value);
      });
      rows.push(vals);
    });
    return rows;
  }

  function restoreRows(containerId, rowSelector, rows, addFn) {
    var container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = '';
    (rows || []).forEach(function () { addFn(); });
    var rowEls = container.querySelectorAll(rowSelector);
    (rows || []).forEach(function (vals, i) {
      var row = rowEls[i];
      if (!row) return;
      var inputs = row.querySelectorAll('input, select, textarea');
      vals.forEach(function (v, j) {
        var el = inputs[j];
        if (!el) return;
        if (el.type === 'checkbox') el.checked = v; else el.value = v;
      });
    });
  }

  // ---- History panel rendering ----
  function renderPanel(toolKey, containerEl, opts) {
    if (!containerEl) return;
    opts = opts || {};
    var entries = getAll(toolKey);
    containerEl.innerHTML = '';

    var title = document.createElement('p');
    title.className = 'ff-history-title';
    title.textContent = '📜 Your Saved Results';
    containerEl.appendChild(title);

    if (!entries.length) {
      var empty = document.createElement('p');
      empty.className = 'ff-history-empty';
      empty.textContent = opts.emptyText || 'Save your results below to build a history you can come back to and compare over time.';
      containerEl.appendChild(empty);
      return;
    }

    var list = document.createElement('div');
    list.className = 'ff-history-list';

    entries.forEach(function (entry, i) {
      var row = document.createElement('div');
      row.className = 'ff-history-entry';

      var main = document.createElement('div');
      main.className = 'ff-history-main';

      var dateEl = document.createElement('div');
      dateEl.className = 'ff-history-date';
      dateEl.textContent = fmtDate(entry.date);
      main.appendChild(dateEl);

      var headlineEl = document.createElement('div');
      headlineEl.className = 'ff-history-headline';
      headlineEl.textContent = opts.formatHeadline ? opts.formatHeadline(entry) : '';

      var prev = entries[i + 1]; // older entry (list is newest-first)
      if (opts.headlineValue && prev) {
        var curVal = opts.headlineValue(entry);
        var prevVal = opts.headlineValue(prev);
        if (typeof curVal === 'number' && typeof prevVal === 'number' && !isNaN(curVal) && !isNaN(prevVal) && curVal !== prevVal) {
          var diff = curVal - prevVal;
          var higherIsBetter = opts.higherIsBetter !== false;
          var isGood = higherIsBetter ? diff > 0 : diff < 0;
          var badge = document.createElement('span');
          badge.className = 'ff-history-delta ' + (isGood ? 'good' : 'bad');
          badge.textContent = (diff > 0 ? '▲ ' : '▼ ') + (opts.formatDelta ? opts.formatDelta(Math.abs(diff)) : Math.abs(diff));
          headlineEl.appendChild(badge);
        }
      }
      main.appendChild(headlineEl);

      if (entry.summary) {
        var sumEl = document.createElement('div');
        sumEl.className = 'ff-history-summary';
        sumEl.textContent = entry.summary;
        main.appendChild(sumEl);
      }

      row.appendChild(main);

      var actions = document.createElement('div');
      actions.className = 'ff-history-actions';

      if (opts.onRestore) {
        var restoreBtn = document.createElement('button');
        restoreBtn.type = 'button';
        restoreBtn.className = 'ff-history-btn restore';
        restoreBtn.textContent = 'Restore';
        restoreBtn.onclick = function () { opts.onRestore(entry); };
        actions.appendChild(restoreBtn);
      }

      var delBtn = document.createElement('button');
      delBtn.type = 'button';
      delBtn.className = 'ff-history-btn delete';
      delBtn.textContent = 'Delete';
      delBtn.onclick = function () {
        remove(toolKey, entry.id);
        renderPanel(toolKey, containerEl, opts);
      };
      actions.appendChild(delBtn);

      row.appendChild(actions);
      list.appendChild(row);
    });

    containerEl.appendChild(list);

    var clearBtn = document.createElement('button');
    clearBtn.type = 'button';
    clearBtn.className = 'ff-history-clear';
    clearBtn.textContent = 'Clear all saved history for this tool';
    clearBtn.onclick = function () {
      if (!confirm('Delete all saved results for this tool? This cannot be undone.')) return;
      clearAll(toolKey);
      renderPanel(toolKey, containerEl, opts);
    };
    containerEl.appendChild(clearBtn);
  }

  function flashSaved(btn) {
    if (!btn) return;
    var original = btn.textContent;
    btn.disabled = true;
    btn.textContent = '✓ Saved!';
    setTimeout(function () { btn.textContent = original; btn.disabled = false; }, 1500);
  }

  return {
    getAll: getAll, save: save, remove: remove, clearAll: clearAll, fmtDate: fmtDate,
    captureFields: captureFields, restoreFields: restoreFields,
    captureRows: captureRows, restoreRows: restoreRows,
    renderPanel: renderPanel, flashSaved: flashSaved
  };
})();
