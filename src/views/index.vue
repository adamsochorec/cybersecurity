<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { reveal } from '@/composables/useReveal'
import { DotLottieVue } from '@lottiefiles/dotlottie-vue'
import PasswordStrength from '@/components/PasswordStrength.vue'
import PasswordGenerator from '@/components/PasswordGenerator.vue'

onMounted(() => {
  // Observer for reveal animations
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active')
        }
      })
    },
    {
      threshold: 0.1, // Adjust as needed
    },
  )
  // Apply observer to initial reveals
  const applyObservers = () => {
    const reveals = document.querySelectorAll<HTMLElement>('.reveal:not(.observed)')
    reveals.forEach((reveal) => {
      observer.observe(reveal)
      reveal.classList.add('observed') // Mark as observed to avoid duplicate observing
    })
  }
  applyObservers() // Initial check
  // Fallback for browsers without IntersectionObserver
  window.addEventListener('scroll', reveal)
  reveal()
  // Mutation Observer to watch for new elements
  const mutationObserver = new MutationObserver(() => {
    applyObservers()
  })
  mutationObserver.observe(document.body, {
    childList: true,
    subtree: true,
  })
})
</script>

<template>
  <main
    style="
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-orient: vertical;
      -webkit-box-direction: normal;
      -ms-flex-direction: column;
      flex-direction: column;
      overflow: hidden;
    "
  >
    <!--  INTRO SECTION START -->
    <section class="intro-section-wrapper" style="width: 100%">
      <article
        class="intro-section gradient"
        style="
          -webkit-box-align: center;
          -ms-flex-align: center;
          align-items: center;
          background-attachment: fixed;
          background-position: center;
          background-size: cover;
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          height: 100vh;
          height: 100svh;
          -webkit-box-pack: center;
          -ms-flex-pack: center;
          justify-content: center;
        "
      >
        <section
          style="
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
          "
        >
          <Button
            icon="pi pi-github"
            label="GitHub"
            as="a"
            rounded
            outlined
            severity="contrast"
            size="small"
            href="https://github.com/adamsochorec/cybersecurity"
            target="_blank"
            rel="noopener noreferrer nofollow"
            class="cta"
          />
          <p style="font-size: var(--font-size-3)">Get an ultimate password</p>
          <PasswordGenerator />
        </section>
        <div style="position: absolute; bottom: var(--grid-gap-2); text-align: center">
          <i class="pi pi-chevron-down scroll"> </i>
        </div>
      </article>
    </section>
    <!--  INTRO SECTION END -->
    <!-- ARTICLE START -->
    <article class="wrapper-wide" style="max-width: 100%; width: 947px">
      <hr class="semi" />
      <Tag value="2023" rounded icon="pi pi-calendar" class="metadata" />
      <Tag value="2025" rounded icon="pi pi-refresh" class="metadata" />
      <Tag value="10min" rounded icon="pi pi-book" class="metadata" />
      <h1 class="reveal" style="margin: var(--grid-gap-2) 0">Cybersecurity Hygiene</h1>
      <h2 class="reveal" style="font-size: var(--font-size-4)">
        Essential Steps Leading to Your Secure and Healthy Online Presence.
      </h2>
      <hr class="reveal" />
      <h3 class="reveal">1. Contemporary Passwords</h3>
      <p class="dropcap reveal">
        The most effective way how today to hack someone's identity is to "social engineer". That
        means “guessing” someone's password based on the target's public information (date of birth,
        postal code, house number, etc.) usually on social sites.
      </p>
      <p class="reveal">
        By using complex not the organic password for all of your online accounts, you can
        drastically reduce the risk of having your birthday on Facebook or tag the location of your
        hometown in an Instagram post.
      </p>
      <hr class="semi" />
      <p class="reveal">
        Another step forward to secure your online and offline identity is using a unique password
        for each account you own. That creates a powerful cascade of barriers that possible hackers
        might cross pretty easily with a single or similar password.
      </p>
      <p class="reveal">
        To be able to manipulate many random characters from the keyboard you need a reliable
        password manager. Does not matter how powerful and unique your passwords are when you keep
        them in Excel spreadsheets on your work laptop...
      </p>
      <hr class="reveal" />
      <!--  PASSWORD STRENGTH START -->
      <h4 class="reveal">1.2 Password Strength</h4>
      <p class="reveal">
        Contemporary password hacking is more about social engineering and working with the most
        commonly used words/phrases in dictionaries, than processing-heavy combinatorics.
      </p>
      <hr class="semi" />
      <PasswordStrength />
      <hr class="reveal" />
      <h4 class="reveal">1.3 Problem Solution <i class="pi pi-spin pi-cog"></i></h4>
      <ol class="reveal">
        <li><p>Set up a trusted and encrypted password manager:</p></li>
        <ul>
          <li>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.apple.com/legal/privacy/data/en/icloud-keychain/"
              ><i class="pi pi-apple"></i> Passwords</a
            >
          </li>
          <li>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.lastpass.com/how-lastpass-works"
              >LastPass</a
            >
            and
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.keepersecurity.com/en_GB/"
              >Keeper</a
            >
            - any kind of devices
          </li>
        </ul>
        <li>
          Generate powerful and unique passwords through your password manager or
          <a target="_blank" rel="noopener noreferrer" href="#passwordGenerator"
            >password generator</a
          >
        </li>
        <li>Store them in your password manager</li>
        <li>
          Remember master password to your manager or get a
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.tomsguide.com/news/usb-security-key"
            >hardware key</a
          >
        </li>
      </ol>
      <!--  PASSWORD STRENGTH END -->
      <hr class="reveal" />
      <!--  LOTTIE ANIMATION START -->
      <section class="lottie-container">
        <div>
          <h3 class="reveal">2.What Is 2FA and Why Is It Essential.</h3>
          <p class="reveal">
            Two-factor authentication (2FA) is an additional security feature for logging into your
            online accounts. 2FA is based on entering a single-use time-dependent code sent to you
            by SMS, email, or verification app.
          </p>
          <p class="reveal">
            2FA usually works on top of the standard login procedure (username and password), so if
            your account info gets compromised, the hacker still wouldn't access your account.
          </p>
          <p class="reveal">
            After successful 2FA activation, you might be shown a couple of six to eight-digit
            recovery codes. In case you would lose access to your email and phone number, you still
            can manage your online account with those single-use codes (after you use all of them,
            you will receive new ones).
          </p>
        </div>
        <DotLottieVue
          class="reveal lottie"
          background="transparent"
          loop
          autoplay
          style="height: 100%; width: 100%"
          src="https://lottie.host/658490af-b8e2-42bf-bba8-91ef507b5d23/Gn3kFKahhC.lottie"
        />
      </section>
      <!--  LOTTIE ANIMATION END -->
      <hr class="reveal" />
      <h4 class="reveal">2.2 What Is SIM Swapping</h4>
      <br />
      <img
        class="reveal"
        src="/simswap.webp"
        alt="SIM swapp explanation"
        style="border-radius: var(--border-radius-1)"
      />
      <a
        class="note reveal"
        target="_blank"
        rel="noopener noreferrer"
        href="https://opengateway.telefonica.com/en/news/article/api-sim-swap"
        >www.telefonica.com</a
      >

      <p class="reveal">
        You can easily avoid this by using a mobile app for 2FA that is independent of your phone
        number. Most the online services provide their native app for 2FA or they support trusted
        third-party apps for secure two-factor authentication.
      </p>
      <hr class="reveal" />
      <h4 class="reveal">2.3 Problem Solution <i class="pi pi-spin pi-cog"></i></h4>
      <p class="reveal">Set up a 2FA for your online accounts with 2FA support through:</p>
      <ul>
        <li>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.apple.com/legal/privacy/data/en/icloud-keychain/"
            ><i class="pi pi-apple"></i> Passwords</a
          >
        </li>
        <li>
          Trusted third-party 2FA apps such as
          <a target="_blank" rel="noopener noreferrer" href="https://authy.com/">Authy</a>,
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.lastpass.com/how-lastpass-works"
            >LastPass</a
          >
          or
          <a target="_blank" rel="noopener noreferrer" href="https://www.keepersecurity.com/en_GB/"
            >Keeper</a
          >
        </li>
        <li>Service's verification native app (f.e. Adobe - Account Access)</li>
        <li>If the service does support any mentioned methods, use the SMS verification</li>
      </ul>
      <hr class="reveal" />
      <h3 class="reveal">3. Social Engineering Vulnerability</h3>
      <p class="reveal">
        Watch out for your online traces. Set your personal information (such as birthday, year of
        graduation, etc.) as private or at least not public (friends/followers) NO friends of
        friends (you do not control the information accessibility scope!).
      </p>
      <p class="reveal">
        Do not pick your pin codes or passwords as keywords you published somewhere (pets or child's
        name).<br />When registering for a new online service, fill out only the required
        information. All your published information might hackers use against you.
      </p>

      <p class="reveal">
        When installing a new app, check out in settings its requests to read your data - decide
        which are necessary for the app functionality.<br />For example, does your app for online
        shopping needs access to your contact and messages?<br />By using random non-organic
        passwords will most personal information in the online space lose its value (as a possible
        key to your sensitive data).
      </p>
      <hr class="reveal" />
      <h4 class="reveal">3.2 Problem Solution <i class="pi pi-spin pi-cog"></i></h4>
      <ol class="reveal">
        <li>
          Keep the information you publish about yourself under control, set required sensitive
          information visibility as private
        </li>
        <li>
          Before filling out any information about yourself, ask yourself if is it fundamental for
          app/service functionality
        </li>
        <li>Stick to the random non-organic passwords</li>
        <li>Educate yourself about social engineering</li>
      </ol>
      <!-- ARTICLE END -->

      <!-- RELATED LITERATURE START -->
      <hr class="reveal" />
      <h3 class="reveal">4. Related Literature</h3>
      <ol>
        <li class="reveal">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://open.spotify.com/episode/2hJsSOoQkgnlQLEFrdBVFp?si=06ff9cdeb3da4cbc"
            >Story about a professional social engineer &#8250;</a
          >
        </li>
        <li class="reveal">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://open.spotify.com/episode/4q0cNkAHQQMBTu4NmeNW7E?si=a4c35c68a1d34724"
            >Google's control over the internet &#8250;</a
          >
        </li>
        <li class="reveal">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://authy.com/blog/authy-vs-google-authenticator/"
            >Authy vs. Google Authenticator &#8250;</a
          >
        </li>
        <li class="reveal">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.omnicalculator.com/other/password-entropy"
            >Password Entropy Calculator &#8250;</a
          >
        </li>
        <li class="reveal">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://open.spotify.com/episode/5Snektk5Z2nUzM7DgoEBSx?si=eKX_d1f1SY6T3j5S3mkLgA"
            >Hacking backstage &#8250;</a
          >
        </li>
      </ol>
      <!-- RELATED LITERATURE END -->
      <ScrollTop />
    </article>
  </main>
</template>
<style scoped>
.metadata {
  margin-right: var(--grid-gap-2);
}
.scroll {
  animation: pulse 1.5s infinite;
}
@keyframes pulse {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}
@media only screen and (max-width: 620px) {
  .lottie {
    height: 30%;
    width: auto;
  }
}
@media only screen and (min-width: 620px) {
  .lottie-container {
    display: grid;
    grid-template-columns: 2fr 1fr;
  }
}
</style>
