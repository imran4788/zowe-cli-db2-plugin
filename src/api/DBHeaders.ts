/*
* This program and the accompanying materials are made available under the terms of the *
* Eclipse Public License v2.0 which accompanies this distribution, and is available at *
* https://www.eclipse.org/legal/epl-v20.html                                      *
*                                                                                 *
* SPDX-License-Identifier: EPL-2.0                                                *
*                                                                                 *
* Copyright Contributors to the Zowe Project.                                     *
*                                                                                 *
*/

import { IHeaderContent } from "@zowe/imperative";

export class DBHeaders {
    public static readonly CONTENT_APPLICATION_JSON: IHeaderContent = { "Content-Type": "application/json" };
    public static readonly CONTENT_TEXT_PLAIN: IHeaderContent = { "Content-Type": "text/plain;charset=UTF-8" };
    public static readonly ZOSMF_HEADER: IHeaderContent = { "X-CSRF-ZOSMF-HEADER": " " };
    public static readonly ZOSMF_IBM_DATA_TYPE: IHeaderContent = { "X-IBM-Data-Type": "text" };
    public static readonly ACCEPT_APPLICATION_JSON: IHeaderContent = { Accept: "application/json;charset=UTF-8" };
    public static readonly ZOSMF_IBM_CLASS: IHeaderContent = { "X-IBM-Intrdr-Class": "A" };
    public static readonly ZOSMF_HEADER_TRUE: IHeaderContent = { "X-CSRF-ZOSMF-HEADER": "true" };
}
