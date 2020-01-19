module.exports = {
    name: 'zsszym',
    preset: '../../jest.config.js',
    coverageDirectory: '../../coverage/apps/zsszym',
    snapshotSerializers: [
        'jest-preset-angular/AngularSnapshotSerializer.js',
        'jest-preset-angular/HTMLCommentSerializer.js'
    ]
};
