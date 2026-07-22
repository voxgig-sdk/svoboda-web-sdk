<?php
declare(strict_types=1);

// SvobodaWeb SDK utility: prepare_body

class SvobodaWebPrepareBody
{
    public static function call(SvobodaWebContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
