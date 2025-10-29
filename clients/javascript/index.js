// Demo JS client for Therapals mock endpoints
// FAKE data only
const fetch = require('node-fetch');
const Ajv = require('ajv');
const fs = require('fs');
const path = require('path');

const sample = JSON.parse(fs.readFileSync(path.join(__dirname, '../../schemas/examples/soap.sample.json')));
const schema = JSON.parse(fs.readFileSync(path.join(__dirname, '../../schemas/soap.schema.json')));

const ajv = new Ajv();
const validate = ajv.compile(schema);

if (!validate(sample)) {
  console.error('Sample does not validate against schema:', validate.errors);
  process.exit(1);
}

console.log('Sample is valid. Posting to mock endpoint...');

fetch('https://api.mock.therapals.app/notes/soap', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(sample)
})
  .then(res => res.json())
  .then(data => console.log('Response:', data))
  .catch(err => console.error('Error posting to mock endpoint:', err));
