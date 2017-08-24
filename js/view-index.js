Polymer({
  is: 'view-index',
  properties: {
    page: {
      type: String,
      reflectToAttribute: true,
      observer: '_pageChanged'
    },
    wideLayout: {
      type: Boolean,
      value: false,
      observer: '_layoutChanged'
    },
    online: {
      type: Boolean,
      observer: '_internetChanged'
    },
    authen: {
      type: Boolean,
      oberserver: '_authenChanged'
    },
    signedIn: {
      type: Boolean,
      observer: '_signedInChanged'
    },
    alertText: String,
    route: Object,
    subroute: Object,
    routeData: Object,
    user: Object,
    metadata: Object,
    notification: Boolean,
    drawerOpened: Boolean
  },

  observers: ['_routePageChanged(routeData.page)'],

  behaviors: [Polymer.AppLocalizeBehavior, Polymer.AppLanguageBehavior],

  attached () {
    this.async(function () {
      if (this.authen && this.route.path === '/login') {
        this.page = 'dashboard'
      }
    })
    this.loadResources(this.resolveUrl('../data/locales.json'))
    const webgl = detectWebGL()
    if (webgl !== 1) {
      alert('GPU Acceleration (WebGL) is not supportted or disabled.')
    }
  },

  ready () {
    // Custom elements polyfill safe way to indicate an element has been upgraded.
    this.removeAttribute('unresolved')
    // If the path is blank, redirect to login
    if (this.route.path === undefined) {
      this.page = 'dashboard'
    }
  },

  _authenChanged (authen) {
    if (!authen) {
      this.$.layout.resetLayout()
      this.page = 'login;'
    }
  },

  _signedInChanged (signedIn) {
    this.$.drawer.hidden = !signedIn
    this.$.header.hidden = !signedIn
    if (!signedIn) {
      this.$.layout.resetLayout()
      this.page = 'login'
    } else {
      this.$.layout.resetLayout()
      this.page = 'dashboard'
    }
  },

  getOnlineStatus (status) {
    if (status) {
      this.$$('.online').style.color = 'green'
      return 'Online'
    } else {
      this.$$('.online').style.color = 'red'
      return 'Offline'
    }
  },

  getVerifyStatus (status) {
    if (status) {
      this.$$('.verify').style.color = 'green'
      return 'Verified'
    } else {
      this.$$('.verify').style.color = 'red'
      return 'Not Verify'
    }
  },

  getUserImage (url) {
    if (url) {
      return url
    } else {
      return '../images/profile/default.svg'
    }
  },

  _internetChanged (online) {
    if (!online) {
      this.alertText = 'notification-offline'
      this.$.toastAlert.open()
    } else {
      this.$.auth.refreshNetworkStatus()
      // this.$.messaging.refreshNetworkStatus();
      this.$.appLanguage.refreshNetworkStatus()
      this.$.factoryInformation.refreshNetworkStatus()
    }
  },

  _layoutChanged (wide) {
    if (wide && this.$.drawer.opened) this.$.drawer.opened = false
    this.$.layout.resetLayout()
  },

  _drawerSelected () {
    if (!this.$.drawer.persistent) this.$.drawer.close()
  },

  _routePageChanged (page) {
    this.page = page || 'dashboard'
  },

  _pageChanged (page) {
    let resolvedPageUrl = this.resolveUrl('page/view-' + page + '.html')
    this.importHref(resolvedPageUrl, null, this._showPage404.bind(this), true)
  },

  _toggleDrawer () {
    this.drawerOpened = !this.drawerOpened
  },

  _showPage404 () {
    this.page = '404'
  },

  // Signout Action
  _logout () {
    this.$.auth
      .signOut()
      .then(() => {
        this.authen = false
        // redirect to login page
        this.async(function () {
          this.set('route.path', 'login')
        }, 1000)
        console.info('Logout successful')
      })
      .catch((error) => {
        console.info('%cAuthenticate Failed: ' + error.code, 'color: crimson;')
        alert('Authenticate Failed: ' + error.message + ' Please try again.')
      })
  }
})
