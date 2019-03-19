(function() {
  class UserDetail extends HTMLElement {
    constructor() {
      super();

      this.attachShadow({ mode: 'open' });

      this._user;

      this.shadowRoot.innerHTML = `
        <style>
          html,
          body {
            margin-top: 10px;
          }

          *, *:before, *:after {
            box-sizing: border-box;
          }

          body {
            font: 16px 'Arial';
            line-height: 1.4em;
          }

          li {
            padding: 20px;
            margin-bottom: 20px;
            background-color: #FFF;
            box-shadow: 0 1px 20px rgba(0, 0, 0, 0.1);
            min-width: 280px;
            border-bottom: 5px solid #4CAF50;
            font-size: 14px;
          }
          li h2 {
            font-size: 16px;
          }
          li .extra-info {
            display: flex;
            justify-content: space-between;
            margin-top: 20px;
            border-top: 1px solid #CCC;
          }
          li .extra-info .address {
            padding: 10px;
            width: 100%;
            border-right: 1px solid #CCC;
            margin-right: 20px;
          }

          li .extra-info .address p,
          li .extra-info .company p {
            margin: 0;
          }

          li .extra-info .company {
            padding: 10px;
            width: 100%;
          }
        </style>

        <li class="user-detail">
          <h2><span class="name"></span> (<i class="username"></i>)</h2>
          <a class="email" href="mailto:someone@example.com" target="_top"></a>
          <section class="extra-info">
            <article class="address">
              <h2>Address:</h2>
              <p class="address-street"></p>
              <p class="address-suit"></p>
              <p><i class="address-city"></i> (<i class="address-zipcode"></i>)</p>
              <p>[<i class="address-geo-lat"></i>, <i class="address-geo-lng"></i>]</p>
            </article>

            <article class="company">
              <h2>Company:</h2>
              <p class="company-name"></p>
              <p class="company-catch-phrase"></p>
              <p class="company-bs"></p>
            </article>
          </section>
        </li>
      `
    }

    connectedCallback() {
      this.$userDetail = this.shadowRoot.querySelector('.user-detail');

      this._user = JSON.parse(this.getAttribute('user'));

      this.$name = this.shadowRoot.querySelector('.name');
      this.$username = this.shadowRoot.querySelector('.username');
      this.$email = this.shadowRoot.querySelector('.email');

      this.$addressStreet = this.shadowRoot.querySelector('.address-street');
      this.$addressSuit = this.shadowRoot.querySelector('.address-suit');
      this.$addressCity = this.shadowRoot.querySelector('.address-city');
      this.$addressZipcode = this.shadowRoot.querySelector('.address-zipcode');
      this.$addressGeoLat = this.shadowRoot.querySelector('.address-geo-lat');
      this.$addressGeoLng = this.shadowRoot.querySelector('.address-geo-lng');

      this.$companyName = this.shadowRoot.querySelector('.company-name');
      this.$companyCatchPhrase = this.shadowRoot.querySelector('.company-catch-phrase');
      this.$companyBs = this.shadowRoot.querySelector('.company-bs');

      this._render();
    }

    disconnectedCallback() { }

    static get observedAttributes() {
      return ['user'];
    }

    _render() {
      if (!this.$userDetail) return;

      this.$name.textContent = this._user.name;
      this.$username.textContent = this._user.username;
      this.$email.textContent = this._user.email;

      this.$addressStreet.textContent = this._user.address.street;
      this.$addressSuit.textContent = this._user.address.suit;
      this.$addressCity.textContent = this._user.address.city;
      this.$addressZipcode.textContent = this._user.address.zipcode;
      this.$addressGeoLat.textContent = this._user.address.geo.lat;
      this.$addressGeoLng.textContent = this._user.address.geo.lng;

      this.$companyName.textContent = this._user.company.name;
      this.$companyCatchPhrase.textContent = this._user.company.catchPhrase;
      this.$companyBs.textContent = this._user.company.bs;
    }
  }

  window.customElements.define('user-detail', UserDetail);
})();