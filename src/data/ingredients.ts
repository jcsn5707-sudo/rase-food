export interface IngredientCategory {
  title: string;
  count: number;
  description: string;
  items: { name: string; origin: string; icon: string }[];
}

export const INGREDIENTS_DATA: IngredientCategory[] = [
  {
    title: '자연 통곡물류',
    count: 15,
    description: '100% 국내에서 자란 든든하고 고소한 곡물',
    items: [
      { name: '현미', origin: '국내산 100%', icon: '🌾' },
      { name: '보리', origin: '국내산 100%', icon: '🌾' },
      { name: '흑미', origin: '국내산 100%', icon: '🌾' },
      { name: '찹쌀현미', origin: '국내산 100%', icon: '🌾' },
      { name: '백태(대두)', origin: '국내산 100%', icon: '🫘' },
      { name: '서리태(검은콩)', origin: '국내산 100%', icon: '🫘' },
      { name: '쥐눈이콩', origin: '국내산 100%', icon: '🫘' },
      { name: '수수', origin: '국내산 100%', icon: '🌾' },
      { name: '조', origin: '국내산 100%', icon: '🌾' },
      { name: '기장', origin: '국내산 100%', icon: '🌾' },
      { name: '율무', origin: '국내산 100%', icon: '🌾' },
      { name: '귀리', origin: '국내산 100%', icon: '🌾' },
      { name: '메밀', origin: '국내산 100%', icon: '🌾' },
      { name: '녹두', origin: '국내산 100%', icon: '🫘' },
      { name: '팥', origin: '국내산 100%', icon: '🫘' },
    ],
  },
  {
    title: '신선 녹황색 채소류',
    count: 15,
    description: '밭의 싱그러움을 그대로 담은 채소',
    items: [
      { name: '케일', origin: '국내산 100%', icon: '🥬' },
      { name: '시금치', origin: '국내산 100%', icon: '🥬' },
      { name: '신선초', origin: '국내산 100%', icon: '🌿' },
      { name: '브로콜리', origin: '국내산 100%', icon: '🥦' },
      { name: '양배추', origin: '국내산 100%', icon: '🥬' },
      { name: '당근', origin: '국내산 100%', icon: '🥕' },
      { name: '단호박', origin: '국내산 100%', icon: '🎃' },
      { name: '토마토', origin: '국내산 100%', icon: '🍅' },
      { name: '샐러리', origin: '국내산 100%', icon: '🌱' },
      { name: '미나리', origin: '국내산 100%', icon: '🌿' },
      { name: '돌미나리', origin: '국내산 100%', icon: '🌿' },
      { name: '무청(시래기)', origin: '국내산 100%', icon: '🥬' },
      { name: '파슬리', origin: '국내산 100%', icon: '🌿' },
      { name: '깻잎', origin: '국내산 100%', icon: '🍃' },
      { name: '쑥', origin: '국내산 100%', icon: '🌿' },
    ],
  },
  {
    title: '뿌리채소 및 버섯·해조류',
    count: 12,
    description: '땅과 바다의 깊은 기운을 품은 자연 원료',
    items: [
      { name: '더덕', origin: '국내산 100%', icon: '🪵' },
      { name: '도라지', origin: '국내산 100%', icon: '🪵' },
      { name: '우엉', origin: '국내산 100%', icon: '🪵' },
      { name: '연근', origin: '국내산 100%', icon: '🥔' },
      { name: '마', origin: '국내산 100%', icon: '🥔' },
      { name: '표고버섯', origin: '국내산 100%', icon: '🍄' },
      { name: '느타리버섯', origin: '국내산 100%', icon: '🍄' },
      { name: '목이버섯', origin: '국내산 100%', icon: '🍄' },
      { name: '팽이버섯', origin: '국내산 100%', icon: '🍄' },
      { name: '다시마', origin: '국내산 100%', icon: '🌊' },
      { name: '미역', origin: '국내산 100%', icon: '🌊' },
      { name: '파래', origin: '국내산 100%', icon: '🌊' },
    ],
  },
  {
    title: '과일 및 씨앗류',
    count: 8,
    description: '자연스러운 풍미와 고소함을 더하는 원재료',
    items: [
      { name: '사과', origin: '국내산 100%', icon: '🍎' },
      { name: '배', origin: '국내산 100%', icon: '🍐' },
      { name: '감', origin: '국내산 100%', icon: '🍊' },
      { name: '유자', origin: '국내산 100%', icon: '🍋' },
      { name: '참깨', origin: '국내산 100%', icon: '✨' },
      { name: '들깨', origin: '국내산 100%', icon: '✨' },
      { name: '해바라기씨', origin: '국내산 100%', icon: '🌻' },
      { name: '호박씨', origin: '국내산 100%', icon: '🎃' },
    ],
  },
];
