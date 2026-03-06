import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import './ProductsSection.css'

interface Product {
    name: string
    shortDesc: string
    category: string
    icon: string
    gradient: string
    features: string[]
    path: string
    tag?: string
    tagColor?: string
}

const products: Product[] = [
    {
        name: 'PulsaApp',
        shortDesc: 'Complete digital payment solution — credit, data packages, game vouchers & e-money top-ups in one app.',
        category: 'FinTech',
        icon: '📱',
        gradient: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
        features: ['10+ Providers', 'Instant Delivery', 'Secure Payment'],
        path: '/products/pulsaapp',
        tag: 'Popular',
        tagColor: 'indigo',
    },
    {
        name: 'QuranMind',
        shortDesc: 'AI-powered Quran app that combines modern technology with traditional Islamic understanding.',
        category: 'Education',
        icon: '📖',
        gradient: 'linear-gradient(135deg, #10b981, #14b8a6)',
        features: ['AI Analysis', 'Murottal Audio', 'Deep Translation'],
        path: '/products/quranmind',
        tag: 'AI-Powered',
        tagColor: 'green',
    },
    {
        name: 'ApotekApp',
        shortDesc: 'Comprehensive pharmacy management system for drug stock, sales records, and financial tracking.',
        category: 'Healthcare',
        icon: '💊',
        gradient: 'linear-gradient(135deg, #ef4444, #ec4899)',
        features: ['Stock Management', 'Sales Reports', 'Financial Tracking'],
        path: '/products/apotekapp',
        tag: 'B2B',
        tagColor: 'red',
    },
    {
        name: 'Catet Uang',
        shortDesc: 'Personal finance manager for income, expense tracking, and building healthy financial habits.',
        category: 'Finance',
        icon: '💰',
        gradient: 'linear-gradient(135deg, #eab308, #ea580c)',
        features: ['Budget Tracking', 'Analytics', 'Financial Planning'],
        path: '/products/catetUang',
    },
]

const serviceHighlights = [
    {
        name: 'Custom App Development',
        desc: 'Tailored applications built on our proven architecture — web, mobile, or desktop.',
        icon: '🚀',
        gradient: 'linear-gradient(135deg, #6366f1, #06b6d4)',
        path: '/products/custom-apps',
    },
    {
        name: 'AI Integration',
        desc: 'Transform your existing systems with intelligent automation and AI capabilities.',
        icon: '🤖',
        gradient: 'linear-gradient(135deg, #06b6d4, #10b981)',
        path: '/products/ai-integration',
    },
]

const ProductsSection: React.FC = () => {
    const [visible, setVisible] = useState(false)
    const sectionRef = useRef<HTMLElement>(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setVisible(true) },
            { threshold: 0.1 }
        )
        if (sectionRef.current) observer.observe(sectionRef.current)
        return () => observer.disconnect()
    }, [])

    return (
        <section id="products" className={`products-section section ${visible ? 'products-section--visible' : ''}`} ref={sectionRef}>
            <div className="container">
                <div className="section-header">
                    <div className="badge">Our Products</div>
                    <h2>
                        Applications Built for{' '}
                        <span className="text-gradient">Real Impact</span>
                    </h2>
                    <p>
                        Each product solves a specific industry challenge — designed for performance,
                        trusted by thousands of users across Indonesia.
                    </p>
                </div>

                {/* Product Cards Grid */}
                <div className="products-grid">
                    {products.map((product, i) => (
                        <div
                            key={product.name}
                            className="product-card card"
                            style={{ animationDelay: `${i * 0.1}s` }}
                        >
                            <div className="product-card__header">
                                <div className="product-card__icon" style={{ background: product.gradient }}>
                                    {product.icon}
                                </div>
                                <div className="product-card__meta">
                                    <span className="product-card__category">{product.category}</span>
                                    {product.tag && (
                                        <span className={`product-card__tag product-card__tag--${product.tagColor}`}>
                                            {product.tag}
                                        </span>
                                    )}
                                </div>
                            </div>

                            <h3 className="product-card__name">{product.name}</h3>
                            <p className="product-card__desc">{product.shortDesc}</p>

                            <ul className="product-card__features">
                                {product.features.map((f) => (
                                    <li key={f}>
                                        <span className="product-card__feature-check">✓</span>
                                        {f}
                                    </li>
                                ))}
                            </ul>

                            <Link to={product.path} className="product-card__cta btn btn--outline btn--sm">
                                View Details
                                <span className="btn__icon">→</span>
                            </Link>
                        </div>
                    ))}
                </div>

                {/* Service Highlights */}
                <div className="service-highlights">
                    <div className="service-highlights__label badge badge--accent">
                        Also Available
                    </div>
                    <div className="service-highlights__grid">
                        {serviceHighlights.map((service, i) => (
                            <Link key={i} to={service.path} className="service-highlight-card">
                                <div className="service-highlight-card__icon" style={{ background: service.gradient }}>
                                    {service.icon}
                                </div>
                                <div className="service-highlight-card__content">
                                    <h4>{service.name}</h4>
                                    <p>{service.desc}</p>
                                </div>
                                <span className="service-highlight-card__arrow">→</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ProductsSection
