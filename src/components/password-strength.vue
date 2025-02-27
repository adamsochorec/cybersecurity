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
          scoreBarInput.style.boxShadow = '0px 0px 26px 0px rgba(255, 46, 46, 0.9)' // Weak password
          break
        case 2:
          scoreBarInput.style.boxShadow = '0px 0px 26px 0px rgba(255, 154, 46, 0.9)' // Fair password
          break
        case 3:
          scoreBarInput.style.boxShadow = '0px 0px 26px 0px rgba(224, 255, 46, 0.9)' // Good password
          break
        case 4:
          scoreBarInput.style.boxShadow = '0px 0px 26px 0px rgba(0, 255, 60, 0.9)' // Strong password
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
  <InputGroup class="reveal">
    <InputText id="score-bar" v-model="password" type="text" placeholder="Analyse your password" />
    <Button
      icon="pi pi-lock"
      severity="success"
      v-tooltip.bottom="'Analysis runs locally - data are neither sent nor stored.'"
    ></Button>
  </InputGroup>

  <span class="note reveal" style="text-align: center"
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
            v-tooltip.bottom="'Estimated guesses needed to crack password.'"
            icon="pi pi-info-circle"
          /> </template
      ></Column>
      <Column field="calcTime" header="Function runtime (ms):"
        ><template #body="slotProps">
          <span>{{ slotProps.data.calcTime }}</span>
          <Button
            variant="text"
            v-tooltip.bottom="'How long it took zxcvbn to calculate an answer, in milliseconds.'"
            icon="pi pi-info-circle"
          /> </template
      ></Column>
      <Column field="guessesLog10" header="Guesses Log10"
        ><template #body="slotProps">
          <span>{{ slotProps.data.guessesLog10 }}</span>
          <Button
            variant="text"
            v-tooltip.bottom="'Order of magnitude of result.guesses'"
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
            v-tooltip.bottom="'Online attack on a service that ratelimits password auth attempts.'"
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
              'Online attack on a service that does not ratelimit, or where an attacker has outsmarted ratelimiting.'
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
              'Offline attack. assumes multiple attackers, proper user-unique salting and a slow hash function with moderate work factor, such as bcrypt, scrypt, PBKDF2.'
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
              'Offline attack with user-unique salting but a fast hash function like SHA-1, SHA-256 or MD5. A wide range of reasonable numbers anywhere from one billion - one trillion guesses per second, depending on number of cores and machines.'
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
