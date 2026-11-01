import docx
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT
from docx.oxml import OxmlElement, parse_xml
from docx.oxml.ns import nsdecls, qn

doc = docx.Document()

# Set standard margins (1 inch)
for section in doc.sections:
    section.top_margin = Inches(1.0)
    section.bottom_margin = Inches(1.0)
    section.left_margin = Inches(1.0)
    section.right_margin = Inches(1.0)

# Colors
NAVY = RGBColor(27, 54, 93)      # #1b365d
EMERALD = RGBColor(0, 101, 72)    # #006548
CORAL = RGBColor(220, 38, 38)     # #dc2626
MUTED = RGBColor(100, 116, 139)   # #64748b
DARK = RGBColor(15, 23, 42)       # #0f172a

def add_header(title, level=1):
    p = doc.add_paragraph()
    p.paragraph_format.space_before = Pt(14)
    p.paragraph_format.space_after = Pt(6)
    p.paragraph_format.keep_with_next = True
    run = p.add_run(title)
    run.font.name = 'Calibri'
    run.bold = True
    if level == 1:
        run.font.size = Pt(16)
        run.font.color.rgb = NAVY
    elif level == 2:
        run.font.size = Pt(13)
        run.font.color.rgb = EMERALD
    else:
        run.font.size = Pt(11.5)
        run.font.color.rgb = NAVY
    return p

def add_para(text, bold_prefix=None, space_after=6):
    p = doc.add_paragraph()
    p.paragraph_format.space_after = Pt(space_after)
    p.paragraph_format.line_spacing = 1.15
    if bold_prefix:
        r_pre = p.add_run(bold_prefix)
        r_pre.font.name = 'Calibri'
        r_pre.bold = True
        r_pre.font.size = Pt(11)
        r_pre.font.color.rgb = DARK
    r_body = p.add_run(text)
    r_body.font.name = 'Calibri'
    r_body.font.size = Pt(11)
    r_body.font.color.rgb = DARK
    return p

def add_bullet(bold_prefix, text):
    p = doc.add_paragraph(style='List Bullet')
    p.paragraph_format.space_after = Pt(4)
    p.paragraph_format.line_spacing = 1.15
    if bold_prefix:
        r_pre = p.add_run(bold_prefix)
        r_pre.font.name = 'Calibri'
        r_pre.bold = True
        r_pre.font.size = Pt(10.5)
        r_pre.font.color.rgb = DARK
    r_body = p.add_run(text)
    r_body.font.name = 'Calibri'
    r_body.font.size = Pt(10.5)
    r_body.font.color.rgb = DARK
    return p

def set_cell_background(cell, fill_hex):
    tcPr = cell._tc.get_or_add_tcPr()
    shd = parse_xml(f'<w:shd {nsdecls("w")} w:fill="{fill_hex}"/>')
    tcPr.append(shd)

# Document Title
title_p = doc.add_paragraph()
title_p.paragraph_format.space_before = Pt(0)
title_p.paragraph_format.space_after = Pt(2)
run_title = title_p.add_run("NDHU Hub: Campus Connect & Life Guide")
run_title.font.name = 'Calibri'
run_title.font.size = Pt(24)
run_title.font.bold = True
run_title.font.color.rgb = NAVY

sub_p = doc.add_paragraph()
sub_p.paragraph_format.space_after = Pt(14)
run_sub = sub_p.add_run("國立東華大學 校園生活與互助平台 • AI Midterm Project Report")
run_sub.font.name = 'Calibri'
run_sub.font.size = Pt(13)
run_sub.font.color.rgb = EMERALD

# Meta Box Table
meta_table = doc.add_table(rows=4, cols=2)
meta_table.alignment = WD_TABLE_ALIGNMENT.CENTER
meta_table.autofit = False

meta_data = [
    ("Course:", "Introduction to Artificial Intelligence — Midterm Project"),
    ("Target Presentation Date:", "November 02, 2026"),
    ("Repository URL:", "https://github.com/ndhuAkshit/ndhu-hub"),
    ("Privacy & Compliance:", "Strict Academic Anonymity (Zero personal names or student IDs included)")
]

col_widths = [Inches(2.0), Inches(4.5)]
for i, (k, v) in enumerate(meta_data):
    row = meta_table.rows[i]
    cell_k, cell_v = row.cells[0], row.cells[1]
    cell_k.width = col_widths[0]
    cell_v.width = col_widths[1]
    
    set_cell_background(cell_k, "EEF4FB")
    set_cell_background(cell_v, "F8FAFC")
    
    pk = cell_k.paragraphs[0]
    pk.paragraph_format.space_after = Pt(2)
    rk = pk.add_run(k)
    rk.bold = True
    rk.font.name = 'Calibri'
    rk.font.size = Pt(9.5)
    rk.font.color.rgb = NAVY
    
    pv = cell_v.paragraphs[0]
    pv.paragraph_format.space_after = Pt(2)
    rv = pv.add_run(v)
    rv.font.name = 'Calibri'
    rv.font.size = Pt(9.5)
    rv.font.color.rgb = DARK

doc.add_paragraph().paragraph_format.space_after = Pt(8)

# SECTION 1
add_header("1. Executive Summary & Problem Statement", level=1)
add_para(
    "National Dong Hwa University (NDHU) is situated in Shoufeng, Hualien, spanning over 251 hectares in the East Rift Valley. "
    "While celebrated for its scenic natural campus, its expansive rural geography introduces severe daily hurdles for students. "
    "Roadside scooter breakdowns on Provincial Highway 9 and Highway 11-Bing frequently leave students stranded miles away from repair shops. "
    "Simultaneously, Shoufeng's microclimate brings sudden downpours, relative humidity exceeding 85-95% that damages dormitory clothing and books, "
    "and bites from Hualien's ceratopogonid biting midges (Forcipomyia taiwana). Furthermore, essential campus dining deals and course registration "
    "strategies are fragmented across ephemeral social media chats."
)
add_para(
    "NDHU Hub was engineered to solve these problems by delivering a centralized, responsive, and privacy-conscious student portal. "
    "Built with pure client-side web technologies and LocalStorage persistence, the application operates reliably offline and on mobile devices without external database dependencies."
)

# SECTION 2
add_header("2. What Was Made: Architecture & Core Features", level=1)
add_para(
    "The application is structured into three central feature pillars plus an embedded conversational campus assistant, styled with a modern collegiate navy and emerald theme."
)

add_header("2.1 Emergency Helpboard & SOS Mutual Aid", level=2)
add_bullet("Interactive Request Form: ", "Students can submit emergency assistance requests choosing from four categorized issues: Scooter Breakdown, Item Lost, Urgent Study Advice, and General Help. Requires landmark location, detailed description, and a Telegram handle for instant peer contact.")
add_bullet("Urgency Tag Tracking: ", "Each card is tagged with prominent visual badges: Urgent (Crimson alert), In Progress (Amber active assistance), and Resolved (Emerald completed). Student helpers can update card status in real-time directly from the card interface.")
add_bullet("Campus Hotline Banner: ", "A persistent top notice bar provides direct one-click calling to Campus 24/7 Security (03-890-6995), Shoufeng Police (03-865-2110), and the Health Center Clinic (03-890-6254).")

add_header("2.2 Campus Food & Dish Reviews", level=2)
add_bullet("Zonal Filter Directory: ", "Filters local eateries across Near Main Gate, Zhixue Street, and Shoufeng Town.")
add_bullet("Must Try Dish Highlights: ", "Every restaurant card highlights a signature student dish in a dedicated golden callout box, accompanied by a 1 to 5 star rating, price range indicator, and authentic student reviews.")
add_bullet("Interactive Food Roulette: ", "An animated random selection wheel ('What to Eat Today? / 今天吃什麼') that shuffles local eateries to solve daily student meal indecision.")

add_header("2.3 Senior Wisdom & Experience Hub", level=2)
add_bullet("Categorized Life Archive: ", "Upperclassmen advice organized into General Life, Dorm Tips, Recommended Electives, and Club Life.")
add_bullet("Real-Time Search Bar: ", "Instant live filtering across survival guides, titles, and tags.")
add_bullet("Pre-Populated Battle-Tested Guides: ", "Includes comprehensive solutions for dormitory humidity and mold prevention, algorithmic course lottery selection and first-week add/drop (加簽) etiquette, and scientific protection against Hualien biting midges.")
add_bullet("Personal Offline Bookmarks: ", "Students can star articles to store them in browser LocalStorage for offline reference.")

add_header("2.4 Embedded NDHU AI Campus Assistant", level=2)
add_bullet("Conversational Bot: ", "A floating AI helper powered by natural intent matching that instantly answers queries about scooter garages near Zhixue Gate, midnight supper spots, course registration rules, and emergency hotlines.")

# SECTION 3
add_header("3. Target Audience & User Personas", level=1)
add_para("NDHU Hub addresses the specific needs of four primary campus cohorts:")
add_bullet("Freshmen & New Residents: ", "Unfamiliar with Shoufeng's 90%+ humidity, course lottery weighting limits, and campus gate layouts. Benefit from the Senior Wisdom guides and dormitory tips.")
add_bullet("Scooter Commuters: ", "Daily riders between Hualien City and Shoufeng along Highway 9 and 11-Bing. Benefit from the Emergency Helpboard for tire inflator sharing and battery jump-starts.")
add_bullet("Budget-Conscious Undergraduates: ", "Seeking affordable dining between lectures without endless debate over lunch locations. Benefit from the Food Directory and Random Roulette.")
add_bullet("International & Exchange Students: ", "Facing language barriers and unfamiliar campus procedures. Benefit from the clear English interface, prominent visual badges, and conversational AI assistant.")

# SECTION 4
add_header("4. How It Was Built with AI: Agentic Workflow with Antigravity", level=1)
add_para(
    "NDHU Hub was conceived, designed, and validated through an agentic human-AI pair-programming workflow utilizing Google DeepMind's Antigravity assistant. "
    "Rather than generating monolithic code, the development proceeded through four structured iterations:"
)
add_bullet("Phase 1 - Architectural Foundation: ", "Prompted Antigravity to generate a decoupled HTML5 semantic structure and CSS Custom Properties system, prioritizing responsiveness and zero external library dependencies.")
add_bullet("Phase 2 - Domain Specification & Data Modeling: ", "Directed the AI to incorporate authentic Shoufeng geographical details (Zhixue Gate, Fengchun Sugarcane Ice, Forcipomyia taiwana biology) and required interactive fields (Telegram handles, urgency states, and star ratings).")
add_bullet("Phase 3 - Visual Polish & Usability Refinement: ", "Refined color palettes to a deep collegiate navy (#1b365d) and emerald (#006548) scheme, designed prominent visual badges (Emergency SOS, Must Try Dish, Senior Tip), and optimized responsive breakpoints (768px and 480px).")
add_bullet("Phase 4 - Automated Verification: ", "Leveraged AI-driven automated test scripts in Node.js to verify DOM ID synchronization and simulate user interactions prior to code finalization.")

# SECTION 5
add_header("5. Verification & Quality Control", level=1)
add_para("To ensure complete software reliability and compliance with assignment instructions, five rigorous checks were performed:")
add_bullet("Syntax Compilation: ", "All JavaScript controllers were compiled using Node.js syntax verification ('node -c'). Confirmed zero syntax errors or unhandled exceptions.")
add_bullet("DOM Element Consistency: ", "An automated script verified all 26+ DOM element IDs referenced in the JavaScript controllers against index.html, achieving 100% ID synchronization.")
add_bullet("State Persistence Simulation: ", "A headless Node.js simulation verified data initialization, SOS urgency switching (Urgent -> In Progress), review upvoting, and bookmark toggling.")
add_bullet("Responsive Layout Validation: ", "Tested adaptive column collapsing, 44px minimum touch targets, and horizontal touch scrolling on mobile viewports.")
add_bullet("Academic Privacy & Anonymity Audit: ", "A repository-wide regex scan confirmed zero real human names or student ID numbers exist in the code or datasets.")

# SECTION 6
add_header("6. Future Scope & Next Steps", level=1)
add_bullet("Real-Time WebSockets / Push Notifications: ", "Broadcast high-priority emergency SOS alerts immediately to nearby peer devices.")
add_bullet("Interactive Campus GIS Map: ", "Integrate Leaflet.js with campus coordinates for bicycle air stations, automated external defibrillators (AED), and certified repair shops.")
add_bullet("Bilingual Localization: ", "Add an instant Traditional Chinese / English language switcher for full community accessibility.")
add_bullet("Gemini RAG Integration: ", "Connect the campus bot to a retrieval-augmented generation backend indexed with official NDHU student handbooks and bus timetables.")

doc.save("NDHU_Hub_Project_Report.docx")
print("SUCCESS: NDHU_Hub_Project_Report.docx created successfully!")
