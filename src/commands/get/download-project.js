const axios = require('axios')

module.exports = async(cli, project, gitStatus) => {
    const projectData = (await cli.http(`/projects/${project._id}/${gitStatus}`, 'get')).data

    for (let i = 0; i < projectData.files.length; i++) {
        const file = projectData.files[i]
        const image = await axios.get(file.url, { responseType: 'arraybuffer' })
        file.content = Buffer.from(image.data).toString('base64')
        projectData.files[i] = file
    }

    return projectData
}