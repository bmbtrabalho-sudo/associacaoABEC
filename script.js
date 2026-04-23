// Menu mobile
function toggleMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    if (mobileMenu) {
        mobileMenu.classList.toggle('hidden');
    }
}

// Smooth scroll para links de navegação
document.addEventListener('DOMContentLoaded', function() {
    // Menu mobile toggle
    const menuToggle = document.querySelector('button[onclick="toggleMenu()"]');
    if (menuToggle) {
        menuToggle.addEventListener('click', toggleMenu);
    }

    // Smooth scroll para todos os links de âncora
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
            
            // Fecha menu mobile após clique
            const mobileMenu = document.getElementById('mobileMenu');
            if (mobileMenu) {
                mobileMenu.classList.add('hidden');
            }
        });
    });

    // Animação de fade-in ao scroll
    function animateOnScroll() {
        const elements = document.querySelectorAll('.animate-fade-in, [class*="shadow"], .group');
        
        elements.forEach(el => {
            const rect = el.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight * 0.8 && rect.bottom > 0;
            
            if (isVisible) {
                el.classList.add('opacity-100', 'translate-y-0');
                el.classList.remove('opacity-0', 'translate-y-10');
            }
        });
    }

    // Navbar scroll effect
    function handleScroll() {
        const header = document.querySelector('header');
        if (window.scrollY > 100) {
            header.classList.add('shadow-xl', 'backdrop-blur-md');
            header.classList.remove('shadow-lg');
        } else {
            header.classList.remove('shadow-xl', 'backdrop-blur-md');
            header.classList.add('shadow-lg');
        }
        
        // Trigger animações
        animateOnScroll();
    }

    // Intersection Observer para animações mais eficientes
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
                entry.target.classList.remove('opacity-0', 'translate-y-10');
            }
        });
    }, observerOptions);

    // Observa elementos para animação
    document.querySelectorAll('section, .group, [class*="shadow"]').forEach(el => {
        el.classList.add('opacity-0', 'translate-y-10', 'transition-all', 'duration-700', 'ease-out');
        observer.observe(el);
    });

    // Event listeners
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    
    // Inicializa animações
    setTimeout(() => {
        animateOnScroll();
        handleScroll();
    }, 100);

    // WhatsApp click tracking (opcional)
    document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
        link.addEventListener('click', function() {
            // Pode adicionar analytics aqui se necessário
            console.log('WhatsApp clicado!');
        });
    });

    // Auto-hide mobile menu quando clicar fora
    document.addEventListener('click', function(event) {
        const mobileMenu = document.getElementById('mobileMenu');
        const menuButton = document.querySelector('button[onclick="toggleMenu()"]');
        
        if (mobileMenu && !mobileMenu.contains(event.target) && !menuButton.contains(event.target)) {
            mobileMenu.classList.add('hidden');
        }
    });
});

// Função global para toggleMenu (mantida para compatibilidade)
function toggleMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    if (mobileMenu) {
        mobileMenu.classList.toggle('hidden');
    }
}

// Previne comportamentos indesejados em mobile
document.addEventListener('touchstart', function() {}, true);
// ========== GOOGLE MAPS - LOCALIZAÇÃO ABEC ==========
// Função global para Google Maps callback
let mapInstance;
function initMap() {
    // Coordenadas EXATAS da ABEC do link fornecido
    const abecLatLng = { lat: -8.8089916, lng: -63.8609139 };
    
    // Inicializa o mapa
    mapInstance = new google.maps.Map(document.getElementById('abecMap'), {
        zoom: 18,
        center: abecLatLng,
        mapTypeId: 'roadmap',
        mapTypeControl: false,
        fullscreenControl: false,
        streetViewControl: false,
        zoomControl: true,
        styles: [
            {
                featureType: "poi",
                elementType: "labels",
                stylers: [{ visibility: "off" }]
            },
            {
                featureType: "transit",
                stylers: [{ visibility: "off" }]
            },
            {
                featureType: "road",
                elementType: "geometry",
                stylers: [{ lightness: 100 }, { visibility: "simplified" }]
            },
            {
                featureType: "road",
                elementType: "labels",
                stylers: [{ lightness: 20 }]
            }
        ]
    });

    // Ícone personalizado para ABEC (coração verde)
    const abecIcon = {
        url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
            <svg width="50" height="60" viewBox="0 0 50 60" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style="stop-color:#25D366"/>
                        <stop offset="100%" style="stop-color:#128C7E"/>
                    </linearGradient>
                </defs>
                <path fill="url(%23grad1)" stroke="#fff" stroke-width="3" stroke-linejoin="round" d="M25 2C17 2 10 6 7 13c-2 5-3 10-3 15 0 6 2 11 5 15 4 6 10 10 17 11v4h-7c-1 0-2 1-2 2s1 2 2 2h13c1 0 2-1 2-2s-1-2-2-2h-6v-4c7-1 14-5 18-11 3-4 5-9 5-15 0-5-1-10-3-15C40 6 33 2 25 2z"/>
                <circle fill="#fff" cx="25" cy="25" r="8"/>
                <text fill="%2325D366" font-family="Arial" font-size="12" font-weight="bold" text-anchor="middle" x="25" y="29">ABEC</text>
            </svg>
        `)}`,
        scaledSize: new google.maps.Size(50, 60),
        anchor: new google.maps.Point(25, 60)
    };

    // Marcador principal da ABEC
    const abecMarker = new google.maps.Marker({
        position: abecLatLng,
        map: mapInstance,
        title: '🏢 ABEC - Associação Beneficente Evelin Caroline',
        icon: abecIcon,
        animation: google.maps.Animation.DROP
    });

    // InfoWindow com informações detalhadas
    const infoWindow = new google.maps.InfoWindow({
        content: `
            <div style="max-width: 250px;">
                <h3 style="margin: 0 0 8px 0; color: #25D366; font-weight: bold;">🏢 ABEC</h3>
                <p style="margin: 0 0 8px 0; font-size: 14px;"><strong>Associação Beneficente</strong><br>Evelin Caroline</p>
                <p style="margin: 0 0 12px 0; font-size: 13px; color: #666;">
                    R. Abóbora, 5662<br>Cohab, Porto Velho - RO
                </p>
                <a href="https://wa.me/5569993358759?text=Oi!%20Estou%20perto%20da%20ABEC,%20posso%20passar aí?" 
                   target="_blank" 
                   style="display: inline-block; background: #25D366; color: white; padding: 8px 16px; text-decoration: none; border-radius: 20px; font-size: 13px; font-weight: 500;">
                    📱 WhatsApp
                </a>
            </div>
        `
    });

    // Eventos do marcador
    abecMarker.addListener('click', () => {
        infoWindow.open(mapInstance, abecMarker);
    });

    // Auto-open infoWindow após 2 segundos
    setTimeout(() => {
        infoWindow.open(mapInstance, abecMarker);
    }, 2000);

    // Clique no mapa fecha infoWindow
    mapInstance.addListener('click', () => {
        infoWindow.close();
    });
}

// Fallback caso Google Maps não carregue
window.addErrorHandler = function() {
    const mapContainer = document.getElementById('abecMap');
    if (mapContainer) {
        mapContainer.innerHTML = `
            <div class="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex flex-col items-center justify-center p-8 text-center rounded-2xl">
                <i class="fas fa-map-marked-alt text-6xl text-gray-400 mb-4"></i>
                <h4 class="text-xl font-bold text-gray-700 mb-2">Mapa em breve</h4>
                <p class="text-gray-500 mb-6">Clique para abrir no Google Maps</p>
                <a href="https://maps.app.goo.gl/mNBbVQz6gwjhkAui9" target="_blank" 
                   class="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg transform hover:-translate-y-1 transition-all">
                    <i class="fas fa-external-link-alt mr-2"></i>Abrir Localização
                </a>
            </div>
        `;
    }
};