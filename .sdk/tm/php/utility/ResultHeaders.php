<?php
declare(strict_types=1);

// AcousticbrainzApi2 SDK utility: result_headers

class AcousticbrainzApi2ResultHeaders
{
    public static function call(AcousticbrainzApi2Context $ctx): ?AcousticbrainzApi2Result
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
