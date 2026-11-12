/**
 * Web Speech API wrapper for authentic Russian pronunciation.
 * Prioritizes Russian language voices (ru-RU) and handles speed adjustment.
 */

class RussianAudioPlayer {
  private synth: SpeechSynthesis | null = null;
  private russianVoices: SpeechSynthesisVoice[] = [];
  private isLoaded = false;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
      this.initVoices();
      if (this.synth.onvoiceschanged !== undefined) {
        this.synth.onvoiceschanged = () => this.initVoices();
      }
    }
  }

  private initVoices() {
    if (!this.synth) return;
    const voices = this.synth.getVoices();
    this.russianVoices = voices.filter(
      (v) => v.lang.startsWith('ru') || v.lang.includes('RU')
    );
    this.isLoaded = true;
  }

  public isSupported(): boolean {
    return !!this.synth;
  }

  public getAvailableVoiceName(): string {
    if (this.russianVoices.length > 0) {
      return this.russianVoices[0].name;
    }
    return 'Voz padrão do navegador';
  }

  public speak(text: string, rate = 0.9): Promise<void> {
    return new Promise((resolve) => {
      if (!this.synth) {
        resolve();
        return;
      }

      // Cancel previous utterances to avoid queuing delay
      this.synth.cancel();

      // Normalize cyrillic text for clean pronunciation
      const cleanText = text.trim();
      if (!cleanText) {
        resolve();
        return;
      }

      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = 'ru-RU';
      utterance.rate = Math.max(0.6, Math.min(1.2, rate));
      utterance.pitch = 1.0;

      if (this.russianVoices.length > 0) {
        utterance.voice = this.russianVoices[0];
      }

      utterance.onend = () => resolve();
      utterance.onerror = (e) => {
        console.warn('Síntese de voz em russo:', e);
        resolve();
      };

      try {
        this.synth.speak(utterance);
      } catch (err) {
        console.warn('Erro ao reproduzir voz:', err);
        resolve();
      }
    });
  }

  public stop() {
    if (this.synth) {
      this.synth.cancel();
    }
  }
}

export const russianAudio = new RussianAudioPlayer();
