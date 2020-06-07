'use babel';

import ShortLinkMessageDialog from './short-link-message-dialog';

module.exports = {

  activate() {
    inkdrop.components.registerClass(ShortLinkMessageDialog);
    inkdrop.layouts.addComponentToLayout(
      'modal',
      'ShortLinkMessageDialog'
    )
  },

  deactivate() {
    inkdrop.layouts.removeComponentFromLayout(
      'modal',
      'ShortLinkMessageDialog'
    )
    inkdrop.components.deleteClass(ShortLinkMessageDialog);
  },

  config: {
    linkEmoji: {
      title: 'Link emoji',
      type: 'string',
      description: 'Character used to substitute instead of the URL',
      default: '🔗'
    },
  }
};
