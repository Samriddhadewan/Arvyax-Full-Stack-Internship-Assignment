import sessionModel from "../models/sessionModel.js";

const getPublicSessions = async (req, res) => {
  try {
    const sessions = await sessionModel
      .find({ status: "published" })
      .populate("user_id", "name")  
      .sort({ created_at: -1 });

    res.json({ success: true, sessions });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getMySessions = async (req, res) => {
  try {
    const sessions = await sessionModel.find({ user_id: req.user._id });
    res.json({ success: true, sessions });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const getMySessionById = async (req, res) => {
  try {
    const session = await sessionModel.findOne({
      _id: req.params.id,
      user_id: req.user._id,
    });
    if (!session) return res.json({ message: "No session Found" });
    res.json({success: true, session})
  } catch (error) {
    res.json({success: false, message: error.message})
  }
};

const saveDraftSession = async (req, res) => {
  const { _id, title, tags, json_file_url } = req.body;

  if (_id) {
    //  If session _id is provided, update existing draft
    const updated = await sessionModel.findOneAndUpdate(
      { _id, user_id: req.user._id },
      { title, tags, json_file_url, status: 'draft', updated_at: new Date() },
      { new: true }
    );
    return res.json({ success: true, session: updated });
  }

  //  If no _id, create new draft
  const newSession = new sessionModel({
    user_id: req.user._id,
    title,
    tags,
    json_file_url,
    status: 'draft',
  });

  await newSession.save();
  res.json({ success: true, session: newSession });
};

const publishSession = async (req, res) => {
  try {
    const { _id, title, tags, json_file_url } = req.body;

    const updated = await sessionModel.findOneAndUpdate(
      { _id, user_id: req.user._id },
      { title, tags, json_file_url, status: 'published', updated_at: new Date() },
      { new: true, upsert: true }
    );
    res.json({ success: true, session: updated });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const getUserSessionStats = async(req, res)=>{
  try {
    const userId = req.user._id;

    const totalSessions = await sessionModel.countDocuments({user_id : userId});

    const draftSessions = await sessionModel.countDocuments({
      user_id: userId,
      status:"draft",
    });

    const publishedSessions = await sessionModel.countDocuments({
      user_id: userId,
      status: "published"
    })
    console.log(totalSessions)

    res.json({success: true, stats:{
      total : totalSessions,
      draft: draftSessions,
      published: publishedSessions,
    }})
  } catch (error) {
    res.json({success: false, message:error.message})
  }
}

const getMyPublishedSessions = async(req, res)=>{
  try {
     const userId = req.user._id;

     const sessions = await sessionModel.find({
      user_id: userId,
      status:'published',
     }).sort({ created_at: -1 })
     res.json({success: true, sessions})
  } catch (error) {
    res.json({success:false, message: error.message})
  }
}


export { getPublicSessions, getMySessions, getMySessionById, saveDraftSession, publishSession, getUserSessionStats, getMyPublishedSessions };
