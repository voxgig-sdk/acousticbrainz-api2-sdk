import { describe, test } from 'node:test'
import { SDK } from '..'
import { runDefinitionPoint } from './definition-runner'
import { isControlSkipped } from './utility'


// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN: any[] = [
  {
    "entity": "between",
    "accessor": "Between",
    "op": "load",
    "method": "GET",
    "path": "/similarity/{metric}/between/",
    "args": [
      {
        "name": "metric",
        "wire": "metric",
        "value": "p1"
      }
    ],
    "select": {
      "recording_id": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "recording_ids"
    ],
    "queryArgs": [
      {
        "name": "recording_id",
        "wire": "recording_ids"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": {},
    "idField": "id"
  },
  {
    "entity": "count",
    "accessor": "Count",
    "op": "load",
    "method": "GET",
    "path": "/{mbid}/count",
    "args": [
      {
        "name": "mbid",
        "wire": "mbid",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "mbid": "770cc467-8dde-4d22-bc4c-a42f91e7515e",
      "count": 3
    },
    "idField": "id"
  },
  {
    "entity": "count",
    "accessor": "Count",
    "op": "load",
    "method": "GET",
    "path": "/count",
    "args": [],
    "select": {
      "recording_id": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "recording_ids"
    ],
    "queryArgs": [
      {
        "name": "recording_id",
        "wire": "recording_ids"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "770cc467-8dde-4d22-bc4c-a42f91e7515e": {
        "count": 3
      }
    },
    "idField": "id"
  },
  {
    "entity": "similarity",
    "accessor": "Similarity",
    "op": "load",
    "method": "GET",
    "path": "/similarity/{metric}/",
    "args": [
      {
        "name": "id",
        "wire": "metric",
        "value": "p1"
      }
    ],
    "select": {
      "recording_id": "v1",
      "n_neighbour": 200,
      "remove_dup": "v1",
      "threshold": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "recording_ids",
      "n_neighbours",
      "threshold",
      "remove_dups"
    ],
    "queryArgs": [
      {
        "name": "n_neighbour",
        "wire": "n_neighbours"
      },
      {
        "name": "recording_id",
        "wire": "recording_ids"
      },
      {
        "name": "remove_dup",
        "wire": "remove_dups"
      },
      {
        "name": "threshold",
        "wire": "threshold"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": {},
    "idField": "id"
  }
]


describe('definition', () => {
  for (const point of PLAN) {
    test(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
      const control = isControlSkipped('entityOp', point.entity + '.' + point.op, 'definition')
      if (control.skip) {
        t.skip(control.reason || 'skipped via sdk-test-control.json')
        return
      }
      await runDefinitionPoint(SDK, point)
    })
  }
})
