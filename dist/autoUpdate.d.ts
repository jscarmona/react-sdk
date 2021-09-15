import { LoggerFacade } from '@optimizely/js-sdk-logging';
import { ReactSDKClient } from './client';
interface AutoUpdate {
    (optimizely: ReactSDKClient, type: 'Feature' | 'Experiment', value: string, logger: LoggerFacade, callback: () => void): () => void;
}
/**
 * Utility to setup listeners for changes to the datafile or user attributes and invoke the provided callback.
 * Returns an unListen function
 */
export declare const setupAutoUpdateListeners: AutoUpdate;
export {};
