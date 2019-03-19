(function() {
  class UserList extends HTMLElement {
    constructor() {
      super();

      this.attachShadow({ mode: 'open' });

      this._userList;

      this.shadowRoot.innerHTML = `
        <style>
            ul {
              width: 600px;
              margin: 0 auto;
              padding: 0;
              list-style-type: none;
            }
        </style>
        <ul id="user-list"></ul>
        `
    }

    connectedCallback() {
      this.$userList = this.shadowRoot.querySelector('#user-list');

      fetch(`https://jsonplaceholder.typicode.com/users`)
      .then((response) => response.text())
      .then((responseText) => {
          const userList = JSON.parse(responseText);
          const userListOrderedByName = userList.sort(this._compareNames);

          this._userList = userListOrderedByName

          this._render();
      })
      .catch((error) => {
          console.error(error);
      });
    }

    disconnectedCallback() { }

    static get observedAttributes() {
      return ['users'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
      const userList = JSON.parse(newValue);
      const userListOrdered = userList.sort(this._compare);
      this._userList = userListOrdered
    }

    _compareNames(a, b) {
      const nameA = a.name.toUpperCase();
      const nameB = b.name.toUpperCase();

      let comparison = 0;

      if (nameA > nameB) {
          comparison = 1;
      } else if (nameA < nameB) {
          comparison = -1;
      }

      return comparison;
    }

    _render() {
      if (!this.$userList) return;

      this._userList.forEach((user, index) => {
        let $user = document.createElement('user-detail');

        $user.setAttribute('user', JSON.stringify(user));

        this.$userList.appendChild($user);
      });
    }
  }

  window.customElements.define('user-list', UserList);
})();
