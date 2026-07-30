# Frontend Interview Quick Reference — Cheat Sheet

> Dense, scannable, printable. All the essentials in one place.

---

## 1. JavaScript One-Liners — 30 Concepts in 1 Sentence Each

| # | Concept | One-Sentence Explanation |
|---|---------|--------------------------|
| 1 | **Closure** | A function that "remembers" variables from its outer scope even after that scope has exited — the foundation of data privacy and React hooks. |
| 2 | **Hoisting** | `var` is hoisted + initialized to `undefined`; `let`/`const` are hoisted but uninitialized (TDZ) — access before declaration throws ReferenceError. |
| 3 | **Event Loop** | A single-threaded loop that processes: sync code → microtasks (Promises) → one macrotask (setTimeout) → repeat. |
| 4 | **Microtask vs Macrotask** | Microtasks (Promise.then, queueMicrotask) run before the next macrotask (setTimeout, I/O, DOM events) — they have higher priority. |
| 5 | **this Keyword** | Value determined by call-site: `new` → instance, `.call/.apply/.bind` → explicit, `obj.method()` → implicit, otherwise → global/undefined (strict). |
| 6 | **Arrow Functions** | No own `this`, `arguments`, or `prototype` — captures `this` lexically from enclosing scope; ideal for callbacks and React class handlers. |
| 7 | **call vs apply vs bind** | `call(this, a, b)` — invoke with args individually; `apply(this, [a, b])` — invoke with args array; `bind(this)` — returns new function, doesn't invoke. |
| 8 | **Prototype Chain** | When accessing a property, JS walks up `__proto__` until found or `null`; `class` syntax is sugar over this delegation chain. |
| 9 | **Promise States** | Pending → Fulfilled (resolved) or Rejected; once settled, immutable. `.then()` returns a new Promise (chaining). |
| 10 | **async/await** | Syntactic sugar over Promises; `await` pauses execution until Promise settles; error handling uses try/catch (not .catch). |
| 11 | **Debounce** | Delays function execution until `delay` ms after the *last* call; use for search inputs, window resize. |
| 12 | **Throttle** | Ensures function is called at most once per `delay` ms; use for scroll handlers, game loops. |
| 13 | **Event Delegation** | Attach one listener to a parent element instead of many to children; use `event.target` to identify the source; saves memory for dynamic lists. |
| 14 | **Event Bubbling vs Capturing** | Bubbling: event propagates from target up to root (default). Capturing: from root down to target (`addEventListener(fn, true)`). |
| 15 | **stopPropagation vs preventDefault** | `stopPropagation()` stops the event from bubbling up; `preventDefault()` stops the browser's default action (link navigation, form submit). |
| 16 | **Shallow Copy vs Deep Copy** | Shallow: `{...obj}`, `Object.assign` — only top-level properties copied. Deep: `structuredClone()`, recursive clone — all nested objects independently copied. |
| 17 | **Map vs WeakMap** | `Map`: any key type, iterable, prevents GC of keys. `WeakMap`: only object keys, non-iterable, allows GC — ideal for caching with automatic cleanup. |
| 18 | **Set vs Array** | `Set`: unique values only, O(1) has/add/delete, no index access. Use for deduplication. |
| 19 | **for...in vs for...of** | `for...in` iterates keys (enumerable properties, includes prototype). `for...of` iterates values (uses `Symbol.iterator` — works on arrays, strings, Maps, Sets). |
| 20 | **Nullish Coalescing (??)** | Returns right side only if left is `null` or `undefined` (not `0`, `''`, or `false`). Safer default operator than `||`. |
| 21 | **Optional Chaining (?.)** | Short-circuits to `undefined` if the left side is `null`/`undefined`. `user?.address?.city` — safe deep access. |
| 22 | **Object.freeze vs Object.seal** | `freeze`: can't add, delete, or modify properties (immutable). `seal`: can't add or delete, but CAN modify existing values. Both: shallow only. |
| 23 | **Currying** | Transforming `f(a,b,c)` into `f(a)(b)(c)`. Each call returns a function expecting the next argument. Enables partial application. |
| 24 | **Memoization** | Caching function results based on arguments to avoid recomputation. React.useMemo and reselect use this pattern. |
| 25 | **Generator Functions** | `function*` with `yield` — can pause/resume execution. Returns an iterator. Foundation for Redux Saga and async iteration patterns. |
| 26 | **Symbol** | Unique, immutable primitive used as object keys that don't collide. `Symbol.iterator` defines iteration protocol; `Symbol.for('key')` for global registry. |
| 27 | **Proxy** | Traps operations on an object (get, set, delete, has) — foundation for Vue 3 reactivity, Immer, and MobX. |
| 28 | **Object.defineProperty** | Define property with fine-grained control: writable, enumerable, configurable, getter/setter. Vue 2 reactivity used this. |
| 29 | **Typed Arrays (ArrayBuffer)** | Binary data buffers — Int8Array, Float32Array, Uint8Array. Foundation for WebGL, Web Workers, file processing, and WebSocket binary messages. |
| 30 | **Intl API** | Built-in i18n: `Intl.DateTimeFormat`, `Intl.NumberFormat`, `Intl.RelativeTimeFormat`, `Intl.ListFormat` — no libraries needed for formatting. |

---

## 2. React Hooks Cheat Sheet

| Hook | Syntax | Use Case | Key Detail |
|------|--------|----------|------------|
| `useState` | `const [state, setState] = useState(initial)` | Component-level state | Setter can take a value or updater function `prev => prev + 1` |
| `useEffect` | `useEffect(() => { ... return cleanup }, [deps])` | Side effects: fetch, subscriptions, DOM manipulation | Cleanup runs before re-effect and on unmount; empty `[]` = run once |
| `useContext` | `const value = useContext(MyContext)` | Avoid prop drilling; read context | Re-renders when context value changes |
| `useReducer` | `const [state, dispatch] = useReducer(reducer, initial)` | Complex state logic with multiple sub-values | Reducer is pure: `(state, action) => newState`; testable without React |
| `useCallback` | `const fn = useCallback(() => {}, [deps])` | Stable function reference across renders | Use when passing callbacks to memoized children |
| `useMemo` | `const value = useMemo(() => compute(), [deps])` | Memoize expensive calculations | Don't overuse — memoization has its own cost |
| `useRef` | `const ref = useRef(initial)` | Mutable ref object (no re-render on change) | DOM access, storing previous values, interval IDs, avoiding stale closures |
| `useImperativeHandle` | `useImperativeHandle(ref, () => ({ method }), [deps])` | Expose methods from child to parent | Used with `forwardRef`; escape hatch from declarative model |
| `useLayoutEffect` | `useLayoutEffect(() => {}, [deps])` | Synchronous effect that runs before browser paint | Measure DOM layout, synchronous state updates to avoid flicker |
| `useDeferredValue` | `const deferred = useDeferredValue(value)` | Defer re-rendering of non-urgent updates | Keeps UI responsive during heavy computation (React 18+) |
| `useTransition` | `const [isPending, startTransition] = useTransition()` | Mark updates as non-urgent/transition | Wraps state updates that can be interrupted (React 18+) |
| `useId` | `const id = useId()` | Generate unique IDs for accessibility | Stable across server/client; for `aria-labelledby`, form label linking |
| `useSyncExternalStore` | `const state = useSyncExternalStore(subscribe, getSnapshot)` | Subscribe to external stores with tear-free reads | For libraries like Redux, Zustand; prevents visual tearing (React 18+) |
| `useInsertionEffect` | `useInsertionEffect(() => {}, [deps])` | Inject styles before DOM mutations | For CSS-in-JS libraries; runs before useLayoutEffect |
| `useDebugValue` | `useDebugValue(value, format?)` | Label custom hooks in React DevTools | Cosmetic only; helps debugging custom hooks |
| `useOptimistic` | `const [optimistic, addOptimistic] = useOptimistic(state, reducer)` | Optimistic UI updates (React 19) | Show UI update immediately before server confirms |

---

## 3. CSS Flexbox vs Grid Decision Tree

| Question | If Yes → Flexbox | If No → Grid |
|----------|------------------|--------------|
| Is the layout **one-dimensional** (row OR column)? | Flexbox | Grid |
| Do items need to **wrap** naturally when space runs out? | Flexbox (`flex-wrap: wrap`) | Grid (but auto-fill is better) |
| Does the layout need a **fixed 2D structure** (rows AND columns simultaneously)? | Grid | Flexbox |
| Do you need **explicit control** over both axes independently? | Grid | Flexbox |
| Are you building a **component** (navbar, card, button group)? | Flexbox | Grid |
| Are you building a **page layout** (header, sidebar, main, footer)? | Grid | Flexbox (but both work) |
| Do items need **equal-width columns** with consistent gaps? | Grid | Flexbox (needs calc) |
| Do you need items to **overlap**? | Grid (same cell placement) | Flexbox (harder) |
| Do you need **content-based sizing** where shorter content = smaller cell? | Flexbox | Grid (unless `auto`) |

**Heuristic:** Use **Grid for layout** (page-level 2D arrangement), **Flexbox for components** (1D alignment of items). They're not competitors — the best designs use both.

---

## 4. TypeScript Utility Types Quick Reference

| Utility Type | What It Does | Example |
|-------------|-------------|---------|
| `Partial<T>` | All properties optional | `Partial<User>` → all `?` fields |
| `Required<T>` | All properties required (opposite of Partial) | `Required<Config>` |
| `Readonly<T>` | All properties readonly (shallow) | `Readonly<State>` |
| `Pick<T, K>` | Select specific keys | `Pick<User, 'id' \| 'name'>` |
| `Omit<T, K>` | Remove specific keys | `Omit<User, 'password'>` |
| `Record<K, V>` | Object with keys K and values V | `Record<'a' \| 'b', number>` → `{ a: number; b: number }` |
| `Exclude<T, U>` | Remove types from union | `Exclude<'a' \| 'b' \| 'c', 'a'>` → `'b' \| 'c'` |
| `Extract<T, U>` | Keep only matching types | `Extract<string \| number \| boolean, string \| number>` → `string \| number` |
| `NonNullable<T>` | Remove null and undefined | `NonNullable<string \| null>` → `string` |
| `ReturnType<T>` | Extract return type of function | `ReturnType<typeof fn>` |
| `Parameters<T>` | Extract parameter types as tuple | `Parameters<(a: string, b: number) => void>` → `[string, number]` |
| `Awaited<T>` | Unwrap Promise type (recursive) | `Awaited<Promise<Promise<number>>>` → `number` |
| `ThisParameterType<T>` | Extract `this` type of function | Used for mixins and decorators |
| `OmitThisParameter<T>` | Remove `this` type from function | Makes function callable without context |
| `InstanceType<T>` | Extract instance type of class | `InstanceType<typeof MyClass>` |
| `keyof T` | Union of all keys in T | `keyof User` → `'id' \| 'name' \| 'email'` |
| `T[K]` | Indexed access — type of property K in T | `User['id']` → `number` |

---

## 5. Next.js App Router File Conventions

| File | Purpose | Runs On | Notes |
|------|---------|---------|-------|
| `layout.tsx` | Shared wrapper for a segment and its children; persists across navigations | Server (default) | Cannot access `searchParams` or `pathname` directly |
| `page.tsx` | Unique UI for a route segment | Server (default) | Receives `params` and `searchParams` |
| `loading.tsx` | Suspense fallback for page/segment loading | Server | Automatically wrapped in Suspense boundary |
| `error.tsx` | Error boundary for a segment (must be Client Component) | Client (`'use client'`) | Receives `error` and `reset` props |
| `global-error.tsx` | Error boundary for root layout | Client | Catches errors in root layout specifically |
| `not-found.tsx` | UI for 404 within that segment | Server | Triggered by `notFound()` function |
| `route.tsx` | API route handler (GET, POST, PUT, DELETE, etc.) | Server | Cannot coexist with `page.tsx` in same segment |
| `middleware.ts` | Intercept requests before they reach the app (root-level only) | Edge | Auth, redirects, geo-blocking, A/B testing, bot protection |
| `template.tsx` | Like layout but remounts on every navigation (for animations) | Server | Use when you need to re-trigger entrance animations |
| `default.tsx` | Fallback for parallel routes | Server | Required for unmatched parallel route slots |
| `opengraph-image.tsx` | Dynamic OG image generation | Server | Returns an image, uses Satori |
| `sitemap.ts` | Dynamic sitemap generation | Server | Returns sitemap XML |
| `robots.ts` | Dynamic robots.txt generation | Server | Returns RobotsTxt object |
| `instrumentation.ts` | Runs on server startup (register OTEL, DB connections) | Server | Experimental; must be opted in |

---

## 6. State Management Decision Matrix

| When | Use | Why |
|------|-----|-----|
| **Local component state** (toggle, form input) | `useState` | Simplest; no extra library |
| **Server data** (API responses that need caching, refetch, and synchronization) | **React Query / SWR** | Built-in cache, deduplication, background refetch, optimistic updates, pagination — solves the hard problems |
| **Complex form state** (multi-step wizards, dynamic fields) | `useReducer` or **React Hook Form** | React Hook Form: performant (uncontrolled), schema validation (zod), tiny bundle |
| **Global client state** (theme, auth, filters, UI toggles) | **Zustand** (simpler) or **Redux Toolkit** (larger teams with established patterns) | Zustand: < 1KB, no boilerplate, hooks-based. Redux: ecosystem, middleware, devtools |
| **URL state** (search params, pagination, filters shareable via URL) | Next.js `useSearchParams` / `useRouter` | Shareable via link; back button works; SSR-friendly |
| **Context-dependent state** (narrow scope, theme) | React Context | Only for values that rarely change (every consumer re-renders) |
| **Cross-tab state** (auth across tabs) | BroadcastChannel API or localStorage event | Sync state between browser tabs without polling |
| **Optimistic UI** (like button, save indicator) | React Query's `onMutate` or React 19 `useOptimistic` | Show result before server confirms; rollback on error |

**Golden Rule:** Distinguish **server state** (data from the API — cached, stale, refetchable) from **client state** (UI toggles, form drafts). Most bugs come from treating server state as client state, or vice versa.

---

## 7. Performance Optimization Checklist

| # | Check | Tool / Technique |
|---|-------|------------------|
| 1 | ✗ Audit Core Web Vitals | Lighthouse, PageSpeed Insights, Web Vitals library |
| 2 | ✗ Measure and set bundle size budgets | Webpack/Rspack `performance.budget`, Bundle Analyzer |
| 3 | ✗ Code split at route level | `React.lazy` + `Suspense`, Next.js automatic route splitting |
| 4 | ✗ Lazy load below-fold images | `loading="lazy"`, Intersection Observer |
| 5 | ✗ Use modern image formats | WebP, AVIF with `<picture>` fallbacks |
| 6 | ✗ Tree-shake and dead-code eliminate | ES Modules (not CommonJS), `sideEffects: false` in package.json |
| 7 | ✗ Optimize re-renders (measure first!) | React DevTools Profiler → only memoize hot paths |
| 8 | ✗ Virtualize long lists | `react-window`, `@tanstack/virtual` — thousands of items |
| 9 | ✗ Prefetch critical resources | `<link rel="preload">`, Next.js `<Link prefetch>` |
| 10 | ✗ Monitor in production | Lighthouse CI in CI/CD, Web Vitals to analytics (GA4, Datadog) |

---

## 8. React Rendering Rules — When Does React Re-render?

| Trigger | Re-renders... | Does NOT re-render... |
|---------|---------------|----------------------|
| **State change** (`setState`) | Component + all children (unless memoized) | N/A — always triggers |
| **Parent re-renders** | All children | Children wrapped in `React.memo` with unchanged props |
| **Context value changes** | All consumers of that context | Components that don't call `useContext(thatContext)` |
| **Props change (reference)** | Component + children | `React.memo` components (shallow compare) |
| **Hooks dependency change** | N/A — effect/callback runs but this doesn't directly cause re-render | The hook's return value is used by the component |
| **forceUpdate** | Always | N/A |

**Key Insight:** React's default behavior is "re-render everything." Optimization is about carving out islands of stability using `React.memo`, `useMemo`, and `useCallback`. A re-render is cheap in React — it creates a Virtual DOM tree in memory. The expensive part is **committing to the real DOM**, which React avoids if the VDOM diff shows no changes.

---

## 9. Common Bug Patterns & Fixes

| Bug Pattern | Symptoms | Root Cause | Fix |
|-------------|----------|------------|-----|
| **Stale Closure** | Callbacks see old state/props values | Effect captures values on creation, interval/event listener never updates | Use `useRef` to store latest value; read `ref.current` in callback |
| **Infinite useEffect** | Component re-renders in an endless loop | Effect sets state that's in the dependency array, causing re-run | Check deps; use functional updater `setState(prev => ...)`; remove unnecessary deps |
| **index as key** | Wrong items re-render/animations break on list reorder | React identifies items by key; reorder changes indices, React thinks everything changed | Use stable unique IDs (database ID, `crypto.randomUUID()`) |
| **Missing cleanup** | Memory leaks, duplicate intervals, zombie event listeners | `setInterval` / `addEventListener` without cleanup function | Return cleanup from `useEffect`: `return () => clearInterval(id)` |
| **setState on unmounted** | Warning: "Can't perform a React state update on an unmounted component" | Async operation resolves after component unmounts | Use `AbortController` to cancel fetch; check mounted ref before setState |
| **Object/Array as dep** | Effect runs on every render | New reference created each render `useEffect(fn, [{...}])` | Memoize with `useMemo`; use primitive deps; or use `useRef` for comparison |
| **Race condition** | Stale response overwrites latest request | Multiple async calls: later one resolves before earlier one | Track request ID; ignore response if ID doesn't match latest; use `AbortController` |

---

## 10. Interview Day Checklist

### The Night Before
- [ ] 8 hours of sleep — being sharp matters more than one more practice problem
- [ ] Charge laptop, phone, headphones
- [ ] Prepare backup internet (phone hotspot)
- [ ] Review your 8 STAR stories (15 min, not 3 hours)
- [ ] Research the company one more time: recent news, product launches, tech blog posts

### Morning Of
- [ ] Eat a proper breakfast — protein, not just caffeine
- [ ] 10 minutes of vocal warmup (talk aloud, even to yourself — get the rust off)
- [ ] Arrive 15 minutes early (virtual: log in 5 min early, test audio/video)
- [ ] No studying in the last hour — you know the material; let it settle

### Your Setup
- [ ] Quiet, well-lit room (face the light, not the window behind you)
- [ ] Eye-level camera (laptop on books if needed)
- [ ] Wired headphones (Bluetooth can fail mid-interview)
- [ ] Water nearby (dry mouth = nervous voice)
- [ ] Notepad + pen (for system design — draw before you speak)
- [ ] Close all apps except: code editor, browser, video call

### During the Interview
- [ ] Smile when you greet the interviewer — sets a positive tone
- [ ] For every question: clarify before answering (repeat it back: "So you're asking about X — let me make sure I understand...")
- [ ] Think aloud — silence is the enemy of a good interview; narrate your thought process
- [ ] If stuck: "Let me think about the edge cases first" or "I'll start with a brute force solution and optimize"
- [ ] Own your mistakes: "You're right, that wouldn't handle the edge case. Let me adjust..."
- [ ] Ask at least 2 questions at the end (from the HR round list)

### After the Interview
- [ ] Send a thank-you email within 2 hours (brief, specific — mention one thing you discussed)
- [ ] Write down EVERY question you were asked (for next time)
- [ ] Don't obsess over what you could have said differently — move on to the next one
- [ ] If rejected: ask for feedback (some companies give it), identify the weak area, practice, reapply in 6-12 months
