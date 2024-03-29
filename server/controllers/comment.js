const { Comment } = require('./../models/db');

const getUserComments = async (req, res) => {

  try {
    const { email } = req.user;
    const comments = await Comment.findAll({ where: { "UserEmail": email } });
    const collection = {};
    comments.forEach(comment => {
      collection[comment.fen] ? collection[comment.fen][comment.id] = comment : collection[comment.fen] = {[comment.id] : comment};
    });
    res.status(200).send(collection);
  } catch (error){
    res.status(404).send({ error, message: 'User not found' });
  }

};

const addUserComment = async (req, res) => {
  try {
    const { email } = req.user;
    const newComment = await Comment.create({
      ...req.body,
      "UserEmail": email
    });
    res.status(200).send(newComment);
  } catch (error) {
    res.status(500).send({ error, message: 'Could not add Comment' });
  }
};

const editUserComment = async (req, res) => {
  try {
    const { email } = req.user;
    const commentToEdit = await Comment.findOne({ where: { id: req.body.id, "UserEmail": email } });
    commentToEdit.title = req.body.title;
    commentToEdit.text = req.body.text;
    commentToEdit.tags = req.body.tags;
    commentToEdit.source = req.body.source;
    commentToEdit.fen = req.body.fen;

    await commentToEdit.save();
    res.status(200).send({message :'Comment Updated Successfully'});
  } catch (error) {
    res.status(500).send({ error, message: 'Could not update Comment' });
  }
};

const deleteUserComment = async (req, res) => {
  try {
    const { email } = req.user;
    const commentToDelete = await Comment.findOne({ where: {id : req.body.id, "UserEmail" : email } });
    await commentToDelete.destroy();
    res.status(200).send({ message: 'Comment Deleted Successfully' });
  } catch (error) {
    res.status(500).send({ error, message: 'Could not delete Comment' });
  }
};

module.exports = { addUserComment, getUserComments, deleteUserComment, editUserComment };