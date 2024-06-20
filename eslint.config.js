// @ts-expect-error js module
import js from "@eslint/js";
import stylistic from "@stylistic/eslint-plugin";
import ts from "typescript-eslint";

export default [
  js.configs.recommended,
  ...ts.configs.recommendedTypeChecked,
  // TS options
  {
    languageOptions: {
      parserOptions: {
        sourceType: "module",
        ecmaVersion: 2020,
        project: "./tsconfig.json",
        extraFileExtensions: [".svelte"],
      },
    },
  },
  // JS STYLING
  {
    plugins: {
      "@stylistic": stylistic,
    },
    rules: {
      // enforces line breaks after opening and before closing array brackets
      // https://eslint.style/rules/default/array-bracket-newline
      "@stylistic/array-bracket-newline": ["warn", "consistent"],

      // enforce spacing inside array brackets
      // https://eslint.style/rules/default/array-bracket-spacing
      "@stylistic/array-bracket-spacing": ["warn", "never"],

      // enforces line breaks between array elements
      // https://eslint.style/rules/default/array-element-newline
      "@stylistic/array-element-newline": ["warn", "consistent"],

      // enforces parentheses in arrow functions
      // https://eslint.style/rules/default/arrow-parens
      "@stylistic/arrow-parens": "warn",

      // enforces spacing before/after an arrow function's arrow
      // https://eslint.style/rules/default/arrow-spacing
      "@stylistic/arrow-spacing": "warn",

      // enforce spacing inside single-line blocks
      // https://eslint.style/rules/default/block-spacing
      "@stylistic/block-spacing": ["warn", "always"],

      // enforce one true brace style
      // https://eslint.style/rules/default/brace-style
      "@stylistic/brace-style": ["warn", "1tbs", { allowSingleLine: true }],

      // require trailing commas in multiline object literals
      // https://eslint.style/rules/default/comma-dangle
      "@stylistic/comma-dangle": [
        "warn",
        {
          arrays: "always-multiline",
          objects: "always-multiline",
          imports: "always-multiline",
          exports: "always-multiline",
          functions: "always-multiline",
          enums: "always-multiline",
          generics: "always-multiline",
          tuples: "always-multiline",
        },
      ],

      // enforce spacing before and after comma
      // https://eslint.style/rules/default/comma-spacing
      "@stylistic/comma-spacing": ["warn", { before: false, after: true }],

      // enforce one true comma style
      // https://eslint.style/rules/default/comma-style
      "@stylistic/comma-style": [
        "warn",
        "last",
        {
          exceptions: {
            ArrayExpression: false,
            ArrayPattern: false,
            ArrowFunctionExpression: false,
            CallExpression: false,
            FunctionDeclaration: false,
            FunctionExpression: false,
            ImportDeclaration: false,
            ObjectExpression: false,
            ObjectPattern: false,
            VariableDeclaration: false,
            NewExpression: false,
          },
        },
      ],

      // disallow padding inside computed properties
      // https://eslint.style/rules/default/computed-property-spacing
      "@stylistic/computed-property-spacing": ["warn", "never"],

      // enforce newlines before a dot in a member expression
      // https://eslint.style/rules/default/dot-location
      "@stylistic/dot-location": ["warn", "property"],

      // enforce newline at the end of file, with no multiple empty lines
      // https://eslint.style/rules/default/eol-last
      "@stylistic/eol-last": ["warn", "always"],

      // line breaks between arguments of a function call
      // https://eslint.style/rules/default/function-call-argument-newline
      "@stylistic/function-call-argument-newline": ["warn", "consistent"],

      // enforce spacing between functions and their invocations
      // https://eslint.style/rules/default/function-call-spacing
      "@stylistic/function-call-spacing": ["warn", "never"],

      // require function expressions to have a name
      // https://eslint.org/docs/rules/func-names
      "func-names": "warn",

      // require line breaks inside function parentheses if there are line breaks between parameters
      // https://eslint.style/rules/default/function-paren-newline
      "@stylistic/function-paren-newline": ["warn", "multiline-arguments"],

      // Enforce the location of arrow function bodies with implicit returns
      // https://eslint.style/rules/default/implicit-arrow-linebreak
      "@stylistic/implicit-arrow-linebreak": ["warn", "beside"],

      // this option sets a specific tab width for your code
      // https://eslint.style/rules/default/indent
      "@stylistic/indent": [
        "warn",
        2,
        {
          SwitchCase: 1,
          VariableDeclarator: 1,
          outerIIFEBody: 1,
          // MemberExpression: null,
          FunctionDeclaration: {
            parameters: 1,
            body: 1,
          },
          FunctionExpression: {
            parameters: 1,
            body: 1,
          },
          CallExpression: {
            arguments: 1,
          },
          ArrayExpression: 1,
          ObjectExpression: 1,
          ImportDeclaration: 1,
          flatTernaryExpressions: false,
          // list derived from https://github.com/benjamn/ast-types/blob/HEAD/def/jsx.js
          ignoredNodes: [
            "JSXElement",
            "JSXElement > *",
            "JSXAttribute",
            "JSXIdentifier",
            "JSXNamespacedName",
            "JSXMemberExpression",
            "JSXSpreadAttribute",
            "JSXExpressionContainer",
            "JSXOpeningElement",
            "JSXClosingElement",
            "JSXFragment",
            "JSXOpeningFragment",
            "JSXClosingFragment",
            "JSXText",
            "JSXEmptyExpression",
            "JSXSpreadChild",
          ],
          ignoreComments: false,
        },
      ],

      // enforces spacing between keys and values in object literal properties
      // https://eslint.style/rules/default/key-spacing
      "@stylistic/key-spacing": ["warn", { beforeColon: false, afterColon: true }],

      // require a space before & after certain keywords
      // https://eslint.style/rules/default/keyword-spacing
      "@stylistic/keyword-spacing": [
        "warn",
        {
          before: true,
          after: true,
          overrides: {
            return: { after: true },
            throw: { after: true },
            case: { after: true },
          },
        },
      ],

      // disallow mixed 'LF' and 'CRLF' as linebreaks
      // https://eslint.style/rules/default/linebreak-style
      "@stylistic/linebreak-style": ["warn", "unix"],

      // require or disallow an empty line between class members
      // https://eslint.style/rules/default/lines-between-class-members
      "@stylistic/lines-between-class-members": [
        "warn",
        "always",
        { exceptAfterSingleLine: true },
      ],

      // require or disallow newlines around directives
      // https://eslint.org/docs/rules/lines-around-directive
      "lines-around-directive": [
        "warn",
        {
          before: "always",
          after: "always",
        },
      ],

      // specify the maximum length of a line in your program
      // https://eslint.style/rules/default/max-len
      "@stylistic/max-len": [
        "warn",
        100,
        2,
        {
          ignoreUrls: true,
          ignoreComments: false,
          ignoreRegExpLiterals: true,
          ignoreStrings: true,
          ignoreTemplateLiterals: true,
        },
      ],

      // require a capital letter for constructors
      "new-cap": [
        "warn",
        {
          newIsCap: true,
          newIsCapExceptions: [],
          capIsNew: false,
          capIsNewExceptions: ["Immutable.Map", "Immutable.Set", "Immutable.List"],
        },
      ],

      // disallow the omission of parentheses when invoking a constructor with no arguments
      // https://eslint.style/rules/default/new-parens
      "@stylistic/new-parens": "warn",

      // enforces new line after each method call in the chain to make it
      // more readable and easy to maintain
      // https://eslint.style/rules/default/newline-per-chained-call
      "@stylistic/newline-per-chained-call": ["warn", { ignoreChainWithDepth: 4 }],

      // disallow use of the Array constructor
      "@typescript-eslint/no-array-constructor": "warn",

      // disallow un-paren'd mixes of different operators
      // https://eslint.org/docs/rules/no-mixed-operators
      "@stylistic/no-mixed-operators": [
        "warn",
        {
          // the list of arithmetic groups disallows mixing `%` and `**`
          // with other arithmetic operators.
          groups: [
            ["%", "**"],
            ["%", "+"],
            ["%", "-"],
            ["%", "*"],
            ["%", "/"],
            ["/", "*"],
            ["&", "|", "<<", ">>", ">>>"],
            ["==", "!=", "===", "!=="],
            ["&&", "||"],
          ],
          allowSamePrecedence: false,
        },
      ],

      // disallow mixed spaces and tabs for indentation
      // https://eslint.style/rules/default/no-mixed-spaces-and-tabs
      "@stylistic/no-mixed-spaces-and-tabs": "warn",

      // disallow use of chained assignment expressions
      // https://eslint.org/docs/rules/no-multi-assign
      "no-multi-assign": ["warn"],

      // disallow multiple empty lines, only one newline at the end,
      // and no new lines at the beginning
      // https://eslint.style/rules/default/no-multiple-empty-lines
      "@stylistic/no-multiple-empty-lines": ["warn", { max: 1, maxBOF: 0, maxEOF: 0 }],

      // disallow nested ternary expressions
      "no-nested-ternary": "warn",

      // disallow use of the Object constructor
      "no-new-object": "warn",

      // disallow certain syntax forms
      // https://eslint.org/docs/rules/no-restricted-syntax
      "no-restricted-syntax": [
        "warn",
        {
          selector: "ForInStatement",
          message:
      "for..in loops iterate over the entire prototype chain, which is virtually never what you want. Use Object.{keys,values,entries}, and iterate over the resulting array.",
        },
        {
          selector: "LabeledStatement",
          message:
      "Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand.",
        },
        {
          selector: "WithStatement",
          message:
      "`with` is disallowed in strict mode because it makes code impossible to predict and optimize.",
        },
      ],

      // disallow tab characters entirely
      // https://eslint.style/rules/default/no-tabs
      "@stylistic/no-tabs": "warn",

      // disallow trailing whitespace at the end of lines
      // https://eslint.style/rules/default/no-trailing-spaces
      "@stylistic/no-trailing-spaces": [
        "warn",
        {
          skipBlankLines: false,
          ignoreComments: false,
        },
      ],

      // disallow the use of Boolean literals in conditional expressions
      // also, prefer `a || b` over `a ? a : b`
      // https://eslint.org/docs/rules/no-unneeded-ternary
      "no-unneeded-ternary": ["warn", { defaultAssignment: false }],

      // disallow whitespace before properties
      // https://eslint.style/rules/default/no-whitespace-before-property
      "@stylistic/no-whitespace-before-property": "warn",

      // enforce the location of single-line statements
      // https://eslint.style/rules/default/nonblock-statement-body-position
      "@stylistic/nonblock-statement-body-position": ["warn", "beside", { overrides: {} }],

      // require padding inside curly braces
      // https://eslint.style/rules/default/object-curly-spacing
      "@stylistic/object-curly-spacing": ["warn", "always"],

      // enforce line breaks between braces
      // https://eslint.style/rules/default/object-curly-newline
      "@stylistic/object-curly-newline": [
        "warn",
        {
          ObjectExpression: { minProperties: 4, multiline: true, consistent: true },
          ObjectPattern: { minProperties: 4, multiline: true, consistent: true },
          ImportDeclaration: { minProperties: 4, multiline: true, consistent: true },
          ExportDeclaration: { minProperties: 4, multiline: true, consistent: true },
        },
      ],

      // enforce "same line" or "multiple line" on object properties.
      // https://eslint.style/rules/default/object-property-newline
      "@stylistic/object-property-newline": [
        "warn",
        {
          allowAllPropertiesOnSameLine: true,
        },
      ],

      // require assignment operator shorthand where possible or prohibit it entirely
      // https://eslint.org/docs/rules/operator-assignment
      "operator-assignment": ["warn", "always"],

      // Requires operator at the beginning of the line in multiline statements
      // https://eslint.style/rules/default/operator-linebreak
      "@stylistic/operator-linebreak": ["warn", "before", { overrides: { "=": "none" } }],

      // disallow padding within blocks
      // https://eslint.style/rules/default/padded-blocks
      "@stylistic/padded-blocks": [
        "warn",
        {
          blocks: "never",
          classes: "never",
          switches: "never",
        },
        {
          allowSingleLineBlocks: true,
        },
      ],

      // Disallow the use of Math.pow in favor of the ** operator
      // https://eslint.org/docs/rules/prefer-exponentiation-operator
      "prefer-exponentiation-operator": "warn",

      // Prefer use of an object spread over Object.assign
      // https://eslint.org/docs/rules/prefer-object-spread
      "prefer-object-spread": "warn",

      // require quotes around object literal property names
      // https://eslint.style/rules/default/quote-props.html
      "@stylistic/quote-props": [
        "warn",
        "as-needed",
        { keywords: false, unnecessary: true, numbers: false },
      ],

      // specify whether double or single quotes should be used
      // https://eslint.style/rules/default/quotes
      "@stylistic/quotes": ["warn", "double", { avoidEscape: true, allowTemplateLiterals: true }],

      // require or disallow use of semicolons instead of ASI
      // https://eslint.style/rules/default/semi
      "@stylistic/semi": ["warn", "always"],

      // enforce spacing before and after semicolons
      // https://eslint.style/rules/default/semi-spacing
      "@stylistic/semi-spacing": ["warn", { before: false, after: true }],

      // Enforce location of semicolons
      // https://eslint.style/rules/default/semi-style
      "@stylistic/semi-style": ["warn", "last"],

      // require or disallow space before blocks
      // https://eslint.style/rules/default/space-before-blocks
      "@stylistic/space-before-blocks": "warn",

      // require or disallow space before function opening parenthesis
      // https://eslint.style/rules/default/space-before-function-paren
      "@stylistic/space-before-function-paren": [
        "warn",
        {
          anonymous: "always",
          named: "never",
          asyncArrow: "always",
        },
      ],

      // require or disallow spaces inside parentheses
      // https://eslint.style/rules/default/space-in-parens
      "@stylistic/space-in-parens": ["warn", "never"],

      // require spaces around operators
      // https://eslint.style/rules/default/space-infix-ops
      "@stylistic/space-infix-ops": "warn",

      // Require or disallow spaces before/after unary operators
      // https://eslint.style/rules/default/space-unary-ops
      "@stylistic/space-unary-ops": [
        "warn",
        {
          words: true,
          nonwords: false,
          overrides: {},
        },
      ],

      // require or disallow a space immediately following the // or /* in a comment
      // https://eslint.style/rules/default/spaced-comment
      "@stylistic/spaced-comment": [
        "warn",
        "always",
        {
          line: {
            exceptions: ["-", "+"],
            markers: ["=", "!", "/"], // space here to support sprockets directives, slash for TS /// comments
          },
          block: {
            exceptions: ["-", "+"],
            markers: ["=", "!", ":", "::"], // space here to support sprockets directives and flow comment types
            balanced: true,
          },
        },
      ],

      // Enforce spacing around colons of switch statements
      // https://eslint.style/rules/default/switch-colon-spacing
      "@stylistic/switch-colon-spacing": ["warn", { after: true, before: false }],

      // Require or disallow spacing between template tags and their literals
      // https://eslint.style/rules/default/template-tag-spacing
      "@stylistic/template-tag-spacing": ["warn", "never"],

      // Disallow multiple spaces
      // https://eslint.style/rules/default/no-multi-spaces
      "@stylistic/no-multi-spaces": "warn",
    },
  },
  // BEST PRACTICES
  {
    rules: {
      "@typescript-eslint/default-param-last": "warn",
      "@typescript-eslint/dot-notation": ["warn", { allowKeywords: true }],
      "@typescript-eslint/no-implied-eval": "error",
      "@typescript-eslint/no-loop-func": "warn",
      "@typescript-eslint/no-redeclare": "error",
      "@typescript-eslint/no-unused-expressions": [
        "warn",
        {
          allowShortCircuit: false,
          allowTernary: false,
          allowTaggedTemplates: false,
        },
      ],
      "@typescript-eslint/return-await": "error",
      "@typescript-eslint/no-shadow": ["error", { allow: ["i", "j"] }],
      "no-shadow-restricted-names": "error",
      "@typescript-eslint/promise-function-async": "error",
      "@typescript-eslint/no-base-to-string": "off",

      // these clash with Svelte generics
      "@typescript-eslint/no-unsafe-assignment": "off",
      "@typescript-eslint/no-unsafe-call": "off",
      "@typescript-eslint/no-unsafe-argument": "off",
      "@typescript-eslint/no-unsafe-member-access": "off",
      "@typescript-eslint/no-unused-vars": "warn",
    },
  },

  // ERRORS
  {
    rules: {
      // Enforce “for” loop update clause moving the counter in the right direction
    // https://eslint.org/docs/rules/for-direction
      "for-direction": "error",

      // Enforces that a return statement is present in property getters
      // https://eslint.org/docs/rules/getter-return
      "getter-return": ["error", { allowImplicit: true }],

      // disallow using an async function as a Promise executor
      // https://eslint.org/docs/rules/no-async-promise-executor
      "no-async-promise-executor": "error",

      // Disallow await inside of loops
      // https://eslint.org/docs/rules/no-await-in-loop
      "no-await-in-loop": "error",

      // Disallow comparisons to negative zero
      // https://eslint.org/docs/rules/no-compare-neg-zero
      "no-compare-neg-zero": "error",

      // disallow assignment in conditional expressions
      "no-cond-assign": ["error", "always"],

      // disallow use of console
      "no-console": "warn",

      // Disallows expressions where the operation doesn't affect the value
      // https://eslint.org/docs/rules/no-constant-binary-expression
      "no-constant-binary-expression": "error",

      // disallow use of constant expressions in conditions
      "no-constant-condition": "warn",

      // disallow control characters in regular expressions
      "no-control-regex": "error",

      // disallow use of debugger
      "no-debugger": "error",

      // disallow duplicate arguments in functions
      "no-dupe-args": "error",

      // Disallow duplicate conditions in if-else-if chains
      // https://eslint.org/docs/rules/no-dupe-else-if
      "no-dupe-else-if": "error",

      // disallow duplicate keys when creating object literals
      "no-dupe-keys": "error",

      // disallow a duplicate case label.
      "no-duplicate-case": "error",

      // disallow empty statements
      "no-empty": "error",

      // disallow the use of empty character classes in regular expressions
      "no-empty-character-class": "error",

      // disallow assigning to the exception in a catch block
      "no-ex-assign": "error",

      // disallow double-negation boolean casts in a boolean context
      // https://eslint.org/docs/rules/no-extra-boolean-cast
      "no-extra-boolean-cast": "error",

      // disallow unnecessary parentheses
      // https://eslint.org/docs/rules/no-extra-parens
      "@typescript-eslint/no-extra-parens": [
        "warn",
        "all",
        {
          conditionalAssign: true,
          nestedBinaryExpressions: false,
          returnAssign: false,
          ignoreJSX: "all", // delegate to eslint-plugin-react
          enforceForArrowConditionals: false,
        },
      ],

      // disallow unnecessary semicolons
      "no-extra-semi": "error",

      // disallow overwriting functions written as function declarations
      "no-func-assign": "error",

      // https://eslint.org/docs/rules/no-import-assign
      "no-import-assign": "error",

      // disallow function or variable declarations in nested blocks
      "no-inner-declarations": "error",

      // disallow invalid regular expression strings in the RegExp constructor
      "no-invalid-regexp": "error",

      // disallow irregular whitespace outside of strings and comments
      "no-irregular-whitespace": "error",

      // Disallow Number Literals That Lose Precision
      // https://eslint.org/docs/rules/no-loss-of-precision
      "no-loss-of-precision": "error",

      // Disallow characters which are made with multiple code points in character class syntax
      // https://eslint.org/docs/rules/no-misleading-character-class
      "no-misleading-character-class": "error",

      // disallow the use of object properties of the global object (Math and JSON) as functions
      "no-obj-calls": "error",

      // Disallow new operators with global non-constructor functions
      // https://eslint.org/docs/latest/rules/no-new-native-nonconstructor
      "no-new-native-nonconstructor": "error",

      // Disallow returning values from Promise executor functions
      // https://eslint.org/docs/rules/no-promise-executor-return
      "no-promise-executor-return": "error",

      // disallow use of Object.prototypes builtins directly
      // https://eslint.org/docs/rules/no-prototype-builtins
      "no-prototype-builtins": "error",

      // disallow multiple spaces in a regular expression literal
      "no-regex-spaces": "error",

      // Disallow returning values from setters
      // https://eslint.org/docs/rules/no-setter-return
      "no-setter-return": "error",

      // disallow sparse arrays
      "no-sparse-arrays": "error",

      // Disallow template literal placeholder syntax in regular strings
      // https://eslint.org/docs/rules/no-template-curly-in-string
      "no-template-curly-in-string": "error",

      // Avoid code that looks like two expressions but is actually one
      // https://eslint.org/docs/rules/no-unexpected-multiline
      "no-unexpected-multiline": "error",

      // disallow unreachable statements after a return, throw, continue, or break statement
      "no-unreachable": "error",

      // Disallow loops with a body that allows only one iteration
      // https://eslint.org/docs/rules/no-unreachable-loop
      "no-unreachable-loop": "error",

      // disallow return/throw/break/continue inside finally blocks
      // https://eslint.org/docs/rules/no-unsafe-finally
      "no-unsafe-finally": "error",

      // disallow negating the left operand of relational operators
      // https://eslint.org/docs/rules/no-unsafe-negation
      "no-unsafe-negation": "error",

      // disallow use of optional chaining in contexts where the undefined value is not allowed
      // https://eslint.org/docs/rules/no-unsafe-optional-chaining
      "no-unsafe-optional-chaining": ["error", { disallowArithmeticOperators: true }],

      // Disallow Unused Private Class Members
      // https://eslint.org/docs/rules/no-unused-private-class-members
      "no-unused-private-class-members": "warn",

      // Disallow useless backreferences in regular expressions
      // https://eslint.org/docs/rules/no-useless-backreference
      "no-useless-backreference": "error",

      // disallow comparisons with the value NaN
      "use-isnan": "error",

      // ensure that the results of typeof are compared against a valid string
      // https://eslint.org/docs/rules/valid-typeof
      "valid-typeof": ["error", { requireStringLiterals: true }],
    },
  },

  // Ignore
  {
    ignores: [
      "dist/",
    ],
  },
];
