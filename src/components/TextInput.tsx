import React, { useState } from 'react';
import { FileText, Upload } from 'lucide-react';

interface TextInputProps {
  onTextSubmit: (text: string) => void;
}

export function TextInput({ onTextSubmit }: TextInputProps) {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onTextSubmit(text);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setText(content);
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center gap-4 mb-4">
          <label className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700 transition-colors">
            <Upload size={20} />
            Upload File
            <input
              type="file"
              accept=".txt,.md,.json"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
          <span className="text-gray-500">or paste text below</span>
        </div>
        
        <div className="relative">
          <FileText className="absolute top-3 left-3 text-gray-400" size={20} />
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full h-64 pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter or paste your text here..."
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!text.trim()}
        >
          Process Text
        </button>
      </form>
    </div>
  );
}