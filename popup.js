(function(window, document) {
    
    function createRequiredElements() {
     
      if (!document.getElementById("overlay")) {
        const overlay = document.createElement("div");
        overlay.id = "overlay";
        document.body.appendChild(overlay);
      }
  
      // Create popup container
      if (!document.getElementById("popupContainer")) {
        const popupContainer = document.createElement("div");
        popupContainer.id = "popupContainer";
  
        // Add greeting elements 
        const greeting = document.createElement("h2");
        greeting.id = "greeting";
        greeting.textContent = "Hello, ";
        popupContainer.appendChild(greeting);
  
        const message = document.createElement("h3");
        message.textContent = "Hope you are doing Well!";
        popupContainer.appendChild(message);
  
        const holidays = document.createElement("h4");
        holidays.id = "holidays";
        popupContainer.appendChild(holidays);
  
        const closeButton = document.createElement("button");
        closeButton.textContent = "Close";
        closeButton.onclick = closePopup;
        popupContainer.appendChild(closeButton);

        const backgroundColorButton = document.createElement("button");
        backgroundColorButton.textContent = "Change Background Color";
        backgroundColorButton.onclick = () => colorchange('background');
        popupContainer.appendChild(backgroundColorButton);
      
        const textColorButton = document.createElement("button");
        textColorButton.textContent = "Change Text Color";
        textColorButton.onclick = () => colorchange('text');
        popupContainer.appendChild(textColorButton);
  
        document.body.appendChild(popupContainer);
      }
    }
  
   
    function showPopup() {
      createRequiredElements(); // Make sure elements are created
      document.getElementById("popupContainer").style.display = "block";
      document.getElementById("overlay").style.display = "block";
      document.getElementById("greeting").textContent = `Hello, ${greetingMessage}`;
    }
 
    function closePopup() {
      const popupContainer = document.getElementById("popupContainer");
      const overlay = document.getElementById("overlay");
      if (popupContainer && overlay) {
        popupContainer.style.display = "none";
        overlay.style.display = "none";
      }
    }
  
    function getCurrentTimeAndDate() {
      const now = new Date();
      const timeOnly = now.toLocaleTimeString('en-US', { hour12: false });
      const dateOnly = now.toLocaleDateString('en-US');
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
              
              if (differenceInDays > 0 && differenceInDays <= 50) {
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
        // Christmas: Snowfall effect and background image
        popupContainer.style.backgroundImage = "url('https://nivin-polus.github.io/Welcome_Plugin/img/christmas.jpg')";
        startSnowfall();
        document.getElementById("holidays").textContent = "Merry Christmas! 🎄";
      } else if (holidayName === "Onam") {
        // Onam: Fireworks, Onam animation, add image of Maveli and children, and background
        popupContainer.style.backgroundImage = "url('https://nivin-polus.github.io/Welcome_Plugin/img/onam.jpg')";
        startFireworks();
        startOnamAnimation();
        addOnamImageToPopup();
        document.getElementById("holidays").textContent = "Happy Onam! 🎉";
      } else if (holidayName === "New Year") {
        // New Year: Fireworks effect and background image
        popupContainer.style.backgroundImage = "url('https://nivin-polus.github.io/Welcome_Plugin/img/new_year.jpg')";
        startFireworks();
        document.getElementById("holidays").textContent = "Happy New Year! 🎉";
      } else if (holidayName === "Republic Day") {
        // Republic Day: Fireworks effect and background image
        popupContainer.style.backgroundImage = "url('https://nivin-polus.github.io/Welcome_Plugin/img/republic_day.jpg')";
        startFireworks();
        document.getElementById("holidays").textContent = "Happy Republic Day! 🇮🇳";
      } else if (holidayName === "Independence Day") {
        // Independence Day: Fireworks effect and background image
        popupContainer.style.backgroundImage = "url('https://nivin-polus.github.io/Welcome_Plugin/img/independence_day.jpg')";
        startFireworks();
        document.getElementById("holidays").textContent = "Happy Independence Day! 🇮🇳";
      } else if (holidayName === "Gandhi Jayanti") {
        // Gandhi Jayanti: Background image and greeting
        popupContainer.style.backgroundImage = "url('https://nivin-polus.github.io/Welcome_Plugin/img/gandhi_jayanti.jpg')";
        document.getElementById("holidays").textContent = "Gandhi Jayanti - Tribute to Mahatma Gandhi! 🕊️";
      } else if (holidayName === "Diwali") {
        // Diwali: Fireworks effect and background image
        popupContainer.style.backgroundImage = "url('https://nivin-polus.github.io/Welcome_Plugin/img/diwali.jpg')";
        startFireworks();
        document.getElementById("holidays").textContent = "Happy Diwali! 🪔";
      } else if (holidayName === "Holi") {
        // Holi: Fireworks effect and background image
        popupContainer.style.backgroundImage = "url('https://nivin-polus.github.io/Welcome_Plugin/img/holi.jpg')";
        startFireworks();
        document.getElementById("holidays").textContent = "Happy Holi! 🎨";
      } else if (holidayName === "Pongal") {
        // Pongal: Background image and greeting
        popupContainer.style.backgroundImage = "url('https://nivin-polus.github.io/Welcome_Plugin/img/pongal.jpg')";
        document.getElementById("holidays").textContent = "Happy Pongal! 🌾";
      } else if (holidayName === "Ganesh Chaturthi") {
        // Ganesh Chaturthi: Background image and greeting
        popupContainer.style.backgroundImage = "url('https://nivin-polus.github.io/Welcome_Plugin/img/ganesh_chaturthi.jpg')";
        document.getElementById("holidays").textContent = "Happy Ganesh Chaturthi! 🙏🐘";
      } else if (holidayName === "Guru Nanak Jayanti") {
        // Guru Nanak Jayanti: Background image and greeting
        popupContainer.style.backgroundImage = "url('https://nivin-polus.github.io/Welcome_Plugin/img/guru_nanak_jayanti.jpg')";
        document.getElementById("holidays").textContent = "Happy Guru Nanak Jayanti! 🙏";
      } else if (holidayName === "Mahashivratri") {
        // Mahashivratri: Background image and greeting
        popupContainer.style.backgroundImage = "url('https://nivin-polus.github.io/Welcome_Plugin/img/mahashivratri.jpg')";
        document.getElementById("holidays").textContent = "Happy Mahashivratri! 🕉️";
      } else if (holidayName === "Vasant Panchami") {
        // Vasant Panchami: Background image and greeting
        popupContainer.style.backgroundImage = "url('https://nivin-polus.github.io/Welcome_Plugin/img/vasant_panchami.jpg')";
        document.getElementById("holidays").textContent = "Happy Vasant Panchami! 🌼";
      } else {
        // Default: No specific holiday effect
        popupContainer.style.backgroundImage = "";
        document.getElementById("holidays").textContent = "Welcome!";
      }
    }
    
  
    let colorTarget = '';

function colorchange(target) {
  colorTarget = target;

  // Ensure color picker exists before clicking it
  let colorPicker = document.getElementById("colorpicker");
  if (!colorPicker) {
    colorPicker = document.createElement("input");
    colorPicker.type = "color";
    colorPicker.id = "colorpicker";
    colorPicker.style.display = "none"; // Hide the color picker
    colorPicker.onchange = applyColor; // Set the onchange event to apply the selected color
    document.body.appendChild(colorPicker);
  }

  // Click the color picker programmatically
  colorPicker.click();
}

function applyColor() {
  const popupContainer = document.getElementById("popupContainer");
  if (!popupContainer) {
    console.error("Popup container not found.");
    return;
  }

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
  // Reset the stop flag when starting the snowfall
  stopSnowfall = false;
  
  // Number of snowflakes
  const numberOfSnowflakes = 30;

  // Start creating snowflakes at intervals
  snowflakeInterval = setInterval(() => {
    if (!stopSnowfall) {
      createSnowflake();
    }
  }, 300);

  // Set a timeout to stop snowfall after 15 seconds
  stopSnowfallTimeout = setTimeout(() => {
    stopSnowfall = true;
    clearInterval(snowflakeInterval);
    
    // Remove all existing snowflakes from the screen
    const allSnowflakes = document.querySelectorAll('.snowflake');
    allSnowflakes.forEach(snowflake => snowflake.remove());
  }, 15000);
}

function createSnowflake() {
  // If snowfall is set to stop, don't create new snowflakes
  if (stopSnowfall) return;

  // Create a new snowflake element
  const snowflake = document.createElement('div');
  snowflake.classList.add('snowflake');
  snowflake.textContent = '❄️';

  // Set random styles for the snowflake
  snowflake.style.left = `${Math.random() * 100}vw`;
  snowflake.style.animationDuration = `${Math.random() * 3 + 2}s`;
  snowflake.style.opacity = Math.random();

  // Append the snowflake to the body
  document.body.appendChild(snowflake);

  // Remove the snowflake once its animation is complete
  snowflake.addEventListener('animationend', () => {
    snowflake.remove();
  });
}

  
    // Firework Animation
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
      particle.style.backgroundColor = getRandomColor();
  
      fireworksContainer.appendChild(particle);
  
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
  
    // Onam
    function addOnamImageToPopup() {
      const popupContainer = document.getElementById("popupContainer");
      const onamImageContainer = document.createElement("div");
      onamImageContainer.id = "onamImageContainer";
  
      const onamImage = document.createElement("img");
      onamImage.src = "./img/onam12.webp";
      onamImage.alt = "Maveli and Kids";
      onamImage.id = "onamImage";
  
      const speechBubble = document.createElement("div");
      speechBubble.id = "speechBubble";
      speechBubble.textContent = "Happy Onam!";
  
      const speechBubbleArrow = document.createElement("div");
      speechBubbleArrow.className = "speechBubbleArrow";
      speechBubble.appendChild(speechBubbleArrow);
  
      onamImageContainer.appendChild(speechBubble);
      onamImageContainer.appendChild(onamImage);
      popupContainer.insertBefore(onamImageContainer, popupContainer.firstChild);
    }
      
    window.onload = function() {
      createRequiredElements(); 
      showPopup(); 
      holiday(); 
    };
  
  })(window, document);
