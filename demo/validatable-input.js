/**
@license
Copyright 2016 The Advanced REST client authors <arc@mulesoft.com>
Licensed under the Apache License, Version 2.0 (the "License"); you may not
use this file except in compliance with the License. You may obtain a copy of
the License at
http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
License for the specific language governing permissions and limitations under
the License.
*/
import {PolymerElement} from '@polymer/polymer/polymer-element.js';
import {html} from '@polymer/polymer/lib/utils/html-tag.js';
import {IronValidatableMixin} from '../iron-validatable-behavior.js';
class ValidatableInput extends IronValidatableMixin(PolymerElement) {
  static get is() {
    return 'validatable-input';
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
window.customElements.define(ValidatableInput.is, ValidatableInput);
