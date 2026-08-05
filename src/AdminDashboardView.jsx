import React from 'react';
import {
  Calendar,
  Check,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Clock,
  Download,
  Edit3,
  Eye,
  EyeOff,
  Image as ImageIcon,
  Key,
  LogOut,
  Mail,
  MapPin,
  Phone,
  Plus,
  Save,
  Scissors,
  Settings,
  Shield,
  Sparkles,
  Star,
  Trash2,
  X
} from 'lucide-react';

// Extracted from App.jsx as part of a performance pass: this is the
// owner-only admin dashboard (bookings/services/team/products/settings
// management + the "not verified" guard screen). It is now loaded via
// React.lazy() from App.jsx so ordinary site visitors never download or
// parse this code — only the shop owner does, after logging in.
//
// This is a pure extraction: every line of JSX below is unchanged from
// the original App.jsx. Behavior, layout, styling, and props are
// identical — only the file boundary and prop-passing are new.
function AdminDashboardView({
  activeClientBookings,
  adminBlockSlotModal,
  adminTab,
  availableSlots,
  blockSlotForm,
  blockedSlots,
  bookingsList,
  content,
  dbStatus,
  exportBookingsCSV,
  formatTime,
  handleAboutImageUpload,
  handleBlockTimeSlot,
  handleChangePassword,
  handleDeleteBarber,
  handleDeleteLook,
  handleDeleteProduct,
  handleDeleteService,
  handleOwnerLogout,
  handleReorderProduct,
  handleSaveTimeFormat,
  handleUnblockTimeSlot,
  handleUpdateBookingStatus,
  isOwnerVerified,
  passwordChange,
  passwordError,
  passwordSuccess,
  previewTimeFormat,
  saveGeneralSettings,
  saveStatus,
  scrollTo,
  setAdminBlockSlotModal,
  setAdminTab,
  setBlockSlotForm,
  setEditingBarber,
  setEditingLook,
  setEditingProduct,
  setEditingService,
  setIsAdminView,
  setIsBookingModalOpen,
  setOwnerLoginModal,
  setPasswordChange,
  setPasswordError,
  setPasswordSuccess,
  setPreviewTimeFormat,
  setShowConfirmPassword,
  setShowCurrentPassword,
  setShowNewPassword,
  setStep,
  showConfirmPassword,
  showCurrentPassword,
  showNewPassword,
  sortedProducts,
  t,
  td,
  timeFormatLoading,
  timeFormatSaved,
  timeFormatSetting,
  uploadError,
  user
}) {
  return !isOwnerVerified ? (
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
          <section className="pt-24 pb-8 md:pt-28 bg-zinc-950 min-h-screen">
            <div className="max-w-7xl mx-auto px-4">

              {/* Owner Dashboard Header — 3-column layout: branding | title | actions */}
              <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-center gap-4 md:gap-6 mb-8 pb-6 border-b border-zinc-800">

                {/* Left: Logo + Shop Name */}
                <div className="flex items-center gap-3 justify-center md:justify-start">
                  <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-amber-500 flex-shrink-0">
                    <img src="https://i.ibb.co/dwRQd4t0/logo.jpg" alt="Logo" className="w-full h-full object-cover" onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=100"; }} />
                  </div>
                  <span className="text-lg md:text-xl font-bold tracking-tight text-white uppercase whitespace-nowrap">
                    {content.shopName.split(' ')[0]} <span className="font-light text-amber-500">{content.shopName.split(' ')[1] || t('lbl_barbershop_suffix')}</span>
                  </span>
                </div>

                {/* Center: Owner Dashboard Title */}
                <div className="flex flex-col items-center text-center gap-1">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-amber-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Shield size={16} className="text-amber-500" />
                    </div>
                    <h2 className="text-xl md:text-2xl font-bold text-white whitespace-nowrap">{t('lbl_owner_dashboard')}</h2>
                  </div>
                  <p className="text-zinc-500 text-xs flex items-center gap-1.5 flex-wrap justify-center">
                    <CheckCircle size={11} className={dbStatus === 'connected' ? 'text-green-500' : 'text-amber-500'} />
                    Signed in as <span className="text-amber-500 font-medium">{user?.email || 'owner'}</span>
                    <span className="text-zinc-700">·</span>
                    <span className={dbStatus === 'connected' ? 'text-green-500' : 'text-amber-500'}>
                      {dbStatus === 'connected' ? 'Supabase Connected' : 'Connecting…'}
                    </span>
                  </p>
                </div>

                {/* Right: Action Buttons */}
                <div className="flex items-center justify-center md:justify-end gap-2 flex-wrap">
                  {saveStatus && (
                    <span className={`text-xs px-3 py-1.5 rounded-full font-medium ${saveStatus.includes('Error') ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-green-500/10 text-green-400 border border-green-500/20'}`}>
                      {saveStatus.includes('Error') ? '✗' : '✓'} {saveStatus}
                    </span>
                  )}
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
                  <button onClick={() => setIsAdminView(false)}
                    className="flex items-center gap-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(245,158,11,0.25)] border border-zinc-700">
                    ← Back to Website
                  </button>
                  <button onClick={handleOwnerLogout}
                    className="flex items-center gap-1.5 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 hover:text-red-300 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(245,158,11,0.25)]">
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
                  { key: 'products',      label: t('lbl_manage_products'),  count: content.products?.length || 0 },
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
                    <button onClick={exportBookingsCSV} className="bg-zinc-800 hover:bg-zinc-750 text-zinc-300 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(245,158,11,0.25)] flex items-center gap-1.5 border border-zinc-750">
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
                                  className={`text-xs font-bold rounded-full px-3 py-1.5 outline-none cursor-pointer border focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-zinc-900 ${
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
                      <div role="dialog" aria-modal="true" aria-labelledby="block-slot-title" className="bg-zinc-900 border border-zinc-850 rounded-2xl w-full max-w-md shadow-2xl p-6 relative">
                        <button onClick={() => setAdminBlockSlotModal(false)} aria-label={t('lbl_cancel_btn')} className="absolute right-4 top-4 text-zinc-500 hover:text-white">
                          <X size={20} />
                        </button>

                        <h3 id="block-slot-title" className="text-lg font-bold text-white mb-4">{t('lbl_block_time_slot')}</h3>

                        <div className="space-y-4">
                          <div>
                            <label htmlFor="block-slot-barber" className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">Select Barber</label>
                            <select 
                              id="block-slot-barber"
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
                            <label htmlFor="block-slot-date" className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">Date</label>
                            <input 
                              id="block-slot-date"
                              type="date"
                              value={blockSlotForm.date}
                              onChange={(e) => setBlockSlotForm({...blockSlotForm, date: e.target.value})}
                              className="w-full p-3 bg-zinc-900 border border-zinc-800 rounded-xl text-white outline-none focus:border-amber-500 transition-colors"
                              min={new Date().toISOString().split('T')[0]}
                            />
                          </div>

                          <div>
                            <label htmlFor="block-slot-time" className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">Time Slot</label>
                            <select 
                              id="block-slot-time"
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
                            <label htmlFor="block-slot-reason" className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">{t('lbl_block_reason')}</label>
                            <select 
                              id="block-slot-reason"
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
                          <button onClick={() => setEditingService(s)} aria-label={`${t('lbl_edit_service')}: ${s.name}`} className="p-2 bg-zinc-850 hover:bg-zinc-800 text-zinc-300 rounded-lg hover:text-amber-500 transition-colors">
                            <Edit3 size={16} />
                          </button>
                          <button onClick={() => handleDeleteService(s.id)} aria-label={`Delete: ${s.name}`} className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-lg transition-colors">
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
                          <img src={b.img || 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'} alt={b.name} loading="lazy" decoding="async" className="w-full h-full object-cover" />
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
                            <button onClick={() => handleDeleteBarber(b.id)} aria-label={`Delete: ${b.name}`} className="px-3 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-lg transition-colors flex items-center justify-center">
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
                            <img src={look.img} alt="Haircut look" loading="lazy" decoding="async" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
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
                              aria-label="Delete this look"
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

              {/* Tab Content: Products */}
              {adminTab === 'products' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        <ImageIcon size={20} className="text-amber-500" /> {t('lbl_manage_products')} ({content.products?.length || 0})
                      </h3>
                      <p className="text-xs text-zinc-400 mt-1">{t('lbl_manage_products_desc')}</p>
                    </div>
                    <button
                      onClick={() => setEditingProduct({ name: '', price: '', description: '', phone: content.contact.phone, img: '' })}
                      className="bg-amber-500 hover:bg-amber-600 text-zinc-950 px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-1.5 transition-all"
                    >
                      <Plus size={16} /> {t('lbl_add_new_product')}
                    </button>
                  </div>

                  {content.products && content.products.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {sortedProducts.map((p, idx, arr) => (
                        <div key={p.id} className="bg-zinc-900 border border-zinc-850 rounded-xl overflow-hidden flex flex-col">
                          <div className="aspect-[4/5] overflow-hidden relative bg-zinc-950">
                            <img src={p.img || 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=800'} alt={p.name} loading="lazy" decoding="async" className="w-full h-full object-cover" />
                          </div>
                          <div className="p-5 flex-grow flex flex-col">
                            <h4 className="font-bold text-white text-lg">{p.name}</h4>
                            <p className="text-amber-500 font-bold text-sm mt-1">{p.price}</p>
                            <p className="text-xs text-zinc-500 mt-2 flex items-center gap-1.5">
                              <Phone size={12} /> {p.phone || content.contact.phone}
                            </p>
                            <div className="flex items-center gap-2 pt-4 mt-4 border-t border-zinc-850">
                              <button
                                onClick={() => handleReorderProduct(p.id, 'up')}
                                disabled={idx === 0}
                                aria-label={`${t('lbl_move_up')}: ${p.name}`}
                                className="p-2 bg-zinc-850 hover:bg-zinc-800 disabled:opacity-30 disabled:cursor-not-allowed text-zinc-300 rounded-lg transition-colors"
                              >
                                <ChevronUp size={16} />
                              </button>
                              <button
                                onClick={() => handleReorderProduct(p.id, 'down')}
                                disabled={idx === arr.length - 1}
                                aria-label={`${t('lbl_move_down')}: ${p.name}`}
                                className="p-2 bg-zinc-850 hover:bg-zinc-800 disabled:opacity-30 disabled:cursor-not-allowed text-zinc-300 rounded-lg transition-colors"
                              >
                                <ChevronDown size={16} />
                              </button>
                              <button onClick={() => setEditingProduct(p)} className="flex-1 py-2 bg-zinc-850 hover:bg-zinc-800 text-zinc-300 rounded-lg text-sm font-semibold flex items-center justify-center gap-1 transition-colors">
                                <Edit3 size={14} /> {t('lbl_edit_product')}
                              </button>
                              <button onClick={() => handleDeleteProduct(p.id)} aria-label={`Delete: ${p.name}`} className="px-3 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-lg transition-colors flex items-center justify-center">
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-12 text-center rounded-xl border border-zinc-850 bg-zinc-900/50">
                      <ImageIcon size={40} className="text-zinc-700 mx-auto mb-3" />
                      <p className="text-zinc-400 text-sm">{t('lbl_no_products_added')}</p>
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
                          <label htmlFor="settings-shop-name" className="block text-xs text-zinc-400 mb-1.5 font-medium uppercase tracking-wider">{t('lbl_shop_name')}</label>
                          <input 
                            id="settings-shop-name"
                            type="text" 
                            className="w-full p-3 bg-zinc-950 border border-zinc-850 rounded-xl text-white outline-none focus:border-amber-500 transition-colors"
                            defaultValue={content.shopName}
                            onBlur={(e) => saveGeneralSettings({ shopName: e.target.value })}
                          />
                        </div>
                        <div>
                          <label htmlFor="settings-hero-btn" className="block text-xs text-zinc-400 mb-1.5 font-medium uppercase tracking-wider">{t('lbl_hero_button_text')}</label>
                          <input 
                            id="settings-hero-btn"
                            type="text" 
                            className="w-full p-3 bg-zinc-950 border border-zinc-850 rounded-xl text-white outline-none focus:border-amber-500 transition-colors"
                            defaultValue={content.hero.btnText}
                            onBlur={(e) => saveGeneralSettings({ hero: { ...content.hero, btnText: e.target.value } })}
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="settings-hero-headline" className="block text-xs text-zinc-400 mb-1.5 font-medium uppercase tracking-wider">{t('lbl_hero_headline')}</label>
                        <input 
                          id="settings-hero-headline"
                          type="text" 
                          className="w-full p-3 bg-zinc-950 border border-zinc-850 rounded-xl text-white outline-none focus:border-amber-500 transition-colors"
                          defaultValue={content.hero.title}
                          onBlur={(e) => saveGeneralSettings({ hero: { ...content.hero, title: e.target.value } })}
                        />
                      </div>

                      <div>
                        <label htmlFor="settings-hero-subtitle" className="block text-xs text-zinc-400 mb-1.5 font-medium uppercase tracking-wider">{t('lbl_hero_subtitle')}</label>
                        <textarea 
                          id="settings-hero-subtitle"
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
                        <label htmlFor="settings-address" className="block text-xs text-zinc-400 mb-1.5 font-medium uppercase tracking-wider">{t('lbl_business_address')}</label>
                        <input 
                          id="settings-address"
                          type="text" 
                          className="w-full p-3 bg-zinc-950 border border-zinc-850 rounded-xl text-white outline-none focus:border-amber-500 transition-colors"
                          defaultValue={content.contact.address}
                          onBlur={(e) => saveGeneralSettings({ contact: { ...content.contact, address: e.target.value } })}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="settings-phone" className="block text-xs text-zinc-400 mb-1.5 font-medium uppercase tracking-wider">{t('lbl_phone')}</label>
                          <input 
                            id="settings-phone"
                            type="text" 
                            className="w-full p-3 bg-zinc-950 border border-zinc-850 rounded-xl text-white outline-none focus:border-amber-500 transition-colors"
                            defaultValue={content.contact.phone}
                            onBlur={(e) => saveGeneralSettings({ contact: { ...content.contact, phone: e.target.value } })}
                          />
                        </div>
                        <div>
                          <label htmlFor="settings-hours" className="block text-xs text-zinc-400 mb-1.5 font-medium uppercase tracking-wider">{t('lbl_operating_hours_text')}</label>
                          <input 
                            id="settings-hours"
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

                  {/* About Section Content — small heading, main title, description */}
                  <div className="bg-zinc-900 border border-zinc-850 rounded-xl p-6">
                    <h4 className="text-lg font-bold text-white mb-4 border-b border-zinc-800 pb-3 flex items-center gap-2">
                      <Edit3 size={18} className="text-amber-500" /> {t('lbl_about_section_content')}
                    </h4>
                    <p className="text-zinc-400 text-xs mb-6">{t('lbl_about_content_description')}</p>

                    <div className="space-y-4">
                      <div>
                        <label htmlFor="settings-about-small-heading" className="block text-xs text-zinc-400 mb-1.5 font-medium uppercase tracking-wider">{t('lbl_about_small_heading')}</label>
                        <input
                          id="settings-about-small-heading"
                          type="text"
                          className="w-full p-3 bg-zinc-950 border border-zinc-850 rounded-xl text-white outline-none focus:border-amber-500 transition-colors"
                          defaultValue={content.about.smallHeading}
                          onBlur={(e) => saveGeneralSettings({ about: { ...content.about, smallHeading: e.target.value } })}
                        />
                      </div>

                      <div>
                        <label htmlFor="settings-about-title" className="block text-xs text-zinc-400 mb-1.5 font-medium uppercase tracking-wider">{t('lbl_about_main_title')}</label>
                        <input
                          id="settings-about-title"
                          type="text"
                          className="w-full p-3 bg-zinc-950 border border-zinc-850 rounded-xl text-white outline-none focus:border-amber-500 transition-colors"
                          defaultValue={content.about.title}
                          onBlur={(e) => saveGeneralSettings({ about: { ...content.about, title: e.target.value } })}
                        />
                      </div>

                      <div>
                        <label htmlFor="settings-about-text" className="block text-xs text-zinc-400 mb-1.5 font-medium uppercase tracking-wider">{t('lbl_about_description_text')}</label>
                        <textarea
                          id="settings-about-text"
                          rows="5"
                          className="w-full p-3 bg-zinc-950 border border-zinc-850 rounded-xl text-white outline-none focus:border-amber-500 transition-colors resize-none animate-none"
                          defaultValue={content.about.text}
                          onBlur={(e) => saveGeneralSettings({ about: { ...content.about, text: e.target.value } })}
                        />
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
                        <label htmlFor="settings-about-image" className="block text-xs text-zinc-400 mb-3 font-medium uppercase tracking-wider">{t('lbl_about_image_upload')}</label>
                        <div className="relative">
                          <input 
                            id="settings-about-image"
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
                        <label htmlFor="pw-current" className="block text-xs text-zinc-400 mb-2 font-medium uppercase tracking-wider">{t('lbl_current_password')}</label>
                        <div className="relative">
                          <input 
                            id="pw-current"
                            type={showCurrentPassword ? 'text' : 'password'} 
                            autoComplete="current-password"
                            className="w-full p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white outline-none focus:border-amber-500 transition-colors font-mono pr-10"
                            placeholder={t('lbl_enter_current_password')}
                            value={passwordChange.current}
                            onChange={(e) => setPasswordChange({ ...passwordChange, current: e.target.value })}
                          />
                          <button 
                            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                            type="button"
                            aria-label={showCurrentPassword ? 'Hide password' : 'Show password'}
                            className="absolute right-3 top-3.5 text-zinc-500 hover:text-white transition-colors"
                          >
                            {showCurrentPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                          </button>
                        </div>
                      </div>

                      {/* New Password */}
                      <div>
                        <label htmlFor="pw-new" className="block text-xs text-zinc-400 mb-2 font-medium uppercase tracking-wider">{t('lbl_new_password')}</label>
                        <div className="relative">
                          <input 
                            id="pw-new"
                            type={showNewPassword ? 'text' : 'password'} 
                            autoComplete="new-password"
                            className="w-full p-3 bg-zinc-950 border border-zinc-850 rounded-xl text-white outline-none focus:border-amber-500 transition-colors font-mono pr-10"
                            placeholder={t('lbl_enter_new_password')}
                            value={passwordChange.new}
                            onChange={(e) => setPasswordChange({ ...passwordChange, new: e.target.value })}
                          />
                          <button 
                            onClick={() => setShowNewPassword(!showNewPassword)}
                            type="button"
                            aria-label={showNewPassword ? 'Hide password' : 'Show password'}
                            className="absolute right-3 top-3.5 text-zinc-500 hover:text-white transition-colors"
                          >
                            {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                          </button>
                        </div>
                      </div>

                      {/* Confirm Password */}
                      <div>
                        <label htmlFor="pw-confirm" className="block text-xs text-zinc-400 mb-2 font-medium uppercase tracking-wider">{t('lbl_confirm_new_password')}</label>
                        <div className="relative">
                          <input 
                            id="pw-confirm"
                            type={showConfirmPassword ? 'text' : 'password'} 
                            autoComplete="new-password"
                            className="w-full p-3 bg-zinc-950 border border-zinc-850 rounded-xl text-white outline-none focus:border-amber-500 transition-colors font-mono pr-10"
                            placeholder={t('lbl_reenter_new_password')}
                            value={passwordChange.confirm}
                            onChange={(e) => setPasswordChange({ ...passwordChange, confirm: e.target.value })}
                          />
                          <button 
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            type="button"
                            aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
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
        );
}

export default AdminDashboardView;
