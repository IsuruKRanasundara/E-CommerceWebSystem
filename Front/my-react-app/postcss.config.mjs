export default {
    plugins: {
        "@tailwindcss/postcss": {},
        "@material-tailwind/react/utils/withMT":{
            content: [
                "./src/**/*.{js,jsx,ts,tsx}",
                "path-to-your-node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
                "path-to-your-node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
            ],},
    }
}
