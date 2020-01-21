module.exports = {
    name: 'feature-defect-view',
    preset: '../../../../jest.config.js',
    coverageDirectory: '../../../../coverage/libs/feature/defect/view',
    snapshotSerializers: [
        'jest-preset-angular/AngularSnapshotSerializer.js',
        'jest-preset-angular/HTMLCommentSerializer.js'
    ]
};
