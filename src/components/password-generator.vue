<script setup lang="ts">
import { ref } from 'vue'

import InputGroup from 'primevue/inputgroup'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'

const password = ref('')
const isPasswordGenerated = ref(false)

const generatePassword = () => {
  const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ......-----'
  const passwordLength = 19
  let newPassword = ''

  for (let i = 0; i < passwordLength; i++) {
    const randomNumber = Math.floor(Math.random() * chars.length)
    newPassword += chars.charAt(randomNumber)
  }
  password.value = newPassword
  isPasswordGenerated.value = true
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
