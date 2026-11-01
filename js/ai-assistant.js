/**
 * NDHU Hub - AI Campus Assistant Module
 * Intelligent campus knowledge bot for the AI Midterm Project
 * Natural language intent matching & knowledge base search
 * No personal names or student IDs used.
 */

const AIAssistant = {
  isOpen: false,

  init() {
    this.bindEvents();
  },

  bindEvents() {
    const toggleBtn = document.getElementById('ai-assistant-toggle');
    const closeBtn = document.getElementById('ai-panel-close');
    const sendBtn = document.getElementById('ai-send-btn');
    const input = document.getElementById('ai-user-input');
    const panel = document.getElementById('ai-assistant-panel');

    if (toggleBtn && panel) {
      toggleBtn.addEventListener('click', () => {
        this.togglePanel();
      });
    }

    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        this.closePanel();
      });
    }

    if (sendBtn && input) {
      sendBtn.addEventListener('click', () => {
        this.handleUserMessage();
      });

      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          this.handleUserMessage();
        }
      });
    }

    // Quick prompts
    const quickPrompts = document.querySelectorAll('.quick-prompt-btn');
    quickPrompts.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const text = e.target.textContent.replace(/^[^\s]+ /, ''); // Strip leading emoji
        if (input) {
          input.value = text;
          this.handleUserMessage();
        }
      });
    });
  },

  togglePanel() {
    this.isOpen = !this.isOpen;
    const panel = document.getElementById('ai-assistant-panel');
    if (panel) {
      panel.classList.toggle('open', this.isOpen);
      if (this.isOpen) {
        document.getElementById('ai-user-input')?.focus();
      }
    }
  },

  closePanel() {
    this.isOpen = false;
    document.getElementById('ai-assistant-panel')?.classList.remove('open');
  },

  handleUserMessage() {
    const input = document.getElementById('ai-user-input');
    const messagesContainer = document.getElementById('ai-chat-messages');
    if (!input || !messagesContainer) return;

    const query = input.value.trim();
    if (!query) return;

    // Append user message
    this.appendMessage('user', query);
    input.value = '';

    // Show typing state
    const typingIndicator = document.createElement('div');
    typingIndicator.className = 'chat-bubble bot';
    typingIndicator.id = 'ai-typing-bubble';
    typingIndicator.innerHTML = '<em>Thinking & scanning campus data...</em>';
    messagesContainer.appendChild(typingIndicator);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    // Simulate AI inference latency
    setTimeout(() => {
      const bubble = document.getElementById('ai-typing-bubble');
      if (bubble) bubble.remove();

      const response = this.generateResponse(query);
      this.appendMessage('bot', response);
    }, 450);
  },

  appendMessage(sender, text) {
    const messagesContainer = document.getElementById('ai-chat-messages');
    if (!messagesContainer) return;

    const div = document.createElement('div');
    div.className = `chat-bubble ${sender}`;
    div.innerHTML = text;
    messagesContainer.appendChild(div);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  },

  generateResponse(query) {
    const q = query.toLowerCase();

    // 1. Emergency / Scooter / Flat Tire
    if (q.includes('tire') || q.includes('scooter') || q.includes('battery') || q.includes('flat') || q.includes('破胎') || q.includes('機車') || q.includes('拋錨')) {
      return `
        🚨 <strong>Emergency Scooter Assistance:</strong><br/>
        1. If you are near <strong>Zhixue Gate (Gate 2)</strong>, several repair shops are right across the railway line along Zhixue Street.<br/>
        2. Post an immediate request on our <strong>Emergency SOS Board</strong> tab — nearby students frequently carry portable air pumps or jumper cables.<br/>
        3. Campus 24/7 Security Center (校安中心): <code>03-890-6995</code>.
      `;
    }

    // 2. Food / Supper / Late Night
    if (q.includes('eat') || q.includes('food') || q.includes('supper') || q.includes('midnight') || q.includes('宵夜') || q.includes('吃什麼') || q.includes('餐廳') || q.includes('美食')) {
      return `
        🍜 <strong>Campus Food Recommendations:</strong><br/>
        • <strong>Late Night Study Fuel:</strong> Zhixue Crisp Salted Chicken (志學宵夜鹽酥雞) is open until 01:30 AM.<br/>
        • <strong>Classic Breakfast:</strong> Zhixue Charcoal Grilled Sandwiches (志學碳烤三明治) with signature peanut toast.<br/>
        • <strong>Famous Shoufeng Specialty:</strong> Fengchun Traditional Sugarcane Ice (豐春冰果店) by the train station.<br/>
        👉 Tip: Check the <strong>"Food & Reviews"</strong> tab to spin our <em>"What to Eat Today"</em> random roulette!
      `;
    }

    // 3. Mosquito / Biting Midges / Weather / Humidity
    if (q.includes('mosquito') || q.includes('midge') || q.includes('rain') || q.includes('humidity') || q.includes('mold') || q.includes('小黑蚊') || q.includes('防蚊') || q.includes('除濕') || q.includes('下雨')) {
      return `
        🌦️ <strong>Hualien Weather & Survival Protocol:</strong><br/>
        • <strong>Forcipomyia Taiwana (小黑蚊):</strong> Regular citronella does not work. Use insect repellents with <strong>Picaridin (15-20%)</strong> or DEET.<br/>
        • <strong>Monsoon Humidity:</strong> Relative humidity in Shoufeng reaches 90%+. Hang moisture absorber bags inside dorm closets and consider sharing a compressor dehumidifier with roommates.<br/>
        • Read the complete guide in our <strong>"Senior Wisdom"</strong> tab!
      `;
    }

    // 4. Course selection / Add-drop / Professor
    if (q.includes('course') || q.includes('add') || q.includes('drop') || q.includes('lottery') || q.includes('選課') || q.includes('加簽') || q.includes('通識')) {
      return `
        🎓 <strong>NDHU Course Registration Strategy:</strong><br/>
        • <strong>General Education Lottery:</strong> Alternate high-demand courses with medium-quota ones to secure your baseline 6-8 credits.<br/>
        • <strong>Add/Drop Week (加簽):</strong> Attend the very first class session in person with a printed slip, sit in the front rows, and explain politely how the syllabus fits your academic goals.
      `;
    }

    // 5. General greeting or fallback
    return `
      👋 Hello! I am your <strong>NDHU Hub AI Campus Guide</strong>.<br/>
      I can help you locate:
      <ul>
        <li>🚨 Real-time student SOS mutual aid & breakdown rescue</li>
        <li>🍲 Local Zhixue Street & Shoufeng dining recommendations</li>
        <li>🎓 Senior wisdom archive (courses, dorm life, mosquito defense)</li>
      </ul>
      Feel free to ask me anything about life at National Dong Hwa University!
    `;
  }
};

window.AIAssistant = AIAssistant;
