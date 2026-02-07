const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // fluid easing
    smooth: true,
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

document.addEventListener("DOMContentLoaded", () => {

    const tl = gsap.timeline();

    tl.to(".line", {
        y: 0,                   
        duration: 1.5,
        stagger: 0.2,           
        ease: "power4.out",     
        delay: 0.5              
    })
    .to(".nav", {
        opacity: 1,
        duration: 1,
        ease: "power2.out"
    }, "-=1"); 
    const cursor = document.querySelector(".custom-cursor");

    if (window.matchMedia("(min-width: 768px)").matches) {
        document.addEventListener("mousemove", (e) => {
            gsap.to(cursor, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.1,  
                ease: "power2.out"
            });
        });
    }

    const projects = document.querySelectorAll(".project-item");
    
    projects.forEach((project) => {
        const imgContainer = project.querySelector(".project-img-reveal");
        
        project.addEventListener("mouseenter", () => {
            gsap.to(imgContainer, {
                scale: 1,
                opacity: 1,
                duration: 0.4,
                ease: "power2.out"
            });
            
            gsap.to(cursor, { scale: 3, mixBlendMode: "difference" });
        });

        project.addEventListener("mouseleave", () => {
            gsap.to(imgContainer, {
                scale: 0,
                opacity: 0,
                duration: 0.4,
                ease: "power2.in"
            });
            
           
            gsap.to(cursor, { scale: 1 });
        });

        
        project.addEventListener("mousemove", (e) => {
            gsap.to(imgContainer, {
                x: e.clientX - 150, 
                y: e.clientY - 200,
                duration: 0.8,      
                ease: "power3.out"
            });
        });
    });
});