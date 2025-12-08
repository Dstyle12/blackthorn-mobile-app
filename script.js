// Плавный скролл для подсказки
        document.querySelector('.scroll-hint').addEventListener('click', function() {
            window.scrollTo({
                top: window.innerHeight,
                behavior: 'smooth'
            });
        });
        
        // Автоматическая адаптация при изменении размера
        function adaptLayout() {
            const contentWrapper = document.querySelector('.content-wrapper');
            
            // Если контент не помещается по высоте, уменьшаем размеры
            if (contentWrapper.scrollHeight > contentWrapper.clientHeight) {
                const currentFontSize = parseFloat(window.getComputedStyle(document.querySelector('.description')).fontSize);
                if (currentFontSize > 0.7) {
                    document.querySelectorAll('.description, .features-list li').forEach(el => {
                        const newSize = parseFloat(window.getComputedStyle(el).fontSize) * 0.95;
                        el.style.fontSize = newSize + 'px';
                    });
                }
            }
            
            // Определяем ориентацию
            const isLandscape = window.innerWidth > window.innerHeight;
            
            // Для ландшафтной ориентации настраиваем дополнительные параметры
            if (isLandscape) {
                document.querySelector('.content-wrapper').style.maxHeight = 'calc(100vh - 50px)';
            }
        }
        
        // Вызываем при загрузке и изменении размера окна
        window.addEventListener('load', adaptLayout);
        window.addEventListener('resize', adaptLayout);