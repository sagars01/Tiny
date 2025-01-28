'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function LandingPage() {
    const tools = [
        { name: 'WEBP to SVG Converter', description: 'Quickly convert WEBP images to SVG format.', href: '/tools/image-converter' },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="min-h-screen bg-background text-foreground"
        >
            {/* Hero Section */}
            <header className="bg-primary text-primary-foreground py-20">
                <div className="container mx-auto text-center px-6">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-4xl font-extrabold"
                    >
                        Welcome to Tiny Tools
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="mt-4 text-lg text-muted-foreground"
                    >
                        A collection of small yet powerful tools to simplify your daily tasks. Boost your productivity, one tool at a time.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="mt-8"
                    >
                        <Link href="#tools">
                            <Button size="lg" variant="secondary">
                                Explore Tools
                            </Button>
                        </Link>
                    </motion.div>
                </div>
            </header>

            {/* Tools Section */}
            <main id="tools" className="py-16 container mx-auto px-6">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-3xl font-bold text-center mb-12"
                >
                    Explore Our Tools
                </motion.h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {tools.map((tool, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 * index }}
                        >
                            <Card className='h-full'>
                                <CardHeader>
                                    <CardTitle className="text-xl font-semibold">
                                        {tool.name}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground mb-4">{tool.description}</p>
                                    <Link href={tool.href}>
                                        <Button variant="outline">
                                            Try Now
                                        </Button>
                                    </Link>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </main>
        </motion.div>
    );
}
