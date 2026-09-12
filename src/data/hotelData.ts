import { Room, AmenityItem, ExperienceItem, GalleryImage } from '../types';

export const HOTEL_INFO = {
  name: 'Mewari Villa Hotel',
  subtitle: 'Luxury Heritage Stay in Udaipur',
  tagline: 'Where heritage meets the lake.',
  city: 'Udaipur, Rajasthan, India',
  address: 'Purohit Ka Khurra, Before Chandpole Parking, Udaipur, Rajasthan 313001, India',
  primaryPhone: '+91 9460447777',
  secondaryPhone: '+91 8619845277',
  whatsappNumber: '919460447777',
  email: 'info@mewarivilla.com',
  website: 'https://www.mewarivilla.com',
  checkIn: '12:00 PM',
  checkOut: '10:00 AM',
  parkingNote: 'Car parking available 200m away, before Chandpole Parking',
  googleMapsUrl: 'https://maps.google.com/?q=Mewari+Villa+Purohit+Ka+Khurra+Udaipur',
  googleMapsEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3628.1873099951664!2d73.6802874!3d24.5828453!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3967e564d2d480c1%3A0xb3574c8789d38c64!2sMewari%20Villa!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin',
};

// 100% REAL PHOTOGRAPHS FROM MEWARIVILLA.COM
export const REAL_HOTEL_IMAGES = {
  // Hero & Exterior
  heroExterior: 'https://www.mewarivilla.com/wp-content/uploads/2024/07/IMG-20230425-WA0006.jpg',
  lakeViewRooftop: 'https://www.mewarivilla.com/wp-content/uploads/2024/08/IMG_3812.jpg',
  propertyCourtyard: 'https://www.mewarivilla.com/wp-content/uploads/2024/12/Optimized-DW7A7236.jpg',
  heritageFacade: 'https://www.mewarivilla.com/wp-content/uploads/2024/11/IMG-20190504-WA0029.jpg',
  heritageArches: 'https://www.mewarivilla.com/wp-content/uploads/2024/11/IMG-20190504-WA0025.jpg',
  villaPicholaLake: 'https://www.mewarivilla.com/wp-content/uploads/2025/08/IMG_6584.jpg',

  // Rooms
  villaSuiteMain: 'https://www.mewarivilla.com/wp-content/uploads/2024/03/r1-1-scaled.jpg',
  villaSuiteDetail: 'https://www.mewarivilla.com/wp-content/uploads/2024/07/Villa-Suit-301-5-scaled-1.jpg',
  villaSuiteWindow: 'https://www.mewarivilla.com/wp-content/uploads/2024/03/R1-1-2-scaled.jpg',
  villaSuiteBath: 'https://www.mewarivilla.com/wp-content/uploads/2024/03/R3-5-1-scaled.jpg',
  villaSuiteSitting: 'https://www.mewarivilla.com/wp-content/uploads/2024/03/R3-4-1-scaled.jpg',

  superDeluxeLakeMain: 'https://www.mewarivilla.com/wp-content/uploads/2024/02/R7-2-scaled.jpg',
  superDeluxeLakeWindow: 'https://www.mewarivilla.com/wp-content/uploads/2024/03/R7-4-scaled.jpg',
  superDeluxeLakeBed: 'https://www.mewarivilla.com/wp-content/uploads/2024/03/R7-1-scaled.jpg',
  superDeluxeLakeBalcony: 'https://www.mewarivilla.com/wp-content/uploads/2024/03/R9-1-1-scaled.jpg',

  superDeluxeTripleMain: 'https://www.mewarivilla.com/wp-content/uploads/2024/07/R10-2-scaled.jpg',
  superDeluxeTripleSpace: 'https://www.mewarivilla.com/wp-content/uploads/2024/03/R10-1-scaled.jpg',
  superDeluxeTripleBeds: 'https://www.mewarivilla.com/wp-content/uploads/2024/03/R8-1-scaled.jpg',
  superDeluxeTripleBath: 'https://www.mewarivilla.com/wp-content/uploads/2024/03/R8-2-scaled.jpg',

  deluxeNonLakeMain: 'https://www.mewarivilla.com/wp-content/uploads/2024/02/R4-2-scaled.jpg',
  deluxeNonLakeInterior: 'https://www.mewarivilla.com/wp-content/uploads/2024/02/R4-1-scaled.jpg',
  deluxeNonLakeComfort: 'https://www.mewarivilla.com/wp-content/uploads/2024/02/R5-1-scaled.jpg',
  deluxeNonLakeTwin: 'https://www.mewarivilla.com/wp-content/uploads/2024/07/Delux-Double-Twin-AC-306-scaled-1.jpg',

  // Jalsa Restaurant
  jalsaFoodView: 'https://www.mewarivilla.com/wp-content/uploads/2025/01/Snapinsta.app_423211764_1363532347864459_450844377585156776_n_1080-1.jpg',
  jalsaRooftopSeating: 'https://www.mewarivilla.com/wp-content/uploads/2025/01/Snapinsta.app_427550561_2311833955680701_1391268676147864128_n_1080-1.jpg',
  jalsaLakeSunset: 'https://www.mewarivilla.com/wp-content/uploads/2024/07/IMG_20230423_194919-scaled.jpg',
  jalsaTableSetting: 'https://www.mewarivilla.com/wp-content/uploads/2025/05/Snapinsta.app_450048225_18055654954645659_1359924264245492610_n_1080-1.jpg',

  // Experiences & Udaipur
  lakeBoatRide: 'https://www.mewarivilla.com/wp-content/uploads/2024/07/Snapinsta.app_172561095_457961372202557_3832454611272493177_n_1080.jpg',
  royalPalaceUdaipur: 'https://www.mewarivilla.com/wp-content/uploads/2024/07/Snapinsta.app_167584584_277134223870309_3186697887748445580_n_1080.jpg',
  oldCityBazaar: 'https://www.mewarivilla.com/wp-content/uploads/2024/07/IMG-20231016-WA0015.jpg',
  lakeViewTwilight: 'https://www.mewarivilla.com/wp-content/uploads/2024/07/2024-03-29.jpg',

  // Interiors & Details
  interiorCorridor: 'https://www.mewarivilla.com/wp-content/uploads/2024/03/R2-1-1-scaled.jpg',
  interiorLobby: 'https://www.mewarivilla.com/wp-content/uploads/2024/03/R2-2-1-scaled.jpg',
  interiorBalcony: 'https://www.mewarivilla.com/wp-content/uploads/2024/03/R3-1-1-scaled.jpg',
  bathroomDetail: 'https://www.mewarivilla.com/wp-content/uploads/2024/03/R2-4-1-scaled.jpg',
};

export const ROOMS: Room[] = [
  {
    id: 'deluxe-non-lake-view',
    name: 'Deluxe Non Lake View',
    tagline: 'Quiet Heritage Charm & Traditional Comfort',
    startingPrice: '₹3,500',
    guestsRange: '1–5',
    description:
      'A peaceful sanctuary designed with authentic Rajasthani heritage aesthetics, handcrafted wooden appointments, and serene comfort in the old city quarters.',
    fullDetails:
      'Our Deluxe Non Lake View room offers a restful haven steeped in authentic Mewari character. Featuring hand-carved furnishings, plush king bedding, modern air conditioning, en-suite bathroom, and peaceful atmosphere away from the bustling streets.',
    occupancy: '1–5 Guests',
    bedType: '1 King Bed + Extra Bedding Available',
    view: 'Courtyard & Traditional Old City Lane',
    size: '220 sq. ft.',
    image: REAL_HOTEL_IMAGES.deluxeNonLakeMain,
    gallery: [
      REAL_HOTEL_IMAGES.deluxeNonLakeMain,
      REAL_HOTEL_IMAGES.deluxeNonLakeInterior,
      REAL_HOTEL_IMAGES.deluxeNonLakeComfort,
      REAL_HOTEL_IMAGES.deluxeNonLakeTwin,
    ],
    amenities: ['Air Conditioning', 'High-Speed Wi-Fi', 'King Bed', 'Room Service', 'Flat-screen TV', 'Safe', 'Hair Dryer', 'Luggage Storage'],
    highlights: ['Quiet Heritage Ambience', 'Handcrafted Accents', 'Complimentary Bottled Water', 'Daily Housekeeping'],
  },
  {
    id: 'super-deluxe-triple-sharing',
    name: 'Super Deluxe Triple Sharing',
    tagline: 'Spacious Heritage Accommodation for Families & Friends',
    startingPrice: '₹6,500',
    guestsRange: '1–4',
    description:
      'Generously proportioned room tailored for families and companions, combining royal Mewari architectural touches with modern convenience.',
    fullDetails:
      'Designed specifically for families and small groups traveling together. This spacious room features comfortable bedding arrangements, royal Rajasthani motifs, dedicated luggage storage, flat-screen entertainment, and prompt room service.',
    occupancy: '1–4 Guests',
    bedType: '1 King Bed + 1 Single Bed',
    view: 'Historic Cityscape & Street View',
    size: '310 sq. ft.',
    image: REAL_HOTEL_IMAGES.superDeluxeTripleMain,
    gallery: [
      REAL_HOTEL_IMAGES.superDeluxeTripleMain,
      REAL_HOTEL_IMAGES.superDeluxeTripleSpace,
      REAL_HOTEL_IMAGES.superDeluxeTripleBeds,
      REAL_HOTEL_IMAGES.superDeluxeTripleBath,
    ],
    amenities: ['Air Conditioning', 'High-Speed Wi-Fi', 'Triple Layout', 'Room Service', 'Flat-screen TV', 'Safe', 'Elevator Access', 'Towels & Toiletries'],
    highlights: ['Expansive Living Space', 'Family Friendly', 'Plush Linens', 'Luggage Space'],
  },
  {
    id: 'super-deluxe-lake-view',
    name: 'Super Deluxe Lake View',
    tagline: 'Direct Lake Pichola Panoramas from Traditional Jharokhas',
    startingPrice: '₹5,500',
    guestsRange: '1–4',
    description:
      'Wake up to sunlight shimmering across the waters of Lake Pichola. Features elegant jharokha arched windows and mesmerizing sunrise water views.',
    fullDetails:
      'Capturing the signature romance of Udaipur, the Super Deluxe Lake View room frames picturesque views of the lake waters and distant ghats. Watch traditional wooden boats glide past while unwinding in handcrafted Mewari royal comfort.',
    occupancy: '1–4 Guests',
    bedType: '1 Royal King Bed',
    view: 'Direct Lake Pichola & Ghat Panoramas',
    size: '290 sq. ft.',
    image: REAL_HOTEL_IMAGES.superDeluxeLakeMain,
    gallery: [
      REAL_HOTEL_IMAGES.superDeluxeLakeMain,
      REAL_HOTEL_IMAGES.superDeluxeLakeWindow,
      REAL_HOTEL_IMAGES.superDeluxeLakeBed,
      REAL_HOTEL_IMAGES.superDeluxeLakeBalcony,
    ],
    amenities: ['Lake View', 'Air Conditioning', 'High-Speed Wi-Fi', 'King Bed', 'Room Service', 'Flat-screen TV', 'Safe', 'Hair Dryer', 'Elevator Access'],
    highlights: ['Uninterrupted Lake Pichola Vista', 'Jharokha Window Nook', 'Sunrise & Golden Hour Views', 'Tea & Coffee Amenities'],
  },
  {
    id: 'villa-suite-lake-view',
    name: 'Villa Suite Lake View',
    tagline: 'The Pinnacle of Regal Hospitality & Lake Pichola Luxury',
    startingPrice: '₹7,000',
    guestsRange: '1–4',
    description:
      'The premier suite of Mewari Villa. Features an expansive lake-view terrace, master imperial king bed, marble-clad bathroom with rain shower, and regal sitting area.',
    fullDetails:
      'Our flagship Villa Suite Lake View offers an unforgettable Udaipur sanctuary. Unwind on your private lake-view terrace taking in panoramic vistas of Lake Pichola, the Monsoon Palace, and Aravali ridges. Fitted with marble-clad bath, rain shower, minibar, flat-screen TV, and dedicated concierge attention.',
    occupancy: '1–4 Guests',
    bedType: '1 Imperial King Bed',
    view: 'Panoramic Lake Pichola, Ghats & Aravali Hills',
    size: '450 sq. ft.',
    image: REAL_HOTEL_IMAGES.villaSuiteMain,
    gallery: [
      REAL_HOTEL_IMAGES.villaSuiteMain,
      REAL_HOTEL_IMAGES.villaSuiteDetail,
      REAL_HOTEL_IMAGES.villaSuiteWindow,
      REAL_HOTEL_IMAGES.villaSuiteBath,
      REAL_HOTEL_IMAGES.villaSuiteSitting,
    ],
    amenities: ['Lake-View Terrace', 'King Bed', 'Marble Bathroom', 'Rain Shower', 'Air Conditioning', 'High-Speed Wi-Fi', 'Flat-screen TV', 'Minibar', 'Room Service', 'Concierge Assistance'],
    highlights: ['Signature Lake-View Terrace', 'Marble-Clad Rain Shower', 'Breathtaking Sunset Horizon', 'Personalized Hospitality'],
  },
];

export const VILLA_SUITE_FEATURES = [
  'Lake-view terrace',
  'King-sized bed',
  'Marble-clad bathroom',
  'Rain shower',
  'Air conditioning',
  'High-speed Wi-Fi',
  'Flat-screen TV',
  'Minibar',
  'Room service',
  'Concierge assistance',
];

// Verified real amenities from existing website
export const AMENITIES: AmenityItem[] = [
  { id: 'wifi', name: 'Wi-Fi', description: 'Complimentary high-speed internet in all rooms and public spaces', iconName: 'Wifi' },
  { id: 'ac', name: 'Air Conditioning', description: 'Individual climate control for year-round cooling and warmth', iconName: 'Wind' },
  { id: 'bed', name: 'King Bed', description: 'Plush handcrafted royal mattresses with crisp heritage cotton linens', iconName: 'Bed' },
  { id: 'room-service', name: 'Room Service', description: 'Freshly prepared pure vegetarian delicacies delivered to your room', iconName: 'BellRing' },
  { id: 'restaurant', name: 'Restaurant', description: 'Jalsa rooftop restaurant offering pure vegetarian dining with lake views', iconName: 'Utensils' },
  { id: 'tv', name: 'TV', description: 'Flat-screen LED TVs with satellite and news channels', iconName: 'Tv' },
  { id: 'safe', name: 'Safe', description: 'In-room digital security safe for passports and valuables', iconName: 'ShieldCheck' },
  { id: 'elevator', name: 'Elevator', description: 'Convenient lift service connecting all guest room floors', iconName: 'ArrowUpDown' },
  { id: 'hair-dryer', name: 'Hair Dryer', description: 'Available in private bathrooms for guest grooming', iconName: 'Sparkles' },
  { id: 'towels', name: 'Towels', description: 'Plush fresh bath towels and premium heritage toiletries', iconName: 'CheckSquare' },
  { id: 'luggage', name: 'Luggage Storage', description: 'Secure luggage holding service for early check-ins and departures', iconName: 'Luggage' },
  { id: 'parking', name: 'Parking', description: 'Dedicated vehicle parking situated 200m away before Chandpole Parking', iconName: 'Car' },
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: 'lake-pichola',
    title: 'LAKE PICHOLA',
    subtitle: 'Boat rides and sunset moments.',
    description:
      'Glide across the mirror-like waters of Lake Pichola as amber hues silhouette the City Palace, Gangaur Ghat, and Jag Mandir. Private and shared boat charters are easily arranged steps from our hotel.',
    image: REAL_HOTEL_IMAGES.lakeBoatRide,
    tag: 'WATERFRONT',
    highlights: ['Sunset & twilight cruises', 'Gangaur Ghat & Chandpole proximity', 'Iconic palace panoramas'],
  },
  {
    id: 'royal-udaipur',
    title: 'ROYAL UDAIPUR',
    subtitle: 'Historic palaces, forts and architecture.',
    description:
      'Immerse in the grandeur of the City Palace complex, Bagore Ki Haveli museum and evening folk dance performances, and the hilltop Monsoon Palace (Sajjangarh) crowning the Aravali peaks.',
    image: REAL_HOTEL_IMAGES.royalPalaceUdaipur,
    tag: 'HERITAGE',
    highlights: ['City Palace (0.9 km)', 'Bagore Ki Haveli (800 m)', 'Sajjangarh Monsoon Palace'],
  },
  {
    id: 'local-life',
    title: 'LOCAL LIFE',
    subtitle: 'Explore the bazaars, streets and culture of Udaipur.',
    description:
      'Stroll through the narrow heritage lanes of old Udaipur. Discover block-printed fabrics, camel leather juttis, silver jewelry, and centuries-old Mewari miniature painting ateliers.',
    image: REAL_HOTEL_IMAGES.oldCityBazaar,
    tag: 'CULTURE & CRAFTS',
    highlights: ['Hathipole & Bada Bazaar', 'Traditional Mewari miniature art', 'Authentic street cuisine'],
  },
];

export const GALLERY_IMAGES: GalleryImage[] = [
  {
    id: 'g-hero-exterior',
    title: 'Mewari Villa Hotel Exterior',
    category: 'VILLA',
    image: REAL_HOTEL_IMAGES.heroExterior,
    caption: 'Mewari Villa Hotel overlooking the tranquil waters of Lake Pichola in Udaipur.',
  },
  {
    id: 'g-lake-view-1',
    title: 'Lake Pichola Vista from Rooftop',
    category: 'LAKE VIEW',
    image: REAL_HOTEL_IMAGES.lakeViewRooftop,
    caption: 'Breathtaking panoramic lake view across Udaipur from Mewari Villa rooftop terrace.',
  },
  {
    id: 'g-jalsa-dining-1',
    title: 'Jalsa Rooftop Lake View Dining',
    category: 'JALSA',
    image: REAL_HOTEL_IMAGES.jalsaFoodView,
    caption: 'Pure vegetarian dining overlooking the serene waters of Lake Pichola at Jalsa Restaurant.',
  },
  {
    id: 'g-villa-suite-main',
    title: 'The Villa Suite',
    category: 'ROOMS',
    image: REAL_HOTEL_IMAGES.villaSuiteMain,
    caption: 'Flagship Villa Suite Lake View with imperial king bed, handcrafted headboard and scenic lake vistas.',
  },
  {
    id: 'g-super-deluxe-lake',
    title: 'Super Deluxe Lake View Room',
    category: 'ROOMS',
    image: REAL_HOTEL_IMAGES.superDeluxeLakeMain,
    caption: 'Heritage jharokha windows framing the shimmering waters of Lake Pichola.',
  },
  {
    id: 'g-jalsa-sunset',
    title: 'Sunset Atmosphere at Jalsa',
    category: 'JALSA',
    image: REAL_HOTEL_IMAGES.jalsaLakeSunset,
    caption: 'Dusk settling over Lake Pichola and Aravali hills from Jalsa rooftop dining terrace.',
  },
  {
    id: 'g-super-deluxe-triple',
    title: 'Super Deluxe Triple Sharing',
    category: 'ROOMS',
    image: REAL_HOTEL_IMAGES.superDeluxeTripleMain,
    caption: 'Spacious accommodations thoughtfully styled for family and group comfort.',
  },
  {
    id: 'g-deluxe-non-lake',
    title: 'Deluxe Non Lake View Room',
    category: 'ROOMS',
    image: REAL_HOTEL_IMAGES.deluxeNonLakeMain,
    caption: 'Warm Rajasthani heritage appointments and peaceful old city alley charm.',
  },
  {
    id: 'g-villa-suite-detail',
    title: 'Villa Suite Regal Architecture',
    category: 'ROOMS',
    image: REAL_HOTEL_IMAGES.villaSuiteDetail,
    caption: 'Ornate Mewari design details and royal bedroom layout in the Villa Suite.',
  },
  {
    id: 'g-interiors-corridor',
    title: 'Heritage Corridors & Arches',
    category: 'INTERIORS',
    image: REAL_HOTEL_IMAGES.heritageArches,
    caption: 'Classic hand-carved Mewari stone arches and traditional courtyards.',
  },
  {
    id: 'g-udaipur-boat',
    title: 'Boat Rides on Lake Pichola',
    category: 'UDAIPUR',
    image: REAL_HOTEL_IMAGES.lakeBoatRide,
    caption: 'Traditional wooden boats gliding near Chandpole ghat and heritage palaces.',
  },
  {
    id: 'g-udaipur-citypalace',
    title: 'Royal Udaipur Heritage',
    category: 'UDAIPUR',
    image: REAL_HOTEL_IMAGES.royalPalaceUdaipur,
    caption: 'Magnificent City Palace and heritage architecture within 1 km of Mewari Villa.',
  },
  {
    id: 'g-jalsa-seating',
    title: 'Jalsa Open-Air Rooftop Tables',
    category: 'JALSA',
    image: REAL_HOTEL_IMAGES.jalsaRooftopSeating,
    caption: 'Open-air tables set for sunset pure vegetarian meals with Lake Pichola backdrop.',
  },
  {
    id: 'g-interiors-lobby',
    title: 'Hotel Lobby & Heritage Hallways',
    category: 'INTERIORS',
    image: REAL_HOTEL_IMAGES.interiorLobby,
    caption: 'Traditional Rajasthani stone patterns and warm ambient lighting inside Mewari Villa.',
  },
  {
    id: 'g-villa-arch',
    title: 'Villa Architecture & Sandstone',
    category: 'VILLA',
    image: REAL_HOTEL_IMAGES.propertyCourtyard,
    caption: 'Authentic Mewari facade reflecting centuries of royal Udaipur craftsmanship.',
  },
  {
    id: 'g-lake-view-pichola',
    title: 'Lake Pichola at Dusk',
    category: 'LAKE VIEW',
    image: REAL_HOTEL_IMAGES.villaPicholaLake,
    caption: 'Peaceful twilight over Lake Pichola as palace lights begin to shimmer.',
  },
];

export const WHY_MEWARI = [
  {
    id: 'heritage',
    title: 'HERITAGE',
    tagline: 'Rajasthani-inspired architecture',
    description:
      'Immerse yourself in authentic Mewari stone carvings, graceful arches, traditional jharokhas, and palatial dignity fused with modern boutique luxury.',
  },
  {
    id: 'location',
    title: 'LOCATION',
    tagline: 'Close to Lake Pichola and historic Udaipur',
    description:
      'Ideally situated at Purohit Ka Khurra, before Chandpole Parking. Wander effortlessly into the historic heart of Udaipur, City Palace, and lake ghats.',
  },
  {
    id: 'lake-views',
    title: 'LAKE VIEWS',
    tagline: "Experience the beauty of Udaipur's iconic lake",
    description:
      'Behold the glistening waters of Lake Pichola, the rugged silhouettes of the Aravali mountains, and royal palace skylines from our lake-facing rooms and rooftop restaurant.',
  },
  {
    id: 'hospitality',
    title: 'HOSPITALITY',
    tagline: 'Personalised assistance for your stay',
    description:
      'Rooted in the ancient Rajasthani tradition of warm hospitality, our dedicated team provides personalized assistance to curate an unforgettable Udaipur stay.',
  },
];
