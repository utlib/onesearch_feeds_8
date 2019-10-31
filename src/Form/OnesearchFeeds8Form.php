<?php

namespace Drupal\onesearch_feeds_8\Form;

use Drupal\Core\Form\ConfigFormBase;
use Drupal\Core\Form\FormStateInterface;

class OnesearchFeeds8Form extends ConfigFormBase {
    protected function getEditableConfigNames() {
        return array(
          'onesearch_feeds_8.adminsettings',
        );
      }

    /**
    * {@inheritdoc}
    */
    public function getFormId() {
        return 'onesearch_feeds_8_form';
    }

    /**  
     * {@inheritdoc}  
     */  
    public function buildForm(array $form, FormStateInterface $form_state) {  
        $config = $this->config('onesearch_feeds_8.adminsettings');  
        $form['onesearch_feeds_8_is_local_env'] = array( 
            '#title' => $this->t('Running drupal sites in localhost?'),  
            '#type' => 'checkbox',
            '#default_value' => $config->get('onesearch_feeds_8_is_local_env',0),
            '#description' => $this->t('Check if doing local development'), 
        );
        $form['onesearch_feeds_8_number_of_articles'] = [  
            '#type' => 'number',  
            '#title' => $this->t('Number of results to show'),  
            '#description' => $this->t('Set the number of records to be returned for this feed.'),  
            '#size' => 2,
            '#maxlength' => 2,
            '#default_value' => $config->get('onesearch_feeds_8_number_of_articles'),  
            '#required' => TRUE
        ]; 

        $form['onesearch_feeds_8_drupal_content_types'] = [  
            '#type' => 'textfield',  
            '#title' => $this->t('Drupal Content Type'),  
            '#description' => $this->t('A comma seperated list of content types to filter on eg: page, library'),  
            '#size' => 92,
		    '#maxlength' => 1024,
            '#default_value' => $config->get('onesearch_feeds_8_drupal_content_types','Pages'),  
            '#required' => TRUE
        ];  

        $form['onesearch_feeds_8_libguides_api_key'] = array (
            '#type' => 'textfield',
            '#title' => t('LibGuides API Key'),
            '#default_value' => $config->get('onesearch_feeds_8_libguides_api_key', ''),
            '#size' => 92,
            '#maxlength' => 92,
            '#description' => t('Our libGuides API Key'),
            '#required' => TRUE
        );
    
        $form['onesearch_feeds_8_libguides_site_id'] = array (
            '#type' => 'textfield',
            '#title' => t('LibGuides Site ID'),
            '#default_value' => $config->get('onesearch_feeds_8_libguides_site_id', ''),
            '#size' => 92,
            '#maxlength' => 92,
            '#description' => t('Our libGuides Site ID'),
            '#required' => TRUE
        );
    
        $form['onesearch_feeds_8_libguides_group_id'] = array (
            '#type' => 'textfield',
            '#title' => t('LibGuides Group ID'),
            '#default_value' => $config->get('onesearch_feeds_8_libguides_group_id', ''),
            '#size' => 10,
            '#maxlength' => 10,
            '#description' => t('Our libGuides Group ID')
        );
    
        $form['onesearch_feeds_8_search_within_library'] = array( 
            '#title' => t('Enable option to limit catalogue search results from this library only'),  
            '#type' => 'checkbox',
            '#default_value' => $config->get('onesearch_feeds_8_search_within_library',0),
            '#description' => t('For library sites only')
        );
        $form['onesearch_feeds_8_library_id'] = array(
            '#title' => t('Endeca Library ID'),  
            '#type' => 'textfield',
            '#size' => '15',
            '#states' => [
                'visible' => [
                    ':input[name="limit_search_library"]' => array('checked' => TRUE)
                ]
            ],
            '#default_value' => $config->get('onesearch_feeds_8_library_id', 0)
        );

        return parent::buildForm($form, $form_state);  
    }  

    /**
     * {@inheritdoc}
     */
    public function submitForm(array &$form, FormStateInterface $form_state) {
        parent::submitForm($form, $form_state);
        $this->config('onesearch_feeds_8.adminsettings')
        ->set('onesearch_feeds_8_number_of_articles', $form_state->getValue('onesearch_feeds_8_number_of_articles'))
        ->set('onesearch_feeds_8_is_local_env', $form_state->getValue('onesearch_feeds_8_is_local_env'))
        ->set('onesearch_feeds_8_drupal_content_types', $form_state->getValue('onesearch_feeds_8_drupal_content_types'))
        ->set('onesearch_feeds_8_libguides_api_key', $form_state->getValue('onesearch_feeds_8_libguides_api_key'))
        ->set('onesearch_feeds_8_libguides_site_id', $form_state->getValue('onesearch_feeds_8_libguides_site_id'))
        ->set('onesearch_feeds_8_libguides_group_id', $form_state->getValue('onesearch_feeds_8_libguides_group_id'))
        ->set('onesearch_feeds_8_search_within_library', $form_state->getValue('onesearch_feeds_8_search_within_library'))
        ->set('onesearch_feeds_8_library_id', $form_state->getValue('onesearch_feeds_8_library_id'))
        ->save();
    }
}