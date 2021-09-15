/**
 * Copyright 2019-2020, Optimizely
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import * as optimizely from '@optimizely/optimizely-sdk';
import { OptimizelyDecision, UserInfo } from './utils';
export declare type VariableValuesObject = {
    [key: string]: any;
};
declare type DisposeFn = () => void;
declare type OnUserUpdateHandler = (userInfo: UserInfo) => void;
declare type OnForcedVariationsUpdateHandler = () => void;
export declare type OnReadyResult = {
    success: boolean;
    reason?: string;
    dataReadyPromise?: Promise<any>;
};
export interface ReactSDKClient extends Omit<optimizely.Client, 'createUserContext'> {
    user: UserInfo;
    onReady(opts?: {
        timeout?: number;
    }): Promise<any>;
    setUser(userInfo: UserInfo): void;
    onUserUpdate(handler: OnUserUpdateHandler): DisposeFn;
    isReady(): boolean;
    activate(experimentKey: string, overrideUserId?: string, overrideAttributes?: optimizely.UserAttributes): string | null;
    getVariation(experimentKey: string, overrideUserId?: string, overrideAttributes?: optimizely.UserAttributes): string | null;
    getFeatureVariables(featureKey: string, overrideUserId?: string, overrideAttributes?: optimizely.UserAttributes): VariableValuesObject;
    getFeatureVariableString(featureKey: string, variableKey: string, overrideUserId?: string, overrideAttributes?: optimizely.UserAttributes): string | null;
    getFeatureVariableInteger(featureKey: string, variableKey: string, overrideUserId?: string, overrideAttributes?: optimizely.UserAttributes): number | null;
    getFeatureVariableBoolean(featureKey: string, variableKey: string, overrideUserId?: string, overrideAttributes?: optimizely.UserAttributes): boolean | null;
    getFeatureVariableDouble(featureKey: string, variableKey: string, overrideUserId?: string, overrideAttributes?: optimizely.UserAttributes): number | null;
    getFeatureVariableJSON(featureKey: string, variableKey: string, overrideUserId?: string, overrideAttributes?: optimizely.UserAttributes): unknown;
    getFeatureVariable(featureKey: string, variableKey: string, overrideUserId: string, overrideAttributes?: optimizely.UserAttributes): unknown;
    getAllFeatureVariables(featureKey: string, overrideUserId: string, overrideAttributes?: optimizely.UserAttributes): {
        [variableKey: string]: unknown;
    } | null;
    isFeatureEnabled(featureKey: string, overrideUserId?: string, overrideAttributes?: optimizely.UserAttributes): boolean;
    getEnabledFeatures(overrideUserId?: string, overrideAttributes?: optimizely.UserAttributes): Array<string>;
    getOptimizelyConfig(): optimizely.OptimizelyConfig | null;
    track(eventKey: string, overrideUserId?: string | optimizely.EventTags, overrideAttributes?: optimizely.UserAttributes, eventTags?: optimizely.EventTags): void;
    setForcedVariation(experiment: string, overrideUserIdOrVariationKey: string, variationKey?: string | null): boolean;
    getForcedVariation(experiment: string, overrideUserId?: string): string | null;
    onForcedVariationsUpdate(handler: OnForcedVariationsUpdateHandler): DisposeFn;
    decide(key: string, options?: optimizely.OptimizelyDecideOption[], overrideUserId?: string, overrideAttributes?: optimizely.UserAttributes): OptimizelyDecision;
    decideAll(options?: optimizely.OptimizelyDecideOption[], overrideUserId?: string, overrideAttributes?: optimizely.UserAttributes): {
        [key: string]: OptimizelyDecision;
    };
    decideForKeys(keys: string[], options?: optimizely.OptimizelyDecideOption[], overrideUserId?: string, overrideAttributes?: optimizely.UserAttributes): {
        [key: string]: OptimizelyDecision;
    };
}
export declare const DEFAULT_ON_READY_TIMEOUT = 5000;
declare class OptimizelyReactSDKClient implements ReactSDKClient {
    initialConfig: optimizely.Config;
    user: UserInfo;
    private userPromiseResovler;
    private userPromise;
    private isUserPromiseResolved;
    private onUserUpdateHandlers;
    private onForcedVariationsUpdateHandlers;
    private readonly _client;
    private dataReadyPromise;
    private dataReadyPromiseFulfilled;
    /**
     * Creates an instance of OptimizelyReactSDKClient.
     * @param {optimizely.Config} [config={}]
     */
    constructor(config: optimizely.Config);
    onReady(config?: {
        timeout?: number;
    }): Promise<OnReadyResult>;
    setUser(userInfo: UserInfo): void;
    onUserUpdate(handler: OnUserUpdateHandler): DisposeFn;
    /**
     * Register a handler to be called whenever setForcedVariation is called on
     * this client. Returns a function that un-registers the handler when called.
     * @param {OnForcedVariationsUpdateHandler} handler
     * @returns {DisposeFn}
     */
    onForcedVariationsUpdate(handler: OnForcedVariationsUpdateHandler): DisposeFn;
    isReady(): boolean;
    /**
     * Buckets visitor and sends impression event to Optimizely
     * @param {string} experimentKey
     * @param {string} [overrideUserId]
     * @param {optimizely.UserAttributes} [overrideAttributes]
     * @returns {(string | null)}
     * @memberof OptimizelyReactSDKClient
     */
    activate(experimentKey: string, overrideUserId?: string, overrideAttributes?: optimizely.UserAttributes): string | null;
    decide(key: string, options?: optimizely.OptimizelyDecideOption[], overrideUserId?: string, overrideAttributes?: optimizely.UserAttributes): OptimizelyDecision;
    decideForKeys(keys: string[], options?: optimizely.OptimizelyDecideOption[], overrideUserId?: string, overrideAttributes?: optimizely.UserAttributes): {
        [key: string]: OptimizelyDecision;
    };
    decideAll(options?: optimizely.OptimizelyDecideOption[], overrideUserId?: string, overrideAttributes?: optimizely.UserAttributes): {
        [key: string]: OptimizelyDecision;
    };
    /**
     * Gets variation where visitor will be bucketed
     * @param {string} experimentKey
     * @param {string} [overrideUserId]
     * @param {optimizely.UserAttributes} [overrideAttributes]
     * @returns {(string | null)}
     * @memberof OptimizelyReactSDKClient
     */
    getVariation(experimentKey: string, overrideUserId?: string, overrideAttributes?: optimizely.UserAttributes): string | null;
    /**
     * Sends conversion event to Optimizely
     * @param {string} eventKey
     * @param {string} [overrideUserId]
     * @param {optimizely.UserAttributes} [overrideAttributes]
     * @param {optimizely.EventTags} [eventTags]
     * @memberof OptimizelyReactSDKClient
     */
    track(eventKey: string, overrideUserId?: string | optimizely.EventTags, overrideAttributes?: optimizely.UserAttributes, eventTags?: optimizely.EventTags): void;
    /**
     * Returns true if the feature is enabled for the given user
     * @param {string} feature
     * @param {string} [overrideUserId]
     * @param {optimizely.UserAttributes} [overrideAttributes]
     * @returns {boolean}
     * @memberof OptimizelyReactSDKClient
     */
    isFeatureEnabled(feature: string, overrideUserId?: string, overrideAttributes?: optimizely.UserAttributes): boolean;
    /**
     * @deprecated since 2.1.0
     * getAllFeatureVariables is added in JavaScript SDK which is similarly returning all the feature variables, but
     * it sends only single notification of type "all-feature-variables" instead of sending for each variable.
     * As getFeatureVariables was added when this functionality wasn't provided by JavaScript SDK, so there is no
     * need of it now and it would be removed in next major release
     *
     * Get all variables for a feature, regardless of the feature being enabled/disabled
     * @param {string} featureKey
     * @param {string} [overrideUserId]
     * @param {optimizely.UserAttributes} [overrideAttributes]
     * @returns {VariableValuesObject}
     * @memberof OptimizelyReactSDKClient
     */
    getFeatureVariables(featureKey: string, overrideUserId?: string, overrideAttributes?: optimizely.UserAttributes): VariableValuesObject;
    /**
     * Returns value for the given string variable attached to the given feature
     * flag
     * @param {string} feature
     * @param {string} variable
     * @param {string} [overrideUserId]
     * @param {optimizely.UserAttributes} [overrideAttributes]
     * @returns {(string | null)}
     * @memberof OptimizelyReactSDKClient
     */
    getFeatureVariableString(feature: string, variable: string, overrideUserId?: string, overrideAttributes?: optimizely.UserAttributes): string | null;
    /**
     * Returns value for the given boolean variable attached to the given feature
     * flag
     * @param {string} feature
     * @param {string} variable
     * @param {string} [overrideUserId]
     * @param {optimizely.UserAttributes} [overrideAttributes]
     * @returns {(string | null)}
     * @memberof OptimizelyReactSDKClient
     */
    getFeatureVariableBoolean(feature: string, variable: string, overrideUserId?: string, overrideAttributes?: optimizely.UserAttributes): boolean | null;
    /**
     * Returns value for the given integer variable attached to the given feature
     * flag
     * @param {string} feature
     * @param {string} variable
     * @param {string} [overrideUserId]
     * @param {optimizely.UserAttributes} [overrideAttributes]
     * @returns {(string | null)}
     * @memberof OptimizelyReactSDKClient
     */
    getFeatureVariableInteger(feature: string, variable: string, overrideUserId?: string, overrideAttributes?: optimizely.UserAttributes): number | null;
    /**
     * Returns value for the given double variable attached to the given feature
     * flag
     * @param {string} feature
     * @param {string} variable
     * @param {string} [overrideUserId]
     * @param {optimizely.UserAttributes} [overrideAttributes]
     * @returns {(string | null)}
     * @memberof OptimizelyReactSDKClient
     */
    getFeatureVariableDouble(feature: string, variable: string, overrideUserId?: string, overrideAttributes?: optimizely.UserAttributes): number | null;
    /**
     * Returns value for the given json variable attached to the given feature
     * flag
     * @param {string} feature
     * @param {string} variable
     * @param {string} [overrideUserId]
     * @param {optimizely.UserAttributes} [overrideAttributes]
     * @returns {(unknown | null)}
     * @memberof OptimizelyReactSDKClient
     */
    getFeatureVariableJSON(feature: string, variable: string, overrideUserId?: string, overrideAttributes?: optimizely.UserAttributes): unknown;
    /**
     * Returns dynamically-typed value of the variable attached to the given
     * feature flag. Returns null if the feature key or variable key is invalid.
     * @param {string} featureKey
     * @param {string} variableKey
     * @param {string} [overrideUserId]
     * @param {optimizely.UserAttributes} [overrideAttributes]
     * @returns {(unknown | null)}
     * @memberof OptimizelyReactSDKClient
     */
    getFeatureVariable(featureKey: string, variableKey: string, overrideUserId: string, overrideAttributes?: optimizely.UserAttributes): unknown;
    /**
     * Returns values for all the variables attached to the given feature flag
     * @param {string} featureKey
     * @param {string} overrideUserId
     * @param {optimizely.UserAttributes} [overrideAttributes]
     * @returns {({ [variableKey: string]: unknown } | null)}
     * @memberof OptimizelyReactSDKClient
     */
    getAllFeatureVariables(featureKey: string, overrideUserId: string, overrideAttributes?: optimizely.UserAttributes): {
        [variableKey: string]: unknown;
    } | null;
    /**
     * Get an array of all enabled features
     * @param {string} [overrideUserId]
     * @param {optimizely.UserAttributes} [overrideUserId]
     * @returns {Array<string>}
     * @memberof OptimizelyReactSDKClient
     */
    getEnabledFeatures(overrideUserId?: string, overrideAttributes?: optimizely.UserAttributes): Array<string>;
    /**
     * Gets the forced variation for a given user and experiment
     * @param {string} experiment
     * @param {string} [overrideUserId]
     * @returns {(string | null)}
     * @memberof OptimizelyReactSDKClient
     */
    getForcedVariation(experiment: string, overrideUserId?: string): string | null;
    /**
     * Force a user into a variation for a given experiment
     * @param {string} experiment
     * @param {string} overrideUserIdOrVariationKey
     * @param {string} [variationKey]
     * @returns {boolean}
     * @memberof OptimizelyReactSDKClient
     */
    setForcedVariation(experiment: string, overrideUserIdOrVariationKey: string, variationKey?: string | null): boolean;
    /**
     *  Returns OptimizelyConfig object containing experiments and features data
     *  @returns {optimizely.OptimizelyConfig | null} optimizely config
     */
    getOptimizelyConfig(): optimizely.OptimizelyConfig | null;
    /**
     * Cleanup method for killing an running timers and flushing eventQueue
     */
    close(): Promise<{
        success: boolean;
        reason?: string | undefined;
    }>;
    /**
     * Provide access to inner optimizely.Client object
     */
    readonly client: optimizely.Client;
    readonly notificationCenter: optimizely.NotificationCenter;
    protected getUserContextWithOverrides(overrideUserId?: string, overrideAttributes?: optimizely.UserAttributes): UserInfo;
}
export declare function createInstance(config: optimizely.Config): OptimizelyReactSDKClient;
export {};
