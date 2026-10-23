<?php
declare(strict_types=1);

// AcousticbrainzApi2 SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class AcousticbrainzApi2MakeContext
{
    public static function call(array $ctxmap, ?AcousticbrainzApi2Context $basectx): AcousticbrainzApi2Context
    {
        return new AcousticbrainzApi2Context($ctxmap, $basectx);
    }
}
