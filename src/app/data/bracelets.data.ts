import { Bracelet } from '../core/models/bracelet.model';

export const BRACELETS: Bracelet[] = [
  {
    id: 'bracelet-001',
    slug: 'pesvi',
    name: 'ფესვი',
    nameEn: 'Pesvi - Root',
    tagline: 'Handcrafted silver bracelet inspired by Georgian ornamental lines.',
    shortDescription:
      'A bracelet born from the ornamental language of old Georgian stone carvings. Its form expresses rootedness, origin, and connection.',
    emotionalDescription:
      'Made for those who carry tradition not as memory, but as presence.',
    story:
      '"Root" is inspired by the lines found in ancient Georgian stone reliefs and hand-carved artifacts. Its form speaks of solidity, origin, and a deep connection to the earth, tradition, and one\'s own path. Each curve was drawn from the visual archive of Georgian craftsmanship and translated into silver.',
    content: {
      ka: {
        tagline: 'ხელნაკეთი ვერცხლის სამაჯური ქართული ორნამენტული ხაზებით.',
        shortDescription:
          'სამაჯური, რომელიც ძველი ქართული ქვის კვეთის ორნამენტულ ენას ეყრდნობა. მისი ფორმა ფესვებს, საწყისს და კავშირს გამოხატავს.',
        emotionalDescription:
          'მათთვის, ვინც ტრადიციას არა როგორც მოგონებას, არამედ როგორც ცოცხალ ყოფნას ატარებს.',
        story:
          '"ფესვი" შთაგონებულია ძველ ქართულ ქვის რელიეფებსა და ხელით ნაკეთ არტეფაქტებში ნაპოვნი ხაზებით. მისი ფორმა სიმყარეზე, საწყისზე და მიწასთან, ტრადიციასთან და საკუთარ გზასთან ღრმა კავშირზე საუბრობს. ყოველი მრუდი ქართული ხელობის ვიზუალური არქივიდან მოდის და ვერცხლშია გადატანილი.',
      },
      en: {
        tagline: 'Handcrafted silver bracelet inspired by Georgian ornamental lines.',
        shortDescription:
          'A bracelet born from the ornamental language of old Georgian stone carvings. Its form expresses rootedness, origin, and connection.',
        emotionalDescription:
          'Made for those who carry tradition not as memory, but as presence.',
        story:
          '"Root" is inspired by the lines found in ancient Georgian stone reliefs and hand-carved artifacts. Its form speaks of solidity, origin, and a deep connection to the earth, tradition, and one\'s own path. Each curve was drawn from the visual archive of Georgian craftsmanship and translated into silver.',
      },
      ru: {
        tagline:
          'Серебряный браслет ручной работы, вдохновлённый грузинскими орнаментальными линиями.',
        shortDescription:
          'Браслет, рождённый из орнаментального языка старинной грузинской каменной резьбы. Его форма говорит о корнях, начале и связи.',
        emotionalDescription:
          'Создан для тех, кто несёт традицию не как память, а как присутствие.',
        story:
          '"Корень" вдохновлён линиями древних грузинских каменных рельефов и ручных артефактов. Его форма говорит о прочности, истоке и глубокой связи с землёй, традицией и собственным путём. Каждый изгиб взят из визуального архива грузинского мастерства и переведён в серебро.',
      },
    },
    materials: 'both',
    sizes: ['small', 'medium', 'large', 'custom'],
    images: [
      {
        src: '/assets/images/bracelets/pesvi/hero.jpg',
        alt: 'ფესვი handcrafted silver bracelet with Georgian ornamental design',
        role: 'hero',
      },
      {
        src: '/assets/images/bracelets/pesvi/on-wrist.jpg',
        alt: 'ფესვი silver bracelet worn on wrist',
        role: 'on-wrist',
      },
      {
        src: '/assets/images/bracelets/pesvi/detail.jpg',
        alt: 'Close-up silver ornament detail of ფესვი bracelet',
        role: 'detail',
      },
      {
        src: '/assets/images/bracelets/pesvi/back.jpg',
        alt: 'Reverse side of ფესვი bracelet',
        role: 'back',
      },
      {
        src: '/assets/images/bracelets/pesvi/material.jpg',
        alt: 'Leather strap detail of ფესვი bracelet',
        role: 'material',
      },
    ],
    variantImages: [
      {
        key: { size: 'M', strap: 'leather-brown', contentSize: 'large' },
        src: '/assets/images/bracelets/pesvi/hero.jpg',
        alt: 'ფესვი - Brown leather strap, large silver piece, M size',
      },
      {
        key: { size: 'M', strap: 'leather-black', contentSize: 'large' },
        src: '/assets/images/bracelets/pesvi/on-wrist.jpg',
        alt: 'ფესვი - Black leather strap, large silver piece, M size',
      },
      {
        key: { size: 'M', strap: 'rubber', contentSize: 'large' },
        src: '/assets/images/bracelets/pesvi/detail.jpg',
        alt: 'ფესვი - Rubber strap, large silver piece, M size',
      },
      {
        key: { size: 'M', strap: 'leather-brown', contentSize: 'small' },
        src: '/assets/images/bracelets/pesvi/back.jpg',
        alt: 'ფესვი - Brown leather strap, small silver piece, M size',
      },
    ],
    details: {
      material: 'Sterling Silver',
      strap: 'Leather or Rubber',
      sizing: 'Small / Medium / Large / Custom',
      making: 'Handcrafted',
      style: 'Georgian Ornamental',
      order: 'Messenger / Instagram',
    },
    featured: true,
    order: 1,
    relatedSlugs: ['mcveli', 'mtis-kvali'],
  },
  {
    id: 'bracelet-002',
    slug: 'mcveli',
    name: 'მცველი',
    nameEn: 'Mcveli - Guardian',
    tagline: 'Symbolic form with old Georgian character and a strong visual edge.',
    shortDescription:
      'The Guardian carries the visual weight of old Georgian protective symbols. Its lines are decisive, its presence unmistakable.',
    emotionalDescription:
      'A bracelet for those who wear their identity with quiet, certain strength.',
    story:
      '"Guardian" draws from the protective symbolism embedded in Georgian visual tradition - crosses, shields, and border ornaments carved in stone and wood across centuries. The silver element carries the form of a guardian: bold, upright, and uncompromising in its geometry.',
    content: {
      ka: {
        tagline: 'სიმბოლური ფორმა ძველი ქართული ხასიათით და ძლიერი ვიზუალური ხაზით.',
        shortDescription:
          'მცველი ატარებს ძველი ქართული დამცავი სიმბოლოების ვიზუალურ ძალას. მისი ხაზები მკაფიოა და მისი ყოფნა შეუმჩნეველი არ რჩება.',
        emotionalDescription:
          'სამაჯური მათთვის, ვინც თავის იდენტობას მშვიდი და დარწმუნებული ძალით ატარებს.',
        story:
          '"მცველი" შთაგონებულია ქართულ ვიზუალურ ტრადიციაში ჩადებული დამცავი სიმბოლიკით - ჯვრებით, ფარებით და საზღვრის ორნამენტებით, რომლებიც საუკუნეების განმავლობაში ქვასა და ხეში იკვეთებოდა. ვერცხლის ელემენტი მცველის ფორმას ატარებს: გამოკვეთილს, მტკიცეს და გეომეტრიაში შეუპოვარს.',
      },
      en: {
        tagline: 'Symbolic form with old Georgian character and a strong visual edge.',
        shortDescription:
          'The Guardian carries the visual weight of old Georgian protective symbols. Its lines are decisive, its presence unmistakable.',
        emotionalDescription:
          'A bracelet for those who wear their identity with quiet, certain strength.',
        story:
          '"Guardian" draws from the protective symbolism embedded in Georgian visual tradition - crosses, shields, and border ornaments carved in stone and wood across centuries. The silver element carries the form of a guardian: bold, upright, and uncompromising in its geometry.',
      },
      ru: {
        tagline:
          'Символическая форма со старым грузинским характером и сильной визуальной линией.',
        shortDescription:
          'Guardian несёт визуальную силу старинных грузинских защитных символов. Его линии решительны, а присутствие невозможно не заметить.',
        emotionalDescription:
          'Браслет для тех, кто носит свою идентичность спокойно и уверенно.',
        story:
          '"Guardian" обращается к защитной символике грузинской визуальной традиции - крестам, щитам и пограничным орнаментам, веками вырезанным в камне и дереве. Серебряный элемент несёт форму хранителя: смелую, прямую и бескомпромиссную в геометрии.',
      },
    },
    materials: 'both',
    sizes: ['small', 'medium', 'large', 'custom'],
    images: [
      {
        src: '/assets/images/bracelets/mcveli/hero.jpg',
        alt: 'მცველი Guardian silver bracelet with strong Georgian ornamental form',
        role: 'hero',
      },
      {
        src: '/assets/images/bracelets/mcveli/on-wrist.jpg',
        alt: 'მცველი silver bracelet worn on wrist',
        role: 'on-wrist',
      },
      {
        src: '/assets/images/bracelets/mcveli/detail.jpg',
        alt: 'Silver detail close-up of მცველი bracelet',
        role: 'detail',
      },
      {
        src: '/assets/images/bracelets/mcveli/back.jpg',
        alt: 'Back of მცველი bracelet',
        role: 'back',
      },
      {
        src: '/assets/images/bracelets/mcveli/material.jpg',
        alt: 'Rubber strap detail of მცველი bracelet',
        role: 'material',
      },
    ],
    variantImages: [
      {
        key: { size: 'M', strap: 'leather-brown', contentSize: 'large' },
        src: '/assets/images/bracelets/mcveli/hero.jpg',
        alt: 'მცველი - Brown leather strap, large silver piece, M size',
      },
      {
        key: { size: 'M', strap: 'leather-black', contentSize: 'large' },
        src: '/assets/images/bracelets/mcveli/on-wrist.jpg',
        alt: 'მცველი - Black leather strap, large silver piece, M size',
      },
      {
        key: { size: 'M', strap: 'rubber', contentSize: 'large' },
        src: '/assets/images/bracelets/mcveli/detail.jpg',
        alt: 'მცველი - Rubber strap, large silver piece, M size',
      },
      {
        key: { size: 'M', strap: 'leather-brown', contentSize: 'small' },
        src: '/assets/images/bracelets/mcveli/back.jpg',
        alt: 'მცველი - Brown leather strap, small silver piece, M size',
      },
    ],
    details: {
      material: 'Sterling Silver',
      strap: 'Leather or Rubber',
      sizing: 'Small / Medium / Large / Custom',
      making: 'Handcrafted',
      style: 'Georgian Ornamental',
      order: 'Messenger / Instagram',
    },
    featured: true,
    order: 2,
    relatedSlugs: ['pesvi', 'mtis-kvali'],
  },
  {
    id: 'bracelet-003',
    slug: 'mtis-kvali',
    name: 'მთის კვალი',
    nameEn: "Mtis Kvali - Mountain's Trace",
    tagline: 'A bracelet inspired by nature, stone, and the silver light of mountains.',
    shortDescription:
      "The Mountain's Trace translates the textures of Georgian highland stone and sky into a wearable ornament. Raw, honest, and quietly beautiful.",
    emotionalDescription:
      'For those who find meaning in the landscape - in the weight of stone and the clarity of high air.',
    story:
      '"Mountain\'s Trace" is shaped by Georgia\'s Caucasian landscape: the fractured geometry of rock faces, the worn paths of ancient trails, the light that moves across stone at dusk. The silver surface captures that interplay of light and texture, making each piece feel like a fragment of the mountain itself.',
    content: {
      ka: {
        tagline:
          'სამაჯური, რომელიც ბუნებით, ქვით და მთის ვერცხლისფერი სინათლით არის შთაგონებული.',
        shortDescription:
          'მთის კვალი ქართული მთის ქვისა და ცის ტექსტურებს ტარებად ორნამენტად აქცევს. ბუნებრივი, გულწრფელი და მშვიდად ლამაზი.',
        emotionalDescription:
          'მათთვის, ვინც მნიშვნელობას პეიზაჟში პოულობს - ქვის სიმძიმესა და მაღალი ჰაერის სისუფთავეში.',
        story:
          '"მთის კვალი" საქართველოს კავკასიური ლანდშაფტით არის შთაგონებული: კლდის გატეხილი გეომეტრიით, ძველი ბილიკების ნაკვალევით და სინათლით, რომელიც შებინდებისას ქვაზე მოძრაობს. ვერცხლის ზედაპირი ამ სინათლისა და ტექსტურის ურთიერთობას იჭერს, რის გამოც თითოეული ნაწილი მთის ფრაგმენტს ჰგავს.',
      },
      en: {
        tagline: 'A bracelet inspired by nature, stone, and the silver light of mountains.',
        shortDescription:
          "The Mountain's Trace translates the textures of Georgian highland stone and sky into a wearable ornament. Raw, honest, and quietly beautiful.",
        emotionalDescription:
          'For those who find meaning in the landscape - in the weight of stone and the clarity of high air.',
        story:
          '"Mountain\'s Trace" is shaped by Georgia\'s Caucasian landscape: the fractured geometry of rock faces, the worn paths of ancient trails, the light that moves across stone at dusk. The silver surface captures that interplay of light and texture, making each piece feel like a fragment of the mountain itself.',
      },
      ru: {
        tagline: 'Браслет, вдохновлённый природой, камнем и серебристым светом гор.',
        shortDescription:
          'Mountain\'s Trace переводит текстуры грузинского высокогорного камня и неба в носимый орнамент. Сырой, честный и тихо красивый.',
        emotionalDescription:
          'Для тех, кто находит смысл в пейзаже - в тяжести камня и ясности горного воздуха.',
        story:
          '"Mountain\'s Trace" сформирован кавказским ландшафтом Грузии: ломаной геометрией скал, следами древних троп и светом, движущимся по камню в сумерках. Серебряная поверхность ловит эту игру света и текстуры, поэтому каждое изделие ощущается как фрагмент самой горы.',
      },
    },
    materials: 'both',
    sizes: ['small', 'medium', 'large', 'custom'],
    images: [
      {
        src: '/assets/images/bracelets/mtis-kvali/hero.jpg',
        alt: "მთის კვალი Mountain's Trace silver bracelet inspired by Georgian highland landscape",
        role: 'hero',
      },
      {
        src: '/assets/images/bracelets/mtis-kvali/on-wrist.jpg',
        alt: 'მთის კვალი silver bracelet worn on wrist',
        role: 'on-wrist',
      },
      {
        src: '/assets/images/bracelets/mtis-kvali/detail.jpg',
        alt: 'Silver texture detail of მთის კვალი bracelet',
        role: 'detail',
      },
      {
        src: '/assets/images/bracelets/mtis-kvali/back.jpg',
        alt: 'Back of მთის კვალი bracelet',
        role: 'back',
      },
      {
        src: '/assets/images/bracelets/mtis-kvali/material.jpg',
        alt: 'Leather strap detail of მთის კვალი bracelet',
        role: 'material',
      },
    ],
    variantImages: [
      {
        key: { size: 'M', strap: 'leather-brown', contentSize: 'large' },
        src: '/assets/images/bracelets/mtis-kvali/hero.jpg',
        alt: 'მთის კვალი - Brown leather strap, large silver piece, M size',
      },
      {
        key: { size: 'M', strap: 'leather-black', contentSize: 'large' },
        src: '/assets/images/bracelets/mtis-kvali/on-wrist.jpg',
        alt: 'მთის კვალი - Black leather strap, large silver piece, M size',
      },
      {
        key: { size: 'M', strap: 'rubber', contentSize: 'large' },
        src: '/assets/images/bracelets/mtis-kvali/detail.jpg',
        alt: 'მთის კვალი - Rubber strap, large silver piece, M size',
      },
      {
        key: { size: 'M', strap: 'leather-brown', contentSize: 'small' },
        src: '/assets/images/bracelets/mtis-kvali/back.jpg',
        alt: 'მთის კვალი - Brown leather strap, small silver piece, M size',
      },
    ],
    details: {
      material: 'Sterling Silver',
      strap: 'Leather or Rubber',
      sizing: 'Small / Medium / Large / Custom',
      making: 'Handcrafted',
      style: 'Georgian Mountain-inspired',
      order: 'Messenger / Instagram',
    },
    featured: true,
    order: 3,
    relatedSlugs: ['pesvi', 'mcveli'],
  },
];

export const FEATURED_BRACELETS = BRACELETS.filter((bracelet) => bracelet.featured);

export function getBraceletBySlug(slug: string): Bracelet | undefined {
  return BRACELETS.find((bracelet) => bracelet.slug === slug);
}

export function getRelatedBracelets(bracelet: Bracelet): Bracelet[] {
  return bracelet.relatedSlugs
    .map((slug) => getBraceletBySlug(slug))
    .filter((item): item is Bracelet => item !== undefined);
}
