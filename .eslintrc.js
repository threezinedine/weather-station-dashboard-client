module.exports = {
	   "env": {
        "browser": true,
        "es2021": true
	   },
	   "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended"
	   ],
    "ignorePatterns": ["src/App.tsx", "src/index.tsx", "src/reportWebVitals.ts"],
	   "overrides": [
	   ],
	   "parser": "@typescript-eslint/parser",
	   "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
	   "plugins": [
		      "react",
		      "@typescript-eslint"
	   ],
	   "rules": {
		      "indent": [
			         "error",
			         4, 
        ],
        "linebreak-style": [
            "error",
            "windows"
        ],
        "quotes": [
            "error",
            "double"
        ],
        "semi": [
            "error",
            "never"
        ]
	   }
}
