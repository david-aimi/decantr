import { h, css, injectBase, cx } from '../_shared.js';
import { createSignal } from '../../state/index.js';
import { Input, Button, Checkbox } from '../../components/index.js';

/**
 * Login form with email/password, optional remember-me and forgot-password link.
 * @param {Object} [props]
 * @param {Function} [props.onSubmit] - Called with { email, password, remember }
 * @param {string|Node} [props.logo] - Image URL string or DOM node
 * @param {string} [props.title] - Heading text (default "Sign In")
 * @param {boolean} [props.showRemember] - Show "Remember me" checkbox (default true)
 * @param {boolean} [props.showForgot] - Show "Forgot password?" link (default true)
 * @param {string} [props.class]
 * @returns {HTMLElement}
 */
export function LoginForm(props = {}) {
  injectBase();

  const {
    onSubmit,
    logo,
    title = 'Sign In',
    showRemember = true,
    showForgot = true,
    class: cls
  } = props;

  const [email, setEmail] = createSignal('');
  const [password, setPassword] = createSignal('');
  const [remember, setRemember] = createSignal(false);

  const emailId = 'auth-login-email';
  const passwordId = 'auth-login-password';

  function handleSubmit(e) {
    e.preventDefault();
    if (onSubmit) {
      onSubmit({ email: email(), password: password(), remember: remember() });
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
  const titleEl = h('h2', { class: css('_tc _mb6 _fg3 _t24 _bold') }, title);

  // Email field
  const emailLabel = h('label', { for: emailId, class: css('_block _mb1 _fg3 _t14 _medium') }, 'Email');
  const emailInput = Input({
    type: 'email',
    placeholder: 'you@example.com',
    oninput: (e) => setEmail(e.target.value)
  });
  const emailInputEl = emailInput.querySelector('input') || emailInput;
  emailInputEl.id = emailId;
  emailInputEl.setAttribute('name', 'email');
  emailInputEl.setAttribute('autocomplete', 'email');
  const emailGroup = h('div', { class: css('_mb4') }, emailLabel, emailInput);

  // Password field
  const passwordLabel = h('label', { for: passwordId, class: css('_block _mb1 _fg3 _t14 _medium') }, 'Password');
  const passwordInput = Input({
    type: 'password',
    placeholder: 'Enter your password',
    oninput: (e) => setPassword(e.target.value)
  });
  const passwordInputEl = passwordInput.querySelector('input') || passwordInput;
  passwordInputEl.id = passwordId;
  passwordInputEl.setAttribute('name', 'password');
  passwordInputEl.setAttribute('autocomplete', 'current-password');
  const passwordGroup = h('div', { class: css('_mb4') }, passwordLabel, passwordInput);

  // Remember / Forgot row
  const middleRow = [];
  if (showRemember || showForgot) {
    const rowChildren = [];
    if (showRemember) {
      rowChildren.push(Checkbox({
        label: 'Remember me',
        onchange: (val) => setRemember(val)
      }));
    }
    if (showForgot) {
      rowChildren.push(
        h('a', {
          href: '#',
          class: css('_t14 _fg1'),
          onclick: (e) => e.preventDefault()
        }, 'Forgot password?')
      );
    }
    middleRow.push(
      h('div', {
        class: css('_flex _aic _jcsb _mb6')
      }, ...rowChildren)
    );
  }

  // Submit button
  const submitBtn = Button({ variant: 'primary', block: true }, 'Sign In');

  // Form
  const form = h('form', {
    class: cx(css('_flex _col'), cls),
    onsubmit: handleSubmit,
    novalidate: ''
  },
    ...(logoEl ? [logoEl] : []),
    titleEl,
    emailGroup,
    passwordGroup,
    ...middleRow,
    submitBtn
  );

  return form;
}
