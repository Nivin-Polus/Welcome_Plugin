function showPopup() {
    document.getElementById("popupContainer").style.display = "block";
    document.getElementById("overlay").style.display = "block";
    document.getElementById("greeting").textContent = `Hello, ${greetingMessage}`;
}

function closePopup() {
    document.getElementById("popupContainer").style.display = "none";
    document.getElementById("overlay").style.display = "none";
}

function getCurrentTimeAndDate() {
    const now = new Date();
    const timeOnly = now.toLocaleTimeString('en-US', { hour12: false }); 
    const dateOnly = now.toLocaleDateString('en-US'); 

    // console.log("Time:", timeOnly);
    // console.log("Date:", dateOnly);

    return { timeOnly, dateOnly }; 
}


const { timeOnly, dateOnly } = getCurrentTimeAndDate();

function wishing() {
    const hour = parseInt(timeOnly.split(':')[0], 10); 

    switch (true) {
        case (hour >= 0 && hour < 12):
            return "Good Morning";

        case (hour >= 12 && hour < 16):
            return "Good Afternoon";

        case (hour >= 16 && hour < 20):
            return "Good Evening";

        default:
            return "Good Night";
    }
}

const greetingMessage = wishing(); 

    

function holiday() {
    const BASE_CALENDAR_URL = "https://www.googleapis.com/calendar/v3/calendars";
    const BASE_CALENDAR_ID_FOR_PUBLIC_HOLIDAY = "holiday@group.v.calendar.google.com";
    const API_KEY = "AIzaSyDK1VxJA97m6HCraScyH1zcHObzPwR57Vk";
    const CALENDAR_REGION = "en.indian";
    
    const url = `${BASE_CALENDAR_URL}/${CALENDAR_REGION}%23${BASE_CALENDAR_ID_FOR_PUBLIC_HOLIDAY}/events?key=${API_KEY}`;
    
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("API request failed");
            }
            console.log("API request successful");
            return response.json();
        })
        .then(data => {
            const holidays = data.items;
            console.log(holidays.summary)

            if (!holidays || holidays.length === 0) {
                console.log("No holiday data found.");
                return;
            }
            
            const today = new Date(dateOnly); 
            
            holidays.forEach(holiday => {
                const holidayDate = new Date(holiday.start.date); 
                
                if (today.getTime() === holidayDate.getTime()) {
                    console.log("Today is a holiday:", holiday.summary);
                    document.getElementById("holidays").textContent = `Happy ${holiday.summary}`;
                    
                    
                    updatePopupBackground(holiday.summary);
                    
                } else {
                    const differenceInTime = holidayDate.getTime() - today.getTime();
                    const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24)); 
                    
                    if (differenceInDays > 0 && differenceInDays <= 10) {
                        
                        updatePopupBackground(holiday.summary);
                        console.log(`Holiday '${holiday.summary}' is coming up in ${differenceInDays} days on ${holiday.start.date}`);
                        document.getElementById("holidays").textContent = `${holiday.summary} is coming up in ${differenceInDays} Days`;
                    }
                }
            });
        })
        .catch(error => {
            console.error("Error fetching holiday data:", error);
        });
}

function updatePopupBackground(holidayName) {
    const popupContainer = document.getElementById("popupContainer");

    if (holidayName === "Christmas" || holidayName === "Christmas Eve") {
        popupContainer.style.backgroundImage = "url('./img/istockphoto-495053030-612x612.jpg')";
        startSnowfall();
    } else if (holidayName === "Onam") {
        popupContainer.style.backgroundImage = "url('./img/pngtree-character-with-long-beard-holding-umbrella-king-outram-festival-food-background-picture-image_1447518.jpg')";
        startFireworks();
        startOnamAnimation();
        addOnamImageToPopup()
        
    } else if (holidayName === "New Year") {
        popupContainer.style.backgroundImage = "url('./img/istockphoto-1084592294-612x612.jpg')"; 
        startFireworks();
    }else if (holidayName === "Republic Day") {
        popupContainer.style.backgroundImage = "url('./img/republic-day-hero.jpg')'"; 
        startFireworks();
    } else if (holidayName === "Independence Day") {
        popupContainer.style.backgroundImage = "url('./img/independence.jpg')";
        startFireworks(); 
    } else if (holidayName === "Gandhi Jayanti") {
        popupContainer.style.backgroundImage = "url('./img/gandhi.png')"; 
    } else if (holidayName === "Diwali") {
        popupContainer.style.backgroundImage = "url('./img/Diwali.jpg')"; 
        startFireworks();
    } else if (holidayName === "Holi") {
        popupContainer.style.backgroundImage = "url('./img//pongal1.webp')"; 
        startFireworks();
    } else if (holidayName === "Pongal") {
        popupContainer.style.backgroundImage = "url('./img/Pongal.jpg')"; 
    } else if (holidayName === "Ganesh Chaturthi") {
        popupContainer.style.backgroundImage = "url('./img/GaneshChaturthi.jpg')"; 
    } else if (holidayName === "Guru Nanak Jayanti") {
        popupContainer.style.backgroundImage = "url('./img/GuruNanakJayanti.jpg')"; 
    } else if (holidayName === "Mahashivratri") {
        popupContainer.style.backgroundImage = "url('./img/Mahashivratri.jpg')"; 
    } else if (holidayName === "Vasant Panchami") {
        popupContainer.style.backgroundImage = "url('./img/VasantPanchami.jpg')"; 
    } else {
        popupContainer.style.backgroundImage = ""; 
    }

}

let colorTarget = ''; 

function colorchange(target) {
    colorTarget = target; 
    document.getElementById("colorpicker").click(); 
}

function applyColor() {
    const popupContainer = document.getElementById("popupContainer"); 
    const color = document.getElementById("colorpicker").value;

    if (colorTarget === 'background') {
        
        popupContainer.style.backgroundImage = "none";
        popupContainer.style.backgroundColor = color;
    } else if (colorTarget === 'text') {
        
        popupContainer.style.color = color;
    }

    
    colorTarget = '';
}


// Snowflakes
let snowflakeInterval;
let stopSnowfallTimeout;
let stopSnowfall = false; 

function startSnowfall() {
    const numberOfSnowflakes = 30;

    snowflakeInterval = setInterval(() => {
        if (!stopSnowfall) {
            createSnowflake();
        }
    }, 300);

   
    stopSnowfallTimeout = setTimeout(() => {
        stopSnowfall = true;  
        clearInterval(snowflakeInterval); 
    }, 15000);
}

function createSnowflake() {
    if (stopSnowfall) return; 

    const snowflake = document.createElement('div');
    snowflake.classList.add('snowflake');
    snowflake.textContent = '❄️';

    
    snowflake.style.left = `${Math.random() * 100}vw`;
    snowflake.style.animationDuration = `${Math.random() * 3 + 2}s`;
    snowflake.style.opacity = Math.random();

    document.body.appendChild(snowflake);

    
    snowflake.addEventListener('animationend', () => {
        snowflake.remove();
    });
}

//Firework Animation
let fireworkInterval;
let fireworkTimeout;

function startFireworks() {
    const fireworksContainer = document.getElementById("fireworksContainer");
    fireworksContainer.style.display = "block";
   
    fireworkInterval = setInterval(createFireworkBurst, 500);

    fireworkTimeout = setTimeout(stopFireworks, 10000);
}

function stopFireworks() {
    const fireworksContainer = document.getElementById("fireworksContainer");
    clearInterval(fireworkInterval);
    fireworksContainer.style.display = "none";
    fireworksContainer.innerHTML = "";
}

function createFireworkBurst() {
    const fireworksContainer = document.getElementById("fireworksContainer");
    const burstCenterX = Math.random() * window.innerWidth;
    const burstCenterY = Math.random() * window.innerHeight * 0.5; // Explodes in upper half of screen

    // Create multiple particles for each burst
    const numberOfParticles = 30;
    for (let i = 0; i < numberOfParticles; i++) {
        createFireworkParticle(burstCenterX, burstCenterY);
    }
}

function createFireworkParticle(x, y) {
    const fireworksContainer = document.getElementById("fireworksContainer");
    const particle = document.createElement("div");
    particle.classList.add("firework");

    
    const angle = Math.random() * 2 * Math.PI; 
    const speed = Math.random() * 4 + 2; 
    const velocityX = Math.cos(angle) * speed;
    const velocityY = Math.sin(angle) * speed;

    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;

    // Randomize color of each particle
    particle.style.backgroundColor = getRandomColor();

    fireworksContainer.appendChild(particle);

    // Animate the particle
    let lifetime = 0;
    const animationInterval = setInterval(() => {
        lifetime += 1;
        particle.style.transform = `translate(${velocityX * lifetime}px, ${velocityY * lifetime}px)`;
        particle.style.opacity = Math.max(1 - lifetime / 20, 0); 
        
        if (lifetime > 25) {
            clearInterval(animationInterval);
            particle.remove();
        }
    }, 16); 
}

function getRandomColor() {
    const colors = ["#FF5733", "#33FF57", "#3357FF", "#FF33A1", "#FFBD33"];
    return colors[Math.floor(Math.random() * colors.length)];
}


// Flowers Onam
let flowerInterval;
let flowerTimeout;

function startOnamAnimation() {
    
    let flowerContainer = document.getElementById("flowerContainer");
    if (!flowerContainer) {
        flowerContainer = document.createElement("div");
        flowerContainer.id = "flowerContainer";
        document.body.appendChild(flowerContainer);
    }

    flowerContainer.style.display = "block"; 

   
    flowerInterval = setInterval(createFlower, 300);

  
    flowerTimeout = setTimeout(stopOnamAnimation, 7000);
}

function stopOnamAnimation() {
    const flowerContainer = document.getElementById("flowerContainer");
    clearInterval(flowerInterval); 
    if (flowerContainer) {
        flowerContainer.style.display = "none"; 
        flowerContainer.innerHTML = ""; 
    }
}

function createFlower() {
    const flowerContainer = document.getElementById("flowerContainer");
    const flower = document.createElement("div");
    flower.classList.add("flower");

    
    flower.style.left = `${Math.random() * 100}vw`;
    flower.style.animationDuration = `${Math.random() * 3 + 2}s`; 

    
    flowerContainer.appendChild(flower);

    
    flower.addEventListener("animationend", () => {
        flower.remove();
    });
}

//onam
function addOnamImageToPopup() {
    // Get the popup container
    const popupContainer = document.getElementById("popupContainer");

    // Create the container for the Onam image
    const onamImageContainer = document.createElement("div");
    onamImageContainer.id = "onamImageContainer";

    // Create the Onam image
    const onamImage = document.createElement("img");
    onamImage.src = "./img/onam12.webp";
    onamImage.alt = "Maveli and Kids";
    onamImage.id = "onamImage";

    // Create the speech bubble
    const speechBubble = document.createElement("div");
    speechBubble.id = "speechBubble";
    speechBubble.textContent = "Happy Onam!";

    // Create the arrow below the speech bubble
    const speechBubbleArrow = document.createElement("div");
    speechBubbleArrow.className = "speechBubbleArrow";

    // Append the arrow to the speech bubble
    speechBubble.appendChild(speechBubbleArrow);

    // Append the speech bubble above the Onam image in the image container
    onamImageContainer.appendChild(speechBubble);
    onamImageContainer.appendChild(onamImage);

    // Append the image container to the popup container
    popupContainer.insertBefore(onamImageContainer, popupContainer.firstChild);
}

window.onload = function() {
    showPopup(); 
    holiday();   
};

