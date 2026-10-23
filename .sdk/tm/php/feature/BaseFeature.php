<?php
declare(strict_types=1);

// AcousticbrainzApi2 SDK base feature

class AcousticbrainzApi2BaseFeature
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

    public function init(AcousticbrainzApi2Context $ctx, array $options): void {}
    public function PostConstruct(AcousticbrainzApi2Context $ctx): void {}
    public function PostConstructEntity(AcousticbrainzApi2Context $ctx): void {}
    public function SetData(AcousticbrainzApi2Context $ctx): void {}
    public function GetData(AcousticbrainzApi2Context $ctx): void {}
    public function GetMatch(AcousticbrainzApi2Context $ctx): void {}
    public function SetMatch(AcousticbrainzApi2Context $ctx): void {}
    public function PrePoint(AcousticbrainzApi2Context $ctx): void {}
    public function PreSpec(AcousticbrainzApi2Context $ctx): void {}
    public function PreRequest(AcousticbrainzApi2Context $ctx): void {}
    public function PreResponse(AcousticbrainzApi2Context $ctx): void {}
    public function PreResult(AcousticbrainzApi2Context $ctx): void {}
    public function PreDone(AcousticbrainzApi2Context $ctx): void {}
    public function PreUnexpected(AcousticbrainzApi2Context $ctx): void {}
}
