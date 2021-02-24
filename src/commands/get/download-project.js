module.exports = async(cli, project, gitStatus) => {
    const projectData = (await cli.http(`/projects/${project._id}/${gitStatus}`, 'get')).data

    return projectData
}