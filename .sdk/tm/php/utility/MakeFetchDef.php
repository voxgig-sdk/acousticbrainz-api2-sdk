<?php
declare(strict_types=1);

// AcousticbrainzApi2 SDK utility: make_fetch_def

require_once __DIR__ . '/../core/Result.php';
require_once __DIR__ . '/Media.php';

class AcousticbrainzApi2MakeFetchDef
{
    public static function call(AcousticbrainzApi2Context $ctx): array
    {
        $spec = $ctx->spec;
        if (!$spec) {
            return [null, $ctx->make_error('fetchdef_no_spec', 'Expected context spec property to be defined.')];
        }

        if (!$ctx->result) {
            $ctx->result = new AcousticbrainzApi2Result([]);
        }
        $spec->step = 'prepare';

        [$url, $err] = ($ctx->utility->make_url)($ctx);
        if ($err) {
            return [null, $err];
        }

        $spec->url = $url;

        $fetchdef = ['url' => $url, 'method' => $spec->method, 'headers' => $spec->headers];
        if ($spec->body !== null) {
            $fetchdef['body'] = AcousticbrainzApi2Media::requestBody($ctx->point, $spec->body);
        }

        return [$fetchdef, null];
    }
}
