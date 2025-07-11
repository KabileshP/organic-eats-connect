
import React from 'react';
import { Header } from '@/components/Header';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Package, Truck, Clock } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const OrderSuccess = () => {
  const location = useLocation();
  const order = location.state?.order;

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <Header />
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-8">
          <CheckCircle className="w-24 h-24 text-green-600 mx-auto mb-6" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Order Placed Successfully!
          </h1>
          <p className="text-xl text-gray-600">
            Thank you for your purchase. Your fresh organic produce is on its way!
          </p>
        </div>

        {order && (
          <Card className="mb-8">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Order Details</h3>
                  <div className="space-y-2">
                    <p><span className="font-medium">Order ID:</span> #{order.id}</p>
                    <p><span className="font-medium">Status:</span> Confirmed</p>
                    <p><span className="font-medium">Total:</span> ${order.total?.toFixed(2) || 'N/A'}</p>
                    <p><span className="font-medium">Estimated Delivery:</span> {order.estimatedDelivery ? new Date(order.estimatedDelivery).toLocaleDateString() : 'TBD'}</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">What's Next?</h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Package className="w-6 h-6 text-green-600" />
                      <span>Order being prepared</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Truck className="w-6 h-6 text-gray-400" />
                      <span className="text-gray-600">Shipped within 24 hours</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Clock className="w-6 h-6 text-gray-400" />
                      <span className="text-gray-600">Delivered to your door</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="text-center space-y-4">
          <p className="text-gray-600 mb-6">
            A confirmation email has been sent to your email address with order tracking information.
          </p>
          
          <div className="flex justify-center space-x-4">
            <Link to="/products">
              <Button className="bg-green-600 hover:bg-green-700">
                Continue Shopping
              </Button>
            </Link>
            <Link to="/">
              <Button variant="outline">
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
