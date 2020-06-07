'use babel';

import * as React from 'react';
import { CompositeDisposable } from 'event-kit';

export default class ShortLinkMessageDialog extends React.Component {

  componentWillMount () {
    // Events subscribed to in Inkdrop's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this dialog
    this.subscriptions.add(inkdrop.commands.add(document.body, {
      'short-link:toggle': () => this.toggle()
    }));
  }

  componentWillUnmount () {
    this.subscriptions.dispose();
  }

  render() {
    const { MessageDialog } = inkdrop.components.classes;
    return (
      <MessageDialog ref='dialog' title='ShortLink'>
        ShortLink was toggled!
      </MessageDialog>
    );
  }

  toggle() {
    const cm = inkdrop.getActiveEditor().cm;
    // used to match the url in the [example](here://something)
    const urlRe = /\]\([\w:\-/?#\d\s.="']+\)/gmi;

    cm.doc
      .getValue() // get whole page content
      .split('\n') // make it an array
      .forEach((line, lineNum) => {
        let match;
        while ((match = urlRe.exec(line))) {
          const el = document.createElement('span');
          el.innerText = inkdrop.config.get('short-link.linkEmoji')

          cm.markText({
            line : lineNum,
            ch: match.index + 2 // from
          }, {
            line: lineNum,
            ch: urlRe.lastIndex - 1, // to
          }, {
            atomic: 1,
            replacedWith: el,
            clearOnEnter: true,
            handleMouseEvents: true,
          });
        }
      }
    );
    console.log('ShortLink ran successfully.');
  }
}
