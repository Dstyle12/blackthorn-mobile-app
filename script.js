document.querySelectorAll('.scroll-hint, .second-scroll-hint').forEach(hint => {
            hint.addEventListener('click', function() {
                // Находим следующий экран
                const currentScreen = this.closest('.screen');
                const nextScreen = currentScreen.nextElementSibling;
                
                if (nextScreen && nextScreen.classList.contains('screen')) {
                    nextScreen.scrollIntoView({ behavior: 'smooth' });
                } else {
                    // Если следующего экрана нет, скроллим к началу
                    document.querySelector('.first-screen').scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
        
        // Автоматическая адаптация при изменении размера
        function adaptLayout() {
            const contentWrapper = document.querySelector('.content-wrapper');
            
            // Для первого экрана
            if (contentWrapper) {
                if (contentWrapper.scrollHeight > contentWrapper.clientHeight) {
                    const currentFontSize = parseFloat(window.getComputedStyle(document.querySelector('.description')).fontSize);
                    if (currentFontSize > 0.7) {
                        document.querySelectorAll('.description, .features-list li').forEach(el => {
                            const newSize = parseFloat(window.getComputedStyle(el).fontSize) * 0.95;
                            el.style.fontSize = newSize + 'px';
                        });
                    }
                }
            }
            
            // Для второго экрана
            const secondScreen = document.querySelector('.second-screen');
            if (secondScreen) {
                const screenHeight = window.innerHeight;
                const screenContentHeight = secondScreen.scrollHeight;
                
                if (screenContentHeight > screenHeight) {
                    const secondDesc = document.querySelector('.second-description');
                    if (secondDesc) {
                        const currentFontSize = parseFloat(window.getComputedStyle(secondDesc).fontSize);
                        if (currentFontSize > 0.7) {
                            document.querySelectorAll('.second-description').forEach(el => {
                                const newSize = parseFloat(window.getComputedStyle(el).fontSize) * 0.95;
                                el.style.fontSize = newSize + 'px';
                            });
                        }
                    }
                }
            }
        }
        
        // Вызываем при загрузке и изменении размера окна
        window.addEventListener('load', adaptLayout);
        window.addEventListener('resize', adaptLayout);
        
        // Управление видео
        document.addEventListener('DOMContentLoaded', function() {
            const video = document.querySelector('video');
            if (video) {
                // Устанавливаем видео на автоматическое воспроизведение в цикле
                video.autoplay = true;
                video.muted = true;
                video.loop = true;
                video.playsInline = true;
                
                // Принудительно запускаем воспроизведение (для мобильных устройств)
                video.play().catch(error => {
                    console.log("Автовоспроизведение видео заблокировано:", error);
                });
                
                // Перезапускаем видео при его завершении (дополнительная страховка)
                video.addEventListener('ended', function() {
                    this.currentTime = 0;
                    this.play();
                });
            }
        });