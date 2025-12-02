import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#C41E3A", // Sportify Red from logo
                secondary: "#1A1A1A", // Dark charcoal
                accent: "#FFB81C", // Gold accent
                surface: {
                    light: "#F5F5F5",
                    dark: "#0A0A0A",
                },
                text: {
                    main: "#1A1A1A",
                    alt: "#666666",
                },
                background: "#ffffff",
                foreground: "#1A1A1A",
                border: "#e5e7eb",
                muted: "#f3f4f6",
            },
            borderRadius: {
                'card': '1rem',
                'btn': '0.5rem',
            },
            screens: {
                'sm': '375px',
                'md': '768px',
                'lg': '1024px',
                'xl': '1280px',
                '2xl': '1536px',
            },
            fontFamily: {
                sans: ['var(--font-inter)', 'sans-serif'],
            },
        },
    },
    plugins: [],
};
export default config;
