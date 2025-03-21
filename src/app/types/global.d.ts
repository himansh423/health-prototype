/* eslint-disable @typescript-eslint/no-explicit-any */
interface Window {
  SpeechRecognition: typeof SpeechRecognition
  webkitSpeechRecognition: typeof SpeechRecognition
}

declare const SpeechRecognition: any

