import { defineOperationApp } from '@directus/extensions-sdk';

export default defineOperationApp({
  id: 'odoo_purchase_sync',
  name: 'ODOO_PURCHASE_SYNC',
  icon: 'box',
  description: 'This is my custom operation!',
  overview: ({ text }) => [
    {
      label: 'Text',
      text: text
    }
  ],
  options: [
    {
      field: 'text',
      name: 'Text',
      type: 'string',
      meta: {
        width: 'full',
        interface: 'input'
      }
    }
  ]
});
