import {
  COMMENT_TAG_ID,
  CommentData, ForgeIntegration, REACTIONS, Reaction,
} from "./types.js";
import * as core from "@actions/core";
import { Gitea } from "./gitea.js";
import { GitHub } from "./github.js";
import { env } from "process";

export class CommentClient implements ForgeIntegration {
  private api: ForgeIntegration;

  constructor(token: string, gitea: boolean) {
    if (gitea) {
      this.api = new Gitea(token);
    } else {
      this.api = new GitHub(token);
    }
  }

  static fromEnv(): CommentClient {
    return new CommentClient(core.getInput("GITHUB_TOKEN"), Boolean(env.GITEA_ACTIONS));
  }

  async getComments(params:
  { owner: string; repo: string; issue_number: number; page: number; }): Promise<CommentData[]> {
    return this.api.getComments(params);
  }

  async createComment(params:
  { owner: string; repo: string; issue_number: number; body: string; }): Promise<CommentData> {
    return this.api.createComment(params);
  }

  async updateComment(params:
  { owner: string; repo: string; comment_id: number; body: string; }): Promise<CommentData> {
    return this.api.updateComment(params);
  }

  async deleteComment(params:
  { owner: string; repo: string; comment_id: number; }): Promise<CommentData> {
    return this.api.deleteComment(params);
  }

  async addReaction(params:
  { owner: string; repo: string; comment_id: number; reaction: Reaction; }): Promise<void> {
    return this.api.addReaction(params);
  }

  /**
   * Add multiple reactions to a comment. The reaction IDs have to be joind with commas.
   */
  async addReactions(
    {
      owner, repo, comment_id, reactions,
    }: { owner: string; repo: string; comment_id: number; reactions: string; },
  ) {
    const validReactions = <Reaction[]>reactions
      .replace(/\s/g, "")
      .split(",")
      .filter((reaction) => REACTIONS.includes(<Reaction>reaction));

    await Promise.allSettled(
      validReactions.map(async (reaction) => {
        await this.api.addReaction({
          owner, repo, comment_id, reaction,
        });
      }),
    );
  }

  /**
   * Find the first comment containing the given pattern
   */
  async findComment({
    owner, repo, issue_number, pattern,
  }: { owner: string, repo: string, issue_number: number, pattern: string }):
    Promise<CommentData | null> {
    let page = 1;
    // eslint-disable-next-line no-constant-condition
    while (true) {
      // eslint-disable-next-line no-await-in-loop
      const comments = await this.api.getComments({
        owner, repo, issue_number, page,
      });
      if (comments.length === 0) break;
      const comment = comments.find((c) => c?.body?.includes(pattern));
      if (comment) return comment;
      page++;
    }
    return null;
  }

  /**
   * Get a list of comments containing the given pattern
   */
  async findComments({
    owner, repo, issue_number, pattern,
  }: { owner: string, repo: string, issue_number: number, pattern: string }):
    Promise<CommentData[]> {
    let page = 1;
    const res = [];
    // eslint-disable-next-line no-constant-condition
    while (true) {
      // eslint-disable-next-line no-await-in-loop
      const comments = await this.api.getComments({
        owner, repo, issue_number, page,
      });
      if (comments.length === 0) break;
      res.push(...comments.filter((c) => c?.body?.includes(pattern)));
      page++;
    }
    return res;
  }

  /**
   * Add/update an issue comment
   */
  async doComment({
    owner, repo, issue_number, content, comment_tag, reactions, recreate, create_if_not_exists,
  }: {
    owner: string,
    repo: string,
    issue_number: number,
    content: string,
    comment_tag?: string,
    reactions?: string,
    recreate?: boolean,
    create_if_not_exists?: boolean,
  }): Promise<void> {
    const comment_tag_pattern = comment_tag
      ? `<!-- ${COMMENT_TAG_ID} "${comment_tag}" -->`
      : null;
    const body = comment_tag_pattern ? `${content}\n${comment_tag_pattern}` : content;
    const target = `${owner}/${repo}#${issue_number}`;

    const addReactions = async (cid: number) => {
      if (reactions) await this.addReactions({
        owner, repo, comment_id: cid, reactions,
      });
    };

    if (comment_tag_pattern) {
      const comment = await this.findComment({
        owner, repo, issue_number, pattern: comment_tag_pattern,
      });

      if (comment) {
        if (recreate) {
          core.info("Recreating comment for " + target);
          await this.deleteComment({
            owner, repo, comment_id: comment.id,
          });

          const newC = await this.createComment({
            owner, repo, issue_number, body,
          });
          await addReactions(newC.id);
          return;
        } else {
          core.info("Updating comment for " + target);
          await this.updateComment({
            owner, repo, comment_id: comment.id, body,
          });
          await addReactions(comment.id);
          return;
        }
      } else if (create_if_not_exists) {
        core.info("No comment has been found with asked pattern.");
      } else {
        core.info(
          "Not creating comment as the pattern has not been found. Use `create_if_not_exists: true` to create a new comment anyway.",
        );
        return;
      }
    }

    core.info("Creating a new comment for " + target);
    const newC = await this.createComment({
      repo, owner, issue_number, body,
    });
    await addReactions(newC.id);
  }
}
