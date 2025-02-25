import { ref } from 'vue'

export function usePasswordGenerator() {
  const password = ref('')

  const generatePassword = () => {
    const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ......-----'
    const passwordLength = 19
    let newPassword = ''

    for (let i = 0; i < passwordLength; i++) {
      const randomNumber = Math.floor(Math.random() * chars.length)
      newPassword += chars.charAt(randomNumber)
    }
    password.value = newPassword
  }

  const copyToClipboard = async () => {
    if (!navigator.clipboard) {
      try {
        document.execCommand('copy')
      } catch (err) {
        console.error('Fallback: Oops, unable to copy', err)
      }
      return
    }
    try {
      await navigator.clipboard.writeText(password.value)
      console.log('Async: Copying to clipboard was successful!')
    } catch (err) {
      console.error('Async: Could not copy text: ', err)
    }
  }

  return {
    password,
    generatePassword,
    copyToClipboard,
  }
}
