<?php

namespace Drupal\onesearch_feeds_8\Controller;

use Drupal\Core\Controller\ControllerBase;

class OnesearchFeeds8Controller extends ControllerBase {

    public function render_page() {
        return [
            '#attached' => [
                'library' =>  ['onesearch_feeds_8/react-dev', 'onesearch_feeds_8/onesearch']
            ],
            '#theme' => 'onesearch_results'
        ];
    }
}