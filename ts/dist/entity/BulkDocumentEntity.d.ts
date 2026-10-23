import { AcousticbrainzApi2EntityBase } from '../AcousticbrainzApi2EntityBase';
import type { AcousticbrainzApi2SDK } from '../AcousticbrainzApi2SDK';
import type { Control } from '../types';
import type { BulkDocument, BulkDocumentLoadMatch } from '../AcousticbrainzApi2Types';
declare class BulkDocumentEntity extends AcousticbrainzApi2EntityBase<BulkDocument> {
    constructor(client: AcousticbrainzApi2SDK, entopts: any);
    make(this: BulkDocumentEntity): BulkDocumentEntity;
    load(this: any, reqmatch?: BulkDocumentLoadMatch, ctrl?: Control): Promise<BulkDocumentEntity>;
}
export { BulkDocumentEntity };
