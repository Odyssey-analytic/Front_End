import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
    tutorialSidebar: [
        'intro',
        {
            type: 'category',
            label: 'Getting Started',
            items: [
                'getting-started/unity-integration',
                'getting-started/bootstrapper', // Added this line
            ],
        },
        {
            type: 'category',
            label: 'Core Concepts',
            items: ['core-concepts/session-handler', 'core-concepts/events', 'core-concepts/adapters-overview'],
        },
        {
            type: 'category',
            label: 'Adapters',
            items: ['adapters/default-logger', 'adapters/rest-adapter', 'adapters/rabbitmq-adapter', 'adapters/sqllite-adapters', 'adapters/custom-adapter'],
        },
        {
            type: 'category',
            label: 'API Reference',
            items: ['api-reference/ilogger', 'api-reference/igateway-port', 'api-reference/imessage-publisher-port', 'api-reference/iconnectable-publisher', 'api-reference/idatabase-port'],
        }
    ],
};

export default sidebars;