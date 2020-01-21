module.exports = {
    name: 'feature-dcp-state',
    preset: '../../../../jest.config.js',
    coverageDirectory: '../../../../coverage/libs/feature/dcp/state',
    snapshotSerializers: [
        'jest-preset-angular/AngularSnapshotSerializer.js',
        'jest-preset-angular/HTMLCommentSerializer.js'
    ]
};
