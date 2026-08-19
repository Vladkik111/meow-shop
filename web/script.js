/* =========================================
   СОЗДАЁМ НЕОНОВЫЕ ЧАСТИЦЫ
========================================= */

const particlesContainer =
    document.getElementById("particles");

const particleCount = 90;

for (let i = 0; i < particleCount; i++) {

    const particle =
        document.createElement("div");

    particle.classList.add("particle");

    particle.style.left =
        Math.random() * 100 + "%";

    particle.style.animationDuration =
        5 + Math.random() * 12 + "s";

    particle.style.animationDelay =
        Math.random() * 10 + "s";

    const size =
        1 + Math.random() * 3;

    particle.style.width =
        size + "px";

    particle.style.height =
        size + "px";

    particlesContainer.appendChild(
        particle
    );
}


/* =========================================
   АНИМАЦИЯ ПОЯВЛЕНИЯ ПРИ ПРОКРУТКЕ
========================================= */

const revealElements =
    document.querySelectorAll(".reveal");

const observer =
    new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "visible"
                    );

                    observer.unobserve(
                        entry.target
                    );
                }

            });

        },
        {
            threshold: 0.15
        }
    );


revealElements.forEach((element) => {

    observer.observe(element);

});


/* =========================================
   ПАРАЛЛАКС ДЛЯ КОТИКОВ И ЛИСТЬЕВ
========================================= */

const decorations =
    document.querySelectorAll(
        ".floating-cat, .floating-leaf"
    );


document.addEventListener(
    "mousemove",
    (event) => {

        const x =
            (event.clientX /
                window.innerWidth -
                0.5) * 2;

        const y =
            (event.clientY /
                window.innerHeight -
                0.5) * 2;


        decorations.forEach(
            (element, index) => {

                const speed =
                    3 + (index % 5);

                element.style.marginLeft =
                    x * speed + "px";

                element.style.marginTop =
                    y * speed + "px";

            }
        );

    }
);


/* =========================================
   ПЛАВНЫЙ СКРОЛЛ
========================================= */

document.querySelectorAll(
    'a[href^="#"]'
).forEach((link) => {

    link.addEventListener(
        "click",
        (event) => {

            const target =
                document.querySelector(
                    link.getAttribute("href")
                );

            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth"
            });

        }
    );

});


/* =========================================
   СЧЁТЧИКИ
========================================= */

const numbers =
    document.querySelectorAll(
        ".stat-number"
    );


const animateNumber = (element) => {

    const text =
        element.textContent.trim();

    if (!text.includes("+")) {
        return;
    }

    const target =
        parseInt(text);

    if (isNaN(target)) {
        return;
    }

    let current = 0;

    const duration = 1200;

    const start =
        performance.now();


    const update = (time) => {

        const progress =
            Math.min(
                (time - start) / duration,
                1
            );

        current =
            Math.floor(
                target * progress
            );

        element.textContent =
            current + "+";

        if (progress < 1) {

            requestAnimationFrame(update);

        }

    };

    requestAnimationFrame(update);

};


const numberObserver =
    new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (
                    entry.isIntersecting
                ) {

                    animateNumber(
                        entry.target
                    );

                    numberObserver.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.7
        }
    );


numbers.forEach((number) => {

    numberObserver.observe(number);

});