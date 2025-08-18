import asyncHandler from 'express-async-handler';
import mongoose from 'mongoose';
import Snippet from '../../models/snippets/SnippetModel.js';
export const createSnippet = asyncHandler(async(req,res)=>{
    try{
        const userId = req.user._id;
        const {title,description,code,language,tags,isPublic} = req.body;
        if(!userId || !title || !description || !code || !tags){
          return res.status(400).json({message:"all fields are empty"});
        }

        if(!userId){
            return res.status(400).json({message:"Unauthorized Please login"})
        }

        if(!title || title.length<3){
            return res.status(400).json({message:"Title is required and should be at least 3 character"})
        }

        if(!description || description.length<10){
            return res.status(400).json({message: "Description is required and should be at lead 10 character long"})
        }
        if(!code || code.length<10){
            return res.status(400).json({message: "Code is required and should be at lead 10 character long"})
        }

        if(!tags || tags.length==0 || !tags.every((tag)=> mongoose.Types.ObjectId.isValid(tag))){
            return res.status(400).json({message: "Please provide valid tags"});
        }

        const snippet = new Snippet({
            title,
            description,
            code,
            language,
            tags,
            isPublic,
            user: userId,
        })
        await snippet.save();
        res.status(200).json(snippet);
    }catch(err){
        console.log("Error in createSnippet",err);
        return res.status(500).json({message: "Internal server error"}); 
    }
})

export const getPublicSnippets = asyncHandler(async(req,res)=>{
    try {
        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 10;
        const userId = req.query.userId;
        const tagId = req.query.tagId;
        const search = req.query.search;

        const skip = (page-1) * limit;

        const query = {isPublic: true};
        if(userId){
            query.user = userId;
        }
        if(tagId){
            query.tags = tagId;
        }

        if(search){
            query.$or = [
                {title: {$regex: search, $options: "i"}},
                {description: {$regex: search, $options: "i"}},
            ]
        }

        const snippets = await Snippet.find(query)
        .populate("tags","name")
        .populate("user","name photo")
        .sort({createdAt: -1})
        .skip(skip)
        .limit(limit);

        const totalSnippets = await Snippet.countDocuments(query);
        
        return res.status(200).json({
            totalSnippets,
            totalPages: Math.ceil(totalSnippets/limit),
            currentPage : page,
            snippets,
        });
    } catch (error) {
          console.log("Error in getPublicSnippets",error);
        return res.status(500).json({message: "Internal server error"}); 
    }
})

export const getUserSnippets = asyncHandler(async(req,res)=>{
    try {
        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 10;
        const tagId = req.query.tagId;
        const search = req.query.search;
        const userId = req.user._id;

        if (!userId) {
      return res.status(401).json({ message: "Unauthorized! Please login" });
    }

        const skip = (page-1) * limit;

        const query = {user: userId};
        
        if(tagId){
            query.tags = { $in: [tagId] };
        }

        if(search){
            query.$or = [
                {title: {$regex: search, $options: "i"}},
                {description: {$regex: search, $options: "i"}},
            ]
        }
        
        const snippets = await Snippet.find(query)
        .populate("tags","name")
        .populate("user","name photo")
        .sort({createdAt: -1})
        .skip(skip)
        .limit(limit);

        const totalSnippets = await Snippet.countDocuments({user: userId});
        
        return res.status(200).json({
            totalSnippets,
            totalPages: Math.ceil(totalSnippets/limit),
            currentPage : page,
            snippets,
        });
    } catch (error) {
          console.log("Error in getPublicSnippets",error);
        return res.status(500).json({message: "Internal server error"}); 
    }
})

export const getUserSnippet = asyncHandler(async(req,res)=>{
    try {
         const userId = req.user._id;
         const snippetId = req.params.id;

         if(!userId){
            return res.status(400).json({message:"Authentication required please login"});
         }

         const snippet = await Snippet.findOne({_id:snippetId,user:userId})
         .populate("tags","name")
        .populate("user","name photo")

        return res.status(200).json(snippet);
    } catch (error) {
        console.log("Error in getPublicSnippet",error);
        return res.status(500).json({message: "Internal server error"});
    }
})

export const getPublicSnippet = asyncHandler(async (req, res) => {
  try {
    const snippetId = req.params.id;

    const snippet = await Snippet.findOne({ _id: snippetId, isPublic: true })
      .populate("tags", "name")
      .populate("user", "_id name photo");

    return res.status(200).json(snippet);
  } catch (error) {
    console.log("Error in getPublicSnippet", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

export const updateSnippet = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;
    const snippetId = req.params.id;
    const { title, description, code, language, tags, isPublic } = req.body;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized! Please login" });
    }

    const snippet = await Snippet.findOne({ _id: snippetId, user: userId });

    if (!snippet) {
      return res.status(404).json({ message: "Snippet not found" });
    }

    snippet.title = title || snippet.title;
    snippet.description = description || snippet.description;
    snippet.code = code || snippet.code;
    snippet.language = language || snippet.language;
    snippet.tags = tags || snippet.tags;
    snippet.isPublic = isPublic || snippet.isPublic;

    await snippet.save();

    return res.status(200).json(snippet);
  } catch (error) {
    console.log("Error in updateSnippet", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

export const deleteSnippet = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;
    const snippetId = req.params.id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized! Please login" });
    }

    const snippet = await Snippet.findOne({ _id: snippetId, user: userId });

    if (!snippet) {
      return res.status(404).json({ message: "Snippet not found" });
    }

    await Snippet.deleteOne({ _id: snippetId });

    return res.status(200).json({ message: "Snippet deleted successfully" });
  } catch (error) {
    console.log("Error in deleteSnippet", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

export const likeSnippet = asyncHandler(async(req,res)=>{
    try {
        const snippetId = req.params.id;
        const userId = req.user._id;

        let snippet = await Snippet.findById(snippetId);
        if(!snippet){
             return res.status(404).json({ message: "Snippet not found" });
        }

        if(snippet.likedBy.includes(userId)){
            snippet.likes -=1;
            snippet.likedBy = snippet.likedBy.filter((id)=>{
                return id.toString() != userId.toString();
            })
            await snippet.save();

            return res.status(200).json({
                message:"Snippet like removed",
                likes: snippet.likes});
        }else{
            snippet.likes +=1;
            snippet.likedBy.push(userId);
            await snippet.save();

            return res.status(200).json({
                message: "Snippet liked successfully",
                likes: snippet.likes});
        }

    } catch (error) {
        console.log("Error in likeSnippet", error);
        return res.status(500).json({ message: "Internal server error" });
    }
})

export const getLikedSnippets = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;
    const tagId = req.query.tagId;
    const search = req.query.search;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized! Please login" });
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    // number of documents to skip
    const skip = (page - 1) * limit;

    //build the query object
    const query = { likedBy: userId }; // check if the user has liked the snippet

    if (tagId) {
      // filter by tagId if tagId is provided --> selects documnets whoses field array contains at least one element with a value in the specified array
      query.tags = { $in: [tagId] };
    }

    // search by title or description
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } }, // i for case-insensitive
        { description: { $regex: search, $options: "i" } },
      ];
    }

    // fetch the paginated liked snippets
    const snippets = await Snippet.find(query)
      .populate("tags", "name")
      .populate("user", "_id name photo")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    // get total snippets
    const totalSnippets = await Snippet.countDocuments(query);

    // send a paginated response
    return res.status(200).json({
      totalSnippets,
      totalPages: Math.ceil(totalSnippets / limit),
      currentPage: page,
      snippets,
    });
  } catch (error) {
    console.log("Error in getLikedSnippets", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

export const getLeaderboard = asyncHandler(async(req,res)=>{
    try {

        const leaderboard = await Snippet.aggregate([
            {
                $group: {
                    _id: "$user",
                    totalLikes: {$sum: "$likes"},
                    snippetCount: {$sum:1},
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "_id",
                    foreignField: "_id",
                    as: "userInfo",
                }
            },
            {
                $unwind: "$userInfo",
            },
            {
                $project: {
                    name: "$userInfo.name",
                    photo: "$userInfo.photo",
                    totalLikes: 1,
                    snippetCount: 1,
                    score: {
                        $add: [
                            {$toInt: "$totalLikes"},
                            {$multiply: ["$snippetCount",10]},
                        ],
                    }

                }
            },
            {
                $sort: {totalLikes: -1},
            },
            {
                $limit: 100,
            },
        ])

        return res.status(200).json(leaderboard);
        
    } catch (error) {
        console.log("Error in getLeaderboard", error);
        return res.status(500).json({ message: "Internal server error" });
    }
})

export const getPopularSnippets = asyncHandler(async(req,res)=>{
    try {
        const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const userId = req.query.userId;
    const tagId = req.query.tagId;
    const search = req.query.search;

    // calculate the number of documents to skip
    const skip = (page - 1) * limit;

    // build the query object
    const query = { isPublic: true };

    if (tagId) {
      // filter by tagId if tagId is provided
      query.tags = { $in: [tagId] };
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } }, // i for case-insensitive
        { description: { $regex: search, $options: "i" } },
      ];
    }

    const popularSnippets = await Snippet.find(query)
    .populate("tags","name")
    .populate("user","name photo")
    .sort({likes: -1})
    .skip(skip)
    .limit(limit*10);

    const shuffledSnippets = popularSnippets.sort(()=> 0.5-Math.random());

    const snippets = shuffledSnippets.slice((page-1) * limit,page * limit);

    return res.status(200).json({
        totalSnippets: popularSnippets.length,
        totalPages: Math.ceil(popularSnippets.length/limit),
        currentPage: page,
        snippets,
    })
    
    } catch (error) {
        console.log("Error in getPopularSnippets", error);
        return res.status(500).json({ message: "Internal server error" });
    }
})
