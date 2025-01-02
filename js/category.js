const categoryDataLoad = () => {
    fetch('https://openapi.programming-hero.com/api/peddy/categories')
        .then((res) => res.json())
        .then((data) => displayCategoryData(data.categories))
        .catch((error) => {
            console.error("Error fetching category data:", error);
        });
};

const removeActiveClass = () => {
    const buttons = document.getElementsByClassName('category-btn');
    for (let btn of buttons) {
        btn.classList.remove('active');
    }
};

const logCategoryPets = (category, id) => {
    fetch(`https://openapi.programming-hero.com/api/peddy/category/${category}`)
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            
            removeActiveClass();
            
            const activeBtn = document.getElementById(`btn-${id}`);
            if (activeBtn) {
                activeBtn.classList.add('active');
            } else {
                console.error("Active button not found!");
            }

            // Display the fetched category data
            if (data.status && data.data) {
                displayAllCategoryData(data.data);
            } else {
                console.error("Invalid data or status from the API.");
            }
        })
        .catch((error) => {
            console.error("Error fetching category data:", error);
        });
};

const displayCategoryData = (data) => {
    const categoryBtnContainer = document.getElementById('category-button');
    categoryBtnContainer.innerHTML = ''; 

    data.forEach((item) => {
        console.log(item);

        // Create a button element
        const btn = document.createElement('button');
        btn.id = `btn-${item.id}`;
        btn.className = 'btn category-btn h-16 w-full sm:w-auto flex items-center justify-center space-x-2 py-0 px-5 md:px-11 rounded md:rounded-xl border-2 ';
        btn.onclick = () => logCategoryPets(item.category, item.id);

        // Set inner HTML of the button
        btn.innerHTML = `
            <img class="w-8 h-8 sm:w-11 sm:h-11" src="${item.category_icon}" alt="">
            <span class="text-sm sm:text-base font-medium">${item.category}</span>
        `;

        // Append 
        categoryBtnContainer.appendChild(btn);
    });
};



categoryDataLoad();
