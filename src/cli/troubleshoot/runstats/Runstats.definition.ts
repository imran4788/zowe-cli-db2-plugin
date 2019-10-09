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

import { ICommandDefinition } from "@zowe/imperative";

export const RunstatsDefinition: ICommandDefinition = {
    name: "runstats",
    aliases: ["rs"],
    type: "command",
    summary: "Troubleshoot databaase objects for the Runstats action",
    description: "Troubleshoot all or specified database objects for Runstats action.",
    handler: __dirname + "/All.handler",
    profile: {
        optional: ["db2"]
    },
    options: [
        {
            name: "databasename",
            aliases: ["dbn"],
            type: "string",
            description: "The database name for runstats",
        },
    ],
    examples: [
        {
            description: "Database can be provided completely or partially with wild card character %",
            options: "dbn DATABASE or dbn DAT%"
        }
    ],
};
