 // Enhanced scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.scroll-reveal').forEach(el => {
            observer.observe(el);
        });

        // Enhanced navigation
        const navLinks = document.querySelectorAll('.nav-links a');
        const sections = document.querySelectorAll('section');

        // Update active nav link on scroll
        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (window.pageYOffset >= sectionTop - 200) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').slice(1) === current) {
                    link.classList.add('active');
                }
            });
        });

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Dynamic floating shapes
        function createFloatingShape() {
            const shapes = ['circle', 'triangle', 'square'];
            const colors = [
                'var(--primary-gradient)',
                'var(--secondary-gradient)', 
                'var(--accent-gradient)'
            ];
            
            const shape = document.createElement('div');
            shape.className = 'shape';
            shape.style.cssText = `
                position: absolute;
                width: ${20 + Math.random() * 60}px;
                height: ${20 + Math.random() * 60}px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                border-radius: ${Math.random() > 0.5 ? '50%' : '20%'};
                top: ${Math.random() * 100}%;
                left: ${Math.random() * 100}%;
                opacity: 0.1;
                animation: float ${6 + Math.random() * 4}s ease-in-out infinite;
                animation-delay: ${Math.random() * 5}s;
            `;
            
            document.querySelector('.floating-shapes').appendChild(shape);
            
            // Remove shape after animation
            setTimeout(() => {
                if (shape.parentNode) {
                    shape.parentNode.removeChild(shape);
                }
            }, 10000);
        }

        // Create shapes periodically
        setInterval(createFloatingShape, 3000);

        // Initialize with some shapes
        for (let i = 0; i < 5; i++) {
            setTimeout(createFloatingShape, i * 1000);
        }

        // Parallax effect for floating shapes
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const shapes = document.querySelectorAll('.shape');
            
            shapes.forEach((shape, index) => {
                const speed = 0.5 + (index % 3) * 0.2;
                shape.style.transform = `translateY(${scrolled * speed}px)`;
            });
        });

        // Enhanced navbar background on scroll
        window.addEventListener('scroll', () => {
            const nav = document.querySelector('nav');
            if (window.scrollY > 100) {
                nav.style.background = 'rgba(255, 255, 255, 0.08)';
                nav.style.borderColor = 'rgba(255, 255, 255, 0.12)';
            } else {
                nav.style.background = 'var(--glass-bg)';
                nav.style.borderColor = 'var(--border-color)';
            }
        });

        // Counter animation for stats
        function animateCounter(element, target) {
            let current = 0;
            const increment = target / 50;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                element.textContent = Math.floor(current) + '+';
            }, 30);
        }

        // Trigger counter animation when stats come into view
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                    entry.target.classList.add('animated');
                    const number = entry.target.querySelector('.stat-number');
                    const target = parseInt(number.textContent);
                    animateCounter(number, target);
                }
            });
        });

        document.querySelectorAll('.stat-item').forEach(stat => {
            statsObserver.observe(stat);
        });

        // Add typing effect to hero subtitle
        function typeWriter(element, text, speed = 100) {
            let i = 0;
            element.textContent = '';
            const timer = setInterval(() => {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    i++;
                } else {
                    clearInterval(timer);
                }
            }, speed);
        }

        // Start typing effect after page load
        window.addEventListener('load', () => {
            const subtitle = document.querySelector('.hero .subtitle');
            const originalText = subtitle.textContent;
            setTimeout(() => {
                typeWriter(subtitle, originalText, 80);
            }, 1000);
        });

        // Mobile menu toggle (for responsive design)
        const createMobileMenu = () => {
            const nav = document.querySelector('nav');
            const navContainer = nav.querySelector('.nav-container');
            
            // Create hamburger button
            const hamburger = document.createElement('button');
            hamburger.className = 'hamburger';
            hamburger.innerHTML = '☰';
            hamburger.style.cssText = `
                display: none;
                background: none;
                border: none;
                color: var(--text-primary);
                font-size: 1.5rem;
                cursor: pointer;
                padding: 0.5rem;
            `;
            
            // Show hamburger on mobile
            const mediaQuery = window.matchMedia('(max-width: 768px)');
            const handleMediaQuery = (e) => {
                if (e.matches) {
                    hamburger.style.display = 'block';
                    navContainer.appendChild(hamburger);
                } else {
                    hamburger.style.display = 'none';
                }
            };
            
            mediaQuery.addListener(handleMediaQuery);
            handleMediaQuery(mediaQuery);
            
            // Toggle mobile menu
            hamburger.addEventListener('click', () => {
                const navLinks = document.querySelector('.nav-links');
                navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '100%';
                navLinks.style.left = '0';
                navLinks.style.right = '0';
                navLinks.style.background = 'var(--glass-bg)';
                navLinks.style.backdropFilter = 'blur(20px)';
                navLinks.style.flexDirection = 'column';
                navLinks.style.padding = '1rem';
                navLinks.style.borderRadius = '0 0 20px 20px';
                navLinks.style.border = '1px solid var(--border-color)';
                navLinks.style.borderTop = 'none';
            });
        };

        createMobileMenu();

        // Add loading animation
        window.addEventListener('load', () => {
            document.body.style.opacity = '0';
            document.body.style.transition = 'opacity 0.5s ease';
            
            setTimeout(() => {
                document.body.style.opacity = '1';
            }, 100);
        });

        // Cursor trail effect (optional enhancement)
        const createCursorTrail = () => {
            const trail = [];
            const trailLength = 10;
            
            for (let i = 0; i < trailLength; i++) {
                const dot = document.createElement('div');
                dot.style.cssText = `
                    position: fixed;
                    width: 4px;
                    height: 4px;
                    background: rgba(102, 126, 234, ${0.8 - i * 0.08});
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: 9999;
                    transition: opacity 0.3s ease;
                `;
                document.body.appendChild(dot);
                trail.push(dot);
            }
            
            let mouseX = 0, mouseY = 0;
            
            document.addEventListener('mousemove', (e) => {
                mouseX = e.clientX;
                mouseY = e.clientY;
            });
            
            const animateTrail = () => {
                let x = mouseX, y = mouseY;
                
                trail.forEach((dot, index) => {
                    dot.style.left = x + 'px';
                    dot.style.top = y + 'px';
                    
                    const nextDot = trail[index + 1] || trail[0];
                    x += (nextDot.offsetLeft - x) * 0.3;
                    y += (nextDot.offsetTop - y) * 0.3;
                });
                
                requestAnimationFrame(animateTrail);
            };
            
            animateTrail();
        };
        
        // Enable cursor trail on desktop only
        if (window.innerWidth > 768) {
            createCursorTrail();
        }
