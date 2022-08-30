<?php



function sendLeadToCRM($arLeadFields)
{
    $queryUrl = 'https://bitned.ru/rest/1/8eqh8cuzmlkwj1ds/crm.lead.add.json';
    $queryData = http_build_query(array(
        'fields' => $arLeadFields,
        'params' => array("REGISTER_SONET_EVENT" => "Y")
    ));
    $curl = curl_init();
    curl_setopt_array($curl, array(
        CURLOPT_SSL_VERIFYPEER => 0,
        CURLOPT_POST => 1,
        CURLOPT_HEADER => 0,
        CURLOPT_RETURNTRANSFER => 1,
        CURLOPT_URL => $queryUrl,
        CURLOPT_POSTFIELDS => $queryData,
    ));

    $result = curl_exec($curl);
    $result = json_decode($result, 1);
    curl_close($curl);
    // return ($result);


    $call_value = $_COOKIE['_ct_session_id']; /* ID сессии Calltouch, полученный из cookie */
    $ct_site_id = '53498';
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_HTTPHEADER, array("Content-type: application/x-www-form-urlencoded;charset=utf-8"));
    curl_setopt($ch, CURLOPT_URL,'https://api.calltouch.ru/calls-service/RestAPI/requests/'.$ct_site_id.'/register/');
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS,
        "&phoneNumber=".$_POST['tel']
        ."&subject=".urlencode('Заявка с сайта Volna Residences')
        ."".($call_value != 'undefined' ? "&sessionId=".$call_value : ""));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    $calltouch = curl_exec ($ch);
    $calltouch = json_decode($calltouch, 1)
    curl_close ($ch);

    return ($calltouch)
   

    
}



$arLeadFields = array(
    "TITLE" => 'Запрос с сайта Volna Residences ' . $_POST['tel'],
    "PHONE" => [
        ["VALUE" => htmlspecialchars($_POST['tel']), "VALUE_TYPE" => "WORK"]
    ],
    "SOURCE_ID" => 'WEB',
    "SOURCE_DESCRIPTION" => 'volnaresidences.ru', // сюда домен сайта откуда запрос шлем
    'UTM_CAMPAIGN' => $_COOKIE['utm_compaign'], // эти все значения предварительно в куки нужно сохранить
    'UTM_CONTENT' => $_COOKIE['utm_content'],
    'UTM_MEDIUM' => $_COOKIE['utm_medium'],
    'UTM_SOURCE' => $_COOKIE['utm_source'],
    'UTM_TERM' => $_COOKIE['utm_term'],
);

sendLeadToCRM($arLeadFields);