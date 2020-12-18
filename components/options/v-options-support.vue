<template>
  <div class="options-support">
    <p>
      This application is made by
      <a href="http://portfolio.pxdesign.nl">
        Johan van Eck
      </a>
      .
    </p>
    <h2>Changelog</h2>
    <p>
      The last update contains:
      <ul>
        <li>Add Radarr support</li>
        <li>Upgrading dependencies</li>
        <li>Fix options being empty</li>
        <li>Fix options link in the panel error</li>
      </ul>
    </p>
    <h2>Questions</h2>
    <p>
      If you have any questions or ideas, shoot me a message:<br> <VButton
        class="options-support__button"
        look="raised"
        @click="onMailButtonClick"
      >
        Send me an e-mail
      </VButton>
    </p>
    <h2>Donation</h2>
    <p>
      If you like JusTab, consider buying me a beer!
    </p>
    <form
      action="https://www.paypal.com/cgi-bin/webscr"
      method="post"
      target="_top"
    >
      <input
        type="hidden"
        name="cmd"
        value="_s-xclick"
      >
      <input
        type="hidden"
        name="encrypted"
        value="-----BEGIN PKCS7-----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-----END PKCS7-----"
      >
      <VButton
        class="options-support__button"
        type="submit"
        look="raised"
        alt="Donate"
      >
        <img
          :src="paypalImage"
          class="options-support__button-image--paypal"
        >
        Donate
      </VButton>
    </form>
  </div>
</template>

<script>
import VButton from 'components/v-button';
import paypalImage from 'img/paypal.svg';

export default {
  components: {
    VButton
  },
  data () {
    return {
      paypalImage
    };
  },
  methods: {
    onMailButtonClick: () => {
      window.location.href = 'mailto:johveck@gmail.com';
    }
  }
};
</script>

<style src="css/options/v-options-support.scss"></style>
