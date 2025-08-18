import express from 'express';
import {createSnippet,getPublicSnippets,getUserSnippets,getUserSnippet,getPublicSnippet,updateSnippet,deleteSnippet,likeSnippet,getLikedSnippets,getLeaderboard} from '../controllers/snippets/snippetsController.js';
import {protect} from '../middleware/authMiddleware.js';

const router = express.Router();

router.post("/create-snippet",protect,createSnippet);
router.get("/snippets/public",getPublicSnippets);
router.get("/snippets",protect,getUserSnippets);
router.get("/snippet/:id",protect,getUserSnippet);
router.get("/snippet/public/:id",protect,getPublicSnippet);

//update snippet
router.patch("/snippet/:id",protect,updateSnippet)
//delete snippet
router.delete("/snippet/:id",protect,deleteSnippet);
// like a snippet
router.patch("/snippet/like/:id",protect,likeSnippet);
// get liked snippets
router.get("/snippets/liked",protect,getLikedSnippets);
router.get("/leaderboard",protect,getLeaderboard);
export default router;