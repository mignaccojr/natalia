/* ================================================= */
/* LOADER */
/* ================================================= */

window.addEventListener("load", () => {

    const loader = document.getElementById("loader");

    setTimeout(() => {

        loader.style.opacity = "0";

        setTimeout(() => {
            loader.style.display = "none";
        }, 700);

    }, 1700);

});


/* ================================================= */
/* TRAVA DE SCROLL */
/* ================================================= */

let allowScroll = false;

document.body.style.overflow = "hidden";


// Impede roda do mouse
window.addEventListener(
    "wheel",
    (event) => {

        if (!allowScroll) {
            event.preventDefault();
        }

    },
    { passive: false }
);


// Impede teclado de rolar
window.addEventListener("keydown", (event) => {

    const keys = [
        "ArrowDown",
        "ArrowUp",
        "PageDown",
        "PageUp",
        "Home",
        "End",
        " "
    ];

    if (
        keys.includes(event.key) &&
        !allowScroll
    ) {

        event.preventDefault();

    }

});


// Impede swipe no celular
window.addEventListener(
    "touchmove",
    (event) => {

        if (!allowScroll) {
            event.preventDefault();
        }

    },
    { passive: false }
);


/* ================================================= */
/* NAVEGAÇÃO */
/* ================================================= */

function goToSection(id) {

    const section = document.getElementById(id);

    if (!section) {
        console.error(
            "Seção não encontrada:",
            id
        );

        return;
    }

    /*
        Mantemos a trava de scroll.
        Apenas o código pode mudar
        de seção.
    */

    section.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

}


/* ================================================= */
/* BOTÕES DATA-GO */
/* ================================================= */

document
    .querySelectorAll("[data-go]")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const target =
                    button.dataset.go;

                goToSection(target);

            }
        );

    });


/* ================================================= */
/* MINI GAME DA TEIA */
/* ================================================= */

const swingButton =
    document.getElementById("swing");

const progress =
    document.getElementById("progress");

const status =
    document.getElementById("status");

let swings = 0;

const totalSwings = 5;


if (swingButton) {

    swingButton.addEventListener(
        "click",
        () => {

            swings++;

            if (swings > totalSwings) {
                swings = totalSwings;
            }


            /* Barra */

            const percentage =
                (swings / totalSwings) * 100;

            progress.style.width =
                `${percentage}%`;


            /* Texto */

            if (swings < totalSwings) {

                const remaining =
                    totalSwings - swings;

                status.textContent =
                    `Teia lançada! ${remaining} restantes...`;

            } else {

                status.textContent =
                    "MISSÃO CONCLUÍDA! Natália foi localizada.";

                swingButton.textContent =
                    "NATÁLIA LOCALIZADA ♥";

                swingButton.disabled = true;


                /*
                    Pequena pausa cinematográfica
                    antes de revelar Natália.
                */

                setTimeout(() => {

                    goToSection("natalia");

                }, 900);

            }

        }
    );

}


/* ================================================= */
/* BOTÃO DO ANIVERSÁRIO */
/* ================================================= */

const lastButton =
    document.getElementById("last");

if (lastButton) {

    lastButton.addEventListener(
        "click",
        () => {

            goToSection("letter");

            startConfetti();

        }
    );

}


/* ================================================= */
/* CONFETES */
/* ================================================= */

function startConfetti() {

    const amount = 80;

    for (
        let i = 0;
        i < amount;
        i++
    ) {

        const confetti =
            document.createElement("div");

        confetti.className =
            "confetti";

        confetti.style.position =
            "fixed";

        confetti.style.zIndex =
            "9999";

        confetti.style.left =
            Math.random() * 100 + "vw";

        confetti.style.top =
            "-20px";

        confetti.style.width =
            "8px";

        confetti.style.height =
            "14px";

        confetti.style.background =
            [
                "#e92332",
                "#ff5b93",
                "#ffffff",
                "#ffd166"
            ][
                Math.floor(
                    Math.random() * 4
                )
            ];

        confetti.style.transform =
            `rotate(${Math.random() * 360}deg)`;

        confetti.style.pointerEvents =
            "none";

        document.body.appendChild(
            confetti
        );


        const duration =
            1800 +
            Math.random() * 1800;


        confetti.animate(

            [
                {
                    transform:
                        `translateY(0) rotate(0deg)`,
                    opacity: 1
                },

                {
                    transform:
                        `translateY(110vh) rotate(720deg)`,
                    opacity: 0
                }
            ],

            {
                duration: duration,
                easing: "cubic-bezier(.2,.8,.3,1)"
            }

        );


        setTimeout(() => {

            confetti.remove();

        }, duration + 100);

    }

}


/* ================================================= */
/* AJUSTE APÓS ROTAÇÃO DO CELULAR */
/* ================================================= */

window.addEventListener(
    "orientationchange",
    () => {

        /*
            Espera o navegador terminar
            a mudança de orientação antes
            de recalcular a posição.
        */

        setTimeout(() => {

            const current =
                document
                    .querySelector(".screen");

            if (current) {

                current.style.minHeight =
                    "100dvh";

            }

        }, 300);

    }
);
