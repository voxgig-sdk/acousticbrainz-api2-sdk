import { AcousticbrainzApi2EntityBase } from '../AcousticbrainzApi2EntityBase';
import type { AcousticbrainzApi2SDK } from '../AcousticbrainzApi2SDK';
import type { Control } from '../types';
import type { Document, DocumentLoadMatch } from '../AcousticbrainzApi2Types';
declare class DocumentEntity extends AcousticbrainzApi2EntityBase<Document> {
    constructor(client: AcousticbrainzApi2SDK, entopts: any);
    make(this: DocumentEntity): DocumentEntity;
    load(this: any, reqmatch?: DocumentLoadMatch, ctrl?: Control): Promise<DocumentEntity>;
}
export { DocumentEntity };
