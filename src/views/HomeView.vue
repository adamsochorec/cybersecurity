<script setup lang="ts">
// CYBERSECURITY SUPERBTN START
if (document.body.id === 'cybersecurity') {
  ;(function cybersecurity() {
    const superBtn = document.getElementById('btn'),
      passwordField = document.getElementById('password'),
      introSectionWrapper = document.getElementById('passwordGeneratorArea')
    let keyupListener
    function getPassword() {
      const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ......-----'
      const passwordLength = 19
      let password = ''

      for (let i = 0; i < passwordLength; i++) {
        const randomNumber = Math.floor(Math.random() * chars.length)
        password += chars.charAt(randomNumber)
      }
      return password
    }
    function textChange(btn, pwdField) {
      btn.classList.toggle('clicked')
      pwdField.select()

      if (!navigator.clipboard) {
        try {
          document.execCommand('copy')
        } catch (err) {
          console.error('Fallback: Oops, unable to copy', err)
        }
        return
      }
      navigator.clipboard.writeText(pwdField.value).then(
        function () {
          console.log('Async: Copying to clipboard was successful!')
        },
        function (err) {
          console.error('Async: Could not copy text: ', err)
        },
      )
    }
    superBtn.addEventListener('click', function () {
      passwordField.value = getPassword()
      textChange(superBtn, passwordField)
    })

    function generateAndCopyPassword() {
      passwordField.value = getPassword()
      textChange(superBtn, passwordField)
    }

    superBtn.addEventListener('click', generateAndCopyPassword)
    // Listen for the Enter key while mouse is hovering over the intro-section-wrapper div

    introSectionWrapper.addEventListener('mouseenter', function () {
      keyupListener = function (event) {
        if (event.keyCode === 13) {
          generateAndCopyPassword()
        }
      }
      document.addEventListener('keyup', keyupListener)
    })

    introSectionWrapper.addEventListener('mouseleave', function () {
      document.removeEventListener('keyup', keyupListener)
    })
    // LOTTIE INTERACTIVITY START
    LottieInteractivity.create({
      player: '#FALottie',
      mode: 'scroll',
      actions: [
        {
          visibility: [0.5, 1.0],
          type: 'play',
        },
      ],
    })
    // LOTTIE INTERACTIVITY END
  })()

  // CYBERSECURITY SUPER BTN END

  // PASWORD STRENGHT START
  $(document).ready(function ($) {
    $('#myPassword').strength({
      strengthClass: 'strength',
      strengthMeterClass: 'strength_meter flex-center',
      strengthButtonClass: 'button_strength',
      strengthButtonText: 'Show Password',
      strengthButtonTextToggle: 'Hide Password',
    })
  })
  ;(function ($, window, document, undefined) {
    const pluginName = 'strength',
      defaults = {
        strengthClass: 'strength',
        strengthMeterClass: 'strength_meter',
        strengthButtonClass: 'button_strength',
        strengthButtonText: 'Show Password',
        strengthButtonTextToggle: 'Hide Password',
      }
    function Plugin(element, options) {
      this.element = element
      this.$elem = $(this.element)
      this.options = $.extend({}, defaults, options)
      this._defaults = defaults
      this._name = pluginName
      this.init()
    }
    Plugin.prototype = {
      init: function () {
        let characters = 0
        let capitalletters = 0
        let loweletters = 0
        let number = 0
        const special = 0
        const upperCase = new RegExp('[A-Z]')
        const lowerCase = new RegExp('[a-z]')
        const numbers = new RegExp('[0-9]')
        const specialchars = new RegExp('([!,%,&,@,#,$,^,*,?,_,~])')
        function GetPercentage(a, b) {
          return (b / a) * 100
        }
        function check_strength(thisval, thisid) {
          if (thisval.length > 8) {
            characters = 1
          } else {
            characters = 0
          }
          if (thisval.match(upperCase)) {
            capitalletters = 1
          } else {
            capitalletters = 0
          }
          if (thisval.match(lowerCase)) {
            loweletters = 1
          } else {
            loweletters = 0
          }
          if (thisval.match(numbers)) {
            number = 1
          } else {
            number = 0
          }

          const total = characters + capitalletters + loweletters + number + special
          const totalpercent = GetPercentage(7, total).toFixed(0)

          get_total(total, thisid)
        }
        function get_total(total, thisid) {
          const thismeter = $('div[data-meter="' + thisid + '"]')
          if (total == 0) {
            thismeter.removeClass().html('')
          } else if (total <= 1) {
            thismeter.removeClass()
            thismeter.addClass('veryweak').html('<p>Strength: <i>very weak</i></p>')
          } else if (total == 2) {
            thismeter.removeClass()
            thismeter.addClass('weak').html('<p>Strength: <i>weak</i></p>')
          } else if (total == 3) {
            thismeter.removeClass()
            thismeter.addClass('medium').html('<p>Strength: <i>medium</i></p>')
          } else {
            thismeter.removeClass()
            thismeter.addClass('strong').html('<p>Strength: <i>strong</i></p>')
          }
          console.log(total)
        }

        let isShown = false
        const strengthButtonText = this.options.strengthButtonText
        const strengthButtonTextToggle = this.options.strengthButtonTextToggle

        thisid = this.$elem.attr('id')

        this.$elem
          .addClass(this.options.strengthClass)
          .attr('data-password', thisid)
          .after(
            '<input style="display:none" class="' +
              this.options.strengthClass +
              '" data-password="' +
              thisid +
              '" type="text" name="" value=""><p><a data-password-button="' +
              thisid +
              '" href="" class="' +
              this.options.strengthButtonClass +
              '">' +
              this.options.strengthButtonText +
              '</a> &#8250;</p><div class="' +
              this.options.strengthMeterClass +
              '"><div data-meter="' +
              thisid +
              '"><p></p></div></div>',
          )

        this.$elem.bind('keyup keydown', function (event) {
          thisval = $('#' + thisid).val()
          $('input[type="text"][data-password="' + thisid + '"]').val(thisval)
          check_strength(thisval, thisid)
        })

        $('input[type="text"][data-password="' + thisid + '"]').bind(
          'keyup keydown',
          function (event) {
            thisval = $('input[type="text"][data-password="' + thisid + '"]').val()
            console.log(thisval)
            $('input[type="password"][data-password="' + thisid + '"]').val(thisval)
            check_strength(thisval, thisid)
          },
        )
        $(document.body).on('click', '.' + this.options.strengthButtonClass, function (e) {
          e.preventDefault()

          thisclass = 'hide_' + $(this).attr('class')

          if (isShown) {
            $('input[type="text"][data-password="' + thisid + '"]').hide()
            $('input[type="password"][data-password="' + thisid + '"]')
              .show()
              .focus()
            $('a[data-password-button="' + thisid + '"]')
              .removeClass(thisclass)
              .html(strengthButtonText)
            isShown = false
          } else {
            $('input[type="text"][data-password="' + thisid + '"]')
              .show()
              .focus()
            $('input[type="password"][data-password="' + thisid + '"]').hide()
            $('a[data-password-button="' + thisid + '"]')
              .addClass(thisclass)
              .html(strengthButtonTextToggle)
            isShown = true
          }
        })
      },
      yourOtherFunction: function (el, options) {
        // some logic
      },
    }
    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[pluginName] = function (options) {
      return this.each(function () {
        if (!$.data(this, 'plugin_' + pluginName)) {
          $.data(this, 'plugin_' + pluginName, new Plugin(this, options))
        }
      })
    }
  })(jQuery, window, document)
}
// PASWORD STRENGHT END
</script>

<template>
  <main>
    <section class="intro-section-wrapper" id="passwordGeneratorArea">
      <article id="passwordGenerator" class="intro-section gradient">
        <section class="intro-subsection">
          <h2>Get an ultimate password</h2>
          <section class="btn-area flex-center">
            <input type="text" placeholder="of 124-bit strength" id="password" readonly="" />
            <br />
            <div id="btn"></div>
            <div class="btn-shadow"></div>
          </section>
          <section class="read-more">
            <a class="flex-center" href="#scrolllink">
              <h5>Learn more about cybersecurity</h5>
              <lottie-player
                id="scrollLottie"
                src="/assets/lottie/scroll-down.json"
                background="transparent"
                loop
                speed="2"
                autoplay
              ></lottie-player>
            </a>
          </section>
        </section>
      </article>
    </section>
    <article id="scrolllink" class="wrapper-wide">
      <h1 class="reveal"></h1>
      <h2 class="reveal">Essential Steps Leading to Your Secure and Healthy Online Presence.</h2>
      <div class="grid-container seventy-thirty">
        <div class="grid-item reveal">
          <div class="pathname-container">
            <p>
              <span class="pathname"><a href="/"></a> &#8250; </span>
              <span class="pathname"><a href="/#blog"></a> &#8250; cybersecurity</span>
            </p>
          </div>
        </div>
        <div class="grid-item reveal">
          <p>
            <span class="pathname">
              <svg id="date" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path
                  d="M152 24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H64C28.7 64 0 92.7 0 128v16 48V448c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V192 144 128c0-35.3-28.7-64-64-64H344V24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H152V24zM48 192H400V448c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V192z"
                />
              </svg>
              &nbsp; August 2022</span
            >
          </p>
        </div>
      </div>
      <hr class="reveal" />
      <section>
        <h3 class="reveal">1. Contemporary Passwords</h3>
        <p class="drop-cap reveal">
          The most effective way how today to hack someone's identity is to "social engineer". That
          means “guessing” someone's password based on the target's public information (date of
          birth, postal code, house number, etc.) usually on social sites.
        </p>

        <p class="reveal">
          By using complex not the organic password for all of your online accounts, you can
          drastically reduce the risk of having your birthday on Facebook or tag the location of
          your hometown in an Instagram post.
        </p>

        <p class="reveal">
          Another step forward to secure your online and offline identity is using a unique password
          for each account you own. That creates a powerful cascade of barriers that possible
          hackers might cross pretty easily with a single or similar password.
        </p>

        <p class="reveal">
          To be able to manipulate many random characters from the keyboard you need a reliable
          password manager. Does not matter how powerful and unique your passwords are when you keep
          them in Excel spreadsheets on your work laptop...
        </p>
        <hr class="reveal" />
        <section>
          <h4 class="reveal">1.2 Password Strength</h4>
          <br />
          <form
            class="reveal"
            id="password-strength-form"
            action=""
            method="get"
            accept-charset="utf-8"
            spellcheck="false"
            autocomplete="off"
          >
            <input id="myPassword" type="password" value="" autocomplete="off" />
          </form>
          <p class="flex-center reveal">
            ↑
            <span class="note">
              This tool is safe to interact with. Everything is processed locally - no data are sent
              or stored.</span
            >
          </p>
          <p class="reveal">
            Contemporary password hacking is more about social engineering and working with the most
            commonly used words/phrases in dictionaries, than processing-heavy combinatorics.
          </p>
        </section>
      </section>
      <hr class="reveal" />
      <section>
        <h4 class="reveal">
          1.3 Problem Solution
          <svg id="screwdriver-wrench" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path
              d="M78.6 5C69.1-2.4 55.6-1.5 47 7L7 47c-8.5 8.5-9.4 22-2.1 31.6l80 104c4.5 5.9 11.6 9.4 19 9.4h54.1l109 109c-14.7 29-10 65.4 14.3 89.6l112 112c12.5 12.5 32.8 12.5 45.3 0l64-64c12.5-12.5 12.5-32.8 0-45.3l-112-112c-24.2-24.2-60.6-29-89.6-14.3l-109-109V104c0-7.5-3.5-14.5-9.4-19L78.6 5zM19.9 396.1C7.2 408.8 0 426.1 0 444.1C0 481.6 30.4 512 67.9 512c18 0 35.3-7.2 48-19.9L233.7 374.3c-7.8-20.9-9-43.6-3.6-65.1l-61.7-61.7L19.9 396.1zM512 144c0-10.5-1.1-20.7-3.2-30.5c-2.4-11.2-16.1-14.1-24.2-6l-63.9 63.9c-3 3-7.1 4.7-11.3 4.7H352c-8.8 0-16-7.2-16-16V102.6c0-4.2 1.7-8.3 4.7-11.3l63.9-63.9c8.1-8.1 5.2-21.8-6-24.2C388.7 1.1 378.5 0 368 0C288.5 0 224 64.5 224 144l0 .8 85.3 85.3c36-9.1 75.8 .5 104 28.7L429 274.5c49-23 83-72.8 83-130.5zM104 432c0 13.3-10.7 24-24 24s-24-10.7-24-24s10.7-24 24-24s24 10.7 24 24z"
            />
          </svg>
        </h4>
        <ol class="reveal">
          <li><p>Set up a trusted and encrypted password manager:</p></li>
          <ul>
            <li>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.apple.com/legal/privacy/data/en/icloud-keychain/"
                >iCloud keychain</a
              >
              - Apple users
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
      </section>
      <hr class="reveal" />
      <h3 class="reveal">2.What Is 2FA and Why Is It Essential.</h3>
      <section class="grid-container fifty-fifty">
        <div class="gri-item">
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
        <div class="grid-item reveal">
          <lottie-player
            id="FALottie"
            src="/assets/lottie/2FA-2.json"
            background="transparent"
            loop
            autoplay
          ></lottie-player>
        </div>
      </section>
      <hr class="reveal" />
      <section>
        <h4 class="reveal">2.2 What Is SIM Swapping</h4>
        <br />
        <section class="img-fill reveal">
          <!-- Generator: Adobe Illustrator 27.0.1, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
        </section>
        <p class="flex-center reveal">
          ↑
          <span class="note">
            <a target="_blank" rel="noopener noreferrer" href="https://www.snbonline.com/"
              >www.snbonline.com</a
            >
          </span>
        </p>
        <p class="reveal">
          You can easily avoid this by using a mobile app for 2FA that is independent of your phone
          number. Most the online services provide their native app for 2FA or they support trusted
          third-party apps for secure two-factor authentication.
        </p>
      </section>
      <hr class="reveal" />
      <section>
        <h4 class="reveal">
          2.3 Problem Solution
          <svg id="screwdriver-wrench" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path
              d="M78.6 5C69.1-2.4 55.6-1.5 47 7L7 47c-8.5 8.5-9.4 22-2.1 31.6l80 104c4.5 5.9 11.6 9.4 19 9.4h54.1l109 109c-14.7 29-10 65.4 14.3 89.6l112 112c12.5 12.5 32.8 12.5 45.3 0l64-64c12.5-12.5 12.5-32.8 0-45.3l-112-112c-24.2-24.2-60.6-29-89.6-14.3l-109-109V104c0-7.5-3.5-14.5-9.4-19L78.6 5zM19.9 396.1C7.2 408.8 0 426.1 0 444.1C0 481.6 30.4 512 67.9 512c18 0 35.3-7.2 48-19.9L233.7 374.3c-7.8-20.9-9-43.6-3.6-65.1l-61.7-61.7L19.9 396.1zM512 144c0-10.5-1.1-20.7-3.2-30.5c-2.4-11.2-16.1-14.1-24.2-6l-63.9 63.9c-3 3-7.1 4.7-11.3 4.7H352c-8.8 0-16-7.2-16-16V102.6c0-4.2 1.7-8.3 4.7-11.3l63.9-63.9c8.1-8.1 5.2-21.8-6-24.2C388.7 1.1 378.5 0 368 0C288.5 0 224 64.5 224 144l0 .8 85.3 85.3c36-9.1 75.8 .5 104 28.7L429 274.5c49-23 83-72.8 83-130.5zM104 432c0 13.3-10.7 24-24 24s-24-10.7-24-24s10.7-24 24-24s24 10.7 24 24z"
            />
          </svg>
        </h4>
        <ol class="reveal">
          <li>Set up a 2FA for your online accounts with 2FA support through:</li>
          <ul>
            <li>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.apple.com/legal/privacy/data/en/icloud-keychain/"
                >iCloud keychain</a
              >
              - Apple users
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
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.keepersecurity.com/en_GB/"
                >Keeper</a
              >
            </li>
            <li>Service's verification native app (f.e. Adobe - Account Access)</li>
            <li>If the service does support any mentioned methods, use the SMS verification</li>
          </ul>
        </ol>
      </section>
      <hr class="reveal" />
      <section>
        <h3 class="reveal">3. Social Engineering Vulnerability</h3>
        <p class="reveal">
          Watch out for your online traces. Set your personal information (such as birthday, year of
          graduation, etc.) as private or at least not public (friends/followers) NO friends of
          friends (you do not control the information accessibility scope!).
        </p>
        <p class="reveal">
          Do not pick your pin codes or passwords as keywords you published somewhere (pets or
          child's name).<br />When registering for a new online service, fill out only the required
          information. All your published information might hackers use against you.
        </p>

        <p class="reveal">
          When installing a new app, check out in settings its requests to read your data - decide
          which are necessary for the app functionality.<br />For example, does your app for online
          shopping needs access to your contact and messages?<br />By using random non-organic
          passwords will most personal information in the online space lose its value (as a possible
          key to your sensitive data).
        </p>
      </section>

      <hr class="reveal" />
      <section>
        <h4 class="reveal">
          3.2 Problem Solution
          <svg id="screwdriver-wrench" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path
              d="M78.6 5C69.1-2.4 55.6-1.5 47 7L7 47c-8.5 8.5-9.4 22-2.1 31.6l80 104c4.5 5.9 11.6 9.4 19 9.4h54.1l109 109c-14.7 29-10 65.4 14.3 89.6l112 112c12.5 12.5 32.8 12.5 45.3 0l64-64c12.5-12.5 12.5-32.8 0-45.3l-112-112c-24.2-24.2-60.6-29-89.6-14.3l-109-109V104c0-7.5-3.5-14.5-9.4-19L78.6 5zM19.9 396.1C7.2 408.8 0 426.1 0 444.1C0 481.6 30.4 512 67.9 512c18 0 35.3-7.2 48-19.9L233.7 374.3c-7.8-20.9-9-43.6-3.6-65.1l-61.7-61.7L19.9 396.1zM512 144c0-10.5-1.1-20.7-3.2-30.5c-2.4-11.2-16.1-14.1-24.2-6l-63.9 63.9c-3 3-7.1 4.7-11.3 4.7H352c-8.8 0-16-7.2-16-16V102.6c0-4.2 1.7-8.3 4.7-11.3l63.9-63.9c8.1-8.1 5.2-21.8-6-24.2C388.7 1.1 378.5 0 368 0C288.5 0 224 64.5 224 144l0 .8 85.3 85.3c36-9.1 75.8 .5 104 28.7L429 274.5c49-23 83-72.8 83-130.5zM104 432c0 13.3-10.7 24-24 24s-24-10.7-24-24s10.7-24 24-24s24 10.7 24 24z"
            />
          </svg>
        </h4>
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
      </section>

      <hr class="reveal" />
      <section>
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
      </section>
    </article>
  </main>
</template>
