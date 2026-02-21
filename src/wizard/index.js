import { mount } from '../core/index.js';
import { WizardApp } from './app.js';

mount(document.getElementById('app'), () => WizardApp());
