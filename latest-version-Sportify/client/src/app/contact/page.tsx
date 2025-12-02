import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function ContactPage() {
    return (
        <main className="min-h-screen flex flex-col">
            <Header />
            <div className="flex-1 bg-surface-light dark:bg-surface-dark py-20">
                <div className="container mx-auto px-4">
                    <div className="max-w-6xl mx-auto">
                        <h1 className="text-4xl font-bold mb-4 text-text-main text-center">Get in Touch</h1>
                        <p className="text-xl text-text-alt text-center mb-12">
                            Have questions? We'd love to hear from you.
                        </p>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                            {/* Contact Form */}
                            <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg">
                                <h2 className="text-2xl font-bold mb-6 text-text-main">Send us a Message</h2>
                                <form className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium mb-2 text-text-main">Name</label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent focus:outline-none focus:ring-2 focus:ring-primary"
                                            placeholder="Your name"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2 text-text-main">Email</label>
                                        <input
                                            type="email"
                                            className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent focus:outline-none focus:ring-2 focus:ring-primary"
                                            placeholder="your@email.com"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2 text-text-main">Message</label>
                                        <textarea
                                            rows={5}
                                            className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent focus:outline-none focus:ring-2 focus:ring-primary"
                                            placeholder="How can we help you?"
                                        ></textarea>
                                    </div>
                                    <Button className="w-full">Send Message</Button>
                                </form>
                            </div>

                            {/* Contact Info */}
                            <div className="space-y-8">
                                <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-lg">
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <Mail className="w-6 h-6 text-primary" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-text-main mb-1">Email</h3>
                                            <p className="text-text-alt">support@sportify.com</p>
                                            <p className="text-text-alt">sales@sportify.com</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-lg">
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <Phone className="w-6 h-6 text-primary" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-text-main mb-1">Phone</h3>
                                            <p className="text-text-alt">+1 (555) 123-4567</p>
                                            <p className="text-text-alt">Mon-Fri 9am-6pm EST</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-lg">
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <MapPin className="w-6 h-6 text-primary" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-text-main mb-1">Address</h3>
                                            <p className="text-text-alt">123 Sports Avenue</p>
                                            <p className="text-text-alt">New York, NY 10001</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-lg">
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <Clock className="w-6 h-6 text-primary" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-text-main mb-1">Business Hours</h3>
                                            <p className="text-text-alt">Monday - Friday: 9am - 6pm</p>
                                            <p className="text-text-alt">Saturday: 10am - 4pm</p>
                                            <p className="text-text-alt">Sunday: Closed</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    );
}
