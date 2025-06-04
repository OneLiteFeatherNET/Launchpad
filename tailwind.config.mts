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

                // Solid background color variants for tier badges
                'secondary-orange-bg': '#F7931D',
                'secondary-purple-bg': '#91268F',
                'secondary-blue-bg': '#2A388F',
                'secondary-cyan-bg': '#27A9E1',


                // M3 Design System Integration
                'secondary': '#EC008B', // Using secondary-pink as secondary
                'secondary-container': 'rgba(236, 0, 139, 0.12)', // Lighter version of pink
                'secondary-container-dark': 'rgba(236, 0, 139, 0.24)', // Darker version of pink for dark mode

                // Container variants for base secondary colors
                'secondary-orange-container': 'rgba(247, 147, 29, 0.12)', // Lighter version of orange
                'secondary-orange-container-dark': 'rgba(247, 147, 29, 0.24)', // Darker version of orange for dark mode
                'on-secondary-orange-container': '#000000', // Text color for orange container
                'on-secondary-orange-container-dark': '#FFFFFF', // Text color for orange container in dark mode

                'secondary-purple-container': 'rgba(145, 38, 143, 0.12)', // Lighter version of purple
                'secondary-purple-container-dark': 'rgba(145, 38, 143, 0.24)', // Darker version of purple for dark mode
                'on-secondary-purple-container': '#000000', // Text color for purple container
                'on-secondary-purple-container-dark': '#FFFFFF', // Text color for purple container in dark mode

                'secondary-blue-container': 'rgba(42, 56, 143, 0.12)', // Lighter version of blue
                'secondary-blue-container-dark': 'rgba(42, 56, 143, 0.24)', // Darker version of blue for dark mode
                'on-secondary-blue-container': '#000000', // Text color for blue container
                'on-secondary-blue-container-dark': '#FFFFFF', // Text color for blue container in dark mode

                'secondary-cyan-container': 'rgba(39, 169, 225, 0.12)', // Lighter version of cyan
                'secondary-cyan-container-dark': 'rgba(39, 169, 225, 0.24)', // Darker version of cyan for dark mode
                'on-secondary-cyan-container': '#000000', // Text color for cyan container
                'on-secondary-cyan-container-dark': '#FFFFFF', // Text color for cyan container in dark mode

                // M3 Design System Integration for specific secondary colors
                'secondary-orange-color': '#F7931D',
                'secondary-orange-color-container': 'rgba(247, 147, 29, 0.12)', // Lighter version of orange
                'secondary-orange-color-container-dark': 'rgba(247, 147, 29, 0.24)', // Darker version of orange for dark mode

                'secondary-purple-color': '#91268F',
                'secondary-purple-color-container': 'rgba(145, 38, 143, 0.12)', // Lighter version of purple
                'secondary-purple-color-container-dark': 'rgba(145, 38, 143, 0.24)', // Darker version of purple for dark mode

                'secondary-blue-color': '#2A388F',
                'secondary-blue-color-container': 'rgba(42, 56, 143, 0.12)', // Lighter version of blue
                'secondary-blue-color-container-dark': 'rgba(42, 56, 143, 0.24)', // Darker version of blue for dark mode

                'secondary-cyan-color': '#27A9E1',
                'secondary-cyan-color-container': 'rgba(39, 169, 225, 0.12)', // Lighter version of cyan
                'secondary-cyan-color-container-dark': 'rgba(39, 169, 225, 0.24)', // Darker version of cyan for dark mode
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
