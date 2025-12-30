// Quiz State
let scores = {};
let answers = {};
let sortedResults = [];

// Initialize scores for all signs
function initializeScores() {
    scores = {};
    answers = {};
    sortedResults = [];
    Object.keys(zodiacSigns).forEach(sign => {
        scores[sign] = 0;
    });
}

// Build the quiz on page load
function buildQuiz() {
    initializeScores();
    const container = document.getElementById('questionsList');
    container.innerHTML = '';
    
    const letters = ['A', 'B', 'C', 'D'];
    
    questions.forEach((q, qIndex) => {
        const card = document.createElement('div');
        card.className = 'question-card';
        card.id = `question-${qIndex}`;
        
        let optionsHTML = '';
        q.options.forEach((opt, optIndex) => {
            optionsHTML += `
                <button class="option-btn" data-question="${qIndex}" data-option="${optIndex}">
                    <span class="option-letter">${letters[optIndex]}</span>
                    <span class="option-text">${opt.text}</span>
                </button>
            `;
        });
        
        card.innerHTML = `
            <div class="question-number">${qIndex + 1}</div>
            <p class="question-text">${q.question}</p>
            <div class="options">${optionsHTML}</div>
        `;
        
        container.appendChild(card);
    });
    
    // Add click handlers
    document.querySelectorAll('.option-btn').forEach(btn => {
        btn.addEventListener('click', handleOptionClick);
    });
    
    updateAnsweredCount();
}

// Handle option selection
function handleOptionClick(e) {
    const btn = e.currentTarget;
    const qIndex = parseInt(btn.dataset.question);
    const optIndex = parseInt(btn.dataset.option);
    
    const card = document.getElementById(`question-${qIndex}`);
    
    card.querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));
    
    if (answers[qIndex] === optIndex) {
        delete answers[qIndex];
        card.classList.remove('answered');
    } else {
        btn.classList.add('selected');
        answers[qIndex] = optIndex;
        card.classList.add('answered');
    }
    
    updateAnsweredCount();
}

// Update the answered count display
function updateAnsweredCount() {
    const count = Object.keys(answers).length;
    document.getElementById('answeredCount').textContent = count;
    
    const submitBtn = document.getElementById('submitBtn');
    submitBtn.disabled = count < questions.length;
}

// Calculate scores from answers
function calculateScores() {
    Object.keys(scores).forEach(sign => scores[sign] = 0);
    
    Object.entries(answers).forEach(([qIndex, optIndex]) => {
        const question = questions[parseInt(qIndex)];
        const option = question.options[optIndex];
        
        Object.entries(option.scores).forEach(([sign, points]) => {
            scores[sign] += points;
        });
    });
    
    const totalPoints = Object.values(scores).reduce((a, b) => a + b, 0);
    
    sortedResults = Object.entries(scores).map(([sign, points]) => ({
        sign,
        percentage: totalPoints > 0 ? Math.round((points / totalPoints) * 100) : 0,
        points
    })).sort((a, b) => b.percentage - a.percentage);
}

// Show results
function showResults() {
    if (Object.keys(answers).length < questions.length) {
        for (let i = 0; i < questions.length; i++) {
            if (answers[i] === undefined) {
                document.getElementById(`question-${i}`).scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'center' 
                });
                document.getElementById(`question-${i}`).style.animation = 'shake 0.5s ease';
                setTimeout(() => {
                    document.getElementById(`question-${i}`).style.animation = '';
                }, 500);
                return;
            }
        }
        return;
    }
    
    calculateScores();
    
    document.getElementById('quizMain').style.display = 'none';
    document.getElementById('results').classList.remove('hidden');
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Track quiz completion
    trackEvent('quiz_completed', {
        dominant_sign: sortedResults[0].sign,
        dominant_percentage: sortedResults[0].percentage
    });
    
    // Display top 3 signs
    const topSignsContainer = document.getElementById('topSigns');
    topSignsContainer.innerHTML = '';
    
    const ranks = ['Dominant', 'Secondary', 'Tertiary'];
    
    sortedResults.slice(0, 3).forEach((result, index) => {
        const signData = zodiacSigns[result.sign];
        const card = document.createElement('div');
        card.className = `top-sign-card ${index === 0 ? 'first' : ''}`;
        card.innerHTML = `
            <span class="sign-rank">${ranks[index]}</span>
            <span class="sign-symbol">${signData.symbol}</span>
            <h3 class="sign-name">${signData.name}</h3>
            <div class="sign-percentage">${result.percentage}%</div>
            <p class="sign-traits">${signData.traits}</p>
        `;
        
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
            card.style.transition = 'all 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 150);
        
        topSignsContainer.appendChild(card);
    });
    
    // Display all signs
    const allSignsContainer = document.getElementById('allSigns');
    allSignsContainer.innerHTML = '';
    
    sortedResults.forEach((result, index) => {
        const signData = zodiacSigns[result.sign];
        const bar = document.createElement('div');
        bar.className = 'sign-bar';
        bar.innerHTML = `
            <span class="sign-bar-symbol">${signData.symbol}</span>
            <div class="sign-bar-info">
                <div class="sign-bar-header">
                    <span class="sign-bar-name">${signData.name}</span>
                    <span class="sign-bar-percent">${result.percentage}%</span>
                </div>
                <div class="sign-bar-track">
                    <div class="sign-bar-fill ${result.sign}" style="width: 0%"></div>
                </div>
            </div>
        `;
        
        allSignsContainer.appendChild(bar);
        
        setTimeout(() => {
            const fill = bar.querySelector('.sign-bar-fill');
            fill.style.width = `${result.percentage}%`;
        }, 500 + index * 40);
    });
    
    // Generate accuracy banner
    generateAccuracyBanner();
    
    // Generate personalized summary
    generateResultsSummary();
    
    // Generate compatibility teaser
    generateCompatibilityTeaser();
    
    // Generate sneak peek
    generateSneakPeek();
    
    // Update blurred preview text based on results
    updatePreviewText();
}

// Track event in Google Analytics
function trackEvent(eventName, eventParams = {}) {
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, eventParams);
        console.log('📊 Tracked:', eventName, eventParams);
    }
}

// Generate accuracy banner at top of results
function generateAccuracyBanner() {
    const container = document.getElementById('resultsAccuracy');
    const topSign = zodiacSigns[sortedResults[0].sign].name;
    const percentage = sortedResults[0].percentage;
    
    // Randomly select one of several accuracy messages
    const messages = [
        { strong: `${percentage}% ${topSign} — that's a strong match!`, text: `Most people score between 12-18% for their dominant sign. Your ${percentage}% is above average clarity.` },
        { strong: `Your cosmic signature is unusually clear`, text: `With ${topSign} at ${percentage}%, your personality aligns strongly with this archetype. This makes your report extra insightful.` },
        { strong: `Interesting profile detected`, text: `Your ${topSign}-dominant results match patterns we see in people who describe themselves as highly self-aware.` }
    ];
    
    const msg = messages[Math.floor(Math.random() * messages.length)];
    
    container.innerHTML = `
        <span class="accuracy-icon">✅</span>
        <div class="accuracy-text">
            <strong>${msg.strong}</strong>
            <span>${msg.text}</span>
        </div>
    `;
}

// Generate sneak peek from paid report
function generateSneakPeek() {
    const container = document.getElementById('sneakPeek');
    const sign1 = sortedResults[0].sign;
    const sign2 = sortedResults[1].sign;
    const signName1 = zodiacSigns[sign1].name;
    const signName2 = zodiacSigns[sign2].name;
    
    const peekContent = getSneakPeekContent(sign1, sign2);
    
    container.innerHTML = `
        <h4>👀 Sneak Peek: Your Hidden Pattern</h4>
        <div class="sneak-peek-content">
            ${peekContent}
        </div>
        <p class="sneak-peek-cta">This is just 1 of 12 deep-dive sections in your full report. <strong>Unlock all insights →</strong></p>
    `;
}

function getSneakPeekContent(sign1, sign2) {
    const patterns = {
        aries: {
            pattern: `As a <strong>${zodiacSigns[sign1].name}</strong> dominant, you have what we call the "Starter's Curse." You get incredibly excited about new projects, relationships, and ideas — that initial spark is intoxicating. But once the novelty wears off? You're already looking at the next shiny thing.`,
            insight: `This isn't a flaw — it's your superpower misapplied. Your gift is <em>initiating</em>, not maintaining. The key is partnering with people who love the follow-through you hate.`
        },
        taurus: {
            pattern: `Your <strong>${zodiacSigns[sign1].name}</strong> energy creates what we call the "Comfort Trap." You build a beautiful, stable life... and then resist any change that might improve it. That job you've outgrown? That relationship that's "fine"? You stay because leaving feels like loss.`,
            insight: `Your loyalty is beautiful, but sometimes it becomes a cage. The full report reveals the specific areas where your resistance to change may be holding you back.`
        },
        gemini: {
            pattern: `With <strong>${zodiacSigns[sign1].name}</strong> dominant, you experience "The Scattered Genius Effect." Your mind moves so fast that others can't keep up. You've been called "flaky" or "all over the place" — but really, you've just already processed what they're still figuring out.`,
            insight: `The world wasn't built for your speed. Your full report includes strategies for channeling your mental energy without burning out or alienating slower thinkers.`
        },
        cancer: {
            pattern: `Your <strong>${zodiacSigns[sign1].name}</strong> nature creates "The Emotional Sponge Syndrome." You absorb the feelings of everyone around you — and often can't tell which emotions are yours. That anxiety you feel? It might be your partner's. That sadness? Could be your friend's.`,
            insight: `This is both your greatest gift and your heaviest burden. Your full report teaches you how to set energetic boundaries without losing your empathic abilities.`
        },
        leo: {
            pattern: `As a <strong>${zodiacSigns[sign1].name}</strong> dominant, you experience "The Spotlight Paradox." You crave recognition and validation — but when you get it, part of you wonders if people see the <em>real</em> you, or just the performance. Are they clapping for you, or your mask?`,
            insight: `Behind the confidence is a fear of being ordinary. Your full report explores why external validation never quite fills the void — and what will.`
        },
        virgo: {
            pattern: `Your <strong>${zodiacSigns[sign1].name}</strong> energy creates "The Perfectionist's Prison." Nothing is ever good enough — especially yourself. You replay conversations, obsess over mistakes, and hold yourself to standards you'd never apply to anyone else.`,
            insight: `Your critical eye is a gift when directed outward (hello, problem-solving superstar). The full report shows you how to turn down the volume on your inner critic.`
        },
        libra: {
            pattern: `With <strong>${zodiacSigns[sign1].name}</strong> dominant, you suffer from "The People-Pleaser's Dilemma." You're so good at seeing all sides that you lose track of your own. When's the last time you made a decision based purely on what YOU wanted?`,
            insight: `Your harmony-seeking nature means you've probably abandoned parts of yourself to keep the peace. Your full report identifies what you've lost — and how to reclaim it.`
        },
        scorpio: {
            pattern: `Your <strong>${zodiacSigns[sign1].name}</strong> nature creates "The Intensity Paradox." You want deep, transformative connection — but you test people before you trust them. You push to see if they'll stay. And sometimes... you push them away before they can leave you.`,
            insight: `Your fear of betrayal creates the very distance you're trying to avoid. Your full report reveals your specific trust patterns and how to break the cycle.`
        },
        sagittarius: {
            pattern: `As a <strong>${zodiacSigns[sign1].name}</strong> dominant, you experience "The Escape Artist Syndrome." When things get hard — emotionally, professionally, relationally — your instinct is to run. New city, new job, new relationship. Fresh start. Again.`,
            insight: `Freedom isn't running away; it's the ability to stay AND go. Your full report explores what you're actually running from (hint: it follows you everywhere).`
        },
        capricorn: {
            pattern: `Your <strong>${zodiacSigns[sign1].name}</strong> energy creates "The Achievement Treadmill." You hit a goal, feel good for approximately 5 minutes, then immediately set a bigger one. Rest feels like laziness. You're not sure who you are when you're not climbing.`,
            insight: `Your worth isn't measured in accomplishments — but you don't believe that yet. Your full report addresses the fear that drives your relentless ambition.`
        },
        aquarius: {
            pattern: `With <strong>${zodiacSigns[sign1].name}</strong> dominant, you experience "The Outsider Complex." You feel different from everyone else — like you're observing humanity from the outside. Connected to the collective, yet lonely in a crowd.`,
            insight: `Your "weird" is your gift to the world. Your full report explores why fitting in was never your path — and how to find your true community.`
        },
        pisces: {
            pattern: `Your <strong>${zodiacSigns[sign1].name}</strong> nature creates "The Escapism Cycle." Reality is harsh, and you feel everything so deeply. So you retreat — into fantasy, substances, sleep, or screens. Coming back to the "real world" feels like waking up to cold water.`,
            insight: `You're not weak for needing to escape; you're sensitive in a world that isn't. Your full report teaches you healthier ways to recharge without losing yourself.`
        }
    };
    
    const content = patterns[sign1];
    return `<p>${content.pattern}</p><p>${content.insight}</p>`;
}

// Generate results summary
function generateResultsSummary() {
    const container = document.getElementById('resultsSummary');
    const top1 = sortedResults[0];
    const top2 = sortedResults[1];
    const top3 = sortedResults[2];
    
    const sign1 = zodiacSigns[top1.sign];
    const sign2 = zodiacSigns[top2.sign];
    const sign3 = zodiacSigns[top3.sign];
    
    // Check if top 2 are close (within 3%)
    const isClose = Math.abs(top1.percentage - top2.percentage) <= 3;
    
    // Get element descriptions
    const elements = {
        aries: 'Fire', taurus: 'Earth', gemini: 'Air', cancer: 'Water',
        leo: 'Fire', virgo: 'Earth', libra: 'Air', scorpio: 'Water',
        sagittarius: 'Fire', capricorn: 'Earth', aquarius: 'Air', pisces: 'Water'
    };
    
    const element1 = elements[top1.sign];
    const element2 = elements[top2.sign];
    
    let summary = '';
    
    if (isClose) {
        summary = `You're a <strong>${sign1.name}-${sign2.name} blend</strong> — a dynamic mix of ${sign1.traits.split(',')[0].toLowerCase()} and ${sign2.traits.split(',')[0].toLowerCase()} energy. When these two signs are this close, it means you don't fit neatly into one box. You likely shift between ${sign1.name}'s ${sign1.traits.split(',')[1]?.toLowerCase() || 'drive'} and ${sign2.name}'s ${sign2.traits.split(',')[1]?.toLowerCase() || 'nature'} depending on the situation.`;
    } else {
        summary = `Your dominant sign is <strong>${sign1.name}</strong> — you lead with ${sign1.traits.split(',')[0].toLowerCase()} energy and ${sign1.traits.split(',')[1]?.toLowerCase() || sign1.traits.split(',')[0].toLowerCase()} instincts. Your secondary ${sign2.name} influence (${top2.percentage}%) adds a layer of ${sign2.traits.split(',')[0].toLowerCase()} to your personality.`;
    }
    
    // Add element insight
    let elementInsight = '';
    if (element1 === element2) {
        elementInsight = `Both your top signs are <strong>${element1} signs</strong>, which amplifies your ${getElementTraits(element1)} nature.`;
    } else {
        elementInsight = `Your mix of <strong>${element1}</strong> (${sign1.name}) and <strong>${element2}</strong> (${sign2.name}) creates an interesting tension between ${getElementTraits(element1)} and ${getElementTraits(element2)}.`;
    }
    
    // Get personalized "so true" insights
    const personalInsights = getPersonalizedInsights(top1.sign, top2.sign);
    
    container.innerHTML = `
        <h3>What This Means</h3>
        <p>${summary}</p>
        <p>${elementInsight}</p>
        <div class="insight-callouts">
            <div class="insight-item">
                <span class="insight-icon">🎯</span>
                <p>${personalInsights.strength}</p>
            </div>
            <div class="insight-item">
                <span class="insight-icon">😅</span>
                <p>${personalInsights.quirk}</p>
            </div>
            <div class="insight-item">
                <span class="insight-icon">💭</span>
                <p>${personalInsights.secret}</p>
            </div>
        </div>
        <p class="note">This quiz measures your personality traits, not your birth chart. Many people don't match their sun sign — and that's completely normal!</p>
    `;
}

// Get personalized "so true" insights based on signs
function getPersonalizedInsights(sign1, sign2) {
    const insights = {
        aries: {
            strength: "You're the friend everyone calls when they need someone to take charge. You don't wait for permission — you just do it.",
            quirk: "You've probably started multiple projects this week... and finished maybe one of them. Starting is more fun than finishing, right?",
            secret: "You act tough, but you secretly need people to recognize your efforts. A little appreciation goes a long way with you."
        },
        taurus: {
            strength: "When you commit to something (or someone), you're ALL in. Your loyalty is unmatched — people can always count on you.",
            quirk: "You've definitely rewatched the same comfort show 5+ times. Why try something new when the old thing is perfect?",
            secret: "Change terrifies you more than you'd ever admit. You need time to process before you can accept anything new."
        },
        gemini: {
            strength: "You can talk to literally anyone about anything. You collect interesting facts like others collect stamps.",
            quirk: "Your browser has 47 tabs open right now, doesn't it? And somehow you know what's in each one.",
            secret: "People think you're scattered, but you actually remember everything. You just pretend not to sometimes."
        },
        cancer: {
            strength: "You remember birthdays, check in on friends, and always know when something's wrong before anyone says it.",
            quirk: "You've definitely cried at a commercial before. Probably the one with the dog. Or the one about family.",
            secret: "You absorb everyone else's emotions like a sponge. Sometimes you're not even sure which feelings are yours."
        },
        leo: {
            strength: "When you walk into a room, people notice. You have this natural warmth that makes others feel special.",
            quirk: "You've checked how many likes your last post got more than once today. It's okay, we won't tell.",
            secret: "Behind the confidence, you're terrified of being forgotten or overlooked. You need to feel seen."
        },
        virgo: {
            strength: "You notice details everyone else misses. Your mental to-do list has a to-do list of its own.",
            quirk: "You've reorganized something in your home this week 'just because.' The spice rack didn't need it, but here we are.",
            secret: "You're your own worst critic. The voice in your head is way harder on you than anyone else would ever be."
        },
        libra: {
            strength: "You can see every side of every argument. People come to you because you actually listen and don't judge.",
            quirk: "Choosing where to eat is genuinely stressful for you. Every option has pros and cons that need weighing.",
            secret: "You avoid conflict so much that sometimes you lose yourself trying to keep everyone else happy."
        },
        scorpio: {
            strength: "You see through people's BS instantly. Your intuition about others is almost unsettlingly accurate.",
            quirk: "You've definitely done a deep social media dive on someone at 2am. Research purposes only, obviously.",
            secret: "You feel everything at 1000%. When you love, it's intense. When you're hurt, it's devastating."
        },
        sagittarius: {
            strength: "Your optimism is contagious. You genuinely believe things will work out — and somehow they usually do.",
            quirk: "You've booked a trip or made plans on impulse and figured out the details later. YOLO is basically your motto.",
            secret: "Running away from problems is easier than facing them. Freedom sometimes means avoiding hard conversations."
        },
        capricorn: {
            strength: "You have a 5-year plan. Possibly a 10-year plan. And you're actually sticking to it.",
            quirk: "You've worked through lunch, on vacation, or replied to emails at midnight 'just to stay on top of things.'",
            secret: "You're terrified of being seen as a failure. The pressure you put on yourself is crushing sometimes."
        },
        aquarius: {
            strength: "You think different. While everyone follows the crowd, you're three steps ahead with a better idea.",
            quirk: "You've been called 'weird' and took it as a compliment. Normal is boring anyway.",
            secret: "You feel like an outsider more than you let on. Deeply connected to humanity, but lonely in crowds."
        },
        pisces: {
            strength: "Your empathy is a superpower. You feel what others feel, often before they even know it themselves.",
            quirk: "You've daydreamed so hard you missed your exit. Or your stop. Or what someone just said to you.",
            secret: "Reality is exhausting. You escape into fantasy, art, or sleep because the real world is just... a lot."
        }
    };
    
    // Mix primary and secondary sign insights
    const primary = insights[sign1];
    const secondary = insights[sign2];
    
    return {
        strength: primary.strength,
        quirk: primary.quirk,
        secret: secondary.secret
    };
}

function getElementTraits(element) {
    const traits = {
        'Fire': 'passion and action',
        'Earth': 'stability and practicality', 
        'Air': 'intellect and communication',
        'Water': 'emotion and intuition'
    };
    return traits[element] || 'unique energy';
}

// Generate compatibility teaser
function generateCompatibilityTeaser() {
    const container = document.getElementById('compatibilityTeaser');
    const topSign = sortedResults[0].sign;
    
    // Compatibility data with relationship insights
    const compatData = {
        aries: { 
            best: ['leo', 'sagittarius', 'gemini'], 
            challenging: ['cancer', 'capricorn'],
            bestWhy: "They match your energy and won't slow you down. You need someone who can keep up!",
            challengeWhy: "They want security and planning. You want freedom and spontaneity. Friction city."
        },
        taurus: { 
            best: ['virgo', 'capricorn', 'cancer'], 
            challenging: ['leo', 'aquarius'],
            bestWhy: "They appreciate the finer things and value loyalty as much as you do.",
            challengeWhy: "They crave attention and change. You need stability and consistency. Oil and water."
        },
        gemini: { 
            best: ['libra', 'aquarius', 'aries'], 
            challenging: ['virgo', 'pisces'],
            bestWhy: "They stimulate your mind and never bore you. You need intellectual chemistry!",
            challengeWhy: "They're too sensitive or critical for your playful energy. You feel misunderstood."
        },
        cancer: { 
            best: ['scorpio', 'pisces', 'taurus'], 
            challenging: ['aries', 'libra'],
            bestWhy: "They understand your emotional depth and make you feel truly safe and seen.",
            challengeWhy: "They're too detached or aggressive. You need emotional security, not independence."
        },
        leo: { 
            best: ['aries', 'sagittarius', 'gemini'], 
            challenging: ['taurus', 'scorpio'],
            bestWhy: "They adore you, hype you up, and let you shine. You need a cheerleader!",
            challengeWhy: "They compete with you or try to control you. Only room for one star? That's you."
        },
        virgo: { 
            best: ['taurus', 'capricorn', 'cancer'], 
            challenging: ['gemini', 'sagittarius'],
            bestWhy: "They're grounded, reliable, and appreciate your attention to detail.",
            challengeWhy: "They're too chaotic and inconsistent. You need someone who has their life together."
        },
        libra: { 
            best: ['gemini', 'aquarius', 'leo'], 
            challenging: ['cancer', 'capricorn'],
            bestWhy: "They bring beauty, intellect, and social grace into your life. Perfect harmony!",
            challengeWhy: "They're too needy or too serious. You need lightness and balance, not heaviness."
        },
        scorpio: { 
            best: ['cancer', 'pisces', 'virgo'], 
            challenging: ['leo', 'aquarius'],
            bestWhy: "They go deep with you emotionally and aren't afraid of your intensity.",
            challengeWhy: "They're too shallow or emotionally unavailable. You need ALL of someone, not just surface."
        },
        sagittarius: { 
            best: ['aries', 'leo', 'libra'], 
            challenging: ['virgo', 'pisces'],
            bestWhy: "They're adventurous, optimistic, and don't try to clip your wings.",
            challengeWhy: "They're too sensitive or critical. You need freedom, not someone who takes everything personally."
        },
        capricorn: { 
            best: ['taurus', 'virgo', 'scorpio'], 
            challenging: ['aries', 'libra'],
            bestWhy: "They respect your ambition and build empires with you, not against you.",
            challengeWhy: "They're too impulsive or indecisive. You need a partner with a plan, not chaos."
        },
        aquarius: { 
            best: ['gemini', 'libra', 'sagittarius'], 
            challenging: ['taurus', 'scorpio'],
            bestWhy: "They respect your independence and love your weird brain. No judgment, just curiosity.",
            challengeWhy: "They're too possessive or emotionally demanding. You need space to breathe!"
        },
        pisces: { 
            best: ['cancer', 'scorpio', 'taurus'], 
            challenging: ['gemini', 'sagittarius'],
            bestWhy: "They protect your soft heart and create a safe emotional cocoon with you.",
            challengeWhy: "They're too logical or restless. You need someone who speaks the language of feelings."
        }
    };
    
    const compat = compatData[topSign];
    const topSignName = zodiacSigns[topSign].name;
    
    let matchesHTML = '';
    
    // Show top 3 best matches
    compat.best.forEach((sign, i) => {
        const signData = zodiacSigns[sign];
        const scores = [95, 88, 82];
        matchesHTML += `
            <div class="compat-match">
                <span class="match-symbol">${signData.symbol}</span>
                <span class="match-name">${signData.name}</span>
                <span class="match-score">${scores[i]}% match</span>
            </div>
        `;
    });
    
    // Show 1 challenging match
    const challengeSign = zodiacSigns[compat.challenging[0]];
    matchesHTML += `
        <div class="compat-match challenging">
            <span class="match-symbol">${challengeSign.symbol}</span>
            <span class="match-name">${challengeSign.name}</span>
            <span class="match-score">45% match</span>
        </div>
    `;
    
    container.innerHTML = `
        <h3>💕 Your Love Compatibility</h3>
        <p class="teaser-subtitle">Based on your ${topSignName} dominant energy</p>
        <div class="compat-preview">
            ${matchesHTML}
        </div>
        <div class="compat-insight">
            <p><strong>Why these work for you:</strong> ${compat.bestWhy}</p>
            <p class="challenge-text"><strong>Why ${challengeSign.name} is tricky:</strong> ${compat.challengeWhy}</p>
        </div>
        <p class="compat-cta">Your full report includes compatibility breakdowns for <strong>all 12 signs</strong>, communication tips for each pairing, and how to make challenging matches work.</p>
    `;
}

// Update preview cards with personalized teaser text
function updatePreviewText() {
    const top1 = zodiacSigns[sortedResults[0].sign].name;
    const top2 = zodiacSigns[sortedResults[1].sign].name;
    const top3 = zodiacSigns[sortedResults[2].sign].name;
    
    const previews = document.querySelectorAll('.preview-card .preview-text');
    
    previews[0].textContent = `Your ${top1} dominance combined with ${top2} undertones creates a rare intensity that draws others to you. This combination suggests...`;
    previews[1].textContent = `With your cosmic profile, you're most compatible with partners who have strong ${top3} or ${top2} energy. Your ${top1} nature means...`;
    previews[2].textContent = `Your ${top1}-${top2} combination suggests you thrive in roles that require both leadership and ${zodiacSigns[sortedResults[2].sign].traits.split(',')[0].toLowerCase()}...`;
    previews[3].textContent = `Your ${top1} energy gives you natural ${zodiacSigns[sortedResults[0].sign].traits.split(',')[0].toLowerCase()}, but watch for the shadow side of ${top2} influence...`;
}

// Show premium report (can be called after Stripe redirect with success param)
function showPremiumReport() {
    document.getElementById('results').classList.add('hidden');
    document.getElementById('premiumReport').classList.remove('hidden');
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    const top3 = sortedResults.slice(0, 3);
    const topSign = zodiacSigns[top3[0].sign];
    const secondSign = zodiacSigns[top3[1].sign];
    const thirdSign = zodiacSigns[top3[2].sign];
    
    document.getElementById('reportSubtitle').textContent = `${topSign.name} Dominant · ${secondSign.name} Rising`;
    
    const content = document.getElementById('premiumContent');
    content.innerHTML = `
        <!-- Overview -->
        <div class="report-section">
            <div class="report-section-header">
                <span class="report-section-icon">🌟</span>
                <h3 class="report-section-title">Your Cosmic Overview</h3>
            </div>
            <div class="report-section-content">
                <p>Your dominant sign is <strong>${topSign.name}</strong> (${top3[0].percentage}%), giving you the core traits of being ${topSign.traits.toLowerCase()}. This is beautifully complemented by your secondary <strong>${secondSign.name}</strong> energy (${top3[1].percentage}%), which adds depth through ${secondSign.traits.split(',')[0].toLowerCase()} qualities.</p>
                <p>The presence of <strong>${thirdSign.name}</strong> (${top3[2].percentage}%) in your profile adds an interesting dimension—you likely find yourself drawn to ${thirdSign.traits.split(',')[2]?.toLowerCase() || thirdSign.traits.split(',')[0].toLowerCase()} pursuits, especially during times of stress or important decisions.</p>
                <p>This particular combination appears in only about 3% of quiz takers, making your cosmic blueprint quite rare.</p>
            </div>
        </div>
        
        <!-- Personality Deep Dive -->
        <div class="report-section">
            <div class="report-section-header">
                <span class="report-section-icon">💫</span>
                <h3 class="report-section-title">Personality Deep Dive</h3>
            </div>
            <div class="report-section-content">
                <p><strong>Your Core Nature:</strong> As a ${topSign.name}-dominant individual, you approach life with ${getPersonalityText(top3[0].sign)}.</p>
                <p><strong>Hidden Depths:</strong> Your ${secondSign.name} influence means that beneath your ${topSign.name} exterior lies ${getHiddenDepthText(top3[1].sign)}.</p>
                <p><strong>Your Superpower:</strong> The combination of ${topSign.name} and ${secondSign.name} gives you the rare ability to ${getSuperpower(top3[0].sign, top3[1].sign)}.</p>
            </div>
        </div>
        
        <!-- Love & Compatibility -->
        <div class="report-section">
            <div class="report-section-header">
                <span class="report-section-icon">💕</span>
                <h3 class="report-section-title">Love & Compatibility</h3>
            </div>
            <div class="report-section-content">
                <p>With your ${topSign.name}-${secondSign.name} profile, you're naturally drawn to partners who can match your ${topSign.traits.split(',')[0].toLowerCase()} while also appreciating your need for ${secondSign.traits.split(',')[1]?.toLowerCase() || 'connection'}.</p>
                <p><strong>Best matches:</strong> ${getCompatibleSigns(top3[0].sign)}</p>
                <p><strong>Challenging matches:</strong> ${getChallengingSigns(top3[0].sign)}</p>
                <div class="compatibility-grid">
                    ${generateCompatibilityGrid(top3[0].sign)}
                </div>
            </div>
        </div>
        
        <!-- Career & Purpose -->
        <div class="report-section">
            <div class="report-section-header">
                <span class="report-section-icon">💼</span>
                <h3 class="report-section-title">Career & Purpose</h3>
            </div>
            <div class="report-section-content">
                <p>Your ${topSign.name} drive combined with ${secondSign.name} ${secondSign.traits.split(',')[0].toLowerCase()} makes you ideally suited for careers that ${getCareerText(top3[0].sign, top3[1].sign)}.</p>
                <p><strong>Ideal career paths:</strong> ${getCareerPaths(top3[0].sign)}</p>
                <p><strong>Work environment:</strong> You thrive in settings that offer ${getWorkEnvironment(top3[0].sign, top3[1].sign)}.</p>
            </div>
        </div>
        
        <!-- Strengths & Shadows -->
        <div class="report-section">
            <div class="report-section-header">
                <span class="report-section-icon">⚡</span>
                <h3 class="report-section-title">Strengths & Shadow Traits</h3>
            </div>
            <div class="report-section-content">
                <p><strong>Your Greatest Strengths:</strong></p>
                <p>• ${getStrengths(top3[0].sign, top3[1].sign)}</p>
                <p><strong>Shadow Traits to Watch:</strong></p>
                <p>• ${getShadowTraits(top3[0].sign, top3[1].sign)}</p>
                <p><strong>Growth Opportunity:</strong> ${getGrowthOpportunity(top3[0].sign)}</p>
            </div>
        </div>
        
        <!-- All Signs Breakdown -->
        <div class="report-section">
            <div class="report-section-header">
                <span class="report-section-icon">✨</span>
                <h3 class="report-section-title">Complete Sign Breakdown</h3>
            </div>
            <div class="report-section-content">
                ${generateFullBreakdown()}
            </div>
        </div>
    `;
}

// Helper functions for generating report content
function getPersonalityText(sign) {
    const texts = {
        aries: "boldness and initiative. You're a natural starter, always ready to take the lead and pioneer new paths",
        taurus: "patience and determination. You build things that last, preferring quality over speed",
        gemini: "curiosity and adaptability. Your mind is constantly seeking new information and connections",
        cancer: "emotional intelligence and nurturing instincts. You create safety for those you love",
        leo: "confidence and warmth. You naturally draw others in with your generous spirit",
        virgo: "precision and helpfulness. You notice what others miss and strive for excellence",
        libra: "harmony and fairness. You seek balance in all things and value partnership",
        scorpio: "intensity and depth. You don't do anything halfway and seek transformation",
        sagittarius: "optimism and adventure. You're always looking toward the next horizon",
        capricorn: "discipline and ambition. You play the long game and build lasting success",
        aquarius: "originality and humanitarian vision. You think differently and care about the collective",
        pisces: "empathy and creativity. You feel deeply and express yourself through artistic means"
    };
    return texts[sign] || texts.aries;
}

function getHiddenDepthText(sign) {
    const texts = {
        aries: "a fierce protector who will fight for what they believe in",
        taurus: "a deep appreciation for sensory pleasures and material security",
        gemini: "a constantly curious mind that never stops learning",
        cancer: "profound emotional wisdom and protective instincts",
        leo: "a desire for recognition and a generous heart",
        virgo: "perfectionist tendencies and a desire to be truly useful",
        libra: "a deep need for partnership and aesthetic beauty",
        scorpio: "intense emotions and transformative power",
        sagittarius: "a philosophical seeker always chasing meaning",
        capricorn: "serious ambition and a desire for lasting achievement",
        aquarius: "revolutionary ideas and a need for freedom",
        pisces: "boundless compassion and spiritual depth"
    };
    return texts[sign] || texts.aries;
}

function getSuperpower(sign1, sign2) {
    return `combine ${zodiacSigns[sign1].traits.split(',')[0].toLowerCase()} action with ${zodiacSigns[sign2].traits.split(',')[0].toLowerCase()} insight, making you exceptionally effective at achieving your goals while maintaining important relationships`;
}

function getCompatibleSigns(sign) {
    const compat = {
        aries: "Leo, Sagittarius, Gemini, Aquarius",
        taurus: "Virgo, Capricorn, Cancer, Pisces",
        gemini: "Libra, Aquarius, Aries, Leo",
        cancer: "Scorpio, Pisces, Taurus, Virgo",
        leo: "Aries, Sagittarius, Gemini, Libra",
        virgo: "Taurus, Capricorn, Cancer, Scorpio",
        libra: "Gemini, Aquarius, Leo, Sagittarius",
        scorpio: "Cancer, Pisces, Virgo, Capricorn",
        sagittarius: "Aries, Leo, Libra, Aquarius",
        capricorn: "Taurus, Virgo, Scorpio, Pisces",
        aquarius: "Gemini, Libra, Aries, Sagittarius",
        pisces: "Cancer, Scorpio, Taurus, Capricorn"
    };
    return compat[sign] || compat.aries;
}

function getChallengingSigns(sign) {
    const chall = {
        aries: "Cancer, Capricorn",
        taurus: "Leo, Aquarius",
        gemini: "Virgo, Pisces",
        cancer: "Aries, Libra",
        leo: "Taurus, Scorpio",
        virgo: "Gemini, Sagittarius",
        libra: "Cancer, Capricorn",
        scorpio: "Leo, Aquarius",
        sagittarius: "Virgo, Pisces",
        capricorn: "Aries, Libra",
        aquarius: "Taurus, Scorpio",
        pisces: "Gemini, Sagittarius"
    };
    return chall[sign] || chall.aries;
}

function generateCompatibilityGrid(sign) {
    const scores = {
        aries: { leo: 95, sagittarius: 90, gemini: 85, aquarius: 80, libra: 75 },
        taurus: { virgo: 95, capricorn: 90, cancer: 85, pisces: 80, scorpio: 75 },
        gemini: { libra: 95, aquarius: 90, aries: 85, leo: 80, sagittarius: 70 },
        cancer: { scorpio: 95, pisces: 90, taurus: 85, virgo: 80, capricorn: 75 },
        leo: { aries: 95, sagittarius: 90, gemini: 85, libra: 80, aquarius: 70 },
        virgo: { taurus: 95, capricorn: 90, cancer: 85, scorpio: 80, pisces: 75 },
        libra: { gemini: 95, aquarius: 90, leo: 85, sagittarius: 80, aries: 75 },
        scorpio: { cancer: 95, pisces: 90, virgo: 85, capricorn: 80, taurus: 75 },
        sagittarius: { aries: 95, leo: 90, libra: 85, aquarius: 80, gemini: 75 },
        capricorn: { taurus: 95, virgo: 90, scorpio: 85, pisces: 80, cancer: 75 },
        aquarius: { gemini: 95, libra: 90, aries: 85, sagittarius: 80, leo: 70 },
        pisces: { cancer: 95, scorpio: 90, taurus: 85, capricorn: 80, virgo: 75 }
    };
    
    const signScores = scores[sign] || scores.aries;
    let html = '';
    
    Object.entries(signScores).forEach(([s, score]) => {
        html += `
            <div class="compat-item">
                <span class="compat-symbol">${zodiacSigns[s].symbol}</span>
                <span class="compat-name">${zodiacSigns[s].name}</span>
                <span class="compat-score">${score}%</span>
            </div>
        `;
    });
    
    return html;
}

function getCareerText(sign1, sign2) {
    return `allow you to take initiative while also utilizing your ${zodiacSigns[sign2].traits.split(',')[0].toLowerCase()} nature`;
}

function getCareerPaths(sign) {
    const paths = {
        aries: "Entrepreneurship, Sales Leadership, Athletics, Emergency Services, Military",
        taurus: "Finance, Real Estate, Culinary Arts, Agriculture, Music",
        gemini: "Journalism, Marketing, Teaching, Writing, Social Media",
        cancer: "Healthcare, Counseling, Real Estate, Hospitality, Childcare",
        leo: "Entertainment, Executive Leadership, Design, Politics, Coaching",
        virgo: "Healthcare, Research, Editing, Accounting, Quality Assurance",
        libra: "Law, Diplomacy, Design, HR, Wedding Planning",
        scorpio: "Psychology, Investigation, Surgery, Research, Finance",
        sagittarius: "Travel Industry, Education, Publishing, Philosophy, Sports",
        capricorn: "Executive Management, Engineering, Architecture, Government, Banking",
        aquarius: "Technology, Science, Non-profits, Aviation, Invention",
        pisces: "Arts, Healing Professions, Music, Photography, Spiritual Work"
    };
    return paths[sign] || paths.aries;
}

function getWorkEnvironment(sign1, sign2) {
    return `both independence and collaboration, where your ${zodiacSigns[sign1].traits.split(',')[0].toLowerCase()} nature can shine while your ${zodiacSigns[sign2].traits.split(',')[0].toLowerCase()} side feels supported`;
}

function getStrengths(sign1, sign2) {
    return `Natural ${zodiacSigns[sign1].traits.split(',')[0].toLowerCase()}, combined with ${zodiacSigns[sign2].traits.split(',')[1]?.toLowerCase() || zodiacSigns[sign2].traits.split(',')[0].toLowerCase()}\n• Ability to inspire others while staying grounded\n• Resilience in the face of challenges`;
}

function getShadowTraits(sign1, sign2) {
    const shadows = {
        aries: "impatience and aggression when frustrated",
        taurus: "stubbornness and resistance to necessary change",
        gemini: "inconsistency and superficiality under stress",
        cancer: "moodiness and emotional manipulation",
        leo: "pride and attention-seeking behavior",
        virgo: "overcritical nature and perfectionism paralysis",
        libra: "indecisiveness and people-pleasing",
        scorpio: "jealousy and vengeful tendencies",
        sagittarius: "tactlessness and overcommitment",
        capricorn: "pessimism and workaholism",
        aquarius: "emotional detachment and contrarianism",
        pisces: "escapism and victim mentality"
    };
    return `${shadows[sign1]}\n• When stressed, may exhibit ${shadows[sign2]}`;
}

function getGrowthOpportunity(sign) {
    const growth = {
        aries: "Practice patience and listen before acting. Your impulsiveness can be tempered into powerful decisiveness.",
        taurus: "Embrace change as an opportunity. Your stability is a strength, but flexibility opens new doors.",
        gemini: "Cultivate depth alongside breadth. Your curiosity can lead to mastery, not just familiarity.",
        cancer: "Set boundaries while staying nurturing. Your care for others shouldn't come at your expense.",
        leo: "Share the spotlight generously. True leadership elevates others alongside yourself.",
        virgo: "Accept imperfection as human. Your standards inspire growth when balanced with compassion.",
        libra: "Make decisions from your center. Balance includes honoring your own needs equally.",
        scorpio: "Release control and trust the process. Transformation often requires surrender.",
        sagittarius: "Follow through on commitments. Your vision becomes reality through consistent action.",
        capricorn: "Celebrate progress, not just achievement. The journey matters as much as the summit.",
        aquarius: "Connect emotionally, not just intellectually. Your ideas land deeper with heart.",
        pisces: "Ground your dreams in action. Your vision needs structure to manifest in the world."
    };
    return growth[sign] || growth.aries;
}

function generateFullBreakdown() {
    let html = '';
    sortedResults.forEach((result, index) => {
        const signData = zodiacSigns[result.sign];
        html += `<p><strong>${signData.symbol} ${signData.name} (${result.percentage}%):</strong> ${getSignInfluence(result.sign, result.percentage, index)}</p>`;
    });
    return html;
}

function getSignInfluence(sign, percentage, rank) {
    if (percentage < 5) {
        return `Minimal influence. This energy is not strongly present in your chart.`;
    } else if (percentage < 10) {
        return `Subtle influence. You may notice ${zodiacSigns[sign].traits.split(',')[0].toLowerCase()} tendencies in specific situations.`;
    } else if (rank < 3) {
        return `Major influence. The ${zodiacSigns[sign].traits.toLowerCase()} qualities significantly shape your personality.`;
    } else {
        return `Moderate influence. ${zodiacSigns[sign].traits.split(',')[0]} traits emerge in certain contexts.`;
    }
}

// Restart quiz
function restartQuiz() {
    document.getElementById('results').classList.add('hidden');
    document.getElementById('premiumReport').classList.add('hidden');
    document.getElementById('quizMain').style.display = 'block';
    
    initializeScores();
    
    document.querySelectorAll('.question-card').forEach(card => {
        card.classList.remove('answered');
    });
    document.querySelectorAll('.option-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    
    // Reset payment button
    const payBtn = document.querySelector('.pay-btn');
    if (payBtn) {
        payBtn.textContent = 'Pay $9.99 & Get Report';
        payBtn.disabled = false;
    }
    document.getElementById('emailInput').value = '';
    
    updateAnsweredCount();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', buildQuiz);

// Stripe Payment Links (switch for testing)
const STRIPE_LIVE_LINK = 'https://buy.stripe.com/aFa00j44P3T06tjcd58IU0q';
const STRIPE_TEST_LINK = 'https://buy.stripe.com/test_28E9AT30LgFM9Fvdh98IU01';

// Toggle this to test: true = test mode, false = live mode
const TEST_MODE = false;

// Handle Stripe checkout with quiz data
function openStripeCheckout() {
    // Sign abbreviations for compact format
    const signAbbrev = {
        aries: 'Ari', taurus: 'Tau', gemini: 'Gem', cancer: 'Can',
        leo: 'Leo', virgo: 'Vir', libra: 'Lib', scorpio: 'Sco',
        sagittarius: 'Sag', capricorn: 'Cap', aquarius: 'Aqu', pisces: 'Pis'
    };
    
    // Build ALL 12 signs results (sorted by percentage)
    // Format: Ari18-Leo15-Can12-Gem10-Vir9-Lib8-Sco7-Tau6-Sag5-Cap4-Aqu3-Pis3
    const allResults = sortedResults.map(r => 
        `${signAbbrev[r.sign]}${r.percentage}`
    ).join('-');
    
    // Add timestamp for uniqueness
    const timestamp = Date.now().toString(36);
    
    // Final reference ID (fits in Stripe's 200 char limit)
    const clientRefId = `${allResults}_${timestamp}`;
    
    // Build Stripe URL with results
    const stripeUrl = new URL(TEST_MODE ? STRIPE_TEST_LINK : STRIPE_LIVE_LINK);
    stripeUrl.searchParams.set('client_reference_id', clientRefId);
    
    // Log for debugging
    console.log('Opening Stripe with reference:', clientRefId);
    console.log('Full URL:', stripeUrl.toString());
    
    // Track button click
    trackEvent('unlock_report_clicked', {
        dominant_sign: sortedResults[0].sign,
        results_summary: allResults
    });
    
    // Open Stripe checkout
    window.open(stripeUrl.toString(), '_blank');
}

// Add shake animation
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        20%, 60% { transform: translateX(-5px); }
        40%, 80% { transform: translateX(5px); }
    }
`;
document.head.appendChild(style);

