/**
@license
Copyright 2017 Mulesoft.

All rights reserved.
*/
import {PolymerElement} from '@polymer/polymer/polymer-element.js';
import {IronValidatorMixin} from '@polymer/iron-validator-behavior/iron-validator-behavior.js';
class CatsOnly extends IronValidatorMixin(PolymerElement) {
  static get is() {
    return 'cats-only';
  }
  validateObject(obj) {
    let valid = true;
    for (let key in obj) {
      if (obj[key] !== 'cats') {
        valid = false;
        break;
      }
    }
    return valid;
  }

  validate(values) {
    if (typeof values === 'object') {
      return this.validateObject(values);
    } else {
      const value = Array.isArray(values) ? values.join('') : values;
      return value.match(/^(c|ca|cat|cats)?$/) !== null;
    }
  }
}
window.customElements.define(CatsOnly.is, CatsOnly);
