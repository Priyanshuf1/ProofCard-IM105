import React, { useState, useEffect, useRef, useMemo } from 'react';
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
  ShieldAlert,
  Lock,
  AlertTriangle,
  Code
} from 'lucide-react';
import { CandidateProfile, VivaQuestion, ComplexFunction } from '../types';
import { 
  evaluateVivaAnswer, 
  generateMoreVivaQuestions, 
  checkAiTolerance, 
  fetchPromptingTemplates, 
  PromptingTemplate, 
  AIToleranceResult 
} from '../services/api';

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


export const calculateQuestionTime = (question: VivaQuestion | undefined): { seconds: number; rationale: string } => {
  if (!question) return { seconds: 60, rationale: 'Standard 60s technical defense window.' };
  const words = (question.question || '').split(/\s+/).filter(Boolean).length;
  const readingSeconds = Math.max(10, Math.ceil((words / 180) * 60));
  const conceptsCount = question.expected_concepts?.length || 2;
  const conceptsSeconds = conceptsCount * 15;
  const diff = (question.difficulty || '').toLowerCase();
  const diffBonus = diff === 'hard' ? 25 : diff === 'medium' ? 15 : 5;
  const rawTotal = readingSeconds + conceptsSeconds + diffBonus;
  const seconds = Math.max(45, Math.min(120, rawTotal));
  const rationale = `${seconds}s allocated: ${readingSeconds}s reading (${words} words) + ${conceptsSeconds}s formulation (${conceptsCount} concepts) + ${diffBonus}s ${question.difficulty || 'medium'} difficulty buffer.`;
  return { seconds, rationale };
};

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
  const [selectedFuncIndex, setSelectedFuncIndex] = useState<number>(0);

  // Enterprise AI Prompting Policy & Tolerance Gate State
  const [promptTemplates, setPromptTemplates] = useState<PromptingTemplate[]>([]);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>('balanced-copilot');
  const [toleranceLimit, setToleranceLimit] = useState<number>(35);
  const [liveToleranceResult, setLiveToleranceResult] = useState<AIToleranceResult | null>(null);
  const [isAuditingTolerance, setIsAuditingTolerance] = useState<boolean>(false);

  // Load templates on mount
  useEffect(() => {
    fetchPromptingTemplates().then(res => {
      if (res?.templates?.length) {
        setPromptTemplates(res.templates);
        const def = res.templates.find(t => t.id === res.default_template_id) || res.templates[1];
        if (def) {
          setSelectedTemplateId(def.id);
          setToleranceLimit(def.max_ai_limit_percent);
        }
      }
    });
  }, []);

  const activeTemplate = promptTemplates.find(t => t.id === selectedTemplateId) || {
    id: 'balanced-copilot',
    name: 'Balanced Copilot (Standard SaaS)',
    max_ai_limit_percent: 35,
    description: 'Permits standard Copilot/ChatGPT scaffolding up to 35%. Candidate must explain architectural trade-offs.',
    allowed_categories: ['Scaffolding', 'CSS/Tailwind Styling', 'CRUD Routes'],
    prohibited_categories: ['System Architecture', 'Prompt Injection Bypasses'],
    penalty_action: 'PROMPT_FOR_ARCHITECTURAL_DEFENSE'
  };

  const handleTemplateChange = (tmplId: string) => {
    setSelectedTemplateId(tmplId);
    const tmpl = promptTemplates.find(t => t.id === tmplId);
    if (tmpl) {
      setToleranceLimit(tmpl.max_ai_limit_percent);
    }
    setLiveToleranceResult(null);
  };

  const handleAuditAiTolerance = async () => {
    if (!userAnswer.trim()) return;
    setIsAuditingTolerance(true);
    try {
      const res = await checkAiTolerance(
        userAnswer,
        toleranceLimit,
        candidate.name,
        currentQuestionIndex,
        selectedTemplateId
      );
      setLiveToleranceResult(res);
    } catch (e) {
      console.warn('AI tolerance audit error:', e);
    } finally {
      setIsAuditingTolerance(false);
    }
  };



  // Enterprise Anomaly & Plagiarism Viva Gating (Threshold: 30%)

  const cloneScore = candidate.is_clone 

    ? Math.round((candidate.matched_tutorial?.similarity_score || 0.7) * 100) 

    : 0;

  const authenticityScore = candidate.authenticity_score ?? 100;

  const anomalyScore = Math.max(

    cloneScore,

    100 - authenticityScore,

    (candidate.is_prompt_injected || candidate.security_scan?.is_prompt_injected) ? 90 : 0,

    candidate.anomaly_score || 0

  );

  const isVivaBlocked = Boolean(

    candidate.viva_blocked ?? (

      anomalyScore > 30 || 

      candidate.is_prompt_injected || 

      candidate.security_scan?.is_prompt_injected || 

      candidate.is_clone

    )

  );

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

  // Timer countdown and auto-submission on expiry
  useEffect(() => {
    let timer: any = null;
    if (isTimerRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isTimerRunning) {
      setIsTimerRunning(false);
      handleAutoSubmitOnExpiry();
    }
    return () => clearInterval(timer);
  }, [isTimerRunning, timeLeft]);

  // Dynamic timer reset when question changes
  useEffect(() => {
    stopVoiceDefense(true);
    setInterimTranscript('');
    const targetQ = questions[currentQuestionIndex];
    const { seconds } = calculateQuestionTime(targetQ);
    setTimeLeft(seconds);
    setIsTimerRunning(!evaluatedAnswers[currentQuestionIndex]);
    setUserAnswer('');
  }, [currentQuestionIndex, questions]);

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

  const handleAutoSubmitOnExpiry = async () => {
    stopVoiceDefense(true);
    const ansText = userAnswer.trim();
    if (!ansText) {
      const evaluation = {
        score: 0,
        demonstrated: [],
        missing: currentQ?.expected_concepts || [],
        feedback: "Time expired without submission! Question auto-assigned 0/10 points.",
        passed: false,
        ai_detection: {
          status: "analyzed",
          classification: "insufficient_text" as const,
          model_version: "hybrid-tfidf-burstiness-v1.2",
          text_length: 0,
          language_supported: true,
          limitations: ["No answer text submitted within allocated time limit."]
        },
        adversarial_injection_detected: false
      };
      const updated = {
        ...evaluatedAnswers,
        [currentQuestionIndex]: evaluation
      };
      setEvaluatedAnswers(updated);
      const keys = Object.keys(updated);
      if (keys.length === questions.length) {
        const total = Object.values(updated).reduce((acc: number, val: any) => acc + val.score, 0);
        const avg = Math.round(total / questions.length);
        onUpdateVivaScore(avg);
      }
      return;
    }
    await handleSubmitAnswer();
  };

  const handleSubmitAnswer = async () => {
    if (!userAnswer.trim()) return;
    setIsEvaluating(true);
    setIsTimerRunning(false);

    try {
      const res = await evaluateVivaAnswer(
        candidate.candidate_id,
        currentQ.question_id || (currentQ as any).id || 'viva_q_1',
        currentQ.question,
        currentQ.expected_concepts || [],
        userAnswer
      );

      const evaluation = {
        score: res.score,
        demonstrated: res.concepts_demonstrated || [],
        missing: res.concepts_missing || [],
        feedback: res.feedback || (res.passed 
          ? 'Strong technical answer demonstrating genuine architectural ownership.' 
          : 'Answer was superficial, off-topic, or nonsensical; missed critical concepts.'),
        passed: res.passed,
        ai_detection: res.ai_detection,
        adversarial_injection_detected: res.adversarial_injection_detected
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
    if (evaluatedAnswers[currentQuestionIndex] === undefined) {
      return;
    }
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      onNavigateToTab('proofcard');
    }
  };

  const currentQ = questions[currentQuestionIndex] || questions[0];
  const isCurrentEvaluated = evaluatedAnswers[currentQuestionIndex] !== undefined;

  // Synchronize snippet tab with the current active question
  useEffect(() => {
    if (!candidate?.complex_functions || candidate.complex_functions.length === 0) return;
    const funcs = candidate.complex_functions;
    const matchIdx = funcs.findIndex(
      f => f.function_name === currentQ?.function_name || f.file === currentQ?.file
    );
    if (matchIdx !== -1) {
      setSelectedFuncIndex(matchIdx);
    } else if (funcs[currentQuestionIndex]) {
      setSelectedFuncIndex(currentQuestionIndex);
    } else {
      setSelectedFuncIndex(0);
    }
  }, [currentQuestionIndex, currentQ?.function_name, currentQ?.file, candidate?.complex_functions]);

  // Derived active snippet to display directly below the question
  const activeSnippetFunc = useMemo<ComplexFunction>(() => {
    const funcs = candidate?.complex_functions || [];
    if (funcs[selectedFuncIndex]) {
      return funcs[selectedFuncIndex];
    }
    return {
      file: currentQ?.file || 'src/main.py',
      function_name: currentQ?.function_name || 'core_implementation',
      complexity: 8,
      line_number: currentQ?.line_number || 42,
      snippet: `def ${currentQ?.function_name || 'core_implementation'}():\n    # Implementation logic for ${currentQ?.file || 'src/main.py'}:${currentQ?.line_number || 42}\n    pass`
    };
  }, [candidate?.complex_functions, selectedFuncIndex, currentQ, currentQuestionIndex]);

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
  const validVivaCandidates = cohort.filter(c => (c.viva_score || 0) > 0 && !c.is_clone);
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
                      {candidate.name} ({(candidate.viva_score && candidate.viva_score > 0) ? `${candidate.viva_score}/10` : 'Pending Defense'})
                    </option>
                    {cohort.filter(c => c.candidate_id !== candidate.candidate_id).map(c => (
                      <option key={c.candidate_id} value={c.candidate_id}>
                        {c.name} ({(c.viva_score && c.viva_score > 0) ? `${c.viva_score}/10` : 'Pending Defense'})
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
                      {cand.is_clone ? (
                        <span className="text-red-400 text-xs font-bold">✕ Disqualified</span>
                      ) : (cand.viva_score && cand.viva_score > 0) ? (
                        <span className="text-emerald-400 font-bold">{cand.viva_score} / 10</span>
                      ) : (
                        <span className="text-amber-400 text-xs font-bold">⏳ Awaiting Defense</span>
                      )}
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

      {/* VIVA ACCESS BLOCKED SCREEN IF ANOMALY > 30% */}
      {isVivaBlocked ? (
        <div className="p-6 sm:p-8 rounded-2xl bg-red-950/40 border-2 border-red-500/70 shadow-2xl backdrop-blur-md animate-in fade-in mb-6">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-red-900/60 pb-5 mb-5">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-red-900 border-2 border-red-400 flex items-center justify-center text-red-100 shrink-0 shadow-lg mt-0.5">
                <Lock className="w-8 h-8 text-red-200 animate-pulse" />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                  <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-red-600 border border-red-400 text-white uppercase tracking-wider">
                    VIVA ACCESS RESTRICTED
                  </span>
                  <span className="text-xs font-mono font-bold text-red-200 bg-black/60 px-2.5 py-0.5 rounded-full border border-red-500/50">
                    Enterprise Screening Gate (30% Max Anomaly)
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-white font-sans tracking-wide">
                  Candidate Blocked from Code Defense Viva
                </h2>
                <p className="text-xs sm:text-sm text-red-200 mt-1 font-sans leading-relaxed">
                  {candidate.viva_block_reason || candidate.viva_blocked_reason || (
                    candidate.is_prompt_injected || candidate.security_scan?.is_prompt_injected
                      ? "Adversarial Prompt Injection Directives were detected in this repository attempting to override evaluation rubrics."
                      : candidate.is_clone
                      ? `Candidate repository exhibits high code overlap (${cloneScore}%) with external tutorial sources, exceeding the 30% threshold.`
                      : `Candidate repository exhibits a ${anomalyScore}% forensic anomaly (Authenticity: ${authenticityScore}%), exceeding the 30% permissible limit.`
                  )}
                </p>
              </div>
            </div>

            <div className="bg-black/60 border border-red-500/50 px-4 py-3 rounded-xl shrink-0 text-right">
              <span className="text-[10px] text-neutral-400 uppercase font-bold block">Observed Anomaly</span>
              <span className="text-2xl font-black text-red-400 font-mono">{anomalyScore}%</span>
              <span className="text-[10px] text-red-300 block font-bold">Policy Limit: 30%</span>
            </div>
          </div>

          {/* 3 Metric Diagnosis Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
            <div className="p-3.5 rounded-xl bg-black/60 border border-red-500/30">
              <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">
                Authenticity Score
              </span>
              <span className="text-xl font-bold font-mono text-red-400">
                {authenticityScore}%
              </span>
              <span className="text-[10px] text-neutral-400 block mt-0.5">Required: ≥ 70%</span>
            </div>

            <div className="p-3.5 rounded-xl bg-black/60 border border-red-500/30">
              <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">
                Security Threat
              </span>
              <span className="text-xl font-bold font-mono text-[#FFD166]">
                {candidate.is_prompt_injected || candidate.security_scan?.is_prompt_injected ? "CRITICAL" : "NORMAL"}
              </span>
              <span className="text-[10px] text-neutral-400 block mt-0.5">Prompt Injection Shield</span>
            </div>

            <div className="p-3.5 rounded-xl bg-black/60 border border-red-500/30">
              <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">
                Git Progression
              </span>
              <span className="text-xl font-bold font-mono text-white">
                {candidate.git_dna?.total_commits || 0} Commits
              </span>
              <span className="text-[10px] text-neutral-400 block mt-0.5">Single commit dump flagged</span>
            </div>
          </div>

          {/* Quarantined Vectors or Clone Overlap Display */}
          {candidate.security_scan?.findings && candidate.security_scan.findings.length > 0 && (
            <div className="mb-5 p-4 rounded-xl bg-black/60 border border-red-500/40">
              <span className="text-xs font-bold text-[#FFD166] uppercase tracking-wider block mb-2">
                Violating Vectors Intercepted in Repository:
              </span>
              <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                {candidate.security_scan.findings.slice(0, 4).map((f, i) => (
                  <div key={i} className="text-xs font-mono text-neutral-200 flex items-center justify-between bg-red-950/30 p-2 rounded border border-red-900/40">
                    <span className="text-red-400 font-bold">{f.file}:{f.line_number}</span>
                    <span className="text-neutral-300 truncate max-w-[280px]">"{f.snippet}"</span>
                    <span className="px-1.5 py-0.5 rounded bg-red-900/60 text-red-200 text-[10px] uppercase font-bold">
                      {f.category}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action to Re-qualify */}
          <div className="p-4 rounded-xl bg-black/50 border border-[#D4AF37]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-[#FFD166] uppercase tracking-wider block">
                Enterprise Remediation Guidance:
              </span>
              <p className="text-xs text-[#C9B89A] mt-0.5">
                Remove adversarial instructions, eliminate public tutorial boilerplate, and submit an authentic multi-commit repository to unlock Viva.
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => onNavigateToTab('terminal')}
                className="btn-dev-outline text-xs px-3.5 py-2 font-bold cursor-pointer"
              >
                Inspect Clone Radar
              </button>
              <button
                onClick={() => onNavigateToTab('proofcard')}
                className="btn-dev-primary text-xs px-3.5 py-2 font-bold cursor-pointer"
              >
                View Skill Card
              </button>
            </div>
          </div>
        </div>
      ) : (
        <>
      {/* Question Selector & Countdown Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-1.5">
          {questions.map((q, idx) => {
            const isEvaluated = evaluatedAnswers[idx] !== undefined;
            const isCurrent = idx === currentQuestionIndex;
            const isLocked = idx > 0 && Array.from({ length: idx }, (_, i) => i).some(prevIdx => evaluatedAnswers[prevIdx] === undefined);
            return (
              <button
                key={q.question_id || idx}
                onClick={() => {
                  if (!isLocked) {
                    setCurrentQuestionIndex(idx);
                  }
                }}
                disabled={isLocked}
                title={isLocked ? `Answer preceding questions first to unlock Question ${idx + 1}` : undefined}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold transition border ${
                  isLocked
                    ? 'bg-black/20 border-neutral-800 text-neutral-600 cursor-not-allowed opacity-60'
                    : isCurrent
                    ? 'bg-[#8B1E1E] border-[#D4AF37] text-white shadow-md cursor-pointer'
                    : isEvaluated
                    ? 'bg-black/60 border-emerald-500/60 text-emerald-300 cursor-pointer'
                    : 'bg-black/40 border-[#3A2F27] text-neutral-400 hover:text-white cursor-pointer'
                }`}
              >
                Q{idx + 1} {isLocked ? '🔒' : isEvaluated ? '✓' : ''}
              </button>
            );
          })}
        </div>

        {/* Dynamic Countdown Timer with Rationale */}
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-[#E6C280]/80 font-mono hidden md:inline">
            {calculateQuestionTime(currentQ).rationale}
          </span>
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-mono font-bold ${
            timeLeft <= 10
              ? 'bg-red-950/60 border-red-500 text-red-300 animate-pulse'
              : 'bg-black/50 border-[#D4AF37]/40 text-[#FFD166]'
          }`}>
            <Clock className="w-3.5 h-3.5" />
            <span>{timeLeft}s REMAINING</span>
          </div>
        </div>
      </div>

      {/* Enterprise AI Prompting Policy & Tolerance Gate */}
      <div className="p-5 rounded-2xl mb-6 bg-black/45 backdrop-blur-md border border-[#D4AF37]/35 shadow-2xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#3A2F27] pb-3">
          <div className="flex items-center gap-2.5">
            <ShieldAlert className="w-5 h-5 text-[#FFD166]" />
            <div>
              <h3 className="text-sm font-bold text-white font-sans flex items-center gap-2">
                <span>Enterprise AI Prompting Policy & Tolerance Gate</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#8B1E1E]/40 border border-[#D4AF37] text-[#FFD166]">
                  Active Gate
                </span>
              </h3>
              <p className="text-[11px] text-[#C9B89A]">
                Allows AI prompting according to company template, but strictly penalizes code exceeding the AI limit
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-[#D4AF37] font-bold">Max AI Limit:</span>
            <span className={`text-sm font-bold font-mono px-2.5 py-0.5 rounded-lg border ${
              toleranceLimit <= 20 
                ? 'bg-blue-950/60 border-blue-500 text-blue-300' 
                : toleranceLimit <= 35 
                  ? 'bg-amber-950/60 border-amber-500 text-amber-300' 
                  : 'bg-purple-950/60 border-purple-500 text-purple-300'
            }`}>
              {toleranceLimit}%
            </span>
          </div>
        </div>

        {/* Template Selector Pills */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {[
            { id: 'strict-core-logic', name: 'Strict Human Core', limit: 20, desc: 'AI for syntax only; logic must be 100% human' },
            { id: 'balanced-copilot', name: 'Balanced Copilot', limit: 35, desc: 'Permits scaffolding/templates up to 35%' },
            { id: 'ai-native-builder', name: 'AI-Native Builder', limit: 50, desc: 'Allows prompt-engineering velocity up to 50%' },
          ].map(t => (
            <button
              key={t.id}
              type="button"
              onClick={() => handleTemplateChange(t.id)}
              className={`p-3 rounded-xl border text-left transition cursor-pointer ${
                selectedTemplateId === t.id
                  ? 'bg-[#2c140a] border-[#E85D04] shadow-md ring-1 ring-[#E85D04]'
                  : 'bg-[#140b08] border-[#3A2F27] hover:border-[#D4AF37]/40 text-neutral-400'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-white">{t.name}</span>
                <span className="text-[10px] font-mono text-[#FFD166]">{t.limit}% Limit</span>
              </div>
              <p className="text-[10px] text-neutral-400 line-clamp-1">{t.desc}</p>
            </button>
          ))}
        </div>

        {/* Interactive Limit Slider */}
        <div className="p-3.5 rounded-xl bg-[#100603] border border-[#3A2F27] space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-[#E6C280] font-sans">
              Custom Company Threshold Slider:
            </span>
            <span className="font-mono text-white font-bold">
              {toleranceLimit}% Allowed AI-Assisted Code
            </span>
          </div>
          <input
            type="range"
            min="5"
            max="80"
            step="5"
            value={toleranceLimit}
            onChange={(e) => {
              setToleranceLimit(Number(e.target.value));
              setLiveToleranceResult(null);
            }}
            className="w-full accent-[#E85D04] cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-neutral-500 font-mono">
            <span>5% (Zero AI Tolerance)</span>
            <span>35% (Industry Standard)</span>
            <span>80% (Permissive)</span>
          </div>
        </div>

        {/* Policy Rules & Categories */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
          <div className="p-2.5 rounded-lg bg-emerald-950/20 border border-emerald-700/30">
            <span className="text-[10px] uppercase font-bold text-emerald-400 block mb-1">
              ✓ Allowed Prompting in this Template:
            </span>
            <p className="text-[11px] text-neutral-300">
              {(activeTemplate.allowed_categories || []).join(' • ')}
            </p>
          </div>
          <div className="p-2.5 rounded-lg bg-red-950/20 border border-red-700/30">
            <span className="text-[10px] uppercase font-bold text-red-400 block mb-1">
              ✕ Flagged if Exceeding Limit:
            </span>
            <p className="text-[11px] text-neutral-300">
              {(activeTemplate.prohibited_categories || []).join(' • ')} — Triggers mandatory viva defense!
            </p>
          </div>
        </div>
      </div>

      {/* Main Question Defense Card */}
      <div className="p-6 rounded-2xl bg-black/35 backdrop-blur-md border border-[#D4AF37]/25 shadow-2xl">
        <div className="mb-4">
          <div className="flex items-center justify-between text-xs text-[#E6C280] font-mono mb-2">
            <span className="flex items-center gap-1.5">
              <Code className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Extracted Target: <strong>{currentQ.function_name || 'core_logic'}()</strong> in {currentQ.file || 'resume'}:{currentQ.line_number || 1}</span>
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

        {/* KEY FUNCTIONS EXTRACTED FROM CODE (Dynamically synchronized with active question) */}
        <div className="mb-5 rounded-2xl bg-[#0c0806] border border-[#D4AF37]/30 overflow-hidden shadow-xl">
          <div className="bg-[#140b08] px-4 py-2.5 border-b border-[#3A2F27] flex items-center justify-between text-xs font-sans">
            <span className="font-bold uppercase tracking-wider text-[#FFD166] flex items-center gap-2">
              <Terminal className="w-4 h-4 text-[#D4AF37]" />
              <span>Key Functions Extracted from Code</span>
            </span>
            <span className="font-mono text-xs text-[#E6C280] font-bold">
              {candidate?.complex_functions?.length || 1} Functions Identified
            </span>
          </div>

          {/* Function Tabs */}
          {candidate?.complex_functions && candidate.complex_functions.length > 0 && (
            <div className="px-4 py-2 bg-black/40 border-b border-[#2A241B] flex flex-wrap items-center gap-2">
              {candidate.complex_functions.map((f, i) => {
                const isSelected = selectedFuncIndex === i;
                const isCurrentTarget = f.function_name === currentQ.function_name;
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setSelectedFuncIndex(i)}
                    className={`px-3 py-1.5 rounded-xl font-mono text-xs transition cursor-pointer flex items-center gap-2 ${
                      isSelected
                        ? 'bg-[#8B1E1E] text-white border border-[#D4AF37] shadow-sm font-bold'
                        : isCurrentTarget
                        ? 'bg-[#1f120c] text-[#FFD166] border border-[#D4AF37]/50 hover:bg-[#D4AF37]/20'
                        : 'bg-black/50 text-[#C9B89A] border border-[#3A2F27] hover:border-[#D4AF37]/50'
                    }`}
                  >
                    <span>{f.function_name}()</span>
                    <span className="px-1.5 py-0.2 rounded bg-black/60 text-[10px] text-[#FFD166] font-bold">
                      Complexity: {f.complexity}
                    </span>
                    {isCurrentTarget && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FFD166] animate-pulse"></span>
                    )}
                  </button>
                );
              })}
            </div>
          )}

          {/* Verified Code Snippet Box */}
          <div className="bg-[#080504]">
            <div className="px-4 py-2 bg-[#120a07] border-b border-[#2A241B] flex items-center justify-between text-xs font-mono text-[#C9B89A]">
              <span>{activeSnippetFunc.file}:{activeSnippetFunc.line_number}</span>
              <span className="text-[#D4AF37] font-bold">Verified Code Snippet</span>
            </div>
            <pre className="p-4 text-xs text-neutral-200 font-mono overflow-x-auto leading-relaxed max-h-64 scrollbar-thin">
              <code>{activeSnippetFunc.snippet}</code>
            </pre>
          </div>
        </div>

        {/* Expected Concepts */}
        <div className="mb-4 p-3.5 rounded-xl bg-black/50 border border-[#3A2F27]">
          <span className="text-xs font-bold text-[#FFD166] uppercase tracking-wider block mb-2">
            Key Grading Concepts:
          </span>
          <div className="flex flex-wrap gap-2">
            {(currentQ.expected_concepts || []).map((c, i) => (
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

                <button
                  type="button"
                  onClick={handleAuditAiTolerance}
                  disabled={!userAnswer.trim() || isAuditingTolerance}
                  className="px-3 py-1.5 rounded-lg border text-xs font-mono font-bold transition flex items-center gap-1.5 cursor-pointer bg-purple-950/40 border-purple-500/40 text-purple-200 hover:bg-purple-900/40 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isAuditingTolerance ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />}
                  <span>Audit vs Company AI Policy</span>
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
            disabled={isCurrentEvaluated || timeLeft === 0 || isEvaluating}
            placeholder={timeLeft === 0 && !isCurrentEvaluated ? "Time expired! Input locked." : "Type your technical defense or click Voice Defense to speak..."}
            className={`w-full bg-black/60 border rounded-xl p-3.5 text-xs sm:text-sm text-neutral-200 leading-relaxed focus:outline-none font-mono transition ${
              timeLeft === 0 && !isCurrentEvaluated ? 'border-red-500/80 bg-red-950/20 opacity-75' : 'border-[#3A2F27] focus:border-[#D4AF37]'
            }`}
          ></textarea>
          {timeLeft === 0 && !isCurrentEvaluated && (
            <p className="mt-1.5 text-xs text-red-400 font-mono flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              <span>Time has expired. Answer input is locked and auto-submitted.</span>
            </p>
          )}

          {/* Live AI Policy Tolerance Audit Banner */}
          {liveToleranceResult && (
            <div className={`mt-3 p-3.5 rounded-xl border text-xs transition animate-fadeIn ${
              liveToleranceResult.verdict === 'PASS'
                ? 'bg-emerald-950/50 border-emerald-500/60 text-emerald-200'
                : liveToleranceResult.verdict === 'WARN'
                  ? 'bg-amber-950/50 border-amber-500/60 text-amber-200'
                  : 'bg-red-950/60 border-red-500/80 text-red-100 shadow-[0_0_15px_rgba(239,68,68,0.3)]'
            }`}>
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold flex items-center gap-2">
                  <span>{liveToleranceResult.badge}</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/60 border border-white/20">
                    Template: {liveToleranceResult.template_name} ({liveToleranceResult.tolerance_percent}% Limit)
                  </span>
                </span>
                <span className="font-mono text-[11px] font-bold">
                  {liveToleranceResult.exceeded ? `Exceeded by +${liveToleranceResult.excess_percent}%` : 'Compliant'}
                </span>
              </div>
              <p className="text-[11px] leading-relaxed text-neutral-200">
                {liveToleranceResult.message}
              </p>
            </div>
          )}
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

            {/* Prompt Injection Warning if detected */}
            {evaluatedAnswers[currentQuestionIndex].adversarial_injection_detected && (
              <div className="mt-3 p-2.5 rounded-lg bg-amber-950/60 border border-amber-500/60 text-amber-200 text-xs flex items-center gap-2 font-mono">
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                <span><strong>Adversarial Injection Neutralized:</strong> Hostile system prompt overrides or HTML comments in candidate response were detected and sanitized.</span>
              </div>
            )}

            {/* AI Text Pattern Detection Analysis */}
            {evaluatedAnswers[currentQuestionIndex].ai_detection && (
              <div className="mt-3 pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2 text-xs font-mono">
                  <span className="text-neutral-400">AI Pattern Detection:</span>
                  {evaluatedAnswers[currentQuestionIndex].ai_detection.classification === 'ai_like' && (
                    <span className="px-2.5 py-0.5 rounded-full bg-red-950/80 border border-red-500 text-red-200 font-bold flex items-center gap-1">
                      <span>🤖 AI-Generated Pattern ({Math.round((evaluatedAnswers[currentQuestionIndex].ai_detection.ai_probability || 0.8) * 100)}% prob) — Score Penalized</span>
                    </span>
                  )}
                  {evaluatedAnswers[currentQuestionIndex].ai_detection.classification === 'human_like' && (
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500 text-emerald-200 font-bold flex items-center gap-1">
                      <span>👤 Verified Human Authorship ({Math.round((evaluatedAnswers[currentQuestionIndex].ai_detection.human_probability || 0.9) * 100)}% confidence)</span>
                    </span>
                  )}
                  {evaluatedAnswers[currentQuestionIndex].ai_detection.classification === 'mixed_or_uncertain' && (
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-950/80 border border-amber-500 text-amber-200 font-bold flex items-center gap-1">
                      <span>⚖️ Mixed / Uncertain Style</span>
                    </span>
                  )}
                  {evaluatedAnswers[currentQuestionIndex].ai_detection.classification === 'insufficient_text' && (
                    <span className="px-2.5 py-0.5 rounded-full bg-neutral-900 border border-neutral-700 text-neutral-400 font-bold flex items-center gap-1">
                      <span>ℹ️ Short Answer (AI check skipped)</span>
                    </span>
                  )}
                  {evaluatedAnswers[currentQuestionIndex].ai_detection.classification === 'unsupported_language' && (
                    <span className="px-2.5 py-0.5 rounded-full bg-neutral-900 border border-neutral-700 text-neutral-400 font-bold flex items-center gap-1">
                      <span>🌐 Non-English Script</span>
                    </span>
                  )}
                </div>
                <span className="text-[10px] text-neutral-400 font-mono">Model: {evaluatedAnswers[currentQuestionIndex].ai_detection.model_version}</span>
              </div>
            )}
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
        </>
      )}
    </div>
  );
};
