# PetroCASH original decorative motion

Owner infinity-arrow PNG and local generated wallet/shield illustrations feed BrandMotion. No remote animation URLs, new Rive binaries, analytics or completion events. Three adapters replace FoxAnimation, OnboardingFoxLoader and VbaFoxLoader by default; original implementations remain in Legacy*.tsx and can be selected with brand/brand.config.json animationMode=rive. Existing internal names and test IDs remain.

Parent dimensions/safe-area bottom logic unchanged. stop() is latched across network changes, cancels timing and cannot unlock/advance a flow. AppState pauses background/inactive motion, unmount cancels it. Accessibility progressbar remains on VBA's parent; decorative images are hidden from screen readers.

reduce-motion or NONE: static local graphic. LOW on known fast/wifi or any slow cellular: light 1.5% pulse. MID/unknown hardware on fast/wifi and any unknown network: product-default 4% pulse/slow orbit. HIGH on fast/wifi: full orbit. Unknown transport is never inferred offline or LOW. No added network requests, prefetch or blur.

Unit contracts test capability matrix, frame, stop, background and retained upstream Rive interfaces. Jest cannot prove real rendering, Rive binary contents, startup, clipping, GPU/FPS, accessibility focus on hardware or phone lifecycle; those remain native checklist items. Other feature-owned Rive assets still require visual review; do not claim every fox is gone from all binaries.
