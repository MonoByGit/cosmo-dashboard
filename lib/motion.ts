/**
 * COSMO Motion Design System
 * 
 * Apple-inspired motion constants and utilities for smooth, juicy animations.
 * All timings in milliseconds, all easings use cubic-bezier curves.
 */

// Core timing values (fast and confident)
export const DURATION = {
    instant: 100,   // Micro-feedback (checkbox, button press)
    fast: 200,      // Most hover states and interactions
    normal: 300,    // Card movements, slides
    slow: 500,      // Page transitions, complex animations
} as const;

// Stagger delays for sequential animations
export const STAGGER = {
    cards: 80,      // Between dashboard cards on load
    list: 60,       // Between list items (tasks, emails)
    badges: 40,     // Between small elements (badges, chips)
} as const;

// Apple-style easing curves
export const EASE = {
    // Signature ease-out with slight overshoot (bouncy, confident)
    spring: [0.34, 1.56, 0.64, 1] as const,

    // Smooth deceleration (most common)
    out: [0.16, 1, 0.3, 1] as const,

    // Gentle acceleration
    in: [0.4, 0, 1, 1] as const,

    // Balanced in-out
    inOut: [0.4, 0, 0.2, 1] as const,
} as const;

// Reusable animation variants
export const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
};

export const fadeIn = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
};

export const slideInRight = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
};

export const scaleIn = {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
};

// Stagger container helper
export const staggerContainer = (staggerDelay: number = STAGGER.list) => ({
    animate: {
        transition: {
            staggerChildren: staggerDelay / 1000, // Convert to seconds
        },
    },
});

// Card hover interaction
export const cardHover = {
    whileHover: {
        y: -4,
        scale: 1.01,
        transition: {
            duration: DURATION.fast / 1000,
            ease: EASE.out,
        },
    },
    whileTap: {
        scale: 0.99,
    },
};

// Lift effect for interactive items
export const liftHover = {
    whileHover: {
        y: -2,
        transition: {
            duration: DURATION.fast / 1000,
            ease: EASE.out,
        },
    },
};

// Pulse animation for attention
export const pulse = {
    animate: {
        scale: [1, 1.05, 1],
        opacity: [1, 0.8, 1],
    },
    transition: {
        duration: 1,
        repeat: 2,
        ease: "easeInOut",
    },
};

// Typing indicator dots
export const typingDot = (index: number) => ({
    animate: {
        y: [0, -8, 0],
        opacity: [0.4, 1, 0.4],
    },
    transition: {
        duration: 1.2,
        repeat: Infinity,
        delay: index * 0.15,
        ease: "easeInOut",
    },
});

// Chat bubble entrance
export const chatBubble = {
    initial: { opacity: 0, y: 20, scale: 0.95 },
    animate: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: DURATION.normal / 1000,
            ease: EASE.spring,
        },
    },
};

// Task completion animation
export const taskComplete = {
    checked: {
        opacity: 0.5,
        x: 8,
        transition: {
            duration: DURATION.normal / 1000,
            ease: EASE.out,
        },
    },
    unchecked: {
        opacity: 1,
        x: 0,
    },
};

// Checkbox bounce
export const checkboxBounce = {
    scale: [1, 1.2, 1],
    transition: {
        duration: DURATION.fast / 1000,
        ease: EASE.spring,
    },
};

// Default transition for most animations
export const defaultTransition = {
    duration: DURATION.normal / 1000,
    ease: EASE.out,
};

// Spring transition for bouncy effects
export const springTransition = {
    duration: DURATION.normal / 1000,
    ease: EASE.spring,
};
