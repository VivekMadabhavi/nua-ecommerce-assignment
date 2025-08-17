# E-commerce Web Application (Vue.js)

This project is a mini e-commerce website built with Vue.js, Vite, Vue Router, and Pinia. It consumes the Fake Store API to display products, manage a shopping cart, and simulate a checkout flow.

## Table of Contents

- [Features](#features)
- [Live Demo](#live-demo)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Setup and Run](#setup-and-run)
- [Design Decisions and Trade-offs](#design-decisions-and-trade-offs)
- [Implemented Enhancements](#implemented-enhancements)
- [Future Enhancements](#future-enhancements)

## Features

1.  **Product Listing (`/`)**:
    *   Displays all products in a responsive grid (image, title, price).
    *   Provides a search box (filter by title with debouncing) and category dropdown (filters by category).
    *   Shows loading skeletons and handles fetch errors gracefully.
    *   Allows adding products directly to the cart from the listing.

2.  **Product Detail (`/product/:id`)**:
    *   Shows image, title, full description, price, and rating.
    *   "Add to Cart" functionality with a quantity selector (1–5).
    *   Includes a "Back to Products" button for easy navigation.
    *   Shows loading skeletons during data fetch.

3.  **Shopping Cart (`/cart`)**:
    *   Lists added items: thumbnail, title, unit price, quantity selector (1–10), subtotal.
    *   Allows item removal and quantity updates.
    *   Displays grand total and a "Proceed to Checkout" button.
    *   **Persists cart data across sessions using `localStorage`.**

4.  **Checkout (`/checkout`)**:
    *   Shows an order summary (items + total).
    *   Simple form for name, email, and address with **robust validation** (e.g., email format, required fields) and clear feedback.
    *   "Place Order" button clears the cart and displays a confirmation message.

5.  **Data Caching**:
    *   Product lists and details are cached in `localStorage` to reduce redundant API fetches and improve performance.

6.  **State Management**:
    *   Pinia is used for global application state management, specifically for the shopping cart.

## Live Demo

This application is hosted live on [Netlify](https://www.netlify.com/), offering a seamless and responsive user experience. You can access the live demo here: 

[https://nuaassignmentvivek.netlify.app](https://nuaassignmentvivek.netlify.app)

Netlify was chosen for its excellent support for Single Page Applications (SPAs) and continuous deployment capabilities, ensuring a smooth user experience even with client-side routing.

## Implemented Enhancements (Bonus Points)

*   **Persist Cart Data**: Implemented persistence for the shopping cart in `localStorage` so that items remain in the cart even after a page refresh.
*   **Enhanced UI/UX and Basic Animations**:
    *   Improved global styling with a modern font (`Roboto`), consistent color palette, and better spacing.
    *   Subtle hover animations on product cards and buttons.
    *   Smooth fade transition for route changes.
    *   Enhanced styling for input fields, buttons, and overall page layouts to be more visually appealing.
*   **Loading Skeletons**: Implemented visually appealing loading skeletons for both Product Listing and Product Detail pages to improve perceived performance during data fetching.
*   **Debounced Search Input**: Added debouncing to the product search input on the Product Listing page to prevent excessive filtering operations as the user types, improving performance.
*   **"Go Back" Button**: Added a "Back to Products" button on the Product Detail page for improved user navigation.
*   **"Add to Cart" on Product Listing Page**: Implemented the ability to add a single unit of a product directly to the cart from the product listing page, enhancing user convenience.
*   **Robust Form Validation**: Implemented more specific validation rules for the checkout form (e.g., email format) and provided clearer, dynamic feedback to the user.
*   **Refined Responsiveness**: Reviewed and adjusted styles across various components to ensure a better user experience on different screen sizes (mobile, tablet, desktop).

## Tech Stack

*   **Frontend Framework**: Vue.js 3 (with `<script setup>`)
*   **Build Tool**: Vite
*   **Routing**: Vue Router
*   **State Management**: Pinia
*   **API**: [Fake Store API](https://fakestoreapi.com/)
*   **Styling**: Plain CSS (scoped where appropriate)

## Project Structure

```
nua_assignment/
├── public/
├── src/
│   ├── assets/       # Static assets (e.g., images)
│   ├── components/   # Reusable UI components (including Skeletons)
│   ├── hooks/        # Reusable Composition API functions (e.g., useDebounce)
│   ├── pages/        # Route-specific components (views)
│   │   ├── Checkout.vue
│   │   ├── ProductDetail.vue
│   │   ├── ProductListing.vue
│   │   └── ShoppingCart.vue
│   ├── router/       # Vue Router configuration
│   │   └── index.js
│   ├── stores/       # Pinia stores for global state (e.g., cart.js)
│   │   └── cart.js
│   ├── utils/        # Utility functions (e.g., API calls with caching)
│   │   └── api.js
│   ├── App.vue         # Main application component
│   ├── main.js         # Vue app entry point
│   └── style.css       # Global styles
└── package.json
└── README.md
```

## Setup and Run

To set up and run the project locally:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/VivekMadabhavi/nua-ecommerce-assignment.git
    cd nua_assignment
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The application will be accessible at `http://localhost:5173` (or another port if 5173 is in use).

4.  **Build for production:**
    ```bash
    npm run build
    ```

5.  **Preview the production build (optional):**
    ```bash
    npm run preview
    ```

## Design Decisions and Trade-offs

1.  **Framework Choice (Vue.js)**: Vue.js 3 was chosen as the primary frontend framework for this project. Its Composition API with `<script setup>` provides a clean, efficient, and highly maintainable way to organize component logic and state. This choice aligns with best practices for building modern, performant Single Page Applications.

2.  **State Management (Pinia)**: Pinia was chosen over Vuex due to its simpler API, better TypeScript support (though not explicitly used here, it's a good practice consideration), and lighter weight. It provides a centralized store for cart management, making it easy to access and modify cart data across components.

3.  **Routing (Vue Router)**: Standard Vue Router is used for client-side navigation, enabling a Single Page Application (SPA) experience with clear routes for different sections of the e-commerce site.

4.  **Data Fetching and Caching**:
    *   `fetch` API is used for data retrieval due to its native support and simplicity for this project's scope. A more complex application might consider a library like Axios.
    *   `localStorage` is employed for basic in-memory caching of product lists and details. This reduces redundant network requests and improves perceived performance for repeat visits or navigations.
    *   **Trade-off**: `localStorage` caching is simple but has limitations:
        *   **No Cache Invalidation Strategy**: The current caching strategy is a time-based expiration (1 hour). There's no mechanism to re-fetch data immediately if the underlying API data changes before the cache expires. For dynamic data, a more robust caching solution (e.g., stale-while-revalidate) would be needed.
        *   **Limited Storage**: `localStorage` has a size limit (typically 5-10 MB), which is sufficient for this project but could be a concern for applications dealing with large amounts of cached data.
        *   **Synchronous Operations**: `localStorage` operations are synchronous, which can block the main thread for large data sets. For this project, the data size is small, so it's not a significant issue.

5.  **Error Handling and Loading States**: Basic `v-if` directives are used to display loading messages and error messages during API fetches. Loading skeletons were added to provide a smoother visual experience during data loading.

6.  **Styling**: Plain CSS with `scoped` styles is used. Global styles have been significantly enhanced to provide a modern and appealing UI. Transitions and hover effects were added for better user interaction. Responsiveness has been considered and implemented with media queries to ensure good display on various screen sizes.

## Future Enhancements (Not Implemented)

*   **User Authentication**: Add user login/registration and integrate with a backend for personalized cart and order history.
*   **Payment Gateway Integration**: Connect with a real (or simulated) payment gateway for the checkout process.
*   **Unit/E2E Testing**: Add unit tests for Pinia stores and components, and end-to-end tests for critical user flows.
*   **Accessibility (A11y)**: Improve accessibility features for users with disabilities.
*   **More Complex Animations**: Explore more advanced animations beyond simple fades and transforms for a truly dynamic UI.

## Deliverables

1.  **Functional Web Application**: A fully functional single-page e-commerce website.
2.  **Git Repository**: A public/private Git repository containing:
    *   **README**: Comprehensive `README.md` with setup/run instructions, detailed design decisions, and discussed trade-offs.
    *   **Clear Folder Structure**: Well-organized `src` directory with logical separation (e.g., `components`, `hooks`, `pages`, `router`, `stores`, `utils`).
    *   (Note: While a `tests` folder is present for structure, specific unit/E2E test files were not implemented within the scope of this assignment.)
3.  **Scripts**: Standard `npm` scripts (`npm install`, `npm run dev`, `npm run build`, `npm run preview`) for easy setup and operation.
4.  **(Optional) Highlight Bonus Enhancements**: All implemented bonus features are clearly highlighted in the `Implemented Enhancements` section of this `README.md`.
5.  **Hosted Live (Bonus Points Achieved!)**: The application is successfully deployed and accessible online via Netlify, demonstrating practical deployment skills. A live demo link is provided at the top of this README.
