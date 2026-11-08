
/* =====================================
   REVERB PHOTOGRAPHY
   Main application functionality
===================================== */


/* PHOTO DATABASE

   Replace these placeholder image paths
   with your actual filenames later.

*/

const photos = [

    {
        id: 1,
        title: "Golden Hour",
        category: "portraits",
        image: "images/photo-01.jpg",
        description: "A moment captured in the warmth of golden hour.",
        likes: 128
    },

    {
        id: 2,
        title: "Urban Perspectives",
        category: "street",
        image: "images/photo-02.jpg",
        description: "Finding stories in the everyday movement of the city.",
        likes: 94
    },

    {
        id: 3,
        title: "The Editorial",
        category: "fashion",
        image: "images/photo-03.jpg",
        description: "An exploration of contemporary style and expression.",
        likes: 215
    },

    {
        id: 4,
        title: "Quiet Moments",
        category: "lifestyle",
        image: "images/photo-04.jpg",
        description: "The beauty of life's quieter moments.",
        likes: 76
    },

    {
        id: 5,
        title: "Into the Wild",
        category: "nature",
        image: "images/photo-05.jpg",
        description: "Nature has a way of putting everything into perspective.",
        likes: 183
    },

    {
        id: 6,
        title: "The Celebration",
        category: "events",
        image: "images/photo-06.jpg",
        description: "A collection of memories from a special occasion.",
        likes: 112
    },

    {
        id: 7,
        title: "Expressions",
        category: "portraits",
        image: "images/photo-07.jpg",
        description: "Every face carries a story worth telling.",
        likes: 154
    },

    {
        id: 8,
        title: "City Stories",
        category: "street",
        image: "images/photo-08.jpg",
        description: "The city never stops creating stories.",
        likes: 89
    },

    {
        id: 9,
        title: "New Perspective",
        category: "fashion",
        image: "images/photo-09.jpg",
        description: "Creative expression through fashion and photography.",
        likes: 201
    },

    {
        id: 10,
        title: "Natural Light",
        category: "nature",
        image: "images/photo-10.jpg",
        description: "A study of natural light and composition.",
        likes: 67
    },

    {
        id: 11,
        title: "Together",
        category: "events",
        image: "images/photo-11.jpg",
        description: "Celebrating the people and moments that matter.",
        likes: 139
    },

    {
        id: 12,
        title: "Everyday Life",
        category: "lifestyle",
        image: "images/photo-12.jpg",
        description: "Finding extraordinary moments in ordinary life.",
        likes: 102
    }

];


/* COLLECTION DATABASE */

const collections = [

    {
        title: "The Human Experience",
        description: "Portraits, expressions and human connections.",
        image: "images/collection-01.jpg",
        category: "portraits"
    },

    {
        title: "Life in Motion",
        description: "Street photography and urban storytelling.",
        image: "images/collection-02.jpg",
        category: "street"
    },

    {
        title: "Beyond the Frame",
        description: "Nature, landscapes and beautiful surroundings.",
        image: "images/collection-03.jpg",
        category: "nature"
    },

    {
        title: "Style & Identity",
        description: "Fashion, creativity and personal expression.",
        image: "images/collection-04.jpg",
        category: "fashion"
    }

];


/* APP STATE */

let activeCategory = "all";
let activePhoto = null;
let currentPage = "home";
let sortLatest = true;

let likedPhotos = JSON.parse(
    localStorage.getItem("reverbLiked") || "[]"
);

let savedPhotos = JSON.parse(
    localStorage.getItem("reverbSaved") || "[]"
);


/* SAVE USER DATA */

function saveData() {

    localStorage.setItem(
        "reverbLiked",
        JSON.stringify(likedPhotos)
    );

    localStorage.setItem(
        "reverbSaved",
        JSON.stringify(savedPhotos)
    );

}


/* PHOTO CARD */

function createPhotoCard(photo) {

    const isLiked = likedPhotos.includes(photo.id);
    const isSaved = savedPhotos.includes(photo.id);

    return `

        <article class="photo-card">

            <div class="photo-image-wrap">

                <img
                    src="${photo.image}"
                    alt="${photo.title}"
                    class="photo-image"
                    loading="lazy"
                    data-view="${photo.id}"
                    onerror="this.style.minHeight='180px'; this.style.opacity='.15'"
                >

                <div class="photo-overlay">

                    <button
                        class="${isLiked ? 'liked' : ''}"
                        data-like="${photo.id}"
                        title="Like photograph"
                    >
                        <i data-lucide="heart"></i>
                    </button>

                    <button
                        class="${isSaved ? 'saved' : ''}"
                        data-save="${photo.id}"
                        title="Save photograph"
                    >
                        <i data-lucide="bookmark"></i>
                    </button>

                </div>

            </div>

            <div class="photo-meta">

                <div>
                    <h3>${photo.title}</h3>
                    <p>Reverb Photography</p>
                </div>

                <div class="photo-stats">
                    <i data-lucide="heart"></i>
                    ${photo.likes + (isLiked ? 1 : 0)}
                </div>

            </div>

        </article>

    `;

}


/* RENDER PHOTO GRID */

function renderPhotos(target, list) {

    const container = document.getElementById(target);

    if (!container) return;

    container.innerHTML = list.map(createPhotoCard).join("");

    if (window.lucide) {
        lucide.createIcons();
    }

}


/* FILTER PHOTOS */

function getFilteredPhotos() {

    let result = [...photos];

    if (activeCategory !== "all") {

        result = result.filter(
            photo => photo.category === activeCategory
        );

    }

    if (sortLatest) {
        result.sort((a, b) => b.id - a.id);
    } else {
        result.sort((a, b) => b.likes - a.likes);
    }

    return result;

}


/* UPDATE ALL GRIDS */

function updateAllGrids() {

    const filtered = getFilteredPhotos();

    renderPhotos("photoGrid", filtered);

    renderPhotos("exploreGrid", photos);

    renderPhotos(
        "likedGrid",
        photos.filter(photo => likedPhotos.includes(photo.id))
    );

    renderPhotos(
        "savedGrid",
        photos.filter(photo => savedPhotos.includes(photo.id))
    );

    const emptyState = document.getElementById("emptyState");

    if (emptyState) {

        emptyState.style.display =
            filtered.length === 0 ? "block" : "none";

    }

}


/* CATEGORY FILTERS */

document.querySelectorAll(".category-chip").forEach(button => {

    button.addEventListener("click", () => {

        document.querySelectorAll(".category-chip").forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        activeCategory = button.dataset.category;

        updateAllGrids();

    });

});


/* SEARCH */

const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("input", () => {

    const query = searchInput.value.toLowerCase().trim();

    const results = getFilteredPhotos().filter(photo => {

        return (
            photo.title.toLowerCase().includes(query) ||
            photo.category.toLowerCase().includes(query) ||
            photo.description.toLowerCase().includes(query)
        );

    });

    renderPhotos("photoGrid", results);

    document.getElementById("emptyState").style.display =
        results.length === 0 ? "block" : "none";

    showPage("home");

});


/* SORTING */

document.getElementById("sortButton").addEventListener("click", () => {

    sortLatest = !sortLatest;

    document.getElementById("sortButton").innerHTML = `
        <i data-lucide="sliders-horizontal"></i>
        ${sortLatest ? "Latest" : "Popular"}
    `;

    updateAllGrids();

    lucide.createIcons();

});


/* NAVIGATION */

function showPage(page) {

    currentPage = page;

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
        renderPhotos("exploreGrid", photos);
    }

    if (page === "liked") {
        renderPhotos(
            "likedGrid",
            photos.filter(photo => likedPhotos.includes(photo.id))
        );
    }

    if (page === "saved") {
        renderPhotos(
            "savedGrid",
            photos.filter(photo => savedPhotos.includes(photo.id))
        );
    }

    window.scrollTo({ top: 0, behavior: "smooth" });

}


document.addEventListener("click", event => {

    const link = event.target.closest("[data-page]");

    if (link) {

        event.preventDefault();

        showPage(link.dataset.page);

    }

});


/* EXPLORE CATEGORY TILES */

document.querySelectorAll(".explore-tile").forEach(tile => {

    tile.addEventListener("click", () => {

        activeCategory = tile.dataset.category;

        document.querySelectorAll(".category-chip").forEach(chip => {

            chip.classList.toggle(
                "active",
                chip.dataset.category === activeCategory
            );

        });

        updateAllGrids();

        showPage("home");

    });

});


/* FEATURED COLLECTION BUTTON */

document.querySelectorAll(".featured-btn").forEach(button => {

    button.addEventListener("click", () => {
        showPage("explore");
    });

});


/* COLLECTIONS */

function renderCollections() {

    const container = document.getElementById("collectionGrid");

    container.innerHTML = collections.map(collection => `

        <div class="collection-card" data-collection="${collection.category}">

            <img src="${collection.image}" alt="${collection.title}" loading="lazy">

            <div>
                <h3>${collection.title}</h3>
                <p>${collection.description}</p>
            </div>

        </div>

    `).join("");

}

renderCollections();


document.getElementById("collectionGrid").addEventListener("click", event => {

    const card = event.target.closest("[data-collection]");

    if (!card) return;

    activeCategory = card.dataset.collection;

    document.querySelectorAll(".category-chip").forEach(chip => {

        chip.classList.toggle(
            "active",
            chip.dataset.category === activeCategory
        );

    });

    updateAllGrids();

    showPage("home");

});


/* LIKE AND SAVE INTERACTIONS */

document.addEventListener("click", event => {

    const likeButton = event.target.closest("[data-like]");

    if (likeButton) {

        const id = Number(likeButton.dataset.like);

        if (likedPhotos.includes(id)) {

            likedPhotos = likedPhotos.filter(item => item !== id);

        } else {

            likedPhotos.push(id);

        }

        saveData();

        updateAllGrids();

        return;

    }


    const saveButton = event.target.closest("[data-save]");

    if (saveButton) {

        const id = Number(saveButton.dataset.save);

        if (savedPhotos.includes(id)) {

            savedPhotos = savedPhotos.filter(item => item !== id);

        } else {

            savedPhotos.push(id);

        }

        saveData();

        updateAllGrids();

    }

});


/* PHOTO VIEWER */

const photoModal = document.getElementById("photoModal");

function openPhoto(id) {

    const photo = photos.find(item => item.id === id);

    if (!photo) return;

    activePhoto = photo;

    document.getElementById("modalImage").src = photo.image;

    document.getElementById("modalTitle").textContent = photo.title;

    document.getElementById("modalDescription").textContent =
        photo.description;

    photoModal.classList.add("open");

    document.body.style.overflow = "hidden";

    updateModalButtons();

}


function closePhoto() {

    photoModal.classList.remove("open");

    document.body.style.overflow = "";

    activePhoto = null;

}


document.addEventListener("click", event => {

    const image = event.target.closest("[data-view]");

    if (image) {

        openPhoto(Number(image.dataset.view));

    }

});


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


/* MODAL BUTTONS */

function updateModalButtons() {

    if (!activePhoto) return;

    const liked = likedPhotos.includes(activePhoto.id);

    const saved = savedPhotos.includes(activePhoto.id);

    document.getElementById("modalLike").innerHTML = `
        <i data-lucide="heart"></i>
        ${liked ? "Liked" : "Like"}
    `;

    document.getElementById("modalSave").innerHTML = `
        <i data-lucide="bookmark"></i>
        ${saved ? "Saved" : "Save"}
    `;

    lucide.createIcons();

}


document.getElementById("modalLike").addEventListener("click", () => {

    if (!activePhoto) return;

    const id = activePhoto.id;

    if (likedPhotos.includes(id)) {

        likedPhotos = likedPhotos.filter(item => item !== id);

    } else {

        likedPhotos.push(id);

    }

    saveData();

    updateAllGrids();

    updateModalButtons();

});


document.getElementById("modalSave").addEventListener("click", () => {

    if (!activePhoto) return;

    const id = activePhoto.id;

    if (savedPhotos.includes(id)) {

        savedPhotos = savedPhotos.filter(item => item !== id);

    } else {

        savedPhotos.push(id);

    }

    saveData();

    updateAllGrids();

    updateModalButtons();

});


/* SHARE */

document.getElementById("modalShare").addEventListener("click", async () => {

    if (!activePhoto) return;

    const shareData = {

        title: activePhoto.title,

        text: activePhoto.description,

        url: window.location.href

    };

    try {

        if (navigator.share) {

            await navigator.share(shareData);

        } else if (navigator.clipboard) {

            await navigator.clipboard.writeText(
                `${shareData.title} - ${shareData.url}`
            );

            alert("Link copied!");

        } else {

            alert("Sharing is not supported on this browser.");

        }

    } catch (error) {

        if (error.name !== "AbortError") {
            console.error("Sharing failed:", error);
        }

    }

});


/* INITIALIZE */

updateAllGrids();

lucide.createIcons();
