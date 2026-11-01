/**
 * NDHU Hub - Core Data & Storage Management
 * National Dong Hwa University Student Portal & Mutual Aid Network
 * All data is synchronized with browser localStorage.
 * No personal names or student IDs are used.
 */

const NDHU_STORAGE_KEYS = {
  SOS: 'ndhu_hub_sos_posts_v2',
  FOOD: 'ndhu_hub_food_reviews_v2',
  WISDOM: 'ndhu_hub_wisdom_archive_v2',
  BOOKMARKS: 'ndhu_hub_wisdom_bookmarks_v2',
  THEME: 'ndhu_hub_theme_preference'
};

// 1. Mock Emergency Cards for Emergency Helpboard
const DEFAULT_SOS_POSTS = [
  {
    id: 'sos-001',
    title: 'Scooter rear tire flat outside Zhixue Gate (Gate 2)',
    category: 'Scooter Breakdown',
    location: 'Zhixue Gate (Gate 2 / 志學門出口)',
    contactInfo: 'Telegram: @ndhu_scooter_rider',
    urgency: 'Urgent', // 'Urgent' | 'In Progress' | 'Resolved'
    description: 'Rear tire got punctured on the railway underpass bump. Need a hand pump or portable air compressor so I can limp into the repair shop on Zhixue Street!',
    timeAgo: '15 mins ago',
    timestamp: Date.now() - 15 * 60 * 1000,
    helpersCount: 2
  },
  {
    id: 'sos-002',
    title: 'Lost Student Card & Dorm Keys at Library Lake Pavilion',
    category: 'Item Lost',
    location: 'Dong Hwa Lake Pavilion (東湖觀景涼亭)',
    contactInfo: 'Telegram: @dorm_keys_lost',
    urgency: 'In Progress',
    description: 'Left a blue lanyard with dorm RFID sensor card and 2 brass keys on the wooden bench around 12:30 PM. A classmate mentioned seeing it on the picnic table. If found, please ping my Telegram!',
    timeAgo: '45 mins ago',
    timestamp: Date.now() - 45 * 60 * 1000,
    helpersCount: 1
  },
  {
    id: 'sos-003',
    title: 'AI Midterm Python Environment Setup Assistance Needed',
    category: 'Urgent Study Advice',
    location: 'Science Building II - 3F Study Lounge',
    contactInfo: 'Telegram: @ndhu_ai_study_group',
    urgency: 'Urgent',
    description: 'Stuck on CUDA runtime error for our Intro to AI midterm experiment. Anyone in Science Bldg II or CS labs free for 10 mins to look at pip/conda package conflict? Can treat with bubble milk tea!',
    timeAgo: '1 hour ago',
    timestamp: Date.now() - 60 * 60 * 1000,
    helpersCount: 3
  },
  {
    id: 'sos-004',
    title: 'Sudden heavy downpour - spare umbrella needed at Arts College Bus Stop',
    category: 'General Help',
    location: 'Arts College Bus Stop (原住民民族學院/藝術學院站牌)',
    contactInfo: 'Telegram: @arts_stop_commuter',
    urgency: 'Resolved',
    description: 'Was heading to catch the 1121 bus to Hualien station when thunderstorm hit. Laptop in canvas bag. Fellow student already shared an extra umbrella, thank you!',
    timeAgo: '2 hours ago',
    timestamp: Date.now() - 120 * 60 * 1000,
    helpersCount: 4
  }
];

// 2. Pre-populated 3 realistic sample reviews for popular eateries near NDHU
const DEFAULT_FOOD_REVIEWS = [
  {
    id: 'food-001',
    name: 'Zhixue Charcoal Grilled Sandwiches (志學碳烤三明治)',
    filterTag: 'Zhixue Street',
    recommendedDish: 'Charcoal Pork Cutlet & Egg Toast with Sweet Peanut Spread (招牌炭烤豬排蛋吐司加花生醬)',
    rating: 5,
    priceRange: '$ (NT$ 45 - 80)',
    address: 'Zhixue Street, near Zhixue Railway Station',
    studentReview: 'The absolute golden staple of NDHU mornings! Thick tender cutlets grilled over aromatic real charcoal with sweet peanut butter and crispy cabbage. Phone in 15 minutes ahead to skip morning rush lines before 8 AM lectures.',
    upvotes: 48
  },
  {
    id: 'food-002',
    name: 'Dong Hwa Lakeside Green Cafeteria (東華湖畔景觀素食學餐)',
    filterTag: 'Near Main Gate',
    recommendedDish: 'Braised Mountain Tofu & Seasonal Wild Ferns Buffet (香滷豆腐與現炒過貓野菜)',
    rating: 4,
    priceRange: '$ (NT$ 60 - 95)',
    address: 'Lakeside Activity Center 2F (Near Main Gate)',
    studentReview: 'Located on 2F of the Lakeside building near Main Gate. Huge daily selection of fresh hot vegetables and wholesome purple multigrain rice. Sitting by the panoramic window overlooking Dong Hwa Lake during sunset is unbeatable!',
    upvotes: 32
  },
  {
    id: 'food-003',
    name: 'Fengchun Traditional Sugarcane Ice (壽豐豐春冰果店)',
    filterTag: 'Shoufeng Town',
    recommendedDish: 'Smoky Sugarcane Ice with Melted Taro Paste (古早味柴燒甘蔗冰 + 密芋頭)',
    rating: 5,
    priceRange: '$ (NT$ 50 - 70)',
    address: 'No. 1, Shoufeng Rd, Shoufeng Township (Next to Shoufeng Station)',
    studentReview: 'Historic landmark right next to Shoufeng Station, a 5-minute scooter ride from campus. The sugarcane crushed ice has a distinct smoky aroma from traditional wood firing, and the taro paste is velvety perfection. Essential on warm Hualien afternoons!',
    upvotes: 65
  }
];

// 3. Pre-populated 3 helpful advice posts from NDHU seniors
const DEFAULT_WISDOM_POSTS = [
  {
    id: 'wisdom-001',
    title: 'Surviving Shoufeng Humidity & Rain: Dorm Dehumidifier & Mold Prevention',
    topic: 'Dorm Tips',
    authorRole: 'Senior Dorm Resident Advisor',
    summary: 'Practical advice on managing 90%+ humidity in Qin-Zhuang, Xing-Zhuang & Jie-Yun dormitories.',
    readTime: '3 min read',
    content: `### Why Shoufeng Humidity is Unique:
Shoufeng sits in the East Rift Valley between the Central Mountain Range and Coastal Range. Relative humidity often hovers between 85% and 95% during winter monsoons and spring plum rain season.

### Senior Must-Haves:
1. **Compressor Dehumidifier:** Split the cost with roommates. Running it on continuous dry mode prevents shoes, leather jackets, and backpacks from turning green with mold.
2. **Wardrobe Moisture Bags:** Hang at least two moisture-absorbing chemical bags inside each closet. Replace them immediately once the crystals dissolve into water.
3. **Mattress Care:** When heading home for midterm or winter breaks, tilt your mattress upright against the wall so damp air doesn't get trapped against the bed frame!
4. **Coin Dryers:** Don't air-dry heavy clothes or jeans inside a closed bedroom; use the dorm coin dryers on rainy weeks.`,
    tags: ['Dorm Life', 'Humidity', 'Mold Prevention', 'Rainy Season'],
    helpfulCount: 89
  },
  {
    id: 'wisdom-002',
    title: 'Mastering NDHU Course Registration & General Education Add/Drop (加簽) Etiquette',
    topic: 'Recommended Electives',
    authorRole: 'Senior Peer Academic Mentor',
    summary: 'Strategic approach to General Education quota limits and polite professor add-code protocols.',
    readTime: '4 min read',
    content: `### 1. General Education Course Lottery (通識志願排序):
NDHU uses an algorithmic weighting lottery system in Phase 1 and Phase 2.
- Do NOT fill all 5 top slots with ultra-popular high-demand electives.
- Mix high-demand courses with medium-demand core electives to ensure you secure at least 6-8 credits.

### 2. First-Week Add/Drop (加簽) Etiquette:
- **Arrive 10 minutes early** for the first class session.
- **Bring a printed Add/Drop slip (加簽單)** and your student transcript/prerequisite proof.
- **Sit in the front rows:** Professors notice engaged students when fire-safety room quotas are tight.
- **Polite Email Formula:** If emailing the professor in advance, state your department, your year, why this course aligns with your academic goals, and offer to audit if credit capacity is full.`,
    tags: ['Course Registration', 'General Education', 'Add-Drop Week', 'Study Tips'],
    helpfulCount: 112
  },
  {
    id: 'wisdom-003',
    title: 'Hualien Biting Midges (小黑蚊) Survival & Safe Highway Travel',
    topic: 'General Life',
    authorRole: 'Campus Safety Student Ambassador',
    summary: 'Effective insect repellent ingredients, safe riding on Highway 9 & 11-Bing, and campus navigation.',
    readTime: '4 min read',
    content: `### 1. Forcipomyia Taiwana (小黑蚊) Truth:
The infamous Hualien "black midge" is actually a tiny biting midge, not a standard mosquito.
- **What doesn't work:** Lemon eucalyptus, citronella patches, or thin peppermint oils have little to no effect.
- **What actually works:** Repellents with **Picaridin (派卡瑞丁 15-20%)** or **DEET**.
- **Hotspots:** Grass lawns around Dorm 1/2 and Arts College between 10 AM and 3 PM. Wear thin UV-protective long trousers.

### 2. Highway 9 vs Highway 11-Bing (台9線 vs 台11丙):
- **Highway 9:** Passes through Zhixue Street toward Ji-an. Lots of gravel trucks and traffic lights. Always use two-stage left turn!
- **Highway 11-Bing:** Exits directly from NDHU Main Gate. Wider and scenic, but watch for speed radar cameras near Fengping Bridge. Speed limit is 60-70 km/h. Keep headlight on!`,
    tags: ['Biting Midges', 'Scooter Safety', 'Highway 11C', 'Campus Life'],
    helpfulCount: 145
  }
];

// Helper storage controller
class NDHUDataManager {
  static getSOSPosts() {
    try {
      const stored = localStorage.getItem(NDHU_STORAGE_KEYS.SOS);
      return stored ? JSON.parse(stored) : DEFAULT_SOS_POSTS;
    } catch (e) {
      return DEFAULT_SOS_POSTS;
    }
  }

  static saveSOSPosts(posts) {
    try {
      localStorage.setItem(NDHU_STORAGE_KEYS.SOS, JSON.stringify(posts));
    } catch (e) {
      console.error('Storage write error', e);
    }
  }

  static addSOSPost(newPost) {
    const posts = this.getSOSPosts();
    const item = {
      id: 'sos-' + Date.now(),
      helpersCount: 0,
      timestamp: Date.now(),
      timeAgo: 'Just now',
      urgency: newPost.urgency || 'Urgent',
      ...newPost
    };
    posts.unshift(item);
    this.saveSOSPosts(posts);
    return item;
  }

  static updateSOSUrgency(id, newUrgency) {
    const posts = this.getSOSPosts();
    const target = posts.find(p => p.id === id);
    if (target) {
      target.urgency = newUrgency;
      if (newUrgency === 'In Progress') {
        target.helpersCount = (target.helpersCount || 0) + 1;
      }
      this.saveSOSPosts(posts);
    }
    return posts;
  }

  static getFoodReviews() {
    try {
      const stored = localStorage.getItem(NDHU_STORAGE_KEYS.FOOD);
      return stored ? JSON.parse(stored) : DEFAULT_FOOD_REVIEWS;
    } catch (e) {
      return DEFAULT_FOOD_REVIEWS;
    }
  }

  static saveFoodReviews(reviews) {
    try {
      localStorage.setItem(NDHU_STORAGE_KEYS.FOOD, JSON.stringify(reviews));
    } catch (e) {
      console.error('Storage write error', e);
    }
  }

  static addFoodReview(newReview) {
    const reviews = this.getFoodReviews();
    const item = {
      id: 'food-' + Date.now(),
      upvotes: 0,
      rating: Number(newReview.rating) || 5,
      ...newReview
    };
    reviews.unshift(item);
    this.saveFoodReviews(reviews);
    return item;
  }

  static upvoteFoodReview(id) {
    const reviews = this.getFoodReviews();
    const target = reviews.find(r => r.id === id);
    if (target) {
      target.upvotes = (target.upvotes || 0) + 1;
      this.saveFoodReviews(reviews);
    }
    return reviews;
  }

  static getWisdomPosts() {
    try {
      const stored = localStorage.getItem(NDHU_STORAGE_KEYS.WISDOM);
      return stored ? JSON.parse(stored) : DEFAULT_WISDOM_POSTS;
    } catch (e) {
      return DEFAULT_WISDOM_POSTS;
    }
  }

  static saveWisdomPosts(posts) {
    try {
      localStorage.setItem(NDHU_STORAGE_KEYS.WISDOM, JSON.stringify(posts));
    } catch (e) {
      console.error('Storage write error', e);
    }
  }

  static addWisdomPost(newPost) {
    const posts = this.getWisdomPosts();
    const item = {
      id: 'wisdom-' + Date.now(),
      helpfulCount: 1,
      readTime: '3 min read',
      tags: [newPost.topic, 'Senior Advice'],
      ...newPost
    };
    posts.unshift(item);
    this.saveWisdomPosts(posts);
    return item;
  }

  static likeWisdomPost(id) {
    const posts = this.getWisdomPosts();
    const target = posts.find(p => p.id === id);
    if (target) {
      target.helpfulCount = (target.helpfulCount || 0) + 1;
      this.saveWisdomPosts(posts);
    }
    return posts;
  }

  static getBookmarks() {
    try {
      const stored = localStorage.getItem(NDHU_STORAGE_KEYS.BOOKMARKS);
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      return [];
    }
  }

  static toggleBookmark(id) {
    let bookmarks = this.getBookmarks();
    const idx = bookmarks.indexOf(id);
    let isBookmarked = false;
    if (idx > -1) {
      bookmarks.splice(idx, 1);
      isBookmarked = false;
    } else {
      bookmarks.push(id);
      isBookmarked = true;
    }
    localStorage.setItem(NDHU_STORAGE_KEYS.BOOKMARKS, JSON.stringify(bookmarks));
    return isBookmarked;
  }

  static resetToDefaults() {
    localStorage.removeItem(NDHU_STORAGE_KEYS.SOS);
    localStorage.removeItem(NDHU_STORAGE_KEYS.FOOD);
    localStorage.removeItem(NDHU_STORAGE_KEYS.WISDOM);
    localStorage.removeItem(NDHU_STORAGE_KEYS.BOOKMARKS);
  }
}

window.NDHUDataManager = NDHUDataManager;
