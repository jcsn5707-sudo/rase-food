import React from 'react';
import { ArrowDown, CheckCircle2, ChevronRight, Sparkles, ShieldCheck, HeartHandshake, User } from 'lucide-react';
import { AuthUser } from './AuthModal';

interface HeroProps {
  onOrderClick: () => void;
  onExploreIngredients: () => void;
  currentUser?: AuthUser | null;
}

export const Hero: React.FC<HeroProps> = ({ onOrderClick, onExploreIngredients, currentUser }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#F7F3E9] via-[#FAF7F0] to-[#F3EDE2] pt-8 pb-14 sm:pt-14 sm:pb-20 border-b border-[#E8E1D3]">
      {/* Decorative leaf / nature aura */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#3E7B35]/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#D4A373]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative">
        {/* Top natural guarantee pill */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 bg-[#EAE2D2] border border-[#DDD3BF] text-[#2C4824] px-4 py-2 rounded-full text-sm sm:text-base font-bold shadow-xs">
            <span className="w-2.5 h-2.5 rounded-full bg-[#2D5A27] animate-pulse"></span>
            <span>100% 국내산 자연 원료 50종 배합</span>
          </div>
        </div>

        {/* Primary Headline: "하루한잔, 간편한 한끼" */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-[#1E3B19] tracking-tight leading-[1.25]">
            <span className="block text-[#3E7B35] text-2xl sm:text-3xl md:text-4xl font-extrabold mb-1">
              자연이 주는 맑고 정직한 식사
            </span>
            하루한잔, 간편한 한끼
          </h1>

          <p className="text-lg sm:text-2xl text-[#4A5543] font-medium max-w-2xl mx-auto leading-relaxed pt-2">
            매일 챙기기 힘든 <strong className="text-[#2D5A27] font-bold">국내산 50가지 곡물과 채소</strong>를<br className="hidden sm:inline" />
            한 포에 담았습니다. 물이나 우유에 타서 10초 만에 든든하게!
          </p>
        </div>

        {/* Hero Visual Card / Product Impression */}
        <div className="mt-8 sm:mt-10 bg-white/80 backdrop-blur-xs border-2 border-[#D8CEBA] rounded-3xl p-6 sm:p-8 shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* Visual Graphic Representation */}
            <div className="md:col-span-6 flex flex-col items-center justify-center p-6 bg-gradient-to-br from-[#F5F1E6] to-[#EAE2CE] rounded-2xl border border-[#DFD5C2]">
              <div className="relative w-full max-w-[280px] aspect-square flex flex-col items-center justify-center">
                {/* Shake Bottle Illustration */}
                <div className="relative flex flex-col items-center">
                  {/* Bottle Cap */}
                  <div className="w-20 h-6 bg-[#2D5A27] rounded-t-lg shadow-xs flex items-center justify-center">
                    <div className="w-10 h-1.5 bg-[#4F8044] rounded-full"></div>
                  </div>
                  {/* Bottle Neck */}
                  <div className="w-16 h-3 bg-[#E0D7C2] border-x border-[#CCC2AA]"></div>
                  {/* Bottle Body */}
                  <div className="w-36 h-48 bg-gradient-to-b from-[#F9F7F1] to-[#EFE2CE] rounded-b-3xl border-2 border-[#C9BEA4] shadow-inner relative overflow-hidden flex flex-col items-center justify-end p-3">
                    {/* Liquid Shake Level */}
                    <div className="absolute inset-x-0 bottom-0 top-12 bg-gradient-to-t from-[#D6B588] via-[#E2C7A0] to-[#EBD7B8] opacity-90 rounded-b-2xl flex flex-col items-center justify-center">
                      <div className="text-center px-2">
                        <span className="text-xs font-bold text-[#4B3B24] tracking-widest block">국내산 50선</span>
                        <span className="text-sm font-extrabold text-[#2F2414] block">자연 곡물 생식</span>
                        <span className="text-[11px] text-[#635136] block mt-0.5">30g (1회분)</span>
                      </div>
                      {/* Grains wave accent */}
                      <div className="absolute -top-3 inset-x-0 flex justify-center space-x-1 opacity-70">
                        <span className="text-xs">🌾</span>
                        <span className="text-xs">🫘</span>
                        <span className="text-xs">🥬</span>
                      </div>
                    </div>
                    {/* Measurement lines */}
                    <div className="absolute right-2 top-14 space-y-3 opacity-40">
                      <div className="w-3 h-0.5 bg-[#5D4E38]"></div>
                      <div className="w-2 h-0.5 bg-[#5D4E38]"></div>
                      <div className="w-3 h-0.5 bg-[#5D4E38]"></div>
                      <div className="w-2 h-0.5 bg-[#5D4E38]"></div>
                    </div>
                  </div>
                </div>

                {/* Floating Grains Badges */}
                <div className="absolute -top-2 left-0 bg-[#2D5A27] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md flex items-center gap-1">
                  <span>🌾</span> 100% 국내산
                </div>
                <div className="absolute bottom-2 right-0 bg-[#D4A373] text-[#2C1F0E] text-xs font-bold px-3 py-1.5 rounded-full shadow-md flex items-center gap-1">
                  <span>🥬</span> 50가지 곡채류
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[#666B5C] font-medium mt-3 text-center">
                * 전용 쉐이커 보틀 무료 증정 이벤트 진행 중
              </p>
            </div>

            {/* Highlights & Value */}
            <div className="md:col-span-6 space-y-4">
              <div className="space-y-2">
                <span className="inline-block text-xs font-bold tracking-wider text-[#3E7B35] bg-[#EBF3E8] px-2.5 py-1 rounded-md">
                  정직한 자연의 약속
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1E331A] leading-snug">
                  바쁜 하루, 끼니 거르지 말고<br />
                  자연 원물 그대로 든든하게
                </h2>
              </div>

              {/* 3 Key Honest Points */}
              <ul className="space-y-2.5 text-base sm:text-lg text-[#323D2E]">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-[#2D5A27] shrink-0 mt-0.5" />
                  <span>
                    <strong>국내산 50가지 원물</strong> (통곡물 15종 + 채소 20종 + 버섯·해조 15종)
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-[#2D5A27] shrink-0 mt-0.5" />
                  <span>
                    <strong>영양 손실 최소화 동결건조</strong>로 자연의 맛과 결 보존
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-[#2D5A27] shrink-0 mt-0.5" />
                  <span>
                    <strong>합성보존료·착색료·합성향료 무첨가</strong> 순수 원재료
                  </span>
                </li>
              </ul>

              {/* User status banner */}
              {currentUser ? (
                <div className="p-3 bg-[#EAF2E7] border border-[#BFDCB9] rounded-2xl flex items-center gap-2.5 text-sm text-[#1E3B19] font-black">
                  <span className="text-lg">✨</span>
                  <span><strong>{currentUser.name} 님 환영합니다!</strong> 주문 시 회원 정보로 즉시 접수됩니다.</span>
                </div>
              ) : (
                <div className="p-3 bg-[#FFF4DF] border border-[#EED0A6] rounded-2xl flex items-center gap-2 text-xs sm:text-sm text-[#7D5319] font-bold">
                  <span>💡</span>
                  <span>주문하시려면 먼저 <strong>회원가입</strong>과 <strong>로그인</strong>을 해주세요.</span>
                </div>
              )}

              {/* Price Callout */}
              <div className="pt-2 pb-1 border-t border-[#E8E0D0] flex items-baseline justify-between">
                <div>
                  <span className="text-sm text-[#7D786D] line-through mr-2">48,000원</span>
                  <span className="text-2xl sm:text-3xl font-black text-[#2D5A27]">38,500원</span>
                  <span className="text-xs text-[#556B4E] font-medium ml-1.5">(30포 / 1개월분)</span>
                </div>
                <span className="text-xs sm:text-sm font-bold bg-[#EAE2CE] text-[#4A3C23] px-2.5 py-1 rounded-lg">
                  1포당 약 1,280원
                </span>
              </div>

              {/* BIG Order Button as requested */}
              <div className="pt-2 space-y-2.5">
                <button
                  onClick={onOrderClick}
                  className="w-full flex items-center justify-center gap-3 bg-[#2D5A27] hover:bg-[#22471D] active:scale-[0.99] text-white py-4 sm:py-5 px-6 rounded-2xl font-black text-xl sm:text-2xl shadow-lg hover:shadow-xl transition-all cursor-pointer group"
                >
                  <Sparkles className="w-6 h-6 text-[#E9C46A] group-hover:rotate-12 transition-transform" />
                  <span>{currentUser ? '지금 바로 주문하기' : '주문하기 (로그인/가입)'}</span>
                  <ChevronRight className="w-6 h-6 text-white/80 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={onExploreIngredients}
                  className="w-full flex items-center justify-center gap-1.5 text-[#425539] hover:text-[#21351A] text-sm sm:text-base font-bold py-2 transition"
                >
                  <span>국내산 50가지 원재료 전체 보기</span>
                  <ArrowDown className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Badges Bar */}
        <div className="mt-8 grid grid-cols-3 gap-2 sm:gap-4 text-center">
          <div className="bg-[#FAF7F0] border border-[#DDD4C1] p-3 sm:p-4 rounded-2xl flex flex-col items-center">
            <span className="text-xl sm:text-2xl mb-1">🌱</span>
            <span className="font-extrabold text-[#1E3B19] text-sm sm:text-base">100% 국내산</span>
            <span className="text-[11px] sm:text-xs text-[#6B7261]">원산지 전원 국내산</span>
          </div>
          <div className="bg-[#FAF7F0] border border-[#DDD4C1] p-3 sm:p-4 rounded-2xl flex flex-col items-center">
            <span className="text-xl sm:text-2xl mb-1">🏭</span>
            <span className="font-extrabold text-[#1E3B19] text-sm sm:text-base">HACCP 안전 인증</span>
            <span className="text-[11px] sm:text-xs text-[#6B7261]">철저한 위생 관리</span>
          </div>
          <div className="bg-[#FAF7F0] border border-[#DDD4C1] p-3 sm:p-4 rounded-2xl flex flex-col items-center">
            <span className="text-xl sm:text-2xl mb-1">🥛</span>
            <span className="font-extrabold text-[#1E3B19] text-sm sm:text-base">10초 간편 식사</span>
            <span className="text-[11px] sm:text-xs text-[#6B7261]">물·우유에 쏙</span>
          </div>
        </div>
      </div>
    </section>
  );
};
