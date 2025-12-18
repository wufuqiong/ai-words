// Helper for speaking text using the browser's built-in speech synthesis
export const speakWord = async (text: string) => {
  // Check if speech synthesis is available
  if (!('speechSynthesis' in window)) {
    console.error('Speech synthesis not supported in this browser');
    return;
  }

  // Create a new speech synthesis utterance
  const utterance = new SpeechSynthesisUtterance(text);
  
  // Configure voice settings
  utterance.rate = 1.0; // Speaking rate (0.1 to 10)
  utterance.pitch = 1.0; // Pitch (0 to 2)
  utterance.volume = 1.0; // Volume (0 to 1)
  
  // Try to find a pleasant voice
  const voices = speechSynthesis.getVoices();
  if (voices.length > 0) {
    // Prefer female-sounding voices for a cheerful tone
    const preferredVoice = voices.find(voice => 
      voice.name.includes('Google') || 
      voice.name.includes('Samantha') ||
      voice.name.includes('Karen')
    );
    
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    } else {
      // Use a default voice if preferred ones aren't found
      utterance.voice = voices[0];
    }
  }
  
  // Speak the text
  window.speechSynthesis.speak(utterance);
  
  // Optional: Return a promise that resolves when speaking is complete
  return new Promise<void>((resolve) => {
    utterance.onend = () => resolve();
    utterance.onerror = (event) => {
      console.error('Speech synthesis error:', event);
      resolve();
    };
  });
};