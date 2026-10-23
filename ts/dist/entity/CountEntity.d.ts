import { AcousticbrainzApi2EntityBase } from '../AcousticbrainzApi2EntityBase';
import type { AcousticbrainzApi2SDK } from '../AcousticbrainzApi2SDK';
import type { Control } from '../types';
import type { Count, CountLoadMatch } from '../AcousticbrainzApi2Types';
declare class CountEntity extends AcousticbrainzApi2EntityBase<Count> {
    constructor(client: AcousticbrainzApi2SDK, entopts: any);
    make(this: CountEntity): CountEntity;
    load(this: any, reqmatch?: CountLoadMatch, ctrl?: Control): Promise<CountEntity>;
}
export { CountEntity };
