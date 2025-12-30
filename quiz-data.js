// Zodiac Signs Data
const zodiacSigns = {
    aries: { name: 'Aries', symbol: '♈', element: 'Fire', traits: 'Bold, Ambitious, Energetic' },
    taurus: { name: 'Taurus', symbol: '♉', element: 'Earth', traits: 'Patient, Reliable, Devoted' },
    gemini: { name: 'Gemini', symbol: '♊', element: 'Air', traits: 'Curious, Adaptable, Witty' },
    cancer: { name: 'Cancer', symbol: '♋', element: 'Water', traits: 'Intuitive, Nurturing, Protective' },
    leo: { name: 'Leo', symbol: '♌', element: 'Fire', traits: 'Confident, Creative, Charismatic' },
    virgo: { name: 'Virgo', symbol: '♍', element: 'Earth', traits: 'Analytical, Practical, Diligent' },
    libra: { name: 'Libra', symbol: '♎', element: 'Air', traits: 'Diplomatic, Harmonious, Fair' },
    scorpio: { name: 'Scorpio', symbol: '♏', element: 'Water', traits: 'Passionate, Determined, Intuitive' },
    sagittarius: { name: 'Sagittarius', symbol: '♐', element: 'Fire', traits: 'Adventurous, Optimistic, Free-spirited' },
    capricorn: { name: 'Capricorn', symbol: '♑', element: 'Earth', traits: 'Disciplined, Responsible, Ambitious' },
    aquarius: { name: 'Aquarius', symbol: '♒', element: 'Air', traits: 'Independent, Original, Humanitarian' },
    pisces: { name: 'Pisces', symbol: '♓', element: 'Water', traits: 'Compassionate, Artistic, Intuitive' }
};

// 24 Balanced Questions - Each sign has 6 primary (3-point) opportunities
const questions = [
    {
        question: "When faced with a challenge, you:",
        options: [
            { text: "Charge in and figure it out as you go", scores: { aries: 3, leo: 2, sagittarius: 1 } },
            { text: "Research and plan before acting", scores: { virgo: 3, capricorn: 2, taurus: 1 } },
            { text: "Talk it through with others", scores: { gemini: 3, libra: 2, aquarius: 1 } },
            { text: "Trust your instincts about what feels right", scores: { cancer: 3, scorpio: 2, pisces: 1 } }
        ]
    },
    {
        question: "Your ideal way to spend free time:",
        options: [
            { text: "Exploring somewhere new", scores: { sagittarius: 3, aries: 2, gemini: 1 } },
            { text: "Enjoying comforts at home", scores: { taurus: 3, cancer: 2, pisces: 1 } },
            { text: "Being the center of a social gathering", scores: { leo: 3, libra: 2, gemini: 1 } },
            { text: "Working toward a personal goal", scores: { capricorn: 3, virgo: 2, scorpio: 1 } }
        ]
    },
    {
        question: "In a group project, you naturally:",
        options: [
            { text: "Take charge and lead", scores: { aries: 3, leo: 2, capricorn: 1 } },
            { text: "Make sure everyone gets along", scores: { libra: 3, pisces: 2, cancer: 1 } },
            { text: "Bring unique and original ideas", scores: { aquarius: 3, gemini: 2, sagittarius: 1 } },
            { text: "Handle the details others miss", scores: { virgo: 3, taurus: 2, scorpio: 1 } }
        ]
    },
    {
        question: "What matters most in friendships:",
        options: [
            { text: "Unwavering loyalty through thick and thin", scores: { scorpio: 3, taurus: 2, cancer: 1 } },
            { text: "Brutal honesty, even when it's hard", scores: { sagittarius: 3, aries: 2, aquarius: 1 } },
            { text: "Emotional support and understanding", scores: { pisces: 3, cancer: 2, libra: 1 } },
            { text: "Mutual respect and shared ambitions", scores: { capricorn: 3, leo: 2, virgo: 1 } }
        ]
    },
    {
        question: "When someone upsets you:",
        options: [
            { text: "You confront them immediately", scores: { aries: 3, leo: 2, scorpio: 1 } },
            { text: "You try to see their perspective first", scores: { libra: 3, pisces: 2, gemini: 1 } },
            { text: "You need time alone to process", scores: { cancer: 3, virgo: 2, taurus: 1 } },
            { text: "You remember it and address it later", scores: { scorpio: 3, capricorn: 2, cancer: 1 } }
        ]
    },
    {
        question: "What drives you most in life:",
        options: [
            { text: "Being admired and successful", scores: { leo: 3, aries: 2, capricorn: 1 } },
            { text: "Feeling safe and comfortable", scores: { taurus: 3, cancer: 2, virgo: 1 } },
            { text: "Learning and experiencing everything", scores: { sagittarius: 3, gemini: 2, aquarius: 1 } },
            { text: "Deep, transformative connections", scores: { scorpio: 3, pisces: 2, cancer: 1 } }
        ]
    },
    {
        question: "How do you show you care:",
        options: [
            { text: "Big romantic gestures and surprises", scores: { leo: 3, aries: 2, sagittarius: 1 } },
            { text: "Taking care of their needs and comfort", scores: { cancer: 3, taurus: 2, virgo: 1 } },
            { text: "Constant communication and attention", scores: { gemini: 3, libra: 2, aquarius: 1 } },
            { text: "Intense loyalty and emotional depth", scores: { scorpio: 3, pisces: 2, cancer: 1 } }
        ]
    },
    {
        question: "Your approach to money:",
        options: [
            { text: "Build wealth steadily over time", scores: { capricorn: 3, taurus: 2, virgo: 1 } },
            { text: "Spend freely on adventures and fun", scores: { sagittarius: 3, leo: 2, aries: 1 } },
            { text: "Invest in beauty and quality things", scores: { taurus: 3, libra: 2, leo: 1 } },
            { text: "Money matters less than meaning", scores: { pisces: 3, aquarius: 2, scorpio: 1 } }
        ]
    },
    {
        question: "What kind of content do you enjoy:",
        options: [
            { text: "Action, competition, adrenaline", scores: { aries: 3, sagittarius: 2, leo: 1 } },
            { text: "Art, beauty, aesthetically pleasing things", scores: { libra: 3, taurus: 2, pisces: 1 } },
            { text: "Mysteries, psychology, true crime", scores: { scorpio: 3, aquarius: 2, gemini: 1 } },
            { text: "Emotional stories that make you cry", scores: { pisces: 3, cancer: 2, leo: 1 } }
        ]
    },
    {
        question: "In romantic relationships, you:",
        options: [
            { text: "Fall fast and love intensely", scores: { aries: 3, leo: 2, sagittarius: 1 } },
            { text: "Take your time to build real trust", scores: { taurus: 3, cancer: 2, capricorn: 1 } },
            { text: "Need mental stimulation and variety", scores: { gemini: 3, aquarius: 2, libra: 1 } },
            { text: "Want all-consuming emotional intimacy", scores: { scorpio: 3, pisces: 2, cancer: 1 } }
        ]
    },
    {
        question: "When plans suddenly change:",
        options: [
            { text: "You get excited by the new possibilities", scores: { sagittarius: 3, gemini: 2, aquarius: 1 } },
            { text: "You feel frustrated and unsettled", scores: { taurus: 3, cancer: 2, capricorn: 1 } },
            { text: "You quickly analyze the new situation", scores: { virgo: 3, scorpio: 2, capricorn: 1 } },
            { text: "You go with the flow, it's all good", scores: { pisces: 3, libra: 2, gemini: 1 } }
        ]
    },
    {
        question: "How do you feel about taking risks:",
        options: [
            { text: "You thrive on them — life's too short", scores: { aries: 3, sagittarius: 2, leo: 1 } },
            { text: "You prefer security and known outcomes", scores: { cancer: 3, taurus: 2, virgo: 1 } },
            { text: "You calculate the odds carefully first", scores: { virgo: 3, capricorn: 2, scorpio: 1 } },
            { text: "You follow your heart, logic be damned", scores: { pisces: 3, scorpio: 2, cancer: 1 } }
        ]
    },
    {
        question: "What attracts you to someone:",
        options: [
            { text: "Confidence and magnetic presence", scores: { leo: 3, aries: 2, scorpio: 1 } },
            { text: "Intelligence and interesting conversation", scores: { gemini: 3, aquarius: 2, virgo: 1 } },
            { text: "Gentleness and emotional depth", scores: { pisces: 3, cancer: 2, libra: 1 } },
            { text: "Ambition and having their life together", scores: { capricorn: 3, taurus: 2, virgo: 1 } }
        ]
    },
    {
        question: "After achieving a goal, you:",
        options: [
            { text: "Celebrate loudly and share the win", scores: { leo: 3, aries: 2, sagittarius: 1 } },
            { text: "Already focused on the next goal", scores: { capricorn: 3, virgo: 2, scorpio: 1 } },
            { text: "Feel satisfied helping others succeed too", scores: { aquarius: 3, pisces: 2, cancer: 1 } },
            { text: "Reflect on what the journey taught you", scores: { scorpio: 3, sagittarius: 2, pisces: 1 } }
        ]
    },
    {
        question: "Your dream vacation:",
        options: [
            { text: "Backpacking through unexplored places", scores: { sagittarius: 3, aries: 2, aquarius: 1 } },
            { text: "Luxury resort with amazing food", scores: { taurus: 3, leo: 2, libra: 1 } },
            { text: "Exploring cities, museums, and culture", scores: { gemini: 3, virgo: 2, libra: 1 } },
            { text: "Cozy cabin by the water with loved ones", scores: { cancer: 3, pisces: 2, taurus: 1 } }
        ]
    },
    {
        question: "At a party, you:",
        options: [
            { text: "Work the room and meet everyone", scores: { leo: 3, gemini: 2, sagittarius: 1 } },
            { text: "Make sure everyone's having a good time", scores: { libra: 3, cancer: 2, pisces: 1 } },
            { text: "Find one person for deep conversation", scores: { scorpio: 3, capricorn: 2, virgo: 1 } },
            { text: "Observe from the edges, join selectively", scores: { aquarius: 3, pisces: 2, cancer: 1 } }
        ]
    },
    {
        question: "When you're angry:",
        options: [
            { text: "You explode but get over it quickly", scores: { aries: 3, leo: 2, sagittarius: 1 } },
            { text: "You go silent and need space", scores: { scorpio: 3, taurus: 2, cancer: 1 } },
            { text: "You try to talk it out calmly", scores: { libra: 3, gemini: 2, aquarius: 1 } },
            { text: "You cry or internalize the hurt", scores: { pisces: 3, cancer: 2, virgo: 1 } }
        ]
    },
    {
        question: "When someone tells you a secret:",
        options: [
            { text: "It goes to the grave with you", scores: { scorpio: 3, capricorn: 2, cancer: 1 } },
            { text: "You might slip and tell someone close", scores: { gemini: 3, sagittarius: 2, leo: 1 } },
            { text: "You keep it but wish they hadn't told you", scores: { virgo: 3, taurus: 2, libra: 1 } },
            { text: "You believe secrets shouldn't exist anyway", scores: { sagittarius: 3, aquarius: 2, aries: 1 } }
        ]
    },
    {
        question: "Your life philosophy:",
        options: [
            { text: "Work hard now, enjoy rewards later", scores: { capricorn: 3, virgo: 2, taurus: 1 } },
            { text: "Everything happens for a reason", scores: { pisces: 3, sagittarius: 2, cancer: 1 } },
            { text: "Life is about balance and beauty", scores: { libra: 3, taurus: 2, leo: 1 } },
            { text: "Life is short — make it count", scores: { aries: 3, leo: 2, sagittarius: 1 } }
        ]
    },
    {
        question: "What gives you the most fulfillment:",
        options: [
            { text: "Being recognized as the best at something", scores: { leo: 3, aries: 2, capricorn: 1 } },
            { text: "Creating a comfortable, beautiful home", scores: { taurus: 3, cancer: 2, libra: 1 } },
            { text: "Making a difference in the world", scores: { aquarius: 3, sagittarius: 2, pisces: 1 } },
            { text: "Truly understanding life's mysteries", scores: { scorpio: 3, pisces: 2, sagittarius: 1 } }
        ]
    },
    {
        question: "When you're alone, you:",
        options: [
            { text: "Recharge and feel at peace", scores: { cancer: 3, pisces: 2, virgo: 1 } },
            { text: "Get restless and need stimulation", scores: { gemini: 3, aries: 2, leo: 1 } },
            { text: "Dive deep into thoughts and feelings", scores: { scorpio: 3, aquarius: 2, pisces: 1 } },
            { text: "Use the time productively", scores: { capricorn: 3, virgo: 2, taurus: 1 } }
        ]
    },
    {
        question: "How do you make big decisions:",
        options: [
            { text: "Quickly — trust your instincts", scores: { aries: 3, sagittarius: 2, leo: 1 } },
            { text: "Slowly — weigh every option carefully", scores: { libra: 3, virgo: 2, taurus: 1 } },
            { text: "Emotionally — what feels right in your heart", scores: { cancer: 3, pisces: 2, scorpio: 1 } },
            { text: "Strategically — what's the smartest move", scores: { capricorn: 3, scorpio: 2, aquarius: 1 } }
        ]
    },
    {
        question: "When others need help, you:",
        options: [
            { text: "Drop everything to take care of them", scores: { cancer: 3, pisces: 2, virgo: 1 } },
            { text: "Give practical advice and solutions", scores: { virgo: 3, capricorn: 2, taurus: 1 } },
            { text: "Fight for them and their cause", scores: { aries: 3, leo: 2, scorpio: 1 } },
            { text: "Connect them with resources and people", scores: { aquarius: 3, gemini: 2, libra: 1 } }
        ]
    },
    {
        question: "What does home mean to you:",
        options: [
            { text: "A sanctuary for family and memories", scores: { cancer: 3, taurus: 2, pisces: 1 } },
            { text: "A place to rest between adventures", scores: { sagittarius: 3, aries: 2, gemini: 1 } },
            { text: "A reflection of your success and taste", scores: { leo: 3, libra: 2, taurus: 1 } },
            { text: "Your fortress of stability", scores: { capricorn: 3, virgo: 2, scorpio: 1 } }
        ]
    }
];
