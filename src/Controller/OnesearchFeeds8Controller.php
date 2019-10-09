<?php

namespace Drupal\onesearch_feeds_8\Controller;

use Drupal\Core\Controller\ControllerBase;

class OnesearchFeeds8Controller extends ControllerBase {

    public function render_page() {
        $config = \Drupal::config('onesearch_feeds_8.searchoptionsettings');

        $books_enabled = $config->get('onesearch_feeds_8_books_enabled');
        $journal_enabled = $config->get('onesearch_feeds_8_catalogue_enabled');
        $formats_enabled = $config->get('onesearch_feeds_8_formats_enabled');

        return [
            '#attached' => [
                'drupalSettings' => ['books_enabled' => $books_enabled, 'journal_enabled' => $journal_enabled, 'formats_enabled' => $formats_enabled],
                'library' =>  ['onesearch_feeds_8/react-dev', 'onesearch_feeds_8/onesearch']
            ],
            '#theme' => 'onesearch_results'
        ];
    }
}