/* =========================================================
   MEOWTAKÉ'S CAT & BOOK CAFÉ
   MAIN SCRIPT
========================================================= */

(function () {
    "use strict";


    /* =====================================================
       1. MOBILE NAVIGATION
    ===================================================== */

    const menuButton =
        document.querySelector(".menu-toggle");

    const navigation =
        document.querySelector(".main-nav");


    if (menuButton && navigation) {

        const closeNavigation = function () {

            navigation.classList.remove("active");

            menuButton.setAttribute(
                "aria-expanded",
                "false"
            );

        };


        menuButton.addEventListener(
            "click",
            function () {

                const isOpen =
                    navigation.classList.toggle(
                        "active"
                    );


                menuButton.setAttribute(
                    "aria-expanded",
                    String(isOpen)
                );

            }
        );


        navigation
            .querySelectorAll("a")
            .forEach(function (link) {

                link.addEventListener(
                    "click",
                    closeNavigation
                );

            });


        document.addEventListener(
            "keydown",
            function (event) {

                if (event.key === "Escape") {
                    closeNavigation();
                }

            }
        );


        window.addEventListener(
            "resize",
            function () {

                if (window.innerWidth > 760) {
                    closeNavigation();
                }

            }
        );

    }



    /* =====================================================
       2. MENU FILTERS
    ===================================================== */

    const menuFilters =
        document.querySelectorAll(
            ".menu-filter"
        );

    const menuCategories =
        document.querySelectorAll(
            ".menu-category"
        );


    if (
        menuFilters.length &&
        menuCategories.length
    ) {

        menuFilters.forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        const selectedCategory =
                            button.dataset.filter;


                        menuFilters.forEach(
                            function (filter) {

                                filter.classList.remove(
                                    "active"
                                );

                            }
                        );


                        button.classList.add(
                            "active"
                        );


                        menuCategories.forEach(
                            function (category) {

                                const categoryType =
                                    category.dataset.category;


                                const shouldShow =
                                    selectedCategory === "all" ||
                                    selectedCategory === categoryType;


                                category.classList.toggle(
                                    "hidden",
                                    !shouldShow
                                );

                            }
                        );

                    }
                );

            }
        );

    }



    /* =====================================================
       3. JOURNAL
       SORT + FILTER + PAGINATION
    ===================================================== */

    const journalGrid =
        document.querySelector(
            ".journal-archive-grid"
        );

    const journalFilters =
        document.querySelectorAll(
            ".journal-filter"
        );

    const journalPagination =
        document.querySelector(
            ".journal-pagination"
        );


    if (journalGrid) {

        const POSTS_PER_PAGE = 4;

        let currentPage = 1;

        let currentCategory = "all";


        const journalCards = Array.from(
            journalGrid.querySelectorAll(
                ".journal-post-card"
            )
        );


        /* -----------------------------------------
           SORT NEWEST → OLDEST
        ----------------------------------------- */

        journalCards.sort(
            function (a, b) {

                const dateA =
                    a.dataset.date || "";

                const dateB =
                    b.dataset.date || "";


                return dateB.localeCompare(
                    dateA
                );

            }
        );


        journalCards.forEach(
            function (card) {

                journalGrid.appendChild(
                    card
                );

            }
        );



        /* -----------------------------------------
           GET FILTERED POSTS
        ----------------------------------------- */

        function getFilteredCards() {

            return journalCards.filter(
                function (card) {

                    return (
                        currentCategory === "all" ||
                        card.dataset.journalCategory ===
                            currentCategory
                    );

                }
            );

        }



        /* -----------------------------------------
           SHOW CURRENT PAGE
        ----------------------------------------- */

        function renderJournalPage() {

            const filteredCards =
                getFilteredCards();


            const totalPages =
                Math.max(
                    1,
                    Math.ceil(
                        filteredCards.length /
                        POSTS_PER_PAGE
                    )
                );


            if (currentPage > totalPages) {
                currentPage = totalPages;
            }


            const startIndex =
                (currentPage - 1) *
                POSTS_PER_PAGE;


            const endIndex =
                startIndex +
                POSTS_PER_PAGE;


            /* hide everything first */

            journalCards.forEach(
                function (card) {

                    card.classList.add(
                        "hidden"
                    );

                }
            );


            /* show only current 4 */

            filteredCards
                .slice(
                    startIndex,
                    endIndex
                )
                .forEach(
                    function (card) {

                        card.classList.remove(
                            "hidden"
                        );

                    }
                );


            renderPagination(
                totalPages
            );

        }



        /* -----------------------------------------
           CREATE PAGE BUTTON
        ----------------------------------------- */

        function createPageButton(
            label,
            page,
            options = {}
        ) {

            const button =
                document.createElement(
                    "button"
                );


            button.type = "button";

            button.className =
                "journal-page-button";


            if (options.arrow) {

                button.classList.add(
                    "pagination-arrow"
                );

            }


            button.textContent =
                label;


            if (page === currentPage) {

                button.classList.add(
                    "active"
                );

            }


            if (options.disabled) {

                button.disabled =
                    true;

            }


            button.addEventListener(
                "click",
                function () {

                    if (
                        button.disabled ||
                        page === currentPage
                    ) {
                        return;
                    }


                    currentPage =
                        page;


                    renderJournalPage();


                    const archiveTop =
                        document.querySelector(
                            ".journal-archive"
                        );


                    if (archiveTop) {

                        archiveTop.scrollIntoView({
                            behavior: "smooth",
                            block: "start"
                        });

                    }

                }
            );


            return button;

        }



        /* -----------------------------------------
           PAGINATION
        ----------------------------------------- */

        function renderPagination(
            totalPages
        ) {

            if (!journalPagination) {
                return;
            }


            journalPagination.innerHTML =
                "";


            /* no pagination needed */

            if (totalPages <= 1) {

                journalPagination.style.display =
                    "none";

                return;

            }


            journalPagination.style.display =
                "flex";


            /* PREVIOUS */

            journalPagination.appendChild(
                createPageButton(
                    "←",
                    Math.max(
                        1,
                        currentPage - 1
                    ),
                    {
                        arrow: true,
                        disabled:
                            currentPage === 1
                    }
                )
            );


            /* PAGE NUMBERS */

            for (
                let page = 1;
                page <= totalPages;
                page++
            ) {

                journalPagination.appendChild(
                    createPageButton(
                        String(page),
                        page
                    )
                );

            }


            /* NEXT */

            journalPagination.appendChild(
                createPageButton(
                    "→",
                    Math.min(
                        totalPages,
                        currentPage + 1
                    ),
                    {
                        arrow: true,
                        disabled:
                            currentPage ===
                            totalPages
                    }
                )
            );

        }



        /* -----------------------------------------
           FILTER BUTTONS
        ----------------------------------------- */

        journalFilters.forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        currentCategory =
                            button.dataset
                                .journalFilter;


                        currentPage = 1;


                        journalFilters.forEach(
                            function (filter) {

                                filter.classList.remove(
                                    "active"
                                );

                            }
                        );


                        button.classList.add(
                            "active"
                        );


                        renderJournalPage();

                    }
                );

            }
        );


        /* FIRST LOAD */

        renderJournalPage();

    }



    /* =====================================================
       4. FEATURED JOURNAL POST
       NEWS IS EXCLUDED
    ===================================================== */

    const featuredPost =
        document.querySelector(
            ".featured-journal-post"
        );


    if (featuredPost) {

        const allowedFeaturedCategories = [
            "behind",
            "stories",
            "pawsonnel"
        ];


        const eligiblePosts = Array.from(
            document.querySelectorAll(
                ".journal-post-card"
            )
        ).filter(
            function (post) {

                return allowedFeaturedCategories.includes(
                    post.dataset
                        .journalCategory
                );

            }
        );


        if (eligiblePosts.length) {

            eligiblePosts.sort(
                function (a, b) {

                    const dateA =
                        a.dataset.date || "";

                    const dateB =
                        b.dataset.date || "";


                    return dateB.localeCompare(
                        dateA
                    );

                }
            );


            const newestPost =
                eligiblePosts[0];


            const newestCategory =
                newestPost.querySelector(
                    ".journal-card-meta span:first-child"
                )?.textContent.trim() || "";


            const newestDate =
                newestPost.dataset.date
                    ? newestPost.dataset.date
                        .replaceAll(
                            "-",
                            "."
                        )
                    : "";


            const newestTitle =
                newestPost.querySelector(
                    "h3"
                )?.textContent.trim() || "";


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



            const featuredBadge =
                featuredPost.querySelector(
                    ".journal-latest"
                );


            const featuredDate =
                featuredPost.querySelector(
                    ".journal-date"
                );


            const featuredCategory =
                featuredPost.querySelector(
                    ".featured-category"
                );


            const featuredTitle =
                featuredPost.querySelector(
                    ".featured-journal-content h2"
                );


            const featuredDescription =
                featuredPost.querySelector(
                    ".featured-excerpt"
                );


            const featuredLink =
                featuredPost.querySelector(
                    ".featured-post-link"
                );


            const featuredImageWrapper =
                featuredPost.querySelector(
                    ".featured-journal-image"
                );


            const featuredImage =
                featuredPost.querySelector(
                    ".featured-journal-image img"
                );



            if (featuredBadge) {

                featuredBadge.textContent =
                    "LATEST POST";

            }


            if (featuredDate) {

                featuredDate.textContent =
                    newestDate;

            }


            if (featuredCategory) {

                featuredCategory.textContent =
                    newestCategory;

            }


            if (featuredTitle) {

                featuredTitle.textContent =
                    newestTitle;

            }


            if (featuredDescription) {

                featuredDescription.textContent =
                    newestDescription;

            }



            /* LINK */

            if (
                featuredLink &&
                newestLink
            ) {

                featuredLink.href =
                    newestLink.href;


                featuredLink.target =
                    newestLink.target ||
                    "_self";


                if (newestLink.rel) {

                    featuredLink.rel =
                        newestLink.rel;

                }

                else {

                    featuredLink.removeAttribute(
                        "rel"
                    );

                }


                featuredLink.textContent =
                    newestLink.textContent.trim();


                featuredLink.style.display =
                    "";

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
                    newestImage.alt ||
                    newestTitle;


                featuredImageWrapper.style.display =
                    "";


                featuredPost.classList.remove(
                    "featured-no-image"
                );

            }

            else if (
                featuredImageWrapper
            ) {

                featuredImageWrapper.style.display =
                    "none";


                featuredPost.classList.add(
                    "featured-no-image"
                );

            }

        }

    }

})();