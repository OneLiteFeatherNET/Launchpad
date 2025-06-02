import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

export default {
    plugins: [
        plugin(function({ addBase }) {
            addBase({
                ':root': {
                    '--gradient-from': '#EC008B',
                    '--gradient-via': '#91268F',
                    '--gradient-to': '#27A9E1',
                },
                '.dark': {
                    '--gradient-from': '#27A9E1',
                    '--gradient-via': '#2A388F',
                    '--gradient-to': '#EC008B',
                }
            })
        }),
    ],
    content: ['./components/**/*.vue', './pages/**/*.vue'],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                // Original secondary colors
                'secondary-pink':  '#EC008B',
                'secondary-orange':'#F7931D',
                'secondary-purple':'#91268F',
                'secondary-blue':  '#2A388F',
                'secondary-cyan':  '#27A9E1',

                // M3 Design System Integration
                'secondary': '#EC008B', // Using secondary-pink as secondary
                'secondary-container': 'rgba(236, 0, 139, 0.12)', // Lighter version of pink
                'secondary-container-dark': 'rgba(236, 0, 139, 0.24)', // Darker version of pink for dark mode

                // M3 Design System Integration for specific secondary colors
                'secondary-orange-color': '#F7931D',
                'secondary-orange-container': 'rgba(247, 147, 29, 0.12)', // Lighter version of orange
                'secondary-orange-container-dark': 'rgba(247, 147, 29, 0.24)', // Darker version of orange for dark mode

                'secondary-purple-color': '#91268F',
                'secondary-purple-container': 'rgba(145, 38, 143, 0.12)', // Lighter version of purple
                'secondary-purple-container-dark': 'rgba(145, 38, 143, 0.24)', // Darker version of purple for dark mode

                'secondary-blue-color': '#2A388F',
                'secondary-blue-container': 'rgba(42, 56, 143, 0.12)', // Lighter version of blue
                'secondary-blue-container-dark': 'rgba(42, 56, 143, 0.24)', // Darker version of blue for dark mode

                'secondary-cyan-color': '#27A9E1',
                'secondary-cyan-container': 'rgba(39, 169, 225, 0.12)', // Lighter version of cyan
                'secondary-cyan-container-dark': 'rgba(39, 169, 225, 0.24)', // Darker version of cyan for dark mode
            },
            backgroundImage: {
                'text-gradient': 'linear-gradient(to right, var(--gradient-from), var(--gradient-via), var(--gradient-to))',
            },
            borderRadius: {
                'xxl': '0.75rem',
            }
        }
    }
} satisfies Config;
