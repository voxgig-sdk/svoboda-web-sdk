import { SvobodaWebEntityBase } from '../SvobodaWebEntityBase';
import type { SvobodaWebSDK } from '../SvobodaWebSDK';
import type { Control } from '../types';
import type { Highlight, HighlightListMatch } from '../SvobodaWebTypes';
declare class HighlightEntity extends SvobodaWebEntityBase<Highlight> {
    constructor(client: SvobodaWebSDK, entopts: any);
    make(this: HighlightEntity): HighlightEntity;
    list(this: any, reqmatch?: HighlightListMatch, ctrl?: Control): Promise<HighlightEntity[]>;
}
export { HighlightEntity };
