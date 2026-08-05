import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { 
  Menu, X, ChevronRight, Star, Scissors, User, Sparkles, 
  MapPin, Phone, Clock, Instagram, Youtube, Calendar, Mail, CheckCircle,
  MessageSquare, Edit3, Plus, Eye, EyeOff, Shield, Globe, Image as ImageIcon
} from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

// ─── SUPABASE CLIENT (credentials loaded from .env) ──────────────────────
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Owner-only admin dashboard, code-split so ordinary site visitors never
// download or parse it — only fetched when the shop owner actually opens
// the admin view.
const AdminDashboardView = React.lazy(() => import('./AdminDashboardView.jsx'));

// Icon components moved inline (JSX not allowed at module level)

const TRANSLATIONS = {
  en: {
    nav_home: 'Home',
    nav_services: 'Services',
    nav_about: 'About',
    nav_gallery: 'Gallery',
    nav_team: 'Team',
    nav_products: 'Products',
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
    lbl_about_section_content: 'About Section Content',
    lbl_about_content_description: 'Edit the small heading, main title, and description shown in the About section below.',
    lbl_about_small_heading: 'Small Heading',
    lbl_about_main_title: 'Main Title',
    lbl_about_description_text: 'About Description',
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
    lbl_duplicate_booking_error: 'You already have an appointment on this day. Please reschedule your existing appointment instead.',
    lbl_loading_availability: 'Loading availability...',
    lbl_no_availability: 'No available time slots for this date. Please choose another date.',
    lbl_shop_closed_day: 'The shop is closed on this day. Please choose another date.',
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
    lbl_reenter_new_password: 'Re-enter your new password',
    lbl_products_eyebrow: 'Shop The Collection',
    lbl_products_title: 'Our Premium Products',
    lbl_products_empty: 'Our product collection is currently being updated. Come back soon to shop our latest picks!',
    lbl_call_to_order: 'Call to Order',
    lbl_manage_products: 'Products',
    lbl_manage_products_desc: 'Manage the products displayed in the live Products section. Drag order with the arrows.',
    lbl_add_new_product: 'Add New Product',
    lbl_edit_product: 'Edit Product',
    lbl_product_name: 'Product Name',
    lbl_product_price: 'Price',
    lbl_product_description: 'Description',
    lbl_product_phone: 'Order Phone Number',
    lbl_product_phone_hint: 'Shown in the product modal as a tap-to-call button. Leave blank to use the shop\'s main number.',
    lbl_save_product: 'Save Product',
    lbl_no_products_added: 'No products added yet. Add your first product to start showcasing it on the website!',
    lbl_upload_product_photo: 'Upload / Drop Product Photo',
    lbl_move_up: 'Move up',
    lbl_move_down: 'Move down'
  },
  am: {
    nav_home: 'መነሻ',
    nav_services: 'አገልግሎቶች',
    nav_about: 'ስለ እኛ',
    nav_gallery: 'የፎቶ ማዕከለ-ስዕላት',
    nav_team: 'ባለሙያዎች',
    nav_products: 'ምርቶች',
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
    lbl_about_section_content: 'ስለ ክፍል ይዘት',
    lbl_about_content_description: 'ከዚህ በታች ባለው ስለ እኛ ክፍል ውስጥ የሚታየውን ንዑስ ርዕስ፣ ዋና ርዕስ እና መግለጫ ያስተካክሉ።',
    lbl_about_small_heading: 'ንዑስ ርዕስ',
    lbl_about_main_title: 'ዋና ርዕስ',
    lbl_about_description_text: 'የስለ እኛ መግለጫ',
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
    lbl_duplicate_booking_error: 'በዚህ ቀን ቀደም ሲል ቀጠሮ ይዘዋል። እባክዎ ያለውን ቀጠሮዎን ያሻሽሉ።',
    lbl_loading_availability: 'ክፍት ሰዓቶች ስናገኝ...',
    lbl_no_availability: 'በዚህ ቀን ክፍት ሰዓት አለም። ሌላ ቀን ይምረጡ።',
    lbl_shop_closed_day: 'ሱቁ በዚህ ቀን ዝግ ነው። ሌላ ቀን ይምረጡ።',
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
    lbl_reenter_new_password: 'አዲሱን የይለፍ ቃል በድጋሚ ያስገቡ',
    lbl_products_eyebrow: 'ምርቶቻችንን ይግዙ',
    lbl_products_title: 'የእኛ ልዩ ምርቶች',
    lbl_products_empty: 'የምርት ዝርዝራችን በመዘመን ላይ ነው። አዳዲስ ምርቶቻችንን ለማየት እባክዎ ቆይተው ይመለሱ!',
    lbl_call_to_order: 'ለማዘዝ ይደውሉ',
    lbl_manage_products: 'ምርቶች',
    lbl_manage_products_desc: 'በድረ-ገጹ የምርት ክፍል ውስጥ የሚታዩ ምርቶችን ያስተዳድሩ። ቅደም ተከተላቸውን በቀስቶቹ ይቀይሩ።',
    lbl_add_new_product: 'አዲስ ምርት ያክሉ',
    lbl_edit_product: 'ምርት አርትዕ',
    lbl_product_name: 'የምርት ስም',
    lbl_product_price: 'ዋጋ',
    lbl_product_description: 'መግለጫ',
    lbl_product_phone: 'የትዕዛዝ ስልክ ቁጥር',
    lbl_product_phone_hint: 'በምርት መስኮት ውስጥ እንደ ደውለው-ይደውሉ አዝራር ይታያል። ባዶ ከተውት የሱቁ ዋና ስልክ ቁጥር ጥቅም ላይ ይውላል።',
    lbl_save_product: 'ምርት አስቀምጥ',
    lbl_no_products_added: 'እስካሁን ምንም ምርት አልታከለም። በድረ-ገጹ ላይ ለማሳየት የመጀመሪያ ምርትዎን ያክሉ!',
    lbl_upload_product_photo: 'የምርት ፎቶ ይስቀሉ / ይጣሉ',
    lbl_move_up: 'ወደ ላይ አንቀሳቅስ',
    lbl_move_down: 'ወደ ታች አንቀሳቅስ'
  }
};

const DYNAMIC_TRANSLATIONS = {
  // Hero
  "Best Barber in Addis Ababa": "በአዲስ አበባ ምርጡ ባርበር",
  "Experience luxury grooming and precise cuts in a relaxed, modern atmosphere.": "በዘመናዊ እና ምቹ መንፈስ ውስጥ የላቀ የውበት እንክብካቤ እና ትክክለኛ የፀጉር አቆራረጥን ይለማመዱ።",
  "Book Appointment": "ቀጠሮ ይያዙ",
  
  // About
  "Our Story": "ታሪካችን",
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
    smallHeading: "Our Story",  // Small heading above the main title — owner-editable
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
  ],
  products: [
    { id: 'prod1', name: 'Premium Beard Oil', price: '450 ETB', description: 'A lightweight blend of natural oils that softens facial hair, calms itchiness, and leaves a subtle, masculine scent all day.', phone: '0924657777', img: 'https://images.unsplash.com/photo-1621607512214-68297480165e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=90', displayOrder: 0 },
    { id: 'prod2', name: 'Matte Hair Pomade', price: '600 ETB', description: 'Strong hold with a natural matte finish — shapes and controls any style without the shine or greasy feel.', phone: '0924657777', img: 'https://images.unsplash.com/photo-1585232351009-aa87416fca90?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=90', displayOrder: 1 },
    { id: 'prod3', name: 'Kemekem Grooming Kit', price: '1800 ETB', description: 'Our complete at-home grooming set — beard oil, pomade, comb, and trimmer scissors — everything you need to maintain your Kemekem look between visits.', phone: '0924657777', img: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=90', displayOrder: 2 }
  ]
};

// ─── OPENING HOURS: single source of truth for which slots can exist ─────
// content.contact.hours is the shop's opening-hours text, editable from
// the Owner Dashboard's General Website Settings. It's free text (e.g.
// "Mon-Sun: 06:00 - 21:00" or "Mon-Fri: 09:00-18:00, Sat: 10:00-16:00,
// Sun: Closed"), so it's parsed into per-weekday open/close bounds here
// instead of hardcoding a schedule anywhere in the booking flow.
// Pure functions — no dependency on component props/state — so they live
// at module scope instead of being redefined on every render.
const WEEKDAY_TOKENS = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

// "9am" / "9:30am" / "09:00" / "21:00" -> "HH:MM" (24h), or null.
const parseHoursTimeToken = (raw) => {
  const match = raw.trim().toLowerCase().match(/^(\d{1,2})(?::(\d{2}))?\s*(am|pm)?$/);
  if (!match) return null;
  let hour = parseInt(match[1], 10);
  const minute = match[2] ? parseInt(match[2], 10) : 0;
  const period = match[3];
  if (period === 'pm' && hour !== 12) hour += 12;
  if (period === 'am' && hour === 12) hour = 0;
  if (hour > 23 || minute > 59) return null;
  return `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
};

// "Mon-Fri" / "Sat" / "Mon, Wed" -> Set of weekday indices (0 = Sun).
const parseHoursDayToken = (raw) => {
  const days = new Set();
  raw.split(/[,&]|\band\b/i).map(p => p.trim().toLowerCase()).filter(Boolean).forEach(part => {
    const range = part.match(/^([a-z]{3,})\s*-\s*([a-z]{3,})$/);
    const start = WEEKDAY_TOKENS.indexOf((range ? range[1] : part).slice(0, 3));
    const end = WEEKDAY_TOKENS.indexOf((range ? range[2] : part).slice(0, 3));
    if (start === -1 || end === -1) return;
    for (let i = start; ; i = (i + 1) % 7) {
      days.add(i);
      if (i === end) break;
    }
  });
  return days;
};

// Parses the full hours string into { [0-6]: {open, close} | null }.
// Returns null when nothing usable could be parsed at all.
const parseShopHours = (hoursText) => {
  if (!hoursText || typeof hoursText !== 'string') return null;
  const byDay = {};
  let matchedAny = false;

  hoursText.split(',').map(s => s.trim()).filter(Boolean).forEach(segment => {
    const withDay = segment.match(/^([a-zA-Z,&\s-]+?)\s*:\s*(.+)$/);
    const days = withDay ? parseHoursDayToken(withDay[1]) : new Set(WEEKDAY_TOKENS.map((_, i) => i));
    const rest = withDay ? withDay[2] : segment;
    if (days.size === 0) return;

    if (/closed|off\b/i.test(rest)) {
      days.forEach(d => { byDay[d] = null; matchedAny = true; });
      return;
    }

    const times = rest.match(/(\d{1,2}(?::\d{2})?\s*(?:am|pm)?)\s*-\s*(\d{1,2}(?::\d{2})?\s*(?:am|pm)?)/i);
    if (!times) return;
    const open = parseHoursTimeToken(times[1]);
    const close = parseHoursTimeToken(times[2]);
    if (!open || !close) return;
    days.forEach(d => { byDay[d] = { open, close }; matchedAny = true; });
  });

  return matchedAny ? byDay : null;
};

// Resolves opening hours for one booking date. Returns:
//  - { open, close } when the shop is open that day
//  - null when the shop is explicitly closed that day (or that day isn't
//    mentioned at all in an otherwise-parseable hours string)
//  - undefined when the hours text couldn't be parsed at all (caller
//    falls back to the full legacy slot range so a bad hours string can
//    never lock every customer out of booking)
const getShopHoursForDate = (hoursText, dateStr) => {
  if (!dateStr) return undefined;
  const parsed = parseShopHours(hoursText);
  if (!parsed) return undefined;
  const [y, m, d] = dateStr.split('-').map(Number);
  if (!y || !m || !d) return undefined;
  const dayIndex = new Date(y, m - 1, d).getDay();
  return Object.prototype.hasOwnProperty.call(parsed, dayIndex) ? parsed[dayIndex] : null;
};

export default function App() {
  const [content, setContent] = useState(DEFAULT_CONTENT);
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // ─── Mobile menu scroll indicator (added) ──────────────────────────────
  const mobileMenuScrollRef = useRef(null);
  // Whenever the mobile menu opens (or the viewport resizes while it's
  // open), size its scroll area to the space actually available below it,
  // so the (now-scrollable) content can reach a real scrollbar instead of
  // being clipped by the fixed header.
  useEffect(() => {
    if (!isMenuOpen) return;
    const el = mobileMenuScrollRef.current;
    if (!el) return;
    const updateMobileMenuMaxHeight = () => {
      const rect = el.getBoundingClientRect();
      const available = window.innerHeight - rect.top - 16;
      el.style.maxHeight = `${Math.max(available, 160)}px`;
    };
    updateMobileMenuMaxHeight();
    window.addEventListener('resize', updateMobileMenuMaxHeight);
    return () => window.removeEventListener('resize', updateMobileMenuMaxHeight);
  }, [isMenuOpen]);
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
  const sections = ['home', 'services', 'about', 'gallery', 'team', 'products', 'reviews'];
  let ticking = false;

  // Scroll fires far more often than the browser can paint, so the actual
  // work (DOM reads via getElementById/offsetTop) is throttled to once per
  // animation frame instead of running on every single scroll event.
  const updateScrollState = () => {
    setScrolled(window.scrollY > 50);

    for (const section of sections) {
      const el = document.getElementById(section);
      if (
        el &&
        window.scrollY >= el.offsetTop - 120 &&
        window.scrollY < el.offsetTop + el.offsetHeight - 120
      ) {
        setActiveSection(section);
      }
    }
    ticking = false;
  };

  const handleScroll = () => {
    if (!ticking) {
      window.requestAnimationFrame(updateScrollState);
      ticking = true;
    }
  };

  window.addEventListener("scroll", handleScroll, { passive: true });

  return () => window.removeEventListener("scroll", handleScroll);
}, []);
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
  // Decoupled from isBookingModalOpen so the modal can play an exit
  // animation instead of vanishing instantly: isBookingModalRendered keeps
  // it mounted a beat longer, isBookingModalVisible drives the actual
  // opacity/scale transition classes.
  const [isBookingModalRendered, setIsBookingModalRendered] = useState(false);
  const [isBookingModalVisible, setIsBookingModalVisible] = useState(false);
  const bookingModalRef = useRef(null);
  const bookingModalTriggerRef = useRef(null);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ serviceId: '', barberId: '', date: '', time: '', name: '', phone: '', email: '' });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ─── GALLERY LIGHTBOX (mobile only, <768px) ────────────────────────────────
  // Tracks whether the viewport is currently in "mobile" mode (matches the
  // md: breakpoint at 768px) so the lightbox only ever opens on mobile and
  // never touches desktop/tablet click behavior.
  const [isMobileViewport, setIsMobileViewport] = useState(
    () => typeof window !== 'undefined' && window.innerWidth < 768
  );
  const [lightboxItem, setLightboxItem] = useState(null); // { look, index }
  // Decoupled the same way as the booking modal: lightboxRendered keeps the
  // dialog mounted for the exit animation, lightboxVisible drives the actual
  // opacity/scale transition classes.
  const [lightboxRendered, setLightboxRendered] = useState(false);
  const [lightboxVisible, setLightboxVisible] = useState(false);
  const lightboxTriggerRef = useRef(null);
  const lightboxTouchStartY = useRef(null);
  const [lightboxDragY, setLightboxDragY] = useState(0);

  // ─── PRODUCTS MODAL (opens on click, all breakpoints) ──────────────────────
  // Same rendered/visible split as the gallery lightbox and booking modal:
  // isProductModalRendered keeps the dialog mounted for the closing
  // (zoom-out) transition; isProductModalVisible is flipped a frame after
  // mount so the opening (zoom-in) transition has a starting state.
  const [productModalItem, setProductModalItem] = useState(null);
  const [isProductModalRendered, setIsProductModalRendered] = useState(false);
  const [isProductModalVisible, setIsProductModalVisible] = useState(false);
  const productModalRef = useRef(null);
  const productModalTriggerRef = useRef(null);

  // Mobile-only: hero stats cards fade/scale into view once as they enter
  // the viewport, instead of relying on AOS (which animates them instantly
  // if they already happen to sit inside the initial viewport at load).
  // Desktop/tablet keep the original AOS "zoom-in" animation untouched.
  const statsRef = useRef(null);
  const [statsRevealed, setStatsRevealed] = useState(false);

  const [bookingsList, setBookingsList] = useState([]);

  // Customer remembered info
  const [savedEmail, setSavedEmail] = useState("");
  const [savedPhone, setSavedPhone] = useState("");
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
  const [editingProduct, setEditingProduct] = useState(null);
  const [saveStatus, setSaveStatus] = useState('');
  const [previewImage, setPreviewImage] = useState(null);
  const [previewProductImage, setPreviewProductImage] = useState(null);
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

  // ─── SUPABASE: load recent looks / Gallery — public: the shop_settings
  // effect above only runs when an admin is logged in, so ordinary
  // visitors never received the saved gallery photos and always saw the
  // hardcoded defaults instead. This mirrors the public products loader
  // below, scoped to just the recent_looks column. ───────────────────────
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const { data, error } = await supabase
          .from('shop_settings')
          .select('recent_looks')
          .eq('id', 1)
          .maybeSingle();
        if (!error && data?.recent_looks && mounted) {
          setContent(prev => ({ ...prev, recentLooks: data.recent_looks }));
        }
      } catch (err) {
        console.error('Error loading recent looks:', err);
      }
    })();
    return () => { mounted = false; };
  }, []);

  // ─── SUPABASE: load opening hours — public: like the recent looks loader
  // above, the main shop_settings effect only runs for a logged-in admin,
  // so ordinary customers booking an appointment never received hours
  // changes the owner made in the dashboard, and the slot generator below
  // (getShopHoursForDate / shopHoursForSelectedDate) always fell back to
  // the default hours instead of the shop's real, current ones. Scoped to
  // just the `contact` column. ────────────────────────────────────────────
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const { data, error } = await supabase
          .from('shop_settings')
          .select('contact')
          .eq('id', 1)
          .maybeSingle();
        if (!error && data?.contact && mounted) {
          setContent(prev => ({ ...prev, contact: { ...prev.contact, ...data.contact } }));
        }
      } catch (err) {
        console.error('Error loading opening hours:', err);
      }
    })();
    return () => { mounted = false; };
  }, []);

  // ─── SUPABASE: load products (public — runs for every visitor, not just
  // the logged-in owner, since the Products section has to work for
  // ordinary customers) + realtime updates so an edit in the admin panel
  // reflects live on any open visitor tab. ─────────────────────────────────
  useEffect(() => {
    let mounted = true;

    const loadProducts = async () => {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .order('display_order', { ascending: true });
        if (!error && data && mounted) {
          setContent(prev => ({
            ...prev,
            products: data.map(p => ({
              id: p.id,
              name: p.name,
              price: p.price,
              description: p.description || '',
              phone: p.phone_number,
              img: p.image_url,
              displayOrder: p.display_order,
            })),
          }));
        }
      } catch (err) {
        console.error('Error loading products:', err);
      }
    };
    loadProducts();

    const productsChannel = supabase
      .channel('products-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'products' }, () => {
        loadProducts();
      })
      .subscribe();

    return () => {
      mounted = false;
      supabase.removeChannel(productsChannel);
    };
  }, []);

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
  // The hero video renders on every device, phones included. We only ever
  // fall back to a static poster image if that breakpoint's own <video>
  // element reports it genuinely cannot play (bad source, unsupported
  // codec, etc.) via onError — never based on screen width,
  // reduced-motion, or Data Saver, since none of those mean the video
  // "can't" play. Desktop and mobile each track their own failure state
  // independently, so a problem with one file can never hide the other
  // breakpoint's working video.
  const [heroDesktopVideoFailed, setHeroDesktopVideoFailed] = useState(false);
  const [heroMobileVideoFailed, setHeroMobileVideoFailed] = useState(false);
  const heroVideoRef = useRef(null);
  const heroVideoMobileRef = useRef(null);

  // Only the video matching the current breakpoint is mounted in the DOM
  // (matches Tailwind's `md` = 768px, same breakpoint the hidden/block
  // classes below already use) — previously both the desktop and mobile
  // <video> elements were mounted at the same time and only hidden with
  // CSS, which meant every visitor downloaded both hero videos even
  // though only one was ever visible. Computed synchronously up front so
  // the right video is already chosen before the first paint.
  const [isDesktopViewport, setIsDesktopViewport] = useState(
    () => typeof window !== 'undefined' ? window.matchMedia('(min-width: 768px)').matches : true
  );
  useEffect(() => {
    const mql = window.matchMedia('(min-width: 768px)');
    const handleViewportChange = (e) => setIsDesktopViewport(e.matches);
    mql.addEventListener('change', handleViewportChange);
    return () => mql.removeEventListener('change', handleViewportChange);
  }, []);

  useEffect(() => {
    // Belt-and-suspenders for mobile: the `autoPlay` attribute alone is
    // sometimes silently ignored by Android Chrome / Samsung Internet
    // (e.g. after the tab was backgrounded, or on some in-app browsers),
    // so we also imperatively call play() once the element mounts.
    // Explicitly setting the `.muted` property (not just the attribute)
    // is what the mobile autoplay policies actually check.
    // Only the currently-mounted breakpoint's video exists in the DOM, so
    // this re-runs whenever the mounted video changes (initial mount, or
    // a live resize across the 768px breakpoint).
    const setupAutoplay = (el) => {
      if (!el) return;
      el.muted = true;
      const playPromise = el.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Autoplay was blocked outright (rare with muted+playsInline, but
          // some browsers require a user gesture). Retry on the first touch
          // or click anywhere on the page.
          const retry = () => {
            el.play().catch(() => {});
            window.removeEventListener('touchstart', retry);
            window.removeEventListener('click', retry);
          };
          window.addEventListener('touchstart', retry, { once: true, passive: true });
          window.addEventListener('click', retry, { once: true });
        });
      }
    };
    setupAutoplay(isDesktopViewport ? heroVideoRef.current : heroVideoMobileRef.current);
  }, [isDesktopViewport]);

  useEffect(() => {
  setSavedEmail(localStorage.getItem("customerEmail") || "");
  setSavedPhone(localStorage.getItem("customerPhone") || "");
}, []);

  // ─── MY BOOKINGS: ACTIVE vs PAST ──────────────────────────────────────────
  // A booking is only "active" up until its own appointment date + time —
  // after that it should behave like a Past Appointment everywhere My
  // Bookings is shown (navbar badge, mobile menu badge, appointments list),
  // with no manual cancel/complete step required. This tick re-runs the
  // activeClientBookings filter below roughly once a minute so that stays
  // true live, without the customer needing to refresh the page for an
  // appointment to drop off once its time has passed.
  const [nowTick, setNowTick] = useState(() => Date.now());
  useEffect(() => {
    const intervalId = setInterval(() => setNowTick(Date.now()), 60000);
    return () => clearInterval(intervalId);
  }, []);

  // Combines a booking's stored date ("YYYY-MM-DD") + time ("HH:MM", 24h,
  // same shape as booking_date/time_slot from Supabase) into a real Date in
  // the browser's own local timezone, then checks it against "now". This is
  // the single place that decides past-vs-active so that decision is made
  // the same way everywhere it's needed.
  const isBookingPast = useCallback((dateStr, timeStr) => {
    if (!dateStr || !timeStr) return false;
    const [year, month, day] = dateStr.split('-').map(Number);
    const [hour, minute] = timeStr.split(':').map(Number);
    if (!year || !month || !day || Number.isNaN(hour) || Number.isNaN(minute)) return false;
    const appointmentDateTime = new Date(year, month - 1, day, hour, minute);
    return appointmentDateTime.getTime() < nowTick;
  }, [nowTick]);

  const activeClientBookings = useMemo(
    () => bookingsList.filter(
      b =>
        b.email === savedEmail &&
        b.phone === savedPhone &&
        b.status !== "cancelled" &&
        !isBookingPast(b.date, b.time)
    ),
    [bookingsList, savedEmail, savedPhone, isBookingPast]
  );

  // Products, sorted by display order. Previously this exact
  // [...content.products].sort(...) was inlined twice in the JSX below
  // (public Products grid + admin Products list), so it re-ran on every
  // single render of the whole app, not just when content.products
  // actually changed. Memoizing it doesn't change what either list
  // renders — same array, same order, same objects.
  const sortedProducts = useMemo(
    () => [...content.products].sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0)),
    [content.products]
  );

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

  // Shop hours for the date currently selected in the booking form.
  const shopHoursForSelectedDate = useMemo(
    () => getShopHoursForDate(content.contact.hours, formData.date),
    [content.contact.hours, formData.date]
  );

  // availableSlots (the master 03:00-21:00 list) stays untouched — it also
  // backs the admin's "Block Time Slot" picker in AdminDashboardView, which
  // isn't scoped to a single day's hours. This derives the slots that
  // actually fall within working hours for the customer-facing grid below,
  // computed once per date/hours change rather than on every render.
  const workingHourSlots = useMemo(() => {
    if (shopHoursForSelectedDate === null) return []; // shop closed this day
    if (!shopHoursForSelectedDate) return availableSlots; // unparseable hours text — preserve prior behavior
    const { open, close } = shopHoursForSelectedDate;
    return availableSlots.filter(slot => slot >= open && slot <= close);
  }, [availableSlots, shopHoursForSelectedDate]);

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

  // ─── ONE APPOINTMENT PER CUSTOMER PER DAY ─────────────────────────────────
  // A customer (identified by phone number) may only hold one active
  // appointment per calendar day; they reschedule the existing one instead
  // of creating a second. "Active" reuses the same definition already used
  // for the My Appointments reschedule/cancel buttons — not cancelled and
  // not completed. excludeId lets a reschedule-in-progress ignore the very
  // booking it's updating. Client-side pre-check against bookingsList
  // (already loaded + kept in sync via the bookings realtime subscription)
  // for instant feedback; handleBookingSubmit re-verifies against Supabase
  // directly right before inserting, since there's no DB constraint backing
  // this rule.
  const hasExistingBookingOnDate = (phone, date, excludeId) => {
    return bookingsList.some(b =>
      b.phone === phone &&
      b.date === date &&
      b.status !== 'cancelled' &&
      b.status !== 'completed' &&
      b.id !== excludeId
    );
  };

  // Load availability data from database (real-time sync)
  useEffect(() => {
    if (!formData.barberId || !formData.date || !isBookingModalOpen) return;
    
    setIsLoadingAvailability(true);
    const timeoutId = setTimeout(() => {
      // Get booked times for selected barber and date
      const booked = bookingsList
        .filter(b => b.barberId === formData.barberId && b.date === formData.date && b.status === 'confirmed'  &&
      b.id !== formData.id   
        )
        .map(b => b.time);
      
      // Build booked slots map (functional update — avoids a stale
      // closure over `bookedSlots` if another update lands concurrently)
      const key = `${formData.barberId}-${formData.date}`;
      setBookedSlots(prev => ({ ...prev, [key]: booked }));

      // Get available slots — start from the shop's working-hour slots for
      // this date (not the raw master list) so booked/blocked filtering
      // never surfaces a time outside opening hours as "available".
       const blockedTimesForSlot = getBlockedTimesForBarber(formData.barberId, formData.date);
      const available = workingHourSlots.filter(
        slot => !booked.includes(slot) && !blockedTimesForSlot.includes(slot)
      );
      setSelectedBarberAvailability(available);
      setIsLoadingAvailability(false);
    }, 300); // Small delay for visual feedback

    return () => clearTimeout(timeoutId);
  }, [formData.barberId, formData.date, bookingsList, isBookingModalOpen, workingHourSlots]);
   useEffect(() => {
  AOS.init({
    duration: 800,
    once: true,
    easing: "ease-out-cubic",
  });
}, []);
useEffect(() => {
  if (!isBookingModalOpen) return;

  const handleModalKeyDown = (e) => {
    if (e.key === "Escape" && !isSubmitting) {
      setIsBookingModalOpen(false);
      return;
    }
    // Keep Tab/Shift+Tab cycling within the modal instead of escaping to
    // the page behind it (queried live so it stays correct as the
    // booking step — and therefore the set of focusable fields — changes).
    if (e.key === "Tab" && bookingModalRef.current) {
      const focusable = bookingModalRef.current.querySelectorAll(
        'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  };

  window.addEventListener("keydown", handleModalKeyDown);

  return () => window.removeEventListener("keydown", handleModalKeyDown);
}, [isBookingModalOpen, isSubmitting]);
useEffect(() => {
  document.body.style.overflow = isBookingModalOpen ? "hidden" : "auto";

  return () => {
    document.body.style.overflow = "auto";
  };
}, [isBookingModalOpen]);

  // Booking modal open/close animation + focus management.
  // isBookingModalRendered keeps the modal mounted for the exit
  // transition; isBookingModalVisible is flipped a frame after mount so
  // the enter transition actually has a starting state to animate from.
  useEffect(() => {
    if (isBookingModalOpen) {
      bookingModalTriggerRef.current = document.activeElement;
      setIsBookingModalRendered(true);
      const raf = requestAnimationFrame(() => setIsBookingModalVisible(true));
      return () => cancelAnimationFrame(raf);
    }

    setIsBookingModalVisible(false);
    const hideTimer = setTimeout(() => {
      setIsBookingModalRendered(false);
      // Return focus to whatever opened the modal (Book Now button, a
      // service card, "Book with <barber>", etc.) rather than dropping it
      // back to <body>.
      bookingModalTriggerRef.current?.focus?.();
      bookingModalTriggerRef.current = null;
    }, 300); // matches the panel's transition duration below
    return () => clearTimeout(hideTimer);
  }, [isBookingModalOpen]);

  // Move focus into the dialog itself once it's visible, so screen
  // readers announce it and keyboard users don't need to hunt for it.
  useEffect(() => {
    if (isBookingModalVisible) {
      bookingModalRef.current?.focus?.();
    }
  }, [isBookingModalVisible]);

  // ─── Gallery lightbox: mobile detection + open/close animation ────────────
  useEffect(() => {
    const handleResize = () => setIsMobileViewport(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Mobile-only stats reveal: watches the hero stats grid and flips
  // statsRevealed to true the first time it enters the viewport, then
  // disconnects — a one-time trigger, never re-fires, never reverses.
  useEffect(() => {
    if (!isMobileViewport || statsRevealed) return;
    const node = statsRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [isMobileViewport, statsRevealed]);

  // lightboxRendered keeps the dialog mounted for the closing (zoom-out)
  // transition; lightboxVisible is flipped a frame after mount so the
  // opening (zoom-in) transition has a starting state to animate from.
  useEffect(() => {
    if (lightboxItem) {
      setLightboxRendered(true);
      const raf = requestAnimationFrame(() => setLightboxVisible(true));
      return () => cancelAnimationFrame(raf);
    }

    setLightboxVisible(false);
    const hideTimer = setTimeout(() => {
      setLightboxRendered(false);
      lightboxTriggerRef.current?.focus?.();
      lightboxTriggerRef.current = null;
    }, 300); // matches the panel's transition duration below
    return () => clearTimeout(hideTimer);
  }, [lightboxItem]);

  useEffect(() => {
    document.body.style.overflow = lightboxItem ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [lightboxItem]);

  useEffect(() => {
    if (!lightboxItem) return;
    const handleLightboxKeyDown = (e) => {
      if (e.key === "Escape") setLightboxItem(null);
    };
    window.addEventListener("keydown", handleLightboxKeyDown);
    return () => window.removeEventListener("keydown", handleLightboxKeyDown);
  }, [lightboxItem]);

  // ─── Products modal: open/close animation, focus + escape + scroll-lock ───
  // Mirrors the gallery lightbox / booking modal pattern above.
  useEffect(() => {
    if (productModalItem) {
      setIsProductModalRendered(true);
      const raf = requestAnimationFrame(() => setIsProductModalVisible(true));
      return () => cancelAnimationFrame(raf);
    }

    setIsProductModalVisible(false);
    const hideTimer = setTimeout(() => {
      setIsProductModalRendered(false);
      productModalTriggerRef.current?.focus?.();
      productModalTriggerRef.current = null;
    }, 300); // matches the panel's transition duration below
    return () => clearTimeout(hideTimer);
  }, [productModalItem]);

  useEffect(() => {
    document.body.style.overflow = productModalItem ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [productModalItem]);

  // Move focus into the dialog once it's visible, so screen readers
  // announce it and keyboard users don't need to hunt for it.
  useEffect(() => {
    if (isProductModalVisible) {
      productModalRef.current?.focus?.();
    }
  }, [isProductModalVisible]);

  useEffect(() => {
    if (!productModalItem) return;
    const handleProductModalKeyDown = (e) => {
      if (e.key === "Escape") {
        setProductModalItem(null);
        return;
      }
      // Keep Tab/Shift+Tab cycling within the modal, same as the booking modal.
      if (e.key === "Tab" && productModalRef.current) {
        const focusable = productModalRef.current.querySelectorAll(
          'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", handleProductModalKeyDown);
    return () => window.removeEventListener("keydown", handleProductModalKeyDown);
  }, [productModalItem]);

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

  // Opens the gallery lightbox — mobile only; a no-op on desktop/tablet so
  // the (already no-op there) tap handler can be wired up unconditionally.
  const openLightbox = (look, index, e) => {
    if (!isMobileViewport) return;
    lightboxTriggerRef.current = e?.currentTarget || null;
    setLightboxDragY(0);
    setLightboxItem({ look, index });
  };

  const closeLightbox = () => setLightboxItem(null);

  // Swipe-down-to-close: track the drag distance while the finger moves
  // down, snap the panel back if released early, close it past a threshold.
  const handleLightboxTouchStart = (e) => {
    lightboxTouchStartY.current = e.touches[0].clientY;
  };
  const handleLightboxTouchMove = (e) => {
    if (lightboxTouchStartY.current === null) return;
    const delta = e.touches[0].clientY - lightboxTouchStartY.current;
    if (delta > 0) setLightboxDragY(delta);
  };
  const handleLightboxTouchEnd = () => {
    if (lightboxDragY > 100) {
      closeLightbox();
    }
    setLightboxDragY(0);
    lightboxTouchStartY.current = null;
  };

  // Opens the product modal — works on every breakpoint (desktop/tablet/
  // mobile), unlike the gallery lightbox above which is mobile-only.
  const openProductModal = (product, e) => {
    productModalTriggerRef.current = e?.currentTarget || null;
    setProductModalItem(product);
  };

  const closeProductModal = () => setProductModalItem(null);

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

  const handleSaveProduct = async (productData) => {
    if (!productData.name || !productData.price) {
      setUploadError('Please provide a product name and price');
      setTimeout(() => setUploadError(''), 4000);
      return;
    }
    try {
      const id = productData.id || ('p_' + Date.now());
      const isNew = !productData.id;
      const displayOrder = isNew
        ? (content.products && content.products.length
            ? Math.max(...content.products.map(p => p.displayOrder ?? 0)) + 1
            : 0)
        : (productData.displayOrder ?? 0);
      const row = {
        id,
        name: productData.name,
        price: productData.price,
        description: productData.description || '',
        phone_number: productData.phone || content.contact.phone,
        image_url: productData.img,
        display_order: displayOrder,
      };
      const { error } = await supabase.from('products').upsert(row);
      if (error) throw error;

      setContent(prev => {
        const exists = prev.products?.some(p => p.id === id);
        const products = exists
          ? prev.products.map(p => p.id === id ? { ...productData, id, displayOrder } : p)
          : [...(prev.products || []), { ...productData, id, displayOrder }];
        return { ...prev, products };
      });
      setEditingProduct(null);
      setPreviewProductImage(null);
      setSaveStatus('Product saved!');
      setTimeout(() => setSaveStatus(''), 2500);
    } catch (err) {
      console.error('Failed to save product', err);
      setUploadError('Failed to save product: ' + err.message);
      setTimeout(() => setUploadError(''), 4000);
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      const { error } = await supabase.from('products').delete().eq('id', id);
      if (error) throw error;
      setContent(prev => ({ ...prev, products: (prev.products || []).filter(p => p.id !== id) }));
    } catch (err) {
      console.error('Failed to delete product', err);
      setUploadError('Failed to delete product: ' + err.message);
      setTimeout(() => setUploadError(''), 4000);
    }
  };

  // Swaps display_order between a product and its up/down neighbor —
  // optimistic local update first, then persists both rows.
  const handleReorderProduct = async (id, direction) => {
    const list = [...(content.products || [])].sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0));
    const idx = list.findIndex(p => p.id === id);
    const swapIdx = direction === 'up' ? idx - 1 : idx + 1;
    if (idx === -1 || swapIdx < 0 || swapIdx >= list.length) return;

    const a = list[idx];
    const b = list[swapIdx];
    const aOrder = a.displayOrder ?? 0;
    const bOrder = b.displayOrder ?? 0;

    setContent(prev => ({
      ...prev,
      products: prev.products.map(p => {
        if (p.id === a.id) return { ...p, displayOrder: bOrder };
        if (p.id === b.id) return { ...p, displayOrder: aOrder };
        return p;
      }),
    }));

    try {
      const [res1, res2] = await Promise.all([
        supabase.from('products').update({ display_order: bOrder }).eq('id', a.id),
        supabase.from('products').update({ display_order: aOrder }).eq('id', b.id),
      ]);
      if (res1.error) throw res1.error;
      if (res2.error) throw res2.error;
    } catch (err) {
      console.error('Failed to reorder products', err);
      setUploadError('Failed to save new order: ' + err.message);
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

      // One appointment per customer per day — applies to both a brand-new
      // booking and a reschedule (moving an existing booking onto a day
      // that already has a different active one would recreate the same
      // duplicate), so the booking currently being rescheduled (if any) is
      // the only one excluded from its own check.
      if (hasExistingBookingOnDate(formData.phone, formData.date, formData.id || null)) {
        setFormErrors({ time: t('lbl_duplicate_booking_error') });
        setStep(3);
        setIsSubmitting(false);
        return;
      }

      // ===== AUTHORITATIVE CHECK: insert into Supabase =====
      // The `unique_active_booking_slot` partial unique index on
      // (barber_id, booking_date, time_slot) WHERE status IN ('confirmed','pending')
      // is the real source of truth — it prevents two customers from
      // booking the same barber/date/time slot in a race condition.
      // There's no equivalent DB constraint for "one booking per customer
      // per day" (would require a schema change), so we re-verify directly
      // against Supabase here too, right before writing, to narrow the
      // race window as much as possible. The booking being rescheduled (if
      // any) is excluded from its own check the same way as above.
      {
        const { data: existingForDay, error: existingErr } = await supabase
          .from('bookings')
          .select('id, status')
          .eq('phone', formData.phone)
          .eq('booking_date', formData.date);

        if (existingErr) throw existingErr;

        const hasActive = (existingForDay || []).some(
          b => b.status !== 'cancelled' && b.status !== 'completed' && b.id !== formData.id
        );
        if (hasActive) {
          setFormErrors({ time: t('lbl_duplicate_booking_error') });
          setStep(3);
          setIsSubmitting(false);
          return;
        }
      }

      let data, error;

if (formData.id) {
  // Reschedule existing booking
  ({ data, error } = await supabase
    .from('bookings')
    .update({
      customer_name: formData.name,
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      service_id: formData.serviceId,
      service_name: selectedService?.name || t('lbl_unknown_service'),
      barber_id: formData.barberId,
      barber_name: barberName,
      booking_date: formData.date,
      time_slot: formData.time,
    })
    .eq('id', formData.id)
    .select()
    .single());
} else {
  // Create a new booking
  ({ data, error } = await supabase
    .from('bookings')
    .insert({
      customer_name: formData.name,
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
    .single());
}

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
      localStorage.setItem("kemekem_customer_email", formData.email);
      localStorage.setItem("kemekem_customer_phone", formData.phone);

if (formData.id) {
  // Replace the existing booking in the list
  setBookingsList(prev =>
    prev.map(b => b.id === formData.id ? newBooking : b)
  );
} else {
  // Add a new booking
  setBookingsList(prev => [newBooking, ...prev]);
}
  // Save customer info for future visits
  localStorage.setItem("customerEmail", formData.email);
  localStorage.setItem("customerPhone", formData.phone);



      setStep(5);

setTimeout(() => {
  setIsBookingModalOpen(false);

  setStep(1);

  setFormData({
    serviceId: '',
    barberId: '',
    date: '',
    time: '',
    name: '',
    phone: '',
    email: '',
  });
}, 5000);
    } catch (error) {
      console.error("Booking error:", error.message);
      setFormErrors({ time: 'Something went wrong. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  }

  const handleCancelBooking = async (bookingId) => {
    try {
      const { data, error } = await supabase
  .from('bookings')
  .update({ status: 'cancelled' })
  .eq('id', bookingId)
  .select();
if (error) throw error;
if (!data || data.length === 0) {
  throw new Error('Cancellation was not saved by the server.');
}

      const updater = b => b.id === bookingId ? { ...b, status: 'cancelled' } : b;
      setBookingsList(prev => prev.map(updater));
    } catch (err) {
     
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

      {/* ── Mobile performance & accessibility overrides ──
           Kept as one global block instead of editing every
           backdrop-blur/transition utility individually, so the
           whole site is covered consistently. ── */}
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
            scroll-behavior: auto !important;
          }
        }

        /* Glassmorphism survives fine at a much lower blur radius.
           blur-xl/blur-2xl are among the more GPU/battery expensive
           effects on mobile chipsets, especially stacked over the
           hero video and layered cards. */
        @media (max-width: 768px) {
          [class*="backdrop-blur"] {
            backdrop-filter: blur(6px) !important;
            -webkit-backdrop-filter: blur(6px) !important;
          }
        }

        /* Slow, one-time cinematic zoom for the hero video/poster.
           transform-only => GPU-composited, cheap on battery, and
           automatically shortened by the reduced-motion rule above. */
        @keyframes heroKenBurns {
          from { transform: scale(1); }
          to   { transform: scale(1.08); }
        }
        .hero-cinematic-zoom {
          animation: heroKenBurns 20s ease-out forwards;
        }
        /* On narrow/tall viewports object-cover already crops a landscape
           video much more aggressively than it does on desktop, so the
           full 1.08 Ken Burns zoom on top of that reads as "too zoomed in".
           A smaller zoom keeps the cinematic drift without over-cropping. */
        @media (max-width: 768px) {
          @keyframes heroKenBurnsMobile {
            from { transform: scale(1); }
            to   { transform: scale(1.035); }
          }
          .hero-cinematic-zoom {
            animation-name: heroKenBurnsMobile;
          }
        }
      `}</style>

      
      {/* ─── OWNER LOGIN MODAL ─────────────────────────────────────────────── */}
      {ownerLoginModal && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-sm z-[200] flex items-center justify-center p-4"
             onClick={(e) => e.target === e.currentTarget && !loginLoading && (setOwnerLoginModal(false), setLoginError(''))}>
          <div role="dialog" aria-modal="true" aria-labelledby="owner-login-title" className="bg-zinc-900 border border-zinc-800 rounded-2xl max-w-sm w-full shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-amber-500/10 to-zinc-900 p-6 border-b border-zinc-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <Shield size={20} className="text-amber-500" />
                </div>
                <div>
                  <h3 id="owner-login-title" className="text-lg font-bold text-white">Owner Login</h3>
                  <p className="text-zinc-400 text-xs">Admin access only</p>
                </div>
                <button disabled={loginLoading}
                  onClick={() => { setOwnerLoginModal(false); setLoginError(''); setOwnerCredentials({ email: '', password: '' }); }}
                  aria-label="Close"
                  className="ml-auto text-zinc-500 hover:text-white p-1 rounded-lg hover:bg-zinc-800 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(245,158,11,0.25)]">
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Form */}
            <div className="p-6 space-y-4">
              {/* Error banner */}
              {loginError && (
                <div role="alert" className="flex items-start gap-2 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                  <span className="text-red-400 text-sm leading-relaxed">{loginError}</span>
                </div>
              )}

              {/* Email */}
              <div>
                <label htmlFor="owner-email" className="block text-xs font-semibold text-zinc-400 uppercase tracking-wide mb-1.5">
                  Email Address
                </label>
                <input
                  id="owner-email"
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
                <label htmlFor="owner-password" className="block text-xs font-semibold text-zinc-400 uppercase tracking-wide mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="owner-password"
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
                    aria-label={showOwnerPassword ? 'Hide password' : 'Show password'}
                    className="absolute right-3 top-2.5 text-zinc-500 hover:text-zinc-300 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(245,158,11,0.25)]">
                    {showOwnerPassword ? <EyeOff size={16}/> : <Eye size={16}/>}
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-1">
                <button
                  onClick={() => { setOwnerLoginModal(false); setLoginError(''); setOwnerCredentials({ email: '', password: '' }); }}
                  disabled={loginLoading}
                  className="flex-1 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-sm font-semibold rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(245,158,11,0.25)] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0">
                  Cancel
                </button>
                <button
                  onClick={handleOwnerLogin}
                  disabled={loginLoading || !ownerCredentials.email || !ownerCredentials.password}
                  className="flex-1 py-2.5 bg-amber-500 hover:bg-amber-400 text-zinc-950 text-sm font-bold rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(245,158,11,0.25)] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 flex items-center justify-center gap-2">
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
      <header
         className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
        ? "bg-zinc-950/75 backdrop-blur-2xl border-b border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.45)]"
        : "bg-transparent"
        }`}
      >
       <div className="max-w-7xl mx-auto px-4 md:px-8 flex justify-between items-center">
          <div
  className="flex items-center gap-3 cursor-pointer group outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 rounded-lg"
  role="button"
  tabIndex={0}
  aria-label={t('nav_home')}
  onClick={() => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }}
>
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
              { id: 'products', key: 'nav_products' },
              { id: 'reviews', key: 'nav_reviews' }
            ].map((item) => (
              <button
  key={item.id}
  onClick={() => {
  scrollTo(item.id);
  setIsMenuOpen(false);
}}
  className={`relative text-sm font-semibold tracking-wide transition-all duration-300 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-amber-400 after:transition-all after:duration-300 ${
  activeSection === item.id
    ? 'text-amber-400 after:w-full'
    : 'text-zinc-300 hover:text-amber-400 after:w-0 hover:after:w-full'
}`}
>
  {t(item.key)}
</button>
            ))}
            
            <button 
              onClick={() => scrollTo('appointments')} 
              className="text-sm font-semibold text-amber-300 border border-amber-400/40 bg-white/5 backdrop-blur-md px-4 py-2 rounded-xl hover:bg-amber-500 hover:text-black hover:shadow-[0_0_25px_rgba(245,158,11,0.35)] transition-all duration-300 flex items-center gap-2"
            >
              <Calendar size={14} /> {t('btn_my_bookings')} 
              {activeClientBookings.length > 0 && (
                <span className="bg-amber-500 text-zinc-950 text-[10px] font-extrabold px-1.5 py-0.5 rounded-full">
                  {activeClientBookings.length}
                </span>
              )}
            </button>

            <button
  onClick={() => { setStep(1); setIsBookingModalOpen(true); }}
  className="group relative overflow-hidden bg-amber-500 text-black px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-500 hover:bg-amber-400 hover:scale-110 active:scale-95 hover:shadow-[0_0_40px_rgba(245,158,11,0.55)]"
>
  {t('btn_book_now')}
</button>

            <button
  onClick={() => setLang(lang === 'en' ? 'am' : 'en')}
  className="flex items-center gap-2 text-zinc-300 hover:text-white font-bold text-sm bg-white/5 backdrop-blur-md border border-zinc-700 px-4 py-2 rounded-full transition-all duration-300 hover:border-amber-400 hover:shadow-[0_0_20px_rgba(245,158,11,0.25)] ml-2"
>
  <Globe size={14} className="text-amber-500" />
  {lang === 'en' ? 'አማ' : 'EN'}
</button>
          </nav>
          
          <div className="flex items-center gap-4 md:hidden">
            <button onClick={() => setLang(lang === 'en' ? 'am' : 'en')} className="
flex
items-center
gap-1.5
rounded-full
border
border-white/10
bg-white/5
backdrop-blur-xl
px-3
py-2
text-xs
font-bold
text-zinc-300
transition-all
duration-300
hover:border-amber-400
hover:bg-amber-500/10
hover:text-white
hover:shadow-[0_0_20px_rgba(245,158,11,0.25)]
">
              <Globe size={14} className="text-amber-500" /> {lang === 'en' ? 'አማ' : 'EN'}
            </button>
           <button
  onClick={() => setIsMenuOpen(!isMenuOpen)}
  aria-expanded={isMenuOpen}
  aria-controls="mobile-nav-menu"
  aria-label={lang === 'en' ? (isMenuOpen ? 'Close menu' : 'Open menu') : (isMenuOpen ? 'ምናሌ ዝጋ' : 'ምናሌ ክፈት')}
  className="
    group
    flex
    h-11
    w-11
    items-center
    justify-center
    rounded-full
    border
    border-white/10
    bg-white/5
    backdrop-blur-xl
    text-zinc-300
    transition-all
    duration-300
    hover:border-amber-400
    hover:bg-amber-500/10
    hover:text-amber-400
    hover:rotate-90
    hover:shadow-[0_0_20px_rgba(245,158,11,0.30)]
    active:scale-90
    active:bg-amber-500/10
  "
>
  {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
</button> 
              
          </div>
        </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <>
        {/* Dimmed/blurred backdrop so page content behind the menu (gallery photos, badges, etc.) can't bleed through */}
        <div
          className="md:hidden fixed inset-0 bg-black/70 backdrop-blur-sm"
          onClick={() => setIsMenuOpen(false)}
          aria-hidden="true"
        />
        <div
          id="mobile-nav-menu"
          ref={mobileMenuScrollRef}
          className="
md:hidden
absolute
top-full
left-3
right-3
mt-2
rounded-2xl
border
border-white/10
bg-zinc-950/95
backdrop-blur-2xl
shadow-[0_20px_60px_rgba(0,0,0,0.45)]
overflow-hidden
animate-fade-up
flex
flex-col
">
          <nav
            className="flex-1 min-h-0 flex flex-col w-full py-2 overflow-y-auto kemekem-mobile-nav-scroll"
          >
            {[
              { id: 'home', key: 'nav_home' },
              { id: 'services', key: 'nav_services' },
              { id: 'about', key: 'nav_about' },
              { id: 'gallery', key: 'nav_gallery' },
              { id: 'team', key: 'nav_team' },
              { id: 'products', key: 'nav_products' },
              { id: 'reviews', key: 'nav_reviews' }
            ].map((item) => (
              <button
  key={item.id}
  onClick={() => {
    scrollTo(item.id);
    setIsMenuOpen(false);
  }}
  className="
group
relative
flex
items-center
justify-between
w-full
px-5
py-3.5
text-left
text-zinc-300
font-semibold
text-[15px]
tracking-wide
transition-all
duration-300
hover:bg-amber-500/10
hover:text-amber-400
"
>
                <>
  <span className="relative z-10">
    {t(item.key)}
  </span>

  <ChevronRight
    size={18}
    className="
      relative
      z-10
      text-zinc-600
      transition-all
      duration-300
      group-hover:text-amber-400
      group-hover:translate-x-2
    "
  />

  <span
    className="
      absolute
      inset-0
      rounded-2xl
      bg-gradient-to-r
      from-amber-500/10
      to-transparent
      opacity-0
      transition-opacity
      duration-300
      group-hover:opacity-100
    "
  />
</>
              </button>
            ))}
          </nav>

          <div className="flex-shrink-0 border-t border-white/10 pt-2">
            <button 
              onClick={() => { scrollTo('gallery'); setIsMenuOpen(false); }} 
              className="mx-3 mt-1 text-sm font-semibold text-white border border-zinc-700 bg-zinc-900/50 py-3 rounded-xl w-[calc(100%-1.5rem)] text-center hover:border-amber-500/30 hover:bg-zinc-900 transition-all flex items-center justify-center gap-2"
            >
              <Scissors size={16} className="text-amber-500" /> {t('nav_gallery')}
            </button>

            <button 
              onClick={() => { scrollTo('appointments'); setIsMenuOpen(false); }} 
              className="mx-3 mt-2 text-sm font-semibold text-amber-500 border border-amber-500/20 py-3 rounded-xl w-[calc(100%-1.5rem)] text-center bg-amber-500/5 flex items-center justify-center gap-2"
            >
              <Calendar size={16} /> {t('btn_my_bookings')} 
              {activeClientBookings.length > 0 && (
                <span className="bg-amber-500 text-zinc-950 text-xs px-2 py-0.5 rounded-full font-black">
                  {activeClientBookings.length}
                </span>
              )}
            </button>

            <button onClick={() => { setIsBookingModalOpen(true); setIsMenuOpen(false); }} className="
group
relative
overflow-hidden
mx-3
mt-2
mb-1
w-[calc(100%-1.5rem)]
rounded-xl
bg-amber-500
py-3
text-sm
font-bold
text-black
transition-all
duration-300
hover:scale-[1.02]
hover:bg-amber-400
hover:shadow-[0_0_30px_rgba(245,158,11,0.45)]
">
              <>
  <span className="relative z-10">
    {t('btn_book_now')}
  </span>

  <span
    className="
absolute
inset-0
-translate-x-full
bg-gradient-to-r
from-transparent
via-white/30
to-transparent
group-hover:translate-x-full
transition-transform
duration-1000
"
  ></span>
</>
            </button>
          </div>
          <style>{`
            .kemekem-mobile-nav-scroll::-webkit-scrollbar { width: 4px; }
            .kemekem-mobile-nav-scroll::-webkit-scrollbar-track { background: transparent; }
            .kemekem-mobile-nav-scroll::-webkit-scrollbar-thumb {
              background: rgba(255,255,255,0.25);
              border-radius: 9999px;
            }
            .kemekem-mobile-nav-scroll {
              scrollbar-width: thin;
              scrollbar-color: rgba(255,255,255,0.25) transparent;
            }
          `}</style>
        </div>

        {/* Close button — pinned above the backdrop so it stays sharp and tappable, matching the header toggle's look */}
        <button
          onClick={() => setIsMenuOpen(false)}
          aria-label={lang === 'en' ? 'Close menu' : 'ምናሌ ዝጋ'}
          className="md:hidden fixed top-4 right-4 z-[60] flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 backdrop-blur-xl text-zinc-300 transition-all duration-300 hover:rotate-90 hover:border-amber-400 hover:bg-amber-500/10 hover:text-amber-400 hover:shadow-[0_0_20px_rgba(245,158,11,0.30)] active:scale-90"
        >
          <X size={24} />
        </button>
        </>
      )}
      </header>

      {/* Main Content Area */}
      <main className="flex-grow">
        {!isAdminView ? (
          <>
            {/* Hero Section */}
            <section
             id="home" 
              data-aos="fade"
              className="relative min-h-[88vh] md:min-h-screen md:min-h-[100dvh] -mt-20 pt-20 flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 overflow-hidden">
  {/* Desktop + tablet: its own element, its own failure state. Only
      mounted at all when the viewport is md and up, so mobile visitors
      never request this file. */}
  {isDesktopViewport && (!heroDesktopVideoFailed ? (
    <video
      ref={heroVideoRef}
      autoPlay
      muted
      loop
      playsInline
      webkit-playsinline="true"
      disablePictureInPicture
      preload="auto"
      poster="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=1920&q=80"
      onError={() => setHeroDesktopVideoFailed(true)}
      className="hidden md:block absolute inset-0 w-full h-full object-cover brightness-[0.70] contrast-110 saturate-105 hero-cinematic-zoom"
    >
      <source src="/video/hero-desktop.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  ) : (
    <img
      src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=1920&q=80"
      alt=""
      className="hidden md:block absolute inset-0 w-full h-full object-cover brightness-[0.70] contrast-110 saturate-105 hero-cinematic-zoom"
    />
  ))}
  {/* Mobile: its own element, its own failure state. Only mounted at all
      when the viewport is below md, so desktop/tablet visitors never
      request this file. */}
  {!isDesktopViewport && (!heroMobileVideoFailed ? (
    <video
      ref={heroVideoMobileRef}
      autoPlay
      muted
      loop
      playsInline
      webkit-playsinline="true"
      disablePictureInPicture
      preload="auto"
      poster="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=1920&q=80"
      onError={() => setHeroMobileVideoFailed(true)}
      className="block md:hidden absolute inset-0 w-full h-full object-cover brightness-[0.70] contrast-110 saturate-105 hero-cinematic-zoom"
    >
      <source src="/video/hero-mobile.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  ) : (
    <img
      src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=1920&q=80"
      alt=""
      className="block md:hidden absolute inset-0 w-full h-full object-cover brightness-[0.70] contrast-110 saturate-105 hero-cinematic-zoom"
    />
  ))}
   <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-zinc-950/90"></div>

  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_25%,rgba(0,0,0,0.55)_100%)]"></div>
</div>


              
              <div className="relative z-10 max-w-5xl mx-auto px-5 md:px-6 text-center mt-24 md:mt-14">
                <div className="group inline-flex items-center gap-2 md:gap-3 px-4 py-2 md:px-6 md:py-3 rounded-full border border-amber-400/40 bg-white/5 backdrop-blur-md text-amber-300 text-xs md:text-base font-semibold tracking-widest uppercase mb-5 md:mb-8 transition-all duration-500 hover:border-amber-300 hover:bg-amber-500/10 hover:shadow-[0_0_30px_rgba(245,158,11,0.35)]">

  <div className="flex items-center justify-center w-5 h-5 md:w-8 md:h-8 rounded-full bg-amber-500/20">
    <Star
      size={12}
      className="fill-amber-400 text-amber-400 transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110 md:w-4 md:h-4"
    />
  </div>

  <span>
    {t('lbl_premium_grooming')}
  </span>

</div>
                <h2
  className="
    text-4xl
    sm:text-5xl
    md:text-7xl
    lg:text-7xl
    xl:text-8xl
    font-black
    leading-[0.95]
    md:leading-[0.9]
    tracking-[-0.03em]
    md:tracking-[-0.04em]
    mb-5
    md:mb-8
    drop-shadow-[0_10px_35px_rgba(0,0,0,0.55)]
    animate-fade-up
  "
>
  <span className="block text-white">
    {content.hero.title}
  </span>
</h2>

<p
  className="
    max-w-3xl
    mx-auto
    text-base
    sm:text-lg
    md:text-xl
    lg:text-2xl
    text-zinc-300
    leading-relaxed
    tracking-wide
    font-light
    mb-8
    md:mb-12
    opacity-95
    drop-shadow-[0_2px_10px_rgba(0,0,0,0.35)]
  "
>
  {td(content.hero.subtitle)}
</p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-5">

  {/* Book Appointment */}
  <button
    onClick={() => {
      setStep(1);
      setIsBookingModalOpen(true);
    }}
    className="group relative overflow-hidden w-full sm:w-auto bg-amber-500 text-zinc-950 px-5 py-3 md:px-8 md:py-4 rounded-full text-base md:text-lg font-bold transition-all duration-500 hover:scale-110 active:scale-95 hover:bg-amber-400 hover:shadow-[0_0_35px_rgba(245,158,11,0.45)] active:scale-95 flex items-center justify-center gap-2"
  >
    <span className="relative z-10 flex items-center gap-2">
      {td(content.hero.btnText)}
      <ChevronRight
        size={20}
        className="transition-transform duration-300 group-hover:translate-x-1"
      />
    </span>

    <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:translate-x-full transition-transform duration-1000"></span>
  </button>

  {/* View Services */}
  <button
  onClick={() => scrollTo('services')}
  className="group relative overflow-hidden w-full sm:w-auto border-2 border-white/20 bg-white/5 backdrop-blur-md text-white px-5 py-3 md:px-8 md:py-4 rounded-full text-base md:text-lg font-bold transition-all duration-500 hover:scale-110 active:scale-95 hover:border-amber-400 hover:bg-white/10 active:scale-95 flex items-center justify-center gap-2"
>
  <span className="relative z-10">
    {t('btn_view_services')}
  </span>

  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:translate-x-full transition-transform duration-1000"></span>
</button>

</div> {/* Close the buttons container */}

{/* Hero Stats — on mobile, each card fades up + scales in once via
    statsRevealed (IntersectionObserver) instead of animating instantly
    at page load; desktop/tablet keep the original AOS zoom-in untouched. */}
<div
  ref={statsRef}
  data-aos={isMobileViewport ? undefined : "fade-up"}
  data-aos-delay={isMobileViewport ? undefined : "400"}
  className="mt-8 md:mt-16 grid grid-cols-3 gap-2.5 sm:gap-5 max-w-4xl mx-auto"
>

  <div
  data-aos={isMobileViewport ? undefined : "zoom-in"}
  data-aos-delay={isMobileViewport ? undefined : "500"}
  className={`group rounded-xl md:rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-2.5 sm:p-4 md:p-6 text-center transition-all duration-500 hover:-translate-y-2 hover:border-amber-400 hover:bg-white/10 hover:shadow-[0_20px_50px_rgba(245,158,11,0.18)] ${isMobileViewport ? `ease-out ${statsRevealed ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-6 scale-95'}` : ''}`}
>
    <h3 className="text-xl sm:text-2xl md:text-4xl font-black text-amber-400 transition-transform duration-300 group-hover:scale-110">500+</h3>
    <p className="mt-1 md:mt-2 text-[11px] sm:text-sm md:text-base text-zinc-300 tracking-wide transition-colors duration-300 group-hover:text-white">
      Happy Clients
    </p>
  </div>

  <div
  data-aos={isMobileViewport ? undefined : "zoom-in"}
  data-aos-delay={isMobileViewport ? undefined : "650"}
  className={`group rounded-xl md:rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-2.5 sm:p-4 md:p-6 text-center transition-all duration-500 hover:-translate-y-2 hover:border-amber-400 hover:bg-white/10 hover:shadow-[0_20px_50px_rgba(245,158,11,0.18)] ${isMobileViewport ? `ease-out delay-150 ${statsRevealed ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-6 scale-95'}` : ''}`}
>
    <h3 className="text-xl sm:text-2xl md:text-4xl font-black text-amber-400 transition-transform duration-300 group-hover:scale-110">10+</h3>
    <p className="mt-1 md:mt-2 text-[11px] sm:text-sm md:text-base text-zinc-300 tracking-wide transition-colors duration-300 group-hover:text-white">
      Years Experience
    </p>
  </div>

  <div
  data-aos={isMobileViewport ? undefined : "zoom-in"}
  data-aos-delay={isMobileViewport ? undefined : "800"}
  className={`group rounded-xl md:rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-2.5 sm:p-4 md:p-6 text-center transition-all duration-500 hover:-translate-y-2 hover:border-amber-400 hover:bg-white/10 hover:shadow-[0_20px_50px_rgba(245,158,11,0.18)] ${isMobileViewport ? `ease-out delay-300 ${statsRevealed ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-6 scale-95'}` : ''}`}
>
    <h3 className="text-xl sm:text-2xl md:text-4xl font-black text-amber-400 flex justify-center items-center gap-1 md:gap-2 transition-transform duration-300 group-hover:scale-110">
      ★ 4.9
    </h3>
    <p className="mt-1 md:mt-2 text-[11px] sm:text-sm md:text-base text-zinc-300 tracking-wide transition-colors duration-300 group-hover:text-white">
      Customer Rating
    </p>
  </div>

</div>
 {/* Scroll Indicator */}
<div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex md:hidden lg:flex flex-col items-center animate-bounce">
  <span className="text-zinc-400 text-xs uppercase tracking-[0.3em] mb-3">
    Scroll
  </span>

  <div className="w-7 h-12 rounded-full border-2 border-amber-400/50 flex justify-center p-2">
    <div className="w-1.5 h-3 rounded-full bg-amber-400 animate-pulse"></div>
  </div>
</div>
</div>
</section>
  

            {/* Services Section */}
            <section
  id="services"
  data-aos="fade-up"
  className="relative overflow-hidden py-14 md:py-32 bg-zinc-950"
>
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
  <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-amber-500/5 blur-3xl" />
  <div className="absolute bottom-0 right-1/4 w-[28rem] h-[28rem] rounded-full bg-amber-500/5 blur-3xl" />
</div>
                <div className="text-center mb-6 md:mb-16">
                  <h3 className="text-amber-500 font-medium tracking-widest uppercase text-xs md:text-sm mb-2">{t('lbl_our_menu')}</h3>
                  <h2
  className="
    text-3xl
    sm:text-4xl
    md:text-5xl
    lg:text-6xl
    font-black
    tracking-tight
    text-white
    mb-3
    md:mb-5
  "
>
  {t('lbl_grooming_services')}
</h2>
                  <div className="w-16 md:w-24 h-1 bg-amber-500 mx-auto mt-4 md:mt-6 rounded-full" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
                 {content.services.map((service, index) => (

                    <div
  key={service.id}
  data-aos="zoom-in-up"
  data-aos-delay={index * 80}
  data-aos-duration="700"
  className="
group
relative
overflow-hidden
rounded-lg
md:rounded-2xl
border
border-white/10
bg-white/5
backdrop-blur-xl
p-3
md:p-6
min-h-0
md:min-h-[220px]
flex
flex-col
justify-between
transition-all
duration-500
hover:-translate-y-2
hover:border-amber-400
hover:shadow-[0_25px_60px_rgba(245,158,11,0.18)]
"
>
                      <div className="absolute left-0 top-0 h-1 w-0 bg-amber-400 transition-all duration-500 group-hover:w-full"></div>
                      <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-bl-full -z-10 group-hover:scale-110 transition-transform" />
                      <div> 
                        <div className="w-8 h-8 md:w-12 md:h-12 bg-zinc-800 rounded-lg md:rounded-xl flex items-center justify-center text-amber-500 mb-2 md:mb-6 group-hover:bg-amber-500 group-hover:text-zinc-950 transition-colors">
                          <Scissors size={16} className="md:w-5 md:h-5" />
                        </div>
                        <div className="flex justify-between items-start mb-1.5 md:mb-4 gap-2">
                          <h4 className="text-sm md:text-xl font-bold text-white group-hover:text-amber-500 transition-colors">{td(service.name)}</h4>
                          <span className="text-amber-500 font-bold whitespace-nowrap bg-amber-500/5 px-1.5 py-0.5 md:px-2.5 md:py-1 rounded-md text-[10px] md:text-sm border border-amber-500/10">{translateTimeAndPrice(service.price)}</span>
                        </div>
                        <p 
                        data-aos="fade-up"
                          data-aos-delay="150"
                        className="max-w-3xl mx-auto text-zinc-400 text-[11px] md:text-xl leading-4 md:leading-8"> </p> 
                        </div>
                      <div className="flex items-center justify-between pt-2.5 md:pt-4 border-t border-zinc-900">
                        <span className="text-[11px] md:text-xs text-zinc-500 flex items-center gap-1"><Clock size={12} /> {translateTimeAndPrice(service.duration)}</span>
                        <button onClick={() => { setFormData({...formData, serviceId: service.id}); setStep(2); setIsBookingModalOpen(true); }} className="text-xs md:text-sm font-medium text-white group-hover:text-amber-500 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(245,158,11,0.25)] flex items-center gap-1">
                          {t('lbl_book')} <ChevronRight size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
 </div>
            </section>

            {/* About Section */}
            <section id="about"
             className="py-14 md:py-32 bg-zinc-950 overflow-x-hidden">
              <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-aos="fade-right">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
                  
                  <div
  className="
group
relative
overflow-hidden
rounded-3xl
border
border-white/10
bg-white/5
backdrop-blur-xl
shadow-[0_25px_70px_rgba(0,0,0,0.35)]
"
>
                    <div className="aspect-square md:aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl relative z-10 bg-zinc-800">
                      <img 
                        src={content.about.customImage || "https://images.unsplash.com/photo-1539571696357-5a69c006ad4c?auto=format&fit=crop&w=1600&q=100&crop=faces"} 
                        alt="Kemekem Barbershop - Professional Ethiopian Grooming" 
                        className="
w-full
h-full
object-cover
rounded-3xl
transition-all
duration-700
group-hover:scale-105
group-hover:rotate-[1deg]
"
                        style={{ 
                          imageRendering: 'high-quality', 
                          transform: 'translateZ(0)', 
                          backfaceVisibility: 'hidden' 
                        }}
                        loading="lazy"
                        decoding="async"
                        onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1600&q=100"; }}
                      />
                      <div
  className="
absolute
inset-0
opacity-0
transition-opacity
duration-500
group-hover:opacity-100
bg-amber-500/10
"
/>
                      <div
  className="
absolute
inset-0
bg-gradient-to-t
from-black/60
via-transparent
to-transparent
pointer-events-none
"
/>
                    </div>
                    <div className="absolute inset-0 border-2 border-amber-500/20 rounded-3xl transform translate-x-4 translate-y-4 -z-10 hidden md:block"></div>
                  </div>
                  
                  <div
  className="
space-y-5
md:space-y-8
text-white
relative
z-10
pl-2
"
>
                    <h3 className="text-amber-500 font-medium tracking-widest uppercase text-xs md:text-sm mb-2">{td(content.about.smallHeading)}</h3>
                    <h2
  className="
text-3xl
sm:text-4xl
md:text-5xl
font-black
leading-tight
tracking-tight
text-white
"
>
                      {td(content.about.title)}
                    </h2>
                    <p
  className="
text-base
md:text-xl
leading-7
md:leading-9
text-zinc-300
"
>
                      {td(content.about.text)}
                    </p>
                    <p
  className="
text-zinc-400
leading-6
md:leading-8
text-sm
md:text-base
"
>
                      {t('lbl_about_footer_text')}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 pt-4 border-t border-zinc-800">
                      <div
  className="
group
flex
items-start
gap-2.5
md:gap-4
rounded-lg
md:rounded-2xl
border
border-white/10
bg-white/5
backdrop-blur-xl
p-3
md:p-5
transition-all
duration-500
hover:-translate-y-2
hover:border-amber-400
hover:shadow-[0_20px_50px_rgba(245,158,11,0.18)]
"
>
                        <div
  className="
flex
h-9
w-9
md:h-14
md:w-14
items-center
justify-center
rounded-lg
md:rounded-2xl
bg-amber-500/10
text-amber-400
transition-all
duration-300
group-hover:bg-amber-500
group-hover:text-black
"
><MapPin size={16} className="md:w-5 md:h-5" /></div>
                        <div>
                          <h5 className="font-bold text-white mb-1 text-xs md:text-sm">{t('lbl_location')}</h5>
                          <p className="text-[11px] md:text-xs text-zinc-400 leading-relaxed">{content.contact.address}</p>
                        </div>
                      </div>
                      <div
  className="
group
flex
items-start
gap-2.5
md:gap-4
rounded-lg
md:rounded-2xl
border
border-white/10
bg-white/5
backdrop-blur-xl
p-3
md:p-5
transition-all
duration-500
hover:-translate-y-2
hover:border-amber-400
hover:shadow-[0_20px_50px_rgba(245,158,11,0.18)]
"
>
                        <div
  className="
flex
h-9
w-9
md:h-14
md:w-14
items-center
justify-center
rounded-lg
md:rounded-2xl
bg-amber-500/10
text-amber-400
transition-all
duration-300
group-hover:bg-amber-500
group-hover:text-black
"
><Clock size={16} className="md:w-5 md:h-5" /></div>
                        <div>
                          <h5 className="font-bold text-white mb-1 text-xs md:text-sm">{t('lbl_hours')}</h5>
                          <p className="text-[11px] md:text-xs text-zinc-400 leading-relaxed">{content.contact.hours}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </section>

            {/* Gallery Section */}
            <section 
            id="gallery" 
            data-aos="zoom-in"
            className="py-14 md:py-32 bg-zinc-950">
              <div className="max-w-7xl mx-auto px-4 md:px-8">
                <div className="text-center mb-6 md:mb-16">
                  <h3 className="text-amber-500 font-medium tracking-widest uppercase text-xs md:text-sm mb-2">{t('lbl_recent_looks_title')}</h3>
                  <h2
  className="
text-3xl
sm:text-4xl
md:text-5xl
lg:text-6xl
font-black
tracking-tight
leading-tight
text-white
"
>{t('lbl_recent_looks_subtitle')}</h2>
                  <div className="w-16 md:w-24 h-1 bg-amber-500 mx-auto mt-4 md:mt-6 rounded-full" />
                </div>

                {content.recentLooks && content.recentLooks.length > 0 ? (
                  <div
  className="
grid
grid-cols-2
sm:grid-cols-2
md:grid-cols-3
lg:grid-cols-4
xl:grid-cols-5
gap-2
md:gap-8
mt-6
md:mt-16
"
>
                    {content.recentLooks.map((look, lookIndex) => (
                      <div
  key={look.id}
  onClick={isMobileViewport ? (e) => openLightbox(look, lookIndex, e) : undefined}
  onKeyDown={isMobileViewport ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLightbox(look, lookIndex, e); } } : undefined}
  role={isMobileViewport ? 'button' : undefined}
  tabIndex={isMobileViewport ? 0 : undefined}
  aria-label={isMobileViewport ? t('lbl_master_cut') : undefined}
  className="
group
relative
aspect-[3/4]
md:aspect-[4/5]
overflow-hidden
rounded-2xl
md:rounded-3xl
border
border-white/10
bg-white/5
backdrop-blur-xl
shadow-[0_25px_70px_rgba(0,0,0,0.35)]
transition-all
duration-500
cursor-pointer
md:cursor-auto
active:scale-[0.97]
md:active:scale-100
hover:-translate-y-3
hover:border-amber-400
hover:shadow-[0_35px_90px_rgba(245,158,11,0.20)]
"
>
                        <img 
                          src={look.img} 
                          alt={`Haircut style ${lookIndex + 1}`} 
                          loading="lazy"
                          decoding="async"
                          className="
w-full
h-full
object-cover
transition-all
duration-700
group-hover:scale-105
group-hover:rotate-[1deg]
"
                          onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800"; }}
                        />
                        <div
  className="
absolute
inset-0
flex
items-end
p-3
md:p-5
bg-gradient-to-t
from-black/90
via-black/30
to-transparent
opacity-100
md:opacity-0
transition-all
duration-500
md:group-hover:opacity-100
"
>
                          <div
  className="
translate-y-0
md:translate-y-8
transition-all
duration-500
md:group-hover:translate-y-0
"
>
                            <span
  className="
inline-flex
items-center
gap-2
rounded-full
border
border-amber-400/30
bg-amber-500/10
px-3
py-1
text-[11px]
font-black
uppercase
tracking-[0.25em]
text-amber-300
backdrop-blur-xl
"
>
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

            {/* Gallery Lightbox — mobile only (<768px). Tapping a thumbnail
                zooms it into this fullscreen view; the badge/caption/gradient
                fade out in sync with the zoom-in (and fade back in as it
                zooms out on close), so the fullscreen photo itself is always
                clean — desktop/tablet never render or trigger this (md:hidden
                below, plus openLightbox is a no-op above that breakpoint). */}
            {lightboxRendered && lightboxItem && (
              <div className="fixed inset-0 z-[100] md:hidden flex items-center justify-center p-4">
                <div
                  className={`absolute inset-0 bg-black/90 backdrop-blur-md transition-opacity duration-300 ${lightboxVisible ? 'opacity-100' : 'opacity-0'}`}
                  onClick={closeLightbox}
                  aria-hidden="true"
                />
                <div
                  role="dialog"
                  aria-modal="true"
                  aria-label={t('lbl_master_cut')}
                  onTouchStart={handleLightboxTouchStart}
                  onTouchMove={handleLightboxTouchMove}
                  onTouchEnd={handleLightboxTouchEnd}
                  style={lightboxDragY ? {
                    transform: `translateY(${lightboxDragY}px)`,
                    opacity: Math.max(1 - lightboxDragY / 400, 0.5),
                    transition: 'none',
                  } : undefined}
                  className={`relative w-full max-w-sm rounded-3xl overflow-hidden border border-white/10 bg-zinc-950 shadow-[0_30px_80px_rgba(0,0,0,0.65)] transition-all duration-300 ease-out ${lightboxVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}
                >
                  <button
                    onClick={closeLightbox}
                    aria-label="Close"
                    className="absolute right-3 top-3 z-10 rounded-full border border-white/10 bg-black/60 backdrop-blur-md p-2 text-white transition-all duration-300 hover:bg-black/80 active:scale-90"
                  >
                    <X size={20} />
                  </button>

                  <div className="relative aspect-[4/5] w-full">
                    <img
                      src={lightboxItem.look.img}
                      alt={`Haircut style ${lightboxItem.index + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800"; }}
                    />
                    {/* Same badge/caption/gradient as the thumbnail, but faded via
                        lightboxVisible so it's gone by the time the zoom finishes
                        (and fades back in as the dialog zooms out on close) —
                        the fullscreen view itself always ends up showing only
                        the image. */}
                    <div
                      className={`absolute inset-0 flex items-end p-5 bg-gradient-to-t from-black/90 via-black/30 to-transparent transition-opacity duration-300 ease-out ${lightboxVisible ? 'opacity-0' : 'opacity-100'}`}
                    >
                      <div>
                        <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-500/10 px-3 py-1 text-[11px] font-black uppercase tracking-[0.25em] text-amber-300 backdrop-blur-xl">
                          <Scissors size={10} /> {t('lbl_master_cut')}
                        </span>
                        <p className="text-sm text-zinc-200 mt-2">{t('lbl_get_this_look')}</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4">
                    <button
                      onClick={() => { closeLightbox(); setStep(1); setIsBookingModalOpen(true); }}
                      className="w-full px-6 py-3 bg-amber-500 hover:bg-amber-600 text-zinc-950 rounded-xl text-sm font-bold transition-all inline-flex items-center justify-center gap-2 active:scale-95"
                    >
                      {t('btn_book_now')} <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Team Section */}
            <section
                id="team"
                 data-aos="fade-up"
                    className="py-14 md:py-24 bg-zinc-900/10 border-t border-zinc-900"
            >
              <div className="max-w-7xl mx-auto px-4 md:px-8">
                <div className="text-center mb-6 md:mb-16">
                  <h3 className="text-amber-500 font-medium tracking-widest uppercase text-xs md:text-sm mb-2">{t('lbl_the_masters')}</h3>
                  <h2
         data-aos="fade-up"
         className="
         text-3xl
         sm:text-4xl
         md:text-5xl
         lg:text-6xl
         font-black
         tracking-tight
         text-white
         mb-3
         md:mb-5
         "
         >
          {t('lbl_meet_barbers')}
           </h2>
                  <div className="w-16 md:w-24 h-1 bg-amber-500 mx-auto mt-4 md:mt-6 rounded-full" />
                </div>
                
                <div
  className="
grid
grid-cols-1
sm:grid-cols-2
md:grid-cols-2
lg:grid-cols-3
gap-4
md:gap-10
mt-6
md:mt-16
"
>
                  {content.team.map((barber) => (
                    <div
                   key={barber.id}
                    className="group relative overflow-hidden rounded-xl md:rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl transition-all duration-500 md:hover:-translate-y-3 md:hover:border-amber-400 md:hover:shadow-[0_25px_70px_rgba(245,158,11,0.2)] md:hover:scale-[1.02]"
                      >
                     <>
  {/* Golden Glow */}
  <div
    className="
absolute
- inset-20
rounded-full
bg-amber-500/10
blur-3xl
opacity-0
transition-all
duration-700
md:group-hover:opacity-100
md:group-hover:scale-105 md:group-hover:brightness-110
pointer-events-none
"
  />

  {/* Light Reflection */}
  <div
    className="
absolute
inset-0
opacity-0
transition-opacity
duration-500
md:group-hover:opacity-100
bg-gradient-to-br
from-white/10
via-transparent
to-transparent
pointer-events-none
"
  />

  {/* Amber Overlay */}
  <div
    className="
absolute
inset-0
opacity-0
transition-opacity
duration-500
md:group-hover:opacity-100
bg-gradient-to-br
from-amber-400/5
via-transparent
to-transparent
pointer-events-none
"
  />
</>
                      <div className="aspect-square md:aspect-[3/4] overflow-hidden bg-zinc-950">
                        <img 
                          src={barber.img} 
                          alt={barber.name} 
                          loading="lazy"
                          decoding="async"
                          className="
w-full
h-full
object-cover
transition-all
duration-700
group-hover:scale-110
group-hover:rotate-[1deg]
brightness-95
group-hover:brightness-105
" 
                      
                         onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=800"; }}
                        />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                      
                      <div className="absolute bottom-0 left-0 w-full p-3 md:p-6 transform translate-y-0 md:translate-y-4 md:group-hover:translate-y-0 transition-transform duration-500">
                        <div className="flex justify-between items-end mb-1 md:mb-2">
                          <div>
                            <h4
className="
text-lg
md:text-3xl
font-black
tracking-tight
text-white
drop-shadow-lg
"
>{barber.name}</h4>
                            <p className="mt-0.5 md:mt-1 text-[11px] md:text-sm uppercase tracking-[0.2em] md:tracking-[0.25em] text-amber-400">{td(barber.role)}</p>
                          </div>
                          <div className="
flex
items-center
gap-1
md:gap-2
rounded-full
border
border-amber-400/30
bg-black/50
backdrop-blur-xl
px-2
py-0.5
md:px-4
md:py-2
text-[10px]
md:text-sm
font-bold
text-white
shadow-[0_0_25px_rgba(245,158,11,0.18)]
">
                            <Star size={10} className="fill-amber-500 text-amber-500 md:w-3.5 md:h-3.5" /> {barber.rating}
                          </div>
                        </div>
                        
                        <div className="opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 delay-100 mt-2 md:mt-4 space-y-2 md:space-y-3">
                          <p className="text-zinc-300 text-[11px] md:text-xs flex justify-between">
                            <span className="text-zinc-500">{t('lbl_experience')}:</span> {translateTimeAndPrice(barber.experience)}
                          </p>
                          <button 
                            onClick={() => { setFormData({...formData, barberId: barber.id}); setStep(1); setIsBookingModalOpen(true); }}
                            className="
group
relative
overflow-hidden
mt-2
md:mt-3
w-full
rounded-lg
md:rounded-2xl
bg-amber-500
py-2.5
md:py-3.5
text-xs
md:text-sm
font-bold
text-black
transition-all
duration-300
hover:-translate-y-1
hover:bg-amber-400
hover:shadow-[0_0_35px_rgba(245,158,11,0.45)]
">
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
            <section id="appointments" className="py-14 md:py-24 bg-zinc-900/20 border-t border-zinc-900">
              <div className="max-w-4xl mx-auto px-4">
                <div className="text-center mb-8 md:mb-12">
                  <h3 className="text-amber-500 font-medium tracking-widest uppercase text-xs md:text-sm mb-2">{t('lbl_customer_dashboard')}</h3>
                  <h2 className="text-2xl md:text-4xl font-bold text-white flex items-center justify-center gap-2 md:gap-3">
                    <Calendar className="text-amber-500 w-6 h-6 md:w-7 md:h-7" /> {t('lbl_scheduled_appointments')}
                  </h2>
                  <div className="w-16 md:w-24 h-1 bg-amber-500 mx-auto mt-3 md:mt-4 rounded-full" />
                </div>

                {/* Appointment Arrival Time Notice - Visible when user has appointments */}
                {activeClientBookings.length > 0 && activeClientBookings.some(b => b.status !== 'cancelled' && b.status !== 'completed') && (
                  <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4 md:p-6 mb-6 md:mb-8 max-w-2xl mx-auto">
                    <div className="flex items-start gap-3 md:gap-4">
                      <div className="text-amber-500 mt-1 flex-shrink-0">
                        <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 20 20">
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
                  <div className="p-8 md:p-12 text-center rounded-2xl border border-zinc-900 bg-zinc-900/40 max-w-xl mx-auto shadow-xl">
                    <p className="text-zinc-400 mb-5 md:mb-6 text-sm leading-relaxed">{t('lbl_no_appointments')}</p>
                    <button 
                      onClick={() => { setStep(1); setIsBookingModalOpen(true); }} 
                      className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-zinc-950 rounded-xl text-sm font-bold transition-all inline-flex items-center gap-2 hover:scale-105"
                    >
                      {t('btn_book_now')} <ChevronRight size={16} />
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3 md:space-y-4">
                    {activeClientBookings.map((b) => (
                      <div key={b.id} className="p-4 md:p-6 bg-zinc-900 rounded-xl border border-zinc-850 flex flex-col md:flex-row justify-between items-start md:items-center gap-3 md:gap-4 hover:border-amber-500/20 transition-all">
                        <div>
                          <div className="text-xs text-zinc-500 mb-1 flex items-center gap-2">
                            <span>{t('lbl_appointment_ref')}</span>
                            <span className="font-mono bg-zinc-950 px-2 py-0.5 rounded text-amber-500/80">{String(b.id).substring(0,1)}</span>
                          </div>
                          <h4 className="font-bold text-white text-base md:text-lg">{td(b.serviceName)}</h4>
                          <p className="text-sm text-zinc-400 mt-1">{t('lbl_grooming_specialist')} <strong className="text-zinc-300">{b.barberName}</strong></p>
                          <p className="text-xs text-amber-500 mt-2 flex items-center gap-1 bg-amber-500/5 border border-amber-500/10 px-2.5 py-1 rounded w-fit">
                            <Clock size={12} /> {b.date} {t('lbl_at')} {formatTime(b.time, timeFormatSetting)}
                          </p>
                        </div>
                        <div className="flex items-center gap-2.5 md:gap-3 w-full md:w-auto">
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
                                    barberId: content.team.find(member => member.name === b.barberName)?.id || 'any',
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
                                className="flex-1 md:flex-initial text-xs font-semibold bg-zinc-850 hover:bg-zinc-800 text-white px-3.5 py-2.5 rounded-lg border border-zinc-800 transition-colors"
                              >
                                {t('lbl_reschedule')}
                              </button>
                              <button 
                                onClick={() => handleCancelBooking(b.id)}
                                className="flex-1 md:flex-initial text-xs font-semibold bg-red-500/10 hover:bg-red-500/20 text-red-500 px-3.5 py-2.5 rounded-lg border border-red-500/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(245,158,11,0.25)]"
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

            {/* Products Section — placed right after the Appointments/Booking
                section: this satisfies the requested nav order
                (Team → Products → Reviews) exactly. Note: in this build,
                "Team" already renders before the Appointments/Booking
                section (not after, as a generic brief would assume), so an
                literal "after Booking, before Team" placement isn't
                possible without reordering existing sections — this
                placement was chosen instead because it matches the nav
                order precisely. */}
            <section
            id="products"
            data-aos="fade-up"
            className="py-14 md:py-32 bg-zinc-950">
              <div className="max-w-7xl mx-auto px-4 md:px-8">
                <div className="text-center mb-6 md:mb-16">
                  <h3 className="text-amber-500 font-medium tracking-widest uppercase text-xs md:text-sm mb-2">{t('lbl_products_eyebrow')}</h3>
                  <h2
  className="
text-3xl
sm:text-4xl
md:text-5xl
lg:text-6xl
font-black
tracking-tight
leading-tight
text-white
"
>{t('lbl_products_title')}</h2>
                  <div className="w-16 md:w-24 h-1 bg-amber-500 mx-auto mt-4 md:mt-6 rounded-full" />
                </div>

                {content.products && content.products.length > 0 ? (
                  <div
  className="
grid
grid-cols-2
sm:grid-cols-2
md:grid-cols-3
lg:grid-cols-4
xl:grid-cols-5
gap-3
md:gap-8
mt-6
md:mt-16
"
>
                    {sortedProducts.map((product) => (
                      <div
  key={product.id}
  onClick={(e) => openProductModal(product, e)}
  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openProductModal(product, e); } }}
  role="button"
  tabIndex={0}
  aria-label={`${product.name} — ${product.price}`}
  className="
group
relative
cursor-pointer
rounded-2xl
md:rounded-3xl
p-[2px]
bg-gradient-to-br
from-amber-200
via-yellow-500
to-amber-600
shadow-[0_20px_60px_rgba(0,0,0,0.35)]
transition-all
duration-500
hover:-translate-y-3
hover:shadow-[0_35px_90px_rgba(245,158,11,0.30)]
outline-none
focus-visible:ring-2
focus-visible:ring-amber-300
focus-visible:ring-offset-2
focus-visible:ring-offset-zinc-950
"
>
                        <div
  className="
relative
aspect-[3/4]
md:aspect-[4/5]
overflow-hidden
rounded-[14px]
md:rounded-[22px]
bg-zinc-950
"
>
                          <img
                            src={product.img}
                            alt={product.name}
                            loading="lazy"
                            decoding="async"
                            className="
w-full
h-full
object-cover
transition-all
duration-700
group-hover:scale-105
"
                            onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=800"; }}
                          />
                          <div
  className="
absolute
inset-0
flex
items-end
p-3
md:p-5
bg-gradient-to-t
from-black/90
via-black/30
to-transparent
opacity-100
md:opacity-0
transition-all
duration-500
md:group-hover:opacity-100
"
>
                            <div
  className="
translate-y-0
md:translate-y-8
transition-all
duration-500
md:group-hover:translate-y-0
"
>
                              <h4 className="text-white font-bold text-sm md:text-base leading-tight">{product.name}</h4>
                              <p className="text-amber-400 font-bold text-xs md:text-sm mt-0.5">{product.price}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center p-12 bg-zinc-900/20 rounded-2xl border border-zinc-900 max-w-xl mx-auto">
                    <ImageIcon className="text-zinc-700 mx-auto mb-4" size={32} />
                    <p className="text-zinc-400 text-sm">{t('lbl_products_empty')}</p>
                  </div>
                )}
              </div>
            </section>

            {/* Product Modal — opens on click on every breakpoint (desktop,
                tablet, mobile), unlike the mobile-only gallery lightbox.
                Same zoom/blur pattern as that lightbox, plus a click-to-call
                phone button. No buy/cart/checkout — products are ordered by
                calling the shop. */}
            {isProductModalRendered && productModalItem && (
              <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                <div
                  className={`absolute inset-0 bg-black/85 backdrop-blur-md transition-opacity duration-300 ${isProductModalVisible ? 'opacity-100' : 'opacity-0'}`}
                  onClick={closeProductModal}
                  aria-hidden="true"
                />
                <div
                  ref={productModalRef}
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="product-modal-title"
                  tabIndex={-1}
                  className={`relative w-full max-w-md max-h-[92vh] md:max-h-[90vh] rounded-3xl overflow-hidden border border-amber-500/20 bg-zinc-950 shadow-[0_30px_90px_rgba(0,0,0,0.65)] outline-none transition-all duration-300 ease-out flex flex-col ${isProductModalVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}
                >
                  <button
                    onClick={closeProductModal}
                    aria-label={t('lbl_cancel_btn')}
                    className="absolute right-3 top-3 z-10 rounded-full border border-white/10 bg-black/60 backdrop-blur-md p-2 text-white transition-all duration-300 hover:bg-black/80 active:scale-90"
                  >
                    <X size={20} />
                  </button>

                  <div className="flex-1 min-h-0 overflow-y-auto">
                    <div className="relative aspect-[4/5] w-full bg-zinc-900">
                      <img
                        src={productModalItem.img}
                        alt={productModalItem.name}
                        className="w-full h-full object-cover"
                        onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=1200"; }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" aria-hidden="true" />
                    </div>

                    <div className="p-6 pb-0">
                      <h3 id="product-modal-title" className="text-xl font-bold text-white">{productModalItem.name}</h3>
                      <p className="text-amber-400 font-bold text-lg mt-1">{productModalItem.price}</p>

                      {productModalItem.description && (
                        <p className="text-zinc-400 text-sm leading-relaxed mt-3">
                          {productModalItem.description}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex-shrink-0 px-6 pb-6">
                    <a
                      href={`tel:${(productModalItem.phone || content.contact.phone).replace(/\s+/g, '')}`}
                      className="mt-5 w-full inline-flex items-center justify-center gap-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 px-6 py-3.5 text-sm font-bold transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(245,158,11,0.35)] active:scale-95"
                    >
                      <Phone size={16} /> {t('lbl_call_to_order')}: {productModalItem.phone || content.contact.phone}
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* Reviews Section */}
            <section 
            id="reviews" 
            className="py-14 md:py-32 bg-zinc-950 overflow-x-hidden">
              <div className="max-w-7xl mx-auto px-4 md:px-8" data-aos="fade-left">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6 md:mb-16 gap-4 md:gap-6">
                  <div>
                    <h3 className="text-amber-500 font-medium tracking-widest uppercase text-xs md:text-sm mb-2">{t('lbl_testimonials')}</h3>
                    <h2
  className="
text-3xl
sm:text-4xl
md:text-5xl
lg:text-6xl
font-black
tracking-tight
leading-tight
text-white
"
>{t('lbl_client_reviews')}</h2>
                  </div>
                  <div 
                  className="flex items-center gap-3 md:gap-5 rounded-2xl md:rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl px-4 py-3 md:px-7 md:py-5 shadow-[0_15px_40px_rgba(0,0,0,0.35)]"
                   >
                   <div className="text-2xl md:text-4xl font-black text-white">4.9</div>
                    <div>
                      <div className="flex gap-1 mb-1">
                        {[1, 2, 3, 4, 5].map(i => <Star key={i} size={14} className="fill-amber-500 text-amber-500 md:w-4 md:h-4" />)}
                      </div>
                      <div className="text-xs text-zinc-400">{t('lbl_based_on')}</div>
                    </div>
                  </div>
                </div>

                <div
  className="
grid
grid-cols-1
md:grid-cols-2
xl:grid-cols-3
gap-3
md:gap-8
mt-6
md:mt-16
"
>
                  {content.reviews.map((review) => (
                    <div key={review.id} 
                    className="group relative flex h-full flex-col overflow-hidden rounded-xl md:rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-4 md:p-8 transition-all duration-500 hover:-translate-y-3 hover:border-amber-400 hover:shadow-[0_25px_70px_rgba(245,158,11,0.18)]"
                    >
                      <>
  <div
    className="
absolute
-inset-20
rounded-full
bg-amber-500/10
blur-3xl
opacity-0
transition-all
duration-700
group-hover:opacity-100
group-hover:scale-110
pointer-events-none
"
  />

  <div
    className="
absolute
inset-0
opacity-0
transition-opacity
duration-500
group-hover:opacity-100
bg-gradient-to-br
from-white/10
via-transparent
to-transparent
pointer-events-none
"
  />

  <div
    className="
absolute
inset-0
opacity-0
transition-opacity
duration-500
group-hover:opacity-100
bg-gradient-to-br
from-amber-400/5
via-transparent
to-transparent
pointer-events-none
"
  />
</>  
                    <MessageSquare className="absolute right-3 top-3 md:right-6 md:top-6 text-amber-400/20 transition-transform duration-500 group-hover:scale-110 w-6 h-6 md:w-10 md:h-10" />
                      <div className="flex gap-1 mb-2.5 md:mb-6 relative z-10">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={12} className={`md:w-4 md:h-4 ${i < review.rating ? "fill-amber-500 text-amber-500" : "text-zinc-800"}`} />
                        ))}
                      </div>
                      <p
  className="
relative
z-10
mb-4
md:mb-8
flex-grow
text-xs
md:text-lg
leading-5
md:leading-9
italic
text-zinc-300
"
>"{review.text}"</p>
                      <div className="flex items-center gap-2.5 md:gap-4 border-t border-zinc-900 pt-3 md:pt-6 mt-auto">
                        <div
  className="
flex
h-9
w-9
md:h-14
md:w-14
items-center
justify-center
rounded-full
border
border-amber-400/40
bg-amber-500/10
text-sm
md:text-lg
font-black
uppercase
text-amber-400
shadow-[0_0_30px_rgba(245,158,11,0.30)]
transition-all
duration-500
group-hover:scale-110
"
>
                          {review.name.charAt(0)}
                        </div>
                        <div>
                          <h5
  className="
text-sm
md:text-lg
font-black
tracking-tight
text-white
"
>{review.name}</h5>
                          <p className="text-[11px] md:text-xs text-zinc-500">{review.date}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </>
        ) : <React.Suspense fallback={
            <section className="pt-24 pb-8 md:pt-28 bg-zinc-950 min-h-screen flex items-center justify-center">
              <div className="text-zinc-500 text-sm">Loading admin panel…</div>
            </section>
          }>
            <AdminDashboardView
            activeClientBookings={activeClientBookings}
            adminBlockSlotModal={adminBlockSlotModal}
            adminTab={adminTab}
            availableSlots={availableSlots}
            blockSlotForm={blockSlotForm}
            blockedSlots={blockedSlots}
            bookingsList={bookingsList}
            content={content}
            dbStatus={dbStatus}
            exportBookingsCSV={exportBookingsCSV}
            formatTime={formatTime}
            handleAboutImageUpload={handleAboutImageUpload}
            handleBlockTimeSlot={handleBlockTimeSlot}
            handleChangePassword={handleChangePassword}
            handleDeleteBarber={handleDeleteBarber}
            handleDeleteLook={handleDeleteLook}
            handleDeleteProduct={handleDeleteProduct}
            handleDeleteService={handleDeleteService}
            handleOwnerLogout={handleOwnerLogout}
            handleReorderProduct={handleReorderProduct}
            handleSaveTimeFormat={handleSaveTimeFormat}
            handleUnblockTimeSlot={handleUnblockTimeSlot}
            handleUpdateBookingStatus={handleUpdateBookingStatus}
            isOwnerVerified={isOwnerVerified}
            passwordChange={passwordChange}
            passwordError={passwordError}
            passwordSuccess={passwordSuccess}
            previewTimeFormat={previewTimeFormat}
            saveGeneralSettings={saveGeneralSettings}
            saveStatus={saveStatus}
            scrollTo={scrollTo}
            setAdminBlockSlotModal={setAdminBlockSlotModal}
            setAdminTab={setAdminTab}
            setBlockSlotForm={setBlockSlotForm}
            setEditingBarber={setEditingBarber}
            setEditingLook={setEditingLook}
            setEditingProduct={setEditingProduct}
            setEditingService={setEditingService}
            setIsAdminView={setIsAdminView}
            setIsBookingModalOpen={setIsBookingModalOpen}
            setOwnerLoginModal={setOwnerLoginModal}
            setPasswordChange={setPasswordChange}
            setPasswordError={setPasswordError}
            setPasswordSuccess={setPasswordSuccess}
            setPreviewTimeFormat={setPreviewTimeFormat}
            setShowConfirmPassword={setShowConfirmPassword}
            setShowCurrentPassword={setShowCurrentPassword}
            setShowNewPassword={setShowNewPassword}
            setStep={setStep}
            showConfirmPassword={showConfirmPassword}
            showCurrentPassword={showCurrentPassword}
            showNewPassword={showNewPassword}
            sortedProducts={sortedProducts}
            t={t}
            td={td}
            timeFormatLoading={timeFormatLoading}
            timeFormatSaved={timeFormatSaved}
            timeFormatSetting={timeFormatSetting}
            uploadError={uploadError}
            user={user}
            />
          </React.Suspense>}

        {/* Booking Modal */}
        {isBookingModalRendered && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-4">
            <div
              className={`absolute inset-0 bg-black/70 backdrop-blur-xl transition-opacity duration-300 ${isBookingModalVisible ? 'opacity-100' : 'opacity-0'}`}
              onClick={() => !isSubmitting && setIsBookingModalOpen(false)}
            />
            <div
              ref={bookingModalRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="booking-modal-title"
              tabIndex={-1}
              className={`relative w-full max-w-xl max-h-[92vh] md:max-h-[90vh] overflow-hidden rounded-2xl md:rounded-3xl border border-white/10 bg-zinc-950/90 backdrop-blur-2xl shadow-[0_30px_80px_rgba(0,0,0,0.65)] flex flex-col outline-none transition-all duration-300 ${isBookingModalVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4'}`}
            >
              <div className="flex items-center justify-between border-b border-white/10 bg-white/5 px-5 py-4 md:px-8 md:py-6 backdrop-blur-xl">
                <h2 id="booking-modal-title" className="text-lg md:text-2xl font-bold text-white">{t('lbl_book_appointment_header')}</h2>
                <button onClick={() => !isSubmitting && setIsBookingModalOpen(false)} aria-label={t('lbl_cancel_btn')} className="rounded-full border border-white/10 bg-white/5 p-1.5 md:p-2 text-zinc-400 transition-all duration-300 hover:rotate-90 hover:border-amber-400 hover:bg-amber-500/10 hover:text-amber-400">
                  <X size={20} className="md:w-6 md:h-6" />
                </button>
              </div>

              {/* Step progress — mobile only; desktop/tablet layout is unchanged */}
              {step >= 1 && step <= 4 && (
                <div className="md:hidden flex items-center gap-1.5 px-5 pt-3">
                  {[1, 2, 3, 4].map(s => (
                    <div
                      key={s}
                      className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                        s <= step ? 'bg-amber-400' : 'bg-white/10'
                      }`}
                    />
                  ))}
                </div>
              )}
              
              <div className="overflow-y-auto px-5 py-4 md:px-8 md:py-7">
                {step === 1 && (
                  <div className="space-y-3 md:space-y-4">
                    <div className="mb-3 md:mb-4">
                      <h3 className="text-lg md:text-xl font-bold text-white mb-1">{t('lbl_select_service')}</h3>
                      <p className="text-zinc-400 text-sm">{t('lbl_choose_service_desc')}</p>
                    </div>
                    <div className="space-y-2.5 md:space-y-3">
                     {content.services.map(service => (
  <button
    key={service.id}
    onClick={() => {
      setFormData({ ...formData, serviceId: service.id });
      setStep(2);
    }}
    className="group relative overflow-hidden flex w-full items-center justify-between rounded-xl md:rounded-2xl border border-white/10 bg-white/5 p-3.5 md:p-5 text-left backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-amber-400 hover:bg-white/10 hover:shadow-[0_25px_60px_rgba(245,158,11,0.20)]"
  >
    <div className="absolute left-0 top-0 h-1 w-0 bg-amber-400 transition-all duration-500 group-hover:w-full"></div>
    <div className="flex items-center gap-3 md:gap-4">
      <div className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-xl md:rounded-2xl bg-amber-500/10 text-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.15)] transition-all duration-500 group-hover:scale-110 group-hover:bg-amber-500 group-hover:text-black group-hover:shadow-[0_0_35px_rgba(245,158,11,0.45)]">
        <Scissors size={18} className="md:w-[22px] md:h-[22px]" />
      </div>

      <div>
        <h4 className="text-sm md:text-base font-bold text-white transition-colors duration-300 group-hover:text-amber-400">
          {td(service.name)}
        </h4>

        <p className="mt-0.5 md:mt-1 text-xs md:text-sm text-zinc-400">
          {translateTimeAndPrice(service.duration)} • {translateTimeAndPrice(service.price)}
        </p>
      </div>
    </div>
    

   <ChevronRight
      size={18}
      className="text-zinc-500 transition-transform duration-300 group-hover:translate-x-2 group-hover:text-amber-400 md:w-5 md:h-5"
    />
    </button>
))}
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div>
                    <div className="mb-4 md:mb-6">
                      <h3 className="text-lg md:text-xl font-bold text-white mb-1">{t('lbl_select_barber')}</h3>
                      <p className="text-zinc-400 text-sm">{t('lbl_choose_barber_desc')}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-3 md:gap-4">
                      
 <button
  onClick={() => {
    setFormData({...formData, barberId: 'any'});
    setStep(3);
  }}
                        className="
group
relative
overflow-hidden
rounded-2xl
md:rounded-3xl
border
border-white/10
bg-white/5
backdrop-blur-xl
p-4
md:p-5
text-center
transition-all
duration-500
hover:-translate-y-3
hover:border-amber-400
hover:bg-white/10
hover:shadow-[0_25px_60px_rgba(245,158,11,0.18)]
"
                      >

                        <div className="w-11 h-11 md:w-14 md:h-14 mx-auto rounded-full bg-zinc-850 flex items-center justify-center text-zinc-400 group-hover:text-amber-500 mb-2.5 md:mb-3 transition-colors">
                          <User size={22} className="md:w-7 md:h-7" />
                        </div>
                        <h4 className="font-bold text-white text-sm mb-1">{t('lbl_any_barber')}</h4>
                        <p className="text-zinc-500 text-xs">{t('lbl_first_available')}</p>
                      </button>
                      {content.team.map(barber => (
                        <button
                          key={barber.id}
                          onClick={() => { setFormData({...formData, barberId: barber.id}); setStep(3); }}
                          className="
group
relative
overflow-hidden
rounded-2xl
md:rounded-3xl
border
border-white/10
bg-white/5
backdrop-blur-xl
p-4
md:p-5
text-center
transition-all
duration-500
hover:-translate-y-3
hover:border-amber-400
hover:bg-white/10
hover:shadow-[0_25px_60px_rgba(245,158,11,0.18)]
"
                        >
                          <img src={barber.img} alt={barber.name} loading="lazy" decoding="async" className="
    w-16
    h-16
    md:w-20
    md:h-20
    mx-auto
    rounded-full
    object-cover
    mb-2.5
    md:mb-4
    border-2
    border-amber-500/40
    transition-all
    duration-500
    group-hover:scale-110
    group-hover:border-amber-400
    group-hover:shadow-[0_0_30px_rgba(245,158,11,0.35)]
  " onError={(e) => { e.target.src="https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=100"; }} />
                          <h4 className="text-sm md:text-lg font-bold text-white mb-1 md:mb-2 transition-colors duration-300 group-hover:text-amber-400">{barber.name}</h4>
                          <div className="flex items-center justify-center gap-1.5 md:gap-2">
  <Star
    size={12}
    className="fill-amber-400 text-amber-400 md:w-3.5 md:h-3.5"
  />
  <span className="text-xs md:text-sm font-semibold text-amber-400">
    {barber.rating}
  </span>
</div>
                        </button>
                      ))}
                    </div>
                    <div className="pt-3 md:pt-4 border-t border-zinc-900 mt-4 md:mt-6">
  <button
    onClick={() => setStep(1)}
    className="w-full py-2.5 px-4 rounded-xl border border-zinc-800 text-white font-medium hover:bg-zinc-900 transition-colors text-sm"
  >
    {t('lbl_back')}
  </button>
</div>
                  </div>
                )}

                {step === 3 && (
                  <div>
                    <div className="mb-4 md:mb-6">
                      <h3
  className="
    text-2xl
    md:text-4xl
    font-black
    text-white
    mb-2
    md:mb-3
    tracking-tight
  "
>{t('lbl_select_date_time')}</h3>
                      <p className="text-zinc-400 text-sm md:text-base leading-6 md:leading-7">{t('lbl_choose_time_desc')}</p>
                    </div>
                    
                    <div
                      data-aos="fade-up"
                      data-aos-delay="100"
                      className="mb-4 md:mb-6"
                    >
                      <label htmlFor="booking-date" className="block text-xs md:text-sm font-semibold uppercase tracking-[0.15em] md:tracking-[0.18em] text-zinc-300 mb-2 md:mb-3">{t('lbl_reservation_date')}</label>
                      <input 
  id="booking-date"
  type="date" 
  className="
    w-full
    rounded-2xl
    md:rounded-3xl
    border
    border-white/10
    bg-white/5
    backdrop-blur-xl
    px-4
    py-3
    md:px-5
    md:py-4
    text-base
    md:text-lg
    text-white
    transition-all
    duration-500
    outline-none
    hover:border-white/20
    focus:border-amber-400
    focus:bg-white/10
    focus:shadow-[0_0_35px_rgba(245,158,11,0.18)]
  "
  value={formData.date}
  onChange={(e) => setFormData({...formData, date: e.target.value})}
  min={new Date().toISOString().split('T')[0]}
  onKeyDown={(e) => e.preventDefault()}
  onPaste={(e) => e.preventDefault()}
  onDrop={(e) => e.preventDefault()}
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
                        ⚠ {shopHoursForSelectedDate === null ? t('lbl_shop_closed_day') : t('lbl_no_availability')}
                      </div>
                    )}

                    {!isLoadingAvailability && selectedBarberAvailability.length > 0 && (
                      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2 md:gap-4 mb-5 md:mb-8">
                        {workingHourSlots.map(slot => {
                          const isBooked = !selectedBarberAvailability.includes(slot);
                          const isSelected = formData.time === slot;
                          
                          return (
                            <button
                              key={slot}
                              onClick={() => !isBooked && setFormData({...formData, time: slot})}
                              disabled={isBooked}
                              title={isBooked ? t('lbl_slot_unavailable') : formatTime(slot, timeFormatSetting)}
                              className={`
group
relative
overflow-hidden
rounded-xl
md:rounded-2xl
border
text-sm
font-bold
py-2.5
md:py-4
px-2
md:px-3
transition-all
duration-500
${
  isBooked
    ? "border-red-500/20 bg-red-500/10 text-red-400 opacity-40 cursor-not-allowed"
    : isSelected
      ? "border-amber-400 bg-amber-500/20 text-amber-300 shadow-[0_0_35px_rgba(245,158,11,0.35)] scale-105"
      : "border-white/10 bg-white/5 text-zinc-300 hover:-translate-y-2 hover:border-amber-400 hover:bg-white/10 hover:text-white hover:shadow-[0_20px_45px_rgba(245,158,11,0.18)]"
}
`}
                            >
                              <div className="text-xs md:text-base font-bold tracking-wide">
                               {formatTime(slot, timeFormatSetting)}
                              </div>
                              {isBooked && <div className="mt-0.5 md:mt-1 text-[9px] md:text-[11px] uppercase tracking-wider text-red-400">
                               {t('lbl_slot_booked')}
                              </div>}
                            </button>
                          );
                        })}
                      </div>
                    )}

                    {formErrors.time && (
                      <div role="alert" className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm">
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
                        className="flex-1 py-2.5 px-4 bg-amber-500 hover:bg-amber-600 text-zinc-950 font-bold rounded-xl transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {t('lbl_continue')}
                      </button>
                    </div>
                  </div>
                )}

                {step === 4 && (
                  <div>
                    <div className="mb-3 md:mb-4">
                      <h3 className="text-lg md:text-xl font-bold text-white mb-1">{t('lbl_your_details')}</h3>
                      <p className="text-zinc-400 text-sm mt-1">{t('lbl_contact_info_desc')}</p>
                    </div>
                    
                    <div className="space-y-3 md:space-y-4 mb-4 md:mb-6">
                      <div>
                        <label htmlFor="booking-name" className="mb-1.5 md:mb-2 block text-xs font-bold uppercase tracking-[0.18em] md:tracking-[0.22em] text-amber-300">{t('lbl_full_name')}</label>
                        <input 
                          id="booking-name"
                          type="text" 
                          placeholder={t('lbl_ex_name')}
                          autoComplete="name"
                          required
                          className={`w-full rounded-xl md:rounded-2xl border bg-white/5 backdrop-blur-xl px-4 py-3 md:px-5 md:py-4 text-base text-white placeholder:text-zinc-500 outline-none transition-all duration-300 focus:border-amber-400 focus:bg-white/10 focus:shadow-[0_0_25px_rgba(245,158,11,0.18)] ${
                        formErrors.name
                         ? "border-red-500"
                         : "border-white/10"
                      }`}
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="booking-phone" className="mb-1.5 md:mb-2 block text-xs font-bold uppercase tracking-[0.18em] md:tracking-[0.22em] text-amber-300">{t('lbl_phone_number')}</label>
                        <input 
                          id="booking-phone"
                          type="tel" 
                          placeholder={t('lbl_ex_phone')}
                          autoComplete="tel"
                          required
                          className={`w-full rounded-xl md:rounded-2xl border bg-white/5 backdrop-blur-xl px-4 py-3 md:px-5 md:py-4 text-base text-white placeholder:text-zinc-500 outline-none transition-all duration-300 focus:border-amber-400 focus:bg-white/10 focus:shadow-[0_0_25px_rgba(245,158,11,0.18)] ${
                          formErrors.phone
                            ? "border-red-500"
                            : "border-white/10"
                        }`}
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        />
                      </div>
                      
                     <div>
  <label htmlFor="booking-email" className="mb-1.5 md:mb-2 block text-xs font-bold uppercase tracking-[0.18em] md:tracking-[0.22em] text-amber-300">
    {t('lbl_email_address')}
  </label>

  <input
    id="booking-email"
    type="email"
    placeholder={t('lbl_ex_email')}
    autoComplete="email"
    required
    className={`w-full rounded-xl md:rounded-2xl border bg-white/5 backdrop-blur-xl px-4 py-3 md:px-5 md:py-4 text-base text-white placeholder:text-zinc-500 outline-none transition-all duration-300 focus:border-amber-400 focus:bg-white/10 focus:shadow-[0_0_25px_rgba(245,158,11,0.18)] ${
      formErrors.email
        ? "border-red-500"
        : "border-white/10"
    }`}
    value={formData.email}
    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
  />

  <p className="mt-2 flex items-center gap-2 text-xs text-amber-400/90">
    <Mail size={13} />
    {t('lbl_email_required_desc')}
  </p>
</div>
                    </div>
                    
                    <div className="flex gap-3 pt-4 border-t border-zinc-900">
                      <button onClick={() => setStep(3)} className="flex-1 py-2.5 px-4 rounded-xl border border-zinc-800 text-white font-medium hover:bg-zinc-900 transition-colors text-sm">{t('lbl_back')}</button>
                      <button 
                        onClick={handleBookingSubmit}
                        disabled={isSubmitting || !formData.name || !formData.phone || !formData.email || !formData.email.includes('@')}
                        className="flex-1 py-2.5 px-4 bg-amber-500 hover:bg-amber-600 text-zinc-950 font-bold rounded-xl transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1"
                      >
                        {isSubmitting ? (
  <>
    <div className="w-4 h-4 border-2 border-zinc-950/30 border-t-zinc-950 rounded-full animate-spin" />
    {t('lbl_confirming')}
  </>
) : (
  t('lbl_confirm')
)}
                      </button>
                    </div>
                  </div>
                )}

                {step === 5 && (
                  <div className="text-center py-5 md:py-12">

                    <div
  className="
    mx-auto
    max-w-xl
    rounded-2xl
    md:rounded-3xl
    border
    border-white/10
    bg-white/5
    backdrop-blur-2xl
    p-5
    md:p-10
    shadow-[0_25px_80px_rgba(0,0,0,0.45)]
  "
>
                    {/* Calculate service and barber for display */}
                    {(() => {
                      const selectedService = content.services.find(s => s.id === formData.serviceId);
                      const barberName = formData.barberId === 'any' ? t('lbl_any_available_barber') : content.team.find(b => b.id === formData.barberId)?.name;
                      return (
                        <>
                          {/* Success Checkmark - Larger and more prominent */}
                          <div
  className="
    mx-auto
    mb-5
    md:mb-8
    flex
    h-14
    w-14
    md:h-20
    md:w-20
    items-center
    justify-center
    rounded-full
    border-2
    border-green-400/40
    bg-green-500/10
    shadow-[0_0_40px_rgba(34,197,94,0.25)]
    animate-pulse
  "
>
  <CheckCircle
    size={28}
    className="text-green-400 md:w-11 md:h-11"
  />
</div>
                          
                          {/* Success Title - Larger on mobile */}
                          <div>
                            <h3 className="text-2xl md:text-4xl font-black text-white mb-2 md:mb-3">{t('lbl_success')}</h3>
                            <p
  className="
    max-w-md
    mx-auto
    text-zinc-300
    text-sm
    md:text-lg
    leading-6
    md:leading-8
    px-1
    md:px-4
  "
>
                              {t('lbl_success_message')
                                .replace('{0}', formData.name)
                                .replace('{1}', barberName)
                                .replace('{2}', formData.date)
                                .replace('{3}', formatTime(formData.time, timeFormatSetting))}
                            </p>
                          </div>
                          <div className="flex items-center justify-center gap-2 md:gap-3 my-5 md:my-8">
  <div className="h-px w-12 md:w-20 bg-gradient-to-r from-transparent to-amber-400"></div>

  <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-amber-400"></div>

  <div className="h-px w-12 md:w-20 bg-gradient-to-l from-transparent to-amber-400"></div>
</div>

                          {/* Important Arrival Time Notice - Enhanced for visibility */}
                          <div className="bg-amber-500/15 border-2 border-amber-500/40 rounded-xl p-3.5 md:p-5 max-w-sm mx-auto text-left shadow-lg shadow-amber-500/10">
                            <div className="flex items-start gap-2.5 md:gap-3">
                              <div className="text-amber-500 mt-0.5 flex-shrink-0">
                                <svg className="w-4 h-4 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                              </div>
                              <div className="flex-1">
                                <h4 className="text-amber-500 font-bold text-xs md:text-base mb-1.5 md:mb-2">{t('lbl_confirmation_notice_title')}</h4>
                                <p className="text-amber-100/95 text-xs md:text-sm leading-relaxed font-medium">
                                  {t('lbl_confirmation_notice')}
                                </p>
                                {/* Additional helpful info */}
                                <div className="mt-2.5 md:mt-3 pt-2.5 md:pt-3 border-t border-amber-500/20 text-amber-200/80 text-[11px] md:text-xs">
                                  <p>✓ A confirmation email has been sent to <span className="font-semibold">{formData.email}</span></p>
                                  {formData.phone && <p>✓ SMS reminder sent to <span className="font-semibold">{formData.phone}</span></p>}
                                </div>
                              </div>
                            </div>
                          </div>

                          <div
  className="
    mt-5
    md:mt-8
    rounded-2xl
    md:rounded-3xl
    border
    border-white/10
    bg-black/20
    backdrop-blur-xl
    p-4
    md:p-6
    text-left
  "
>
  <h4 className="text-white font-bold text-base md:text-lg mb-3.5 md:mb-5">
    Appointment Details
  </h4>

  <div className="space-y-3 md:space-y-4 text-sm md:text-base">

    <div className="flex justify-between items-center border-b border-white/5 pb-2.5 md:pb-3">
      <span className="text-zinc-500">
        Service
      </span>

      <span className="text-white font-semibold">
        {selectedService?.name}
      </span>
    </div>

    <div className="flex justify-between items-center border-b border-white/5 pb-2.5 md:pb-3">
      <span className="text-zinc-500">
        Barber
      </span>

      <span className="text-white font-semibold">
        {barberName}
      </span>
    </div>

    <div className="flex justify-between items-center border-b border-white/5 pb-2.5 md:pb-3">
      <span className="text-zinc-500">
        Date
      </span>

      <span className="text-white font-semibold">
        {formData.date}
      </span>
    </div>

    <div className="flex justify-between items-center">
      <span className="text-zinc-500">
        Time
      </span>

      <span className="text-amber-400 font-bold">
        {formatTime(formData.time, timeFormatSetting)}
      </span>
    </div>

  </div>
</div>

                          {/* Action Buttons */}
                          <div className="space-y-2.5 md:space-y-3 pt-2">
                            <button 
                              onClick={() => { setIsBookingModalOpen(false); setStep(1); setFormData({ serviceId: '', barberId: '', date: '', time: '', name: '', phone: '', email: '' }); }}
                              className="
group
relative
overflow-hidden
w-full
rounded-xl
md:rounded-2xl
bg-amber-500
py-3.5
md:py-4
text-sm
md:text-base
font-bold
text-black
transition-all
duration-300
hover:scale-[1.02]
hover:bg-amber-400
hover:shadow-[0_0_35px_rgba(245,158,11,0.35)]
">
                              {t('lbl_return_home')}
                              <span className="relative z-10">
  {t('lbl_return_home')}
</span>

<span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:translate-x-full transition-transform duration-1000"></span>
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
              </div>
                )}
            </div>
          </div>
          </div>
        )}

        {/* Edit Service Modal */}
        {editingService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div role="dialog" aria-modal="true" aria-labelledby="edit-service-title" className="bg-zinc-900 border border-zinc-850 rounded-2xl w-full max-w-md shadow-2xl flex flex-col max-h-[90vh] relative overflow-hidden">
              <div className="p-6 border-b border-zinc-850 bg-zinc-900/50 flex justify-between items-center">
                <h3 id="edit-service-title" className="text-lg font-bold text-white">{editingService.id ? t('lbl_edit_service') : t('lbl_add_new_service')}</h3>
                <button onClick={() => setEditingService(null)} aria-label={t('lbl_cancel_btn')} className="text-zinc-500 hover:text-white hover:bg-zinc-800 p-1.5 rounded-lg transition-colors">
                  <X size={20} />
                </button>
              </div>
              
              <div className="overflow-y-auto flex-1 p-6 space-y-4">
                <div>
                  <label htmlFor="edit-service-name" className="block text-xs text-zinc-400 mb-1 font-medium uppercase">{t('lbl_service_name')}</label>
                  <input 
                    id="edit-service-name"
                    type="text" 
                    className="w-full p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white outline-none focus:border-amber-500 transition-colors"
                    value={editingService.name}
                    onChange={(e) => setEditingService({ ...editingService, name: e.target.value })}
                    placeholder="e.g., Premium Haircut"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="edit-service-price" className="block text-xs text-zinc-400 mb-1 font-medium uppercase">{t('lbl_price_text')}</label>
                    <input 
                      id="edit-service-price"
                      type="text" 
                      className="w-full p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white outline-none focus:border-amber-500 transition-colors"
                      value={editingService.price}
                      onChange={(e) => setEditingService({ ...editingService, price: e.target.value })}
                      placeholder="e.g., 800 ETB"
                    />
                  </div>
                  <div>
                    <label htmlFor="edit-service-duration" className="block text-xs text-zinc-400 mb-1 font-medium uppercase">{t('lbl_duration_text')}</label>
                    <input 
                      id="edit-service-duration"
                      type="text" 
                      className="w-full p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white outline-none focus:border-amber-500 transition-colors"
                      value={editingService.duration}
                      onChange={(e) => setEditingService({ ...editingService, duration: e.target.value })}
                      placeholder="e.g., 45 min"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="edit-service-icon" className="block text-xs text-zinc-400 mb-1 font-medium uppercase">{t('lbl_icon_style')}</label>
                  <select 
                    id="edit-service-icon"
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
                  <label htmlFor="edit-service-desc" className="block text-xs text-zinc-400 mb-1 font-medium uppercase">{t('lbl_description')}</label>
                  <textarea 
                    id="edit-service-desc"
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
            <div role="dialog" aria-modal="true" aria-labelledby="edit-barber-title" className="bg-zinc-900 border border-zinc-850 rounded-2xl w-full max-w-md shadow-2xl flex flex-col max-h-[90vh] relative overflow-hidden">
              <div className="p-6 border-b border-zinc-850 bg-zinc-900/50 flex justify-between items-center">
                <h3 id="edit-barber-title" className="text-lg font-bold text-white">{editingBarber.id ? t('lbl_edit_barber') : t('lbl_add_new_barber')}</h3>
                <button onClick={() => setEditingBarber(null)} aria-label={t('lbl_cancel_btn')} className="text-zinc-500 hover:text-white hover:bg-zinc-800 p-1.5 rounded-lg transition-colors">
                  <X size={20} />
                </button>
              </div>
              
              <div className="overflow-y-auto flex-1 p-6 space-y-4">
                <div>
                  <label htmlFor="edit-barber-name" className="block text-xs text-zinc-400 mb-1 font-medium uppercase">{t('lbl_barber_full_name')}</label>
                  <input 
                    id="edit-barber-name"
                    type="text" 
                    className="w-full p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white outline-none focus:border-amber-500 transition-colors"
                    value={editingBarber.name}
                    onChange={(e) => setEditingBarber({ ...editingBarber, name: e.target.value })}
                    placeholder="e.g., Dawit Mekonnen"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="edit-barber-role" className="block text-xs text-zinc-400 mb-1 font-medium uppercase">{t('lbl_specialty_title')}</label>
                    <input 
                      id="edit-barber-role"
                      type="text" 
                      className="w-full p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white outline-none focus:border-amber-500 transition-colors"
                      value={editingBarber.role}
                      onChange={(e) => setEditingBarber({ ...editingBarber, role: e.target.value })}
                      placeholder="e.g., Master Barber"
                    />
                  </div>
                  <div>
                    <label htmlFor="edit-barber-experience" className="block text-xs text-zinc-400 mb-1 font-medium uppercase">{t('lbl_experience_years')}</label>
                    <input 
                      id="edit-barber-experience"
                      type="text" 
                      className="w-full p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white outline-none focus:border-amber-500 transition-colors"
                      value={editingBarber.experience}
                      onChange={(e) => setEditingBarber({ ...editingBarber, experience: e.target.value })}
                      placeholder="e.g., 12 Years"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="edit-barber-email" className="block text-xs text-zinc-400 mb-1 font-medium uppercase">{t('lbl_notification_email')}</label>
                  <input 
                    id="edit-barber-email"
                    type="email" 
                    className="w-full p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white outline-none focus:border-amber-500 transition-colors"
                    value={editingBarber.email}
                    onChange={(e) => setEditingBarber({ ...editingBarber, email: e.target.value })}
                    placeholder="e.g., dawit@kemekem.com"
                  />
                </div>

                <div>
                  <label htmlFor="edit-barber-img" className="block text-xs text-zinc-400 mb-1 font-medium uppercase">{t('lbl_profile_image_url')}</label>
                  <textarea
                    id="edit-barber-img"
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
            <div role="dialog" aria-modal="true" aria-labelledby="edit-look-title" className="bg-zinc-900 border border-zinc-850 rounded-2xl w-full max-w-2xl shadow-2xl flex flex-col max-h-[90vh] relative overflow-hidden animate-fade-in">
              <div className="p-6 border-b border-zinc-850 bg-zinc-900/50 flex justify-between items-center">
                <h3 id="edit-look-title" className="text-lg font-bold text-white">{editingLook.id ? t('lbl_edit_look') : t('lbl_add_new_look')}</h3>
                <button onClick={() => { setEditingLook(null); setPreviewImage(null); setUploadError(''); }} aria-label={t('lbl_cancel_btn')} className="text-zinc-500 hover:text-white hover:bg-zinc-800 p-1.5 rounded-lg transition-colors">
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
                  <label htmlFor="edit-look-url" className="block text-xs text-zinc-400 mb-2 font-medium uppercase">{t('lbl_or_paste_url')}</label>
                  <textarea
                    id="edit-look-url"
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

        {editingProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div role="dialog" aria-modal="true" aria-labelledby="edit-product-title" className="bg-zinc-900 border border-zinc-850 rounded-2xl w-full max-w-2xl shadow-2xl flex flex-col max-h-[90vh] relative overflow-hidden animate-fade-in">
              <div className="p-6 border-b border-zinc-850 bg-zinc-900/50 flex justify-between items-center">
                <h3 id="edit-product-title" className="text-lg font-bold text-white">{editingProduct.id ? t('lbl_edit_product') : t('lbl_add_new_product')}</h3>
                <button onClick={() => { setEditingProduct(null); setPreviewProductImage(null); setUploadError(''); }} aria-label={t('lbl_cancel_btn')} className="text-zinc-500 hover:text-white hover:bg-zinc-800 p-1.5 rounded-lg transition-colors">
                  <X size={20} />
                </button>
              </div>

              <div className="overflow-y-auto flex-1 p-6 space-y-6">
                <div>
                  <label className="block text-xs text-zinc-400 mb-3 font-medium uppercase">{t('lbl_upload_product_photo')}</label>
                  <div className="h-64 bg-zinc-950 rounded-xl border-2 border-dashed border-zinc-800 overflow-hidden flex items-center justify-center relative group hover:border-amber-500/50 transition-colors">
                    {previewProductImage || editingProduct.img ? (
                      <>
                        <img src={previewProductImage || editingProduct.img} alt="Preview" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/40 transition-colors flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                          <button
                            type="button"
                            onClick={() => document.getElementById('product-upload').click()}
                            className="bg-amber-500 hover:bg-amber-600 text-zinc-950 px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors"
                          >
                            <Edit3 size={14} /> {t('lbl_replace_image')}
                          </button>
                        </div>
                      </>
                    ) : (
                      <div className="text-center">
                        <ImageIcon size={32} className="text-zinc-700 mx-auto mb-2" />
                        <p className="text-zinc-500 text-sm mb-3">{t('lbl_upload_product_photo')}</p>
                        <label htmlFor="product-upload" className="inline-flex bg-amber-500 hover:bg-amber-600 text-zinc-950 px-4 py-2 rounded-lg text-xs font-bold cursor-pointer transition-colors items-center gap-1.5">
                          <Plus size={14} /> {t('lbl_choose_image')}
                        </label>
                      </div>
                    )}
                    <input
                      id="product-upload"
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, setPreviewProductImage)}
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
                  <label htmlFor="edit-product-url" className="block text-xs text-zinc-400 mb-2 font-medium uppercase">{t('lbl_or_paste_url')}</label>
                  <textarea
                    id="edit-product-url"
                    rows="2"
                    className="w-full p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white outline-none focus:border-amber-500 transition-colors resize-none text-xs"
                    placeholder="https://images.unsplash.com/..."
                    value={editingProduct.img}
                    onChange={(e) => setEditingProduct({ ...editingProduct, img: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="edit-product-name" className="block text-xs text-zinc-400 mb-2 font-medium uppercase">{t('lbl_product_name')}</label>
                    <input
                      id="edit-product-name"
                      type="text"
                      className="w-full p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white outline-none focus:border-amber-500 transition-colors text-sm"
                      placeholder="Premium Beard Oil"
                      value={editingProduct.name}
                      onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <label htmlFor="edit-product-price" className="block text-xs text-zinc-400 mb-2 font-medium uppercase">{t('lbl_product_price')}</label>
                    <input
                      id="edit-product-price"
                      type="text"
                      className="w-full p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white outline-none focus:border-amber-500 transition-colors text-sm"
                      placeholder="450 ETB"
                      value={editingProduct.price}
                      onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="edit-product-description" className="block text-xs text-zinc-400 mb-2 font-medium uppercase">{t('lbl_product_description')}</label>
                  <textarea
                    id="edit-product-description"
                    rows="3"
                    className="w-full p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white outline-none focus:border-amber-500 transition-colors text-sm resize-none"
                    placeholder="A lightweight blend of natural oils that softens facial hair..."
                    value={editingProduct.description ?? ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                  />
                </div>

                <div>
                  <label htmlFor="edit-product-phone" className="block text-xs text-zinc-400 mb-2 font-medium uppercase">{t('lbl_product_phone')}</label>
                  <input
                    id="edit-product-phone"
                    type="tel"
                    className="w-full p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white outline-none focus:border-amber-500 transition-colors text-sm"
                    placeholder={content.contact.phone}
                    value={editingProduct.phone ?? ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, phone: e.target.value })}
                  />
                  <p className="text-[11px] text-zinc-600 mt-1.5">{t('lbl_product_phone_hint')}</p>
                </div>
              </div>

              <div className="p-6 border-t border-zinc-850 bg-zinc-900/50 flex gap-3">
                <button onClick={() => { setEditingProduct(null); setPreviewProductImage(null); setUploadError(''); }} className="flex-1 py-2.5 bg-zinc-800 hover:bg-zinc-750 text-white rounded-lg text-sm font-semibold transition-colors border border-zinc-700">
                  {t('lbl_cancel_btn')}
                </button>
                <button onClick={() => handleSaveProduct({ ...editingProduct, img: previewProductImage || editingProduct.img })} className="flex-1 py-2.5 bg-amber-500 hover:bg-amber-600 text-zinc-950 rounded-lg text-sm font-bold transition-colors flex items-center justify-center gap-1.5">
                  <CheckCircle size={14} /> {t('lbl_save_product')}
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
          aria-label={isOwnerVerified ? 'Admin Panel' : 'Owner Login'}
        >
          <Shield size={16} className="text-amber-500" />
          <span className="text-xs font-semibold hidden md:inline">
            {isOwnerVerified ? 'Admin Panel' : 'Owner Login'}
          </span>
        </button>
      )}

      {/* Footer Section */}
      <footer 
      data-aos="fade-up"
      className="relative overflow-hidden border-t border-white/10 bg-gradient-to-b from-zinc-950 via-black to-zinc-950 pt-12 md:pt-24 pb-8 md:pb-10">
        <div className="absolute inset-0 pointer-events-none">
    <div className="absolute -top-40 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-amber-500/5 blur-3xl" />
  </div>

  <div className="max-w-7xl mx-auto px-4 md:px-8">
   
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5 md:gap-12 mb-8 md:mb-16">
            <div className="md:col-span-1 rounded-2xl md:rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-5 md:p-6">
              <div className="flex items-center gap-3 mb-4 md:mb-6">
            
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-amber-500 flex-shrink-0">
                  <img src="https://i.ibb.co/dwRQd4t0/logo.jpg" alt="Logo" loading="lazy" decoding="async" className="w-full h-full object-cover" onError={(e) => { e.target.src="https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=100"; }} />
                </div>
                <h2 className="text-lg md:text-xl font-bold uppercase text-white tracking-tight">
                  {content.shopName.split(' ')[0]} <span className="text-amber-500 font-light">{content.shopName.split(' ')[1] || t('lbl_barbershop_suffix')}</span>
                </h2>
              </div>
              <p className="text-zinc-500 text-sm leading-relaxed mb-4 md:mb-6">
                {t('lbl_footer_desc')}
              </p>
              <div className="flex gap-3 md:gap-4">
                <a href="https://www.instagram.com/kemekem_barbershop" target="_blank" rel="noopener noreferrer" className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-zinc-900 flex items-center justify-center text-zinc-400 hover:bg-amber-500 hover:text-zinc-950 transition-colors border border-zinc-850">
                  <Instagram size={16} className="md:w-[18px] md:h-[18px]" />
                </a>
                <a href="https://www.tiktok.com/@kemekembarbershop" target="_blank" rel="noopener noreferrer" className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-zinc-900 flex items-center justify-center text-zinc-400 hover:bg-amber-500 hover:text-zinc-950 transition-colors border border-zinc-850">
                  <svg width="16" height="16" className="md:w-[18px] md:h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                  </svg>
                </a>
                <a href="https://youtube.com/channel/UCGtGNQuZDEQldjmOh0_kz2w" target="_blank" rel="noopener noreferrer" className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-zinc-900 flex items-center justify-center text-zinc-400 hover:bg-amber-500 hover:text-zinc-950 transition-colors border border-zinc-850">
                  <Youtube size={16} className="md:w-[18px] md:h-[18px]" />
                </a>
              </div>
            </div>
            
            <div className="rounded-2xl md:rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-5 md:p-6">
              <h4 className="text-white font-bold mb-4 md:mb-6 uppercase tracking-wider text-xs">
              {t('lbl_quick_links')}</h4>
              <ul className="space-y-2.5 md:space-y-3 text-zinc-500 text-sm">
                <li><button onClick={() => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}}
className="hover:text-amber-500 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(245,158,11,0.25)] text-left">{t('nav_home')}</button></li>
                <li><button onClick={() => scrollTo('services')} className="hover:text-amber-500 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(245,158,11,0.25)]
                 text-left">{t('nav_services')}</button></li>
                <li><button onClick={() => scrollTo('about')} className="hover:text-amber-500 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(245,158,11,0.25)] text-left">{t('nav_about')}</button></li>
                <li><button onClick={() => scrollTo('gallery')} className="hover:text-amber-500 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(245,158,11,0.25)] text-left">{t('nav_gallery')}</button></li>
                <li><button onClick={() => scrollTo('team')} className="hover:text-amber-500 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(245,158,11,0.25)] text-left">{t('nav_team')}</button></li>
                <li><button onClick={() => scrollTo('products')} className="hover:text-amber-500 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(245,158,11,0.25)] text-left">{t('nav_products')}</button></li>
                <li><button onClick={() => scrollTo('reviews')} className="hover:text-amber-500 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(245,158,11,0.25)] text-left">{t('nav_reviews')}</button></li>
              </ul>
            </div>
            
            <div className="rounded-2xl md:rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-5 md:p-6">
  <h4 className="text-white font-bold mb-4 md:mb-6 uppercase tracking-wider text-xs">
  {t('lbl_contact_info')}
</h4>

  <ul className="space-y-3.5 md:space-y-5 text-zinc-400 text-sm">
                <li className="flex items-start gap-3"><MapPin size={16} className="text-amber-500 flex-shrink-0 mt-0.5" /> <a
                 href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(content.contact.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-amber-500 transition-colors"
>
               {content.contact.address}
               </a>
                </li>
                <li className="flex items-center gap-3"><Phone size={16} className="text-amber-500 flex-shrink-0" /> 
                <a
                href={`tel:${content.contact.phone.replace(/\s+/g, '')}`}
                className="hover:text-amber-500 transition-colors"
                >
                {content.contact.phone}
                </a>
                </li>
                <li className="flex items-center gap-3"><Mail size={16} className="text-amber-500 flex-shrink-0" /> <a
                 href={`mailto:${content.contact.email}`}
                 className="hover:text-amber-500 transition-colors"
>
                {content.contact.email}
                </a>
                </li>
              </ul>
            </div>

            <div className="rounded-2xl md:rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-5 md:p-6">
  <h4 className="text-white font-bold mb-4 md:mb-6 uppercase tracking-wider text-xs">
    {t('lbl_opening_hours')}
  </h4>

  <ul className="space-y-3.5 md:space-y-5 text-zinc-500 text-sm">
                <li className="flex items-start gap-3"><Clock size={16} className="text-amber-500 flex-shrink-0 mt-0.5" /> <span>{content.contact.hours}</span></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 md:mt-16 border-t border-white/10 pt-6 md:pt-8 flex flex-col md:flex-row items-center justify-between gap-3 md:gap-4 text-xs md:text-sm text-zinc-500 text-center md:text-left">
            <p>&copy; {new Date().getFullYear()} {content.shopName}. {t('lbl_all_rights_reserved')}</p>
            <p>{t('lbl_designed_for')}</p>
          </div>
        </div>
      </footer>
    </div>
  );
    }
