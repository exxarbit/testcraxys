const numberDisplay = document.getElementById('number-display');
const decreaseButton = document.getElementById('decrease-button');
const increaseButton = document.getElementById('increase-button');
const signalButton = document.getElementById('signal-button');
const signalContainer = document.getElementById('signal-container');
const messageDisplay = document.createElement('div');

messageDisplay.style.color = 'blue'; 
messageDisplay.style.marginTop = '10px';
messageDisplay.style.fontWeight = 'bold';

const messageContainer = document.getElementById('message-container');
messageContainer.appendChild(messageDisplay);

let currentValue = 1;
let isCountingDown = false;
let currentLanguage = 'ru';

// Шансы
const images = [
    { src: 'signal/1.jpg', chance: 45 },
    { src: 'signal/2.jpg', chance: 20 },
    { src: 'signal/5.jpg', chance: 10 },
    { src: 'signal/10.jpg', chance: 7 },
    { src: 'signal/pochinki.jpg', chance: 5 },
    { src: 'signal/cashhunt.jpg', chance: 5 },
    { src: 'signal/coinflip.jpg', chance: 6 },
    { src: 'signal/crazytime.jpg', chance: 2 }
];

function getRandomImage() {
    const randomNum = Math.random() * 100;
    let cumulativeChance = 0;

    for (const image of images) {
        cumulativeChance += image.chance;
        if (randomNum <= cumulativeChance) {
            return image;
        }
    }
}

decreaseButton.addEventListener('click', () => {
    if (currentValue === 3) {
        currentValue = 1;
        numberDisplay.textContent = currentValue;
    }
});

increaseButton.addEventListener('click', () => {
    if (currentValue === 1) {
        currentValue = 3;
        numberDisplay.textContent = currentValue;
    }
});

signalButton.addEventListener('click', () => {
    if (isCountingDown) {
        return;
    }

    const existingImages = signalContainer.querySelectorAll('img');

    if (existingImages.length > 0) {
        let fadeOutCount = existingImages.length;
        existingImages.forEach((img) => {
            img.classList.add('fade-out');

            img.addEventListener('animationend', () => {
                img.remove();
                fadeOutCount--;
                if (fadeOutCount === 0) {
                    addNewSignals();
                    startCountdown(1);
                }
            });
        });
    } else {
        addNewSignals();
        startCountdown(1);
    }
});

function addNewSignals() {
    signalContainer.innerHTML = '';

    const numSignals = currentValue;

    for (let i = 0; i < numSignals; i++) {
        const signalWrapper = document.createElement('div');
        signalWrapper.style.position = 'relative';

        const randomImage = getRandomImage();
        const newSignalImage = document.createElement('img');
        newSignalImage.src = randomImage.src;
        newSignalImage.classList.add('fade-in');

        const randomChance = Math.floor(Math.random() * 100) + 1;

        const chanceDisplay = document.createElement('div');
        chanceDisplay.textContent = `Шанс: ${randomChance}%`;
        chanceDisplay.style.color = 'yellow';
        chanceDisplay.style.fontWeight = 'bold';
        chanceDisplay.style.fontSize = '8px';

        chanceDisplay.style.position = 'absolute';
        
        if (randomImage.src.includes('crazytime')) {
            chanceDisplay.style.top = '87%';
        } else if (randomImage.src.includes('cashhunt')) {
            chanceDisplay.style.top = '87%'; 
        } else if (randomImage.src.includes('coinflip')) {
            chanceDisplay.style.bottom = '-3%';
        } else if (randomImage.src.includes('1.jpg')) {
            chanceDisplay.style.top = '87%'; 
        } else if (randomImage.src.includes('2.jpg')) {
            chanceDisplay.style.top = '88%';
        } else if (randomImage.src.includes('5.jpg')) {
            chanceDisplay.style.top = '87%';
        } else if (randomImage.src.includes('10.jpg')) {
            chanceDisplay.style.top = '87%';
        } else if (randomImage.src.includes('pochinki.jpg')) {
            chanceDisplay.style.top = '87%';
        } else {
            chanceDisplay.style.bottom = '5%';
        }

        chanceDisplay.style.left = '55%';
        chanceDisplay.style.transform = 'translate(-50%, -50%)';
        chanceDisplay.style.pointerEvents = 'none';

        signalWrapper.appendChild(newSignalImage);
        signalWrapper.appendChild(chanceDisplay);
        
      
        signalContainer.appendChild(signalWrapper);
        
        setTimeout(() => {
            newSignalImage.classList.remove('fade-in');
        }, 10);
    }
}

function startCountdown(seconds) {
    isCountingDown = true;
    updateMessage(seconds);
    
    const countdownInterval = setInterval(() => {
        seconds--;
        
        if (seconds > 0) {
            updateMessage(seconds);
        } else {
            clearInterval(countdownInterval);
            messageDisplay.textContent = '';
            isCountingDown = false;
        }
    }, 1000);
}

function updateMessage(seconds) {
    messageDisplay.classList.remove('message-fade-in');

    if (currentLanguage === 'ru') {
        messageDisplay.textContent = `Для получения нового сигнала, пожалуйста, подождите ${seconds} секунд.`;
    } else if (currentLanguage === 'en') {
        messageDisplay.textContent = `Please wait ${seconds} seconds to receive a new signal.`;
    }
    messageDisplay.classList.add('message-fade-in');
}

const langRu = document.getElementById('lang-ru');
const langEn = document.getElementById('lang-en');

function changeLanguage(lang) {
    currentLanguage = lang;
    if (lang === 'ru') {
        document.documentElement.lang = 'ru';
        document.querySelector('.signal-button').textContent = 'Получить сигнал';
    } else if (lang === 'en') {
        document.documentElement.lang = 'en';
        document.querySelector('.signal-button').textContent = 'Get signal';
    }
}

function animateClick(element) {
    element.classList.add('clicked');
    setTimeout(() => {
        element.classList.remove('clicked');
    }, 200);
}

langRu.addEventListener('click', () => {
    changeLanguage('ru');
    animateClick(langRu);
});
langEn.addEventListener('click', () => {
    changeLanguage('en');
    animateClick(langEn);
});
