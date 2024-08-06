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

        // Create card actions container
        const cardActions = document.createElement('div');
        cardActions.classList.add('card-actions');

        // Create remove button
        const removeButton = document.createElement('button');
        removeButton.classList.add('remove-btn');
        removeButton.textContent = 'Remove';

        // Create favorite button
        const favButton = document.createElement('button');
        favButton.classList.add('fav-btn');
        favButton.textContent = 'Favorite';

        cardActions.appendChild(removeButton);
        cardActions.appendChild(favButton);
        newCard.querySelector('.card').appendChild(cardActions);

        gridContainer.appendChild(newCard);
        initializeCardActions(newCard, cardActions);
    };

    cardsData.forEach(data => {
        createCard(data);
    });

    const updateCardCounter = () => {
        const totalCards = document.querySelectorAll('.card').length;
        document.getElementById('card-counter').textContent = `Total Cards: ${totalCards}`;
    };

    const initializeCardActions = (card, cardActions) => {
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

        const favButton = cardActions.querySelector('.fav-btn');
        favButton.addEventListener('click', () => {
            card.querySelector('.card-inner').classList.toggle('favorite');
        });

        const removeButton = cardActions.querySelector('.remove-btn');
        removeButton.addEventListener('click', () => {
            card.remove();
            updateCardCounter();
        });

        card.querySelector('.card-inner').addEventListener('dblclick', () => {
            card.querySelector('.card-back').classList.toggle('expanded');
        });
    };

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
            if (!card.querySelector('.card-inner').classList.contains('favorite')) {
                card.style.display = 'none';
            } else {
                card.style.display = 'block';
            }
        });
    });

    updateCardCounter();
});