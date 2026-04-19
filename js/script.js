document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = mobileMenuBtn.querySelector('i');
            if (icon) {
                if (navMenu.classList.contains('active')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !mobileMenuBtn.contains(e.target) && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
    }

    // Sticky Header
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
    
    // Form Submission for WhatsApp Redirect with Details
    const handleBookingSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        // Construct a clean, professional WhatsApp message
        let message = `🚀 *New Booking Request - PRT Tours*\n`;
        message += `━━━━━━━━━━━━━━━━━━━━━━\n`;
        message += `👤 *Name:* ${data.name || 'N/A'}\n`;
        message += `📞 *Phone:* ${data.phone || 'N/A'}\n`;
        
        if (data.service_type) {
            message += `🚕 *Service:* ${data.service_type}\n`;
        }
        
        message += `📍 *Pick-up:* ${data.pickup || 'N/A'}\n`;
        message += `🏁 *Drop-off:* ${data.dropoff || 'N/A'}\n`;
        message += `📅 *Date:* ${data.travel_date || 'N/A'}\n`;
        message += `👥 *Passengers:* ${data.passengers || 'N/A'}\n`;
        
        if (data.message && data.message.trim() !== "") {
            message += `📝 *Notes:* ${data.message}\n`;
        }
        message += `━━━━━━━━━━━━━━━━━━━━━━`;

        const encodedMessage = encodeURIComponent(message);
        const whatsappNumber = "919345001265";
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

        // Send to Web3Forms in background (if configured) then redirect
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Preparing WhatsApp...';

        if (data.access_key && data.access_key !== 'YOUR_ACCESS_KEY_HERE') {
            fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData
            }).then(() => {
                window.location.href = whatsappUrl;
            }).catch(() => {
                window.location.href = whatsappUrl;
            });
        } else {
            // Immediate redirect if no real access key
            window.location.href = whatsappUrl;
        }
    };

    const modalForm = document.querySelector('#modalBookingForm');
    const contactPageForm = document.querySelector('#contactForm');

    if (modalForm) {
        modalForm.addEventListener('submit', handleBookingSubmit);
    }
    if (contactPageForm) {
        contactPageForm.addEventListener('submit', handleBookingSubmit);
    }


    // Modal Toggle Logic
    const bookingModal = document.querySelector('#bookingModal');
    const connectBtns = document.querySelectorAll('.connect-btn');
    const modalClose = document.querySelector('.modal-close');

    if (bookingModal && connectBtns.length > 0) {
        connectBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                bookingModal.classList.add('active');
                document.body.classList.add('modal-open');
                
                // Close mobile menu if it's open (on mobile)
                if (navMenu && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    const icon = mobileMenuBtn.querySelector('i');
                    if (icon) {
                        icon.classList.remove('fa-times');
                        icon.classList.add('fa-bars');
                    }
                }
            });
        });

        const closeModal = () => {
            bookingModal.classList.remove('active');
            document.body.classList.remove('modal-open');
        };

        if (modalClose) {
            modalClose.addEventListener('click', closeModal);
        }

        window.addEventListener('click', (e) => {
            if (e.target === bookingModal) {
                closeModal();
            }
        });

        // Close on Esc key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && bookingModal.classList.contains('active')) {
                closeModal();
            }
        });
    }
});

