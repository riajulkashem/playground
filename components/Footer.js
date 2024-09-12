import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin, faFacebook, faXTwitter } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

function Footer() {
    const text = "Let's Connect"
    return (
        <footer className="w-11/12 mx-auto text-white">
            <div className="flex flex-col items-center gap-4 rounded-lg bg-indigo-600 px-6 shadow-lg sm:flex-row sm:justify-between">
                <span>Developed By Riajul Kashem</span>

                <div className='flex'>
                    <div className="inline-flex items-center gap-2 text-white">
                        <span className="text-sm font-medium">{text}</span>

                        <svg
                            className="size-5 rtl:rotate-180"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M17 8l4 4m0 0l-4 4m4-4H3"
                            />
                        </svg>
                    </div>

                    <div className="flex justify-center gap-4 p-2">
                        <a href="https://www.github.com/riajulkashem" target="_blank" rel="noopener noreferrer" className="text-white text-xl">
                            <FontAwesomeIcon icon={faGithub} />
                        </a>
                        <a href="https://www.linkedin.com/in/riajulkashem" target="_blank" rel="noopener noreferrer" className="text-white text-xl">
                            <FontAwesomeIcon icon={faLinkedin} />
                        </a>
                        <a href="mailto:riajulkashem@gmail.com" className="text-white text-xl">
                            <FontAwesomeIcon icon={faEnvelope} />
                        </a>
                        <a href="https://www.facebook.com/riajulkashem" target="_blank" rel="noopener noreferrer" className="text-white text-xl">
                            <FontAwesomeIcon icon={faFacebook} />
                        </a>
                        <a href="https://x.com/riajulkashem" target="_blank" rel="noopener noreferrer" className="text-white text-xl">
                            <FontAwesomeIcon icon={faXTwitter} />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
