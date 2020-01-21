module.exports = {
    name: 'feature-defect-state',
    preset: '../../../../jest.config.js',
    coverageDirectory: '../../../../coverage/libs/feature/defect/state',
    snapshotSerializers: [
        'jest-preset-angular/AngularSnapshotSerializer.js',
        'jest-preset-angular/HTMLCommentSerializer.js'
    ]
};
