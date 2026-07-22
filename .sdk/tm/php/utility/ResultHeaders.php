<?php
declare(strict_types=1);

// SvobodaWeb SDK utility: result_headers

class SvobodaWebResultHeaders
{
    public static function call(SvobodaWebContext $ctx): ?SvobodaWebResult
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
