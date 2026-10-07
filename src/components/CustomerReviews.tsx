import React from 'react';
import { Star, MessageSquare } from 'lucide-react';

export const CustomerReviews: React.FC = () => {
  const reviews = [
    {
      author: '김*현 님 (30대 직장인)',
      rating: 5,
      date: '어제 작성',
      tag: '바쁜 출근길 아침 대용',
      content:
        '아침마다 밥 먹을 시간이 없어서 맨날 굶거나 편의점 빵을 먹었는데, 보틀에 찬물 붓고 가루 넣어서 흔드니까 10초면 끝나요. 달지 않고 순수 볶은 곡물처럼 구수해서 매일 아침 속 편하게 든든합니다.',
    },
    {
      author: '이*순 님 (50대 주부)',
      rating: 5,
      date: '3일 전 작성',
      tag: '부모님 식사 간편 챙김',
      content:
        '국내산 50가지가 전 품목 다 들어가 있다고 해서 남편이랑 같이 마시려고 2박스 주문했어요. 가루가 뭉치지 않고 우유에 타 마시면 미숫가루 라떼처럼 아주 고소해요. 요리하기 귀찮은 날 최고입니다.',
    },
    {
      author: '박*우 님 (20대 취업준비생)',
      rating: 5,
      date: '일주일 전 작성',
      tag: '간편함 & 원재료 만족',
      content:
        '평소에 야채나 곡물을 챙겨 먹기가 정말 힘들었는데, 케일·시금치·단호박까지 다 들어있어서 마음이 편해요. 포장도 스틱형이라 가방에 쏙 들어가서 도서관 갈 때 챙겨 다닙니다.',
    },
  ];

  return (
    <section className="py-14 sm:py-20 bg-[#FAF7F0] border-b border-[#E8E1D3]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 bg-[#EAE2CE] text-[#2C4824] px-4 py-1.5 rounded-full text-sm sm:text-base font-bold">
            <MessageSquare className="w-4 h-4 text-[#3E7B35]" />
            <span>생생한 고객 만족 후기</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#1E3B19] tracking-tight">
            매일 마시는 분들의 솔직한 이야기
          </h2>

          <p className="text-lg sm:text-xl text-[#525E4B] max-w-xl mx-auto font-medium">
            자연 원물의 담백함과 간편함에 많은 분들이 만족하고 계십니다.
          </p>
        </div>

        {/* 3 Review Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="bg-white border-2 border-[#DFD6C3] rounded-3xl p-6 shadow-xs flex flex-col justify-between"
            >
              <div>
                {/* Rating & Tag */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex text-[#E9C46A]">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-[#2D5A27] bg-[#EAF2E7] px-2.5 py-1 rounded-full">
                    {rev.tag}
                  </span>
                </div>

                <p className="text-base sm:text-lg text-[#374230] leading-relaxed mb-4">
                  "{rev.content}"
                </p>
              </div>

              <div className="pt-4 border-t border-[#F2EDE1] flex items-center justify-between text-xs sm:text-sm text-[#78826F]">
                <span className="font-bold text-[#2A3B22]">{rev.author}</span>
                <span>{rev.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
