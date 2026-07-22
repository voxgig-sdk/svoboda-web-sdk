<?php
declare(strict_types=1);

// SvobodaWeb SDK base feature

class SvobodaWebBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    // Positions this feature when added via the client `extend` option:
    // "__before__" / "__after__" / "__replace__" name an already-added
    // feature (mirrors the ts feature `_options`). Declared so setting it
    // on an extension instance avoids the dynamic-property deprecation.
    public ?array $_options = null;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(SvobodaWebContext $ctx, array $options): void {}
    public function PostConstruct(SvobodaWebContext $ctx): void {}
    public function PostConstructEntity(SvobodaWebContext $ctx): void {}
    public function SetData(SvobodaWebContext $ctx): void {}
    public function GetData(SvobodaWebContext $ctx): void {}
    public function GetMatch(SvobodaWebContext $ctx): void {}
    public function SetMatch(SvobodaWebContext $ctx): void {}
    public function PrePoint(SvobodaWebContext $ctx): void {}
    public function PreSpec(SvobodaWebContext $ctx): void {}
    public function PreRequest(SvobodaWebContext $ctx): void {}
    public function PreResponse(SvobodaWebContext $ctx): void {}
    public function PreResult(SvobodaWebContext $ctx): void {}
    public function PreDone(SvobodaWebContext $ctx): void {}
    public function PreUnexpected(SvobodaWebContext $ctx): void {}
}
