export type Listing = {
  id: string;
  slug: string;
  title: string;
  description: string;
  type: "bedspace" | "private_room" | "studio" | "apartment";
  gender: "male_only" | "female_only" | "mixed";
  location: string;
  barangay: string;
  city: string;
  nearSchool: string;
  address: string;
  price: number;
  inclusions: string[];
  hasCurfew: boolean;
  curfewTime?: string;
  cookingAllowed: boolean;
  petsAllowed: boolean;
  leaseTerms: string[];
  houseRules: string;
  availableSlots: number;
  totalSlots: number;
  badge: "preferred" | "top_pick" | "site_visited" | "admin_verified" | "id_verified";
  badgeLabel: string;
  rating: number;
  reviews: number;
  landlord: {
    name: string;
    phone: string; // used for WhatsApp
    responseRate: string;
    responseTime: string;
    verified: boolean;
  };
  coverColor: string;
  photos: { label: string; color: string }[];
};

export const mockListings: Listing[] = [
  {
    id: "1",
    slug: "tita-nenas-boarding-house-lahug",
    title: "Tita Nena's Boarding House",
    description:
      "A clean, well-maintained boarding house in the heart of Lahug. Tita Nena is known for being strict but fair — curfew at 10PM keeps the place safe and quiet. Perfect for female students near USC.",
    type: "bedspace",
    gender: "female_only",
    location: "Lahug, Cebu City",
    barangay: "Lahug",
    city: "Cebu City",
    nearSchool: "Near USC",
    address: "123 Gorordo Ave, Lahug, Cebu City",
    price: 4500,
    inclusions: ["WiFi", "Water", "Electricity"],
    hasCurfew: true,
    curfewTime: "10:00 PM",
    cookingAllowed: false,
    petsAllowed: false,
    leaseTerms: ["monthly", "semestral"],
    houseRules:
      "No visitors after 8PM. No cooking inside rooms. Keep common areas clean. Lights out by 11PM. No loud music.",
    availableSlots: 2,
    totalSlots: 8,
    badge: "preferred",
    badgeLabel: "⭐ Preferred",
    rating: 4.9,
    reviews: 24,
    landlord: {
      name: "Nena Reyes",
      phone: "639171234567",
      responseRate: "98%",
      responseTime: "within 1 hour",
      verified: true,
    },
    coverColor: "from-coral/20 to-golden/10",
    photos: [
      { label: "Room", color: "from-coral/20 to-golden/10" },
      { label: "Bathroom", color: "from-navy/15 to-coral/8" },
      { label: "Common Area", color: "from-golden/20 to-leaf/10" },
      { label: "Entrance", color: "from-leaf/15 to-navy/8" },
    ],
  },
  {
    id: "2",
    slug: "casa-verde-bedspace-talamban",
    title: "Casa Verde Bedspace",
    description:
      "Budget-friendly bedspace in Talamban, walking distance from CIT-U. Shared bathrooms are cleaned daily. Good WiFi connection — tested at 50 Mbps. Mixed occupancy, mostly students and young professionals.",
    type: "bedspace",
    gender: "mixed",
    location: "Talamban, Cebu City",
    barangay: "Talamban",
    city: "Cebu City",
    nearSchool: "Near CIT-U",
    address: "45 Talamban Road, Cebu City",
    price: 3800,
    inclusions: ["WiFi", "Water"],
    hasCurfew: false,
    cookingAllowed: true,
    petsAllowed: false,
    leaseTerms: ["monthly"],
    houseRules:
      "Respect quiet hours (10PM–6AM). Wash your own dishes. No smoking inside. Guests must sign in at entrance.",
    availableSlots: 4,
    totalSlots: 12,
    badge: "admin_verified",
    badgeLabel: "✅ Admin Verified",
    rating: 4.7,
    reviews: 18,
    landlord: {
      name: "Ben Cruz",
      phone: "639189876543",
      responseRate: "91%",
      responseTime: "within 3 hours",
      verified: true,
    },
    coverColor: "from-leaf/20 to-navy/10",
    photos: [
      { label: "Room", color: "from-leaf/20 to-navy/10" },
      { label: "Kitchen", color: "from-golden/20 to-coral/10" },
      { label: "Bathroom", color: "from-navy/10 to-leaf/10" },
    ],
  },
  {
    id: "3",
    slug: "kuya-bens-studio-banilad",
    title: "Kuya Ben's Studio Room",
    description:
      "Private studio room with aircon, perfect for working adults or graduate students near UV Visayas. Full privacy — your own bathroom, your own space. No curfew, very chill landlord.",
    type: "studio",
    gender: "male_only",
    location: "Banilad, Cebu City",
    barangay: "Banilad",
    city: "Cebu City",
    nearSchool: "Near UV Visayas",
    address: "78 Banilad Road, Cebu City",
    price: 6500,
    inclusions: ["WiFi", "Water", "Electricity", "Aircon"],
    hasCurfew: false,
    cookingAllowed: true,
    petsAllowed: true,
    leaseTerms: ["monthly", "annual"],
    houseRules:
      "Keep unit clean. No parties or events. Report any maintenance issues immediately. No subletting.",
    availableSlots: 1,
    totalSlots: 3,
    badge: "site_visited",
    badgeLabel: "🏘️ Site Visited",
    rating: 4.8,
    reviews: 11,
    landlord: {
      name: "Benjamin Santos",
      phone: "639201112222",
      responseRate: "95%",
      responseTime: "within 2 hours",
      verified: true,
    },
    coverColor: "from-navy/15 to-coral/8",
    photos: [
      { label: "Studio", color: "from-navy/15 to-coral/8" },
      { label: "Bathroom", color: "from-coral/15 to-navy/8" },
      { label: "Neighborhood", color: "from-golden/15 to-leaf/8" },
    ],
  },
  {
    id: "4",
    slug: "mabolo-bedspace-for-girls",
    title: "Mabolo Bedspace for Girls",
    description:
      "One of the most reviewed boarding houses near Cebu Normal University. Very affordable, clean, and managed by a Nanay who genuinely cares about her tenants. Has been operating for 10+ years.",
    type: "bedspace",
    gender: "female_only",
    location: "Mabolo, Cebu City",
    barangay: "Mabolo",
    city: "Cebu City",
    nearSchool: "Near Cebu Normal",
    address: "12 Mabolo St, Cebu City",
    price: 3200,
    inclusions: ["WiFi", "Water"],
    hasCurfew: true,
    curfewTime: "9:00 PM",
    cookingAllowed: false,
    petsAllowed: false,
    leaseTerms: ["monthly", "semestral"],
    houseRules:
      "Curfew strictly at 9PM. No male visitors inside rooms. Communal chores every Saturday. No overnight stays.",
    availableSlots: 3,
    totalSlots: 10,
    badge: "preferred",
    badgeLabel: "⭐ Preferred",
    rating: 4.6,
    reviews: 32,
    landlord: {
      name: "Maria Flores",
      phone: "639153334444",
      responseRate: "99%",
      responseTime: "within 30 minutes",
      verified: true,
    },
    coverColor: "from-golden/20 to-coral/10",
    photos: [
      { label: "Bedspace", color: "from-golden/20 to-coral/10" },
      { label: "Common Area", color: "from-coral/15 to-golden/8" },
      { label: "Bathroom", color: "from-leaf/15 to-navy/8" },
    ],
  },
  {
    id: "5",
    slug: "urgello-monthly-room",
    title: "Urgello Monthly Room",
    description:
      "Comfortable private room near Cebu Doctors' University. Safe neighborhood, 24/7 security guard at the gate. Walking distance to Fuente Osmena and major jeepney routes.",
    type: "private_room",
    gender: "mixed",
    location: "Urgello, Cebu City",
    barangay: "Urgello",
    city: "Cebu City",
    nearSchool: "Near Cebu Doc",
    address: "34 Urgello St, Cebu City",
    price: 5500,
    inclusions: ["WiFi", "Water", "Electricity"],
    hasCurfew: false,
    cookingAllowed: true,
    petsAllowed: false,
    leaseTerms: ["monthly"],
    houseRules:
      "Guests allowed until 10PM only. No smoking on premises. Report repairs within 48 hours. Parking available for motorcycles.",
    availableSlots: 1,
    totalSlots: 5,
    badge: "admin_verified",
    badgeLabel: "✅ Admin Verified",
    rating: 4.5,
    reviews: 8,
    landlord: {
      name: "Ricky Gomez",
      phone: "639175556666",
      responseRate: "87%",
      responseTime: "within 6 hours",
      verified: true,
    },
    coverColor: "from-coral/15 to-navy/8",
    photos: [
      { label: "Room", color: "from-coral/15 to-navy/8" },
      { label: "Bathroom", color: "from-navy/15 to-coral/8" },
    ],
  },
  {
    id: "6",
    slug: "mandaue-working-adults-house",
    title: "Mandaue Working Adults House",
    description:
      "Top-rated boarding house in Mandaue's business district — ideal for BPO workers and young professionals. Includes laundry service, fast WiFi, and a very accommodating caretaker on-site 24/7.",
    type: "bedspace",
    gender: "mixed",
    location: "Centro, Mandaue City",
    barangay: "Centro",
    city: "Mandaue City",
    nearSchool: "Business District",
    address: "88 Ouano Ave, Centro, Mandaue City",
    price: 4200,
    inclusions: ["WiFi", "Water", "Electricity", "Laundry"],
    hasCurfew: false,
    cookingAllowed: true,
    petsAllowed: false,
    leaseTerms: ["monthly", "annual"],
    houseRules:
      "Working adults only. No loud noise after 11PM. Shared kitchen — keep it clean. Laundry schedule posted weekly.",
    availableSlots: 2,
    totalSlots: 16,
    badge: "top_pick",
    badgeLabel: "👑 Top Pick",
    rating: 4.8,
    reviews: 15,
    landlord: {
      name: "Lorna Tan",
      phone: "639207778888",
      responseRate: "96%",
      responseTime: "within 1 hour",
      verified: true,
    },
    coverColor: "from-coral/25 to-golden/15",
    photos: [
      { label: "Room", color: "from-coral/25 to-golden/15" },
      { label: "Common Area", color: "from-golden/20 to-coral/10" },
      { label: "Kitchen", color: "from-navy/15 to-leaf/10" },
      { label: "Laundry Area", color: "from-leaf/20 to-navy/10" },
    ],
  },
  {
    id: "7",
    slug: "labangon-budget-bedspace",
    title: "Labangon Budget Bedspace",
    description:
      "Extremely affordable bedspace in Labangon — great for first-year students on a tight budget. Basic amenities, clean, and safe. Landlord lives on-site.",
    type: "bedspace",
    gender: "female_only",
    location: "Labangon, Cebu City",
    barangay: "Labangon",
    city: "Cebu City",
    nearSchool: "Near SWU",
    address: "21 Labangon Road, Cebu City",
    price: 2500,
    inclusions: ["Water"],
    hasCurfew: true,
    curfewTime: "10:00 PM",
    cookingAllowed: false,
    petsAllowed: false,
    leaseTerms: ["monthly", "semestral"],
    houseRules: "Curfew at 10PM. No loud music. Keep shared bathroom clean. No overnight visitors.",
    availableSlots: 5,
    totalSlots: 6,
    badge: "id_verified",
    badgeLabel: "🪪 ID Verified",
    rating: 4.3,
    reviews: 6,
    landlord: {
      name: "Cecilia Bautista",
      phone: "639169990000",
      responseRate: "80%",
      responseTime: "within 12 hours",
      verified: false,
    },
    coverColor: "from-golden/15 to-navy/8",
    photos: [{ label: "Bedspace", color: "from-golden/15 to-navy/8" }],
  },
  {
    id: "8",
    slug: "it-park-studio-for-professionals",
    title: "IT Park Studio for Professionals",
    description:
      "Modern studio unit steps away from IT Park Cebu. Fully furnished, fast fiber internet, 24/7 security. Perfect for BPO and tech workers on shifting schedules. No curfew.",
    type: "studio",
    gender: "mixed",
    location: "Apas, Cebu City",
    barangay: "Apas",
    city: "Cebu City",
    nearSchool: "Near IT Park",
    address: "IT Park Complex, Apas, Cebu City",
    price: 8500,
    inclusions: ["WiFi", "Water", "Electricity", "Aircon", "Laundry"],
    hasCurfew: false,
    cookingAllowed: true,
    petsAllowed: true,
    leaseTerms: ["monthly", "annual"],
    houseRules:
      "Professional tenants only. No subletting. Maintain unit cleanliness. Guest registration required at lobby.",
    availableSlots: 1,
    totalSlots: 1,
    badge: "site_visited",
    badgeLabel: "🏘️ Site Visited",
    rating: 4.9,
    reviews: 7,
    landlord: {
      name: "James Uy",
      phone: "639221113333",
      responseRate: "100%",
      responseTime: "within 30 minutes",
      verified: true,
    },
    coverColor: "from-navy/20 to-leaf/10",
    photos: [
      { label: "Studio", color: "from-navy/20 to-leaf/10" },
      { label: "Bathroom", color: "from-leaf/15 to-navy/8" },
      { label: "View", color: "from-coral/20 to-navy/10" },
    ],
  },
];

export const CITIES = ["Cebu City", "Mandaue City", "Lapu-Lapu City", "Davao City"];

export const SCHOOLS = [
  "Near USC",
  "Near UV Visayas",
  "Near CIT-U",
  "Near Cebu Normal",
  "Near Cebu Doc",
  "Near SWU",
  "Near IT Park",
  "Business District",
];

export const BADGE_STYLES: Record<string, { bg: string; text: string }> = {
  preferred:      { bg: "bg-navy",      text: "text-golden" },
  top_pick:       { bg: "bg-coral",     text: "text-white"  },
  site_visited:   { bg: "bg-navy-light",text: "text-white"  },
  admin_verified: { bg: "bg-leaf",      text: "text-white"  },
  id_verified:    { bg: "bg-amber",     text: "text-white"  },
};
