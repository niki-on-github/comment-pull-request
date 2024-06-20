export type CommentData = {
  id: number,
  body: string | undefined,
  html_url: string,
};

// See https://docs.github.com/en/rest/reactions#reaction-types
export const REACTIONS = ["+1", "-1", "laugh", "confused", "heart", "hooray", "rocket", "eyes"] as const;
export type Reaction = (typeof REACTIONS)[number];

export const COMMENT_TAG_ID = "ThetaDev/action-comment-pull-request";

export interface ForgeIntegration {
  /**
   * Get a list of comments of a specific issue
   *
   * The comments can be fetched in pages, starting with page number 1.
   * If a page with no more comments is fetched, this method will return an empty array.
   */
  getComments(
    params: {
      owner: string;
      repo: string;
      issue_number: number;
      page: number;
    },
  ): Promise<CommentData[]>

  /**
   * Create a new comment
   */
  createComment({
    owner,
    repo,
    issue_number,
    body,
  }: {
    owner: string;
    repo: string;
    issue_number: number;
    body: string;
  }): Promise<CommentData>;

  /**
   * Update an existing comment
   */
  updateComment({
    owner,
    repo,
    comment_id,
    body,
  }: {
    owner: string;
    repo: string;
    comment_id: number;
    body: string;
  }): Promise<CommentData>;

  deleteComment({ owner, repo, comment_id }: {
    owner: string; repo: string; comment_id: number
  }): Promise<CommentData>;

  /**
   * Add a reaction to a comment
   */
  addReaction({
    owner,
    repo,
    comment_id,
    reaction,
  }: {
    owner: string;
    repo: string;
    comment_id: number;
    reaction: Reaction;
  }): Promise<void>;
}
