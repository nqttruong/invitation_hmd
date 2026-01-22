
import React from 'react';
import { Screen } from '../../types';
import InvitationCard from '../InvitationCard';

interface HomeProps {
  guestName: string;
  loading: boolean;
  onNavigate: (screen: Screen) => void;
}

const Home: React.FC<HomeProps> = ({ guestName, loading, onNavigate }) => {
  return (
    <InvitationCard>
      <p className="text-[#c5a059] italic text-sm mb-4">
        {loading ? 'Đang chuẩn bị lời chào...' : `Hân hạnh đón tiếp ${guestName}`}
      </p>
      
      <div className="font-cursive text-6xl text-[#1a365d] mb-0 leading-tight">Graduation</div>
      <div className="tracking-[6px] text-lg font-light text-[#4a5568] uppercase mb-6">INVITATION</div>
      
      <div className="w-44 h-44 mx-auto my-6 rounded-full border-[6px] border-[#c5a059] overflow-hidden shadow-xl">
        <img 
          src="https://picsum.photos/seed/graduate/400/400" 
          alt="Đặng Minh Hiền" 
          className="w-full h-full object-cover"
        />
      </div>
      
      <h1 className="font-cursive text-5xl text-[#1a365d] my-4">Đặng Minh Hiền</h1>
      <p className="text-[#4a5568] font-light tracking-wider mb-10">Phenikaa University Graduate</p>

      <div className="flex flex-col gap-4 items-center">
        <button 
          onClick={() => onNavigate(Screen.INVITATION)}
          className="w-full max-w-xs bg-[#1a365d] text-white py-3 rounded-full font-bold shadow-md hover:bg-[#2c5282] hover:-translate-y-1 transition-all"
        >
          Xem Thư Mời ↓
        </button>
        <button 
          onClick={() => onNavigate(Screen.SCHEDULE)}
          className="w-full max-w-xs bg-white border-2 border-[#1a365d] text-[#1a365d] py-3 rounded-full font-bold shadow-sm hover:bg-[#f0f4f8] transition-all"
        >
          Lịch Trình
        </button>
      </div>
    </InvitationCard>
  );
};

export default Home;
