import React from 'react';
import { Article, WordPressConfig } from '../types';

interface Props {
  article: Article;
  wpConfig: WordPressConfig;
}

const ArticleDisplay: React.FC<Props> = ({ article, wpConfig }) => {
  // クリップボードにコピーする機能
  const copyToClipboard = () => {
    navigator.clipboard.writeText(article.content);
    alert('記事本文をコピーしました！');
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* プレビューヘッダー */}
      <div className="bg-slate-50 px-8 py-4 border-b border-slate-100 flex justify-between items-center">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Preview</span>
        <div className="flex gap-2">
          <button 
            onClick={copyToClipboard}
            className="flex items-center gap-1 px-3 py-1.5 bg-white border border-slate-200 text-slate-600 rounded-lg text-xs font-bold hover:bg-slate-50 transition-all"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
            </svg>
            コピー
          </button>
          
          {wpConfig.isConfigured && (
            <button className="flex items-center gap-1 px-3 py-1.5 bg-indigo-600 text-white rounded-lg text-xs font-bold hover:bg-indigo-700 transition-all shadow-md shadow-indigo-100">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              WordPressへ投稿
            </button>
          )}
        </div>
      </div>

      {/* 記事本文エリア */}
      <div className="p-8 md:p-12">
        <header className="mb-8 border-b border-slate-100 pb-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="px-2 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-bold rounded uppercase">
              {article.config.tone}
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight">
            {article.title}
          </h1>
        </header>

        <article className="prose prose-slate max-w-none">
          {/* 改行を反映させるために whitespace-pre-wrap を使用 */}
          <div className="text-slate-600 leading-relaxed whitespace-pre-wrap text-lg">
            {article.content}
          </div>
        </article>
      </div>

      {/* フッター情報 */}
      <div className="px-8 py-4 bg-slate-50 border-t border-slate-100 flex justify-between items-center text-[10px] text-slate-400 font-medium">
        <span>文字数: {article.content.length} 文字</span>
        <span>ID: {article.id.split('-')[0]}</span>
      </div>
    </div>
  );
};

export default ArticleDisplay;
