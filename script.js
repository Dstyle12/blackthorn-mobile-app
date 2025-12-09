 // Плавный скролл для подсказок
        document.querySelectorAll('.scroll-hint, .second-scroll-hint').forEach(hint => {
            hint.addEventListener('click', function() {
                // Находим следующий экран
                const currentScreen = this.closest('.screen');
                const nextScreen = currentScreen.nextElementSibling;
                
                if (nextScreen && nextScreen.classList.contains('screen')) {
                    // Запускаем анимации на следующем экране
                    if (nextScreen.classList.contains('second-screen') && !nextScreen.classList.contains('animated')) {
                        activateSecondScreen(nextScreen);
                    }
                    nextScreen.scrollIntoView({ behavior: 'smooth' });
                } else {
                    // Если следующего экрана нет, скроллим к началу
                    document.querySelector('.first-screen').scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
        
        // Функция активации второго экрана
        function activateSecondScreen(screen) {
            if (!screen.classList.contains('animated')) {
                screen.classList.add('animated');
                
                // Запускаем видео
                const video = screen.querySelector('video');
                if (video) {
                    video.loop = true;
                    video.muted = true;
                    video.playsInline = true;
                    video.play().catch(error => {
                        console.log("Автовоспроизведение видео заблокировано:", error);
                    });
                }
            }
        }
        
        // Автоматическая адаптация при изменении размера
        function adaptLayout() {
            // Для первого экрана
            const contentWrapper = document.querySelector('.content-wrapper');
            if (contentWrapper) {
                if (contentWrapper.scrollHeight > contentWrapper.clientHeight) {
                    const currentFontSize = parseFloat(window.getComputedStyle(document.querySelector('.description')).fontSize);
                    if (currentFontSize > 0.55) {
                        document.querySelectorAll('.description, .features-list li').forEach(el => {
                            const newSize = parseFloat(window.getComputedStyle(el).fontSize) * 0.95;
                            el.style.fontSize = newSize + 'px';
                        });
                    }
                }
            }
            
            // Для второго экрана
            const secondScreen = document.querySelector('.second-screen');
            if (secondScreen && secondScreen.classList.contains('animated')) {
                const screenHeight = window.innerHeight;
                const screenContentHeight = secondScreen.scrollHeight;
                
                if (screenContentHeight > screenHeight) {
                    const secondDesc = document.querySelector('.second-description');
                    if (secondDesc) {
                        const currentFontSize = parseFloat(window.getComputedStyle(secondDesc).fontSize);
                        if (currentFontSize > 0.55) {
                            document.querySelectorAll('.second-description').forEach(el => {
                                const newSize = parseFloat(window.getComputedStyle(el).fontSize) * 0.95;
                                el.style.fontSize = newSize + 'px';
                            });
                        }
                    }
                    
                    // Также уменьшаем видео, если нужно
                    const videoContainer = document.querySelector('.video-container');
                    if (videoContainer) {
                        const currentHeight = parseFloat(window.getComputedStyle(videoContainer).height);
                        if (currentHeight > 100) {
                            videoContainer.style.height = (currentHeight * 0.9) + 'px';
                        }
                    }
                }
            }
        }
        
        // Вызываем при загрузке и изменении размера окна
        window.addEventListener('load', adaptLayout);
        window.addEventListener('resize', adaptLayout);
        
        // Обработчик скролла для активации второго экрана
        let isScrolling = false;
        window.addEventListener('scroll', function() {
            if (!isScrolling) {
                window.requestAnimationFrame(function() {
                    const secondScreen = document.querySelector('.second-screen');
                    const firstScreen = document.querySelector('.first-screen');
                    
                    // Проверяем, находится ли второй экран в области видимости
                    if (secondScreen && !secondScreen.classList.contains('animated')) {
                        const firstScreenRect = firstScreen.getBoundingClientRect();
                        const viewportHeight = window.innerHeight;
                        
                        // Если первый экран почти прокручен
                        if (firstScreenRect.bottom < viewportHeight * 0.7) {
                            activateSecondScreen(secondScreen);
                        }
                    }
                    
                    isScrolling = false;
                });
                
                isScrolling = true;
            }
        });
        
        // Активация второго экрана при загрузке, если пользователь уже проскроллил
        window.addEventListener('load', function() {
            const secondScreen = document.querySelector('.second-screen');
            const firstScreen = document.querySelector('.first-screen');
            
            if (secondScreen && firstScreen) {
                const firstScreenRect = firstScreen.getBoundingClientRect();
                const viewportHeight = window.innerHeight;
                
                if (firstScreenRect.bottom < viewportHeight * 0.7) {
                    activateSecondScreen(secondScreen);
                }
            }
        });