import postFlag from '../services/flag.services';

const postFlagController = (req, res) => {
  const { body } = req;
 
  const report = postFlag(body);
  if (!report) {
    return res.status(404).send({
      status: 'error',
      error: 'Car not found',
    });
  }

  return res.status(201).send({
    status: 'success',
    data: report,
  });
};

export default postFlagController;
