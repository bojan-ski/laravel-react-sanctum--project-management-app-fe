import { type JSX } from 'react';

function Footer(): JSX.Element {
    return (
        <footer className="footer bg-gray-800 text-gray-300 py-4">
            <p className="text-center text-md">
                &copy; 2025 | Project Management App | All rights reserved | code BPdevelopment
            </p>
        </footer>
    );
}

export default Footer;