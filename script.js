
/* =====================================
   REVERB FORTographY
   Photography catalogue
===================================== */

const photos = [
    // THE PORTRAIT SESSIONS
    {
        id: 1,
        title: "Portrait Session 01",
        category: "portraits",
        collection: "The Portrait Sessions",
        image: "images/Individual-Photography (1).jpg",
        description: "Individual photography capturing personality and expression."
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

    // MEMULO STORIES
    {
        id: 7,
        title: "The Celebration 01",
        category: "memulo",
        collection: "Memulo: A Celebration of Tradition",
        image: "images/Memulo-Event-Photography (1).jpg",
        description: "A moment from a traditional Memulo celebration."
    },
    {
        id: 8,
        title: "The Celebration 02",
        category: "memulo",
        collection: "Memulo: A Celebration of Tradition",
        image: "images/Memulo-Event-Photography (2).jpg",
        description: "Celebrating culture, family and tradition."
    },
    {
        id: 9,
        title: "The Celebration 03",
        category: "memulo",
        collection: "Memulo: A Celebration of Tradition",
        image: "images/Memulo-Event-Photography (3).jpg",
        description: "Memories from a special cultural occasion."
    },
    {
        id: 10,
        title: "The Celebration 04",
        category: "memulo",
        collection: "Memulo: A Celebration of Tradition",
        image: "images/Memulo-Event-Photography (4).jpg",
        description: "Documenting meaningful moments and connections."
    },
    {
        id: 11,
        title: "The Celebration 05",
        category: "memulo",
        collection: "Memulo: A Celebration of Tradition",
        image: "images/Memulo-Event-Photography (5).jpg",
        description: "A visual story of celebration and togetherness."
    },
    {
        id: 12,
        title: "The Celebration 06",
        category: "memulo",
        collection: "Memulo: A Celebration of Tradition",
        image: "images/Memulo-Event-Photography (6).jpg",
        description: "The final frames from the Memulo collection."
    },

    // THE NEXT CHAPTER
    {
        id: 13,
        title: "The Next Chapter 01",
        category: "graduation",
        collection: "The Next Chapter",
        image: "images/Pilot-Graduation-Photography (1).jpg",
        description: "Celebrating achievement and new beginnings."
    },
    {
        id: 14,
        title: "The Next Chapter 02",
        category: "graduation",
        collection: "The Next Chapter",
        image: "images/Pilot-Graduation-Photography (2).jpg",
        description: "A milestone worth remembering."
    },
    {
        id: 15,
        title: "The Next Chapter 03",
        category: "graduation",
        collection: "The Next Chapter",
        image: "images/Pilot-Graduation-Photography (3).jpg",
        description: "Recognising dedication, growth and achievement."
    },
    {
        id: 16,
        title: "The Next Chapter 04",
        category: "graduation",
        collection: "The Next Chapter",
        image: "images/Pilot-Graduation-Photography (4).jpg",
        description: "Capturing an important moment in a journey."
    },
    {
        id: 17,
        title: "The Next Chapter 05",
        category: "graduation",
        collection: "The Next Chapter",
        image: "images/Pilot-Graduation-Photography (5).jpg",
        description: "A celebration of hard work and progress."
    },
    {
        id: 18,
        title: "The Next Chapter 06",
        category: "graduation",
        collection: "The Next Chapter",
        image: "images/Pilot-Graduation-Photography (6).jpg",
        description: "The beginning of something new."
    }
];


/* COLLECTIONS */

const collections = [
    {
        title: "The Portrait Sessions",
        description: "People, identity and individual expression.",
        image: "images/Individual-Photography (1).jpg",
        category: "portraits"
    },
    {
        title: "Memulo: A Celebration of Tradition",
        description: "Culture, family and meaningful celebrations.",
        image: "images/Memulo-Event-Photography (1).jpg",
        category: "memulo"
    },
    {
        title: "The Next Chapter",
        description: "Milestones, achievement and new beginnings.",
        image: "images/Pilot-Graduation-Photography (1).jpg",
        category: "graduation"
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
    localStorage.setItem("reverbLiked", JSON.stringify(likedPhotos));
    localStorage.setItem("reverbSaved", JSON.stringify(savedPhotos));
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
                >

                <div class="photo-overlay">
                    <button class="${isLiked ? "liked" : ""}"
                        data-like="${photo.id}" title="Like photograph">
                        <i data-lucide="heart"></i>
                    </button>

                    <button class="${isSaved ? "saved" : ""}"
                        data-save="${photo.id}" title="Save photograph">
                        <i data-lucide="bookmark"></i>
                    </button>
                </div>
            </div>

            <div class="photo-meta">
                <div>
                    <h3>${photo.title}</h3>
                    <p>${photo.collection}</p>
                </div>

                <div class="photo-stats">
                    <i data-lucide="heart"></i>
                    ${isLiked ? 1 : 0}
                </div>
            </div>
        </article>
    `;
}


/* RENDER PHOTOS */

function renderPhotos(target, list) {
    const container = document.getElementById(target);
    if (!container) return;

    container.innerHTML = list.map(createPhotoCard).join("");

    if (window.lucide) lucide.createIcons();
}


/* FILTER AND SORT */

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
        result.sort((a, b) =>
            Number(likedPhotos.includes(b.id)) -
            Number(likedPhotos.includes(a.id))
        );
    }

    return result;
}


/* UPDATE GRIDS */

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

    const results = getFilteredPhotos().filter(photo =>
        photo.title.toLowerCase().includes(query) ||
        photo.category.toLowerCase().includes(query) ||
        photo.collection.toLowerCase().includes(query) ||
        photo.description.toLowerCase().includes(query)
    );

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
    if (selectedPage) selectedPage.classList.add("active-page");

    document.querySelectorAll("[data-page]").forEach(link => {
        link.classList.toggle("active", link.dataset.page === page);
    });

    if (page === "explore") renderPhotos("exploreGrid", photos);

    if (page === "liked") {
        renderPhotos("likedGrid",
            photos.filter(photo => likedPhotos.includes(photo.id)));
    }

    if (page === "saved") {
        renderPhotos("savedGrid",
            photos.filter(photo => savedPhotos.includes(photo.id)));
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


/* EXPLORE TILES */

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


/* COLLECTIONS */

function renderCollections() {
    const container = document.getElementById("collectionGrid");
    if (!container) return;

    container.innerHTML = collections.map(collection => `
        <div class="collection-card"
             data-collection="${collection.category}">

            <img src="${collection.image}"
                 alt="${collection.title}"
                 loading="lazy">

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


/* LIKE AND SAVE */

document.addEventListener("click", event => {
    const likeButton = event.target.closest("[data-like]");

    if (likeButton) {
        const id = Number(likeButton.dataset.like);

        likedPhotos = likedPhotos.includes(id)
            ? likedPhotos.filter(item => item !== id)
            : [...likedPhotos, id];

        saveData();
        updateAllGrids();
        return;
    }

    const saveButton = event.target.closest("[data-save]");

    if (saveButton) {
        const id = Number(saveButton.dataset.save);

        savedPhotos = savedPhotos.includes(id)
            ? savedPhotos.filter(item => item !== id)
            : [...savedPhotos, id];

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

    if (image) openPhoto(Number(image.dataset.view));
});


document.getElementById("modalClose").addEventListener("click", closePhoto);

photoModal.addEventListener("click", event => {
    if (event.target === photoModal) closePhoto();
});

document.addEventListener("keydown", event => {
    if (event.key === "Escape") closePhoto();
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

    likedPhotos = likedPhotos.includes(id)
        ? likedPhotos.filter(item => item !== id)
        : [...likedPhotos, id];

    saveData();
    updateAllGrids();
    updateModalButtons();
});


document.getElementById("modalSave").addEventListener("click", () => {
    if (!activePhoto) return;

    const id = activePhoto.id;

    savedPhotos = savedPhotos.includes(id)
        ? savedPhotos.filter(item => item !== id)
        : [...savedPhotos, id];

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
