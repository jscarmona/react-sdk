/// <reference types="react" />
import { ReactSDKClient } from './client';
export interface OptimizelyContextInterface {
    optimizely: ReactSDKClient | null;
    isServerSide: boolean;
    timeout: number | undefined;
}
export declare const OptimizelyContext: import("react").Context<OptimizelyContextInterface>;
export declare const OptimizelyContextConsumer: import("react").ExoticComponent<import("react").ConsumerProps<OptimizelyContextInterface>>;
export declare const OptimizelyContextProvider: import("react").ProviderExoticComponent<import("react").ProviderProps<OptimizelyContextInterface>>;
