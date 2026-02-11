// Book and Music Datasets for ML Recommendations
export interface BookRecommendation {
  id: string;
  title: string;
  author: string;
  genre: string;
  tags: string[];
  description: string;
  emotionalProfile: {
    stress: number;
    cognitive: number;
    behavior: number;
  };
  targetMoods: string[];
}

export interface MusicRecommendation {
  id: string;
  title: string;
  artist: string;
  genre: string;
  mood: string;
  tags: string[];
  duration: string;
  emotionalProfile: {
    stress: number;
    cognitive: number;
    behavior: number;
  };
  energyLevel: number; // 1-5
  valence: number; // 1-5 (positive/negative)
}

// Curated book dataset based on mental health and emotional states
export const bookDataset: BookRecommendation[] = [
  {
    id: "b1",
    title: "The Anxiety and Stress Management Workbook",
    author: "Balchin & Suhrcke",
    genre: "Self-Help",
    tags: ["anxiety", "stress", "workbook", "practical"],
    description: "Evidence-based strategies for managing anxiety and stress",
    emotionalProfile: { stress: 4.5, cognitive: 3.8, behavior: 4.2 },
    targetMoods: ["overwhelmed", "anxious", "stressed"],
    source: 'curated' as const
  },
  {
    id: "b2",
    title: "Option B",
    author: "Sheryl Sandberg & Adam Grant",
    genre: "Memoir/Psychology",
    tags: ["resilience", "loss", "healing", "growth"],
    description: "Building resilience and finding joy after hardship",
    emotionalProfile: { stress: 3.2, cognitive: 4.1, behavior: 3.9 },
    targetMoods: ["lonely", "exhausted", "frustrated"],
    source: 'curated' as const
  },
  {
    id: "b3",
    title: "The Gifts of Imperfection",
    author: "Brené Brown",
    genre: "Psychology",
    tags: ["shame", "vulnerability", "courage", "authenticity"],
    description: "Letting go of who you think you're supposed to be",
    emotionalProfile: { stress: 2.8, cognitive: 4.3, behavior: 3.6 },
    targetMoods: ["confused", "overwhelmed", "frustrated"],
    source: 'curated' as const
  },
  {
    id: "b4",
    title: "Atomic Habits",
    author: "James Clear",
    genre: "Self-Help",
    tags: ["habits", "productivity", "behavior", "systems"],
    description: "Building good habits and breaking bad ones",
    emotionalProfile: { stress: 2.1, cognitive: 3.9, behavior: 4.8 },
    targetMoods: ["burned-out", "confused", "just-checking"],
    source: 'curated' as const
  },
  {
    id: "b5",
    title: "The Power of Now",
    author: "Eckhart Tolle",
    genre: "Spirituality/Mindfulness",
    tags: ["mindfulness", "presence", "meditation", "peace"],
    description: "A guide to spiritual enlightenment through mindfulness",
    emotionalProfile: { stress: 1.8, cognitive: 2.9, behavior: 2.4 },
    targetMoods: ["peaceful", "hopeful", "just-checking"],
    source: 'curated' as const
  },
  {
    id: "b6",
    title: "Maybe You Should Talk to Someone",
    author: "Lori Gottlieb",
    genre: "Memoir/Psychology",
    tags: ["therapy", "connection", "vulnerability", "healing"],
    description: "A therapist's journey through her own therapy",
    emotionalProfile: { stress: 3.4, cognitive: 4.0, behavior: 3.1 },
    targetMoods: ["lonely", "confused", "hopeful"],
    source: 'curated' as const
  },
  {
    id: "b7",
    title: "Burnout: The Secret to Unlocking the Stress Cycle",
    author: "Emily & Amelia Nagoski",
    genre: "Psychology/Health",
    tags: ["burnout", "stress", "women", "science"],
    description: "Science-based approach to recovering from burnout",
    emotionalProfile: { stress: 4.6, cognitive: 3.7, behavior: 4.1 },
    targetMoods: ["burned-out", "exhausted", "overwhelmed"],
    source: 'curated' as const
  },
  {
    id: "b8",
    title: "The Midnight Library",
    author: "Matt Haig",
    genre: "Fiction/Philosophy",
    tags: ["fiction", "meaning", "choices", "inspiration"],
    description: "A magical exploration of life's possibilities",
    emotionalProfile: { stress: 2.9, cognitive: 3.8, behavior: 2.6 },
    targetMoods: ["confused", "hopeful", "lonely"],
    source: 'curated' as const
  },
  {
    id: "b9",
    title: "Untamed",
    author: "Glennon Doyle",
    genre: "Memoir/Self-Help",
    tags: ["authenticity", "courage", "freedom", "truth"],
    description: "Stop pleasing, start living authentically",
    emotionalProfile: { stress: 3.1, cognitive: 4.2, behavior: 4.0 },
    targetMoods: ["frustrated", "confused", "hopeful"],
    source: 'curated' as const
  },
  {
    id: "b10",
    title: "The Body Keeps the Score",
    author: "Bessel van der Kolk",
    genre: "Psychology/Trauma",
    tags: ["trauma", "healing", "neuroscience", "recovery"],
    description: "Understanding and healing trauma",
    emotionalProfile: { stress: 4.2, cognitive: 4.5, behavior: 3.8 },
    targetMoods: ["overwhelmed", "anxious", "lonely"],
    source: 'curated' as const
  },
  {
    id: "b11",
    title: "Man's Search for Meaning",
    author: "Viktor E. Frankl",
    genre: "Psychology/Philosophy",
    tags: ["meaning", "resilience", "suffering", "hope"],
    description: "Finding purpose even in the darkest times",
    emotionalProfile: { stress: 3.6, cognitive: 4.7, behavior: 3.2 },
    targetMoods: ["hopeless", "confused", "lonely"],
    source: 'curated' as const
  },
  {
    id: "b12",
    title: "Feeling Good",
    author: "David D. Burns",
    genre: "Psychology/CBT",
    tags: ["cbt", "depression", "thinking", "self-help"],
    description: "The clinically proven drug-free treatment for depression",
    emotionalProfile: { stress: 4.3, cognitive: 4.6, behavior: 4.0 },
    targetMoods: ["anxious", "overwhelmed", "depressed"],
    source: 'curated' as const
  },
  {
    id: "b13",
    title: "Deep Work",
    author: "Cal Newport",
    genre: "Productivity",
    tags: ["focus", "concentration", "work", "clarity"],
    description: "Rules for focused success in a distracted world",
    emotionalProfile: { stress: 2.4, cognitive: 4.4, behavior: 4.7 },
    targetMoods: ["burned-out", "confused", "frustrated"],
    source: 'curated' as const
  },
  {
    id: "b14",
    title: "Radical Acceptance",
    author: "Tara Brach",
    genre: "Mindfulness/Psychology",
    tags: ["acceptance", "self-compassion", "healing", "mindfulness"],
    description: "Embracing life with compassion and presence",
    emotionalProfile: { stress: 2.2, cognitive: 3.5, behavior: 2.8 },
    targetMoods: ["anxious", "ashamed", "overwhelmed"],
    source: 'curated' as const
  },
  {
    id: "b15",
    title: "Ikigai",
    author: "Héctor García & Francesc Miralles",
    genre: "Lifestyle/Psychology",
    tags: ["purpose", "longevity", "meaning", "balance"],
    description: "The Japanese secret to a long and happy life",
    emotionalProfile: { stress: 2.0, cognitive: 3.9, behavior: 3.4 },
    targetMoods: ["confused", "hopeful", "just-checking"],
    source: 'curated' as const
  },
  {
    id: "b16",
    title: "Daring Greatly",
    author: "Brené Brown",
    genre: "Psychology",
    tags: ["vulnerability", "courage", "connection", "growth"],
    description: "How the courage to be vulnerable transforms lives",
    emotionalProfile: { stress: 3.0, cognitive: 4.2, behavior: 3.9 },
    targetMoods: ["frustrated", "lonely", "hopeful"],
    source: 'curated' as const
  },
  {
    id: "b17",
    title: "The Happiness Trap",
    author: "Russ Harris",
    genre: "Psychology/ACT",
    tags: ["acceptance", "values", "mindfulness", "mental health"],
    description: "How to stop struggling and start living",
    emotionalProfile: { stress: 3.8, cognitive: 4.1, behavior: 3.6 },
    targetMoods: ["anxious", "overwhelmed", "confused"],
    source: 'curated' as const
  },
  {
    id: "b18",
    title: "Rewire Your Anxious Brain",
    author: "Catherine Pittman & Elizabeth Karle",
    genre: "Neuroscience/Psychology",
    tags: ["anxiety", "brain", "fear", "neuroscience"],
    description: "How to use neuroscience to calm anxiety",
    emotionalProfile: { stress: 4.5, cognitive: 4.4, behavior: 4.1 },
    targetMoods: ["anxious", "overwhelmed", "stressed"],
    source: 'curated' as const
  },
  {
    id: "b19",
    title: "The Four Agreements",
    author: "Don Miguel Ruiz",
    genre: "Spirituality",
    tags: ["freedom", "beliefs", "peace", "self-awareness"],
    description: "A practical guide to personal freedom",
    emotionalProfile: { stress: 1.9, cognitive: 3.2, behavior: 2.7 },
    targetMoods: ["peaceful", "hopeful", "just-checking"],
    source: 'curated' as const
  },
  {
    id: "b20",
    title: "Can't Hurt Me",
    author: "David Goggins",
    genre: "Memoir/Motivation",
    tags: ["discipline", "mental toughness", "resilience", "growth"],
    description: "Master your mind and defy the odds",
    emotionalProfile: { stress: 3.7, cognitive: 4.0, behavior: 4.9 },
    targetMoods: ["frustrated", "exhausted", "burned-out"],
    source: 'curated' as const
  },
  {
    id: "b21",
    title: "Lost Connections",
    author: "Johann Hari",
    genre: "Psychology/Social",
    tags: ["depression", "connection", "society", "healing"],
    description: "Uncovering the real causes of depression and unexpected solutions",
    emotionalProfile: { stress: 4.1, cognitive: 4.3, behavior: 3.5 },
    targetMoods: ["lonely", "overwhelmed", "confused"],
    source: 'curated' as const
  },
  {
    id: "b22",
    title: "When Things Fall Apart",
    author: "Pema Chödrön",
    genre: "Mindfulness/Spirituality",
    tags: ["uncertainty", "acceptance", "compassion", "healing"],
    description: "Heart advice for difficult times",
    emotionalProfile: { stress: 2.5, cognitive: 3.6, behavior: 2.9 },
    targetMoods: ["overwhelmed", "hopeless", "anxious"],
    source: 'curated' as const
  },
  {
    id: "b23",
    title: "Mindset",
    author: "Carol S. Dweck",
    genre: "Psychology",
    tags: ["growth", "beliefs", "learning", "resilience"],
    description: "How your mindset shapes success and happiness",
    emotionalProfile: { stress: 2.7, cognitive: 4.5, behavior: 4.2 },
    targetMoods: ["confused", "frustrated", "hopeful"],
    source: 'curated' as const
  },
  {
    id: "b24",
    title: "Why Has Nobody Told Me This Before?",
    author: "Dr. Julie Smith",
    genre: "Mental Health",
    tags: ["coping", "therapy", "emotional skills", "self-care"],
    description: "Practical tools for emotional resilience and mental strength",
    emotionalProfile: { stress: 3.9, cognitive: 4.2, behavior: 4.0 },
    targetMoods: ["overwhelmed", "anxious", "burned-out"],
    source: 'curated' as const
  },
  {
    id: "b25",
    title: "The Comfort Book",
    author: "Matt Haig",
    genre: "Reflection",
    tags: ["comfort", "hope", "gentle", "mental health"],
    description: "A collection of gentle reminders for difficult days",
    emotionalProfile: { stress: 1.6, cognitive: 2.8, behavior: 2.3 },
    targetMoods: ["lonely", "exhausted", "hopeful"],
    source: 'curated' as const
  },
  {
    id: "b26",
    title: "How to Do the Work",
    author: "Dr. Nicole LePera",
    genre: "Psychology/Healing",
    tags: ["trauma", "self-healing", "patterns", "growth"],
    description: "Recognize your patterns, heal from trauma, and create your self",
    emotionalProfile: { stress: 4.2, cognitive: 4.4, behavior: 4.1 },
    targetMoods: ["confused", "overwhelmed", "frustrated"],
    source: 'curated' as const
  },
  {
    id: "b27",
    title: "The Mountain Is You",
    author: "Brianna Wiest",
    genre: "Self-Reflection",
    tags: ["self-sabotage", "growth", "healing", "clarity"],
    description: "Transforming self-sabotage into self-mastery",
    emotionalProfile: { stress: 3.3, cognitive: 4.1, behavior: 3.8 },
    targetMoods: ["confused", "frustrated", "hopeful"],
    source: 'curated' as const
  },
  {
    id: "b28",
    title: "Quiet",
    author: "Susan Cain",
    genre: "Psychology",
    tags: ["introversion", "identity", "self-acceptance", "strength"],
    description: "The power of introverts in a world that can't stop talking",
    emotionalProfile: { stress: 2.6, cognitive: 4.0, behavior: 3.1 },
    targetMoods: ["lonely", "confused", "peaceful"],
    source: 'curated' as const
  },
  {
    id: "b29",
    title: "Emotional Agility",
    author: "Susan David",
    genre: "Psychology",
    tags: ["emotions", "flexibility", "resilience", "values"],
    description: "Get unstuck, embrace change, and thrive in work and life",
    emotionalProfile: { stress: 3.5, cognitive: 4.3, behavior: 4.0 },
    targetMoods: ["overwhelmed", "frustrated", "confused"],
    source: 'curated' as const
  },
  {
    id: "b30",
    title: "Letting Go",
    author: "David R. Hawkins",
    genre: "Spirituality/Psychology",
    tags: ["release", "peace", "emotions", "healing"],
    description: "The pathway of surrender and inner peace",
    emotionalProfile: { stress: 1.7, cognitive: 3.0, behavior: 2.5 },
    targetMoods: ["peaceful", "hopeful", "overwhelmed"],
    source: 'curated' as const
  }

];

// Curated music dataset for different emotional states
export const musicDataset: MusicRecommendation[] = [
  {
    id: "m1",
    title: "Weightless",
    artist: "Marconi Union",
    genre: "Ambient",
    mood: "calming",
    tags: ["ambient", "scientifically-proven", "anxiety-relief"],
    duration: "8:08",
    emotionalProfile: { stress: 1.2, cognitive: 2.0, behavior: 1.8 },
    energyLevel: 1,
    valence: 3,
    source: 'curated' as const
  },
  {
    id: "m2",
    title: "River",
    artist: "Leon Bridges",
    genre: "Soul",
    mood: "peaceful",
    tags: ["soul", "soothing", "spiritual", "healing"],
    duration: "4:02",
    emotionalProfile: { stress: 2.1, cognitive: 2.8, behavior: 2.3 },
    energyLevel: 2,
    valence: 4,
    source: 'curated' as const
  },
  {
    id: "m3",
    title: "Holocene",
    artist: "Bon Iver",
    genre: "Indie Folk",
    mood: "reflective",
    tags: ["indie", "contemplative", "emotional", "introspective"],
    duration: "5:36",
    emotionalProfile: { stress: 2.9, cognitive: 4.1, behavior: 2.6 },
    energyLevel: 2,
    valence: 3,
    source: 'curated' as const
  },
  {
    id: "m4",
    title: "Claire de Lune",
    artist: "Claude Debussy",
    genre: "Classical",
    mood: "serene",
    tags: ["classical", "piano", "peaceful", "timeless"],
    duration: "4:38",
    emotionalProfile: { stress: 1.5, cognitive: 2.2, behavior: 1.9 },
    energyLevel: 1,
    valence: 4,
    source: 'curated' as const
  },
  {
    id: "m5",
    title: "Breathe Me",
    artist: "Sia",
    genre: "Pop",
    mood: "vulnerable",
    tags: ["emotional", "vulnerability", "healing", "honest"],
    duration: "4:31",
    emotionalProfile: { stress: 3.8, cognitive: 4.2, behavior: 3.1 },
    energyLevel: 3,
    valence: 2,
    source: 'curated' as const
  },
  {
    id: "m6",
    title: "Mad World",
    artist: "Gary Jules",
    genre: "Alternative",
    mood: "melancholic",
    tags: ["melancholic", "introspective", "emotional", "haunting"],
    duration: "3:07",
    emotionalProfile: { stress: 4.1, cognitive: 3.9, behavior: 2.8 },
    energyLevel: 2,
    valence: 1,
    source: 'curated' as const
  },
  {
    id: "m7",
    title: "Here Comes the Sun",
    artist: "The Beatles",
    genre: "Rock",
    mood: "uplifting",
    tags: ["hopeful", "uplifting", "classic", "optimistic"],
    duration: "3:05",
    emotionalProfile: { stress: 1.8, cognitive: 2.5, behavior: 2.9 },
    energyLevel: 3,
    valence: 5,
    source: 'curated' as const
  },
  {
    id: "m8",
    title: "Gymnopédie No. 1",
    artist: "Erik Satie",
    genre: "Classical",
    mood: "meditative",
    tags: ["classical", "minimalist", "meditative", "calm"],
    duration: "3:32",
    emotionalProfile: { stress: 1.3, cognitive: 2.1, behavior: 1.6 },
    energyLevel: 1,
    valence: 3,
    source: 'curated' as const
  },
  {
    id: "m9",
    title: "The Night We Met",
    artist: "Lord Huron",
    genre: "Indie Folk",
    mood: "nostalgic",
    tags: ["indie", "nostalgic", "emotional", "longing"],
    duration: "3:28",
    emotionalProfile: { stress: 3.2, cognitive: 3.7, behavior: 2.4 },
    energyLevel: 2,
    valence: 2,
    source: 'curated' as const
  },
  {
    id: "m10",
    title: "Overcome",
    artist: "Skott",
    genre: "Electronic",
    mood: "empowering",
    tags: ["electronic", "empowering", "upbeat", "motivational"],
    duration: "3:47",
    emotionalProfile: { stress: 2.3, cognitive: 3.1, behavior: 3.8 },
    energyLevel: 4,
    valence: 4,
    source: 'curated' as const
  },
  {
    id: "m11",
    title: "Lost in the Light",
    artist: "Bahamas",
    genre: "Indie Folk",
    mood: "contemplative",
    tags: ["folk", "contemplative", "soothing", "acoustic"],
    duration: "4:12",
    emotionalProfile: { stress: 2.6, cognitive: 3.4, behavior: 2.2 },
    energyLevel: 2,
    valence: 3,
    source: 'curated' as const
  },
  {
    id: "m12",
    title: "Skinny Love",
    artist: "Bon Iver",
    genre: "Indie Folk",
    mood: "vulnerable",
    tags: ["indie", "vulnerable", "raw", "emotional"],
    duration: "3:58",
    emotionalProfile: { stress: 3.9, cognitive: 4.0, behavior: 2.7 },
    energyLevel: 2,
    valence: 2,
    source: 'curated' as const
  }
];

// Mapping emotional states to recommendation preferences
export const emotionalStateMapping = {
  overwhelmed: {
    stressWeight: 0.4,
    cognitiveWeight: 0.3,
    behaviorWeight: 0.3,
    preferredEnergyLevel: [1, 2],
    preferredValence: [3, 4],
    bookGenrePreference: ["Self-Help", "Memoir/Psychology"],
    musicMoodPreference: ["calming", "peaceful", "meditative"]
  },
  anxious: {
    stressWeight: 0.5,
    cognitiveWeight: 0.3,
    behaviorWeight: 0.2,
    preferredEnergyLevel: [1, 2],
    preferredValence: [3, 4, 5],
    bookGenrePreference: ["Self-Help", "Psychology"],
    musicMoodPreference: ["calming", "peaceful", "uplifting"]
  },
  lonely: {
    stressWeight: 0.2,
    cognitiveWeight: 0.4,
    behaviorWeight: 0.4,
    preferredEnergyLevel: [2, 3],
    preferredValence: [3, 4],
    bookGenrePreference: ["Memoir/Psychology", "Fiction/Philosophy"],
    musicMoodPreference: ["vulnerable", "contemplative", "peaceful"]
  },
  "burned-out": {
    stressWeight: 0.4,
    cognitiveWeight: 0.2,
    behaviorWeight: 0.4,
    preferredEnergyLevel: [1, 2],
    preferredValence: [3, 4],
    bookGenrePreference: ["Self-Help", "Psychology/Health"],
    musicMoodPreference: ["calming", "meditative", "peaceful"]
  },
  confused: {
    stressWeight: 0.3,
    cognitiveWeight: 0.4,
    behaviorWeight: 0.3,
    preferredEnergyLevel: [2, 3],
    preferredValence: [3, 4],
    bookGenrePreference: ["Self-Help", "Fiction/Philosophy"],
    musicMoodPreference: ["contemplative", "reflective", "peaceful"]
  },
  hopeful: {
    stressWeight: 0.2,
    cognitiveWeight: 0.3,
    behaviorWeight: 0.5,
    preferredEnergyLevel: [2, 3, 4],
    preferredValence: [4, 5],
    bookGenrePreference: ["Self-Help", "Memoir/Self-Help"],
    musicMoodPreference: ["uplifting", "empowering", "peaceful"]
  },
  exhausted: {
    stressWeight: 0.4,
    cognitiveWeight: 0.2,
    behaviorWeight: 0.4,
    preferredEnergyLevel: [1, 2],
    preferredValence: [3, 4],
    bookGenrePreference: ["Psychology/Health", "Self-Help"],
    musicMoodPreference: ["calming", "meditative", "peaceful"]
  },
  frustrated: {
    stressWeight: 0.3,
    cognitiveWeight: 0.4,
    behaviorWeight: 0.3,
    preferredEnergyLevel: [2, 3],
    preferredValence: [3, 4],
    bookGenrePreference: ["Self-Help", "Memoir/Self-Help"],
    musicMoodPreference: ["empowering", "uplifting", "contemplative"]
  },
  peaceful: {
    stressWeight: 0.2,
    cognitiveWeight: 0.3,
    behaviorWeight: 0.5,
    preferredEnergyLevel: [1, 2, 3],
    preferredValence: [4, 5],
    bookGenrePreference: ["Spirituality/Mindfulness", "Fiction/Philosophy"],
    musicMoodPreference: ["peaceful", "serene", "meditative"]
  },
  "just-checking": {
    stressWeight: 0.25,
    cognitiveWeight: 0.35,
    behaviorWeight: 0.4,
    preferredEnergyLevel: [2, 3],
    preferredValence: [3, 4, 5],
    bookGenrePreference: ["Self-Help", "Psychology"],
    musicMoodPreference: ["peaceful", "contemplative", "uplifting"]
  }
};
