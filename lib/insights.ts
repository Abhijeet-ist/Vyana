import type {
  AssessmentAnswer,
  InsightFragment,
  InsightCard,
  StressProfile,
  AssessmentQuestion,
  OnboardingSelection,
} from "@/types";

/* ——— Personalized Assessment Questions by Emotional State ——— */
const questionSets: Record<NonNullable<OnboardingSelection>, AssessmentQuestion[]> = {
  overwhelmed: [
    {
      id: "ov1",
      text: "How often do you feel like you have too many things to handle at once?",
      category: "stress",
    },
    {
      id: "ov2", 
      text: "When tasks pile up, how likely are you to freeze rather than act?",
      category: "behavior",
    },
    {
      id: "ov3",
      text: "How frequently do you think 'I can't handle this' when facing challenges?",
      category: "cognitive",
    },
    {
      id: "ov4",
      text: "How often do you feel physically tense or exhausted from mental load?",
      category: "stress",
    },
    {
      id: "ov5",
      text: "How much do you catastrophize about what might go wrong?",
      category: "cognitive",
    },
    {
      id: "ov6",
      text: "How often do you avoid making decisions when feeling overwhelmed?",
      category: "behavior",
    },
    {
      id: "ov7",
      text: "How frequently do you feel like everyone else handles pressure better than you?",
      category: "cognitive",
    },
    {
      id: "ov8",
      text: "How often do you neglect basic needs when overwhelmed?",
      category: "behavior",
    },
    {
      id: "ov9",
      text: "How frequently do you feel paralyzed when trying to prioritize tasks?",
      category: "cognitive",
    },
    {
      id: "ov10",
      text: "How often do you experience headaches or tension from stress?",
      category: "stress",
    },
    {
      id: "ov11",
      text: "How much do you withdraw from people when feeling swamped?",
      category: "behavior",
    },
    {
      id: "ov12",
      text: "How frequently do you feel like you're drowning in expectations?",
      category: "cognitive",
    },
    {
      id: "ov13",
      text: "How often does your mind race with all the things you need to do?",
      category: "stress",
    },
    {
      id: "ov14",
      text: "How much do you struggle to ask for help when you need it?",
      category: "behavior",
    },
    {
      id: "ov15",
      text: "How frequently do you tell yourself you should be able to handle more?",
      category: "cognitive",
    },
    {
      id: "ov16",
      text: "How often do you feel your heart racing from overwhelm?",
      category: "stress",
    },
  ],

  lonely: [
    {
      id: "ln1",
      text: "How often do you feel like others don't truly understand you?",
      category: "cognitive",
    },
    {
      id: "ln2",
      text: "How frequently do you avoid social situations even when invited?",
      category: "behavior", 
    },
    {
      id: "ln3",
      text: "How much do you feel disconnected even when around people?",
      category: "stress",
    },
    {
      id: "ln4",
      text: "How often do you think you're bothering others by reaching out?",
      category: "cognitive",
    },
    {
      id: "ln5",
      text: "How frequently do you scroll social media feeling more isolated?",
      category: "behavior",
    },
    {
      id: "ln6",
      text: "How much do you worry that your relationships are one-sided?",
      category: "stress",
    },
    {
      id: "ln7",
      text: "How often do you feel like you're pretending to be okay around others?",
      category: "cognitive",
    },
    {
      id: "ln8",
      text: "How frequently do you choose to stay home rather than connect?",
      category: "behavior",
    },
    {
      id: "ln9",
      text: "How often do you feel invisible in group settings?",
      category: "cognitive",
    },
    {
      id: "ln10",
      text: "How much do you crave connection but fear rejection?",
      category: "stress",
    },
    {
      id: "ln11",
      text: "How frequently do you cancel plans at the last minute?",
      category: "behavior",
    },
    {
      id: "ln12",
      text: "How often do you think no one would notice if you disappeared?",
      category: "cognitive",
    },
    {
      id: "ln13",
      text: "How much does loneliness physically hurt or ache?",
      category: "stress",
    },
    {
      id: "ln14",
      text: "How frequently do you compare your social life to others'?",
      category: "behavior",
    },
    {
      id: "ln15",
      text: "How often do you feel like an outsider even with close friends?",
      category: "cognitive",
    },
    {
      id: "ln16",
      text: "How much do you struggle with silence when alone?",
      category: "stress",
    },
  ],

  "burned-out": [
    {
      id: "bo1", 
      text: "How often do you feel emotionally drained before the day even starts?",
      category: "stress",
    },
    {
      id: "bo2",
      text: "How frequently do you go through the motions without feeling engaged?",
      category: "behavior",
    },
    {
      id: "bo3",
      text: "How much do you feel like you've lost your sense of purpose?",
      category: "cognitive",
    },
    {
      id: "bo4",
      text: "How often do you feel resentful about your responsibilities?",
      category: "stress",
    },
    {
      id: "bo5",
      text: "How frequently do you think 'I used to care more about this'?",
      category: "cognitive",
    },
    {
      id: "bo6",
      text: "How much do you procrastinate on things that used to motivate you?",
      category: "behavior",
    },
    {
      id: "bo7",
      text: "How often do you feel like you're running on empty?",
      category: "cognitive",
    },
    {
      id: "bo8",
      text: "How frequently do you fantasize about escaping your current situation?",
      category: "behavior",
    },
    {
      id: "bo9",
      text: "How often do you feel cynical about things that used to excite you?",
      category: "cognitive",
    },
    {
      id: "bo10",
      text: "How much do you feel physically exhausted despite adequate rest?",
      category: "stress",
    },
    {
      id: "bo11",
      text: "How frequently do you go through your day on autopilot?",
      category: "behavior",
    },
    {
      id: "bo12",
      text: "How often do you question if anything you do matters?",
      category: "cognitive",
    },
    {
      id: "bo13",
      text: "How much does the thought of work make you feel dread?",
      category: "stress",
    },
    {
      id: "bo14",
      text: "How frequently do you isolate yourself from support systems?",
      category: "behavior",
    },
    {
      id: "bo15",
      text: "How often do you feel detached from your own life?",
      category: "cognitive",
    },
    {
      id: "bo16",
      text: "How much do you feel emotionally numb or empty?",
      category: "stress",
    },
  ],

  "just-checking": [
    {
      id: "jc1",
      text: "How often do you reflect on your mental and emotional patterns?",
      category: "cognitive",
    },
    {
      id: "jc2",
      text: "How frequently do you take proactive steps to maintain your wellbeing?",
      category: "behavior",
    },
    {
      id: "jc3", 
      text: "How much do you notice stress before it becomes overwhelming?",
      category: "stress",
    },
    {
      id: "jc4",
      text: "How often do you check in with yourself about your needs?",
      category: "cognitive",
    },
    {
      id: "jc5",
      text: "How frequently do you adjust your habits based on how you're feeling?",
      category: "behavior",
    },
    {
      id: "jc6",
      text: "How much do you feel in tune with your emotional fluctuations?",
      category: "stress",
    },
    {
      id: "jc7",
      text: "How often do you seek growth opportunities for self-improvement?",
      category: "cognitive",
    },
    {
      id: "jc8",
      text: "How frequently do you maintain boundaries that protect your energy?",
      category: "behavior", 
    },
    {
      id: "jc9",
      text: "How often do you celebrate small wins in your personal growth?",
      category: "cognitive",
    },
    {
      id: "jc10",
      text: "How much do you feel balanced in your daily routines?",
      category: "stress",
    },
    {
      id: "jc11",
      text: "How frequently do you try new wellness practices to see what works?",
      category: "behavior",
    },
    {
      id: "jc12",
      text: "How often do you journal or reflect on your emotions?",
      category: "cognitive",
    },
    {
      id: "jc13",
      text: "How much do you prioritize sleep and rest as self-care?",
      category: "stress",
    },
    {
      id: "jc14",
      text: "How frequently do you reach out to others for meaningful connection?",
      category: "behavior",
    },
    {
      id: "jc15",
      text: "How often do you practice gratitude or mindfulness?",
      category: "cognitive",
    },
    {
      id: "jc16",
      text: "How much do you feel energized by your current habits?",
      category: "stress",
    },
  ],

  anxious: [
    {
      id: "ax1",
      text: "How often do you worry about things that haven't happened yet?",
      category: "cognitive",
    },
    {
      id: "ax2",
      text: "How frequently do you avoid situations that make you nervous?",  
      category: "behavior",
    },
    {
      id: "ax3",
      text: "How much do physical symptoms of anxiety affect your daily life?",
      category: "stress",
    },
    {
      id: "ax4",
      text: "How often do you have racing thoughts that are hard to control?",
      category: "cognitive",
    },
    {
      id: "ax5",
      text: "How frequently do you seek excessive reassurance from others?",
      category: "behavior",
    },
    {
      id: "ax6",
      text: "How much does uncertainty about outcomes create tension for you?",
      category: "stress",
    },
    {
      id: "ax7",
      text: "How often do you imagine worst-case scenarios?",
      category: "cognitive",
    },
    {
      id: "ax8",
      text: "How frequently do you double-check things due to worry?",
      category: "behavior",
    },
    {
      id: "ax9",
      text: "How often do you feel a sense of impending doom?",
      category: "cognitive",
    },
    {
      id: "ax10",
      text: "How much do you experience chest tightness or shortness of breath?",
      category: "stress",
    },
    {
      id: "ax11",
      text: "How frequently do you cancel plans because anxiety feels too big?",
      category: "behavior",
    },
    {
      id: "ax12",
      text: "How often do you replay conversations wondering if you said something wrong?",
      category: "cognitive",
    },
    {
      id: "ax13",
      text: "How much does your stomach feel upset when you're anxious?",
      category: "stress",
    },
    {
      id: "ax14",
      text: "How frequently do you overanalyze every small detail?",
      category: "behavior",
    },
    {
      id: "ax15",
      text: "How often do you worry that something bad is about to happen?",
      category: "cognitive",
    },
    {
      id: "ax16",
      text: "How much do you feel restless or on edge during the day?",
      category: "stress",
    },
  ],

  confused: [
    {
      id: "cf1",
      text: "How often do you feel unclear about what direction to take in life?",
      category: "cognitive",
    },
    {
      id: "cf2", 
      text: "How frequently do you postpone decisions because you're unsure?",
      category: "behavior",
    },
    {
      id: "cf3",
      text: "How much does not knowing your next step create stress?",
      category: "stress",
    },
    {
      id: "cf4",
      text: "How often do you question whether your choices are right for you?",
      category: "cognitive",
    },
    {
      id: "cf5",
      text: "How frequently do you ask others for advice but still feel lost?",
      category: "behavior",
    },
    {
      id: "cf6",
      text: "How much do mixed messages from others add to your confusion?",
      category: "stress",
    },
    {
      id: "cf7", 
      text: "How often do you feel like you don't know yourself well enough?",
      category: "cognitive",
    },
    {
      id: "cf8",
      text: "How frequently do you start things without finishing them?",
      category: "behavior",
    },
    {
      id: "cf9",
      text: "How often do you feel paralyzed by having too many options?",
      category: "cognitive",
    },
    {
      id: "cf10",
      text: "How much does uncertainty about your path create anxiety?",
      category: "stress",
    },
    {
      id: "cf11",
      text: "How frequently do you avoid committing to a direction?",
      category: "behavior",
    },
    {
      id: "cf12",
      text: "How often do you change your mind about what you want?",
      category: "cognitive",
    },
    {
      id: "cf13",
      text: "How much do you feel pulled in different directions?",
      category: "stress",
    },
    {
      id: "cf14",
      text: "How frequently do you research options endlessly without deciding?",
      category: "behavior",
    },
    {
      id: "cf15",
      text: "How often do you feel lost about your identity or values?",
      category: "cognitive",
    },
    {
      id: "cf16",
      text: "How much does lack of clarity drain your energy?",
      category: "stress",
    },
  ],

  hopeful: [
    {
      id: "hp1",
      text: "How often do you see challenges as opportunities for growth?",
      category: "cognitive",
    },
    {
      id: "hp2",
      text: "How frequently do you take active steps toward positive change?",
      category: "behavior",
    },
    {
      id: "hp3",
      text: "How much do you feel energized by the possibility of improvement?",
      category: "stress",
    },
    {
      id: "hp4",
      text: "How often do you visualize positive outcomes for your future?",
      category: "cognitive",
    },
    {
      id: "hp5",
      text: "How frequently do you share your optimism with others?",
      category: "behavior",
    },
    {
      id: "hp6",
      text: "How much do setbacks feel temporary rather than permanent to you?",
      category: "stress",
    },
    {
      id: "hp7",
      text: "How often do you look for lessons in difficult experiences?",
      category: "cognitive",
    },
    {
      id: "hp8",
      text: "How frequently do you encourage others who are struggling?",
      category: "behavior",
    },
    {
      id: "hp9",
      text: "How often do you feel excited about new beginnings?",
      category: "cognitive",
    },
    {
      id: "hp10",
      text: "How much do you feel motivated by your goals?",
      category: "stress",
    },
    {
      id: "hp11",
      text: "How frequently do you celebrate progress no matter how small?",
      category: "behavior",
    },
    {
      id: "hp12",
      text: "How often do you trust that things will work out?",
      category: "cognitive",
    },
    {
      id: "hp13",
      text: "How much do you feel hopeful even during challenges?",
      category: "stress",
    },
    {
      id: "hp14",
      text: "How frequently do you seek out inspirational content?",
      category: "behavior",
    },
    {
      id: "hp15",
      text: "How often do you believe in your ability to create change?",
      category: "cognitive",
    },
    {
      id: "hp16",
      text: "How much do you feel energized by new possibilities?",
      category: "stress",
    },
  ],

  exhausted: [
    {
      id: "ex1",
      text: "How often do you feel tired even after getting enough sleep?",
      category: "stress",
    },
    {
      id: "ex2",
      text: "How frequently do you push through fatigue instead of resting?",
      category: "behavior",
    },
    {
      id: "ex3",
      text: "How much do you feel like your energy tank is always empty?",
      category: "cognitive",
    },
    {
      id: "ex4",
      text: "How often does mental fatigue affect your physical energy?",
      category: "stress",
    },
    {
      id: "ex5",
      text: "How frequently do you feel guilty for needing more rest than others?",
      category: "cognitive",
    },
    {
      id: "ex6",
      text: "How much do you rely on caffeine or stimulants to function?",
      category: "behavior",
    },
    {
      id: "ex7",
      text: "How often do you feel too tired to enjoy things you used to love?",
      category: "cognitive",
    },
    {
      id: "ex8",
      text: "How frequently do you say yes to things when you should rest?",
      category: "behavior",
    },
    {
      id: "ex9",
      text: "How often do you feel like you're moving through fog?",
      category: "cognitive",
    },
    {
      id: "ex10",
      text: "How much does exhaustion affect your immune system?",
      category: "stress",
    },
    {
      id: "ex11",
      text: "How frequently do you skip meals because you're too tired?",
      category: "behavior",
    },
    {
      id: "ex12",
      text: "How often do you struggle to concentrate due to fatigue?",
      category: "cognitive",
    },
    {
      id: "ex13",
      text: "How much do you feel physically heavy or weighed down?",
      category: "stress",
    },
    {
      id: "ex14",
      text: "How frequently do you nap during the day out of necessity?",
      category: "behavior",
    },
    {
      id: "ex15",
      text: "How often do you feel like you can't recharge no matter what?",
      category: "cognitive",
    },
    {
      id: "ex16",
      text: "How much does exhaustion impact your mood and emotions?",
      category: "stress",
    },
  ],

  frustrated: [
    {
      id: "fr1",
      text: "How often do you feel like your efforts aren't paying off?",
      category: "cognitive",
    },
    {
      id: "fr2",
      text: "How frequently do you get irritated with people or situations?",
      category: "behavior",
    },
    {
      id: "fr3",
      text: "How much does feeling stuck create tension in your body?",
      category: "stress",
    },
    {
      id: "fr4",
      text: "How often do you think 'this shouldn't be this hard'?",
      category: "cognitive",
    },
    {
      id: "fr5",
      text: "How frequently do you snap at people when you're stressed?",
      category: "behavior",
    },
    {
      id: "fr6",
      text: "How much do unmet expectations weigh on your mind?",
      category: "stress",
    },
    {
      id: "fr7",
      text: "How often do you feel like you're fighting an uphill battle?",
      category: "cognitive",
    },
    {
      id: "fr8",
      text: "How frequently do you vent your frustrations instead of addressing root causes?",
      category: "behavior",
    },
    {
      id: "fr9",
      text: "How often do you feel like you're hitting a wall repeatedly?",
      category: "cognitive",
    },
    {
      id: "fr10",
      text: "How much does frustration build up in your chest or jaw?",
      category: "stress",
    },
    {
      id: "fr11",
      text: "How frequently do you throw your hands up and give up?",
      category: "behavior",
    },
    {
      id: "fr12",
      text: "How often do you think about how unfair things are?",
      category: "cognitive",
    },
    {
      id: "fr13",
      text: "How much does frustration make you feel physically hot or tense?",
      category: "stress",
    },
    {
      id: "fr14",
      text: "How frequently do you lash out when something goes wrong?",
      category: "behavior",
    },
    {
      id: "fr15",
      text: "How often do you replay frustrating moments in your head?",
      category: "cognitive",
    },
    {
      id: "fr16",
      text: "How much does frustration prevent you from seeing solutions?",
      category: "stress",
    },
  ],

  peaceful: [
    {
      id: "pc1",
      text: "How often do you feel centered and grounded in your daily life?",
      category: "cognitive",
    },
    {
      id: "pc2",
      text: "How frequently do you practice activities that bring you calm?",
      category: "behavior",
    },
    {
      id: "pc3",
      text: "How much do you feel at ease with uncertainty and change?",
      category: "stress",
    },
    {
      id: "pc4",
      text: "How often do you approach problems with a clear, calm mind?",
      category: "cognitive",
    },
    {
      id: "pc5",
      text: "How frequently do you make time for activities you truly enjoy?",
      category: "behavior",
    },
    {
      id: "pc6",
      text: "How much do you feel balanced between effort and rest?",
      category: "stress",
    },
    {
      id: "pc7",
      text: "How often do you feel grateful for what you have right now?",
      category: "cognitive",
    },
    {
      id: "pc8",
      text: "How frequently do you help others feel more at ease?",
      category: "behavior",
    },
    {
      id: "pc9",
      text: "How often do you feel content with where you are right now?",
      category: "cognitive",
    },
    {
      id: "pc10",
      text: "How much do you feel your nervous system is at rest?",
      category: "stress",
    },
    {
      id: "pc11",
      text: "How frequently do you engage in activities that bring you joy?",
      category: "behavior",
    },
    {
      id: "pc12",
      text: "How often do you feel acceptance toward yourself and others?",
      category: "cognitive",
    },
    {
      id: "pc13",
      text: "How much do you feel relaxed in your body throughout the day?",
      category: "stress",
    },
    {
      id: "pc14",
      text: "How frequently do you spend time in nature or calming spaces?",
      category: "behavior",
    },
    {
      id: "pc15",
      text: "How often do you feel present in the current moment?",
      category: "cognitive",
    },
    {
      id: "pc16",
      text: "How much do you feel harmony between your mind and body?",
      category: "stress",
    },
  ],
};

// Generic fallback questions (original set)
export const assessmentQuestions: AssessmentQuestion[] = [
  {
    id: "q1",
    text: "How often do you feel overwhelmed by your responsibilities?",
    category: "stress",
  },
  {
    id: "q2",
    text: "When facing a difficult situation, how likely are you to avoid it?",
    category: "behavior",
  },
  {
    id: "q3",
    text: "How frequently do you compare yourself to others?",
    category: "cognitive",
  },
  {
    id: "q4",
    text: "How often do deadlines create anxiety for you?",
    category: "stress",
  },
  {
    id: "q5",
    text: "How much do you internalize pressure rather than expressing it?",
    category: "cognitive",
  },
  {
    id: "q6",
    text: "How often do you set expectations for yourself that feel unreachable?",
    category: "behavior",
  },
  {
    id: "q7",
    text: "How affected are you by uncertainty about the future?",
    category: "cognitive",
  },
  {
    id: "q8",
    text: "How often do you put off self-care when feeling stressed?",
    category: "behavior",
  },
];

/* ——— Function to get questions based on emotional state ——— */
export function getQuestionsForState(onboardingSelection: OnboardingSelection): AssessmentQuestion[] {
  if (!onboardingSelection || !(onboardingSelection in questionSets)) {
    return assessmentQuestions; // Fallback to generic questions
  }
  
  const allQuestions = questionSets[onboardingSelection];
  
  // Shuffle the questions using Fisher-Yates algorithm
  const shuffled = [...allQuestions];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  
  // Return only 8 random questions from the shuffled array
  return shuffled.slice(0, 8);
}

/* ——— Curated Insight Fragments ——— */
/* These are NOT AI-generated. They are pre-written, observational, neutral. */
const insightFragments: InsightFragment[] = [
  // Cognitive patterns
  {
    id: "c1",
    category: "cognitive",
    text: "You tend to internalize pressure rather than externalizing it.",
    minScore: 3.5,
    maxScore: 5,
  },
  {
    id: "c2",
    category: "cognitive",
    text: "You appear to process stress through comparison with others.",
    minScore: 3,
    maxScore: 5,
  },
  {
    id: "c3",
    category: "cognitive",
    text: "You seem most affected by uncertainty about outcomes.",
    minScore: 3.5,
    maxScore: 5,
  },
  {
    id: "c4",
    category: "cognitive",
    text: "Your thought patterns suggest a preference for clarity and structure.",
    minScore: 1,
    maxScore: 3,
  },
  {
    id: "c5",
    category: "cognitive",
    text: "You show a tendency to reflect deeply before taking action.",
    minScore: 2,
    maxScore: 4,
  },

  // Stress triggers
  {
    id: "s1",
    category: "stress",
    text: "Deadlines without clarity appear to be a significant stressor.",
    minScore: 3.5,
    maxScore: 5,
  },
  {
    id: "s2",
    category: "stress",
    text: "Responsibility accumulation seems to weigh on you more than individual tasks.",
    minScore: 3,
    maxScore: 5,
  },
  {
    id: "s3",
    category: "stress",
    text: "Your stress response appears to be activated by external expectations.",
    minScore: 3,
    maxScore: 5,
  },
  {
    id: "s4",
    category: "stress",
    text: "You seem to manage day-to-day pressures with relative steadiness.",
    minScore: 1,
    maxScore: 2.5,
  },
  {
    id: "s5",
    category: "stress",
    text: "Social comparison may be amplifying your stress levels.",
    minScore: 3,
    maxScore: 5,
  },

  // Behavior insights
  {
    id: "b1",
    category: "behavior",
    text: "You may lean toward avoidance when feeling overwhelmed.",
    minScore: 3.5,
    maxScore: 5,
  },
  {
    id: "b2",
    category: "behavior",
    text: "High self-expectations appear to shape your daily decisions.",
    minScore: 3,
    maxScore: 5,
  },
  {
    id: "b3",
    category: "behavior",
    text: "Self-care tends to decrease as your stress increases.",
    minScore: 3.5,
    maxScore: 5,
  },
  {
    id: "b4",
    category: "behavior",
    text: "You seem to maintain consistent routines even under pressure.",
    minScore: 1,
    maxScore: 2.5,
  },
  {
    id: "b5",
    category: "behavior",
    text: "Your approach suggests a pattern of pushing through rather than pausing.",
    minScore: 2.5,
    maxScore: 4.5,
  },
];

/* ——— Scoring Engine ——— */
export function calculateStressProfile(
  answers: AssessmentAnswer[],
  onboardingSelection?: OnboardingSelection
): StressProfile {
  const categories = { cognitive: [] as number[], stress: [] as number[], behavior: [] as number[] };
  
  // Get the appropriate question set
  const questions = onboardingSelection ? getQuestionsForState(onboardingSelection) : assessmentQuestions;

  for (const answer of answers) {
    const question = questions.find((q) => q.id === answer.questionId);
    if (question) {
      categories[question.category].push(answer.score);
    }
  }

  const avg = (arr: number[]) =>
    arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : 0;

  const cognitive = avg(categories.cognitive);
  const stress = avg(categories.stress);
  const behavior = avg(categories.behavior);
  const overall = avg([cognitive, stress, behavior]);

  return {
    cognitive: Math.round(cognitive * 100) / 100,
    stress: Math.round(stress * 100) / 100,
    behavior: Math.round(behavior * 100) / 100,
    overall: Math.round(overall * 100) / 100,
  };
}

/* ——— Insight Assembly (retrieval-based, NOT raw prompting) ——— */
export function assembleInsights(profile: StressProfile): InsightCard[] {
  const insights: InsightCard[] = [];

  const matchFragments = (
    category: "cognitive" | "stress" | "behavior",
    score: number
  ) => {
    return insightFragments
      .filter(
        (f) =>
          f.category === category &&
          score >= f.minScore &&
          score <= f.maxScore
      )
      .slice(0, 2);
  };

  const cognitiveFragments = matchFragments("cognitive", profile.cognitive);
  const stressFragments = matchFragments("stress", profile.stress);
  const behaviorFragments = matchFragments("behavior", profile.behavior);

  for (const f of cognitiveFragments) {
    insights.push({ category: "cognitive", text: f.text });
  }
  for (const f of stressFragments) {
    insights.push({ category: "stress", text: f.text });
  }
  for (const f of behaviorFragments) {
    insights.push({ category: "behavior", text: f.text });
  }

  /* Ensure at least one insight per category */
  const cats: Array<"cognitive" | "stress" | "behavior"> = [
    "cognitive",
    "stress",
    "behavior",
  ];
  for (const cat of cats) {
    if (!insights.some((i) => i.category === cat)) {
      const fallback = insightFragments.find((f) => f.category === cat);
      if (fallback) {
        insights.push({ category: cat, text: fallback.text });
      }
    }
  }

  return insights;
}

/* ——— Crisis Resources ——— */
export const crisisResources = [
  {
    name: "988 Suicide & Crisis Lifeline",
    description: "Free, confidential, 24/7 support",
    contact: "Call or text 988",
    type: "hotline" as const,
  },
  {
    name: "Crisis Text Line",
    description: "Text-based crisis support",
    contact: "Text HOME to 741741",
    type: "hotline" as const,
  },
  {
    name: "Campus Counseling Center",
    description: "Your university counseling services",
    contact: "Check your campus directory",
    type: "campus" as const,
  },
  {
    name: "Breathing Guide",
    description: "A simple guided breathing exercise",
    contact: "Available in-app",
    type: "breathing" as const,
  },
  {
    name: "Contact Support",
    description: "A support contact option",
    contact: "Available in-app",
    type: "grounding" as const,
  },
];
