import { Comment, giteaApi } from "gitea-js";
import { ForgeIntegration, CommentData } from "./types.js";

function mapComment(c: Comment): CommentData {
  if (!c.id || !c.html_url) throw new Error("invalid comment data: " + JSON.stringify(c));
  return {
    id: c.id,
    body: c.body,
    html_url: c.html_url,
  };
}

export class Gitea implements ForgeIntegration {
  private api;

  constructor(token: string) {
    this.api = giteaApi("https://try.gitea.com/", { token });
  }

  async getComments(
    {
      owner, repo, issue_number, page,
    }:
    { owner: string; repo: string; issue_number: number; page: number },
  ): Promise<CommentData[]> {
    if (page > 1) return []; // Gitea does not support pagination
    const data = await this.api.repos.issueGetComments(owner, repo, issue_number);
    if (data.error) {
      throw new Error(data.error);
    }
    return data.data.map(mapComment);
  }

  async createComment({
    owner, repo, issue_number, body,
  }: { owner: string; repo: string; issue_number: number; body: string; }): Promise<CommentData> {
    const data = await this.api.repos.issueCreateComment(owner, repo, issue_number, { body });
    if (data.error) {
      throw new Error(data.error);
    }
    return mapComment(data.data);
  }

  async updateComment({
    owner, repo, comment_id, body,
  }: { owner: string; repo: string; comment_id: number; body: string; }): Promise<CommentData> {
    const data = await this.api.repos.issueEditComment(owner, repo, comment_id, { body });
    if (data.error) {
      throw new Error(data.error);
    }
    return mapComment(data.data);
  }

  async deleteComment({ owner, repo, comment_id }:
  { owner: string; repo: string; comment_id: number; }): Promise<CommentData> {
    const data = await this.api.repos.issueDeleteComment(owner, repo, comment_id);
    if (data.error) {
      throw new Error(data.error);
    }
    return mapComment(data.data);
  }

  async addReaction({
    owner, repo, comment_id, reaction,
  }: { owner: string; repo: string; comment_id: number; reaction: string; }): Promise<void> {
    const data = await this.api.repos.issuePostCommentReaction(
      owner,
      repo,
      comment_id,
      { content: reaction },
    );
    if (data.error) {
      throw new Error(data.error);
    }
  }
}
