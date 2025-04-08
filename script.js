// Stripe Integration
const stripe = Stripe('your_publishable_key_here'); // Replace with your actual key
let elements;
let clientSecret;

// Beat Data - You would typically fetch this from an API in a real application
const beats =[
   { id: 1,
    title: "Bohemian",
    genre: "Trap",
    Bpm: 106,
    key: "C# Minor",
    cover: "images/IMG-20250407-WA0007.jpg",
    audio: "Beats/Bohemian.mp3",
    price:2000
   },
   { id: 2,
    title: "Bohemian",
    genre: "Trap",
    Bpm: 106,
    key: "C# Minor",
    cover: "images/IMG-20250407-WA0007.jpg",
    audio: "Beats/Bohemian.mp3",
    price:2000
   },
   { id: 3,
    title: "Bohemian",
    genre: "Trap",
    Bpm: 106,
    key: "C# Minor",
    cover: "images/IMG-20250407-WA0007.jpg",
    audio: "Beats/Bohemian.mp3",
    price:2000
   },
   { id: 4,
    title: "Bohemian",
    genre: "Trap",
    Bpm: 106,
    key: "C# Minor",
    cover: "images/IMG-20250407-WA0007.jpg",
    audio: "Beats/Bohemian.mp3",
    price:2000
   },
   { id: 5,
    title: "Bohemian",
    genre: "Trap",
    Bpm: 106,
    key: "C# Minor",
    cover: "images/IMG-20250407-WA0007.jpg",
    audio: "Beats/Bohemian.mp3",
    price:2000
   },
   { id: 6,
    title: "Bohemian",
    genre: "Trap",
    Bpm: 106,
    key: "C# Minor",
    cover: "images/IMG-20250407-WA0007.jpg",
    audio: "Beats/Bohemian.mp3",
    price:2000
   },
   { id: 7,
    title: "Bohemian",
    genre: "Trap",
    Bpm: 106,
    key: "C# Minor",
    cover: "images/IMG-20250407-WA0007.jpg",
    audio: "Beats/Bohemian.mp3",
    price:2000
   },
   { id: 8,
    title: "Bohemian",
    genre: "Trap",
    Bpm: 106,
    key: "C# Minor",
    cover: "images/IMG-20250407-WA0007.jpg",
    audio: "Beats/Bohemian.mp3",
    price:2000
   },
   { id: 9,
    title: "Bohemian",
    genre: "Trap",
    Bpm: 106,
    key: "C# Minor",
    cover: "images/IMG-20250407-WA0007.jpg",
    audio: "Beats/Bohemian.mp3",
    price:2000
   },
   { id: 10,
    title: "Bohemian",
    genre: "Trap",
    Bpm: 106,
    key: "C# Minor",
    cover: "images/IMG-20250407-WA0007.jpg",
    audio: "Beats/Bohemian.mp3",
    price:2000
   },
];
// Lincense Options
const lincenses =[
   { type: "Basic",
    price:2000,
    features: [
        "MP3 format",
        "1000 streams",
        "Non-profit use",
    ]
},
{ type: "premium",
price: 5000,
features: [
    "WAV format",
    "Unlimited streams",
    "Music Videos allowed",
    "Up to 500, 000 copies"
]

},
{type: "Exclusive",
price: 7000,
features: [
    "All track files (WAV, FLP)",
    "Full ownership",
    "Unlimited everything",
    "priority support"
]

}
];
// DOM Elements
const beatcontainer = document.getElementById('beatContainer');
const playerModal = document.getElementById('platerModal');
const modalTitle = document.getElementById('modalTitle');
const modalAudioplayer = document.getElementById('odalAudioplayer');
const closeModal = document.querySelector('closeModal');
const purchaseOptions = document.querySelector('purchase-options');

// Initialize the page 
document.addEventListener('DOMContentLoaded', function() {
    renderBeats();
    renderLincenses();
    setupEventListeners();
});

// Render beats to the page
function renderBeats() {
    beatContainer.innerHTML = beats.map(beat => `
        <div class="beat-card" data-id="${beat.id}">
            <img src="assets/covers/${beat.cover}" alt="${beat.title}" class="beat-cover">
            <div class="beat-info">
                <h3 class="beat-title">${beat.title}</h3>
                <p class="beat-meta">${beat.genre} | ${beat.bpm} BPM | ${beat.key}</p>
                <button class="btn play-btn" data-audio="${beat.audio}">Preview</button>
                <button class="btn purchase-btn" data-id="${beat.id}">Purchase</button>
            </div>
        </div>
    `).join('');
}
// Render license options
function renderLicenses() {
    const licenseGrid = document.querySelector('.license-grid');
    licenseGrid.innerHTML = licenses.map(license => `
        <div class="license-card">
            <h3>${license.type} License</h3>
            <p class="license-price">$${license.price}</p>
            <ul class="license-features">
                ${license.features.map(feature => `<li>${feature}</li>`).join('')}
            </ul>
        </div>
    `).join('');
}

// Set up event listeners
function setupEventListeners() {
    // Play button click
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('play-btn')) {
            const audioFile = e.target.getAttribute('data-audio');
            const beatCard = e.target.closest('.beat-card');
            const beatId = beatCard.getAttribute('data-id');
            const beat = beats.find(b => b.id == beatId);
            
            openPlayerModal(beat, audioFile);
        }
        
        // Purchase button click
        if (e.target.classList.contains('purchase-btn')) {
            const beatId = e.target.getAttribute('data-id');
            startPurchaseProcess(beatId);
        }
    });
    
    // Close modal
    closeModal.addEventListener('click', closePlayerModal);
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === playerModal) {
            closePlayerModal();
        }
    });
}

// Open the audio player modal
function openPlayerModal(beat, audioFile) {
    modalTitle.textContent = beat.title;
    modalAudioPlayer.src = `assets/audio/${audioFile}`;
    
    // Create purchase options
    purchaseOptions.innerHTML = licenses.map(license => `
        <div class="license-option">
            <h4>${license.type} License - $${license.price}</h4>
            <button class="btn select-license" 
                    data-beat-id="${beat.id}" 
                    data-license-type="${license.type}" 
                    data-price="${license.price}">
                Select
            </button>
        </div>
    `).join('');
    
    playerModal.style.display = 'block';
}

// Close the audio player modal
function closePlayerModal() {
    modalAudioPlayer.pause();
    modalAudioPlayer.currentTime = 0;
    playerModal.style.display = 'none';
}

// Start purchase process
function startPurchaseProcess(beatId) {
    const beat = beats.find(b => b.id == beatId);
    alert(`Starting purchase process for ${beat.title}`);
    // In a real app, this would redirect to a checkout page
}
// Initialize Stripe payment form
async function initializeStripe() {
    // In a real app, you would fetch this from your server
    clientSecret = 'mock_client_secret_for_demo';
    
    elements = stripe.elements({ clientSecret });
    const paymentElement = elements.create('payment');
    paymentElement.mount('#payment-element');
}

// Setup payment form submission
function setupPaymentForm() {
    const paymentForm = document.getElementById('payment-form');
    
    paymentForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitButton = document.getElementById('submit-payment');
        submitButton.disabled = true;
        document.getElementById('payment-spinner').classList.remove('hidden');
        document.getElementById('button-text').classList.add('hidden');
        
        // In a real app, you would confirm the payment with Stripe
        // This is a mock implementation for demonstration
        setTimeout(() => {
            document.getElementById('payment-spinner').classList.add('hidden');
            document.getElementById('button-text').classList.remove('hidden');
            submitButton.disabled = false;
            
            // Show success message
            document.getElementById('payment-message').textContent = 'Payment successful! Your beats will be delivered shortly.';
            document.getElementById('payment-message').classList.remove('hidden');
            
            // Close modal after 3 seconds
            setTimeout(() => {
                closePaymentModal();
                alert('Thank you for your purchase! Download links have been sent to your email.');
            }, 3000);
        }, 2000);
    });
}

// Show payment modal with selected items
function showPaymentModal(beatId, licenseType) {
    const beat = beats.find(b => b.id == beatId);
    const license = licenses.find(l => l.type === licenseType);
    
    document.getElementById('paymentSummary').innerHTML = `
        <h4>Order Summary</h4>
        <div class="payment-item">
            <span>${beat.title} (${licenseType} License)</span>
            <span>$${license.price}</span>
        </div>
        <div class="payment-total">
            <span>Total</span>
            <span>$${license.price}</span>
        </div>
    `;
    
    document.getElementById('payment-message').classList.add('hidden');
    document.getElementById('paymentModal').style.display = 'block';
    
    // Initialize Stripe if not already done
    if (!elements) {
        initializeStripe();
    }
}

// Close payment modal
function closePaymentModal() {
    document.getElementById('paymentModal').style.display = 'none';
    document.getElementById('payment-form').reset();
}

// Update your existing setupEventListeners function
function setupEventListeners() {
    // ... (previous event listeners)
    
    // License selection in player modal
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('select-license')) {
            const beatId = e.target.getAttribute('data-beat-id');
            const licenseType = e.target.getAttribute('data-license-type');
            closePlayerModal();
            showPaymentModal(beatId, licenseType);
        }
    });
    
    // Close payment modal
    document.querySelector('.close-payment-modal').addEventListener('click', closePaymentModal);
    
    // Initialize payment form when DOM is loaded
    setupPaymentForm();
}



// Add any additional JavaScript functionality here
