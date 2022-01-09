module.exports = {
  purge: {
    enabled: true,
    content: ["./src/**/*.html", "./src/app/sections/nav/nav.component.ts"],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      boxShadow: {
        xl: '0px 25px 50px rgb(0, 71, 75, 0.1)',
      },
      colors: {
        primary: 'hsl(172, 67%, 45%)',
        'light-primary': 'hsl(173, 61%, 77%)',
        'very-dark-cyan': 'hsl(183, 100%, 15%)',
        'darker-grayish-cyan': 'hsl(186, 14%, 43%)',
        'dark-grayish-cyan': 'hsl(184, 14%, 56%)',
        'light-grayish-cyan': 'hsl(185, 41%, 84%)',
        'lighter-grayish-cyan': 'hsl(189, 41%, 97%)',
      }
    },
  },
  variants: {
    extend: {
      borderWidth: ['hover', 'focus'],
      ringWidth: ['hover'],
      ringColor: ['hover'],
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
