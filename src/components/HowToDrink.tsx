import React, { useState } from 'react';
import { Droplet, Milk, Sparkles, Check, AlertCircle } from 'lucide-react';

export const HowToDrink: React.FC = () => {
  const [selectedMix, setSelectedMix] = useState<'water' | 'milk'>('water');

  const steps = [
    {
      step: '1',
      title: '물 또는 우유 200ml 붓기',
      tip: '중요: 액체를 먼저 넣어야 가루가 바닥에 뭉치지 않고 잘 풀립니다.',
      icon: '💧',
      illustration: (
        <div className="w-16 h-20 border-2 border-[#2D5A27] rounded-xl flex flex-col justify-end p-1 relative overflow-hidden bg-white/70">
          <div className="w-full h-1/2 bg-[#B8D8F8]/60 rounded-b-lg border-t border-[#89BAEB]"></div>
          <span className="absolute top-2 left-2 text-[10px] font-bold text-[#2D5A27]">200ml</span>
        </div>
      ),
    },
    {
      step: '2',
      title: '생식 1포(30g) 넣기',
      tip: '이지컷(Easy-Cut) 포장으로 가위 없이 손으로 쉽게 뜯어 넣을 수 있습니다.',
      icon: '🌾',
      illustration: (
        <div className="w-16 h-20 border-2 border-[#2D5A27] rounded-xl flex flex-col justify-end p-1 relative bg-white/70">
          <div className="w-full h-1/2 bg-[#B8D8F8]/60 rounded-b-lg"></div>
          {/* Powder pouring down */}
          <div className="absolute top-1 right-2 w-5 h-8 bg-[#D4A373] rotate-12 rounded-sm shadow-xs flex items-center justify-center text-[8px] text-white font-bold">
            生
          </div>
          <div className="absolute bottom-5 inset-x-3 h-2 bg-[#C29D75] rounded-full opacity-80"></div>
        </div>
      ),
    },
    {
      step: '3',
      title: '뚜껑 닫고 5~10초 흔들기',
      tip: '위아래로 가볍게 몇 번 흔들어주면 뭉침 없이 부드럽게 완성됩니다.',
      icon: '🥛',
      illustration: (
        <div className="w-16 h-20 border-2 border-[#2D5A27] rounded-xl flex flex-col items-center justify-center relative bg-[#EFE2CE]/90">
          <div className="w-8 h-2 bg-[#2D5A27] rounded-t-md absolute top-1"></div>
          <span className="text-xl animate-bounce">✨</span>
          <span className="text-[10px] font-bold text-[#4B3B24] mt-1">완성!</span>
        </div>
      ),
    },
  ];

  return (
    <section className="py-14 sm:py-20 bg-[#FAF7F0] border-b border-[#E8E1D3]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 bg-[#EAE2CE] text-[#2C4824] px-4 py-1.5 rounded-full text-sm sm:text-base font-bold">
            <Sparkles className="w-4 h-4 text-[#3E7B35]" />
            <span>누구나 쉬운 3단계 음용법</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#1E3B19] tracking-tight">
            물이나 우유에 타서 드세요
          </h2>

          <p className="text-lg sm:text-xl text-[#525E4B] max-w-2xl mx-auto font-medium">
            복잡한 준비 없이, <strong>순서대로 1 → 2 → 3</strong>만 기억하시면 됩니다!
          </p>
        </div>

        {/* 1 -> 2 -> 3 Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {steps.map((item, index) => (
            <div
              key={item.step}
              className="bg-white border-2 border-[#DFD6C3] rounded-3xl p-6 sm:p-7 shadow-sm relative flex flex-col justify-between"
            >
              {/* Step indicator circle */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-10 h-10 rounded-full bg-[#2D5A27] text-white font-black text-xl flex items-center justify-center shadow-xs">
                      {item.step}
                    </span>
                    <span className="text-xs font-bold text-[#6D7762] tracking-wider uppercase">
                      단계 0{item.step}
                    </span>
                  </div>
                  {/* Step arrow connector for desktop */}
                  {index < 2 && (
                    <span className="hidden md:inline-block text-[#3E7B35] font-black text-2xl">
                      →
                    </span>
                  )}
                </div>

                {/* Graphic Illustration */}
                <div className="my-4 flex justify-center py-2 bg-[#FBF9F4] rounded-2xl border border-[#EEE8DB]">
                  {item.illustration}
                </div>

                {/* Title */}
                <h3 className="text-xl sm:text-2xl font-black text-[#1E331A] mb-2 leading-snug">
                  {item.title}
                </h3>

                {/* Tip */}
                <p className="text-sm sm:text-base text-[#4D5845] leading-relaxed">
                  {item.tip}
                </p>
              </div>

              {/* Bottom tag */}
              <div className="mt-5 pt-3 border-t border-[#F2ECE0] text-xs font-semibold text-[#3E7B35] flex items-center gap-1.5">
                <Check className="w-4 h-4" />
                <span>10초 소요</span>
              </div>
            </div>
          ))}
        </div>

        {/* Water vs Milk Taste Selector */}
        <div className="mt-12 bg-white border-2 border-[#D8CEBA] rounded-3xl p-6 sm:p-8 shadow-xs">
          <div className="text-center max-w-xl mx-auto mb-6">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1E3B19] mb-2">
              취향에 따라 골라 마시는 즐거움
            </h3>
            <p className="text-base text-[#616D5A]">
              물과 우유/두유 중 취향에 맞는 방식을 선택해보세요.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Water Option */}
            <button
              onClick={() => setSelectedMix('water')}
              className={`p-5 rounded-2xl border-2 transition text-left cursor-pointer ${
                selectedMix === 'water'
                  ? 'border-[#2D5A27] bg-[#F2F7F0] shadow-sm'
                  : 'border-[#E5DECf] bg-[#FAF8F3] hover:border-[#CCD8C8]'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">💧</span>
                  <span className="text-xl font-extrabold text-[#1E3B19]">깔끔한 물 (200ml)</span>
                </div>
                {selectedMix === 'water' && (
                  <span className="bg-[#2D5A27] text-white text-xs font-bold px-2.5 py-1 rounded-full">
                    선택됨
                  </span>
                )}
              </div>
              <p className="text-sm sm:text-base text-[#46543F] leading-relaxed">
                50가지 자연 곡물과 채소 고유의 담백하고 구수한 향을 가장 맑고 깔끔하게 느끼실 수 있습니다.
              </p>
              <div className="mt-3 text-xs font-bold text-[#2D5A27]">
                추천: 아침에 가볍고 개운한 식사를 원하시는 분
              </div>
            </button>

            {/* Milk Option */}
            <button
              onClick={() => setSelectedMix('milk')}
              className={`p-5 rounded-2xl border-2 transition text-left cursor-pointer ${
                selectedMix === 'milk'
                  ? 'border-[#2D5A27] bg-[#F2F7F0] shadow-sm'
                  : 'border-[#E5DECf] bg-[#FAF8F3] hover:border-[#CCD8C8]'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🥛</span>
                  <span className="text-xl font-extrabold text-[#1E3B19]">고소한 우유/두유 (200ml)</span>
                </div>
                {selectedMix === 'milk' && (
                  <span className="bg-[#2D5A27] text-white text-xs font-bold px-2.5 py-1 rounded-full">
                    선택됨
                  </span>
                )}
              </div>
              <p className="text-sm sm:text-base text-[#46543F] leading-relaxed">
                진한 곡물 미숫가루나 오트 라떼처럼 부드럽고 한층 더 풍성한 든든함을 줍니다.
              </p>
              <div className="mt-3 text-xs font-bold text-[#2D5A27]">
                추천: 출근 전 점심까지 오래 든든하기를 원하시는 분
              </div>
            </button>
          </div>

          {/* Temperature Notice (No hot water) */}
          <div className="mt-6 p-4 bg-[#FFF8EB] border border-[#F3DEC0] rounded-2xl flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-[#C47D15] shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm text-[#73511A] leading-relaxed">
              <strong>섭취 시 주의사항:</strong> 자연 원료의 동결건조 영양과 맛을 지키기 위해, 뜨거운 물 대신 <strong>시원한 물이나 미온수</strong>에 타서 드시는 것을 권장합니다.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
