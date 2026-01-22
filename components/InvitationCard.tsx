
import React from 'react';

interface InvitationCardProps {
  children: React.ReactNode;
}

const InvitationCard: React.FC<InvitationCardProps> = ({ children }) => {
  return (
    <div className="invitation-card bg-white p-8 md:p-10 shadow-2xl rounded-2xl text-center relative border-[10px] border-white watercolor-bg overflow-hidden animate-in fade-in zoom-in duration-700">
      {children}
    </div>
  );
};

export default InvitationCard;
