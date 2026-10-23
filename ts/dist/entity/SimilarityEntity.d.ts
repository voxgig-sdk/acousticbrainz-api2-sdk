import { AcousticbrainzApi2EntityBase } from '../AcousticbrainzApi2EntityBase';
import type { AcousticbrainzApi2SDK } from '../AcousticbrainzApi2SDK';
import type { Control } from '../types';
import type { Similarity, SimilarityLoadMatch } from '../AcousticbrainzApi2Types';
declare class SimilarityEntity extends AcousticbrainzApi2EntityBase<Similarity> {
    constructor(client: AcousticbrainzApi2SDK, entopts: any);
    make(this: SimilarityEntity): SimilarityEntity;
    load(this: any, reqmatch?: SimilarityLoadMatch, ctrl?: Control): Promise<SimilarityEntity>;
}
export { SimilarityEntity };
