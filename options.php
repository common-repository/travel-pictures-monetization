<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}
?>
<style type="text/css">
	.hatlas-travel-wrap textarea {
		width: 100%;
	}
</style>
<div class="wrap hatlas-travel-wrap">
<h1><?php _e( 'Hatlas Travel - Options', 'hatlas-travel' ); ?></h1>
<form method="post" action="options.php">
	<?php settings_fields( 'hatlas_travel_optsgroup' ); ?>
	<?php do_settings_sections( 'hatlas_travel_optsgroup' ); ?>
	<table class="form-table">
		<tr valign="top">
			<a href="https://hatlasvision.com/dashboard" target="_blank"> 👉  GO TO YOUR HATLAS VISION DASHBOARD</a>
			
		</tr>
		<tr valign="top">
			<th scope="row"><?php _e( 'Enabled', 'hatlas-travel' ); ?></th>
			<td>
				<input type="radio" name="hatlas_travel_options[enabled]" value="1" <?php echo ( int ) $this->get_option( 'enabled', 1 ) == 1 ? 'checked' : ''; ?> /> <?php _e( 'Yes', 'hatlas-travel' ); ?><br>
				<input type="radio" name="hatlas_travel_options[enabled]" value="0" <?php echo ( int ) $this->get_option( 'enabled', 1 ) == 0 ? 'checked' : ''; ?> /> <?php _e( 'No', 'hatlas-travel' ); ?>
			</td>
		</tr>
		<tr valign="top">
			<th scope="row"><?php _e( 'Your Hatlas ID (you can find it in your <a target="_blank" href="https://hatlasvision.com/dashboard">Hatlas Vision platform</a>)', 'hatlas-travel' ); ?></th>
			<td>
				<textarea name="hatlas_travel_options[affiliate_id]" rows="1"><?php echo esc_textarea( $this->get_option( 'affiliate_id' ) ); ?></textarea>
			</td>
		</tr>
		
		
		<tr valign="top">
			<th scope="row"><?php _e( 'Skip images contained within elements matching these css classes (one per line). Wildcards are allowed, example: el-class1, el-class2, el.*, .*el', 'hatlas-travel' ); ?></th>
			<td>
				<textarea name="hatlas_travel_options[parent_css_classes]" rows="10"><?php echo esc_textarea( $this->get_option( 'parent_css_classes' ) ); ?></textarea>
			</td>
		</tr>
		<tr valign="top">
			<th scope="row"><?php _e( 'Skip images matching these css classes (one per line). Wildcards are allowed, example: image-class1, image-class2, image.*, .*thumbnail', 'hatlas-travel' ); ?></th>
			<td>
				<textarea name="hatlas_travel_options[css_classes]" rows="10"><?php echo esc_textarea( $this->get_option( 'css_classes' ) ); ?></textarea>
			</td>
		</tr>
		<tr valign="top">
			<th scope="row"><?php _e( 'Skip URLs containing these strings  (one per line)', 'hatlas-travel' ); ?></th>
			<td>
				<textarea name="hatlas_travel_options[url_strings]" rows="10"><?php echo esc_textarea( $this->get_option( 'url_strings' ) ); ?></textarea>
			</td>
		</tr>
		<tr valign="top">
			<th scope="row"><?php _e( 'Skip these pages', 'hatlas-travel' ); ?></th>
			<td>
				<?php $pages = ( array ) $this->get_option( 'pages', array() ); ?>
				<input type="checkbox" name="hatlas_travel_options[pages][]" value="home" <?php echo in_array( 'home', $pages ) ? 'checked' : ''; ?> /> <?php _e( 'Home Page', 'hatlas-travel' ); ?><br>
				<input type="checkbox" name="hatlas_travel_options[pages][]" value="front" <?php echo in_array( 'front', $pages ) ? 'checked' : ''; ?> /> <?php _e( 'Front Page', 'hatlas-travel' ); ?><br>
				<input type="checkbox" name="hatlas_travel_options[pages][]" value="search" <?php echo in_array( 'search', $pages ) ? 'checked' : ''; ?> /> <?php _e( 'Search Page', 'hatlas-travel' ); ?><br>
				<input type="checkbox" name="hatlas_travel_options[pages][]" value="author" <?php echo in_array( 'author', $pages ) ? 'checked' : ''; ?> /> <?php _e( 'Author Page', 'hatlas-travel' ); ?><br>
				<input type="checkbox" name="hatlas_travel_options[pages][]" value="archive" <?php echo in_array( 'archive', $pages ) ? 'checked' : ''; ?> /> <?php _e( 'Archive Page', 'hatlas-travel' ); ?><br>
			</td>
		</tr>
		<tr valign="top">
			<th scope="row"><?php _e( 'Skip these post types', 'hatlas-travel' ); ?></th>
			<td>
				<?php $post_types = ( array ) $this->get_option( 'post_types', array() ); ?>
				<?php foreach( $this->get_post_types() as $post_type ) : ?>
					<input type="checkbox" name="hatlas_travel_options[post_types][]" value="<?php esc_attr_e( $post_type->name ); ?>" <?php echo in_array( $post_type->name, $post_types ) ? 'checked' : ''; ?> /> <?php echo $post_type->labels->singular_name; ?><br>
				<?php endforeach; ?>
			</td>
		</tr>
    </table>
    <?php submit_button(); ?>
</form>
</div>