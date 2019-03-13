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
import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';
import {IronMeta} from '@polymer/iron-meta/iron-meta.js';
/**
 * Singleton IronMeta instance.
 */
export let IronValidatableBehaviorMeta = null;
export let IronValidatableMixinMeta = null;

/**
 * ** Anypoint version of the iron-validatable-behavior **
 *
 * This element is to be private and used as a replacemenet to any PolymerElements
 *
 *
 * `Use IronValidatableBehavior` to implement an element that validates
 * user input.
 * Use the related `IronValidatorBehavior` to add custom validation logic
 * to an iron-input.
 *
 * By default, an `<iron-form>` element validates its fields when the user presses the submit
 * button.
 * To validate a form imperatively, call the form's `validate()` method, which in turn will
 * call `validate()` on all its children. By using `IronValidatableBehavior`, your
 * custom element will get a public `validate()`, which
 * will return the validity of the element, and a corresponding `invalid` attribute,
 * which can be used for styling.
 *
 * To implement the custom validation logic of your element, you must override
 * the protected `_getValidity()` method of this behaviour, rather than `validate()`.
 * See [this](https://github.com/PolymerElements/iron-form/blob/master/demo/simple-element.html)
 * for an example.
 *
 * ### Accessibility
 *
 * Changing the `invalid` property, either manually or by calling `validate()` will update the
 * `aria-invalid` attribute.
 *
 * @demo demo/index.html
 * @polymerBehavior
 */
export const IronValidatableBehavior = {
  properties: {
    /**
     * Name of the validator or validators to use.
     * If the element should be validated by more than one validator then separate names with
     * space. See docs for `PolymerValidatorBehavior` for description of how to define a
     * validator.
     */
    validator: {
      type: String
    },
    /**
     * After calling `validate()` this is be populated by latest result of the
     * test for each validator. Result item contains following properties:
     *
     * - validator {String} Name of the validator
     * - valid {Boolean} Result of the test
     * - message {String} Error message
     *
     * This property is `undefined` if `validator` is not set.
     */
    validationStates: {
      type: Array,
      readOnly: true,
      notify: true
    },
    /**
     * True if the last call to `validate` is invalid.
     */
    invalid: {
      notify: true,
      reflectToAttribute: true,
      type: Boolean,
      value: false
    },
    /**
     * This property is deprecated and should not be used. Use the global
     * validator meta singleton, `IronValidatableBehaviorMeta` instead.
     */
    _validatorMeta: {
      type: Object
    },
    /**
     * Namespace for this validator. This property is deprecated and should
     * not be used. For all intents and purposes, please consider it a
     * read-only, config-time property.
     */
    validatorType: {
      type: String,
      value: 'validator'
    },
    /**
     * Overrides `IronValidatableBehavior#_validator`
     * List of validators to use.
     */
    _validator: {
      type: Array,
      readOnly: false,
      computed: '__computeValidator(validator)'
    }
  },

  observers: [
    '_invalidChanged(invalid)'
  ],

  registered: function() {
    IronValidatableBehaviorMeta = new IronMeta({type: 'validator'});
  },

  _invalidChanged: function() {
    if (this.invalid) {
      this.setAttribute('aria-invalid', 'true');
    } else {
      this.removeAttribute('aria-invalid');
    }
  },
  /**
   * Overrides `IronValidatableBehavior#hasValidator`
   * @return {boolean} True if the validator `validator` exists.
   */
  hasValidator: function() {
    if (this.validator && (!this._validator || !this._validator.length)) {
      const v = this.validator;
      this.validator = undefined;
      this.validator = v;
    }
    return !!(this._validator && this._validator.length);
  },
  /**
   * Returns true if the `value` is valid, and updates `invalid`. If you want
   * your element to have custom validation logic, do not override this method;
   * override `_getValidity(value)` instead.
   * @param {Object} value The value to be validated. By default, it is passed
   * to the validator's `validate()` function, if a validator is set.
   * @return {boolean} True if `value` is valid.
   */
  validate: function(value) {
    this.invalid = !this._getValidity(value);
    return !this.invalid;
  },
  /**
   * Overrides `IronValidatableBehavior#hasValidator`
   *
   * Returns true if `value` is valid.  By default, it is passed
   * to the validator's `validate()` function, if a validator is set. You
   * should override this method if you want to implement custom validity
   * logic for your element.
   *
   * @param {Object} value The value to be validated.
   * @return {boolean} True if `value` is valid.
   */
  _getValidity: function(value) {
    if (this.hasValidator()) {
      var result = true;
      var states = [];
      this._validator.forEach(function(validator) {
        var validatorResult = {
          validator: validator.validatorName,
          message: validator.message
        };
        if (!validator.validate(value)) {
          result = false;
          validatorResult.valid = false;
        } else {
          validatorResult.valid = true;
        }
        states.push(validatorResult);
      });
      this._setValidationStates(states);
      return result;
    }
    return true;
  },
  // Overrides `IronValidatableBehavior#__computeValidator`
  __computeValidator: function() {
    if (!IronValidatableBehaviorMeta) {
      return;
    }
    var validator = this.validator;
    if (!validator) {
      return;
    }
    var validatorsNames = validator.split(' ');
    if (validatorsNames.length === 0) {
      return;
    }
    var result = [];
    validatorsNames.forEach(function(name) {
      var validator = IronValidatableBehaviorMeta.byKey(name);
      if (validator) {
        result.push(validator);
      }
    });
    return result;
  },
};

/**
 * ** Anypoint version of the iron-validatable-behavior **
 *
 * Polymer 2.0 Mixin class.
 *
 * This element is to be private and used as a replacemenet to any PolymerElements
 *
 *
 * `Use IronValidatableBehavior` to implement an element that validates
 * user input.
 * Use the related `IronValidatorBehavior` to add custom validation logic
 * to an iron-input.
 *
 * By default, an `<iron-form>` element validates its fields when the user presses the submit
 * button.
 * To validate a form imperatively, call the form's `validate()` method, which in turn will
 * call `validate()` on all its children. By using `IronValidatableBehavior`, your
 * custom element will get a public `validate()`, which
 * will return the validity of the element, and a corresponding `invalid` attribute,
 * which can be used for styling.
 *
 * To implement the custom validation logic of your element, you must override
 * the protected `_getValidity()` method of this behaviour, rather than `validate()`.
 * See [this](https://github.com/PolymerElements/iron-form/blob/master/demo/simple-element.html)
 * for an example.
 *
 * ### Accessibility
 *
 * Changing the `invalid` property, either manually or by calling `validate()` will update the
 * `aria-invalid` attribute.
 *
 * @polymer
 * @mixinFunction
 */
export const IronValidatableMixin = dedupingMixin((base) => {
  /**
   * @polymer
   * @mixinClass
   */
  class IVBmixin extends base {
    static get properties() {
      return {
        /**
         * Name of the validator or validators to use.
         * If the element should be validated by more than one validator then separate names with
         * space. See docs for `PolymerValidatorBehavior` for description of how to define a
         * validator.
         */
        validator: {
          type: String
        },

        /**
         * After calling `validate()` this is be populated by latest result of the
         * test for each validator. Result item contains following properties:
         *
         * - validator {String} Name of the validator
         * - valid {Boolean} Result of the test
         * - message {String} Error message
         *
         * This property is `undefined` if `validator` is not set.
         */
        validationStates: {
          type: Array,
          readOnly: true,
          notify: true
        },
        /**
         * True if the last call to `validate` is invalid.
         */
        invalid: {
          notify: true,
          reflectToAttribute: true,
          type: Boolean,
          value: false,
          observer: '_invalidChanged'
        },

        /**
         * This property is deprecated and should not be used. Use the global
         * validator meta singleton, `IronValidatableMixinMeta` instead.
         */
        _validatorMeta: {
          type: Object
        },

        /**
         * Namespace for this validator. This property is deprecated and should
         * not be used. For all intents and purposes, please consider it a
         * read-only, config-time property.
         */
        validatorType: {
          type: String,
          value: 'validator'
        },

        /**
         * Overrides `IronValidatableBehavior#_validator`
         * List of validators to use.
         */
        _validator: {
          type: Array,
          computed: '__computeValidator(validator)'
        }
      };
    }
    /**
     * @constructor
     */
    constructor() {
      super();
      IronValidatableMixinMeta = new IronMeta({type: 'validator'});
    }

    _invalidChanged() {
      if (this.invalid) {
        this.setAttribute('aria-invalid', 'true');
      } else {
        this.removeAttribute('aria-invalid');
      }
    }

    /**
     * Overrides `IronValidatableBehavior#hasValidator`
     * @return {boolean} True if the validator `validator` exists.
     */
    hasValidator() {
      if (this.validator && (!this._validator || !this._validator.length)) {
        const v = this.validator;
        this.validator = undefined;
        this.validator = v;
      }
      return !!(this._validator && this._validator.length);
    }

    /**
     * Returns true if the `value` is valid, and updates `invalid`. If you want
     * your element to have custom validation logic, do not override this method;
     * override `_getValidity(value)` instead.

     * @param {Object} value The value to be validated. By default, it is passed
     * to the validator's `validate()` function, if a validator is set.
     * @return {boolean} True if `value` is valid.
     */
    validate(value) {
      this.invalid = !this._getValidity(value);
      return !this.invalid;
    }

    /**
     * Overrides `IronValidatableBehavior#hasValidator`
     *
     * Returns true if `value` is valid.  By default, it is passed
     * to the validator's `validate()` function, if a validator is set. You
     * should override this method if you want to implement custom validity
     * logic for your element.
     *
     * @param {Object} value The value to be validated.
     * @return {boolean} True if `value` is valid.
     */
    _getValidity(value) {
      if (this.hasValidator()) {
        let result = true;
        const states = [];
        this._validator.forEach((validator) => {
          const validatorResult = {
            validator: validator.validatorName,
            message: validator.message
          };
          if (!validator.validate(value)) {
            result = false;
            validatorResult.valid = false;
          } else {
            validatorResult.valid = true;
          }
          states.push(validatorResult);
        });
        this._setValidationStates(states);
        return result;
      }
      return true;
    }

    // Overrides `IronValidatableBehavior#__computeValidator`
    __computeValidator() {
      if (!IronValidatableMixinMeta) {
        return;
      }
      const validator = this.validator;
      if (!validator) {
        return;
      }
      const validatorsNames = validator.split(' ');
      if (validatorsNames.length === 0) {
        return;
      }
      const result = [];
      validatorsNames.forEach((name) => {
        const validator = IronValidatableMixinMeta.byKey(name);
        if (validator) {
          result.push(validator);
        }
      });
      return result;
    }
  }
return IVBmixin;
});
