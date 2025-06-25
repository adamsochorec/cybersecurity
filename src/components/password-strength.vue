<script setup lang="ts">
import { ref, watch } from 'vue'
import { zxcvbn, debounce } from '@zxcvbn-ts/core'
import Column from 'primevue/column'
import type { ZXCVBNResult } from '@zxcvbn-ts/core'

const password = ref('') // Reactive reference to store the password input
const result = ref<ZXCVBNResult | null>(null) // Reactive reference to store the zxcvbn analysis result

// Function to analyze the password using zxcvbn
const useZxcvbn = async () => {
  if (password.value) {
    result.value = await zxcvbn(password.value) // Analyze the password and store the result
  } else {
    result.value = null // Reset the result if the password is empty
  }
}

// Function to update the score bar styling based on the password strength
const updateScoreBar = () => {
  const scoreBarInput = document.getElementById('score-bar') // Get the score bar element
  if (scoreBarInput) {
    if (!password.value) {
      scoreBarInput.style.boxShadow = 'none' // Remove styling if the password is empty
      return
    }
    if (result.value) {
      switch (result.value.score) {
        case 0:
        case 1:
          scoreBarInput.style.boxShadow = '0px 0px 26px 0px rgb(255, 0, 0)' // Weak password
          break
        case 2:
          scoreBarInput.style.boxShadow = '0px 0px 26px 0px rgb(255, 145, 0)' // Fair password
          break
        case 3:
          scoreBarInput.style.boxShadow = '0px 0px 26px 0px rgba(255, 247, 0)' // Good password
          break
        case 4:
          scoreBarInput.style.boxShadow = '0px 0px 26px 0px rgba(0, 255, 60)' // Strong password
          break
        default:
          scoreBarInput.style.boxShadow = 'none' // Default styling
      }
    } else {
      scoreBarInput.style.boxShadow = 'none' // Remove styling if no result
    }
  }
}

// Debounced version of the useZxcvbn function to limit the frequency of analysis
const debouncedUseZxcvbn = debounce(useZxcvbn, 200)

// Watcher to trigger password analysis when the password changes
watch(password, () => {
  debouncedUseZxcvbn()
})

// Watcher to update the score bar styling when the analysis result changes
watch(result, () => {
  updateScoreBar()
})
</script>

<template>
  <InputGroup>
    <InputText id="score-bar" v-model="password" type="text" placeholder="Analyse your password" />
    <Button
      icon="pi pi-lock"
      severity="success"
      v-tooltip.bottom="'Analysis runs locally - data are neither sent nor stored.'"
    ></Button>
  </InputGroup>

  <span class="note" style="text-align: center"
    >Password strength estimation by
    <a href="https://zxcvbn-ts.github.io/zxcvbn/" target="_blank" rel="noopener noreferrer nofollow"
      >zxcvbn-ts</a
    >.</span
  >
  <hr class="semi" />
  <div v-if="result">
    <DataTable :value="[result]" showGridlines class="reveal">
      <Column field="guesses" header="Guesses">
        <template #body="slotProps">
          <span>{{ slotProps.data.guesses }}</span>
          <Button
            variant="text"
            v-tooltip.bottom="
              'How many times an attacker would likely need to guess before cracking your password'
            "
            icon="pi pi-info-circle"
          /> </template
      ></Column>
      <Column field="calcTime" header="Function runtime"
        ><template #body="slotProps">
          <span>{{ slotProps.data.calcTime }}</span> milliseconds
          <Button
            variant="text"
            v-tooltip.bottom="'The time this tool needed to analyze your password’s strength.'"
            icon="pi pi-info-circle"
          /> </template
      ></Column>
      <Column field="guessesLog10" header="Guesses Log10"
        ><template #body="slotProps">
          <span>{{ slotProps.data.guessesLog10 }}</span>
          <Button
            variant="text"
            v-tooltip.bottom="
              'A simplified way to express the number of guesses required, using powers of 10 (e.g., thousands, millions, billions, etc.).'
            "
            icon="pi pi-info-circle"
          /> </template
      ></Column>
    </DataTable>
    <h5 class="reveal" v-if="result" style="margin: var(--grid-gap-3) 0 var(--grid-gap-1) 0">
      Permutation times:
    </h5>

    <DataTable showGridlines :value="[result.crackTimesDisplay]" class="reveal">
      <Column field="onlineThrottling100PerHour" header="Online throttling 100/h">
        <template #body="slotProps">
          <span>{{ slotProps.data.onlineThrottling100PerHour }}</span>
          <Button
            variant="text"
            v-tooltip.bottom="
              'How long it would take an attacker to break your password if the website allows only a few guesses per hour.'
            "
            icon="pi pi-info-circle"
          />
        </template>
      </Column>
      <Column field="onlineNoThrottling10PerSecond" header="Online no throttling 10/s">
        <template #body="slotProps">
          <span>{{ slotProps.data.onlineNoThrottling10PerSecond }}</span>
          <Button
            variant="text"
            v-tooltip.bottom="
              'How long it would take if the attacker could try multiple passwords quickly without restrictions.'
            "
            icon="pi pi-info-circle"
          />
        </template>
      </Column>
      <Column field="offlineSlowHashing1e4PerSecond" header="Offline slow hashing 1e4/s">
        <template #body="slotProps">
          <span>{{ slotProps.data.offlineSlowHashing1e4PerSecond }}</span>
          <Button
            variant="text"
            v-tooltip.bottom="
              'How long it would take to crack your password if stolen from a database that uses modern, secure encryption techniques.'
            "
            icon="pi pi-info-circle"
          />
        </template>
      </Column>
      <Column field="offlineFastHashing1e10PerSecond" header="Offline fast hashing 1e10/s">
        <template #body="slotProps">
          <span>{{ slotProps.data.offlineFastHashing1e10PerSecond }}</span>
          <Button
            variant="text"
            v-tooltip.bottom="
              'How long it would take if your password was stored using outdated security methods, allowing attackers to guess at extreme speeds.'
            "
            icon="pi pi-info-circle"
          />
        </template>
      </Column>
    </DataTable>
    <h5
      class="reveal"
      v-if="result.feedback.suggestions && result.feedback.suggestions.length"
      style="margin: var(--grid-gap-3) 0 var(--grid-gap-1) 0"
    >
      Suggestions:
    </h5>
    <ul class="reveal">
      <li v-if="result.feedback.warning">{{ result.feedback.warning }}</li>
      <li v-for="suggestion in result.feedback.suggestions" :key="suggestion">
        {{ suggestion }}
      </li>
    </ul>
  </div>
</template>
