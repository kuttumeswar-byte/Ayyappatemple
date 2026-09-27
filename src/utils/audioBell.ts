import { useState, useEffect } from 'react';

/**
 * Sacred Bronze Temple Bell Synthesizer & Continuous Looper (Web Audio API)
 * Rings continuously with resonant temple cadence until muted by the devotee.
 */

type BellListener = (isPlaying: boolean) => void;

let audioCtx: AudioContext | null = null;
let loopTimer: number | null = null;
let isPlaying = false;
let userExplicitlyMuted = false;
let hasAutoStarted = false;
const listeners = new Set<BellListener>();
let masterLoopGain: GainNode | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  const AudioContextClass =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  if (!AudioContextClass) return null;

  if (!audioCtx) {
    audioCtx = new AudioContextClass();
  }
  return audioCtx;
}

function notifyListeners() {
  listeners.forEach((listener) => {
    try {
      listener(isPlaying);
    } catch (e) {
      console.error(e);
    }
  });
}

function strikeBronzeBell(ctx: AudioContext, master: GainNode, strikeVelocity = 0.75) {
  const now = ctx.currentTime;
  
  // Harmonic partial frequencies for sacred bronze bell resonance
  const partials = [
    { freq: 432, gain: 0.65 * strikeVelocity, decay: 3.2 },     // Fundamental Om root
    { freq: 864, gain: 0.45 * strikeVelocity, decay: 2.8 },     // Octave
    { freq: 1185, gain: 0.35 * strikeVelocity, decay: 2.3 },    // Minor third overtone (characteristic of bronze bells)
    { freq: 1728, gain: 0.22 * strikeVelocity, decay: 1.8 },    // High harmonic ring
    { freq: 2592, gain: 0.12 * strikeVelocity, decay: 1.1 },    // Crisp strike transient
  ];

  partials.forEach(({ freq, gain, decay }) => {
    const osc = ctx.createOscillator();
    const oscGain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);

    oscGain.gain.setValueAtTime(gain, now);
    oscGain.gain.exponentialRampToValueAtTime(0.00001, now + decay);

    osc.connect(oscGain);
    oscGain.connect(master);

    osc.start(now);
    osc.stop(now + decay);
  });

  // Deep warm sub-harmonic resonance
  const subOsc = ctx.createOscillator();
  const subGain = ctx.createGain();
  subOsc.type = 'triangle';
  subOsc.frequency.setValueAtTime(216, now);
  subGain.gain.setValueAtTime(0.22 * strikeVelocity, now);
  subGain.gain.exponentialRampToValueAtTime(0.00001, now + 3.0);
  subOsc.connect(subGain);
  subGain.connect(master);
  subOsc.start(now);
  subOsc.stop(now + 3.0);
}

/**
 * Start continuous temple bell ringing in rhythmic sacred cadence
 */
export function startTempleBellLoop() {
  userExplicitlyMuted = false;

  const ctx = getAudioContext();
  if (!ctx) return;

  if (ctx.state === 'suspended') {
    ctx.resume().catch(() => {});
  }

  if (isPlaying) return;

  isPlaying = true;
  notifyListeners();

  // Create clean master gain for the loop
  masterLoopGain = ctx.createGain();
  masterLoopGain.gain.setValueAtTime(0.75, ctx.currentTime);
  masterLoopGain.connect(ctx.destination);

  // Play immediate first strike
  strikeBronzeBell(ctx, masterLoopGain, 0.85);

  // Recurring cadence strike function
  const scheduleNext = () => {
    if (!isPlaying || !ctx || !masterLoopGain) return;
    
    // Natural human cadence variation in strike dynamics
    const velocity = 0.7 + Math.random() * 0.15;
    strikeBronzeBell(ctx, masterLoopGain, velocity);

    // Sacred cadence interval: ~1650ms (allows previous strike decay to sing)
    const delay = 1600 + Math.random() * 120;
    loopTimer = window.setTimeout(scheduleNext, delay);
  };

  loopTimer = window.setTimeout(scheduleNext, 1650);
}

/**
 * Gracefully stop / mute continuous temple bell ringing
 */
export function stopTempleBellLoop(isExplicitMute = true) {
  if (isExplicitMute) {
    userExplicitlyMuted = true;
  }

  if (!isPlaying) return;

  isPlaying = false;
  notifyListeners();

  if (loopTimer !== null) {
    clearTimeout(loopTimer);
    loopTimer = null;
  }

  if (audioCtx && masterLoopGain) {
    try {
      const now = audioCtx.currentTime;
      masterLoopGain.gain.cancelScheduledValues(now);
      masterLoopGain.gain.setValueAtTime(masterLoopGain.gain.value, now);
      masterLoopGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.45);
      setTimeout(() => {
        masterLoopGain?.disconnect();
        masterLoopGain = null;
      }, 500);
    } catch {
      masterLoopGain?.disconnect();
      masterLoopGain = null;
    }
  }
}

/**
 * Toggle continuous temple bell between playing and muted
 */
export function toggleTempleBellLoop(): boolean {
  if (isPlaying) {
    stopTempleBellLoop(true);
    return false;
  } else {
    userExplicitlyMuted = false;
    startTempleBellLoop();
    return true;
  }
}

/**
 * Check if the bell is currently ringing
 */
export function isTempleBellPlaying(): boolean {
  return isPlaying;
}

/**
 * Check if user explicitly muted the bell
 */
export function isExplicitlyMuted(): boolean {
  return userExplicitlyMuted;
}

/**
 * Automatically starts the temple bell when a user visits the website.
 * Attempts immediate playback, with fallback listeners on first user gesture
 * if modern browser autoplay policy holds the audio context in suspended state.
 */
export function autoStartTempleBellOnVisit() {
  if (typeof window === 'undefined') return;
  if (hasAutoStarted) return;
  hasAutoStarted = true;

  const tryStart = async () => {
    if (userExplicitlyMuted || isPlaying) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      if (ctx.state === 'suspended') {
        await ctx.resume();
      }
      if (ctx.state === 'running' && !userExplicitlyMuted && !isPlaying) {
        startTempleBellLoop();
      }
    } catch {
      // Browser autoplay policy might restrict until user interacts
    }
  };

  // Immediate attempt on visit
  tryStart();

  // If the browser blocked immediate autoplay, unlock and start on very first interaction
  const onFirstInteraction = async () => {
    if (userExplicitlyMuted) {
      cleanupListeners();
      return;
    }

    try {
      const ctx = getAudioContext();
      if (ctx && ctx.state === 'suspended') {
        await ctx.resume();
      }
      if (!userExplicitlyMuted && !isPlaying) {
        startTempleBellLoop();
      }
    } catch {
      // ignore
    }
    cleanupListeners();
  };

  const cleanupListeners = () => {
    window.removeEventListener('pointerdown', onFirstInteraction);
    window.removeEventListener('click', onFirstInteraction);
    window.removeEventListener('touchstart', onFirstInteraction);
    window.removeEventListener('keydown', onFirstInteraction);
    window.removeEventListener('scroll', onFirstInteraction);
  };

  window.addEventListener('pointerdown', onFirstInteraction, { once: true, passive: true });
  window.addEventListener('click', onFirstInteraction, { once: true, passive: true });
  window.addEventListener('touchstart', onFirstInteraction, { once: true, passive: true });
  window.addEventListener('keydown', onFirstInteraction, { once: true, passive: true });
  window.addEventListener('scroll', onFirstInteraction, { once: true, passive: true });
}

/**
 * Subscribe to bell ringing state changes
 */
export function subscribeTempleBell(listener: BellListener): () => void {
  listeners.add(listener);
  listener(isPlaying);
  return () => {
    listeners.delete(listener);
  };
}

/**
 * Standard trigger (toggles continuous bell playback so it continues until muted)
 */
export function playTempleBell() {
  toggleTempleBellLoop();
}

/**
 * React hook to bind any UI component directly to the persistent bell state
 */
export function useTempleBell() {
  const [playing, setPlaying] = useState<boolean>(isPlaying);

  useEffect(() => {
    const unsubscribe = subscribeTempleBell((state) => {
      setPlaying(state);
    });
    return unsubscribe;
  }, []);

  return {
    isPlaying: playing,
    start: startTempleBellLoop,
    stop: stopTempleBellLoop,
    toggle: toggleTempleBellLoop,
    autoStart: autoStartTempleBellOnVisit,
  };
}
