
document.addEventListener("DOMContentLoaded", function() {

    // Select all elements that should be animated on scroll
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    // If there are no elements to animate, stop the script
    if (!animatedElements.length) {
        return;
    }

    // The Intersection Observer API provides a way to asynchronously observe
    // changes in the intersection of a target element with an ancestor element or
    // with a top-level document's viewport.
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // entry.isIntersecting is a boolean value which is true if the
            // target element intersects with the intersection observer's root.
            if (entry.isIntersecting) {
                // Add the 'is-visible' class to trigger the animation
                entry.target.classList.add('is-visible');
                
                // Once the animation is triggered, we don't need to observe it anymore.
                // This improves performance.
                observer.unobserve(entry.target);
            }
        });
    }, {
        // threshold: 0.1 means that the callback will be executed when 10%
        // of the target is visible within the element specified by the root option.
        threshold: 0.1 
    });

    // Start observing each of the animated elements
    animatedElements.forEach(element => {
        observer.observe(element);
    });

});
