# 🔥 Firefly Financial — Where We Left Off

**Last updated:** June 17, 2026

> **To pick back up:** Open Claude and paste this whole file, or just say:
> *"I'm ready to keep building Firefly Financial — here are my session notes"* and paste the "Next Up" section.

---

## ✅ Done — June 7 session (website + funnel)

- Second **"Start Your Journey" button** at homepage bottom + **swirling fireflies** orbiting it on scroll
- **Moved The Lamp** above the Five Jars; **alternating hero tagline**; brand-forward footer (removed "DBA")
- Full **Terms of Service page** (`terms.html`) — Colorado law, contact delyce@fireflyfinancialsuccess.com, linked in footer
- **Published Email #4 in Kit**; manually enrolled existing subscribers into the Welcome Sequence

## ✅ Done — June 17 session (ALL 9 TOOLS COMPLETE 🎉)

- **Rebuilt Tools 4, 5, 7, 9** clean from broken Word HTML → working UTF-8 (Debt-to-Income, Before You Borrow, Daily Expense Tracker, Lamp & Exodus Sort)
- **Relabeled Tools 6 & 8** to new numbering (Credit Card Log 4→6, Financial Goals 3→8)
- Fixed Monthly Money Map footer "Tool 03" → "Tool 3"
- **Restyled the Tools landing page** (`tools/index.html`) — tool numbers 1–9, full ™ names, brand green-gradient style, fixed raw `&`
- 🔑 **Discovered the encoding bug:** the old Word files were UTF-16. When rebuilding, ALWAYS `rm` the file first, then write fresh so it's clean UTF-8. (Use HTML entities like `&trade; &copy; &mdash;` for safety.)
- 🔑 **Workflow shortcut:** the broken Word files live in the repo, so Claude can read & rebuild them directly — no pasting from Drive needed.

---

## 📋 NEXT UP (in priority order)

### 1. ⬅️ FINISH the Google Drive refresh (IN PROGRESS — START HERE)
Replace the stale Drive copies in *HTML Tools / funnel downloads* with the current repo files
(local folder: `C:\Users\colli\Firefly-Financial\tools`). **Method that works:** in Drive, right-click the old file → **Remove** (trash it), then **drag** the matching file from File Explorer into the folder. (The "Manage versions" option was missing from Delyce's right-click menu, so use delete + drag instead.)

Files still needing a Drive refresh:
- [ ] `my-financial-goals.html` — Drive copy still says TOOL 3; repo is correct (TOOL 8). ← was mid-upload when we stopped
- [ ] `debt-to-income-calculator.html`
- [ ] `before-you-borrow.html`
- [ ] `my-credit-card-log.html`
- [ ] `daily-expense-tracker.html`
- [ ] `lamp-exodus-sort.html`
- To verify any file is current: open it, Ctrl+F, search `TOOL` — the number should match the master order below.

### 2. Add a **Tools link** to the homepage top navigation
- Right now visitors can only reach `/tools/` by direct link. Add a nav link on the homepage.

### 3. Kit **Email #5** — Monthly Money Map™ reveal
- (Email #4 already published. June 11 calendar reminder covers #4 timing.)

### 4. Write a **Privacy Policy** page
- Recommended since we collect emails. Same style as `terms.html`.

### 5. Bigger projects (later)
- Set up **Supabase login** so users can save their tool data
- **Brainstorm new tool names** — treasure hunt / magic lamp metaphor (Aladdin-inspired, NO proprietary character names). Example idea: "The Map To The Lamp™"

---

## 🔑 Key project facts

- **Repo:** https://github.com/fireflyjars-cloud/Firefly-Financial
- **Local path:** C:\Users\colli\Firefly-Financial
- **Live site:** https://fireflyjars-cloud.github.io/Firefly-Financial
- **Tools page:** https://fireflyjars-cloud.github.io/Firefly-Financial/tools/
- **Google Drive (Word tool files):** fireflyjarsemail@gmail.com → My Drive → HTML Tools / funnel downloads
- **Kit opt-in link:** https://firefly-financial.kit.com/93028b6f56
- **Business email:** delyce@fireflyfinancialsuccess.com

### 🔢 MASTER TOOL ORDER (locked June 7, 2026) — no leading zeros in labels
1. The Lamp Diagnostic™ — `lamp-diagnostic.html` ✅ live
2. My Monthly Income™ — `my-monthly-income.html` ✅ live
3. Monthly Money Map™ — `monthly-money-map.html` ✅ live — 🔒 FINAL, DO NOT CHANGE (built in separate chat, locked by Delyce June 17, 2026)
4. Debt-to-Income Calculator™ — `debt-to-income-calculator.html` ✅ rebuilt
5. Before You Borrow™ — `before-you-borrow.html` ✅ rebuilt
6. My Credit Card Log™ — `my-credit-card-log.html` ✅ live, relabeled 4→6
7. Daily Expense Tracker™ — `daily-expense-tracker.html` ✅ rebuilt
8. My Financial Goals™ — `my-financial-goals.html` ✅ live, relabeled 3→8
9. Lamp & Exodus Sort™ — `lamp-exodus-sort.html` ✅ rebuilt — 🎉 ALL 9 TOOLS DONE

### 🫙 The Five Jars (canonical order)
Genesis (Investing) · Exodus (Recreation) · Leviticus (Learning) · Numbers (Savings) · Deuteronomy (Giving — saved monthly, given to church as tithe)

---

## 🛠️ Git reminders (for pushing changes live)
Type these in **Git Bash one at a time** (don't paste):
```
cd ~/Firefly-Financial
git add .
git commit -m "describe your change here"
git push origin main
```
- If push is **rejected**: run `git pull --rebase origin main` then push again.
- If it says **"Everything up-to-date"** but you made changes: the file may not have saved (Ctrl+S in VS Code) or the commit didn't capture it.
