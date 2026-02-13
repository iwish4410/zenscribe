import React, { useState } from 'react';
import { ArticleConfig } from '../types';

interface Props {
  onSubmit: (config: ArticleConfig) => void;
  isLoading: boolean;
}

const ArticleForm: React.FC<Props> = ({ onSubmit, isLoading }) => {
  const [topic, setTopic] = useState('');
  const [keywords, setKeywords] = useState('');
  const [tone, setTone] = useState('丁寧・親しみやすい');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;
    
    onSubmit({
      topic,
      keywords,
      tone
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-5">
      {/* テーマ入力 */}
      <div>
        <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-1">
          記事のテーマ <span className="text-red-500 text-xs">*</span>
        </label>
        <input 
          type="text" 
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition-all"
          placeholder="例: 初心者向けの美味しいカレーの作り方"
          required
        />
      </div>

      {/* キーワード入力 */}
      <div>
        <label className="block text-sm font-bold text-slate-700 mb-2">
          含めたいキーワード
        </label>
        <input 
          type="text" 
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
          className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition-all"
          placeholder="例: スパイス, 時短, 隠し味 (カンマ区切り)"
        />
      </div>

      {/* 文体（トーン）の選択 */}
      <div>
        <label className="block text-sm font-bold text-slate-700 mb-2">
          文章の雰囲気
        </label>
        <select 
          value={tone}
          onChange={(e) => setTone(e.target.value)}
          className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition-all cursor-pointer"
        >
          <option>丁寧・親しみやすい</option>
          <option>プロフェッショナル・硬め</option>
          <option>情熱的・エネルギッシュ</option>
          <option>ユーモアのある・カジュアル</option>
        </select>
      </div>

      {/* 送信ボタン */}
      <button 
        type="submit" 
        disabled={isLoading || !topic}
        className={`w-full py-4 rounded-xl font-bold text-white shadow-lg transition-all flex items-center justify-center gap-2 ${
          isLoading 
            ? 'bg-slate-400 cursor-not-allowed' 
            : 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-100 active:scale-[0.98]'
        }`}
      >
        {isLoading ? (
          <>
            <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            AIが執筆しています...
          </>
        ) : (
          '執筆を依頼する'
        )}
      </button>
    </form>
  );
};

export default ArticleForm;
