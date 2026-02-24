import { type JSX } from 'react';

function Footer(): JSX.Element {
    return (
        <footer className="footer bg-gray-800 text-white py-4">
            <p className="text-center text-sm md:text-base font-medium">
                &copy; 2025 | Project Management App | All rights reserved | code BPdevelopment
            </p>
        </footer>
    );
}

export default Footer;