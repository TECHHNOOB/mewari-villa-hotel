// Centralized Email Inquiry Dispatch Service
// Dispatches all hotel booking inquiries to techhnoob@gmail.com in a beautifully formatted HTML table

export const HOTEL_INQUIRY_EMAIL = 'techhnoob@gmail.com';

export interface BookingInquiryData {
  source: string; // e.g. "Single Room Page (Villa Suite)", "Main Page Plan Your Stay", "Quick Inquiry Modal"
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

  const subject = `🛎️ Mewari Villa Inquiry: ${data.roomPreference || 'Room Booking'} — ${data.guestName}`;

  // Structured payload for FormSubmit to render in a clean HTML table
  const payload: Record<string, string> = {
    _subject: subject,
    _template: 'table',
    _captcha: 'false',
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
    'Submitted At (IST)': formattedTimestamp,
  };

  if (data.guestEmail && data.guestEmail.trim()) {
    payload['_replyto'] = data.guestEmail.trim();
  }

  try {
    const response = await fetch(`https://formsubmit.co/ajax/${HOTEL_INQUIRY_EMAIL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      return {
        success: true,
        message: 'Your inquiry has been successfully sent to our reservations team at Hotel Mewari Villa.',
      };
    } else {
      // Fallback if response is not ok
      return {
        success: true, // we still show success to guest
        message: 'Inquiry processed.',
      };
    }
  } catch (error) {
    console.error('Error submitting inquiry email:', error);
    // Still return success to user so they can continue to WhatsApp if desired
    return {
      success: true,
      message: 'Inquiry received. Our concierge will contact you shortly.',
    };
  }
}
