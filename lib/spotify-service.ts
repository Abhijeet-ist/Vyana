// Spotify API Integration for Dynamic Music Recommendations
import type { MusicRecommendation, OnboardingSelection, StressProfile } from "@/types";

interface SpotifyTrack {
  id: string;
  name: string;
  artists: Array<{ name: string }>;
  duration_ms: number;
  preview_url?: string;
  external_urls: { spotify: string };
  album: {
    name: string;
    images: Array<{ url: string; height: number; width: number }>;
  };
}

interface SpotifyAudioFeatures {
  danceability: number;
  energy: number;
  valence: number;
  acousticness: number;
  instrumentalness: number;
  speechiness: number;
  liveness: number;
  tempo: number;
}

interface SpotifySearchResponse {
  tracks: {
    items: SpotifyTrack[];
  };
}

export class SpotifyMusicService {
  private accessToken = 'BQBOpi0akdePezT24hgqdJJ1ML9GPv0tMxT7O1B5K239m9IYwxk-720Vz17Vt8plivq2vmyGnbqv8SnKsPVD9h9lCrypHCm-ECe9vYlPDVww4L0sYFiHPLo6lYy_EQdHf4f3YKmAyQlaHMfvUuDqJLCk_jBD_5mzx6z-A0vyIKKVAousK7vusB1NUA2NSdLQAG68IzNLC2jDkLLVzT9VCe2btvuuA1xklmt9sV9wsbLp-xIJkL6z5WqeEYBbNrZdGRbzAXNeuFHWv9sku-Keu4SFV-n4lRgfrrY9GftsviJnIfxYGQUpAcK4JxEq_Obp42nO';

  // Generate search queries based on emotional state and profile
  generateMusicQuery(emotionalState: OnboardingSelection, profile: StressProfile): string {
    const emotionalQueries: Record<string, string> = {
      overwhelmed: 'calm peaceful ambient meditation stress relief',
      anxious: 'soothing relaxing anxiety relief calming music',
      lonely: 'emotional healing indie folk acoustic connection',
      'burned-out': 'recovery gentle restorative ambient healing',
      confused: 'contemplative reflective clarity focus',
      hopeful: 'uplifting inspiring positive acoustic motivation',
      exhausted: 'gentle sleep meditation calm restorative',
      frustrated: 'calming emotional release therapeutic music',
      peaceful: 'serene meditation mindfulness zen nature',
      'just-checking': 'feel good indie positive acoustic upbeat'
    };

    let baseQuery = emotionalQueries[emotionalState as string] || 'relaxing music';
    
    // Adjust query based on stress level
    if (profile.stress > 4) {
      baseQuery += ' deep relaxation immediate relief';
    } else if (profile.stress < 2) {
      baseQuery += ' gentle uplifting positive';
    }

    return baseQuery;
  }

  // Search for tracks using Spotify API
  async searchTracks(query: string, limit = 10): Promise<SpotifyTrack[]> {
    try {
      console.log(`Searching Spotify for: "${query}"`);
      
      const response = await fetch(
        `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=${limit}`,
        {
          headers: {
            'Authorization': `Bearer ${this.accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        console.error(`Spotify API error: ${response.status} ${response.statusText}`);
        return [];
      }

      const data: SpotifySearchResponse = await response.json();
      return data.tracks.items || [];
    } catch (error) {
      console.error('Spotify search failed:', error);
      return [];
    }
  }

  // Get audio features for a single track
  async getAudioFeatures(trackId: string): Promise<SpotifyAudioFeatures | null> {
    try {
      const response = await fetch(
        `https://api.spotify.com/v1/audio-features/${trackId}`,
        {
          headers: {
            'Authorization': `Bearer ${this.accessToken}`,
          },
        }
      );

      if (!response.ok) {
        console.error(`Audio features API error: ${response.status}`);
        return null;
      }

      return await response.json();
    } catch (error) {
      console.error('Audio features fetch failed:', error);
      return null;
    }
  }

  // Convert Spotify track to our MusicRecommendation format
  convertSpotifyTrack(
    track: SpotifyTrack, 
    audioFeatures: SpotifyAudioFeatures | null,
    emotionalState: OnboardingSelection
  ): MusicRecommendation {
    const mood = this.inferMood(audioFeatures);
    const tags = this.generateTags(audioFeatures, emotionalState);
    const emotionalProfile = this.calculateEmotionalProfile(audioFeatures);
    
    return {
      id: `spotify_${track.id}`,
      title: track.name,
      artist: track.artists[0]?.name || 'Unknown Artist',
      genre: this.inferGenre(audioFeatures),
      mood,
      tags,
      duration: this.formatDuration(track.duration_ms),
      emotionalProfile,
      energyLevel: Math.round((audioFeatures?.energy || 0.5) * 5),
      valence: Math.round((audioFeatures?.valence || 0.5) * 5),
      spotifyId: track.id,
      acousticFeatures: audioFeatures ? {
        danceability: audioFeatures.danceability,
        energy: audioFeatures.energy,
        speechiness: audioFeatures.speechiness,
        liveness: audioFeatures.liveness,
      } : undefined,
      source: 'api' as const
    };
  }

  private inferMood(features: SpotifyAudioFeatures | null): string {
    if (!features) return 'calming';
    
    if (features.energy < 0.3 && features.valence < 0.4) return 'melancholic';
    if (features.energy < 0.3 && features.valence > 0.6) return 'peaceful';
    if (features.energy > 0.7 && features.valence > 0.6) return 'uplifting';
    if (features.energy < 0.4) return 'calming';
    if (features.valence < 0.3) return 'contemplative';
    if (features.valence > 0.6) return 'hopeful';
    return 'meditative';
  }

  private generateTags(features: SpotifyAudioFeatures | null, emotionalState: OnboardingSelection): string[] {
    const tags: string[] = [];
    
    // Audio feature based tags
    if (features) {
      if (features.acousticness > 0.7) tags.push('acoustic');
      if (features.instrumentalness > 0.5) tags.push('instrumental');
      if (features.energy < 0.3) tags.push('gentle');
      if (features.valence > 0.7) tags.push('uplifting');
      if (features.valence < 0.3) tags.push('emotional');
      if (features.danceability < 0.4) tags.push('contemplative');
    }
    
    // Emotional state based tags
    const stateTagMapping: Record<string, string[]> = {
      overwhelmed: ['stress-relief', 'calming'],
      anxious: ['anxiety-relief', 'soothing'],
      lonely: ['connection', 'healing'],
      'burned-out': ['restorative', 'recovery'],
      confused: ['clarity', 'focus'],
      hopeful: ['inspiring', 'positive'],
      exhausted: ['restorative', 'gentle'],
      frustrated: ['calming', 'release'],
      peaceful: ['mindfulness', 'serene'],
      'just-checking': ['feel-good', 'positive']
    };
    
    const stateTags = stateTagMapping[emotionalState as string] || ['therapeutic'];
    tags.push(...stateTags);
    
    // Ensure we have at least 3 tags
    const defaultTags = ['therapeutic', 'wellness', 'mindful', 'healing'];
    while (tags.length < 3) {
      const defaultTag = defaultTags[tags.length] || 'music';
      if (!tags.includes(defaultTag)) {
        tags.push(defaultTag);
      }
    }
    
    return tags.slice(0, 5);
  }

  private calculateEmotionalProfile(features: SpotifyAudioFeatures | null): {
    stress: number;
    cognitive: number;
    behavior: number;
  } {
    if (!features) {
      return { stress: 3, cognitive: 3, behavior: 3 };
    }
    
    // Map audio features to emotional dimensions
    const stress = Math.max(1, Math.min(5, 5 - (features.energy * 2 + features.valence * 2)));
    const cognitive = Math.max(1, Math.min(5, features.acousticness * 3 + features.instrumentalness * 2));
    const behavior = Math.max(1, Math.min(5, features.danceability * 3 + features.energy * 2));
    
    return {
      stress: parseFloat(stress.toFixed(1)),
      cognitive: parseFloat(cognitive.toFixed(1)),
      behavior: parseFloat(behavior.toFixed(1))
    };
  }

  private inferGenre(features: SpotifyAudioFeatures | null): string {
    if (!features) return 'Alternative/Indie';
    
    if (features.acousticness > 0.7) return 'Folk/Acoustic';
    if (features.instrumentalness > 0.7) return 'Ambient/Instrumental';
    if (features.energy > 0.7) return 'Electronic/Upbeat';
    if (features.danceability > 0.7) return 'Pop/Dance';
    if (features.valence < 0.3) return 'Alternative/Indie';
    return 'Indie/Alternative';
  }

  private formatDuration(ms: number): string {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }

  // Main method to get music recommendations from Spotify
  async getRecommendations(
    emotionalState: OnboardingSelection,
    profile: StressProfile,
    count: number = 3
  ): Promise<MusicRecommendation[]> {
    try {
      // Generate search query
      const query = this.generateMusicQuery(emotionalState, profile);
      
      // Search for tracks
      const tracks = await this.searchTracks(query, count * 3); // Get more to filter from
      
      if (tracks.length === 0) {
        console.warn('No tracks found from Spotify');
        return [];
      }
      
      // Get audio features and convert to recommendations
      const recommendations: MusicRecommendation[] = [];
      
      for (let i = 0; i < Math.min(tracks.length, count); i++) {
        const track = tracks[i];
        const audioFeatures = await this.getAudioFeatures(track.id);
        
        const recommendation = this.convertSpotifyTrack(
          track, 
          audioFeatures, 
          emotionalState
        );
        
        recommendations.push(recommendation);
        
        // Add small delay to avoid rate limiting
        if (i < count - 1) {
          await new Promise(resolve => setTimeout(resolve, 100));
        }
      }
      
      console.log(`Generated ${recommendations.length} Spotify recommendations`);
      return recommendations;
      
    } catch (error) {
      console.error('Spotify recommendation generation failed:', error);
      return [];
    }
  }

  // Test connection to Spotify API
  async testConnection(): Promise<boolean> {
    try {
      const response = await fetch(`https://api.spotify.com/v1/me`, {
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
        },
      });
      
      return response.ok;
    } catch (error) {
      console.error('Spotify connection test failed:', error);
      return false;
    }
  }
}

// Singleton instance
export const spotifyService = new SpotifyMusicService();