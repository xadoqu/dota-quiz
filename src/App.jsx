import { useState } from 'react';
import { quizData as initialData } from './data/questions';

export default function App() {
  const [questions, setQuestions] = useState(initialData);
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [isStarted, setIsStarted] = useState(false);

  
  const emptyQuestion = { 
    question: '', 
    image: 'https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/items/blink.png',
    options: Array(4).fill({ 
      text: '', 
      img: 'https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/items/branches.png' 
    }), 
    correct: 0 
  };

  const [newQuest, setNewQuest] = useState(emptyQuestion);

  const handleAddQuestion = () => {
    if (!newQuest.question.trim()) return alert("Введіть текст питання!");
    setQuestions([...questions, newQuest]);
    setIsCreating(false);
    setNewQuest(emptyQuestion);
  };

  const handleAnswer = (index) => {
    if (index === questions[step].correct) setScore(score + 1);
    const next = step + 1;
    if (next < questions.length) setStep(next);
    else setShowResults(true);
  };

  if (isCreating) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center p-4">
        <div className="w-full max-w-2xl bg-[#1c1c1c] p-6 rounded border border-white/10 shadow-2xl overflow-y-auto max-h-[95vh]">
          <h2 className="text-xl font-black mb-6 text-stone-300 uppercase tracking-widest border-l-4 border-red-600 pl-4">Конструктор питання</h2>
          
          <div className="grid gap-4 mb-6 bg-black/40 p-4 rounded border border-white/5">
            <div>
              <label className="text-[10px] text-stone-500 uppercase font-bold">Текст питання</label>
              <input className="w-full p-2 bg-stone-900 border border-white/10 rounded mt-1 outline-none focus:border-green-600" value={newQuest.question} onChange={(e) => setNewQuest({...newQuest, question: e.target.value})} />
            </div>
            <div>
              <label className="text-[10px] text-stone-500 uppercase font-bold">URL картинки питання</label>
              <input className="w-full p-2 bg-stone-900 border border-white/10 rounded mt-1 outline-none focus:border-green-600" value={newQuest.image} onChange={(e) => setNewQuest({...newQuest, image: e.target.value})} />
            </div>
          </div>

          <div className="grid gap-3 mb-8">
            {newQuest.options.map((opt, i) => (
              <div key={i} className="flex gap-3 bg-black/20 p-3 rounded border border-white/5 items-center">
                <input type="radio" name="correct" checked={newQuest.correct === i} onChange={() => setNewQuest({...newQuest, correct: i})} className="w-5 h-5 accent-green-600 cursor-pointer" />
                <div className="flex-1 grid gap-2">
                  <input className="bg-transparent border-b border-white/10 p-1 text-sm outline-none focus:border-green-600" placeholder="Текст відповіді" value={opt.text} onChange={(e) => {
                    const opts = [...newQuest.options];
                    opts[i] = { ...opts[i], text: e.target.value };
                    setNewQuest({...newQuest, options: opts});
                  }} />
                  <input className="bg-transparent border-b border-white/10 p-1 text-[10px] text-stone-500 outline-none" placeholder="URL картинки відповіді" value={opt.img} onChange={(e) => {
                    const opts = [...newQuest.options];
                    opts[i] = { ...opts[i], img: e.target.value };
                    setNewQuest({...newQuest, options: opts});
                  }} />
                </div>
                <img src={opt.img} className="w-10 h-10 object-cover rounded bg-black" alt="" />
              </div>
            ))}
          </div>

          <div className="flex gap-4">
            <button onClick={handleAddQuestion} className="flex-1 py-4 bg-green-700 hover:bg-green-600 text-white font-bold uppercase tracking-widest transition-all">Зберегти</button>
            <button onClick={() => setIsCreating(false)} className="px-8 py-4 bg-stone-800 hover:bg-stone-700 text-white font-bold uppercase transition-all">Відміна</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black flex items-center justify-center font-sans text-white">
      {/* ВІДЕО ІНТРО НА СТАРТІ */}
      {!isStarted && (
        <video autoPlay muted loop playsInline className="absolute z-0 w-auto min-w-full min-h-full max-w-none opacity-60">
          <source src="https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/homepage/dota_montage_webm.webm" type="video/webm" />
        </video>
      )}

      {/* ФОН ГРИ */}
      {isStarted && (
        <div className="absolute inset-0 z-0 bg-cover bg-center" style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.92), rgba(0,0,0,0.92)), url('https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/home/background_v2.jpg')` }} />
      )}

      <div className="relative z-10 w-full flex flex-col items-center justify-center p-4">
        {!isStarted ? (
          /* ПОЧАТКОВИЙ ЕКРАН */
          <div className="flex flex-col items-center">
            {/* ВЕЛИКА КНОПКА ГРАТИ */}
            <button 
              onClick={() => setIsStarted(true)}
              className="group relative flex items-center justify-center px-32 py-10 
                         bg-gradient-to-r from-[#4d6b2b] via-[#79a33d] to-[#4d6b2b] 
                         border-t-2 border-[#b4e661] border-l border-r border-[#2d401a]
                         shadow-[0_20px_60px_rgba(0,0,0,0.8),_inset_0_1px_1px_rgba(255,255,255,0.3)] 
                         hover:brightness-125 active:scale-95 transition-all duration-200"
            >
              <span className="text-white text-6xl font-black uppercase italic tracking-tighter drop-shadow-[0_4px_4px_rgba(0,0,0,0.9)]">
                Грати
              </span>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-white transition-opacity duration-300" />
            </button>
            
            <button 
              onClick={() => setIsCreating(true)} 
              className="mt-16 text-stone-500 hover:text-white text-xs font-bold uppercase tracking-[0.4em] transition-all opacity-60 hover:opacity-100"
            >
              + Конструктор квізу
            </button>
          </div>
        ) : (
          /* ЕКРАН ГРИ ТА РЕЗУЛЬТАТІВ */
          <>
            {!showResults ? (
              <div className="w-full max-w-lg bg-[#1c1c1c]/95 p-8 rounded border border-white/5 shadow-2xl backdrop-blur-md">
                <div className="text-center mb-6">
                  <img src={questions[step].image} className="h-24 mx-auto rounded shadow-lg mb-4 border border-white/10" alt="" />
                  <h2 className="text-2xl font-bold text-stone-200">{questions[step].question}</h2>
                </div>
                <div className="grid grid-cols-1 gap-3">
                  {questions[step].options.map((opt, i) => (
                    <button key={i} onClick={() => handleAnswer(i)} className="flex items-center gap-4 p-4 bg-stone-900/50 border border-white/5 hover:border-green-600/50 hover:bg-green-900/10 transition-all text-left">
                      <img src={opt.img} className="w-12 h-12 rounded object-cover shadow-md" alt="" />
                      <span className="font-medium text-stone-300">{opt.text}</span>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center p-12 bg-[#1c1c1c] border border-white/5 shadow-2xl">
                <h1 className="text-8xl font-black text-red-700 mb-4 italic">GG WP</h1>
                <p className="text-2xl text-stone-400 mb-10 uppercase tracking-widest text-center">Результат: {score} / {questions.length}</p>
                <button onClick={() => window.location.reload()} className="px-12 py-5 bg-[#4d6b2b] hover:bg-[#79a33d] text-white font-black uppercase tracking-widest transition-all">В головне меню</button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}