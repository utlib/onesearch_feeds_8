<?php

namespace Drupal\onesearch_feeds_8\Form;

use Drupal\Core\Form\ConfigFormBase;
use Drupal\Core\Form\FormStateInterface;

class OnesearchFeeds8SearchOptionsForm extends ConfigFormBase {
    protected function getEditableConfigNames() {
        return array(
          'onesearch_feeds_8.searchoptionsettings',
        );
      }

    /**
    * {@inheritdoc}
    */
    public function getFormId() {
        return 'onesearch_feeds_8_search_options_form';
    }

    /**  
     * {@inheritdoc}  
     */  
    public function buildForm(array $form, FormStateInterface $form_state) {  
        $config = $this->config('onesearch_feeds_8.searchoptionsettings');  
        $form['books'] = array (
            '#type' => 'fieldset',
            '#title' => 'Books',
            '#collapsible' => TRUE
        );
    
        $form['books']['books_enabled'] = array( 
            '#type' => 'checkbox',
            '#title' => 'Enabled?',
            '#default_value' => $config->get('books_enabled',0)
        );
    
        $form['summon'] = array (
            '#type' => 'fieldset',
            '#title' => 'Summon',
            '#collapsible' => TRUE
        );
    
        $form['summon']['summon_enabled'] = array( 
            '#type' => 'checkbox',
            '#title' => 'Enabled?',
            '#default_value' => $config->get('summon_enabled',0)
        );
    
        $form['catalogue'] = array (
            '#type' => 'fieldset',
            '#title' => 'Journals and Databases',
            '#collapsible' => TRUE
        );
    
        $form['catalogue']['catalogue_enabled'] = array( 
            '#type' => 'checkbox',
            '#title' => 'Enabled?',
            '#default_value' => $config->get('catalogue_enabled',0)
        );
    
        $form['guides'] = array (
            '#type' => 'fieldset',
            '#title' => 'Research Guides',
            '#collapsible' => TRUE
        );
    
        $form['guides']['guides_enabled'] = array( 
            '#type' => 'checkbox',
            '#title' => 'Enabled?',
            '#default_value' => $config->get('guides_enabled',0)
        );
    
        $form['formats'] = array (
            '#type' => 'fieldset',
            '#title' => 'Formats',
            '#collapsible' => TRUE
        );
    
        $form['formats']['formats_enabled'] = array( 
            '#type' => 'checkbox',
            '#title' => 'Enabled?',
            '#default_value' => $config->get('formats_enabled',0)
        );
    
        $form['answers'] = array (
            '#type' => 'fieldset',
            '#title' => 'Library FAQs',
            '#collapsible' => TRUE
        );
    
        $form['answers']['answers_enabled'] = array( 
            '#type' => 'checkbox',
            '#title' => 'Enabled?',
            '#default_value' => $config->get('answers_enabled',0)
        );
    
    
        $form['drupal'] = array (
            '#type' => 'fieldset',
            '#title' => 'Drupal Web Search',
            '#collapsible' => TRUE
        );
    
        $form['drupal']['drupal_enabled'] = array( 
            '#type' => 'checkbox',
            '#title' => 'Enabled?',
            '#default_value' => $config->get('drupal_enabled',0)
        );
    
        return parent::buildForm($form, $form_state);  
    }
}