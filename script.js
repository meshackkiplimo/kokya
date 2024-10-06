document.addEventListener("DOMContentLoaded", () => {
  const mainContent = document.getElementById("mainContent");
  const logoLink = document.getElementById("logoLink");
  const homeLink = document.getElementById("homeLink");
  const buyLink = document.getElementById("buyLink");
  const sellLink = document.getElementById("sellLink");
  const aboutLink = document.getElementById("aboutLink");

  const homePage = document.getElementById("homePage");
  const buyDogsPage = document.getElementById("buyDogsPage");
  const sellDogPage = document.getElementById("sellDogPage");
  const aboutPage = document.getElementById("aboutPage");

  function showPage(pageToShow) {
    [homePage, buyDogsPage, sellDogPage, aboutPage].forEach((page) => {
      page.style.display = page === pageToShow ? "block" : "none";
    });
  }

  logoLink.addEventListener("click", (e) => {
    e.preventDefault();
    showPage(homePage);
  });

  homeLink.addEventListener("click", (e) => {
    e.preventDefault();
    showPage(homePage);
  });

  buyLink.addEventListener("click", (e) => {
    e.preventDefault();
    showPage(buyDogsPage);
    fetchDogs();
  });

  sellLink.addEventListener("click", (e) => {
    e.preventDefault();
    showPage(sellDogPage);
  });

  aboutLink.addEventListener("click", (e) => {
    e.preventDefault();
    showPage(aboutPage);
  });

  async function fetchDogs() {
    try {
      const response = await fetch("http://localhost:5000/api/dogs");
      const dogs = await response.json();
      displayDogs(dogs);
    } catch (error) {
      console.error("Error fetching dogs:", error);
      document.getElementById("dogList").innerHTML =
        "<p>Error loading dogs. Please try again later.</p>";
    }
  }

  function displayDogs(dogs) {
    const dogList = document.getElementById("dogList");
    dogList.innerHTML = dogs
      .map(
        (dog) => `
            <div class="dog-card">
                <img src="${
                  dog.imageUrl || "https://via.placeholder.com/150"
                }" alt="${dog.name}">
                <h3>${dog.name}</h3>
                <p>${dog.breed}</p>
                <p>Age: ${dog.age}</p>
                <p>Price: $${dog.price}</p>
                <p>${dog.description || ""}</p>
                <button onclick="contactSeller('${
                  dog._id
                }')">Contact Seller</button>
            </div>
        `
      )
      .join("");
  }

  window.contactSeller = function (dogId) {
    // Implement contact seller functionality
    alert(`Contacting seller for dog ID: ${dogId}`);
  };

  const sellForm = document.getElementById("sellForm");
  sellForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const dogData = Object.fromEntries(formData);

    try {
      const response = await fetch("http://localhost:5000/api/dogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dogData),
      });

      if (response.ok) {
        alert("Your dog has been listed for sale!");
        e.target.reset();
      } else {
        alert("Failed to list your dog. Please try again.");
      }
    } catch (error) {
      console.error("Error listing dog:", error);
      alert("An error occurred. Please try again.");
    }
  });
});
