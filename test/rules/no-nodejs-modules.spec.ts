import { RuleTester as TSESLintRuleTester } from '@typescript-eslint/rule-tester'

import { test } from '../utils'

import rule from 'eslint-plugin-import-x/rules/no-nodejs-modules'

const ruleTester = new TSESLintRuleTester()

const error = (message: string) => ({
  message,
})

ruleTester.run('no-nodejs-modules', rule, {
  valid: [
    test({ code: 'import _ from "lodash"' }),
    test({ code: 'import find from "lodash.find"' }),
    test({ code: 'import foo from "./foo"' }),
    test({ code: 'import foo from "../foo"' }),
    test({ code: 'import foo from "foo"' }),
    test({ code: 'import foo from "./"' }),
    test({ code: 'import foo from "@scope/foo"' }),
    test({ code: 'var _ = require("lodash")' }),
    test({ code: 'var find = require("lodash.find")' }),
    test({ code: 'var foo = require("./foo")' }),
    test({ code: 'var foo = require("../foo")' }),
    test({ code: 'var foo = require("foo")' }),
    test({ code: 'var foo = require("./")' }),
    test({ code: 'var foo = require("@scope/foo")' }),
    test({
      code: 'import events from "events"',
      options: [
        {
          allow: ['events'],
        },
      ],
    }),
    test({
      code: 'import path from "path"',
      options: [
        {
          allow: ['path'],
        },
      ],
    }),
    test({
      code: 'var events = require("events")',
      options: [
        {
          allow: ['events'],
        },
      ],
    }),
    test({
      code: 'var path = require("path")',
      options: [
        {
          allow: ['path'],
        },
      ],
    }),
    test({
      code: 'import path from "path";import events from "events"',
      options: [
        {
          allow: ['path', 'events'],
        },
      ],
    }),
    test({
      code: 'import events from "node:events"',
      options: [
        {
          allow: ['node:events'],
        },
      ],
    }),
    test({
      code: 'var events = require("node:events")',
      options: [
        {
          allow: ['node:events'],
        },
      ],
    }),
    test({
      code: 'import path from "node:path"',
      options: [
        {
          allow: ['node:path'],
        },
      ],
    }),
    test({
      code: 'var path = require("node:path")',
      options: [
        {
          allow: ['node:path'],
        },
      ],
    }),
    test({
      code: 'import path from "node:path";import events from "node:events"',
      options: [
        {
          allow: ['node:path', 'node:events'],
        },
      ],
    }),
  ],
  invalid: [
    test({
      code: 'import path from "path"',
      errors: [error('Do not import Node.js builtin module "path"')],
    }),
    test({
      code: 'import fs from "fs"',
      errors: [error('Do not import Node.js builtin module "fs"')],
    }),
    test({
      code: 'var path = require("path")',
      errors: [error('Do not import Node.js builtin module "path"')],
    }),
    test({
      code: 'var fs = require("fs")',
      errors: [error('Do not import Node.js builtin module "fs"')],
    }),
    test({
      code: 'import fs from "fs"',
      options: [
        {
          allow: ['path'],
        },
      ],
      errors: [error('Do not import Node.js builtin module "fs"')],
    }),
    test({
      code: 'import path from "node:path"',
      errors: [error('Do not import Node.js builtin module "node:path"')],
    }),
    test({
      code: 'var path = require("node:path")',
      errors: [error('Do not import Node.js builtin module "node:path"')],
    }),
    test({
      code: 'import fs from "node:fs"',
      errors: [error('Do not import Node.js builtin module "node:fs"')],
    }),
    test({
      code: 'var fs = require("node:fs")',
      errors: [error('Do not import Node.js builtin module "node:fs"')],
    }),
    test({
      code: 'import fs from "node:fs"',
      options: [
        {
          allow: ['node:path'],
        },
      ],
      errors: [error('Do not import Node.js builtin module "node:fs"')],
    }),
  ],
})
