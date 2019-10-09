<?php

namespace Drupal\onesearch_feeds_8\Controller;

use Drupal\Core\Controller\ControllerBase;

class OnesearchFeeds8Controller extends ControllerBase {

    public function render_page() {
        $config = \Drupal::config('onesearch_feeds_8.searchoptionsettings');

        
        $books_enabled = $config->get('onesearch_feeds_8_books_enabled');
        $journal_enabled = $config->get('onesearch_feeds_8_catalogue_enabled');
        $formats_enabled = $config->get('onesearch_feeds_8_formats_enabled');
        $guides_enabled = $config->get('onesearch_feeds_8_guides_enabled');

        $admin_config = \Drupal::config('onesearch_feeds_8.adminsettings');
        $items_per_block = $admin_config->get('onesearch_feeds_8_number_of_articles');
        $libguides_site_id = $admin_config->get('onesearch_feeds_8_libguides_site_id');
        $libguides_api_key = $admin_config->get('onesearch_feeds_8_libguides_api_key');
        $libguides_group_id = $admin_config->get('onesearch_feeds_8_libguides_group_id');

        return [
            '#attached' => [
                'drupalSettings' => ['items_per_block' => $items_per_block, 'books_enabled' => $books_enabled, 'journal_enabled' => $journal_enabled, 'guides_enabled' => $guides_enabled, 'formats_enabled' => $formats_enabled, 'libguides_site_id' => $libguides_site_id, 'libguides_api_key' => $libguides_api_key, 'libguides_group_id' => $libguides_group_id ],
                'library' =>  ['onesearch_feeds_8/react-dev', 'onesearch_feeds_8/onesearch']
            ],
            '#theme' => 'onesearch_results'
        ];
    }
}