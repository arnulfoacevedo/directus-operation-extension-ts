import { defineOperationApi } from '@directus/extensions-sdk';
import fetch from 'node-fetch';

type Options = {
    text: string;
};

export default defineOperationApi<Options>({
    id: 'odoo_purchase_sync',
    handler: async () => {
        const config = {
            url: process.env['ODOO_URL'] ?? '',
            db: process.env['ODOO_DB'] ?? '',
            user: process.env['ODOO_USERNAME'] ?? '',
            pass: process.env['ODOO_PASSWORD'] ?? ''
        };

        async function jsonRpc(params: any): Promise<any> {
            const data = {
                jsonrpc: '2.0',
                method: 'call',
                params,
                id: Math.floor(Math.random() * 1000000000)
            };
            const response = await fetch(config.url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            const reply = await response.json();
            if (reply.error) throw new Error(reply.error);
            return reply.result;
        }

        async function call(service: string, method: string, ...args: any[]): Promise<any> {
            return jsonRpc({ service, method, args: [config.db, config.user, config.pass, ...args] });
        }

        try {
            // Authenticate
            const uid = await call('common', 'login');

            // Define sale order details
            const saleOrderArgs = [
                uid,
                'sale.order', // Odoo model
                'create', // Method to call
                [{ // Sale order data
                    partner_id: 1, // Example partner ID
                    order_line: [
                        [0, 0, {
                            product_id: 1, // Example product ID
                            product_uom_qty: 5 // Quantity
                        }]
                    ]
                }]
            ];

            // Create sale order
            const saleOrderId = await call('object', 'execute_kw', saleOrderArgs);
            console.log('Sale Order ID:' + saleOrderId);
        } catch (error) {
            console.log(error);
        }
    }
});
