import { describe, it, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { createDOM } from '../src/test/dom.js';

let cleanup;

before(() => {
  const env = createDOM();
  cleanup = env.cleanup;
});

after(() => {
  if (cleanup) cleanup();
});

describe('kit/auth', () => {
  it('exports all auth components', async () => {
    const mod = await import('../src/kit/auth/index.js');
    assert.ok(typeof mod.LoginForm === 'function', 'LoginForm exported');
    assert.ok(typeof mod.RegisterForm === 'function', 'RegisterForm exported');
    assert.ok(typeof mod.ForgotPasswordForm === 'function', 'ForgotPasswordForm exported');
    assert.ok(typeof mod.AuthLayout === 'function', 'AuthLayout exported');
  });

  it('LoginForm renders a form element', async () => {
    const { LoginForm } = await import('../src/kit/auth/login-form.js');
    const el = LoginForm({ title: 'Sign In' });
    assert.ok(el && el.nodeType === 1);
    assert.equal(el.tagName, 'FORM');
    assert.ok(el.textContent.includes('Sign In'));
  });

  it('LoginForm has email and password fields', async () => {
    const { LoginForm } = await import('../src/kit/auth/login-form.js');
    const el = LoginForm();
    const inputs = el.querySelectorAll('input');
    const types = [...inputs].map(i => i.type || i.getAttribute('type'));
    assert.ok(types.includes('email') || el.querySelector('[type="email"]'), 'has email input');
    assert.ok(types.includes('password') || el.querySelector('[type="password"]'), 'has password input');
  });

  it('RegisterForm renders with default fields', async () => {
    const { RegisterForm } = await import('../src/kit/auth/register-form.js');
    const el = RegisterForm({ title: 'Create Account' });
    assert.ok(el && el.nodeType === 1);
    assert.ok(el.textContent.includes('Create Account'));
  });

  it('ForgotPasswordForm renders', async () => {
    const { ForgotPasswordForm } = await import('../src/kit/auth/forgot-password-form.js');
    const el = ForgotPasswordForm({ title: 'Reset Password' });
    assert.ok(el && el.nodeType === 1);
    assert.ok(el.textContent.includes('Reset Password'));
  });

  it('AuthLayout renders centered card', async () => {
    const { AuthLayout } = await import('../src/kit/auth/auth-layout.js');
    const el = AuthLayout({}, document.createTextNode('content'));
    assert.ok(el && el.nodeType === 1);
  });
});
