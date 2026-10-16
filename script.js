document.addEventListener('DOMContentLoaded', function() {
    const yesBtn = document.getElementById('yes-btn');
    const noBtn = document.getElementById('no-btn');
    const reasonsList = document.getElementById('reasons-list');
    const reasonsCard = document.getElementById('reasons-card');
    const buttonsContainer = document.querySelector('.buttons');
    const container = document.querySelector('.container');

    const thankYouSection = document.createElement('div');
    thankYouSection.classList.add('card', 'thank-you-card');
    thankYouSection.innerHTML = `
        <div class="heart-container">
            <i class="fas fa-heart heart-icon"></i>
        </div>
        <p class="script-text special-font">Thank you!</p>
        <p>Thank you so much for forgiving me! ❤️</p>
        <p>I promise to be more considerate in the future.</p>
        <p>Your forgiveness means the world to me.</p>
        <div class="back-link">
            <button class="back-button" onclick="window.location.reload()">Back to the letter 💌</button>
        </div>
    `;
    thankYouSection.style.display = 'none';
    container.appendChild(thankYouSection);

    yesBtn.addEventListener('click', function() {
        const allCards = document.querySelectorAll('.card:not(.thank-you-card)');
        allCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transition = 'opacity 0.5s ease';
        });

        setTimeout(() => {
            document.querySelector('.forgive-card').style.display = 'none';
            document.querySelector('.main-card').style.display = 'none';

            if (reasonsCard.parentNode) {
                reasonsCard.parentNode.removeChild(reasonsCard);
            }

            thankYouSection.style.display = 'block';
            thankYouSection.style.opacity = '0';

            thankYouSection.after(reasonsCard);
            reasonsCard.style.display = 'block';
            reasonsCard.style.opacity = '0';

            requestAnimationFrame(() => {
                thankYouSection.style.opacity = '1';
                thankYouSection.style.transition = 'opacity 0.5s ease';

                setTimeout(() => {
                    reasonsCard.style.opacity = '1';
                    reasonsCard.style.transition = 'opacity 0.5s ease';
                }, 300);
            });
        }, 500);
    });

    noBtn.addEventListener('mouseover', function() {
        this.style.opacity = '0';
        this.style.transition = 'opacity 0.2s ease';
        
        setTimeout(() => {
            this.style.visibility = 'hidden';

            buttonsContainer.style.justifyContent = 'center';

            moveNoButtonToRandomPosition();
        }, 200);
    });

    noBtn.addEventListener('click', function() {

        if (Math.random() < 0.2) {
            document.body.style.opacity = '0.8';
            document.body.style.transition = 'opacity 0.3s ease';

            setTimeout(() => {
                document.body.style.opacity = '1';
                yesBtn.click();
            }, 300);
        } else {
            this.style.opacity = '0';
            this.style.transition = 'opacity 0.2s ease';
            
            setTimeout(() => {
                this.style.visibility = 'hidden';
                moveNoButtonToRandomPosition();

                setTimeout(() => {
                    this.style.visibility = 'visible';
                    this.style.opacity = '1';
                }, 300);
            }, 200);
        }
    });

    function moveNoButtonToRandomPosition() {
        const maxX = window.innerWidth - 150;
        const maxY = window.innerHeight - 100;

        const randomX = Math.max(50, Math.floor(Math.random() * maxX));
        const randomY = Math.max(50, Math.floor(Math.random() * maxY));

        noBtn.style.position = 'fixed';
        noBtn.style.left = `${randomX}px`;
        noBtn.style.top = `${randomY}px`;
        noBtn.style.zIndex = '1000';
    }

    yesBtn.style.transition = 'all 0.2s ease';
    noBtn.style.transition = 'opacity 0.2s ease, left 0s, top 0s';

    const additionalReasons = [
        "How you always know how to make me smile",
        "How you always support me",
        "Your amazing sense of humor",
        "The cute way you get excited about little things",
        "How passionate you are about what you love",
        "Your kindness to everyone around you",
        "How you always make time for me",
    ];

    function addReason() {
        if (additionalReasons.length > 0) {
            const newReason = document.createElement('li');
            newReason.textContent = additionalReasons.shift();
            newReason.style.opacity = '0';
            reasonsList.appendChild(newReason);

            setTimeout(() => {
                newReason.style.transition = 'opacity 1s';
                newReason.style.opacity = '1';
            }, 100);

            if (additionalReasons.length > 0) {
                setTimeout(addReason, 2000);
            }
        }
    }

    setTimeout(addReason, 10000);

    const toggleCheckbox = document.getElementById('darkmode-toggle');

    const themeRoot = document.documentElement;

    toggleCheckbox.addEventListener('change', () => {
        if (toggleCheckbox.checked) {
            themeRoot.classList.add('dark-mode');
            localStorage.setItem('darkMode', 'enabled');
        } else {
            themeRoot.classList.remove('dark-mode');
            localStorage.setItem('darkMode', 'disabled');
        }
    });
});
