import React from 'react';
import { ShieldCheck, Phone, Mail, Clock } from 'lucide-react';

interface FooterProps {
  onOpenAdminOrders?: (tab?: 'lookup' | 'admin') => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdminOrders }) => {
  return (
    <footer className="bg-[#263321] text-[#E0E6DC] pt-12 pb-24 md:pb-14 border-t border-[#34462D]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
        {/* Brand & Customer Center */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-8 border-b border-[#3B4E34]">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-[#3E7B35] flex items-center justify-center text-white font-bold text-lg">
                生
              </span>
              <span className="text-2xl font-black text-white">하루한잔 생식</span>
            </div>
            <p className="text-sm text-[#A9B8A4] max-w-md leading-relaxed">
              자연이 주는 맑고 정직한 식사. 국내산 50가지 자연 원료 그대로를 담아 바쁜 일상 속 간편하고 든든한 한 끼를 전합니다.
            </p>
            {onOpenAdminOrders && (
              <div className="pt-2 flex items-center gap-3">
                <button
                  onClick={() => onOpenAdminOrders('lookup')}
                  className="text-xs text-[#E9C46A] hover:underline font-bold cursor-pointer"
                >
                  🔍 내 주문 조회하기
                </button>
                <span className="text-[#4C6044] text-xs">|</span>
                <button
                  onClick={() => onOpenAdminOrders('admin')}
                  className="text-xs text-[#A8BEA0] hover:text-white hover:underline cursor-pointer"
                >
                  ⚙️ 사장님 주문 관리 대시보드
                </button>
              </div>
            )}
          </div>

          {/* Hotline */}
          <div className="bg-[#1C2819] border border-[#35482E] p-4 sm:p-5 rounded-2xl shrink-0 space-y-1">
            <div className="text-xs text-[#9BB194] font-medium flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-[#E9C46A]" />
              <span>고객상담 및 전화주문</span>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-white tracking-wider">
              1544-0950
            </div>
            <div className="text-xs text-[#7E9676] flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>평일 09:00 ~ 18:00 (주말·공휴일 휴무)</span>
            </div>
          </div>
        </div>

        {/* Regulatory & Mandatory Food Notice */}
        <div className="space-y-3 bg-[#1C2819]/60 p-4 rounded-xl border border-[#35482E]/80 text-xs text-[#95A88F] leading-relaxed">
          <div className="flex items-center gap-1.5 text-white font-bold text-sm">
            <ShieldCheck className="w-4 h-4 text-[#75B86A]" />
            <span>식품위생법 및 표시사항 준수 안내</span>
          </div>
          <p>
            • <strong>식품의 유형:</strong> 기타가공품 (생식 함유 제품) | <strong>제조원:</strong> 국내 HACCP 인증 시설 생산 | <strong>유통전문판매원:</strong> (주)하루한잔
          </p>
          <p>
            • <strong>주의사항:</strong> 본 제품은 질병의 예방 및 치료를 위한 의약품이나 체중감량용 조제식품이 아니며, 국내산 곡물과 채소를 동결건조하여 가공한 <strong>일반 식품</strong>입니다. 원료 성분을 확인하시고 특이체질 및 알레르기 체질이신 분은 주의하여 섭취하십시오.
          </p>
          <p>
            • <strong>보관방법:</strong> 고온다습한 곳과 직사광선을 피하여 건냉한 곳에 보관하시고, 스틱 개봉 후에는 가급적 바로 섭취하시기 바랍니다.
          </p>
        </div>

        {/* Business details */}
        <div className="text-xs text-[#7B8E76] space-y-1">
          <p>
            상호: (주)하루한잔자연식품 | 대표자: 홍자연 | 사업자등록번호: 120-88-50500
          </p>
          <p>
            통신판매업신고: 제 2025-서울강남-01234호 | 주소: 서울특별시 강남구 테헤란로 123
          </p>
          <p className="pt-2 text-[#5E7259]">
            © 2026 HaruHanjan Raw Meal. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
