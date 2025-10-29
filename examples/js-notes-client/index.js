const fetch = require('node-fetch');
const Ajv = require('ajv');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Load sample SOAP note and schema
const sample = JSON.parse(fs.readFileSync(path.join(__dirname, '../../schemas/examples/soap.sample.json')));
const schema = JSON.parse(fs.readFileSync(path.join(__dirname, '../../schemas/soap.schema.json')));

const ajv = new Ajv();
const validate = ajv.compile(schema);

if (!validate(sample)) {
  console.error('Sample does not validate against schema:', validate.errors);
  process.exit(1);
}

console.log('Sample is valid. Posting to mock endpoint...');

fetch(process.env.MOCK_SOAP_URL || 'https://api.mock.therapals.app/notes/soap', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(sample)
})
  .then(res => res.json())
  .then(data => console.log('Response:', data))
  .catch(err => console.error('Error posting to mock endpoint:', err));
