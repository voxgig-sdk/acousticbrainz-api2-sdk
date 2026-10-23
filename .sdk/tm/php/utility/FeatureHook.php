<?php
declare(strict_types=1);

// AcousticbrainzApi2 SDK utility: feature_hook

class AcousticbrainzApi2FeatureHook
{
    public static function call(AcousticbrainzApi2Context $ctx, string $name): void
    {
        if (!$ctx->client) {
            return;
        }
        $features = $ctx->client->features ?? null;
        if (!$features) {
            return;
        }
        foreach ($features as $f) {
            if (method_exists($f, $name)) {
                $f->$name($ctx);
            }
        }
    }
}
