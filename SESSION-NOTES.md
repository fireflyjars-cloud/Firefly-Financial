# 🔥 Firefly Financial — Where We Left Off

**Last updated:** June 7, 2026

> **To pick back up:** Open Claude and paste this whole file, or just say:
> *"I'm ready to keep building Firefly Financial — here are my session notes"* and paste the "Next Up" section.

---

## ✅ Done in the last session (June 7, 2026)

- Added a **second "Start Your Journey" button** at the bottom of the homepage (links to Kit opt-in)
- Added **swirling fireflies** that gather from the page edges and orbit that bottom button when it scrolls into view
- **Moved The Lamp section** above The Five Jars (now: intro → Lamp → Five Jars → CTA)
- **Alternating hero tagline** — fades between:
  - "Light your money on fire. In the best way."
  - "The small steady glow of every disciplined decision."
- **Cleaned up the footer** — brand-forward format, removed "DBA":
  - © 2026 Firefly Financial™ · Firefly Jars Financial Success Systems, LLC
- Built a full **Terms of Service page** (`terms.html`) — Colorado governing law, Arapahoe County, contact email delyce@fireflyfinancialsuccess.com. Linked in footer.
- **Published Email #4 in Kit** — promotes Substack + ebook, teases Monthly Money Map™ coming in Email #5 (no new tool link in #4)
- **Fixed the email sequence** — manually added existing subscribers to the Welcome Sequence (existing subscribers don't auto-enroll in Kit)

---

## 📋 NEXT UP (in priority order)

### 1. Rebuild Tool 5 — Monthly Money Map™ ⬅️ START HERE
- The current tool files were exported from Word and are broken (not clickable).
- **How:** Open `monthly-money-map.html` (the Word version) in Google Drive → *HTML Tools / funnel downloads*, copy the Word HTML, and paste it into Claude. Claude rebuilds it clean.
- Say: **"I'm ready to rebuild Tool 5 (Monthly Money Map) for Firefly Financial"** and paste the Word HTML.

### 2. Rebuild remaining tools (same process, in order)
- Tool 6: `lamp-exodus-sort.html`
- Tool 7: `debt-to-income-calculator.html`
- Tool 8: `daily-expense-tracker.html`
- Tool 9: `before-you-borrow.html`

### 3. Other to-dos
- Write a **Privacy Policy** page (recommended since we collect emails)
- Add a **Tools link** to the homepage navigation bar
- Continue the **Kit nurture sequence** (Email #5 = Monthly Money Map™ reveal)
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
3. Monthly Money Map™ — `monthly-money-map.html` ✅ live
4. Debt-to-Income Calculator™ — `debt-to-income-calculator.html` ✅ rebuilt
5. Before You Borrow™ — `before-you-borrow.html` ⬜ to build
6. My Credit Card Log™ — `my-credit-card-log.html` ✅ live (RELABEL 4→6)
7. Daily Expense Tracker™ — `daily-expense-tracker.html` ⬜ to build
8. My Financial Goals™ — `my-financial-goals.html` ✅ live (RELABEL 3→8)
9. Lamp & Exodus Sort™ — `lamp-exodus-sort.html` ⬜ to build

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
