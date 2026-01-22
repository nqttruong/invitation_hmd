
import React from 'react';
import { Screen } from '../../types';
import InvitationCard from '../InvitationCard';

interface ScheduleProps {
  guestName: string;
  onNavigate: (screen: Screen) => void;
}

const Schedule: React.FC<ScheduleProps> = ({ guestName, onNavigate }) => {
  const activities = [
    { time: '08:30', detail: 'Đón tiếp đại biểu & khách mời' },
    { time: '09:00', detail: 'Khai mạc buổi lễ tốt nghiệp' },
    { time: '09:30', detail: 'Trao bằng tốt nghiệp vinh danh' },
    { time: '10:30', detail: 'Chụp ảnh lưu niệm & Kết thúc' }
  ];

  return (
    <InvitationCard>
      <p className="text-[#c5a059] italic text-sm mb-6">Lịch trình chi tiết cho {guestName}</p>
      <div className="font-cursive text-5xl text-[#1a365d] mb-10">Lịch Trình</div>
      
      <div className="space-y-6 text-left max-w-xs mx-auto mb-12">
        {activities.map((item, idx) => (
          <div key={idx} className="flex gap-4 items-start animate-in slide-in-from-left duration-500 delay-[100ms]" style={{ animationDelay: `${idx * 150}ms` }}>
            <div className="font-bold text-[#1a365d] whitespace-nowrap min-w-[60px]">{item.time}</div>
            <div className="text-[#4a5568] leading-snug">{item.detail}</div>
          </div>
        ))}
      </div>

      <div className="bg-[#f0f4f8] p-4 rounded-xl mb-10 text-xs text-[#1a365d] italic border-l-4 border-[#c5a059]">
        * Lưu ý: Quý khách vui lòng đến đúng giờ để buổi lễ diễn ra trang trọng nhất.
      </div>

      <button 
        onClick={() => onNavigate(Screen.HOME)}
        className="text-[#1a365d] flex items-center gap-2 mx-auto font-bold hover:underline"
      >
        <span className="text-xl">↑</span> Quay lại
      </button>
    </InvitationCard>
  );
};

export default Schedule;
