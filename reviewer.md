
# Tech Stack Reviewer: From Beginner to Pro

Welcome! This guide is designed to take you from the fundamentals to a solid understanding of the technologies used in this portfolio project. We'll treat you like a beginner but move quickly, because you're a fast learner. Let's dive in.

The stack is:
- **React:** For building the user interface with components.
- **TypeScript:** For making our JavaScript code robust and error-free.
- **Tailwind CSS:** For styling our application quickly and responsively.

---

## Part 1: React - The UI Foundation

React is a JavaScript library for building user interfaces. Its core idea is simple: you break down your UI into small, reusable pieces called **components**.

### JSX: Writing HTML in JavaScript

Instead of HTML, React uses JSX. It looks almost identical to HTML but it's actually JavaScript. This allows you to embed logic directly within your markup.

**Key Differences from HTML:**
- **`className` instead of `class`**: `class` is a reserved word in JavaScript.
  - `Wrong: <div class="bg-black">`
  - `Correct: <div className="bg-black">`
- **JavaScript expressions in curly braces `{}`**: You can put any JavaScript code inside them.
  - `const name = "John";`
  - `<h1>Hello, {name}</h1>` // Renders "Hello, John"
- **CamelCase for attributes**: Event handlers and attributes are written in camelCase.
  - `Wrong: <button onclick="...">`
  - `Correct: <button onClick={...}>`

### Components: The Building Blocks

Everything in this app is a component. `Hero.tsx`, `About.tsx`, `SideNav.tsx`—they are all components. A component is just a JavaScript function that returns some JSX.

```tsx
// A simple functional component
const WelcomeMessage = () => {
  return <h1>Welcome to my portfolio!</h1>;
};

// You can then use it like an HTML tag
<WelcomeMessage />
```

### Props: Passing Data to Components

Components need to be dynamic. You pass data to them using **props** (short for properties), which work just like HTML attributes. Data flows in one direction: from parent to child.

**Example from `SideNav.tsx`:**
The `SideNav` component needs to know which section is currently active. The `App` component figures this out and passes it down as a prop.

```tsx
// In App.tsx (Parent)
<SideNav activeSection={activeSection} />

// In SideNav.tsx (Child)
// The component receives props as the first argument.
const SideNav: React.FC<{ activeSection: SectionName }> = ({ activeSection }) => {
  // Now it can use `activeSection` to highlight the correct icon.
  // ...
};
```

### State: Giving Components Memory

What if a component needs to remember something that changes over time, like a counter or user input? That's what **state** is for. The `useState` Hook is how you manage state in a functional component.

**A Hook is a special function that lets you "hook into" React features.**

**How `useState` works:**
`const [value, setValue] = useState(initialValue);`
- `useState()` returns an array with two things:
    1. `value`: The current state variable.
    2. `setValue`: A function to update that state variable.
- Calling the `setValue` function tells React to re-render the component with the new value.

**Example from `Projects.tsx`:**
This component needs to remember which project slide is currently being shown.

```tsx
import React, { useState } from 'react';

const Projects: React.FC = () => {
    // Initialize the state. The first slide is index 0.
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        // Use the updater function to change the state
        setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    };

    // ... in the JSX
    // The `transform` style depends on the `currentIndex` state.
    // When `currentIndex` changes, the component re-renders and the style is updated.
    <div style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
      {/* ... slides ... */}
    </div>
    <button onClick={nextSlide}>Next</button>
};
```

### useEffect: Handling Side Effects

What if you need to do something *after* React has rendered the component? Like fetching data, setting up a subscription, or manually changing the DOM. These are called "side effects," and the `useEffect` Hook is for managing them.

**How `useEffect` works:**
`useEffect(() => { /* effect code */ }, [dependencies]);`
- The **function** you pass to `useEffect` will run after every render.
- The **dependency array `[]`** is crucial. It tells `useEffect` *when* to run.
    - `[]` (empty array): The effect runs **only once** after the initial render. Perfect for setup.
    - `[someVariable]` (with variables): The effect runs after the first render, AND any time `someVariable` changes.
    - No array (omitted): The effect runs after **every single render** (use with caution!).

**Example from `About.tsx`:**
We use `useEffect` to set up an `IntersectionObserver` to detect when the section is visible on screen. This should only happen once.

```tsx
const About: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // This code runs once after the component mounts
    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    });

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    // Optional: Return a cleanup function
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []); // The empty array [] means "only run this once".
  
  // ...
}
```

---

## Part 2: TypeScript - Supercharging JavaScript

TypeScript is JavaScript with static types. It helps you catch bugs *before* you run the code by checking that you're using the correct types of data.

### Basic Types

```ts
let name: string = "John";
let age: number = 25;
let isStudent: boolean = true;
let skills: string[] = ["React", "TypeScript"]; // An array of strings
```

### Types vs. Interfaces

Both are used to define the "shape" of an object.
- **`type`**: Good for creating unions or more complex types. We use it for `SectionName`.
  ```ts
  // From types.ts
  export type SectionName = 'home' | 'about' | 'projects' | 'skills' | 'contact';
  // A variable of type SectionName can ONLY be one of those strings.
  ```
- **`interface`**: Can be extended. Generally preferred for defining objects.
  ```ts
  // From components/Projects.tsx
  export interface Project {
      title: string;
      description: string;
      imageUrls: string[];
      technologies: string[];
  }
  ```

### Typing in React (TSX)

**1. Typing Component Props:**
We use an interface to define the shape of the `props` object. `React.FC` is a generic type that stands for "Functional Component".

```tsx
// From components/ProjectModal.tsx
interface ProjectModalProps {
  project: Project | null; // `project` can be a Project object or null
  onClose: () => void; // `onClose` is a function that returns nothing
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  // TypeScript will now error if you try to access a prop that doesn't exist,
  // or pass the wrong type of data to this component.
  // ...
};
```

**2. Typing `useState`:**
TypeScript is smart and can often infer the type. But sometimes you need to be explicit, especially with `null` or union types.

```tsx
// Type is inferred as `number`
const [count, setCount] = useState(0);

// Type must be explicitly set
const [selectedProject, setSelectedProject] = useState<Project | null>(null);
```

**3. Typing Events:**
React provides types for events like `onClick` and `onChange`.

```tsx
// From components/Contact.tsx
const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  // `e.target.value` is known to be a string
  const { name, value } = e.target;
  // ...
};

// ... in the JSX
<input onChange={handleChange} />
```

---

## Part 3: Tailwind CSS - Utility-First Styling

Tailwind CSS is a different way to think about styling. Instead of writing CSS files, you apply tiny, single-purpose "utility" classes directly in your JSX.

### Core Concepts

- **What you see is what you get**: All styles are right there in the markup.
- **No naming conventions**: Forget about `.card-title` or `.user-avatar`.
- **Responsive by design**: It's easy to change styles at different screen sizes.

**Common Utilities:**
- **Sizing**: `w-full` (width: 100%), `h-screen` (height: 100vh)
- **Spacing**: `p-4` (padding: 1rem), `m-8` (margin: 2rem)
- **Flexbox**: `flex`, `items-center`, `justify-center`, `flex-col`
- **Colors**: `bg-black` (background), `text-white` (text color)
- **Typography**: `font-bold`, `text-lg` (large text), `text-center`
- **Borders**: `border`, `rounded-lg` (rounded corners)

### Responsive Design

This is Tailwind's superpower. You use prefixes like `sm:`, `md:`, and `lg:` to apply styles only at certain breakpoints (screen sizes). It's **mobile-first**, meaning base classes (without prefixes) apply to all sizes, and prefixed classes override them on larger screens.

**Example from `About.tsx`:**
Look at the grid layout. It's a single column on small screens and a 5-column grid on large screens.

```tsx
<div className="grid grid-cols-1 lg:grid-cols-5 gap-4 sm:gap-8">
  {/* This means:
    - By default (mobile), it's a 1-column grid (`grid-cols-1`).
    - On large screens (`lg:`) and up, it becomes a 5-column grid (`grid-cols-5`).
    - The gap is `4` by default, but `8` on small screens (`sm:`) and up.
  */}
</div>
```

### State Variants (Hover, Focus, Group)

You can apply utilities conditionally with state prefixes.
- `hover:`: Applies when the mouse is over the element. `hover:bg-teal-500`.
- `focus:`: Applies when an element (like an input) is focused. `focus:border-green-400`.
- `group-hover:`: This is special. If you put a `group` class on a parent element, you can change a child element's style when the parent is hovered.

**Example from `SideNav.tsx`:**
The tooltip (`span`) is hidden by default (`opacity-0`) but becomes visible (`opacity-100`) when you hover over the parent link (`<a>`, which has the `group` class).

```tsx
<a href={href} className="group relative ...">
  {/* Icon */}
  <div>...</div>
  
  {/* Tooltip */}
  <span className="opacity-0 group-hover:opacity-100 ...">
    {label}
  </span>
</a>
```

---

## Part 4: How It All Fits Together

1.  **`index.html`**: The entry point. It has a `<div id="root"></div>`. This is where our entire React app will live. It also loads the Tailwind CSS file from a CDN.
2.  **`index.tsx`**: This file finds that `root` div and tells React to render our main `<App />` component inside it. This is the bridge between the static HTML and the dynamic React app.
3.  **`App.tsx`**: The top-level component. It acts as a container for all the page sections (`Hero`, `About`, `Projects`, etc.). It's responsible for the main layout and the scroll container logic.
4.  **`components/`**: This directory holds all our reusable building blocks.
    - **Page Sections**: `Hero.tsx`, `About.tsx`, etc.
    - **Smaller UI Elements**: `ProjectModal.tsx`, `SideNav.tsx`, `icons.tsx`.
5.  **`types.ts`**: We define shared TypeScript definitions here (like `SectionName`) to ensure consistency across the entire app. If `SideNav` and `App` both need to know what a "Section Name" is, they both import it from this single source of truth.

This component-based structure keeps our code organized, maintainable, and easy to reason about. Each piece has a single responsibility, and they all compose together to create the final application.

---

## Review Challenges

Test your knowledge with these small tasks.

1.  **React:** Create a new component called `Greeting.tsx` that accepts a `name` prop (a string). It should display a `p` tag that says "Hello, [name]!". Now, add a button to this component. When clicked, it should change the text to "You clicked the button!". (This tests props, state, and event handling).

2.  **TypeScript:** Define an `interface` for a `BlogPost`. It should have a `title` (string), `author` (string), `publishedDate` (Date), and an optional `tags` property (an array of strings).

3.  **Tailwind CSS:** Write the JSX for a `div` that is a card. It should have:
    - A light gray background (`bg-gray-800`).
    - Rounded corners (`rounded-lg`).
    - A border (`border`).
    - Padding on all sides (`p-6`).
    - On hover, the border color should change to teal (`hover:border-teal-400`).
    - On medium screens and up, the padding should be larger (`md:p-8`).
