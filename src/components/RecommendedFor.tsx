import React from 'react';
import { Sun, UtensilsCrossed, Salad, Heart, Clock, Sparkles } from 'lucide-react';

export const RecommendedFor: React.FC = () => {
  const recommendations = [
    {
      number: '01',
      title: '아침 식사를 자주 거르는 분',
      subtitle: '출근 준비나 등교로 바빠 아침을 굶는 분',
      description:
        '바쁜 아침 1분 1초가 아쉬울 때, 쉐이커에 물이나 우유 붓고 10초만 흔들어 바로 마실 수 있어 거르기 쉬운 아침 식사로 안성맞춤입니다.',
      icon: Sun,
      tag: '출근길 10초 완성',
      bgTag: 'bg-[#FDF3E3] text-[#8C5D19]',
      cardBorder: 'border-[#E4D9C5]',
    },
    {
      number: '02',
      title: '끼니 챙겨 먹기 번거로운 분',
      subtitle: '매번 장보고 요리하고 치우기 힘든 1인 가구·부모님',
      description:
        '50가지 채소와 곡물을 일일이 사서 다듬을 필요 없이, 한 포로 간편하게 자연의 정갈한 맛을 그대로 식탁 위에서 만날 수 있습니다.',
      icon: UtensilsCrossed,
      tag: '준비·설거지 걱정 끝',
      bgTag: 'bg-[#EBF3E8] text-[#2C6322]',
      cardBorder: 'border-[#CDE0C7]',
    },
    {
      number: '03',
      title: '자연 곡물·채소 섭취가 부족한 분',
      subtitle: '기름지고 자극적인 인스턴트 외식이 잦은 현대인',
      description:
        '평소 섭취하기 어려운 통곡물과 다양한 채소·버섯·해조류를 골고루 담백하고 고소하게 마시며 속 편한 하루를 시작할 수 있습니다.',
      icon: Salad,
      tag: '속 편한 자연의 맛',
      bgTag: 'bg-[#F3EFE4] text-[#554E38]',
      cardBorder: 'border-[#E2D8C3]',
    },
  ];

  return (
    <section className="py-14 sm:py-20 bg-[#F4EFE3] border-b border-[#E3DAC8]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 bg-[#E7DEC9] text-[#2F4A23] px-4 py-1.5 rounded-full text-sm sm:text-base font-bold">
            <Heart className="w-4 h-4 text-[#2D5A27]" />
            <span>이런 일상에 추천합니다</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#1E3B19] tracking-tight">
            이런 분께 <span className="text-[#2D5A27] underline decoration-[#E9C46A] underline-offset-8">좋아요</span>
          </h2>

          <p className="text-lg sm:text-xl text-[#525E4B] max-w-2xl mx-auto font-medium">
            거창한 조리 없이도 정직한 곡물과 채소를 매일 간편하게 즐기세요.
          </p>
        </div>

        {/* 3 Large Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recommendations.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className={`bg-white border-2 ${item.cardBorder} rounded-3xl p-6 sm:p-7 shadow-sm hover:shadow-md transition-all flex flex-col justify-between`}
              >
                <div>
                  {/* Top Bar with Number & Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl font-black text-[#2D5A27]/25 tracking-wider font-mono">
                      {item.number}
                    </span>
                    <span className={`text-xs sm:text-sm font-bold px-3 py-1 rounded-full ${item.bgTag}`}>
                      {item.tag}
                    </span>
                  </div>

                  {/* Icon Circle */}
                  <div className="w-14 h-14 rounded-2xl bg-[#F6F2E8] border border-[#E5DC CA] flex items-center justify-center text-[#2D5A27] mb-5">
                    <Icon className="w-7 h-7" />
                  </div>

                  {/* Title & Subtitle - Large text */}
                  <h3 className="text-xl sm:text-2xl font-black text-[#1A2E16] mb-2 leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-sm font-bold text-[#67775F] mb-3">
                    {item.subtitle}
                  </p>

                  <p className="text-base sm:text-lg text-[#475240] leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#F0EAE0] flex items-center gap-2 text-xs text-[#7B8574] font-medium">
                  <Clock className="w-3.5 h-3.5 text-[#2D5A27]" />
                  <span>준비부터 정리까지 딱 1분이면 충분해요</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Banner quote */}
        <div className="mt-10 bg-[#FAF7F0] border-2 border-[#DCD3BF] rounded-2xl p-5 text-center">
          <p className="text-base sm:text-lg font-bold text-[#273D21]">
            "끼니를 챙기기 어렵거나 번거로울 때, 우리 가족 모두가 믿고 마실 수 있는 순수 식물성 한 끼"
          </p>
        </div>
      </div>
    </section>
  );
};
