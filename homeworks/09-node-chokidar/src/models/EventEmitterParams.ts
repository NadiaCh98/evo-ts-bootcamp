import { EventStatus } from './../../config/config';

export interface EventEmmitParams {
    readonly status: EventStatus;
    readonly filepath: string;
}