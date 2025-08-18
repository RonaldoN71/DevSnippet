import express from 'express';
import {bulkAddTags,createTag,getTag,getTagById,deleteTag} from '../controllers/tags/tagController.js';
import {adminMiddleware,protect} from '../middleware/authMiddleware.js';
const router = express.Router();

router.post("/bulk-tags",protect,adminMiddleware,bulkAddTags);
router.post("/create-tag",protect,createTag)
router.get("/get-tags",protect,getTag);
router.get("/get-tag/:id",protect,getTagById);
router.delete("/delete-tag/:id",protect,deleteTag);
export default router ;