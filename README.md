# Public Key Cryptography - Encoding/Decoding

Built as part of #100xDev web3 cohort

## Overview

This project is a web application that demonstrates various encoding and decoding mechanisms used in public key cryptography. It allows users to convert between different formats, such as ASCII, byte arrays, hexadecimal, Base64, and Base58, using a simple and intuitive interface.

## Features

- **Encoding and Decoding**: The application supports multiple encoding and decoding formats, including ASCII, byte arrays, hexadecimal, Base64, and Base58.
- **Theme Toggle**: Users can switch between dark and light themes using a toggle button.
- **Dynamic Input Placeholders**: The input placeholder dynamically changes based on the selected encoding/decoding method to guide users on the expected input format.
- **Responsive Design**: The layout is fully responsive, ensuring a seamless experience on both desktop and mobile devices.
- **Error Handling**: The application includes error handling to catch and inform users of any invalid inputs.

## Technologies Used

- **React with TypeScript**: The frontend is built using React for a robust and maintainable component structure.
- **shadcn/ui Library**: A component library used for building the user interface, providing a set of beautiful and accessible UI components.
- **Tailwind CSS**: A utility-first CSS framework is used for styling, ensuring a clean and minimal design.
- **Lucide-react**: An icon library is used to provide icons for the theme toggle button.

## Installation

To run this project locally, follow these steps:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/HashirAKB/Cryptographic-Encodings.git
   cd Cryptographic-Encodings
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Configure the Theme Provider**:
   Ensure you have the `ThemeProvider` configured in your `_app.tsx` or `layout.tsx` file to enable theme switching.

4. **Run the Development Server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser to see the application in action.

## Usage

1. **Select Encoding/Decoding Method**: Choose the desired encoding or decoding method from the options provided.
2. **Enter Input**: Input the text or byte array to be encoded or decoded. The placeholder text will guide you on the expected input format.
3. **View Output**: The result will be displayed in the output field once the encoding or decoding is complete.
4. **Toggle Theme**: Use the button to switch between light and dark themes.

## Implementation Details

- **Encoding and Decoding Functions**: The core encoding and decoding logic is implemented in JavaScript functions that handle the conversion between different formats.
- **React Component Structure**: The main component, `EncodingDemo`, manages state for user input, output, and the selected method using React hooks.
- **Dynamic Placeholders**: The input placeholder updates dynamically based on the encoding/decoding method selected, enhancing usability and reducing errors.
- **UI Components**: The user interface is built with shadcn/ui components such as `Button`, `Input`, `Label`, and `RadioGroup`, styled with Tailwind CSS for a minimal and cohesive look.
- **Theme Management**: The `useTheme` hook from `next-themes` is used to manage and toggle between dark and light themes, providing a modern and accessible user experience.

## Future Enhancements

- **Additional Encoding/Decoding Formats**: Support for more cryptographic formats could be added.
- **Advanced Error Handling**: More comprehensive validation and error messages to handle various edge cases.
- **Improved UI/UX**: Further UI refinements and user experience improvements based on user feedback.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue to discuss potential changes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.

---

Thank you for checking out this project! If you have any questions or feedback, feel free to reach out. Enjoy exploring the world of public key cryptography!