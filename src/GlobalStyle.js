import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    /* Box sizing rules */
    *,
    *::before,
    *::after {
        box-sizing: border-box;
    }

    /* Remove default margin */
    body,
    h1,
    h4,
    ul,
    p {
        margin: 0;
    }

    /* Remove list styles on ul, ol elements with a list role, which suggests default styling will be removed */
    ul {
        list-style: none;
        padding-inline-start: 0;
    }

    /* Set core root defaults */
    html:focus-within {
        scroll-behavior: smooth;
    }

    /* Set core body defaults */
    body {
        min-height: 100vh;
        padding-inline: 1rem;
        font-family: 'Karla', sans-serif;
        text-rendering: optimizeSpeed;
        line-height: 1.5;
        background-color: #CECDFF;
    }

    /* Inherit fonts for inputs and buttons */
    input,
    button {
        font: inherit;
    }

    input {
        border-radius: 5px;
    }

    input:not([type="text"]) {
        cursor: pointer;
    }

    /* Remove all animations, transitions and smooth scroll for people that prefer not to see them */
    @media (prefers-reduced-motion: reduce) {
        html:focus-within {
            scroll-behavior: auto;
        }
        
        *,
        *::before,
        *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
            scroll-behavior: auto !important;
        }
    }
`

export default GlobalStyle
