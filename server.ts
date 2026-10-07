import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export interface OrderRecord {
  id: string;
  orderNumber: string;
  createdAt: string;
  customerName: string;
  phone: string;
  address: string;
  addressDetail?: string;
  memo?: string;
  productName: string;
  optionId: string;
  optionName: string;
  quantity: number;
  itemPrice: number;
  shippingFee: number;
  totalPrice: number;
  paymentMethod: string;
  status: '주문접수' | '배송준비' | '배송중' | '배송완료' | '주문취소';
  trackingNumber?: string;
}

export interface UserRecord {
  id: string;
  name: string;
  email: string;
  password: string;
  phone?: string;
  createdAt: string;
}

const DATA_DIR = path.join(__dirname, 'data');
const ORDERS_FILE = path.join(DATA_DIR, 'orders.json');
const USERS_FILE = path.join(DATA_DIR, 'users.json');

function ensureDataFile() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  // Ensure users file & seed "윤성미"
  if (!fs.existsSync(USERS_FILE)) {
    const initialUsers: UserRecord[] = [
      {
        id: 'user_sungmi_1',
        name: '윤성미',
        email: 'sungmi@naver.com',
        password: 'password123',
        phone: '010-5234-8901',
        createdAt: new Date().toISOString(),
      },
    ];
    fs.writeFileSync(USERS_FILE, JSON.stringify(initialUsers, null, 2), 'utf-8');
  }

  if (!fs.existsSync(ORDERS_FILE)) {
    // Seed initial orders so store owner can see how it works right away
    const initialOrders: OrderRecord[] = [
      {
        id: 'ord-seed-01',
        orderNumber: 'RAW-20261006-1024',
        createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
        customerName: '김민지',
        phone: '010-3849-2910',
        address: '경기도 성남시 분당구 판교역로 146',
        addressDetail: '302동 1104호',
        memo: '문 앞에 놓아주세요. 감사합니다.',
        productName: '[하루한잔] 국내산 50선 프리미엄 생식',
        optionId: 'box-2',
        optionName: '2박스 (60포 / 2개월분)',
        quantity: 1,
        itemPrice: 72000,
        shippingFee: 0,
        totalPrice: 72000,
        paymentMethod: '신용/체크카드',
        status: '배송준비',
      },
      {
        id: 'ord-seed-02',
        orderNumber: 'RAW-20261006-1025',
        createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
        customerName: '박정우',
        phone: '010-8921-4433',
        address: '서울특별시 마포구 월드컵북로 396',
        addressDetail: '누리꿈스퀘어 12층',
        memo: '부재 시 경비실에 맡겨주세요',
        productName: '[하루한잔] 국내산 50선 프리미엄 생식',
        optionId: 'box-1',
        optionName: '1박스 (30포 / 1개월분)',
        quantity: 1,
        itemPrice: 38500,
        shippingFee: 3000,
        totalPrice: 41500,
        paymentMethod: '무통장입금',
        status: '주문접수',
      },
    ];
    fs.writeFileSync(ORDERS_FILE, JSON.stringify(initialOrders, null, 2), 'utf-8');
  }
}

function getOrders(): OrderRecord[] {
  ensureDataFile();
  try {
    const raw = fs.readFileSync(ORDERS_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Failed to read orders.json:', err);
    return [];
  }
}

function saveOrders(orders: OrderRecord[]) {
  ensureDataFile();
  try {
    fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2), 'utf-8');
  } catch (err) {
    console.error('Failed to write orders.json:', err);
  }
}

function getUsers(): UserRecord[] {
  ensureDataFile();
  try {
    const raw = fs.readFileSync(USERS_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Failed to read users.json:', err);
    return [];
  }
}

function saveUsers(users: UserRecord[]) {
  ensureDataFile();
  try {
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), 'utf-8');
  } catch (err) {
    console.error('Failed to write users.json:', err);
  }
}

async function startServer() {
  ensureDataFile();

  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json());

  // --- Auth APIs ---
  // 1. 회원가입 API
  app.post('/api/auth/register', (req, res) => {
    try {
      const { name, email, password, phone } = req.body;

      if (!name || !String(name).trim()) {
        return res.status(400).json({
          success: false,
          error: '성함을 입력해주세요.',
        });
      }

      const trimmedEmail = String(email || '').trim().toLowerCase();
      if (!trimmedEmail || !trimmedEmail.includes('@') || !trimmedEmail.includes('.')) {
        return res.status(400).json({
          success: false,
          error: '올바른 이메일 주소 형식(예: name@example.com)으로 입력해주세요.',
        });
      }

      const trimmedPassword = String(password || '');
      if (!trimmedPassword || trimmedPassword.length < 6) {
        return res.status(400).json({
          success: false,
          error: '비밀번호가 너무 짧아요! 6자리 이상으로 입력해주세요.',
        });
      }

      const users = getUsers();
      const existing = users.find((u) => u.email.toLowerCase() === trimmedEmail);
      if (existing) {
        return res.status(400).json({
          success: false,
          error: '이미 가입되어 있는 이메일 주소예요. 로그인 탭에서 로그인해주세요.',
        });
      }

      const newUser: UserRecord = {
        id: `user_${Date.now()}_${Math.floor(100 + Math.random() * 900)}`,
        name: String(name).trim(),
        email: trimmedEmail,
        password: trimmedPassword,
        phone: phone ? String(phone).trim() : '',
        createdAt: new Date().toISOString(),
      };

      users.push(newUser);
      saveUsers(users);

      console.log(`[USER REGISTERED] ${newUser.name} (${newUser.email})`);

      return res.status(201).json({
        success: true,
        message: `${newUser.name} 님, 회원가입이 완료되었습니다!`,
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          phone: newUser.phone,
        },
      });
    } catch (err) {
      console.error('Register error:', err);
      return res.status(500).json({
        success: false,
        error: '회원가입 처리 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요.',
      });
    }
  });

  // 2. 로그인 API
  app.post('/api/auth/login', (req, res) => {
    try {
      const { email, password } = req.body;

      const trimmedEmail = String(email || '').trim().toLowerCase();
      if (!trimmedEmail) {
        return res.status(400).json({
          success: false,
          error: '이메일 주소를 입력해주세요.',
        });
      }

      const trimmedPassword = String(password || '');
      if (!trimmedPassword) {
        return res.status(400).json({
          success: false,
          error: '비밀번호를 입력해주세요.',
        });
      }

      if (trimmedPassword.length < 6) {
        return res.status(400).json({
          success: false,
          error: '비밀번호는 최소 6자 이상이어야 합니다. 6자리 이상으로 입력해주세요.',
        });
      }

      const users = getUsers();
      const user = users.find((u) => u.email.toLowerCase() === trimmedEmail);

      if (!user) {
        return res.status(400).json({
          success: false,
          error: '가입되지 않은 이메일 주소예요. 회원가입을 먼저 진행해주세요.',
        });
      }

      if (user.password !== trimmedPassword) {
        return res.status(400).json({
          success: false,
          error: '비밀번호가 맞지 않아요. 영문이나 숫자를 다시 확인하고 입력해주세요.',
        });
      }

      console.log(`[USER LOGGED IN] ${user.name} (${user.email})`);

      return res.json({
        success: true,
        message: `${user.name} 님, 환영합니다!`,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
        },
      });
    } catch (err) {
      console.error('Login error:', err);
      return res.status(500).json({
        success: false,
        error: '로그인 처리 중 문제가 발생했습니다.',
      });
    }
  });

  // 1. New Order Placement API
  app.post('/api/orders', (req, res) => {
    try {
      const {
        customerName,
        phone,
        address,
        addressDetail,
        memo,
        optionId,
        optionName,
        quantity,
        price,
        shippingFee,
        paymentMethod,
      } = req.body;

      if (!customerName || !phone || !address) {
        return res.status(400).json({
          success: false,
          error: '성함, 연락처, 주소를 모두 입력해주세요.',
        });
      }

      const orders = getOrders();

      const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
      const randomSuffix = Math.floor(1000 + Math.random() * 9000);
      const orderNumber = `ORD-${dateStr}-${randomSuffix}`;
      const id = `ord_${Date.now()}_${randomSuffix}`;

      const validQuantity = Math.max(1, Number(quantity) || 1);
      const validPrice = Number(price) || 38500;
      const validShipping = Number(shippingFee) || 0;
      const totalPrice = validPrice * validQuantity + validShipping;

      const newOrder: OrderRecord = {
        id,
        orderNumber,
        createdAt: new Date().toISOString(),
        customerName: String(customerName).trim(),
        phone: String(phone).trim(),
        address: String(address).trim(),
        addressDetail: addressDetail ? String(addressDetail).trim() : '',
        memo: memo ? String(memo).trim() : '문 앞에 놓아주세요',
        productName: '[하루한잔] 국내산 50선 프리미엄 생식',
        optionId: optionId || 'box-1',
        optionName: optionName || '1박스 (30포 / 1개월분)',
        quantity: validQuantity,
        itemPrice: validPrice,
        shippingFee: validShipping,
        totalPrice,
        paymentMethod: paymentMethod || '신용/체크카드',
        status: '주문접수',
      };

      orders.unshift(newOrder);
      saveOrders(orders);

      console.log(`[REAL ORDER PLACED] ${newOrder.orderNumber} by ${newOrder.customerName} (${newOrder.phone}) - ${newOrder.totalPrice}원`);

      return res.status(201).json({
        success: true,
        order: newOrder,
        message: '주문이 성공적으로 접수되었습니다.',
      });
    } catch (err: any) {
      console.error('Order creation error:', err);
      return res.status(500).json({
        success: false,
        error: '주문 처리 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
      });
    }
  });

  // 2. Fetch all orders (Admin / Store Management)
  app.get('/api/orders', (req, res) => {
    try {
      const orders = getOrders();
      return res.json({ success: true, orders });
    } catch (err) {
      return res.status(500).json({ success: false, error: '주문 목록 조회 실패' });
    }
  });

  // 3. Customer Order Lookup by Phone
  app.get('/api/orders/lookup', (req, res) => {
    try {
      const rawPhone = String(req.query.phone || '').replace(/[^0-9]/g, '');
      if (!rawPhone || rawPhone.length < 7) {
        return res.status(400).json({
          success: false,
          error: '올바른 휴대폰 번호를 입력해주세요.',
        });
      }

      const orders = getOrders();
      const matched = orders.filter((o) => {
        const clean = o.phone.replace(/[^0-9]/g, '');
        return clean.includes(rawPhone) || rawPhone.includes(clean);
      });

      return res.json({ success: true, orders: matched });
    } catch (err) {
      return res.status(500).json({ success: false, error: '주문 조회 실패' });
    }
  });

  // 4. Update Order Status
  app.patch('/api/orders/:id/status', (req, res) => {
    try {
      const { id } = req.params;
      const { status, trackingNumber } = req.body;
      const orders = getOrders();

      const target = orders.find((o) => o.id === id);
      if (!target) {
        return res.status(404).json({ success: false, error: '주문을 찾을 수 없습니다.' });
      }

      if (status) target.status = status;
      if (trackingNumber !== undefined) target.trackingNumber = trackingNumber;

      saveOrders(orders);
      return res.json({ success: true, order: target });
    } catch (err) {
      return res.status(500).json({ success: false, error: '상태 변경 실패' });
    }
  });

  // 5. Delete Order
  app.delete('/api/orders/:id', (req, res) => {
    try {
      const { id } = req.params;
      let orders = getOrders();
      const beforeCount = orders.length;
      orders = orders.filter((o) => o.id !== id);

      if (orders.length === beforeCount) {
        return res.status(404).json({ success: false, error: '주문을 찾을 수 없습니다.' });
      }

      saveOrders(orders);
      return res.json({ success: true, message: '주문이 삭제되었습니다.' });
    } catch (err) {
      return res.status(500).json({ success: false, error: '주문 삭제 실패' });
    }
  });

  // Vite middleware in dev or static files in production
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
