import { h, css, injectBase, cx } from '../_shared.js';
import { createSignal } from '../../state/index.js';
import { Input, Button } from '../../components/index.js';

/**
 * Forgot password form with email input and submit.
 * @param {Object} [props]
 * @param {Function} [props.onSubmit] - Called with { email }
 * @param {string|Node} [props.logo] - Image URL string or DOM node
 * @param {string} [props.title] - Heading text (default "Reset Password")
 * @param {string} [props.class]
 * @returns {HTMLElement}
 */
export function ForgotPasswordForm(props = {}) {
  injectBase();

  const {
    onSubmit,
    logo,
    title = 'Reset Password',
    class: cls
  } = props;

  const [email, setEmail] = createSignal('');

  const emailId = 'auth-forgot-email';

  function handleSubmit(e) {
    e.preventDefault();
    if (onSubmit) {
      onSubmit({ email: email() });
    }
  }

  // Logo element
  const logoEl = logo
    ? h('div', { class: css('_flex _center _mb4') },
        typeof logo === 'string'
          ? h('img', { src: logo, alt: '', style: 'max-height:48px' })
          : logo
      )
    : null;

  // Title
  const titleEl = h('h2', { class: css('_tc _mb2 _fg3 _t24 _bold') }, title);

  // Description
  const descEl = h('p', { class: css('_tc _mb6 _fg4 _t14') },
    "Enter your email and we'll send a reset link."
  );

  // Email field
  const emailLabel = h('label', {
    for: emailId,
    class: css('_block _mb1 _fg3 _t14 _medium')
  }, 'Email');

  const emailInput = Input({
    type: 'email',
    placeholder: 'you@example.com',
    oninput: (e) => setEmail(e.target.value)
  });

  const emailInputEl = emailInput.querySelector('input') || emailInput;
  emailInputEl.id = emailId;
  emailInputEl.setAttribute('name', 'email');
  emailInputEl.setAttribute('autocomplete', 'email');

  const emailGroup = h('div', { class: css('_mb6') }, emailLabel, emailInput);

  // Submit button
  const submitBtn = Button({ variant: 'primary', block: true }, 'Send Reset Link');

  // Form
  const form = h('form', {
    class: cx(css('_flex _col'), cls),
    onsubmit: handleSubmit,
    novalidate: ''
  },
    ...(logoEl ? [logoEl] : []),
    titleEl,
    descEl,
    emailGroup,
    submitBtn
  );

  return form;
}
