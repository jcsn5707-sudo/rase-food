import React, { useState } from 'react';
import { INGREDIENTS_DATA } from '../data/ingredients';
import { ShieldCheck, Sparkles, Check, Info } from 'lucide-react';

export const FiftyIngredients: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const totalCount = INGREDIENTS_DATA.reduce((acc, cat) => acc + cat.items.length, 0);

  // Filtered ingredients across all or current category if searching
  const currentCategory = INGREDIENTS_DATA[activeTab];

  return (
    <section id="ingredients" className="py-14 sm:py-20 bg-[#FAF7F0] border-b border-[#E8E1D3]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Section Heading */}
        <div className="text-center space-y-3 mb-10">
          <div className="inline-flex items-center gap-1.5 bg-[#EAE2CE] text-[#2C4824] px-4 py-1.5 rounded-full text-sm sm:text-base font-bold">
            <Sparkles className="w-4 h-4 text-[#3E7B35]" />
            <span>원산지 100% 대한민국</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#1E3B19] tracking-tight">
            국내산 <span className="text-[#3E7B35]">50가지</span> 곡물과 채소
          </h2>

          <p className="text-lg sm:text-xl text-[#525E4B] max-w-2xl mx-auto font-medium leading-relaxed">
            땅의 정직함을 그대로 전하기 위해, 단 하나의 수입 원료 없이<br className="hidden sm:inline" />
            우리 땅에서 자란 <strong>50가지 순수 원재료</strong>만을 엄선하여 담았습니다.
          </p>
        </div>

        {/* 3 Core Production Commitments (Honest Food, No Exaggeration) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          <div className="bg-[#FFFFFF] border-2 border-[#E3DC CE] border-[#E5DECf] p-5 rounded-2xl shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-[#EAF2E7] flex items-center justify-center text-2xl mb-3">
              🇰🇷
            </div>
            <h3 className="text-xl font-bold text-[#1E3B19] mb-1">100% 국내산 원물</h3>
            <p className="text-base text-[#5C6654] leading-relaxed">
              통곡물부터 잎채소, 뿌리채소, 해조류까지 모든 원재료의 출처를 투명하게 공개합니다.
            </p>
          </div>

          <div className="bg-[#FFFFFF] border-2 border-[#E5DECf] p-5 rounded-2xl shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-[#F4EDE0] flex items-center justify-center text-2xl mb-3">
              ❄️
            </div>
            <h3 className="text-xl font-bold text-[#1E3B19] mb-1">영양 보존 동결건조</h3>
            <p className="text-base text-[#5C6654] leading-relaxed">
              고열 가공을 피하고 영하에서 급속 동결 건조하여 원물 본연의 담백한 맛과 영양을 지킵니다.
            </p>
          </div>

          <div className="bg-[#FFFFFF] border-2 border-[#E5DECf] p-5 rounded-2xl shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-[#EAF2E7] flex items-center justify-center text-2xl mb-3">
              🚫
            </div>
            <h3 className="text-xl font-bold text-[#1E3B19] mb-1">4無 정직한 원칙</h3>
            <p className="text-base text-[#5C6654] leading-relaxed">
              합성보존료, 합성착색료, 합성향료, 설탕을 첨가하지 않고 순수 곡채류로만 배합했습니다.
            </p>
          </div>
        </div>

        {/* 50 Ingredients Interactive Browser */}
        <div className="bg-white border-2 border-[#DFD6C4] rounded-3xl p-5 sm:p-8 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#EFE8DA]">
            <div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1E3B19] flex items-center gap-2">
                <span>50가지 전성분 투명 공개</span>
                <span className="text-sm font-bold bg-[#3E7B35] text-white px-2.5 py-0.5 rounded-full">
                  총 {totalCount}종
                </span>
              </h3>
              <p className="text-sm sm:text-base text-[#6E7564] mt-1">
                아래 탭을 눌러 카테고리별 원재료를 직접 확인해보세요.
              </p>
            </div>

            {/* Quick All-Domestic Stamp */}
            <div className="inline-flex items-center gap-2 bg-[#F3EFE4] text-[#415139] px-4 py-2 rounded-xl text-sm font-bold shrink-0 self-start sm:self-auto">
              <ShieldCheck className="w-4 h-4 text-[#2D5A27]" />
              <span>전 품목 국내산 농산물 검수 완료</span>
            </div>
          </div>

          {/* Category Tabs (Large touch targets for mobile) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-6">
            {INGREDIENTS_DATA.map((cat, idx) => (
              <button
                key={cat.title}
                onClick={() => setActiveTab(idx)}
                className={`flex flex-col items-center justify-center p-3 sm:p-4 rounded-2xl transition cursor-pointer text-center ${
                  activeTab === idx
                    ? 'bg-[#2D5A27] text-white shadow-md font-bold'
                    : 'bg-[#F6F2E8] hover:bg-[#ECE6D8] text-[#3B4734] font-medium'
                }`}
              >
                <span className="text-base sm:text-lg">{cat.title}</span>
                <span
                  className={`text-xs mt-0.5 px-2 py-0.5 rounded-full ${
                    activeTab === idx ? 'bg-white/20 text-white' : 'text-[#68735F]'
                  }`}
                >
                  {cat.count}종
                </span>
              </button>
            ))}
          </div>

          {/* Category Description */}
          <div className="mt-4 p-3 bg-[#FAF8F2] rounded-xl border border-[#ECE5D4] text-center text-sm sm:text-base text-[#56604E] font-medium">
            {currentCategory.description} ({currentCategory.items.length}종 전 품목 국내산)
          </div>

          {/* Ingredients Grid - Big readable pills */}
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5 sm:gap-3">
            {currentCategory.items.map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-2.5 p-3 rounded-xl bg-[#F8F5EE] border border-[#E7DFCE] hover:border-[#3E7B35]/40 transition group"
              >
                <span className="text-2xl shrink-0 group-hover:scale-110 transition-transform">
                  {item.icon}
                </span>
                <div className="min-w-0">
                  <div className="font-extrabold text-[#23351E] text-base sm:text-lg truncate">
                    {item.name}
                  </div>
                  <div className="text-xs text-[#3E7B35] font-semibold">{item.origin}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Regulatory & Honesty Footnote */}
          <div className="mt-6 pt-4 border-t border-[#EFE8DA] flex items-start gap-2 text-xs sm:text-sm text-[#737C6C]">
            <Info className="w-4 h-4 text-[#8C9484] shrink-0 mt-0.5" />
            <p>
              * 본 제품은 질병의 예방 및 치료를 위한 의약품이 아닌, 국내산 자연 원물을 담아낸 <strong>일반식품(생식가공품)</strong>입니다. 안심하고 식사 대용으로 섭취하세요.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
