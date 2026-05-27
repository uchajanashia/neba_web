import { Bracelet } from '../core/models/bracelet.model';

export const BRACELETS: Bracelet[] = [
  {
    id: 'bracelet-001',
    slug: 'pesvi',
    name: 'უსასრულობა',
    cardImage: '/assets/images/bracelets/pesvi/hero.jpg',
    nameEn: 'Usasruloba - Infinity',
    tagline: 'Handcrafted silver bracelet built from the infinity ornament.',
    shortDescription:
      'The infinity lines fold into a cross at the center — two timeless symbols in one form.',
    emotionalDescription: 'A mark of permanence and connection.',
    story:
      'The infinity ornament closes into a cross at its center — two timeless symbols, one silver form.',
    content: {
      ka: {
        tagline: 'ხელნაკეთი ვერცხლის სამაჯური უსასრულობის ორნამენტით.',
        shortDescription:
          'უსასრულობის ხაზებიდან აგებული სამაჯური — ცენტრში ჯვრის ფორმა იკვრება.',
        emotionalDescription: 'მუდმივობისა და კავშირის ნიშანი.',
        story:
          'უსასრულობის ორნამენტი იკვრება ჯვრად — ორი მუდმივი სიმბოლო ერთ ვერცხლის ფორმაში.',
      },
      en: {
        tagline: 'Handcrafted silver bracelet built from the infinity ornament.',
        shortDescription:
          'The infinity lines fold into a cross at the center — two timeless symbols in one form.',
        emotionalDescription: 'A mark of permanence and connection.',
        story:
          'The infinity ornament closes into a cross at its center — two timeless symbols, one silver form.',
      },
      ru: {
        tagline: 'Серебряный браслет ручной работы из орнамента бесконечности.',
        shortDescription:
          'Линии бесконечности замыкаются в крест в центре — два вечных символа в одной форме.',
        emotionalDescription: 'Знак постоянства и связи.',
        story:
          'Орнамент бесконечности складывается в крест — два вечных символа в одной серебряной форме.',
      },
    },
    materials: 'both',
    sizes: ['small', 'medium', 'large', 'custom'],
    images: [
      {
        src: '/assets/images/bracelets/pesvi/1%20(1).jpg',
        alt: 'ფესვი bracelet photo 1',
        role: 'hero',
      },
      {
        src: '/assets/images/bracelets/pesvi/1%20(2).jpg',
        alt: 'ფესვი bracelet photo 2',
        role: 'on-wrist',
      },
      {
        src: '/assets/images/bracelets/pesvi/1%20(3).jpg',
        alt: 'ფესვი bracelet photo 3',
        role: 'detail',
      },
      {
        src: '/assets/images/bracelets/pesvi/1%20(4).jpg',
        alt: 'ფესვი bracelet photo 4',
        role: 'back',
      },
      {
        src: '/assets/images/bracelets/pesvi/1%20(5).jpg',
        alt: 'ფესვი bracelet photo 5',
        role: 'material',
      },
    ],
    variantImages: [
      {
        key: { size: 'M', strap: 'leather-brown', contentSize: 'large' },
        src: '/assets/images/bracelets/pesvi/1%20(1).jpg',
        alt: 'ფესვი - Brown leather strap, large silver piece, M size',
      },
      {
        key: { size: 'M', strap: 'leather-black', contentSize: 'large' },
        src: '/assets/images/bracelets/pesvi/1%20(2).jpg',
        alt: 'ფესვი - Black leather strap, large silver piece, M size',
      },
      {
        key: { size: 'M', strap: 'rubber', contentSize: 'large' },
        src: '/assets/images/bracelets/pesvi/1%20(3).jpg',
        alt: 'ფესვი - Rubber strap, large silver piece, M size',
      },
      {
        key: { size: 'M', strap: 'leather-brown', contentSize: 'small' },
        src: '/assets/images/bracelets/pesvi/1%20(4).jpg',
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
    cardImage: '/assets/images/bracelets/mcveli/hero.jpg',
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
        src: '/assets/images/bracelets/mcveli/1%20(1).jpg',
        alt: 'მცველი bracelet photo 1',
        role: 'hero',
      },
      {
        src: '/assets/images/bracelets/mcveli/1%20(2).jpg',
        alt: 'მცველი bracelet photo 2',
        role: 'on-wrist',
      },
      {
        src: '/assets/images/bracelets/mcveli/1%20(3).jpg',
        alt: 'მცველი bracelet photo 3',
        role: 'detail',
      },
      {
        src: '/assets/images/bracelets/mcveli/1%20(4).jpg',
        alt: 'მცველი bracelet photo 4',
        role: 'back',
      },
      {
        src: '/assets/images/bracelets/mcveli/1%20(5).jpg',
        alt: 'მცველი bracelet photo 5',
        role: 'material',
      },
    ],
    variantImages: [
      {
        key: { size: 'M', strap: 'leather-brown', contentSize: 'large' },
        src: '/assets/images/bracelets/mcveli/1%20(1).jpg',
        alt: 'მცველი - Brown leather strap, large silver piece, M size',
      },
      {
        key: { size: 'M', strap: 'leather-black', contentSize: 'large' },
        src: '/assets/images/bracelets/mcveli/1%20(2).jpg',
        alt: 'მცველი - Black leather strap, large silver piece, M size',
      },
      {
        key: { size: 'M', strap: 'rubber', contentSize: 'large' },
        src: '/assets/images/bracelets/mcveli/1%20(3).jpg',
        alt: 'მცველი - Rubber strap, large silver piece, M size',
      },
      {
        key: { size: 'M', strap: 'leather-brown', contentSize: 'small' },
        src: '/assets/images/bracelets/mcveli/1%20(4).jpg',
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
    cardImage: '/assets/images/bracelets/mtis-kvali/hero.jpg',
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
        src: '/assets/images/bracelets/mtis-kvali/1%20(1).jpg',
        alt: 'მთის კვალი bracelet photo 1',
        role: 'hero',
      },
      {
        src: '/assets/images/bracelets/mtis-kvali/1%20(2).jpg',
        alt: 'მთის კვალი bracelet photo 2',
        role: 'on-wrist',
      },
      {
        src: '/assets/images/bracelets/mtis-kvali/1%20(3).jpg',
        alt: 'მთის კვალი bracelet photo 3',
        role: 'detail',
      },
      {
        src: '/assets/images/bracelets/mtis-kvali/1%20(4).jpg',
        alt: 'მთის კვალი bracelet photo 4',
        role: 'back',
      },
      {
        src: '/assets/images/bracelets/mtis-kvali/1%20(5).jpg',
        alt: 'მთის კვალი bracelet photo 5',
        role: 'material',
      },
    ],
    variantImages: [
      {
        key: { size: 'M', strap: 'leather-brown', contentSize: 'large' },
        src: '/assets/images/bracelets/mtis-kvali/1%20(1).jpg',
        alt: 'მთის კვალი - Brown leather strap, large silver piece, M size',
      },
      {
        key: { size: 'M', strap: 'leather-black', contentSize: 'large' },
        src: '/assets/images/bracelets/mtis-kvali/1%20(2).jpg',
        alt: 'მთის კვალი - Black leather strap, large silver piece, M size',
      },
      {
        key: { size: 'M', strap: 'rubber', contentSize: 'large' },
        src: '/assets/images/bracelets/mtis-kvali/1%20(3).jpg',
        alt: 'მთის კვალი - Rubber strap, large silver piece, M size',
      },
      {
        key: { size: 'M', strap: 'leather-brown', contentSize: 'small' },
        src: '/assets/images/bracelets/mtis-kvali/1%20(4).jpg',
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
