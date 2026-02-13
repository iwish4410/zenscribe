import React from 'react';
import { Article } from '../types';

interface Props {
  history: Article[];
  onSelect: (article: Article) => void;
  onDelete: (id: string) => void;
}

const HistoryList: React.FC<Props> = ({ history, onSelect, onDelete }) => {
  if (history.length === 0) {
    return (
      <div className="bg-white p-6 rounded-xl border border-dashed border-slate-200 text-center">
        <p className="text-sm text-slate-500">作成履歴はまだありません</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {history.map((article) => (
        <div 
          key={article.id}
          className="group bg-white p-4 rounded-xl border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all cursor-pointer relative"
          onClick={() => onSelect(article)}
        >
          <h3 className="text-sm font-bold text-slate-800 pr-8 line-clamp-1">{article.title}</h3>
          <p className="text-[10px] text-slate-400 mt-1">
            {new Date(article.createdAt).toLocaleString()}
          </p>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onDelete(article.id);
            }}
            className="absolute top-4 right-4 text-slate-300 hover:text-red-500 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      ))}
    </div>
  );
};

export default HistoryList;
