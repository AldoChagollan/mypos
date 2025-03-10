const primary = "bg-blue-500 rounded-md disabled:bg-gray-400";
const secondary = "bg-blue-400 rounded-md disabled:bg-gray-400";
const danger = "bg-red-500 rounded-md disabled:bg-gray-400";
const success = "bg-green-500 rounded-md disabled:bg-gray-400";
const info = "bg-teal-500 rounded-md disabled:bg-gray-400";

const palette = {
    button: {
        primary,
        secondary,
        danger,
        success,
        info,
        outlined: {
            primary: "text-blue-500 border border-blue-500 hover:bg-blue-100 bg-transparent",
            secondary: "text-blue-400 border border-blue-400 hover:bg-blue-100 bg-transparent",
            danger: "text-red-500 border border-red-500 hover:bg-red-100 bg-transparent",
            success: "text-green-500 border border-green-500 hover:bg-green-100 bg-transparent",
            info: "text-teal-500 border border-teal-500 hover:bg-teal-100 bg-transparent"
        },
        contained: {
            primary: "bg-blue-500 text-white hover:bg-blue-600 disabled:bg-blue-400",
            secondary: "bg-blue-400 text-white hover:bg-blue-500 disabled:bg-blue-300",
            danger: "bg-red-500 text-white hover:bg-red-600 disabled:bg-red-400",
            success: "bg-green-500 text-white hover:bg-green-600 disabled:bg-green-400",
            info: "bg-teal-500 text-white hover:bg-teal-600 disabled:bg-teal-400"
        },
        text: {
            primary: "text-blue-500 hover:bg-blue-50 bg-transparent",
            secondary: "text-blue-400 hover:bg-blue-50 bg-transparent",
            danger: "text-red-500 hover:bg-red-50 bg-transparent",
            success: "text-green-500 hover:bg-green-50 bg-transparent",
            info: "text-teal-500 hover:bg-teal-50 bg-transparent"
        }
    }
};

export default palette;
