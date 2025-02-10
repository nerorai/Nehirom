document.addEventListener("DOMContentLoaded", function () {
  const toggle = document.getElementById("input"); // New toggle button ID
  const body = document.body;
  userRadios.forEach(radio => (radio.checked = false));

  // Load saved theme from localStorage
  if (localStorage.getItem("darkTheme") === "true") {
    toggle.checked = true;
    body.classList.add("dark-mode");
  }

  toggle.addEventListener("change", function () {
    if (toggle.checked) {
      body.classList.add("dark-mode");
      localStorage.setItem("darkTheme", "true");
    } else {
      body.classList.remove("dark-mode");
      localStorage.setItem("darkTheme", "false");
    }
  });
});

// Uncheck all radio buttons in the final selection section on page load
window.addEventListener('load', () => {
  const finalSelectionRadios = document.querySelectorAll('input[name="final-choice"]');
  finalSelectionRadios.forEach(radio => {
    radio.checked = false; // Uncheck all radio buttons
  });
});

// Get elements
const homepage = document.getElementById('homepage');
const clickMeButton = document.querySelector('button');
const selectionPage = document.getElementById('selection-page');
const proceedButton = document.getElementById('proceed-button');
const userRadios = document.querySelectorAll('input[name="user"]');
const confirmationPage = document.getElementById('confirmation-page');
const q1 = document.getElementById('q1');
const q2 = document.getElementById('q2');
const q3 = document.getElementById('q3');
const finalSelection = document.getElementById('final-selection');
const yesQ1 = document.getElementById('yes-q1');
const noQ1 = document.getElementById('no-q1');
const yesQ2 = document.getElementById('yes-q2');
const noQ2 = document.getElementById('no-q2');
const yesQ3 = document.getElementById('yes-q3');
const yes2Q3 = document.getElementById('yes2-q3');
const confirmFinalButton = document.getElementById('confirm-final');
const cbx5 = document.getElementById('cbx5');
const congratsPage = document.getElementById("congratsPage");
const securityBox = document.getElementById("securityBox");
const floatingMessage = document.getElementById("floatingMessage");
const continueButton = document.getElementById("continue-button");
const doNothingButton = document.getElementById("do-nothing-button");
const yayyButton = document.getElementById("yayy-button");
const doorButton = document.getElementById("door-button");


let clickCount = 0;

// Show the selection page when "Click Me" is clicked
doorButton.addEventListener('click', () => {
  const whitedoorm = document.getElementById("whitedoorm");
  const doortext = document.getElementById("door-text");

  createPopupMessage("<span id='popup-text'></span>", [
    { id: "okay-button", text: "OPEN THE DOOR", action: () => {
    }}
  ]);
  setTimeout(() => {
    const textElement = document.getElementById('popup-text');
    typeText(textElement, "A white door casts faint shadow \nWhat would you like to do?", 40);
}, 100);  
  return true;
});

clickMeButton.addEventListener('click', () => {
  document.querySelector('.container').classList.add('hidden'); // Hide homepage
  selectionPage.classList.remove('hidden'); // Show selection page
});

// Update button text and reset position when user changes
userRadios.forEach(radio => {
  radio.addEventListener('change', () => {
    if (radio.value === 'Nehir') {
      proceedButton.textContent = 'Click here, four eyes';

      q1.classList.add('hidden');
      q2.classList.add('hidden');
      q3.classList.add('hidden');
      finalSelection.classList.add('hidden');
      confirmationPage.classList.add('hidden');

    } else {
      proceedButton.textContent = 'Proceed';
      proceedButton.style.transition = 'transform 0.3s ease';
      proceedButton.style.transform = 'translate(0, 0)';
      clickCount = 0; // Reset click count
    }
  });
});

// Handle proceed button click
proceedButton.addEventListener('click', () => {
  const selectedUser = document.querySelector('input[name="user"]:checked');
  if (selectedUser.value === 'Nehir') {
    clickCount++;

    // Move the button on first and second clicks
    if (clickCount === 1 || clickCount === 2) {
      const moveX = (Math.random() * 100 - 50); // Move more (between -50px and 50px)
      const moveY = (Math.random() * 100 - 50); // Move more (between -50px and 50px)
      proceedButton.style.transition = 'transform 0.5s ease'; // Smooth animation
      proceedButton.style.transform = `translate(${moveX}px, ${moveY}px)`;
    }
  } 
});

// Show confirmation page when Nehir is chosen
proceedButton.addEventListener('click', () => {
  
  const selectedUser = document.querySelector('input[name="user"]:checked');
  if (selectedUser && selectedUser.value === 'Nehir' && clickCount === 3) {
    selectionPage.classList.add('hidden');
    confirmationPage.classList.remove('hidden');
    q1.classList.remove('hidden');
    
  }
});

// Handle Q1: Are you Sure?
yesQ1.addEventListener('click', () => {
  q1.classList.add('hidden');
  q2.classList.remove('hidden');
});

noQ1.addEventListener('click', () => {
  confirmationPage.classList.add('hidden');
  selectionPage.classList.remove('hidden');

  // Reset radio selection (Uncheck all)
  userRadios.forEach(radio => (radio.checked = false));

  // Reset button position and click count
  proceedButton.style.transition = 'none';
  proceedButton.style.transform = 'translate(0, 0)';
  clickCount = 0;

  // Reset button text
  proceedButton.textContent = 'Proceed';
});


// Handle Q2: Are you really sure?
yesQ2.addEventListener('click', () => {
  q2.classList.add('hidden');
  q3.classList.remove('hidden');
});

noQ2.addEventListener('click', () => {
  confirmationPage.classList.add('hidden');
  selectionPage.classList.remove('hidden');

  // Reset radio selection (Uncheck all)
  userRadios.forEach(radio => (radio.checked = false));

  // Reset button position and click count
  proceedButton.style.transition = 'none';
  proceedButton.style.transform = 'translate(0, 0)';
  clickCount = 0;

  // Reset button text
  proceedButton.textContent = 'Proceed';
});

// Handle Q3: Like.. are you really Nehir?
yesQ3.addEventListener('click', () => {
  q3.classList.add('hidden');
  finalSelection.classList.remove('hidden');
});

yes2Q3.addEventListener('click', () => {
  q3.classList.add('hidden');
  finalSelection.classList.remove('hidden');
});

// Handle "No" button in "Are you Sure?" section
noQ1.addEventListener('click', () => {
  createPopupMessage("You’re still welcome ♡.", [
    { id: "okay-button", text: "Okay", action: () => {
      document.querySelector('.alert-box').remove();
      createPopupMessage("NOW GO AND CLICK YOUR NAME.", [
        { id: "okay-button", text: "Okay", action: () => {
          document.querySelector('.alert-box').remove();
          confirmationPage.classList.add('hidden'); // Hide confirmation page
          selectionPage.classList.remove('hidden'); // Show selection page
        }}
      ]);
    }}
  ]);
});

// Handle "No" button in "Are you really sure?" section
noQ2.addEventListener('click', () => {
  createPopupMessage("You’re still welcome ♡.", [
    { id: "okay-button", text: "Okay", action: () => {
      document.querySelector('.alert-box').remove();
      createPopupMessage("NOW GO AND CLICK YOUR NAME.", [
        { id: "okay-button", text: "Okay", action: () => {
          document.querySelector('.alert-box').remove();
          confirmationPage.classList.add('hidden'); // Hide confirmation page
          selectionPage.classList.remove('hidden'); // Show selection page
        }}
      ]);
    }}
  ]);
});

// the falling animations
const numConfetti = 30;

function createConfetti() {
    for (let i = 0; i < numConfetti; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        confetti.style.left = `${Math.random() * window.innerWidth}px`;
        confetti.style.animationDelay = `${Math.random() * 2}s`;
        confetti.style.animationDuration = `${Math.random() * 2 + 2}s`;
        document.body.appendChild(confetti);
    }
}
window.onload = createConfetti;

// Handle confirmation button click
confirmFinalButton.addEventListener('click', () => {
  const selectedOption = document.querySelector('input[name="final-choice"]:checked');
  if (selectedOption && selectedOption.id === 'cbx5') {
    wrongAttempts = 0;
    finalSelection.classList.add('hidden');
    congratsPage.classList.remove('hidden');

    const yayyButton = document.getElementById('yayy-button');
    yayyButton.addEventListener('click', () => {
      congratsPage.remove();
      securityBox.classList.remove('hidden')
      
      const doNothingButton = document.getElementById('do-nothing-button');
      doNothingButton.addEventListener('click', () => {
        floatingMessage.classList.remove('hidden')
        
        const closeButton = floatingMessage.querySelector('button');
        closeButton.addEventListener('click', () => {
          floatingMessage.classList.add('hidden');
        });
      });
    });
  }
});

let wrongAttempts = 0;

// Function to create a popup message
function createPopupMessage(message, buttons) {
  // Disable interaction with the rest of the page
  document.body.classList.add('disable-interaction');

  const popup = document.createElement('div');
  popup.classList.add('alert-box');
  popup.innerHTML = `
    <p>${message}</p>
    <div>
      ${buttons.map(button => `<button id="${button.id}">${button.text}</button>`).join('')}
    </div>
  `;
  document.body.appendChild(popup);

  // Handle button clicks
  buttons.forEach(button => {
    const btnElement = document.getElementById(button.id);
    btnElement.addEventListener('click', () => {
      button.action(); // Run the button's action
      document.body.classList.remove('disable-interaction'); // Re-enable interaction
      popup.remove(); // Remove the message box
    });
  });
}

// Function to handle wrong attempts
function handleWrongAttempt() {
  wrongAttempts++;
  if (wrongAttempts === 3) {
    createPopupMessage("<span id='popup-text'></span>", [
      { id: "okay-button", text: "Okay", action: () => {
        createPopupMessage("<span id='popup-text'></span>", [
          { id: "yes-button", text: "Yes", action: () => {
          }},
          { id: "ofcourse-button", text: "O-Ofcourse I'm N-Nehir", action: () => {
          }}
        ]);
        setTimeout(() => {
          const textElement = document.getElementById('popup-text');
          typeText(textElement, "Is that you, Nehir?", 50);
      }, 100);      
      }}
    ]);
    setTimeout(() => {
      const textElement = document.getElementById('popup-text');
      typeText(
          textElement, 
          "What are you trying to do? The real Nehir would have known from the first glance.", 
          50, // Typing speed
          26, // Pause after "What are you trying to do?" (26 characters long)
          1500 // Pause duration (1 second)
      );
  }, 100);  
  
    return true;
  }

  if (wrongAttempts === 7) {
    createPopupMessage("<span id='popup-text'></span>", [
      { id: "okay-button", text: "Okay", action: () => {
      }}
    ]);
    setTimeout(() => {
      const textElement = document.getElementById('popup-text');
      typeText(textElement, "Trying to test something?", 40);
  }, 100);  
    return true;
  }

  return false;
}

// Handle final selection button click
confirmFinalButton.addEventListener('click', () => {
  const selectedOption = document.querySelector('input[name="final-choice"]:checked');

  if (selectedOption) {
    // Check if the wrong attempts popup was triggered
    const wrongAttemptsPopupTriggered = handleWrongAttempt();

    // If the wrong attempts popup was triggered, do not show the specific choice popup
    if (wrongAttemptsPopupTriggered) {
      return; // Exit the function early
    }

    switch (selectedOption.id) {
      case 'cbx1': // Arigato
      case 'cbx3': // Soywa
      case 'cbx4': // Nani
        createPopupMessage("<span id='popup-text'></span>", [
          { id: "okay-button", text: "Okay", action: () => {
            document.querySelector('.alert-box').remove();
          }}
        ]);
        setTimeout(() => {
          const textElement = document.getElementById('popup-text');
          typeText(textElement, "Please don't try again. We have an unbreakable security system.", 45);
      }, 100);      
        break;
      case 'cbx2': // Ronaldo
        createPopupMessage("<span id='popup-text'></span>", [
          { id: "okay-button", text: "Okay", action: () => {
            document.querySelector('.alert-box').remove();
          }}
        ]);
        setTimeout(() => {
          const textElement = document.getElementById('popup-text');
          typeText(textElement, "What Ronaldo?", 50);
      }, 100);      
    }
  }
});

let audioContext;
let typingSoundBuffer;
let typingSoundSource;

function loadAudio() {
    fetch('sounds/omori.mp3')
        .then(response => response.arrayBuffer())
        .then(data => audioContext.decodeAudioData(data))
        .then(buffer => {
            typingSoundBuffer = buffer;
        });
}

function initAudio() {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    loadAudio();
}

function playTypingSound() {
    if (!typingSoundBuffer) return;

    typingSoundSource = audioContext.createBufferSource();
    typingSoundSource.buffer = typingSoundBuffer;
    typingSoundSource.loop = true;
    typingSoundSource.connect(audioContext.destination);
    typingSoundSource.start();
}

function stopTypingSound() {
    if (typingSoundSource) {
        typingSoundSource.stop();
        typingSoundSource.disconnect();
    }
}

initAudio();

function typeText(element, text, speed, pauseAt, pauseTime, onComplete) {
  let index = 0;
  let isPaused = false;

  playTypingSound(); // Start playing the typing sound

  const buttons = document.querySelectorAll('button');
  buttons.forEach(button => {
      button.style.pointerEvents = 'none';
  });

  function type() {
      if (index < text.length) {
          if (index === pauseAt && !isPaused) {
              isPaused = true;
              stopTypingSound(); // Stop sound during pause
              setTimeout(() => {
                  playTypingSound(); // Resume sound after pause
                  type();
              }, pauseTime);
              return;
          }
          element.innerHTML += text.charAt(index);
          index++;
          setTimeout(type, speed);
      } else {
          stopTypingSound(); // Stop sound when finished
          buttons.forEach(button => {
              button.style.pointerEvents = 'auto';
          });
          if (onComplete) onComplete();
      }
  }

  type();
}

// Trigger the floating message when "Do nothing" is clicked
doNothingButton.addEventListener("click", () => {
  const floatingMessage = document.getElementById("floatingMessage");
  const floatingText = document.getElementById("floating-text");

  floatingMessage.classList.remove("hidden");

  floatingText.innerHTML = "";

  // Call the existing typeText function
  typeText(floatingText, "You did 'nothing'.", 50); // Adjust speed (100ms per character)
});