// Path: /active/uv/uv.config.js
self.__uv$config = {
    prefix: '/active/go/',
    bare: 'https://32867gd198764dg23vd23198746v4d69182736dvussis7.9882136.xyz/', // Make sure this Bare server is working
    encodeUrl: Ultraviolet.codec.xor.encode,
    decodeUrl: Ultraviolet.codec.xor.decode,
    handler: '/active/uv/uv.handler.js', // Check this path relative to root
    bundle: '/active/uv/uv.bundle.js',   // Check this path relative to root
    config: '/active/uv/uv.config.js',   // Check this path relative to root (points to itself)
    // --- IMPORTANT CHANGE ---
    // This path MUST match the 'stockSW' variable in register-sw.js
    // AND the actual location of your uv-sw.js file.
    sw: '/active/uv-sw.js',
    // ----------------------
    defaultSearchEngine: 'https://duckduckgo.com/?q=',
};
