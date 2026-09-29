const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".main-nav");

menuButton.addEventListener("click", function () {
    navigation.classList.toggle("active");
});
const navLinks = document.querySelectorAll(".main-nav a");

navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
        navigation.classList.remove("active");
    });
});
const menuFilters = document.querySelectorAll(".menu-filter");
const menuCategories = document.querySelectorAll(".menu-category");

menuFilters.forEach(function (button) {
    button.addEventListener("click", function () {

        const selectedCategory = button.dataset.filter;

        menuFilters.forEach(function (filterButton) {
            filterButton.classList.remove("active");
        });

        button.classList.add("active");

        menuCategories.forEach(function (category) {

            const categoryType = category.dataset.category;

            if (
                selectedCategory === "all" ||
                categoryType === selectedCategory
            ) {
                category.classList.remove("hidden");
            } else {
                category.classList.add("hidden");
            }

        });

    });
});
const journalFilters = document.querySelectorAll(".journal-filter");
const journalPosts = document.querySelectorAll(".journal-post-card");

journalFilters.forEach(function (button) {

    button.addEventListener("click", function () {

        const selectedCategory = button.dataset.journalFilter;


        journalFilters.forEach(function (filterButton) {
            filterButton.classList.remove("active");
        });


        button.classList.add("active");


        journalPosts.forEach(function (post) {

            const postCategory = post.dataset.journalCategory;

            if (
                selectedCategory === "all" ||
                selectedCategory === postCategory
            ) {
                post.classList.remove("hidden");
            } else {
                post.classList.add("hidden");
            }

        });

    });

});