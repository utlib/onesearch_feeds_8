<?php

namespace Drupal\onesearch_feeds_8\Controller;

use Drupal\Core\Controller\ControllerBase;

class OnesearchFeeds8Controller extends ControllerBase {

    public function render_page() {
        return [
            '#theme' => 'onesearch_results'
        ];
    }
}