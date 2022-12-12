const checkNewSurvey =  (req, res) => {
  try {
    const {survey, userAddress} = req.body;
    if(!survey) return res.status(400).json({ message: 'No survey data present'});
    // Verify client side checks here - e.g data format + layout + rate limits for free users
    if(!userAddress) {
      // Ensure less than 5 questions or faile
    } else {
      // Check user owns NFT + if not limit to 5 questions
    }
    return survey
  } catch (err) {
    return res.status(500).json({ message: 'An error occured' });
  }
};

export default checkNewSurvey;