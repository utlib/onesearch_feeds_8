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
            '#default_value' => $config->get('onesearch_feeds_8_books_enabled',0)
        );
    
        $form['summon'] = array (
            '#type' => 'fieldset',
            '#title' => 'Summon',
            '#collapsible' => TRUE
        );
    
        $form['summon']['summon_enabled'] = array( 
            '#type' => 'checkbox',
            '#title' => 'Enabled?',
            '#default_value' => $config->get('onesearch_feeds_8_summon_enabled',0)
        );
    
        $form['catalogue'] = array (
            '#type' => 'fieldset',
            '#title' => 'Journals and Databases',
            '#collapsible' => TRUE
        );
    
        $form['catalogue']['catalogue_enabled'] = array( 
            '#type' => 'checkbox',
            '#title' => 'Enabled?',
            '#default_value' => $config->get('onesearch_feeds_8_catalogue_enabled',0)
        );
    
        $form['guides'] = array (
            '#type' => 'fieldset',
            '#title' => 'Research Guides',
            '#collapsible' => TRUE
        );
    
        $form['guides']['guides_enabled'] = array( 
            '#type' => 'checkbox',
            '#title' => 'Enabled?',
            '#default_value' => $config->get('onesearch_feeds_8_guides_enabled',0)
        );
    
        $form['formats'] = array (
            '#type' => 'fieldset',
            '#title' => 'Formats',
            '#collapsible' => TRUE
        );
    
        $form['formats']['formats_enabled'] = array( 
            '#type' => 'checkbox',
            '#title' => 'Enabled?',
            '#default_value' => $config->get('onesearch_feeds_8_formats_enabled',0)
        );
    
        $form['answers'] = array (
            '#type' => 'fieldset',
            '#title' => 'Library FAQs',
            '#collapsible' => TRUE
        );
    
        $form['answers']['answers_enabled'] = array( 
            '#type' => 'checkbox',
            '#title' => 'Enabled?',
            '#default_value' => $config->get('onesearch_feeds_8_answers_enabled',0)
        );
    
    
        $form['drupal'] = array (
            '#type' => 'fieldset',
            '#title' => 'Drupal Web Search',
            '#collapsible' => TRUE
        );
    
        $form['drupal']['drupal_enabled'] = array( 
            '#type' => 'checkbox',
            '#title' => 'Enabled?',
            '#default_value' => $config->get('onesearch_feeds_8_drupal_enabled',0)
        );
    
        return parent::buildForm($form, $form_state);  
    }

        /**
     * {@inheritdoc}
     */
    public function submitForm(array &$form, FormStateInterface $form_state) {
        parent::submitForm($form, $form_state);

        $this->config('onesearch_feeds_8.searchoptionsettings')
        ->set('onesearch_feeds_8_books_enabled', $form_state->getValue('books_enabled'))
        ->set('onesearch_feeds_8_summon_enabled', $form_state->getValue('summon_enabled'))
        ->set('onesearch_feeds_8_catalogue_enabled', $form_state->getValue('catalogue_enabled'))
        ->set('onesearch_feeds_8_guides_enabled', $form_state->getValue('guides_enabled'))
        ->set('onesearch_feeds_8_formats_enabled', $form_state->getValue('formats_enabled'))
        ->set('onesearch_feeds_8_answers_enabled', $form_state->getValue('answers_enabled'))
        ->set('onesearch_feeds_8_drupal_enabled', $form_state->getValue('drupal_enabled'))
        ->save();
    }
}