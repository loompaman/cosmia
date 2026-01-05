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

// 12 High-Impact Questions - Optimized for completion
const questions = [
    {
        question: "At a party, you're most likely to:",
        options: [
            { text: "Work the room and meet everyone", scores: { leo: 3, aries: 2, gemini: 2, sagittarius: 1 } },
            { text: "Find one person for a deep conversation", scores: { scorpio: 3, cancer: 2, capricorn: 2, pisces: 1 } },
            { text: "Make sure everyone's having a good time", scores: { libra: 3, cancer: 2, pisces: 2, virgo: 1 } },
            { text: "Observe from the edges, join selectively", scores: { aquarius: 3, virgo: 2, taurus: 2, capricorn: 1 } }
        ]
    },
    {
        question: "When you're upset, you:",
        options: [
            { text: "Confront it head-on immediately", scores: { aries: 3, leo: 2, scorpio: 2, sagittarius: 1 } },
            { text: "Need alone time to process", scores: { cancer: 3, pisces: 2, virgo: 2, taurus: 1 } },
            { text: "Talk it out with someone you trust", scores: { gemini: 3, libra: 2, leo: 2, sagittarius: 1 } },
            { text: "Push it down and keep going", scores: { capricorn: 3, scorpio: 2, taurus: 2, aquarius: 1 } }
        ]
    },
    {
        question: "Your ideal weekend looks like:",
        options: [
            { text: "An adventure or trying something new", scores: { sagittarius: 3, aries: 2, gemini: 2, aquarius: 1 } },
            { text: "Relaxing at home in total comfort", scores: { taurus: 3, cancer: 2, pisces: 2, virgo: 1 } },
            { text: "Socializing with friends or a party", scores: { leo: 3, libra: 2, gemini: 2, aries: 1 } },
            { text: "Working on personal goals", scores: { capricorn: 3, virgo: 2, scorpio: 2, aries: 1 } }
        ]
    },
    {
        question: "In relationships, you need:",
        options: [
            { text: "Passion and excitement", scores: { aries: 3, leo: 2, sagittarius: 2, scorpio: 1 } },
            { text: "Security and loyalty", scores: { taurus: 3, cancer: 2, capricorn: 2, virgo: 1 } },
            { text: "Deep emotional connection", scores: { scorpio: 3, pisces: 2, cancer: 2, taurus: 1 } },
            { text: "Freedom and intellectual stimulation", scores: { aquarius: 3, gemini: 2, sagittarius: 2, libra: 1 } }
        ]
    },
    {
        question: "People come to you for:",
        options: [
            { text: "Motivation and energy", scores: { aries: 3, leo: 2, sagittarius: 2, gemini: 1 } },
            { text: "Practical advice and solutions", scores: { virgo: 3, capricorn: 2, taurus: 2, scorpio: 1 } },
            { text: "Emotional support and listening", scores: { cancer: 3, pisces: 2, libra: 2, taurus: 1 } },
            { text: "A unique perspective", scores: { aquarius: 3, gemini: 2, sagittarius: 2, pisces: 1 } }
        ]
    },
    {
        question: "Your biggest fear is:",
        options: [
            { text: "Being controlled or trapped", scores: { sagittarius: 3, aquarius: 2, aries: 2, gemini: 1 } },
            { text: "Being abandoned or alone", scores: { cancer: 3, libra: 2, pisces: 2, taurus: 1 } },
            { text: "Failure or looking incompetent", scores: { capricorn: 3, virgo: 2, leo: 2, aries: 1 } },
            { text: "Betrayal or being deceived", scores: { scorpio: 3, taurus: 2, cancer: 2, capricorn: 1 } }
        ]
    },
    {
        question: "When making decisions, you:",
        options: [
            { text: "Go with your gut, fast", scores: { aries: 3, sagittarius: 2, leo: 2, gemini: 1 } },
            { text: "Weigh every option carefully", scores: { libra: 3, virgo: 2, capricorn: 2, taurus: 1 } },
            { text: "Follow your heart", scores: { pisces: 3, cancer: 2, leo: 2, libra: 1 } },
            { text: "Research and strategize", scores: { scorpio: 3, capricorn: 2, virgo: 2, aquarius: 1 } }
        ]
    },
    {
        question: "You're most proud of your:",
        options: [
            { text: "Achievements and success", scores: { capricorn: 3, leo: 2, aries: 2, virgo: 1 } },
            { text: "Relationships and how you care for others", scores: { cancer: 3, libra: 2, pisces: 2, taurus: 1 } },
            { text: "Independence and originality", scores: { aquarius: 3, sagittarius: 2, aries: 2, gemini: 1 } },
            { text: "Resilience and inner strength", scores: { scorpio: 3, taurus: 2, capricorn: 2, cancer: 1 } }
        ]
    },
    {
        question: "Your communication style is:",
        options: [
            { text: "Direct and to the point", scores: { aries: 3, capricorn: 2, scorpio: 2, sagittarius: 1 } },
            { text: "Charming and diplomatic", scores: { libra: 3, leo: 2, gemini: 2, pisces: 1 } },
            { text: "Thoughtful and emotional", scores: { cancer: 3, pisces: 2, scorpio: 2, taurus: 1 } },
            { text: "Witty and all over the place", scores: { gemini: 3, sagittarius: 2, aquarius: 2, leo: 1 } }
        ]
    },
    {
        question: "What drains your energy most:",
        options: [
            { text: "Boredom and routine", scores: { sagittarius: 3, gemini: 2, aries: 2, aquarius: 1 } },
            { text: "Conflict and drama", scores: { libra: 3, pisces: 2, taurus: 2, cancer: 1 } },
            { text: "Chaos and disorganization", scores: { virgo: 3, capricorn: 2, taurus: 2, cancer: 1 } },
            { text: "Shallow people and small talk", scores: { scorpio: 3, aquarius: 2, capricorn: 2, pisces: 1 } }
        ]
    },
    {
        question: "Your secret superpower:",
        options: [
            { text: "Making things happen through sheer will", scores: { aries: 3, scorpio: 2, capricorn: 2, leo: 1 } },
            { text: "Reading people instantly", scores: { scorpio: 3, pisces: 2, cancer: 2, virgo: 1 } },
            { text: "Making anyone feel comfortable", scores: { libra: 3, leo: 2, cancer: 2, gemini: 1 } },
            { text: "Staying calm when everything's chaos", scores: { taurus: 3, capricorn: 2, virgo: 2, aquarius: 1 } }
        ]
    },
    {
        question: "What matters most to you:",
        options: [
            { text: "Freedom to be yourself", scores: { aquarius: 3, sagittarius: 2, aries: 2, gemini: 1 } },
            { text: "Security and comfort", scores: { taurus: 3, cancer: 2, virgo: 2, capricorn: 1 } },
            { text: "Love and connection", scores: { pisces: 3, cancer: 2, libra: 2, scorpio: 1 } },
            { text: "Success and respect", scores: { capricorn: 3, leo: 2, aries: 2, scorpio: 1 } }
        ]
    }
];
