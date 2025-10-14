// Dropdown menu functionality
export function initializeDropdown() {
    const affichageButton = document.getElementById('link-affichage');
    const dropdownContainer = document.querySelector('.dropdown-container');

    if (affichageButton && dropdownContainer) {
        let clickCount = 0;
        let clickTimer = null;

        affichageButton.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            clickCount++;

            if (clickCount === 1) {
                clickTimer = setTimeout(() => {
                    dropdownContainer.classList.toggle('active');
                    clickCount = 0;
                }, 300);
            } else if (clickCount === 2) {
                clearTimeout(clickTimer);
                clickCount = 0;
            }
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!affichageButton.contains(e.target) && !dropdownContainer.contains(e.target)) {
                dropdownContainer.classList.remove('active');
            }
        });

        // Close dropdown when a dropdown item is clicked
        document.querySelectorAll('.dropdown-signage').forEach(item => {
            item.addEventListener('click', (e) => {
                e.stopPropagation();
                dropdownContainer.classList.remove('active');
            });
        });
    }
}