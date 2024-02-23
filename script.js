// Создайте интерактивную веб-страницу для оставления и просмотра
// отзывов о продуктах. Пользователи могут добавлять отзывы о различных
// продуктах и просматривать добавленные отзывы.

// Страница добавления отзыва:

// Поле для ввода названия продукта.
// Текстовое поле для самого отзыва.
// Кнопка "Добавить отзыв", которая сохраняет отзыв о
// продукте в LocalStorage.

// Страница просмотра отзывов:

// Показывает список всех продуктов, о которых были
// оставлены отзывы.
// При клике на название продукта отображается список всех
// отзывов по этому продукту.
// Возможность удаления отзыва (при нажатии на кнопку "Удалить"
// рядом с отзывом, данный отзыв удаляется из LocalStorage).

const productListEl = document.getElementById('products-list');

function addReview(product, review) {
    const productEl = document.createElement('li');
    productEl.innerHTML = `
        <h3>${product}</h3>
        <p>${review}</p>
        <button class="delete-review-btn">Удалить</button>
    `;

    productEl.querySelector('.delete-review-btn').addEventListener('click', () => {
        // Удаляем отзыв из LocalStorage
        localStorage.removeItem(product);

        // Удаляем элемент из списка
        productListEl.removeChild(productEl);
    });

    productListEl.appendChild(productEl);
}

document.getElementById('add-review-form').addEventListener('submit', (event) => {
    event.preventDefault();

    const product = event.target.elements['product-name'].value;
    const review = event.target.elements['review-text'].value;

    // Сохраняем отзыв в LocalStorage
    localStorage.setItem(product, review);

    // Очищаем поля ввода
    event.target.elements['product-name'].value = '';
    event.target.elements['review-text'].value = '';

    addReview(product, review);
});

// При загрузке страницы отображаем все отзывы из LocalStorage
for (let i = 0; i < localStorage.length; i++) {
    const product = localStorage.key(i);
    const review = localStorage.getItem(product);

    addReview(product, review);
}