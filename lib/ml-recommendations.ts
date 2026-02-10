import type { AssessmentAnswer, OnboardingSelection, StressProfile } from "@/types";
import { 
  bookDataset, 
  musicDataset, 
  emotionalStateMapping,
  type BookRecommendation, 
  type MusicRecommendation 
} from "./datasets";

export interface Recommendation {
  books: BookRecommendation[];
  music: MusicRecommendation[];
  confidenceScore: number;
}

// Cosine similarity function
function cosineSimilarity(vecA: number[], vecB: number[]): number {
  const dotProduct = vecA.reduce((sum, a, i) => sum + a * vecB[i], 0);
  const magnitudeA = Math.sqrt(vecA.reduce((sum, a) => sum + a * a, 0));
  const magnitudeB = Math.sqrt(vecB.reduce((sum, b) => sum + b * b, 0));
  
  if (magnitudeA === 0 || magnitudeB === 0) return 0;
  return dotProduct / (magnitudeA * magnitudeB);
}

// Euclidean distance (normalized as similarity)
function euclideanSimilarity(vecA: number[], vecB: number[]): number {
  const distance = Math.sqrt(vecA.reduce((sum, a, i) => sum + (a - vecB[i]) ** 2, 0));
  const maxDistance = Math.sqrt(vecA.length * 25); // Max possible distance for scale 1-5
  return 1 - (distance / maxDistance); // Convert distance to similarity (0-1)
}

// Weighted similarity based on emotional state preferences
function calculateWeightedSimilarity(
  userProfile: StressProfile,
  itemProfile: { stress: number; cognitive: number; behavior: number },
  emotionalState: OnboardingSelection
): number {
  if (!emotionalState || !(emotionalState in emotionalStateMapping)) {
    // Fallback to simple euclidean similarity
    const userVec = [userProfile.stress, userProfile.cognitive, userProfile.behavior];
    const itemVec = [itemProfile.stress, itemProfile.cognitive, itemProfile.behavior];
    return euclideanSimilarity(userVec, itemVec);
  }

  const weights = emotionalStateMapping[emotionalState];
  
  const weightedUserVec = [
    userProfile.stress * weights.stressWeight,
    userProfile.cognitive * weights.cognitiveWeight,
    userProfile.behavior * weights.behaviorWeight
  ];
  
  const weightedItemVec = [
    itemProfile.stress * weights.stressWeight,
    itemProfile.cognitive * weights.cognitiveWeight,
    itemProfile.behavior * weights.behaviorWeight
  ];

  return cosineSimilarity(weightedUserVec, weightedItemVec);
}

// Content-based filtering for genre/mood preferences
function getContentScore(
  emotionalState: OnboardingSelection,
  bookGenre?: string,
  musicMood?: string
): number {
  if (!emotionalState || !(emotionalState in emotionalStateMapping)) return 0.5;
  
  const preferences = emotionalStateMapping[emotionalState];
  
  if (bookGenre && preferences.bookGenrePreference.includes(bookGenre)) {
    return 1.0;
  }
  
  if (musicMood && preferences.musicMoodPreference.includes(musicMood)) {
    return 1.0;
  }
  
  return 0.3; // Lower score for non-matching genres/moods
}

// Enhanced scoring for music based on energy and valence
function getMusicEnergyValenceScore(
  music: MusicRecommendation,
  emotionalState: OnboardingSelection
): number {
  if (!emotionalState || !(emotionalState in emotionalStateMapping)) return 0.5;
  
  const preferences = emotionalStateMapping[emotionalState];
  
  const energyMatch = preferences.preferredEnergyLevel.includes(music.energyLevel) ? 1 : 0.3;
  const valenceMatch = preferences.preferredValence.includes(music.valence) ? 1 : 0.3;
  
  return (energyMatch + valenceMatch) / 2;
}

// Diversity injection to avoid too similar recommendations
function diversifyRecompendations<T extends { genre?: string; mood?: string; tags: string[] }>(
  items: T[],
  maxItems: number
): T[] {
  if (items.length <= maxItems) return items;
  
  const diversified: T[] = [items[0]]; // Start with highest scoring item
  
  for (let i = 1; i < items.length && diversified.length < maxItems; i++) {
    const candidate = items[i];
    
    // Check diversity - avoid items with too similar tags/genres
    const isDistinct = diversified.every(existing => {
      const commonTags = candidate.tags.filter(tag => existing.tags.includes(tag));
      const genreMatch = candidate.genre === existing.genre || candidate.mood === existing.mood;
      
      // Allow if fewer than 50% common tags and different genre/mood
      return commonTags.length / candidate.tags.length < 0.5 || !genreMatch;
    });
    
    if (isDistinct) {
      diversified.push(candidate);
    }
  }
  
  // Fill remaining slots with highest scoring items if diversity filtering was too strict
  while (diversified.length < maxItems && diversified.length < items.length) {
    for (const item of items) {
      if (!diversified.includes(item) && diversified.length < maxItems) {
        diversified.push(item);
      }
    }
  }
  
  return diversified;
}

// Main ML recommendation engine
export class MLRecommendationEngine {
  private userProfile: StressProfile;
  private emotionalState: OnboardingSelection;
  private answers: AssessmentAnswer[];

  constructor(
    answers: AssessmentAnswer[], 
    profile: StressProfile, 
    emotionalState: OnboardingSelection
  ) {
    this.answers = answers;
    this.userProfile = profile;
    this.emotionalState = emotionalState;
  }

  // Generate book recommendations
  generateBookRecommendations(limit: number = 3): BookRecommendation[] {
    const scoredBooks = bookDataset.map(book => {
      // 1. Profile similarity (40% weight)
      const profileSimilarity = calculateWeightedSimilarity(
        this.userProfile, 
        book.emotionalProfile, 
        this.emotionalState
      );
      
      // 2. Content-based filtering (30% weight)
      const contentScore = getContentScore(this.emotionalState, book.genre);
      
      // 3. Target mood matching (30% weight)
      const moodScore = this.emotionalState && book.targetMoods.includes(this.emotionalState) ? 1 : 0.4;
      
      const totalScore = (profileSimilarity * 0.4) + (contentScore * 0.3) + (moodScore * 0.3);
      
      return { ...book, score: totalScore };
    });

    // Sort by score and apply diversity
    const sortedBooks = scoredBooks.sort((a, b) => b.score - a.score);
    return diversifyRecompendations(sortedBooks, limit);
  }

  // Generate music recommendations
  generateMusicRecommendations(limit: number = 4): MusicRecommendation[] {
    const scoredMusic = musicDataset.map(music => {
      // 1. Profile similarity (35% weight)
      const profileSimilarity = calculateWeightedSimilarity(
        this.userProfile, 
        music.emotionalProfile, 
        this.emotionalState
      );
      
      // 2. Energy and valence matching (35% weight) 
      const energyValenceScore = getMusicEnergyValenceScore(music, this.emotionalState);
      
      // 3. Mood/genre content filtering (30% weight)
      const contentScore = getContentScore(this.emotionalState, undefined, music.mood);
      
      const totalScore = (profileSimilarity * 0.35) + (energyValenceScore * 0.35) + (contentScore * 0.3);
      
      return { ...music, score: totalScore };
    });

    // Sort by score and apply diversity
    const sortedMusic = scoredMusic.sort((a, b) => b.score - a.score);
    return diversifyRecompendations(sortedMusic, limit);
  }

  // Calculate confidence in recommendations
  calculateConfidence(): number {
    // Confidence based on:
    // 1. How many questions were answered (completeness)
    // 2. How consistent the answers are (variance)
    // 3. How well the emotional state matches typical patterns
    
    const answerCompleteness = Math.min(this.answers.length / 8, 1); // Assume 8 questions max
    
    const scores = this.answers.map(a => a.score);
    const meanScore = scores.reduce((a, b) => a + b, 0) / scores.length;
    const variance = scores.reduce((sum, score) => sum + Math.pow(score - meanScore, 2), 0) / scores.length;
    const consistency = Math.max(0, 1 - variance / 2); // Lower variance = higher consistency
    
    // Emotional state clarity (some states have clearer recommendation patterns)
    const stateClarity = this.emotionalState && this.emotionalState in emotionalStateMapping ? 1 : 0.5;
    
    return (answerCompleteness * 0.4 + consistency * 0.4 + stateClarity * 0.2) * 100;
  }

  // Generate complete recommendations with confidence
  generateRecommendations(): Recommendation {
    return {
      books: this.generateBookRecommendations(3),
      music: this.generateMusicRecommendations(4),
      confidenceScore: this.calculateConfidence()
    };
  }
}

// Factory function for easy use
export function generatePersonalizedRecommendations(
  answers: AssessmentAnswer[],
  profile: StressProfile,
  emotionalState: OnboardingSelection
): Recommendation {
  const engine = new MLRecommendationEngine(answers, profile, emotionalState);
  return engine.generateRecommendations();
}