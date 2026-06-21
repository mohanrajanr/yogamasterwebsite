const app = document.getElementById('app');

let state = {
    step: 0,
    date: '',
    time: '',
    location: '',
    food: '',
    activity: ''
};

const locations = [
    { id: 'besant', label: 'Besant Nagar Beach 🏖️' },
    { id: 'ecr', label: 'ECR Drive 🚗' },
    { id: 'anna_nagar', label: 'Anna Nagar Cafe ☕' },
    { id: 'mylapore', label: 'Mylapore Walk 🛕' },
    { id: 'cafe_choice', label: 'Cafe at your choice ☕' },
    { id: 'sea', label: 'Sunrise or boating at centre of sea 🌅' }
];

const foods = [
    { id: 'thali', label: 'South Indian Thali 🍛' },
    { id: 'biryani', label: 'Biryani (Obviously) 🍗' },
    { id: 'coffee', label: 'Filter Coffee & Snacks ☕' },
    { id: 'cafe', label: 'Cute Cafe Food 🍝' },
    { id: 'home', label: 'My Home for lunch 🏡' }
];

const activities = [
    { id: 'morning_run', label: 'Morning run 🏃‍♂️' },
    { id: 'evening_run', label: 'Evening run 🏃‍♀️' },
    { id: 'drive', label: 'Long drive 🛣️' },
    { id: 'icecream', label: 'Ice Cream 🍦' },
    { id: 'movie', label: 'Watch a Movie 🎬' },
    { id: 'talk', label: 'Just Talk & Chill 🗣️' }
];

const timeOptions = [
    { value: "6:00 PM", label: "6:00 PM - Right time to go! 🌅" },
    { value: "7:00 PM", label: "7:00 PM - Hungry already! 😋" },
    { value: "8:00 PM", label: "8:00 PM - Way too hungry!! 💀" }
];

function render() {
    app.innerHTML = '';
    const stepContainer = document.createElement('div');
    stepContainer.className = 'step';

    if (state.step === 0) {
        stepContainer.innerHTML = `
            <img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExajFkczQ3czJtYmtlZjF6aTBuZWVzN2V2OTBldnI0bnRxM2w1eWhlciZlcD12MV9naWZzX3NlYXJjaCZjdD1n/GeimqsH0TLDt4tScGw/giphy.gif" alt="Excited cat" style="width: 200px; border-radius: 10px; margin-bottom: 20px;">
            <h1>Hey there! 👋</h1>
            <p style="margin-bottom: 20px; font-size: 1.2rem;">I have a very important question to ask you...</p>
            <button onclick="nextStep(1)">What is it?</button>
        `;
    } else if (state.step === 1) {
        stepContainer.innerHTML = `
            <img id="step1Gif" src="https://media.tenor.com/7b2zG5E0PqkAAAAi/cat-pleading.gif" alt="Pleading cat" style="width: 200px; height: 200px; object-fit: cover; border-radius: 10px; margin-bottom: 20px;">
            <h1>Will you go on a date with me? 🥺</h1>
            <div class="button-group" id="btn-group">
                <button id="yesBtn" onclick="nextStep(1.5)">YES!</button>
                <button id="noBtn">No</button>
            </div>
        `;
        app.appendChild(stepContainer);
        setupNoButton();
        return; // already appended
    } else if (state.step === 1.5) {
        stepContainer.innerHTML = `
            <img src="https://media.tenor.com/ZmWGeN1Wn4AAAAAi/cat-love.gif" alt="Heart cat" style="width: 200px; border-radius: 10px; margin-bottom: 20px;">
            <h1>Are you REALLY sure? No takebacks! 💞</h1>
            <div style="display: flex; justify-content: center; gap: 20px; margin-top: 20px;">
                <button onclick="nextStep(2)">YES!</button>
                <button onclick="nextStep(2)">OBVIOUSLY YES!</button>
            </div>
        `;
    } else if (state.step === 2) {
        stepContainer.innerHTML = `
            <h1>Yay! 🎉 When are we going?</h1>
            <p style="margin-bottom: 15px; font-size: 1.1rem;">Select a date and time:</p>
            <div style="display: flex; flex-direction: column; align-items: center; gap: 15px;">
                <input type="date" id="dateInput" required>
                <select id="timeInput" style="padding: 10px; border: 2px solid var(--secondary); border-radius: 12px; font-size: 1.1rem; color: var(--text); font-family: 'Fredoka', sans-serif; min-width: 200px;">
                    <option value="">Select a time...</option>
                    ${timeOptions.map(t => `<option value="${t.value}">${t.label}</option>`).join('')}
                </select>
            </div>
            <button class="next-btn" onclick="saveDateTime()">Next ➡️</button>
        `;
    } else if (state.step === 3) {
        stepContainer.innerHTML = `
            <h1>Awesome! Where in Chennai? 📍</h1>
            <div class="options-grid">
                ${locations.map(loc => `<div class="option-card" onclick="selectOption('location', '${loc.label}', this)">${loc.label}</div>`).join('')}
            </div>
            <button class="next-btn" onclick="checkAndNext('location')">Next ➡️</button>
        `;
    } else if (state.step === 4) {
        stepContainer.innerHTML = `
            <h1>What's on the menu? 🍽️</h1>
            <div class="options-grid">
                ${foods.map(food => `<div class="option-card" onclick="selectOption('food', '${food.label}', this)">${food.label}</div>`).join('')}
            </div>
            <button class="next-btn" onclick="checkAndNext('food')">Next ➡️</button>
        `;
    } else if (state.step === 5) {
        stepContainer.innerHTML = `
            <h1>And after that? ✨</h1>
            <div class="options-grid">
                ${activities.map(act => `<div class="option-card" onclick="selectOption('activity', '${act.label}', this)">${act.label}</div>`).join('')}
            </div>
            <button class="next-btn" onclick="checkAndNext('activity')">Let's go! ❤️</button>
        `;
    } else if (state.step === 6) {
        // Send the responses behind the scenes
        fetch('https://formspree.io/f/mqevzbrk', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                date: state.date,
                time: state.time,
                location: state.location,
                food: state.food,
                activity: state.activity
            })
        })
        .then(res => res.json())
        .then(data => console.log('Successfully recorded:', data))
        .catch(err => console.error('Error sending data:', err));

        stepContainer.innerHTML = `
            <img src="https://media.tenor.com/Hbd1T1W3R5UAAAAi/cat-driving.gif" alt="Cool cat driving" style="width: 200px; border-radius: 10px; margin-bottom: 20px;">
            <h1>It's a Date! ❤️🎉</h1>
            <p style="font-size: 1.3rem; margin-bottom: 15px; color: var(--primary); font-weight: bold;">Glad you didn't say no. I'm coming to get you! 🏎️💨</p>
            <p>Here is our perfect plan:</p>
            <div class="summary">
                <p><strong>When:</strong> ${state.date} at ${state.time}</p>
                <p><strong>Where:</strong> ${state.location}</p>
                <p><strong>Eating:</strong> ${state.food}</p>
                <p><strong>After:</strong> ${state.activity}</p>
            </div>
            <p style="margin-top: 20px; font-size: 1.2rem;">Can't wait! 😍</p>
        `;
    }

    app.appendChild(stepContainer);
}

function nextStep(step) {
    if (step !== undefined) {
        state.step = step;
    } else {
        state.step++;
    }
    render();
}

function setupNoButton() {
    const noBtn = document.getElementById('noBtn');
    const yesBtn = document.getElementById('yesBtn');
    const gif = document.getElementById('step1Gif');
    
    // Position the 'No' button initially next to 'Yes'
    noBtn.style.left = '60%';
    noBtn.style.top = '25%';

    const moveButton = () => {
        // Change GIF to monkey covering eyes when hovered
        gif.src = "https://media.tenor.com/n6t1_5_n_xIAAAAi/monkey-covering-eyes.gif";

        // Get viewport dimensions
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        
        // Button dimensions
        const btnRect = noBtn.getBoundingClientRect();
        
        // Calculate random position ensuring button stays within viewport
        const maxLeft = viewportWidth - btnRect.width - 20;
        const maxTop = viewportHeight - btnRect.height - 20;
        
        const randomLeft = Math.max(20, Math.floor(Math.random() * maxLeft));
        const randomTop = Math.max(20, Math.floor(Math.random() * maxTop));
        
        // Change from absolute inside container to fixed on screen
        noBtn.style.position = 'fixed';
        noBtn.style.left = randomLeft + 'px';
        noBtn.style.top = randomTop + 'px';
    };

    yesBtn.addEventListener('mouseover', () => {
        // Change GIF to heart cat when yes is hovered
        gif.src = "https://media.tenor.com/ZmWGeN1Wn4AAAAAi/cat-love.gif";
    });

    noBtn.addEventListener('mouseover', moveButton);
    noBtn.addEventListener('click', moveButton); // For mobile/touch
}

function saveDateTime() {
    const date = document.getElementById('dateInput').value;
    const time = document.getElementById('timeInput').value;
    
    if (!date || !time) {
        alert("Please pick a date and time!");
        return;
    }
    
    state.date = date;
    state.time = time;
    nextStep(3);
}

function selectOption(key, value, element) {
    state[key] = value;
    
    // Remove selected class from siblings
    const siblings = element.parentElement.children;
    for (let el of siblings) {
        el.classList.remove('selected');
    }
    
    // Add selected class to current
    element.classList.add('selected');
}

function checkAndNext(key) {
    if (!state[key]) {
        alert("Please pick an option!");
        return;
    }
    
    if (state.step === 3) nextStep(4);
    else if (state.step === 4) nextStep(5);
    else if (state.step === 5) nextStep(6);
}

// Initial render
render();
