module.exports = cli => {
    return cli.loading([
        'Sending project data..',
        'Uploading new files..',
        'Saving new code files..',
        'Cloning PWA project..',
        'Transpiling and creating the PWA..',
        'Adding the settings in the PWA..',
        'Compiling the PWA..',
        'Uploading the build..',
        'Configuring hosting..',
        'Receiving the destination url..',
    ], 3200, 'Published project, access:')
}