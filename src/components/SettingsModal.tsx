import React, { useState, useEffect } from 'react';
import { WordPressConfig } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  config: WordPressConfig;
  onSave: (config: WordPressConfig) => void;
}

const SettingsModal: React.FC<Props> = ({ isOpen, onClose, config, onSave }) => {
  const [localConfig, setLocalConfig] = useState<WordPressConfig>(config);

  useEffect(() => {
    setLocalConfig(config);
  }, [config]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ ...localConfig, isConfigured: true });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        <div className="flex justify-between items-center p-6 border-b border-slate-100">
          <h2 className="text-xl font-bold text-slate-800">連携設定</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">WordPress サイトURL</label>
            <input 
              type="url" 
              value={localConfig.siteUrl}
              onChange={(e) => setLocalConfig({...localConfig, siteUrl: e.target.value})}
              className="w-full p-2 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="https://example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">ユーザー名</label>
            <input 
              type="text" 
              value={localConfig.username}
              onChange={(e) => setLocalConfig({...localConfig, username: e.target.value})}
              className="w-full p-2 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">アプリケーションパスワード</label>
            <input 
              type="password" 
              value={localConfig.applicationPassword}
              onChange={(e) => setLocalConfig({...localConfig, applicationPassword: e.target.value})}
              className="w-full p-2 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="xxxx xxxx xxxx xxxx"
            />
          </div>
          
          <div className="pt-4 flex gap-3">
            <button 
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-slate-200 text-slate-600 rounded-xl font-bold hover:bg-slate-50 transition-all"
            >
              キャンセル
            </button>
            <button 
              type="submit" 
              className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all"
            >
              設定を保存
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SettingsModal;
