/**
@license
Copyright 2017 Mulesoft.

All rights reserved.
*/
import {PolymerElement} from '@polymer/polymer/polymer-element.js';
import {IronValidatorMixin} from '@polymer/iron-validator-behavior/iron-validator-behavior.js';

class MinimumLength extends IronValidatorMixin(PolymerElement) {
  static get is() {
    return 'minimum-length';
  }
  validateObject(obj) {
    for (let key in obj) {
      if (obj[key].length < 4) {
        return false;
      }
    }
    return true;
  }

  validate(values) {
    if (typeof values === 'object') {
      return this.validateObject(values);
    } else {
      const value = Array.isArray(values) ? values.join('') : values;
      return value.length >= 4;
    }
  }
}
window.customElements.define(MinimumLength.is, MinimumLength);
