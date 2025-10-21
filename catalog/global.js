// Enhanced Modal functionality for apartment selection with accessibility and error handling
document.addEventListener('DOMContentLoaded', function() {
    try {
        // Get modal elements
        const khrushchevkaModal = document.getElementById('khrushchevka-modal');
        const stalinkaModal = document.getElementById('stalinka-modal');
        const brezhnevkaModal = document.getElementById('brezhnevka-modal');
        const panelkaModal = document.getElementById('panelka-modal');
        const novostroykаModal = document.getElementById('novostroyka-modal');
        const customModal = document.getElementById('custom-modal');
        const khrushchevkaModalClose = document.getElementById('modal-close');
        const stalinkaModalClose = document.getElementById('stalinka-modal-close');
        const brezhnevkaModalClose = document.getElementById('brezhnevka-modal-close');
        const panelkaModalClose = document.getElementById('panelka-modal-close');
        const novostroykаModalClose = document.getElementById('novostroyka-modal-close');
        const customModalClose = document.getElementById('custom-modal-close');
        const khrushchevkaCard = document.querySelector('.feature-card:first-child');
        const stalinkaCard = document.querySelector('.feature-card:nth-child(2)');
        const brezhnevkaCard = document.querySelector('.feature-card:nth-child(3)');
        const panelkaCard = document.querySelector('.feature-card:nth-child(4)');
        const novostroykаCard = document.querySelector('.feature-card:nth-child(5)');
        const customCard = document.querySelector('.feature-card:nth-child(6)');
        
        // Current active modal reference
        let currentModal = null;
        let focusedElementBeforeModal = null;

        // Error handling function
        function handleError(error, context) {
            console.error(`Error in ${context}:`, error);
            // You can add user-friendly error notifications here
        }

        // Accessibility: Trap focus within modal
        function trapFocus(modal) {
            const focusableElements = modal.querySelectorAll(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            const firstFocusableElement = focusableElements[0];
            const lastFocusableElement = focusableElements[focusableElements.length - 1];

            modal.addEventListener('keydown', function(e) {
                if (e.key === 'Tab') {
                    if (e.shiftKey) {
                        if (document.activeElement === firstFocusableElement) {
                            lastFocusableElement.focus();
                            e.preventDefault();
                        }
                    } else {
                        if (document.activeElement === lastFocusableElement) {
                            firstFocusableElement.focus();
                            e.preventDefault();
                        }
                    }
                }
            });

            // Focus first element
            if (firstFocusableElement) {
                firstFocusableElement.focus();
            }
        }

        // Function to open modal with accessibility features
        function openModal(modal, cardType) {
            try {
                if (!modal) {
                    throw new Error(`Modal not found for ${cardType}`);
                }

                // Store currently focused element
                focusedElementBeforeModal = document.activeElement;
                
                // Set current modal
                currentModal = modal;
                
                // Add ARIA attributes
                modal.setAttribute('aria-hidden', 'false');
                modal.setAttribute('role', 'dialog');
                modal.setAttribute('aria-modal', 'true');
                modal.setAttribute('aria-labelledby', modal.querySelector('h2').id || 'modal-title');
                
                modal.style.display = 'flex';
                
                // Small delay to ensure display is set before adding show class
                setTimeout(() => {
                    modal.classList.add('show');
                    trapFocus(modal);
                }, 10);
                
                // Prevent body scroll when modal is open
                document.body.style.overflow = 'hidden';
                document.body.setAttribute('aria-hidden', 'true');
                
                console.log(`${cardType} modal opened successfully`);
            } catch (error) {
                handleError(error, `openModal for ${cardType}`);
            }
        }

        // Function to close modal with accessibility cleanup
        function closeModal(modal) {
            try {
                if (!modal) {
                    modal = currentModal;
                }
                
                if (!modal) {
                    throw new Error('No modal to close');
                }

                modal.classList.remove('show');
                modal.setAttribute('aria-hidden', 'true');
                
                // Wait for animation to complete before hiding
                setTimeout(() => {
                    modal.style.display = 'none';
                    document.body.style.overflow = 'auto';
                    document.body.removeAttribute('aria-hidden');
                    
                    // Restore focus to previously focused element
                    if (focusedElementBeforeModal) {
                        focusedElementBeforeModal.focus();
                        focusedElementBeforeModal = null;
                    }
                    
                    currentModal = null;
                }, 300);
                
                console.log('Modal closed successfully');
            } catch (error) {
                handleError(error, 'closeModal');
            }
        }

        // Enhanced apartment option selection handler
        function handleApartmentSelection(option, apartmentType) {
            try {
                const rooms = option.getAttribute('data-rooms');
                const type = option.getAttribute('data-type') || apartmentType;
                
                if (!rooms) {
                    throw new Error('Room count not specified');
                }

                console.log(`Выбрана ${rooms}-комнатная квартира типа ${type}`);
                
                // Add visual feedback with error handling
                const allOptions = document.querySelectorAll('.apartment-option');
                allOptions.forEach(opt => {
                    opt.style.backgroundColor = '';
                    opt.setAttribute('aria-selected', 'false');
                });
                
                // Highlight selected option
                let bgColor;
                switch (type) {
                    case 'stalinka':
                        bgColor = 'rgba(139, 69, 19, 0.3)';
                        break;
                    case 'brezhnevka':
                        bgColor = 'rgba(70, 130, 180, 0.3)';
                        break;
                    case 'panelka':
                        bgColor = 'rgba(128, 128, 128, 0.3)';
                        break;
                    case 'novostroyka':
                        bgColor = 'rgba(34, 139, 34, 0.3)';
                        break;
                    case 'custom':
                        bgColor = 'rgba(138, 43, 226, 0.3)';
                        break;
                    default:
                        bgColor = 'rgba(240, 152, 25, 0.3)';
                }
                option.style.backgroundColor = bgColor;
                option.setAttribute('aria-selected', 'true');
                
                // Announce selection to screen readers
                let typeText;
                switch (type) {
                    case 'stalinka':
                        typeText = 'сталинке';
                        break;
                    case 'brezhnevka':
                        typeText = 'брежневке';
                        break;
                    case 'panelka':
                        typeText = 'панельке';
                        break;
                    case 'novostroyka':
                        typeText = 'новостройке';
                        break;
                    case 'custom':
                        typeText = 'конструкторе своей квартиры';
                        break;
                    default:
                        typeText = 'хрущевке';
                }
                
                let announcement;
                if (type === 'custom') {
                    announcement = `Выбрана опция: ${option.querySelector('h3').textContent}`;
                } else {
                    announcement = `Выбрана ${rooms}-комнатная квартира в ${typeText}`;
                }
                const ariaLiveRegion = document.createElement('div');
                ariaLiveRegion.setAttribute('aria-live', 'polite');
                ariaLiveRegion.setAttribute('aria-atomic', 'true');
                ariaLiveRegion.style.position = 'absolute';
                ariaLiveRegion.style.left = '-10000px';
                ariaLiveRegion.textContent = announcement;
                document.body.appendChild(ariaLiveRegion);
                
                setTimeout(() => {
                    document.body.removeChild(ariaLiveRegion);
                }, 1000);
                
                // Handle selection with user feedback
                setTimeout(() => {
                    let alertMessage;
                    if (type === 'custom') {
                        alertMessage = `Вы выбрали: ${option.querySelector('h3').textContent}!`;
                    } else {
                        alertMessage = `Вы выбрали ${rooms}-комнатную квартиру в ${typeText}!`;
                    }
                    alert(alertMessage);
                    closeModal(currentModal);
                }, 500);
                
            } catch (error) {
                handleError(error, 'handleApartmentSelection');
            }
        }

        // Setup Khrushchevka card functionality
        if (khrushchevkaCard && khrushchevkaModal) {
            khrushchevkaCard.addEventListener('click', function(e) {
                e.preventDefault();
                openModal(khrushchevkaModal, 'Хрущевка');
            });

            // Add keyboard support
            khrushchevkaCard.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openModal(khrushchevkaModal, 'Хрущевка');
                }
            });

            // Ensure card is focusable
            khrushchevkaCard.setAttribute('tabindex', '0');
            khrushchevkaCard.setAttribute('role', 'button');
            khrushchevkaCard.setAttribute('aria-label', 'Открыть варианты планировок хрущевки');
        }

        // Setup Stalinka card functionality
        if (stalinkaCard && stalinkaModal) {
            stalinkaCard.addEventListener('click', function(e) {
                e.preventDefault();
                openModal(stalinkaModal, 'Сталинка');
            });

            // Add keyboard support
            stalinkaCard.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openModal(stalinkaModal, 'Сталинка');
                }
            });

            // Ensure card is focusable
            stalinkaCard.setAttribute('tabindex', '0');
            stalinkaCard.setAttribute('role', 'button');
            stalinkaCard.setAttribute('aria-label', 'Открыть варианты планировок сталинки');
        }

        // Setup Brezhnevka card functionality
        if (brezhnevkaCard && brezhnevkaModal) {
            brezhnevkaCard.addEventListener('click', function(e) {
                e.preventDefault();
                openModal(brezhnevkaModal, 'Брежневка');
            });

            // Add keyboard support
            brezhnevkaCard.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openModal(brezhnevkaModal, 'Брежневка');
                }
            });

            // Ensure card is focusable
            brezhnevkaCard.setAttribute('tabindex', '0');
            brezhnevkaCard.setAttribute('role', 'button');
            brezhnevkaCard.setAttribute('aria-label', 'Открыть варианты планировок брежневки');
        }

        // Setup Panelka card functionality
        if (panelkaCard && panelkaModal) {
            panelkaCard.addEventListener('click', function(e) {
                e.preventDefault();
                openModal(panelkaModal, 'Панелька');
            });

            // Add keyboard support
            panelkaCard.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openModal(panelkaModal, 'Панелька');
                }
            });

            // Ensure card is focusable
            panelkaCard.setAttribute('tabindex', '0');
            panelkaCard.setAttribute('role', 'button');
            panelkaCard.setAttribute('aria-label', 'Открыть варианты планировок панельки');
        }

        // Setup Novostroyka card functionality
        if (novostroykаCard && novostroykаModal) {
            novostroykаCard.addEventListener('click', function(e) {
                e.preventDefault();
                openModal(novostroykаModal, 'Новостройка');
            });

            // Add keyboard support
            novostroykаCard.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openModal(novostroykаModal, 'Новостройка');
                }
            });

            // Ensure card is focusable
            novostroykаCard.setAttribute('tabindex', '0');
            novostroykаCard.setAttribute('role', 'button');
            novostroykаCard.setAttribute('aria-label', 'Открыть варианты планировок новостройки');
        }

        // Setup Custom apartment card functionality
        if (customCard && customModal) {
            customCard.addEventListener('click', function(e) {
                e.preventDefault();
                openModal(customModal, 'Своя квартира');
            });

            // Add keyboard support
            customCard.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openModal(customModal, 'Своя квартира');
                }
            });

            // Ensure card is focusable
            customCard.setAttribute('tabindex', '0');
            customCard.setAttribute('role', 'button');
            customCard.setAttribute('aria-label', 'Открыть конструктор своей квартиры');
        }

        // Setup close button functionality
        [khrushchevkaModalClose, stalinkaModalClose, brezhnevkaModalClose, panelkaModalClose, novostroykаModalClose, customModalClose].forEach(closeBtn => {
            if (closeBtn) {
                closeBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    closeModal();
                });
                
                // Add accessibility attributes
                closeBtn.setAttribute('aria-label', 'Закрыть модальное окно');
            }
        });

        // Close modal when clicking outside modal content
        [khrushchevkaModal, stalinkaModal, brezhnevkaModal, panelkaModal, novostroykаModal, customModal].forEach(modal => {
            if (modal) {
                modal.addEventListener('click', function(e) {
                    if (e.target === modal) {
                        closeModal(modal);
                    }
                });
            }
        });

        // Handle apartment option selections
        const allApartmentOptions = document.querySelectorAll('.apartment-option');
        allApartmentOptions.forEach(function(option) {
            option.addEventListener('click', function() {
                const apartmentType = this.getAttribute('data-type') || 'khrushchevka';
                handleApartmentSelection(this, apartmentType);
            });

            // Add keyboard support for options
            option.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    const apartmentType = this.getAttribute('data-type') || 'khrushchevka';
                    handleApartmentSelection(this, apartmentType);
                }
            });

            // Ensure options are focusable and accessible
            option.setAttribute('tabindex', '0');
            option.setAttribute('role', 'button');
            option.setAttribute('aria-selected', 'false');
        });

        // Global keyboard event handlers
        document.addEventListener('keydown', function(e) {
            try {
                // Close modal on Escape key press
                if (e.key === 'Escape' && currentModal && currentModal.classList.contains('show')) {
                    closeModal(currentModal);
                }
            } catch (error) {
                handleError(error, 'global keydown handler');
            }
        });

        console.log('Apartment selection functionality initialized successfully');
        
    } catch (error) {
        handleError(error, 'DOMContentLoaded initialization');
    }
});

        // Simplified Floor plan interactive functionality
        const floorPlanImage = document.getElementById('floor-plan-image');
        const floorPlanMenu = document.getElementById('floor-plan-menu');
        const planHomeButton = document.getElementById('plan-home-btn');

        console.log('Floor plan elements initialization:', {
            image: !!floorPlanImage,
            menu: !!floorPlanMenu,
            button: !!planHomeButton
        });

        // Function to show floor plan menu
        function showFloorPlanMenu() {
            try {
                if (floorPlanMenu) {
                    console.log('Showing floor plan menu...');
                    floorPlanMenu.style.display = 'flex';
                    setTimeout(() => {
                        floorPlanMenu.classList.add('show');
                        console.log('Floor plan menu opened successfully with smooth animation');
                    }, 10);
                }
            } catch (error) {
                handleError(error, 'showFloorPlanMenu');
            }
        }

        // Function to hide floor plan menu
        function hideFloorPlanMenu() {
            try {
                if (floorPlanMenu) {
                    console.log('Hiding floor plan menu...');
                    floorPlanMenu.classList.remove('show');
                    setTimeout(() => {
                        floorPlanMenu.style.display = 'none';
                        console.log('Floor plan menu closed successfully');
                    }, 300);
                }
            } catch (error) {
                handleError(error, 'hideFloorPlanMenu');
            }
        }

        // Function for smooth scroll to top
        function smoothScrollToTop() {
            try {
                console.log('Initiating smooth scroll to top of page...');
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                console.log('Smooth scroll to top initiated successfully');
            } catch (error) {
                handleError(error, 'smoothScrollToTop');
            }
        }

        // Setup floor plan image functionality
        if (floorPlanImage && floorPlanMenu) {
            console.log('Setting up floor plan image click handler...');
            
            // Click to show menu
            floorPlanImage.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log('Floor plan image clicked - showing menu');
                showFloorPlanMenu();
            });

            // Add keyboard support
            floorPlanImage.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    console.log('Floor plan image activated via keyboard');
                    showFloorPlanMenu();
                }
            });

            // Ensure image is focusable
            floorPlanImage.setAttribute('tabindex', '0');
            floorPlanImage.setAttribute('role', 'button');
            floorPlanImage.setAttribute('aria-label', 'Интерактивный план этажа - кликните для открытия меню');
        }

        // Setup plan home button functionality
        if (planHomeButton) {
            console.log('Setting up plan home button with scroll functionality...');
            
            planHomeButton.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log('Plan home button clicked - executing scroll to top');
                
                // Add visual feedback
                this.style.background = 'linear-gradient(135deg, rgba(220, 20, 60, 0.9) 0%, rgba(255, 69, 0, 0.9) 100%)';
                
                // Hide menu and scroll to top
                setTimeout(() => {
                    hideFloorPlanMenu();
                    smoothScrollToTop();
                }, 200);
            });

            // Add keyboard support
            planHomeButton.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    console.log('Plan home button activated via keyboard');
                    this.click();
                }
            });

            // Ensure button is accessible
            planHomeButton.setAttribute('tabindex', '0');
            planHomeButton.setAttribute('role', 'button');
            planHomeButton.setAttribute('aria-label', 'План дома - плавный переход к началу страницы');
        }

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            try {
                if (floorPlanMenu && floorPlanMenu.classList.contains('show')) {
                    if (!floorPlanMenu.contains(e.target) && e.target !== floorPlanImage) {
                        console.log('Clicking outside floor plan menu - closing menu');
                        hideFloorPlanMenu();
                    }
                }
            } catch (error) {
                handleError(error, 'document click handler for floor plan');
            }
        });

        console.log('Floor plan interactive functionality initialized successfully');