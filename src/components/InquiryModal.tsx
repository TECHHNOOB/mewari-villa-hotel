import React, { useState, useEffect } from 'react';
import {
  X,
  CheckCircle2,
  MessageSquare,
  Phone,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { HOTEL_INFO } from '../data/hotelData';
import { InquiryFormData } from '../types';
import { sendBookingInquiry } from '../services/inquiryService';

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedRoom?: string;
}

export const InquiryModal: React.FC<InquiryModalProps> = ({
  isOpen,
  onClose,
  preselectedRoom,
}) => {
  const [formData, setFormData] = useState<InquiryFormData>({
    fullName: '',
    phone: '',
    email: '',
    checkIn: '',
    checkOut: '',
    adults: '2 Adults',
    children: '0 Children',
    roomPreference: preselectedRoom || 'Any Room',
    enquiryType: 'Room Booking',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (preselectedRoom) {
      if (preselectedRoom === 'Dining' || preselectedRoom === 'Restaurant') {
        setFormData((prev) => ({
          ...prev,
          enquiryType: 'Restaurant / Dining',
          roomPreference: 'Any Room',
        }));
      } else if (preselectedRoom === 'Group Stay' || preselectedRoom === 'Group Booking') {
        setFormData((prev) => ({
          ...prev,
          enquiryType: 'Group Booking',
          roomPreference: 'Any Room',
        }));
      } else {
        setFormData((prev) => ({ ...prev, roomPreference: preselectedRoom }));
      }
    }
  }, [preselectedRoom]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

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
      source: 'Quick Inquiry Modal',
      guestName: formData.fullName,
      guestPhone: formData.phone,
      guestEmail: formData.email,
      roomPreference: formData.roomPreference,
      checkInDate: formData.checkIn,
      checkOutDate: formData.checkOut,
      guestCount: `${formData.adults}, ${formData.children}`,
      specialRequests: formData.message,
      enquiryType: 'Quick Modal Reservation',
    });

    setLoading(false);
    setSubmitted(true);
    setErrorMsg('');
  };

  const generateWhatsAppUrl = () => {
    const text = `Hello Mewari Villa Hotel,
I would like to inquire regarding room availability.

Name: ${formData.fullName || 'Guest'}
Phone: ${formData.phone || 'N/A'}
Check-in: ${formData.checkIn || 'To be decided'}
Check-out: ${formData.checkOut || 'To be decided'}
Guests: ${formData.adults}, ${formData.children}
Suite: ${formData.roomPreference}
Special Request: ${formData.message || 'None'}`;

    return `https://wa.me/${HOTEL_INFO.whatsappNumber}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl bg-white border border-[#EAE4D9] rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Strip */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-3.5 bg-white/95 backdrop-blur-xs border-b border-[#EAE4D9]">
          <div className="flex items-center space-x-3">
            <img
              src="/mewari-villa-logo.png"
              alt="Hotel Mewari Villa"
              className="h-10 w-auto object-contain"
            />
            <div className="h-6 w-px bg-[#EAE4D9]" />
            <h2 className="font-serif text-lg text-[#171717] font-medium">
              Reserve Your Stay
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full border border-[#EAE4D9] flex items-center justify-center text-[#171717] hover:bg-[#FAF8F5] transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8">
          {submitted ? (
            <div className="text-center py-6">
              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-[#FAF8F5] border border-[#C59B51] flex items-center justify-center text-[#C59B51]">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl text-[#171717] mb-2 font-normal">
                Enquiry Sent
              </h3>
              <p className="font-body text-xs text-[#666666] mb-6 max-w-sm mx-auto leading-relaxed">
                Thank you. Our reservations desk will get back to you promptly with availability for your requested dates.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-xs mx-auto mb-6">
                <a
                  href={generateWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-5 py-2.5 bg-[#25D366] text-white text-xs uppercase tracking-wider font-sans font-semibold rounded-lg hover:bg-[#1EBE5D] transition-colors flex items-center justify-center space-x-2 shadow-xs"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp</span>
                </a>
                <a
                  href={`tel:${HOTEL_INFO.primaryPhone}`}
                  className="w-full sm:w-auto px-5 py-2.5 bg-[#171717] text-white text-xs uppercase tracking-wider font-sans font-semibold rounded-lg hover:bg-[#C59B51] transition-colors flex items-center justify-center space-x-2 shadow-xs"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call Desk</span>
                </a>
              </div>

              <button
                onClick={() => setSubmitted(false)}
                className="text-xs text-[#737373] hover:text-[#171717] font-sans inline-flex items-center space-x-1"
              >
                <RotateCcw className="w-3.5 h-3.5 mr-1" />
                <span>Submit another inquiry</span>
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMsg && (
                <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs font-sans rounded-lg">
                  {errorMsg}
                </div>
              )}

              {/* Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#404040] font-sans font-semibold mb-1">
                    Full Name <span className="text-[#C59B51]">*</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Your Full Name"
                    required
                    className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#EAE4D9] text-[#171717] text-xs font-sans rounded-lg focus:outline-hidden focus:border-[#C59B51] focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#404040] font-sans font-semibold mb-1">
                    Phone / WhatsApp <span className="text-[#C59B51]">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    required
                    className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#EAE4D9] text-[#171717] text-xs font-sans rounded-lg focus:outline-hidden focus:border-[#C59B51] focus:bg-white"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#404040] font-sans font-semibold mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@domain.com"
                  className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#EAE4D9] text-[#171717] text-xs font-sans rounded-lg focus:outline-hidden focus:border-[#C59B51] focus:bg-white"
                />
              </div>

              {/* Dates */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#404040] font-sans font-semibold mb-1">
                    Check-in
                  </label>
                  <input
                    type="date"
                    name="checkIn"
                    value={formData.checkIn}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#EAE4D9] text-[#171717] text-xs font-sans rounded-lg focus:outline-hidden focus:border-[#C59B51] focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#404040] font-sans font-semibold mb-1">
                    Check-out
                  </label>
                  <input
                    type="date"
                    name="checkOut"
                    value={formData.checkOut}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#EAE4D9] text-[#171717] text-xs font-sans rounded-lg focus:outline-hidden focus:border-[#C59B51] focus:bg-white"
                  />
                </div>
              </div>

              {/* Room & Guests */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#404040] font-sans font-semibold mb-1">
                    Suite Preference
                  </label>
                  <select
                    name="roomPreference"
                    value={formData.roomPreference}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#EAE4D9] text-[#171717] text-xs font-sans rounded-lg focus:outline-hidden focus:border-[#C59B51] focus:bg-white"
                  >
                    <option value="Any Room">Any Room / Best Available</option>
                    <option value="Villa Suite Lake View">Villa Suite Lake View</option>
                    <option value="Super Deluxe Lake View">Super Deluxe Lake View</option>
                    <option value="Super Deluxe Triple Sharing">Super Deluxe Triple</option>
                    <option value="Deluxe Non Lake View">Deluxe Non Lake View</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#404040] font-sans font-semibold mb-1">
                    Guests
                  </label>
                  <select
                    name="adults"
                    value={formData.adults}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#EAE4D9] text-[#171717] text-xs font-sans rounded-lg focus:outline-hidden focus:border-[#C59B51] focus:bg-white"
                  >
                    <option value="1 Adult">1 Adult</option>
                    <option value="2 Adults">2 Adults</option>
                    <option value="3 Adults">3 Adults</option>
                    <option value="4 Adults">4 Adults</option>
                    <option value="5+ Adults">5+ Adults (Group)</option>
                  </select>
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#404040] font-sans font-semibold mb-1">
                  Notes / Requests
                </label>
                <textarea
                  name="message"
                  rows={2}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Special requests, arrival timings..."
                  className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#EAE4D9] text-[#171717] text-xs font-sans rounded-lg focus:outline-hidden focus:border-[#C59B51] focus:bg-white resize-none"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-[#C59B51] hover:bg-[#B3873E] text-white text-xs uppercase tracking-wider font-sans font-semibold rounded-lg transition-colors shadow-xs"
                >
                  {loading ? 'Submitting...' : 'Confirm Inquiry'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
