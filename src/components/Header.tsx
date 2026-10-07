import React from 'react';
import { Phone, Sparkles, User, LogOut, LogIn, UserPlus } from 'lucide-react';
import { AuthUser } from './AuthModal';

interface HeaderProps {
  onOrderClick: () => void;
  onOpenAdminOrders: (tab?: 'lookup' | 'admin') => void;
  orderCount?: number;
  currentUser: AuthUser | null;
  onOpenAuth: (mode?: 'login' | 'register') => void;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOrderClick,
  onOpenAdminOrders,
  orderCount = 0,
  currentUser,
  onOpenAuth,
  onLogout,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F0]/95 backdrop-blur-md border-b border-[#E8E2D5] shadow-xs">
      {/* 1. TOP NOTICE STRIP: GREETING OR SIGNUP REQUIREMENT */}
      {currentUser ? (
        /* Logged in: "윤성미 님 환영합니다" - LARGE & PROMINENT */
        <div className="bg-[#2D5A27] text-white px-4 py-2 text-sm sm:text-base font-extrabold shadow-inner">
          <div className="max-w-4xl mx-auto w-full flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 truncate">
              <span className="text-base sm:text-lg text-[#E9C46A]">✨</span>
              <span className="text-base sm:text-lg font-black tracking-wide text-white">
                <span className="text-[#FFE79A] underline underline-offset-4 decoration-2">{currentUser.name} 님 환영합니다!</span>
              </span>
              <span className="hidden md:inline text-white/80 font-normal text-xs ml-1">
                (안전하게 로그인되었습니다 • 주문 시 자동 입력 적용)
              </span>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={onLogout}
                className="bg-white/15 hover:bg-white/25 text-white px-2.5 py-1 rounded-lg text-xs font-bold transition flex items-center gap-1 cursor-pointer"
                title="로그아웃"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>로그아웃</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Not logged in: Requirement to sign up / log in */
        <div className="bg-[#4E3F29] text-white px-4 py-2 text-xs sm:text-sm font-bold">
          <div className="max-w-4xl mx-auto w-full flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 truncate text-[#F5EADB]">
              <span className="text-[#E9C46A]">💡</span>
              <span className="truncate">
                <strong>주문 전 필수:</strong> 먼저 회원가입하고 로그인해주세요.
              </span>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              <button
                onClick={() => onOpenAuth('register')}
                className="bg-[#2D5A27] hover:bg-[#20441B] text-white px-2.5 py-0.5 rounded-lg text-xs font-black transition cursor-pointer"
              >
                회원가입
              </button>
              <button
                onClick={() => onOpenAuth('login')}
                className="bg-white/20 hover:bg-white/30 text-white px-2.5 py-0.5 rounded-lg text-xs font-bold transition cursor-pointer"
              >
                로그인
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. MAIN HEADER BAR */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 h-18 sm:h-20 flex items-center justify-between gap-2">
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-2.5 group shrink-0">
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#2D5A27] flex items-center justify-center text-white font-bold text-xl shadow-xs">
            生
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-lg sm:text-2xl text-[#1F3A1A] tracking-tight flex items-center gap-1.5">
              하루한잔 <span className="text-[#3E7B35] font-semibold text-base sm:text-xl">생식</span>
            </span>
            <span className="text-[11px] sm:text-xs text-[#6B7261] font-medium tracking-wide">
              국내산 50가지 자연 원료
            </span>
          </div>
        </a>

        {/* Center Welcome Badge when logged in */}
        {currentUser ? (
          <div className="hidden lg:flex items-center gap-2 bg-[#EAF2E7] border border-[#BFDCB9] px-4 py-1.5 rounded-full text-sm text-[#1E3B19] font-black shadow-2xs">
            <User className="w-4 h-4 text-[#2D5A27]" />
            <span>{currentUser.name} 님 로그인 중</span>
          </div>
        ) : (
          <div className="hidden lg:flex items-center gap-1 text-xs text-[#6D7762] bg-[#F2EDE1] px-3 py-1.5 rounded-full font-medium">
            <span>회원 전용 주문 서비스</span>
          </div>
        )}

        {/* Right Action buttons */}
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          {/* Auth status buttons */}
          {!currentUser ? (
            <div className="flex items-center gap-1">
              <button
                onClick={() => onOpenAuth('register')}
                className="flex items-center gap-1 text-xs sm:text-sm font-bold text-[#1E3B19] bg-[#E8E1CE] hover:bg-[#DCD4BF] px-2.5 sm:px-3 py-2 rounded-xl transition cursor-pointer"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>회원가입</span>
              </button>
              <button
                onClick={() => onOpenAuth('login')}
                className="flex items-center gap-1 text-xs sm:text-sm font-bold text-[#2D5A27] bg-[#EAF2E7] hover:bg-[#DDE9D9] px-2.5 sm:px-3 py-2 rounded-xl transition cursor-pointer border border-[#C6DBC1]"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>로그인</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-1 text-xs sm:text-sm font-black text-[#2D5A27] bg-[#EAF2E7] px-3 py-2 rounded-xl border border-[#C5DDC0]">
              <span className="truncate max-w-[90px]">{currentUser.name}</span>님
            </div>
          )}

          {/* Seller Order Management button (Real-time live indicator) */}
          <button
            onClick={() => onOpenAdminOrders('admin')}
            className="flex items-center gap-1.5 text-xs sm:text-sm font-black text-[#1E3B19] bg-[#E8DFCC] hover:bg-[#DCD0BA] px-3 sm:px-3.5 py-2 sm:py-2.5 rounded-xl transition cursor-pointer border border-[#CDBF9E] shadow-2xs"
            title="판매자 실시간 주문관리 화면 열기"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
            <span>주문관리</span>
            {orderCount > 0 && (
              <span className="bg-[#2D5A27] text-white text-[11px] px-1.5 py-0.2 rounded-full font-bold">
                {orderCount}
              </span>
            )}
          </button>

          {/* Big Order Button */}
          <button
            onClick={onOrderClick}
            className="flex items-center gap-1.5 sm:gap-2 bg-[#2D5A27] hover:bg-[#23471e] active:scale-98 text-white px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl font-black text-sm sm:text-base shadow-md hover:shadow-lg transition cursor-pointer shrink-0"
          >
            <Sparkles className="w-4 h-4 text-[#E9C46A]" />
            <span>주문하기</span>
          </button>
        </div>
      </div>
    </header>
  );
};
