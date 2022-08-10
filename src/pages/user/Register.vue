<template>
  <div :class="$q.screen.width > 768 ? 'q-ml-xl' : ''">

    <h4>Create new account</h4>
    <div class="row">
      <q-form
        @submit="onSubmit"
        @reset="onReset"
        class="row"
      >
        <q-input
          :class="$q.screen.width > 768 ? 'col-3' : 'col-12'"
          filled dense
          v-model="user.firstName"
          label="First name *"
          :rules="[ val => val && val.length > 0 || 'Please type something']"
        />

        <q-input
          :class="$q.screen.width > 768 ? 'col-3' : 'col-12'"
          filled dense
          v-model="user.surname"
          label="Surname *"
          :rules="[ val => val && val.length > 0 || 'Please type something']"
        />

        <q-space :class="$q.screen.width > 768 ? 'col-6' : 'col-12'"
        />

        <q-input
          :class="$q.screen.width > 768 ? 'col-6' : 'col-12'"
          filled dense
          type="email"
          v-model="user.email"
          label="email *"
          :rules="[ val => val && val.length > 4 || 'Please type something',
            val => val && val.includes('@') || 'Please enter a valid email address']"
        />

        <q-space :class="$q.screen.width > 768 ? 'col-6' : 'col-12'"
        />

          <q-input
            :class="$q.screen.width > 768 ? 'col-3' : 'col-12'"
            filled dense
            type="password"
            v-model="user.password"
            label="Password *"
            :rules="[ val => val && val.length > 5 || 'Please enter password with at least 6 characters']"
          />

          <q-input
            :class="$q.screen.width > 768 ? 'col-3' : 'col-12'"
            filled dense
            type="password"
            v-model="user.rePassword"
            label="Confirm password *"
            :rules="[ val => val && val === user.password || 'Please confirm the password']"
          />

          <q-space :class="$q.screen.width > 768 ? 'col-6' : 'col-12'"
          />

          <q-input
            :class="$q.screen.width > 768 ? 'col-3' : 'col-12'"
            filled dense
            type="date"
            v-model="user.birthday"
            :label="$q.screen.width > 768 ? '' : 'Day of birth'"
            :rules="[
            val => val !== null && val !== '' || 'Please type your age',
            // val => val > 0 && val < 100 || `Please type a real age ${val}`
          ]"
          />

          <q-select
            filled dense
            v-model="user.country" :options="countriesList"
            label="Region"
            :class="$q.screen.width > 768 ? 'col-3' : 'col-12'"
          />

          <q-space :class="$q.screen.width > 768 ? 'col-6' : 'col-12'"
          />

          <q-checkbox :class="$q.screen.width > 768 ? 'col-6' : 'col-12'"
                      v-model="user.accept" label="I accept the license and terms"/>

          <q-space :class="$q.screen.width > 768 ? 'col-6' : 'col-12'"
          />

          <q-checkbox :class="$q.screen.width > 768 ? 'col-6' : 'col-12'"
                      v-model="user.newsletter" label="I agree to receive commercial
        content including deals and special offers"/>

          <q-space :class="$q.screen.width > 768 ? 'col-6' : 'col-12'"
          />

          <div :class="$q.screen.width > 768 ? 'row col-6 q-mt-md' : 'q-mt-md'">
            <q-btn class="col-5" label="Create account" type="submit" color="primary" no-caps/>
            <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" no-caps/>
          </div>
      </q-form>
    </div>

  </div>
</template>

<script>
import {mapActions} from 'vuex'

export default {
  name: "RegisterForm",

  data() {
    return {
      user: {
        firstName: '',
        surname: '',
        email: '',
        password: '',
        rePassword: '',
        birthday: null,

        country: 'Israel',

        accept: false,
        newsletter: false,
      },
      countriesList: ['Afghanistan', 'Albania', 'Algeria', 'American Samoa', 'Andorra', 'Angola', 'Anguilla', 'Antarctica', 'Antigua and Barbuda', 'Argentina', 'Armenia', 'Aruba', 'Australia', 'Austria', 'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bermuda', 'Bhutan', 'Bolivia', 'Bosnia and Herzegovina', 'Botswana', 'Bouvet Island', 'Brazil', 'British Indian Ocean Territory', 'Brunei Darussalam', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Cambodia', 'Cameroon', 'Canada', 'Cape Verde', 'Cayman Islands', 'Central African Republic', 'Chad', 'Chile', 'China', 'Christmas Island', 'Cocos (Keeling Islands)', 'Colombia', 'Comoros', 'Congo', 'Cook Islands', 'Costa Rica', "Cote D'Ivoire (Ivory Coast)", 'Croatia (Hrvatska', 'Cuba', 'Cyprus', 'Czech Republic', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'East Timor', 'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Ethiopia', 'Falkland Islands (Malvinas)', 'Faroe Islands', 'Fiji', 'Finland', 'France', 'France', 'Metropolitan', 'French Guiana', 'French Polynesia', 'French Southern Territories', 'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Gibraltar', 'Greece', 'Greenland', 'Grenada', 'Guadeloupe', 'Guam', 'Guatemala', 'Guinea', 'Guinea-Bissau', 'Guyana', 'Haiti', 'Heard and McDonald Islands', 'Honduras', 'Hong Kong', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati', 'Korea (North)', 'Korea (South)', 'Kuwait', 'Kyrgyzstan', 'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Macau', 'Macedonia', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands', 'Martinique', 'Mauritania', 'Mauritius', 'Mayotte', 'Mexico', 'Micronesia', 'Moldova', 'Monaco', 'Mongolia', 'Montserrat', 'Morocco', 'Mozambique', 'Myanmar', 'Namibia', 'Nauru', 'Nepal', 'Netherlands', 'Netherlands Antilles', 'New Caledonia', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'Niue', 'Norfolk Island', 'Northern Mariana Islands', 'Norway', 'Oman', 'Pakistan', 'Palau', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Pitcairn', 'Poland', 'Portugal', 'Puerto Rico', 'Qatar', 'Reunion', 'Romania', 'Russian Federation', 'Rwanda', 'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Vincent and The Grenadines', 'Samoa', 'San Marino', 'Sao Tome and Principe', 'Saudi Arabia', 'Senegal', 'Seychelles', 'Sierra Leone', 'Singapore', 'Slovak Republic', 'Slovenia', 'Solomon Islands', 'Somalia', 'South Africa', 'S. Georgia and S. Sandwich Isls.', 'Spain', 'Sri Lanka', 'St. Helena', 'St. Pierre and Miquelon', 'Sudan', 'Suriname', 'Svalbard and Jan Mayen Islands', 'Swaziland', 'Sweden', 'Switzerland', 'Syria', 'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand', 'Togo', 'Tokelau', 'Tonga', 'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Turks and Caicos Islands', 'Tuvalu', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom (Britain / UK)', 'United States of America (USA)', 'US Minor Outlying Islands', 'Uruguay', 'Uzbekistan', 'Vanuatu', 'Vatican City State (Holy See)', 'Venezuela', 'Viet Nam', 'Virgin Islands (British)', 'Virgin Islands (US)', 'Wallis and Futuna Islands', 'Western Sahara', 'Yemen', 'Yugoslavia', 'Zaire', 'Zambia', 'Zimbabwe'],
    }
  },

  methods: {
    ...mapActions('users', ['createUser']),

    onSubmit() {
      /**
       * when submitting the form onSubmit executes the validate function.
       * if it returns true the form is valid and then executing register function.
       * else it returns null.
       * */
      this.validate() ? this.register() : null
    },

    async register() {
      const userDetails = Object.assign({}, this.user)
      try {
        await this.createUser(userDetails)
        this.$q.notify({
          message: "Created user successfully",
          color: "positive",
          timeout: 2000
        })
        this.$router.back()

      } catch (error) {
        console.error(error)
        this.warningNotification(error.message)
      }

    },

    onReset() {
      /**
       * reset the input fields
       * */
      for (const key in this.user) {
        this.user[key] = ''
      }
      this.user.newsletter = false
      this.user.accept = false
    },

    validate() {
      /**
       * validating the register form.
       * if validated successfully returns true, otherwise returns false.
       */
      if (this.user.accept !== true) {
        this.warningNotification('You need to accept the license and terms first.')
        return false
      }
      if (!this.user.country) {
        this.warningNotification('Please enter a country.')
        return false
      }
      return true
    },

    warningNotification(message) {
      /**
       * using quasar Notify to send a warning message.
       * the literal message to send passed as a param named message.
       */
      this.$q.notify({
        color: 'red-5',
        textColor: 'white',
        icon: 'warning',
        timeout: 2500,
        message
      })
    }

  }

}
</script>

<style scoped>

</style>
