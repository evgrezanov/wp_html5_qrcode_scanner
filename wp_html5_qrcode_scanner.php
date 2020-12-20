<?php

/**
 * Plugin Name: wp_html5_qrcode_scanner
 * Description: MVP for Worker.nu
 * Plugin URI: https://github.com/evgrezanov/
 * Version: 1.2.0
 * Author: Evgeniy Rezanov
 * Author URI: https://github.com/evgrezanov/
 * 
 */

defined('ABSPATH') || exit;
define( 'WGFF_QRScanner_URL', plugin_dir_url( __FILE__ ) );
define( 'WGFF_QRScanner_PATH', plugin_dir_path( __FILE__ ) );
define( 'WGFF_QRScanner_VERSION', '1.2.0' );


class WGFF_QRScanner {

    public static function init(){
        // assets
        add_action('wp_enqueue_scripts', array(__CLASS__, 'asset'));
    }

    public static function asset(){
        wp_enqueue_script(
            'html5-qrcode',
            WGFF_QRScanner_URL . ('inc/html5-qrcode/minified/html5-qrcode.min.js'),
            [],
            WGFF_QRScanner_VERSION,
            false
        );

        wp_enqueue_script(
            'script',
            WGFF_QRScanner_URL . ('inc/script.js'),
            ['html5-qrcode'],
            WGFF_QRScanner_VERSION
        );
        
    }

}
WGFF_QRScanner::init();