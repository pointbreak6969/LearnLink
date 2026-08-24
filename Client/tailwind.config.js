/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
  	extend: {
  		fontFamily: {
  			sans: ['Manrope', 'ui-sans-serif', 'system-ui', 'sans-serif'],
  			display: ['Fraunces', 'ui-serif', 'Georgia', 'serif'],
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		boxShadow: {
  			glow: '0 20px 45px -15px rgba(234, 88, 12, 0.35)',
  			card: '0 1px 2px rgba(15, 23, 42, 0.04), 0 8px 24px -8px rgba(15, 23, 42, 0.08)',
  		},
  		colors: {
  			brand: {
  				50: '#fff8ed',
  				100: '#ffefd3',
  				200: '#ffdba3',
  				300: '#ffc16b',
  				400: '#ff9d33',
  				500: '#fb7f13',
  				600: '#ec6208',
  				700: '#c34909',
  				800: '#9b390f',
  				900: '#7d3110',
  			},
  			ink: {
  				50: '#f6f5f4',
  				100: '#e8e5e3',
  				200: '#d3cdc8',
  				300: '#aea49c',
  				400: '#867a70',
  				500: '#635a52',
  				600: '#4a423c',
  				700: '#372f2b',
  				800: '#251f1c',
  				900: '#171310',
  			},
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			}
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate"),
	function ({ addComponents }) {
		addComponents({
		  '.truncate-multiline': {
			display: '-webkit-box',
			'-webkit-line-clamp': '2',
			'-webkit-box-orient': 'vertical',
			overflow: 'hidden',
			'text-overflow': 'ellipsis',
			'max-width':'8.9rem'
		  },
		});
	  },
  ],
}