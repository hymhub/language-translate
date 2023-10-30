import * as deepl from 'deepl-node'

const translator = new deepl.Translator('api-free')

const sourceLanguages = await translator.getSourceLanguages()
for (let i = 0; i < sourceLanguages.length; i++) {
  const lang = sourceLanguages[i]
  console.log(`${lang.name} (${lang.code})`) // Example: 'English (en)'
}

const targetLanguages = await translator.getTargetLanguages()
for (let i = 0; i < targetLanguages.length; i++) {
  const lang = targetLanguages[i]
  if (lang.supportsFormality) {
    console.log(`${lang.name} (${lang.code}) supports formality`)
    // Example: 'German (DE) supports formality'
  }
}
