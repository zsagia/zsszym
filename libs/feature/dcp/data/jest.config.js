module.exports = {
    name: 'feature-dcp-data',
    preset: '../../../../jest.config.js',
    coverageDirectory: '../../../../coverage/libs/feature/dcp/data',
    snapshotSerializers: [
        'jest-preset-angular/AngularSnapshotSerializer.js',
        'jest-preset-angular/HTMLCommentSerializer.js'
    ]
};
