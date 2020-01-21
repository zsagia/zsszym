module.exports = {
    name: 'feature-defect-data',
    preset: '../../../../jest.config.js',
    coverageDirectory: '../../../../coverage/libs/feature/defect/data',
    snapshotSerializers: [
        'jest-preset-angular/AngularSnapshotSerializer.js',
        'jest-preset-angular/HTMLCommentSerializer.js'
    ]
};
