const allCategoryDataLoad = () =>{
    fetch('https://openapi.programming-hero.com/api/peddy/pets')
    .then(res => res.json())
    .then(data => displayAllCategoryData(data.pets))
}

const displayAllCategoryData = (pets) =>{
    console.log(pets)

    const allData = document.getElementById('data-card');

    const AllPets = document.getElementById("data-card");
    AllPets.innerHTML = '';
    pets.forEach((pet) => {
        const card = document.createElement("div");
        card.classList = "card card-compact border rounded-lg shadow-md p-4 w-full";
    
        card.innerHTML = `
          <figure class="relative mb-4">
            <img class="w-full h-48 object-cover rounded-t-lg" src="${pet.image}" alt="${pet.pet_name} Thumbnail" />
          </figure>
          <div class="">
            <h2 class="text-lg font-bold mb-2">${pet.pet_name}</h2>
            <p class="text-sm text-gray-500 mb-4">Breed: ${pet.breed}</p>
            <p class="text-sm text-gray-500">Birth: ${new Date(pet.date_of_birth).getFullYear()}</p>
            <p class="text-sm text-gray-500">Gender: ${pet.gender}</p>
            <p class="text-sm text-gray-500 mb-4">Price: $${pet.price}</p>
            <div class="flex justify-between gap-4">
              
              <button class="btn px-4 py-2 text-cyan-700 bg-gray-200 hover:bg-gray-300">
              <span class="w-7"><i class="fa-regular fa-thumbs-up"></i></span>
              </button>
              <button class="btn  px-4 py-2 text-cyan-700 bg-gray-200 hover:bg-gray-300">Adopt</button>
              <button class="btn  px-4 py-2 text-cyan-700 bg-gray-200 hover:bg-gray-300">Details</button>
            </div>
          </div>`;
    
        allData.append(card);
    });
    
    
}
allCategoryDataLoad()