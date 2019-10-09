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

import { ICommandArguments, ICommandOptionDefinition, IProfile, Logger, Session } from "@zowe/imperative";
/**
 * Utility Methods for Brightside
 * @export
 */
export class ZSession {

  public static DB_CONNECTION_OPTION_GROUP = "DB2 Connection Options";

  /**
   * Option used in profile creation and commands for hostname for DB2 Tools
   */
  public static DB_OPTION_HOST: ICommandOptionDefinition = {
    name: "host",
    aliases: ["H"],
    description: "Specifies CA DB2 Tools server host name.",
    type: "string",
    required: true,
    group: ZSession.DB_CONNECTION_OPTION_GROUP
  };

  /**
   * Option used in profile creation and commands for port for DB2 Tools
   */
  public static DB_OPTION_PORT: ICommandOptionDefinition = {
    name: "port",
    aliases: ["P"],
    description: "Specifies CA DB2 Tools server port.",
    type: "number",
    required: true,
    group: ZSession.DB_CONNECTION_OPTION_GROUP
  };

  /**
   * Option used in profile creation and commands for username for DB2 Tools
   */
  public static DB_OPTION_USER: ICommandOptionDefinition = {
    name: "user",
    aliases: ["u"],
    description: "Specifies Mainframe user name. May be the same as TSO login.",
    type: "string",
    required: true,
    group: ZSession.DB_CONNECTION_OPTION_GROUP
  };

  /**
   * Option used in profile creation and commands for password for DB2 Tools
   */
  public static DB_OPTION_PASS: ICommandOptionDefinition = {
    name: "pass",
    aliases: ["p"],
    description: "Specifies Mainframe password. May be the same as TSO password.",
    type: "string",
    required: true,
    group: ZSession.DB_CONNECTION_OPTION_GROUP
  };

  /**
   * Option used in profile creation and commands for protocol for DB2 Tools
   */
  public static DB_OPTION_PROTOCOL: ICommandOptionDefinition = {
    name: "protocol",
    aliases: ["o"],
    description: "Specifies CA DB2 Tools REST API protocol.",
    type: "string",
    defaultValue: "https",
    required: true,
    allowableValues: { values: ["http", "https"], caseSensitive: false },
    group: ZSession.DB_CONNECTION_OPTION_GROUP
  };

  /**
   * Option used in profile creation and commands for rejectUnauthorized setting for connecting to DB2 Tools
   */
  public static DB_OPTION_REJECT_UNAUTHORIZED: ICommandOptionDefinition = {
    name: "reject-unauthorized",
    aliases: ["ru"],
    description: "Reject self-signed certificates.",
    type: "boolean",
    defaultValue: true,
    required: false,
    group: ZSession.DB_CONNECTION_OPTION_GROUP
  };

  /**
   * Options related to connecting to DB2 Tools
   * These options can be filled in if the user creates a profile
   */
  public static DB_CONNECTION_OPTIONS: ICommandOptionDefinition[] = [
    ZSession.DB_OPTION_HOST,
    ZSession.DB_OPTION_PORT,
    ZSession.DB_OPTION_USER,
    ZSession.DB_OPTION_PASS,
    ZSession.DB_OPTION_PROTOCOL,
    ZSession.DB_OPTION_REJECT_UNAUTHORIZED
  ];
  public static createBasicZSession(profile: IProfile): Session {
        return new Session({
          type: "basic",
          hostname: profile.host,
          port: profile.port,
          user: profile.user,
          password: profile.password,
          protocol: profile.protocol,
          rejectUnauthorized: false,
          basePath: profile.basePath
        });
      }
    }
