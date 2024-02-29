// Get the filter button and filter options
const filterButton = document.getElementById("filterby");
const filterOptions = document.getElementById("filterOptions");

// Function to toggle the visibility of filter options
function toggleFilterOptions() {
    filterOptions.classList.toggle("show");
}

// Event listener for the filter button click
filterButton.addEventListener("click", toggleFilterOptions);

// Event listener to hide filter options when clicking outside
window.addEventListener("click", function(event) {
    if (!event.target.matches('#filterby')) {
        filterOptions.classList.remove("show");
    }
});
