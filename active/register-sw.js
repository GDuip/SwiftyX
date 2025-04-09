// Path: /register-sw.js (or wherever index.html includes it from)
// Do not change unless you know what you're doing
"use strict";

// This is the path where the browser will look for the service worker file.
// Ensure your uv-sw.js file is ACTUALLY located at '/active/uv-sw.js' in your deployment.
const stockSW = "/active/uv-sw.js";

// Hostnames where service worker registration is allowed over http
const swAllowedHostnames = ["localhost", "127.0.0.1"];

async function registerSW() {
  if (location.protocol !== "https:" && !swAllowedHostnames.includes(location.hostname)) {
    console.error("Service workers cannot be registered without https or over an allowed hostname.");
    // Optionally display an error to the user
    // document.getElementById('uv-error').textContent = 'Error: Service Worker requires HTTPS.';
    // return; // Stop registration if not HTTPS
    // Note: GitHub Pages uses HTTPS, so this check is mainly for local testing.
  }

  if (!navigator.serviceWorker) {
    console.error("Your browser doesn't support service workers.");
    // Optionally display an error to the user
    // document.getElementById('uv-error').textContent = 'Error: Service Workers not supported in this browser.';
    throw new Error("Your browser doesn't support service workers."); // Or handle more gracefully
  }

  try {
    // Register the service worker using the path defined in stockSW
    // and the scope defined in the uv.config.js file
    const registration = await navigator.serviceWorker.register(stockSW, {
      scope: __uv$config.prefix, // Uses the prefix from uv.config.js
    });
    console.log(`ServiceWorker registration successful with scope: ${registration.scope}`);
  } catch (error) {
    console.error(`ServiceWorker registration failed: ${error}`);
    // Display a user-friendly error
    const errorElement = document.getElementById('uv-error');
    if (errorElement) {
        errorElement.textContent = 'Failed to initialize essential components. Please ensure you are using HTTPS and try clearing your cache or browser data.';
        // Optionally add the technical error code/message
        const errorCodeElement = document.getElementById('uv-error-code');
        if (errorCodeElement) {
             errorCodeElement.textContent = error.toString();
        }
    }
    // Rethrow or handle as needed for your application flow
    // throw error;
  }
}

// Automatically call registerSW() when the script loads
// Ensure uv.config.js has loaded first if __uv$config is needed immediately
if (self.__uv$config) {
    registerSW();
} else {
    // Fallback or wait if uv.config might load later (less ideal)
    console.warn('uv.config.js not loaded before register-sw.js. Service Worker registration might be delayed or fail.');
    // You might need to defer calling registerSW until uv.config is confirmed loaded.
    // For example, listen for a custom event or check in a setInterval (not recommended).
    // The best approach is to ensure uv.config.js <script> tag comes before register-sw.js.
}
