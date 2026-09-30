/* =========================================================
   JOURNAL
   - SORT NEWEST FIRST
   - FILTER BY CATEGORY
========================================================= */

const journalGrid = document.querySelector(".journal-archive-grid");

const journalFilters = document.querySelectorAll(".journal-filter");


if (journalGrid) {

    const journalCards = Array.from(
        journalGrid.querySelectorAll(".journal-post-card")
    );


    /* -----------------------------------------
       SORT POSTS: NEWEST → OLDEST
    ----------------------------------------- */

    journalCards.sort(function (a, b) {

        const dateA = a.dataset.date || "";
        const dateB = b.dataset.date || "";

        return dateB.localeCompare(dateA);

    });


    journalCards.forEach(function (card) {

        journalGrid.appendChild(card);

    });



    /* -----------------------------------------
       FILTER POSTS
    ----------------------------------------- */

    journalFilters.forEach(function (button) {

        button.addEventListener("click", function () {

            const selectedCategory =
                button.dataset.journalFilter;


            /* ACTIVE BUTTON */

            journalFilters.forEach(function (filter) {

                filter.classList.remove("active");

            });


            button.classList.add("active");



            /* SHOW / HIDE CARDS */

            journalCards.forEach(function (card) {

                const cardCategory =
                    card.dataset.journalCategory;


                if (
                    selectedCategory === "all" ||
                    selectedCategory === cardCategory
                ) {

                    card.classList.remove("hidden");

                }

                else {

                    card.classList.add("hidden");

                }

            });

        });

    });

}
/* =========================================================
   MOBILE NAVIGATION
========================================================= */

const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".main-nav");


if (menuButton && navigation) {

    menuButton.addEventListener("click", function () {

        navigation.classList.toggle("active");

    });


    const navLinks =
        navigation.querySelectorAll("a");


    navLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            navigation.classList.remove("active");

        });

    });

}
/* =========================================================
   FEATURED JOURNAL POST
   Latest Behind the Counter / Your Stories / Pawsonnel post
========================================================= */

(function () {

    const allowedFeaturedCategories = [
        "behind",
        "stories",
        "pawsonnel"
    ];

    const featuredPost =
        document.querySelector(".featured-journal-post");

    if (!featuredPost) return;


    const eligiblePosts = Array.from(
        document.querySelectorAll(".journal-post-card")
    ).filter(function (post) {

        return allowedFeaturedCategories.includes(
            post.dataset.journalCategory
        );

    });


    if (!eligiblePosts.length) return;


    /* newest first */

    eligiblePosts.sort(function (a, b) {

        const dateA = a.dataset.date || "";
        const dateB = b.dataset.date || "";

        return dateB.localeCompare(dateA);

    });


    const newestPost = eligiblePosts[0];


    /* GET DATA FROM NEWEST CARD */

    const newestCategory =
        newestPost.querySelector(
            ".journal-card-meta span:first-child"
        )?.textContent.trim() || "";


    const newestDate =
        newestPost.dataset.date
            ? newestPost.dataset.date.replaceAll("-", ".")
            : "";


    const newestTitle =
        newestPost.querySelector("h3")
            ?.textContent.trim() || "";


    const newestDescription =
        newestPost.querySelector(
            ".journal-card-content > p"
        )?.textContent.trim() || "";


    const newestLink =
        newestPost.querySelector(
            ".journal-card-content a"
        );


    const newestImage =
        newestPost.querySelector(
            ".journal-card-image img"
        );


    /* UPDATE FEATURED POST */

    const featuredBadge =
        featuredPost.querySelector(".journal-latest");

    const featuredDate =
        featuredPost.querySelector(".journal-date");

    const featuredCategory =
        featuredPost.querySelector(".featured-category");

    const featuredTitle =
        featuredPost.querySelector(
            ".featured-journal-content h2"
        );

    const featuredDescription =
        featuredPost.querySelector(
            ".featured-journal-content > p:not(.journal-date):not(.featured-category)"
        );

    const featuredLink =
        featuredPost.querySelector(".featured-post-link");

    const featuredImageWrapper =
        featuredPost.querySelector(".featured-journal-image");

    const featuredImage =
        featuredPost.querySelector(
            ".featured-journal-image img"
        );


    if (featuredBadge) {
        featuredBadge.textContent = "LATEST POST";
    }


    if (featuredDate) {
        featuredDate.textContent = newestDate;
    }


    if (featuredCategory) {
        featuredCategory.textContent = newestCategory;
    }


    if (featuredTitle) {
        featuredTitle.textContent = newestTitle;
    }


    if (featuredDescription) {
        featuredDescription.textContent =
            newestDescription;
    }


    /* LINK */

    if (featuredLink && newestLink) {

        featuredLink.href =
            newestLink.href;

        featuredLink.target =
            newestLink.target || "_self";

        featuredLink.textContent =
            newestLink.textContent.trim();

        featuredLink.style.display =
            "inline-flex";

    }

    else if (featuredLink) {

        featuredLink.style.display =
            "none";

    }


    /* IMAGE */

    if (
        featuredImageWrapper &&
        featuredImage &&
        newestImage
    ) {

        featuredImage.src =
            newestImage.src;

        featuredImage.alt =
            newestImage.alt;

        featuredImageWrapper.style.display =
            "";

        featuredPost.classList.remove(
            "featured-no-image"
        );

    }

    else if (featuredImageWrapper) {

        featuredImageWrapper.style.display =
            "none";

        featuredPost.classList.add(
            "featured-no-image"
        );

    }

})();
/* =========================================================
   MENU FILTERS — FINAL FIX
========================================================= */

(function () {

    const filters = document.querySelectorAll(".menu-filter");
    const categories = document.querySelectorAll(".menu-category");

    if (!filters.length || !categories.length) return;

    filters.forEach(function (button) {

        button.addEventListener("click", function () {

            const selected = button.dataset.filter;

            /* active button */
            filters.forEach(function (filter) {
                filter.classList.remove("active");
            });

            button.classList.add("active");


            /* filter menu cards */
            categories.forEach(function (category) {

                const type = category.dataset.category;

                if (
                    selected === "all" ||
                    selected === type
                ) {
                    category.classList.remove("hidden");
                } else {
                    category.classList.add("hidden");
                }

            });

        });

    });

})();