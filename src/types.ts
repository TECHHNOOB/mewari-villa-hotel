export type RoomCategory = 
  | 'Deluxe Non Lake View'
  | 'Super Deluxe Triple Sharing'
  | 'Super Deluxe Lake View'
  | 'Villa Suite Lake View';

export type EnquiryType =
  | 'Room Booking'
  | 'Family Stay'
  | 'Couple Stay'
  | 'Group Booking'
  | 'Restaurant / Dining'
  | 'Other';

export interface Room {
  id: string;
  name: RoomCategory;
  tagline: string;
  startingPrice: string;
  guestsRange: string;
  description: string;
  fullDetails: string;
  occupancy: string;
  bedType: string;
  view: string;
  size: string;
  image: string;
  gallery: string[];
  amenities: string[];
  highlights: string[];
}

export interface AmenityItem {
  id: string;
  name: string;
  description: string;
  iconName: string;
}

export interface ExperienceItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  tag: string;
  highlights: string[];
}

export type GalleryCategory =
  | 'ALL'
  | 'VILLA'
  | 'ROOMS'
  | 'LAKE VIEW'
  | 'JALSA'
  | 'INTERIORS'
  | 'UDAIPUR';

export interface GalleryImage {
  id: string;
  title: string;
  category: 'VILLA' | 'ROOMS' | 'LAKE VIEW' | 'JALSA' | 'INTERIORS' | 'UDAIPUR';
  image: string;
  caption: string;
}

export interface InquiryFormData {
  fullName: string;
  phone: string;
  email: string;
  checkIn: string;
  checkOut: string;
  adults: string;
  children: string;
  roomPreference: string;
  enquiryType: EnquiryType;
  message: string;
}
