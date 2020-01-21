module.exports = {
    name: 'feature-dcp-api',
    preset: '../../../../jest.config.js',
    coverageDirectory: '../../../../coverage/libs/feature/dcp/api',
    snapshotSerializers: [
        'jest-preset-angular/AngularSnapshotSerializer.js',
        'jest-preset-angular/HTMLCommentSerializer.js'
    ]
};
