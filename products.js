const products = [
  {
    id: 1,
    name: '실크 블렌드 트렌치',
    category: 'outer',
    categoryLabel: '아우터',
    price: 289000,
    originalPrice: 359000,
    badge: 'Sale',
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80',
      'https://images.unsplash.com/photo-1539533018447-63fcce267608?w=800&q=80',
      'https://images.unsplash.com/photo-1594938298600-c8148c4dae35?w=800&q=80',
    ],
    description: '고급 실크와 면을 블렌드한 클래식 트렌치 코트. 가볍고 부드러운 착용감으로 봄·가을 시즌에 완벽합니다.',
    material: '실크 30%, 면 70%',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['베이지', '카멜'],
    featured: true,
  },
  {
    id: 2,
    name: '캐시미어 니트 가디건',
    category: 'outer',
    categoryLabel: '아우터',
    price: 198000,
    badge: 'New',
    image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&q=80',
      'https://images.unsplash.com/photo-1564257631407-3deb25daff8d?w=800&q=80',
    ],
    description: '프리미엄 캐시미어 혼방 소재의 니트 가디건. 은은한 광택과 부드러운 터치가 특징입니다.',
    material: '캐시미어 50%, 울 50%',
    sizes: ['S', 'M', 'L'],
    colors: ['아이보리', '그레이', '블랙'],
    featured: true,
  },
  {
    id: 3,
    name: '린넨 셔츠 블라우스',
    category: 'top',
    categoryLabel: '탑',
    price: 89000,
    badge: 'New',
    image: 'https://images.unsplash.com/photo-1564257631407-3deb25daff8d?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1564257631407-3deb25daff8d?w=800&q=80',
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80',
    ],
    description: '천연 리넨 소재의 오버핏 셔츠 블라우스. 통기성이 뛰어나 쾌적한 여름 스타일링에 적합합니다.',
    material: '린넨 100%',
    sizes: ['S', 'M', 'L'],
    colors: ['화이트', '스카이블루'],
    featured: true,
  },
  {
    id: 4,
    name: '미니멀 레더 토트',
    category: 'bag',
    categoryLabel: '백',
    price: 245000,
    image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&q=80',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80',
    ],
    description: '이탈리아산 베지터블 레더로 제작된 미니멀 토트백. 넉넉한 수납과 세련된 실루엣을 갖췄습니다.',
    material: '베지터블 레더',
    sizes: ['ONE'],
    colors: ['블랙', '브라운', '탠'],
  },
  {
    id: 5,
    name: '골드 체인 목걸이',
    category: 'acc',
    categoryLabel: '액세서리',
    price: 68000,
    badge: 'Best',
    image: 'https://images.unsplash.com/photo-1611591437281-460bf47d4b1c?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1611591437281-460bf47d4b1c?w=800&q=80',
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60904?w=800&q=80',
    ],
    description: '14K 골드 도금 체인 목걸이. 데일리룩부터 특별한 날까지 다양하게 연출할 수 있습니다.',
    material: '14K 골드 도금, 스테인리스',
    sizes: ['ONE'],
    colors: ['골드'],
  },
  {
    id: 6,
    name: '울 블렌드 롱 코트',
    category: 'outer',
    categoryLabel: '아우터',
    price: 398000,
    originalPrice: 450000,
    badge: 'Sale',
    image: 'https://images.unsplash.com/photo-1539533018447-63fcce267608?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1539533018447-63fcce267608?w=800&q=80',
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80',
    ],
    description: '울과 캐시미어를 블렌드한 롱 코트. 클래식한 더블 버튼 디자인으로 우아한 실루엣을 완성합니다.',
    material: '울 80%, 캐시미어 20%',
    sizes: ['S', 'M', 'L'],
    colors: ['차콜', '카멜'],
  },
  {
    id: 7,
    name: '실크 슬립 원피스',
    category: 'top',
    categoryLabel: '탑',
    price: 156000,
    badge: 'New',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059ce27a9?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1595777457583-95e059ce27a9?w=800&q=80',
      'https://images.unsplash.com/photo-1564257631407-3deb25daff8d?w=800&q=80',
    ],
    description: '고급 실크 원단의 슬립 원피스. 몸에 자연스럽게 흐르는 실루엣이 우아함을 더합니다.',
    material: '실크 100%',
    sizes: ['XS', 'S', 'M'],
    colors: ['샴페인', '블랙', '로즈'],
  },
  {
    id: 8,
    name: '스웨이드 크로스백',
    category: 'bag',
    categoryLabel: '백',
    price: 178000,
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80',
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=80',
    ],
    description: '부드러운 스웨이드 소재의 크로스백. 가벼운 무게와 실용적인 수납 공간을 제공합니다.',
    material: '스웨이드, 브라스 하드웨어',
    sizes: ['ONE'],
    colors: ['테라코타', '올리브', '블랙'],
  },
  {
    id: 9,
    name: '펄 이어링 세트',
    category: 'acc',
    categoryLabel: '액세서리',
    price: 52000,
    badge: 'Best',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60904?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60904?w=800&q=80',
      'https://images.unsplash.com/photo-1611591437281-460bf47d4b1c?w=800&q=80',
    ],
    description: '천연 담수 진주와 14K 골드 도금이 조화를 이루는 이어링 세트. 2종 구성입니다.',
    material: '담수 진주, 14K 골드 도금',
    sizes: ['ONE'],
    colors: ['화이트 펄'],
  },
  {
    id: 10,
    name: '오버사이즈 블레이저',
    category: 'outer',
    categoryLabel: '아우터',
    price: 268000,
    image: 'https://images.unsplash.com/photo-1594938298600-c8148c4dae35?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1594938298600-c8148c4dae35?w=800&q=80',
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80',
    ],
    description: '구조적인 실루엣의 오버사이즈 블레이저. 캐주얼과 포멀룩 모두에 어울리는 에센셜 아이템입니다.',
    material: '폴리에스터 65%, 레이온 35%',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['블랙', '네이비', '베이지'],
  },
  {
    id: 11,
    name: '코튼 티셔츠',
    category: 'top',
    categoryLabel: '탑',
    price: 45000,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80',
    ],
    description: '유기농 코튼 100% 기본 티셔츠. 부드러운 촉감과 내구성 있는 핏을 자랑합니다.',
    material: '유기농 코튼 100%',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['화이트', '블랙', '그레이', '네이비'],
  },
  {
    id: 12,
    name: '미니 숄더백',
    category: 'bag',
    categoryLabel: '백',
    price: 132000,
    badge: 'New',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=80',
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&q=80',
    ],
    description: '컴팩트한 사이즈의 미니 숄더백. 데일리룩에 포인트를 더하는 세련된 디자인입니다.',
    material: 'PU 레더',
    sizes: ['ONE'],
    colors: ['크림', '블랙', '로즈'],
  },
];

function getProductById(id) {
  return products.find(p => p.id === Number(id));
}

function formatPrice(price) {
  return '₩' + price.toLocaleString('ko-KR');
}

function getRelatedProducts(product, limit = 4) {
  return products
    .filter(p => p.id !== product.id && p.category === product.category)
    .slice(0, limit);
}

function getPriceRange() {
  const prices = products.map(p => p.price);
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  const step = 10000;

  return {
    min: Math.floor(min / step) * step,
    max: Math.ceil(max / step) * step,
    step,
  };
}
