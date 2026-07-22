<?php
declare(strict_types=1);

// SvobodaWeb SDK utility: result_body

class SvobodaWebResultBody
{
    public static function call(SvobodaWebContext $ctx): ?SvobodaWebResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
