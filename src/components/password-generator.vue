<script setup lang="ts">
import { ref } from 'vue'

import InputGroup from 'primevue/inputgroup'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'

const password = ref('') // Reactive reference to store the generated password
const isPasswordGenerated = ref(false) // Reactive reference to track if the password has been generated

// Function to generate a random password
const generatePassword = () => {
  const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ......-----' // Characters to use in the password
  const passwordLength = 19 // Desired length of the password
  let newPassword = ''

  for (let i = 0; i < passwordLength; i++) {
    const randomNumber = Math.floor(Math.random() * chars.length) // Generate a random index
    newPassword += chars.charAt(randomNumber) // Append the character at the random index to the password
  }
  password.value = newPassword // Set the generated password
  isPasswordGenerated.value = true // Mark the password as generated
}

// Function to copy the generated password to the clipboard
const copyToClipboard = async () => {
  if (!navigator.clipboard) {
    // Check if the Clipboard API is available
    try {
      document.execCommand('copy') // Fallback to execCommand if Clipboard API is not available
    } catch (err) {
      console.error('Fallback: Oops, unable to copy', err) // Log an error if copying fails
    }
    return
  }
  try {
    await navigator.clipboard.writeText(password.value) // Copy the password to the clipboard using the Clipboard API
    console.log('Async: Copying to clipboard was successful!') // Log success message
  } catch (err) {
    console.error('Async: Could not copy text: ', err) // Log an error if copying fails
  }
}
</script>
<template>
  <div class="button-wrapper" style="display: flex; width: 100%">
    <InputGroup>
      <InputText
        style="text-align: center"
        type="text"
        placeholder="that would centuries to crack..."
        v-model="password"
        :readonly="!isPasswordGenerated"
      />
      <Button
        v-if="isPasswordGenerated"
        icon="pi pi-clipboard"
        severity="contrast"
        outlined
        @click="copyToClipboard()"
        v-tooltip.right="'Copy'"
        ref="tooltipRef"
      ></Button>
    </InputGroup>
  </div>
  <Button
    icon="pi pi-sparkles"
    style="margin-top: var(--grid-gap-2)"
    label="Generate"
    severity="success"
    @click="generatePassword()"
  ></Button>
</template>
