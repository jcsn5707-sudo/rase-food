import React from 'react';
import { Sparkles } from 'lucide-react';

interface MobileStickyBarProps {
  onOrderClick: () => void;
}

export const MobileStickyBar: React.FC<MobileStickyBarProps> = ({ onOrderClick }) => {
  return (
    <aside aria-label="빠른 주문 바" className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-[#FAF7F0]/95 backdrop-blur-md border-t-2 border-[#D8CEBA] px-4 py-3 shadow-[0_-4px_12px_rgba(0,0,0,0.06)]">
      <div className="max-w-md mx-auto flex items-center justify-between gap-3">
        <div className="flex flex-col">
          <span className="text-[11px] font-bold text-[#6D7762]">국내산 50선 1개월분</span>
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-black text-[#2D5A27]">38,500원</span>
            <span className="text-[11px] text-[#868E7E] line-through">48,000원</span>
          </div>
        </div>

        <button
          onClick={onOrderClick}
          className="flex-1 bg-[#2D5A27] active:scale-98 text-white py-3.5 px-5 rounded-2xl font-black text-lg shadow-md flex items-center justify-center gap-2 cursor-pointer"
        >
          <Sparkles className="w-5 h-5 text-[#E9C46A]" />
          <span>주문하기</span>
        </button>
      </div>
    </aside>
  );
};
