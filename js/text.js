const categoryDataLoad = () =>{
    fetch('https://openapi.programming-hero.com/api/peddy/categories')
    .then(res => res.json())
    .then(data => displayCategoryData(data.categories))
    .catch((error) => {
        console.error("Error fetching category data:", error);
    });
}

const removeActiveClass = () => {
    const remove = document.getElementsByClassName('category-btn')
    console.log(remove)
    for(let btn of remove){
        btn.classList.remove('active')
    }

}

const logCategoryPets = (category) => {
    fetch(`https://openapi.programming-hero.com/api/peddy/category/${category}`)
        .then((res) => res.json())
        .then((data) => {
            console.log(data);

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



// {
//     "id": 1,
//     "category": "Cat",
//     "category_icon": "https://i.ibb.co.com/N7dM2K1/cat.png"
// }

const displayCategoryData = (data) =>{
    const categoryBtn = document.getElementById('category-button')
    data.forEach((item) => {
        console.log(item)
        console.log(item.category)
        const btn = document.createElement('button')
        btn.innerHTML = `
        <button id="btn-${item.id}" onclick="logCategoryPets('${item.category}')"
                class="btn category-btn h-16 w-full sm:w-auto flex items-center justify-center space-x-2 py-0 px-5 md:px-11 rounded md:rounded-xl border-2 bg-gray-100 hover:bg-gray-200 transition">
                <img class="w-8 h-8 sm:w-11 sm:h-11" src="${item.category_icon}" alt="">
                <span class="text-sm sm:text-base font-medium">${item.category}</span>
        </button>
    `;


        categoryBtn.append(btn)
        
    });
}

categoryDataLoad()


















