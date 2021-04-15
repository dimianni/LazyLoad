
document.addEventListener("DOMContentLoaded", function () {
    // Throwing all lazy images into an array
    var lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));

    // Throwing all lazy BACKGROUND images into an array
    var lazyBackgrounds = [].slice.call(document.querySelectorAll(".lazy-background"));

    // If there is IntersectionObserver support
    if ("IntersectionObserver" in window) {

        // Dealing with lazy images
        let lazyImageObserver = new IntersectionObserver(function (entries, observer) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    let lazyImage = entry.target;
                    lazyImage.src = lazyImage.dataset.src;
                    lazyImage.srcset = lazyImage.dataset.srcset;
                    lazyImage.classList.remove("lazy");
                    lazyImageObserver.unobserve(lazyImage);
                }
            });
        });

        lazyImages.forEach(function (lazyImage) {
            lazyImageObserver.observe(lazyImage);
        });


        // Dealing with lazy BACKGROUND images
        let lazyBackgroundObserver = new IntersectionObserver(function (entries, observer) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    lazyBackgroundObserver.unobserve(entry.target);
                }
            });
        });

        lazyBackgrounds.forEach(function (lazyBackground) {
            lazyBackgroundObserver.observe(lazyBackground);
        });

    } 
});

