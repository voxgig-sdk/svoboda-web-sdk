<?php
declare(strict_types=1);

// SvobodaWeb SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class SvobodaWebFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new SvobodaWebBaseFeature();
            case "test":
                return new SvobodaWebTestFeature();
            default:
                return new SvobodaWebBaseFeature();
        }
    }
}
