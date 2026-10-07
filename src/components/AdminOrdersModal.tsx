import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Package,
  Phone,
  MapPin,
  Calendar,
  Clock,
  RefreshCw,
  Search,
  CheckCircle2,
  Trash2,
  ShieldCheck,
  CreditCard,
  User,
  Truck,
  CheckCheck,
  AlertCircle,
  Bell,
  Sparkles,
  ArrowRight,
  Filter,
} from 'lucide-react';
import { OrderRecord } from '../../server';

interface AdminOrdersModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'lookup' | 'admin';
}

export const AdminOrdersModal: React.FC<AdminOrdersModalProps> = ({
  isOpen,
  onClose,
  defaultTab = 'admin',
}) => {
  const [activeTab, setActiveTab] = useState<'lookup' | 'admin'>(defaultTab);
  const [orders, setOrders] = useState<OrderRecord[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [lastOrderAlert, setLastOrderAlert] = useState<string | null>(null);
  const [newlyArrivedId, setNewlyArrivedId] = useState<string | null>(null);
  const [isAutoPolling, setIsAutoPolling] = useState(true);

  // Keep track of order count to detect new incoming orders
  const previousOrderCountRef = useRef<number | null>(null);

  // Customer Lookup state
  const [lookupPhone, setLookupPhone] = useState('');
  const [lookupResults, setLookupResults] = useState<OrderRecord[] | null>(null);
  const [isLookingUp, setIsLookingUp] = useState(false);
  const [lookupError, setLookupError] = useState('');

  // Audio notification chime
  const playChime = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
      osc.frequency.setValueAtTime(880, audioCtx.currentTime + 0.1); // A5
      gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.35);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.35);
    } catch (e) {
      // AudioContext may be restricted by browser policy
    }
  };

  const fetchOrders = async (isBackground = false) => {
    if (!isBackground) setIsLoading(true);
    try {
      const res = await fetch('/api/orders');
      const data = await res.json();
      if (data.success && Array.isArray(data.orders)) {
        const fetchedOrders: OrderRecord[] = data.orders;

        // Check if new orders arrived in background
        if (
          previousOrderCountRef.current !== null &&
          fetchedOrders.length > previousOrderCountRef.current
        ) {
          const newest = fetchedOrders[0];
          playChime();
          setNewlyArrivedId(newest.id);
          setLastOrderAlert(
            `🔔 [새 주문 도착] ${newest.customerName} 님 - ${newest.optionName} (${newest.orderNumber})`
          );

          // Clear highlight after 5 seconds
          setTimeout(() => {
            setNewlyArrivedId(null);
          }, 5000);
          setTimeout(() => {
            setLastOrderAlert(null);
          }, 6000);
        }

        previousOrderCountRef.current = fetchedOrders.length;
        setOrders(fetchedOrders);
      }
    } catch (err) {
      console.error('Fetch orders error:', err);
    } finally {
      if (!isBackground) setIsLoading(false);
    }
  };

  // Real-time auto-polling every 2.5s
  useEffect(() => {
    if (isOpen) {
      fetchOrders();

      const savedPhone = localStorage.getItem('last_order_phone');
      if (savedPhone) {
        setLookupPhone(savedPhone);
      }

      // Live polling interval
      let interval: any;
      if (isAutoPolling) {
        interval = setInterval(() => {
          fetchOrders(true);
        }, 2500);
      }

      return () => {
        if (interval) clearInterval(interval);
      };
    }
  }, [isOpen, isAutoPolling]);

  if (!isOpen) return null;

  // 1-Click Status Update: "배송중" or "배송완료"
  const handleUpdateStatus = async (id: string, newStatus: OrderRecord['status']) => {
    try {
      const res = await fetch(`/api/orders/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setOrders((prev) =>
          prev.map((o) => (o.id === id ? { ...o, status: newStatus } : o))
        );
      }
    } catch (err) {
      console.error('Update status error:', err);
    }
  };

  const handleDeleteOrder = async (id: string) => {
    if (!window.confirm('이 주문 내역을 삭제하시겠습니까?')) return;
    try {
      const res = await fetch(`/api/orders/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setOrders((prev) => prev.filter((o) => o.id !== id));
        previousOrderCountRef.current = orders.length - 1;
      }
    } catch (err) {
      console.error('Delete order error:', err);
    }
  };

  // Quick Mock Test Order generator for testing live real-time incoming orders
  const handleCreateTestOrder = async () => {
    setIsLoading(true);
    const mockNames = ['이서연', '김도윤', '박하은', '최민준', '정수빈'];
    const randomName = mockNames[Math.floor(Math.random() * mockNames.length)];
    const randomPhone = `010-${Math.floor(2000 + Math.random() * 7000)}-${Math.floor(1000 + Math.random() * 8999)}`;

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: randomName,
          phone: randomPhone,
          address: '서울특별시 송파구 올림픽로 300',
          addressDetail: '7층',
          memo: '문 앞에 두고 벨 눌러주세요',
          optionId: 'box-1',
          optionName: '1박스 (30포 / 1개월분)',
          quantity: 1,
          price: 38500,
          shippingFee: 3000,
          paymentMethod: '카카오페이 (연습결제)',
        }),
      });
      await res.json();
      fetchOrders(false);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCustomerLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLookupError('');
    const cleanPhone = lookupPhone.replace(/[^0-9]/g, '');
    if (!cleanPhone || cleanPhone.length < 8) {
      setLookupError('휴대폰 번호를 올바르게 입력해주세요 (예: 01012345678)');
      return;
    }

    setIsLookingUp(true);
    try {
      const res = await fetch(`/api/orders/lookup?phone=${encodeURIComponent(cleanPhone)}`);
      const data = await res.json();
      if (data.success) {
        setLookupResults(data.orders);
        if (data.orders.length === 0) {
          setLookupError('해당 연락처로 접수된 주문 내역이 없습니다.');
        }
      } else {
        setLookupError(data.error || '조회 실패');
      }
    } catch (err) {
      setLookupError('주문 조회 중 통신 오류가 발생했습니다.');
    } finally {
      setIsLookingUp(false);
    }
  };

  const filteredOrders = orders.filter((o) => {
    const matchStatus = filterStatus === 'all' || o.status === filterStatus;
    const matchSearch =
      !searchTerm ||
      o.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.phone.includes(searchTerm) ||
      o.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.address.toLowerCase().includes(searchTerm.toLowerCase());
    return matchStatus && matchSearch;
  });

  const totalRevenue = orders.reduce((sum, o) => sum + (o.totalPrice || 0), 0);
  const pendingOrders = orders.filter((o) => o.status === '주문접수').length;
  const inDeliveryOrders = orders.filter((o) => o.status === '배송중').length;
  const completedOrders = orders.filter((o) => o.status === '배송완료').length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/70 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-[#FAF7F0] border-3 border-[#D8CEBA] rounded-3xl w-full max-w-5xl shadow-2xl overflow-hidden my-auto max-h-[94vh] flex flex-col">
        {/* Top Header */}
        <div className="bg-[#1F3E1C] text-white p-4 sm:p-5 flex items-center justify-between shrink-0 border-b border-[#2D5A27]">
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-2xl font-bold">
              🏢
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl sm:text-2xl font-black">
                  판매자 실시간 주문관리 센터
                </h3>
                {/* Live Real-time Polling indicator */}
                <span className="inline-flex items-center gap-1.5 bg-[#2D5A27] text-[#A6FF96] text-xs font-bold px-2.5 py-0.5 rounded-full border border-[#4F8B46]">
                  <span className="w-2 h-2 rounded-full bg-[#46E334] animate-ping"></span>
                  <span>실시간 자동 수신 중</span>
                </span>
              </div>
              <p className="text-xs text-white/80 mt-0.5">
                새 주문이 들어오면 새로고침 없이 표에 즉시 자동으로 추가됩니다.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition cursor-pointer"
            aria-label="닫기"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Real-time New Order Banner notification */}
        {lastOrderAlert && (
          <div className="bg-[#E7F8E3] border-b-2 border-[#8ED482] px-4 py-2.5 text-xs sm:text-sm font-extrabold text-[#194D13] flex items-center justify-between animate-bounce">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-[#2D5A27] animate-spin" />
              <span>{lastOrderAlert}</span>
            </div>
            <span className="text-[11px] bg-[#2D5A27] text-white px-2 py-0.5 rounded-full font-bold">
              방금 도착
            </span>
          </div>
        )}

        {/* Tab switch bar */}
        <div className="bg-[#EFE8DA] p-2 flex gap-2 border-b border-[#DFD6C3] shrink-0">
          <button
            onClick={() => setActiveTab('admin')}
            className={`flex-1 py-2.5 px-4 rounded-xl font-black text-sm sm:text-base transition cursor-pointer flex items-center justify-center gap-2 ${
              activeTab === 'admin'
                ? 'bg-[#2D5A27] text-white shadow-xs'
                : 'bg-transparent text-[#48533F] hover:bg-[#E5DDCB]'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>판매자 주문 목록 표 (총 {orders.length}건)</span>
            {pendingOrders > 0 && (
              <span className="bg-[#E9C46A] text-[#342407] text-xs px-2 py-0.5 rounded-full font-black">
                신규 {pendingOrders}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('lookup')}
            className={`flex-1 py-2.5 px-4 rounded-xl font-bold text-sm sm:text-base transition cursor-pointer flex items-center justify-center gap-2 ${
              activeTab === 'lookup'
                ? 'bg-[#2D5A27] text-white shadow-xs'
                : 'bg-transparent text-[#48533F] hover:bg-[#E5DDCB]'
            }`}
          >
            <Search className="w-4 h-4" />
            <span>손님 휴대폰 주문 조회</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-5">
          {activeTab === 'admin' ? (
            /* SELLER ADMIN TAB */
            <div className="space-y-5">
              {/* Top Quick Status Counters */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
                <div className="bg-white border-2 border-[#E3DAC8] rounded-2xl p-3.5 text-center shadow-2xs">
                  <div className="text-xs text-[#6A7561] font-bold">전체 주문</div>
                  <div className="text-xl sm:text-2xl font-black text-[#1E3B19] mt-0.5">
                    {orders.length}건
                  </div>
                </div>
                <div className="bg-white border-2 border-amber-300 bg-amber-50/40 rounded-2xl p-3.5 text-center shadow-2xs">
                  <div className="text-xs text-amber-800 font-bold">주문접수 (대기)</div>
                  <div className="text-xl sm:text-2xl font-black text-amber-700 mt-0.5">
                    {pendingOrders}건
                  </div>
                </div>
                <div className="bg-white border-2 border-indigo-200 bg-indigo-50/30 rounded-2xl p-3.5 text-center shadow-2xs">
                  <div className="text-xs text-indigo-800 font-bold">배송중</div>
                  <div className="text-xl sm:text-2xl font-black text-indigo-700 mt-0.5">
                    {inDeliveryOrders}건
                  </div>
                </div>
                <div className="bg-white border-2 border-emerald-200 bg-emerald-50/30 rounded-2xl p-3.5 text-center shadow-2xs">
                  <div className="text-xs text-emerald-800 font-bold">배송완료</div>
                  <div className="text-xl sm:text-2xl font-black text-emerald-700 mt-0.5">
                    {completedOrders}건
                  </div>
                </div>
              </div>

              {/* Action Toolbar & Filters */}
              <div className="flex flex-col md:flex-row gap-3 items-center justify-between bg-white p-3.5 rounded-2xl border-2 border-[#DFD6C3]">
                {/* Status Filter Buttons */}
                <div className="flex items-center gap-1.5 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
                  {[
                    { id: 'all', label: '전체' },
                    { id: '주문접수', label: '주문접수' },
                    { id: '배송중', label: '배송중' },
                    { id: '배송완료', label: '배송완료' },
                  ].map((st) => (
                    <button
                      key={st.id}
                      onClick={() => setFilterStatus(st.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-extrabold shrink-0 transition cursor-pointer ${
                        filterStatus === st.id
                          ? 'bg-[#2D5A27] text-white shadow-xs'
                          : 'bg-[#F4EFE6] text-[#55634E] hover:bg-[#EAE2D2]'
                      }`}
                    >
                      {st.label}
                    </button>
                  ))}
                </div>

                {/* Search Bar + Quick Test Order Button */}
                <div className="flex items-center gap-2 w-full md:w-auto justify-end">
                  <div className="relative flex-1 md:w-56">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#7F8775]" />
                    <input
                      type="text"
                      placeholder="주문자, 전화번호 검색"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full bg-[#FAF8F3] border border-[#D5CBB8] rounded-xl pl-9 pr-3 py-1.5 text-xs sm:text-sm focus:outline-none focus:border-[#2D5A27]"
                    />
                  </div>

                  {/* Manual Refresh */}
                  <button
                    onClick={() => fetchOrders(false)}
                    disabled={isLoading}
                    className="p-2 rounded-xl bg-[#FAF8F3] border border-[#D5CBB8] hover:bg-[#EFE8DA] text-[#33422C] transition cursor-pointer shrink-0"
                    title="즉시 새로고침"
                  >
                    <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                  </button>

                  {/* Test Order Trigger for seller to test live auto-arrival */}
                  <button
                    onClick={handleCreateTestOrder}
                    disabled={isLoading}
                    className="flex items-center gap-1.5 bg-[#FAF3E3] hover:bg-[#F3E5C8] border border-[#E0CFAB] text-[#5D4215] px-3 py-1.5 rounded-xl text-xs font-black transition cursor-pointer shrink-0"
                    title="새 주문이 들어오는 것을 실시간으로 테스트합니다"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#C47D15]" />
                    <span>+ 모의 주문 넣기</span>
                  </button>
                </div>
              </div>

              {/* ORDERS TABLE AS REQUESTED */}
              <div className="bg-white border-2 border-[#DFD6C3] rounded-2xl overflow-hidden shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-[#F3EDE2] text-[#2F4428] border-b-2 border-[#D8CEBA] text-xs sm:text-sm font-extrabold">
                        <th className="py-3.5 px-4 whitespace-nowrap">주문번호 / 일시</th>
                        <th className="py-3.5 px-4 whitespace-nowrap">주문자</th>
                        <th className="py-3.5 px-4 whitespace-nowrap">상품 / 수량</th>
                        <th className="py-3.5 px-4 whitespace-nowrap text-right">금액</th>
                        <th className="py-3.5 px-4 text-center whitespace-nowrap">상태</th>
                        <th className="py-3.5 px-4 text-center whitespace-nowrap">상태 변경 (원클릭)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#EDE5D6] text-xs sm:text-sm">
                      {filteredOrders.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="py-12 text-center text-[#737C6B]">
                            <Package className="w-10 h-10 mx-auto text-[#A5AF9D] mb-2" />
                            <p className="font-bold text-base">접수된 주문이 없습니다.</p>
                            <p className="text-xs text-[#8F9988] mt-1">
                              홈페이지에서 고객이 주문을 완료하면 새로고침 없이 바로 여기에 뜹니다.
                            </p>
                          </td>
                        </tr>
                      ) : (
                        filteredOrders.map((ord) => {
                          const isJustArrived = newlyArrivedId === ord.id;
                          return (
                            <tr
                              key={ord.id}
                              className={`transition-colors hover:bg-[#FAF8F3] ${
                                isJustArrived ? 'bg-emerald-100/70 ring-2 ring-emerald-500 animate-pulse' : ''
                              }`}
                            >
                              {/* 1. 주문번호 / 일시 */}
                              <td className="py-3.5 px-4">
                                <div className="font-mono font-black text-[#2D5A27] text-xs sm:text-sm flex items-center gap-1.5">
                                  <span>{ord.orderNumber}</span>
                                  {isJustArrived && (
                                    <span className="bg-emerald-600 text-white text-[10px] px-1.5 py-0.2 rounded font-sans">
                                      NEW
                                    </span>
                                  )}
                                </div>
                                <div className="text-[11px] text-[#7B8574] flex items-center gap-1 mt-0.5">
                                  <Clock className="w-3 h-3" />
                                  <span>{new Date(ord.createdAt).toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })}</span>
                                  <span className="text-gray-300">|</span>
                                  <span>{new Date(ord.createdAt).toLocaleDateString('ko-KR')}</span>
                                </div>
                              </td>

                              {/* 2. 주문자 */}
                              <td className="py-3.5 px-4">
                                <div className="font-extrabold text-[#1E3B19] flex items-center gap-1.5">
                                  <User className="w-3.5 h-3.5 text-[#3E7B35]" />
                                  <span>{ord.customerName}</span>
                                </div>
                                <div className="text-[11px] font-mono text-[#58684F] mt-0.5">
                                  {ord.phone}
                                </div>
                                <div
                                  className="text-[11px] text-[#7A8673] truncate max-w-[180px] sm:max-w-[240px] mt-0.5"
                                  title={`${ord.address} ${ord.addressDetail || ''} (요청: ${ord.memo || '없음'})`}
                                >
                                  {ord.address} {ord.addressDetail || ''}
                                </div>
                              </td>

                              {/* 3. 상품 / 수량 */}
                              <td className="py-3.5 px-4">
                                <div className="font-bold text-[#1E3B19] leading-tight">
                                  {ord.optionName}
                                </div>
                                <div className="text-xs text-[#2D5A27] font-black mt-0.5">
                                  수량: {ord.quantity}박스 (보틀 증정)
                                </div>
                              </td>

                              {/* 4. 금액 */}
                              <td className="py-3.5 px-4 text-right">
                                <div className="font-black text-base sm:text-lg text-[#1E3B19]">
                                  {ord.totalPrice.toLocaleString()}원
                                </div>
                                <div className="text-[10px] text-[#74826C] truncate max-w-[110px] ml-auto">
                                  {ord.paymentMethod}
                                </div>
                              </td>

                              {/* 5. 상태 */}
                              <td className="py-3.5 px-4 text-center">
                                <span
                                  className={`inline-block px-3 py-1 rounded-full text-xs font-black shadow-2xs whitespace-nowrap ${
                                    ord.status === '주문접수'
                                      ? 'bg-amber-100 text-amber-800 border border-amber-300'
                                      : ord.status === '배송중'
                                      ? 'bg-indigo-100 text-indigo-800 border border-indigo-300'
                                      : ord.status === '배송완료'
                                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                                      : ord.status === '배송준비'
                                      ? 'bg-blue-100 text-blue-800 border border-blue-300'
                                      : 'bg-gray-100 text-gray-700 border border-gray-300'
                                  }`}
                                >
                                  {ord.status}
                                </span>
                              </td>

                              {/* 6. 상태 변경 버튼 (배송중, 배송완료 원클릭) */}
                              <td className="py-3.5 px-4 text-center">
                                <div className="flex items-center justify-center gap-1.5 flex-wrap">
                                  {/* "배송중" Button as requested */}
                                  <button
                                    onClick={() => handleUpdateStatus(ord.id, '배송중')}
                                    disabled={ord.status === '배송중'}
                                    className={`px-3 py-1.5 rounded-xl text-xs font-black transition cursor-pointer flex items-center gap-1 ${
                                      ord.status === '배송중'
                                        ? 'bg-indigo-600 text-white cursor-default'
                                        : 'bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 active:scale-95'
                                    }`}
                                    title="배송중으로 상태 변경"
                                  >
                                    <Truck className="w-3.5 h-3.5" />
                                    <span>배송중</span>
                                  </button>

                                  {/* "배송완료" Button as requested */}
                                  <button
                                    onClick={() => handleUpdateStatus(ord.id, '배송완료')}
                                    disabled={ord.status === '배송완료'}
                                    className={`px-3 py-1.5 rounded-xl text-xs font-black transition cursor-pointer flex items-center gap-1 ${
                                      ord.status === '배송완료'
                                        ? 'bg-emerald-600 text-white cursor-default'
                                        : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 active:scale-95'
                                    }`}
                                    title="배송완료로 상태 변경"
                                  >
                                    <CheckCheck className="w-3.5 h-3.5" />
                                    <span>배송완료</span>
                                  </button>

                                  {/* Delete button */}
                                  <button
                                    onClick={() => handleDeleteOrder(ord.id)}
                                    className="p-1.5 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition cursor-pointer ml-1"
                                    title="주문 삭제"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ) : (
            /* CUSTOMER LOOKUP TAB */
            <div className="max-w-xl mx-auto space-y-6 py-2">
              <div className="text-center space-y-2">
                <div className="w-14 h-14 rounded-2xl bg-[#EAF2E7] text-[#2D5A27] flex items-center justify-center mx-auto text-2xl">
                  🔍
                </div>
                <h4 className="text-2xl font-black text-[#1E3B19]">
                  내 주문 실시간 조회
                </h4>
                <p className="text-sm text-[#5C6955]">
                  주문 시 입력하셨던 <strong>휴대폰 번호</strong>를 입력하시면 실시간 주문 및 배송 상태를 확인하실 수 있습니다.
                </p>
              </div>

              {/* Phone search form */}
              <form onSubmit={handleCustomerLookup} className="space-y-3">
                <div className="flex gap-2">
                  <input
                    type="tel"
                    required
                    placeholder="휴대폰 번호 (예: 010-1234-5678)"
                    value={lookupPhone}
                    onChange={(e) => setLookupPhone(e.target.value)}
                    className="flex-1 bg-white border-2 border-[#D8CEBA] rounded-xl px-4 py-3 text-base font-bold text-[#1E3B19] focus:outline-none focus:border-[#2D5A27]"
                  />
                  <button
                    type="submit"
                    disabled={isLookingUp}
                    className="bg-[#2D5A27] hover:bg-[#20441B] text-white px-6 py-3 rounded-xl font-black text-base shrink-0 transition cursor-pointer flex items-center gap-1.5"
                  >
                    {isLookingUp ? (
                      <RefreshCw className="w-4 h-4 animate-spin" />
                    ) : (
                      <Search className="w-4 h-4" />
                    )}
                    <span>조회하기</span>
                  </button>
                </div>
                {lookupError && (
                  <p className="text-xs font-bold text-red-600 pl-1">{lookupError}</p>
                )}
              </form>

              {/* Lookup Results */}
              {lookupResults && lookupResults.length > 0 && (
                <div className="space-y-4 pt-3">
                  <h5 className="font-extrabold text-[#1E3B19] text-base">
                    조회된 주문 내역 (총 {lookupResults.length}건)
                  </h5>

                  {lookupResults.map((ord) => (
                    <div
                      key={ord.id}
                      className="bg-white border-2 border-[#D7CCB8] rounded-2xl p-5 shadow-xs space-y-3"
                    >
                      <div className="flex items-center justify-between pb-3 border-b border-[#F0E9DC]">
                        <div>
                          <div className="text-xs text-[#7B8574]">
                            주문일시: {new Date(ord.createdAt).toLocaleDateString('ko-KR')}
                          </div>
                          <div className="font-mono text-sm font-black text-[#2D5A27]">
                            {ord.orderNumber}
                          </div>
                        </div>

                        <span
                          className={`text-xs font-black px-3 py-1.5 rounded-full ${
                            ord.status === '주문접수'
                              ? 'bg-amber-100 text-amber-800'
                              : ord.status === '배송중'
                              ? 'bg-indigo-100 text-indigo-800'
                              : ord.status === '배송완료'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-gray-100 text-gray-700'
                          }`}
                        >
                          {ord.status}
                        </span>
                      </div>

                      <div className="space-y-1.5 text-sm text-[#3E4A37]">
                        <div className="flex justify-between font-bold">
                          <span>{ord.optionName} × {ord.quantity}박스</span>
                          <span className="text-[#2D5A27] font-black text-base">
                            {ord.totalPrice.toLocaleString()}원
                          </span>
                        </div>
                        <div className="text-xs text-[#6B7561]">
                          받는 분: {ord.customerName} | 배송지: {ord.address} {ord.addressDetail || ''}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-[#FAF7F0] p-4 border-t-2 border-[#DFD6C3] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2 text-xs text-[#6A7863] font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>2.5초 주기 실시간 자동 동기화 활성화됨 (새로고침 없이 자동 반영)</span>
          </div>
          <button
            onClick={onClose}
            className="bg-[#2D5A27] hover:bg-[#1E3E1C] text-white px-6 py-2.5 rounded-xl font-black text-sm cursor-pointer transition shadow-xs"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};
