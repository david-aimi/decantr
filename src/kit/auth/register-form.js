import { h, css, injectBase, cx } from '../_shared.js';
import { createSignal } from '../../state/index.js';
import { Input, Button, Checkbox } from '../../components/index.js';

const DEFAULT_FIELDS = [
  { name: 'name', label: 'Full Name', type: 'text' },
  { name: 'email', label: 'Email', type: 'email' },
  { name: 'password', label: 'Password', type: 'password' },
  { name: 'confirmPassword', label: 'Confirm Password', type: 'password' }
];

/**
 * Registration form with dynamic fields and optional terms agreement.
 * @param {Object} [props]
 * @param {Function} [props.onSubmit] - Called with form data object
 * @param {Array<{name:string, label:string, type:string, placeholder?:string}>} [props.fields] - Field configurations
 * @param {boolean} [props.showTerms] - Show "I agree to Terms" checkbox (default true)
 * @param {string} [props.title] - Heading text (default "Create Account")
 * @param {string} [props.class]
 * @returns {HTMLElement}
 */
export function RegisterForm(props = {}) {
  injectBase();

  const {
    onSubmit,
    fields = DEFAULT_FIELDS,
    showTerms = true,
    title = 'Create Account',
    class: cls
  } = props;

  // Create a signal for each field
  const fieldSignals = {};
  for (const field of fields) {
    fieldSignals[field.name] = createSignal('');
  }

  const [termsAgreed, setTermsAgreed] = createSignal(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (onSubmit) {
      const data = {};
      for (const field of fields) {
        data[field.name] = fieldSignals[field.name][0]();
      }
      if (showTerms) {
        data.termsAgreed = termsAgreed();
      }
      onSubmit(data);
    }
  }

  // Title
  const titleEl = h('h2', { class: css('_tc _mb6 _fg3 _t24 _bold') }, title);

  // Dynamic field groups
  const fieldGroups = fields.map((field) => {
    const fieldId = `auth-register-${field.name}`;
    const [, setVal] = fieldSignals[field.name];

    const autocompleteMap = {
      name: 'name',
      email: 'email',
      password: 'new-password',
      confirmPassword: 'new-password'
    };

    const label = h('label', {
      for: fieldId,
      class: css('_block _mb1 _fg3 _t14 _medium')
    }, field.label);

    const input = Input({
      type: field.type || 'text',
      placeholder: field.placeholder || '',
      oninput: (e) => setVal(e.target.value)
    });

    const inputEl = input.querySelector('input') || input;
    inputEl.id = fieldId;
    inputEl.setAttribute('name', field.name);
    if (autocompleteMap[field.name]) {
      inputEl.setAttribute('autocomplete', autocompleteMap[field.name]);
    }

    return h('div', { class: css('_mb4') }, label, input);
  });

  // Terms checkbox
  const termsEl = showTerms
    ? h('div', { class: css('_mb6') },
        Checkbox({
          label: 'I agree to the Terms and Conditions',
          onchange: (val) => setTermsAgreed(val)
        })
      )
    : null;

  // Submit button
  const submitBtn = Button({ variant: 'primary', block: true }, 'Create Account');

  // Form
  const form = h('form', {
    class: cx(css('_flex _col'), cls),
    onsubmit: handleSubmit,
    novalidate: ''
  },
    titleEl,
    ...fieldGroups,
    ...(termsEl ? [termsEl] : []),
    submitBtn
  );

  return form;
}
