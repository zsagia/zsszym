module.exports = {
    name: 'feature-dcp-view',
    preset: '../../../../jest.config.js',
    coverageDirectory: '../../../../coverage/libs/feature/dcp/view',
    snapshotSerializers: [
        'jest-preset-angular/AngularSnapshotSerializer.js',
        'jest-preset-angular/HTMLCommentSerializer.js'
    ]
};
