## babel-plugin-jsx-attributes-array-to-object
A tool for transforming jsx attributes array to object.
## example
```js
var a = { color: 'red' };
  
<div style={[a, { color: 'gray' }]}></div>
```
and the configure like this:
```
// babel.config.js
[
  syntaxJSX,
  [require('babel-plugin-jsx-attributes-array-to-object
'), { attributes: ['style'] }],
]
```
the code will be transformed:
```js
var a = {
  color: 'red'
};
var b = {};
<div style={Object.assign({}, a, {
  color: 'gray'
})}></div>;
```

## Usage
### Step 1: Install
```sh
yarn add --dev babel-plugin-jsx-attributes-array-to-object
```
or
```sh
npm install --save-dev babel-plugin-jsx-attributes-array-to-object
```
### Step 1: Configure .babelrc
```js
{
  plugins: [
    [require('babel-plugin-jsx-attributes-array-to-object'), {
      attributes: ['style'],
    }]
  ]
}
```

