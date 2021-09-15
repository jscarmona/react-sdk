/**
 * Copyright 2019, Optimizely
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
import * as React from 'react';
export declare type UserInfo = {
    id: string | null;
    attributes?: optimizely.UserAttributes;
};
export interface OptimizelyDecision extends Omit<optimizely.OptimizelyDecision, 'userContext'> {
    userContext: UserInfo;
}
export declare function areUsersEqual(user1: UserInfo, user2: UserInfo): boolean;
export interface AcceptsForwardedRef<R> {
    forwardedRef?: React.Ref<R>;
}
export declare function hoistStaticsAndForwardRefs<R, P extends AcceptsForwardedRef<R>>(Target: React.ComponentType<P>, Source: React.ComponentType<any>, displayName: string): React.ForwardRefExoticComponent<React.PropsWithoutRef<P> & React.RefAttributes<R>>;
/**
 * Equality check applied to override user attributes passed into hooks. Used to determine when we need to recompute
 * a decision because a new set of override attributes was passed into a hook.
 * @param {UserAttributes|undefined} oldAttrs
 * @param {UserAttributes|undefined} newAttrs
 * @returns boolean
 */
export declare function areAttributesEqual(maybeOldAttrs: unknown, maybeNewAttrs: unknown): boolean;
export declare function createFailedDecision(flagKey: string, message: string, user: UserInfo): OptimizelyDecision;
