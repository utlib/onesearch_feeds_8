<?php

namespace Drupal\onesearch_feeds_8\Controller;

use Drupal\Core\Controller\ControllerBase;
use Symfony\Component\HttpFoundation\JsonResponse;

class OnesearchFeeds8Controller extends ControllerBase {

    public function render_page() {
        $config = \Drupal::config('onesearch_feeds_8.searchoptionsettings');

        
        $books_enabled = $config->get('onesearch_feeds_8_books_enabled');
        $journal_enabled = $config->get('onesearch_feeds_8_catalogue_enabled');
        $formats_enabled = $config->get('onesearch_feeds_8_formats_enabled');
        $guides_enabled = $config->get('onesearch_feeds_8_guides_enabled');
        $summon_enabled = $config->get('onesearch_feeds_8_summon_enabled');

        $admin_config = \Drupal::config('onesearch_feeds_8.adminsettings');
        $items_per_block = $admin_config->get('onesearch_feeds_8_number_of_articles');
        $libguides_site_id = $admin_config->get('onesearch_feeds_8_libguides_site_id');
        $libguides_api_key = $admin_config->get('onesearch_feeds_8_libguides_api_key');
        $libguides_group_id = $admin_config->get('onesearch_feeds_8_libguides_group_id');

        return [
            '#attached' => [
                'drupalSettings' => ['items_per_block' => $items_per_block, 'summon_enabled' => $summon_enabled, 'books_enabled' => $books_enabled, 'journal_enabled' => $journal_enabled, 'guides_enabled' => $guides_enabled, 'formats_enabled' => $formats_enabled, 'libguides_site_id' => $libguides_site_id, 'libguides_api_key' => $libguides_api_key, 'libguides_group_id' => $libguides_group_id ],
                'library' =>  ['onesearch_feeds_8/react-dev', 'onesearch_feeds_8/onesearch']
            ],
            '#theme' => 'onesearch_results'
        ];
    }

    public function endeca_call($kw, $online, $title_only, $format) {
        header('Access-Control-Allow-Origin: *');  
        if ($online === 'true') {
            $n_keyword = '0+207006+'.$format;
        } else {
            $n_keyword = '0+'.$format;
        }

        if ($title_only === 'true') {
            $ntk = 'Title';
            if ($format === '6962') {
                $ntx = 'mode+matchallpartial+rel+phrase(approximate),nterms,maxfield,glom,static(Publication_year,descending)';
            } else if ($format === '206416') {
                $ntx = 'mode+matchallpartial+rel+nterms,exact,static(Online,ascending),maxfield,glom';
            } else {
                $ntx = 'mode+matchallpartial';
            }
            
        } else {
            $ntk='Anywhere';
            $ntx = 'mode+matchallpartial';
        }
    
        $url = "https://search.library.utoronto.ca/search?&Nu=p_work_normalized&N=$n_keyword&Ntx=$ntx&Np=1&Ntt=$kw&Ntk=$ntk&format=json&results=5";
    
        $ch = curl_init();
     
        //Set the URL that you want to GET by using the CURLOPT_URL option.
        curl_setopt($ch, CURLOPT_URL, $url);
        
        curl_setopt($ch, CURLOPT_USERAGENT,'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.17 (KHTML, like Gecko) Chrome/24.0.1312.52 Safari/537.17');
       curl_setopt($ch, CURLOPT_AUTOREFERER, true); 
       curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
       curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
       curl_setopt($ch, CURLOPT_VERBOSE, 1);
        //Execute the request.
        $data = curl_exec($ch);
         
        //Close the cURL handle.
        curl_close($ch);
         
        //Print the data out onto the page.
        return new JsonResponse(json_decode($data));
    }

    public function formats($kw, $online, $title_only) {
        header('Access-Control-Allow-Origin: *');  
        $kw = $_GET['kw'];
        //  Initiate curl
    
        if ($online === 'true') {
            $n_keyword = '0+207006';
        } else {
            $n_keyword = '0';
        }
    
        if ($title_only === 'true') {
            $ntk = 'Title';
        } else {
            $ntk='Anywhere';
        }
        $url = "https://search.library.utoronto.ca/search?Nu=p_work_normalized&Np=1&action=get_all_facetvals&facet=Format&format=json&Ntx=mode+matchallpartial&Ntt=dogs&N=$n_keyword&Ntk=$ntk";
        $ch = curl_init();
     
        //Set the URL that you want to GET by using the CURLOPT_URL option.
        curl_setopt($ch, CURLOPT_URL, $url);
        
        curl_setopt($ch, CURLOPT_USERAGENT,'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.17 (KHTML, like Gecko) Chrome/24.0.1312.52 Safari/537.17');
       curl_setopt($ch, CURLOPT_AUTOREFERER, true); 
       curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
       curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
       curl_setopt($ch, CURLOPT_VERBOSE, 1);
        //Execute the request.
        $data = curl_exec($ch);
         
        //Close the cURL handle.
        curl_close($ch);

        return new JsonResponse(json_decode($data));
    }

    public function summon($kw, $online, $title_only) {
        header('Access-Control-Allow-Origin: *');  

        if ($online === 'true') {
            $fulltext = '&fulltext=1';
        } else {
            $fulltext = '';
        }
    
        if ($title_only === 'true') {
            $kw = "(Title:($kw))";
        }
        $url = "https://query.library.utoronto.ca/index.php/search/json?kw=$kw&num_results=5&facet[0]=addFacetValueFilters(ContentType,Journal+Article)$fulltext";
        $ch = curl_init();
        //Set the URL that you want to GET by using the CURLOPT_URL option.
        curl_setopt($ch, CURLOPT_URL, $url);
        
        curl_setopt($ch, CURLOPT_USERAGENT,'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.17 (KHTML, like Gecko) Chrome/24.0.1312.52 Safari/537.17');
       curl_setopt($ch, CURLOPT_AUTOREFERER, true); 
       curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
       curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
       curl_setopt($ch, CURLOPT_VERBOSE, 1);
        //Execute the request.
        $data = curl_exec($ch);
         
        //Close the cURL handle.
        curl_close($ch);
         
        //Print the data out onto the page.
        return new JsonResponse(json_decode($data));
    }
}