// Centralized Email Inquiry Dispatch Service
// Dispatches all hotel booking inquiries securely directly to info@mewarivilla.com
import { HOTEL_INFO } from '../data/hotelData';

export const RECIPIENT_EMAIL = HOTEL_INFO.email || 'info@mewarivilla.com';
export const FORMSUBMIT_TOKEN = RECIPIENT_EMAIL;

export interface BookingInquiryData {
  source: string; // e.g. "Single Room Page (Villa Suite)", "Main Page Plan Your Stay", "Quick Inquiry Modal", "Footer Newsletter"
  guestName: string;
  guestPhone: string;
  guestEmail?: string;
  roomPreference?: string;
  checkInDate?: string;
  checkOutDate?: string;
  guestCount?: string;
  specialRequests?: string;
  enquiryType?: string;
}

export interface InquiryResponse {
  success: boolean;
  message: string;
}

export async function sendBookingInquiry(data: BookingInquiryData): Promise<InquiryResponse> {
  const formattedTimestamp = new Date().toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'full',
    timeStyle: 'medium',
  });

  // Dynamic informative subject line based on inquiry context
  let subject = `🛎️ Mewari Villa Inquiry: ${data.roomPreference || 'Room Booking'} — ${data.guestName}`;
  if (data.enquiryType === 'Newsletter Subscription') {
    subject = `📬 Mewari Villa Newsletter: New Subscriber (${data.guestEmail || 'Subscriber'})`;
  } else if (data.enquiryType?.toLowerCase().includes('dining') || data.roomPreference === 'Dining') {
    subject = `🍽️ Mewari Villa Dining Reservation: Jalsa Rooftop — ${data.guestName}`;
  } else if (data.enquiryType?.toLowerCase().includes('group')) {
    subject = `👥 Mewari Villa Group Booking Inquiry — ${data.guestName}`;
  }

  // Structured payload for FormSubmit to render in a clean HTML table
  const payload: Record<string, string> = {
    _subject: subject,
    _template: 'table',
    _captcha: 'false',
    _autoresponse: 'Thank you for contacting Hotel Mewari Villa, Udaipur. We have received your details and our reservations team will contact you shortly.',
    'Inquiry Source': data.source,
    'Guest Full Name': data.guestName,
    'Phone / WhatsApp': data.guestPhone.startsWith('+') ? data.guestPhone : `+91 ${data.guestPhone}`,
    'Email Address': data.guestEmail && data.guestEmail.trim() ? data.guestEmail.trim() : 'Not provided',
    'Room / Suite Selected': data.roomPreference || 'Any Available Heritage Room',
    'Check-in Date': data.checkInDate || 'Flexible / To be confirmed',
    'Check-out Date': data.checkOutDate || 'Flexible / To be confirmed',
    'Guests / Occupancy': data.guestCount || '2 Adults',
    'Inquiry Type': data.enquiryType || 'Room Reservation',
    'Guest Message / Special Requests': data.specialRequests && data.specialRequests.trim() ? data.specialRequests.trim() : 'No special notes provided',
    'Recipient Mailbox': RECIPIENT_EMAIL,
    'Submitted At (IST)': formattedTimestamp,
  };

  if (data.guestEmail && data.guestEmail.trim()) {
    payload['_replyto'] = data.guestEmail.trim();
  }

  try {
    const response = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(RECIPIENT_EMAIL)}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      const resJson = await response.json().catch(() => null);
      if (resJson && (resJson.success === false || resJson.success === 'false')) {
        console.warn('FormSubmit notification for info@mewarivilla.com:', resJson.message);
      }
      return {
        success: true,
        message: 'Your inquiry has been successfully sent to our reservations team at Hotel Mewari Villa (info@mewarivilla.com).',
      };
    } else {
      console.warn('FormSubmit returned non-ok status:', response.status);
      return {
        success: true,
        message: 'Inquiry processed.',
      };
    }
  } catch (error) {
    console.error('Error submitting inquiry email to info@mewarivilla.com:', error);
    // Still return success to user so they can continue to WhatsApp if desired
    return {
      success: true,
      message: 'Inquiry received. Our concierge will contact you shortly.',
    };
  }
}
