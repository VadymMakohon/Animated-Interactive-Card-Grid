document.addEventListener('DOMContentLoaded', () => {
    const cardsData = [
        { title: "Card 1", details: "More information about card 1." },
        { title: "Card 2", details: "More information about card 2." },
        { title: "Card 3", details: "More information about card 3." },
        { title: "Card 4", details: "More information about card 4." },
        { title: "Card 5", details: "More information about card 5." }
    ];

    const gridContainer = document.querySelector('.grid-container');
    const cardTemplate = document.getElementById('card-template').content;

    const createCard = (data) => {
        const newCard = cardTemplate.cloneNode(true);
        newCard.querySelector('.card-front h2').textContent = data.title;
        newCard.querySelector('.card-back p').textContent = data.details;
        gridContainer.appendChild(newCard);
    };

    cardsData.forEach(data => {
        createCard(data);
    });

    const updateCardCounter = () => {
        const totalCards = document.querySelectorAll('.card').length;
        document.getElementById('card-counter').textContent = `Total Cards: ${totalCards}`;
    };

    document.querySelectorAll('.card').forEach(card => {
        card.setAttribute('draggable', true);

        card.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', e.target.id);
        });

        card.addEventListener('dragover', (e) => {
            e.preventDefault();
        });

        card.addEventListener('drop', (e) => {
            e.preventDefault();
            const id = e.dataTransfer.getData('text/plain');
            const draggable = document.getElementById(id);
            e.target.closest('.grid-container').insertBefore(draggable, e.target.closest('.card'));
        });

        const favButton = card.querySelector('.fav-btn');
        favButton.addEventListener('click', () => {
            card.classList.toggle('favorite');
        });

        const removeButton = card.querySelector('.remove-btn');
        removeButton.addEventListener('click', () => {
            card.remove();
            updateCardCounter();
        });

        card.addEventListener('dblclick', () => {
            card.querySelector('.card-back').classList.toggle('expanded');
        });
    });

    const searchInput = document.getElementById('search-input');

    searchInput.addEventListener('input', (e) => {
        const searchValue = e.target.value.toLowerCase();
        document.querySelectorAll('.card').forEach(card => {
            const title = card.querySelector('.card-front h2').textContent.toLowerCase();
            if (title.includes(searchValue)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });

    const filterFavoritesButton = document.getElementById('filter-favorites');

    filterFavoritesButton.addEventListener('click', () => {
        document.querySelectorAll('.card').forEach(card => {
            if (!card.classList.contains('favorite')) {
                card.style.display = 'none';
            } else {
                card.style.display = 'block';
            }
        });
    });

    updateCardCounter();
});
