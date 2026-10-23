import { BetweenEntity } from './entity/BetweenEntity';
import { BulkDocumentEntity } from './entity/BulkDocumentEntity';
import { CountEntity } from './entity/CountEntity';
import { DocumentEntity } from './entity/DocumentEntity';
import { SimilarityEntity } from './entity/SimilarityEntity';
export type * from './AcousticbrainzApi2Types';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { AcousticbrainzApi2EntityBase } from './AcousticbrainzApi2EntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
type DirectResult = {
    ok: false;
    err: any;
    status?: undefined;
    headers?: undefined;
    data?: undefined;
} | {
    ok: boolean;
    status: number;
    headers: any;
    data: any;
    err?: any;
};
declare class AcousticbrainzApi2SDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<DirectResult>;
    _rawRequest(fetchargs?: any): Promise<DirectResult>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    Between(entopts?: Record<string, any>): BetweenEntity;
    BulkDocument(entopts?: Record<string, any>): BulkDocumentEntity;
    Count(entopts?: Record<string, any>): CountEntity;
    Document(entopts?: Record<string, any>): DocumentEntity;
    Similarity(entopts?: Record<string, any>): SimilarityEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): AcousticbrainzApi2SDK;
    tester(testopts?: any, sdkopts?: any): AcousticbrainzApi2SDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof AcousticbrainzApi2SDK;
export { stdutil, config, BaseFeature, AcousticbrainzApi2EntityBase, AcousticbrainzApi2SDK, SDK, };
export type { DirectResult };
