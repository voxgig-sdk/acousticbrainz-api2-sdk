import { AcousticbrainzApi2EntityBase } from '../AcousticbrainzApi2EntityBase';
import type { AcousticbrainzApi2SDK } from '../AcousticbrainzApi2SDK';
import type { Control } from '../types';
import type { Between, BetweenLoadMatch } from '../AcousticbrainzApi2Types';
declare class BetweenEntity extends AcousticbrainzApi2EntityBase<Between> {
    constructor(client: AcousticbrainzApi2SDK, entopts: any);
    make(this: BetweenEntity): BetweenEntity;
    load(this: any, reqmatch?: BetweenLoadMatch, ctrl?: Control): Promise<BetweenEntity>;
}
export { BetweenEntity };
