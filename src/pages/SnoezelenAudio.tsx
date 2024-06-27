import React, { useCallback, useEffect, useRef, useState } from 'react';
import kalimbaFile from '../assets/kalimba.mp3';
import riverFile from '../assets/river.mp3';

let globalAudioContext: AudioContext | null = null;
let kalimbaBuffer: AudioBuffer | null = null;

const SnoezelenAudio: React.FC = () => {
    const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
    const riverBufferRef = useRef<AudioBuffer | null>(null);
    const riverGainNodeRef = useRef<GainNode | null>(null);
    const kalimbaIntervalRef = useRef<NodeJS.Timeout | null>(null);
    const audioAvailable = useRef(false);

    const playSound = (
        context: AudioContext,
        buffer: AudioBuffer,
        time: number,
        rate: number,
        loop: boolean,
        destination?: AudioNode
    ) => {
        const source = context.createBufferSource();
        source.buffer = buffer;
        source.playbackRate.value = rate;
        source.loop = loop;
        source.connect(destination || context.destination);
        source.start(time);
    };

    const playChord = useCallback((context: AudioContext) => {
        if (!kalimbaBuffer) return;

        const chords = [
            [261.63, 329.63, 392.0], // C major
            [293.66, 349.23, 440.0], // D major
            [329.63, 392.0, 493.88], // E minor
            [349.23, 440.0, 523.25], // F major
            [392.0, 493.88, 587.33], // G major
            [440.0, 523.25, 659.25], // A minor
            [493.88, 587.33, 698.46] // B diminished
        ];

        const startTime = context.currentTime + 0.1;
        const eighthNoteTime = 60 / 120 / 2; // 120 BPM

        let chord = chords[Math.floor(Math.random() * chords.length)];
        if (Math.random() >= 0.5) {
            chord = chord.reverse();
        }
        chord.forEach((freq, i) => {
            playSound(
                context,
                kalimbaBuffer!,
                context.currentTime + i + Math.random() * 0.5,
                freq / 261.63, // Rate adjusted to match the frequency
                false
            );
        });
    }, []);

    const loadAudioFile = async (context: AudioContext, file: string) => {
        const response = await fetch(file);
        const arrayBuffer = await response.arrayBuffer();
        return context.decodeAudioData(arrayBuffer);
    };

    const loadSounds = useCallback(async (context: AudioContext) => {
        kalimbaBuffer = await loadAudioFile(context, kalimbaFile);

        const riverBuffer = await loadAudioFile(context, riverFile);
        riverBufferRef.current = riverBuffer;
    }, []);

    const startSoothingAudio = useCallback(async () => {
        if (audioContext) return;

        const context = new (window.AudioContext ||
            window.webkitAudioContext)();
        setAudioContext(context);
        globalAudioContext = context;
        await loadSounds(context);

        const riverGainNode = context.createGain();
        riverGainNode.gain.setValueAtTime(0.2, context.currentTime); // Réglez le gain pour le volume désiré
        riverGainNode.connect(context.destination);
        riverGainNodeRef.current = riverGainNode;

        playSound(
            context,
            riverBufferRef.current!,
            context.currentTime,
            1,
            true,
            riverGainNode
        );

        playChord(context); // Initial play

        // Simuler des sons de Kalimba en boucle
        kalimbaIntervalRef.current = setInterval(
            () => playChord(context),
            5000
        );
    }, [audioContext, playChord, loadSounds]);

    const stopSoothingAudio = useCallback(() => {
        if (!audioContext) return;

        if (kalimbaIntervalRef.current) {
            clearInterval(kalimbaIntervalRef.current);
        }

        setTimeout(() => {
            setAudioContext(null);
        }, 2000); // Attendre la fin de l'atténuation avant de s'arrêter
    }, [audioContext]);

    useEffect(() => {
        if (!audioContext && !audioAvailable.current) {
            const context = new (window.AudioContext ||
                window.webkitAudioContext)();
            setAudioContext(context);
            globalAudioContext = context;
            audioAvailable.current = true;
            startSoothingAudio();
        }
        return () => {
            stopSoothingAudio();
            if (audioContext) {
                audioContext.close();
            }
        };
    }, [audioContext, startSoothingAudio, stopSoothingAudio]);

    return null;
};

export default SnoezelenAudio;

export const playKalimba = () => {
    if (globalAudioContext && kalimbaBuffer) {
        const source = globalAudioContext.createBufferSource();
        source.buffer = kalimbaBuffer;
        source.connect(globalAudioContext.destination);
        source.start();
    } else {
        console.error('Audio context or kalimba buffer not initialized');
    }
};
