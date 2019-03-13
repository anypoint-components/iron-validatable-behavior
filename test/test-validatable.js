/**
@license
Copyright 2017 Mulesoft.

All rights reserved.
*/
import {PolymerElement} from '@polymer/polymer/polymer-element.js';
import {IronValidatableMixin} from '../iron-validatable-behavior.js';
import {html} from '@polymer/polymer/lib/utils/html-tag.js';
class TestValidatable extends IronValidatableMixin(PolymerElement) {
  static get is() {
    return 'test-validatable';
  }
  static properties() {
    return {
      invalid: {
        notify: true,
        type: Boolean,
        value: false
      }
    };
  }

  static get template() {
    return html`<slot></slot>`;
  }

  ready() {
    super.ready();
    this.addEventListener('input', this._onInput.bind(this));
  }

  _onInput(e) {
    this.invalid = !this.validate(e.target.value);
  }
}
window.customElements.define(TestValidatable.is, TestValidatable);
