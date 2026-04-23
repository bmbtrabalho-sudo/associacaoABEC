document.addEventListener('DOMContentLoaded', function() {
    // ========== MENU MOBILE PERFEITO ==========
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const header = document.getElementById('mainHeader');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('open');
            const iconBars = mobileMenuBtn.querySelector('i.fa-bars');
            const iconTimes = mobileMenuBtn.querySelector('i.fa-times');
            
            if (mobileMenu.classList.contains('open')) {
                iconBars.classList.add('hidden');
                iconTimes.classList.remove('hidden');
                document.body.style.overflow = 'hidden'; // Previne scroll
            } else {
                iconBars.classList.remove('hidden');
                iconTimes.classList.add('hidden');
                document.body.style.overflow = '';
            }
        });
    }
    
    // ========== SMOOTH SCROLL ==========
    document.querySelectorAll('.menu-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
            
            // Fecha menu mobile
            mobileMenu.classList.remove('open');
            document.body.style.overflow = '';
        });
    });
    
    // ========== HEADER SCROLL EFFECT ==========
    let lastScroll = 0;
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Header shadow
        if (scrollTop > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Hide menu on scroll
        if (mobileMenu.classList.contains('open') && scrollTop > lastScroll) {
            mobileMenu.classList.remove('open');
            document.body.style.overflow = '';
        }
        lastScroll = scrollTop;
    });
    
    // ========== FECHAR MENU AO CLICAR FORA ==========
    document.addEventListener('click', function(e) {
        if (!mobileMenuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
            mobileMenu.classList.remove('open');
            document.body.style.overflow = '';
        }
    });
    
    // ========== ACTIVE LINK ==========
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section[id]');
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        document.querySelectorAll('.menu-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // ========== ANIMAÇÕES SCROLL ==========
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('slide-down');
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
});
