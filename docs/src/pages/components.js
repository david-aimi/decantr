import { h } from 'decantr/core';
import { createSignal } from 'decantr/state';
import { Button, Input, Card, Badge, Modal } from 'decantr/components';
import { CodeBlock } from '../components/code-block.js';
import { ExampleCard } from '../components/example-card.js';
import { ApiTable } from '../components/api-table.js';

export function ComponentsPage() {
  // Modal state
  const [modalVisible, setModalVisible] = createSignal(false);

  return h('div', null,
    h('h1', { style: { fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem' } }, 'Components'),
    h('p', { style: { color: 'var(--c4)', marginBottom: '2rem', lineHeight: '1.6' } },
      'Built-in UI components: Button, Input, Card, Badge, Modal, and icon. All respect the active theme and style.'
    ),
    h('p', { style: { marginBottom: '1.5rem' } },
      h('code', { style: { fontSize: '0.875rem', background: 'var(--c2)', padding: '0.125rem 0.375rem', borderRadius: '4px' } },
        "import { Button, Input, Card, Badge, Modal, icon } from 'decantr/components'"
      )
    ),

    // Button
    h('h2', { style: { fontSize: '1.5rem', fontWeight: '600', marginBottom: '0.75rem' } }, 'Button'),
    ExampleCard({
      title: 'Button variants',
      code: `Button({ variant: 'primary' }, 'Primary')
Button({ variant: 'secondary' }, 'Secondary')
Button({ variant: 'destructive' }, 'Delete')
Button({ variant: 'ghost' }, 'Ghost')
Button({ variant: 'link' }, 'Link')`
    },
      h('div', { style: { display: 'flex', gap: '0.5rem', flexWrap: 'wrap' } },
        Button({ variant: 'primary' }, 'Primary'),
        Button({ variant: 'secondary' }, 'Secondary'),
        Button({ variant: 'destructive' }, 'Delete'),
        Button({ variant: 'ghost' }, 'Ghost'),
        Button({ variant: 'link' }, 'Link')
      )
    ),

    ExampleCard({
      title: 'Button sizes & states',
      code: `Button({ size: 'sm' }, 'Small')
Button({}, 'Default')
Button({ size: 'lg' }, 'Large')
Button({ disabled: true }, 'Disabled')
Button({ loading: true }, 'Loading')`
    },
      h('div', { style: { display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' } },
        Button({ size: 'sm' }, 'Small'),
        Button({}, 'Default'),
        Button({ size: 'lg' }, 'Large'),
        Button({ disabled: true }, 'Disabled'),
        Button({ loading: true }, 'Loading')
      )
    ),

    ApiTable({ rows: [
      { name: 'variant', signature: "'primary' | 'secondary' | 'destructive' | 'ghost' | 'link'", description: 'Visual variant. Default: secondary.' },
      { name: 'size', signature: "'sm' | 'lg'", description: 'Button size. Default: medium.' },
      { name: 'disabled', signature: 'boolean', description: 'Disable the button.' },
      { name: 'loading', signature: 'boolean', description: 'Show loading spinner.' },
      { name: 'block', signature: 'boolean', description: 'Full-width button.' },
      { name: 'onclick', signature: 'Function', description: 'Click handler.' }
    ]}),

    // Input
    h('h2', { style: { fontSize: '1.5rem', fontWeight: '600', marginTop: '1.5rem', marginBottom: '0.75rem' } }, 'Input'),
    ExampleCard({
      title: 'Input states',
      code: `Input({ placeholder: 'Default input' })
Input({ value: 'With value' })
Input({ placeholder: 'Disabled', disabled: true })
Input({ placeholder: 'Error state', error: true })`
    },
      Input({ placeholder: 'Default input' }),
      Input({ value: 'With value' }),
      Input({ placeholder: 'Disabled', disabled: true }),
      Input({ placeholder: 'Error state', error: true })
    ),

    ApiTable({ rows: [
      { name: 'type', signature: 'string', description: "Input type (text, email, password, etc). Default: 'text'." },
      { name: 'placeholder', signature: 'string', description: 'Placeholder text.' },
      { name: 'value', signature: 'string | () => string', description: 'Input value. Can be a signal getter.' },
      { name: 'disabled', signature: 'boolean', description: 'Disable the input.' },
      { name: 'error', signature: 'boolean', description: 'Show error styling.' },
      { name: 'prefix', signature: 'Node', description: 'Content before the input.' },
      { name: 'suffix', signature: 'Node', description: 'Content after the input.' },
      { name: 'oninput', signature: 'Function', description: 'Input event handler.' }
    ]}),

    // Card
    h('h2', { style: { fontSize: '1.5rem', fontWeight: '600', marginTop: '1.5rem', marginBottom: '0.75rem' } }, 'Card'),
    ExampleCard({
      title: 'Card with composable sections',
      code: `Card({},
  Card.Header({}, 'Card Title'),
  Card.Body({},
    h('p', null, 'Card body content.')
  ),
  Card.Footer({},
    Button({ size: 'sm' }, 'Action')
  )
)`
    },
      Card({},
        Card.Header({}, h('span', { style: { fontWeight: '600' } }, 'Card Title')),
        Card.Body({},
          h('p', { style: { color: 'var(--c4)', fontSize: '0.875rem' } }, 'Card body content goes here.')
        ),
        Card.Footer({},
          Button({ size: 'sm' }, 'Action')
        )
      )
    ),

    CodeBlock({ code: `// Simple card with title prop
Card({ title: 'Settings', hoverable: true },
  h('p', null, 'Content...')
)` }),

    ApiTable({ rows: [
      { name: 'title', signature: 'string', description: 'Card title (renders a header automatically).' },
      { name: 'hoverable', signature: 'boolean', description: 'Add hover effect.' },
      { name: 'Card.Header', signature: 'Card.Header(attrs, ...children)', description: 'Card header section.' },
      { name: 'Card.Body', signature: 'Card.Body(attrs, ...children)', description: 'Card body section.' },
      { name: 'Card.Footer', signature: 'Card.Footer(attrs, ...children)', description: 'Card footer section.' }
    ]}),

    // Badge
    h('h2', { style: { fontSize: '1.5rem', fontWeight: '600', marginTop: '1.5rem', marginBottom: '0.75rem' } }, 'Badge'),
    ExampleCard({
      title: 'Badge variants',
      code: `Badge({ status: 'success' }, 'Active')
Badge({ status: 'error' }, 'Error')
Badge({ status: 'warning' }, 'Warning')
Badge({ status: 'processing' }, 'Loading')
Badge({ count: 5 }, Button({}, 'Inbox'))
Badge({ dot: true, status: 'success' }, 'Online')`
    },
      h('div', { style: { display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' } },
        Badge({ status: 'success' }, h('span', null, 'Active')),
        Badge({ status: 'error' }, h('span', null, 'Error')),
        Badge({ status: 'warning' }, h('span', null, 'Warning')),
        Badge({ status: 'processing' }, h('span', null, 'Loading')),
        Badge({ count: 5 }, Button({}, 'Inbox')),
        Badge({ dot: true, status: 'success' }, h('span', null, 'Online'))
      )
    ),

    ApiTable({ rows: [
      { name: 'count', signature: 'number | string', description: 'Display count as a superscript badge on children.' },
      { name: 'dot', signature: 'boolean', description: 'Show a dot indicator instead of text.' },
      { name: 'status', signature: "'success' | 'error' | 'warning' | 'processing'", description: 'Status color.' }
    ]}),

    // Modal
    h('h2', { style: { fontSize: '1.5rem', fontWeight: '600', marginTop: '1.5rem', marginBottom: '0.75rem' } }, 'Modal'),
    h('p', { style: { marginBottom: '0.75rem', lineHeight: '1.6' } },
      'Portals to document.body. Supports Escape key and click-outside to close. Focus is trapped within the modal while open.'
    ),
    CodeBlock({ code: `const [visible, setVisible] = createSignal(false);

Button({ onclick: () => setVisible(true) }, 'Open Modal')

Modal({
  title: 'Confirm action',
  visible,
  onClose: () => setVisible(false)
},
  h('p', null, 'Are you sure you want to proceed?'),
  h('div', { style: { display: 'flex', gap: '0.5rem', marginTop: '1rem' } },
    Button({ variant: 'primary' }, 'Confirm'),
    Button({ variant: 'ghost', onclick: () => setVisible(false) }, 'Cancel')
  )
)` }),

    h('div', { style: { marginBottom: '1.5rem' } },
      Button({ variant: 'primary', onclick: () => setModalVisible(true) }, 'Open Modal'),
      Modal({
        title: 'Example Modal',
        visible: modalVisible,
        onClose: () => setModalVisible(false)
      },
        h('p', { style: { marginBottom: '1rem' } }, 'This is a live modal demo. Press Escape or click outside to close.'),
        h('div', { style: { display: 'flex', gap: '0.5rem' } },
          Button({ variant: 'primary', onclick: () => setModalVisible(false) }, 'Got it'),
          Button({ variant: 'ghost', onclick: () => setModalVisible(false) }, 'Cancel')
        )
      )
    ),

    ApiTable({ rows: [
      { name: 'title', signature: 'string', description: 'Modal title.' },
      { name: 'visible', signature: '() => boolean', description: 'Signal getter controlling visibility.' },
      { name: 'onClose', signature: 'Function', description: 'Called when modal is dismissed.' },
      { name: 'width', signature: 'string', description: "Modal width. Default: '480px'." }
    ]})
  );
}
