# Task 1 - Questions & Answers

### How use() is implemented
I used React 19’s new `use()` API inside `ProductList.tsx` to read the product data directly from `productsPromise`. Instead of the old pattern where you need a `useEffect` hook, a `loading` state, and an `error` state, `use()` lets you unwrap the Promise right in the component body. When the request is still pending, it automatically tells React to pause rendering and show our Suspense fallback. Once the data resolves, it just returns the products array so we can map over it cleanly.

---

### How <Suspense> is used
In `App.tsx`, I wrapped the `<ProductList>` component with `<Suspense fallback={<LoadingFallback />}>`. Because `ProductList` uses the `use()` hook to fetch data, React suspends the component while the network request is inflight. While waiting, Suspense automatically displays our loading fallback, which shows 8 simple skeleton cards. This keeps the layout intact and prevents the screen from jumping around once the real cards show up. It gives users immediate visual feedback without having to write manual `if (isLoading)` checks all over the place.

---

### How useActionState() is used
I used `useActionState()` in `RegisterForm.tsx` to handle user registration without writing a standard `onSubmit` function. You hook it up directly to `<form action={formAction}>`. Inside the action function, I grab the form fields using native `FormData`, run basic checks on the name, email, and password, and simulate a short network delay with `setTimeout`. If any input is invalid, it returns error messages right into the form state. When valid, it saves the user into our React Context and marks the submission as successful.

---

### How useFormStatus() is used
I used `useFormStatus()` inside a child component called `SubmitButton`. Since React rules say `useFormStatus` must be called from a component nested inside the form, putting it directly in `SubmitButton` lets it tap into the parent form's submission status. It gives us a `pending` boolean that turns true while our async action is running. I used `pending` to disable the button so users can’t double-click it, and changed the button text from "Register" to "Registering..." so they clearly see something is happening.

---

### How Context is implemented using React 19 syntax
For the user state, I created an `AuthProvider` using React 19’s new Context syntax. In earlier versions of React, you had to write `<AuthContext.Provider value={...}>`, but React 19 lets you render `<AuthContext value={...}>` directly. It stores the logged-in user object and a `logout` function. To read the context, I wrote a custom `useAuth()` hook that calls React 19's `use(AuthContext)` instead of the older `useContext`. This makes setting up and consuming global state feel much cleaner and gets rid of unnecessary wrapper boilerplate.

---

### Which Asset Loading APIs were selected and why
I chose `preconnect()` and `preload()` from `react-dom` because they solve our two biggest network bottlenecks. First, `preconnect()` is called in `App.tsx` for `dummyjson.com` and its CDN, which gets the DNS lookup and SSL handshake out of the way before we even make requests. Second, in `ProductList.tsx`, I used `preload()` on the first 4 product image thumbnails. Since those are the cards users see first above the fold, preloading them ensures they start downloading immediately, making the initial page load feel much snappier.

---

### How Document Metadata is implemented
In React 19, you can just drop `<title>` and `<meta>` tags right into your components and React automatically hoists them up to the `<head>` of the page. In `App.tsx`, I added `<title>Mini E-Commerce Store – Products</title>` and a description meta tag. I also used this in `ProductList.tsx` to dynamically update the description with the actual product count once loaded, and in `LoadingFallback` and `ErrorBoundary` to show loading and error titles. It replaces packages like `react-helmet` completely with standard JSX.
