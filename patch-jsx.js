// TODO this will be removed after: https://github.com/angular/angular-cli/issues/8046

const replace = require('replace-in-file');
const filesToFix = [
    {
        files: 'node_modules/@angular/cli/models/webpack-configs/typescript.js',
        from: [/\.ts\$/g, /\\.ts\)\$/],
        to: ['.(ts|tsx)$', '\\.ts|\\.tsx)$']
    },
    {
        files: 'node_modules/@ngtools/webpack/src/angular_compiler_plugin.js',
        from: ['k => k.endsWith(\'.ts\')', '?\\.ts$/', '/\\.ts|ngfactory\\.js$/', '/.ts$/', '(fileName.endsWith(\'.ts\')', '(request.request.endsWith(\'.ts\')', '(?:ts|html|css|scss|sass|less|styl)'],
        to: ['k => (k.endsWith(\'.ts\') || k.endsWith(\'.tsx\'))', '?\\.(ts|tsx)$/', '/\\.ts|\\.tsx|ngfactory\\.js$/', '/.(ts|tsx)$/',
            '((fileName.endsWith(\'.tsx\') || fileName.endsWith(\'.ts\'))', '((request.request.endsWith(\'.tsx\') || request.request.endsWith(\'.ts\'))', '(?:tsx?|html|css|scss|sass|less|styl)']
    },
    {
        files: 'node_modules/@angular/cli/models/webpack-configs/common.js',
        from: ['[\'.ts\', \'.js\']'],
        to: ['[\'.ts\', \'.js\', \'.tsx\']']
    },
    {
        files: 'node_modules/@ngtools/webpack/src/entry_resolver.js',
        from: ['/\\.ts$/'],
        to: ['/\\.(ts|tsx)$/']
    },
    {
        files: 'node_modules/@ngtools/webpack/src/loader.js',
        from: ['(sourceFileName.endsWith(\'.ts\'))'],
        to: ['(sourceFileName.endsWith(\'.ts\') || sourceFileName.endsWith(\'.tsx\'))']
    },
    {
        files: 'node_modules/@ngtools/webpack/src/plugin.js',
        from: ['|| (request.context.issuer && request.context.issuer.endsWith(\'.ts\')))) {', '/(\\.d)?\\.ts$/'],
        to: ['|| request.request.endsWith(\'.tsx\')\n' +
        '          || (request.context.issuer && request.context.issuer.endsWith(\'.ts\'))\n' +
        '          || (request.context.issuer && request.context.issuer.endsWith(\'.tsx\')))) {',
            '/(\\.d)?\\.(ts|tsx)$/']
    },
    {
        files: 'node_modules/@ngtools/webpack/src/refactor.js',
        from: ['/\\.ts$/'],
        to: ['/\\.(ts|tsx)$/']
    },
    {
        files: 'node_modules/@angular/cli/tasks/schematic-run.js',
        from: ['/.ts$/'],
        to: ['/.(ts|tsx)$/']
    },
    {
        files: 'node_modules/@angular/cli/models/webpack-configs/test.js',
        from: ['/\\.(e2e|spec)\\.ts$/'],
        to: ['/\\.(e2e|spec)\\.(ts|tsx)$/']
    },
    {
        files: ['node_modules/@angular/cli/commands/completion.js', 'node_modules/@angular/cli/commands/help.js'],
        from: ['/\\.(j|t)s$/'],
        to: ['/\\.(js|ts|tsx)$/']
    },
    {
        files: 'node_modules/@ngtools/webpack/src/transformers/ast_helpers.js',
        from: ['/\\.ts$/'],
        to: ['/\\.(ts|tsx)$/']
    },
    {
        files: 'node_modules/@ngtools/webpack/src/paths-plugin.js',
        from: ['!request.contextInfo.issuer.endsWith(\'.ts\')', 'return callback(null, request);'],
        to: ['!(request.contextInfo.issuer.endsWith(\'.ts\') || request.contextInfo.issuer.endsWith(\'.tsx\'))',
            `if (!request.contextInfo.issuer || request.contextInfo.issuer.indexOf('node_modules') > -1 || !request.contextInfo.issuer.endsWith('component.js')) {
            return callback(null,request);
        }`
        ]
    },
];

filesToFix.forEach((i) => {
    try {

        const changes = replace.sync(i);
        if (changes.length > 0) {
            console.log('Modified files:', changes.join(', '));
        }
    }
    catch (error) {
        console.error('Error occurred:', error);
    }
});