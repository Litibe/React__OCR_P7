const closeModal = () => {
    const modal = document.getElementById('recipe_modal');
    modal.style.display = 'none';
    // enable tabindex into DOM
    const allTabIndexModal = document.querySelectorAll("[tabindex='0']");
    allTabIndexModal.forEach((item) => item.setAttribute('tabindex', '-3'));
    const allTabIndexHeader = document.querySelectorAll("[tabindex='-1']");
    allTabIndexHeader.forEach((item) => item.setAttribute('tabindex', '0'));
};

const navigationKeyModal = (event) => {
    if (event.key === 'Escape') {
        closeModal();
    }
};

const displayModal = () => {
    const modal = document.getElementById('recipe_modal');
    modal.style.display = 'block';
    document.addEventListener('keydown', (e) => navigationKeyModal(e));
    // disable tabindex into DOM
    const allTabIndexHeader = document.querySelectorAll("[tabindex='0']");
    allTabIndexHeader.forEach((item) => item.setAttribute('tabindex', '-1'));
    const allTabIndexModal = document.querySelectorAll("[tabindex='-3']");
    allTabIndexModal.forEach((item) => item.setAttribute('tabindex', '0'));
};
