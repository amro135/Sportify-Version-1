"use client";

import { useState } from "react";
import { useCart } from "@/lib/cartContext";
import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import { CheckCircle, CreditCard, MapPin, Truck } from "lucide-react";

export default function CheckoutPage() {
    const { cartItems, cartTotal } = useCart();
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('card');
    const [selectedCoin, setSelectedCoin] = useState<'BTC' | 'ETH' | 'USDT'>('BTC');

    const cryptoAddresses: Record<'BTC' | 'ETH' | 'USDT', string> = {
        BTC: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
        ETH: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
        USDT: 'TYASr5UV6HEcXatwdFQfmLVUqQQQMUxHLS'
    };

    const shipping = cartTotal > 50 ? 0 : 10;
    const total = cartTotal + shipping;

    const handlePlaceOrder = async () => {
        setLoading(true);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 3000));
        setLoading(false);
        router.push("/checkout/success");
    };

    if (cartItems.length === 0) {
        return (
            <div className="container mx-auto px-4 py-20 text-center">
                <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
                <Button onClick={() => router.push("/products")}>Continue Shopping</Button>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Checkout</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Steps */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Step 1: Shipping */}
                    <div className={`p-6 rounded-2xl border transition-all ${step === 1 ? 'border-primary ring-1 ring-primary bg-white dark:bg-gray-900' : 'border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50'}`}>
                        <div className="flex items-center gap-4 mb-4">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${step === 1 ? 'bg-primary text-white' : 'bg-gray-200 dark:bg-gray-700'}`}>1</div>
                            <h2 className="text-xl font-bold">Shipping Address</h2>
                        </div>

                        {step === 1 && (
                            <div className="space-y-4 pl-12">
                                <div className="grid grid-cols-2 gap-4">
                                    <input type="text" placeholder="First Name" className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent" />
                                    <input type="text" placeholder="Last Name" className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent" />
                                </div>
                                <input type="text" placeholder="Address" className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent" />
                                <div className="grid grid-cols-2 gap-4">
                                    <input type="text" placeholder="City" className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent" />
                                    <input type="text" placeholder="Postal Code" className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent" />
                                </div>
                                <Button onClick={() => setStep(2)} className="mt-4">Continue to Payment</Button>
                            </div>
                        )}
                    </div>

                    {/* Step 2: Payment */}
                    <div className={`p-6 rounded-2xl border transition-all ${step === 2 ? 'border-primary ring-1 ring-primary bg-white dark:bg-gray-900' : 'border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50'}`}>
                        <div className="flex items-center gap-4 mb-4">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${step === 2 ? 'bg-primary text-white' : 'bg-gray-200 dark:bg-gray-700'}`}>2</div>
                            <h2 className="text-xl font-bold">Payment Method</h2>
                        </div>

                        {step === 2 && (
                            <div className="space-y-4 pl-12">
                                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                                    <div
                                        onClick={() => setPaymentMethod('card')}
                                        className={`flex-1 p-4 border rounded-xl cursor-pointer flex items-center gap-3 transition-all hover:shadow-md ${paymentMethod === 'card' ? 'border-primary bg-primary/5' : 'border-gray-200 dark:border-gray-700'}`}
                                    >
                                        <CreditCard className={paymentMethod === 'card' ? 'text-primary' : 'text-gray-500'} />
                                        <span className="font-bold">Credit Card</span>
                                    </div>
                                    <div
                                        onClick={() => setPaymentMethod('paypal')}
                                        className={`flex-1 p-4 border rounded-xl cursor-pointer flex items-center gap-3 transition-all hover:shadow-md ${paymentMethod === 'paypal' ? 'border-primary bg-primary/5' : 'border-gray-200 dark:border-gray-700'}`}
                                    >
                                        <span className="font-bold">PayPal</span>
                                    </div>
                                    <div
                                        onClick={() => setPaymentMethod('crypto')}
                                        className={`flex-1 p-4 border rounded-xl cursor-pointer flex items-center gap-3 transition-all hover:shadow-md ${paymentMethod === 'crypto' ? 'border-primary bg-primary/5' : 'border-gray-200 dark:border-gray-700'}`}
                                    >
                                        <span className="font-bold">Crypto</span>
                                        <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">New</span>
                                    </div>
                                </div>

                                {paymentMethod === 'card' && (
                                    <div className="space-y-4">
                                        <input type="text" placeholder="Card Number" className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent" />
                                        <div className="grid grid-cols-2 gap-4">
                                            <input type="text" placeholder="MM/YY" className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent" />
                                            <input type="text" placeholder="CVC" className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent" />
                                        </div>
                                    </div>
                                )}

                                {paymentMethod === 'paypal' && (
                                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl text-center">
                                        <p className="text-blue-600 dark:text-blue-400 font-medium mb-2">Pay with PayPal</p>
                                        <Button variant="outline" className="w-full border-blue-200 text-blue-600 hover:bg-blue-100">
                                            Connect PayPal Account
                                        </Button>
                                    </div>
                                )}

                                {paymentMethod === 'crypto' && (
                                    <div className="space-y-4">
                                        <div className="grid grid-cols-3 gap-2">
                                            {['BTC', 'ETH', 'USDT'].map(coin => (
                                                <div
                                                    key={coin}
                                                    onClick={() => setSelectedCoin(coin as 'BTC' | 'ETH' | 'USDT')}
                                                    className={`p-2 border rounded-lg text-center cursor-pointer transition-colors ${selectedCoin === coin
                                                        ? 'border-primary bg-primary/10 text-primary font-bold'
                                                        : 'border-gray-200 dark:border-gray-700 hover:border-primary hover:bg-primary/5'
                                                        }`}
                                                >
                                                    <span className="font-bold">{coin}</span>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl text-center border border-gray-200 dark:border-gray-700">
                                            <p className="text-xs text-gray-500 mb-2">Send {total.toFixed(2)} USD equivalent to:</p>
                                            <div className="bg-white dark:bg-gray-900 p-2 rounded border border-gray-200 dark:border-gray-700 mb-2 font-mono text-xs break-all">
                                                {cryptoAddresses[selectedCoin]}
                                            </div>
                                            <div className="w-32 h-32 bg-white mx-auto p-2 rounded-lg mb-2">
                                                <img src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${cryptoAddresses[selectedCoin]}`} alt="QR Code" className="w-full h-full" />
                                            </div>
                                            <p className="text-xs text-green-600 font-medium animate-pulse">Waiting for transaction...</p>
                                        </div>
                                    </div>
                                )}

                                <div className="flex gap-4 mt-4">
                                    <Button variant="ghost" onClick={() => setStep(1)}>Back</Button>
                                    <Button onClick={handlePlaceOrder} isLoading={loading} className="flex-1">
                                        {paymentMethod === 'crypto' ? 'I Sent the Payment' : `Place Order - $${total.toFixed(2)}`}
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Order Summary */}
                <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 h-fit">
                    <h2 className="text-xl font-bold mb-6">Order Summary</h2>
                    <div className="space-y-4 mb-6">
                        {cartItems.map((item) => (
                            <div key={item.id} className="flex justify-between text-sm">
                                <span>{item.name} x {item.qty}</span>
                                <span className="font-medium">${(item.price * item.qty).toFixed(2)}</span>
                            </div>
                        ))}
                    </div>
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-4 space-y-2">
                        <div className="flex justify-between">
                            <span className="text-gray-600">Subtotal</span>
                            <span>${cartTotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Shipping</span>
                            <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                        </div>
                        <div className="flex justify-between font-bold text-lg pt-2">
                            <span>Total</span>
                            <span className="text-primary">${total.toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
