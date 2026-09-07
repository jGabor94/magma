"use client";

import { ERUPTION_CONFIG } from "@/features/game/config";
import { useCallback, useEffect, useRef } from "react";

const useEruptionSound = () => {
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioBufferRef = useRef<AudioBuffer | null>(null);
  const audioBufferPromiseRef = useRef<Promise<AudioBuffer | null> | null>(null);

  const getAudioContext = useCallback(() => {
    if (!audioContextRef.current || audioContextRef.current.state === "closed") {
      audioContextRef.current = new window.AudioContext();
    }

    return audioContextRef.current;
  }, []);

  useEffect(() => {
    const audioContext = getAudioContext();
    const abortController = new AbortController();
    let ignoreLoadedAudio = false;

    audioBufferPromiseRef.current = fetch(ERUPTION_CONFIG.soundPath, {
      signal: abortController.signal,
    })
      .then((response) => {
        if (!response.ok) throw new Error("Failed to load eruption sound");
        return response.arrayBuffer();
      })
      .then((arrayBuffer) => audioContext.decodeAudioData(arrayBuffer))
      .then((audioBuffer) => {
        if (ignoreLoadedAudio) return null;

        audioBufferRef.current = audioBuffer;
        return audioBuffer;
      })
      .catch(() => null);

    const unlockAudio = () => {
      if (audioContext.state === "suspended") {
        void audioContext.resume();
      }
    };

    window.addEventListener("pointerdown", unlockAudio, {
      capture: true,
      once: true,
    });
    window.addEventListener("keydown", unlockAudio, { once: true });

    return () => {
      ignoreLoadedAudio = true;
      abortController.abort();
      window.removeEventListener("pointerdown", unlockAudio, true);
      window.removeEventListener("keydown", unlockAudio);
      audioBufferRef.current = null;
      audioBufferPromiseRef.current = null;
      audioContextRef.current = null;

      if (audioContext.state !== "closed") {
        void audioContext.close();
      }
    };
  }, [getAudioContext]);

  return useCallback(() => {
    const audioContext = getAudioContext();
    const requestedAt = performance.now();
    const play = (audioBuffer: AudioBuffer | null) => {
      if (!audioBuffer) return;
      if (performance.now() - requestedAt > 1000) return;

      const source = audioContext.createBufferSource();
      const gain = audioContext.createGain();
      source.buffer = audioBuffer;
      gain.gain.value = 0.9;
      source.connect(gain).connect(audioContext.destination);
      source.start();
    };

    const playWhenReady = (audioBuffer: AudioBuffer | null) => {
      if (audioContext.state === "running") {
        play(audioBuffer);
        return;
      }

      void audioContext.resume().then(() => play(audioBuffer)).catch(() => undefined);
    };

    const audioBuffer = audioBufferRef.current;
    if (audioBuffer) {
      playWhenReady(audioBuffer);
      return;
    }

    void audioBufferPromiseRef.current?.then(playWhenReady);
  }, [getAudioContext]);
};

export default useEruptionSound;
