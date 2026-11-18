import { BlogPost } from '../types/blog';
import { REAL_HOTEL_IMAGES } from './hotelData';

export const SAMPLE_BLOG_POSTS: BlogPost[] = [
  {
    id: 'post-1',
    slug: 'soulful-guide-lake-pichola-udaipur-mewari-villa',
    title: 'A Soulful Guide to Lake Pichola & Old Udaipur: Where Heritage Meets Twilight',
    excerpt:
      'From secret sunrise ghats to rooftop candlelight dining at Jalsa, immerse yourself in the regal spirit and quiet magic of Rajasthan’s City of Lakes.',
    coverImage: REAL_HOTEL_IMAGES.lakeViewRooftop,
    publishedAt: '2026-03-12T10:30:00Z',
    formattedDate: 'March 12, 2026',
    readTime: '6 min read',
    category: 'Heritage & Culture',
    tags: ['Lake Pichola', 'Udaipur Travel Guide', 'Heritage Stay', 'Old City Walk'],
    isFeatured: true,
    author: {
      name: 'Rana Vikram Singh',
      role: 'Heritage Custodian & Storyteller',
      avatar: '/assets/images/interior_lobby.jpg',
    },
    content: `
      <p class="lead text-lg md:text-xl font-serif text-[#3A352F] leading-relaxed mb-6">
        There is a timeless reverie in Udaipur that no photograph can ever fully capture. As morning mist gently lifts from the mirror-smooth surface of Lake Pichola, the pale marble domes of ancient havelis awaken in a soft amber glow.
      </p>

      <p class="mb-6">
        Perched along the historic lanes of Purohit Ka Khurra near Chandpole, <strong>Hotel Mewari Villa</strong> stands as an intimate sanctuary for travelers yearning for authentic Mewari soul. Unlike sprawling commercial resorts perched far from city life, stepping out of our carved wooden doorways places you directly at the heartbeat of old Mewar.
      </p>

      <h2 class="text-2xl md:text-3xl font-serif font-semibold text-[#1C1917] mt-10 mb-4 border-b border-[#EAE4D9] pb-2">
        1. The Magic of Early Mornings at Gangaur Ghat
      </h2>
      <p class="mb-4">
        Just a four-minute stroll from Mewari Villa lies <em>Gangaur Ghat</em>. Before the lively city bazaars awaken, the waters are completely still. Local elders gather for morning prayers, pigeons flutter around the grand stone archway (Tripolia), and temple bells echo faintly across the ghats.
      </p>
      <blockquote class="my-6 pl-5 border-l-4 border-[#C59B51] italic text-lg text-[#524B42] bg-[#FAF8F5] py-3 rounded-r-lg">
        "To know Udaipur, you must listen to its waters at first light. Every ripple carries five centuries of royal heritage and devotion."
      </blockquote>
      <p class="mb-6">
        We recommend taking your camera or a quiet journal between 6:30 AM and 7:30 AM. The sunrise reflects pure gold against the Jag Mandir Island Palace and City Palace ramparts.
      </p>

      <h2 class="text-2xl md:text-3xl font-serif font-semibold text-[#1C1917] mt-10 mb-4 border-b border-[#EAE4D9] pb-2">
        2. Winding Through Chandpole & The Artisan Quarter
      </h2>
      <p class="mb-4">
        Leaving the ghats, wander into the artisanal alleys surrounding Chandpole. Here, master craftsmen continue traditions passed through five generations:
      </p>
      <ul class="list-disc pl-6 space-y-2 mb-6">
        <li><strong>Mewari Miniature Paintings:</strong> Intricate paintings drawn with single-hair squirrel brushes onto handmade wasli paper.</li>
        <li><strong>Handcrafted Mojaris:</strong> Traditional camel-leather footwear stitched with vibrant thread and brass sequins.</li>
        <li><strong>Silver & Gem Filigree:</strong> Old royal jewelry workshops tucked beneath arches dating back to the 17th century.</li>
      </ul>

      <h2 class="text-2xl md:text-3xl font-serif font-semibold text-[#1C1917] mt-10 mb-4 border-b border-[#EAE4D9] pb-2">
        3. Sunset & Starlit Dining at Jalsa Rooftop
      </h2>
      <p class="mb-4">
        As evening draws near, return to the quiet haven of Mewari Villa. Ascend to our rooftop restaurant, <strong>Jalsa</strong>. Looking out over Lake Pichola with the City Palace illuminated like a constellation of golden lamps is one of Rajasthan's most breathtaking dining experiences.
      </p>
      <p class="mb-6">
        Savor our chef's signature <em>Laal Maas</em> simmered slow in fragrant Mathania chillies, accompanied by crisp bajra rotis and cooling Mewari Ker Sangri. For vegetarians, the <em>Dal Baati Churma</em> with pure cow ghee brings the warm flavors of Rajasthani royalty directly to your table.
      </p>

      <h2 class="text-2xl md:text-3xl font-serif font-semibold text-[#1C1917] mt-10 mb-4 border-b border-[#EAE4D9] pb-2">
        Insider Tips from our Concierge
      </h2>
      <div class="bg-[#F5F0E8] border border-[#E0D5C1] p-6 rounded-xl my-6">
        <h4 class="font-serif font-bold text-lg text-[#1C1917] mb-2 flex items-center">
          <span class="inline-block w-2.5 h-2.5 bg-[#C59B51] rounded-full mr-2"></span>
          Essential Local Tips for Mewari Villa Guests
        </h4>
        <ul class="space-y-2 text-sm text-[#554E45]">
          <li><strong>Bagore Ki Haveli Folk Show:</strong> Ask our front desk to secure evening Dharohar dance show tickets in advance; it is just an 8-minute walk from our door.</li>
          <li><strong>Lake Pichola Private Boat Charter:</strong> Choose a late-afternoon private wooden boat that glides right alongside Jag Niwas as twilight colors the sky purple and rose.</li>
          <li><strong>Best Photo Spot:</strong> The private balcony of our <em>Villa Suite Lake View</em> captures unobstructed vistas of the lake and old bridges without the crowds.</li>
        </ul>
      </div>

      <p class="mb-4">
        Whether you spend your days exploring grand courtyards or simply unwinding with masala chai by your suite's jharokha window, Udaipur welcomes you with warmth and grace.
      </p>
    `,
  },
  {
    id: 'post-2',
    slug: 'rooftop-dining-tradition-jalsa-udaipur',
    title: 'The Royal Flavours of Mewar: Culinary Secrets Behind Jalsa Rooftop',
    excerpt:
      'Discover the rich royal recipes, slow-fired clay pots, and handpicked local spices that define the rooftop gastronomy at Mewari Villa.',
    coverImage: REAL_HOTEL_IMAGES.jalsaFoodView,
    publishedAt: '2026-03-05T14:15:00Z',
    formattedDate: 'March 5, 2026',
    readTime: '5 min read',
    category: 'Culinary & Dining',
    tags: ['Jalsa Restaurant', 'Rajasthani Food', 'Laal Maas', 'Rooftop Udaipur'],
    isFeatured: false,
    author: {
      name: 'Chef Maharaj Mahendra',
      role: 'Master of Mewari Cuisine',
      avatar: '/assets/images/interior_balcony.jpg',
    },
    content: `
      <p class="lead text-lg md:text-xl font-serif text-[#3A352F] leading-relaxed mb-6">
        Food in Mewar has never been merely sustenance; it is an art form honed over royal banquets, desert expeditions, and celebratory harvest feasts.
      </p>
      <p class="mb-4">
        At <strong>Jalsa Lake View Rooftop Restaurant</strong>, we honor these time-tested culinary secrets with ancestral cooking techniques, slow-simmering earthen pots, and locally grown condiments from the Aravalli hills.
      </p>
      <h2 class="text-2xl font-serif font-semibold text-[#1C1917] mt-8 mb-4">The Secret of Real Mathania Chillies</h2>
      <p class="mb-4">
        Unlike commercially produced chili powders that only offer harsh heat, true Mathania chillies grown in central Rajasthan provide a deep ruby color and fruity, smoky warmth. Our signature curries owe their rich velvet sheen and gentle spice to this single royal ingredient.
      </p>
      <p class="mb-4">
        Join us on the rooftop as the lake breeze gently stirs the lanterns, and let each dish transport you into Udaipur’s royal culinary lineage.
      </p>
    `,
  },
  {
    id: 'post-3',
    slug: 'top-places-to-visit-around-chandpole-udaipur',
    title: 'Walking the Historic Quarters: 5 Must-See Sights Near Chandpole',
    excerpt:
      'Why staying in Udaipur’s historic quarter puts you within walking distance of City Palace, Bagore Ki Haveli, and peaceful lake ghats.',
    coverImage: REAL_HOTEL_IMAGES.royalPalaceUdaipur,
    publishedAt: '2026-02-28T09:00:00Z',
    formattedDate: 'February 28, 2026',
    readTime: '4 min read',
    category: 'Udaipur Travel',
    tags: ['City Palace', 'Heritage Walk', 'Travel Guide', 'Chandpole'],
    isFeatured: false,
    author: {
      name: 'Pooja Sharma',
      role: 'Travel Journalist & Udaipur Native',
      avatar: '/assets/images/property_courtyard.jpg',
    },
    content: `
      <p class="lead text-lg md:text-xl font-serif text-[#3A352F] leading-relaxed mb-6">
        When traveling to Udaipur, choosing the right location makes the difference between sitting in heavy traffic or strolling past 400-year-old carved balconies right outside your bedroom.
      </p>
      <p class="mb-4">
        Chandpole is Udaipur’s most charming heritage district. From Mewari Villa, every major landmark is accessible within a 5 to 10-minute walk:
      </p>
      <ul class="list-disc pl-6 space-y-2 mb-6">
        <li><strong>City Palace Complex (0.9 km):</strong> The grand museum, marble corridors, and mirror mosaics.</li>
        <li><strong>Jagdish Temple (0.7 km):</strong> A 1651 carved stone temple dedicated to Lord Vishnu.</li>
        <li><strong>Bagore Ki Haveli (0.8 km):</strong> Waterfront mansion featuring world's largest turban and nighttime cultural folk performances.</li>
        <li><strong>Gangaur Ghat (0.4 km):</strong> Udaipur's primary ceremonial lakeside pavilion.</li>
      </ul>
      <p class="mb-4">
        After a day of sightseeing, retreat to the peace and tranquility of Hotel Mewari Villa.
      </p>
    `,
  },
];
