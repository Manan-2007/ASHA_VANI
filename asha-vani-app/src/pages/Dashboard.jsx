import { useState, useCallback } from "react";
import VoiceOrb from "../components/VoiceOrb";
import NetworkStatus from "../components/NetworkStatus";
import { useVoiceRecorder } from "../hooks/useVoiceRecorder";

export default function Dashboard() {
  const { recording, transcript, response, latency, error, loading, startRecording, stopRecording } = useVoiceRecorder();

  const orbState = recording ? 'listening' : loading ? 'processing' : 'idle';

  const handleMicClick = useCallback(() => {
    if (recording) {
      stopRecording();
    } else {
      startRecording();
    }
  }, [recording, startRecording, stopRecording]);

  return (
    <div className="max-w-5xl mx-auto">
      {/* Page Heading */}
      <div className="mb-10 flex items-end justify-between">
        <div>
          <h2 className="text-4xl font-extrabold text-on-surface tracking-tight font-headline">
            Say Hi to ASHA !
          </h2>
          <p className="text-outline text-lg mt-2">
            Speak to diagnose, consult, and manage patient data in real-time.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <NetworkStatus />
          <span className="px-4 py-2 bg-secondary-container text-on-secondary-container text-sm font-label font-bold tracking-widest rounded-full shadow-sm">
            LIVE SESSION
          </span>
        </div>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-12 gap-8">
        {/* Central Voice Interaction Card — VoiceOrb */}
        <div className="col-span-12 bg-surface-low rounded-lg p-8 neumorphic-shadow flex flex-col items-center justify-center relative overflow-hidden min-h-[420px]">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />

          <VoiceOrb state={orbState} onClick={handleMicClick} />
        </div>

        {/* Conversation Display */}
        <div className="col-span-12 space-y-6">
          <h3 className="text-xl font-bold text-on-surface flex items-center gap-2 font-headline">
            <span className="material-symbols-outlined">chat_bubble</span>
            Dialogue
          </h3>
          <div className="space-y-4">
            {/* User Input Card */}
            <div className="flex justify-start">
              <div className="max-w-2xl bg-surface-lowest p-6 rounded-lg rounded-tl-none neumorphic-shadow">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] font-label font-bold text-outline uppercase tracking-wider">
                    User Input
                  </span>
                  <span className="w-1.5 h-1.5 bg-primary-fixed-dim rounded-full" />
                </div>
                <p className="text-lg text-on-surface italic leading-relaxed">
                  &quot;{transcript || "Speak into the microphone to ask a question..."}&quot;
                </p>
              </div>
            </div>

            {/* ASHA VANI Response Card */}
            <div className="flex justify-end">
              <div className="max-w-2xl bg-primary text-on-primary p-8 rounded-lg rounded-tr-none neumorphic-shadow relative">
                <div className="absolute -top-2 -right-2">
                  <span className="bg-secondary-container text-on-secondary-container text-[10px] px-2 py-1 rounded-sm font-bold">
                    AI RESPONSE
                  </span>
                </div>
                <p className="text-xl font-medium leading-relaxed">
                  {error ? (
                    <span className="text-red-300">{error}</span>
                  ) : response ? (
                    <span>&quot;{response}&quot;</span>
                  ) : (
                    <span className="opacity-70">Waiting for interaction...</span>
                  )}
                </p>
                <div className="mt-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">
                    {latency ? 'speed' : 'volume_up'}
                  </span>
                  <span className="text-xs opacity-80">
                    {latency ? `Response time: ${latency}ms` : 'Synthesized audio playing...'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>


      </div>

      {/* Background Decorative Elements */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10 opacity-20 overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-primary-fixed-dim blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[20%] w-[400px] h-[400px] rounded-full bg-secondary-fixed-dim blur-[100px]" />
      </div>
    </div>
  );
}
