/**
 * Environment-based configuration
 * Allows different settings for standalone vs WordPress builds
 */

export const config = {
  // Mount element ID - different for standalone vs WordPress
  mountElementId: import.meta.env.VITE_MOUNT_ELEMENT_ID || 'root',

  // Fetch all corpora in one Korp request (true) or one corpus at a time (false)
  fetchCorporaTogether: true,

  // Add more environment-specific configs here as needed
  // theme: {
  //   primaryColor: import.meta.env.VITE_PRIMARY_COLOR,
  // },
} as const;
