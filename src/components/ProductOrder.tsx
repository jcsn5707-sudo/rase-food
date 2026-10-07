import React, { useState } from 'react';
import { Sparkles, Check, Truck, Gift, ShieldCheck, Plus, Minus, Phone, ChevronRight } from 'lucide-react';
import { AuthUser } from './AuthModal';

interface ProductOrderProps {
  onOpenOrderModal: (selectedOption: OrderOption, quantity: number) => void;
  currentUser?: AuthUser | null;
}

export interface OrderOption {
  id: string;
  name: string;
  days: string;
  price: number;
  originalPrice: number;
  perPacketPrice: number;
  badge?: string;
  gifts: string[];
}

export const ORDER_OPTIONS: OrderOption[] = [
  {
    id: 'box-1',
    name: '1박스 (30포 / 1개월분)',
    days: '30일 든든 체험',
    price: 38500,
    originalPrice: 48000,
    perPacketPrice: 1283,
    gifts: ['전용 친환경 쉐이커 보틀 1개 무료 증정'],
  },
  {
    id: 'box-2',
    name: '2박스 (60포 / 2개월분)',
    days: '부부·가족 인기 세트',
    price: 72000,
    originalPrice: 96000,
    perPacketPrice: 1200,
    badge: '가장 많이 찾는 구성',
    gifts: ['전용 보틀 2개 증정', '무료 배송 혜택'],
  },
  {
    id: 'box-3',
    name: '3박스 (90포 / 3개월분)',
    days: '3개월 정기 식사 세트',
    price: 99000,
    originalPrice: 144000,
    perPacketPrice: 1100,
    badge: '최대 할인 혜택',
    gifts: ['전용 보틀 2개 증정', '생식 10포 추가 증정', '무료 배송 혜택'],
  },
];

export const ProductOrder: React.FC<ProductOrderProps> = ({ onOpenOrderModal, currentUser }) => {
  const [selectedOptionId, setSelectedOptionId] = useState<string>('box-1');
  const [quantity, setQuantity] = useState<number>(1);

  const selectedOption = ORDER_OPTIONS.find((opt) => opt.id === selectedOptionId) || ORDER_OPTIONS[0];
  const totalPrice = selectedOption.price * quantity;
  const totalSavings = (selectedOption.originalPrice - selectedOption.price) * quantity;

  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleIncrease = () => {
    if (quantity < 10) setQuantity(quantity + 1);
  };

  return (
    <section id="order-section" className="py-14 sm:py-20 bg-[#F5EFEB] border-b border-[#E3DAC7] scroll-mt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Section Title */}
        <div className="text-center space-y-3 mb-10">
          <div className="inline-flex items-center gap-1.5 bg-[#E8DFCC] text-[#2D5A27] px-4 py-1.5 rounded-full text-sm sm:text-base font-bold">
            <Gift className="w-4 h-4 text-[#3E7B35]" />
            <span>정직한 가격 & 무료 보틀 증정</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#1E3B19] tracking-tight">
            하루한잔 생식 주문하기
          </h2>

          <p className="text-lg sm:text-xl text-[#525E4B] max-w-xl mx-auto font-medium">
            국내산 50가지 원물로 정성스레 만든 자연 생식입니다.
          </p>
        </div>

        {/* Product Box Main Container */}
        <div className="bg-white border-3 border-[#D9CDB7] rounded-3xl p-6 sm:p-10 shadow-lg">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Product Visual & Spec summary */}
            <div className="lg:col-span-5 space-y-5">
              {/* Product Visual Box */}
              <div className="bg-gradient-to-br from-[#FAF7F0] to-[#EFE7D5] border-2 border-[#DFD6C3] rounded-2xl p-6 flex flex-col items-center justify-center text-center relative overflow-hidden">
                <div className="absolute top-3 left-3 bg-[#2D5A27] text-white text-xs font-bold px-2.5 py-1 rounded-md">
                  국내산 100%
                </div>
                <div className="absolute top-3 right-3 bg-[#E9C46A] text-[#332508] text-xs font-bold px-2.5 py-1 rounded-md">
                  동결건조
                </div>

                {/* Packet Graphic & Shaker Bundle */}
                <div className="my-4 relative flex items-center justify-center gap-2">
                  {/* Big Box Packaging representation */}
                  <div className="w-36 h-48 bg-[#2D5A27] rounded-2xl shadow-md p-3 flex flex-col justify-between text-white border-2 border-[#1E431B]">
                    <div className="flex justify-between items-start">
                      <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded font-mono">30포입</span>
                      <span className="text-xs">🌾</span>
                    </div>
                    <div className="text-center my-auto">
                      <div className="text-xs tracking-widest text-[#E9C46A] font-bold">자연식품</div>
                      <div className="text-lg font-black leading-tight mt-0.5">하루한잔<br />生食 50</div>
                      <div className="text-[10px] text-white/80 mt-1">국내산 곡물·채소</div>
                    </div>
                    <div className="text-[9px] text-center text-white/70">
                      30g × 30포 (900g)
                    </div>
                  </div>

                  {/* Free Shaker Bottle Gift Representation */}
                  <div className="w-20 h-36 bg-[#FFFFFF] border-2 border-[#2D5A27] rounded-xl shadow-xs p-1.5 flex flex-col items-center justify-between text-[#2D5A27]">
                    <div className="w-12 h-3.5 bg-[#2D5A27] rounded-t-sm flex items-center justify-center">
                      <div className="w-6 h-1 bg-white/60 rounded-full"></div>
                    </div>
                    <div className="text-center">
                      <span className="text-xs font-black block">무료증정</span>
                      <span className="text-[9px] text-[#55694A] block">전용보틀</span>
                      <span className="text-[10px] block font-mono">350ml</span>
                    </div>
                    <div className="w-full bg-[#EAF2E7] py-0.5 text-center text-[8px] font-bold rounded">
                      BPA FREE
                    </div>
                  </div>
                </div>

                <div className="space-y-1">
                  <h3 className="text-xl sm:text-2xl font-black text-[#1E3B19]">
                    [하루한잔] 국내산 50선 생식
                  </h3>
                  <p className="text-sm text-[#636F5A] font-medium">
                    1박스 기준 30g × 30포 (총 900g, 1개월분)
                  </p>
                </div>
              </div>

              {/* Quality & Safety Checkpoints */}
              <div className="bg-[#FAF8F3] border border-[#E7DFCD] rounded-2xl p-4 space-y-2 text-sm text-[#48533F]">
                <div className="flex items-center gap-2 font-bold text-[#23351E]">
                  <Check className="w-4 h-4 text-[#2D5A27]" />
                  <span>식품 유형: 기타가공품 (생식 함유 제품)</span>
                </div>
                <div className="flex items-center gap-2 font-bold text-[#23351E]">
                  <Check className="w-4 h-4 text-[#2D5A27]" />
                  <span>원재료: 국내산 곡채류 50종 100%</span>
                </div>
                <div className="flex items-center gap-2 font-bold text-[#23351E]">
                  <Check className="w-4 h-4 text-[#2D5A27]" />
                  <span>이지컷(Easy-Cut) 개별 스틱 위생 포장</span>
                </div>
                <div className="flex items-center gap-2 font-bold text-[#23351E]">
                  <Truck className="w-4 h-4 text-[#2D5A27]" />
                  <span>오후 2시 이전 주문 시 당일 우체국/CJ 배송</span>
                </div>
              </div>
            </div>

            {/* Options Selection & Pricing */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <label className="block text-base sm:text-lg font-extrabold text-[#1E3B19] mb-3">
                  1. 구성 옵션을 선택해주세요
                </label>
                <div className="space-y-3">
                  {ORDER_OPTIONS.map((option) => {
                    const isSelected = selectedOptionId === option.id;
                    return (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() => setSelectedOptionId(option.id)}
                        className={`w-full text-left p-4 sm:p-5 rounded-2xl border-2 transition cursor-pointer relative ${
                          isSelected
                            ? 'border-[#2D5A27] bg-[#F2F7F0] shadow-sm'
                            : 'border-[#E0D7C4] bg-[#FAF8F3] hover:border-[#CCD5C5]'
                        }`}
                      >
                        {option.badge && (
                          <span className="absolute -top-3 right-4 bg-[#2D5A27] text-white text-xs font-extrabold px-3 py-1 rounded-full shadow-xs">
                            {option.badge}
                          </span>
                        )}

                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div>
                            <div className="flex items-center gap-2">
                              <span
                                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                                  isSelected ? 'border-[#2D5A27] bg-[#2D5A27]' : 'border-[#9CA392] bg-white'
                                }`}
                              >
                                {isSelected && <span className="w-2 h-2 rounded-full bg-white"></span>}
                              </span>
                              <span className="text-lg sm:text-xl font-black text-[#1E3B19]">
                                {option.name}
                              </span>
                            </div>
                            <div className="text-xs sm:text-sm text-[#616F58] ml-7 mt-0.5">
                              {option.days} • 1포당 약 {option.perPacketPrice.toLocaleString()}원
                            </div>
                          </div>

                          <div className="text-left sm:text-right ml-7 sm:ml-0">
                            <span className="text-xs text-[#8A8F82] line-through block">
                              {option.originalPrice.toLocaleString()}원
                            </span>
                            <span className="text-xl sm:text-2xl font-black text-[#2D5A27]">
                              {option.price.toLocaleString()}원
                            </span>
                          </div>
                        </div>

                        {/* Gift inclusion */}
                        <div className="mt-3 pt-2.5 border-t border-[#DFD8C7] flex flex-wrap gap-2 text-xs text-[#3E7B35] font-bold">
                          {option.gifts.map((gift, gIdx) => (
                            <span key={gIdx} className="inline-flex items-center gap-1 bg-white/80 px-2 py-0.5 rounded-md border border-[#D5E2D0]">
                              🎁 {gift}
                            </span>
                          ))}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Quantity Selector */}
              <div>
                <label className="block text-base sm:text-lg font-extrabold text-[#1E3B19] mb-2">
                  2. 수량을 선택해주세요
                </label>
                <div className="flex items-center justify-between bg-[#FAF8F3] border-2 border-[#E0D7C4] rounded-2xl p-3 sm:p-4">
                  <span className="text-base sm:text-lg font-bold text-[#323D2D]">
                    {selectedOption.name}
                  </span>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={handleDecrease}
                      disabled={quantity <= 1}
                      className="w-10 h-10 rounded-xl bg-white border border-[#D1C7B2] flex items-center justify-center font-bold text-lg disabled:opacity-40 hover:bg-[#F2ECE0] active:scale-95 transition cursor-pointer"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="text-2xl font-black text-[#1E3B19] min-w-[2rem] text-center">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={handleIncrease}
                      disabled={quantity >= 10}
                      className="w-10 h-10 rounded-xl bg-white border border-[#D1C7B2] flex items-center justify-center font-bold text-lg disabled:opacity-40 hover:bg-[#F2ECE0] active:scale-95 transition cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Price Calculation Box */}
              <div className="bg-[#FAF7F0] border-2 border-[#DDD2BE] rounded-2xl p-5 space-y-2">
                <div className="flex justify-between items-center text-sm sm:text-base text-[#616D59]">
                  <span>상품 금액 ({quantity}개)</span>
                  <span>{(selectedOption.originalPrice * quantity).toLocaleString()}원</span>
                </div>
                <div className="flex justify-between items-center text-sm sm:text-base text-[#2D5A27] font-bold">
                  <span>할인 혜택</span>
                  <span>-{totalSavings.toLocaleString()}원</span>
                </div>
                <div className="flex justify-between items-center text-sm sm:text-base text-[#616D59]">
                  <span>배송비</span>
                  <span>{selectedOption.id === 'box-1' ? '3,000원 (2박스 이상 무료)' : '무료배송'}</span>
                </div>
                <div className="pt-3 border-t border-[#E3DAC7] flex justify-between items-baseline">
                  <div>
                    <span className="text-base sm:text-lg font-bold text-[#1E3B19]">최종 결제 금액</span>
                  </div>
                  <div className="text-right">
                    <span className="text-3xl sm:text-4xl font-black text-[#2D5A27]">
                      {(totalPrice + (selectedOption.id === 'box-1' ? 3000 : 0)).toLocaleString()}원
                    </span>
                  </div>
                </div>
              </div>

              {/* Auth Guidance if not logged in */}
              {!currentUser ? (
                <div className="p-3.5 bg-[#FFF4DF] border border-[#EED0A6] rounded-2xl flex items-center gap-2 text-xs sm:text-sm text-[#7D5319] font-bold">
                  <span>💡</span>
                  <span>주문하시려면 먼저 <strong>회원가입</strong>하고 <strong>로그인</strong>을 해주세요.</span>
                </div>
              ) : (
                <div className="p-3 bg-[#EAF2E7] border border-[#BFDCB9] rounded-2xl flex items-center justify-between text-xs sm:text-sm text-[#1E3B19] font-extrabold">
                  <span>✨ <strong>{currentUser.name}</strong> 님 회원 주문</span>
                  <span className="text-[11px] font-normal text-[#586F55]">{currentUser.email}</span>
                </div>
              )}

              {/* BIG Order Button as requested */}
              <button
                type="button"
                onClick={() => onOpenOrderModal(selectedOption, quantity)}
                className="w-full flex items-center justify-center gap-3 bg-[#2D5A27] hover:bg-[#20441B] active:scale-[0.99] text-white py-5 sm:py-6 px-6 rounded-2xl font-black text-2xl sm:text-3xl shadow-xl hover:shadow-2xl transition cursor-pointer group"
              >
                <Sparkles className="w-7 h-7 text-[#E9C46A] group-hover:rotate-12 transition-transform" />
                <span>{currentUser ? '주문서 작성하기' : '회원가입/로그인 후 주문하기'}</span>
                <ChevronRight className="w-7 h-7 text-white/80 group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Phone Ordering Info for Elderly / Direct callers */}
              <div className="p-4 bg-[#F5EDE0] border border-[#E3D4BD] rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-full bg-[#E5D7BF] flex items-center justify-center text-[#4B3B24] shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-[#6B5A40] font-bold">화면 주문이 어려우신가요?</div>
                    <div className="text-lg font-black text-[#2F2312]">
                      전화 간편 주문: 1544-0950
                    </div>
                  </div>
                </div>
                <a
                  href="tel:1544-0950"
                  className="bg-[#2D5A27] text-white text-sm font-bold px-4 py-2 rounded-xl hover:bg-[#1E3F1A] transition shrink-0"
                >
                  지금 통화하기
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
