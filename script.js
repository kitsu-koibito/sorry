document.addEventListener('DOMContentLoaded', function() {
    const yesBtn = document.getElementById('yes-btn');
    const noBtn = document.getElementById('no-btn');
    const reasonsList = document.getElementById('reasons-list');
    const reasonsCard = document.getElementById('reasons-card');
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
        <p>Thank you so much for forgiving me! ❤️</p>
        <p>I promise to be more considerate in the future.</p>
        <p>Your forgiveness means the world to me.</p>
        <div class="back-link">
            <button class="back-button" onclick="window.location.reload()">Back to the letter 💌</button>
        </div>
    `;
    thankYouSection.style.display = 'none';
    container.appendChild(thankYouSection);

    // Remove the mouseenter event listener - we don't want the reasons card to show on hover
    // Instead, only show it after the Yes button is clicked

    // Make the "Yes" button show thank you message and reasons card when clicked
    yesBtn.addEventListener('click', function() {
        // Fade out all current content except for the thank-you-card
        const allCards = document.querySelectorAll('.card:not(.thank-you-card)');
        allCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transition = 'opacity 0.5s ease';
        });
        
        // After fadeout, show thank you message and reasons card
        setTimeout(() => {
            // Hide forgive card and main card
            document.querySelector('.forgive-card').style.display = 'none';
            document.querySelector('.main-card').style.display = 'none';
            
            // Remove reasonsCard from its current position
            if (reasonsCard.parentNode) {
                reasonsCard.parentNode.removeChild(reasonsCard);
            }
            
            // Show thank you message at the top
            thankYouSection.style.display = 'block';
            thankYouSection.style.opacity = '0';
            
            // Insert reasons card after thank you section
            thankYouSection.after(reasonsCard);
            reasonsCard.style.display = 'block';
            reasonsCard.style.opacity = '0';
            
            // Animate them in
            requestAnimationFrame(() => {
                thankYouSection.style.opacity = '1';
                thankYouSection.style.transition = 'opacity 0.5s ease';
                
                // Slightly delay the reasons card appearance for a nice effect
                setTimeout(() => {
                    reasonsCard.style.opacity = '1';
                    reasonsCard.style.transition = 'opacity 0.5s ease';
                }, 300);
            });
        }, 500);
    });

    // Handle No button hover - make it vanish and Yes button center
    noBtn.addEventListener('mouseover', function() {
        // Make No button disappear faster
        this.style.opacity = '0';
        this.style.transition = 'opacity 0.2s ease'; // Reduced from 0.3s to 0.2s
        
        setTimeout(() => {
            this.style.visibility = 'hidden';
            
            // Center the Yes button
            buttonsContainer.style.justifyContent = 'center';
            
            // Move No button to random position for next appearance
            moveNoButtonToRandomPosition();
        }, 200); // Reduced from 300ms to 200ms
    });

    // Make No button sometimes act like Yes button (20% chance)
    noBtn.addEventListener('click', function() {
        // 20% chance of treating "No" as "Yes"
        if (Math.random() < 0.2) {
            // Create transition effect before triggering yes button
            document.body.style.opacity = '0.8'; // Less fading
            document.body.style.transition = 'opacity 0.3s ease'; // Shorter transition
            
            // Wait for shorter transition then click yes
            setTimeout(() => {
                document.body.style.opacity = '1';
                yesBtn.click();
            }, 300); // Reduced from 1000ms to 300ms
        } else {
            // Otherwise just make it vanish and reappear at random location
            this.style.opacity = '0';
            this.style.transition = 'opacity 0.2s ease'; // Shorter fade
            
            setTimeout(() => {
                this.style.visibility = 'hidden';
                moveNoButtonToRandomPosition();
                
                // Make it reappear at new position faster
                setTimeout(() => {
                    this.style.visibility = 'visible';
                    this.style.opacity = '1';
                }, 300); // Reduced from 500ms to 300ms
            }, 200); // Reduced from 300ms to 200ms
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

    // Add CSS transitions for smooth but faster animations
    yesBtn.style.transition = 'all 0.2s ease'; // Reduced from 0.3s to 0.2s
    noBtn.style.transition = 'opacity 0.2s ease, left 0s, top 0s'; // Reduced from 0.3s to 0.2s

    // Optional: Add more reasons dynamically
    const additionalReasons = [
        "How you always know how to make me smile",
        "How you always support me",
        "Your amazing sense of humor",
        "The cute way you get excited about little things",
        "How passionate you are about what you love",
        "Your kindness to everyone around you",
        "How you always make time for me",
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
                setTimeout(addReason, 2000);
            }
        }
    }

    // Start adding reasons after 10 seconds
    setTimeout(addReason, 10000);

    // Enhanced dark mode toggle with some preferences saving
    // Update to use the new darkmode-toggle ID instead of dark-mode-toggle
    const toggleCheckbox = document.getElementById('darkmode-toggle');

    // Check if user previously enabled dark mode
    if (localStorage.getItem('darkMode') === 'enabled') {
        document.body.classList.add('dark-mode');
        toggleCheckbox.checked = true;
    }

    toggleCheckbox.addEventListener('change', () => {
        if (toggleCheckbox.checked) {
            document.body.classList.add('dark-mode');
            localStorage.setItem('darkMode', 'enabled');
        } else {
            document.body.classList.remove('dark-mode');
            localStorage.setItem('darkMode', 'disabled');
        }
    });
});
