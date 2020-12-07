const readText = document.getElementById('read');
const playBtn = document.getElementById('play');
const stopBtn = document.getElementById('stop');
const voiceSelect = document.getElementById('voices');
const pitch = document.getElementById('pitch');
const rate = document.getElementById('rate');

// Voices changed
speechSynthesis.addEventListener('voiceschanged', getVoices)


// Set voice
voiceSelect.addEventListener('change', setVoice)

// Stop voice
stopBtn.addEventListener('click', stopReading);

// Init synth
const synth = window.speechSynthesis;


let speech = new SpeechSynthesisUtterance();


// Set text 
function setTextMessage() {
  speech.text = readText.value;
}


// Play voice 
playBtn.addEventListener('click', playVoice)

function playVoice() {
  setTextMessage();

  // Increase pitch
  if(pitch.value === '5') {
    speech.pitch = 1.3;
  } else if(pitch.value === '10') {
    speech.pitch = 1.5;
  } else if(pitch.value === '15') {
    speech.pitch = 2;
  } 
  
  // Increase rate
  if(rate.value === '5') {
    speech.rate = 1.3;
  } else if(rate.value === '10') {
    speech.rate = 1.5;
  } else if(rate.value === '15') {
    speech.rate = 2;
  } 
  
  // Speak voice
  synth.speak(speech);
  resumeInfinity();
}



// Voice stops reading fix
function resumeInfinity() {
  window.speechSynthesis.resume();
  timeoutResumeInfinity = setTimeout(resumeInfinity, 1000);
}

// Stop reading 
function stopReading() {
  synth.cancel(speech);
}

// Set voice
function setVoice(e) {
  speech.voice = voices.find(voice => voice.name === e.target.value);
}


// Store voices
let voices = [];
function getVoices() {
  voices = speechSynthesis.getVoices();

  voices.forEach(voice => {
    const option = document.createElement('option');

    option.value = voice.name;
    option.innerHTML = `${voice.name} ${voice.lang}`

    voiceSelect.appendChild(option);
  })
}

// Init voices
getVoices();