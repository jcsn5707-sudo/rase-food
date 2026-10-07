import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { FiftyIngredients } from './components/FiftyIngredients';
import { RecommendedFor } from './components/RecommendedFor';
import { HowToDrink } from './components/HowToDrink';
import { ProductOrder, ORDER_OPTIONS, OrderOption } from './components/ProductOrder';
import { CustomerReviews } from './components/CustomerReviews';
import { OrderModal } from './components/OrderModal';
import { AdminOrdersModal } from './components/AdminOrdersModal';
import { AuthModal, AuthUser } from './components/AuthModal';
import { MobileStickyBar } from './components/MobileStickyBar';
import { Footer } from './components/Footer';
import { HelpCircle, ChevronDown, CheckCircle2 } from 'lucide-react';

export default function App() {
  // Current logged in user (persisted in localStorage)
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(() => {
    try {
      const saved = localStorage.getItem('currentUser');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Modals state
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [authRedirectMessage, setAuthRedirectMessage] = useState('');
  const [pendingOrderData, setPendingOrderData] = useState<{ option: OrderOption; quantity: number } | null>(null);

  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [adminTab, setAdminTab] = useState<'lookup' | 'admin'>('admin');
  const [selectedOption, setSelectedOption] = useState<OrderOption>(ORDER_OPTIONS[0]);
  const [quantity, setQuantity] = useState(1);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [orderCount, setOrderCount] = useState<number>(0);
  const [welcomeToast, setWelcomeToast] = useState<string | null>(null);

  const refreshOrderCount = async () => {
    try {
      const res = await fetch('/api/orders');
      const data = await res.json();
      if (data.success && Array.isArray(data.orders)) {
        setOrderCount(data.orders.length);
      }
    } catch (e) {
      // ignore
    }
  };

  useEffect(() => {
    refreshOrderCount();
    const interval = setInterval(refreshOrderCount, 3000);
    return () => clearInterval(interval);
  }, []);

  // When order is clicked: check login first!
  const handleOpenOrderModal = (opt: OrderOption = selectedOption, qty: number = quantity) => {
    setSelectedOption(opt);
    setQuantity(qty);

    if (!currentUser) {
      // Prompt user to register or log in first as requested!
      setPendingOrderData({ option: opt, quantity: qty });
      setAuthRedirectMessage('주문하시려면 먼저 회원가입하고 로그인해주세요.');
      setAuthMode('register');
      setIsAuthModalOpen(true);
      return;
    }

    // If already logged in, open order modal directly
    setIsOrderModalOpen(true);
  };

  const handleOpenAuth = (mode: 'login' | 'register' = 'register') => {
    setAuthMode(mode);
    setAuthRedirectMessage('주문하시려면 먼저 회원가입하고 로그인해주세요.');
    setIsAuthModalOpen(true);
  };

  const handleAuthSuccess = (user: AuthUser) => {
    setCurrentUser(user);
    try {
      localStorage.setItem('currentUser', JSON.stringify(user));
    } catch (e) {
      // ignore
    }

    // Show temporary welcome toast
    setWelcomeToast(`${user.name} 님 환영합니다!`);
    setTimeout(() => {
      setWelcomeToast(null);
    }, 4000);

    // If there was an unfinished order, open it now!
    if (pendingOrderData) {
      setSelectedOption(pendingOrderData.option);
      setQuantity(pendingOrderData.quantity);
      setIsOrderModalOpen(true);
      setPendingOrderData(null);
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    try {
      localStorage.removeItem('currentUser');
    } catch (e) {
      // ignore
    }
  };

  const handleOpenAdminOrders = (tab: 'lookup' | 'admin' = 'admin') => {
    setAdminTab(tab);
    setIsAdminModalOpen(true);
  };

  const scrollToOrder = () => {
    const el = document.getElementById('order-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      handleOpenOrderModal();
    }
  };

  const scrollToIngredients = () => {
    const el = document.getElementById('ingredients');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const faqs = [
    {
      q: '주문하려면 꼭 회원가입을 해야 하나요?',
      a: '네, 고객님의 소중한 주문 내역을 안전하게 보관하고 배송 조회 및 무료 쉐이커 보틀 혜택을 정확히 챙겨드리기 위해 이메일과 비밀번호(6자 이상)로 간편하게 가입 후 주문하실 수 있습니다.',
    },
    {
      q: '전용 쉐이커 보틀을 진짜 무료로 주나요?',
      a: '네! 하루한잔 생식을 주문하시는 모든 고객님께 눈금이 표시된 친환경 BPA-FREE 쉐이커 보틀을 무료로 증정해 드립니다. 별도로 용기를 구매하실 필요 없이 바로 편리하게 타서 드실 수 있습니다.',
    },
    {
      q: '가루가 뭉치지 않고 잘 풀리나요?',
      a: '동결건조 미세 분말 공법을 적용하여 뭉침이 적습니다. 단, 액체(물이나 우유 200ml)를 보틀에 먼저 붓고 가루를 넣은 뒤 뚜껑을 닫고 5~10초간 흔들어 주시면 뭉침 없이 부드럽게 풀립니다.',
    },
    {
      q: '보관은 어떻게 해야 하나요?',
      a: '직사광선과 습기를 피해 서늘한 실온에 보관하시면 됩니다. 1포씩 개별 스틱 밀봉 포장되어 있어 가방이나 사무실 서랍에 넣어두고 언제든 위생적으로 드실 수 있습니다.',
    },
    {
      q: '뜨거운 물이나 데운 우유에 타도 되나요?',
      a: '자연 원물의 동결건조 영양과 신선한 풍미를 온전히 보존하기 위해, 가급적 차가운 물/우유 또는 미온수를 권장합니다.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAF7F0] text-[#2C3328] flex flex-col font-sans">
      {/* Welcome Toast Banner */}
      {welcomeToast && (
        <div className="fixed top-20 right-4 z-50 bg-[#2D5A27] text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 animate-in slide-in-from-top-4 duration-300">
          <CheckCircle2 className="w-5 h-5 text-[#E9C46A]" />
          <span className="font-extrabold text-sm sm:text-base">{welcomeToast}</span>
        </div>
      )}

      {/* 1. Header (Displays "윤성미 님 환영합니다" on top) */}
      <Header
        onOrderClick={() => handleOpenOrderModal()}
        onOpenAdminOrders={handleOpenAdminOrders}
        orderCount={orderCount}
        currentUser={currentUser}
        onOpenAuth={handleOpenAuth}
        onLogout={handleLogout}
      />

      <main className="flex-1">
        {/* 2. Top Hero: "하루한잔, 간편한 한끼" & Big Order Button */}
        <Hero
          onOrderClick={() => handleOpenOrderModal()}
          onExploreIngredients={scrollToIngredients}
          currentUser={currentUser}
        />

        {/* 3. 50 Domestic Grains & Veggies Introduction */}
        <FiftyIngredients />

        {/* 4. Recommended For 3 Types of People */}
        <RecommendedFor />

        {/* 5. How to Drink: 1 -> 2 -> 3 Steps */}
        <HowToDrink />

        {/* 6. Product 1 and Price, Big Order Button */}
        <ProductOrder
          onOpenOrderModal={handleOpenOrderModal}
          currentUser={currentUser}
        />

        {/* 7. Real Customer Reviews */}
        <CustomerReviews />

        {/* 8. Frequently Asked Questions (FAQ) */}
        <section className="py-14 sm:py-20 bg-[#F5EFEB] border-b border-[#E3DAC7]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <div className="text-center space-y-2 mb-10">
              <div className="inline-flex items-center gap-1.5 bg-[#E8DFCC] text-[#2D5A27] px-4 py-1.5 rounded-full text-sm font-bold">
                <HelpCircle className="w-4 h-4 text-[#3E7B35]" />
                <span>자주 묻는 질문</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-[#1E3B19]">
                궁금한 점을 확인해보세요
              </h2>
            </div>

            <div className="space-y-3">
              {faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="bg-white border-2 border-[#E1D7C3] rounded-2xl overflow-hidden shadow-xs"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full text-left p-5 flex items-center justify-between gap-4 font-bold text-lg text-[#1E3B19] cursor-pointer"
                  >
                    <span className="flex items-center gap-2.5">
                      <span className="text-[#3E7B35] font-black">Q.</span>
                      <span>{faq.q}</span>
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-[#6D7762] shrink-0 transition-transform ${
                        openFaq === idx ? 'rotate-180 text-[#2D5A27]' : ''
                      }`}
                    />
                  </button>
                  {openFaq === idx && (
                    <div className="px-5 pb-5 pt-1 text-base text-[#4C5745] leading-relaxed border-t border-[#F2ECE0] bg-[#FAF8F3]">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* 9. Regulatory compliant footer */}
      <Footer onOpenAdminOrders={handleOpenAdminOrders} />

      {/* 10. Mobile Sticky Order Bar */}
      <MobileStickyBar onOrderClick={() => handleOpenOrderModal()} />

      {/* 11. Complete Order Modal (Passes currentUser) */}
      <OrderModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        selectedOption={selectedOption}
        quantity={quantity}
        onOrderCompleted={refreshOrderCount}
        currentUser={currentUser}
      />

      {/* 12. Real-time Order Management & Customer Lookup Modal */}
      <AdminOrdersModal
        isOpen={isAdminModalOpen}
        onClose={() => {
          setIsAdminModalOpen(false);
          refreshOrderCount();
        }}
        defaultTab={adminTab}
      />

      {/* 13. Authentication Modal (Email/Password Login & Register) */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={handleAuthSuccess}
        initialMode={authMode}
        redirectActionMessage={authRedirectMessage}
      />
    </div>
  );
}
