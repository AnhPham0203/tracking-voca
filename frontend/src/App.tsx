import { useState, useEffect } from 'react';
import axios from 'axios';
import { Book, Search } from 'lucide-react';

const API_BASE = 'http://localhost:3000/api';

interface VocabularyItem {
  id: string;
  word: string;
  meaning: string;
  partOfSpeech: string;
  example?: string;
  nextReview: string;
}

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [dashboard, setDashboard] = useState({ wordsLearnedToday: 0, totalVocabulary: 0, reviewsDueToday: 0 });
  const [vocabulary, setVocabulary] = useState<VocabularyItem[]>([]);
  const [reviewWord, setReviewWord] = useState<VocabularyItem | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    fetchDashboard();
    fetchVocabulary();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await axios.get(`${API_BASE}/dashboard`);
      setDashboard(res.data);
    } catch (e) { console.error(e); }
  };

  const fetchVocabulary = async () => {
    try {
      const res = await axios.get(`${API_BASE}/vocabulary`);
      setVocabulary(res.data);
    } catch (e) { console.error(e); }
  };

  const startReview = async () => {
    try {
      const res = await axios.get(`${API_BASE}/vocabulary`);
      const due = res.data.filter((w: VocabularyItem) => new Date(w.nextReview) <= new Date());
      if (due.length > 0) {
        setReviewWord(due[0]);
        setShowAnswer(false);
        setActiveTab('review');
      } else {
        alert("No reviews due today!");
      }
    } catch (e) { console.error(e); }
  };

  const handleRate = async (rating: number) => {
    if (!reviewWord) return;
    try {
      await axios.post(`${API_BASE}/review`, { wordId: reviewWord.id, rating });
      fetchDashboard();
      startReview(); // Get next word
    } catch (e) { console.error(e); }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      {/* Header */}
      <header className="bg-white border-b px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-blue-600 flex items-center gap-2">
          <Book size={24} /> Tracking-Voca
        </h1>
        <nav className="flex gap-4">
          <button onClick={() => setActiveTab('dashboard')} className={`px-3 py-1 rounded ${activeTab === 'dashboard' ? 'bg-blue-100 text-blue-700' : ''}`}>Dashboard</button>
          <button onClick={() => setActiveTab('vocabulary')} className={`px-3 py-1 rounded ${activeTab === 'vocabulary' ? 'bg-blue-100 text-blue-700' : ''}`}>Vocabulary</button>
          <button onClick={startReview} className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700">Start Review</button>
        </nav>
      </header>

      {/* Content */}
      <main className="flex-1 p-6">
        {activeTab === 'dashboard' && (
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="text-gray-500 mb-2">Total Vocabulary</div>
              <div className="text-3xl font-bold">{dashboard.totalVocabulary}</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="text-gray-500 mb-2">Words Learned</div>
              <div className="text-3xl font-bold">{dashboard.wordsLearnedToday}</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="text-gray-500 mb-2">Due Today</div>
              <div className="text-3xl font-bold text-orange-500">{dashboard.reviewsDueToday}</div>
            </div>
          </div>
        )}

        {activeTab === 'vocabulary' && (
          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-4 border-b flex justify-between items-center">
              <h2 className="font-bold">My Vocabulary</h2>
              <div className="relative">
                <Search size={16} className="absolute left-3 top-2.5 text-gray-400" />
                <input type="text" placeholder="Search word..." className="pl-9 pr-4 py-2 bg-gray-100 rounded-lg text-sm outline-none" />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-50 text-gray-500 text-sm">
                    <th className="p-4">Word</th>
                    <th className="p-4">Meaning</th>
                    <th className="p-4">Part of Speech</th>
                    <th className="p-4">Next Review</th>
                  </tr>
                </thead>
                <tbody>
                  {vocabulary.map((v: any) => (
                    <tr key={v.id} className="border-t hover:bg-gray-50">
                      <td className="p-4 font-bold text-blue-600">{v.word}</td>
                      <td className="p-4">{v.meaning}</td>
                      <td className="p-4 text-sm text-gray-500">{v.partOfSpeech}</td>
                      <td className="p-4 text-sm">{new Date(v.nextReview).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'review' && reviewWord && (
          <div className="max-w-md mx-auto mt-10">
            <div className="bg-white p-10 rounded-2xl shadow-lg border text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 bg-blue-100">
                <div className="h-full bg-blue-500" style={{ width: '40%' }}></div>
              </div>
              <h2 className="text-4xl font-bold mb-10 mt-6">{reviewWord.word}</h2>
              
              {!showAnswer ? (
                <button onClick={() => setShowAnswer(true)} className="bg-gray-800 text-white w-full py-4 rounded-xl font-bold hover:bg-black">Show Answer</button>
              ) : (
                <div className="space-y-6">
                  <div className="bg-blue-50 p-4 rounded-xl">
                    <div className="text-blue-600 font-bold mb-1">{reviewWord.partOfSpeech}</div>
                    <div className="text-xl font-medium">{reviewWord.meaning}</div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-3">
                    <button onClick={() => handleRate(1)} className="bg-red-50 text-red-600 py-3 rounded-lg border border-red-200 font-bold hover:bg-red-100">Again</button>
                    <button onClick={() => handleRate(3)} className="bg-blue-50 text-blue-600 py-3 rounded-lg border border-blue-200 font-bold hover:bg-blue-100">Good</button>
                    <button onClick={() => handleRate(5)} className="bg-green-50 text-green-600 py-3 rounded-lg border border-green-200 font-bold hover:bg-green-100">Easy</button>
                  </div>
                </div>
              )}
            </div>
            <button onClick={() => setActiveTab('dashboard')} className="mt-6 text-gray-400 text-sm hover:underline block mx-auto">Quit Review Session</button>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
