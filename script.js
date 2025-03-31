document.addEventListener('DOMContentLoaded', function() {
    const yesBtn = document.getElementById('yes-btn');
    const noBtn = document.getElementById('no-btn');
    const reasonsList = document.getElementById('reasons-list');
    const buttonsContainer = document.querySelector('.buttons');
    const container = document.querySelector('.container');
    
    // Create thank you message element
    const thankYouSection = document.createElement('div');
    thankYouSection.classList.add('card', 'thank-you-card');
    thankYouSection.innerHTML = `
        <div class="heart-container">
            <i class="fas fa-heart heart-icon"></i>
        </div>
        <p class="script-text special-font">Thank you!</p>
        <p>Thank you for forgiving me! ❤️</p>
        <p>I promise to make it up to you and be more considerate in the future.</p>
        <p>Your forgiveness means the world to me.</p>
        <div class="back-link">
            <button class="back-button" onclick="window.location.reload()">Back to letter</button>
        </div>
    `;
    thankYouSection.style.display = 'none';
    container.appendChild(thankYouSection);

    // Make the "Yes" button show thank you message when clicked
    yesBtn.addEventListener('click', function() {
        // Fade out all current content
        const allCards = document.querySelectorAll('.card:not(.thank-you-card)');
        allCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transition = 'opacity 1s ease';
        });
        
        // After fadeout, hide all cards and show thank you
        setTimeout(() => {
            allCards.forEach(card => {
                card.style.display = 'none';
            });
            
            // Show thank you message at the top
            thankYouSection.style.display = 'block';
            thankYouSection.style.opacity = '0';
            
            // Slide in and fade in animation
            setTimeout(() => {
                thankYouSection.style.opacity = '1';
                thankYouSection.style.transition = 'opacity 1s ease';
                
                // Create heart explosion animation
                createHeartExplosion();
            }, 100);
        }, 1000);
    });

    // Handle No button hover - make it vanish and Yes button center
    noBtn.addEventListener('mouseover', function() {
        // Make No button disappear
        this.style.opacity = '0';
        setTimeout(() => {
            this.style.visibility = 'hidden';

            // Center the Yes button
            buttonsContainer.style.justifyContent = 'center';

            // Move No button to random position for next appearance
            moveNoButtonToRandomPosition();
        }, 300);
    });

    // Make No button sometimes act like Yes button (20% chance)
    noBtn.addEventListener('click', function() {
        // 20% chance of treating "No" as "Yes"
        if (Math.random() < 0.2) {
            // Trigger the same behavior as Yes button
            yesBtn.click();
        } else {
            // Otherwise just make it vanish and reappear at random location
            this.style.opacity = '0';
            setTimeout(() => {
                this.style.visibility = 'hidden';
                moveNoButtonToRandomPosition();

                // Make it reappear at new position
                setTimeout(() => {
                    this.style.visibility = 'visible';
                    this.style.opacity = '1';
                }, 500);
            }, 300);
        }
    });

    // Function to move No button to random position
    function moveNoButtonToRandomPosition() {
        // Calculate safe areas (not too close to edges)
        const maxX = window.innerWidth - 150;
        const maxY = window.innerHeight - 100;

        // Random position within the viewport
        const randomX = Math.max(50, Math.floor(Math.random() * maxX));
        const randomY = Math.max(50, Math.floor(Math.random() * maxY));

        // Set the button's position
        noBtn.style.position = 'fixed';
        noBtn.style.left = `${randomX}px`;
        noBtn.style.top = `${randomY}px`;
        noBtn.style.zIndex = '1000';
    }

    // Add CSS transitions for smooth animations
    yesBtn.style.transition = 'all 0.3s ease';
    noBtn.style.transition = 'opacity 0.3s ease, left 0s, top 0s';

    // Optional: Add more reasons dynamically
    const additionalReasons = [
        "The way your eyes light up when you laugh",
        "How you always support me",
        "Your amazing sense of humor",
        "The cute way you get excited about little things",
        "How passionate you are about what you love"
    ];

    // Function to add a reason with animation
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

            // Schedule the next reason if any remain
            if (additionalReasons.length > 0) {
                setTimeout(addReason, 5000);
            }
        }
    }

    // Start adding reasons after 10 seconds
    setTimeout(addReason, 10000);

    function createHeartExplosion() {
        const container = document.querySelector('.container');

        for (let i = 0; i < 50; i++) {
            const heart = document.createElement('i');
            heart.classList.add('fas', 'fa-heart');
            heart.style.color = '#ff6b8b';
            heart.style.position = 'absolute';
            heart.style.left = '50%';
            heart.style.top = '50%';
            heart.style.fontSize = `${Math.random() * 20 + 10}px`;

            const angle = Math.random() * Math.PI * 2;
            const distance = Math.random() * 200 + 50;
            const duration = Math.random() * 2 + 1;

            heart.style.transform = 'translate(-50%, -50%)';
            heart.style.opacity = '0';

            heart.style.animation = `
                explode ${duration}s forwards,
                fadeOut ${duration}s forwards
            `;

            heart.style.animationTimingFunction = 'ease-out';

            const keyframes = `
            @keyframes explode {
                to {
                    transform: translate(
                        calc(-50% + ${Math.cos(angle) * distance}px),
                        calc(-50% + ${Math.sin(angle) * distance}px)
                    );
                }
            }

            @keyframes fadeOut {
                0% { opacity: 1; }
                80% { opacity: 1; }
                100% { opacity: 0; }
            }`;

            const style = document.createElement('style');
            style.innerHTML = keyframes;
            document.head.appendChild(style);

            container.appendChild(heart);

            // Remove hearts after animation
            setTimeout(() => {
                heart.remove();
                style.remove();
            }, duration * 1000);
        }
    }
});
