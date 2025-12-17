<?php
/**
 * Plugin Name: Oppijan Korp
 * Description: Loads the Oppijan Korp React app into WordPress only when the shortcode is used.
 * Version: 1.3
 * Author: Daniel Radice
 */

function oppijan_korp_enqueue_assets() {
    $plugin_dir = plugin_dir_path(__FILE__);
    $plugin_url = plugin_dir_url(__FILE__);
    $manifest_path = $plugin_dir . 'dist/.vite/manifest.json';

    if (!file_exists($manifest_path)) {
        return;
    }

    $manifest = json_decode(file_get_contents($manifest_path), true);

    $entry = $manifest['index.html'] ?? null;

    if (!$entry) {
        return;
    }

    // Enqueue CSS files (if any)
    if (!empty($entry['css'])) {
        foreach ($entry['css'] as $css_file) {
            wp_enqueue_style(
                'oppijan-korp-style',
                $plugin_url . 'dist/' . $css_file,
                array(),
                null
            );
        }
    }

    // Enqueue JS bundle
    wp_enqueue_script(
        'oppijan-korp-script',
        $plugin_url . 'dist/' . $entry['file'],
        array(),
        null,
        true
    );
}

function oppijan_korp_shortcode() {
    // Load scripts only when shortcode is actually used
    add_action('wp_enqueue_scripts', 'oppijan_korp_enqueue_assets');

    // The mounting point for the React app - matches VITE_MOUNT_ELEMENT_ID in .env.wordpress
    return '<div id="oppijan-korp-app"></div>';
}
add_shortcode('oppijan-korp', 'oppijan_korp_shortcode');
