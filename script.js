document.querySelectorAll('.scroll-hint, .second-scroll-hint, .third-scroll-hint').forEach(hint => {
        hint.addEventListener('click', function() {
            const currentScreen = this.closest('.screen');
            const nextScreen = currentScreen.nextElementSibling;
            const prevScreen = currentScreen.previousElementSibling;
            if (this.classList.contains('third-scroll-hint')) {
                document.querySelector('.first-screen').scrollIntoView({ behavior: 'smooth' });
            }
            else if (nextScreen && nextScreen.classList.contains('screen')) {
                if (nextScreen.classList.contains('second-screen') && !nextScreen.classList.contains('animated')) {
                    activateSecondScreen(nextScreen);
                }
                if (nextScreen.classList.contains('third-screen') && !nextScreen.classList.contains('animated')) {
                    activateThirdScreen(nextScreen);
                }
                nextScreen.scrollIntoView({ behavior: 'smooth' });
            } else {
                document.querySelector('.first-screen').scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
    
    // Функция активации второго экрана
    function activateSecondScreen(screen) {
        if (!screen.classList.contains('animated')) {
            screen.classList.add('animated');
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
    
    // Функция активации третьего экрана
    function activateThirdScreen(screen) {
        if (!screen.classList.contains('animated')) {
            screen.classList.add('animated');
            setTimeout(() => {
            }, 1500); 
        }
    }
    
    // Автоматическая адаптация при изменении размера
    function adaptLayout() {
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
                const videoContainer = document.querySelector('.video-container');
                if (videoContainer) {
                    const currentHeight = parseFloat(window.getComputedStyle(videoContainer).height);
                    if (currentHeight > 100) {
                        videoContainer.style.height = (currentHeight * 0.9) + 'px';
                    }
                }
            }
        }
        const thirdScreen = document.querySelector('.third-screen');
        if (thirdScreen && thirdScreen.classList.contains('animated')) {
            const screenHeight = window.innerHeight;
            const screenContentHeight = thirdScreen.scrollHeight;
            if (screenContentHeight > screenHeight) {
                const treeMembers = document.querySelectorAll('.tree-member');
                treeMembers.forEach(member => {
                    const photo = member.querySelector('.tree-member-photo');
                    if (photo) {
                        const currentWidth = parseFloat(window.getComputedStyle(photo).width);
                        if (currentWidth > 30) {
                            photo.style.width = (currentWidth * 0.9) + 'px';
                            photo.style.height = (currentWidth * 0.9) + 'px';
                        }
                    }
                    const name = member.querySelector('.tree-member-name');
                    const username = member.querySelector('.tree-member-username');
                    if (name) {
                        const currentFontSize = parseFloat(window.getComputedStyle(name).fontSize);
                        if (currentFontSize > 0.5) {
                            name.style.fontSize = (currentFontSize * 0.9) + 'px';
                        }
                    }
                    if (username) {
                        const currentFontSize = parseFloat(window.getComputedStyle(username).fontSize);
                        if (currentFontSize > 0.45) {
                            username.style.fontSize = (currentFontSize * 0.9) + 'px';
                        }
                    }
                });
                const thirdDesc = document.querySelector('.third-description');
                if (thirdDesc) {
                    const currentFontSize = parseFloat(window.getComputedStyle(thirdDesc).fontSize);
                    if (currentFontSize > 0.6) {
                        thirdDesc.style.fontSize = (currentFontSize * 0.9) + 'px';
                    }
                }
                
                // Уменьшаем вертикальные отступы между уровнями дерева
                const treeLevels = document.querySelectorAll('.tree-level-2, .tree-level-3, .tree-level-4, .tree-level-5, .tree-level-6');
                treeLevels.forEach(level => {
                    const currentTop = parseFloat(window.getComputedStyle(level).top);
                    if (currentTop > 40) {
                        level.style.top = (currentTop * 0.9) + 'px';
                    }
                });
            }
        }
    }
    // Вызывается при загрузке и изменении размера окна
    window.addEventListener('load', adaptLayout);
    window.addEventListener('resize', adaptLayout);
    
    // Обработчик скролла для активации экранов
    let isScrolling = false;
    window.addEventListener('scroll', function() {
        if (!isScrolling) {
            window.requestAnimationFrame(function() {
                const secondScreen = document.querySelector('.second-screen');
                const thirdScreen = document.querySelector('.third-screen');
                const firstScreen = document.querySelector('.first-screen');
                const secondScreenRect = secondScreen?.getBoundingClientRect();
                const viewportHeight = window.innerHeight;
                if (secondScreen && !secondScreen.classList.contains('animated')) {
                    const firstScreenRect = firstScreen.getBoundingClientRect();
                    if (firstScreenRect.bottom < viewportHeight * 0.7) {
                        activateSecondScreen(secondScreen);
                    }
                }
                if (thirdScreen && !thirdScreen.classList.contains('animated') && secondScreenRect) {
                    if (secondScreenRect.bottom < viewportHeight * 0.7) {
                        activateThirdScreen(thirdScreen);
                    }
                }
                
                isScrolling = false;
            });
            
            isScrolling = true;
        }
    });
    // Активация экранов при загрузке, если пользователь уже проскроллил
    window.addEventListener('load', function() {
        const secondScreen = document.querySelector('.second-screen');
        const thirdScreen = document.querySelector('.third-screen');
        const firstScreen = document.querySelector('.first-screen');
        const secondScreenRect = secondScreen?.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        if (secondScreen && firstScreen) {
            const firstScreenRect = firstScreen.getBoundingClientRect();
            if (firstScreenRect.bottom < viewportHeight * 0.7) {
                activateSecondScreen(secondScreen);
                if (secondScreenRect && secondScreenRect.bottom < viewportHeight * 0.7) {
                    activateThirdScreen(thirdScreen);
                }
            }
        }
    });
