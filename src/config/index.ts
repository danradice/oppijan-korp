/**
 * Environment-based configuration
 * Allows different settings for standalone vs WordPress builds
 */

export const config = {
  // Mount element ID - different for standalone vs WordPress
  mountElementId: import.meta.env.VITE_MOUNT_ELEMENT_ID || 'root',

  // Add more environment-specific configs here as needed
  // theme: {
  //   primaryColor: import.meta.env.VITE_PRIMARY_COLOR,
  // },
} as const;
