import React, { useState, useEffect, useRef } from 'react';
import { 
  Zap, 
  Clock, 
  CheckCircle, 
  XCircle, 
  ArrowRight, 
  RefreshCw,
  Award,
  Terminal,
  Mic,
  MicOff,
  Users,
  ShieldCheck,
  AlertTriangle,
  Code
} from 'lucide-react';
import { CandidateProfile, VivaQuestion } from '../types';
import { evaluateVivaAnswer, generateMoreVivaQuestions } from '../services/api';

interface VivaArenaProps {
  candidate: CandidateProfile | null;
  onUpdateVivaScore: (newScore: number) => void;
  onNavigateToTab: (tab: string) => void;
  onSelectCandidate?: (candidate: CandidateProfile) => void;
  cohort?: CandidateProfile[];
}

type SpeechRecognitionResultEventLike = {
  resultIndex: number;
  results: ArrayLike<{
    isFinal: boolean;
    0: { transcript: string };
  }>;
};

type SpeechRecognitionErrorEventLike = { error?: string };

interface SpeechRecognitionLike {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  maxAlternatives: number;
  start: () => void;
  stop: () => void;
  abort: () => void;
  onstart: (() => void) | null;
  onend: (() => void) | null;
  onerror: ((event: SpeechRecognitionErrorEventLike) => void) | null;
  onresult: ((event: SpeechRecognitionResultEventLike) => void) | null;
}

type SpeechRecognitionConstructorLike = new () => SpeechRecognitionLike;

export const VivaArena: React.FC<VivaArenaProps> = ({
  candidate,
  onUpdateVivaScore,
  onNavigateToTab,
  onSelectCandidate,
  cohort = []
}) => {
  // If no candidate is active, show clean high-tech empty state
  if (!candidate) {
    return (
      <div className="max-w-4xl mx-auto py-16 px-4 text-center">
        <div className="p-8 sm:p-12 rounded-2xl bg-black/35 backdrop-blur-md border border-[#D4AF37]/25 shadow-2xl">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-[#8B1E1E]/20 border border-[#D4AF37]/40 flex items-center justify-center">
            <Zap className="w-8 h-8 text-[#D4AF37]" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-2 font-warrior">
            No Active Candidate for Viva Defense
          </h2>
          <p className="text-sm text-[#C9B89A] max-w-md mx-auto mb-6">
            Scan a live repository in the Code Ingestion Scanner to extract Abstract Syntax Trees and generate candidate-specific technical defense questions.
          </p>
          <button
            onClick={() => onNavigateToTab('ingestion')}
            className="btn-dev-primary text-xs flex items-center gap-2 px-6 py-3.5 mx-auto shadow-lg cursor-pointer font-bold"
          >
            <span>Go to Ingestion Scanner</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  const [questions, setQuestions] = useState<VivaQuestion[]>(candidate.viva_questions || []);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [userAnswer, setUserAnswer] = useState('');
  const [evaluatedAnswers, setEvaluatedAnswers] = useState<Record<number, any>>({});
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [isGeneratingMore, setIsGeneratingMore] = useState(false);
  const [showCohortRoster, setShowCohortRoster] = useState(false);

  // Web Speech API state
  const [isListening, setIsListening] = useState(false);
  const [voiceSupported, setVoiceSupported] = useState<boolean | null>(null);
  const [voiceError, setVoiceError] = useState<string | null>(null);
  const [interimTranscript, setInterimTranscript] = useState('');
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);
  const voiceBaseTextRef = useRef('');
  const finalTranscriptRef = useRef('');
  const shouldKeepListeningRef = useRef(false);

  const stopVoiceDefense = (abort = false) => {
    const recognition = recognitionRef.current;
    if (!recognition) {
      setIsListening(false);
      setInterimTranscript('');
      shouldKeepListeningRef.current = false;
      return;
    }
    shouldKeepListeningRef.current = false;
    try {
      abort ? recognition.abort() : recognition.stop();
    } catch {
      // The browser may throw if recognition already ended.
    }
    recognitionRef.current = null;
    setIsListening(false);
    setInterimTranscript('');
  };

  useEffect(() => {
    const speechWindow = window as Window & {
      SpeechRecognition?: SpeechRecognitionConstructorLike;
      webkitSpeechRecognition?: SpeechRecognitionConstructorLike;
    };
    setVoiceSupported(Boolean(speechWindow.SpeechRecognition || speechWindow.webkitSpeechRecognition));
    return () => stopVoiceDefense(true);
  }, []);

  // Timer countdown
  useEffect(() => {
    let timer: any = null;
    if (isTimerRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isTimerRunning) {
      setIsTimerRunning(false);
    }
    return () => clearInterval(timer);
  }, [isTimerRunning, timeLeft]);

  // Reset when question changes
  useEffect(() => {
    stopVoiceDefense(true);
    setInterimTranscript('');
    setTimeLeft(60);
    setIsTimerRunning(!evaluatedAnswers[currentQuestionIndex]);
    setUserAnswer('');
  }, [currentQuestionIndex]);

  // Sync questions when candidate changes
  useEffect(() => {
    stopVoiceDefense(true);
    setVoiceError(null);
    if (candidate.viva_questions && candidate.viva_questions.length > 0) {
      setQuestions(candidate.viva_questions);
    } else {
      setQuestions([]);
    }
    setCurrentQuestionIndex(0);
    setEvaluatedAnswers({});
  }, [candidate.candidate_id]);

  const toggleVoiceDefense = async () => {
    const speechWindow = window as Window & {
      SpeechRecognition?: SpeechRecognitionConstructorLike;
      webkitSpeechRecognition?: SpeechRecognitionConstructorLike;
    };
    const SpeechRecognition = speechWindow.SpeechRecognition || speechWindow.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setVoiceSupported(false);
      setVoiceError('Voice input is not supported by this browser. Type your answer instead.');
      return;
    }

    if (isListening) {
      stopVoiceDefense();
      return;
    }

    try {
      if (!navigator.mediaDevices?.getUserMedia) {
        throw new Error('Microphone access is unavailable in this browser or context.');
      }
      const permissionStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      permissionStream.getTracks().forEach(track => track.stop());
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = navigator.language || 'en-US';
      recognition.maxAlternatives = 1;
      voiceBaseTextRef.current = userAnswer.trim();
      finalTranscriptRef.current = '';
      setInterimTranscript('');
      setVoiceError(null);
      shouldKeepListeningRef.current = true;
      recognitionRef.current = recognition;

      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => {
        if (recognitionRef.current === recognition && shouldKeepListeningRef.current) {
          try {
            recognition.start();
            return;
          } catch {
            // Fall through to the stopped state below.
          }
        }
        if (recognitionRef.current === recognition) {
          recognitionRef.current = null;
          setIsListening(false);
          setInterimTranscript('');
        }
      };
      recognition.onerror = (event) => {
        if (recognitionRef.current === recognition) {
          recognitionRef.current = null;
          setIsListening(false);
          setInterimTranscript('');
        }
        shouldKeepListeningRef.current = false;
        if (event.error !== 'aborted') {
          const message = event.error === 'not-allowed' || event.error === 'service-not-allowed'
            ? 'Microphone permission was denied. Allow microphone access and try again.'
            : event.error === 'no-speech'
              ? 'No speech was detected. Move closer to the microphone and try again.'
              : 'Voice input stopped unexpectedly. You can retry or type your answer.';
          setVoiceError(message);
        }
      };

      recognition.onresult = (event) => {
        let interim = '';
        let finalText = finalTranscriptRef.current;
        for (let index = event.resultIndex; index < event.results.length; index += 1) {
          const result = event.results[index];
          const transcript = result[0]?.transcript || '';
          if (result.isFinal) finalText += transcript;
          else interim += transcript;
        }
        finalTranscriptRef.current = finalText;
        setInterimTranscript(interim.trim());
        const combined = [voiceBaseTextRef.current, finalText.trim()].filter(Boolean).join(' ');
        setUserAnswer(combined);
      };

      recognition.start();
    } catch (error) {
      recognitionRef.current = null;
      setIsListening(false);
      setVoiceError(error instanceof DOMException && error.name === 'NotAllowedError'
        ? 'Microphone permission was denied. Allow microphone access and try again.'
        : 'Voice input could not start. You can type your answer instead.');
    }
  };

  const handleGenerateMoreQuestions = async (count: number = 3) => {
    setIsGeneratingMore(true);
    try {
      const newQuestions = await generateMoreVivaQuestions(
        candidate.complex_functions || [],
        count
      );
      if (newQuestions && newQuestions.length > 0) {
        setQuestions(newQuestions);
        setCurrentQuestionIndex(0);
        setEvaluatedAnswers({});
      }
    } catch (e) {
      // fallback
    } finally {
      setIsGeneratingMore(false);
    }
  };

  const handleSubmitAnswer = async () => {
    if (!userAnswer.trim()) return;
    setIsEvaluating(true);
    setIsTimerRunning(false);

    try {
      const res = await evaluateVivaAnswer(
        candidate.candidate_id,
        currentQ.question_id,
        currentQ.question,
        currentQ.expected_concepts,
        userAnswer
      );

      const evaluation = {
        score: res.score,
        demonstrated: res.concepts_demonstrated || [],
        missing: res.concepts_missing || [],
        feedback: res.feedback || (res.passed 
          ? 'Strong technical answer demonstrating genuine architectural ownership.' 
          : 'Answer was superficial, off-topic, or nonsensical; missed critical concepts.'),
        passed: res.passed
      };

      const updated = {
        ...evaluatedAnswers,
        [currentQuestionIndex]: evaluation
      };
      setEvaluatedAnswers(updated);
      setIsEvaluating(false);

      const keys = Object.keys(updated);
      if (keys.length === questions.length) {
        const total = Object.values(updated).reduce((acc: number, val: any) => acc + val.score, 0);
        const avg = Math.round(total / questions.length);
        onUpdateVivaScore(avg);
      }
    } catch (e) {
      setIsEvaluating(false);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      onNavigateToTab('proofcard');
    }
  };

  const currentQ = questions[currentQuestionIndex] || questions[0];
  const isCurrentEvaluated = evaluatedAnswers[currentQuestionIndex] !== undefined;

  if (!currentQ || questions.length === 0) {
    return (
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6">
        <div className="p-8 sm:p-12 rounded-2xl bg-black/35 backdrop-blur-md border border-[#D4AF37]/25 text-center shadow-2xl">
          <ShieldCheck className="w-12 h-12 mx-auto mb-3 text-[#D4AF37]" />
          <h1 className="text-xl sm:text-2xl font-bold text-white mb-2 font-warrior">
            Viva Defense Questions Pending
          </h1>
          <p className="text-sm text-neutral-300 max-w-lg mx-auto mb-6">
            AST questions can be synthesized directly from this candidate's complex functions ({candidate.complex_functions?.length || 0} detected).
          </p>
          <button
            onClick={() => handleGenerateMoreQuestions(3)}
            disabled={isGeneratingMore}
            className="btn-dev-primary text-xs flex items-center gap-2 px-6 py-3.5 mx-auto shadow-lg cursor-pointer font-bold"
          >
            {isGeneratingMore ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4" />}
            <span>Synthesize Questions via AST Analysis</span>
          </button>
        </div>
      </div>
    );
  }

  // Real Cohort Stats if present
  const validVivaCandidates = cohort.filter(c => c.viva_score !== undefined);
  const avgCohortViva = validVivaCandidates.length > 0 
    ? (validVivaCandidates.reduce((acc, c) => acc + (c.viva_score || 0), 0) / validVivaCandidates.length).toFixed(1)
    : 'N/A';

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6">
      {/* Top Header Card with Candidate Switcher */}
      <div className="p-6 rounded-2xl mb-6 bg-black/35 backdrop-blur-md border border-[#D4AF37]/25 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex-1">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
              <span className="text-xs font-warrior font-bold text-[#D4AF37] uppercase tracking-wider">
                Verifiable Code Defense
              </span>

              {/* Candidate Switcher Dropdown */}
              {onSelectCandidate && cohort.length > 0 && (
                <div>
                  <select
                    value={candidate.candidate_id}
                    onChange={(e) => {
                      const found = cohort.find(c => c.candidate_id === e.target.value);
                      if (found) onSelectCandidate(found);
                    }}
                    className="bg-[#140b08] border border-[#D4AF37]/50 rounded-lg px-2.5 py-1 text-xs text-[#FFD166] font-warrior font-bold focus:outline-none cursor-pointer max-w-[200px]"
                  >
                    <option value={candidate.candidate_id}>
                      {candidate.name} ({candidate.viva_score !== undefined ? `${candidate.viva_score}/10` : 'Pending'})
                    </option>
                    {cohort.filter(c => c.candidate_id !== candidate.candidate_id).map(c => (
                      <option key={c.candidate_id} value={c.candidate_id}>
                        {c.name} ({c.viva_score !== undefined ? `${c.viva_score}/10` : 'Pending'})
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight font-sans flex flex-wrap items-center gap-2">
              <span>Interactive Code Defense Arena</span>
              <span className="text-sm text-[#FFD166] font-semibold font-mono">
                ({candidate.name})
              </span>
            </h1>
          </div>

          {cohort.length > 0 && (
            <button
              onClick={() => setShowCohortRoster(!showCohortRoster)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-black/50 border border-[#D4AF37]/40 text-xs sm:text-sm font-bold text-[#FFD166] hover:bg-[#8B1E1E]/40 transition cursor-pointer shrink-0"
            >
              <Users className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>{showCohortRoster ? 'Hide Cohort Roster' : `View Cohort Roster (${cohort.length})`}</span>
            </button>
          )}
        </div>
      </div>

      {/* Cohort Viva Roster Drawer */}
      {showCohortRoster && cohort.length > 0 && (
        <div className="mb-6 p-5 rounded-2xl bg-black/35 backdrop-blur-md border border-[#D4AF37]/25 shadow-2xl animate-in fade-in">
          <div className="flex items-center justify-between mb-3 text-xs font-warrior">
            <span className="text-[#D4AF37] font-bold uppercase tracking-wider flex items-center gap-2">
              <Users className="w-4 h-4 text-[#D4AF37]" />
              <span>Cohort Viva Ledger ({cohort.length} Candidates)</span>
            </span>
            <span className="font-mono text-[#C9B89A]">
              Average Viva Score: <strong className="text-white">{avgCohortViva} / 10</strong>
            </span>
          </div>

          <div className="overflow-x-auto rounded-xl border border-[#3A2F27]">
            <table className="w-full text-left text-sm text-neutral-200">
              <thead className="bg-[#140b08] uppercase font-bold text-xs sm:text-sm text-[#FFD166] border-b border-[#3A2F27]">
                <tr>
                  <th className="py-3 px-3">Candidate</th>
                  <th className="py-3 px-3">College</th>
                  <th className="py-3 px-3">Viva Score</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3 text-right">Switch</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2A241B] font-mono text-xs sm:text-sm">
                {cohort.slice(0, 15).map((cand) => (
                  <tr key={cand.candidate_id} className="hover:bg-white/5 transition">
                    <td className="py-3 px-3 text-white font-sans font-bold">
                      {cand.name}
                    </td>
                    <td className="py-3 px-3 text-[#E6C280]">
                      {cand.college}
                    </td>
                    <td className="py-3 px-3 font-bold text-base">
                      <span className={(cand.viva_score || 0) >= 7 ? 'text-emerald-400' : 'text-amber-400'}>
                        {cand.viva_score !== undefined ? `${cand.viva_score} / 10` : 'Pending'}
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      {(cand.viva_score || 0) >= 7 ? (
                        <span className="text-emerald-400 text-xs sm:text-sm flex items-center gap-1 font-semibold">
                          <CheckCircle className="w-3.5 h-3.5" />
                          Passed Architectural Defense
                        </span>
                      ) : (
                        <span className="text-amber-400 text-xs sm:text-sm flex items-center gap-1">
                          <AlertTriangle className="w-3.5 h-3.5" />
                          Pending / Borderline
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={() => {
                          if (onSelectCandidate) onSelectCandidate(cand);
                          setShowCohortRoster(false);
                        }}
                        className="text-xs sm:text-sm text-[#FFD166] hover:underline cursor-pointer font-bold"
                      >
                        Select
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Question Selector & Countdown Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-1.5">
          {questions.map((q, idx) => {
            const isEvaluated = evaluatedAnswers[idx] !== undefined;
            const isCurrent = idx === currentQuestionIndex;
            return (
              <button
                key={q.question_id || idx}
                onClick={() => setCurrentQuestionIndex(idx)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold transition cursor-pointer border ${
                  isCurrent
                    ? 'bg-[#8B1E1E] border-[#D4AF37] text-white shadow-md'
                    : isEvaluated
                    ? 'bg-black/60 border-emerald-500/60 text-emerald-300'
                    : 'bg-black/40 border-[#3A2F27] text-neutral-400 hover:text-white'
                }`}
              >
                Q{idx + 1} {isEvaluated ? '✓' : ''}
              </button>
            );
          })}
        </div>

        {/* 60s Countdown Timer */}
        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-mono font-bold ${
          timeLeft <= 10
            ? 'bg-red-950/60 border-red-500 text-red-300 animate-pulse'
            : 'bg-black/50 border-[#D4AF37]/40 text-[#FFD166]'
        }`}>
          <Clock className="w-3.5 h-3.5" />
          <span>{timeLeft}s REMAINING</span>
        </div>
      </div>

      {/* Main Question Defense Card */}
      <div className="p-6 rounded-2xl bg-black/35 backdrop-blur-md border border-[#D4AF37]/25 shadow-2xl">
        <div className="mb-4">
          <div className="flex items-center justify-between text-xs text-[#E6C280] font-mono mb-2">
            <span className="flex items-center gap-1.5">
              <Code className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Extracted Target: <strong>{currentQ.function_name}()</strong> in {currentQ.file}:{currentQ.line_number}</span>
            </span>
            <span className={`px-2 py-0.5 rounded uppercase font-bold text-[10px] ${
              currentQ.difficulty === 'hard'
                ? 'bg-red-950 border border-red-600 text-red-300'
                : 'bg-amber-950 border border-amber-600 text-amber-300'
            }`}>
              {currentQ.difficulty}
            </span>
          </div>

          <h2 className="text-base sm:text-lg font-bold text-white leading-relaxed">
            "{currentQ.question}"
          </h2>
        </div>

        {/* Expected Concepts */}
        <div className="mb-4 p-3.5 rounded-xl bg-black/50 border border-[#3A2F27]">
          <span className="text-xs font-bold text-[#FFD166] uppercase tracking-wider block mb-2">
            Key Grading Concepts:
          </span>
          <div className="flex flex-wrap gap-2">
            {currentQ.expected_concepts.map((c, i) => (
              <span key={i} className="text-xs sm:text-sm px-3 py-1 rounded-full bg-[#1A1A1A] border border-[#3A2F27] text-neutral-200 font-medium">
                {c}
              </span>
            ))}
          </div>
        </div>

        {/* Candidate Answer Box */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#FFD166]">
              Candidate Written Defense
            </label>
            {!isCurrentEvaluated && (
              <div className="flex items-center gap-3">
                {/* Voice Defense Microphone Button */}
                <button
                  type="button"
                  onClick={toggleVoiceDefense}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition cursor-pointer border ${
                    isListening
                      ? 'bg-red-950 border-red-500 text-red-300 animate-pulse'
                      : 'bg-[#8B1E1E]/30 border-[#D4AF37]/40 text-[#FFD166] hover:bg-[#8B1E1E]/60'
                  }`}
                >
                  {isListening ? <MicOff className="w-3.5 h-3.5 text-red-400" /> : <Mic className="w-3.5 h-3.5 text-[#D4AF37]" />}
                  <span>{isListening ? 'Stop listening' : voiceSupported === false ? 'Mic unavailable' : 'Voice Defense (Mic)'}</span>
                </button>
              </div>
            )}
          </div>
          {voiceError && (
            <p className="mb-2 text-xs text-amber-300" role="status">{voiceError}</p>
          )}
          {isListening && interimTranscript && (
            <p className="mb-2 text-xs text-[#C9B89A] italic" aria-live="polite">Hearing: {interimTranscript}</p>
          )}
          <textarea
            rows={3}
            value={userAnswer}
            onChange={e => setUserAnswer(e.target.value)}
            disabled={isCurrentEvaluated}
            placeholder="Type your technical defense or click Voice Defense to speak..."
            className="w-full bg-black/60 border border-[#3A2F27] rounded-xl p-3.5 text-xs sm:text-sm text-neutral-200 leading-relaxed focus:outline-none focus:border-[#D4AF37] font-mono transition"
          ></textarea>
        </div>

        {/* Evaluation Result Banner */}
        {isCurrentEvaluated && (
          <div className={`p-4 rounded-xl border mb-4 text-xs ${
            evaluatedAnswers[currentQuestionIndex].passed
              ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200'
              : 'bg-red-950/40 border-red-500/60 text-red-200'
          }`}>
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-warrior font-bold flex items-center gap-2 uppercase tracking-wider text-sm">
                {evaluatedAnswers[currentQuestionIndex].passed ? (
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                ) : (
                  <XCircle className="w-4 h-4 text-red-400" />
                )}
                <span className="text-sm font-bold">Score: {evaluatedAnswers[currentQuestionIndex].score} / 10</span>
              </span>
              <span className={`text-xs uppercase font-bold px-3 py-1 rounded-full border ${
                evaluatedAnswers[currentQuestionIndex].passed
                  ? 'bg-emerald-900/60 border-emerald-400 text-emerald-300'
                  : 'bg-red-900/60 border-red-400 text-red-300'
              }`}>
                {evaluatedAnswers[currentQuestionIndex].passed ? 'PASSED' : 'FAILED (Score: 0)'}
              </span>
            </div>
            <p className="text-neutral-100 text-sm leading-relaxed font-sans font-medium">
              {evaluatedAnswers[currentQuestionIndex].feedback}
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-[#3A2F27]">
          <span className="text-sm text-neutral-200 font-sans">
            Progress: <strong className="text-white">{Object.keys(evaluatedAnswers).length}</strong> / <strong className="text-white">{questions.length}</strong> Evaluated
          </span>

          <div className="flex items-center gap-2">
            {!isCurrentEvaluated ? (
              <button
                onClick={handleSubmitAnswer}
                disabled={isEvaluating || !userAnswer.trim()}
                className="btn-dev-primary text-sm flex items-center gap-2 shadow-lg cursor-pointer px-6 py-3 font-bold"
              >
                {isEvaluating ? <RefreshCw className="w-4 h-4 animate-spin" /> : null}
                <span>Submit & Evaluate Defense</span>
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="btn-dev-primary text-xs flex items-center gap-2 shadow-lg cursor-pointer px-5 py-2.5 font-bold"
              >
                <span>{currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'View Verified Pariksha Card'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
