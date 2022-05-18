import { Router } from "express";
import { loginRequired } from "../middlewares/loginRequired";
import { CommentService } from "../service/commentService";

const commentRouter = Router();

// commentRouter.use(loginRequired);

// 댓글 작성
commentRouter.post("/comments/comment", async (req, res) => {
  try {
    CommentService.create(req.body);
    return res.status(201).json({ sucess: true });
  } catch (err) {
    console.log(err);
  }
});

// 댓글 1개 조회
commentRouter.get("/comments/:comment_id", async (req, res) => {
  try {
    const comment_id = req.params.comment_id;
    CommentService.getComment(comment_id).then((comment) => {
      res.status(200).json({ success: true, comment });
    });
  } catch (err) {
    return res.json({ success: false });
  }
});

// 비디오에 해당하는 댓글 모두 조회
commentRouter.get("/:video_id/comments", async (req, res) => {
  try {
    const video_id = req.params.video_id;
    CommentService.getComments(video_id).then((comments) => {
      res.status(200).json({ success: true, comments });
    });
  } catch (err) {
    return res.json({ success: false });
  }
});

export { commentRouter };
