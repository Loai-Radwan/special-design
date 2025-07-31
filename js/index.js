// Check if there is a local storage color
let mainColor = localStorage.getItem("color_option");

if (mainColor) {
    document.documentElement.style.setProperty("--main-color", mainColor);
    // Remove active class
    document.querySelectorAll(".colors-list li").forEach((item) => {
        item.classList.remove("active");
        if (item.dataset.color === mainColor) {
            item.classList.add("active");
        }
    });
}

// variable to control the setInterval
let backgroundInterval;

// Random Background option
let backgroundOption = true;

// Check what is the user option for the background image
let mainBackground = localStorage.getItem("random_background");

if (mainBackground) {
    document.querySelectorAll('.background span').forEach(span => {
        span.classList.remove('active')
    })
    if (mainBackground === "true") {
        backgroundOption = true;
        document.querySelector(".background .yes").classList.add("active");
    } else {
        backgroundOption = false;
        document.querySelector(".background .no").classList.add("active");
    }
}

//Select gear Button
let gear = document.querySelector(".toggle-setting");
gear.addEventListener("click", function () {
    this.children[0].classList.toggle("fa-spin");
    document.querySelector(".setting-box").classList.toggle("opened");
});

let colorsLi = document.querySelectorAll(".colors-list li");

colorsLi.forEach((ele) => {
    ele.addEventListener("click", function (event) {
        // Set Color on Root
        document.documentElement.style.setProperty(
            "--main-color",
            event.target.dataset.color
        );
        // Set  Color on Local Storage
        localStorage.setItem("color_option", event.target.dataset.color);
        console.log(event.target)
        console.log(this)

        // Remove the active class from all lis and Add active class to the target
        handleActive(event)

        // event.target.classList.add("active");
    });
});

let landing = document.querySelector(".landing");

// All Images names
let imgArr = ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg"];

// Random Background
const backgroundEl = document.querySelectorAll(".background span");

backgroundEl.forEach((span) => {
    span.addEventListener("click", (e) => {
        //Remove active class and Add active class to target
        handleActive(e)

        if (e.target.dataset.background === "yes") {
            backgroundOption = true;
            randomizeImage();
            localStorage.setItem("random_background", true);
        } else {
            backgroundOption = false;
            clearInterval(backgroundInterval);
            localStorage.setItem("random_background", false);
        }
    });
});

randomizeImage();

// Create popup with teh image
let gallery = document.querySelectorAll(".gallery .images-box img");

gallery.forEach((img) => {
    img.addEventListener("click", (e) => {
        // Create overlay element
        let overlay = document.createElement("div");

        overlay.className = "popup-overlay";

        // append overlay to the body
        document.body.appendChild(overlay);

        //Create popup
        let popupBox = document.createElement("div");
        popupBox.className = "popup-box";

        // create the image
        let popupImg = document.createElement("img");

        // Get and Set image src
        popupImg.setAttribute("src", img.getAttribute("src"));

        // Heading for the popup
        let popupHeading = document.createElement("h3");
        popupHeading.innerHTML = img.getAttribute("alt") || "Gallery Image";

        popupBox.appendChild(popupHeading);

        // Add the img to the popup box
        popupBox.appendChild(popupImg);
        document.body.appendChild(popupBox);

        //Create close span
        let closeSpan = document.createElement("span");
        closeSpan.className = "close-popup";
        closeSpan.innerHTML = `<i class="fa-solid fa-xmark"></i>`;

        //Append the close Icon to the popup box
        popupBox.appendChild(closeSpan);

        closeSpan.addEventListener("click", () => {
            overlay.remove();
            popupBox.remove();
        });

    });
});

let bulletsSpan = document.querySelectorAll('.bullets span');
let bulletHandler = document.querySelector('.nav-bullets');

let mainBullet = localStorage.getItem('bullets')
if (mainBullet) {
    bulletsSpan.forEach((span) => {
        span.classList.remove("active");
    });
    if (mainBullet === "true") {
        bulletHandler.style.display = "block";
        document.querySelector(".bullets .yes").classList.add("active");
    } else {
        bulletHandler.style.display = "none";
        document.querySelector(".bullets .no").classList.add("active");
    }
}

//Reset Button
document.querySelector('.reset').onclick = () => {
    localStorage.clear()
    window.location.reload()
}

bulletsSpan.forEach(span => {
    span.addEventListener('click', (e) => {
        handleActive(e)

        if (e.target.dataset.bullet === "true") {
            bulletHandler.style.display = 'block'
            localStorage.setItem("bullets", true);
        } else {
            bulletHandler.style.display = 'none'
            localStorage.setItem("bullets", false);
        }
    })
})

// Menu Button
let menuButton = document.querySelector('.toggle-menu')
let linksMenu = document.querySelector('.links')
menuButton.onclick = (e) => {
    // Stop propagation
    e.stopPropagation();
    linksMenu.classList.toggle('opened')
    menuButton.classList.toggle("clicked");
}

linksMenu.onclick = (e) => {
    e.stopPropagation()
}

document.addEventListener('click', (e) => {

    if (e.target !== menuButton && e.target !== linksMenu) {
        if (linksMenu.classList.contains('opened')) {
            linksMenu.classList.remove('opened')
            menuButton.classList.remove('clicked')
        }

    }
})

// Remove active class form all elements and add it to the target one
function scrollTo(elements) {
    elements.forEach((element) => {
        element.addEventListener("click", (e) => {
            e.preventDefault()
            document.querySelector(`.${e.target.dataset.section}`)
                .scrollIntoView({
                    behavior: "smooth",
                });
        });
    });
}

//Handle Active class from all children
function handleActive(e) {
    e.target.parentElement.querySelectorAll('.active').forEach(element => {
        element.classList.remove('active')
    })
    e.target.classList.add('active')
}

// Change the background of the landing page
function randomizeImage() {
    if (backgroundOption === true) {
        backgroundInterval = setInterval(() => {
            // Generate random Number
            let number = Math.floor(Math.random() * imgArr.length);
            //Pick a random image
            landing.style.backgroundImage = `url(./img/${imgArr[number]})`;
        }, 3000);
    }
}

function isInView(ele) {
    // Select element section
    let element = document.querySelector(ele);

    // testimonials offset top
    let elementTop = element.offsetTop;

    // testimonials outer hight
    let elementHeight = element.offsetHeight;

    //window height
    let windowHeight = this.innerHeight;

    // Window Y offset
    let windowScrollTop = this.pageYOffset;

    return windowScrollTop >= elementTop + elementHeight / 4 - windowHeight;
}

// Select all bullets
const allBullets = document.querySelectorAll('.nav-bullets .bullet')
scrollTo(allBullets)

//Select all links 
let links = document.querySelectorAll('.links a')
scrollTo(links)


$(".ts .ts-box").slideUp();
$(".timeline-content").fadeTo(100, 0.2);

window.addEventListener("scroll", function () {
    let featBox = document.querySelectorAll(".features .feat-box");
    if (isInView(".features")) {
        featBox.forEach((feat) => {
            feat.style.animationName = "show";
        });
    }
    let tsBoxes = document.querySelectorAll(".testimonials .ts .ts-box");
    if (isInView(".testimonials")) {
        for (let i = 0; i < tsBoxes.length; i++) {
            let ele = $(".ts .ts-box").eq(i);
            ele.slideDown(1000);
        }
    }
    if (isInView(".skills")) {
        let allSkills = document.querySelectorAll(".skill-box .progress span");
        allSkills.forEach((skill) => {
            skill.style.width = skill.dataset.progress;
        });
    }
    if (isInView(".timeline-content")) {
        $(".timeline-content").fadeTo(1500, 1);
    }
});
