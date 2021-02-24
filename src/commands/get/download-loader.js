module.exports = (cli, project) => {
    return cli.loading([
        'Sending request..',
        'Receiving the html files..',
        'Receiving the hook files..',
        'Receiving the css files..',
        'Receiving the settings files..',
        'Receiving the font files..',
        'Receiving the image files..',
    ], 1300, 'Your project is ready!')
}