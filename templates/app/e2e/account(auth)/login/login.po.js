/**
 * This file uses the Page Object pattern to define the main page for tests
 * https://docs.google.com/presentation/d/1B6manhG0zEXkC-H-tPo2vwU06JhL8w9-XCF9oehXzAQ
 */

'use strict';

var LoginPage = function() {
  var form = this.form = element(by.css('.form'));
  form.email = form.element(by.model('vm.user.email'));
  form.password = form.element(by.model('vm.user.password'));
  form.submit = form.element(by.css('.btn-login'));<% if (filters.oauth) { %>
  form.oauthButtons = require('../../components/oauth-buttons/oauth-buttons.po').oauthButtons;<% } %>

  this.login = function(data) {
    for (var prop in data) {
      var formElem = form[prop];
      if (data.hasOwnProperty(prop) && formElem && typeof formElem.sendKeys === 'function') {
        formElem.sendKeys(data[prop]);
      }
    }

    form.submit.click();
    // Login takes some time, so wait until it's done.
    // For the test app's login, we know it's done when it
    // doesn't contain 'login'
    return browser.driver.wait(() => {
      return browser.driver.getCurrentUrl().then(url => {
        return !/login/.test(url);
      });
    }, 10000);
  };
};

module.exports = new LoginPage();

