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
    if (pets.length === 0) {
      AllPets.classList.remove("grid");
      AllPets.innerHTML = `
        <div class="min-h-[300px] flex flex-col gap-5 justify-center items-center">
          <img src="../images/error.webp" />
          <h2 class="text-center text-xl font-bold">No Information Available</h2>
          <p class="w-4/6">It is a long established fact that a reader will be distracted by the readable content of a page when looking at 
          its layout. The point of using Lorem Ipsum is that it has a.</p>
        </div>`;
    } else {
      AllPets.classList.add("grid");
    }

    pets.forEach((pet) => {
        const card = document.createElement("div");
        card.classList = "card card-compact border rounded-lg shadow-md p-4 w-full";
    
        card.innerHTML = `
          <figure class="relative mb-4">
            <img class="w-full h-48 object-cover rounded-t-lg" src="${pet.image}" alt="${pet.pet_name} Thumbnail" />
          </figure>
          <div class="">
            <h2 class="text-lg font-bold mb-2">${pet.pet_name}</h2>
            <p class="text-sm text-gray-500 ">Breed: ${pet.breed}</p>
            <p class="text-sm text-gray-500">Birth: ${new Date(pet.date_of_birth).getFullYear()}</p>
            <p class="text-sm text-gray-500">Gender: ${pet.gender}</p>
            <p class="text-sm text-gray-500 mb-4">Price: $${pet.price}</p>
            <div class="flex justify-between gap-4">
              
              <button onclick="lodeLikeData('${pet.petId}')"  class="btn px-4 py-2 text-cyan-700 bg-gray-200 hover:bg-gray-300">
              <span class="w-7"><i class="fa-regular fa-thumbs-up"></i></span>
              </button>

              <button onclick="openModal()" class="btn  px-4 py-2 text-cyan-700 bg-gray-200 hover:bg-gray-300">Adopt</button>
              <button onclick="lodeDetail('${pet.petId}')"  class="btn  px-4 py-2 text-cyan-700 bg-gray-200 hover:bg-gray-300">Details</button>
            </div>
          </div>`;
    
        allData.append(card);
    });
    
    
}

const lodeDetail = (pets_id) => {
  // console.log(pets_id);
  fetch(`https://openapi.programming-hero.com/api/peddy/pet/${pets_id}`)
    .then((res) => res.json())
    .then((data) => displayDetail(data.petData))
    .catch((error) => console.error("Error fetching video details:", error));
};

const displayDetail = (pets) => {
  console.log(pets);
  const modalDetail = document.getElementById('modal-content');
  modalDetail.innerHTML = `
      <img class="rounded-xl h-[250px]" src=${pets.image} alt="pets Thumbnail"/>
      <p class="text-xl">Alessia Max</p>
      <div class="flex gap-11 py-5">
            <div>
            <p class="text-sm text-gray-500">Breed: ${pets.breed}</p>
            <p class="text-sm text-gray-500">Birth: ${new Date(pets.date_of_birth).getFullYear()}</p>
            <p class="text-sm text-gray-500">vaccinated_status: ${pets.vaccinated_status}</p>
            </div>
            <div>
            <p class="text-sm text-gray-500">Gender: ${pets.gender}</p>
            <p class="text-sm text-gray-500 mb-4">Price: $${pets.price}</p>
            </div>
            <div class="flex justify-between gap-4">
            </div>
      </div>
      <h class="text-xl font-bold">Details Information</h>
      <p>${pets.pet_details}</p>
  `;

  document.getElementById('showModals').click();
};

// Load like data for a pet
const lodeLikeData = (pets_id) => {
  fetch(`https://openapi.programming-hero.com/api/peddy/pet/${pets_id}`)
    .then((res) => res.json())
    .then((data) => displayLikeDetail(data.petData))
    .catch((error) => console.error("Error fetching pet details:", error));
};

// Display like details without replacing existing images
const displayLikeDetail = (pet) => {
  const likeContainer = document.getElementById('Like-data-show');
  
  const img = document.createElement('img');
  img.className = 'rounded-xl w-full h-auto shadow-md';
  img.src = pet.image;  
  img.alt = 'Pet Image';

  likeContainer.appendChild(img);
};


// Adopt button function 

let countdownInterval; 

// Function to open the modal and start the countdown
const openModal = () => {
  const modal = document.getElementById("countdown-modal");
  modal.classList.remove("hidden");

  // Initialize the countdown
  let countdown = 5; 
  const timerElement = document.getElementById("countdown-timer");
  timerElement.textContent = countdown;

  // Start the countdown
  countdownInterval = setInterval(() => {
    countdown--;
    timerElement.textContent = countdown;

    if (countdown <= 0) {
      clearInterval(countdownInterval);
      closeModal(); 
    }
  }, 1000);
};

// Function to close the modal and clear the countdown
const closeModal = () => {
  const modal = document.getElementById("countdown-modal");
  modal.classList.add("hidden");
  clearInterval(countdownInterval); 
};





allCategoryDataLoad()