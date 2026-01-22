
import React, { useState } from 'react';
import InvitationCard from '../InvitationCard';

interface WelcomeProps {
  onStart: (name: string) => void;
}

const Welcome: React.FC<WelcomeProps> = ({ onStart }) => {
  const [nameInput, setNameInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (nameInput.trim()) {
      onStart(nameInput.trim());
    } else {
      alert('Vui lòng nhập tên của bạn nhé!');
    }
  };

  return (
    <InvitationCard>
      <div className="font-cursive text-6xl text-[#1a365d] mb-2 leading-tight">Graduation</div>
      <p className="text-[#4a5568] tracking-[2px] mb-8 font-light uppercase">Trường Đại học PHENIKAA</p>
      
      <div className="my-10 space-y-4">
        <h3 className="text-xl font-bold text-[#1a365d]">Xin chào!</h3>
        <p className="text-sm italic text-[#c5a059]">Để cá nhân hóa thư mời, vui lòng nhập tên của bạn</p>
        
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <input 
            type="text" 
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
            placeholder="Tên của bạn..."
            className="w-full max-w-xs p-4 rounded-xl border border-[#cbd5e0] focus:outline-none focus:ring-2 focus:ring-[#c5a059] text-center text-lg mb-6 transition-all"
          />
          <button 
            type="submit"
            className="bg-[#1a365d] text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-[#2c5282] hover:-translate-y-1 transition-all flex items-center gap-2"
          >
            Tiếp tục <span>→</span>
          </button>
        </form>
      </div>
    </InvitationCard>
  );
};

export default Welcome;
