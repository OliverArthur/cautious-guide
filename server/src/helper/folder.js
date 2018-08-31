async function deleteSubfolders(id) {
  const folders = await Folder.find({parent: id})
  for (const folder of folders) {
    await deleteSubfolders(folder.id)
    await Folder.deleteOne({_id: folder.id})
  }
}

module.exports = { deleteSubfolders }
