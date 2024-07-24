// @ts-nocheck

// Expanded set of browser engines with comprehensive comments
const engines = {
  webKit: "AppleWebKit/537.36",  // Core component of Safari on macOS and iOS, also the foundation for all browsers on iOS due to Apple's requirements.
  gecko: "Gecko/20100101",       // Firefox's engine, known for its robustness and strict adherence to web standards. It is also used in various Mozilla products like Thunderbird.
  blink: "Chrome/58.0.3029.110", // Used by Chrome, Opera (post-2013), and recent versions of Edge, making it one of the most dominant engines in terms of global usage.
  trident: "Trident/7.0",        // The main engine for older Internet Explorer versions, known for its unique interpretation of web standards, often requiring specific hacks or fallbacks in web design.
  edgeHTML: "Edge/18.19041",     // Developed for legacy Microsoft Edge versions, known for improved standards support over Trident but ultimately replaced by Blink in newer Edge versions.
  presto: "Presto/2.12.388",     // Used by older versions of Opera, noted for its speed and efficient resource usage which was ideal for slower hardware and limited network conditions.
  khtml: "KHTML/4.11",           // The rendering engine for Konqueror browser, pivotal in KDE desktop environments, and the progenitor of WebKit.
  goanna: "Goanna/3.4.8",        // A fork of Gecko aiming to maintain support for XUL-based applications and extend legacy functionalities phased out by mainstream browsers.
  netFront: "NetFront/4.2",      // Commonly found in embedded systems like handheld game consoles and older smartphones, notable for its small footprint and compatibility with constrained devices.
  tasmota: "Tasmota/2.3.0",      // Specifically designed for IoT devices, emphasizing minimal resource use and quick response times suitable for home automation.
  servo: "Servo/1.0",            // A proof of concept for the use of Rust in browser engine development, showcasing potential advances in parallel processing and memory safety.
  layoutNG: "Chrome/LayoutNG",   // Chrome's newest layout engine designed to replace legacy layout architectures, focusing on speed, efficiency, and new web standards.
  quantum: "Firefox/Quantum",    // Represents the major update to Firefox that overhauled Gecko for better concurrency and parallelism, improving performance and reducing resource consumption.
  lynx: "Lynx/2.8.9dev.16",      // A text-based browser used primarily in command-line interfaces, emphasizing accessibility and speed without requiring graphical support.
  weasyPrint: "WeasyPrint/53.0"  // A visual rendering engine designed for converting HTML and CSS to PDF, showcasing the use of browser technologies for document processing beyond traditional web pages.
};

const operatingSystems = {
  windows: "Windows NT 10.0; Win64; x64",  // Windows 10 for desktops.
  windows11: "Windows NT 11.0; Win64; x64",  // Latest Windows 11 for high-end devices.
  macCatalina: "Macintosh; Intel Mac OS X 10_15_7",  // macOS Catalina.
  macBigSur: "Macintosh; Intel Mac OS X 11_0",  // macOS Big Sur.
  macMonterey: "Macintosh; Intel Mac OS X 12_0",  // macOS Monterey for cutting-edge Apple hardware.
  linux: "X11; Linux x86_64",  // General Linux desktop.
  linuxARM: "X11; Linux ARMv8",  // Linux on ARM architecture, popular in embedded systems.
  android11: "Android 11; Mobile",  // Represents newer Android smartphones.
  androidTablet: "Android 11; Tablet",  // Android tablets with larger screens.
  iOS15: "iPhone; CPU iPhone OS 15_0 like Mac OS X",  // Latest iOS version for modern iPhones.
  iPadOS15: "iPad; CPU OS 15_0 like Mac OS X",  // iPadOS version corresponding to iOS 15.
  chromeOS: "CrOS x86_64 14092.66.0",  // Recent Chrome OS version.
  unixBSD: "Unix; FreeBSD 13.0-RELEASE",  // A newer version of FreeBSD.
  solaris: "SunOS; Solaris 11.4",  // Oracle Solaris, known for its scalability and robustness.
  haiku: "Haiku; BeOS R1/beta2",  // Haiku, the open-source OS inspired by BeOS.
  templeOS: "TempleOS; Divine Intellect 5.03",  // The unique and minimalist TempleOS.
  freeDOS: "FreeDOS; 1.3 RC4",  // DOS-compatible operating system used in legacy and educational contexts.
  dragonFlyBSD: "DragonFlyBSD; 5.8.3",  // BSD variant known for its performance and advanced features.
  reactOS: "ReactOS; 0.4.13",  // OS aiming for binary compatibility with Windows applications.
  arduino: "Arduino; AVR",  // Arduino platform, typically used for microcontroller-based projects.
  ps5: "PlayStation 5; Browser 1.0",  // Sony PlayStation 5, focusing on gaming experiences.
  xboxSeriesX: "Xbox Series X; Edge 44",  // The newest Xbox console using a variant of Microsoft Edge.
  nintendoSwitch: "Nintendo Switch; NintendoBrowser/5.1.0",  // Nintendo's gaming console with built-in web features.
  raspberryPiOS: "Raspberry Pi; Debian Buster ARM",  // Raspberry Pi using Raspberry Pi OS based on Debian.
  kindle: "Kindle; 3.4 (Tablet OS)",  // Amazon Kindle devices, primarily for reading but with web capabilities.
  googleTV: "GoogleTV; Chrome/84.0.4147.136",  // Google TV, showing the blend of Chrome and Android platforms.
  ubuntuTouch: "Ubuntu Touch; OTA-17",  // Mobile version of Ubuntu designed for convergence.
  sailfishOS: "Sailfish OS; 4.1.0.24",  // Developed by Jolla, aimed at offering a privacy-focused mobile OS.
  kaiOS: "KaiOS; 2.5.2",  // Mobile operating system based on Linux for feature phones.
  fireOS: "Amazon Fire; Fire OS 7.3.1.9"  // Updates the representation of Amazon Fire tablets.
};



const browsers = {
  chrome: "Chrome/88.0.4324.150",  // Latest stable release for desktop.
  chromeBeta: "Chrome/89.0.4389.72 Beta",  // Beta version for early adopters and developers.
  chromeDev: "Chrome/90.0.4430.72 Dev",  // Developer version with the latest features.
  chromeCanary: "Chrome/91.0.4464.5 Canary",  // Canary build, bleeding edge and less stable.
  chromeMobile: "Chrome/90.0.4430.210 Mobile",  // Mobile version for Android and iOS.
  firefox: "Firefox/85.0",  // Standard version for desktop.
  firefoxESR: "Firefox/78.9.0 ESR",  // Extended Support Release for enterprises.
  firefoxMobile: "Firefox/89.0 Mobile",  // Mobile version for smartphones.
  firefoxQuantum: "Firefox Quantum/89.0",  // Quantum release with improved performance.
  safari: "Safari/537.36",  // Standard version for macOS.
  safariMobile: "Mobile Safari/604.1",  // iOS version for iPhones and iPads.
  edge: "Edge/89.0.774.68",  // Chromium-based Edge version for Windows and macOS.
  edgeLegacy: "Edge/18.18363",  // Legacy Edge version before Chromium switch.
  opera: "Opera/76.0.4017.177",  // Latest stable release.
  operaMini: "Opera Mini/52.0.2517.139457",  // Popular for data-saving features on mobile.
  ie11: "MSIE 11.0",  // Final version of Internet Explorer.
  brave: "Brave/1.24.86",  // Privacy-focused browser based on Chromium.
  vivaldi: "Vivaldi/3.8.2259.42",  // Highly customizable browser for power users.
  torBrowser: "TorBrowser/10.0.17",  // Focuses on privacy and accessing the dark web.
  ucBrowser: "UCBrowser/13.3.2.1303",  // Widely used in Asia, known for its compression technology.
  samsungInternet: "SamsungBrowser/14.0",  // Default browser on Samsung devices.
  yandexBrowser: "YandexBrowser/21.3.2",  // Popular in Russia, features Yandex search integration.
  duckDuckGo: "DuckDuckGo/5",  // Browser version of the privacy-focused search engine.
  puffin: "Puffin/8.2.2.41258",  // Cloud-based web browser for speed and security.
  seamonkey: "SeaMonkey/2.53.7.1",  // Continuation of the Mozilla Application Suite.
  lynx: "Lynx/2.8.9rel.1",  // Text-based web browser for CLI environments.
  kindleBrowser: "Kindle/3.4 (KHTML, like Gecko) Version",  // Used on Amazon Kindle e-readers.
  epic: "Epic/1.0",  // Epic privacy browser designed to block ads and tracking scripts.
  avant: "Avant Browser/1.7",  // Utilizes three rendering engines: Trident, Gecko, and WebKit.
  paleMoon: "PaleMoon/28.10.0",  // Independent fork of Firefox with focus on customization.
  midori: "Midori/0.5.11",  // Lightweight browser using WebKit, known for its minimalism.
  qupZilla: "QupZilla/2.2.6",  // Now known as Falkon, a KDE web browser using QtWebEngine.
  waterfox: "Waterfox/2020.10",  // Firefox fork that focuses on speed and data privacy.
  maxthon: "Maxthon/6.1.2.1000",  // Cloud-based browser with resource-sniffing capabilities.
  cliqz: "Cliqz/1.32.1",  // Browser with built-in anti-tracking features.
  orfox: "Orfox/Fennec-52.9.0esr/TorBrowser/7.5.6",  // Tor Browser for Android, based on Firefox.
  netsurf: "NetSurf/3.10",  // Lightweight browser for small devices and desktop systems.
  baiduBrowser: "baiduBrowser/7.12.12.0",  // Popular Chinese browser known for its integration with Baidu services.
  konqueror: "Konqueror/5.0.97",  // Web browser and file manager for the KDE desktop.
  iCab: "iCab/5.8.6",  // Internet browser for Mac and iOS that supports HTML5 and CSS3.
  omniWeb: "OmniWeb/622.8.0"  // Web browser developed for Mac OS X.
};



// Function to generate User-Agent strings
// This format is typically recognized by web servers and is crucial for content negotiation.
function generateUserAgent(engine: string, os: string, browser: string): string {
  return `Mozilla/5.0 (${os}) ${engine} (KHTML, like Gecko) ${browser} Safari/537.36`;
}

// Define all common User-Agent strings in one place using combinations of components
const VALID_USER_AGENTS = {
  windowsChrome: generateUserAgent(engines.blink, operatingSystems.windows, browsers.chrome),
  macFirefox: generateUserAgent(engines.gecko, operatingSystems.mac, browsers.firefox),
  linuxSafari: generateUserAgent(engines.webKit, operatingSystems.linux, browsers.safari) // Note: Safari is typically not on Linux, this is hypothetical
} as const;  // Const assertion to make types literal

// Derive the UserAgent type directly from the const object
type UserAgent = typeof VALID_USER_AGENTS[keyof typeof VALID_USER_AGENTS];

// Optionally, you can define a type for just the keys if needed elsewhere
type UserAgentKey = keyof typeof VALID_USER_AGENTS;

// Export the VALID_USER_AGENTS object and types
export { VALID_USER_AGENTS, UserAgent, UserAgentKey };
