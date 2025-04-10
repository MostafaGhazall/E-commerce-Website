import { useOrderStore } from '../contexts/useOrderStore';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { Dialog } from '@headlessui/react';

export default function OrderHistory() {
  const { t } = useTranslation();
  const { orders } = useOrderStore();
  const [selectedOrder, setSelectedOrder] = useState<null | typeof orders[0]>(null);

  if (orders.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-xl font-bold mb-4">{t('noOrders')}</h2>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">{t('orderHistory')}</h1>

      <div className="space-y-6">
        {orders.map((order, index) => {
          const orderId = order.id || `#${index + 1}`;
          const orderLabelId = `order-${index}-heading`;

          return (
            <section
              key={orderId}
              aria-labelledby={orderLabelId}
              className="border rounded-lg p-4 shadow-sm"
            >
              <div className="flex justify-between items-center mb-2">
                <h2 id={orderLabelId} className="font-medium">
                  {t('orderID')}: {orderId}
                </h2>
                <div className="text-sm text-gray-500">
                  {new Date(order.date).toLocaleString()}
                </div>
              </div>

              <div className="flex justify-between items-end">
                <div className="text-right font-bold">
                  {t('total')}: ${order.total.toFixed(2)}
                </div>

                <button
                  onClick={() => setSelectedOrder(order)}
                  className="text-sm text-theme underline hover:text-theme/80 transition"
                >
                  {t('viewDetails') || 'View Details'}
                </button>
              </div>
            </section>
          );
        })}
      </div>

      {/* Order Details Modal */}
      <Dialog open={!!selectedOrder} onClose={() => setSelectedOrder(null)} className="relative z-50">
        <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white max-w-md w-full rounded-lg p-6 shadow-xl space-y-4 overflow-y-auto max-h-[80vh]">
            <Dialog.Title className="text-lg font-bold">
              {t('orderID')}: {selectedOrder?.id}
            </Dialog.Title>

            <div className="text-sm text-gray-600">
              {new Date(selectedOrder?.date || '').toLocaleString()}
            </div>

            <div>
              <h3 className="font-semibold mb-2">{t('shippingAddress')}</h3>
              <p>{selectedOrder?.shipping.name}</p>
              <p>{selectedOrder?.shipping.email}</p>
              <p>{selectedOrder?.shipping.address}</p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">{t('orderSummary')}</h3>
              <ul className="divide-y text-sm">
                {selectedOrder?.items.map((item) => (
                  <li key={item.id} className="flex justify-between py-2">
                    <div>
                      <div className="font-medium">{item.name}</div>
                      <div className="text-gray-500">
                        {t('quantity')}: {item.quantity}
                      </div>
                    </div>
                    <div className="font-medium">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="text-right font-bold text-lg">
              {t('total')}: ${selectedOrder?.total.toFixed(2)}
            </div>

            <div className="text-right pt-2">
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-sm text-gray-600 underline hover:text-theme"
              >
                {t('close') || 'Close'}
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}
