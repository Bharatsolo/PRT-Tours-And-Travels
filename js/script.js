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
    
    // Form Submission removed to allow native web3forms submission

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

