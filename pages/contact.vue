<template>
  <div class="contact">
    <div class="contact__dark">
      <h2 class="contact__dark-heading">Contact Us</h2>
      <p class="contact__dark-description">We're always here to help you find the perfect car! Whether you have questions about our inventory, services, or you'd like to schedule a test drive, feel free to get in touch with us. Our friendly and experienced staff are ready to answer all your inquiries and provide you with the information you need.</p>
      <form class="contact__dark__form">
        <div class="contact__dark__form__row">
          <div class="contact__dark__form__block">
            <p class="contact__dark__form__block-title">Full name*</p>
            <input class="contact__dark__form__block-input" />
          </div>
          <div class="contact__dark__form__block">
            <p class="contact__dark__form__block-title">Email*</p>
            <input class="contact__dark__form__block-input" />
          </div>
        </div>
        <div class="contact__dark__form__block">
          <p class="contact__dark__form__block-title">Subject*</p>
          <input class="contact__dark__form__block-input" />
        </div>
        <div class="contact__dark__form__block">
          <p class="contact__dark__form__block-title">Message*</p>
          <textarea class="contact__dark__form__block-input textarea" />
        </div>
        <div class="contact__dark__form__rules">
          <input type="checkbox" />
          <p class="contact__dark__form__rules-text">Accept <a href="#">terms & conditions</a></p>
        </div>
        <Button class="contact__dark__form-button">Send message</Button>
      </form>
      <img
        class="contact__dark-image"
        src="/images/map-bg.svg"
        alt="map"
      />
    </div>
    <div class="contact__white">
      <div class="contact__white__info">
        <h3 class="contact__white__info-title">Our dealer locations</h3>
        <p class="contact__white__info-description">
          Visit any of our dealer locations nationwide to receive expert assistance with all your automotive needs. Our knowledgeable staff is ready to guide you through our extensive inventory and provide personalized recommendations. Whether you're looking for sales, service, or support, our dealerships are here to ensure your satisfaction.
        </p>
      </div>
      <div class="contact__white__cards">
        <DealerCard
          v-for="location, index in dealerLocations"
          :key="index"
          :location="location"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
const dealerLocations = [
  {
    city: "Los Angeles",
    country: "United States",
    address: "123 Main Street, Los Angeles, CA 90001",
    phone: "+ 1 (555) 123-4567"
  },
  {
    city: "London",
    country: "United Kingdom",
    address: "456 High Street, London, SW1A 1AA",
    phone: "+ 44 20 1234 5678"
  },
  {
    city: "Tokyo",
    country: "Japan",
    address: "789 Sakura Avenue, Tokyo, 100-0001",
    phone: "+ 81 3 9876 5432"
  },
  {
    city: "Sydney",
    country: "Australia",
    address: "321 Beach Road, Sydney, NSW 2000",
    phone: "+ 61 2 8765 4321"
  },
]
</script>

<style lang="scss" scoped>
.contact {
  background-color: $color-dark;

  &__dark {
    padding-top: 85px;
    padding-bottom: 120px;
    position: relative;

    &-heading {
      font-size: 48px;
      color: $color-white;
      margin-bottom: 35px;
      text-align: center;
      position: relative;
      z-index: 1;
    }

    &-description {
      max-width: 35%;
      margin: 0 auto;
      margin-bottom: 100px;
      font-size: 18px;
      line-height: 32px;
      color: $color-white;
      text-align: center;
      position: relative;
      z-index: 1;
    }

    &__form {
      max-width: 650px;
      padding: 72px 65px;
      margin: 0 auto;
      background-color: $color-white;
      display: flex;
      flex-direction: column;
      gap: 25px;
      position: relative;
      z-index: 1;

      &__row {
        display: flex;
        gap: 40px;
      }

      &__block {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 16px;

        &-title {
          font-size: 18px;
          line-height: 32px;
          color: #575757;
        }

        &-input {
          width: 100%;
          height: 45px;
          padding: 0 20px;
          box-sizing: border-box;
          border: 2px solid #5e5e5e;
          outline: none;
          font-size: 20px;
        }
      }

      &__rules {
        display: flex;
        align-items: center;
        gap: 24px;

        &-text {
          font-size: 18px;
          line-height: 40px;
          color: #575757;

          a {
            color: $color-yellow;
            font-size: 600;
          }
        }
      }

      &-button {
        padding-top: 15px;
        padding-bottom: 15px;
      }
    }

    &-image {
      width: 100%;
      padding: 0 160px;
      box-sizing: border-box;
      position: absolute;
      top: 150px;
    }
  }

  &__white {
    background-color: $color-white;
    padding: 190px 240px;

    &__info {
      margin-bottom: 100px;
      display: flex;
      justify-content: space-between;

      &-title {
        font-size: 48px;
      }

      &-description {
        max-width: 663px;
        font-size: 18px;
        line-height: 32px;
      }
    }

    &__cards {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
    }
  }
}

.textarea {
  height: 150px;
  resize: none;
  padding-top: 15px;
}
</style>