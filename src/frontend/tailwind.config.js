import typography from '@tailwindcss/typography';
import containerQueries from '@tailwindcss/container-queries';
import animate from 'tailwindcss-animate';

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ['class'],
    content: ['index.html', 'src/**/*.{js,ts,jsx,tsx,html,css}'],
    theme: {
        container: {
            center: true,
            padding: '2rem',
            screens: {
                '2xl': '1400px'
            }
        },
        extend: {
            colors: {
                border: 'oklch(var(--border))',
                input: 'oklch(var(--input))',
                ring: 'oklch(var(--ring) / <alpha-value>)',
                background: 'oklch(var(--background))',
                foreground: 'oklch(var(--foreground))',
                primary: {
                    DEFAULT: 'oklch(var(--primary) / <alpha-value>)',
                    foreground: 'oklch(var(--primary-foreground))'
                },
                secondary: {
                    DEFAULT: 'oklch(var(--secondary) / <alpha-value>)',
                    foreground: 'oklch(var(--secondary-foreground))'
                },
                destructive: {
                    DEFAULT: 'oklch(var(--destructive) / <alpha-value>)',
                    foreground: 'oklch(var(--destructive-foreground))'
                },
                muted: {
                    DEFAULT: 'oklch(var(--muted) / <alpha-value>)',
                    foreground: 'oklch(var(--muted-foreground) / <alpha-value>)'
                },
                accent: {
                    DEFAULT: 'oklch(var(--accent) / <alpha-value>)',
                    foreground: 'oklch(var(--accent-foreground))'
                },
                popover: {
                    DEFAULT: 'oklch(var(--popover))',
                    foreground: 'oklch(var(--popover-foreground))'
                },
                card: {
                    DEFAULT: 'oklch(var(--card))',
                    foreground: 'oklch(var(--card-foreground))'
                },
                chart: {
                    1: 'oklch(var(--chart-1))',
                    2: 'oklch(var(--chart-2))',
                    3: 'oklch(var(--chart-3))',
                    4: 'oklch(var(--chart-4))',
                    5: 'oklch(var(--chart-5))'
                },
                sidebar: {
                    DEFAULT: 'oklch(var(--sidebar))',
                    foreground: 'oklch(var(--sidebar-foreground))',
                    primary: 'oklch(var(--sidebar-primary))',
                    'primary-foreground': 'oklch(var(--sidebar-primary-foreground))',
                    accent: 'oklch(var(--sidebar-accent))',
                    'accent-foreground': 'oklch(var(--sidebar-accent-foreground))',
                    border: 'oklch(var(--sidebar-border))',
                    ring: 'oklch(var(--sidebar-ring))'
                },
                // India Map color palette
                'map-1': 'oklch(var(--map-1))',
                'map-2': 'oklch(var(--map-2))',
                'map-3': 'oklch(var(--map-3))',
                'map-4': 'oklch(var(--map-4))',
                'map-5': 'oklch(var(--map-5))',
                'map-6': 'oklch(var(--map-6))',
                'map-7': 'oklch(var(--map-7))',
                'map-8': 'oklch(var(--map-8))',
                'map-9': 'oklch(var(--map-9))',
                'map-10': 'oklch(var(--map-10))',
                'map-11': 'oklch(var(--map-11))',
                'map-12': 'oklch(var(--map-12))',
                'map-13': 'oklch(var(--map-13))',
                'map-14': 'oklch(var(--map-14))',
                'map-15': 'oklch(var(--map-15))',
                'map-16': 'oklch(var(--map-16))',
                'map-17': 'oklch(var(--map-17))',
                'map-18': 'oklch(var(--map-18))',
                'map-19': 'oklch(var(--map-19))',
                'map-20': 'oklch(var(--map-20))',
                'map-21': 'oklch(var(--map-21))',
                'map-22': 'oklch(var(--map-22))',
                'map-23': 'oklch(var(--map-23))',
                'map-24': 'oklch(var(--map-24))',
                'map-25': 'oklch(var(--map-25))',
                'map-26': 'oklch(var(--map-26))',
                'map-27': 'oklch(var(--map-27))',
                'map-28': 'oklch(var(--map-28))',
                'map-29': 'oklch(var(--map-29))',
                'map-30': 'oklch(var(--map-30))',
                'map-31': 'oklch(var(--map-31))',
                'map-32': 'oklch(var(--map-32))',
                'map-33': 'oklch(var(--map-33))',
                'map-34': 'oklch(var(--map-34))',
                'map-35': 'oklch(var(--map-35))',
                'map-36': 'oklch(var(--map-36))',
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)'
            },
            boxShadow: {
                xs: '0 1px 2px 0 rgba(0,0,0,0.05)',
                warm: '0 4px 20px rgba(255, 138, 76, 0.15)',
                'warm-lg': '0 10px 40px rgba(255, 138, 76, 0.2)',
            },
            fontFamily: {
                sans: ['Noto Sans Devanagari', 'system-ui', 'sans-serif'],
                serif: ['Crimson Text', 'Noto Sans Devanagari', 'serif'],
                devanagari: ['Noto Sans Devanagari', 'sans-serif'],
            },
            keyframes: {
                'accordion-down': {
                    from: { height: '0' },
                    to: { height: 'var(--radix-accordion-content-height)' }
                },
                'accordion-up': {
                    from: { height: 'var(--radix-accordion-content-height)' },
                    to: { height: '0' }
                }
            },
            animation: {
                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up': 'accordion-up 0.2s ease-out'
            }
        }
    },
    plugins: [typography, containerQueries, animate]
};
