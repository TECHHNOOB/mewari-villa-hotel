import React, { useState, useEffect } from 'react';
import {
  Calendar,
  Users,
  MessageSquare,
  Phone,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  RotateCcw,
} from 'lucide-react';
import { HOTEL_INFO } from '../data/hotelData';
import { InquiryFormData, EnquiryType } from '../types';
import { sendBookingInquiry } from '../services/inquiryService';

interface InquirySectionProps {
  preselectedRoom?: string;
  onClearPreselectedRoom?: () => void;
}

export const InquirySection: React.FC<InquirySectionProps> = ({
  preselectedRoom,
  onClearPreselectedRoom,
}) => {
  const [formData, setFormData] = useState<InquiryFormData>({
    fullName: '',
    phone: '',
    email: '',
    checkIn: '',
    checkOut: '',
    adults: '2 Adults',
    children: '0 Children',
    roomPreference: 'Any Room',
    enquiryType: 'Room Booking',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (preselectedRoom) {
      if (preselectedRoom === 'Group Stay' || preselectedRoom === 'Group Booking') {
        setFormData((prev) => ({
          ...prev,
          enquiryType: 'Group Booking',
          roomPreference: 'Any Room',
        }));
      } else if (preselectedRoom === 'Dining' || preselectedRoom === 'Restaurant') {
        setFormData((prev) => ({
          ...prev,
          enquiryType: 'Restaurant / Dining',
          roomPreference: 'Any Room',
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          roomPreference: preselectedRoom,
        }));
      }
    }
  }, [preselectedRoom]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrorMsg('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    if (!formData.phone.trim()) {
      setErrorMsg('Please enter your phone or WhatsApp number.');
      return;
    }

    setLoading(true);

    await sendBookingInquiry({
      source: 'Plan Your Stay Form (Main Page)',
      guestName: formData.fullName,
      guestPhone: formData.phone,
      guestEmail: formData.email,
      roomPreference: formData.roomPreference,
      checkInDate: formData.checkIn,
      checkOutDate: formData.checkOut,
      guestCount: `${formData.adults}, ${formData.children}`,
      specialRequests: formData.message,
      enquiryType: formData.enquiryType,
    });

    setLoading(false);
    setSubmitted(true);
    setErrorMsg('');
  };

  const generateWhatsAppUrl = () => {
    const text = `Hello Mewari Villa Hotel,
I would like to enquire regarding a stay reservation.

Name: ${formData.fullName || 'Guest'}
Phone: ${formData.phone || 'Not provided'}
Dates: ${formData.checkIn || 'Flexible'} to ${formData.checkOut || 'Flexible'}
Guests: ${formData.adults}, ${formData.children}
Suite: ${formData.roomPreference}
Type: ${formData.enquiryType}
Notes: ${formData.message || 'None'}`;

    return `https://wa.me/${HOTEL_INFO.whatsappNumber}?text=${encodeURIComponent(text)}`;
  };

  return (
    <section id="inquiry-section" className="py-20 md:py-28 bg-white text-[#171717] relative border-b border-[#EAE4D9]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">

        {/* Section Heading */}
        <div className="max-w-2xl mx-auto text-center mb-12">
          <div className="inline-flex items-center space-x-2 mb-2.5 justify-center">
            <span className="w-5 h-px bg-[#C59B51]" />
            <span className="text-[11px] font-sans uppercase tracking-[0.24em] text-[#C59B51] font-semibold">
              Reservations &amp; Inquiries
            </span>
            <span className="w-5 h-px bg-[#C59B51]" />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#171717] mb-3">
            Plan Your Heritage Stay
          </h2>
          <p className="font-body text-xs sm:text-sm text-[#666666] max-w-lg mx-auto leading-relaxed">
            Tell us about your upcoming journey to Udaipur and our reservations team will coordinate availability and the finest suite options.
          </p>
        </div>

        {/* Main Form Container */}
        <div className="max-w-3xl mx-auto bg-[#FAF8F5] border border-[#EAE4D9] rounded-2xl shadow-xs p-6 sm:p-10 md:p-12">
          {submitted ? (
            /* Confirmation Message */
            <div className="text-center py-8 sm:py-12">
              <div className="w-14 h-14 mx-auto mb-5 rounded-full bg-[#FAF8F5] border border-[#C59B51] flex items-center justify-center text-[#C59B51]">
                <CheckCircle2 className="w-7 h-7" />
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl text-[#171717] mb-2 font-normal">
                Enquiry Received
              </h3>

              <p className="font-body text-xs sm:text-sm text-[#666666] mb-6 max-w-md mx-auto leading-relaxed">
                Thank you for your enquiry. Our team will get back to you shortly with tailored availability for your stay at Mewari Villa.
              </p>

              {/* Instant Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-sm mx-auto">
                <a
                  href={generateWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-6 py-3 bg-[#25D366] text-white text-xs uppercase tracking-wider font-sans font-semibold rounded-lg hover:bg-[#1EBE5D] transition-colors flex items-center justify-center space-x-2 shadow-xs"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp Us</span>
                </a>

                <a
                  href={`tel:${HOTEL_INFO.primaryPhone}`}
                  className="w-full sm:w-auto px-6 py-3 bg-[#171717] text-white text-xs uppercase tracking-wider font-sans font-semibold rounded-lg hover:bg-[#C59B51] transition-colors flex items-center justify-center space-x-2 shadow-xs"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call Desk</span>
                </a>
              </div>

              <div className="mt-8 pt-6 border-t border-[#EAE4D9]">
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-xs text-[#737373] hover:text-[#171717] font-sans inline-flex items-center space-x-1"
                >
                  <RotateCcw className="w-3.5 h-3.5 mr-1" />
                  <span>Send another enquiry</span>
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">

              {errorMsg && (
                <div className="p-3.5 bg-rose-50 border border-rose-200 text-rose-700 text-xs font-sans rounded-lg">
                  {errorMsg}
                </div>
              )}

              {formData.roomPreference !== 'Any Room' && (
                <div className="p-3 bg-white border border-[#C59B51] rounded-lg flex items-center justify-between text-xs font-sans">
                  <div className="flex items-center space-x-2">
                    <Sparkles className="w-3.5 h-3.5 text-[#C59B51]" />
                    <span className="text-[#666666]">Selected Suite:</span>
                    <strong className="text-[#171717] font-semibold">{formData.roomPreference}</strong>
                  </div>
                  <button
                    type="button"
                    onClick={() => setFormData((p) => ({ ...p, roomPreference: 'Any Room' }))}
                    className="text-[#C59B51] hover:underline text-[11px] font-medium"
                  >
                    Reset
                  </button>
                </div>
              )}

              {/* Row 1: Full Name & Phone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="fullName" className="block text-[11px] uppercase tracking-wider text-[#404040] font-sans font-semibold mb-1.5">
                    Full Name <span className="text-[#C59B51]">*</span>
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="e.g. Eleanor Vance"
                    required
                    className="w-full px-4 py-3 bg-white border border-[#EAE4D9] text-[#171717] text-xs font-sans rounded-lg focus:outline-hidden focus:border-[#C59B51] transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-[11px] uppercase tracking-wider text-[#404040] font-sans font-semibold mb-1.5">
                    Phone / WhatsApp <span className="text-[#C59B51]">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    required
                    className="w-full px-4 py-3 bg-white border border-[#EAE4D9] text-[#171717] text-xs font-sans rounded-lg focus:outline-hidden focus:border-[#C59B51] transition-colors"
                  />
                </div>
              </div>

              {/* Row 2: Email */}
              <div>
                <label htmlFor="email" className="block text-[11px] uppercase tracking-wider text-[#404040] font-sans font-semibold mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@domain.com"
                  className="w-full px-4 py-3 bg-white border border-[#EAE4D9] text-[#171717] text-xs font-sans rounded-lg focus:outline-hidden focus:border-[#C59B51] transition-colors"
                />
              </div>

              {/* Row 3: Check-in & Check-out */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="checkIn" className="block text-[11px] uppercase tracking-wider text-[#404040] font-sans font-semibold mb-1.5">
                    Check-in Date
                  </label>
                  <input
                    type="date"
                    id="checkIn"
                    name="checkIn"
                    value={formData.checkIn}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border border-[#EAE4D9] text-[#171717] text-xs font-sans rounded-lg focus:outline-hidden focus:border-[#C59B51] transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="checkOut" className="block text-[11px] uppercase tracking-wider text-[#404040] font-sans font-semibold mb-1.5">
                    Check-out Date
                  </label>
                  <input
                    type="date"
                    id="checkOut"
                    name="checkOut"
                    value={formData.checkOut}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border border-[#EAE4D9] text-[#171717] text-xs font-sans rounded-lg focus:outline-hidden focus:border-[#C59B51] transition-colors"
                  />
                </div>
              </div>

              {/* Row 4: Adults & Children */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="adults" className="block text-[11px] uppercase tracking-wider text-[#404040] font-sans font-semibold mb-1.5">
                    Adults
                  </label>
                  <select
                    id="adults"
                    name="adults"
                    value={formData.adults}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border border-[#EAE4D9] text-[#171717] text-xs font-sans rounded-lg focus:outline-hidden focus:border-[#C59B51] transition-colors"
                  >
                    <option value="1 Adult">1 Adult</option>
                    <option value="2 Adults">2 Adults</option>
                    <option value="3 Adults">3 Adults</option>
                    <option value="4 Adults">4 Adults</option>
                    <option value="5+ Adults">5+ Adults (Group)</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="children" className="block text-[11px] uppercase tracking-wider text-[#404040] font-sans font-semibold mb-1.5">
                    Children
                  </label>
                  <select
                    id="children"
                    name="children"
                    value={formData.children}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border border-[#EAE4D9] text-[#171717] text-xs font-sans rounded-lg focus:outline-hidden focus:border-[#C59B51] transition-colors"
                  >
                    <option value="0 Children">0 Children</option>
                    <option value="1 Child">1 Child</option>
                    <option value="2 Children">2 Children</option>
                    <option value="3+ Children">3+ Children</option>
                  </select>
                </div>
              </div>

              {/* Row 5: Room Preference & Enquiry Type */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="roomPreference" className="block text-[11px] uppercase tracking-wider text-[#404040] font-sans font-semibold mb-1.5">
                    Suite Preference
                  </label>
                  <select
                    id="roomPreference"
                    name="roomPreference"
                    value={formData.roomPreference}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border border-[#EAE4D9] text-[#171717] text-xs font-sans rounded-lg focus:outline-hidden focus:border-[#C59B51] transition-colors"
                  >
                    <option value="Any Room">Any Room / Best Available</option>
                    <option value="Villa Suite Lake View">Villa Suite Lake View (From ₹8,500)</option>
                    <option value="Super Deluxe Lake View">Super Deluxe Lake View (From ₹6,500)</option>
                    <option value="Super Deluxe Triple Sharing">Super Deluxe Triple Sharing (From ₹5,500)</option>
                    <option value="Deluxe Non Lake View">Deluxe Non Lake View (From ₹3,500)</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="enquiryType" className="block text-[11px] uppercase tracking-wider text-[#404040] font-sans font-semibold mb-1.5">
                    Enquiry Category
                  </label>
                  <select
                    id="enquiryType"
                    name="enquiryType"
                    value={formData.enquiryType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border border-[#EAE4D9] text-[#171717] text-xs font-sans rounded-lg focus:outline-hidden focus:border-[#C59B51] transition-colors"
                  >
                    <option value="Room Booking">Heritage Stay Booking</option>
                    <option value="Family Stay">Family Vacation</option>
                    <option value="Couple Stay">Honeymoon / Couple Retreat</option>
                    <option value="Restaurant / Dining">Jalsa Dining Table</option>
                    <option value="Group Booking">Group / Private Buyout</option>
                  </select>
                </div>
              </div>

              {/* Row 6: Message */}
              <div>
                <label htmlFor="message" className="block text-[11px] uppercase tracking-wider text-[#404040] font-sans font-semibold mb-1.5">
                  Special Notes or Itinerary Requests
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={3}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Share details about arrival timings, dietary preferences, or lake excursion requests..."
                  className="w-full px-4 py-3 bg-white border border-[#EAE4D9] text-[#171717] text-xs font-sans rounded-lg focus:outline-hidden focus:border-[#C59B51] transition-colors resize-none"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 bg-[#C59B51] hover:bg-[#B3873E] text-white text-xs uppercase tracking-[0.16em] font-sans font-semibold rounded-lg transition-all shadow-md active:scale-98 disabled:opacity-50"
                >
                  {loading ? 'Submitting Reservation...' : 'Submit Inquiry'}
                </button>
              </div>

              <div className="text-center pt-1">
                <p className="text-[11px] text-[#737373] font-sans">
                  Direct inquiry guarantee: Zero booking fees • Best rate guarantee directly with Mewari Villa
                </p>
              </div>

            </form>
          )}
        </div>

      </div>
    </section>
  );
};
