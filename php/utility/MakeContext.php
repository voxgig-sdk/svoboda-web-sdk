<?php
declare(strict_types=1);

// SvobodaWeb SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class SvobodaWebMakeContext
{
    public static function call(array $ctxmap, ?SvobodaWebContext $basectx): SvobodaWebContext
    {
        return new SvobodaWebContext($ctxmap, $basectx);
    }
}
