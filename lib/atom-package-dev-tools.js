'use babel';

import { CompositeDisposable } from 'atom';

export default {

  subscriptions: null,

  activate() {
    this.subscriptions = new CompositeDisposable();
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-package-dev-tools:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.subscriptions.dispose();
  },

  toggle() {
    console.log('AtomPackageDevTools was toggled!');
  }

};
