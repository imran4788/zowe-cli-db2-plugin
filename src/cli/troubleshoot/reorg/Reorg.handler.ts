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

import { AbstractSession, ICommandHandler, RestClient, IHandlerParameters, ImperativeError, TextUtils } from "@zowe/imperative";
import { ExecuteSQL, IDB2Session, DB2BaseHandler, ReorgJCL, IRequestBody, DBHeaders, ZSession } from "../../../index";
import * as fs from "fs";

/**
 * Command handler for reorg
 * @export
 * @class AllHandler
 * @implements {ICommandHandler}
 */
export default class ReorgHandler implements ICommandHandler {
    public async process(params: IHandlerParameters) {
    const zosmfPull = params.profiles.get("zosmf");
    let user: string = zosmfPull.user;
    user = user.toUpperCase();
    const session = ZSession.createBasicZSession(zosmfPull);
    const tsname = params.arguments.ts;
    const dbname = params.arguments.dbn;
    const headerCreatePS = [
        DBHeaders.CONTENT_APPLICATION_JSON,
        DBHeaders.ZOSMF_HEADER_TRUE
        ];
    const headers = [
        DBHeaders.CONTENT_TEXT_PLAIN,
        DBHeaders.ZOSMF_HEADER,
        DBHeaders.ZOSMF_IBM_DATA_TYPE
        ];
    const headerSub = [
        DBHeaders.CONTENT_APPLICATION_JSON,
        DBHeaders.ZOSMF_HEADER,
        DBHeaders.ZOSMF_IBM_CLASS
        ];
        // Capturing timestamps
    const ts1 = fn_getTimeStamp();
    const ts2 = JSON.stringify(ts1);
    const ts3 = JSON.parse(ts2);
    const dat = ts3.date.replace("/", "").replace("/", "");
    const tim = ts3.time.replace(":" , "");


    // Local function for timestamp {"date":"3/6/2019","time":"16:21"}
    function fn_getTimeStamp(): object {
    // Create a date object with the current time
    const now: Date = new Date();
    // Create an array with the current month, day and time
    const date: string[] = [ String(now.getMonth() + 1), String(now.getDate()), String(now.getFullYear()) ];
    // Create an array with the current hour, minute and second
    const time: string[] = [ String(now.getHours()), String(now.getMinutes())];
    // If seconds and minutes are less than 10, add a zero
    for (let i of time) {
        if ( Number(i) < 10 ) {
          i = "0" + i;
        }
    }
    // Return the formatted string
    return {
        date: date.join("/"),
        time: time.join(":")
    };
}

    const jclPS = user + ".Z" + dat + "." + "T" + tim;

    // const query = Diagnose.getAllStatusSql(params.arguments.databaseName);
    const jcl = ReorgJCL.reorg("ZDBGC32C", "MOMIM01", "TS", "TS1GC32C");

    const requestBody: IRequestBody = {
        file: "//'" + jclPS + "'"
         };

        // DATASET creation parameters
    const bodyCreate = {dirblk: 0, unit: "SYSDA", dsorg: "PS", alcunit: "TRK", primary: 10, secondary: 5,
                        avgblk: 500, recfm: "FB", blksize: 400, lrecl: 80};

    const resCreateJ = "/zosmf/restfiles/ds/" + jclPS;
    const dataCreateJ = await RestClient.postExpectString(session, resCreateJ, headerCreatePS, bodyCreate);

        // REST call to write the above JCL into the dataset jclPS
    const resource2 = "/zosmf/restfiles/ds/" + jclPS;
    const data2 = await RestClient.putExpectString(session, resource2, headers, jcl);
        // REST call to submit the job present in the dataset jclPS
    const resource3 = "/zosmf/restjobs/jobs";
    const data3 = await RestClient.putExpectJSON(session, resource3, headerSub, requestBody);
    const dd = JSON.stringify(data3);
    }
}
