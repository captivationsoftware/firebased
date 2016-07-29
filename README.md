firebased
============
Redux-inspired higher order component for Firebase and React

## Installation
```sh
npm install --save firebased
```

## Usage

### Top Level
```js
import React, { Component } from 'react';
import { FirebaseProvider } from 'firebased';

class TopLevelComponent extends Component ({
  render() {
    return (
      <FirebaseProvider config={{
        apiKey: '<your-api-key>',
        authDomain: '<your-auth-domain>',
        databaseURL: '<your-database-url>',
        storageBucket: '<your-storage-bucket>'
      }}>
        { /* App-Specific components here */ }
      </FirebaseProvider>
 }}>
```

### Components with static firebased arguments
```js
import React, { Component } from 'react';
import { firebased } from 'firebased';

@firebased({ items: 'items' })
class MyComponent extends Component {
  render() {
    // this.props.items will contain the value provided by Firebase at ref 'items'
    const list = this.props.items.map(n => <li>{n}</li>);
    return (
      <ul>
        { list }
      </ul>
    );
  }
}
```

### Components with dynamic firebased arguments
```js
import React, { Component } from 'react';
import { firebased } from 'firebased';

@firebased(props => ({ user: `users/${props.userId}` }))
class MyComponent extends Component {
  render() {
    // If this.props.userId were to equal 12345, this.props.user will
    // contain the value provided by Firebase at ref 'users/12345'.
    const user = this.props.user;
    return (
      <h1>Hello, { user.name }!</h1>
    );
  }
}
```

### Additional Props
In addition to the above, for each named prop above (i.e. `items`, `user`), each
component would also receive firebase ref's as `itemsRef` and `userRef`, respectively.

Also, every `@firebased` component also is passed firebase as a prop named `firebase`.

### License
MIT

### Author
Dave Barbalato, Captivation Software
