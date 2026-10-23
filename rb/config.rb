# AcousticbrainzApi2 SDK configuration

module AcousticbrainzApi2Config
  # Return the process-wide config, built once on first use. The SDK reads
  # the config on every request and never writes to it, so one instance is
  # shared by every client rather than rebuilt per client.
  #
  # The returned hash is shared: treat it as read-only. Callers that need to
  # mutate should use make_config, which always returns a fresh copy.
  def self.shared_config
    @shared_config ||= make_config
  end


  # Build a fresh, fully materialised config hash. Every call rebuilds the
  # whole structure, so prefer shared_config unless you need a private copy
  # you intend to mutate.
  def self.make_config
    {
      "main" => {
        "name" => "AcousticbrainzApi2",
        "slug" => "acousticbrainz-api2",
        "version" => "0.0.1",
        "target" => "rb",
      },
      "feature" => {
        "ratelimit" => {
          "options" => {
            "active" => false,
            "burst" => 5,
            "rate" => 5,
          },
          "optspec" => {
            "now" => "`$FUNCTION`",
            "sleep" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
        "retry" => {
          "options" => {
            "active" => false,
            "factor" => 2,
            "maxDelay" => 2000,
            "minDelay" => 50,
            "retries" => 2,
            "statuses" => [
              408,
              425,
              429,
              500,
              502,
              503,
              504,
            ],
          },
          "optspec" => {
            "jitter" => "`$BOOLEAN`",
            "sleep" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
        "test" => {
          "options" => {
            "active" => false,
          },
          "optspec" => {
            "entity" => "`$MAP`",
            "net" => "`$MAP`",
          },
          "strict" => false,
          "transport" => "base",
        },
        "timeout" => {
          "options" => {
            "active" => false,
            "ms" => 30000,
          },
          "optspec" => {
            "clearTimer" => "`$FUNCTION`",
            "now" => "`$FUNCTION`",
            "setTimer" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
      },
      "options" => {
        "base" => "https://acousticbrainz.org/api/v1",
        "headers" => {
          "content-type" => "application/json",
        },
        "entity" => {
          "between" => {},
          "bulk_document" => {},
          "count" => {},
          "document" => {},
          "similarity" => {},
        },
      },
      "entity" => {
        "between" => {
          "fields" => [],
          "name" => "between",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/similarity/{metric}/between/",
                  "segments" => [
                    {
                      "lit" => "similarity",
                    },
                    {
                      "var" => "metric",
                    },
                    {
                      "lit" => "between",
                    },
                  ],
                  "parts" => [
                    "similarity",
                    "{metric}",
                    "between",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "params" => [
                      {
                        "name" => "metric",
                        "orig" => "metric",
                        "type" => "`$STRING`",
                        "kind" => "param",
                        "reqd" => true,
                      },
                    ],
                    "query" => [
                      {
                        "name" => "recording_id",
                        "orig" => "recording_ids",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "metric",
                      "recording_id",
                    ],
                  },
                  "response" => {
                    "kind" => "json",
                    "media" => "application/json",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [
              [
                "$.main.kit.entity.similarity",
              ],
            ],
          },
        },
        "bulk_document" => {
          "fields" => [],
          "name" => "bulk_document",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/high-level",
                  "segments" => [
                    {
                      "lit" => "high-level",
                    },
                  ],
                  "parts" => [
                    "high-level",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "query" => [
                      {
                        "name" => "map_class",
                        "orig" => "map_classes",
                        "type" => "`$BOOLEAN`",
                        "kind" => "query",
                      },
                      {
                        "name" => "recording_id",
                        "orig" => "recording_ids",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "recording_id",
                    ],
                  },
                  "response" => {
                    "kind" => "json",
                    "media" => "application/json",
                  },
                },
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/low-level",
                  "segments" => [
                    {
                      "lit" => "low-level",
                    },
                  ],
                  "parts" => [
                    "low-level",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "query" => [
                      {
                        "name" => "feature",
                        "orig" => "features",
                        "type" => "`$STRING`",
                        "kind" => "query",
                      },
                      {
                        "name" => "recording_id",
                        "orig" => "recording_ids",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "recording_id",
                    ],
                  },
                  "response" => {
                    "kind" => "json",
                    "media" => "application/json",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "count" => {
          "fields" => [
            {
              "name" => "count",
              "title" => "Count",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "mbid",
              "title" => "Mbid",
              "type" => "`$STRING`",
              "format" => "uuid",
            },
          ],
          "name" => "count",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/{mbid}/count",
                  "segments" => [
                    {
                      "var" => "mbid",
                    },
                    {
                      "lit" => "count",
                    },
                  ],
                  "parts" => [
                    "{mbid}",
                    "count",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "params" => [
                      {
                        "name" => "mbid",
                        "orig" => "mbid",
                        "type" => "`$STRING`",
                        "kind" => "param",
                        "reqd" => true,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "mbid",
                    ],
                  },
                  "response" => {
                    "kind" => "json",
                    "media" => "application/json",
                  },
                },
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/count",
                  "segments" => [
                    {
                      "lit" => "count",
                    },
                  ],
                  "parts" => [
                    "count",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "query" => [
                      {
                        "name" => "recording_id",
                        "orig" => "recording_ids",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "recording_id",
                    ],
                  },
                  "response" => {
                    "kind" => "json",
                    "media" => "application/json",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "document" => {
          "fields" => [],
          "name" => "document",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/{mbid}/high-level",
                  "segments" => [
                    {
                      "var" => "mbid",
                    },
                    {
                      "lit" => "high-level",
                    },
                  ],
                  "parts" => [
                    "{mbid}",
                    "high-level",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "params" => [
                      {
                        "name" => "mbid",
                        "orig" => "mbid",
                        "type" => "`$STRING`",
                        "kind" => "param",
                        "reqd" => true,
                      },
                    ],
                    "query" => [
                      {
                        "name" => "map_class",
                        "orig" => "map_classes",
                        "type" => "`$BOOLEAN`",
                        "kind" => "query",
                      },
                      {
                        "name" => "n",
                        "orig" => "n",
                        "type" => "`$INTEGER`",
                        "kind" => "query",
                        "example" => 0,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "mbid",
                    ],
                  },
                  "response" => {
                    "kind" => "json",
                    "media" => "application/json",
                  },
                },
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/{mbid}/low-level",
                  "segments" => [
                    {
                      "var" => "mbid",
                    },
                    {
                      "lit" => "low-level",
                    },
                  ],
                  "parts" => [
                    "{mbid}",
                    "low-level",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "params" => [
                      {
                        "name" => "mbid",
                        "orig" => "mbid",
                        "type" => "`$STRING`",
                        "kind" => "param",
                        "reqd" => true,
                      },
                    ],
                    "query" => [
                      {
                        "name" => "n",
                        "orig" => "n",
                        "type" => "`$INTEGER`",
                        "kind" => "query",
                        "example" => 0,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "mbid",
                    ],
                  },
                  "response" => {
                    "kind" => "json",
                    "media" => "application/json",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "similarity" => {
          "fields" => [
            {
              "name" => "id",
              "title" => "Id",
              "type" => "`$STRING`",
            },
          ],
          "id" => {
            "field" => "id",
            "name" => "id",
          },
          "name" => "similarity",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/similarity/{metric}/",
                  "segments" => [
                    {
                      "lit" => "similarity",
                    },
                    {
                      "var" => "id",
                    },
                  ],
                  "parts" => [
                    "similarity",
                    "{id}",
                  ],
                  "rename" => {
                    "param" => {
                      "metric" => "id",
                    },
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "params" => [
                      {
                        "name" => "id",
                        "orig" => "metric",
                        "type" => "`$STRING`",
                        "kind" => "param",
                        "reqd" => true,
                      },
                    ],
                    "query" => [
                      {
                        "name" => "n_neighbour",
                        "orig" => "n_neighbours",
                        "type" => "`$INTEGER`",
                        "kind" => "query",
                        "example" => 200,
                      },
                      {
                        "name" => "recording_id",
                        "orig" => "recording_ids",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                      },
                      {
                        "name" => "remove_dup",
                        "orig" => "remove_dups",
                        "type" => "`$STRING`",
                        "kind" => "query",
                      },
                      {
                        "name" => "threshold",
                        "orig" => "threshold",
                        "type" => "`$NUMBER`",
                        "kind" => "query",
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "id",
                      "recording_id",
                    ],
                  },
                  "response" => {
                    "kind" => "json",
                    "media" => "application/json",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
      },
    }
  end


  def self.make_feature(name)
    require_relative 'features'
    AcousticbrainzApi2Features.make_feature(name)
  end
end
