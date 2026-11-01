# NDHU Hub (Campus Connect & Life Guide)
### 國立東華大學 校園生活與互助平台

A clean, modern, and mobile-responsive web application designed for the student community of **National Dong Hwa University (NDHU)** in Shoufeng, Hualien.

Developed as an **AI Midterm Project** for *Introduction to Artificial Intelligence*, this application addresses the unique geographical, environmental, and academic everyday needs of university students residing in Taiwan's East Rift Valley.

---

## 📖 Project Overview & Purpose

Spanning over 251 hectares between the Central Mountain Range and Coastal Range, National Dong Hwa University is one of Taiwan's largest and most scenic campuses. However, its expansive rural layout introduces unique daily student hurdles:
* **Roadside Breakdown Assistance:** Daily scooter commuting along Provincial Highways 9 and 11-Bing frequently results in punctures or dead batteries far from repair garages.
* **Extreme Subtropical Weather & Humidity:** Sudden Shoufeng downpours and indoor humidity levels exceeding 85–95% create urgent needs for supplies, rain gear, and mold prevention.
* **Information Fragmentation:** Local dining recommendations and crucial survival wisdom (course lottery algorithms, add/drop etiquette, biting midges defense) are traditionally scattered across disparate social media threads.

**NDHU Hub** centralizes campus life into an accessible, responsive, and privacy-conscious web portal consisting of three primary pillars:
1. **Emergency Helpboard & SOS Mutual Aid:** Real-time peer assistance for breakdowns, lost items, and sudden emergencies.
2. **Campus Food & Dish Reviews:** Curated eatery directory organized by campus zones with verified "Must Try Dish" recommendations and an interactive dining roulette.
3. **Senior Wisdom & Experience Hub:** Archived upperclassmen knowledge base covering dorm humidity control, course registration lottery strategies, and local survival tips.

---

## 🌟 Key Features Breakdown

### 1. 🚨 Emergency Helpboard (即時校園互助看板)
* **Interactive Help Request Submission Form ("Ask for Emergency Help"):**
  * **Assistance Category:** `Scooter Breakdown` (機車拋錨/爆胎), `Item Lost` (遺失物協尋), `Urgent Study Advice` (課業/考試求助), and `General Help` (一般生活協助).
  * **Location near NDHU:** Campus landmarks (e.g., Zhixue Gate / Gate 2, Dormitories 1–3, Library Lake Pavilion, Science Building II).
  * **Contact Info / Telegram Handle:** Fast communication channel (e.g., `Telegram: @username` or Phone/Line) for immediate peer aid.
  * **Details & Tools Needed:** Clear descriptions of required assistance (hand pump, jumper cables, rain poncho).
* **Dynamic Emergency Cards & Urgency Tracking:**
  * Exact color-coded urgency badges: **`Urgent`** (🚨 Crimson), **`In Progress`** (⏳ Amber), and **`Resolved`** (✅ Emerald).
  * **In-Card Status Switcher:** Direct dropdown selector enabling student helpers to update progress from *Urgent* to *In Progress* or *Resolved*.
  * **Visual Badge:** Prominently tagged with `🚨 Emergency SOS`.
* **Campus Hotline Bar:** Persistent one-click phone links to Campus 24/7 Security (`03-890-6995`), Shoufeng Police (`03-865-2110`), and the Health Center Clinic (`03-890-6254`).
* **Instant Filtering & Search:** Category filter pills, urgency status filter pills, and a real-time keyword search bar.

---

### 2. 🍜 Campus Food & Dish Reviews (在地美食與菜品評測)
* **Zonal Filter Tags:** Instant filtering across primary dining districts:
  * 🏫 **`Near Main Gate`** (大學路 / 校內學餐)
  * 🍜 **`Zhixue Street`** (志學街)
  * 🍧 **`Shoufeng Town`** (壽豐火車站 / 鄉市區)
  * 🌐 **`All Locations`**
* **Review Submission Form:**
  * Captures Restaurant Name, Location Area Tag, Recommended Dish, Star Rating (1–5 stars via an interactive star picker), Price Range, and Student Review.
* **Pre-Populated Authentic Eateries:**
  1. *Zhixue Street:* **Zhixue Charcoal Grilled Sandwiches (志學碳烤三明治)** — Recommended: *Charcoal Pork Cutlet & Egg Toast with Sweet Peanut Spread* (5.0 ⭐, NT$ 45–80).
  2. *Near Main Gate:* **Dong Hwa Lakeside Green Cafeteria (東華湖畔景觀素食學餐)** — Recommended: *Braised Mountain Tofu & Seasonal Wild Ferns Buffet* (4.0 ⭐, NT$ 60–95).
  3. *Shoufeng Town:* **Fengchun Traditional Sugarcane Ice (壽豐豐春冰果店)** — Recommended: *Smoky Sugarcane Ice with Melted Taro Paste* (5.0 ⭐, NT$ 50–70).
* **Distinct Visual Badges:** Tagged with `🍜 Campus Food Review` and an eye-catching `✨ Must Try Dish (必點推薦)` highlight callout.
* **"What to Eat Today?" Random Roulette (今天吃什麼? 抽籤輪盤):** Animated random selection wheel that shuffles student favorites to solve daily meal indecision.

---

### 3. 🎓 Senior Wisdom & Experience Hub (學長姐智慧與生活百科)
* **Topic Categorization:** Filtered by key campus themes:
  * 🌿 **`General Life`** (東華校園生活 / 花蓮生存)
  * 🏠 **`Dorm Tips`** (宿舍防潮除濕 / 外宿指南)
  * 🎓 **`Recommended Electives`** (推薦通識 / 選課加簽密技)
  * 🎭 **`Club Life`** (社團生活 / 課外活動)
* **Live Keyword Search Bar:** Instant client-side search filtering across titles, guide content, tags, and upperclassman roles.
* **Pre-Populated Essential Guides:**
  1. *Dorm Tips:* **Surviving Shoufeng Humidity & Rain: Dorm Dehumidifier & Mold Prevention** (Managing 90%+ humidity in Qin-Zhuang, Xing-Zhuang & Jie-Yun).
  2. *Recommended Electives:* **Mastering NDHU Course Registration & General Education Add/Drop (加簽) Etiquette** (Algorithmic weighted lottery strategies and polite first-week add-code protocol).
  3. *General Life:* **Hualien Biting Midges (小黑蚊) Survival & Safe Highway Travel** (Picaridin repellents vs citronella, Highway 9 vs Highway 11-Bing speed radars).
* **Interactive Features:** Post new advice formatted in Markdown, star articles for offline `localStorage` bookmarks, and upvote helpful guides.
* **Visual Badge:** Marked with `🎓 Senior Tip` badges.

---

### 4. 🤖 Embedded NDHU AI Campus Assistant (智慧校園小幫手)
* Floating interactive assistant widget with context-aware natural language matching.
* Ready to answer student queries regarding flat tire repair protocols, late-night supper options on Zhixue Street, course registration rules, and biting midge protection.

---

## 🛠️ Technology Stack Used

| Layer | Technologies & Techniques | Description |
| :--- | :--- | :--- |
| **Markup & Semantics** | **HTML5** | Semantic, accessible document structure, native dialog modals, collapsible form panels, ARIA tab roles. |
| **Styling & Theming** | **CSS3, CSS Variables** | Cohesive Deep University Navy palette (`#1b365d`, `#1d4ed8`), NDHU Emerald Green (`#006548`), warm emergency coral (`#dc2626`) and honey amber (`#d97706`). Fluid dark/light theme switching. |
| **Layout & Responsiveness** | **CSS Grid, Flexbox** | Fully mobile-responsive layout with adaptive breakpoints (`768px`, `480px`). Form grids stack dynamically on smartphones; touch targets meet 44px mobile standards. |
| **Client-Side Logic** | **Modern JavaScript (ES6+)** | Decoupled modular architecture (`data.js`, `sos.js`, `food.js`, `wisdom.js`, `ai-assistant.js`, `app.js`). Event delegation and reactive DOM updates. |
| **Data Persistence** | **Web Storage API (LocalStorage)** | Client-side persistence for emergency posts, reviews, status changes, and bookmarks without external database latency. |
| **Dependencies** | **Zero External Libraries** | 100% vanilla web technology. No heavy frameworks, no npm dependencies, and no build pipeline required. |

---

## 📂 Project Directory Structure

```
midTerms/
├── .gitignore          # Standard web ignore file (OS files, cache, sensitive keys)
├── index.html          # Core single-page application with responsive tabs & modals
├── README.md           # Professional project documentation & GitHub presentation
├── REPORT_DRAFT.md     # Comprehensive academic report draft & 3-slide presentation outline
├── css/
│   └── style.css       # University design system, card badges, dark mode, responsive styles
├── js/
│   ├── data.js         # Initial mock datasets and LocalStorage synchronization manager
│   ├── sos.js          # Emergency Helpboard controller with urgency tag workflows
│   ├── food.js         # Food reviews directory controller, star rating logic & roulette
│   ├── wisdom.js       # Senior wisdom archive controller, topic filters & live search
│   ├── ai-assistant.js # Natural query NDHU AI Campus Assistant widget
│   └── app.js          # Main coordinator: tab navigation, URL hash routing & toast alerts
└── assets/             # Project static assets and icons
```

---

## 🚀 How to Run Locally

Because NDHU Hub is built using pure client-side web technologies, running the application requires no complex installation, build steps, or package managers.

### Method 1: Direct Browser Launch (Simplest)
1. Clone or download this repository to your computer.
2. Locate `index.html` in the project root folder.
3. **Double-click `index.html`** (or right-click and choose **Open With** → Google Chrome, Microsoft Edge, Mozilla Firefox, or Safari).

### Method 2: Local HTTP Server (Python)
If you prefer running through a local web server:
1. Open a terminal or PowerShell prompt in the project root folder.
2. Run:
   ```bash
   python -m http.server 8000
   ```
3. Open your browser and navigate to:
   ```
   http://localhost:8000
   ```

### Method 3: Visual Studio Code Live Server
1. Open the project folder in VS Code.
2. Right-click `index.html` and click **"Open with Live Server"**.

---

## 🤖 AI Development Disclosure

In accordance with academic integrity standards for the *Introduction to Artificial Intelligence* course, this disclosure outlines how Artificial Intelligence was leveraged during the conception, development, and validation of NDHU Hub:

1. **Human-AI Collaborative Pair Programming:**
   * **Development Agent:** Built with assistance from Google DeepMind's **Antigravity** advanced coding assistant.
   * **Prompting & Iterative Refinement:** The developer provided high-level domain requirements, feature specifications (e.g., specific form fields, urgency tag states, NDHU local contexts), and visual guidelines. The AI assistant translated these specifications into modular, clean, and maintainable HTML5/CSS3/JavaScript code.
2. **Design & Theming Optimization:**
   * AI assisted in synthesizing a cohesive university aesthetic (Deep Collegiate Navy paired with NDHU Emerald Green and warm alert accents) and implementing mobile-first responsive breakpoints.
3. **Automated Verification & Quality Control:**
   * AI-generated automated verification scripts (`verify_dom.js` and `test_logic.js`) were executed via Node.js to validate:
     * 100% DOM element ID alignment between `index.html` and JavaScript controllers.
     * State manipulation logic (urgency status switching, star rating calculation, bookmark toggling).
     * JavaScript syntax compliance across all modular scripts (`node -c`).
4. **Human Direction & Review:**
   * The developer maintained complete architectural oversight, validated NDHU-specific factual relevance (such as Zhixue Gate, Shoufeng train station, and Hualien biting midge biological classifications), and ensured adherence to user requirements.

---

## 🔒 Privacy & Academic Integrity Notice

* **Strict Anonymity:** In accordance with course submission instructions, **no real human names, personal phone numbers, or student ID numbers are included or stored** within this codebase, documentation, or mock data.
* **Mock Contact Information:** All contact references are generic student roles or simulated Telegram handles (e.g., `@ndhu_scooter_rider`).
* **Reset Functionality:** Users can reset all local storage data back to the clean initial demo state at any time by clicking the **"↺ Reset Demo Data"** button in the application header.
