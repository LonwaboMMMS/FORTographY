
// =====================================
// REVERB FORTographY
// Photography portfolio
// =====================================

const CONTACT_EMAIL = "fortography@reverbdailymedia.co.za";


// PHOTOGRAPHS

const photos = [

    // PORTRAIT SESSIONS
    {
        id: 1,
        title: "Portrait Session 01",
        category: "portraits",
        collection: "The Portrait Sessions",
        image: "images/Individual-Photography (1).jpg",
        description: "People, identity and individual expression."
    },
    {
        id: 2,
        title: "Portrait Session 02",
        category: "portraits",
        collection: "The Portrait Sessions",
        image: "images/Individual-Photography (2).jpg",
        description: "A closer look at individuality through the lens."
    },
    {
        id: 3,
        title: "Portrait Session 03",
        category: "portraits",
        collection: "The Portrait Sessions",
        image: "images/Individual-Photography (3).jpg",
        description: "Personal moments and visual expression."
    },
    {
        id: 4,
        title: "Portrait Session 04",
        category: "portraits",
        collection: "The Portrait Sessions",
        image: "images/Individual-Photography (4).jpg",
        description: "Individual photography and creative storytelling."
    },
    {
        id: 5,
        title: "Portrait Session 05",
        category: "portraits",
        collection: "The Portrait Sessions",
        image: "images/Individual-Photography (5).jpg",
        description: "A portrait capturing a unique perspective."
    },
    {
        id: 6,
        title: "Portrait Session 06",
        category: "portraits",
        collection: "The Portrait Sessions",
        image: "images/Individual-Photography (6).jpg",
        description: "Another perspective from the portrait collection."
    },


    // MEMULO PHOTOGRAPHY
    {
        id: 7,
        title: "Memulo 01",
        category: "memulo",
        collection: "Memulo: A Celebration of Tradition",
        image: "images/Memulo-Event-Photography (1).jpg",
        description: "A moment from a traditional Memulo celebration."
    },
    {
        id: 8,
        title: "Memulo 02",
        category: "memulo",
        collection: "Memulo: A Celebration of Tradition",
        image: "images/Memulo-Event-Photography (2).jpg",
        description: "Celebrating culture, family and tradition."
    },
    {
        id: 9,
        title: "Memulo 03",
        category: "memulo",
        collection: "Memulo: A Celebration of Tradition",
        image: "images/Memulo-Event-Photography (3).jpg",
        description: "Memories from a special cultural occasion."
    },
    {
        id: 10,
        title: "Memulo 04",
        category: "memulo",
        collection: "Memulo: A Celebration of Tradition",
        image: "images/Memulo-Event-Photography (4).jpg",
        description: "Documenting meaningful moments and connections."
    },
    {
        id: 11,
        title: "Memulo 05",
        category: "memulo",
        collection: "Memulo: A Celebration of Tradition",
        image: "images/Memulo-Event-Photography (5).jpg",
        description: "A visual story of celebration and togetherness."
    },
    {
        id: 12,
        title: "Memulo 06",
        category: "memulo",
        collection: "Memulo: A Celebration of Tradition",
        image: "images/Memulo-Event-Photography (6).jpg",
        description: "The final frames from the Memulo collection."
    },


    // PILOT PHOTOGRAPHY
    {
        id: 13,
        title: "Pilot Photography 01",
        category: "graduation",
        collection: "Above the Clouds: Pilot Photography",
        image: "images/Pilot-Graduation-Photography (1).jpg",
        description: "Celebrating the journey towards the skies."
    },
    {
        id: 14,
        title: "Pilot Photography 02",
        category: "graduation",
        collection: "Above the Clouds: Pilot Photography",
        image: "images/Pilot-Graduation-Photography (2).jpg",
        description: "A milestone in the pursuit of aviation."
    },
    {
        id: 15,
        title: "Pilot Photography 03",
        category: "graduation",
        collection: "Above the Clouds: Pilot Photography",
        image: "images/Pilot-Graduation-Photography (3).jpg",
        description: "Recognising dedication, ambition and achievement."
    },
    {
        id: 16,
        title: "Pilot Photography 04",
        category: "graduation",
        collection: "Above the Clouds: Pilot Photography",
        image: "images/Pilot-Graduation-Photography (4).jpg",
        description: "Capturing an important moment in an aviation journey."
    },
    {
        id: 17,
        title: "Pilot Photography 05",
        category: "graduation",
        collection: "Above the Clouds: Pilot Photography",
        image: "images/Pilot-Graduation-Photography (5).jpg",
        description: "A celebration of hard work and progress."
    },
    {
        id: 18,
        title: "Pilot Photography 06",
        category: "graduation",
        collection: "Above the Clouds: Pilot Photography",
        image: "images/Pilot-Graduation-Photography (6).jpg",
        description: "The beginning of a new journey."
    }

];


// COLLECTIONS

const collections = [
    {
        id: "portraits",
        title: "The Portrait Sessions",
        description: "People, identity and individual expression.",
        image: "images/Individual-Photography (1).jpg",
        category: "portraits",
        subtitle: "PORTRAIT PHOTOGRAPHY"
    },
    {
        id: "memulo",
        title: "Memulo: A Celebration of Tradition",
        description: "Culture, family and meaningful celebrations.",
        image: "images/Memulo-Event-Photography (1).jpg",
        category: "memulo",
        subtitle: "CULTURE & CELEBRATION"
    },
    {
        id: "graduation",
        title: "Above the Clouds: Pilot Photography",
        description: "Aviation, ambition and the journey towards the skies.",
        image: "images/Pilot-Graduation-Photography (1).jpg",
        category: "graduation",
        subtitle: "PILOT PHOTOGRAPHY"
    }
];


// APP STATE

let activeCategory = "all";
let activePhoto = null;
let sortLatest = true;
let currentCatalogue = null;


// ELEMENTS

const photoModal = document.getElementById("photoModal");
const searchInput = document.getElementById("searchInput");


// ICONS

function refreshIcons() {
    if (window.lucide) {
        lucide.createIcons();
    }
}


// PHOTO CARD

function createPhotoCard(photo) {

    return `
        <article class="photo-card">

            <div class="photo-image-wrap">

                <img
                    src="${photo.image}"
                    alt="${photo.title}"
                    class="photo-image"
                    loading="lazy"
                    data-view="${photo.id}"
                >

            </div>

            <div class="photo-meta">

                <div>
                    <h3>${photo.title}</h3>
                    <p>${photo.collection}</p>
                </div>

            </div>

        </article>
    `;
}


// RENDER PHOTOS

function renderPhotos(target, list) {

    const container = document.getElementById(target);

    if (!container) return;

    container.innerHTML = list.map(createPhotoCard).join("");

    refreshIcons();
}


// FILTER PHOTOS

function getFilteredPhotos() {

    let result = [...photos];

    if (activeCategory !== "all") {
        result = result.filter(photo =>
            photo.category === activeCategory
        );
    }

    if (sortLatest) {
        result.sort((a, b) => b.id - a.id);
    } else {
        result.sort((a, b) => a.id - b.id);
    }

    return result;
}


// HOME GRID

function updateHomeGrid() {

    const filtered = getFilteredPhotos();

    renderPhotos("photoGrid", filtered);

    const emptyState = document.getElementById("emptyState");

    if (emptyState) {
        emptyState.style.display =
            filtered.length === 0 ? "block" : "none";
    }
}


// CATEGORY FILTERS

document.querySelectorAll(".category-chip").forEach(button => {

    button.addEventListener("click", () => {

        document.querySelectorAll(".category-chip").forEach(chip => {
            chip.classList.remove("active");
        });

        button.classList.add("active");

        activeCategory = button.dataset.category;

        updateHomeGrid();
    });

});


// SEARCH

searchInput.addEventListener("input", () => {

    const query = searchInput.value.toLowerCase().trim();

    const results = photos.filter(photo => {

        const matchesQuery =
            photo.title.toLowerCase().includes(query) ||
            photo.category.toLowerCase().includes(query) ||
            photo.collection.toLowerCase().includes(query) ||
            photo.description.toLowerCase().includes(query);

        const matchesCategory =
            activeCategory === "all" ||
            photo.category === activeCategory;

        return matchesQuery && matchesCategory;
    });

    showPage("home");

    renderPhotos("photoGrid", results);

    document.getElementById("emptyState").style.display =
        results.length === 0 ? "block" : "none";

});


// SORTING

document.getElementById("sortButton").addEventListener("click", () => {

    sortLatest = !sortLatest;

    document.getElementById("sortButton").innerHTML = `
        <i data-lucide="sliders-horizontal"></i>
        ${sortLatest ? "Latest" : "Oldest"}
    `;

    updateHomeGrid();

    refreshIcons();
});


// PAGE NAVIGATION

function showPage(page) {

    document.querySelectorAll(".page").forEach(section => {
        section.classList.remove("active-page");
    });

    const selectedPage = document.getElementById(page);

    if (selectedPage) {
        selectedPage.classList.add("active-page");
    }

    document.querySelectorAll("[data-page]").forEach(link => {

        link.classList.toggle(
            "active",
            link.dataset.page === page
        );

    });

    if (page === "explore") {
        renderExplore();
    }

    if (page === "collections") {
        renderCollections();
    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

    refreshIcons();
}


// NAVIGATION CLICK EVENTS

document.addEventListener("click", event => {

    const link = event.target.closest("[data-page]");

    if (link) {
        event.preventDefault();
        showPage(link.dataset.page);
    }

});


// EXPLORE PAGE

function renderExplore() {

    const container = document.getElementById("exploreGrid");

    if (!container) return;

    container.innerHTML = collections.map(collection => `
        <div class="explore-tile"
             data-open-collection="${collection.id}">

            <img
                src="${collection.image}"
                alt="${collection.title}"
                loading="lazy"
            >

            <div>
                <h2>${collection.title}</h2>
                <span>${collection.description}</span>
            </div>

        </div>
    `).join("");

    refreshIcons();
}


// COLLECTIONS PAGE

function renderCollections() {

    const container = document.getElementById("collectionGrid");

    if (!container) return;

    container.innerHTML = collections.map(collection => `
        <article
            class="collection-card"
            data-open-collection="${collection.id}"
            tabindex="0"
            role="button"
            aria-label="Open ${collection.title}"
        >

            <div class="collection-image-wrap">
                <img
                    src="${collection.image}"
                    alt="${collection.title}"
                    loading="lazy"
                >
            </div>

            <div class="collection-info">

                <span class="collection-label">${collection.subtitle}</span>

                <h3>${collection.title}</h3>

                <p>${collection.description}</p>

                <span class="collection-link">
                    View collection
                    <i data-lucide="arrow-up-right"></i>
                </span>

            </div>

        </article>
    `).join("");

    refreshIcons();
}


// OPEN A COLLECTION'S OWN PAGE

function openCollection(collectionId) {

    const collection = collections.find(item =>
        item.id === collectionId
    );

    if (!collection) return;

    currentCatalogue = collection;

    const collectionPhotos = photos.filter(photo =>
        photo.category === collection.category
    );

    document.getElementById("catalogueEyebrow").textContent =
        collection.subtitle;

    document.getElementById("catalogueTitle").textContent =
        collection.title;

    document.getElementById("catalogueDescription").textContent =
        collection.description;

    document.getElementById("catalogueCount").textContent =
        `${collectionPhotos.length} photographs`;

    renderPhotos("catalogueGrid", collectionPhotos);

    showPage("cataloguePage");
}


// COLLECTION CLICK EVENTS

document.addEventListener("click", event => {

    const collectionLink = event.target.closest("[data-open-collection]");

    if (!collectionLink) return;

    event.preventDefault();

    openCollection(collectionLink.dataset.openCollection);

});


// KEYBOARD ACCESS FOR COLLECTION CARDS

document.addEventListener("keydown", event => {

    if (
        event.key !== "Enter" &&
        event.key !== " "
    ) return;

    const collectionCard = event.target.closest("[data-open-collection]");

    if (collectionCard && collectionCard.tagName === "ARTICLE") {

        event.preventDefault();

        openCollection(collectionCard.dataset.openCollection);
    }

});


// BACK TO COLLECTIONS

document.getElementById("backToCollections").addEventListener("click", () => {

    showPage("collections");

});


// FEATURED COLLECTION BUTTON

document.querySelectorAll("[data-open-collection]").forEach(button => {

    button.addEventListener("click", () => {
        openCollection(button.dataset.openCollection);
    });

});


// PHOTO VIEWER

function openPhoto(id) {

    const photo = photos.find(item => item.id === id);

    if (!photo) return;

    activePhoto = photo;

    document.getElementById("modalImage").src = photo.image;

    document.getElementById("modalTitle").textContent =
        photo.title;

    document.getElementById("modalDescription").textContent =
        photo.description;

    photoModal.classList.add("open");

    document.body.style.overflow = "hidden";
}


function closePhoto() {

    photoModal.classList.remove("open");

    document.body.style.overflow = "";

    activePhoto = null;
}


// OPEN PHOTO ON CLICK

document.addEventListener("click", event => {

    const image = event.target.closest("[data-view]");

    if (image) {
        openPhoto(Number(image.dataset.view));
    }

});


// CLOSE PHOTO

document.getElementById("modalClose").addEventListener("click", closePhoto);

photoModal.addEventListener("click", event => {

    if (event.target === photoModal) {
        closePhoto();
    }

});

document.addEventListener("keydown", event => {

    if (event.key === "Escape") {
        closePhoto();
    }

});


// INITIALIZE

updateHomeGrid();
renderExplore();
renderCollections();
refreshIcons();

