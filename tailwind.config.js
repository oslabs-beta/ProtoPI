/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./webviews/**/*.{svelte,ts}"],
  theme: {
    extend: {
      colors: {
        vscode: {
          foreground: "var(--vscode-foreground)",
          background: "var(--vscode-editor-background)",
          "text-link": "var(--vscode-textLink-foreground)",
          "text-link-active": "var(--vscode-textLink-activeForeground)",
          button: {
            foreground: "var(--vscode-button-foreground)",
            background: "var(--vscode-button-background)",
            hover: "var(--vscode-button-hoverBackground)",
            "secondary-foreground": "var(--vscode-button-secondaryForeground)",
            "secondary-background": "var(--vscode-button-secondaryBackground)",
            "secondary-hover": "var(--vscode-button-secondaryHoverBackground)",
          },
          input: {
            foreground: "var(--vscode-input-foreground)",
            background: "var(--vscode-input-background)",
            placeholder: "var(--vscode-input-placeholderForeground)",
          },
          focus: "var(--vscode-focusBorder)",
        },
      },
      fontFamily: {
        vscode: ["var(--vscode-font-family)"],
      },
      fontSize: {
        vscode: "var(--vscode-font-size)",
      },
      fontWeight: {
        vscode: "var(--vscode-font-weight)",
      },
    },
  },
  plugins: [],
};
