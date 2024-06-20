import * as github from "@actions/github";
import type { GetResponseDataTypeFromEndpointMethod } from "@octokit/types";
import { ForgeIntegration, CommentData, Reaction } from "./types.js";

export class GitHub implements ForgeIntegration {
  private api;

  constructor(token: string) {
    this.api = github.getOctokit(token);
  }

  private mapComment(c:
  GetResponseDataTypeFromEndpointMethod<typeof this.api.rest.issues.getComment>):
    CommentData {
    return {
      id: c.id,
      body: c.body,
      html_url: c.html_url,
    };
  }

  async getComments(params: {
    owner: string;
    repo: string;
    issue_number: number;
    page: number;
  }): Promise<CommentData[]> {
    const resp = await this.api.rest.issues.listComments(params);

    if (!resp.data) return [];

    // eslint-disable-next-line @typescript-eslint/unbound-method
    return resp.data.map(this.mapComment);
  }

  async createComment(params:
  { owner: string; repo: string; issue_number: number; body: string; }): Promise<CommentData> {
    const data = await this.api.rest.issues.createComment(params);
    return this.mapComment(data.data);
  }

  async updateComment(params:
  { owner: string; repo: string; comment_id: number; body: string; }): Promise<CommentData> {
    const data = await this.api.rest.issues.updateComment(params);
    return this.mapComment(data.data);
  }

  async deleteComment(params:
  { owner: string; repo: string; comment_id: number; }): Promise<CommentData> {
    const data = await this.api.rest.issues.deleteComment(params);
    return this.mapComment(data.data);
  }

  async addReaction({
    owner, repo, comment_id, reaction,
  }: { owner: string; repo: string; comment_id: number; reaction: Reaction; }): Promise<void> {
    await this.api.rest.reactions.createForIssueComment({
      owner,
      repo,
      comment_id,
      content: reaction,
    });
  }
}
