<?php
/*
Plugin Name: Interactive Travel Pictures
Version:     1.0
Author:      Hatlas Vision
Author URI:  https://hatlasvision.com/interactive-pictures
Description: Track Travel pictures performance across your website from your dashboard. Add Locations and Booking buttons to your pictures. Generate more Clicks and Bookings automatically. 
Text Domain: hatlas-travel
Domain Path: /languages
License: GPLv2 or later
*/

defined( 'ABSPATH' ) or die();
define( 'HATLAS_TRAVEL_VER', '1.0' );

if ( ! class_exists( 'Hatlas_Travel' ) ) {
	class Hatlas_Travel {
		public static function getInstance() {
			if ( self::$instance == null ) {
				self::$instance = new self();
			}
			return self::$instance;
		}

		private static $instance = null;

		private function __clone() { }

		private function __wakeup() { }

		private function __construct() {
			// Properties
			$this->options = null;
			$this->plugin_bn = plugin_basename( __FILE__ );

			// Hooks
			add_filter( 'plugin_action_links_' . $this->plugin_bn, array( $this, 'add_settings_link' ) );
			add_filter( 'plugin_action_links_' . $this->plugin_bn, array( $this, 'add_prem_link' ) );
			add_action( 'admin_init', array( $this, 'register_plugin_settings' ) );
			add_action( 'admin_menu', array( $this, 'add_options_menu' ) );
			add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_assets' ) );
		}

		public function add_settings_link( $links ) {
			array_push( $links, '<a href="' . admin_url( 'admin.php?page=hatlas-travel' ) . '">' . __( 'Settings', 'hatlas-travel' ) . '</a>' );
			return $links;
		}
	
		public function add_prem_link( $links ) {
			$affiliate_id = ( int ) $this->get_option( 'affiliate_id');
			if ( $affiliate_id == 0 || $affiliate_id == 2) {
				
				array_push( $links, '<a style="color: #e5492f" href="' . admin_url( 'admin.php?page=hatlas-travel' ) . '"><b>ADD ID</b></a>' );
			return $links;
				
			}
			
			else {
				array_push( $links, '<a style="color: #e5492f" href="https://hatlasvision.com/dashboard/" target="_blank"><b>MY DASHBOARD</b></a>' );
			return $links;
				
			}
		
			
		}
		
		public function register_plugin_settings() {
			register_setting( 'hatlas_travel_optsgroup', 'hatlas_travel_options' );
		}

		public function add_options_menu() {
			add_options_page(
				__( 'Hatlas Travel', 'hatlas-travel' ),
				__( 'Hatlas Travel', 'hatlas-travel' ),
				'manage_options',
				'hatlas-travel',
				array( $this, 'add_options_page' )
			);
		}

		public function add_options_page() {
			require( dirname( __FILE__ ) . DIRECTORY_SEPARATOR . 'options.php' );
		}

		public function enqueue_assets() {
			// Check for "Enabled" status
			$enabled = ( int ) $this->get_option( 'enabled', 1 );
			if ( ! $enabled ) return;
			
			// Check Pages exclusion rules
			$pages = ( array ) $this->get_option( 'pages', array() );

			if ( in_array( 'home', $pages ) && is_home() ) return;

			if ( in_array( 'front', $pages ) && is_front_page() ) return;

			if ( in_array( 'search', $pages ) && is_search() ) return;

			if ( in_array( 'author', $pages ) && is_author() ) return;

			if ( in_array( 'archive', $pages ) && is_archive() ) return;

			// Check Post Types exclusion rules
			$post_types = ( array ) $this->get_option( 'post_types', array() );

			if ( in_array( 'page', $post_types ) && is_page() ) {
				if ( ! is_home() && ! is_front_page() && ! is_search() && ! is_author() && ! is_archive() ) return;
			}

			if ( ! empty( $post_types ) && is_singular( $post_types ) ) return;

			// Check URL exclusion rules
			$strings = trim( $this->get_option( 'url_strings' ) );
			if ( $strings != '' ) {
				$request_uri = preg_replace( '/\?.*$/', '', $_SERVER['REQUEST_URI'] );
				$strings = preg_split( '/\s*\r?\n\s*/', $strings );
				foreach( $strings as $string ) {
					if ( strpos( $request_uri, $string ) != false ) return;
				}
			}

			// Css classes exclusion rules
			$parent_css_classes = trim( $this->get_option( 'parent_css_classes' ) );
			$parent_css_classes = preg_split( '/\s*\r?\n\s*/', $parent_css_classes );
			$css_classes = trim( $this->get_option( 'css_classes' ) );
			$css_classes = preg_split( '/\s*\r?\n\s*/', $css_classes );
			
			// affiliate id
			
			$affiliate_id = ( int ) $this->get_option( 'affiliate_id');
			
			if ( $affiliate_id == 0 ) {
				
				$affiliate_id = 2;
			}
			
			// btn color
			
			$color_btn = $this->get_option('color_btn');
			
			if (empty($color_btn)) {
				
				$color_btn = '#E5492F';
			}
			
			// hover param
			
			$is_hover = ( int ) $this->get_option('hover', 1);
			
			

			// Enqueue assets
			wp_enqueue_style( 'hatlas-travel', plugins_url( 'css/style.css', __FILE__ ), array(), HATLAS_TRAVEL_VER, 'all' );
			wp_enqueue_script( 'jquery-v-2', 'http://code.jquery.com/jquery-2.1.3.min.js', false );
			wp_enqueue_script( 'hatlas-travel', 'https://www.hatlastravel.com/getpictures/script/' . $affiliate_id . '', false );
			wp_localize_script( 'hatlas-travel', 'hatlasTravelData', array(
				'parentCssClasses' => $parent_css_classes,
				'cssClasses' => $css_classes,
				'affiliate_id' => $affiliate_id,
				'is_hover' => $is_hover,
				'color_btn' => $color_btn
			) );
		}

		private function get_option( $option_name, $def = '' ) {
			if ( is_null( $this->options ) ) {
				$this->options = ( array ) get_option( 'hatlas_travel_options', array() );
			}
			return isset( $this->options[$option_name] ) ? $this->options[$option_name] : $def;
		}

		private function get_post_types() {
			return get_post_types(
				array(
					'public'   => true,
					'_builtin' => true
				),
				'objects',
				'and'
			);
		}
	}
}
Hatlas_Travel::getInstance();