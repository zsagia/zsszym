module.exports = {
    name: 'feature-defect-api',
    preset: '../../../../jest.config.js',
    coverageDirectory: '../../../../coverage/libs/feature/defect/api',
    snapshotSerializers: [
        'jest-preset-angular/AngularSnapshotSerializer.js',
        'jest-preset-angular/HTMLCommentSerializer.js'
    ]
};
