import React, { useState, useEffect } from 'react';
import { 
  Menu, X, ChevronRight, Star, Scissors, Award, User, Droplet, Sparkles, 
  MapPin, Phone, Clock, Instagram, Youtube, Calendar, Mail, CheckCircle,
  Settings, LogOut, MessageSquare, Edit3, Trash2, Download, Plus, Key, Eye, EyeOff, Shield, Globe, Save, Check, Image as ImageIcon
} from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

// ─── SUPABASE CLIENT (credentials loaded from .env) ──────────────────────
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const appId = 'kemekem_barbershop';

// Icon components moved inline (JSX not allowed at module level)

const TRANSLATIONS = {
  en: {
    nav_home: 'Home',
    nav_services: 'Services',
    nav_about: 'About',
    nav_gallery: 'Gallery',
    nav_team: 'Team',
    nav_reviews: 'Reviews',
    btn_my_bookings: 'My Bookings',
    btn_book_now: 'Book Now',
    btn_view_services: 'View Services',
    lbl_our_menu: 'Our Menu',
    lbl_grooming_services: 'Grooming Services',
    lbl_book: 'Book',
    lbl_our_story: 'Our Story',
    lbl_location: 'Location',
    lbl_hours: 'Hours',
    lbl_the_masters: 'The Masters',
    lbl_meet_barbers: 'Meet Our Barbers',
    lbl_experience: 'Experience',
    lbl_book_with: 'Book with',
    lbl_customer_dashboard: 'Customer Dashboard',
    lbl_scheduled_appointments: 'My Scheduled Appointments',
    lbl_no_appointments: 'No scheduled appointments found under your profile session. Need a precision fade or traditional beard shave?',
    lbl_reschedule: 'Reschedule',
    lbl_cancel: 'Cancel',
    lbl_testimonials: 'Testimonials',
    lbl_client_reviews: 'Client Reviews',
    lbl_based_on: 'Based on 500+ Reviews',
    lbl_quick_links: 'Quick Links',
    lbl_contact_info: 'Contact Info',
    lbl_opening_hours: 'Opening Hours',
    lbl_admin_panel: 'Admin Panel',
    lbl_select_service: 'Select Service',
    lbl_select_barber: 'Select Barber',
    lbl_select_date_time: 'Select Date & Time',
    lbl_your_details: 'Your Details',
    lbl_any_barber: 'Any Barber',
    lbl_first_available: 'First available slot',
    lbl_continue: 'Continue',
    lbl_back: 'Back',
    lbl_confirm: 'Confirm Reservation',
    lbl_confirming: 'Confirming...',
    lbl_success: 'Booking Successful!',
    lbl_return_home: 'Return to home',
    lbl_recent_looks_title: 'Recent Haircuts Gallery',
    lbl_recent_looks_subtitle: 'Inspiration for your next luxury precision cut',
    lbl_premium_grooming: 'Premium Addis Grooming',
    lbl_barbershop_suffix: 'Barbershop',
    lbl_about_footer_text: 'Drop by our lounge in Piazza for a premium grooming experience. Walk-ins are always welcome, but scheduling online guarantees you secure your preferred session with our talented specialists.',
    lbl_master_cut: 'Master Cut',
    lbl_get_this_look: 'Get this look with our master barbers today.',
    lbl_gallery_empty: 'Our style catalog is currently being updated. Come back soon to preview our freshest designs!',
    lbl_appointment_ref: 'Appointment Ref:',
    lbl_grooming_specialist: 'Grooming Specialist:',
    lbl_at: 'at',
    lbl_status_cancelled: 'Cancelled',
    lbl_status_groomed: 'Groomed',
    lbl_book_appointment_header: 'Book Appointment',
    lbl_choose_service_desc: 'Choose the service you\'d like to book.',
    lbl_choose_barber_desc: 'Choose your preferred grooming specialist.',
    lbl_choose_time_desc: 'Choose when you\'d like to come in.',
    lbl_reservation_date: 'Reservation Date',
    lbl_available_slots: 'Available Slots',
    lbl_time_format_note: '24-hour format (03:00 = 3 AM, 13:00 = 1 PM, 21:00 = 9 PM)',
    lbl_contact_info_desc: 'Provide your contact info to finalize reservation & reminders.',
    lbl_full_name: 'Full Name *',
    lbl_ex_name: 'Ex: Kirubel Yoseph',
    lbl_phone_number: 'Phone Number *',
    lbl_ex_phone: 'Ex: 0924657777',
    lbl_email_address: 'Email Address *',
    lbl_ex_email: 'Ex: client@domain.com',
    lbl_email_required_desc: 'Required to receive confirmation email & schedule reminders.',
    lbl_success_message: 'Thank you, {0}. Your appointment with {1} is confirmed for {2} at {3}.',
    lbl_confirmation_notice_title: 'Important: Arrival Time Notice',
    lbl_confirmation_notice: 'Please arrive on time for your appointment. Customers who arrive more than 5 minutes late may have their appointment canceled or rescheduled to avoid delays for other clients.',
    lbl_email_confirmation_subject: 'Your Appointment Confirmation - Kemekem Barbershop',
    lbl_email_confirmation_body: 'Dear {0},\n\nYour appointment has been confirmed:\n\nService: {1}\nBarber: {2}\nDate: {3}\nTime: {4}\n\nIMPORTANT: Please arrive on time for your appointment. Customers who arrive more than 5 minutes late may have their appointment canceled or rescheduled to avoid delays for other clients.\n\nIf you need to reschedule or cancel, please contact us as soon as possible.\n\nThank you for choosing Kemekem Barbershop!\n\nLocation: Piazza, Addis Ababa',
    lbl_sms_confirmation: 'Hi {0}, your appointment with {1} is confirmed for {2} at {3}. Please arrive on time. Late arrivals (5+ mins) may be rescheduled.',
    lbl_any_available_barber: 'Any Available Barber',
    lbl_unknown_barber: 'Unknown Barber',
    lbl_unknown_service: 'Unknown Service',
    lbl_admin_auth_lock: 'Owner Authorization Lock',
    lbl_admin_auth_desc: 'Please enter your secure owner passcode to access controls.',
    lbl_type_passcode: 'Type Passcode',
    lbl_access_console: 'Access Console',
    lbl_invalid_passcode: 'Invalid credentials. Please verify passcode.',
    lbl_footer_desc: 'Premium grooming experience in the heart of Addis Ababa. Where tradition meets modern style.',
    lbl_all_rights_reserved: 'All rights reserved.',
    lbl_designed_for: 'Designed for premium grooming',
    lbl_price: 'Price:',
    lbl_duration: 'Duration:',
    lbl_owner_dashboard: 'Owner Dashboard',
    lbl_status: 'Status:',
    lbl_cloud_live: 'Cloud Live',
    lbl_offline_mode: 'Offline Simulation Mode',
    lbl_back_to_website: 'Back to Website',
    lbl_log_out: 'Log Out',
    lbl_manage_bookings: 'Manage Bookings',
    lbl_manage_services: 'Manage Services',
    lbl_barber_profiles: 'Barber Profiles',
    lbl_recent_looks: 'Recent Looks',
    lbl_settings_security: 'Settings & Security',
    lbl_about_section_image: 'About Section Image',
    lbl_about_image_upload: 'Upload Custom About Image',
    lbl_about_image_description: 'Upload a professional image of an Ethiopian man that represents your barbershop. This will display in the About section.',
    lbl_upload_about_image: 'Upload About Image',
    lbl_about_image_uploaded: 'About image updated successfully!',
    lbl_remove_custom_image: 'Use Default Image',
    lbl_current_about_image: 'Current About Image',
    lbl_recent_bookings: 'Recent Bookings',
    lbl_export_csv: 'Export CSV',
    lbl_col_datetime: 'Date/Time',
    lbl_col_client_info: 'Client Info',
    lbl_slot_unavailable: 'This time slot is unavailable. Please select another available time.',
    lbl_slot_booked: 'Booked',
    lbl_slot_blocked: 'Not Available',
    lbl_conflict_error: 'This slot was just booked by another customer. Please select a different time.',
    lbl_loading_availability: 'Loading availability...',
    lbl_no_availability: 'No available time slots for this date. Please choose another date.',
    lbl_block_time_slot: 'Block Time Slot',
    lbl_blocked_slots: 'Blocked Slots',
    lbl_manage_blocked_slots: 'Manage Blocked Time Slots',
    lbl_block_reason: 'Reason for blocking',
    lbl_barber_unavailable: 'Barber Unavailable',
    lbl_barber_on_leave: 'On Leave',
    lbl_barber_sick: 'Sick Leave',
    lbl_unblock_slot: 'Unblock',
    lbl_blocked_slots_list: 'Blocked Time Slots',
    lbl_time_format_settings: 'Time Format Settings',
    lbl_select_time_format: 'Select Time Format',
    lbl_format_24hour: '24-Hour Format (13:00, 14:00, 15:00)',
    lbl_format_12hour: '12-Hour Format (1:00 PM, 2:00 PM, 3:00 PM)',
    lbl_format_ethiopian: 'Ethiopian Format (1:00, 2:00, 3:00)',
    lbl_preview_format: 'Live Preview',
    lbl_save_time_format: 'Save Time Format',
    lbl_time_format_saved: 'Time format saved successfully!',
    lbl_time_format_sample: 'Sample Times:',
    lbl_current_format: 'Current Format:',
    lbl_col_service: 'Requested Service',
    lbl_col_barber: 'Assigned Barber',
    lbl_col_status: 'Status Flag',
    lbl_col_actions: 'Actions',
    lbl_no_appointments_yet: 'No appointments scheduled yet.',
    lbl_email_reminder: 'Email Reminder',
    lbl_grooming_menu: 'Grooming Menu',
    lbl_add_new_service: 'Add New Service',
    lbl_edit_service: 'Edit Service',
    lbl_service_name: 'Service Name',
    lbl_price_text: 'Price Text',
    lbl_duration_text: 'Duration',
    lbl_icon_style: 'Icon Style',
    lbl_description: 'Description',
    lbl_cancel_btn: 'Cancel',
    lbl_save_service: 'Save Service',
    lbl_add_new_barber: 'Add New Barber',
    lbl_edit_barber: 'Edit Barber Profile',
    lbl_barber_full_name: 'Barber Full Name',
    lbl_specialty_title: 'Specialty Title',
    lbl_experience_years: 'Experience (Years)',
    lbl_notification_email: 'Notification Email',
    lbl_profile_image_url: 'Profile Image URL',
    lbl_save_barber: 'Save Barber',
    lbl_edit_profile: 'Edit profile',
    lbl_add_new_look: 'Add New Look',
    lbl_edit_look: 'Edit Look Image',
    lbl_upload_drop_photo: 'Upload / Drop Haircut Photo',
    lbl_replace_image: 'Replace Image',
    lbl_choose_image: 'Choose Image',
    lbl_or_paste_url: 'Or Paste Image URL',
    lbl_save_look: 'Save Look',
    lbl_manage_looks_desc: 'Manage up to 10 photos of your haircuts displayed directly in the live gallery.',
    lbl_general_website_settings: 'General Website Settings',
    lbl_shop_name: 'Shop Name',
    lbl_hero_button_text: 'Hero Button Text',
    lbl_hero_headline: 'Hero Headline',
    lbl_hero_subtitle: 'Hero Subtitle',
    lbl_contact_info_hours: 'Contact Info & Opening Hours',
    lbl_business_address: 'Business Address',
    lbl_phone: 'Phone',
    lbl_operating_hours_text: 'Operating Hours Text',
    lbl_security_admin_passcode: 'Security: Admin Passcode',
    lbl_security_change_password: 'Security: Change Password',
    lbl_update_password: 'Update Password',
    lbl_clear: 'Clear',
    lbl_current_password: 'Current Password *',
    lbl_owner_verification: 'Owner Verification Required',
    lbl_owner_access_only: 'This feature is only available to the barbershop owner.',
    lbl_verify_owner: 'Verify Owner Access',
    lbl_owner_email: 'Owner Email',
    lbl_owner_email_placeholder: 'Enter owner email address',
    lbl_owner_password: 'Owner Password',
    lbl_verify_access: 'Verify Access',
    lbl_invalid_owner_credentials: 'Invalid owner credentials. Access denied.',
    lbl_owner_verified: 'Owner verified. Access granted.',
    lbl_new_password: 'New Password *',
    lbl_confirm_new_password: 'Confirm New Password *',
    lbl_password_requirements: 'Password Requirements:',
    lbl_status_confirmed: 'Confirmed',
    lbl_status_completed: 'Completed',
    lbl_looks_limit_warning: '⚠️ You have reached the limit of 10 portfolio looks. To upload a new haircut image, please edit/replace an existing one or delete a photo from the gallery.',
    lbl_no_looks_added: 'No looks added yet. Add your first haircut look to showcase your work!',
    lbl_update_admin_passcode_desc: 'Update the default master credentials to protect owner actions.',
    lbl_update_password_desc: 'Update your admin password with a strong, secure password. Your password will be encrypted for protection.',
    lbl_min_8_chars: 'Minimum 8 characters',
    lbl_one_uppercase: 'At least one uppercase letter (A-Z)',
    lbl_one_lowercase: 'At least one lowercase letter (a-z)',
    lbl_one_number: 'At least one number (0-9)',
    lbl_one_special: 'At least one special character (!@#$%^&*)',
    lbl_error: 'Error:',
    lbl_success_lbl: 'Success:',
    lbl_set_admin_passcode: 'Set Admin Passcode',
    lbl_enter_current_password: 'Enter your current password',
    lbl_enter_new_password: 'Enter a new secure password',
    lbl_reenter_new_password: 'Re-enter your new password'
  },
  am: {
    nav_home: 'መነሻ',
    nav_services: 'አገልግሎቶች',
    nav_about: 'ስለ እኛ',
    nav_gallery: 'የፎቶ ማዕከለ-ስዕላት',
    nav_team: 'ባለሙያዎች',
    nav_reviews: 'ግምገማዎች',
    btn_my_bookings: 'ቀጠሮዎቼ',
    btn_book_now: 'ቀጠሮ ይያዙ',
    btn_view_services: 'አገልግሎቶችን ይመልከቱ',
    lbl_our_menu: 'የኛ ዝርዝር',
    lbl_grooming_services: 'የውበት አገልግሎቶች',
    lbl_book: 'ይዘዙ',
    lbl_our_story: 'ታሪካችን',
    lbl_location: 'አድራሻ',
    lbl_hours: 'የስራ ሰዓት',
    lbl_the_masters: 'ዋና ባለሙያዎች',
    lbl_meet_barbers: 'ባለሙያዎቻችንን ያግኙ',
    lbl_experience: 'የስራ ልምድ',
    lbl_book_with: 'ከዚህ ጋር ይዘዙ',
    lbl_customer_dashboard: 'የደንበኛ ማዕከል',
    lbl_scheduled_appointments: 'የተያዙ ቀጠሮዎች',
    lbl_no_appointments: 'በእርስዎ መገለጫ ስር ምንም የተቀጠረ ጊዜ አልተገኘም። አዲስ ቀጠሮ ይያዙ?',
    lbl_reschedule: 'ቀጠሮ ያሻሽሉ',
    lbl_cancel: 'ሰርዝ',
    lbl_testimonials: 'ምስክርነቶች',
    lbl_client_reviews: 'የደንበኞች አስተያየት',
    lbl_based_on: 'በ500+ ግምገማዎች ላይ የተመሰረተ',
    lbl_quick_links: 'ፈጣን አገናኞች',
    lbl_contact_info: 'የመገናኛ መረጃ',
    lbl_opening_hours: 'የስራ ሰዓታት',
    lbl_admin_panel: 'አስተዳዳሪ',
    lbl_select_service: 'አገልግሎት ይምረጡ',
    lbl_select_barber: 'ባለሙያ ይምረጡ',
    lbl_select_date_time: 'ቀን እና ሰዓት ይምረጡ',
    lbl_your_details: 'የእርስዎ መረጃ',
    lbl_any_barber: 'ማንኛውም ባለሙያ',
    lbl_first_available: 'የመጀመሪያው ክፍት ጊዜ',
    lbl_continue: 'ቀጥል',
    lbl_back: 'ተመለስ',
    lbl_confirm: 'ቀጠሮውን አረጋግጥ',
    lbl_confirming: 'በማረጋገጥ ላይ...',
    lbl_success: 'ቀጠሮዎ ተይዟል!',
    lbl_return_home: 'ወደ መነሻ ተመለስ',
    lbl_recent_looks_title: 'የቅርብ ጊዜ የፀጉር ስታይሎች',
    lbl_recent_looks_subtitle: 'ለሚቀጥለው ዘመናዊ ቆራጭዎ አነሳሽ ስታይሎች',
    lbl_premium_grooming: 'ፕሪሚየም የአዲስ አበባ የውበት አገልግሎት',
    lbl_barbershop_suffix: 'ባርበርሾፕ',
    lbl_about_footer_text: 'ለተለየ የውበት አገልግሎት በፒያሳ ወደሚገኘው ማዕከላችን ብቅ ይበሉ። ያለቀጠሮ መምጣት ሁልጊዜም ይቻላል፣ ነገር ግን በመስመር ላይ ቀጠሮ መያዝዎ ከተዋጣላቸው ባለሙያዎቻችን ጋር የሚፈልጉትን ጊዜ እንዲያገኙ ዋስትና ይሰጣል።',
    lbl_master_cut: 'ማስተር ቆራጭ',
    lbl_get_this_look: 'ይህን ስታይል ዛሬውኑ ከዋና ባለሙያዎቻችን ጋር ያግኙ።',
    lbl_gallery_empty: 'የእኛ የስታይል ካታሎግ በአሁኑ ጊዜ እየተዘመነ ነው። አዳዲስ ዲዛይኖቻችንን ለማየት በቅርቡ ይመለሱ!',
    lbl_appointment_ref: 'የቀጠሮ መለያ:',
    lbl_grooming_specialist: 'የውበት ባለሙያ:',
    lbl_at: 'በ',
    lbl_status_cancelled: 'ተሰርዟል',
    lbl_status_groomed: 'አገልግሎት አግኝቷል',
    lbl_book_appointment_header: 'ቀጠሮ ይያዙ',
    lbl_choose_service_desc: 'የሚፈልጉትን አገልግሎት ይምረጡ።',
    lbl_choose_barber_desc: 'የሚመርጡትን የውበት ባለሙያ ይምረጡ።',
    lbl_choose_time_desc: 'የሚመጡበትን ጊዜ ይምረጡ።',
    lbl_reservation_date: 'የቀጠሮ ቀን',
    lbl_available_slots: 'ክፍት ሰዓቶች',
    lbl_time_format_note: '24-ሰዓታት ቅርጸት (03:00 = ረ 3 ሰ, 13:00 = ከ 1 ሰ, 21:00 = ከ 9 ሰ)',
    lbl_contact_info_desc: 'ቀጠሮዎን ለማጠናቀቅ እና ማሳሰቢያዎችን ለማግኘት የመገናኛ መረጃዎን ያቅርቡ።',
    lbl_full_name: 'ሙሉ ስም *',
    lbl_ex_name: 'ምሳሌ: ኪሩቤል ዮሴፍ',
    lbl_phone_number: 'ስልክ ቁጥር *',
    lbl_ex_phone: 'ምሳሌ: 0924657777',
    lbl_email_address: 'የኢሜል አድራሻ *',
    lbl_ex_email: 'ምሳሌ: client@domain.com',
    lbl_email_required_desc: 'የማረጋገጫ ኢሜል እና የቀጠሮ ማሳሰቢያዎችን ለመቀበል ያስፈልጋል።',
    lbl_success_message: 'እናመሰግናለን፣ {0}። ከ {1} ጋር ያለዎት ቀጠሮ ለ {2} በ {3} ተረጋግጧል።',
    lbl_confirmation_notice_title: 'አስፈላጊ: የድምጽ ጊዜ ማስታወቂያ',
    lbl_confirmation_notice: 'እባክዎ ለ ቀጠሮዎ በወቅቱ ምጡ። ከ5 ደቂቃ በላይ ዘግይተው የሚገቡ ደንበኞች ቀጠሮአቸው ተሰርዞ ወይም ሌሎች ደንበኞችን ለማሳከት ለሌላ ጊዜ ሊቀመጠ ይችላል።',
    lbl_email_confirmation_subject: 'የቀጠሮ ማረጋገጫ - ከመከም ባርበር',
    lbl_email_confirmation_body: 'ውድ {0},\n\nቀጠሮዎ ተረጋግጧል:\n\nአገልግሎት: {1}\nወንበር ባርቤር: {2}\nቀን: {3}\nጊዜ: {4}\n\nአስፈላጊ: እባክዎ ለ ቀጠሮዎ በወቅቱ ምጡ። ከ5 ደቂቃ በላይ ዘግይተው የሚገቡ ደንበኞች ቀጠሮአቸው ተሰርዞ ወይም ሌሎች ደንበኞችን ለማሳከት ለሌላ ጊዜ ሊቀመጠ ይችላል።\n\nቀጠሮን እንደገና ለማስያዙ ወይም ለመሰረዝ እባክዎ በቅርቡ ያገኙን።\n\nከመከም ባርበር ምርጫ ላለ ምስጋና!\n\nሙሉ አድራሻ: ፒያዛ, አዲስ አበባ',
    lbl_sms_confirmation: 'ሰላም {0}፣ ከ {1} ጋር ያለዎት ቀጠሮ ለ {2} በ {3} ተረጋግጧል። በወቅቱ እንድትምጡ አበክዎ። ዘግይ መድረስ ሊቀመጠ ይችላል።',
    lbl_any_available_barber: 'ማንኛውም ክፍት ባለሙያ',
    lbl_unknown_barber: 'ያልታወቀ ባለሙያ',
    lbl_unknown_service: 'ያልታወቀ አገልግሎት',
    lbl_admin_auth_lock: 'የባለቤት ማረጋገጫ ቁልፍ',
    lbl_admin_auth_desc: 'እባክዎ መቆጣጠሪያዎችን ለመድረስ ደህንነቱ የተጠበቀ የባለቤት ይለፍ ቃል ያስገቡ።',
    lbl_type_passcode: 'የይለፍ ቃል ያስገቡ',
    lbl_access_console: 'ኮንሶል ግባ',
    lbl_invalid_passcode: 'የተሳሳተ መረጃ። እባክዎ የይለፍ ቃሉን ያረጋግጡ።',
    lbl_footer_desc: 'በአዲስ አበባ እምብርት ውስጥ ፕሪሚየም የውበት አገልግሎት። ባህል ከዘመናዊ ስታይል ጋር የሚገናኝበት።',
    lbl_all_rights_reserved: 'መብቱ በህግ የተጠበቀ ነው።',
    lbl_designed_for: 'ለፕሪሚየም የውበት አገልግሎት የተነደፈ',
    lbl_price: 'ዋጋ:',
    lbl_duration: 'ቆይታ:',
    lbl_owner_dashboard: 'የባለቤት መቆጣጠሪያ ማዕከል',
    lbl_status: 'ሁኔታ:',
    lbl_cloud_live: 'ከክላውድ ጋር የተገናኘ',
    lbl_offline_mode: 'ከመስመር ውጭ (ሲሙሌሽን)',
    lbl_back_to_website: 'ወደ ድረ-ገጽ ተመለስ',
    lbl_log_out: 'ውጣ',
    lbl_manage_bookings: 'ቀጠሮዎችን አስተዳድር',
    lbl_manage_services: 'አገልግሎቶችን አስተዳድር',
    lbl_barber_profiles: 'የባለሙያ መገለጫዎች',
    lbl_recent_looks: 'የቅርብ ጊዜ ስታይሎች',
    lbl_settings_security: 'ቅንብሮች እና ደህንነት',
    lbl_about_section_image: 'ስለ ክፍል ምስል',
    lbl_about_image_upload: 'ብዙ ምስል ስለ ክፍል ይስቀሉ',
    lbl_about_image_description: 'ባርበር ሱቁን የሚወክል የኢትዮጵያ ወንድ 전문적 ምስል ይስቀሉ። ይህ በስለ ክፍል ውስጥ ይታያል።',
    lbl_upload_about_image: 'ስለ ክፍል ምስል ይስቀሉ',
    lbl_about_image_uploaded: 'ስለ ክፍል ምስል በተሳካ ሁኔታ ተዘምኗል!',
    lbl_remove_custom_image: 'ነባር ምስል ተጠቀም',
    lbl_current_about_image: 'የአሁኑ ስለ ክፍል ምስል',
    lbl_recent_bookings: 'የቅርብ ጊዜ ቀጠሮዎች',
    lbl_export_csv: 'በCSV አውርድ',
    lbl_col_datetime: 'ቀን/ሰዓት',
    lbl_col_client_info: 'የደንበኛ መረጃ',
    lbl_slot_unavailable: 'ይህ ሰዓት ክፍት አይደለም። ሌላ ክፍት ሰዓት ይምረጡ።',
    lbl_slot_booked: 'ተያዘ',
    lbl_slot_blocked: 'ክፍት አይደለም',
    lbl_conflict_error: 'ይህ ቀጠሮ ሌላ ደንበኛ ተያዘው። ሌላ ሰዓት ይምረጡ።',
    lbl_loading_availability: 'ክፍት ሰዓቶች ስናገኝ...',
    lbl_no_availability: 'በዚህ ቀን ክፍት ሰዓት አለም። ሌላ ቀን ይምረጡ።',
    lbl_block_time_slot: 'ሰዓቱን አግድ',
    lbl_blocked_slots: 'የተገደበ ሰዓቶች',
    lbl_manage_blocked_slots: 'የተገደበ ሰዓቶችን አስተዳድር',
    lbl_block_reason: 'የመገደብ ምክንያት',
    lbl_barber_unavailable: 'ባለሙያ ክፍት አይደለም',
    lbl_barber_on_leave: 'በበጀት ላይ',
    lbl_barber_sick: 'በበሽታ ፍቅድ',
    lbl_unblock_slot: 'ግድያ ዕንባ',
    lbl_blocked_slots_list: 'የተገደበ ሰዓቶች',
    lbl_time_format_settings: 'የሰዓት ቅርጸት ቅንብሮች',
    lbl_select_time_format: 'የሰዓት ቅርጸት ይምረጡ',
    lbl_format_24hour: '24-ሰዓታት ቅርጸት (13:00, 14:00, 15:00)',
    lbl_format_12hour: '12-ሰዓታት ቅርጸት (1:00 PM, 2:00 PM, 3:00 PM)',
    lbl_format_ethiopian: 'ኢትዮጵያዊ ቅርጸት (1:00, 2:00, 3:00)',
    lbl_preview_format: 'ቅድመ-ዕይታ',
    lbl_save_time_format: 'የሰዓት ቅርጸት ጠብቅ',
    lbl_time_format_saved: 'የሰዓት ቅርጸት በተሳካ ሁኔታ ተቀምጧል!',
    lbl_time_format_sample: 'ናሙና ሰዓቶች:',
    lbl_current_format: 'አሁኑ ቅርጸት:',
    lbl_col_service: 'የተጠየቀ አገልግሎት',
    lbl_col_barber: 'የተመደበ ባለሙያ',
    lbl_col_status: 'ሁኔታ',
    lbl_col_actions: 'እርምጃዎች',
    lbl_no_appointments_yet: 'እስካሁን ምንም ቀጠሮ አልተያዘም።',
    lbl_email_reminder: 'የኢሜል ማሳሰቢያ',
    lbl_grooming_menu: 'የአገልግሎት ዝርዝር',
    lbl_add_new_service: 'አዲስ አገልግሎት አክል',
    lbl_edit_service: 'አገልግሎት አርትዕ',
    lbl_service_name: 'የአገልግሎቱ ስም',
    lbl_price_text: 'ዋጋ',
    lbl_duration_text: 'ቆይታ',
    lbl_icon_style: 'የአዶ ስታይል',
    lbl_description: 'መግለጫ',
    lbl_cancel_btn: 'ሰርዝ',
    lbl_save_service: 'አገልግሎት አስቀምጥ',
    lbl_add_new_barber: 'አዲስ ባለሙያ አክል',
    lbl_edit_barber: 'የባለሙያ መገለጫ አርትዕ',
    lbl_barber_full_name: 'የባለሙያ ሙሉ ስም',
    lbl_specialty_title: 'የሙያ ማዕረግ',
    lbl_experience_years: 'የልምድ ዓመታት',
    lbl_notification_email: 'የማሳወቂያ ኢሜል',
    lbl_profile_image_url: 'የመገለጫ ምስል URL',
    lbl_save_barber: 'ባለሙያ አስቀምጥ',
    lbl_edit_profile: 'መገለጫ አርትዕ',
    lbl_add_new_look: 'አዲስ ስታይል አክል',
    lbl_edit_look: 'የስታይል ምስል አርትዕ',
    lbl_upload_drop_photo: 'የፀጉር አቆራረጥ ፎቶ ይስቀሉ',
    lbl_replace_image: 'ምስል ይቀይሩ',
    lbl_choose_image: 'ምስል ይምረጡ',
    lbl_or_paste_url: 'ወይም የምስል URL ይለጥፉ',
    lbl_save_look: 'ስታይል አስቀምጥ',
    lbl_manage_looks_desc: 'በቀጥታ በጋለሪ ውስጥ የሚታዩ እስከ 10 የፀጉር አቆራረጥ ፎቶዎችን ያስተዳድሩ።',
    lbl_general_website_settings: 'አጠቃላይ የድረ-ገጽ ቅንብሮች',
    lbl_shop_name: 'የሱቅ ስም',
    lbl_hero_button_text: 'የዋና ገፅ አዝራር ጽሑፍ',
    lbl_hero_headline: 'የዋና ገፅ ርዕስ',
    lbl_hero_subtitle: 'የዋና ገፅ ንዑስ ርዕስ',
    lbl_contact_info_hours: 'የመገናኛ መረጃ እና የስራ ሰዓት',
    lbl_business_address: 'የንግድ አድራሻ',
    lbl_phone: 'ስልክ',
    lbl_operating_hours_text: 'የስራ ሰዓት መግለጫ',
    lbl_security_admin_passcode: 'ደህንነት: የአስተዳዳሪ የይለፍ ቃል',
    lbl_security_change_password: 'ደህንነት: የይለፍ ቃል ቀይር',
    lbl_update_password: 'የይለፍ ቃል አዘምን',
    lbl_clear: 'አፅዳ',
    lbl_current_password: 'የአሁኑ የይለፍ ቃል *',
    lbl_owner_verification: 'የባለቤት ማረጋገጫ ያስፈልጋል',
    lbl_owner_access_only: 'ይህ ባህሪ ለባርበር ሱቁ ባለቤት ብቻ ይገኛል።',
    lbl_verify_owner: 'የባለቤት መዳረሻ ማረጋገጥ',
    lbl_owner_email: 'የባለቤት ኢሜይል',
    lbl_owner_email_placeholder: 'የባለቤት ኢሜይል አድራሻ ያስገቡ',
    lbl_owner_password: 'የባለቤት ይለፍ ቃል',
    lbl_verify_access: 'መዳረሻ ያረጋግጡ',
    lbl_invalid_owner_credentials: 'ልክ ያልሆነ የባለቤት ተዋወቂዎች። መዳረሻ ተከልክሎ ተመልሷል።',
    lbl_owner_verified: 'ባለቤት ታውቋል። መዳረሻ ተሰጠ።',
    lbl_new_password: 'አዲስ የይለፍ ቃል *',
    lbl_confirm_new_password: 'አዲሱን የይለፍ ቃል አረጋግጥ *',
    lbl_password_requirements: 'የይለፍ ቃል መስፈርቶች:',
    lbl_status_confirmed: 'ተረጋግጧል',
    lbl_status_completed: 'ተጠናቋል',
    lbl_looks_limit_warning: '⚠️ የ10 ፎቶዎች ገደብ ላይ ደርሰዋል። አዲስ ለማከል፣ እባክዎ ያለውን ፎቶ ያርትዑ ወይም ይሰርዙ።',
    lbl_no_looks_added: 'እስካሁን ምንም ምስል አልታከለም። ስራዎን ለማሳየት የመጀመሪያ ፎቶዎን ያክሉ!',
    lbl_update_admin_passcode_desc: 'የባለቤት ቁጥጥሮችን ለመጠበቅ ነባሪውን የአስተዳዳሪ መረጃ ያዘምኑ።',
    lbl_update_password_desc: 'የአስተዳዳሪ ይለፍ ቃልዎን ጠንካራ እና ደህንነቱ የተጠበቀ ያድርጉት። የእርስዎ የይለፍ ቃል ለጥበቃ ይመሰጠራል።',
    lbl_min_8_chars: 'ቢያንስ 8 ፊደላት/ቁጥሮች',
    lbl_one_uppercase: 'ቢያንስ አንድ ትልቅ ፊደል (A-Z)',
    lbl_one_lowercase: 'ቢያንስ አንድ ትንሽ ፊደል (a-z)',
    lbl_one_number: 'ቢያንስ አንድ ቁጥር (0-9)',
    lbl_one_special: 'ቢያንስ አንድ ልዩ ምልክት (!@#$%^&*)',
    lbl_error: 'ስህተት:',
    lbl_success_lbl: 'ተሳክቷል:',
    lbl_set_admin_passcode: 'የይለፍ ቃል ያስገቡ',
    lbl_enter_current_password: 'የአሁኑን የይለፍ ቃል ያስገቡ',
    lbl_enter_new_password: 'አዲስ ጠንካራ የይለፍ ቃል ያስገቡ',
    lbl_reenter_new_password: 'አዲሱን የይለፍ ቃል በድጋሚ ያስገቡ'
  }
};

const DYNAMIC_TRANSLATIONS = {
  // Hero
  "Best Barber in Addis Ababa": "በአዲስ አበባ ምርጡ ባርበር",
  "Experience luxury grooming and precise cuts in a relaxed, modern atmosphere.": "በዘመናዊ እና ምቹ መንፈስ ውስጥ የላቀ የውበት እንክብካቤ እና ትክክለኛ የፀጉር አቆራረጥን ይለማመዱ።",
  "Book Appointment": "ቀጠሮ ይያዙ",
  
  // About
  "The Kemekem Experience": "የከመከም ልምድ",
  "At Kemekem Barbershop, we blend traditional Ethiopian hospitality with modern, premium grooming. Whether you need a fresh fade, a classic cut, or a relaxing hot towel shave, our master barbers ensure you leave looking and feeling your absolute best. We pride ourselves on attention to detail, high-quality products, and an atmosphere where you can truly unwind.": "በከመከም ባርበርሾፕ፣ ባህላዊውን የኢትዮጵያዊያን መስተንግዶ ከዘመናዊ የውበት አገልግሎት ጋር አጣምረን እናቀርባለን። ዘመናዊ ፌድ፣ ክላሲክ ቆራረጥ፣ ወይም ዘና የሚያደርግ የሞቀ ፎጣ ፂም ቆራረጥ ቢፈልጉ፣ ዋና ባለሙያዎቻችን ፍፁም ምቾት እና ምርጥ ገፅታ ይዘው እንደሚወጡ ያረጋግጣሉ። ለዝርዝሮች በምንሰጠው ትኩረት፣ በከፍተኛ ጥራት ምርቶቻችን እና ዘና በሚሉበት ድባብ እንኮራለን።",
  
  // Services
  "Premium Haircut": "ፕሪሚየም የፀጉር አቆራረጥ",
  "Tailored cut, styling, and hot towel finish.": "ልዩ አቆራረጥ፣ ስታይሊንግ፣ እና የሞቀ ፎጣ አጨራረስ።",
  "Royal Beard Trim": "የንጉሳዊ ፂም ማስተካከል",
  "Precision shaping, conditioning oil, and straight razor line-up.": "ትክክለኛ ቅርፅ ማውጣት፣ ማለስለሻ ዘይት፣ እና በምላጭ ማስተካከል።",
  "Executive Package": "የአስፈፃሚ ፓኬጅ",
  "Haircut, beard grooming, facial massage, and hair wash.": "የፀጉር አቆራረጥ፣ የፂም እንክብካቤ፣ የፊት ማሳጅ፣ እና የፀጉር እጥበት።",
  "Kids Haircut": "የልጆች ፀጉር አቆራረጥ",
  "Gentle and stylish cuts for the young kings.": "ለወጣት ንጉሶች ጥንቃቄ የተሞላበት እና ዘመናዊ አቆራረጥ።",
  "Color & Dye": "ቀለም እና ዳይ",
  "Professional hair or beard coloring.": "ፕሮፌሽናል የፀጉር ወይም የፂም ቀለም።",
  "Scalp Treatment": "የራስ ቅል ህክምና",
  "Deep cleaning, exfoliating, and massaging.": "ጥልቅ እጥበት፣ ማፅዳት፣ እና ማሳጅ።",

  // Roles
  "Master Barber": "ዋና ባርበር",
  "Fade Specialist": "የፌድ ስፔሻሊስት",
  "Beard Expert": "የፂም ኤክስፐርት",
  
  // Admin dynamic states
  "Saving changes...": "ለውጦች በመቀመጥ ላይ...",
  "Saved successfully!": "በተሳካ ሁኔታ ተቀምጧል!",
  "Error saving modifications.": "ለውጦቹን በማስቀመጥ ላይ ስህተት ተፈጥሯል።",
  "Image size must be less than 10MB": "የምስል መጠን ከ10ሜባ ያነሰ መሆን አለበት",
  "Processing and compressing...": "በማሰናዳት ላይ...",
  "Failed to parse file. Please try a different image.": "ፋይሉን ማንበብ አልተቻለም። እባክዎ ሌላ ምስል ይሞክሩ።",
  "Please provide an image": "እባክዎ ምስል ያቅርቡ",
  "Maximum limit of 10 haircut images reached. Delete an existing look first.": "የ10 ምስሎች ገደብ ላይ ደርሰዋል። መጀመሪያ ያለውን ይሰርዙ።",
  "Saving to cloud database...": "ወደ ዳታቤዝ በማስቀመጥ ላይ...",
  "Document limit exceeded! Please use smaller images or an image URL.": "የሰነድ መጠን አልፏል! አነስተኛ ምስል ወይም URL ይጠቀሙ።",
  "All fields are required": "ሁሉም ቦታዎች መሞላት አለባቸው",
  "Current password is incorrect": "የአሁኑ የይለፍ ቃል ትክክል አይደለም",
  "New password must be different from current password": "አዲሱ የይለፍ ቃል ከአሁኑ የተለየ መሆን አለበት",
  "New password and confirm password do not match": "አዲሱ የይለፍ ቃል እና ማረጋገጫው አይመሳሰሉም",
  "Password changed successfully!": "የይለፍ ቃል በተሳካ ሁኔታ ተቀይሯል!",
  "Failed to update password. Please try again.": "የይለፍ ቃል ማዘመን አልተሳካም። እባክዎ እንደገና ይሞክሩ።",
};

const DEFAULT_CONTENT = {
  shopName: "Kemekem Barbershop",
  // Owner/admin authentication is handled by Supabase Auth.
  // To grant admin access: 1) create the user in Supabase Auth (Dashboard → Authentication → Users)
  // 2) add a row to the admin_users table with that user's id (see supabase_schema.sql)
  hero: {
    title: "Best Barber in Addis Ababa",
    subtitle: "Experience luxury grooming and precise cuts in a relaxed, modern atmosphere.",
    btnText: "Book Appointment"
  },
  about: {
    title: "The Kemekem Experience",
    text: "At Kemekem Barbershop, we blend traditional Ethiopian hospitality with modern, premium grooming. Whether you need a fresh fade, a classic cut, or a relaxing hot towel shave, our master barbers ensure you leave looking and feeling your absolute best. We pride ourselves on attention to detail, high-quality products, and an atmosphere where you can truly unwind.",
    customImage: null  // Admin can upload custom image here
  },
  services: [
    { id: 's1', name: 'Premium Haircut', price: '800 ETB', duration: '45 min', iconName: 'Scissors', desc: 'Tailored cut, styling, and hot towel finish.' },
    { id: 's2', name: 'Royal Beard Trim', price: '500 ETB', duration: '30 min', iconName: 'Scissors', desc: 'Precision shaping, conditioning oil, and straight razor line-up.' },
    { id: 's3', name: 'Executive Package', price: '1200 ETB', duration: '75 min', iconName: 'Award', desc: 'Haircut, beard grooming, facial massage, and hair wash.' },
    { id: 's4', name: 'Kids Haircut', price: '500 ETB', duration: '30 min', iconName: 'User', desc: 'Gentle and stylish cuts for the young kings.' },
    { id: 's5', name: 'Color & Dye', price: '1500 ETB', duration: '60 min', iconName: 'Droplet', desc: 'Professional hair or beard coloring.' },
    { id: 's6', name: 'Scalp Treatment', price: '600 ETB', duration: '30 min', iconName: 'Sparkles', desc: 'Deep cleaning, exfoliating, and massaging.' },
  ],
  team: [
    { id: 'b1', name: 'Dawit Mekonnen', role: 'Master Barber', experience: '12 Years', rating: 4.9, email: 'dawit@kemekem.com', img: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=100' },
    { id: 'b2', name: 'Abel Tesfaye', role: 'Fade Specialist', experience: '8 Years', rating: 4.8, email: 'abel@kemekem.com', img: 'https://images.unsplash.com/photo-1618306644026-9f8e818b2c45?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=100' },
    { id: 'b3', name: 'Yonatan Alemu', role: 'Beard Expert', experience: '5 Years', rating: 4.7, email: 'yonatan@kemekem.com', img: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=100' },
  ],
  reviews: [
    { id: 'r1', name: 'Ephrem B.', text: 'Best fade in Addis! The attention to detail is unmatched.', rating: 5, date: '2 weeks ago' },
    { id: 'r2', name: 'Samuel T.', text: 'Clean, professional, and luxurious. Highly recommend the executive package.', rating: 5, date: '1 month ago' },
    { id: 'r3', name: 'Kirubel A.', text: 'Great atmosphere and skilled barbers. Consistently excellent service.', rating: 4, date: '3 months ago' }
  ],
  contact: {
    address: 'Piazza Downtown 3rd Floor (ፒያሳ ዳውንታው 3ኛ ፎቅ)',
    phone: '0924657777',
    email: 'info@kemekem.com',
    hours: 'Mon-Sun: 06:00 - 21:00'
  },
  recentLooks: [
    { id: 'look1', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=100' },
    { id: 'look2', img: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=100' },
    { id: 'look3', img: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=100' }
  ]
};

export default function App() {
  const [content, setContent] = useState(DEFAULT_CONTENT);
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [lang, setLang] = useState('en');

  const t = (key) => TRANSLATIONS[lang][key] || key;
  const td = (text) => (lang === 'am' && DYNAMIC_TRANSLATIONS[text]) ? DYNAMIC_TRANSLATIONS[text] : text;
  
  const translateTimeAndPrice = (str) => {
    if (lang === 'en' || !str) return str;
    return str.replace('min', 'ደቂቃ').replace('Years', 'ዓመታት').replace('Year', 'ዓመት').replace('ETB', 'ብር');
  };
  
  // Navigation & Control States
  const [isAdminView, setIsAdminView] = useState(false);
  const [adminTab, setAdminTab] = useState('bookings');
  const [dbStatus, setDbStatus] = useState('connected');

  // ─── UNIFIED OWNER AUTH (single source of truth) ──────────────────────────
  // Legacy passcode system removed. Only email+password owner auth.
  const [isOwnerVerified, setIsOwnerVerified] = useState(false);
  const [ownerLoginModal, setOwnerLoginModal] = useState(false);
  const [ownerCredentials, setOwnerCredentials] = useState({ email: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  const [showOwnerPassword, setShowOwnerPassword] = useState(false);

  // Booking states
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ serviceId: '', barberId: '', date: '', time: '', name: '', phone: '', email: '' });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Unified Local memory for offline appointments
  const [localBookings, setLocalBookings] = useState([]);
  const [bookingsList, setBookingsList] = useState([]);

  // Booking Conflict Prevention System
  // Time Format: 24-hour format (e.g., 03:00, 13:00, 21:00) - NO AM/PM labels
  // Available slots: 03:00 to 21:00 (early morning to late evening), hourly intervals
  const [bookedSlots, setBookedSlots] = useState({}); // { "barberId-date": ["10:00", "11:00"] }
  const [blockedSlots, setBlockedSlots] = useState({}); // { "barberId-date": ["14:00", "15:00"] } - Admin blocked slots
  const [availableSlots] = useState(['03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00']);
  const [selectedBarberAvailability, setSelectedBarberAvailability] = useState([]);
  const [isLoadingAvailability, setIsLoadingAvailability] = useState(false);
  const [adminBlockSlotModal, setAdminBlockSlotModal] = useState(false);
  const [blockSlotForm, setBlockSlotForm] = useState({ barberId: '', date: '', time: '', reason: 'unavailable' });

  // ===== TIME FORMAT SETTINGS =====
  // Flexible time format: '24hour', '12hour', or 'ethiopian'
  const [timeFormatSetting, setTimeFormatSetting] = useState('24hour');
  const [previewTimeFormat, setPreviewTimeFormat] = useState('24hour');
  const [timeFormatLoading, setTimeFormatLoading] = useState(false);
  const [timeFormatSaved, setTimeFormatSaved] = useState(false);

  // Editor specific states
  const [editingService, setEditingService] = useState(null);
  const [editingBarber, setEditingBarber] = useState(null);
  const [editingLook, setEditingLook] = useState(null);
  const [saveStatus, setSaveStatus] = useState('');
  const [previewImage, setPreviewImage] = useState(null);
  const [uploadError, setUploadError] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordChange, setPasswordChange] = useState({ current: '', new: '', confirm: '' });
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');

  // ─── SUPABASE AUTH: restore session + listen for changes ─────────────────
  useEffect(() => {
    let mounted = true;

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!mounted) return;
      setUser(session?.user || { uid: 'anonymous' });
      if (session?.user) checkIsAdmin(session.user.id);
      setDbStatus('connected');
    }).catch(() => {
      if (mounted) { setUser({ uid: 'anonymous' }); setDbStatus('offline'); }
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!mounted) return;
      if (session?.user) {
        setUser(session.user);
        checkIsAdmin(session.user.id);
      } else {
        setUser({ uid: 'anonymous' });
        setIsOwnerVerified(false);
      }
    });

    return () => { mounted = false; listener?.subscription?.unsubscribe(); };
  }, []);

  /** Checks the admin_users table to confirm this authenticated user is an owner/admin */
  const checkIsAdmin = async (userId) => {
    try {
      const { data, error } = await supabase
        .from('admin_users')
        .select('user_id')
        .eq('user_id', userId)
        .maybeSingle();
      if (!error && data) {
        setIsOwnerVerified(true);
      } else {
        setIsOwnerVerified(false);
      }
    } catch {
      setIsOwnerVerified(false);
    }
  };

  // ─── SUPABASE: load shop settings, services, team ─────────────────────────
  useEffect(() => {
    if (!user) return;
    (async () => {
      try {
        const [settingsRes, servicesRes, teamRes, blockedRes] = await Promise.all([
          supabase.from('shop_settings').select('*').eq('id', 1).maybeSingle(),
          supabase.from('services').select('*').order('display_order'),
          supabase.from('team').select('*').order('display_order'),
          supabase.from('blocked_slots').select('*'),
        ]);

        if (settingsRes.data) {
          const s = settingsRes.data;
          setContent(prev => ({
            ...prev,
            shopName: s.shop_name || prev.shopName,
            hero: { ...prev.hero, ...(s.hero || {}) },
            about: { ...prev.about, ...(s.about || {}) },
            contact: { ...prev.contact, ...(s.contact || {}) },
            reviews: s.reviews?.length ? s.reviews : prev.reviews,
            recentLooks: s.recent_looks || prev.recentLooks,
          }));
          if (s.time_format) { setTimeFormatSetting(s.time_format); setPreviewTimeFormat(s.time_format); }
        }

        if (servicesRes.data?.length) {
          setContent(prev => ({
            ...prev,
            services: servicesRes.data.map(s => ({
              id: s.id, name: s.name, desc: s.description, price: s.price,
              duration: s.duration, iconName: s.icon_name
            }))
          }));
        }

        if (teamRes.data?.length) {
          setContent(prev => ({
            ...prev,
            team: teamRes.data.map(b => ({
              id: b.id, name: b.name, role: b.role, bio: b.bio, img: b.img
            }))
          }));
        }

        if (blockedRes.data?.length) {
          const grouped = {};
          blockedRes.data.forEach(row => {
            const key = `${row.barber_id}-${row.blocked_date}`;
            if (!grouped[key]) grouped[key] = [];
            grouped[key].push(row.time_slot);
          });
          setBlockedSlots(grouped);
        }

        setDbStatus('connected');
      } catch (err) {
        console.error('Supabase load error:', err);
        setDbStatus('offline');
      }
    })();
  }, [user]);

  // ─── SUPABASE: load bookings (+ realtime updates) ─────────────────────────
  useEffect(() => {
    if (!user) return;

    const loadBookings = async () => {
      try {
        const { data, error } = await supabase
          .from('bookings')
          .select('*')
          .order('created_at', { ascending: false });
        if (!error && data) {
          setBookingsList(data.map(mapBookingFromDb));
        }
      } catch (err) {
        console.error('Error loading bookings:', err);
      }
    };
    loadBookings();

    // Realtime: keep bookings list in sync across tabs/devices
    const channel = supabase
      .channel('bookings-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'bookings' }, () => {
        loadBookings();
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [user]);

  /** Maps a Supabase bookings row (snake_case) to the app's camelCase shape */
  const mapBookingFromDb = (row) => ({
    id: row.id,
    name: row.name,
    phone: row.phone,
    email: row.email,
    serviceId: row.service_id,
    serviceName: row.service_name,
    barberId: row.barber_id,
    barberName: row.barber_name,
    date: row.booking_date,
    time: row.time_slot,
    status: row.status,
    userId: row.user_id,
    createdAt: row.created_at,
  });

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const activeClientBookings = [
    ...bookingsList.filter(b => b.userId === (user?.id || 'anonymous')),
    ...localBookings
  ];

  // ============ BOOKING CONFLICT PREVENTION SYSTEM ============
  
  // Get all booked times for a specific barber and date
  const getBookedTimesForBarber = (barberId, date) => {
    const key = `${barberId}-${date}`;
    return bookedSlots[key] || [];
  };

  // Get all blocked times for a specific barber and date
  const getBlockedTimesForBarber = (barberId, date) => {
    const key = `${barberId}-${date}`;
    return blockedSlots[key] || [];
  };

  // Get available time slots for a barber on a specific date
  const getAvailableTimeSlots = (barberId, date) => {
    if (!barberId || !date) return [];
    
    const bookedTimes = getBookedTimesForBarber(barberId, date);
    const blockedTimes = getBlockedTimesForBarber(barberId, date);
    const allUnavailableTimes = [...bookedTimes, ...blockedTimes];
    
    return availableSlots.filter(slot => !allUnavailableTimes.includes(slot));
  };

  // Check if a specific time slot is available for a barber
  const isTimeSlotAvailable = (barberId, date, time) => {
    const bookedTimes = getBookedTimesForBarber(barberId, date);
    const blockedTimes = getBlockedTimesForBarber(barberId, date);
    return !bookedTimes.includes(time) && !blockedTimes.includes(time);
  };

  // Check for booking conflicts before confirming
  const checkBookingConflict = (barberId, date, time) => {
    return !isTimeSlotAvailable(barberId, date, time);
  };

  // Load availability data from database (real-time sync)
  useEffect(() => {
    if (!formData.barberId || !formData.date || !isBookingModalOpen) return;

    setIsLoadingAvailability(true);
    const timeoutId = setTimeout(() => {
      // Get booked times for selected barber and date
      const booked = bookingsList
        .filter(b => b.barberId === formData.barberId && b.date === formData.date && b.status === 'confirmed')
        .map(b => b.time);
      
      // Build booked slots map
      const newBookedSlots = { ...bookedSlots };
      const key = `${formData.barberId}-${formData.date}`;
      newBookedSlots[key] = booked;
      setBookedSlots(newBookedSlots);

      // Get available slots
      const available = getAvailableTimeSlots(formData.barberId, formData.date);
      setSelectedBarberAvailability(available);
      setIsLoadingAvailability(false);
    }, 300); // Small delay for visual feedback

    return () => clearTimeout(timeoutId);
  }, [formData.barberId, formData.date, bookingsList, isBookingModalOpen]);

  // Add or unblock a time slot for admin
  const handleBlockTimeSlot = async () => {
    if (!blockSlotForm.barberId || !blockSlotForm.date || !blockSlotForm.time) return;

    try {
      const { error } = await supabase.from('blocked_slots').upsert({
        barber_id: blockSlotForm.barberId,
        blocked_date: blockSlotForm.date,
        time_slot: blockSlotForm.time,
        reason: blockSlotForm.reason || 'unavailable',
        blocked_by: user?.email || user?.id || 'owner',
      }, { onConflict: 'barber_id,blocked_date,time_slot' });
      if (error) throw error;

      const key = `${blockSlotForm.barberId}-${blockSlotForm.date}`;
      setBlockedSlots(prev => {
        const updated = { ...prev };
        if (!updated[key]) updated[key] = [];
        if (!updated[key].includes(blockSlotForm.time)) updated[key].push(blockSlotForm.time);
        return updated;
      });
      setBlockSlotForm({ barberId: '', date: '', time: '', reason: 'unavailable' });
      setAdminBlockSlotModal(false);
    } catch (error) {
      console.error("Error blocking time slot:", error);
      setUploadError('Failed to block slot: ' + error.message);
      setTimeout(() => setUploadError(''), 4000);
    }
  };

  // Unblock a time slot
  const handleUnblockTimeSlot = async (barberId, date, time) => {
    try {
      const { error } = await supabase
        .from('blocked_slots')
        .delete()
        .eq('barber_id', barberId)
        .eq('blocked_date', date)
        .eq('time_slot', time);
      if (error) throw error;

      const key = `${barberId}-${date}`;
      setBlockedSlots(prev => {
        const updated = { ...prev };
        if (updated[key]) {
          updated[key] = updated[key].filter(t => t !== time);
          if (updated[key].length === 0) delete updated[key];
        }
        return updated;
      });
    } catch (error) {
      console.error("Error unblocking time slot:", error);
      setUploadError('Failed to unblock slot: ' + error.message);
      setTimeout(() => setUploadError(''), 4000);
    }
  };

  // ===== TIME FORMAT CONVERSION FUNCTIONS =====
  
  // Convert 24-hour format (e.g., "14:00") to desired format
  const formatTime = (time24, format) => {
    if (!time24 || time24.length < 5) return time24;
    
    const [hoursStr, minutes] = time24.split(':');
    const hours = parseInt(hoursStr);
    
    switch(format) {
      case '24hour':
        // Already in 24-hour format: 14:00
        return time24;
      
      case '12hour':
        // 12-hour format with AM/PM: 2:00 PM
        const period = hours >= 12 ? 'PM' : 'AM';
        const hours12 = hours % 12 || 12;
        return `${hours12}:${minutes} ${period}`;
      
      case 'ethiopian':
        // Ethiopian format without AM/PM: 2:00
        const ethiopianHours = hours % 12 || 12;
        return `${ethiopianHours}:${minutes}`;
      
      default:
        return time24;
    }
  };

  // Format all times in available slots array based on selected format
  const getFormattedSlots = (slots, format) => {
    return slots.map(slot => formatTime(slot, format));
  };

  // Save time format preference to Supabase shop_settings
  const handleSaveTimeFormat = async () => {
    setTimeFormatLoading(true);
    try {
      const { error } = await supabase
        .from('shop_settings')
        .upsert({ id: 1, time_format: previewTimeFormat, updated_at: new Date().toISOString() });
      if (error) throw error;
      setTimeFormatSetting(previewTimeFormat);
      setTimeFormatSaved(true);
      setTimeout(() => setTimeFormatSaved(false), 3000);
    } catch (error) {
      console.error("Error saving time format:", error);
      setUploadError('Failed to save time format: ' + error.message);
      setTimeout(() => setUploadError(''), 4000);
    } finally {
      setTimeFormatLoading(false);
    }
  };

  const scrollTo = (id) => {
    setIsMenuOpen(false);
    if (isAdminView) setIsAdminView(false);

    setTimeout(() => {
      if (id === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const element = document.getElementById(id);
        if (element) {
          const yOffset = -80; 
          const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }
    }, 120);
  };

  // ─── UNIFIED ADMIN AUTH FUNCTIONS ─────────────────────────────────────────

  /** Open admin panel — only if already verified, otherwise show login modal */
  const openAdminPanel = () => {
    if (isOwnerVerified) {
      setIsAdminView(true);
      setAdminTab('bookings');
    } else {
      setLoginError('');
      setOwnerCredentials({ email: '', password: '' });
      setOwnerLoginModal(true);
    }
  };

  /** Handle owner login via real Supabase Auth */
  const handleOwnerLogin = async () => {
    setLoginError('');
    if (!ownerCredentials.email.trim() || !ownerCredentials.password) {
      setLoginError('Please enter your email and password.');
      return;
    }
    setLoginLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: ownerCredentials.email.trim(),
        password: ownerCredentials.password,
      });

      if (error) {
        setLoginError(
          error.message.includes('Invalid login credentials')
            ? 'Incorrect email or password.'
            : error.message
        );
        setOwnerCredentials(prev => ({ ...prev, password: '' }));
        return;
      }

      // Confirm this user is actually in admin_users (not just any Supabase user)
      const { data: adminRow, error: adminErr } = await supabase
        .from('admin_users')
        .select('user_id')
        .eq('user_id', data.user.id)
        .maybeSingle();

      if (adminErr || !adminRow) {
        setLoginError('This account does not have admin access.');
        await supabase.auth.signOut();
        return;
      }

      setIsOwnerVerified(true);
      setOwnerLoginModal(false);
      setOwnerCredentials({ email: '', password: '' });
      setLoginError('');
      setAdminTab('bookings');
      setIsAdminView(true);
    } catch (err) {
      setLoginError('Login failed. Please check your connection and try again.');
    } finally {
      setLoginLoading(false);
    }
  };

  /** Full logout — clears Supabase session and all admin UI state */
  const handleOwnerLogout = async () => {
    try { await supabase.auth.signOut(); } catch {}
    setIsOwnerVerified(false);
    setIsAdminView(false);
    setOwnerLoginModal(false);
    setOwnerCredentials({ email: '', password: '' });
    setLoginError('');
    setAdminTab('bookings');
    setEditingService(null);
    setEditingBarber(null);
    setEditingLook(null);
    setUploadError('');
    setSaveStatus('');
  };

  const saveGeneralSettings = async (updates) => {
    setSaveStatus('Saving changes...');
    try {
      const updatedContent = { ...content, ...updates };
      setContent(updatedContent);

      // Map camelCase app content → snake_case DB columns
      const dbPayload = { id: 1, updated_at: new Date().toISOString() };
      if (updates.shopName !== undefined) dbPayload.shop_name = updates.shopName;
      if (updates.hero !== undefined) dbPayload.hero = updatedContent.hero;
      if (updates.about !== undefined) dbPayload.about = updatedContent.about;
      if (updates.contact !== undefined) dbPayload.contact = updatedContent.contact;
      if (updates.reviews !== undefined) dbPayload.reviews = updatedContent.reviews;
      if (updates.recentLooks !== undefined) dbPayload.recent_looks = updatedContent.recentLooks;

      if (Object.keys(dbPayload).length > 2) {
        const { error } = await supabase.from('shop_settings').upsert(dbPayload);
        if (error) throw error;
      }

      setSaveStatus('Saved successfully!');
      setTimeout(() => setSaveStatus(''), 3000);
    } catch (err) {
      setSaveStatus('Error saving modifications.');
      setTimeout(() => setSaveStatus(''), 3000);
      console.error('Save error:', err);
    }
  };

  const handleSaveService = async (serviceData) => {
    try {
      const id = serviceData.id || ('s_' + Date.now());
      const row = {
        id,
        name: serviceData.name,
        description: serviceData.desc,
        price: serviceData.price,
        duration: serviceData.duration,
        icon_name: serviceData.iconName,
      };
      const { error } = await supabase.from('services').upsert(row);
      if (error) throw error;

      setContent(prev => {
        const exists = prev.services.some(s => s.id === id);
        const services = exists
          ? prev.services.map(s => s.id === id ? { ...serviceData, id } : s)
          : [...prev.services, { ...serviceData, id }];
        return { ...prev, services };
      });
      setEditingService(null);
      setSaveStatus('Service saved!');
      setTimeout(() => setSaveStatus(''), 2500);
    } catch (err) {
      console.error('Failed to save service', err);
      setUploadError('Failed to save service: ' + err.message);
      setTimeout(() => setUploadError(''), 4000);
    }
  };

  const handleDeleteService = async (id) => {
    try {
      const { error } = await supabase.from('services').delete().eq('id', id);
      if (error) throw error;
      setContent(prev => ({ ...prev, services: prev.services.filter(s => s.id !== id) }));
    } catch (err) {
      console.error('Failed to delete service', err);
      setUploadError('Failed to delete service: ' + err.message);
      setTimeout(() => setUploadError(''), 4000);
    }
  };

  const handleSaveBarber = async (barberData) => {
    try {
      const id = barberData.id || ('b_' + Date.now());
      const row = {
        id,
        name: barberData.name,
        role: barberData.role,
        bio: barberData.bio,
        img: barberData.img,
      };
      const { error } = await supabase.from('team').upsert(row);
      if (error) throw error;

      setContent(prev => {
        const exists = prev.team.some(b => b.id === id);
        const team = exists
          ? prev.team.map(b => b.id === id ? { ...barberData, id } : b)
          : [...prev.team, { ...barberData, id }];
        return { ...prev, team };
      });
      setEditingBarber(null);
      setSaveStatus('Barber profile saved!');
      setTimeout(() => setSaveStatus(''), 2500);
    } catch (err) {
      console.error('Failed to save barber profile', err);
      setUploadError('Failed to save barber: ' + err.message);
      setTimeout(() => setUploadError(''), 4000);
    }
  };

  const handleDeleteBarber = async (id) => {
    try {
      const { error } = await supabase.from('team').delete().eq('id', id);
      if (error) throw error;
      setContent(prev => ({ ...prev, team: prev.team.filter(b => b.id !== id) }));
    } catch (err) {
      console.error('Failed to delete barber', err);
      setUploadError('Failed to delete barber: ' + err.message);
      setTimeout(() => setUploadError(''), 4000);
    }
  };

  // Handle gallery image upload (Recent Looks)
  const handleImageUpload = (e, setImagePreview) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 15000000) {
        setUploadError('Image size must be less than 15MB');
        return;
      }
      setUploadError('Processing high-quality image...');
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          // Keep original raw quality if under safety threshold (~850KB)
          if (file.size < 850000) {
            setImagePreview(event.target.result);
            setUploadError('');
            return;
          }

          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          const maxDim = 1920; 

          if (width > height) {
            if (width > maxDim) {
              height *= maxDim / width;
              width = maxDim;
            }
          } else {
            if (height > maxDim) {
              width *= maxDim / height;
              height = maxDim;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';
          ctx.drawImage(img, 0, 0, width, height);
          
          const compressedBase64 = canvas.toDataURL('image/jpeg', 0.95);
          setImagePreview(compressedBase64);
          setUploadError('');
        };
        img.onerror = () => {
          setUploadError('Failed to parse file. Please try a different image.');
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle About Section Image Upload
  const handleAboutImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5000000) {
        setUploadError('Image size must be less than 5MB');
        return;
      }
      setUploadError('Processing image...');
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          // Optimize image for web
          if (file.size < 850000) {
            // Small enough, use as-is
            saveGeneralSettings({ about: { ...content.about, customImage: event.target.result } });
            setUploadError('');
            return;
          }

          // Compress larger images
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          const maxDim = 1920;

          if (width > height) {
            if (width > maxDim) {
              height *= maxDim / width;
              width = maxDim;
            }
          } else {
            if (height > maxDim) {
              width *= maxDim / height;
              height = maxDim;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';
          ctx.drawImage(img, 0, 0, width, height);
          
          const compressedBase64 = canvas.toDataURL('image/jpeg', 0.93);
          saveGeneralSettings({ about: { ...content.about, customImage: compressedBase64 } });
          setUploadError('');
        };
        img.onerror = () => {
          setUploadError('Failed to load image. Please try a different file.');
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveLook = async (lookData) => {
    if (!lookData.img) {
      setUploadError('Please provide an image');
      return;
    }
    let updatedLooks = content.recentLooks ? [...content.recentLooks] : [];
    
    if (!lookData.id && updatedLooks.length >= 10) {
      setUploadError('Maximum limit of 10 haircut images reached. Delete an existing look first.');
      return;
    }

    if (lookData.id) {
      updatedLooks = updatedLooks.map(l => l.id === lookData.id ? lookData : l);
    } else {
      const newLook = { ...lookData, id: 'look_' + Date.now() };
      updatedLooks.push(newLook);
    }
    
    try {
      setUploadError('Saving to cloud database...');
      await saveGeneralSettings({ recentLooks: updatedLooks });
      setEditingLook(null);
      setPreviewImage(null);
      setUploadError('');
    } catch (err) {
      if (err.message && err.message.includes('exceeds')) {
        setUploadError('Document limit exceeded! Please use smaller images or an image URL.');
      } else {
        setUploadError('Database save failed: ' + (err.message || 'Unknown error'));
      }
    }
  };

  const handleDeleteLook = async (id) => {
    try {
      const updatedLooks = (content.recentLooks || []).filter(l => l.id !== id);
      await saveGeneralSettings({ recentLooks: updatedLooks });
    } catch (error) {
      setUploadError('Failed to delete image. Please try again.');
      setTimeout(() => setUploadError(''), 3000);
    }
  };

  const validatePasswordStrength = (password) => {
    const errors = [];
    if (password.length < 8) errors.push(t('lbl_min_8_chars'));
    if (!/[A-Z]/.test(password)) errors.push(t('lbl_one_uppercase'));
    if (!/[a-z]/.test(password)) errors.push(t('lbl_one_lowercase'));
    if (!/[0-9]/.test(password)) errors.push(t('lbl_one_number'));
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) errors.push(t('lbl_one_special'));
    return errors;
  };

  const handleChangePassword = async () => {
    setPasswordError('');
    setPasswordSuccess('');

    if (!passwordChange.current || !passwordChange.new || !passwordChange.confirm) {
      setPasswordError('All fields are required');
      return;
    }

    if (passwordChange.new === passwordChange.current) {
      setPasswordError('New password must be different from current password');
      return;
    }

    const strengthErrors = validatePasswordStrength(passwordChange.new);
    if (strengthErrors.length > 0) {
      const msgPrefix = lang === 'am' ? 'አዲሱ የይለፍ ቃል እነዚህን ማካተት አለበት:' : 'New password must contain:';
      setPasswordError(`${msgPrefix} ${strengthErrors.join(', ')}`);
      return;
    }

    if (passwordChange.new !== passwordChange.confirm) {
      setPasswordError('New password and confirm password do not match');
      return;
    }

    try {
      // Re-verify current password by re-authenticating before allowing a change
      const { error: reauthError } = await supabase.auth.signInWithPassword({
        email: user?.email,
        password: passwordChange.current,
      });
      if (reauthError) {
        setPasswordError('Current password is incorrect');
        return;
      }

      const { error } = await supabase.auth.updateUser({ password: passwordChange.new });
      if (error) throw error;

      setPasswordSuccess('Password changed successfully!');
      setPasswordChange({ current: '', new: '', confirm: '' });
      setTimeout(() => setPasswordSuccess(''), 5000);
    } catch (error) {
      setPasswordError(error.message || 'Failed to update password. Please try again.');
    }
  };

  const handleBookingSubmit = async () => {
    if (!formData.name || !formData.phone || !formData.email || !formData.email.includes('@')) {
      setFormErrors({
        name: !formData.name,
        phone: !formData.phone,
        email: !formData.email || !formData.email.includes('@')
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const selectedService = content.services.find(s => s.id === formData.serviceId);
      const selectedBarber = content.team.find(b => b.id === formData.barberId);
      const barberName = formData.barberId === 'any' ? t('lbl_any_available_barber') : (selectedBarber?.name || t('lbl_unknown_barber'));

      // ===== FAST CLIENT-SIDE PRE-CHECK (instant UX feedback) =====
      const isConflict = checkBookingConflict(formData.barberId, formData.date, formData.time);
      if (isConflict) {
        setFormErrors({ time: t('lbl_conflict_error') });
        setStep(3);
        setIsSubmitting(false);
        return;
      }

      // ===== AUTHORITATIVE CHECK: insert into Supabase =====
      // The `unique_active_booking_slot` partial unique index on
      // (barber_id, booking_date, time_slot) WHERE status IN ('confirmed','pending')
      // is the real source of truth — it prevents two customers from
      // booking the same slot even if they submit at the exact same moment.
      const { data, error } = await supabase
        .from('bookings')
        .insert({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          service_id: formData.serviceId,
          service_name: selectedService?.name || t('lbl_unknown_service'),
          barber_id: formData.barberId,
          barber_name: barberName,
          booking_date: formData.date,
          time_slot: formData.time,
          status: 'confirmed',
          user_id: user?.id || null,
        })
        .select()
        .single();

      if (error) {
        // Postgres unique_violation = code 23505 — someone else just took this slot
        if (error.code === '23505') {
          setFormErrors({ time: t('lbl_conflict_error') });
          setStep(3);
          return;
        }
        throw error;
      }

      const newBooking = mapBookingFromDb(data);
      setBookingsList(prev => [newBooking, ...prev]);
      setLocalBookings(prev => [newBooking, ...prev]);

      setStep(5);
    } catch (error) {
      console.error("Booking error:", error);
      setFormErrors({ time: 'Something went wrong. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancelBooking = async (bookingId) => {
    try {
      const { error } = await supabase
        .from('bookings')
        .update({ status: 'cancelled' })
        .eq('id', bookingId);
      if (error) throw error;

      const updater = b => b.id === bookingId ? { ...b, status: 'cancelled' } : b;
      setLocalBookings(prev => prev.map(updater));
      setBookingsList(prev => prev.map(updater));
    } catch (err) {
      console.error("Cancel action error:", err);
    }
  };

  const handleUpdateBookingStatus = async (id, newStatus) => {
    try {
      const { error } = await supabase
        .from('bookings')
        .update({ status: newStatus })
        .eq('id', id);
      if (error) throw error;

      const updater = b => b.id === id ? { ...b, status: newStatus } : b;
      setLocalBookings(prev => prev.map(updater));
      setBookingsList(prev => prev.map(updater));
    } catch (err) {
      console.error("Dashboard change error:", err);
      setUploadError('Failed to update booking status: ' + err.message);
      setTimeout(() => setUploadError(''), 4000);
    }
  };

  const exportBookingsCSV = () => {
    if (!bookingsList.length) return;
    const headers = "Date,Time,Client Name,Phone,Email,Service,Barber,Status\n";
    const csvContent = bookingsList.map(b => 
      `${b.date},${formatTime(b.time, timeFormatSetting)},"${b.name}","${b.phone}","${b.email}","${b.serviceName}","${b.barberName}","${b.status}"`
    ).join("\n");
    
    const blob = new Blob([headers + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "kemekem_bookings.csv";
    link.click();
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 font-sans selection:bg-amber-500 selection:text-zinc-950">

      {/* ── Custom Scrollbar Styles Injected via useEffect ── */}
      
      {/* ─── OWNER LOGIN MODAL ─────────────────────────────────────────────── */}
      {ownerLoginModal && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-sm z-[200] flex items-center justify-center p-4"
             onClick={(e) => e.target === e.currentTarget && !loginLoading && (setOwnerLoginModal(false), setLoginError(''))}>
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl max-w-sm w-full shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-amber-500/10 to-zinc-900 p-6 border-b border-zinc-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <Shield size={20} className="text-amber-500" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Owner Login</h3>
                  <p className="text-zinc-400 text-xs">Admin access only</p>
                </div>
                <button disabled={loginLoading}
                  onClick={() => { setOwnerLoginModal(false); setLoginError(''); setOwnerCredentials({ email: '', password: '' }); }}
                  className="ml-auto text-zinc-500 hover:text-white p-1 rounded-lg hover:bg-zinc-800 transition-colors">
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Form */}
            <div className="p-6 space-y-4">
              {/* Error banner */}
              {loginError && (
                <div className="flex items-start gap-2 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                  <span className="text-red-400 text-sm leading-relaxed">{loginError}</span>
                </div>
              )}

              {/* Email */}
              <div>
                <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wide mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  autoComplete="username"
                  placeholder="owner@kemekem.com"
                  value={ownerCredentials.email}
                  onChange={(e) => { setOwnerCredentials(p => ({ ...p, email: e.target.value })); setLoginError(''); }}
                  onKeyDown={(e) => e.key === 'Enter' && handleOwnerLogin()}
                  disabled={loginLoading}
                  className="w-full px-3.5 py-2.5 bg-zinc-950 border border-zinc-700 rounded-xl text-white text-sm outline-none focus:border-amber-500 transition-colors placeholder:text-zinc-600 disabled:opacity-50"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wide mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showOwnerPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    placeholder="••••••••••"
                    value={ownerCredentials.password}
                    onChange={(e) => { setOwnerCredentials(p => ({ ...p, password: e.target.value })); setLoginError(''); }}
                    onKeyDown={(e) => e.key === 'Enter' && handleOwnerLogin()}
                    disabled={loginLoading}
                    className="w-full px-3.5 py-2.5 pr-10 bg-zinc-950 border border-zinc-700 rounded-xl text-white text-sm outline-none focus:border-amber-500 transition-colors placeholder:text-zinc-600 disabled:opacity-50"
                  />
                  <button type="button" tabIndex={-1}
                    onClick={() => setShowOwnerPassword(p => !p)}
                    className="absolute right-3 top-2.5 text-zinc-500 hover:text-zinc-300 transition-colors">
                    {showOwnerPassword ? <EyeOff size={16}/> : <Eye size={16}/>}
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-1">
                <button
                  onClick={() => { setOwnerLoginModal(false); setLoginError(''); setOwnerCredentials({ email: '', password: '' }); }}
                  disabled={loginLoading}
                  className="flex-1 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-sm font-semibold rounded-xl transition-colors disabled:opacity-50">
                  Cancel
                </button>
                <button
                  onClick={handleOwnerLogin}
                  disabled={loginLoading || !ownerCredentials.email || !ownerCredentials.password}
                  className="flex-1 py-2.5 bg-amber-500 hover:bg-amber-400 text-zinc-950 text-sm font-bold rounded-xl transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
                  {loginLoading ? (
                    <><span className="w-4 h-4 border-2 border-zinc-950/30 border-t-zinc-950 rounded-full animate-spin" /> Verifying…</>
                  ) : (
                    <><Shield size={14}/> Sign In</>
                  )}
                </button>
              </div>

              <p className="text-zinc-600 text-xs text-center pt-1">
                Sign in with your registered owner account
              </p>
            </div>
          </div>
        </div>
      )}


      
      {/* Header / Navigation */}
      <header className={`fixed top-0 w-full z-40 transition-all duration-300 ${isScrolled ? 'bg-zinc-950/90 backdrop-blur-md border-b border-zinc-900 py-3' : 'bg-transparent py-5'}`}>
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => scrollTo('home')}>
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-amber-500 flex-shrink-0">
              <img src="https://i.ibb.co/dwRQd4t0/logo.jpg" alt="Logo" className="w-full h-full object-cover" onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=100"; }} />
            </div>
            <h1 className="text-xl md:text-2xl font-bold tracking-tight text-white uppercase group-hover:text-amber-500 transition-colors">
              {content.shopName.split(' ')[0]} <span className="font-light text-amber-500 group-hover:text-white transition-colors">{content.shopName.split(' ')[1] || t('lbl_barbershop_suffix')}</span>
            </h1>
          </div>
          
          <nav className="hidden md:flex items-center gap-8">
            {[
              { id: 'home', key: 'nav_home' },
              { id: 'services', key: 'nav_services' },
              { id: 'about', key: 'nav_about' },
              { id: 'gallery', key: 'nav_gallery' },
              { id: 'team', key: 'nav_team' },
              { id: 'reviews', key: 'nav_reviews' }
            ].map((item) => (
              <button key={item.id} onClick={() => scrollTo(item.id)} className="text-sm font-medium text-zinc-300 hover:text-amber-500 transition-colors">
                {t(item.key)}
              </button>
            ))}
            
            <button 
              onClick={() => scrollTo('appointments')} 
              className="text-sm font-semibold text-amber-500 border border-amber-500/30 bg-amber-500/5 px-3.5 py-1.5 rounded-lg hover:bg-amber-500 hover:text-zinc-950 transition-all flex items-center gap-2"
            >
              <Calendar size={14} /> {t('btn_my_bookings')} 
              {activeClientBookings.filter(b => b.status !== 'cancelled').length > 0 && (
                <span className="bg-amber-500 text-zinc-950 text-[10px] font-extrabold px-1.5 py-0.5 rounded-full">
                  {activeClientBookings.filter(b => b.status !== 'cancelled').length}
                </span>
              )}
            </button>

            <button onClick={() => { setStep(1); setIsBookingModalOpen(true); }} className="bg-amber-500 hover:bg-amber-600 text-zinc-950 px-6 py-2.5 rounded-full text-sm font-bold transition-all hover:scale-105">
              {t('btn_book_now')}
            </button>

            <button onClick={() => setLang(lang === 'en' ? 'am' : 'en')} className="flex items-center gap-1.5 text-zinc-300 hover:text-white font-bold text-sm bg-zinc-900 border border-zinc-700 px-3 py-1.5 rounded-full transition-colors ml-2">
              <Globe size={14} className="text-amber-500" /> {lang === 'en' ? 'አማ' : 'EN'}
            </button>
          </nav>
          
          <div className="flex items-center gap-4 md:hidden">
            <button onClick={() => setLang(lang === 'en' ? 'am' : 'en')} className="flex items-center gap-1.5 text-zinc-300 hover:text-white font-bold text-sm bg-zinc-900 border border-zinc-700 px-3 py-1.5 rounded-full transition-colors">
              <Globe size={14} className="text-amber-500" /> {lang === 'en' ? 'አማ' : 'EN'}
            </button>
            <button className="text-zinc-300 hover:text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-30 bg-zinc-950/95 backdrop-blur-lg flex flex-col items-center pt-24 pb-12 overflow-y-auto">
          <nav className="flex flex-col items-center gap-6 w-full px-6 my-auto">
            {[
              { id: 'home', key: 'nav_home' },
              { id: 'services', key: 'nav_services' },
              { id: 'about', key: 'nav_about' },
              { id: 'gallery', key: 'nav_gallery' },
              { id: 'team', key: 'nav_team' },
              { id: 'reviews', key: 'nav_reviews' }
            ].map((item) => (
              <button key={item.id} onClick={() => scrollTo(item.id)} className="text-2xl font-medium text-zinc-300 hover:text-amber-500 transition-colors w-full text-center border-b border-zinc-900 pb-4">
                {t(item.key)}
              </button>
            ))}
            
            <button 
              onClick={() => { scrollTo('gallery'); setIsMenuOpen(false); }} 
              className="text-xl font-semibold text-white border border-zinc-700 bg-zinc-900/50 py-3 rounded-xl w-full text-center hover:border-amber-500/30 hover:bg-zinc-900 transition-all flex items-center justify-center gap-2"
            >
              <Scissors size={18} className="text-amber-500" /> {t('nav_gallery')}
            </button>

            <button 
              onClick={() => { scrollTo('appointments'); setIsMenuOpen(false); }} 
              className="text-xl font-semibold text-amber-500 border border-amber-500/20 py-3 rounded-xl w-full text-center bg-amber-500/5 flex items-center justify-center gap-2"
            >
              <Calendar size={18} /> {t('btn_my_bookings')} 
              {activeClientBookings.filter(b => b.status !== 'cancelled').length > 0 && (
                <span className="bg-amber-500 text-zinc-950 text-xs px-2 py-0.5 rounded-full font-black">
                  {activeClientBookings.filter(b => b.status !== 'cancelled').length}
                </span>
              )}
            </button>

            <button onClick={() => { setIsBookingModalOpen(true); setIsMenuOpen(false); }} className="mt-4 bg-amber-500 text-zinc-950 w-full py-4 rounded-xl text-xl font-bold">
              {t('btn_book_now')}
            </button>
          </nav>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-grow pt-20">
        {!isAdminView ? (
          <>
            {/* Hero Section */}
            <section id="home" className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
              <video
                className="absolute inset-0 w-full h-full object-cover opacity-30"
                src="/hero.mp4"
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-transparent" />
              
              <div className="relative z-10 max-w-4xl mx-auto px-4 text-center mt-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-500 text-sm font-medium mb-6 animate-pulse">
                  <Star size={14} className="fill-amber-500" /> {t('lbl_premium_grooming')}
                </div>
                <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-none mb-6 tracking-tighter">
                  {td(content.hero.title)}
                </h2>
                <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed">
                  {td(content.hero.subtitle)}
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button onClick={() => { setStep(1); setIsBookingModalOpen(true); }} className="w-full sm:w-auto bg-amber-500 hover:bg-amber-600 text-zinc-950 px-8 py-4 rounded-full text-lg font-bold transition-all hover:scale-105 flex items-center justify-center gap-2 shadow-lg shadow-amber-500/10">
                    {td(content.hero.btnText)} <ChevronRight size={20} />
                  </button>
                  <button onClick={() => scrollTo('services')} className="w-full sm:w-auto bg-transparent hover:bg-zinc-900 border border-zinc-700 text-white px-8 py-4 rounded-full text-lg font-medium transition-all">
                    {t('btn_view_services')}
                  </button>
                </div>
              </div>
            </section>

            {/* Services Section */}
            <section id="services" className="py-24 bg-zinc-950 relative">
              <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
                <div className="text-center mb-16">
                  <h3 className="text-amber-500 font-medium tracking-widest uppercase text-sm mb-2">{t('lbl_our_menu')}</h3>
                  <h2 className="text-4xl md:text-5xl font-bold text-white">{t('lbl_grooming_services')}</h2>
                  <div className="w-24 h-1 bg-amber-500 mx-auto mt-6 rounded-full" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {content.services.map((service) => (
                    <div key={service.id} className="group p-8 rounded-2xl bg-zinc-900/40 border border-zinc-900 hover:border-amber-500/30 transition-all hover:bg-zinc-900 relative overflow-hidden flex flex-col justify-between">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-bl-full -z-10 group-hover:scale-110 transition-transform" />
                      <div>
                        <div className="w-12 h-12 bg-zinc-800 rounded-xl flex items-center justify-center text-amber-500 mb-6 group-hover:bg-amber-500 group-hover:text-zinc-950 transition-colors">
                          <Scissors size={20} />
                        </div>
                        <div className="flex justify-between items-start mb-4 gap-2">
                          <h4 className="text-xl font-bold text-white group-hover:text-amber-500 transition-colors">{td(service.name)}</h4>
                          <span className="text-amber-500 font-bold whitespace-nowrap bg-amber-500/5 px-2.5 py-1 rounded-md text-sm border border-amber-500/10">{translateTimeAndPrice(service.price)}</span>
                        </div>
                        <p className="text-zinc-400 text-sm mb-6 leading-relaxed">{td(service.desc)}</p>
                      </div>
                      <div className="flex items-center justify-between pt-4 border-t border-zinc-900">
                        <span className="text-xs text-zinc-500 flex items-center gap-1"><Clock size={12} /> {translateTimeAndPrice(service.duration)}</span>
                        <button onClick={() => { setFormData({...formData, serviceId: service.id}); setStep(2); setIsBookingModalOpen(true); }} className="text-sm font-medium text-white group-hover:text-amber-500 transition-colors flex items-center gap-1">
                          {t('lbl_book')} <ChevronRight size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* About Section */}
            <section id="about" className="py-24 bg-zinc-900 relative">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                  
                  <div className="relative">
                    <div className="aspect-square md:aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl relative z-10 bg-zinc-800">
                      <img 
                        src={content.about.customImage || "https://images.unsplash.com/photo-1539571696357-5a69c006ad4c?auto=format&fit=crop&w=1600&q=100&crop=faces"} 
                        alt="Kemekem Barbershop - Professional Ethiopian Grooming" 
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 will-change-transform"
                        style={{ 
                          imageRendering: 'high-quality', 
                          transform: 'translateZ(0)', 
                          backfaceVisibility: 'hidden' 
                        }}
                        loading="eager"
                        decoding="async"
                        onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1600&q=100"; }}
                      />
                    </div>
                    <div className="absolute inset-0 border-2 border-amber-500/20 rounded-3xl transform translate-x-4 translate-y-4 -z-10 hidden md:block"></div>
                  </div>
                  
                  <div className="space-y-8 text-white relative z-10">
                    <h3 className="text-amber-500 font-medium tracking-widest uppercase text-sm mb-2">{t('lbl_our_story')}</h3>
                    <h2 className="text-3xl md:text-4xl font-bold font-serif text-white">
                      {td(content.about.title)}
                    </h2>
                    <p className="text-zinc-300 leading-relaxed text-lg">
                      {td(content.about.text)}
                    </p>
                    <p className="text-zinc-400 leading-relaxed">
                      {t('lbl_about_footer_text')}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-zinc-800">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-zinc-950 rounded-lg text-amber-500 border border-zinc-800"><MapPin size={20} /></div>
                        <div>
                          <h5 className="font-bold text-white mb-1 text-sm">{t('lbl_location')}</h5>
                          <p className="text-xs text-zinc-400 leading-relaxed">{content.contact.address}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-zinc-950 rounded-lg text-amber-500 border border-zinc-800"><Clock size={20} /></div>
                        <div>
                          <h5 className="font-bold text-white mb-1 text-sm">{t('lbl_hours')}</h5>
                          <p className="text-xs text-zinc-400 leading-relaxed">{content.contact.hours}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </section>

            {/* Gallery Section */}
            <section id="gallery" className="py-24 bg-zinc-950 border-t border-zinc-900">
              <div className="max-w-7xl mx-auto px-4 md:px-8">
                <div className="text-center mb-16">
                  <h3 className="text-amber-500 font-medium tracking-widest uppercase text-sm mb-2">{t('lbl_recent_looks_title')}</h3>
                  <h2 className="text-4xl md:text-5xl font-bold text-white">{t('lbl_recent_looks_subtitle')}</h2>
                  <div className="w-24 h-1 bg-amber-500 mx-auto mt-6 rounded-full" />
                </div>

                {content.recentLooks && content.recentLooks.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {content.recentLooks.map((look) => (
                      <div key={look.id} className="group relative aspect-[4/5] rounded-2xl overflow-hidden border border-zinc-900 bg-zinc-900/20 shadow-lg">
                        <img 
                          src={look.img} 
                          alt="Fresh Haircut Style" 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800"; }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end p-4">
                          <div className="transform translate-y-3 group-hover:translate-y-0 transition-transform duration-300">
                            <span className="inline-flex items-center gap-1 text-amber-500 text-[10px] font-black tracking-widest uppercase bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                              <Scissors size={10} /> {t('lbl_master_cut')}
                            </span>
                            <p className="text-xs text-zinc-300 mt-1">{t('lbl_get_this_look')}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center p-12 bg-zinc-900/20 rounded-2xl border border-zinc-900 max-w-xl mx-auto">
                    <Sparkles className="text-zinc-700 mx-auto mb-4" size={32} />
                    <p className="text-zinc-400 text-sm">{t('lbl_gallery_empty')}</p>
                  </div>
                )}
              </div>
            </section>

            {/* Team Section */}
            <section id="team" className="py-24 bg-zinc-900/10 border-t border-zinc-900">
              <div className="max-w-7xl mx-auto px-4 md:px-8">
                <div className="text-center mb-16">
                  <h3 className="text-amber-500 font-medium tracking-widest uppercase text-sm mb-2">{t('lbl_the_masters')}</h3>
                  <h2 className="text-4xl md:text-5xl font-bold text-white">{t('lbl_meet_barbers')}</h2>
                  <div className="w-24 h-1 bg-amber-500 mx-auto mt-6 rounded-full" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {content.team.map((barber) => (
                    <div key={barber.id} className="group relative rounded-2xl overflow-hidden bg-zinc-900/50 border border-zinc-900">
                      <div className="aspect-[3/4] overflow-hidden bg-zinc-950">
                        <img 
                          src={barber.img} 
                          alt={barber.name} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                          onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=800"; }}
                        />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent opacity-95" />
                      
                      <div className="absolute bottom-0 left-0 w-full p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        <div className="flex justify-between items-end mb-2">
                          <div>
                            <h4 className="text-2xl font-bold text-white">{barber.name}</h4>
                            <p className="text-amber-500 text-sm font-medium">{td(barber.role)}</p>
                          </div>
                          <div className="flex items-center gap-1 bg-zinc-900/80 px-2.5 py-1 rounded text-sm text-white">
                            <Star size={14} className="fill-amber-500 text-amber-500" /> {barber.rating}
                          </div>
                        </div>
                        
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 mt-4 space-y-3">
                          <p className="text-zinc-300 text-xs flex justify-between">
                            <span className="text-zinc-500">{t('lbl_experience')}:</span> {translateTimeAndPrice(barber.experience)}
                          </p>
                          <button 
                            onClick={() => { setFormData({...formData, barberId: barber.id}); setStep(1); setIsBookingModalOpen(true); }}
                            className="w-full py-2 bg-white hover:bg-amber-500 text-zinc-950 font-bold text-sm rounded-lg transition-colors mt-2 shadow-md"
                          >
                            {t('lbl_book_with')} {barber.name.split(' ')[0]}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* My Appointments Section */}
            <section id="appointments" className="py-24 bg-zinc-900/20 border-t border-zinc-900">
              <div className="max-w-4xl mx-auto px-4">
                <div className="text-center mb-12">
                  <h3 className="text-amber-500 font-medium tracking-widest uppercase text-sm mb-2">{t('lbl_customer_dashboard')}</h3>
                  <h2 className="text-4xl font-bold text-white flex items-center justify-center gap-3">
                    <Calendar className="text-amber-500" /> {t('lbl_scheduled_appointments')}
                  </h2>
                  <div className="w-24 h-1 bg-amber-500 mx-auto mt-4 rounded-full" />
                </div>

                {/* Appointment Arrival Time Notice - Visible when user has appointments */}
                {activeClientBookings.length > 0 && activeClientBookings.some(b => b.status !== 'cancelled' && b.status !== 'completed') && (
                  <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-6 mb-8 max-w-2xl mx-auto">
                    <div className="flex items-start gap-4">
                      <div className="text-amber-500 mt-1 flex-shrink-0">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-amber-500 font-semibold text-sm mb-1">{t('lbl_confirmation_notice_title')}</h4>
                        <p className="text-amber-100/90 text-sm leading-relaxed">
                          {t('lbl_confirmation_notice')}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {activeClientBookings.length === 0 ? (
                  <div className="p-12 text-center rounded-2xl border border-zinc-900 bg-zinc-900/40 max-w-xl mx-auto shadow-xl">
                    <p className="text-zinc-400 mb-6 text-sm leading-relaxed">{t('lbl_no_appointments')}</p>
                    <button 
                      onClick={() => { setStep(1); setIsBookingModalOpen(true); }} 
                      className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-zinc-950 rounded-xl text-sm font-bold transition-all inline-flex items-center gap-2 hover:scale-105"
                    >
                      {t('btn_book_now')} <ChevronRight size={16} />
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {activeClientBookings.map((b) => (
                      <div key={b.id} className="p-6 bg-zinc-900 rounded-xl border border-zinc-850 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:border-amber-500/20 transition-all">
                        <div>
                          <div className="text-xs text-zinc-500 mb-1 flex items-center gap-2">
                            <span>{t('lbl_appointment_ref')}</span>
                            <span className="font-mono bg-zinc-950 px-2 py-0.5 rounded text-amber-500/80">{b.id.substring(0,8)}</span>
                          </div>
                          <h4 className="font-bold text-white text-lg">{td(b.serviceName)}</h4>
                          <p className="text-sm text-zinc-400 mt-1">{t('lbl_grooming_specialist')} <strong className="text-zinc-300">{b.barberName}</strong></p>
                          <p className="text-xs text-amber-500 mt-2 flex items-center gap-1 bg-amber-500/5 border border-amber-500/10 px-2.5 py-1 rounded w-fit">
                            <Clock size={12} /> {b.date} {t('lbl_at')} {formatTime(b.time, timeFormatSetting)}
                          </p>
                        </div>
                        <div className="flex items-center gap-3 w-full md:w-auto">
                          {b.status === 'cancelled' ? (
                            <span className="text-xs px-3 py-1.5 bg-red-500/10 text-red-500 border border-red-500/20 rounded-full font-bold">{t('lbl_status_cancelled')}</span>
                          ) : b.status === 'completed' ? (
                            <span className="text-xs px-3 py-1.5 bg-green-500/10 text-green-500 border border-green-500/20 rounded-full font-bold flex items-center gap-1"><CheckCircle size={12}/> {t('lbl_status_groomed')}</span>
                          ) : (
                            <>
                              <button 
                                onClick={() => {
                                  setFormData({
                                    serviceId: content.services.find(s => s.name === b.serviceName)?.id || '',
                                    barberId: content.team.find(t => t.name === b.barberName)?.id || 'any',
                                    date: b.date,
                                    time: b.time,
                                    name: b.name,
                                    phone: b.phone,
                                    email: b.email,
                                    id: b.id
                                  });
                                  setStep(3);
                                  setIsBookingModalOpen(true);
                                }}
                                className="flex-1 md:flex-initial text-xs font-semibold bg-zinc-850 hover:bg-zinc-800 text-white px-4 py-2.5 rounded-lg border border-zinc-800 transition-colors"
                              >
                                {t('lbl_reschedule')}
                              </button>
                              <button 
                                onClick={() => handleCancelBooking(b.id)}
                                className="flex-1 md:flex-initial text-xs font-semibold bg-red-500/10 hover:bg-red-500/20 text-red-500 px-4 py-2.5 rounded-lg border border-red-500/20 transition-colors"
                              >
                                {t('lbl_cancel')}
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </section>

            {/* Reviews Section */}
            <section id="reviews" className="py-24 bg-zinc-950 border-t border-zinc-900">
              <div className="max-w-7xl mx-auto px-4 md:px-8">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                  <div>
                    <h3 className="text-amber-500 font-medium tracking-widest uppercase text-sm mb-2">{t('lbl_testimonials')}</h3>
                    <h2 className="text-4xl md:text-5xl font-bold text-white">{t('lbl_client_reviews')}</h2>
                  </div>
                  <div className="flex items-center gap-4 bg-zinc-900/50 px-6 py-4 rounded-2xl border border-zinc-900">
                    <div className="text-4xl font-black text-white">4.9</div>
                    <div>
                      <div className="flex gap-1 mb-1">
                        {[1, 2, 3, 4, 5].map(i => <Star key={i} size={16} className="fill-amber-500 text-amber-500" />)}
                      </div>
                      <div className="text-xs text-zinc-400">{t('lbl_based_on')}</div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {content.reviews.map((review) => (
                    <div key={review.id} className="p-8 rounded-2xl bg-zinc-900/20 border border-zinc-900 flex flex-col h-full relative">
                      <MessageSquare className="absolute top-6 right-6 text-zinc-800/40" size={40} />
                      <div className="flex gap-1 mb-6 relative z-10">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={16} className={i < review.rating ? "fill-amber-500 text-amber-500" : "text-zinc-800"} />
                        ))}
                      </div>
                      <p className="text-zinc-300 mb-8 flex-grow relative z-10 italic">"{review.text}"</p>
                      <div className="flex items-center gap-4 border-t border-zinc-900 pt-6 mt-auto">
                        <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-amber-500 font-bold uppercase text-sm">
                          {review.name.charAt(0)}
                        </div>
                        <div>
                          <h5 className="font-bold text-white text-sm">{review.name}</h5>
                          <p className="text-xs text-zinc-500">{review.date}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </>
        ) : !isOwnerVerified ? (
          // Security guard: if somehow isAdminView=true but owner is not verified, boot them
          <>
            <section className="min-h-screen flex items-center justify-center bg-zinc-950">
              <div className="text-center px-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-red-500/30 bg-red-500/10 text-red-400 text-sm font-medium mb-6">
                  <Shield size={14} /> Unauthorized
                </div>
                <h2 className="text-4xl font-black text-white mb-4">Access Denied</h2>
                <p className="text-zinc-400 mb-8">Owner authentication required.</p>
                <button onClick={() => { setIsAdminView(false); setOwnerLoginModal(true); }}
                  className="bg-amber-500 hover:bg-amber-400 text-zinc-950 px-6 py-3 rounded-full font-bold transition-all">
                  Login as Owner
                </button>
              </div>
            </section>
          </>
        ) : (
          <section className="py-8 bg-zinc-950 min-h-screen">
            <div className="max-w-7xl mx-auto px-4">

              {/* Admin Header */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 pb-6 border-b border-zinc-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-amber-500/20 rounded-xl flex items-center justify-center">
                    <Shield size={20} className="text-amber-500" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">{t('lbl_owner_dashboard')}</h2>
                    <p className="text-zinc-500 text-xs mt-0.5 flex items-center gap-1.5">
                      <CheckCircle size={11} className={dbStatus === 'connected' ? 'text-green-500' : 'text-amber-500'} />
                      Signed in as <span className="text-amber-500 font-medium">{user?.email || 'owner'}</span>
                      <span className="text-zinc-700">·</span>
                      <span className={dbStatus === 'connected' ? 'text-green-500' : 'text-amber-500'}>
                        {dbStatus === 'connected' ? 'Supabase Connected' : 'Connecting…'}
                      </span>
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  {saveStatus && (
                    <span className={`text-xs px-3 py-1.5 rounded-full font-medium ${saveStatus.includes('Error') ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-green-500/10 text-green-400 border border-green-500/20'}`}>
                      {saveStatus.includes('Error') ? '✗' : '✓'} {saveStatus}
                    </span>
                  )}
                  <button onClick={() => setIsAdminView(false)}
                    className="flex items-center gap-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-4 py-2 rounded-lg text-sm font-medium transition-colors border border-zinc-700">
                    ← Back to Website
                  </button>
                  <button onClick={handleOwnerLogout}
                    className="flex items-center gap-1.5 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 hover:text-red-300 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                    <LogOut size={14} /> Sign Out
                  </button>
                </div>
              </div>

              {/* Tab Navigation */}
              <div className="flex border-b border-zinc-800 mb-8 gap-1 overflow-x-auto pb-0">
                {[
                  { key: 'bookings',      label: t('lbl_manage_bookings'),  count: bookingsList.length },
                  { key: 'blocked-slots', label: t('lbl_blocked_slots'),    count: null },
                  { key: 'services',      label: t('lbl_manage_services'),  count: content.services?.length },
                  { key: 'team',          label: t('lbl_barber_profiles'),  count: content.team?.length },
                  { key: 'recent-looks',  label: t('lbl_recent_looks'),     count: content.recentLooks?.length || 0 },
                  { key: 'settings',      label: t('lbl_settings_security'), count: null },
                ].map(tab => (
                  <button key={tab.key} onClick={() => setAdminTab(tab.key)}
                    className={`pb-3 px-4 text-sm font-medium whitespace-nowrap border-b-2 transition-all flex items-center gap-1.5 ${adminTab === tab.key ? 'border-amber-500 text-amber-500' : 'border-transparent text-zinc-400 hover:text-zinc-200'}`}>
                    {tab.label}
                    {tab.count !== null && (
                      <span className={`text-xs px-1.5 py-0.5 rounded-full ${adminTab === tab.key ? 'bg-amber-500/20 text-amber-400' : 'bg-zinc-800 text-zinc-500'}`}>
                        {tab.count}
                      </span>
                    )}
                  </button>
                ))}
              </div>

              {/* Tab Content: Bookings */}
              {adminTab === 'bookings' && (
                <div className="bg-zinc-900 border border-zinc-850 rounded-xl overflow-hidden shadow-2xl">
                  <div className="p-6 border-b border-zinc-850 bg-zinc-900/50 flex justify-between items-center">
                    <h3 className="text-xl font-bold text-white flex items-center gap-2"><Calendar className="text-amber-500" /> {t('lbl_recent_bookings')}</h3>
                    <button onClick={exportBookingsCSV} className="bg-zinc-800 hover:bg-zinc-750 text-zinc-300 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 border border-zinc-750">
                      <Download size={14} /> {t('lbl_export_csv')}
                    </button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-zinc-950/50 text-xs uppercase tracking-wider">
                          <th className="p-4 text-zinc-400 font-medium">{t('lbl_col_datetime')}</th>
                          <th className="p-4 text-zinc-400 font-medium">{t('lbl_col_client_info')}</th>
                          <th className="p-4 text-zinc-400 font-medium">{t('lbl_col_service')}</th>
                          <th className="p-4 text-zinc-400 font-medium">{t('lbl_col_barber')}</th>
                          <th className="p-4 text-zinc-400 font-medium">{t('lbl_col_status')}</th>
                          <th className="p-4 text-zinc-400 font-medium">{t('lbl_col_actions')}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {bookingsList.length === 0 ? (
                          <tr><td colSpan="6" className="p-8 text-center text-zinc-500 text-sm">{t('lbl_no_appointments_yet')}</td></tr>
                        ) : (
                          bookingsList.map(booking => (
                            <tr key={booking.id} className="border-b border-zinc-850 hover:bg-zinc-800/10 transition-colors text-sm">
                              <td className="p-4 text-white">
                                <div className="font-semibold">{booking.date}</div>
                                <div className="text-xs text-zinc-500">{formatTime(booking.time, timeFormatSetting)}</div>
                              </td>
                              <td className="p-4 text-white">
                                <div className="font-semibold">{booking.name}</div>
                                <div className="text-xs text-zinc-400">{booking.phone}</div>
                                <div className="text-xs text-zinc-500">{booking.email}</div>
                              </td>
                              <td className="p-4 text-zinc-300 font-medium">{td(booking.serviceName)}</td>
                              <td className="p-4 text-zinc-300">{booking.barberName}</td>
                              <td className="p-4">
                                <select 
                                  value={booking.status || 'confirmed'} 
                                  onChange={(e) => handleUpdateBookingStatus(booking.id, e.target.value)}
                                  className={`text-xs font-bold rounded-full px-3 py-1.5 outline-none cursor-pointer border ${
                                    booking.status === 'cancelled' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                                    booking.status === 'completed' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                                    'bg-amber-500/10 text-amber-400 border-amber-500/20'
                                  }`}
                                >
                                  <option value="confirmed">{t('lbl_status_confirmed')}</option>
                                  <option value="completed">{t('lbl_status_completed')}</option>
                                  <option value="cancelled">{t('lbl_status_cancelled')}</option>
                                </select>
                              </td>
                              <td className="p-4">
                                {booking.email && booking.status !== 'cancelled' && (
                                  <a 
                                    href={`mailto:${booking.email}?subject=Appointment Reminder: Kemekem Barbershop&body=Hi ${encodeURIComponent(booking.name)},%0D%0A%0D%0AThis is a reminder for your upcoming grooming session for ${encodeURIComponent(booking.serviceName)} with ${encodeURIComponent(booking.barberName)} on ${booking.date} at ${encodeURIComponent(formatTime(booking.time, timeFormatSetting))}.%0D%0A%0D%0ASee you soon!`}
                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-zinc-800 hover:bg-zinc-750 text-zinc-300 rounded-lg text-xs transition-colors border border-zinc-750"
                                  >
                                    <Mail size={12} /> {t('lbl_email_reminder')}
                                  </a>
                                )}
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Tab Content: Blocked Time Slots */}
              {adminTab === 'blocked-slots' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-bold text-white">{t('lbl_manage_blocked_slots')}</h3>
                    <button 
                      onClick={() => setAdminBlockSlotModal(true)}
                      className="bg-amber-500 hover:bg-amber-600 text-zinc-950 px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-1.5 shadow"
                    >
                      <Plus size={16} /> Block Time Slot
                    </button>
                  </div>

                  {/* Block Slot Modal */}
                  {adminBlockSlotModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                      <div className="bg-zinc-900 border border-zinc-850 rounded-2xl w-full max-w-md shadow-2xl p-6 relative">
                        <button onClick={() => setAdminBlockSlotModal(false)} className="absolute right-4 top-4 text-zinc-500 hover:text-white">
                          <X size={20} />
                        </button>

                        <h3 className="text-lg font-bold text-white mb-4">{t('lbl_block_time_slot')}</h3>

                        <div className="space-y-4">
                          <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">Select Barber</label>
                            <select 
                              value={blockSlotForm.barberId}
                              onChange={(e) => setBlockSlotForm({...blockSlotForm, barberId: e.target.value})}
                              className="w-full p-3 bg-zinc-900 border border-zinc-800 rounded-xl text-white outline-none focus:border-amber-500 transition-colors"
                            >
                              <option value="">Choose a barber...</option>
                              {content.team.map(barber => (
                                <option key={barber.id} value={barber.id}>{barber.name}</option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">Date</label>
                            <input 
                              type="date"
                              value={blockSlotForm.date}
                              onChange={(e) => setBlockSlotForm({...blockSlotForm, date: e.target.value})}
                              className="w-full p-3 bg-zinc-900 border border-zinc-800 rounded-xl text-white outline-none focus:border-amber-500 transition-colors"
                              min={new Date().toISOString().split('T')[0]}
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">Time Slot</label>
                            <select 
                              value={blockSlotForm.time}
                              onChange={(e) => setBlockSlotForm({...blockSlotForm, time: e.target.value})}
                              className="w-full p-3 bg-zinc-900 border border-zinc-800 rounded-xl text-white outline-none focus:border-amber-500 transition-colors"
                            >
                              <option value="">Select time...</option>
                              {availableSlots.map(slot => (
                                <option key={slot} value={slot}>{formatTime(slot, timeFormatSetting)}</option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">{t('lbl_block_reason')}</label>
                            <select 
                              value={blockSlotForm.reason}
                              onChange={(e) => setBlockSlotForm({...blockSlotForm, reason: e.target.value})}
                              className="w-full p-3 bg-zinc-900 border border-zinc-800 rounded-xl text-white outline-none focus:border-amber-500 transition-colors"
                            >
                              <option value="unavailable">{t('lbl_barber_unavailable')}</option>
                              <option value="on_leave">{t('lbl_barber_on_leave')}</option>
                              <option value="sick">{t('lbl_barber_sick')}</option>
                            </select>
                          </div>

                          <div className="flex gap-3 pt-4 border-t border-zinc-850">
                            <button onClick={() => setAdminBlockSlotModal(false)} className="flex-1 py-2.5 bg-zinc-800 hover:bg-zinc-750 text-white font-semibold rounded-lg transition-colors">
                              Cancel
                            </button>
                            <button onClick={handleBlockTimeSlot} className="flex-1 py-2.5 bg-amber-500 hover:bg-amber-600 text-zinc-950 font-bold rounded-lg transition-colors">
                              Block Slot
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Display blocked slots by barber */}
                  {Object.keys(blockedSlots).length > 0 ? (
                    <div
                      className="kemekem-scroll space-y-4 overflow-y-scroll pr-2"
                      style={{ maxHeight: '420px' }}
                    >
                      {Object.entries(blockedSlots).map(([key, times]) => {
                        const [barberId, date] = key.split('-');
                        const barber = content.team.find(b => b.id === barberId);
                        return times.length > 0 && (
                          <div key={key} className="bg-zinc-900 border border-zinc-850 rounded-xl p-4">
                            <div className="flex justify-between items-start mb-3">
                              <div>
                                <h4 className="text-white font-semibold">{barber?.name || 'Unknown Barber'}</h4>
                                <p className="text-zinc-400 text-sm">{date}</p>
                              </div>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {times.map(time => (
                                <button
                                  key={time}
                                  onClick={() => handleUnblockTimeSlot(barberId, date, time)}
                                  className="bg-red-500/10 border border-red-500/30 hover:bg-red-500/20 text-red-400 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5"
                                >
                                  <Clock size={12} /> {time} <X size={12} className="ml-1" />
                                </button>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-8 bg-zinc-900/50 rounded-xl border border-zinc-850">
                      <p className="text-zinc-400">No blocked time slots. All barbers have full availability.</p>
                    </div>
                  )}
                </div>
              )}

              {/* Tab Content: Services */}
              {adminTab === 'services' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-bold text-white">{t('lbl_grooming_menu')}</h3>
                    <button 
                      onClick={() => setEditingService({ name: '', price: '', duration: '', iconName: 'Scissors', desc: '' })}
                      className="bg-amber-500 hover:bg-amber-600 text-zinc-950 px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-1.5 shadow"
                    >
                      <Plus size={16} /> {t('lbl_add_new_service')}
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {content.services.map(s => (
                      <div key={s.id} className="p-6 bg-zinc-900 border border-zinc-850 rounded-xl flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-amber-500 bg-amber-500/10 p-1.5 rounded-md border border-amber-500/10">
                              <Scissors size={20} />
                            </span>
                            <h4 className="font-bold text-white text-lg">{s.name}</h4>
                          </div>
                          <p className="text-sm text-zinc-400 mb-3">{s.desc}</p>
                          <div className="flex gap-4 text-xs text-zinc-500">
                            <span>{t('lbl_price')} <strong className="text-amber-500">{s.price}</strong></span>
                            <span>{t('lbl_duration')} <strong className="text-zinc-300">{s.duration}</strong></span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button onClick={() => setEditingService(s)} className="p-2 bg-zinc-850 hover:bg-zinc-800 text-zinc-300 rounded-lg hover:text-amber-500 transition-colors">
                            <Edit3 size={16} />
                          </button>
                          <button onClick={() => handleDeleteService(s.id)} className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-lg transition-colors">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab Content: Team */}
              {adminTab === 'team' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-bold text-white">{t('lbl_barber_profiles')}</h3>
                    <button 
                      onClick={() => setEditingBarber({ name: '', role: '', experience: '', rating: 4.8, email: '', img: '' })}
                      className="bg-amber-500 hover:bg-amber-600 text-zinc-950 px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-1.5"
                    >
                      <Plus size={16} /> {t('lbl_add_new_barber')}
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {content.team.map(b => (
                      <div key={b.id} className="bg-zinc-900 border border-zinc-850 rounded-xl overflow-hidden flex flex-col">
                        <div className="h-48 overflow-hidden relative">
                          <img src={b.img || 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'} alt={b.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="p-6 flex-grow flex flex-col">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h4 className="font-bold text-white text-lg">{b.name}</h4>
                              <p className="text-amber-500 text-sm font-medium">{b.role}</p>
                            </div>
                            <span className="text-xs font-semibold bg-zinc-950 px-2.5 py-1 rounded text-zinc-400 flex items-center gap-1 border border-zinc-800">
                              <Star size={12} className="fill-amber-500 text-amber-500" /> {b.rating}
                            </span>
                          </div>
                          <div className="text-xs text-zinc-400 space-y-1 mt-3 mb-6 flex-grow">
                            <div>{t('lbl_experience')}: <strong className="text-zinc-200">{b.experience}</strong></div>
                            <div>{t('lbl_notification_email')}: <strong className="text-zinc-200">{b.email}</strong></div>
                          </div>
                          <div className="flex gap-2 pt-4 border-t border-zinc-850 mt-auto">
                            <button onClick={() => setEditingBarber(b)} className="flex-1 py-2 bg-zinc-850 hover:bg-zinc-800 text-zinc-300 rounded-lg text-sm font-semibold flex items-center justify-center gap-1 transition-colors">
                              <Edit3 size={14} /> {t('lbl_edit_profile')}
                            </button>
                            <button onClick={() => handleDeleteBarber(b.id)} className="px-3 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-lg transition-colors flex items-center justify-center">
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab Content: Recent Looks */}
              {adminTab === 'recent-looks' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        <Sparkles size={20} className="text-amber-500" /> {t('lbl_recent_looks')} ({content.recentLooks?.length || 0}/10)
                      </h3>
                      <p className="text-xs text-zinc-400 mt-1">{t('lbl_manage_looks_desc')}</p>
                    </div>
                    <button 
                      onClick={() => setEditingLook({ title: '', img: '' })}
                      disabled={content.recentLooks && content.recentLooks.length >= 10}
                      className="bg-amber-500 hover:bg-amber-600 disabled:bg-zinc-800 disabled:text-zinc-500 text-zinc-950 px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-1.5 transition-all"
                    >
                      <Plus size={16} /> {t('lbl_add_new_look')}
                    </button>
                  </div>

                  {content.recentLooks && content.recentLooks.length >= 10 && (
                    <div className="p-4 bg-amber-500/10 border border-amber-500/25 rounded-xl text-xs text-amber-500">
                      {t('lbl_looks_limit_warning')}
                    </div>
                  )}

                  {content.recentLooks && content.recentLooks.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                      {content.recentLooks.map(look => (
                        <div key={look.id} className="bg-zinc-900 border border-zinc-850 rounded-xl overflow-hidden flex flex-col group relative">
                          <div className="aspect-[4/5] overflow-hidden relative bg-zinc-950">
                            <img src={look.img} alt="Haircut look" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                          </div>
                          <div className="p-3 flex gap-2 border-t border-zinc-850">
                            <button 
                              onClick={() => setEditingLook(look)}
                              className="flex-1 py-1.5 bg-amber-500 hover:bg-amber-600 text-zinc-950 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 transition-colors"
                            >
                              <Edit3 size={12} /> {t('lbl_replace_image')}
                            </button>
                            <button 
                              onClick={() => handleDeleteLook(look.id)}
                              className="px-2.5 py-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-lg transition-colors flex items-center justify-center"
                            >
                              <Trash2 size={12} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-12 text-center rounded-xl border border-zinc-850 bg-zinc-900/50">
                      <Sparkles size={40} className="text-zinc-700 mx-auto mb-3" />
                      <p className="text-zinc-400 text-sm">{t('lbl_no_looks_added')}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Tab Content: Settings */}
              {adminTab === 'settings' && (
                <div className="max-w-3xl mx-auto space-y-6">
                  <div className="bg-zinc-900 border border-zinc-850 rounded-xl p-6">
                    <h4 className="text-lg font-bold text-white mb-6 border-b border-zinc-800 pb-3 flex items-center gap-2">
                      <Settings size={18} className="text-amber-500" /> {t('lbl_general_website_settings')}
                    </h4>
                    
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs text-zinc-400 mb-1.5 font-medium uppercase tracking-wider">{t('lbl_shop_name')}</label>
                          <input 
                            type="text" 
                            className="w-full p-3 bg-zinc-950 border border-zinc-850 rounded-xl text-white outline-none focus:border-amber-500 transition-colors"
                            defaultValue={content.shopName}
                            onBlur={(e) => saveGeneralSettings({ shopName: e.target.value })}
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-zinc-400 mb-1.5 font-medium uppercase tracking-wider">{t('lbl_hero_button_text')}</label>
                          <input 
                            type="text" 
                            className="w-full p-3 bg-zinc-950 border border-zinc-850 rounded-xl text-white outline-none focus:border-amber-500 transition-colors"
                            defaultValue={content.hero.btnText}
                            onBlur={(e) => saveGeneralSettings({ hero: { ...content.hero, btnText: e.target.value } })}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs text-zinc-400 mb-1.5 font-medium uppercase tracking-wider">{t('lbl_hero_headline')}</label>
                        <input 
                          type="text" 
                          className="w-full p-3 bg-zinc-950 border border-zinc-850 rounded-xl text-white outline-none focus:border-amber-500 transition-colors"
                          defaultValue={content.hero.title}
                          onBlur={(e) => saveGeneralSettings({ hero: { ...content.hero, title: e.target.value } })}
                        />
                      </div>

                      <div>
                        <label className="block text-xs text-zinc-400 mb-1.5 font-medium uppercase tracking-wider">{t('lbl_hero_subtitle')}</label>
                        <textarea 
                          rows="3"
                          className="w-full p-3 bg-zinc-950 border border-zinc-850 rounded-xl text-white outline-none focus:border-amber-500 transition-colors resize-none animate-none"
                          defaultValue={content.hero.subtitle}
                          onBlur={(e) => saveGeneralSettings({ hero: { ...content.hero, subtitle: e.target.value } })}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="bg-zinc-900 border border-zinc-850 rounded-xl p-6">
                    <h4 className="text-lg font-bold text-white mb-6 border-b border-zinc-800 pb-3 flex items-center gap-2">
                      <MapPin size={18} className="text-amber-500" /> {t('lbl_contact_info_hours')}
                    </h4>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs text-zinc-400 mb-1.5 font-medium uppercase tracking-wider">{t('lbl_business_address')}</label>
                        <input 
                          type="text" 
                          className="w-full p-3 bg-zinc-950 border border-zinc-850 rounded-xl text-white outline-none focus:border-amber-500 transition-colors"
                          defaultValue={content.contact.address}
                          onBlur={(e) => saveGeneralSettings({ contact: { ...content.contact, address: e.target.value } })}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs text-zinc-400 mb-1.5 font-medium uppercase tracking-wider">{t('lbl_phone')}</label>
                          <input 
                            type="text" 
                            className="w-full p-3 bg-zinc-950 border border-zinc-850 rounded-xl text-white outline-none focus:border-amber-500 transition-colors"
                            defaultValue={content.contact.phone}
                            onBlur={(e) => saveGeneralSettings({ contact: { ...content.contact, phone: e.target.value } })}
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-zinc-400 mb-1.5 font-medium uppercase tracking-wider">{t('lbl_operating_hours_text')}</label>
                          <input 
                            type="text" 
                            className="w-full p-3 bg-zinc-950 border border-zinc-850 rounded-xl text-white outline-none focus:border-amber-500 transition-colors"
                            defaultValue={content.contact.hours}
                            onBlur={(e) => saveGeneralSettings({ contact: { ...content.contact, hours: e.target.value } })}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Time Format Settings */}
                  <div className="bg-zinc-900 border border-zinc-850 rounded-xl p-6">
                    <h4 className="text-lg font-bold text-white mb-4 border-b border-zinc-800 pb-3 flex items-center gap-2">
                      <Clock size={18} className="text-amber-500" /> {t('lbl_time_format_settings')}
                    </h4>
                    <p className="text-zinc-400 text-xs mb-6">
                      Select how time should be displayed throughout the booking system. Changes apply immediately to all customers.
                    </p>
                    
                    <div className="space-y-6">
                      {/* Format Selection */}
                      <div>
                        <label className="block text-xs text-zinc-400 mb-3 font-medium uppercase tracking-wider">{t('lbl_select_time_format')}</label>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          {[
                            { value: '24hour', label: t('lbl_format_24hour') },
                            { value: '12hour', label: t('lbl_format_12hour') },
                            { value: 'ethiopian', label: t('lbl_format_ethiopian') }
                          ].map(option => (
                            <button
                              key={option.value}
                              onClick={() => setPreviewTimeFormat(option.value)}
                              className={`p-4 rounded-xl border-2 transition-all text-left ${
                                previewTimeFormat === option.value
                                  ? 'border-amber-500 bg-amber-500/10 text-white'
                                  : 'border-zinc-800 bg-zinc-950 text-zinc-400 hover:border-zinc-700'
                              }`}
                            >
                              <div className="font-semibold text-sm">{option.label}</div>
                              <div className="text-xs opacity-70 mt-1">
                                {option.value === '24hour' && formatTime('14:00', '24hour')}
                                {option.value === '12hour' && formatTime('14:00', '12hour')}
                                {option.value === 'ethiopian' && formatTime('14:00', 'ethiopian')}
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Live Preview */}
                      <div>
                        <h5 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                          <Eye size={14} className="text-amber-500" /> {t('lbl_preview_format')}
                        </h5>
                        <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 space-y-2">
                          <p className="text-xs text-zinc-400 mb-3">{t('lbl_time_format_sample')}</p>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                            {['09:00', '12:00', '14:00', '17:00', '20:00', '21:00'].map(time => (
                              <div key={time} className="text-center p-2 bg-zinc-900 rounded-lg border border-zinc-800">
                                <div className="text-xs text-zinc-500 mb-1">{time}</div>
                                <div className="font-mono text-sm text-amber-500">
                                  {formatTime(time, previewTimeFormat)}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Save Button */}
                      <div className="flex gap-3">
                        <button
                          onClick={handleSaveTimeFormat}
                          disabled={timeFormatLoading || previewTimeFormat === timeFormatSetting}
                          className="flex-1 py-3 bg-amber-500 hover:bg-amber-600 disabled:opacity-50 disabled:cursor-not-allowed text-zinc-950 font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
                        >
                          {timeFormatLoading ? (
                            <>
                              <div className="animate-spin">⟳</div> Saving...
                            </>
                          ) : (
                            <>
                              <Save size={16} /> {t('lbl_save_time_format')}
                            </>
                          )}
                        </button>
                      </div>

                      {/* Success Message */}
                      {timeFormatSaved && (
                        <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-xl text-green-400 text-sm flex items-center gap-2">
                          <Check size={16} /> {t('lbl_time_format_saved')}
                        </div>
                      )}

                      {/* Current Format Display */}
                      <div className="p-3 bg-zinc-950 border border-zinc-800 rounded-xl">
                        <p className="text-xs text-zinc-400">
                          {t('lbl_current_format')} <span className="font-semibold text-amber-500">
                            {timeFormatSetting === '24hour' && t('lbl_format_24hour')}
                            {timeFormatSetting === '12hour' && t('lbl_format_12hour')}
                            {timeFormatSetting === 'ethiopian' && t('lbl_format_ethiopian')}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* About Section Image Upload */}
                  <div className="bg-zinc-900 border border-zinc-850 rounded-xl p-6">
                    <h4 className="text-lg font-bold text-white mb-4 border-b border-zinc-800 pb-3 flex items-center gap-2">
                      <ImageIcon size={18} className="text-amber-500" /> {t('lbl_about_section_image')}
                    </h4>
                    <p className="text-zinc-400 text-xs mb-6">{t('lbl_about_image_description')}</p>
                    
                    <div className="space-y-6">
                      {/* Current Image Preview */}
                      {content.about.customImage && (
                        <div>
                          <label className="block text-xs text-zinc-400 mb-3 font-medium uppercase tracking-wider">{t('lbl_current_about_image')}</label>
                          <div className="relative w-full h-64 rounded-xl overflow-hidden border border-zinc-800 bg-zinc-950">
                            <img 
                              src={content.about.customImage} 
                              alt="About Section"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                      )}

                      {/* Image Upload Input */}
                      <div>
                        <label className="block text-xs text-zinc-400 mb-3 font-medium uppercase tracking-wider">{t('lbl_about_image_upload')}</label>
                        <div className="relative">
                          <input 
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleAboutImageUpload(e)}
                            className="w-full p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white outline-none focus:border-amber-500 transition-colors cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-amber-500 file:text-zinc-950 hover:file:bg-amber-600"
                          />
                        </div>
                        <p className="text-xs text-zinc-500 mt-2">Recommended: Min 1600x1600px, Max 5MB, JPG/PNG</p>
                      </div>

                      {/* Remove Custom Image Button */}
                      {content.about.customImage && (
                        <button
                          onClick={() => saveGeneralSettings({ about: { ...content.about, customImage: null } })}
                          className="w-full py-2.5 px-4 bg-red-500/20 hover:bg-red-500/30 text-red-400 font-medium rounded-xl transition-colors border border-red-500/30 text-sm"
                        >
                          {t('lbl_remove_custom_image')}
                        </button>
                      )}

                      {uploadError && (
                        <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm">
                          {uploadError}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="bg-zinc-900 border border-zinc-850 rounded-xl p-6">
                    <h4 className="text-lg font-bold text-white mb-6 border-b border-zinc-800 pb-3 flex items-center gap-2">
                      <Key size={18} className="text-amber-500" /> {t('lbl_security_admin_passcode')}
                    </h4>
                    <p className="text-zinc-400 text-xs mb-4">{t('lbl_update_password_desc')}</p>
                    
                    <div className="space-y-4 mb-6">
                      {/* Current Password */}
                      <div>
                        <label className="block text-xs text-zinc-400 mb-2 font-medium uppercase tracking-wider">{t('lbl_current_password')}</label>
                        <div className="relative">
                          <input 
                            type={showCurrentPassword ? 'text' : 'password'} 
                            className="w-full p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white outline-none focus:border-amber-500 transition-colors font-mono pr-10"
                            placeholder={t('lbl_enter_current_password')}
                            value={passwordChange.current}
                            onChange={(e) => setPasswordChange({ ...passwordChange, current: e.target.value })}
                          />
                          <button 
                            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                            type="button"
                            className="absolute right-3 top-3.5 text-zinc-500 hover:text-white transition-colors"
                          >
                            {showCurrentPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                          </button>
                        </div>
                      </div>

                      {/* New Password */}
                      <div>
                        <label className="block text-xs text-zinc-400 mb-2 font-medium uppercase tracking-wider">{t('lbl_new_password')}</label>
                        <div className="relative">
                          <input 
                            type={showNewPassword ? 'text' : 'password'} 
                            className="w-full p-3 bg-zinc-950 border border-zinc-850 rounded-xl text-white outline-none focus:border-amber-500 transition-colors font-mono pr-10"
                            placeholder={t('lbl_enter_new_password')}
                            value={passwordChange.new}
                            onChange={(e) => setPasswordChange({ ...passwordChange, new: e.target.value })}
                          />
                          <button 
                            onClick={() => setShowNewPassword(!showNewPassword)}
                            type="button"
                            className="absolute right-3 top-3.5 text-zinc-500 hover:text-white transition-colors"
                          >
                            {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                          </button>
                        </div>
                      </div>

                      {/* Confirm Password */}
                      <div>
                        <label className="block text-xs text-zinc-400 mb-2 font-medium uppercase tracking-wider">{t('lbl_confirm_new_password')}</label>
                        <div className="relative">
                          <input 
                            type={showConfirmPassword ? 'text' : 'password'} 
                            className="w-full p-3 bg-zinc-950 border border-zinc-850 rounded-xl text-white outline-none focus:border-amber-500 transition-colors font-mono pr-10"
                            placeholder={t('lbl_reenter_new_password')}
                            value={passwordChange.confirm}
                            onChange={(e) => setPasswordChange({ ...passwordChange, confirm: e.target.value })}
                          />
                          <button 
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            type="button"
                            className="absolute right-3 top-3.5 text-zinc-500 hover:text-white transition-colors"
                          >
                            {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-zinc-950/50 border border-zinc-800 rounded-lg p-4 mb-6">
                      <p className="text-xs text-zinc-400 font-medium mb-2 uppercase">{t('lbl_password_requirements')}</p>
                      <ul className="text-xs text-zinc-500 space-y-1">
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-amber-500 rounded-full"></span>
                          {t('lbl_min_8_chars')}
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-amber-500 rounded-full"></span>
                          {t('lbl_one_uppercase')}
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-amber-500 rounded-full"></span>
                          {t('lbl_one_lowercase')}
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-amber-500 rounded-full"></span>
                          {t('lbl_one_number')}
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-amber-500 rounded-full"></span>
                          {t('lbl_one_special')}
                        </li>
                      </ul>
                    </div>

                    {passwordError && (
                      <div className="p-3 mb-4 bg-red-500/10 text-red-500 border border-red-500/20 rounded-lg text-xs">
                        <p className="font-semibold mb-1">❌ {t('lbl_error')}</p>
                        <p>{td(passwordError)}</p>
                      </div>
                    )}

                    {passwordSuccess && (
                      <div className="p-3 mb-4 bg-green-500/10 text-green-500 border border-green-500/20 rounded-lg text-xs flex items-start gap-2">
                        <CheckCircle size={16} className="flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold mb-1">✓ {t('lbl_success_lbl')}</p>
                          <p>{td(passwordSuccess)}</p>
                        </div>
                      </div>
                    )}

                    <div className="flex gap-3">
                      <button 
                        onClick={() => {
                          setPasswordChange({ current: '', new: '', confirm: '' });
                          setPasswordError('');
                          setPasswordSuccess('');
                        }}
                        className="flex-1 py-3 bg-zinc-800 hover:bg-zinc-750 text-white rounded-lg text-sm font-semibold transition-colors border border-zinc-700"
                      >
                        {t('lbl_clear')}
                      </button>
                      <button 
                        onClick={handleChangePassword}
                        className="flex-1 py-3 bg-amber-500 hover:bg-amber-600 text-zinc-950 rounded-lg text-sm font-bold transition-colors flex items-center justify-center gap-2"
                      >
                        <Shield size={16} /> {t('lbl_update_password')}
                      </button>
                    </div>
                  </div>

                  {saveStatus && (
                    <div className="text-center p-3 font-semibold text-sm bg-amber-500/10 text-amber-500 border border-amber-500/20 rounded-xl animate-pulse">
                      {td(saveStatus)}
                    </div>
                  )}
                </div>
              )}
            </div>
          </section>
        )}

        {/* Booking Modal */}
        {isBookingModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => !isSubmitting && setIsBookingModalOpen(false)} />
            <div className="relative bg-zinc-950 border border-zinc-900 rounded-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
              <div className="p-6 border-b border-zinc-900 flex justify-between items-center bg-zinc-900/50">
                <h2 className="text-2xl font-bold text-white">{t('lbl_book_appointment_header')}</h2>
                <button onClick={() => !isSubmitting && setIsBookingModalOpen(false)} className="p-2 text-zinc-400 hover:text-white rounded-full hover:bg-zinc-900 transition-colors">
                  <X size={24} />
                </button>
              </div>
              
              <div className="p-6 overflow-y-auto">
                {step === 1 && (
                  <div className="space-y-4">
                    <div className="mb-4">
                      <h3 className="text-xl font-bold text-white mb-1">{t('lbl_select_service')}</h3>
                      <p className="text-zinc-400 text-sm">{t('lbl_choose_service_desc')}</p>
                    </div>
                    <div className="space-y-3">
                      {content.services.map(service => (
                        <button
                          key={service.id}
                          onClick={() => { setFormData({...formData, serviceId: service.id}); setStep(2); }}
                          className="w-full p-4 rounded-xl border border-zinc-900 bg-zinc-900/20 hover:bg-zinc-900 hover:border-amber-500/30 transition-all flex items-center justify-between group text-left"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-500 group-hover:bg-amber-500 group-hover:text-zinc-950 transition-colors">
                              <Scissors size={20} />
                            </div>
                            <div>
                              <h4 className="font-bold text-white text-sm">{td(service.name)}</h4>
                              <p className="text-zinc-500 text-xs">{translateTimeAndPrice(service.duration)} • {translateTimeAndPrice(service.price)}</p>
                            </div>
                          </div>
                          <ChevronRight className="text-zinc-650 group-hover:text-amber-500 transition-colors" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div>
                    <div className="mb-6">
                      <h3 className="text-xl font-bold text-white mb-1">{t('lbl_select_barber')}</h3>
                      <p className="text-zinc-400 text-sm">{t('lbl_choose_barber_desc')}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        onClick={() => { setFormData({...formData, barberId: 'any'}); setStep(3); }}
                        className="p-4 rounded-xl border border-zinc-900 bg-zinc-900/20 hover:border-amber-500/30 transition-all text-center group"
                      >
                        <div className="w-14 h-14 mx-auto rounded-full bg-zinc-850 flex items-center justify-center text-zinc-400 group-hover:text-amber-500 mb-3 transition-colors">
                          <User size={28} />
                        </div>
                        <h4 className="font-bold text-white text-sm mb-1">{t('lbl_any_barber')}</h4>
                        <p className="text-zinc-500 text-xs">{t('lbl_first_available')}</p>
                      </button>
                      {content.team.map(barber => (
                        <button
                          key={barber.id}
                          onClick={() => { setFormData({...formData, barberId: barber.id}); setStep(3); }}
                          className="p-4 rounded-xl border border-zinc-900 bg-zinc-900/20 hover:border-amber-500/30 transition-all text-center group"
                        >
                          <img src={barber.img} alt={barber.name} className="w-14 h-14 mx-auto rounded-full object-cover mb-3 border border-zinc-800" onError={(e) => { e.target.src="https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=100"; }} />
                          <h4 className="font-bold text-white text-sm mb-1">{barber.name}</h4>
                          <p className="text-amber-500 text-xs flex items-center justify-center gap-1"><Star size={10} className="fill-amber-500" /> {barber.rating}</p>
                        </button>
                      ))}
                    </div>
                    <div className="pt-4 border-t border-zinc-900 mt-6">
                      <button onClick={() => setStep(1)} className="w-full py-2.5 px-4 rounded-xl border border-zinc-800 text-white font-medium hover:bg-zinc-900 transition-colors text-sm">{t('lbl_back')}</button>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div>
                    <div className="mb-6">
                      <h3 className="text-xl font-bold text-white mb-1">{t('lbl_select_date_time')}</h3>
                      <p className="text-zinc-400 text-sm">{t('lbl_choose_time_desc')}</p>
                    </div>
                    
                    <div className="mb-4">
                      <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">{t('lbl_reservation_date')}</label>
                      <input 
                        type="date" 
                        className="w-full p-3 bg-zinc-900 border border-zinc-800 rounded-xl text-white outline-none focus:border-amber-500 transition-colors"
                        value={formData.date}
                        onChange={(e) => setFormData({...formData, date: e.target.value})}
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </div>

                    <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">{t('lbl_available_slots')}</label>
                    <p className="text-xs text-zinc-500 mb-3 italic">{t('lbl_time_format_note')}</p>
                    
                    {isLoadingAvailability && (
                      <div className="py-4 text-center text-zinc-400 text-sm">
                        <div className="inline-block animate-spin">⟳</div> {t('lbl_loading_availability')}
                      </div>
                    )}

                    {!isLoadingAvailability && (!formData.date || !formData.barberId) && (
                      <div className="py-4 text-center text-zinc-500 text-sm bg-zinc-900/50 rounded-xl p-3">
                        {t('lbl_loading_availability')}
                      </div>
                    )}

                    {!isLoadingAvailability && formData.date && formData.barberId && selectedBarberAvailability.length === 0 && (
                      <div className="py-4 text-center text-amber-500 text-sm bg-amber-500/10 border border-amber-500/30 rounded-xl p-3">
                        ⚠ {t('lbl_no_availability')}
                      </div>
                    )}

                    {!isLoadingAvailability && selectedBarberAvailability.length > 0 && (
                      <div className="grid grid-cols-4 md:grid-cols-6 gap-2 mb-6">
                        {availableSlots.map(slot => {
                          const isBooked = !selectedBarberAvailability.includes(slot);
                          const isSelected = formData.time === slot;
                          
                          return (
                            <button
                              key={slot}
                              onClick={() => !isBooked && setFormData({...formData, time: slot})}
                              disabled={isBooked}
                              title={isBooked ? t('lbl_slot_unavailable') : formatTime(slot, timeFormatSetting)}
                              className={`p-2 rounded-lg border text-xs font-semibold transition-all ${
                                isBooked 
                                  ? 'border-red-500/20 bg-red-500/5 text-red-400 cursor-not-allowed opacity-60' 
                                  : isSelected 
                                    ? 'border-amber-500 bg-amber-500/10 text-amber-500 cursor-pointer' 
                                    : 'border-zinc-900 text-zinc-400 hover:border-zinc-700 cursor-pointer'
                              }`}
                            >
                              <div>{formatTime(slot, timeFormatSetting)}</div>
                              {isBooked && <div className="text-xs text-red-400">{t('lbl_slot_booked')}</div>}
                            </button>
                          );
                        })}
                      </div>
                    )}

                    {formErrors.time && (
                      <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm">
                        {formErrors.time}
                      </div>
                    )}
                    
                    <div className="flex gap-3 pt-4 border-t border-zinc-900">
                      <button onClick={() => setStep(2)} className="flex-1 py-2.5 px-4 rounded-xl border border-zinc-800 text-white font-medium hover:bg-zinc-900 transition-colors text-sm">{t('lbl_back')}</button>
                      <button 
                        onClick={() => {
                          if (!formData.date || !formData.time) return;
                          setStep(4);
                        }}
                        disabled={!formData.date || !formData.time}
                        className="flex-1 py-2.5 px-4 bg-amber-500 hover:bg-amber-600 text-zinc-950 font-bold rounded-xl transition-colors text-sm disabled:opacity-50"
                      >
                        {t('lbl_continue')}
                      </button>
                    </div>
                  </div>
                )}

                {step === 4 && (
                  <div>
                    <div className="mb-4">
                      <h3 className="text-xl font-bold text-white mb-1">{t('lbl_your_details')}</h3>
                      <p className="text-zinc-400 text-sm mt-1">{t('lbl_contact_info_desc')}</p>
                    </div>
                    
                    <div className="space-y-4 mb-6">
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">{t('lbl_full_name')}</label>
                        <input 
                          type="text" 
                          placeholder={t('lbl_ex_name')}
                          className={`w-full p-3 bg-zinc-900 border rounded-xl text-white outline-none focus:border-amber-500 transition-colors ${formErrors.name ? 'border-red-500' : 'border-zinc-800'}`}
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">{t('lbl_phone_number')}</label>
                        <input 
                          type="tel" 
                          placeholder={t('lbl_ex_phone')}
                          className={`w-full p-3 bg-zinc-900 border rounded-xl text-white outline-none focus:border-amber-500 transition-colors ${formErrors.phone ? 'border-red-500' : 'border-zinc-800'}`}
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">{t('lbl_email_address')}</label>
                        <input 
                          type="email" 
                          placeholder={t('lbl_ex_email')}
                          className={`w-full p-3 bg-zinc-900 border rounded-xl text-white outline-none focus:border-amber-500 transition-colors ${formErrors.email ? 'border-red-500' : 'border-zinc-800'}`}
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                        />
                        <p className="text-[10px] text-amber-500/85 mt-2 flex items-center gap-1">
                          <Mail size={12} /> {t('lbl_email_required_desc')}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex gap-3 pt-4 border-t border-zinc-900">
                      <button onClick={() => setStep(3)} className="flex-1 py-2.5 px-4 rounded-xl border border-zinc-800 text-white font-medium hover:bg-zinc-900 transition-colors text-sm">{t('lbl_back')}</button>
                      <button 
                        onClick={handleBookingSubmit}
                        disabled={isSubmitting || !formData.name || !formData.phone || !formData.email || !formData.email.includes('@')}
                        className="flex-1 py-2.5 px-4 bg-amber-500 hover:bg-amber-600 text-zinc-950 font-bold rounded-xl transition-colors text-sm disabled:opacity-50 flex items-center justify-center gap-1"
                      >
                        {isSubmitting ? t('lbl_confirming') : t('lbl_confirm')}
                      </button>
                    </div>
                  </div>
                )}

                {step === 5 && (
                  <div className="text-center py-8 space-y-4 md:space-y-6">
                    {/* Calculate service and barber for display */}
                    {(() => {
                      const selectedService = content.services.find(s => s.id === formData.serviceId);
                      const barberName = formData.barberId === 'any' ? t('lbl_any_available_barber') : content.team.find(b => b.id === formData.barberId)?.name;
                      return (
                        <>
                          {/* Success Checkmark - Larger and more prominent */}
                          <div className="w-16 h-16 md:w-20 md:h-20 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto border-2 border-green-500/30">
                            <CheckCircle size={40} className="md:w-12 md:h-12" />
                          </div>
                          
                          {/* Success Title - Larger on mobile */}
                          <div>
                            <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">{t('lbl_success')}</h3>
                            <p className="text-zinc-400 max-w-sm mx-auto text-sm md:text-base leading-relaxed px-4">
                              {t('lbl_success_message')
                                .replace('{0}', formData.name)
                                .replace('{1}', barberName)
                                .replace('{2}', formData.date)
                                .replace('{3}', formatTime(formData.time, timeFormatSetting))}
                            </p>
                          </div>

                          {/* Important Arrival Time Notice - Enhanced for visibility */}
                          <div className="bg-amber-500/15 border-2 border-amber-500/40 rounded-xl p-4 md:p-5 max-w-sm mx-auto text-left shadow-lg shadow-amber-500/10">
                            <div className="flex items-start gap-3">
                              <div className="text-amber-500 mt-0.5 flex-shrink-0">
                                <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                              </div>
                              <div className="flex-1">
                                <h4 className="text-amber-500 font-bold text-sm md:text-base mb-2">{t('lbl_confirmation_notice_title')}</h4>
                                <p className="text-amber-100/95 text-xs md:text-sm leading-relaxed font-medium">
                                  {t('lbl_confirmation_notice')}
                                </p>
                                {/* Additional helpful info */}
                                <div className="mt-3 pt-3 border-t border-amber-500/20 text-amber-200/80 text-xs md:text-xs">
                                  <p>✓ A confirmation email has been sent to <span className="font-semibold">{formData.email}</span></p>
                                  {formData.phone && <p>✓ SMS reminder sent to <span className="font-semibold">{formData.phone}</span></p>}
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Appointment Details Summary */}
                          <div className="bg-zinc-800/40 border border-zinc-700 rounded-xl p-4 md:p-5 max-w-sm mx-auto text-left">
                            <h4 className="text-white font-semibold text-sm md:text-base mb-3 flex items-center gap-2">
                              <Calendar size={16} className="text-amber-500" />
                              Your Appointment Details
                            </h4>
                            <div className="space-y-2 text-xs md:text-sm text-zinc-300">
                              <div className="flex justify-between items-center pb-2 border-b border-zinc-700/50">
                                <span className="text-zinc-500">Service:</span>
                                <span className="font-semibold text-white">{selectedService?.name || t('lbl_unknown_service')}</span>
                              </div>
                              <div className="flex justify-between items-center pb-2 border-b border-zinc-700/50">
                                <span className="text-zinc-500">Barber:</span>
                                <span className="font-semibold text-white">{barberName}</span>
                              </div>
                              <div className="flex justify-between items-center pb-2 border-b border-zinc-700/50">
                                <span className="text-zinc-500">Date:</span>
                                <span className="font-semibold text-white">{formData.date}</span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-zinc-500">Time:</span>
                                <span className="font-semibold text-white">{formatTime(formData.time, timeFormatSetting)}</span>
                              </div>
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="space-y-3 pt-2">
                            <button 
                              onClick={() => { setIsBookingModalOpen(false); setStep(1); setFormData({ serviceId: '', barberId: '', date: '', time: '', name: '', phone: '', email: '' }); }}
                              className="w-full py-3 md:py-4 bg-amber-500 hover:bg-amber-600 text-zinc-950 font-bold rounded-xl transition-colors text-sm md:text-base shadow-lg shadow-amber-500/20 active:scale-95"
                            >
                              {t('lbl_return_home')}
                            </button>
                            <button 
                              onClick={() => scrollTo('appointments')}
                              className="w-full py-3 md:py-4 bg-zinc-800 hover:bg-zinc-700 text-white font-bold rounded-xl transition-colors text-sm md:text-base border border-zinc-700"
                            >
                              View My Bookings
                            </button>
                          </div>
                        </>
                      );
                    })()}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Admin Login Modal */}
        {/* Edit Service Modal */}
        {editingService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="bg-zinc-900 border border-zinc-850 rounded-2xl w-full max-w-md shadow-2xl flex flex-col max-h-[90vh] relative overflow-hidden">
              <div className="p-6 border-b border-zinc-850 bg-zinc-900/50 flex justify-between items-center">
                <h3 className="text-lg font-bold text-white">{editingService.id ? t('lbl_edit_service') : t('lbl_add_new_service')}</h3>
                <button onClick={() => setEditingService(null)} className="text-zinc-500 hover:text-white hover:bg-zinc-800 p-1.5 rounded-lg transition-colors">
                  <X size={20} />
                </button>
              </div>
              
              <div className="overflow-y-auto flex-1 p-6 space-y-4">
                <div>
                  <label className="block text-xs text-zinc-400 mb-1 font-medium uppercase">{t('lbl_service_name')}</label>
                  <input 
                    type="text" 
                    className="w-full p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white outline-none focus:border-amber-500 transition-colors"
                    value={editingService.name}
                    onChange={(e) => setEditingService({ ...editingService, name: e.target.value })}
                    placeholder="e.g., Premium Haircut"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-zinc-400 mb-1 font-medium uppercase">{t('lbl_price_text')}</label>
                    <input 
                      type="text" 
                      className="w-full p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white outline-none focus:border-amber-500 transition-colors"
                      value={editingService.price}
                      onChange={(e) => setEditingService({ ...editingService, price: e.target.value })}
                      placeholder="e.g., 800 ETB"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-zinc-400 mb-1 font-medium uppercase">{t('lbl_duration_text')}</label>
                    <input 
                      type="text" 
                      className="w-full p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white outline-none focus:border-amber-500 transition-colors"
                      value={editingService.duration}
                      onChange={(e) => setEditingService({ ...editingService, duration: e.target.value })}
                      placeholder="e.g., 45 min"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-zinc-400 mb-1 font-medium uppercase">{t('lbl_icon_style')}</label>
                  <select 
                    className="w-full p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white outline-none focus:border-amber-500 transition-colors cursor-pointer"
                    value={editingService.iconName}
                    onChange={(e) => setEditingService({ ...editingService, iconName: e.target.value })}
                  >
                    <option value="Scissors">✂️ Scissors</option>
                    <option value="Award">🏆 Award Badge</option>
                    <option value="User">👤 User Profile</option>
                    <option value="Droplet">💧 Droplet (Dye)</option>
                    <option value="Sparkles">✨ Sparkles (Facial)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs text-zinc-400 mb-1 font-medium uppercase">{t('lbl_description')}</label>
                  <textarea 
                    rows="4" 
                    className="w-full p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white outline-none focus:border-amber-500 transition-colors resize-none"
                    value={editingService.desc}
                    onChange={(e) => setEditingService({ ...editingService, desc: e.target.value })}
                    placeholder="Describe the service details..."
                  />
                </div>
              </div>

              <div className="p-6 border-t border-zinc-850 bg-zinc-900/50 flex gap-3">
                <button onClick={() => setEditingService(null)} className="flex-1 py-2.5 bg-zinc-800 hover:bg-zinc-750 text-white rounded-lg text-sm font-semibold transition-colors border border-zinc-700">
                  {t('lbl_cancel_btn')}
                </button>
                <button onClick={() => handleSaveService(editingService)} className="flex-1 py-2.5 bg-amber-500 hover:bg-amber-600 text-zinc-950 rounded-lg text-sm font-bold transition-colors">
                  {t('lbl_save_service')}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Barber Modal */}
        {editingBarber && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="bg-zinc-900 border border-zinc-850 rounded-2xl w-full max-w-md shadow-2xl flex flex-col max-h-[90vh] relative overflow-hidden">
              <div className="p-6 border-b border-zinc-850 bg-zinc-900/50 flex justify-between items-center">
                <h3 className="text-lg font-bold text-white">{editingBarber.id ? t('lbl_edit_barber') : t('lbl_add_new_barber')}</h3>
                <button onClick={() => setEditingBarber(null)} className="text-zinc-500 hover:text-white hover:bg-zinc-800 p-1.5 rounded-lg transition-colors">
                  <X size={20} />
                </button>
              </div>
              
              <div className="overflow-y-auto flex-1 p-6 space-y-4">
                <div>
                  <label className="block text-xs text-zinc-400 mb-1 font-medium uppercase">{t('lbl_barber_full_name')}</label>
                  <input 
                    type="text" 
                    className="w-full p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white outline-none focus:border-amber-500 transition-colors"
                    value={editingBarber.name}
                    onChange={(e) => setEditingBarber({ ...editingBarber, name: e.target.value })}
                    placeholder="e.g., Dawit Mekonnen"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-zinc-400 mb-1 font-medium uppercase">{t('lbl_specialty_title')}</label>
                    <input 
                      type="text" 
                      className="w-full p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white outline-none focus:border-amber-500 transition-colors"
                      value={editingBarber.role}
                      onChange={(e) => setEditingBarber({ ...editingBarber, role: e.target.value })}
                      placeholder="e.g., Master Barber"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-zinc-400 mb-1 font-medium uppercase">{t('lbl_experience_years')}</label>
                    <input 
                      type="text" 
                      className="w-full p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white outline-none focus:border-amber-500 transition-colors"
                      value={editingBarber.experience}
                      onChange={(e) => setEditingBarber({ ...editingBarber, experience: e.target.value })}
                      placeholder="e.g., 12 Years"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-zinc-400 mb-1 font-medium uppercase">{t('lbl_notification_email')}</label>
                  <input 
                    type="email" 
                    className="w-full p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white outline-none focus:border-amber-500 transition-colors"
                    value={editingBarber.email}
                    onChange={(e) => setEditingBarber({ ...editingBarber, email: e.target.value })}
                    placeholder="e.g., dawit@kemekem.com"
                  />
                </div>

                <div>
                  <label className="block text-xs text-zinc-400 mb-1 font-medium uppercase">{t('lbl_profile_image_url')}</label>
                  <textarea
                    rows="2"
                    className="w-full p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white outline-none focus:border-amber-500 transition-colors resize-none text-xs"
                    placeholder="https://images.unsplash.com/..."
                    value={editingBarber.img}
                    onChange={(e) => setEditingBarber({ ...editingBarber, img: e.target.value })}
                  />
                </div>
              </div>

              <div className="p-6 border-t border-zinc-850 bg-zinc-900/50 flex gap-3">
                <button onClick={() => setEditingBarber(null)} className="flex-1 py-2.5 bg-zinc-800 hover:bg-zinc-750 text-white rounded-lg text-sm font-semibold transition-colors border border-zinc-700">
                  {t('lbl_cancel_btn')}
                </button>
                <button onClick={() => handleSaveBarber(editingBarber)} className="flex-1 py-2.5 bg-amber-500 hover:bg-amber-600 text-zinc-950 rounded-lg text-sm font-bold transition-colors">
                  {t('lbl_save_barber')}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Look Modal */}
        {editingLook && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="bg-zinc-900 border border-zinc-850 rounded-2xl w-full max-w-2xl shadow-2xl flex flex-col max-h-[90vh] relative overflow-hidden animate-fade-in">
              <div className="p-6 border-b border-zinc-850 bg-zinc-900/50 flex justify-between items-center">
                <h3 className="text-lg font-bold text-white">{editingLook.id ? t('lbl_edit_look') : t('lbl_add_new_look')}</h3>
                <button onClick={() => { setEditingLook(null); setPreviewImage(null); setUploadError(''); }} className="text-zinc-500 hover:text-white hover:bg-zinc-800 p-1.5 rounded-lg transition-colors">
                  <X size={20} />
                </button>
              </div>
              
              <div className="overflow-y-auto flex-1 p-6 space-y-6">
                <div>
                  <label className="block text-xs text-zinc-400 mb-3 font-medium uppercase">{t('lbl_upload_drop_photo')}</label>
                  <div className="h-64 bg-zinc-950 rounded-xl border-2 border-dashed border-zinc-800 overflow-hidden flex items-center justify-center relative group hover:border-amber-500/50 transition-colors">
                    {previewImage || editingLook.img ? (
                      <>
                        <img src={previewImage || editingLook.img} alt="Preview" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/40 transition-colors flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                          <button 
                            type="button"
                            onClick={() => document.getElementById('look-upload').click()}
                            className="bg-amber-500 hover:bg-amber-600 text-zinc-950 px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors"
                          >
                            <Edit3 size={14} /> {t('lbl_replace_image')}
                          </button>
                        </div>
                      </>
                    ) : (
                      <div className="text-center">
                        <Sparkles size={32} className="text-zinc-700 mx-auto mb-2" />
                        <p className="text-zinc-500 text-sm mb-3">{t('lbl_upload_drop_photo')}</p>
                        <label htmlFor="look-upload" className="inline-flex bg-amber-500 hover:bg-amber-600 text-zinc-950 px-4 py-2 rounded-lg text-xs font-bold cursor-pointer transition-colors items-center gap-1.5">
                          <Plus size={14} /> {t('lbl_choose_image')}
                        </label>
                      </div>
                    )}
                    <input 
                      id="look-upload"
                      type="file" 
                      accept="image/*" 
                      onChange={(e) => handleImageUpload(e, setPreviewImage)}
                      className="hidden"
                    />
                  </div>
                  {uploadError && (
                    <p className={`text-xs mt-2 ${uploadError.includes('Saving') || uploadError.includes('Processing') ? 'text-amber-500 animate-pulse' : 'text-red-500'}`}>
                      {td(uploadError)}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs text-zinc-400 mb-2 font-medium uppercase">{t('lbl_or_paste_url')}</label>
                  <textarea
                    rows="2"
                    className="w-full p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white outline-none focus:border-amber-500 transition-colors resize-none text-xs"
                    placeholder="https://images.unsplash.com/..."
                    value={editingLook.img}
                    onChange={(e) => setEditingLook({ ...editingLook, img: e.target.value })}
                  />
                </div>
              </div>

              <div className="p-6 border-t border-zinc-850 bg-zinc-900/50 flex gap-3">
                <button onClick={() => { setEditingLook(null); setPreviewImage(null); setUploadError(''); }} className="flex-1 py-2.5 bg-zinc-800 hover:bg-zinc-750 text-white rounded-lg text-sm font-semibold transition-colors border border-zinc-700">
                  {t('lbl_cancel_btn')}
                </button>
                <button onClick={() => handleSaveLook({ ...editingLook, img: previewImage || editingLook.img })} className="flex-1 py-2.5 bg-amber-500 hover:bg-amber-600 text-zinc-950 rounded-lg text-sm font-bold transition-colors flex items-center justify-center gap-1.5">
                  <CheckCircle size={14} /> {t('lbl_save_look')}
                </button>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* Floating Admin Button — invisible to customers, only shows after owner logs in */}
      {!isAdminView && (
        <button
          onClick={openAdminPanel}
          className="fixed bottom-6 left-6 z-40 flex items-center gap-2 px-4 py-2.5 rounded-full shadow-2xl transition-all hover:scale-105 border bg-zinc-900/90 hover:bg-zinc-800 border-zinc-700 text-zinc-400 hover:text-white backdrop-blur-sm"
          title="Owner Admin Panel"
        >
          <Shield size={16} className="text-amber-500" />
          <span className="text-xs font-semibold hidden md:inline">
            {isOwnerVerified ? 'Admin Panel' : 'Owner Login'}
          </span>
        </button>
      )}

      {/* Footer Section */}
      <footer className="bg-zinc-950 border-t border-zinc-900 pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="md:col-span-1">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-amber-500 flex-shrink-0">
                  <img src="https://i.ibb.co/dwRQd4t0/logo.jpg" alt="Logo" className="w-full h-full object-cover" onError={(e) => { e.target.src="https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=100"; }} />
                </div>
                <h2 className="text-xl font-bold uppercase text-white tracking-tight">
                  {content.shopName.split(' ')[0]} <span className="text-amber-500 font-light">{content.shopName.split(' ')[1] || t('lbl_barbershop_suffix')}</span>
                </h2>
              </div>
              <p className="text-zinc-500 text-sm leading-relaxed mb-6">
                {t('lbl_footer_desc')}
              </p>
              <div className="flex gap-4">
                <a href="https://www.instagram.com/kemekem_barbershop" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center text-zinc-400 hover:bg-amber-500 hover:text-zinc-950 transition-colors border border-zinc-850">
                  <Instagram size={18} />
                </a>
                <a href="https://www.tiktok.com/@kemekembarbershop" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center text-zinc-400 hover:bg-amber-500 hover:text-zinc-950 transition-colors border border-zinc-850">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                  </svg>
                </a>
                <a href="https://youtube.com/channel/UCGtGNQuZDEQldjmOh0_kz2w" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center text-zinc-400 hover:bg-amber-500 hover:text-zinc-950 transition-colors border border-zinc-850">
                  <Youtube size={18} />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-xs">{t('lbl_quick_links')}</h4>
              <ul className="space-y-3 text-zinc-500 text-sm">
                <li><button onClick={() => scrollTo('home')} className="hover:text-amber-500 transition-colors text-left">{t('nav_home')}</button></li>
                <li><button onClick={() => scrollTo('services')} className="hover:text-amber-500 transition-colors text-left">{t('nav_services')}</button></li>
                <li><button onClick={() => scrollTo('about')} className="hover:text-amber-500 transition-colors text-left">{t('nav_about')}</button></li>
                <li><button onClick={() => scrollTo('gallery')} className="hover:text-amber-500 transition-colors text-left">{t('nav_gallery')}</button></li>
                <li><button onClick={() => scrollTo('team')} className="hover:text-amber-500 transition-colors text-left">{t('nav_team')}</button></li>
                <li><button onClick={() => scrollTo('reviews')} className="hover:text-amber-500 transition-colors text-left">{t('nav_reviews')}</button></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-xs">{t('lbl_contact_info')}</h4>
              <ul className="space-y-4 text-zinc-500 text-sm">
                <li className="flex items-start gap-3"><MapPin size={16} className="text-amber-500 flex-shrink-0 mt-0.5" /> <span>{content.contact.address}</span></li>
                <li className="flex items-center gap-3"><Phone size={16} className="text-amber-500 flex-shrink-0" /> <span>{content.contact.phone}</span></li>
                <li className="flex items-center gap-3"><Mail size={16} className="text-amber-500 flex-shrink-0" /> <span>{content.contact.email}</span></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-xs">{t('lbl_opening_hours')}</h4>
              <ul className="space-y-4 text-zinc-500 text-sm">
                <li className="flex items-start gap-3"><Clock size={16} className="text-amber-500 flex-shrink-0 mt-0.5" /> <span>{content.contact.hours}</span></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-zinc-900 text-center text-zinc-600 text-xs flex flex-col md:flex-row justify-between items-center gap-4">
            <p>&copy; {new Date().getFullYear()} {content.shopName}. {t('lbl_all_rights_reserved')}</p>
            <p>{t('lbl_designed_for')}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
