/**
 * Fetch wrapper for wizard dev server endpoints.
 */
export async function fetchCatalog() {
  const res = await fetch('/__decantr/blueprints');
  if (!res.ok) throw new Error('Failed to load blueprint catalog');
  return res.json();
}

export async function fetchBlueprint(category, id) {
  const res = await fetch(`/__decantr/blueprints/${category}/${id}`);
  if (!res.ok) throw new Error(`Failed to load blueprint ${category}/${id}`);
  return res.json();
}

export async function scaffold(options) {
  const res = await fetch('/__decantr/scaffold', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(options)
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Scaffold failed: ${text}`);
  }
  return res.json();
}
