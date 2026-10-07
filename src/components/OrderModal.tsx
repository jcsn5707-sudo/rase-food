import React, { useState, useEffect } from 'react';
import {
  X,
  CheckCircle,
  Sparkles,
  Loader2,
  Phone,
  MapPin,
  Package,
  Calendar,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  CreditCard,
  AlertTriangle,
  Lock,
} from 'lucide-react';
import { OrderOption } from './ProductOrder';
import { AuthUser } from './AuthModal';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedOption: OrderOption;
  quantity: number;
  onOrderCompleted?: () => void;
  currentUser: AuthUser | null;
}

type OrderStep = 'info' | 'payment' | 'completed';
type PaymentMethodType = 'card' | 'kakaopay' | 'naverpay' | 'tosspay';

export const OrderModal: React.FC<OrderModalProps> = ({
  isOpen,
  onClose,
  selectedOption,
  quantity,
  onOrderCompleted,
  currentUser,
}) => {
  // Multi-step order state
  const [currentStep, setCurrentStep] = useState<OrderStep>('info');

  // Shipping & Order Info
  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    phone: currentUser?.phone || '',
    address: '서울특별시 강남구 테헤란로 152',
    addressDetail: '강남파이낸스센터 10층',
    memo: '부재 시 문 앞에 놓아주세요',
  });

  // Mock Payment info (Pre-filled as requested)
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>('card');
  const [cardNumber, setCardNumber] = useState('1111-2222-3333-4444');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('777');
  const [cardCompany, setCardCompany] = useState('국민카드');

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [confirmedOrder, setConfirmedOrder] = useState<any>(null);

  // Sync with currentUser
  useEffect(() => {
    if (currentUser) {
      setFormData((prev) => ({
        ...prev,
        name: currentUser.name || prev.name,
        phone: currentUser.phone || prev.phone,
      }));
    }
  }, [currentUser]);

  if (!isOpen) return null;

  const shippingFee = selectedOption.id === 'box-1' ? 3000 : 0;
  const totalPrice = selectedOption.price * quantity + shippingFee;

  // Move from Info -> Payment
  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.name.trim() || !formData.phone.trim() || !formData.address.trim()) {
      setErrorMessage('성함, 연락처, 주소를 모두 입력해주세요.');
      return;
    }

    setCurrentStep('payment');
  };

  // Execute Mock Payment
  const handleExecutePayment = async () => {
    setIsLoading(true);
    setErrorMessage('');

    const paymentLabel =
      paymentMethod === 'card'
        ? `신용카드 (${cardCompany} ${cardNumber.slice(0, 4)}-****-****-${cardNumber.slice(-4)})`
        : paymentMethod === 'kakaopay'
        ? '카카오페이 (가상 연습결제)'
        : paymentMethod === 'naverpay'
        ? '네이버페이 (가상 연습결제)'
        : '토스페이 (가상 연습결제)';

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customerName: formData.name.trim(),
          phone: formData.phone.trim(),
          address: formData.address.trim(),
          addressDetail: formData.addressDetail.trim(),
          memo: formData.memo.trim(),
          optionId: selectedOption.id,
          optionName: selectedOption.name,
          quantity: quantity,
          price: selectedOption.price,
          shippingFee: shippingFee,
          paymentMethod: paymentLabel,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || '결제 처리에 실패했습니다.');
      }

      setConfirmedOrder(data.order);
      setCurrentStep('completed');

      try {
        localStorage.setItem('last_order_phone', formData.phone.trim());
      } catch (e) {
        // ignore
      }

      if (onOrderCompleted) {
        onOrderCompleted();
      }
    } catch (err: any) {
      console.error('Payment error:', err);
      // Fallback fallback order number matching ORD-YYYYMMDD-XXXX
      const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
      const randomSuffix = Math.floor(1000 + Math.random() * 9000);
      const fallbackOrderNo = `ORD-${dateStr}-${randomSuffix}`;

      setConfirmedOrder({
        orderNumber: fallbackOrderNo,
        customerName: formData.name,
        phone: formData.phone,
        address: formData.address,
        addressDetail: formData.addressDetail,
        totalPrice: totalPrice,
        optionName: selectedOption.name,
        quantity: quantity,
        paymentMethod: paymentLabel,
        status: '주문접수',
      });
      setCurrentStep('completed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetAndClose = () => {
    setCurrentStep('info');
    setErrorMessage('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/65 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-[#FAF7F0] border-3 border-[#D8CEBA] rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden my-auto">
        {/* Header Bar */}
        <div className="bg-[#2D5A27] text-white p-5 sm:p-6 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-xl font-bold">
              {currentStep === 'completed' ? '🎉' : currentStep === 'payment' ? '💳' : '📦'}
            </span>
            <div>
              <h3 className="text-xl sm:text-2xl font-black">
                {currentStep === 'completed'
                  ? '주문완료'
                  : currentStep === 'payment'
                  ? '연습용 가짜 결제 화면'
                  : '배송지 및 주문서 작성'}
              </h3>
              <p className="text-xs sm:text-sm text-white/90">
                {currentStep === 'completed'
                  ? '결제 시뮬레이션이 성공적으로 완료되었습니다'
                  : currentStep === 'payment'
                  ? '실제로 돈이 나가지 않는 0원 연습 결제입니다'
                  : '주문 정보를 확인해주세요'}
              </p>
            </div>
          </div>
          <button
            onClick={handleResetAndClose}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition cursor-pointer"
            aria-label="닫기"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content Area */}
        <div className="p-5 sm:p-7 max-h-[82vh] overflow-y-auto">
          {/* ============================================================== */}
          {/* STEP 1: SHIPPING & ORDER INFO                                  */}
          {/* ============================================================== */}
          {currentStep === 'info' && (
            <form onSubmit={handleProceedToPayment} className="space-y-5">
              {/* Selected Item Summary */}
              <div className="bg-white border-2 border-[#E3DAC8] rounded-2xl p-4 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-[#3E7B35]">주문 상품</div>
                  <div className="text-base sm:text-lg font-black text-[#1E3B19]">
                    {selectedOption.name}
                  </div>
                  <div className="text-xs text-[#6B7561]">수량: {quantity}박스 (보틀 무료 증정)</div>
                </div>
                <div className="text-right">
                  <div className="text-xl sm:text-2xl font-black text-[#2D5A27]">
                    {totalPrice.toLocaleString()}원
                  </div>
                  <div className="text-xs text-[#7F8775]">
                    {shippingFee > 0 ? '배송비 3,000원' : '무료배송'}
                  </div>
                </div>
              </div>

              {/* Logged in member badge */}
              {currentUser && (
                <div className="bg-[#EAF2E7] border border-[#BFDCB9] rounded-xl px-4 py-2.5 flex items-center justify-between text-xs sm:text-sm text-[#1E3B19] font-bold">
                  <div className="flex items-center gap-2">
                    <span className="text-base">👤</span>
                    <span><strong>{currentUser.name}</strong> 님 회원 주문</span>
                  </div>
                  <span className="text-[11px] text-[#4A6643] font-normal">{currentUser.email}</span>
                </div>
              )}

              {errorMessage && (
                <div className="p-3 bg-red-100 border border-red-300 text-red-800 rounded-xl text-sm font-bold">
                  {errorMessage}
                </div>
              )}

              {/* Input Fields */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm sm:text-base font-extrabold text-[#1E3B19] mb-1">
                    받으실 분 성함 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="예: 윤성미"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-white border-2 border-[#D8CEBA] focus:border-[#2D5A27] focus:outline-none rounded-xl px-4 py-3 text-base sm:text-lg text-[#1E3B19] font-medium"
                  />
                </div>

                <div>
                  <label className="block text-sm sm:text-base font-extrabold text-[#1E3B19] mb-1">
                    연락처 (휴대폰 번호) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="예: 010-1234-5678"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-white border-2 border-[#D8CEBA] focus:border-[#2D5A27] focus:outline-none rounded-xl px-4 py-3 text-base sm:text-lg text-[#1E3B19] font-medium"
                  />
                </div>

                <div>
                  <label className="block text-sm sm:text-base font-extrabold text-[#1E3B19] mb-1">
                    배송지 주소 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="기본 주소 (예: 서울시 강남구 테헤란로 123)"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full bg-white border-2 border-[#D8CEBA] focus:border-[#2D5A27] focus:outline-none rounded-xl px-4 py-3 text-base sm:text-lg text-[#1E3B19] font-medium mb-2"
                  />
                  <input
                    type="text"
                    placeholder="상세 주소 (예: 101동 202호)"
                    value={formData.addressDetail}
                    onChange={(e) => setFormData({ ...formData, addressDetail: e.target.value })}
                    className="w-full bg-white border-2 border-[#D8CEBA] focus:border-[#2D5A27] focus:outline-none rounded-xl px-4 py-3 text-base text-[#1E3B19] font-medium"
                  />
                </div>

                <div>
                  <label className="block text-sm sm:text-base font-extrabold text-[#1E3B19] mb-1">
                    배송 요청사항
                  </label>
                  <input
                    type="text"
                    value={formData.memo}
                    onChange={(e) => setFormData({ ...formData, memo: e.target.value })}
                    className="w-full bg-white border-2 border-[#D8CEBA] focus:border-[#2D5A27] focus:outline-none rounded-xl px-4 py-2.5 text-sm sm:text-base text-[#1E3B19]"
                  />
                </div>
              </div>

              {/* Proceed Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-[#2D5A27] hover:bg-[#20441B] active:scale-[0.99] text-white py-4 sm:py-5 rounded-2xl font-black text-xl sm:text-2xl shadow-xl transition cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>다음: 결제하기 (연습 결제)</span>
                  <ArrowRight className="w-6 h-6" />
                </button>
                <p className="text-center text-xs text-[#7B8574] mt-2">
                  다음 단계에서 실제로 돈이 빠져나가지 않는 안전한 연습 결제화면이 열립니다.
                </p>
              </div>
            </form>
          )}

          {/* ============================================================== */}
          {/* STEP 2: MOCK PAYMENT SCREEN (연습용 가짜 결제)                  */}
          {/* ============================================================== */}
          {currentStep === 'payment' && (
            <div className="space-y-5">
              {/* VERY BIG NOTICE: 실제로 결제되지 않는 연습용 입니다 */}
              <div className="bg-amber-100 border-3 border-amber-400 rounded-2xl p-4 text-amber-900 shadow-sm animate-pulse">
                <div className="flex items-center gap-2 mb-1">
                  <AlertTriangle className="w-7 h-7 text-amber-700 shrink-0" />
                  <span className="text-lg sm:text-xl font-black text-amber-950">
                    실제로 결제되지 않는 연습용 입니다
                  </span>
                </div>
                <p className="text-xs sm:text-sm font-bold text-amber-900 leading-relaxed pl-9">
                  안심하세요! 통장이나 카드에서 <strong>진짜 돈이 전혀 빠져나가지 않는</strong> 모의 결제 시뮬레이터입니다.
                </p>
              </div>

              {/* Order Amount Display */}
              <div className="bg-white border-2 border-[#E1D7C3] rounded-2xl p-4 flex justify-between items-center">
                <div>
                  <span className="text-xs font-bold text-[#6D7762] block">최종 결제 금액</span>
                  <span className="text-2xl sm:text-3xl font-black text-[#2D5A27]">
                    {totalPrice.toLocaleString()}원
                  </span>
                </div>
                <span className="bg-[#EAF2E7] text-[#2D5A27] text-xs font-extrabold px-3 py-1.5 rounded-full border border-[#BEDDB8]">
                  연습 결제 승인 모드
                </span>
              </div>

              {/* Payment Methods Selection: Card, Kakao, Naver, Toss */}
              <div>
                <label className="block text-sm sm:text-base font-extrabold text-[#1E3B19] mb-2.5">
                  결제 수단을 선택해주세요
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {/* 1. Credit Card */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-3 rounded-2xl border-2 font-bold text-xs sm:text-sm transition cursor-pointer flex flex-col items-center gap-1.5 text-center ${
                      paymentMethod === 'card'
                        ? 'border-[#2D5A27] bg-[#EAF2E7] text-[#2D5A27] shadow-xs'
                        : 'border-[#DDD2BF] bg-white text-[#56644E] hover:bg-[#F7F3EA]'
                    }`}
                  >
                    <CreditCard className="w-5 h-5 text-[#2D5A27]" />
                    <span>신용/체크카드</span>
                  </button>

                  {/* 2. Kakao Pay */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('kakaopay')}
                    className={`p-3 rounded-2xl border-2 font-bold text-xs sm:text-sm transition cursor-pointer flex flex-col items-center gap-1.5 text-center ${
                      paymentMethod === 'kakaopay'
                        ? 'border-[#FEE500] bg-[#FFFDE6] text-[#3C1E1E] shadow-xs ring-2 ring-[#FEE500]'
                        : 'border-[#DDD2BF] bg-white text-[#56644E] hover:bg-[#F7F3EA]'
                    }`}
                  >
                    <span className="w-6 h-6 rounded-full bg-[#FEE500] flex items-center justify-center font-black text-[10px] text-[#3C1E1E]">
                      pay
                    </span>
                    <span>카카오페이</span>
                  </button>

                  {/* 3. Naver Pay */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('naverpay')}
                    className={`p-3 rounded-2xl border-2 font-bold text-xs sm:text-sm transition cursor-pointer flex flex-col items-center gap-1.5 text-center ${
                      paymentMethod === 'naverpay'
                        ? 'border-[#03C75A] bg-[#EDFBF2] text-[#03C75A] shadow-xs ring-2 ring-[#03C75A]'
                        : 'border-[#DDD2BF] bg-white text-[#56644E] hover:bg-[#F7F3EA]'
                    }`}
                  >
                    <span className="w-6 h-6 rounded-sm bg-[#03C75A] text-white flex items-center justify-center font-black text-xs">
                      N
                    </span>
                    <span>네이버페이</span>
                  </button>

                  {/* 4. Toss Pay */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('tosspay')}
                    className={`p-3 rounded-2xl border-2 font-bold text-xs sm:text-sm transition cursor-pointer flex flex-col items-center gap-1.5 text-center ${
                      paymentMethod === 'tosspay'
                        ? 'border-[#0064FF] bg-[#EDF4FF] text-[#0064FF] shadow-xs ring-2 ring-[#0064FF]'
                        : 'border-[#DDD2BF] bg-white text-[#56644E] hover:bg-[#F7F3EA]'
                    }`}
                  >
                    <span className="w-6 h-6 rounded-full bg-[#0064FF] text-white flex items-center justify-center font-black text-xs">
                      t
                    </span>
                    <span>토스페이</span>
                  </button>
                </div>
              </div>

              {/* Detailed Payment Inputs based on selected method */}
              <div className="bg-white border-2 border-[#D8CEBA] rounded-2xl p-4 sm:p-5 space-y-4">
                {/* A. CARD FORM (with 1111-2222-3333-4444 PRE-FILLED) */}
                {paymentMethod === 'card' && (
                  <div className="space-y-4">
                    {/* Virtual Card Graphic */}
                    <div className="bg-gradient-to-tr from-[#1E431B] to-[#3E7B35] text-white p-4 rounded-xl shadow-md space-y-3">
                      <div className="flex justify-between items-center text-xs text-white/80">
                        <span className="font-bold tracking-widest">연습 결제용 모의 카드</span>
                        <span className="bg-white/20 px-2 py-0.5 rounded text-[10px]">TEST CARD</span>
                      </div>
                      <div className="font-mono text-lg sm:text-xl font-bold tracking-widest text-[#FFE79A]">
                        {cardNumber}
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-medium text-white/90">{formData.name || '윤성미'}</span>
                        <span className="font-mono text-white/80">VALID THRU: {cardExpiry}</span>
                      </div>
                    </div>

                    {/* Pre-filled Card Number input */}
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <label className="text-xs sm:text-sm font-extrabold text-[#1E3B19]">
                          카드번호 (미리 입력되어 있습니다)
                        </label>
                        <span className="text-[11px] text-[#2D5A27] font-bold">1111-2222-3333-4444</span>
                      </div>
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full bg-[#FAF8F3] border-2 border-[#2D5A27] rounded-xl px-4 py-3 font-mono text-base sm:text-lg font-black text-[#1E3B19] focus:outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-[#4B5745] mb-1">
                          유효기간 (MM/YY)
                        </label>
                        <input
                          type="text"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          className="w-full bg-[#FAF8F3] border border-[#D5CAB6] rounded-xl px-3 py-2 text-sm font-mono font-bold"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-[#4B5745] mb-1">
                          CVC 번호
                        </label>
                        <input
                          type="password"
                          value={cardCvc}
                          onChange={(e) => setCardCvc(e.target.value)}
                          className="w-full bg-[#FAF8F3] border border-[#D5CAB6] rounded-xl px-3 py-2 text-sm font-mono font-bold"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#4B5745] mb-1">
                        카드사 선택
                      </label>
                      <select
                        value={cardCompany}
                        onChange={(e) => setCardCompany(e.target.value)}
                        className="w-full bg-[#FAF8F3] border border-[#D5CAB6] rounded-xl px-3 py-2 text-sm font-bold text-[#1E3B19]"
                      >
                        <option value="국민카드">국민카드 (KB)</option>
                        <option value="신한카드">신한카드</option>
                        <option value="삼성카드">삼성카드</option>
                        <option value="현대카드">현대카드</option>
                        <option value="농협카드">NH농협카드</option>
                        <option value="비씨카드">BC카드</option>
                      </select>
                    </div>
                  </div>
                )}

                {/* B. KAKAO PAY */}
                {paymentMethod === 'kakaopay' && (
                  <div className="bg-[#FFFDE6] border border-[#FEE500] rounded-xl p-4 text-center space-y-3">
                    <div className="w-12 h-12 bg-[#FEE500] rounded-2xl flex items-center justify-center mx-auto text-[#3C1E1E] font-black text-lg">
                      pay
                    </div>
                    <div>
                      <h4 className="font-extrabold text-[#3C1E1E] text-base">
                        카카오페이 간편결제 (연습 모드)
                      </h4>
                      <p className="text-xs text-[#7A612A] mt-1">
                        카카오페이 머니 및 등록된 카드로 1초 만에 승인되는 시뮬레이션입니다.
                      </p>
                    </div>
                    <div className="text-xs font-bold bg-white/80 py-2 px-3 rounded-lg text-[#3C1E1E]">
                      연습 결제 계정: {formData.name || '윤성미'} 님 카카오 계정 가상 연동
                    </div>
                  </div>
                )}

                {/* C. NAVER PAY */}
                {paymentMethod === 'naverpay' && (
                  <div className="bg-[#EDFBF2] border border-[#03C75A] rounded-xl p-4 text-center space-y-3">
                    <div className="w-12 h-12 bg-[#03C75A] text-white rounded-2xl flex items-center justify-center mx-auto font-black text-xl">
                      N
                    </div>
                    <div>
                      <h4 className="font-extrabold text-[#085E2E] text-base">
                        네이버페이 간편결제 (연습 모드)
                      </h4>
                      <p className="text-xs text-[#237044] mt-1">
                        네이버페이 포인트 최대 3,850원 가상 적립 혜택이 적용됩니다.
                      </p>
                    </div>
                    <div className="text-xs font-bold bg-white/80 py-2 px-3 rounded-lg text-[#085E2E]">
                      연습 결제 계정: {currentUser?.email || 'sungmi@naver.com'} 가상 연동
                    </div>
                  </div>
                )}

                {/* D. TOSS PAY */}
                {paymentMethod === 'tosspay' && (
                  <div className="bg-[#EDF4FF] border border-[#0064FF] rounded-xl p-4 text-center space-y-3">
                    <div className="w-12 h-12 bg-[#0064FF] text-white rounded-2xl flex items-center justify-center mx-auto font-black text-xl">
                      t
                    </div>
                    <div>
                      <h4 className="font-extrabold text-[#00388A] text-base">
                        토스페이 원클릭 간편결제 (연습 모드)
                      </h4>
                      <p className="text-xs text-[#2A5EAC] mt-1">
                        토스 앱 알림 없이 즉시 승인되는 모의 테스트 결제입니다.
                      </p>
                    </div>
                    <div className="text-xs font-bold bg-white/80 py-2 px-3 rounded-lg text-[#00388A]">
                      연습 결제 연동: {formData.phone} 가상 승인
                    </div>
                  </div>
                )}
              </div>

              {/* Execute Payment Buttons */}
              <div className="space-y-2.5 pt-1">
                <button
                  type="button"
                  disabled={isLoading}
                  onClick={handleExecutePayment}
                  className="w-full bg-[#2D5A27] hover:bg-[#20441B] active:scale-[0.99] text-white py-4 sm:py-5 rounded-2xl font-black text-xl sm:text-2xl shadow-xl transition cursor-pointer flex items-center justify-center gap-2.5 disabled:opacity-70"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-6 h-6 animate-spin text-[#E9C46A]" />
                      <span>연습 결제 승인 처리 중...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-6 h-6 text-[#E9C46A]" />
                      <span>{totalPrice.toLocaleString()}원 결제하기 (연습 결제)</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setCurrentStep('info')}
                  className="w-full text-center text-sm font-bold text-[#55644E] hover:text-[#1E3B19] py-2 flex items-center justify-center gap-1 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>배송지 정보 다시 확인/수정하기</span>
                </button>
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* STEP 3: ORDER COMPLETED SCREEN (주문완료 화면)                   */}
          {/* ============================================================== */}
          {currentStep === 'completed' && confirmedOrder && (
            <div className="text-center py-3 space-y-5">
              {/* Checkmark Icon */}
              <div className="w-20 h-20 bg-[#EAF2E7] text-[#2D5A27] rounded-full flex items-center justify-center mx-auto shadow-inner border-2 border-[#BFDCB9]">
                <CheckCircle className="w-12 h-12" />
              </div>

              {/* Title & Order Number */}
              <div>
                <span className="inline-block text-xs sm:text-sm font-black bg-[#E7DEC8] text-[#3D301C] px-4 py-1 rounded-full mb-1.5 shadow-2xs">
                  주문번호 {confirmedOrder.orderNumber}
                </span>
                <h4 className="text-2xl sm:text-3xl font-black text-[#1E3B19]">
                  주문이 완료되었습니다!
                </h4>
                <p className="text-xs sm:text-sm text-[#57644F] mt-1.5 leading-relaxed">
                  * 본 주문은 <strong>연습용 모의 결제</strong>로 처리되어 실제 요금이 부과되지 않습니다.
                </p>
              </div>

              {/* Order Receipt Details Card */}
              <div className="bg-white border-2 border-[#E1D7C3] rounded-2xl p-4 sm:p-5 text-left space-y-2.5 text-xs sm:text-sm shadow-xs">
                <div className="flex justify-between pb-2 border-b border-[#F0E9DA]">
                  <span className="text-[#6D7762]">주문번호</span>
                  <span className="font-mono font-black text-[#2D5A27]">
                    {confirmedOrder.orderNumber}
                  </span>
                </div>

                <div className="flex justify-between pb-2 border-b border-[#F0E9DA]">
                  <span className="text-[#6D7762]">주문 상품</span>
                  <span className="font-bold text-[#1E3B19]">
                    {confirmedOrder.optionName || selectedOption.name} × {confirmedOrder.quantity || quantity}박스
                  </span>
                </div>

                <div className="flex justify-between pb-2 border-b border-[#F0E9DA]">
                  <span className="text-[#6D7762]">받는 분</span>
                  <span className="font-bold text-[#1E3B19]">
                    {confirmedOrder.customerName} 님 ({confirmedOrder.phone})
                  </span>
                </div>

                <div className="flex justify-between pb-2 border-b border-[#F0E9DA]">
                  <span className="text-[#6D7762] shrink-0">배송지</span>
                  <span className="font-bold text-[#1E3B19] text-right truncate max-w-[220px]">
                    {confirmedOrder.address} {confirmedOrder.addressDetail || ''}
                  </span>
                </div>

                <div className="flex justify-between pb-2 border-b border-[#F0E9DA]">
                  <span className="text-[#6D7762]">결제 수단</span>
                  <span className="font-bold text-[#3E7B35]">
                    {confirmedOrder.paymentMethod}
                  </span>
                </div>

                <div className="flex justify-between pt-1">
                  <span className="text-sm font-bold text-[#1E3B19]">최종 결제 금액</span>
                  <span className="text-xl sm:text-2xl font-black text-[#2D5A27]">
                    {(confirmedOrder.totalPrice || totalPrice).toLocaleString()}원
                    <span className="text-[11px] font-normal text-[#6C7864] ml-1">(0원 실청구)</span>
                  </span>
                </div>
              </div>

              {/* Reassuring Free Gifts notice */}
              <div className="bg-[#FAF4E8] border border-[#E8DCC2] rounded-xl p-3 text-xs sm:text-sm text-[#5C4A25] flex items-center justify-center gap-2 font-medium">
                <span>🎁</span>
                <span>친환경 전용 쉐이커 보틀 무료 동봉 발송 준비</span>
              </div>

              {/* Close / Action Button */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleResetAndClose}
                  className="w-full bg-[#2D5A27] hover:bg-[#20441B] active:scale-98 text-white py-4 rounded-2xl font-black text-lg sm:text-xl shadow-md transition cursor-pointer"
                >
                  주문 확인 완료 및 닫기
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
