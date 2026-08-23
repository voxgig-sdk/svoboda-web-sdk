<?php
declare(strict_types=1);

// SvobodaWeb SDK configuration

class SvobodaWebConfig
{
    /** @var array<string,mixed>|null */
    private static ?array $shared_config = null;

    /**
     * Return the process-wide config, built once on first use. The SDK reads
     * the config on every request and never writes to it, so one instance is
     * shared by every client rather than rebuilt per client.
     *
     * PHP arrays are copy-on-write, so callers that do mutate the result get
     * their own copy and cannot disturb the shared one.
     */
    public static function shared_config(): array
    {
        if (self::$shared_config === null) {
            self::$shared_config = self::make_config();
        }
        return self::$shared_config;
    }

    /**
     * Build a fresh, fully materialised config array. Every call rebuilds the
     * whole structure, so prefer shared_config unless you need a private copy.
     */
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "SvobodaWeb",
                "slug" => "svoboda-web",
                "version" => "0.0.1",
                "target" => "php",
            ],
            "feature" => [
                "test" => [
          'options' => [
            'active' => false,
          ],
        ],
            ],
            "options" => [
                "base" => "https://www.svoboda.org",
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "highlight" => [],
                ],
            ],
            "entity" => [
        'highlight' => [
          'fields' => [
            [
              'name' => 'content',
              'short' => 'Content or description of the highlight',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'id',
              'short' => 'Unique identifier for the highlight',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'timestamp',
              'short' => 'Timestamp when the highlight was created or updated',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'title',
              'short' => 'Title of the highlight',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'url',
              'short' => 'URL to the full article or content',
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'highlight',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/hljson',
                  'parts' => [
                    'hljson',
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.highlights`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
      ],
        ];
    }


    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return SvobodaWebFeatures::make_feature($name);
    }
}
